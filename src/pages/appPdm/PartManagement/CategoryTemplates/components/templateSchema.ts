import { ISchema } from '@formily/react';

export const templateFormId: string = 'Pdm.CategoryLevelTemplate';

export const templateFormSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 16,
    labelWidth: '100px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 1, strictAutoFit: true },
        properties: {
          templateName: {
            type: 'string',
            title: '模板名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '请输入模板名称', maxLength: 64 },
          },
          description: {
            type: 'string',
            title: '模板描述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': { placeholder: '请输入模板描述', rows: 3, maxLength: 256 },
          },
          defaultSeparator: {
            type: 'string',
            title: '默认分隔符',
            default: '-',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '用于编码拼接时各层级之间的连接符',
            },
            'x-component': 'Input',
            'x-component-props': { placeholder: '如: -, _, .', maxLength: 4, style: { width: 120 } },
          },
          isActive: {
            type: 'boolean',
            title: '是否启用',
            default: true,
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
        },
      },
    },
  },
};
