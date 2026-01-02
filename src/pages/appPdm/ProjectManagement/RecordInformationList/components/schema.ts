import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.RecordInformation';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
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
              subject: {
                type: 'string',
                title: '主题',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入主题' },
                required: true,
                name: 'subject',
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:proposerUserId,label:proposerUserName}': {
                type: 'string',
                title: '提出人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择提出人',
                  labelInValue: true,
                },
                required: true,
                name: '{value:proposerUserId,label:proposerUserName}',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              proposedDate: {
                type: 'string',
                title: '提出时间',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  showTime: true,
                  format: 'YYYY-MM-DD HH:mm:ss',
                  placeholder: '请选择提出时间',
                  style: { width: '100%' },
                },
                required: true,
                name: 'proposedDate',
              },
            },
          },
          col3_5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              recordFormType: {
                type: 'number',
                title: '记录类型',
                'x-decorator': 'FormItem',
                'x-component': 'Radio.Group',
                'x-component-props': {
                  options: [
                    { label: '项目记录', value: 1 },
                    { label: '其他记录', value: 2 },
                  ],
                },
                required: true,
                default: 1,
                name: 'recordFormType',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              participantIdsArray: {
                type: 'string',
                title: '参与人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择参与人（可多选）',
                  mode: 'multiple',
                  labelInValue: true,
                },
                name: 'participantIdsArray',
              },
            },
          },
          col4_5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              '{value:projectCode,label:projectName}': {
                type: 'string',
                title: '关联项目',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectSelect',
                'x-component-props': {
                  placeholder: '请选择项目',
                  valueField: 'projectCode',
                  labelInValue: true,
                },
                'x-reactions': {
                  fulfill: {
                    state: {
                      visible: '{{$form.values.recordFormType === 1}}',
                    },
                  },
                },
                name: '{value:projectCode,label:projectName}',
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
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
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              eventContent: {
                type: 'string',
                title: '事项内容',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入事项内容',
                  rows: 4,
                },
                name: 'eventContent',
              },
            },
          },
          col6_1: {
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
                  entityTypeName: 'RecordInformation',
                },
                name: 'attachments',
              },
            },
          },
          // 任务列表
          col7: {
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
                  gridKey: 'recordInformation.tasks',
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
                            dependencies: ['{value:projectCode,label:projectName}'],
                            fulfill: {
                              state: {
                                componentProps: {
                                  projectCode: '{{$deps[0]?.value}}',
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
                          'x-component': 'UserSelect',
                          'x-component-props': {
                            placeholder: '请选择负责人',
                            mode: 'multiple',
                            labelInValue: true,
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
                          'x-component': 'UserSelect',
                          'x-component-props': {
                            placeholder: '请选择处理人',
                            mode: 'multiple',
                            labelInValue: true,
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
