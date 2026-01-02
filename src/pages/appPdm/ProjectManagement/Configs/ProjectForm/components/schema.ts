export const formId = 'Pdm.ProjectManagement.ProjectForm';

export const formSchema = {
  form: {
    labelCol: 6,
    wrapperCol: 16,
  },
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        'x-component': 'Input',
        'x-decorator': 'FormItem',
        'x-component-props': { style: { display: 'none' } },
      },
      formName: {
        type: 'string',
        title: '表单名称',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': { placeholder: '请输入表单名称' },
        'x-validator': [{ required: true, message: '请输入表单名称' }],
      },
      scenarioKey: {
        type: 'string',
        title: '场景Key',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '自动生成(pdm:timestamp)',
          disabled: true,
        },
        'x-decorator-props': {
          tooltip: '创建时自动生成,用于关联动态表单Schema',
        },
      },
      version: {
        type: 'string',
        title: '版本号',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': { placeholder: '请输入版本号（可选）' },
      },
      description: {
        type: 'string',
        title: '描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入描述',
          rows: 3,
        },
      },
    },
  },
};
