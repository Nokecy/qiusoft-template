import { ProjectTaskCreateAsync, ProjectTaskUpdateAsync, ProjectTaskGetAsync } from '@/services/pdm/ProjectTask';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { createForm, onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React, { useMemo } from 'react';
import { taskFormSchema } from './schema';
import { useSchemaField } from '@@/plugin-formSchema';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import ProjectTaskSelect from '@/pages/appPdm/_formWidgets/ProjectTaskSelect';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import type { API } from '@/services/typings';

interface TaskFormDialogProps {
  /** 任务 ID（编辑模式） */
  entityId?: string;
  /** 对话框标题 */
  title?: string;
  /** 按钮属性 */
  buttonProps?: any;
  /** 提交成功后的回调 */
  onAfterSubmit?: () => void;
  /** 默认值（新建模式） */
  defaultValues?: Partial<API.BurnAbpPdmProjectManagementProjectTasksCreateProjectTaskDto>;
}

/**
 * 任务表单对话框组件（用于任务分解页面）
 */
export const useTaskFormDialog = () => {
  const SchemaField = useSchemaField({
    TaskTypeSelect,
    MilestoneSelect: ProjectMilestoneSelect,
    TaskSelect: ProjectTaskSelect,
    UserSelect,
  });

  return useMemo(() => {
    return (options: Pick<TaskFormDialogProps, 'entityId' | 'title' | 'defaultValues' | 'onAfterSubmit'>) => {
      const { entityId, title, onAfterSubmit, defaultValues } = options;
      try {
        const form = createForm({
          initialValues: !entityId ? defaultValues : undefined,
          effects: () => {
            onFormInit(async (form) => {
              if (entityId) {
                try {
                  // 加载任务数据
                  const res = await ProjectTaskGetAsync({ id: entityId });
                  const formData: any = { ...res };

                  // 处理复合字段 - 任务类型
                  if (formData.taskTypeCode || formData.taskTypeName) {
                    formData['{value:taskTypeCode,label:taskTypeName}'] = {
                      value: formData.taskTypeCode,
                      label: formData.taskTypeName,
                    };
                  }

                  // 处理复合字段 - 负责人
                  if (formData.chargeIds) {
                    try {
                      const ids = JSON.parse(formData.chargeIds);
                      const names = formData.chargeNames ? JSON.parse(formData.chargeNames) : [];

                      if (Array.isArray(ids) && Array.isArray(names)) {
                        formData['{value:chargeIds,label:chargeNames}'] = ids.map((id: string, index: number) => ({
                          value: id,
                          label: names[index] || '',
                        }));
                      }
                    } catch (e) {
                      console.warn('负责人数据解析失败:', e);
                    }
                  }

                  // 处理复合字段 - 处理人
                  if (formData.processIds) {
                    try {
                      const ids = JSON.parse(formData.processIds);
                      const names = formData.processNames ? JSON.parse(formData.processNames) : [];

                      if (Array.isArray(ids) && Array.isArray(names)) {
                        formData['{value:processIds,label:processNames}'] = ids.map((id: string, index: number) => ({
                          value: id,
                          label: names[index] || '',
                        }));
                      }
                    } catch (e) {
                      console.warn('处理人数据解析失败:', e);
                    }
                  }

                  form.setInitialValues(formData);
                } catch (error) {
                  message.error('加载任务数据失败');
                  console.error(error);
                }
              }
            });
          },
        });

        const dialog = FormDialog(
          {
            title: title || (entityId ? '编辑任务' : '新建任务'),
            width: 800,
          },
          () => {
            return (
              <FormLayout {...taskFormSchema.form}>
                <SchemaField schema={taskFormSchema.schema} />
              </FormLayout>
            );
          }
        );

        dialog
          .forOpen(() => {
            return { form };
          })
          .forConfirm(async (payload) => {
            try {
              const values = await payload.submit();

          // 处理复合字段 - 任务类型
          if (values['{value:taskTypeCode,label:taskTypeName}']) {
            const typeField = values['{value:taskTypeCode,label:taskTypeName}'];
            values.taskTypeCode = typeField.value;
            values.taskTypeName = typeField.label;
          } else if (values.taskTypeCode) {
            // Formily 已自动拆分
            // values.taskTypeCode 和 values.taskTypeName 已存在
          }

          // 处理复合字段 - 负责人
          if (values['{value:chargeIds,label:chargeNames}']) {
            const chargeField = values['{value:chargeIds,label:chargeNames}'];
            if (Array.isArray(chargeField)) {
              values.chargeIds = JSON.stringify(chargeField.map((item: any) => item.value));
              values.chargeNames = JSON.stringify(chargeField.map((item: any) => item.label));
            }
          } else if (values.chargeIds) {
            // Formily 已自动拆分，转换为 JSON 字符串
            if (Array.isArray(values.chargeIds)) {
              values.chargeIds = JSON.stringify(values.chargeIds);
              values.chargeNames = JSON.stringify(values.chargeNames || []);
            }
          }

          // 处理复合字段 - 处理人
          if (values['{value:processIds,label:processNames}']) {
            const processField = values['{value:processIds,label:processNames}'];
            if (Array.isArray(processField)) {
              values.processIds = JSON.stringify(processField.map((item: any) => item.value));
              values.processNames = JSON.stringify(processField.map((item: any) => item.label));
            }
          } else if (values.processIds) {
            // Formily 已自动拆分，转换为 JSON 字符串
            if (Array.isArray(values.processIds)) {
              values.processIds = JSON.stringify(values.processIds);
              values.processNames = JSON.stringify(values.processNames || []);
            }
          }

          // 清理不需要的字段
          delete values['{value:taskTypeCode,label:taskTypeName}'];
          delete values['{value:chargeIds,label:chargeNames}'];
          delete values['{value:processIds,label:processNames}'];

              // 调用 API
              if (entityId) {
                // 更新
                await ProjectTaskUpdateAsync({ id: entityId }, values);
                message.success('任务更新成功');
              } else {
                // 新建
                await ProjectTaskCreateAsync(values);
                message.success('任务创建成功');
              }

              // 触发回调
              onAfterSubmit?.();

              return values;
            } catch (error: any) {
              message.error(error.message || '操作失败');
              throw error;
            }
          })
          .open()
          // 某些场景（如右键菜单）下如果 open 被打断/抛错，至少给出可见错误提示
          .catch((e: any) => {
            console.error('[TaskFormDialog] open failed:', e);
            message.error('打开任务弹窗失败，请查看控制台错误');
          });
      } catch (e: any) {
        console.error('[TaskFormDialog] create/open failed:', e);
        message.error('打开任务弹窗失败，请查看控制台错误');
      }
    };
  }, [SchemaField]);
};

const TaskFormDialog: React.FC<TaskFormDialogProps> = (props) => {
  const { entityId, title, buttonProps, onAfterSubmit, defaultValues } = props;
  const openTaskFormDialog = useTaskFormDialog();

  return (
    <Button
      {...buttonProps}
      onClick={() => openTaskFormDialog({ entityId, title, onAfterSubmit, defaultValues })}
    >
      {buttonProps?.children || (entityId ? '编辑' : '新建任务')}
    </Button>
  );
};

export default TaskFormDialog;
