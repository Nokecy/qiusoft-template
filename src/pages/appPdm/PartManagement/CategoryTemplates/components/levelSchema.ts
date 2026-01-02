import { ISchema } from '@formily/react';

export const levelFormId: string = 'Pdm.CategoryLevel';

export const levelFormSchema: { form: Record<string, any>; schema: ISchema } = {
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
          levelOrder: {
            type: 'number',
            title: '层级序号',
            required: true,
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '层级从1开始，按顺序递增',
            },
            'x-component': 'NumberPicker',
            'x-component-props': { placeholder: '请输入层级序号', min: 1, precision: 0, style: { width: '100%' } },
          },
          levelName: {
            type: 'string',
            title: '层级名称',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '如：大类、小类、细类', maxLength: 32 },
          },
          isCodeParticipant: {
            type: 'boolean',
            title: '参与编码',
            default: true,
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '是否参与编码拼接',
            },
            'x-component': 'Switch',
          },
        },
      },
    },
  },
};
