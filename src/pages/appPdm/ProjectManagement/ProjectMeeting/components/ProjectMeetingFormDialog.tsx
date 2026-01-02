import { ProjectMeetingCreateAsync, ProjectMeetingUpdateAsync, ProjectMeetingGetAsync } from '@/services/pdm/ProjectMeeting';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { Button, Modal } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMemberSelect from '@/pages/appPdm/_formWidgets/ProjectMemberSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import moment from 'moment';

const ProjectMeetingFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({ UserSelect, ProjectSelect, TaskTypeSelect, ProjectMemberSelect, ProjectMilestoneSelect });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProjectMeetingGetAsync({ id: entityId }).then(res => {
            // 转换数据
            const formData: any = { ...res };

            // 处理时间字段
            if (res.startTime) {
              formData.startTime = moment(res.startTime);
            }
            if (res.endTime) {
              formData.endTime = moment(res.endTime);
            }

            // 处理主持人
            if (res.hostId && res.hostName) {
              formData.host = {
                value: res.hostId,
                label: res.hostName,
              };
            }

            // 处理记录人
            if (res.recorderId && res.recorderName) {
              formData.recorder = {
                value: res.recorderId,
                label: res.recorderName,
              };
            }

            // 处理参会人员（逗号分隔转数组）
            if (res.participantIds && res.participantNames) {
              const ids = res.participantIds.split(',').filter(Boolean);
              const names = res.participantNames.split(',').filter(Boolean);
              const participants = ids.map((id: string, index: number) => ({
                value: id,
                label: names[index] || id,
              }));
              formData.participantIdsArray = participants;
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

                // 处理任务类型
                if (task.taskTypeCode && task.taskTypeName) {
                  taskData['{value:taskTypeCode,label:taskTypeName}'] = {
                    value: task.taskTypeCode,
                    label: task.taskTypeName,
                  };
                }

                // 处理里程碑
                if (task.milestoneId) {
                  taskData['{value:milestoneId,label:milestoneName}'] = {
                    value: task.milestoneId,
                    label: task.milestoneName || task.milestoneId,
                  };
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

      // 监听projectCode字段变化，更新任务列表中的里程碑字段
      onFieldValueChange('projectCode', (field) => {
        const form = field.form;
        const projectCode = field.value;

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

  const portalId = `Pdm.ProjectManagement.ProjectMeeting.${entityId || 'new'}`;
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
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // 转换数据
              const submitData: any = {
                meetingName: values.meetingName,
                startTime: values.startTime ? moment(values.startTime).format('YYYY-MM-DDTHH:mm:ss') : undefined,
                endTime: values.endTime ? moment(values.endTime).format('YYYY-MM-DDTHH:mm:ss') : undefined,
                location: values.location,
                hostId: values.host?.value,
                hostName: values.host?.name || values.host?.label,
                recorderId: values.recorder?.value,
                recorderName: values.recorder?.name || values.recorder?.label,
                mainContent: values.mainContent,
                executionContent: values.executionContent,
                projectCode: values.projectCode,
                hasTasks: values.hasTasks || false,
              };

              // 处理参会人员（数组转逗号分隔字符串，必填字段）
              if (values.participantIdsArray && Array.isArray(values.participantIdsArray) && values.participantIdsArray.length > 0) {
                submitData.participantIds = values.participantIdsArray.map((p: any) => p.value).join(',');
                submitData.participantNames = values.participantIdsArray.map((p: any) => p.label).join(',');
              } else {
                // 如果没有参会人员，使用空字符串以满足必填要求
                submitData.participantIds = '';
                submitData.participantNames = '';
              }

              // 处理任务列表
              if (values.tasks && Array.isArray(values.tasks) && values.hasTasks) {
                submitData.tasks = values.tasks.map((task: any) => {
                  const taskData: any = {
                    id: task.id, // 有id表示更新，无id表示新增
                    taskName: task.taskName,
                    description: task.description,
                    projectCode: values.projectCode, // 使用表单的项目编码
                  };

                  // 处理任务类型
                  if (task['{value:taskTypeCode,label:taskTypeName}']) {
                    taskData.taskTypeCode = task['{value:taskTypeCode,label:taskTypeName}'].value;
                    taskData.taskTypeName = task['{value:taskTypeCode,label:taskTypeName}'].label;
                  }

                  // 处理里程碑
                  if (task['{value:milestoneId,label:milestoneName}']) {
                    taskData.milestoneId = task['{value:milestoneId,label:milestoneName}'].value;
                    taskData.milestoneName = task['{value:milestoneId,label:milestoneName}'].label;
                  }

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

              if (!values.id) {
                return ProjectMeetingCreateAsync(submitData)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return ProjectMeetingUpdateAsync({ id: values.id }, submitData)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
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

export default ProjectMeetingFormDialog;
