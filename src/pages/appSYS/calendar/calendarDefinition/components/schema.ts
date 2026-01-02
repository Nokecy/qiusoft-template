import { ISchema } from '@formily/react';

export const formId = 'calendarDefinition_Form';

export const formSchema: { form: any; schema: ISchema } = {
  form: {
    labelWidth: 120,
    layout: 'horizontal',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          minColumns: 1,
          strictAutoFit: true,
        },
        properties: {
          name: {
            type: 'string',
            title: '名称',
            required: true,
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              placeholder: '请输入日历名称',
            },
          },
          description: {
            type: 'string',
            title: '描述',
            'x-component': 'Input.TextArea',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              placeholder: '请输入描述信息',
              rows: 2,
            },
          },
          isDefault: {
            type: 'boolean',
            title: '设为默认',
            'x-component': 'Switch',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              checkedChildren: '是',
              unCheckedChildren: '否',
            },
          },
        },
      },
    },
  },
};
