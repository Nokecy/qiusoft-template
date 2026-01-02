/**
 * 验证相关类型定义
 * 用于定义参数验证、数据源验证、映射验证等相关类型
 */

import type { ParameterType } from './parameter';
import type { ParameterReferenceType } from './dataSourceParameter';
import type { DependencyErrorCode, DependencyWarningCode } from './dependency';

/**
 * 验证严重级别枚举
 */
export enum ValidationSeverity {
  /** 错误(阻止操作) */
  Error = 'error',
  /** 警告(提示但不阻止) */
  Warning = 'warning',
  /** 信息(仅提示) */
  Info = 'info',
}

/**
 * 验证错误码枚举
 *
 * 定义所有可能的验证错误类型
 */
export enum ValidationErrorCode {
  // ========== 参数验证错误 ==========

  /** 参数名称无效(不符合命名规则) */
  INVALID_PARAMETER_NAME = 'INVALID_PARAMETER_NAME',
  /** 参数类型无效 */
  INVALID_PARAMETER_TYPE = 'INVALID_PARAMETER_TYPE',
  /** 参数值类型不匹配 */
  TYPE_MISMATCH = 'TYPE_MISMATCH',
  /** 必填参数缺失 */
  REQUIRED_PARAMETER_MISSING = 'REQUIRED_PARAMETER_MISSING',
  /** 参数值超出范围 */
  VALUE_OUT_OF_RANGE = 'VALUE_OUT_OF_RANGE',
  /** 参数值不在枚举列表中 */
  VALUE_NOT_IN_ENUM = 'VALUE_NOT_IN_ENUM',
  /** 正则表达式验证失败 */
  PATTERN_MISMATCH = 'PATTERN_MISMATCH',
  /** 字符串长度超出限制 */
  STRING_LENGTH_EXCEEDED = 'STRING_LENGTH_EXCEEDED',
  /** 数组项数超出限制 */
  ARRAY_SIZE_EXCEEDED = 'ARRAY_SIZE_EXCEEDED',
  /** 日期格式无效 */
  INVALID_DATE_FORMAT = 'INVALID_DATE_FORMAT',
  /** 自定义验证失败 */
  CUSTOM_VALIDATION_FAILED = 'CUSTOM_VALIDATION_FAILED',

  // ========== 数据源验证错误 ==========

  /** 数据源名称重复 */
  DUPLICATE_DATASOURCE_NAME = 'DUPLICATE_DATASOURCE_NAME',
  /** 数据源类型无效 */
  INVALID_DATASOURCE_TYPE = 'INVALID_DATASOURCE_TYPE',
  /** 数据源配置缺失必填字段 */
  MISSING_DATASOURCE_CONFIG = 'MISSING_DATASOURCE_CONFIG',
  /** API端点URL无效 */
  INVALID_API_ENDPOINT = 'INVALID_API_ENDPOINT',
  /** SQL查询语句无效 */
  INVALID_SQL_QUERY = 'INVALID_SQL_QUERY',
  /** 数据库连接字符串无效 */
  INVALID_CONNECTION_STRING = 'INVALID_CONNECTION_STRING',

  // ========== 参数映射验证错误 ==========

  /** 参数映射引用无效 */
  INVALID_PARAMETER_REFERENCE = 'INVALID_PARAMETER_REFERENCE',
  /** 引用的参数不存在 */
  REFERENCED_PARAMETER_NOT_FOUND = 'REFERENCED_PARAMETER_NOT_FOUND',
  /** 引用的数据源不存在 */
  REFERENCED_DATASOURCE_NOT_FOUND = 'REFERENCED_DATASOURCE_NOT_FOUND',
  /** 引用的字段不存在 */
  REFERENCED_FIELD_NOT_FOUND = 'REFERENCED_FIELD_NOT_FOUND',
  /** Scriban表达式语法错误 */
  INVALID_EXPRESSION_SYNTAX = 'INVALID_EXPRESSION_SYNTAX',
  /** 参数映射循环引用 */
  CIRCULAR_PARAMETER_REFERENCE = 'CIRCULAR_PARAMETER_REFERENCE',

  // ========== 模板验证错误 ==========

  /** 模板名称无效 */
  INVALID_TEMPLATE_NAME = 'INVALID_TEMPLATE_NAME',
  /** 模板版本不兼容 */
  INCOMPATIBLE_TEMPLATE_VERSION = 'INCOMPATIBLE_TEMPLATE_VERSION',
  /** 元素引用的数据源不存在 */
  ELEMENT_DATASOURCE_NOT_FOUND = 'ELEMENT_DATASOURCE_NOT_FOUND',
  /** 元素绑定表达式无效 */
  INVALID_ELEMENT_BINDING = 'INVALID_ELEMENT_BINDING',
}

/**
 * 验证错误接口
 *
 * 表示单个验证错误的详细信息
 */
export interface ValidationError {
  /** 错误字段路径(如:"parameters.orderId"、"dataSources.api1.url") */
  field: string;

  /** 错误代码 */
  code: ValidationErrorCode | DependencyErrorCode | string;

  /** 错误消息(用户可读) */
  message: string;

  /** 严重级别 */
  severity: ValidationSeverity;

  /** 错误上下文(额外信息,用于调试) */
  context?: Record<string, unknown>;

  /** 建议的修复方案 */
  suggestion?: string;

  /** 相关文档链接 */
  documentationUrl?: string;
}

/**
 * 验证结果接口
 *
 * 表示一次验证操作的完整结果
 */
export interface ValidationResult {
  /** 是否验证通过(无错误) */
  valid: boolean;

  /** 错误列表 */
  errors: ValidationError[];

  /** 警告列表 */
  warnings?: ValidationError[];

  /** 信息列表 */
  infos?: ValidationError[];

  /** 验证摘要 */
  summary?: ValidationSummary;

  /** 验证元数据 */
  metadata?: {
    validatedAt: string; // ISO 8601时间戳
    validationTime: number; // 验证耗时(毫秒)
    validatorVersion?: string;
  };
}

/**
 * 验证摘要
 */
export interface ValidationSummary {
  /** 总错误数 */
  errorCount: number;

  /** 总警告数 */
  warningCount: number;

  /** 总信息数 */
  infoCount: number;

  /** 验证项总数 */
  totalChecks: number;

  /** 通过率(0-1) */
  passRate: number;
}

/**
 * 参数验证结果
 *
 * 针对模板参数的验证结果
 */
export interface ParameterValidationResult extends ValidationResult {
  /** 验证的参数名称 */
  parameterName: string;

  /** 参数类型 */
  parameterType: ParameterType;

  /** 验证的参数值 */
  validatedValue?: unknown;

  /** 是否通过约束验证 */
  constraintsValid?: boolean;
}

/**
 * 批量参数验证结果
 */
export interface BatchParameterValidationResult {
  /** 是否整体有效 */
  valid: boolean;

  /** 各参数的验证结果 */
  results: Record<string, ParameterValidationResult>;

  /** 总错误数 */
  totalErrors: number;

  /** 总警告数 */
  totalWarnings: number;

  /** 验证的参数数量 */
  parameterCount: number;
}

/**
 * 数据源验证结果
 *
 * 针对数据源配置的验证结果
 */
export interface DataSourceValidationResult extends ValidationResult {
  /** 数据源名称 */
  dataSourceName: string;

  /** 数据源类型 */
  dataSourceType?: string;

  /** 连通性测试结果(如果执行了测试) */
  connectivityTest?: {
    success: boolean;
    responseTime?: number;
    errorMessage?: string;
  };
}

/**
 * 批量数据源验证结果
 */
export interface BatchDataSourceValidationResult {
  /** 是否整体有效 */
  valid: boolean;

  /** 各数据源的验证结果 */
  results: Record<string, DataSourceValidationResult>;

  /** 总错误数 */
  totalErrors: number;

  /** 总警告数 */
  totalWarnings: number;

  /** 验证的数据源数量 */
  dataSourceCount: number;
}

/**
 * 模板整体验证结果
 *
 * 对整个模板的综合验证结果
 */
export interface TemplateValidationResult extends ValidationResult {
  /** 模板ID */
  templateId?: string;

  /** 模板名称 */
  templateName?: string;

  /** 子验证结果 */
  subResults?: {
    parametersValidation?: BatchParameterValidationResult;
    dataSourcesValidation?: BatchDataSourceValidationResult;
    dependenciesValidation?: ValidationResult;
    elementsValidation?: ValidationResult;
  };

  /** 是否可以保存(允许警告但不允许错误) */
  canSave: boolean;

  /** 是否可以发布(不允许错误和警告) */
  canPublish: boolean;
}

/**
 * 验证规则接口
 *
 * 定义单个验证规则
 */
export interface ValidationRule<T = unknown> {
  /** 规则名称 */
  name: string;

  /** 规则描述 */
  description?: string;

  /** 验证函数 */
  validate: (value: T, context?: ValidationContext) => ValidationRuleResult;

  /** 严重级别(默认Error) */
  severity?: ValidationSeverity;

  /** 是否启用(默认true) */
  enabled?: boolean;
}

/**
 * 验证规则结果
 */
export interface ValidationRuleResult {
  /** 是否通过 */
  passed: boolean;

  /** 错误消息(如果未通过) */
  message?: string;

  /** 额外上下文 */
  context?: Record<string, unknown>;
}

/**
 * 验证上下文
 *
 * 提供验证过程中的上下文信息
 */
export interface ValidationContext {
  /** 模板参数定义 */
  templateParameters?: Record<string, unknown>;

  /** 数据源定义 */
  dataSources?: Record<string, unknown>;

  /** 元素定义 */
  elements?: unknown[];

  /** 当前验证的字段路径 */
  currentFieldPath?: string;

  /** 自定义验证器 */
  customValidators?: Record<string, (value: unknown) => boolean | string>;

  /** 验证选项 */
  options?: ValidationOptions;
}

/**
 * 验证选项
 */
export interface ValidationOptions {
  /** 是否严格模式(更严格的验证规则) */
  strict?: boolean;

  /** 是否在第一个错误时停止 */
  stopOnFirstError?: boolean;

  /** 是否验证警告 */
  validateWarnings?: boolean;

  /** 是否进行深度验证(验证嵌套结构) */
  deepValidation?: boolean;

  /** 超时时间(毫秒) */
  timeout?: number;

  /** 自定义错误消息模板 */
  customErrorMessages?: Record<ValidationErrorCode | string, string>;
}

/**
 * 实时验证配置
 */
export interface RealtimeValidationConfig {
  /** 是否启用实时验证 */
  enabled: boolean;

  /** 防抖延迟(毫秒,默认300) */
  debounceDelay?: number;

  /** 验证触发器 */
  triggers?: ValidationTrigger[];

  /** 是否显示内联错误 */
  showInlineErrors?: boolean;

  /** 是否显示警告 */
  showWarnings?: boolean;
}

/**
 * 验证触发器枚举
 */
export enum ValidationTrigger {
  /** 值变更时 */
  OnChange = 'onChange',
  /** 失去焦点时 */
  OnBlur = 'onBlur',
  /** 提交时 */
  OnSubmit = 'onSubmit',
  /** 手动触发 */
  Manual = 'manual',
}

/**
 * 验证错误分组
 *
 * 用于UI中分组展示验证错误
 */
export interface ValidationErrorGroup {
  /** 分组名称 */
  groupName: string;

  /** 分组标签 */
  groupLabel: string;

  /** 该组的错误列表 */
  errors: ValidationError[];

  /** 该组的警告列表 */
  warnings?: ValidationError[];

  /** 错误数量 */
  errorCount: number;

  /** 警告数量 */
  warningCount: number;

  /** 是否折叠(UI状态) */
  collapsed?: boolean;
}

/**
 * 验证错误修复建议
 */
export interface ValidationErrorFixSuggestion {
  /** 错误代码 */
  errorCode: ValidationErrorCode | string;

  /** 修复建议描述 */
  description: string;

  /** 自动修复函数(如果支持) */
  autoFix?: () => void | Promise<void>;

  /** 是否可以自动修复 */
  canAutoFix: boolean;

  /** 修复步骤(手动修复指导) */
  steps?: string[];

  /** 示例代码或配置 */
  example?: string;
}

/**
 * 验证统计信息
 */
export interface ValidationStatistics {
  /** 总验证次数 */
  totalValidations: number;

  /** 成功次数 */
  successCount: number;

  /** 失败次数 */
  failureCount: number;

  /** 平均验证时间(毫秒) */
  averageValidationTime: number;

  /** 最常见的错误类型(Top 5) */
  topErrorCodes: Array<{
    code: ValidationErrorCode | string;
    count: number;
    percentage: number;
  }>;

  /** 验证历史记录(最近10次) */
  recentHistory?: Array<{
    timestamp: string;
    valid: boolean;
    errorCount: number;
    warningCount: number;
  }>;
}

/**
 * 工具函数: 检查验证结果是否有错误
 */
export function hasErrors(result: ValidationResult): boolean {
  return result.errors.length > 0;
}

/**
 * 工具函数: 检查验证结果是否有警告
 */
export function hasWarnings(result: ValidationResult): boolean {
  return (result.warnings?.length ?? 0) > 0;
}

/**
 * 工具函数: 获取特定严重级别的错误
 */
export function getErrorsBySeverity(
  result: ValidationResult,
  severity: ValidationSeverity
): ValidationError[] {
  return result.errors.filter((error) => error.severity === severity);
}

/**
 * 工具函数: 将验证错误按字段分组
 */
export function groupErrorsByField(
  errors: ValidationError[]
): Record<string, ValidationError[]> {
  const groups: Record<string, ValidationError[]> = {};

  errors.forEach((error) => {
    const field = error.field || 'general';
    if (!groups[field]) {
      groups[field] = [];
    }
    groups[field].push(error);
  });

  return groups;
}

/**
 * 工具函数: 格式化验证错误消息
 */
export function formatValidationError(error: ValidationError): string {
  const prefix = error.severity === ValidationSeverity.Error ? '[错误]' :
                 error.severity === ValidationSeverity.Warning ? '[警告]' : '[信息]';
  return `${prefix} ${error.field}: ${error.message}`;
}

/**
 * 工具函数: 创建验证错误对象
 */
export function createValidationError(
  field: string,
  code: ValidationErrorCode | string,
  message: string,
  severity: ValidationSeverity = ValidationSeverity.Error,
  context?: Record<string, unknown>
): ValidationError {
  return {
    field,
    code,
    message,
    severity,
    context,
  };
}

/**
 * 工具函数: 合并多个验证结果
 */
export function mergeValidationResults(
  results: ValidationResult[]
): ValidationResult {
  const mergedErrors: ValidationError[] = [];
  const mergedWarnings: ValidationError[] = [];
  const mergedInfos: ValidationError[] = [];

  results.forEach((result) => {
    // 确保 errors 存在且是数组
    if (result.errors && Array.isArray(result.errors)) {
      mergedErrors.push(...result.errors);
    }
    if (result.warnings && Array.isArray(result.warnings)) {
      mergedWarnings.push(...result.warnings);
    }
    if (result.infos && Array.isArray(result.infos)) {
      mergedInfos.push(...result.infos);
    }
  });

  return {
    valid: mergedErrors.length === 0,
    errors: mergedErrors,
    warnings: mergedWarnings,
    infos: mergedInfos,
    summary: {
      errorCount: mergedErrors.length,
      warningCount: mergedWarnings.length,
      infoCount: mergedInfos.length,
      totalChecks: results.reduce((sum, r) => sum + (r.summary?.totalChecks ?? 0), 0),
      passRate: mergedErrors.length === 0 ? 1 : 0,
    },
  };
}
