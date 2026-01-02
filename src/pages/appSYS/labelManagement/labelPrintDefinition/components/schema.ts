import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.labelPrintDefinition';

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
          '{value:feature,label:featureName}': {
            type: 'string',
            title: '打印功能',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'PrintFeatureSelect',
            'x-component-props': {
              placeholder: '请选择打印功能',
              code: true,
            },
          },
          '{value:labelTypeCode,label:labelTypeName}': {
            type: 'string',
            title: '标签类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'LabelTypeSelect',
            'x-component-props': {
              placeholder: '请选择标签类型',
              code: true,
            },
          },
          order: {
            type: 'number',
            title: '顺序',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入顺序',
              min: 0,
              precision: 0,
            },
          },
        },
      },
    },
  },
};
