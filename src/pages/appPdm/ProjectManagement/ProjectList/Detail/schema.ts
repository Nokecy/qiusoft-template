import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.Project.Detail';

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
        'x-component-props': {
          className: 'project-detail-sticky-tab',
        },
        properties: {
          // Tab 1: 项目详情
          projectDetail: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目详情' },
            properties: {
              // 项目状态（隐藏字段，用于判断项目是否已完成）
              status: {
                type: 'number',
                'x-component': 'Input',
                'x-component-props': {
                  style: { display: 'none' }
                }
              },
              // 当前里程碑ID（隐藏字段，固定显示项目当前所处的里程碑）
              currentMilestoneId: {
                type: 'string',
                'x-component': 'Input',
                'x-component-props': {
                  style: { display: 'none' }
                }
              },
              // 选中的里程碑ID（隐藏字段，用于筛选任务/风险/问题）
              selectedMilestoneId: {
                type: 'string',
                'x-component': 'Input',
                'x-component-props': {
                  style: { display: 'none' }
                }
              },
              // 任务Tab的里程碑筛选（隐藏字段，独立于selectedMilestoneId）
              taskMilestoneFilter: {
                type: 'string',
                'x-component': 'Input',
                'x-component-props': {
                  style: { display: 'none' }
                }
              },
              // 固定区域：流程图
              stickyArea: {
                type: 'void',
                'x-component': 'StickyContainer',
                properties: {
                  // 里程碑流程图
                  milestoneFlowChart: {
                    type: 'void',
                    'x-component': 'MilestoneFlowChart',
                    'x-component-props': {
                      style: { marginBottom: '0' }
                    },
                    'x-reactions': {
                      dependencies: ['.milestones', '.currentMilestoneId', '.selectedMilestoneId'],
                      fulfill: {
                        state: {
                          componentProps: {
                            milestones: '{{$deps[0]}}',
                            currentMilestoneId: '{{$deps[1]}}',
                            selectedMilestoneId: '{{$deps[2]}}'
                          }
                        }
                      }
                    }
                  },
                }
              },
              // 里程碑关联表单展示（可折叠）
              milestoneFormSection: {
                type: 'void',
                'x-component': 'CollapsibleSection',
                'x-component-props': {
                  title: '里程碑关联表单',
                  defaultExpanded: true
                },
                // 当选中的里程碑没有关联表单时隐藏此 section
                'x-reactions': {
                  dependencies: ['milestones', 'selectedMilestoneId'],
                  fulfill: {
                    state: {
                      visible: '{{(() => { const milestones = $deps[0] || []; const selectedId = $deps[1]; if (!selectedId) return false; const selectedMilestone = milestones.find(m => m && m.id === selectedId); return Boolean(selectedMilestone && selectedMilestone.formId); })()}}'
                    }
                  }
                },
                properties: {
                  milestoneFormDisplay: {
                    type: 'void',
                    'x-component': 'MilestoneFormDisplay',
                    'x-reactions': {
                      dependencies: ['milestones', 'selectedMilestoneId'],
                      fulfill: {
                        state: {
                          componentProps: {
                            milestones: '{{$deps[0]}}',
                            currentMilestoneId: '{{$deps[1]}}',  // 传入selectedMilestoneId作为当前显示的里程碑
                            readOnly: false  // Copy 页面中里程碑表单可编辑
                          }
                        }
                      }
                    }
                  },
                },
              },
              // 里程碑数据（隐藏字段，仅作为数据容器）
              milestones: {
                type: 'array',
                'x-component': 'ArrayDataContainer',
              },
              // 任务列表（可折叠卡片）
              tasksSection: {
                type: 'void',
                'x-component': 'CollapsibleSection',
                'x-component-props': {
                  title: '项目任务',
                  buttonText: '新建任务',
                  defaultExpanded: true
                },
                properties: {
                  // 任务列表（项目详情Tab中显示的是筛选后的任务 - 卡片样式）
                  filteredTasks: {
                    type: 'array',
                    'x-component': 'CardList',
                    'x-component-props': {
                      cardType: 'tasks',
                    },
                  },
                },
              },
              // 风险列表（可折叠卡片）
              risksSection: {
                type: 'void',
                'x-component': 'CollapsibleSection',
                'x-component-props': {
                  title: '项目风险',
                  buttonText: '新建风险',
                  defaultExpanded: true
                },
                properties: {
                  // 风险列表（项目详情Tab中显示的是筛选后的风险 - 卡片样式）
                  filteredRisks: {
                    type: 'array',
                    'x-component': 'CardList',
                    'x-component-props': {
                      cardType: 'risks',
                    },
                  },
                },
              },
              // 问题列表（可折叠卡片）
              issuesSection: {
                type: 'void',
                'x-component': 'CollapsibleSection',
                'x-component-props': {
                  title: '项目问题',
                  buttonText: '新建问题',
                  defaultExpanded: true
                },
                properties: {
                  // 问题列表（项目详情Tab中显示的是筛选后的问题 - 卡片样式）
                  filteredIssues: {
                    type: 'array',
                    'x-component': 'CardList',
                    'x-component-props': {
                      cardType: 'issues',
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
                'x-component': 'ReadOnlyArrayTable',
                'x-component-props': {
                  tableType: 'teamMembers',
                },
                'x-reactions': {
                  dependencies: ['.teamMembers'],
                  fulfill: {
                    state: {
                      componentProps: {
                        tableType: 'teamMembers',
                      }
                    }
                  }
                }
              },
            },
          },
          // Tab 3: 项目任务
          projectTasks: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目任务' },
            properties: {
              // 左右布局容器
              tasksLayout: {
                type: 'void',
                'x-component': 'div',
                'x-component-props': {
                  style: {
                    display: 'flex',
                    gap: '16px',
                    height: 'calc(100vh - 300px)',
                    minHeight: '500px'
                  }
                },
                properties: {
                  // 左侧里程碑列表
                  milestoneListSide: {
                    type: 'void',
                    'x-component': 'MilestoneList',
                    'x-component-props': {
                      style: {
                        width: '240px',
                        flexShrink: 0
                      }
                    },
                    'x-reactions': {
                      dependencies: ['milestones', 'taskMilestoneFilter'],
                      fulfill: {
                        state: {
                          componentProps: {
                            milestones: '{{$deps[0]}}',
                            selectedMilestoneId: '{{$deps[1]}}'
                          }
                        }
                      }
                    }
                  },
                  // 右侧任务列表
                  tasksContent: {
                    type: 'void',
                    'x-component': 'div',
                    'x-component-props': {
                      style: {
                        flex: 1,
                        overflow: 'auto'
                      }
                    },
                    properties: {
                      tasks: {
                        type: 'array',
                        'x-component': 'ProjectTaskCRUDTable',
                        'x-component-props': {
                          tableType: 'tasks',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          // Tab 4: 项目文件
          projectFiles: {
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
          // Tab 5: 项目里程碑
          milestonesTab: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目里程碑' },
            properties: {
              milestoneFlowSection: {
                type: 'void',
                'x-component': 'CollapsibleSection',
                'x-component-props': {
                  title: '里程碑流程图',
                  defaultExpanded: true
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
                            milestones: '{{$deps[0] || []}}',
                            fieldName: 'milestones',
                            parentField: 'parentCodes',
                            disabled: true  // 详情页只读
                          }
                        }
                      }
                    }
                  },
                },
              },
              milestonesListSection: {
                type: 'void',
                'x-component': 'CollapsibleSection',
                'x-component-props': {
                  title: '里程碑列表',
                  defaultExpanded: true
                },
                properties: {
                  milestones: {
                    type: 'array',
                    'x-component': 'ReadOnlyArrayTable',
                    'x-component-props': {
                      tableType: 'milestones',
                    },
                  },
                },
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
                'x-component': 'ReadOnlyArrayTable',
                'x-component-props': {
                  tableType: 'risks',
                },
              },
            },
          },
          // Tab 6: 项目问题
          issues: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目问题' },
            properties: {
              issues: {
                type: 'array',
                'x-component': 'ReadOnlyArrayTable',
                'x-component-props': {
                  tableType: 'issues',
                },
              },
            },
          },
        },
      },
      // 底部Tab组：项目基本信息和里程碑审批
      bottomTabs: {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          style: { marginTop: '24px' }
        },
        properties: {
          // 项目基本信息Tab
          projectBasicInfo: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '项目基本信息' },
            properties: {
              overviewGrid: {
                type: 'void',
                'x-component': 'FormGrid',
                'x-component-props': {
                  maxColumns: 3,
                  strictAutoFit: true,
                  style: { marginBottom: '24px' }
                },
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
                        required: true,
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
          // 审批流执行历史Tab (仅在选中里程碑需要审批时显示)
          workflowExecutionHistory: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': { tab: '审批流执行历史' },
            'x-reactions': {
              dependencies: ['milestones', 'selectedMilestoneId'],
              fulfill: {
                state: {
                  // 检查当前选中里程碑是否需要审批
                  visible: '{{(() => { const milestones = $deps[0] || []; const selectedId = $deps[1]; if (!selectedId) return false; const selectedMilestone = milestones.find(m => m && m.id === selectedId); return selectedMilestone && selectedMilestone.isApproval === true; })()}}'
                }
              }
            },
            properties: {
              milestoneApprovalDisplay: {
                type: 'void',
                'x-component': 'MilestoneApprovalDisplay',
                'x-reactions': {
                  dependencies: ['milestones', 'selectedMilestoneId'],
                  fulfill: {
                    state: {
                      componentProps: {
                        milestones: '{{(() => { const milestones = $deps[0] || []; const selectedId = $deps[1]; if (!selectedId) return []; const selected = milestones.find(m => m && m.id === selectedId); return selected ? [selected] : []; })()}}'
                      }
                    }
                  }
                }
              },
            },
          },
        },
      },
    },
  },
};
