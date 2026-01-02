import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectIssue';

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
                title: '问题名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入问题名称' },
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
          '{value:milestoneId,label:milestoneName}': {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:milestoneId,label:milestoneName}': {
                type: 'string',
                title: '关联里程碑',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectMilestoneSelect',
                'x-component-props': {
                  placeholder: '请选择关联里程碑',
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
          taskCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              taskCode: {
                type: 'string',
                title: '关联任务',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectTaskSelect',
                'x-component-props': {
                  placeholder: '请选择关联任务',
                  fieldNames: { label: 'taskName', value: 'taskCode' }
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
          severity: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              severity: {
                type: 'number',
                title: '严重程度',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择严重程度',
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
          urgency: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              urgency: {
                type: 'number',
                title: '紧急程度',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择紧急程度',
                  options: [
                    { label: '低', value: 0 },
                    { label: '中', value: 10 },
                    { label: '高', value: 20 },
                  ],
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
          requiresApproval: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              requiresApproval: {
                type: 'boolean',
                title: '是否需要审批',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {
                  checkedChildren: '需要',
                  unCheckedChildren: '不需要',
                },
                default: true,
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
          expectedResolvedDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              expectedResolvedDate: {
                type: 'string',
                title: '期望解决日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择期望解决日期',
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
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
            'x-component-props': { gridSpan: 2 },
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
          description: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '问题说明',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { placeholder: '请输入问题说明', rows: 4 },
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
          remark: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remark: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { placeholder: '请输入备注', rows: 3 },
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
                type: 'string',
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
                title: '问题名称',
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
              milestoneName: {
                type: 'string',
                title: '关联里程碑',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'milestoneName',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              taskCode: {
                type: 'string',
                title: '关联任务',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                name: 'taskCode',
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
              severity: {
                type: 'number',
                title: '严重程度',
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
                name: 'severity',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              urgency: {
                type: 'number',
                title: '紧急程度',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  options: [
                    { label: '低', value: 0 },
                    { label: '中', value: 10 },
                    { label: '高', value: 20 },
                  ],
                },
                name: 'urgency',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col7_1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              requiresApproval: {
                type: 'boolean',
                title: '是否需要审批',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {
                  checkedChildren: '需要',
                  unCheckedChildren: '不需要',
                },
                name: 'requiresApproval',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              expectedResolvedDate: {
                type: 'string',
                title: '期望解决日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                  style: { width: '100%' },
                },
                name: 'expectedResolvedDate',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col9: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '问题说明',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 4,
                },
                name: 'description',
                'x-reactions': readOnlyReaction,
              },
            },
          },
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remark: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  rows: 3,
                },
                name: 'remark',
                'x-reactions': readOnlyReaction,
              },
            },
          },
        },
      },
    },
  },
};
