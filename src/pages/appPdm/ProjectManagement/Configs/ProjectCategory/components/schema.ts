import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectCategory';

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
      id: {
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-visible': false,
        name: 'id',
      },
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              code: {
                type: 'string',
                title: '分类编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入分类编码' },
                required: true,
                name: 'code',
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              name: {
                type: 'string',
                title: '分类名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入分类名称' },
                required: true,
                name: 'name',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              parentCode: {
                type: 'string',
                title: '父级分类',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectCategorySelect',
                'x-component-props': {
                  placeholder: '请选择父级分类',
                },
                'x-reactions': {
                  dependencies: ['id'],
                  fulfill: {
                    state: {
                      componentProps: {
                        excludeId: '{{$deps[0]}}',
                      },
                    },
                  },
                },
                name: 'parentCode',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remark: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入备注',
                  rows: 3
                },
                name: 'remark',
              },
            },
          },
        },
      },
    },
  },
};
