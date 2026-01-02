import { ISchema } from '@formily/react';

export const formId: string = 'labelManagement.labelType';

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
          '{value:categoryCode,label:categoryName}': {
            type: 'string',
            title: '分类',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'LabelCategorySelect',
            'x-component-props': {
              placeholder: '请选择分类',
              code: true,
            },
          },
          '{value:defaultPrintTemplateId,label:defaultPrintTemplateName}': {
            type: 'string',
            title: '默认打印模板',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'PrintTemplateSelect',
            'x-component-props': {
              placeholder: '请选择默认打印模板',
              valueField: 'name',
            },
          },
          defaultPrintQuantity: {
            type: 'number',
            title: '默认打印数量',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入默认打印数量',
              min: 1,
              precision: 0,
            },
          },
          remark: {
            type: 'string',
            title: '备注',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              placeholder: '请输入备注',
              rows: 3,
            },
          },
        },
      },
    },
  },
};
