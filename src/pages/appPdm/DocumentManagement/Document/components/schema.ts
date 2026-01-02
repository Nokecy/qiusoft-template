import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.Document';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

/**
 * 动态生成表单 Schema
 * @param documentTypeOptions 文档类型选项数组
 * @param documentLibraryOptions 文档库选项数组
 * @returns 表单 Schema 对象
 */
export const getFormSchema = (
  documentTypeOptions: any[] = [],
  documentLibraryOptions: any[] = [],
): { form: Record<string, any>; schema: ISchema } => {
  return {
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
            col1: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                documentNumber: {
                  type: 'string',
                  title: '文档编号',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入文档编号' },
                  required: true,
                  name: 'documentNumber',
                },
              },
            },
            col2: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                documentName: {
                  type: 'string',
                  title: '文档名称',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入文档名称' },
                  required: true,
                  name: 'documentName',
                },
              },
            },
            col3: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                documentTypeId: {
                  type: 'string',
                  title: '文档类型',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择文档类型',
                    mode: 'single',
                    options: documentTypeOptions,
                  },
                  required: true,
                  name: 'documentTypeId',
                },
              },
            },
            col4: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                storageLibraryId: {
                  type: 'string',
                  title: '所属库',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择所属库',
                    mode: 'single',
                    options: documentLibraryOptions,
                  },
                  required: true,
                  name: 'storageLibraryId',
                },
              },
            },
            col5: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                securityLevel: {
                  type: 'number',
                  title: '安全等级',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择安全等级',
                    options: [
                      { label: '公开', value: 0 },
                      { label: '内部', value: 1 },
                      { label: '机密', value: 2 },
                      { label: '绝密', value: 3 },
                    ]
                  },
                  name: 'securityLevel',
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                keywords: {
                  type: 'string',
                  title: '关键词',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入关键词，多个用逗号分隔' },
                  name: 'keywords',
                },
              },
            },
            col7: {
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
};
