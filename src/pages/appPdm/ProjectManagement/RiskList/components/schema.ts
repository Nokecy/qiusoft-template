import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectRisk';

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
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
          projectCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectCode: {
                type: 'string',
                title: '关联项目编码',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectSelect',
                'x-component-props': { placeholder: '请选择项目', fieldNames: { label: 'projectName', value: 'projectCode' } },
                required: true,
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          name: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              name: {
                type: 'string',
                title: '风险名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入风险名称' },
                required: true,
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          description: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '风险描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { placeholder: '请输入风险描述', rows: 3 },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          priority: {
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
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          '{value:riskTypeCode,label:riskTypeName}': {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:riskTypeCode,label:riskTypeName}': {
                type: 'string',
                title: '风险类型',
                'x-decorator': 'FormItem',
                'x-component': 'RiskTypeSelect',
                'x-component-props': {
                  placeholder: '请选择风险类型',
                  labelInValue: true
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          handlerCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              handlerCode: {
                type: 'string',
                title: '处理人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择处理人',
                  valueField: 'userName',
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          consequence: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              consequence: {
                type: 'string',
                title: '风险后果描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { placeholder: '请输入风险后果描述', rows: 2 },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          '{value:milestoneId,label:milestoneName}': {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              '{value:milestoneId,label:milestoneName}': {
                type: 'string',
                title: '影响的里程碑',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectMilestoneSelect',
                'x-component-props': {
                  placeholder: '请选择影响的里程碑',
                  labelInValue: true
                },
                'x-reactions': [
                  {
                    dependencies: ['projectCode'],
                    when: '{{$deps[0]}}',
                    fulfill: {
                      state: {
                        componentProps: {
                          projectCode: '{{$deps[0]}}',
                        },
                      },
                    },
                    otherwise: {
                      state: {
                        componentProps: {
                          projectCode: null,
                        },
                      },
                    },
                  },
                  {
                    fulfill: {
                      state: {
                        pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                      },
                    },
                  },
                ],
              },
            },
          },
          enableReview: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              enableReview: {
                type: 'boolean',
                title: '是否启用评审流程',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          watchUserCodes: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              watchUserCodes: {
                type: 'array',
                title: '关注人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择关注人',
                  mode: 'multiple',
                  // 使用默认的 id 字段,不指定 valueField
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: "{{$workflowInfo && $workflowInfo.currentActivityName ? 'readPretty' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// 只读模式的反应配置
const readOnlyReaction = {
  fulfill: {
    state: {
      pattern: 'readPretty' as const
    }
  }
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
                title: '风险名称',
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
              riskTypeName: {
                type: 'string',
                title: '风险类型',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'riskTypeName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col4: {
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
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              handlerName: {
                type: 'string',
                title: '处理人',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'handlerName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              milestoneName: {
                type: 'string',
                title: '影响的里程碑',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'milestoneName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '风险描述',
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
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              consequence: {
                type: 'string',
                title: '风险后果描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 2,
                },
                name: 'consequence',
                'x-reactions': readOnlyReaction,
              },
            },
          },
        },
      },
    },
  },
};
