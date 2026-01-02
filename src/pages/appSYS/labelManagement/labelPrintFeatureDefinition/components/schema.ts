/**
 * 动态属性表单Schema定义
 */

export const formId = 'LabelPrintFeatureDefinition.DynamicProperty';

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
        'x-component-props': {
          style: { display: 'none' },
        },
      },
      feature: {
        type: 'string',
        title: '功能编码',
        'x-component': 'Input',
        'x-component-props': {
          disabled: true,
        },
        'x-decorator': 'FormItem',
        'x-validator': [{ required: true, message: '请输入功能编码' }],
      },
      propertyName: {
        type: 'string',
        title: '属性名称',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入属性名称(英文)',
        },
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          tooltip: '属性的唯一标识,建议使用英文驼峰命名',
        },
        'x-validator': [
          { required: true, message: '请输入属性名称' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9]*$/, message: '属性名称必须以字母开头,只能包含字母和数字' },
        ],
        'x-reactions': {
          fulfill: {
            state: {
              pattern: "{{$form.values.id ? 'readPretty' : 'editable'}}",
            },
          },
        },
      },
      displayName: {
        type: 'string',
        title: '显示名称',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入显示名称(中文)',
        },
        'x-decorator': 'FormItem',
        'x-validator': [{ required: true, message: '请输入显示名称' }],
      },
      propertyType: {
        type: 'string',
        title: '属性类型',
        enum: [
          { label: '字符串', value: 'string' },
          { label: '整数', value: 'int' },
          { label: '小数', value: 'decimal' },
          { label: '布尔值', value: 'boolean' },
          { label: '日期时间', value: 'dateTime' },
          { label: '枚举', value: 'enum' },
        ],
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择属性类型',
        },
        'x-decorator': 'FormItem',
        'x-validator': [{ required: true, message: '请选择属性类型' }],
        'x-reactions': {
          fulfill: {
            state: {
              pattern: "{{$form.values.id ? 'readPretty' : 'editable'}}",
            },
          },
        },
      },
      description: {
        type: 'string',
        title: '说明',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入属性说明',
          rows: 3,
        },
        'x-decorator': 'FormItem',
      },
      required: {
        type: 'boolean',
        title: '必填',
        'x-component': 'Switch',
        'x-decorator': 'FormItem',
        default: false,
      },
      defaultValue: {
        type: 'string',
        title: '默认值',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入默认值',
        },
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          tooltip: '根据属性类型输入相应格式的默认值',
        },
        'x-reactions': {
          dependencies: ['propertyType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] !== 'enum'}}",
            },
          },
        },
      },
      enumValues: {
        type: 'string',
        title: '枚举值',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入JSON格式的枚举值,例如: {"1":"选项1","2":"选项2"}',
          rows: 4,
        },
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          tooltip: '枚举类型时必填,格式为JSON对象',
        },
        'x-reactions': {
          dependencies: ['propertyType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'enum'}}",
            },
          },
        },
        'x-validator': [
          {
            validator: (value: string, rule: any, ctx: any) => {
              const propertyType = ctx.field.query('.propertyType').value();
              if (propertyType === 'enum') {
                if (!value) {
                  return '枚举类型必须设置枚举值';
                }
                try {
                  const parsed = JSON.parse(value);
                  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
                    return '枚举值必须是JSON对象格式';
                  }
                } catch (e) {
                  return '枚举值格式错误,必须是有效的JSON';
                }
              }
              return '';
            },
          },
        ],
      },
    },
  },
};
