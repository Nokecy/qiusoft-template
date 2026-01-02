/**
 * 序列号规则数据源配置表单Schema
 */

export const formId = 'bnrManagement.dataSourceConfig';

export const dataSourceConfigSchema = {
  form: {
    labelCol: 6,
    wrapperCol: 16,
    labelAlign: 'left' as const,
  },
  schema: {
    type: 'object',
    properties: {
      dataSourceType: {
        type: 'string',
        title: '数据源类型',
        enum: [
          { label: '静态数组', value: 'array' },
          { label: 'API接口', value: 'api' },
          { label: 'SQL查询', value: 'sql' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        'x-component-props': {
          optionType: 'button',
          buttonStyle: 'solid',
        },
        default: 'array',
      },

      // Array类型字段 - 匹配后端 ArrayData 字段
      ArrayData: {
        type: 'string',
        title: '数组数据',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入JSON格式的数组数据\n示例:\n[\n  {"label": "选项1", "value": "value1"},\n  {"label": "选项2", "value": "value2"}\n]',
          rows: 8,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: '静态数组数据,必须是合法的JSON数组格式',
        },
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'array'}}",
            },
          },
        },
        'x-validator': [
          {
            validator: (value: string, rule: any, ctx: any) => {
              const dataSourceType = ctx.field.query('.dataSourceType').value();
              if (dataSourceType === 'array' && !value) {
                return '请输入数组数据';
              }
              if (dataSourceType === 'array' && value) {
                try {
                  const parsed = JSON.parse(value);
                  if (!Array.isArray(parsed)) {
                    return '数据必须是JSON数组格式，例如：[{"label":"选项1","value":"1"}]';
                  }
                } catch (e: any) {
                  return `JSON格式错误: ${e.message || '请检查JSON语法'}`;
                }
              }
            },
          },
        ],
      },

      // API类型字段 - 匹配后端 Url 字段
      Url: {
        type: 'string',
        title: 'API地址',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'https://api.example.com/data',
        },
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'api'}}",
            },
          },
        },
        'x-validator': [
          {
            validator: (value: string, rule: any, ctx: any) => {
              const dataSourceType = ctx.field.query('.dataSourceType').value();
              if (dataSourceType === 'api' && !value) {
                return '请输入API地址';
              }
            },
          },
        ],
      },


      // SQL类型字段 - 匹配后端 ConnectionString 字段
      ConnectionString: {
        type: 'string',
        title: '连接字符串',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: 'Server=localhost;Database=mydb;User Id=sa;Password=***;',
          rows: 3,
        },
        'x-decorator-props': {
          tooltip: '数据库连接字符串',
        },
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'sql'}}",
            },
          },
        },
        'x-validator': [
          {
            validator: (value: string, rule: any, ctx: any) => {
              const dataSourceType = ctx.field.query('.dataSourceType').value();
              if (dataSourceType === 'sql' && !value) {
                return '请输入数据库连接字符串';
              }
            },
          },
        ],
      },

      Query: {
        type: 'string',
        title: 'SQL查询',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: 'SELECT * FROM table WHERE id = @id',
          rows: 6,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: 'SQL查询语句,支持参数化查询',
        },
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'sql'}}",
            },
          },
        },
        'x-validator': [
          {
            validator: (value: string, rule: any, ctx: any) => {
              const dataSourceType = ctx.field.query('.dataSourceType').value();
              if (dataSourceType === 'sql' && !value) {
                return '请输入SQL查询语句';
              }
            },
          },
        ],
      },

      // 失败处理模式
      failureMode: {
        type: 'string',
        title: '失败处理',
        enum: [
          { label: '跳过动态值', value: 'skipDynamic' },
          { label: '抛出异常', value: 'throwError' },
          { label: '使用默认值', value: 'useDefault' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择失败处理模式',
        },
        'x-decorator-props': {
          tooltip: '数据源获取失败时的处理方式',
        },
        default: 'useDefault',
      },

      // 属性映射 - 匹配后端 PropertyMapping 字段
      PropertyMapping: {
        type: 'string',
        title: '属性映射',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '{\n  "dataSourceFieldName": "propertyName",\n  "id": "Id",\n  "name": "Name"\n}',
          rows: 6,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: '字段映射配置,Key为数据源字段名,Value为属性名,JSON格式,可选',
        },
      },

      // 缓存配置 - 匹配后端 CacheDuration 字段
      CacheDuration: {
        type: 'number',
        title: '缓存时间',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          min: 0,
          max: 86400,
          precision: 0,
          addonAfter: '秒',
          style: { width: '100%' },
          placeholder: '0表示不缓存',
        },
        'x-decorator-props': {
          tooltip: '缓存有效期(秒), 0表示不缓存, 建议300秒',
        },
        default: 300,
      },
    },
  },
};
