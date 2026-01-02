import { ISchema } from '@formily/react'

export const formId = 'Pdm.ChangeManagement.EngineeringChangeNotification'

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
          notificationTypeCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              notificationType: {
                type: 'string',
                title: '通知类型',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入通知类型' },
                name: 'notificationType',
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
          requiresAckCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              requiresAcknowledgment: {
                type: 'boolean',
                title: '需确认',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'requiresAcknowledgment',
              },
            },
          },
          targetRecipientsCol: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              targetRecipients: {
                type: 'string',
                title: '接收人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入接收人' },
                name: 'targetRecipients',
                required: true,
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
