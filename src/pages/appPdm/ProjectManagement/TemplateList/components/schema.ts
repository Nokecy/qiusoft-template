import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectTemplate';

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
          // Tab 1: 基本信息
          basicInfo: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '基本信息' },
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
                      templateCode: {
                        type: 'string',
                        title: '模板编码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': { placeholder: '请输入模板编码' },
                        required: true,
                        name: 'templateCode',
                      },
                    },
                  },
                  col2: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      templateName: {
                        type: 'string',
                        title: '模板名称',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': { placeholder: '请输入模板名称' },
                        required: true,
                        name: 'templateName',
                      },
                    },
                  },
                  col3: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      categoryCode: {
                        type: 'string',
                        title: '项目分类',
                        'x-decorator': 'FormItem',
                        'x-component': 'ProjectCategorySelect',
                        'x-component-props': {
                          placeholder: '请选择项目分类',
                          onlyLeaf: true  // 只能选择叶子节点
                        },
                        required: true,
                        name: 'categoryCode',
                      },
                    },
                  },
                  col4: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      isActive: {
                        type: 'boolean',
                        title: '是否启用',
                        'x-decorator': 'FormItem',
                        'x-component': 'Switch',
                        'x-component-props': {},
                        name: 'isActive',
                        default: true,
                      },
                    },
                  },
                  col5: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 1 },
                    properties: {
                      executeFirstPhaseByDefault: {
                        type: 'boolean',
                        title: '默认执行第一阶段',
                        'x-decorator': 'FormItem',
                        'x-decorator-props': {
                          labelCol: { span: 10 },
                          wrapperCol: { span: 14 }
                        },
                        'x-component': 'Switch',
                        'x-component-props': {},
                        name: 'executeFirstPhaseByDefault',
                        default: false,
                      },
                    },
                  },
                  col6: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 3 },
                    properties: {
                      description: {
                        type: 'string',
                        title: '描述',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-component-props': {
                          placeholder: '请输入描述',
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
          // Tab 2: 项目角色
          rolesTab: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目角色' },
            properties: {
              templateRoles: {  // 【修复】使用后端返回的字段名
                type: 'array',
                'x-component': 'ArrayTable',
                'x-decorator': 'FormItem',
                'x-component-props': {
                  gridKey: 'projectTemplate.templateRoles',
                  pagination: { pageSize: 10 },
                },
                items: {
                  type: 'object',
                  properties: {
                    col1: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '项目角色', width: 250 },
                      properties: {
                        roleId: {
                          type: 'string',
                          'x-decorator': 'FormItem',
                          'x-component': 'ProjectRoleSelect',
                          'x-component-props': {
                            placeholder: '请选择项目角色',
                            valueType: 'id',
                          },
                          required: true,
                        },
                      },
                    },
                    col2: {
                      type: 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': { title: '是否必需角色', width: 120, align: 'center' },
                      properties: {
                        isRequired: {
                          type: 'boolean',
                          'x-decorator': 'FormItem',
                          'x-component': 'Checkbox',
                          default: false,
                        },
                      },
                    },
                    col3: {
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
                    title: '添加角色',
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
            properties: {
              milestoneFlowChart: {
                type: 'void',
                'x-component': 'MilestoneFlowEditor',
                'x-reactions': {
                  dependencies: ['milestones'],
                  fulfill: {
                    state: {
                      componentProps: {
                        milestones: '{{$deps[0] || []}}',
                        fieldName: 'milestones',
                        parentField: 'parentCodes',
                        disabled: '{{$form.pattern === "readPretty"}}'
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
                  gridKey: 'projectTemplate.milestones',
                  pagination: { pageSize: 10 },
                },
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
                          'x-reactions': [
                            {
                              dependencies: ['.milestoneName'],
                              fulfill: {
                                state: {
                                  componentProps: {
                                    // 动态获取当前表单中所有里程碑名称作为选项
                                    // 排除当前行自己
                                    options: '{{(() => { const milestones = $form.values.milestones || []; const currentName = $deps[0] || ""; return milestones.filter(m => m && m.milestoneName && m.milestoneName !== currentName).map(m => ({ label: m.milestoneName, value: m.milestoneName })); })()}}',
                                  },
                                },
                              },
                            },
                            {
                              // 监听整个 milestones 数组的变化
                              target: 'milestones',
                              fulfill: {
                                state: {
                                  componentProps: {
                                    options: '{{(() => { const milestones = $form.values.milestones || []; const path = $self.path.toString(); const match = path.match(/milestones\\.(\\d+)\\.parentCodes/); if (!match) return []; const currentIndex = parseInt(match[1]); const currentMilestone = milestones[currentIndex]; const currentName = currentMilestone?.milestoneName || ""; return milestones.filter(m => m && m.milestoneName && m.milestoneName !== currentName).map(m => ({ label: m.milestoneName, value: m.milestoneName })); })()}}',
                                  },
                                },
                              },
                            },
                          ],
                          name: 'parentCodes',
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
                    col4: {
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
                    col5: {
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
                  },
                },
              },
            },
          },
          // Tab 4: 上传文档
          documentsTab: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '上传文档' },
            properties: {
              documents: {
                type: 'array',
                'x-component': 'DocumentExplorer',
                'x-decorator': 'FormItem',
                'x-reactions': {
                  fulfill: {
                    state: {
                      componentProps: {
                        // 根据表单模式设置 disabled 属性
                        disabled: '{{$form.pattern === "readPretty"}}'
                      }
                    }
                  }
                }
              },
            },
          },
          // Tab 5: 项目任务
          taskTab: {
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
        },
      },
    },
  },
};
