import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.ProjectDeliverable';

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
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              deliverableCode: {
                type: 'string',
                title: '成果编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入成果编码' },
                required: true,
                name: 'deliverableCode',
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              deliverableName: {
                type: 'string',
                title: '成果名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入成果名称' },
                required: true,
                name: 'deliverableName',
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:projectCode,label:projectName}': {
                type: 'string',
                title: '所属项目',
                'x-decorator': 'FormItem',
                'x-component': 'ProjectSelect',
                'x-component-props': {
                  placeholder: '请选择项目',
                  labelInValue: true,
                },
                required: true,
                name: '{value:projectCode,label:projectName}',
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              '{value:responsibleUserId,label:responsibleUserName}': {
                type: 'string',
                title: '负责人',
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择负责人',
                  labelInValue: true,
                },
                name: '{value:responsibleUserId,label:responsibleUserName}',
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              plannedDate: {
                type: 'string',
                title: '计划完成日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择计划完成日期',
                  style: { width: '100%' },
                },
                name: 'plannedDate',
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              actualDate: {
                type: 'string',
                title: '实际完成日期',
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择实际完成日期',
                  style: { width: '100%' },
                },
                name: 'actualDate',
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
                title: '成果描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入成果描述',
                  rows: 3,
                },
                required: true,
                name: 'description',
              },
            },
          },
          col8: {
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
                  rows: 2,
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
