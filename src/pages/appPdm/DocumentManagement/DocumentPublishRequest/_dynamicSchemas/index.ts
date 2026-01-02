/**
 * 文档发布申请单动态表单 Schema
 */
import type { DynamicSchemaDefinition } from '@/dynamicSchemas/types';

/**
 * 文档发布申请单 - 创建/编辑表单
 */
const documentPublishRequestForm: DynamicSchemaDefinition = {
  scenarioKey: 'documentPublishRequest:form',
  label: '文档发布申请单表单',
  description: '文档发布申请单创建和编辑表单',
  form: {
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: 120,
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          minColumns: 2,
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties: {
          // 基本信息
          colRequestNumber: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              requestNumber: {
                type: 'string',
                title: '申请单号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '系统自动生成',
                  disabled: true,
                },
              },
            },
          },

          colTitle: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              title: {
                type: 'string',
                title: '申请标题',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入申请标题',
                  maxLength: 200,
                },
              },
            },
          },

          colDocumentId: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              documentId: {
                type: 'string',
                title: '关联文档',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'DocumentSelect',
                'x-component-props': {
                  placeholder: '请选择关联文档',
                },
              },
            },
          },

          colDocumentVersion: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              documentVersion: {
                type: 'string',
                title: '文档版本',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入文档版本',
                  maxLength: 50,
                },
              },
            },
          },

          colPublishType: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              publishType: {
                type: 'number',
                title: '发布类型',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Radio.Group',
                enum: [
                  { label: '正式发布', value: 0 },
                  { label: '试发布', value: 1 },
                ],
                default: 0,
              },
            },
          },

          colEffectiveDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              effectiveDate: {
                type: 'string',
                title: '生效日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择生效日期',
                  style: { width: '100%' },
                },
              },
            },
          },

          colTargetAudience: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              targetAudience: {
                type: 'string',
                title: '目标受众',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入目标受众',
                  maxLength: 100,
                },
              },
            },
          },

          colPublishReason: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              publishReason: {
                type: 'string',
                title: '发布原因',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入发布原因',
                  rows: 3,
                  maxLength: 500,
                },
              },
            },
          },

          colRemarks: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入备注信息',
                  rows: 2,
                  maxLength: 500,
                },
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 文档发布申请单 - 详情展示
 */
const documentPublishRequestDetail: DynamicSchemaDefinition = {
  scenarioKey: 'documentPublishRequest:detail',
  label: '文档发布申请单详情',
  description: '文档发布申请单详情展示（只读）',
  form: {
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: 120,
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          minColumns: 2,
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties: {
          // 基本信息
          colRequestNumber: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              requestNumber: {
                type: 'string',
                title: '申请单号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colStatus: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              status: {
                type: 'number',
                title: '状态',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-pattern': 'readPretty',
              },
            },
          },

          colTitle: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              title: {
                type: 'string',
                title: '申请标题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colDocumentName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              documentName: {
                type: 'string',
                title: '关联文档',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colDocumentVersion: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              documentVersion: {
                type: 'string',
                title: '文档版本',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colPublishType: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              publishType: {
                type: 'number',
                title: '发布类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-pattern': 'readPretty',
              },
            },
          },

          colEffectiveDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              effectiveDate: {
                type: 'string',
                title: '生效日期',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colTargetAudience: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              targetAudience: {
                type: 'string',
                title: '目标受众',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colPublishReason: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              publishReason: {
                type: 'string',
                title: '发布原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-pattern': 'readPretty',
              },
            },
          },

          colRemarks: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-pattern': 'readPretty',
              },
            },
          },

          colCreator: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              creator: {
                type: 'string',
                title: '创建人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colCreationTime: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              creationTime: {
                type: 'string',
                title: '创建时间',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 文档发布申请单 - 审批表单
 */
const documentPublishRequestExecute: DynamicSchemaDefinition = {
  scenarioKey: 'documentPublishRequest:execute',
  label: '文档发布申请单审批',
  description: '文档发布申请单工作流审批表单',
  form: {
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: 120,
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          minColumns: 2,
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties: {
          // 基本信息 - 所有字段只读
          colTitle: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              title: {
                type: 'string',
                title: '申请标题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colDocumentName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              documentName: {
                type: 'string',
                title: '关联文档',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colDocumentVersion: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              documentVersion: {
                type: 'string',
                title: '文档版本',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colPublishType: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              publishType: {
                type: 'number',
                title: '发布类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-pattern': 'readPretty',
              },
            },
          },

          colEffectiveDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              effectiveDate: {
                type: 'string',
                title: '生效日期',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colTargetAudience: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              targetAudience: {
                type: 'string',
                title: '目标受众',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
              },
            },
          },

          colPublishReason: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              publishReason: {
                type: 'string',
                title: '发布原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-pattern': 'readPretty',
              },
            },
          },

          colRemarks: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-pattern': 'readPretty',
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 导出所有 Schema 定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  documentPublishRequestForm,
  documentPublishRequestDetail,
  documentPublishRequestExecute,
];
