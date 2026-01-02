import { ISchema } from '@formily/react'

export const formId = 'Pdm.ChangeManagement.EngineeringChangeOrder'

const reasonCategoryOptions = [
  { label: '设计优化', value: 1 },
  { label: '质量问题', value: 2 },
  { label: '法规合规', value: 3 },
  { label: '客户需求', value: 4 },
  { label: '材料变更', value: 5 },
  { label: '工艺改进', value: 6 },
  { label: '供应风险', value: 7 },
  { label: '其他', value: 8 },
]

const urgencyOptions = [
  { label: '低', value: 1 },
  { label: '中', value: 2 },
  { label: '高', value: 3 },
  { label: '紧急', value: 4 },
]

const riskOptions = [
  { label: '低', value: 1 },
  { label: '中', value: 2 },
  { label: '高', value: 3 },
  { label: '极高', value: 4 },
]

export const form = {
  labelWidth: 100,
  feedbackLayout: 'none',
}

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
    labelWidth: '80px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2 },
        properties: {
          titleCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              title: {
                type: 'string',
                title: '标题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入标题' },
                name: 'title',
                required: true,
              },
            },
          },
          reasonCategoryCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              reasonCategory: {
                type: 'number',
                title: '原因类别',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': { options: reasonCategoryOptions, placeholder: '请选择原因类别' },
                name: 'reasonCategory',
                required: true,
              },
            },
          },
          urgencyCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              urgencyLevel: {
                type: 'number',
                title: '优先级',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': { options: urgencyOptions, placeholder: '请选择优先级' },
                name: 'urgencyLevel',
              },
            },
          },
          riskCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              riskLevel: {
                type: 'number',
                title: '风险等级',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': { options: riskOptions, placeholder: '请选择风险等级' },
                name: 'riskLevel',
              },
            },
          },
          changeCategoryCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              changeCategory: {
                type: 'string',
                title: '变更类别',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入变更类别' },
                name: 'changeCategory',
                required: true,
              },
            },
          },
          affectsCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              affectsInterchangeability: {
                type: 'boolean',
                title: '影响互换',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'affectsInterchangeability',
              },
            },
          },
          reasonDescCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              reasonDescription: {
                type: 'string',
                title: '原因描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入原因描述' },
                name: 'reasonDescription',
                required: true,
              },
            },
          },
          descCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入描述' },
                name: 'description',
              },
            },
          },
        },
      },
    },
  },
}
