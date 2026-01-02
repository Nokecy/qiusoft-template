/**
 * 动态应用管理 - 表单Schema定义
 */
import { ISchema } from '@formily/react';

export const formId: string = 'DynamicApplication';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 18,
    feedbackLayout: 'none',
    labelWidth: '80px',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 1,
          strictAutoFit: true,
        },
        properties: {
          name: {
            type: 'string',
            title: '应用标识',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入应用标识（英文字母、数字）',
            },
            'x-validator': [
              { required: true, message: '请输入应用标识' },
              {
                pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                message: '只能包含字母、数字和下划线，且以字母开头',
              },
            ],
          },
          displayName: {
            type: 'string',
            title: '显示名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入显示名称',
            },
          },
          description: {
            type: 'string',
            title: '描述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              placeholder: '请输入应用描述',
              rows: 3,
            },
          },
          icon: {
            type: 'string',
            title: '图标',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入图标名称',
            },
          },
          displayOrder: {
            type: 'number',
            title: '排序',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '排序号',
              style: { width: '100%' },
            },
            default: 0,
          },
          workflowEnabled: {
            type: 'boolean',
            title: '启用工作流',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: false,
          },
          workflowName: {
            type: 'string',
            title: '工作流名称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入工作流名称',
            },
            'x-reactions': [
              {
                dependencies: ['workflowEnabled'],
                fulfill: {
                  state: {
                    visible: '{{$deps[0] === true}}',
                    required: '{{$deps[0] === true}}',
                  },
                },
              },
            ],
            'x-validator': [
              {
                triggerType: 'onBlur',
                validator: (value: string, rule: any, ctx: any) => {
                  const workflowEnabled = ctx.form.values?.workflowEnabled;
                  if (workflowEnabled && !value) {
                    return '启用工作流时，工作流名称必填';
                  }
                  return '';
                },
              },
            ],
          },
        },
      },
    },
  },
};
