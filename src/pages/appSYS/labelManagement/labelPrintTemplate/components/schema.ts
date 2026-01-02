import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.labelPrintTemplate';

// 模板类型枚举
const templateTypeEnum = [
  { label: 'Report', value: 5 },
  { label: 'ZPL', value: 10 },
  { label: 'EPL', value: 15 },
  { label: 'CPCL', value: 20 },
  { label: 'TSPL', value: 25 },
];

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '120px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      gridLayout: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          strictAutoFit: true,
        },
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
          width: {
            type: 'number',
            title: '宽度',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入宽度',
              min: 0,
              precision: 2,
            },
          },
          height: {
            type: 'number',
            title: '高度',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入高度',
              min: 0,
              precision: 2,
            },
          },
          templateType: {
            type: 'number',
            title: '模板类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择模板类型',
            },
            enum: templateTypeEnum,
          },
          content: {
            type: 'string',
            title: '模板内容',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              placeholder: '请输入模板内容',
              rows: 5,
            },
          },
        },
      },
    },
  },
};
