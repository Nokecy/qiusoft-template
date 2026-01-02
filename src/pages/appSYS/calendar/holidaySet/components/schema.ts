import { ISchema } from '@formily/react';

export const formId = 'holidaySet_Form';

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
              placeholder: '请输入假期集名称',
            },
          },
          countryOrRegion: {
            type: 'string',
            title: '国家/地区',
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 1,
            },
            'x-component-props': {
              placeholder: '请输入国家或地区标识',
            },
          },
          isActive: {
            type: 'boolean',
            title: '是否启用',
            'x-component': 'Switch',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
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
          items: {
            type: 'array',
            title: '假期项',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              gridSpan: 2,
            },
            'x-component': 'ArrayTable',
            'x-component-props': {
              gridKey: 'appSYS.calendar.holidaySet.items',
              pagination: { pageSize: 10 },
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
                    width: 200,
                    title: '假期名称',
                  },
                  properties: {
                    name: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                      'x-component-props': {
                        placeholder: '请输入假期名称',
                      },
                      required: true,
                    },
                  },
                },
                column3: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 200,
                    title: '开始日期',
                  },
                  properties: {
                    startDate: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'DatePicker',
                      'x-component-props': {
                        placeholder: '请选择开始日期',
                        style: { width: '100%' },
                      },
                      required: true,
                    },
                  },
                },
                column4: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 200,
                    title: '结束日期',
                  },
                  properties: {
                    endDate: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'DatePicker',
                      'x-component-props': {
                        placeholder: '请选择结束日期',
                        style: { width: '100%' },
                      },
                      required: true,
                    },
                  },
                },
                column5: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 120,
                    title: '法定假日',
                    align: 'center',
                  },
                  properties: {
                    isPublicHoliday: {
                      type: 'boolean',
                      'x-decorator': 'FormItem',
                      'x-component': 'Switch',
                      default: false,
                    },
                  },
                },
                column6: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 300,
                    title: '描述',
                  },
                  properties: {
                    description: {
                      type: 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input.TextArea',
                      'x-component-props': {
                        placeholder: '请输入描述',
                        rows: 1,
                      },
                    },
                  },
                },
                column7: {
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
                title: '添加假期项',
                'x-component': 'ArrayTable.Addition',
              },
            },
          },
        },
      },
    },
  },
};
