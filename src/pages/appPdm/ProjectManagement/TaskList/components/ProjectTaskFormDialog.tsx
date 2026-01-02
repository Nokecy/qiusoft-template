import { ProjectTaskCreateAsync, ProjectTaskUpdateAsync, ProjectTaskGetAsync } from '@/services/pdm/ProjectTask';
import { UserWatchCreateAsync, UserWatchGetListByTargetCodeAsync, UserWatchDeleteAsync } from '@/services/pdm/UserWatch';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField, request } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import MultiAttachmentUpload from '@/components/MultiAttachmentUpload';
import IssueTypeSelect from '@/pages/appPdm/_formWidgets/IssueTypeSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import ProjectTaskSelect from '@/pages/appPdm/_formWidgets/ProjectTaskSelect';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import { v4 as uuidv4 } from 'uuid';

const ProjectTaskFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, defaultValues, getDefaultValues } = props;

  // 为新建记录生成临时 entityId (用于附件上传)
  const tempEntityIdRef = React.useRef<string>();
  if (!tempEntityIdRef.current) {
    tempEntityIdRef.current = uuidv4();
  }
  const currentEntityId = entityId || tempEntityIdRef.current;

  // 创建附件上传配置的包装器组件
  const AttachmentUploadWithConfig = React.useCallback((uploadProps: any) => {
    const effectiveEntityId = uploadProps.entityId || currentEntityId;
    console.log('📎 AttachmentUploadWithConfig 渲染, entityId:', effectiveEntityId, 'uploadProps:', uploadProps);

    // 上传函数 - 使用正确的 API 路由和 FormData
    const uploadFn = React.useCallback(async (eid: string, file: File) => {
      const uploadEntityId = eid || uploadProps.entityId || currentEntityId;
      console.log('📤 上传文件:', file.name, '到 entityId:', uploadEntityId);

      const formData = new FormData();
      formData.append('file', file);

      const result = await request<any>(`/api/pdm/project-management/project-tasks/${uploadEntityId}/documents`, {
        method: 'POST',
        data: formData,
        requestType: 'form', // 关键：触发 multipart/form-data
      });

      console.log('✅ 上传成功:', result);
      return result;
    }, [uploadProps.entityId, currentEntityId]);

    // 下载函数
    const downloadFn = React.useCallback(async (eid: string, blobName: string) => {
      const downloadEntityId = eid || uploadProps.entityId || currentEntityId;
      const result = await request<Blob>(`/api/pdm/project-management/project-tasks/${downloadEntityId}/documents/${blobName}`, {
        method: 'GET',
        responseType: 'blob',
      });
      return result;
    }, [uploadProps.entityId, currentEntityId]);

    // 删除函数
    const deleteFn = React.useCallback(async (eid: string, blobName: string) => {
      const deleteEntityId = eid || uploadProps.entityId || currentEntityId;
      await request<any>(`/api/pdm/project-management/project-tasks/${deleteEntityId}/documents/${blobName}`, {
        method: 'DELETE',
      });
    }, [uploadProps.entityId, currentEntityId]);

    return <MultiAttachmentUpload {...uploadProps} entityId={effectiveEntityId} uploadFn={uploadFn} downloadFn={downloadFn} deleteFn={deleteFn} />;
  }, [currentEntityId]);

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    MultiAttachmentUpload: AttachmentUploadWithConfig,
    IssueTypeSelect,
    ProjectSelect,
    TaskTypeSelect,
    ProjectMilestoneSelect,
    ProjectTaskSelect,
    UserSelect,
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
            // 加载任务完整信息（后端已自动加载子项数据）
            const res = await ProjectTaskGetAsync({ id: entityId });
            const formData: any = { ...res };

            console.log('=== 任务数据加载调试 ===');
            console.log('1. 后端返回的完整数据:', res);
            console.log('2. risks:', res.risks);
            console.log('3. issues:', res.issues);
            console.log('4. deliverables:', res.deliverables);
            console.log('5. attachments:', res.attachments);

            // chargeIds: JSON字符串 -> 数组
            if (formData.chargeIds) {
              try {
                formData.chargeIds = JSON.parse(formData.chargeIds);
              } catch (e) {
                console.warn('chargeIds解析失败:', e);
                formData.chargeIds = [];
              }
            }

            // processIds: JSON字符串 -> 数组
            if (formData.processIds) {
              try {
                formData.processIds = JSON.parse(formData.processIds);
              } catch (e) {
                console.warn('processIds解析失败:', e);
                formData.processIds = [];
              }
            }

            // 风险、问题、成果、附件数据已经由后端加载
            // 需要将后端字段名转换为前端 schema 字段名

            // 修复任务类型回显：Formily解构模式在初始化时可能无法自动组合对象，需手动构造
            if (formData.taskTypeCode) {
              formData['{value:taskTypeCode,label:taskTypeName}'] = {
                value: formData.taskTypeCode,
                label: formData.taskTypeName || formData.taskTypeCode,
              };
            }

            // 修复任务来源回显：确保为数字类型，避免 '0' 字符串导致 Select 匹配失败
            if (formData.taskSource !== undefined) {
              formData.taskSource = Number(formData.taskSource);
            }

            // 转换风险数据：后端 name → 前端 schema title
            if (formData.risks && Array.isArray(formData.risks)) {
              formData.risks = formData.risks.map((risk: any) => ({
                ...risk,
                title: risk.name || risk.title, // name → title
              }));
            } else {
              formData.risks = [];
            }

            // 转换问题数据：后端 name → 前端 schema title
            if (formData.issues && Array.isArray(formData.issues)) {
              formData.issues = formData.issues.map((issue: any) => ({
                ...issue,
                title: issue.name || issue.title, // name → title
              }));
            } else {
              formData.issues = [];
            }

            // 转换成果数据：后端 deliverableName → 前端 schema name
            if (formData.deliverables && Array.isArray(formData.deliverables)) {
              formData.deliverables = formData.deliverables.map((d: any) => ({
                ...d,
                name: d.deliverableName || d.name, // deliverableName → name
              }));
            } else {
              formData.deliverables = [];
            }

            if (!formData.attachments) formData.attachments = [];

            // 加载关注人列表
            if (formData.taskCode) {
              try {
                const watchList = await UserWatchGetListByTargetCodeAsync({
                  targetCode: formData.taskCode,
                  PageSize: 1000,
                });
                formData.watchUserCodes = watchList.items?.map((w: any) => w.userCode) || [];
              } catch (e) {
                console.warn('加载关注人失败:', e);
                formData.watchUserCodes = [];
              }
            }

            // 编辑模式下确保 id 字段被设置
            formData.id = entityId;

            form.setInitialValues(formData);
          } catch (error) {
            console.error('加载任务数据失败:', error);
            message.error('加载任务数据失败');
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

  const portalId = `Pdm.ProjectManagement.ProjectTask.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          // 每次打开对话框时重新构建 formProps，确保获取最新的默认值
          const formProps = buildFormProps();

          const formDialog = FormDialog({ title: title, width: 1000 }, portalId, () => {
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
                // 数据转换：将数组转换为JSON字符串
                const transformedValues = { ...values };

                console.log('=== 任务提交数据调试 ===');
                console.log('1. 原始表单数据:', values);
                console.log('2. risks:', values.risks);
                console.log('3. issues:', values.issues);
                console.log('4. deliverables:', values.deliverables);
                console.log('5. attachments:', values.attachments);

                // 显式处理 TaskType 的解构逻辑（针对 Formily 残留的复杂 Key）
                const typeKey = '{value:taskTypeCode,label:taskTypeName}';
                if (transformedValues[typeKey]) {
                  const typeObj = transformedValues[typeKey];
                  if (typeObj && typeof typeObj === 'object') {
                    transformedValues.taskTypeCode = typeObj.value;
                    transformedValues.taskTypeName = typeObj.label;
                  }
                  delete transformedValues[typeKey];
                }

                // 显式处理 TaskSource 的类型转换
                if (transformedValues.taskSource !== undefined) {
                  transformedValues.taskSource = Number(transformedValues.taskSource);
                }

                // 获取任务关联的里程碑ID（用于风险和问题）
                const taskMilestoneId = transformedValues.milestoneId;
                const taskMilestoneName = transformedValues.milestoneName;

                // 转换风险数据：title → name, 添加 projectCode 和 milestoneId
                if (transformedValues.risks && Array.isArray(transformedValues.risks)) {
                  transformedValues.risks = transformedValues.risks.map((risk: any) => ({
                    ...risk,
                    name: risk.title || risk.name, // title 映射到 name
                    projectCode: transformedValues.projectCode, // 添加 projectCode
                    milestoneId: taskMilestoneId, // 添加任务的里程碑ID
                    milestoneName: taskMilestoneName, // 添加任务的里程碑名称
                  }));
                  // 删除 title 字段
                  transformedValues.risks.forEach((risk: any) => delete risk.title);
                }

                // 转换问题数据：title → name, 添加 projectCode、severity 和 milestoneId
                if (transformedValues.issues && Array.isArray(transformedValues.issues)) {
                  transformedValues.issues = transformedValues.issues.map((issue: any) => ({
                    ...issue,
                    name: issue.title || issue.name, // title 映射到 name
                    projectCode: transformedValues.projectCode, // 添加 projectCode
                    severity: issue.priority || 10, // 使用 priority 或默认值 10(中)
                    milestoneId: taskMilestoneId, // 添加任务的里程碑ID
                    milestoneName: taskMilestoneName, // 添加任务的里程碑名称
                  }));
                  // 删除 title 字段
                  transformedValues.issues.forEach((issue: any) => delete issue.title);
                }

                // 转换成果数据：name → deliverableName, 添加 projectCode 和 deliverableCode
                if (transformedValues.deliverables && Array.isArray(transformedValues.deliverables)) {
                  transformedValues.deliverables = transformedValues.deliverables.map((deliverable: any, index: number) => ({
                    ...deliverable,
                    deliverableName: deliverable.name || deliverable.deliverableName, // name 映射到 deliverableName
                    deliverableCode: deliverable.deliverableCode || `${transformedValues.projectCode || 'TEMP'}_D${Date.now()}_${index}`, // 生成 deliverableCode
                    projectCode: transformedValues.projectCode, // 添加 projectCode
                    description: deliverable.description || '', // 确保 description 不为空
                  }));
                  // 删除 name 字段
                  transformedValues.deliverables.forEach((deliverable: any) => delete deliverable.name);
                }

                // 提取watchUserCodes并从提交数据中移除
                const watchUserCodes = transformedValues.watchUserCodes || [];
                delete transformedValues.watchUserCodes;

                // chargeIds: 数组 -> JSON字符串
                if (transformedValues.chargeIds && Array.isArray(transformedValues.chargeIds)) {
                  transformedValues.chargeIds = JSON.stringify(transformedValues.chargeIds);
                  // 移除chargeNames,由后端自动填充
                  delete transformedValues.chargeNames;
                }

                // processIds: 数组 -> JSON字符串
                if (transformedValues.processIds && Array.isArray(transformedValues.processIds)) {
                  transformedValues.processIds = JSON.stringify(transformedValues.processIds);
                  // 移除processNames,由后端自动填充
                  delete transformedValues.processNames;
                }

                // 风险、问题、成果数据已经是后端需要的格式,直接提交
                // 后端的智能Diff逻辑会自动处理增删改
                // 保存附件列表（不需要手动上传，组件已处理）
                const attachments = transformedValues.attachments || [];
                delete transformedValues.attachments;

                let taskCode: string;
                let taskId: string;

                if (!entityId) {
                  // 创建任务 - 使用临时 ID
                  transformedValues.id = currentEntityId;
                  const createdTask = await ProjectTaskCreateAsync(transformedValues);
                  taskCode = createdTask.taskCode;
                  taskId = createdTask.id;
                  message.success('创建成功');
                } else {
                  // 更新任务 - 使用真实的 entityId
                  await ProjectTaskUpdateAsync({ id: entityId }, transformedValues);
                  taskCode = values.taskCode;
                  taskId = entityId;
                  message.success('更新成功');
                }

                // 处理关注人
                if (taskCode) {
                  try {
                    // 获取现有关注人列表
                    const existingWatchList = await UserWatchGetListByTargetCodeAsync({
                      targetCode: taskCode,
                      PageSize: 1000,
                    });
                    const existingUserCodes = existingWatchList.items?.map((w: any) => w.userCode) || [];

                    // 找出需要删除的关注记录
                    const toDelete = existingWatchList.items?.filter(
                      (w: any) => !watchUserCodes.includes(w.userCode)
                    ) || [];

                    // 找出需要新增的关注人
                    const toAdd = watchUserCodes.filter(
                      (code: string) => !existingUserCodes.includes(code)
                    );

                    // 删除不再关注的记录
                    for (const watch of toDelete) {
                      if (watch.id) {
                        await UserWatchDeleteAsync({ id: watch.id });
                      }
                    }

                    // 添加新的关注记录（需要查询用户信息获取 userId）
                    if (toAdd.length > 0) {
                      // 逐个查询用户信息并创建关注记录
                      // 使用 userName=*value* 的contains语法（参考UserSelect组件）
                      for (const userCode of toAdd) {
                        try {
                          const userRes = await IdentityUserProGetListAsync({
                            Filter: `userName=*${userCode}*`,
                            MaxResultCount: 10,
                          });
                          // 客户端精确匹配用户名
                          const exactUser = userRes.items?.find((u: any) => u.userName === userCode);
                          if (exactUser && exactUser.id) {
                            await UserWatchCreateAsync({
                              userId: exactUser.id,
                              userCode: userCode,
                              targetType: 1, // 1 = Task
                              targetCode: taskCode,
                              remark: '',
                            });
                          } else {
                            console.warn(`未找到用户 ${userCode} 的精确匹配，跳过创建关注记录`);
                          }
                        } catch (e) {
                          console.warn(`查询用户 ${userCode} 失败:`, e);
                        }
                      }
                    }
                  } catch (err) {
                    console.warn('处理关注人失败:', err);
                    // 不影响主流程,只记录警告
                  }
                }

                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              } catch (err: any) {
                message.error(`${entityId ? '更新' : '创建'}失败: ${err.message || '未知错误'}`);
                throw err;
              } finally {
                hide();
              }
            })
            .forOpen((payload, next) => {
              // 确保新建模式下表单的 id 字段被设置为临时 ID
              if (!entityId) {
                next({
                  initialValues: {
                    ...payload.initialValues,
                    id: currentEntityId,
                  },
                });
              } else {
                next();
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

export default ProjectTaskFormDialog;
