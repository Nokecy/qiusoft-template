import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectChange';

export const form: Record<string, any> = {
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
            'x-component-props': { gridSpan: 2 },
            properties: {
              name: {
                type: 'string',
                title: '变更名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入变更名称' },
                required: true,
                name: 'name',
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:projectCode,label:projectName}': {
                type: 'string',
                title: '关联项目',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectSelect',
                'x-component-props': {
                  placeholder: '请选择项目',
                  labelInValue: true,
                  valueField: 'projectCode',
                },
                name: '{value:projectCode,label:projectName}',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:requesterCode,label:requesterName}': {
                type: 'string',
                title: '申请人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择申请人',
                  labelInValue: true,
                  valueField: 'userName',
                },
                name: '{value:requesterCode,label:requesterName}',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:ownerCode,label:ownerName}': {
                type: 'string',
                title: '负责人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择负责人',
                  labelInValue: true,
                  valueField: 'userName',
                },
                required: true,
                name: '{value:ownerCode,label:ownerName}',
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              changeType: {
                type: 'number',
                title: '变更类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择变更类型',
                  options: [
                    { label: '范围变更', value: 0 },
                    { label: '进度变更', value: 10 },
                    { label: '成本变更', value: 20 },
                    { label: '质量变更', value: 30 },
                    { label: '资源变更', value: 40 },
                    { label: '其他', value: 99 },
                  ],
                },
                required: true,
                name: 'changeType',
              },
            },
          },
          col5_2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              priority: {
                type: 'number',
                title: '优先级',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择优先级',
                  options: [
                    { label: '低', value: 0 },
                    { label: '中', value: 10 },
                    { label: '高', value: 20 },
                    { label: '紧急', value: 30 },
                  ],
                },
                required: true,
                name: 'priority',
              },
            },
          },
          col5_3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              plannedImplementationDate: {
                type: 'string',
                title: '计划实施日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择计划实施日期',
                  style: { width: '100%' },
                },
                name: 'plannedImplementationDate',
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '变更描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入变更描述',
                  rows: 3,
                },
                name: 'description',
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              reason: {
                type: 'string',
                title: '变更原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入变更原因',
                  rows: 3,
                },
                name: 'reason',
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              impactAnalysis: {
                type: 'string',
                title: '影响分析',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入变更影响分��',
                  rows: 3,
                },
                name: 'impactAnalysis',
              },
            },
          },
          col9: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              attachments: {
                type: 'array',
                title: '附件列表',
                'x-decorator': 'FormItem',
                'x-component': 'MultiAttachmentUpload',
                'x-component-props': {
                  maxSize: 50,
                  maxCount: 10,
                  description: '支持多个文件上传',
                  entityTypeName: 'ProjectChange',
                },
                name: 'attachments',
              },
            },
          },
        },
      },
    },
  },
};

// 执行页面专用Schema - 所有字段只读,并显示项目名称而非复合字段
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
              name: {
                type: 'string',
                title: '变更名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'name',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectName: {
                type: 'string',
                title: '关联项目',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'projectName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              requesterName: {
                type: 'string',
                title: '申请人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'requesterName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              ownerName: {
                type: 'string',
                title: '负责人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'ownerName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              changeType: {
                type: 'number',
                title: '变更类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: [
                    { label: '范围变更', value: 0 },
                    { label: '进度变更', value: 10 },
                    { label: '成本变更', value: 20 },
                    { label: '质量变更', value: 30 },
                    { label: '资源变更', value: 40 },
                    { label: '其他', value: 99 },
                  ],
                },
                name: 'changeType',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col5_2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              priority: {
                type: 'number',
                title: '优先级',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: [
                    { label: '低', value: 0 },
                    { label: '中', value: 10 },
                    { label: '高', value: 20 },
                    { label: '紧急', value: 30 },
                  ],
                },
                name: 'priority',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col5_3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              plannedImplementationDate: {
                type: 'string',
                title: '计划实施日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  style: { width: '100%' },
                  format: 'YYYY-MM-DD',
                },
                name: 'plannedImplementationDate',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '变更描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 3,
                },
                name: 'description',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              reason: {
                type: 'string',
                title: '变更原因',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 3,
                },
                name: 'reason',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              impactAnalysis: {
                type: 'string',
                title: '影响分析',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 3,
                },
                name: 'impactAnalysis',
                'x-reactions': readOnlyReaction,
              },
            },
          },
        },
      },
    },
  },
};
