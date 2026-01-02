import { ISchema } from '@formily/react';

// 星期几的枚举
const dayOfWeekEnum = [
  { label: '星期日', value: 0 },
  { label: '星期一', value: 1 },
  { label: '星期二', value: 2 },
  { label: '星期三', value: 3 },
  { label: '星期四', value: 4 },
  { label: '星期五', value: 5 },
  { label: '星期六', value: 6 },
];

export const formId = 'workdayConfigure_Form';

export const formSchema: { form: any; schema: ISchema } = {
  form: {
    labelWidth: 120,
    layout: 'horizontal',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          minColumns: 1,
          strictAutoFit: true,
        },
        properties: {
          code: {
            type: 'string',
            title: '编码',
            required: true,
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 1,
            },
            'x-component-props': {
              placeholder: '请输入配置编码',
            },
          },
          name: {
            type: 'string',
            title: '名称',
            required: true,
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 1,
            },
            'x-component-props': {
              placeholder: '请输入配置名称',
            },
          },
          isActive: {
            type: 'boolean',
            title: '是否激活',
            'x-component': 'Switch',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 1,
            },
            default: true,
          },
          description: {
            type: 'string',
            title: '描述',
            'x-component': 'Input.TextArea',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component-props': {
              placeholder: '请输入描述信息',
              rows: 2,
            },
          },
          workdayItems: {
            type: 'array',
            title: '工作日配置项',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component': 'ArrayTable',
            'x-component-props': {
              gridKey: 'appSYS.calendar.workdayConfigure.workdayItems',
              pagination: false,
              scroll: { x: '100%' },
            },
            items: {
              type: 'object',
              properties: {
                column1: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 50,
                    title: '序号',
                    align: 'center',
                  },
                  properties: {
                    index: {
                      type: 'void',
                      'x-component': 'ArrayTable.Index',
                    },
                  },
                },
                column2: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 150,
                    title: '星期',
                  },
                  properties: {
                    dayOfWeek: {
                      type: 'number',
                      'x-decorator': 'FormItem',
                      'x-component': 'Select',
                      'x-component-props': {
                        placeholder: '请选择星期',
                      },
                      enum: dayOfWeekEnum,
                      required: true,
                    },
                  },
                },
                column3: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 120,
                    title: '是否工作日',
                    align: 'center',
                  },
                  properties: {
                    isWorkday: {
                      type: 'boolean',
                      'x-decorator': 'FormItem',
                      'x-component': 'Switch',
                      default: false,
                    },
                  },
                },
                column4: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 150,
                    title: '工作时长(小时)',
                  },
                  properties: {
                    workHours: {
                      type: 'number',
                      'x-decorator': 'FormItem',
                      'x-component': 'NumberPicker',
                      'x-component-props': {
                        placeholder: '工作时长',
                        min: 0,
                        max: 24,
                        precision: 0,
                      },
                      default: 0,
                    },
                  },
                },
                column5: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 150,
                    title: '加班时长(小时)',
                  },
                  properties: {
                    overtimeHours: {
                      type: 'number',
                      'x-decorator': 'FormItem',
                      'x-component': 'NumberPicker',
                      'x-component-props': {
                        placeholder: '加班时长',
                        min: 0,
                        max: 24,
                        precision: 0,
                      },
                      default: 0,
                    },
                  },
                },
                column6: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    title: '操作',
                    dataIndex: 'operations',
                    width: 100,
                    fixed: 'right',
                  },
                  properties: {
                    item: {
                      type: 'void',
                      'x-component': 'FormItem',
                      properties: {
                        remove: {
                          type: 'void',
                          'x-component': 'ArrayTable.Remove',
                        },
                        moveDown: {
                          type: 'void',
                          'x-component': 'ArrayTable.MoveDown',
                        },
                        moveUp: {
                          type: 'void',
                          'x-component': 'ArrayTable.MoveUp',
                        },
                      },
                    },
                  },
                },
              },
            },
            properties: {
              add: {
                type: 'void',
                title: '添加配置项',
                'x-component': 'ArrayTable.Addition',
              },
            },
          },
        },
      },
    },
  },
};
