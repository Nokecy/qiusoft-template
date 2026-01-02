import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.DocumentLibrary';

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
        'x-component-props': { maxColumns: 2 },
        properties: {
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              libraryName: {
                type: 'string',
                title: '库名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入库名称' },
                required: true,
                name: 'libraryName',
              },
            },
          },
          col2_5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              libraryType: {
                type: 'number',
                title: '库类型',
                'x-decorator': 'FormItem',
                'x-component': 'Radio.Group',
                'x-component-props': {
                  optionType: 'button',
                  buttonStyle: 'solid',
                  options: [
                    { label: '存储库', value: 1 },
                    { label: '回收库', value: 2 },
                  ],
                },
                required: true,
                default: 1,
                name: 'libraryType',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              parentLibraryId: {
                type: 'string',
                title: '父级文档库',
                'x-decorator': 'FormItem',
                'x-component': 'DocumentLibrarySelect',
                'x-component-props': { placeholder: '请选择父级文档库（可选）' },
                name: 'parentLibraryId',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              storageSolutionId: {
                type: 'string',
                title: '存储方案',
                'x-decorator': 'FormItem',
                'x-component': 'StorageSolutionSelect',
                'x-component-props': {
                  placeholder: '请选择存储方案'
                },
                name: 'storageSolutionId',
                'x-reactions': {
                  dependencies: ['parentLibraryId'],
                  fulfill: {
                    state: {
                      required: '{{!$deps[0]}}',
                      disabled: '{{!!$deps[0]}}'
                    }
                  }
                }
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入描述',
                  rows: 3
                },
                name: 'description',
              },
            },
          },
        },
      },
    },
  },
};
