import { ProjectRiskCreateAsync, ProjectRiskUpdateAsync, ProjectRiskGetAsync } from '@/services/pdm/ProjectRisk';
import { UserWatchCreateAsync, UserWatchGetListByTargetCodeAsync, UserWatchDeleteAsync } from '@/services/pdm/UserWatch';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import RiskTypeSelect from '@/pages/appPdm/_formWidgets/RiskTypeSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';

const ProjectRiskFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, defaultValues, getDefaultValues } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    UserSelect,
    RiskTypeSelect,
    ProjectSelect,
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
            const res = await ProjectRiskGetAsync({ id: entityId });
            const formData: any = { ...res };

            // 转换里程碑字段为 labelInValue 格式
            if (formData.milestoneId && formData.milestoneName) {
              formData['{value:milestoneId,label:milestoneName}'] = {
                value: formData.milestoneId,
                label: formData.milestoneName,
              };
            }

            // 转换风险类型字段为 labelInValue 格式
            if (formData.riskTypeCode && formData.riskTypeName) {
              formData['{value:riskTypeCode,label:riskTypeName}'] = {
                value: formData.riskTypeCode,
                label: formData.riskTypeName,
              };
            }

            // 加载关注人列表
            if (formData.riskCode) {
              try {
                const watchList = await UserWatchGetListByTargetCodeAsync({
                  targetCode: formData.riskCode,
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
            console.error('加载风险数据失败:', error);
            message.error('加载风险数据失败');
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

  const portalId = `Pdm.ProjectManagement.ProjectRisk.${entityId || 'new'}`;
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
              console.log('ProjectRiskFormDialog Submit Values:', values);
              const hide = message.loading('正在提交...', 0);

              try {
                const transformedValues: any = { ...values };

                // 映射 watchUserCodes 到后端需要的 watcherUserIds
                if (values.watchUserCodes) {
                  transformedValues.watcherUserIds = values.watchUserCodes;
                }
                delete transformedValues.watchUserCodes;

                if (!values.id) {
                  // 创建风险
                  await ProjectRiskCreateAsync(transformedValues);
                  message.success('创建成功');
                } else {
                  // 更新风险
                  await ProjectRiskUpdateAsync({ id: values.id }, transformedValues);
                  message.success('更新成功');
                }

                // 关注人处理已移至后端 UpdateAsync/CreateAsync 中统一处理

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

export default ProjectRiskFormDialog;
