import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectMilestone';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

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
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              milestoneName: {
                type: 'string',
                title: '里程碑名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入里程碑名称' },
                required: true,
                name: 'milestoneName',
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
              '{value:responsibleId,label:responsibleName}': {
                type: 'string',
                title: '责任人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择责任人',
                  labelInValue: true,
                },
                name: '{value:responsibleId,label:responsibleName}',
              },
            },
          },
          col4: {
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
                  style: { width: '100%' },
                },
                name: 'plannedStartDate',
              },
            },
          },
          col5: {
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
                  style: { width: '100%' },
                },
                name: 'plannedEndDate',
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              isApproval: {
                type: 'boolean',
                title: '是否需要审批',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                'x-component-props': {},
                name: 'isApproval',
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              sequence: {
                type: 'number',
                title: '排序序号',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '请输入排序序号',
                  min: 0,
                  precision: 0,
                },
                name: 'sequence',
              },
            },
          },
        },
      },
    },
  },
};

/**
 * 工作流执行页面Schema
 */
export const executeSchema = (): ISchema => {
  return {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          // Card 1: 项目基础信息 - 与项目详情页对齐
          projectInfoCard: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              projectInfoWrapper: {
                type: 'void',
                'x-component': 'Card',
                'x-component-props': { title: '项目基础信息', size: 'small' },
                properties: {
                  projectInfo: {
                    type: 'object',
                    properties: {
                      projectGrid: {
                        type: 'void',
                        'x-component': 'FormGrid',
                        'x-component-props': { maxColumns: 2, strictAutoFit: true },
                        properties: {
                          // 基本信息 - 精简版（5个字段）
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
                                'x-pattern': 'readPretty',
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
                                'x-pattern': 'readPretty',
                              },
                            },
                          },
                          col3: {
                            type: 'void',
                            'x-component': 'FormGrid.GridColumn',
                            'x-component-props': { gridSpan: 1 },
                            properties: {
                              projectCategoryCode: {
                                type: 'string',
                                title: '项目分类',
                                'x-decorator': 'FormItem',
                                'x-component': 'Input',
                                'x-pattern': 'readPretty',
                              },
                            },
                          },
                          col4: {
                            type: 'void',
                            'x-component': 'FormGrid.GridColumn',
                            'x-component-props': { gridSpan: 1 },
                            properties: {
                              category: {
                                type: 'number',
                                title: '项目类别',
                                'x-decorator': 'FormItem',
                                'x-component': 'Select',
                                'x-pattern': 'readPretty',
                                enum: [
                                  { label: '研发项目', value: 0 },
                                  { label: '生产项目', value: 1 },
                                  { label: '维护项目', value: 2 },
                                  { label: '改进项目', value: 3 },
                                  { label: '其他项目', value: 4 },
                                ],
                              },
                            },
                          },
                          col5: {
                            type: 'void',
                            'x-component': 'FormGrid.GridColumn',
                            'x-component-props': { gridSpan: 1 },
                            properties: {
                              projectManagerName: {
                                type: 'string',
                                title: '项目经理',
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
                },
              },
            },
          },
          // Card 2: 里程碑信息
          milestoneInfoCard: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              milestoneInfo: {
                type: 'void',
                'x-component': 'Card',
                'x-component-props': { title: '当前里程碑信息', size: 'small' },
                properties: {
                  milestoneGrid: {
                    type: 'void',
                    'x-component': 'FormGrid',
                    'x-component-props': { maxColumns: 2, strictAutoFit: true },
                    properties: {
                      col1: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                        'x-component-props': { gridSpan: 2 },
                        properties: {
                          milestoneName: {
                            type: 'string',
                            title: '里程碑名称',
                            'x-decorator': 'FormItem',
                            'x-component': 'Input',
                            'x-pattern': 'readPretty',
                            name: 'milestoneName',
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
                            'x-pattern': 'readPretty',
                            name: '{value:projectCode,label:projectName}',
                          },
                        },
                      },
                      col3: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                        'x-component-props': { gridSpan: 1 },
                        properties: {
                          '{value:responsibleId,label:responsibleName}': {
                            type: 'string',
                            title: '责任人',
                            'x-decorator': 'FormItem',
                            'x-component': 'UserSelect',
                            'x-pattern': 'readPretty',
                            name: '{value:responsibleId,label:responsibleName}',
                          },
                        },
                      },
                      col4: {
                        type: 'void',
                        'x-component': 'FormGrid.GridColumn',
                        'x-component-props': { gridSpan: 1 },
                        properties: {
                          sequence: {
                            type: 'number',
                            title: '排序序号',
                            'x-decorator': 'FormItem',
                            'x-component': 'NumberPicker',
                            'x-pattern': 'readPretty',
                            name: 'sequence',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          // Card 3: 动态表单（只在有 formId 时显示）
          dynamicFormCard: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              dynamicFormPlaceholder: {
                type: 'void',
                'x-component': 'Card',
                'x-component-props': { title: '动态表单', size: 'small' },
                properties: {
                  // 由 execute.tsx 注入的组件渲染动态表单（确保内容在 Card 内部）
                  dynamicFormContent: {
                    type: 'void',
                    'x-component': 'MilestoneDynamicFormContent',
                  },
                },
              },
            },
          },
        },
      },
    },
  };
};
