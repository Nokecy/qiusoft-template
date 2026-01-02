import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.Project.Edit';

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
      tabs: {
        type: 'void',
        'x-component': 'FormTab',
        properties: {
          // Tab 1: 项目概况
          overview: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目概况' },
            'x-reactions': {
              dependencies: ['status'],
              fulfill: {
                state: {
                  // 新建时(status为undefined)或计划中(Planning=0)状态才可编辑,其他状态只读
                  pattern: '{{$deps[0] === undefined || $deps[0] === 0 ? "editable" : "readPretty"}}'
                }
              }
            },
            properties: {
              grid: {
                type: 'void',
                'x-component': 'FormGrid',
                'x-component-props': { maxColumns: 3, strictAutoFit: true },
                properties: {
                  col1: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      projectCode: {
                        type: 'string',
                        title: '项目编码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': { placeholder: '请输入项目编码' },
                        required: true,
                        name: 'projectCode',
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
                        title: '项目名称',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': { placeholder: '请输入项目名称' },
                        required: true,
                        name: 'projectName',
                      },
                    },
                  },
                  col3: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      priority: {
                        type: 'number',
                        title: '紧急程度',
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {
                          placeholder: '请选择紧急程度',
                          options: [
                            { label: '低', value: 0 },
                            { label: '中', value: 1 },
                            { label: '高', value: 2 },
                          ],
                        },
                        name: 'priority',
                      },
                    },
                  },
                  col4: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      projectCategoryCode: {
                        type: 'string',
                        title: '项目分类',
                        'x-decorator': 'FormItem',
                        'x-component': 'ProjectCategorySelect',
                        'x-component-props': {
                          placeholder: '自动带出,不可修改',
                          onlyLeaf: true,
                          disabled: true
                        },
                        name: 'projectCategoryCode',
                      },
                    },
                  },
                  col4_5: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      templateCode: {
                        type: 'string',
                        title: '项目模板',
                        'x-decorator': 'FormItem',
                        'x-component': 'ProjectTemplateSelect',
                        'x-component-props': {
                          placeholder: '请选择项目模板'
                        },
                        name: 'templateCode',
                      },
                    },
                  },
                  col5: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      '{value:projectManagerId,label:projectManagerName}': {
                        type: 'string',
                        title: '项目负责人',
                        'x-decorator': 'FormItem',
                        'x-component': 'UserSelect',
                        'x-component-props': {
                          labelInValue: true,
                          showId: true,
                          placeholder: '请选择项目负责人'
                        },
                        required: true,
                      },
                    },
                  },
                  col7: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 3 },
                    properties: {
                      projectImageUrl: {
                        type: 'string',
                        title: '项目图片',
                        'x-decorator': 'FormItem',
                        'x-component': 'ProjectImageUpload',
                        name: 'projectImageUrl',
                      },
                    },
                  },
                  col8: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 3 },
                    properties: {
                      description: {
                        type: 'string',
                        title: '项目说明',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-component-props': {
                          placeholder: '请输入项目说明',
                          rows: 3,
                          maxLength: 500,
                          showCount: true,
                          style: { resize: 'vertical' }
                        },
                        name: 'description',
                      },
                    },
                  },
                },
              },
            },
          },
          // Tab 2: 项目团队
          teamMembers: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目团队' },
            properties: {
              teamMembers: {
                type: 'array',
                'x-component': 'ArrayTable',
                'x-decorator': 'FormItem',
                'x-component-props': {
                  gridKey: 'project.teamMembers',
                  pagination: { pageSize: 10 },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '成员姓名', width: 150 },
                      properties: {
                        '{value:userId,label:userName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'UserSelect',
                          'x-component-props': {
                            labelInValue: true,
                            showId: true,
                            placeholder: '请选择团队成员'
                          },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '项目角色', width: 150 },
                      properties: {
                        '{value:projectRoleCode,label:projectRoleName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'ProjectRoleSelect',
                          'x-component-props': {
                            labelInValue: true,
                            placeholder: '请选择项目角色'
                          },
                          required: true,
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '备注', width: 200 },
                      properties: {
                        remark: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            placeholder: '请输入备注',
                            rows: 2,
                            maxLength: 200,
                            showCount: true,
                            autoSize: { minRows: 2, maxRows: 4 },
                            style: { resize: 'vertical' }
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
                        fixed: 'right'
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
                    title: '添加团队成员',
                  },
                },
              },
            },
          },
          // Tab 3: 项目里程碑
          milestonesTab: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目里程碑' },
            'x-reactions': {
              dependencies: ['status'],
              fulfill: {
                state: {
                  // 新建时(status为undefined)或计划中(Planning=0)状态才可编辑,其他状态只读
                  pattern: '{{$deps[0] === undefined || $deps[0] === 0 ? "editable" : "readPretty"}}'
                }
              }
            },
            properties: {
              milestoneFlowChart: {
                type: 'void',
                'x-component': 'MilestoneFlowEditor',
                'x-reactions': {
                  dependencies: ['milestones'],
                  fulfill: {
                    state: {
                      componentProps: {
                        milestones: '{{$deps[0]}}',
                        fieldName: 'milestones',
                        parentField: 'parentCodes',
                        disabled: '{{$self.pattern === "readPretty"}}'
                      }
                    }
                  }
                }
              },
              milestones: {
                type: 'array',
                'x-component': 'ArrayTable',
                'x-decorator': 'FormItem',
                'x-component-props': {
                  gridKey: 'project.milestones',
                  pagination: { pageSize: 10 },
                },
                required: true,
                'x-validator': [
                  {
                    validator: (value: any[]) => {
                      if (!value || value.length === 0) {
                        return '至少需要添加一个项目里程碑';
                      }
                      return true;
                    },
                  },
                ],
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '里程碑名称', width: 200 },
                      properties: {
                        milestoneName: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': { placeholder: '请输入里程碑名称' },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '责任人', width: 150 },
                      properties: {
                        '{value:responsibleId,label:responsibleName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            labelInValue: true,
                            showSearch: true,
                            placeholder: '请先添加项目团队成员',
                            filterOption: (input: string, option: any) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                          },
                          required: true,
                          'x-reactions': {
                            fulfill: {
                              state: {
                                componentProps: {
                                  options: '{{$form.values.teamMembers && $form.values.teamMembers.length > 0 ? $form.values.teamMembers.map(member => ({label: member.userName, value: member.userId})) : []}}',
                                  placeholder: '{{$form.values.teamMembers && $form.values.teamMembers.length > 0 ? "请选择责任人" : "请先添加项目团队成员"}}',
                                  disabled: '{{!$form.values.teamMembers || $form.values.teamMembers.length === 0}}',
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
                      'x-component-props': { title: '是否需要审批', width: 100, align: 'center' },
                      properties: {
                        isApproval: {
                          type: 'boolean',
                          'x-decorator': 'FormItem',
                          'x-component': 'Checkbox',
                          default: false,
                        },
                      },
                    },
                    colWorkflow: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '审批流程', width: 220 },
                      properties: {
                        workflowDefinitionId: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'WorkflowDefinitionSelect',
                          'x-component-props': {
                            allowClear: true,
                          },
                          'x-reactions': {
                            dependencies: ['.isApproval'],
                            fulfill: {
                              state: {
                                required: '{{$deps[0] === true}}',
                                componentProps: {
                                  disabled: '{{$deps[0] !== true}}',
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
                      'x-component-props': { title: '父级里程碑', width: 200 },
                      properties: {
                        parentCodes: {
                          type: 'array',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            mode: 'multiple',
                            placeholder: '请选择父级里程碑',
                            allowClear: true,
                            maxTagCount: 2,
                          },
                          'x-reactions': {
                            dependencies: ['.milestoneName'],
                            fulfill: {
                              state: {
                                componentProps: {
                                  // 使用名称作为值,和模板页面保持一致
                                  options: '{{(() => { const milestones = $form.values.milestones || []; const currentName = $deps[0] || ""; return milestones.filter(m => m && m.milestoneName && m.milestoneName !== currentName).map(m => ({ label: m.milestoneName, value: m.milestoneName })); })()}}',
                                },
                              },
                            },
                          },
                          name: 'parentCodes',
                        },
                      },
                    },
                    col5: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '关联表单', width: 200 },
                      properties: {
                        formId: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'ProjectFormSelect',
                          'x-component-props': {
                            placeholder: '请选择关联表单',
                          },
                        },
                      },
                    },
                    colSequence: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '序号', width: 0 },
                      properties: {
                        sequence: {
                          type: 'number',
                          'x-decorator': 'FormItem',
                          'x-component': 'NumberPicker',
                          'x-component-props': {
                            style: { display: 'none' }
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
                        fixed: 'right'
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
                    title: '添加里程碑',
                    'x-component-props': {
                      defaultValue: () => {
                        // 生成临时ID,格式: temp_timestamp_random
                        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        return {
                          id: tempId,
                          _isNew: true, // 标记为新建
                        };
                      },
                    },
                  },
                },
              },
            },
          },
          // Tab 4: 项目任务
          tasks: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目任务' },
            properties: {
              tasks: {
                type: 'array',
                'x-component': 'ProjectTaskManager',
                'x-decorator': 'FormItem',
              },
            },
          },
          // Tab 5: 项目文件
          documents: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目文件' },
            properties: {
              documents: {
                type: 'array',
                'x-component': 'DocumentExplorer',
                'x-decorator': 'FormItem',
              },
            },
          },
          // Tab 6: 项目风险
          risks: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目风险' },
            properties: {
              risks: {
                type: 'array',
                'x-component': 'ArrayTable',
                'x-decorator': 'FormItem',
                'x-component-props': {
                  gridKey: 'project.risks',
                  pagination: { pageSize: 10 },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '风险名称', width: 150 },
                      properties: {
                        name: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': {
                            placeholder: '请输入风险名称'
                          },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '风险描述', width: 200 },
                      properties: {
                        description: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            placeholder: '请输入风险描述',
                            rows: 2,
                            maxLength: 300,
                            showCount: true,
                            autoSize: { minRows: 2, maxRows: 4 },
                            style: { resize: 'vertical' }
                          },
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '优先级', width: 100 },
                      properties: {
                        priority: {
                          type: 'number',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            placeholder: '请选择优先级',
                            options: [
                              { label: '低', value: 0 },
                              { label: '中', value: 1 },
                              { label: '高', value: 2 },
                              { label: '紧急', value: 3 },
                            ],
                          },
                          required: true,
                        },
                      },
                    },
                    col4: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '风险类型', width: 120 },
                      properties: {
                        riskTypeCode: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'RiskTypeSelect',
                          'x-component-props': {
                            placeholder: '请选择风险类型'
                          },
                        },
                      },
                    },
                    col5: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '处理人', width: 120 },
                      properties: {
                        '{value:handlerCode,label:handlerName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            showSearch: true,
                            labelInValue: true,
                            placeholder: '请选择处理人',
                            filterOption: (input: string, option: any) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                          },
                          'x-reactions': {
                            fulfill: {
                              state: {
                                componentProps: {
                                  options: '{{$form.values.teamMembers && $form.values.teamMembers.length > 0 ? $form.values.teamMembers.map(member => ({label: member.userName, value: member.userId})) : []}}',
                                  placeholder: '{{$form.values.teamMembers && $form.values.teamMembers.length > 0 ? "请选择处理人" : "暂无团队成员"}}',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    col5_1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '影响的里程碑', width: 150 },
                      properties: {
                        milestoneId: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            showSearch: true,
                            placeholder: '请选择里程碑',
                            fieldNames: { label: 'milestoneName', value: 'id' },
                          },
                          'x-reactions': {
                            fulfill: {
                              state: {
                                componentProps: {
                                  // 修复: 过滤掉没有ID的里程碑
                                  options: '{{$form.values.milestones && $form.values.milestones.length > 0 ? $form.values.milestones.filter(m => m.id) : []}}',
                                  placeholder: '{{$form.values.milestones && $form.values.milestones.length > 0 ? "请选择里程碑" : "暂无里程碑"}}',
                                },
                              },
                            },
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
                        fixed: 'right'
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
                    'x-component-props': {
                      defaultValue: () => {
                        // 生成临时ID,格式: temp_timestamp_random
                        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        return {
                          id: tempId,
                          _isNew: true, // 标记为新建
                        };
                      },
                    },
                  },
                },
              },
            },
          },
          // Tab 7: 项目问题
          issues: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目问题' },
            properties: {
              issues: {
                type: 'array',
                'x-component': 'ArrayTable',
                'x-decorator': 'FormItem',
                'x-component-props': {
                  gridKey: 'project.issues',
                  pagination: { pageSize: 10 },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '问题名称', width: 150 },
                      properties: {
                        name: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                          'x-component-props': {
                            placeholder: '请输入问题名称'
                          },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '严重程度', width: 100 },
                      properties: {
                        severity: {
                          type: 'number',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            placeholder: '请选择严重程度',
                            options: [
                              { label: '低', value: 0 },
                              { label: '中', value: 1 },
                              { label: '高', value: 2 },
                              { label: '紧急', value: 3 },
                            ],
                          },
                          required: true,
                        },
                      },
                    },
                    col3: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '紧急程度', width: 100 },
                      properties: {
                        urgency: {
                          type: 'number',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            placeholder: '请选择紧急程度',
                            options: [
                              { label: '低', value: 0 },
                              { label: '中', value: 1 },
                              { label: '高', value: 2 },
                              { label: '紧急', value: 3 },
                            ],
                          },
                        },
                      },
                    },
                    col4: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '处理人', width: 120 },
                      properties: {
                        '{value:handlerCode,label:handlerName}': {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            showSearch: true,
                            labelInValue: true,
                            placeholder: '请选择处理人',
                            filterOption: (input: string, option: any) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                          },
                          'x-reactions': {
                            fulfill: {
                              state: {
                                componentProps: {
                                  options: '{{$form.values.teamMembers && $form.values.teamMembers.length > 0 ? $form.values.teamMembers.map(member => ({label: member.userName, value: member.userId})) : []}}',
                                  placeholder: '{{$form.values.teamMembers && $form.values.teamMembers.length > 0 ? "请选择处理人" : "暂无团队成员"}}',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    col4_1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '关联里程碑', width: 150 },
                      properties: {
                        milestoneId: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Select',
                          'x-component-props': {
                            showSearch: true,
                            placeholder: '请选择里程碑',
                            fieldNames: { label: 'milestoneName', value: 'id' },
                          },
                          'x-reactions': {
                            fulfill: {
                              state: {
                                componentProps: {
                                  // 修复: 过滤掉没有ID的里程碑
                                  options: '{{$form.values.milestones && $form.values.milestones.length > 0 ? $form.values.milestones.filter(m => m.id) : []}}',
                                  placeholder: '{{$form.values.milestones && $form.values.milestones.length > 0 ? "请选择里程碑" : "暂无里程碑"}}',
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
                      'x-component-props': { title: '备注', width: 200 },
                      properties: {
                        remark: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            placeholder: '请输入备注',
                            rows: 2,
                            maxLength: 200,
                            showCount: true,
                            autoSize: { minRows: 2, maxRows: 4 },
                            style: { resize: 'vertical' }
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
                        fixed: 'right'
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
                    'x-component-props': {
                      defaultValue: () => {
                        // 生成临时ID,格式: temp_timestamp_random
                        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                        return {
                          id: tempId,
                          _isNew: true, // 标记为新建
                        };
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
  },
};
