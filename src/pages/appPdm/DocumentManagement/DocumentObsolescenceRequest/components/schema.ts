import { ISchema } from '@formily/react';
import { obsolescenceReasonTypeEnum } from '../_enums';

export const formId = 'Pdm.DocumentManagement.DocumentObsolescenceRequest';

export const form = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

// 只读模式的反应配置
const readOnlyReaction = {
  fulfill: {
    state: {
      pattern: 'readPretty' as const
    }
  }
};

/**
 * 执行页面专用Schema - 所有字段只读
 * 用于工作流审批页面展示文档作废申请信息
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
                title: '申请单编号',
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
            'x-component-props': { gridSpan: 2 },
            properties: {
              title: {
                type: 'string',
                title: '申请标题',
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
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '申请说明',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2 },
                name: 'description',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              documentNumber: {
                type: 'string',
                title: '文档编号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'documentNumber',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              documentName: {
                type: 'string',
                title: '文档名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'documentName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              documentVersion: {
                type: 'string',
                title: '文档版本号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'documentVersion',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              effectiveDate: {
                type: 'string',
                title: '失效时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                },
                name: 'effectiveDate',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              reasonType: {
                type: 'number',
                title: '作废原因类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: obsolescenceReasonTypeEnum.map(item => ({
                    label: item.label,
                    value: item.value,
                  })),
                },
                name: 'reasonType',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col9: {
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
                    { label: '待提交', value: 0 },
                    { label: '审批中', value: 10 },
                    { label: '已批准', value: 20 },
                    { label: '已拒绝', value: 30 },
                    { label: '已撤回', value: 40 },
                  ],
                },
                name: 'status',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              reasonDescription: {
                type: 'string',
                title: '详细说明',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 3 },
                name: 'reasonDescription',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col11: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              impactScope: {
                type: 'string',
                title: '影响范围',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 2 },
                name: 'impactScope',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col12: {
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
          col13: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              creationTime: {
                type: 'string',
                title: '创建时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                },
                name: 'creationTime',
                'x-reactions': readOnlyReaction,
              },
            },
          },
        },
      },
    },
  },
};
