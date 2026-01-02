import { ISchema } from '@formily/react'
import { documentCheckInRequestStatusEnum } from '../_enums'

export const formId = 'Pdm.DocumentManagement.DocumentCheckInRequest'

export const form = {
  labelWidth: 100,
  feedbackLayout: 'none',
}

// 只读模式的反应配置
const readOnlyReaction = {
  fulfill: {
    state: {
      pattern: 'readPretty' as const
    }
  }
}

/**
 * 执行页面专用Schema - 所有字段只读
 * 用于工作流审批页面展示检入申请单信息
 */
export const executeFormSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: '100px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              requestNumber: {
                type: 'string',
                title: '申请单号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'requestNumber',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              applicantName: {
                type: 'string',
                title: '申请人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'applicantName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              applicationTime: {
                type: 'string',
                title: '申请时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                },
                name: 'applicationTime',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              processorName: {
                type: 'string',
                title: '处理人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'processorName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              workflowStatus: {
                type: 'number',
                title: '状态',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: documentCheckInRequestStatusEnum.map(item => ({
                    label: item.label,
                    value: item.value,
                  })),
                },
                name: 'workflowStatus',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              reason: {
                type: 'string',
                title: '申请原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3 },
                name: 'reason',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remark: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3 },
                name: 'remark',
                'x-reactions': readOnlyReaction,
              },
            },
          },
        },
      },
    },
  },
}
