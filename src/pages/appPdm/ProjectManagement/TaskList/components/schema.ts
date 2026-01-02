import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectTask';

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
        'x-component-props': { maxColumns: 3, strictAutoFit: true },
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
          taskName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              taskName: {
                type: 'string',
                title: '任务名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入任务名称' },
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
          '{value:taskTypeCode,label:taskTypeName}': {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:taskTypeCode,label:taskTypeName}': {
                type: 'string',
                title: '任务类型',
                'x-decorator': 'FormItem',
                'x-component': 'TaskTypeSelect',
                'x-component-props': {
                  placeholder: '请选择任务类型',
                  labelInValue: true,
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
          description: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              description: {
                type: 'string',
                title: '任务描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { placeholder: '请输入任务描述', rows: 3 },
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
            'x-component-props': { gridSpan: 3 },
            properties: {
              '{value:milestoneId,label:milestoneName}': {
                type: 'string',
                title: '关联里程碑',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectMilestoneSelect',
                'x-component-props': {
                  placeholder: '请选择关联里程碑',
                  labelInValue: true,
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
          parentCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              parentCode: {
                type: 'string',
                title: '父任务编码',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectTaskSelect',
                'x-component-props': {
                  placeholder: '请选择父任务',
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
          frontMountedCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              frontMountedCode: {
                type: 'string',
                title: '前置任务编码',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectTaskSelect',
                'x-component-props': {
                  placeholder: '请选择前置任务',
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
          rearMountedCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              rearMountedCode: {
                type: 'string',
                title: '后置任务编码',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectTaskSelect',
                'x-component-props': {
                  placeholder: '请选择后置任务',
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
          status: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              status: {
                type: 'number',
                title: '任务状态',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择任务状态',
                  options: [
                    { label: '未开始', value: 0 },
                    { label: '进行中', value: 1 },
                    { label: '已完成', value: 2 },
                    { label: '受阻', value: 3 },
                    { label: '已取消', value: 4 },
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
          urgencyLevel: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              urgencyLevel: {
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
          estimatedHours: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              estimatedHours: {
                type: 'number',
                title: '预估工时',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': { placeholder: '请输入预估工时(小时)', min: 0, precision: 2 },
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
          chargeIdsArray: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              chargeIdsArray: {
                type: 'array',
                title: '负责人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择负责人',
                  mode: 'multiple',
                  showId: true,
                  labelInValue: true,
                  fieldNames: { label: 'label', value: 'value' }
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
          processIdsArray: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              processIdsArray: {
                type: 'array',
                title: '处理人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择处理人',
                  mode: 'multiple',
                  showId: true,
                  labelInValue: true,
                  fieldNames: { label: 'label', value: 'value' }
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
          taskSource: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              taskSource: {
                type: 'number',
                title: '任务来源',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择任务来源',
                  options: [
                    { label: '未设置', value: 0 },
                    { label: '会议', value: 1 },
                    { label: '项目', value: 2 },
                    { label: '记录单', value: 3 },
                    { label: '合理化建议', value: 4 },
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
          plannedStartDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              plannedStartDate: {
                type: 'string',
                title: '计划开始日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择计划开始日期',
                  style: { width: '100%' }
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
          plannedEndDate: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              plannedEndDate: {
                type: 'string',
                title: '计划结束日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择计划结束日期',
                  style: { width: '100%' }
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
          risks: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              risks: {
                type: 'array',
                title: '关联风险',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayTable',
                'x-component-props': {
                  gridKey: 'projectTask.risks',
                  scroll: { x: '100%' },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '风险标题', width: 200 },
                      properties: {
                        title: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': { placeholder: '请输入风险标题' },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '风险等级', width: 120 },
                      properties: {
                        priority: {
                          type: 'number',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            placeholder: '请选择风险等级',
                            options: [
                              { label: '低', value: 0 },
                              { label: '中', value: 10 },
                              { label: '高', value: 20 },
                              { label: '紧急', value: 30 },
                            ],
                          },
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '描述', width: 200 },
                      properties: {
                        description: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            placeholder: '请输入描述',
                            rows: 2,
                            autoSize: { minRows: 2, maxRows: 4 },
                          },
                        },
                      },
                    },
                    col4: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': {
                        title: '操作',
                        dataIndex: 'operations',
                        width: 80,
                        fixed: 'right',
                      },
                      properties: {
                        remove: {
                          type: 'void',
                          'x-component': 'ArrayTable.Remove',
                        },
                      },
                    },
                  },
                },
                properties: {
                  add: {
                    type: 'void',
                    'x-component': 'ArrayTable.Addition',
                    title: '添加风险',
                  },
                },
              },
            },
          },
          issues: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              issues: {
                type: 'array',
                title: '关联问题',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayTable',
                'x-component-props': {
                  gridKey: 'projectTask.issues',
                  scroll: { x: '100%' },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '问题标题', width: 200 },
                      properties: {
                        title: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': { placeholder: '请输入问题标题' },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '问题类型', width: 150 },
                      properties: {
                        issueCategory: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'IssueTypeSelect',
                          'x-component-props': {
                            placeholder: '请选择问题类型',
                          },
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '描述', width: 200 },
                      properties: {
                        description: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            placeholder: '请输入描述',
                            rows: 2,
                            autoSize: { minRows: 2, maxRows: 4 },
                          },
                        },
                      },
                    },
                    col4: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': {
                        title: '操作',
                        dataIndex: 'operations',
                        width: 80,
                        fixed: 'right',
                      },
                      properties: {
                        remove: {
                          type: 'void',
                          'x-component': 'ArrayTable.Remove',
                        },
                      },
                    },
                  },
                },
                properties: {
                  add: {
                    type: 'void',
                    'x-component': 'ArrayTable.Addition',
                    title: '添加问题',
                  },
                },
              },
            },
          },
          deliverables: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              deliverables: {
                type: 'array',
                title: '项目成果',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayTable',
                'x-component-props': {
                  gridKey: 'projectTask.deliverables',
                  scroll: { x: '100%' },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '成果名称', width: 200 },
                      properties: {
                        name: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': { placeholder: '请输入成果名称' },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '成果类型', width: 150 },
                      properties: {
                        deliverableType: {
                          type: 'number',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            placeholder: '请选择成果类型',
                            options: [
                              { label: '文档', value: 0 },
                              { label: '代码', value: 1 },
                              { label: '设计', value: 2 },
                              { label: '其他', value: 3 },
                            ],
                          },
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '描述', width: 200 },
                      properties: {
                        description: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            placeholder: '请输入描述',
                            rows: 2,
                            autoSize: { minRows: 2, maxRows: 4 },
                          },
                        },
                      },
                    },
                    col4: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': {
                        title: '操作',
                        dataIndex: 'operations',
                        width: 80,
                        fixed: 'right',
                      },
                      properties: {
                        remove: {
                          type: 'void',
                          'x-component': 'ArrayTable.Remove',
                        },
                      },
                    },
                  },
                },
                properties: {
                  add: {
                    type: 'void',
                    'x-component': 'ArrayTable.Addition',
                    title: '添加成果',
                  },
                },
              },
            },
          },
          attachments: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              attachments: {
                type: 'array',
                title: '附件',
                'x-decorator': 'FormItem',
                'x-component': 'MultiAttachmentUpload',
                'x-component-props': {
                  maxCount: 10,
                  accept: '*',
                  listType: 'text',
                  entityTypeName: 'ProjectTask',
                },
              },
            },
          },
          watchUserCodes: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 3 },
            properties: {
              watchUserCodes: {
                type: 'string',
                title: '关注人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择关注人',
                  mode: 'multiple',
                  showId: true,
                  labelInValue: false,
                  valueField: 'userName',
                  fieldNames: { label: 'userName', value: 'userName' }
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
