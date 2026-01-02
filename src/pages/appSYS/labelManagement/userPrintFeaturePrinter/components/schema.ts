import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.userPrintFeaturePrinter';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '140px',
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
          userId: {
            type: 'string',
            title: '用户ID',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入用户ID',
            },
          },
          labelPrintDefinitionId: {
            type: 'string',
            title: '标签打印定义ID',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入标签打印定义ID',
            },
          },
          printerClientId: {
            type: 'string',
            title: '打印客户端ID',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入打印客户端ID',
            },
          },
          printerClientDisplayName: {
            type: 'string',
            title: '打印客户端名称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入打印客户端名称',
            },
          },
          printerId: {
            type: 'string',
            title: '打印机ID',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入打印机ID',
            },
          },
          printerName: {
            type: 'string',
            title: '打印机名称',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入打印机名称',
            },
          },
        },
      },
    },
  },
};
