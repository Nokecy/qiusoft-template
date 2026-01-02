import { RecordInformationCreateAsync, RecordInformationUpdateAsync, RecordInformationGetAsync } from '@/services/pdm/RecordInformation';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { Button, Modal, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField, request } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import MultiAttachmentUpload from '@/components/MultiAttachmentUpload';
import { v4 as uuidv4 } from 'uuid';

const RecordInformationFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

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
    const uploadFn = React.useCallback(async (file: File) => {
      const uploadEntityId = uploadProps.entityId || currentEntityId;
      console.log('📤 上传文件:', file.name, '到 entityId:', uploadEntityId);

      const formData = new FormData();
      formData.append('file', file);

      const result = await request<any>(`/api/pdm/project-management/record-forms/${uploadEntityId}/documents`, {
        method: 'POST',
        data: formData,
        requestType: 'form', // 关键：触发 multipart/form-data
      });

      console.log('✅ 上传成功:', result);
      return result;
    }, [uploadProps.entityId, currentEntityId]);

    // 下载函数
    const downloadFn = React.useCallback(async (blobName: string) => {
      const downloadEntityId = uploadProps.entityId || currentEntityId;
      const result = await request<Blob>(`/api/pdm/project-management/record-forms/${downloadEntityId}/documents/${blobName}`, {
        method: 'GET',
        responseType: 'blob',
      });
      return result;
    }, [uploadProps.entityId, currentEntityId]);

    // 删除函数
    const deleteFn = React.useCallback(async (blobName: string) => {
      const deleteEntityId = uploadProps.entityId || currentEntityId;
      await request<any>(`/api/pdm/project-management/record-forms/${deleteEntityId}/documents/${blobName}`, {
        method: 'DELETE',
      });
    }, [uploadProps.entityId, currentEntityId]);

    return <MultiAttachmentUpload {...uploadProps} uploadFn={uploadFn} downloadFn={downloadFn} deleteFn={deleteFn} />;
  }, [currentEntityId]);

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    UserSelect,
    TaskTypeSelect,
    ProjectSelect,
    ProjectMilestoneSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig
  });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          RecordInformationGetAsync({ id: entityId }).then(async res => {
            const formData: any = { ...res };

            // 处理提出人 - 设置复合字段并删除原始字段避免冲突
            if (res.proposerUserId) {
              formData['{value:proposerUserId,label:proposerUserName}'] = {
                value: res.proposerUserId,
                label: res.proposerUserName || res.proposerUserId,
              };
              // 删除原始字段避免与复合字段冲突
              delete formData.proposerUserId;
              delete formData.proposerUserName;
            }
            // 处理参与人员（逗号分隔转数组）
            if (res.participantIds && res.participantNames) {
              const ids = res.participantIds.split(',').filter(Boolean);
              const names = res.participantNames.split(',').filter(Boolean);
              const participants = ids.map((id: string, index: number) => ({
                value: id,
                label: names[index] || id,
              }));
              formData.participantIdsArray = participants;
            }

            // 处理项目字段 - 后端返回的 projectId 是项目的 UUID
            // 但前端 ProjectSelect 组件使用 projectCode 作为 value
            // 所以需要根据 projectId（UUID）查询项目列表获取对应的 projectCode
            if (res.projectId) {
              try {
                const projectListResult = await ProjectGetListAsync({ MaxResultCount: 1000 });
                if (projectListResult.items) {
                  const matchedProject = projectListResult.items.find(
                    (item: any) => item.id === res.projectId
                  );
                  if (matchedProject) {
                    formData.projectId = matchedProject.projectCode;
                  } else {
                    formData.projectId = undefined;
                  }
                }
              } catch (error) {
                console.error('查询项目列表失败:', error);
                formData.projectId = undefined;
              }
            } else if (res.tasks && res.tasks.length > 0 && res.tasks[0].projectCode) {
              formData.projectId = res.tasks[0].projectCode;
            }

            // 处理任务列表
            if (res.tasks && Array.isArray(res.tasks)) {
              formData.tasks = res.tasks.map((task: any) => {
                const taskData: any = {
                  id: task.id,
                  taskCode: task.taskCode,
                  taskName: task.taskName,
                  description: task.description,
                };

                // 处理任务类型 - 设置复合字段并删除原始字段
                if (task.taskTypeCode) {
                  taskData['{value:taskTypeCode,label:taskTypeName}'] = {
                    value: task.taskTypeCode,
                    label: task.taskTypeName || task.taskTypeCode,
                  };
                  // 同时也设置单独的字段,以便 Formily 可以访问
                  taskData.taskTypeCode = task.taskTypeCode;
                  taskData.taskTypeName = task.taskTypeName;
                }

                // 处理里程碑 - 设置复合字段并删除原始字段
                if (task.milestoneId) {
                  taskData['{value:milestoneId,label:milestoneName}'] = {
                    value: task.milestoneId,
                    label: task.milestoneName || task.milestoneId,
                  };
                  // 同时也设置单独的字段
                  taskData.milestoneId = task.milestoneId;
                  taskData.milestoneName = task.milestoneName;
                }

                // 处理负责人（逗号分隔转数组）
                if (task.chargeIds && task.chargeNames) {
                  const chargeIds = task.chargeIds.split(',').filter(Boolean);
                  const chargeNames = task.chargeNames.split(',').filter(Boolean);
                  taskData.chargeIdsArray = chargeIds.map((id: string, index: number) => ({
                    value: id,
                    label: chargeNames[index] || id,
                  }));
                }

                // 处理处理人（逗号分隔转数组）
                if (task.processIds && task.processNames) {
                  const processIds = task.processIds.split(',').filter(Boolean);
                  const processNames = task.processNames.split(',').filter(Boolean);
                  taskData.processIdsArray = processIds.map((id: string, index: number) => ({
                    value: id,
                    label: processNames[index] || id,
                  }));
                }

                return taskData;
              });
            }

            // 处理附件数据 - 后端返回的字段名需要映射到前端组件期望的格式
            // 后端: fileName, contentType, fileSize
            // 前端: name, type, size
            if (res.attachments && res.attachments.length > 0) {
              formData.attachments = res.attachments.map((item: any) => ({
                id: item.id || item.blobName,
                entityId: entityId,
                entityTypeName: 'RecordInformation',
                name: item.fileName || item.name,
                size: item.fileSize || item.size,
                type: item.contentType || item.type,
                blobName: item.blobName,
                creationTime: item.uploadTime || item.creationTime,
              }));
            }

            // 编辑模式下确保 id 字段被设置
            formData.id = entityId;

            form.setInitialValues(formData);
          });
        }
      });

      // 监听hasTasks字段变化
      onFieldValueChange('hasTasks', (field) => {
        const form = field.form;
        const initialValue = form.getInitialValues()?.hasTasks;
        const currentValue = field.value;

        // 当从true改为false时，显示确认提示
        if (initialValue === true && currentValue === false) {
          Modal.confirm({
            title: '提示',
            content: (
              <div>
                <p>取消"下发任务"标记将解除与已创建任务的关联，但不会删除该任务。</p>
                <p>任务将继续存在，但不再与当前记录关联。</p>
                <p>是否确认？</p>
              </div>
            ),
            onOk: () => {
              // 用户确认，保持false值
            },
            onCancel: () => {
              // 用户取消，恢复为true
              field.setValue(true);
            },
          });
        }
      });

      // 监听projectId字段变化，更新任务列表中的里程碑字段
      // 注意：projectId 字段实际存储的是 projectCode
      onFieldValueChange('projectId', (field) => {
        const form = field.form;
        const projectCode = field.value; // projectId 字段实际存储的是 projectCode

        // 获取tasks数组字段
        const tasksField = form.query('tasks').take();
        if (tasksField && tasksField.value && Array.isArray(tasksField.value)) {
          // 遍历每个任务行，更新里程碑字段的 projectCode
          tasksField.value.forEach((_, index) => {
            const milestoneField = form.query(`tasks.${index}.{value:milestoneId,label:milestoneName}`).take();
            if (milestoneField) {
              // 更新组件的 projectCode 属性
              milestoneField.setComponentProps({
                ...milestoneField.componentProps,
                projectCode: projectCode || null,
              });
              // 清空当前值，因为项目变了
              if (projectCode !== field.initialValue) {
                milestoneField.setValue(null);
              }
            }
          });
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.RecordInformation.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
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

              // 获取项目的 Code 用于任务，以及 ID 用于记录单信息
              let projectIdForRecord = values.projectId; // 当前存储的是 projectCode
              const projectCodeForTasks = values.projectId; // projectCode 用于任务

              // 如果选择了项目，需要根据 projectCode 查询项目ID
              if (values.projectId) {
                try {
                  // 使用 Filter 参数查询 projectCode
                  const projectListResult = await ProjectGetListAsync({
                    Filter: `projectCode=${values.projectId}`,
                    MaxResultCount: 1
                  });

                  if (projectListResult.items && projectListResult.items.length > 0) {
                    projectIdForRecord = projectListResult.items[0].id; // 使用实际的项目ID
                  } else {
                    message.error('未找到对应的项目');
                    return;
                  }
                } catch (error) {
                  console.error('查询项目信息失败:', error);
                  message.error('查询项目信息失败');
                  return;
                }
              }

              // 转换数据
              const submitData: any = {
                subject: values.subject,
                recordFormType: values.recordFormType || 1,
                // Formily会直接将labelInValue的值拆分到proposerUserId和proposerUserName
                proposerUserId: values.proposerUserId || values['{value:proposerUserId,label:proposerUserName}']?.value,
                proposerUserName: values.proposerUserName || values['{value:proposerUserId,label:proposerUserName}']?.label,
                proposedDate: values.proposedDate,
                hasTasks: values.hasTasks || false,
                projectId: projectIdForRecord, // 使用实际的项目ID
                eventContent: values.eventContent,
              };

              // 处理参与人员（数组转逗号分隔字符串）
              if (values.participantIdsArray && Array.isArray(values.participantIdsArray)) {
                submitData.participantIds = values.participantIdsArray.map((p: any) => p.value).join(',');
                submitData.participantNames = values.participantIdsArray.map((p: any) => p.label).join(',');
              }

              // 处理任务列表
              if (values.tasks && Array.isArray(values.tasks) && values.hasTasks) {
                submitData.tasks = values.tasks.map((task: any) => {
                  const taskData: any = {
                    id: task.id,
                    taskName: task.taskName,
                    description: task.description,
                    projectCode: projectCodeForTasks, // 使用 projectCode 而不是 projectId
                  };

                  // 处理任务类型 - Formily会直接拆分到taskTypeCode和taskTypeName
                  taskData.taskTypeCode = task.taskTypeCode || task['{value:taskTypeCode,label:taskTypeName}']?.value;
                  taskData.taskTypeName = task.taskTypeName || task['{value:taskTypeCode,label:taskTypeName}']?.label;

                  // 处理里程碑 - Formily会直接拆分到milestoneId和milestoneName
                  taskData.milestoneId = task.milestoneId || task['{value:milestoneId,label:milestoneName}']?.value;
                  taskData.milestoneName = task.milestoneName || task['{value:milestoneId,label:milestoneName}']?.label;

                  // 处理负责人（数组转逗号分隔字符串）
                  if (task.chargeIdsArray && Array.isArray(task.chargeIdsArray)) {
                    taskData.chargeIds = task.chargeIdsArray.map((p: any) => p.value).join(',');
                    taskData.chargeNames = task.chargeIdsArray.map((p: any) => p.label).join(',');
                  }

                  // 处理处理人（数组转逗号分隔字符串）
                  if (task.processIdsArray && Array.isArray(task.processIdsArray)) {
                    taskData.processIds = task.processIdsArray.map((p: any) => p.value).join(',');
                    taskData.processNames = task.processIdsArray.map((p: any) => p.label).join(',');
                  }

                  return taskData;
                });
              }

              // 提取附件数据（不需要手动上传，组件已处理）
              const attachments = values.attachments || [];

              try {
                let savedEntityId = entityId;

                // 创建或更新实体
                if (!values.id) {
                  // 新建时确保使用临时 ID
                  submitData.id = currentEntityId;
                  const createResult = await RecordInformationCreateAsync(submitData);
                  savedEntityId = createResult.id;
                  message.success('创建成功');
                } else {
                  await RecordInformationUpdateAsync({ id: values.id }, submitData);
                  savedEntityId = values.id;
                  message.success('更新成功');
                }

                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              } catch (error) {
                console.error('保存失败:', error);
                // 错误已由全局拦截器处理
              }
            })
            .forOpen((payload, next) => {
              // 确保新建模式下表单的 id 字段被设置为临时 ID
              if (!entityId) {
                next({
                  initialValues: {
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

export default RecordInformationFormDialog;
