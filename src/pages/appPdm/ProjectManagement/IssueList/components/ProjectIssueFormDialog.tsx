import { ProjectIssueCreateAsync, ProjectIssueUpdateAsync, ProjectIssueGetAsync } from '@/services/pdm/ProjectIssue';
import { UserWatchCreateAsync, UserWatchGetListByTargetCodeAsync, UserWatchDeleteAsync } from '@/services/pdm/UserWatch';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import IssueTypeSelect from '@/pages/appPdm/_formWidgets/IssueTypeSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import ProjectTaskSelect from '@/pages/appPdm/_formWidgets/ProjectTaskSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';

const ProjectIssueFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, defaultValues, getDefaultValues } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    UserSelect,
    IssueTypeSelect,
    ProjectSelect,
    ProjectTaskSelect,
    ProjectMilestoneSelect,
  });

  // 获取默认值: 优先使用 getDefaultValues 函数(动态获取), 其次使用 defaultValues 属性(静态值)
  const resolveDefaultValues = React.useCallback(() => {
    if (getDefaultValues && typeof getDefaultValues === 'function') {
      return getDefaultValues();
    }
    return defaultValues;
  }, [getDefaultValues, defaultValues]);

  const buildFormProps = () => ({
    initialValues: !entityId ? resolveDefaultValues() : undefined,
    effects: () => {
      onFormInit(async form => {
        if (entityId) {
          try {
            const res = await ProjectIssueGetAsync({ id: entityId });
            const formData: any = { ...res };

            // 转换里程碑字段为 labelInValue 格式
            if (formData.milestoneId && formData.milestoneName) {
              formData['{value:milestoneId,label:milestoneName}'] = {
                value: formData.milestoneId,
                label: formData.milestoneName,
              };
            }

            // 加载关注人列表
            if (formData.issueCode) {
              try {
                const watchList = await UserWatchGetListByTargetCodeAsync({
                  targetCode: formData.issueCode,
                  PageSize: 1000,
                });
                // watchUserCodes 现在使用 userId 而不是 userCode
                formData.watchUserCodes = watchList.items?.map((w: any) => w.userId) || [];
              } catch (e) {
                console.warn('加载关注人失败:', e);
                formData.watchUserCodes = [];
              }
            }

            form.setInitialValues(formData);
          } catch (error) {
            console.error('加载问题数据失败:', error);
            message.error('加载问题数据失败');
          }
        } else {
          // 新建模式：设置默认值(动态获取)
          const defaults = resolveDefaultValues();
          if (defaults) {
            form.setInitialValues(defaults);
          }
        }
      });
    },
  });

  const portalId = `Pdm.ProjectManagement.ProjectIssue.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          // 每次打开对话框时重新构建 formProps，确保获取最新的默认值
          const formProps = buildFormProps();

          const formDialog = FormDialog({ title: title, width: 820 }, portalId, () => {
            return (
              <>
                <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forConfirm(async (payload, next) => {
              const values: any = payload.values;
              const hide = message.loading('正在提交...', 0);

              try {
                // 提取watchUserCodes并从提交数据中移除
                const watchUserCodes = values.watchUserCodes || [];
                const transformedValues = { ...values };
                delete transformedValues.watchUserCodes;

                let issueCode: string;

                if (!values.id) {
                  // 创建问题
                  const createdIssue = await ProjectIssueCreateAsync(transformedValues);
                  issueCode = createdIssue.issueCode;
                  message.success('创建成功');
                } else {
                  // 更新问题
                  await ProjectIssueUpdateAsync({ id: values.id }, transformedValues);
                  issueCode = values.issueCode;
                  message.success('更新成功');
                }

                // 处理关注人
                if (issueCode) {
                  try {
                    // 获取现有关注人列表
                    const existingWatchList = await UserWatchGetListByTargetCodeAsync({
                      targetCode: issueCode,
                      PageSize: 1000,
                    });
                    const existingUserIds = existingWatchList.items?.map((w: any) => w.userId) || [];

                    // 找出需要删除的关注记录
                    const toDelete = existingWatchList.items?.filter(
                      (w: any) => !watchUserCodes.includes(w.userId)
                    ) || [];

                    // 找出需要新增的关注人
                    const toAdd = watchUserCodes.filter(
                      (userId: string) => !existingUserIds.includes(userId)
                    );

                    // 删除不再关注的记录
                    for (const watch of toDelete) {
                      if (watch.id) {
                        await UserWatchDeleteAsync({ id: watch.id });
                      }
                    }

                    // 添加新的关注记录
                    for (const userId of toAdd) {
                      await UserWatchCreateAsync({
                        userId: userId,
                        targetType: 2, // 2 = Issue
                        targetCode: issueCode,
                        remark: '',
                      });
                    }
                  } catch (err) {
                    console.warn('处理关注人失败:', err);
                    // 不影响主流程,只记录警告
                  }
                }

                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              } catch (err: any) {
                message.error(`${values.id ? '更新' : '创建'}失败: ${err.message || '未知错误'}`);
                throw err;
              } finally {
                hide();
              }
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default ProjectIssueFormDialog;
