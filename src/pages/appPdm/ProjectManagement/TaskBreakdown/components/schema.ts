import { ISchema } from '@formily/react';

/**
 * 任务表单 Schema（用于任务分解页面的快速新建/编辑）
 */
export const taskFormSchema: { form: Record<string, any>; schema: ISchema } = {
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
          // 项目编码（隐藏字段）
          projectCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              projectCode: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-hidden': true,
              },
            },
          },
          // 任务名称
          taskName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              taskName: {
                type: 'string',
                title: '任务名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入任务名称' },
                required: true,
              },
            },
          },
          // 任务类型（复合字段）
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
              },
            },
          },
          // 任务状态
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
                },
                enum: [
                  { label: '未开始', value: 0 },
                  { label: '进行中', value: 1 },
                  { label: '已暂停', value: 2 },
                  { label: '已完成', value: 3 },
                  { label: '已取消', value: 4 },
                ],
                default: 0,
              },
            },
          },
          // 关联里程碑
          milestoneId: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              milestoneId: {
                type: 'string',
                title: '关联里程碑',
                'x-decorator': 'FormItem',
                'x-component': 'MilestoneSelect',
                'x-component-props': {
                  placeholder: '请选择里程碑',
                },
                'x-reactions': {
                  dependencies: ['projectCode'],
                  fulfill: {
                    run: "{{$self.componentProps.projectCode = $deps[0]}}",
                  },
                },
              },
            },
          },
          // 父级任务
          parentCode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              parentCode: {
                type: 'string',
                title: '父级任务',
                'x-decorator': 'FormItem',
                'x-component': 'TaskSelect',
                'x-component-props': {
                  placeholder: '可选，留空表示根任务',
                },
                'x-reactions': {
                  dependencies: ['projectCode'],
                  fulfill: {
                    run: "{{$self.componentProps.projectCode = $deps[0]}}",
                  },
                },
              },
            },
          },
          // 负责人（复合字段）
          '{value:chargeIds,label:chargeNames}': {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:chargeIds,label:chargeNames}': {
                type: 'string',
                title: '负责人',
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
          // 处理人（复合字段）
          '{value:processIds,label:processNames}': {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:processIds,label:processNames}': {
                type: 'string',
                title: '处理人',
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
          // 预计工时
          estimatedHours: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              estimatedHours: {
                type: 'number',
                title: '预计工时',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '请输入预计工时（小时）',
                  min: 0,
                  precision: 1,
                },
              },
            },
          },
          // 紧急程度
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
                },
                enum: [
                  { label: '一般', value: 0 },
                  { label: '紧急', value: 1 },
                  { label: '非常紧急', value: 2 },
                ],
                default: 0,
              },
            },
          },
          // 任务描述
          description: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '任务描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入任务描述',
                  rows: 4,
                },
              },
            },
          },
        },
      },
    },
  },
};
