import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.labelTypeAdvancedSetting';

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
          labelCode: {
            type: 'string',
            title: '标签编码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入标签编码',
            },
          },
          labelName: {
            type: 'string',
            title: '标签名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入标签名称',
            },
          },
          sort: {
            type: 'number',
            title: '排序',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入排序',
              min: 0,
              precision: 0,
            },
          },
          providerName: {
            type: 'string',
            title: '提供商名称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入提供商名称',
            },
          },
          labelTemplateId: {
            type: 'string',
            title: '标签模板ID',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入标签模板ID',
            },
          },
          labelTemplateName: {
            type: 'string',
            title: '标签模板名称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入标签模板名称',
            },
          },
          providerDescribe: {
            type: 'string',
            title: '提供商描述',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              placeholder: '请输入提供商描述',
              rows: 3,
            },
          },
        },
      },
    },
  },
};
