/**
 * 数据源参数映射类型定义
 * 用于定义数据源参数与模板参数之间的映射关系
 */

/**
 * 参数引用类型枚举
 *
 * 定义参数映射表达式中可引用的数据源类型
 */
export enum ParameterReferenceType {
  /** 引用模板参数 */
  TemplateParameter = 'template_parameter',
  /** 引用其他数据源的字段 */
  DataSourceField = 'datasource_field',
  /** Scriban表达式计算 */
  Expression = 'expression',
  /** 静态值 */
  StaticValue = 'static_value',
}

/**
 * 参数映射配置接口
 *
 * 将模板参数或其他数据源字段映射到当前数据源的参数
 */
export interface ParameterMapping {
  /** 数据源参数名称(目标参数) */
  sourceParameterName: string;

  /** 引用表达式(源表达式) */
  referenceExpression: string;

  /** 引用类型(自动推断或手动指定) */
  referenceType?: ParameterReferenceType;

  /** 映射说明(用于文档和调试) */
  description?: string;

  /** 是否启用(默认true,用于临时禁用映射) */
  enabled?: boolean;

  /** 默认值(当引用失败时使用) */
  fallbackValue?: unknown;

  /** 类型转换函数(可选,用于类型适配) */
  transformExpression?: string;
}

/**
 * 参数映射字典
 *
 * 数据源的参数映射集合,键为数据源参数名称,值为引用表达式
 */
export type ParameterMappings = Record<string, string>;

/**
 * 完整参数映射配置字典
 *
 * 键为数据源参数名称,值为完整的映射配置对象
 */
export type ParameterMappingConfigs = Record<string, ParameterMapping>;

/**
 * 参数引用解析结果
 *
 * 用于表示解析后的参数引用信息
 */
export interface ParameterReferenceInfo {
  /** 引用类型 */
  type: ParameterReferenceType;

  /** 引用路径(如:"parameters.orderId"或"dataSources.baseData.userId") */
  path: string;

  /** 是否有效 */
  valid: boolean;

  /** 错误消息(如果无效) */
  error?: string;

  /** 引用的参数名称(如果是模板参数引用) */
  parameterName?: string;

  /** 引用的数据源名称(如果是数据源字段引用) */
  dataSourceName?: string;

  /** 引用的字段路径(如果是数据源字段引用) */
  fieldPath?: string;

  /** 表达式内容(如果是Scriban表达式) */
  expression?: string;

  /** 静态值(如果是静态值引用) */
  staticValue?: unknown;
}

/**
 * API数组参数格式枚举
 *
 * 定义API请求中数组参数的序列化格式
 */
export enum ApiArrayParameterFormat {
  /** 逗号分隔: ids=1,2,3 */
  CommaSeparated = 'CommaSeparated',
  /** 重复参数: ids=1&ids=2&ids=3 */
  Repeated = 'Repeated',
  /** 括号格式: ids[]=1&ids[]=2&ids[]=3 */
  Bracketed = 'Bracketed',
  /** JSON字符串: ids=["1","2","3"] */
  JsonString = 'JsonString',
}

/**
 * API查询参数配置
 *
 * 用于配置数据源API请求中的查询参数格式
 */
export interface ApiQueryParameterConfig {
  /** 参数名称 */
  name: string;

  /** 数组参数格式(仅当参数值为数组时有效) */
  arrayFormat?: ApiArrayParameterFormat;

  /** 是否URL编码(默认true) */
  urlEncode?: boolean;

  /** 日期格式(仅当参数值为日期时有效,如:"yyyy-MM-dd") */
  dateFormat?: string;

  /** 布尔值格式(仅当参数值为布尔时有效,如:["true","false"]或["1","0"]) */
  booleanFormat?: [string, string];
}

/**
 * API查询参数配置字典
 */
export type ApiQueryParameterConfigs = Record<string, ApiQueryParameterConfig>;

/**
 * 数据源参数解析上下文
 *
 * 用于参数映射解析时提供上下文信息
 */
export interface ParameterResolutionContext {
  /** 可用的模板参数定义 */
  templateParameters: Record<string, unknown>;

  /** 可用的数据源列表 */
  availableDataSources: string[];

  /** 当前数据源名称(用于防止自引用) */
  currentDataSourceName?: string;

  /** 已解析的数据源数据(用于引用其他数据源字段) */
  resolvedDataSources?: Record<string, unknown>;

  /** 模板变量 */
  templateVariables?: Record<string, unknown>;

  /** 计算变量 */
  computedVariables?: Record<string, unknown>;
}

/**
 * 参数映射验证结果
 */
export interface ParameterMappingValidationResult {
  /** 是否有效 */
  valid: boolean;

  /** 参数名称 */
  parameterName: string;

  /** 引用表达式 */
  referenceExpression: string;

  /** 解析结果 */
  referenceInfo?: ParameterReferenceInfo;

  /** 错误消息(如果无效) */
  error?: string;

  /** 警告消息 */
  warnings?: string[];
}

/**
 * 参数映射批量验证结果
 */
export interface ParameterMappingsBatchValidationResult {
  /** 数据源名称 */
  dataSourceName: string;

  /** 是否整体有效 */
  valid: boolean;

  /** 各参数验证结果 */
  results: ParameterMappingValidationResult[];

  /** 错误总数 */
  errorCount: number;

  /** 警告总数 */
  warningCount: number;
}

/**
 * 参数映射测试输入
 */
export interface ParameterMappingTestInput {
  /** 数据源名称 */
  dataSourceName: string;

  /** 参数映射配置 */
  parameterMappings: ParameterMappings;

  /** 测试用的模板参数值 */
  testParameterValues: Record<string, unknown>;

  /** 测试用的其他数据源数据(可选) */
  testDataSourceData?: Record<string, unknown>;
}

/**
 * 参数映射测试结果
 */
export interface ParameterMappingTestResult {
  /** 是否成功 */
  success: boolean;

  /** 解析后的参数值 */
  resolvedParameters: Record<string, unknown>;

  /** 错误消息列表 */
  errors?: string[];

  /** 警告消息列表 */
  warnings?: string[];

  /** 详细解析信息(调试用) */
  details?: Array<{
    parameterName: string;
    originalExpression: string;
    resolvedValue: unknown;
    referenceType: ParameterReferenceType;
  }>;
}

/**
 * 参数引用语法常量
 */
export const PARAMETER_REFERENCE_SYNTAX = {
  /** 模板参数引用前缀 */
  TEMPLATE_PARAMETER_PREFIX: '$parameters.',
  /** 数据源字段引用前缀 */
  DATASOURCE_FIELD_PREFIX: '$dataSources.',
  /** 模板变量引用前缀 */
  TEMPLATE_VARIABLE_PREFIX: '$variables.',
  /** 计算变量引用前缀 */
  COMPUTED_VARIABLE_PREFIX: '$computed.',
  /** Scriban表达式包裹符 */
  EXPRESSION_WRAPPER: ['{{', '}}'] as const,
} as const;

/**
 * 参数引用语法正则表达式
 */
export const PARAMETER_REFERENCE_PATTERNS = {
  /** 匹配模板参数引用: $parameters.xxx */
  TEMPLATE_PARAMETER: /^\$parameters\.([a-zA-Z_][a-zA-Z0-9_]*)$/,
  /** 匹配数据源字段引用: $dataSources.xxx.yyy.zzz */
  DATASOURCE_FIELD: /^\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*)\.(.+)$/,
  /** 匹配Scriban表达式: {{...}} */
  EXPRESSION: /^{{(.+)}}$/,
  /** 匹配变量引用: $variables.xxx */
  TEMPLATE_VARIABLE: /^\$variables\.([a-zA-Z_][a-zA-Z0-9_]*)$/,
  /** 匹配计算变量引用: $computed.xxx */
  COMPUTED_VARIABLE: /^\$computed\.([a-zA-Z_][a-zA-Z0-9_]*)$/,
} as const;

/**
 * 工具函数: 判断表达式是否为模板参数引用
 */
export function isTemplateParameterReference(expression: string): boolean {
  return PARAMETER_REFERENCE_PATTERNS.TEMPLATE_PARAMETER.test(expression);
}

/**
 * 工具函数: 判断表达式是否为数据源字段引用
 */
export function isDataSourceFieldReference(expression: string): boolean {
  return PARAMETER_REFERENCE_PATTERNS.DATASOURCE_FIELD.test(expression);
}

/**
 * 工具函数: 判断表达式是否为Scriban表达式
 */
export function isScribanExpression(expression: string): boolean {
  return PARAMETER_REFERENCE_PATTERNS.EXPRESSION.test(expression);
}

/**
 * 工具函数: 提取模板参数名称
 */
export function extractParameterName(expression: string): string | null {
  const match = expression.match(PARAMETER_REFERENCE_PATTERNS.TEMPLATE_PARAMETER);
  return match ? match[1] : null;
}

/**
 * 工具函数: 提取数据源引用信息
 */
export function extractDataSourceReference(expression: string): { dataSourceName: string; fieldPath: string } | null {
  const match = expression.match(PARAMETER_REFERENCE_PATTERNS.DATASOURCE_FIELD);
  if (!match) return null;
  return {
    dataSourceName: match[1],
    fieldPath: match[2],
  };
}

/**
 * 工具函数: 提取Scriban表达式内容
 */
export function extractExpressionContent(expression: string): string | null {
  const match = expression.match(PARAMETER_REFERENCE_PATTERNS.EXPRESSION);
  return match ? match[1].trim() : null;
}
