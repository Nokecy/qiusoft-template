import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { Button, message } from 'antd';
import { ProjectTaskAssignTaskAsync } from '@/services/pdm/ProjectTask';
import { Input, FormItem } from '@formily/antd-v5';
import ProjectTeamMemberSelect from '@/pages/appPdm/_formWidgets/ProjectTeamMemberSelect';
import { createSchemaField } from '@formily/react';

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    ProjectTeamMemberSelect,
  },
});

interface AssignTaskDialogProps {
  taskId: string;
  projectCode?: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

const AssignTaskDialog: React.FC<AssignTaskDialogProps> = ({
  taskId,
  projectCode,
  onSuccess,
  buttonProps,
}) => {

  const schema = {
    type: 'object',
    properties: {
      assigneeInfo: {
        type: 'string',
        title: '指派给',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'ProjectTeamMemberSelect',
        'x-component-props': {
          placeholder: '请选择项目团队成员',
          projectCode: projectCode,
          labelInValue: true,
        },
      },
      remark: {
        type: 'string',
        title: '指派说明',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入指派说明',
          rows: 4,
        },
      },
    },
  };

  const portalId = `ProjectTask.AssignTask.${taskId}`;

  const handleClick = () => {
    const formDialog = FormDialog(
      {
        title: '指派任务',
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
        const hide = message.loading('正在指派任务...', 0);
        try {
          const assigneeInfo = payload.values.assigneeInfo;

          await ProjectTaskAssignTaskAsync({
            taskId,
            assigneeId: assigneeInfo?.value || assigneeInfo,
            assigneeName: assigneeInfo?.label || '',
            remark: payload.values.remark || '',
          });

          message.success('任务指派成功');
          onSuccess?.();
          await next();
        } catch (error: any) {
          message.error(`任务指派失败: ${error.message || '未知错误'}`);
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

export default AssignTaskDialog;
