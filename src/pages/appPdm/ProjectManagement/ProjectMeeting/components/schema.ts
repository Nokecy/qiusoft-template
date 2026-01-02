import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectMeeting';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 16,
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
          // 会议名称
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              meetingName: {
                type: 'string',
                title: '会议名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入会议名称' },
                required: true,
                name: 'meetingName',
              },
            },
          },
          // 会议时间（开始）
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              startTime: {
                type: 'string',
                title: '开始时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                  placeholder: '请选择开始时间',
                  style: { width: '100%' },
                },
                required: true,
                name: 'startTime',
              },
            },
          },
          // 会议时间（结束）
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              endTime: {
                type: 'string',
                title: '结束时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                  placeholder: '请选择结束时间',
                  style: { width: '100%' },
                },
                required: true,
                name: 'endTime',
              },
            },
          },
          // 会议地点
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              location: {
                type: 'string',
                title: '会议地点',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入会议地点' },
                name: 'location',
              },
            },
          },
          // 主持人
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              host: {
                type: 'string',
                title: '主持人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择主持人',
                  labelInValue: true,
                },
                required: true,
                name: 'host',
              },
            },
          },
          // 记录人
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              recorder: {
                type: 'string',
                title: '记录人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择记录人',
                  labelInValue: true,
                },
                required: true,
                name: 'recorder',
              },
            },
          },
          // 参会人员
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              participantIdsArray: {
                type: 'string',
                title: '参会人员',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择参会人员（可多选）',
                  mode: 'multiple',
                  labelInValue: true,
                },
                required: true,
                name: 'participantIdsArray',
              },
            },
          },
          // 会议主要内容
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              mainContent: {
                type: 'string',
                title: '会议主要内容',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入会议主要内容',
                  rows: 4,
                },
                name: 'mainContent',
              },
            },
          },
          // 执行内容
          col9: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              executionContent: {
                type: 'string',
                title: '执行内容',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入执行内容',
                  rows: 4,
                },
                name: 'executionContent',
              },
            },
          },
          // 关联项目
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              projectCode: {
                type: 'string',
                title: '关联项目',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectSelect',
                'x-component-props': {
                  placeholder: '请选择项目',
                  valueField: 'projectCode',
                },
                name: 'projectCode',
              },
            },
          },
          // 是否下发任务
          col11: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              hasTasks: {
                type: 'boolean',
                title: '是否下发任务',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {
                  checkedChildren: '是',
                  unCheckedChildren: '否',
                },
                name: 'hasTasks',
              },
            },
          },
          // 任务列表
          col12: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              tasks: {
                type: 'array',
                title: '任务列表',
                'x-component': 'ArrayTable',
                'x-decorator': 'FormItem',
                'x-component-props': {
                  gridKey: 'projectMeeting.tasks',
                  pagination: { pageSize: 10 },
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      visible: '{{$form.values.hasTasks === true}}',
                    },
                  },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '任务名称', width: 200 },
                      properties: {
                        taskName: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': {
                            placeholder: '请输入任务名称',
                          },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '任务类型', width: 150 },
                      properties: {
                        '{value:taskTypeCode,label:taskTypeName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'TaskTypeSelect',
                          'x-component-props': {
                            labelInValue: true,
                            placeholder: '请选择任务类型',
                          },
                          required: true,
                        },
                      },
                    },
                    col2_5: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '关联里程碑', width: 150 },
                      properties: {
                        '{value:milestoneId,label:milestoneName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'ProjectMilestoneSelect',
                          'x-component-props': {
                            placeholder: '请选择里程碑',
                            labelInValue: true,
                          },
                          'x-reactions': {
                            dependencies: ['...projectCode'],
                            fulfill: {
                              state: {
                                componentProps: {
                                  projectCode: '{{$deps[0]}}',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '负责人', width: 150 },
                      properties: {
                        chargeIdsArray: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'ProjectMemberSelect',
                          'x-component-props': {
                            placeholder: '请选择负责人',
                            mode: 'multiple',
                            labelInValue: true,
                          },
                          'x-reactions': {
                            dependencies: ['...projectCode'],
                            fulfill: {
                              state: {
                                componentProps: {
                                  projectCode: '{{$deps[0]}}',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    col4: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '处理人', width: 150 },
                      properties: {
                        processIdsArray: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'ProjectMemberSelect',
                          'x-component-props': {
                            placeholder: '请选择处理人',
                            mode: 'multiple',
                            labelInValue: true,
                          },
                          'x-reactions': {
                            dependencies: ['...projectCode'],
                            fulfill: {
                              state: {
                                componentProps: {
                                  projectCode: '{{$deps[0]}}',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    col5: {
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
                    col6: {
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
                    title: '添加任务',
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
