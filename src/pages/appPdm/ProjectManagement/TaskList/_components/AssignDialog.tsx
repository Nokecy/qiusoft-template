import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';
import { Form, Input, Select } from '@formily/antd-v5';
import { message } from 'antd';
import { useIntl } from 'umi';
import { SwapOutlined } from '@ant-design/icons';
// import { ProjectTaskAssignAsync } from '@/services/pdm/ProjectTask';

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    Input,
    Select,
  },
});

interface AssignDialogProps {
  taskId: string;
  currentHandler?: string;
  onSuccess?: () => void;
}

/**
 * 指派任务弹窗
 */
const AssignDialog: React.FC<AssignDialogProps> = ({ taskId, currentHandler, onSuccess }) => {
  const intl = useIntl();

  const schema = {
    type: 'object',
    properties: {
      handlerCode: {
        type: 'string',
        title: '处理人',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择处理人',
          showSearch: true,
        },
      },
      remark: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入备注说明',
          rows: 4,
          maxLength: 500,
          showCount: true,
        },
      },
    },
  };

  const handleAssign = () => {
    FormDialog.Portal(
      {
        title: '指派任务',
        width: 600,
      },
      (form) => {
        return (
          <FormLayout labelCol={6} wrapperCol={16}>
            <SchemaField schema={schema} />
          </FormLayout>
        );
      },
    )
      .forConfirm(async (payload, next) => {
        try {
          // TODO: 等待后端API更新后，取消注释
          // await ProjectTaskAssignAsync({ id: taskId }, payload.values);

          console.log('指派任务参数：', { id: taskId, ...payload.values });
          message.warning('指派API尚未实现，请等待后端更新');
        } catch (error) {
          message.error('指派失败');
          throw error;
        }
      })
      .open();
  };

  return (
    <a onClick={handleAssign}>
      <SwapOutlined /> 指派
    </a>
  );
};

export default AssignDialog;
