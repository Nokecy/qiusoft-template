import { ISchema } from '@formily/react'

export const formId = 'Pdm.ChangeManagement.DocumentChangeOrder'

export const form = {
  labelWidth: 100,
  feedbackLayout: 'none',
}

/**
 * 快速新建表单Schema
 * 对应API: CreateDocumentChangeOrderDto
 */
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
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              title: {
                type: 'string',
                title: '变更主题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入变更主题' },
                name: 'title',
                required: true,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              '{value:initiatorId,label:initiatorName}': {
                type: 'string',
                title: '发起人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择发起人',
                  labelInValue: true,
                },
                name: 'initiatorId',
                required: true,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              initiationTime: {
                type: 'string',
                title: '发起时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择发起时间',
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                },
                name: 'initiationTime',
                required: true,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              '{value:assignedToUserId,label:assignedToUserName}': {
                type: 'string',
                title: '处理人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择处理人',
                  labelInValue: true,
                },
                name: 'assignedToUserId',
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              changeReason: {
                type: 'string',
                title: '变更原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入变更原因' },
                name: 'changeReason',
                required: true,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3, placeholder: '请输入备注' },
                name: 'remarks',
              },
            },
          },
        },
      },
    },
  },
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
 * 用于工作流审批页面展示变更单信息
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
              changeOrderNumber: {
                type: 'string',
                title: '变更单号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'changeOrderNumber',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              title: {
                type: 'string',
                title: '变更主题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'title',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              initiatorName: {
                type: 'string',
                title: '发起人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'initiatorName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              initiationTime: {
                type: 'string',
                title: '发起时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                },
                name: 'initiationTime',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              assignedToUserName: {
                type: 'string',
                title: '处理人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'assignedToUserName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              status: {
                type: 'number',
                title: '状态',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: [
                    { label: '草稿', value: 0 },
                    { label: '待审批', value: 10 },
                    { label: '审批中', value: 20 },
                    { label: '已批准', value: 30 },
                    { label: '已拒绝', value: 40 },
                  ],
                },
                name: 'status',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              changeReason: {
                type: 'string',
                title: '变更原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3 },
                name: 'changeReason',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3 },
                name: 'remarks',
                'x-reactions': readOnlyReaction,
              },
            },
          },
        },
      },
    },
  },
}
