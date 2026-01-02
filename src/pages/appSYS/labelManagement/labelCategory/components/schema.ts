import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.labelCategory';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '100px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      gridLayout: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 1,
          strictAutoFit: true,
        },
        properties: {
          codeColumn: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              code: {
                type: 'string',
                title: '编码',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入编码',
                },
              },
            },
          },
          nameColumn: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              name: {
                type: 'string',
                title: '名称',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入名称',
                },
              },
            },
          },
          remarkColumn: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              remark: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入备注',
                  rows: 3,
                },
              },
            },
          },
        },
      },
    },
  },
};
