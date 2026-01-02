/**
 * DataCopilot 模块的 DynamicSchema 定义
 *
 * 包含数据源管理、LLM 配置、Few-Shot 示例等表单 Schema
 */
import type { DynamicSchemaDefinition } from '../types';

/**
 * 数据源表单 Schema
 */
const dataSourceForm: DynamicSchemaDefinition = {
  scenarioKey: 'dataCopilot:dataSource',
  label: '数据源配置',
  description: '智能问数 - 数据源配置表单',
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: '数据源名称',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入数据源名称（唯一标识）',
        },
      },
      displayName: {
        type: 'string',
        title: '显示名称',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入显示名称',
        },
      },
      databaseType: {
        type: 'number',
        title: '数据库类型',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        default: 1,
        enum: [
          { label: 'SQL Server', value: 1 },
          { label: 'PostgreSQL', value: 2 },
          { label: 'MySQL', value: 3 },
        ],
        'x-component-props': {
          placeholder: '请选择数据库类型',
        },
      },
      connectionString: {
        type: 'string',
        title: '连接字符串',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 3,
          placeholder: '请输入数据库连接字符串',
        },
      },
      description: {
        type: 'string',
        title: '业务描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 3,
          placeholder: '请描述此数据源的业务用途，帮助 AI 理解数据含义',
        },
      },
      isActive: {
        type: 'boolean',
        title: '是否启用',
        default: true,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  },
};

/**
 * LLM 配置表单 Schema
 */
const llmConfigForm: DynamicSchemaDefinition = {
  scenarioKey: 'dataCopilot:llmConfig',
  label: 'LLM 配置',
  description: '智能问数 - 大语言模型配置表单',
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: '配置名称',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入配置名称',
        },
      },
      provider: {
        type: 'number',
        title: 'LLM 提供商',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        default: 2,
        enum: [
          { label: 'OpenAI (官方)', value: 1 },
          { label: 'Azure OpenAI', value: 2 },
          { label: '深度求索 (DeepSeek)', value: 3 },
          { label: '通义千问 (QianWen)', value: 4 },
          { label: 'Ollama (本地)', value: 5 },
          { label: '自定义 (Custom)', value: 99 },
        ],
        'x-component-props': {
          placeholder: '请选择 LLM 提供商',
        },
      },
      endpoint: {
        type: 'string',
        title: 'API 端点',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入 API 端点 URL',
        },
      },
      apiKey: {
        type: 'string',
        title: 'API Key',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.Password',
        'x-component-props': {
          placeholder: '请输入 API Key',
        },
      },
      modelName: {
        type: 'string',
        title: '模型名称',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '例如：gpt-4o, gpt-35-turbo',
        },
      },
      deploymentName: {
        type: 'string',
        title: '部署名称',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Azure OpenAI 部署名称（可选）',
        },
        'x-reactions': {
          dependencies: ['provider'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === "AzureOpenAI"}}',
            },
          },
        },
      },
      temperature: {
        type: 'number',
        title: '温度 (Temperature)',
        default: 0.0,
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          tooltip: '控制生成结果的随机性。0.0 表示尽可能确定，1.0 及以上表示更具创造性和随机性。',
        },
        'x-component': 'NumberPicker',
        'x-component-props': {
          min: 0,
          max: 2,
          step: 0.1,
          precision: 1,
          placeholder: '0.0 - 2.0',
          style: { width: '100%' },
        },
      },
      maxTokens: {
        type: 'number',
        title: '最大 Token',
        default: 4096,
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          tooltip: '生成回复的最大 Token 数量限制。',
        },
        'x-component': 'NumberPicker',
        'x-component-props': {
          min: 100,
          max: 128000,
          step: 100,
          placeholder: '最大输出 Token 数',
          style: { width: '100%' },
        },
      },
      isActive: {
        type: 'boolean',
        title: '是否启用',
        default: true,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  },
};

/**
 * Few-Shot 示例表单 Schema
 */
const fewShotExampleForm: DynamicSchemaDefinition = {
  scenarioKey: 'dataCopilot:fewShotExample',
  label: 'Few-Shot 示例',
  description: '智能问数 - 示例问答对配置',
  form: {
    labelCol: 4,
    wrapperCol: 20,
  },
  schema: {
    type: 'object',
    properties: {
      dataSourceId: {
        type: 'string',
        title: '数据源',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '请选择关联的数据源',
        },
        // 实际使用时需要通过 x-reactions 或手动设置 enum
      },
      naturalLanguageQuery: {
        type: 'string',
        title: '自然语言问题',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
          placeholder: '请输入自然语言问题，例如：查询本月销售额前10的产品',
        },
      },
      sqlQuery: {
        type: 'string',
        title: 'SQL 查询',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 6,
          placeholder: '请输入对应的 SQL 查询语句',
          style: { fontFamily: 'Consolas, Monaco, monospace' },
        },
      },
      explanation: {
        type: 'string',
        title: 'SQL 解释',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          rows: 2,
          placeholder: '可选，解释 SQL 的逻辑',
        },
      },
      isActive: {
        type: 'boolean',
        title: '是否启用',
        default: true,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
    },
  },
};

/**
 * 导出所有 DataCopilot Schema 定义
 */
export const schemas: DynamicSchemaDefinition[] = [
  dataSourceForm,
  llmConfigForm,
  fewShotExampleForm,
];
