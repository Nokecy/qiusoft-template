/**
 * 打印功能数据源配置表单Schema
 */

export const formId = 'labelManagement.dataSourceConfig';

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

      // Array类型字段
      arrayDataJson: {
        type: 'string',
        title: '数组数据',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入JSON格式的数组数据',
          rows: 8,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: '静态数组数据,JSON格式',
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
                    return '数组数据必须是JSON数组格式';
                  }
                } catch (e) {
                  return '数组数据JSON格式错误';
                }
              }
            },
          },
        ],
      },

      // API类型字段
      url: {
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

      httpMethod: {
        type: 'string',
        title: '请求方法',
        enum: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
          { label: 'DELETE', value: 'DELETE' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择请求方法',
        },
        default: 'GET',
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'api'}}",
            },
          },
        },
      },

      headers: {
        type: 'string',
        title: '请求头',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '{\n  "Authorization": "Bearer token",\n  "Content-Type": "application/json"\n}',
          rows: 4,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: 'JSON格式的请求头,可选',
        },
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'api'}}",
            },
          },
        },
      },

      timeoutSeconds: {
        type: 'number',
        title: '超时时间',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          min: 1,
          max: 300,
          precision: 0,
          addonAfter: '秒',
          style: { width: '100%' },
        },
        'x-decorator-props': {
          tooltip: '请求超时时间,单位:秒',
        },
        default: 30,
        'x-reactions': {
          dependencies: ['dataSourceType'],
          fulfill: {
            state: {
              visible: "{{$deps[0] === 'api'}}",
            },
          },
        },
      },

      // SQL类型字段
      connectionString: {
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

      query: {
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

      // 属性映射
      staticPropertyMapping: {
        type: 'string',
        title: '静态属性映射',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '{\n  "labelProperty": "dataSourceField"\n}',
          rows: 4,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: '静态属性映射配置,JSON格式,可选',
        },
      },

      dynamicPropertyMapping: {
        type: 'string',
        title: '动态属性映射',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '{\n  "dynamicProperty": "dataSourceField"\n}',
          rows: 4,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: '动态属性映射配置,JSON格式,可选',
        },
      },

      defaultValues: {
        type: 'string',
        title: '默认值配置',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '{\n  "property": "defaultValue"\n}',
          rows: 4,
          style: {
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            fontSize: 13,
          },
        },
        'x-decorator-props': {
          tooltip: '属性默认值配置,JSON格式,可选',
        },
      },

      // 缓存配置
      cacheEnabled: {
        type: 'boolean',
        title: '启用缓存',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        'x-decorator-props': {
          tooltip: '启用后将缓存数据源结果,减少重复请求',
        },
        default: true,
      },

      cacheTtlSeconds: {
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
        },
        'x-decorator-props': {
          tooltip: '缓存有效期,单位:秒',
        },
        default: 300,
        'x-reactions': {
          dependencies: ['cacheEnabled'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === true}}',
            },
          },
        },
      },
    },
  },
};
