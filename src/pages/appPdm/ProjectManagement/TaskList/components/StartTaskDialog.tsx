import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { Button, message } from 'antd';
import { ProjectTaskStartTaskAsync } from '@/services/pdm/ProjectTask';
import { FormItem } from '@formily/antd-v5';
import ProjectTeamMemberSelect from '@/pages/appPdm/_formWidgets/ProjectTeamMemberSelect';
import { createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    ProjectTeamMemberSelect,
  },
});

interface StartTaskDialogProps {
  taskId: string;
  projectCode?: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

const StartTaskDialog: React.FC<StartTaskDialogProps> = ({
  taskId,
  projectCode,
  onSuccess,
  buttonProps,
}) => {

  const schema = {
    type: 'object',
    properties: {
      executorInfo: {
        type: 'string',
        title: '实际执行人',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'ProjectTeamMemberSelect',
        'x-component-props': {
          placeholder: '请选择项目团队成员',
          projectCode: projectCode,
          labelInValue: true,
        },
      },
    },
  };

  const portalId = `ProjectTask.StartTask.${taskId}`;

  const handleClick = () => {
    const formDialog = FormDialog(
      {
        title: '开始任务',
        width: 600,
      },
      portalId,
      () => {
        return (
          <FormLayout labelCol={6} wrapperCol={18}>
            <SchemaField schema={schema} />
          </FormLayout>
        );
      },
    );

    formDialog
      .forConfirm(async (payload, next) => {
        const hide = message.loading('正在开始任务...', 0);
        try {
          const executorInfo = payload.values.executorInfo;

          await ProjectTaskStartTaskAsync({
            taskId,
            actualExecutorId: executorInfo?.value || executorInfo,
            actualExecutorName: executorInfo?.label || '',
          });

          message.success('任务已开始');
          onSuccess?.();
          await next();
        } catch (error: any) {
          message.error(`开始任务失败: ${error.message || '未知错误'}`);
          throw error;
        } finally {
          hide();
        }
      })
      .open();
  };

  return (
    <FormDialog.Portal id={portalId}>
      <Button {...buttonProps} onClick={handleClick} />
    </FormDialog.Portal>
  );
};

export default StartTaskDialog;
