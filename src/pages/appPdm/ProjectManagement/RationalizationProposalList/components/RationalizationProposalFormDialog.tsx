import { RationalizationProposalCreateAsync, RationalizationProposalUpdateAsync, RationalizationProposalGetAsync } from '@/services/pdm/RationalizationProposal';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { Button, Modal, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import { request } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import MultiAttachmentUpload from '@/components/MultiAttachmentUpload';
import { v4 as uuidv4 } from 'uuid';

const RationalizationProposalFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);

  // 为新建模式生成临时 entityId
  const tempEntityIdRef = React.useRef<string>();
  if (!entityId && !tempEntityIdRef.current) {
    // 生成临时 GUID
    tempEntityIdRef.current = uuidv4();
  }
  const currentEntityId = entityId || tempEntityIdRef.current;

  // 🔑 创建包装后的 MultiAttachmentUpload 组件，内置上传函数
  // 这样就不需要通过 Formily 的表达式传递函数了
  const AttachmentUploadWithConfig = React.useCallback((uploadProps: any) => {
    const effectiveEntityId = uploadProps.entityId || currentEntityId;

    return (
      <MultiAttachmentUpload
        {...uploadProps}
        entityId={effectiveEntityId}
        uploadFn={async (eid: string, file: File) => {
          const uploadEntityId = eid || effectiveEntityId;
          console.log('📤 上传文件:', file.name, '到 entityId:', uploadEntityId);

          // 使用正确的 API 路径和 FormData 格式
          // 后端 Controller: /api/pdm/project-management/rationalization-proposals/{entityId}/documents
          const formData = new FormData();
          formData.append('file', file);

          const result = await request<any>(
            `/api/pdm/project-management/rationalization-proposals/${uploadEntityId}/documents`,
            {
              method: 'POST',
              data: formData,
              requestType: 'form',
            }
          );

          console.log('✅ 上传成功:', result);
          return result;
        }}
        downloadFn={async (eid: string, blobName: string) => {
          // 下载: GET /api/pdm/project-management/rationalization-proposals/{entityId}/documents/{blobName}
          const downloadEntityId = eid || effectiveEntityId;
          const response = await request<Blob>(
            `/api/pdm/project-management/rationalization-proposals/${downloadEntityId}/documents/${blobName}`,
            {
              method: 'GET',
              responseType: 'blob',
            }
          );
          return response;
        }}
        deleteFn={async (eid: string, blobName: string) => {
          // 删除: DELETE /api/pdm/project-management/rationalization-proposals/{entityId}/documents/{blobName}
          const deleteEntityId = eid || effectiveEntityId;
          await request(
            `/api/pdm/project-management/rationalization-proposals/${deleteEntityId}/documents/${blobName}`,
            {
              method: 'DELETE',
            }
          );
        }}
      />
    );
  }, [currentEntityId]);

  // 使用包装后的组件替代原始的 MultiAttachmentUpload
  const SchemaField = useSchemaField({
    UserSelect,
    TaskTypeSelect,
    ProjectSelect,
    ProjectMilestoneSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig,
  });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          RationalizationProposalGetAsync({ id: entityId }).then(async res => {
            const formData: any = { ...res };

            console.log('=== 表单数据加载调试 ===');
            console.log('1. 后端返回的完整数据:', res);
            console.log('2. projectId 值:', res.projectId);

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
                    console.log('3. 根据 projectId 匹配到 projectCode:', matchedProject.projectCode);
                  } else {
                    console.log('3. 未找到匹配的项目, projectId:', res.projectId);
                    formData.projectId = undefined;
                  }
                }
              } catch (error) {
                console.error('查询项目列表失败:', error);
                formData.projectId = undefined;
              }
            } else if (res.tasks && res.tasks.length > 0 && res.tasks[0].projectCode) {
              formData.projectId = res.tasks[0].projectCode;
              console.log('3. 从任务中提取 projectCode:', formData.projectId);
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

            // 🔑 关键:设置 id 字段,以便附件组件可以正确启用
            formData.id = entityId;

            // 处理附件数据 - 后端返回的字段名需要映射到前端组件期望的格式
            // 后端: fileName, contentType, fileSize
            // 前端: name, type, size
            if (res.attachments && res.attachments.length > 0) {
              formData.attachments = res.attachments.map((item: any) => ({
                id: item.id || item.blobName,
                entityId: entityId,
                entityTypeName: 'RationalizationProposal',
                name: item.fileName || item.name,
                size: item.fileSize || item.size,
                type: item.contentType || item.type,
                blobName: item.blobName,
                creationTime: item.uploadTime || item.creationTime,
              }));
              console.log('4. 获取到的附件列表:', formData.attachments);
            }

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

  const portalId = `Pdm.ProjectManagement.RationalizationProposal.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
            return (
              <>
                <FormLayoutMode
                  formId={formId}
                  {...schema.form}
                  editClickAfter={() => formDialog.close()}
                >
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forOpen((payload, next) => {
              // 新建模式：设置临时 ID，以便附件组件可以使用
              if (!entityId) {
                console.log('🆕 新建模式，设置临时 ID:', currentEntityId);
                next({
                  initialValues: {
                    id: currentEntityId, // 设置临时ID
                  },
                });
              } else {
                // 编辑模式：使用 formProps 中的 effects 加载数据
                next();
              }
            })
            .forConfirm(async (payload, next) => {
              const values: any = payload.values;

              console.log('=== 表单提交调试 ===');
              console.log('1. 所有表单值:', values);
              console.log('2. 提出人复合字段:', values['{value:proposerUserId,label:proposerUserName}']);

              // 获取项目的 Code 用于任务，以及 ID 用于合理化建议
              let projectIdForProposal = values.projectId; // 当前存储的是 projectCode
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
                    projectIdForProposal = projectListResult.items[0].id; // 使用实际的项目ID
                    console.log('3. 项目信息:', { projectCode: values.projectId, projectId: projectIdForProposal });
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
                proposalTitle: values.proposalTitle,
                // Formily会直接将labelInValue的值拆分到proposerUserId和proposerUserName
                proposerUserId: values.proposerUserId || values['{value:proposerUserId,label:proposerUserName}']?.value,
                proposerUserName: values.proposerUserName || values['{value:proposerUserId,label:proposerUserName}']?.label,
                proposedDate: values.proposedDate,
                hasTasks: values.hasTasks || false,
                projectId: projectIdForProposal, // 使用实际的项目ID
                description: values.description,
              };

              console.log('4. 提取的提出人信息:', {
                proposerUserId: submitData.proposerUserId,
                proposerUserName: submitData.proposerUserName,
              });

              // 处理参与人员（数组转逗号分隔字符串）
              if (values.participantIdsArray && Array.isArray(values.participantIdsArray)) {
                submitData.participantIds = values.participantIdsArray.map((p: any) => p.value).join(',');
                submitData.participantNames = values.participantIdsArray.map((p: any) => p.label).join(',');
              }

              // 处理任务列表
              if (values.tasks && Array.isArray(values.tasks) && values.hasTasks) {
                console.log('5. 原始任务列表数据:', values.tasks);

                submitData.tasks = values.tasks.map((task: any, index: number) => {
                  console.log(`6. 任务 ${index + 1} 的原始数据:`, task);

                  const taskData: any = {
                    id: task.id,
                    taskName: task.taskName,
                    description: task.description,
                    projectCode: projectCodeForTasks, // 使用 projectCode 而不是 projectId
                  };

                  // 处理任务类型 - Formily会直接拆分到taskTypeCode和taskTypeName
                  taskData.taskTypeCode = task.taskTypeCode || task['{value:taskTypeCode,label:taskTypeName}']?.value;
                  taskData.taskTypeName = task.taskTypeName || task['{value:taskTypeCode,label:taskTypeName}']?.label;

                  console.log(`7. 任务 ${index + 1} 提取的类型:`, {
                    taskTypeCode: taskData.taskTypeCode,
                    taskTypeName: taskData.taskTypeName,
                  });

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

              // 提取附件数据(仅用于显示,不需要提交)
              // 附件已通过 MultiAttachmentUpload 的 uploadFn 立即上传

              try {
                console.log('4. 最终提交的数据:', submitData);
                console.log('5. 是否为新建:', !entityId);
                console.log('6. 当前表单ID:', values.id);

                let savedEntityId = entityId;

                // 创建或更新实体
                if (!entityId) {
                  // 新建模式
                  const createResult = await RationalizationProposalCreateAsync(submitData);
                  savedEntityId = createResult.id;
                  message.success('创建成功');

                  // 🔑 重要:如果使用了临时ID上传附件，需要将附件关联到真实ID
                  if (currentEntityId !== savedEntityId) {
                    console.log('📌 需要更新附件关联: 临时ID', currentEntityId, '→ 真实ID', savedEntityId);
                    // 注意：这里假设后端会自动处理，或者附件已经上传到临时ID
                    // 如果后端需要手动迁移，需要调用迁移API
                  }

                  // 更新表单的 id 字段
                  payload.form.setFieldState('id', state => {
                    state.value = savedEntityId;
                  });
                } else {
                  // 编辑模式
                  await RationalizationProposalUpdateAsync({ id: entityId }, submitData);
                  savedEntityId = entityId;
                  message.success('更新成功');
                }

                // 📌 附件已在选择时通过 uploadFn 立即上传,无需额外处理

                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              } catch (error) {
                console.error('保存失败:', error);
                // 错误已由全局拦截器处理
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

export default RationalizationProposalFormDialog;
