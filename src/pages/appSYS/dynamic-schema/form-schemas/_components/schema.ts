/**
 * 表单设计管理 - 表单Schema定义
 */
import { ISchema } from '@formily/react';
import { formSchemaSourceTypeEnum, FormSchemaSourceType } from '../../_enums';

export const formId: string = 'FormSchema';

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
          sourceType: {
            type: 'number',
            title: '来源类型',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: formSchemaSourceTypeEnum.map((item) => ({
              label: item.label,
              value: item.value,
            })),
            'x-component-props': {
              placeholder: '请选择来源类型',
            },
            default: FormSchemaSourceType.Standalone,
          },
          scenarioKey: {
            type: 'string',
            title: '场景Key',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'ScenarioSelector',
            'x-component-props': {
              placeholder: '请选择或输入场景Key（如：default、create、edit）',
              allowCustom: true,
            },
            default: 'default',
          },
          schemaJson: {
            type: 'string',
            title: 'Schema JSON',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              placeholder: '请输入 Formily Schema JSON（可选，留空将使用默认模板）',
              rows: 6,
            },
          },
          remark: {
            type: 'string',
            title: '备注',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              placeholder: '请输入备注',
              rows: 2,
            },
          },
        },
      },
    },
  },
};
