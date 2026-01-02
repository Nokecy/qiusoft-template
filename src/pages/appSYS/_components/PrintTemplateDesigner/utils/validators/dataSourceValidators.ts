/**
 * 数据源验证工具
 * 提供数据源配置验证、参数映射验证、参数引用验证等功能
 */

import type {
  ParameterMapping,
  ParameterMappings,
  ParameterReferenceInfo,
  ParameterReferenceType,
  ParameterMappingValidationResult,
  ParameterMappingsBatchValidationResult,
} from '../../types/dataSourceParameter';

import type {
  ValidationResult,
  ValidationError,
  ValidationErrorCode,
  ValidationSeverity,
  DataSourceValidationResult,
  BatchDataSourceValidationResult,
} from '../../types/validation';

import {
  isTemplateParameterReference,
  isDataSourceFieldReference,
  isScribanExpression,
  extractParameterName,
  extractDataSourceReference,
  extractExpressionContent,
  PARAMETER_REFERENCE_PATTERNS,
  ParameterReferenceType as RefType,
} from '../../types/dataSourceParameter';

import {
  createValidationError,
  ValidationSeverity as Severity,
  ValidationErrorCode as ErrorCode,
} from '../../types/validation';

// 导入真实的数据源类型
import type { AtlDataSource } from '../../types';

// ========== 辅助函数 ==========

/**
 * 创建空的验证结果
 */
function createEmptyValidationResult(): ValidationResult {
  return {
    valid: true,
    errors: [],
    warnings: [],
    infos: [],
    summary: {
      errorCount: 0,
      warningCount: 0,
      infoCount: 0,
      totalChecks: 0,
      passRate: 1,
    },
  };
}

/**
 * 添加错误到验证结果
 */
function addError(
  result: ValidationResult,
  field: string,
  code: ValidationErrorCode | string,
  message: string,
  severity: ValidationSeverity = Severity.Error,
  context?: Record<string, unknown>
): void {
  const error = createValidationError(field, code, message, severity, context);

  if (severity === Severity.Error) {
    result.errors.push(error);
    result.valid = false;
    if (result.summary) {
      result.summary.errorCount++;
    }
  } else if (severity === Severity.Warning) {
    result.warnings = result.warnings || [];
    result.warnings.push(error);
    if (result.summary) {
      result.summary.warningCount++;
    }
  } else {
    result.infos = result.infos || [];
    result.infos.push(error);
    if (result.summary) {
      result.summary.infoCount++;
    }
  }

  if (result.summary) {
    result.summary.totalChecks++;
  }
}

/**
 * 验证数据源名称格式
 * 规则: [a-zA-Z_][a-zA-Z0-9_]*
 */
function isValidDataSourceName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}

/**
 * 验证URL格式
 */
function isValidUrl(url: string): boolean {
  try {
    // 支持相对路径和绝对路径
    if (url.startsWith('/')) {
      return true;
    }
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 获取数据源类型的配置提示
 */
function getConfigHint(type: string): string {
  switch (type.toLowerCase()) {
    case 'array':
    case '1':
      return '需要配置 data 字段,例如: { data: [{"id": 1, "name": "Item1"}] }';
    case 'api':
    case '2':
      return '需要配置 url 字段,例如: { url: "/api/data", method: "GET" }';
    case 'sql':
    case '3':
      return '需要配置 connectionString 和 query 字段';
    case 'computed':
      return '需要配置 expression 字段,例如: { expression: "{{ $dataSources.source1.count * 2 }}" }';
    default:
      return '请参考文档配置相应字段';
  }
}

// ========== 核心验证函数 ==========

/**
 * 验证单个数据源配置
 *
 * 验证数据源定义的完整性和正确性:
 * - 数据源名称格式验证
 * - 数据源类型有效性验证
 * - 必填配置项验证(如API的url,SQL的connectionString和query)
 * - 参数映射验证
 *
 * @param dataSource - 数据源定义对象
 * @returns 数据源验证结果
 *
 * @example
 * ```typescript
 * const result = validateDataSource({
 *   name: 'userData',
 *   type: 'api',
 *   config: { url: '/api/users', method: 'GET' },
 *   parameterMappings: { userId: '$parameters.userId' }
 * });
 * ```
 */
export function validateDataSource(dataSource: AtlDataSource): DataSourceValidationResult {
  const result: DataSourceValidationResult = {
    ...createEmptyValidationResult(),
    dataSourceName: dataSource.name,
    dataSourceType: dataSource.type,
  };

  const fieldPrefix = `dataSource.${dataSource.name}`;

  // 1. 验证数据源名称
  if (!dataSource.name) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.INVALID_DATASOURCE_TYPE,
      '数据源名称不能为空',
      Severity.Error
    );
    return result;
  }

  if (!isValidDataSourceName(dataSource.name)) {
    addError(
      result,
      `${fieldPrefix}.name`,
      ErrorCode.INVALID_DATASOURCE_TYPE,
      `数据源名称格式无效: "${dataSource.name}",必须符合规则 [a-zA-Z_][a-zA-Z0-9_]*`,
      Severity.Error,
      { dataSourceName: dataSource.name }
    );
  }

  // 2. 验证数据源类型
  if (!dataSource.type) {
    addError(
      result,
      `${fieldPrefix}.type`,
      ErrorCode.INVALID_DATASOURCE_TYPE,
      '数据源类型不能为空',
      Severity.Error
    );
    return result;
  }

  // 支持字符串类型和后端数字枚举
  // 后端枚举: 1=Array, 2=Api, 3=Sql
  const validTypes = ['api', 'sql', 'static', 'computed', 'array'];
  const validEnumValues = [1, 2, 3]; // Array=1, Api=2, Sql=3

  let typeStr: string;
  let isValidType = false;

  if (typeof dataSource.type === 'string') {
    // 字符串类型
    typeStr = dataSource.type.toLowerCase();
    isValidType = validTypes.includes(typeStr);
  } else if (typeof dataSource.type === 'number') {
    // 数字枚举类型
    isValidType = validEnumValues.includes(dataSource.type);
    // 将数字映射为字符串以供后续验证使用
    switch (dataSource.type) {
      case 1:
        typeStr = 'array';
        break;
      case 2:
        typeStr = 'api';
        break;
      case 3:
        typeStr = 'sql';
        break;
      default:
        typeStr = String(dataSource.type);
        isValidType = false;
    }
  } else {
    // 其他类型
    typeStr = String(dataSource.type).toLowerCase();
    isValidType = validTypes.includes(typeStr);
  }

  if (!isValidType) {
    addError(
      result,
      `${fieldPrefix}.type`,
      ErrorCode.INVALID_DATASOURCE_TYPE,
      `数据源类型无效: "${dataSource.type}",有效类型: ${validTypes.join(', ')} 或枚举值 ${validEnumValues.join(', ')}`,
      Severity.Error,
      { dataSourceType: dataSource.type, validTypes, validEnumValues }
    );
  }

  // 3. 根据数据源类型验证特定配置
  // 注意:后端的 AtlDataSource 是扁平化结构,字段直接在对象上,不是嵌套在 config 中
  validateDataSourceConfig(dataSource, fieldPrefix, result);

  // 5. 验证参数映射(如果存在)
  if (dataSource.parameterMappings) {
    // 这里先简单验证,详细验证需要上下文信息
    const mappingKeys = Object.keys(dataSource.parameterMappings);
    if (mappingKeys.length === 0) {
      addError(
        result,
        `${fieldPrefix}.parameterMappings`,
        ErrorCode.INVALID_PARAMETER_REFERENCE,
        '参数映射为空对象,建议删除或添加映射',
        Severity.Warning
      );
    }
  }

  // 更新摘要
  if (result.summary) {
    result.summary.passRate = result.summary.totalChecks > 0
      ? 1 - (result.summary.errorCount / result.summary.totalChecks)
      : 1;
  }

  return result;
}

/**
 * 验证参数映射配置
 *
 * 验证参数映射的正确性,需要提供可用的参数列表进行引用检查
 *
 * @param mapping - 参数映射配置
 * @param availableParams - 可用的模板参数名称列表
 * @returns 参数映射验证结果
 *
 * @example
 * ```typescript
 * const result = validateParameterMapping(
 *   { sourceParameterName: 'userId', referenceExpression: '$parameters.userId' },
 *   ['userId', 'userName']
 * );
 * ```
 */
export function validateParameterMapping(
  mapping: ParameterMapping,
  availableParams: string[]
): ParameterMappingValidationResult {
  const result: ParameterMappingValidationResult = {
    valid: true,
    parameterName: mapping.sourceParameterName,
    referenceExpression: mapping.referenceExpression,
    warnings: [],
  };

  // 1. 验证源参数名称
  if (!mapping.sourceParameterName) {
    result.valid = false;
    result.error = '源参数名称不能为空';
    return result;
  }

  // 2. 验证引用表达式
  if (!mapping.referenceExpression) {
    result.valid = false;
    result.error = '引用表达式不能为空';
    return result;
  }

  // 3. 解析引用表达式
  const refInfo = parseParameterReference(mapping.referenceExpression);
  result.referenceInfo = refInfo;

  if (!refInfo.valid) {
    result.valid = false;
    result.error = refInfo.error || '引用表达式格式无效';
    return result;
  }

  // 4. 验证引用的参数是否存在
  if (refInfo.type === RefType.TemplateParameter) {
    if (refInfo.parameterName && !availableParams.includes(refInfo.parameterName)) {
      result.valid = false;
      result.error = `引用的参数 "${refInfo.parameterName}" 不存在`;
      return result;
    }
  }

  // 5. 验证映射是否启用
  if (mapping.enabled === false) {
    result.warnings?.push('参数映射已禁用');
  }

  return result;
}

/**
 * 验证参数引用语法
 *
 * 验证参数引用表达式是否符合语法规则
 *
 * @param reference - 参数引用表达式
 * @returns 验证结果
 *
 * @example
 * ```typescript
 * validateParameterReference('$parameters.userId'); // valid
 * validateParameterReference('$dataSources.baseData.id'); // valid
 * validateParameterReference('{{ $parameters.count * 2 }}'); // valid
 * validateParameterReference('invalid'); // invalid
 * ```
 */
export function validateParameterReference(reference: string): ValidationResult {
  const result = createEmptyValidationResult();

  if (!reference || typeof reference !== 'string') {
    addError(
      result,
      'reference',
      ErrorCode.INVALID_PARAMETER_REFERENCE,
      '参数引用不能为空',
      Severity.Error
    );
    return result;
  }

  const refInfo = parseParameterReference(reference);

  if (!refInfo.valid) {
    addError(
      result,
      'reference',
      ErrorCode.INVALID_PARAMETER_REFERENCE,
      refInfo.error || '参数引用格式无效',
      Severity.Error,
      { reference }
    );
  }

  return result;
}

/**
 * 验证所有数据源
 *
 * 批量验证多个数据源配置
 *
 * @param dataSources - 数据源定义字典
 * @returns 批量验证结果
 *
 * @example
 * ```typescript
 * const result = validateAllDataSources({
 *   userData: { name: 'userData', type: 'api', config: {...} },
 *   orderData: { name: 'orderData', type: 'sql', config: {...} }
 * });
 * ```
 */
export function validateAllDataSources(
  dataSources: Record<string, AtlDataSource>
): BatchDataSourceValidationResult {
  const results: Record<string, DataSourceValidationResult> = {};
  let totalErrors = 0;
  let totalWarnings = 0;
  let valid = true;

  // 验证每个数据源
  for (const [name, dataSource] of Object.entries(dataSources)) {
    const dsResult = validateDataSource(dataSource);

    results[name] = dsResult;
    totalErrors += dsResult.errors.length;
    totalWarnings += dsResult.warnings?.length || 0;

    if (!dsResult.valid) {
      valid = false;
    }
  }

  // 检查数据源名称重复
  const nameSet = new Set<string>();
  const duplicateNames: string[] = [];

  for (const dataSource of Object.values(dataSources)) {
    if (nameSet.has(dataSource.name)) {
      duplicateNames.push(dataSource.name);
    }
    nameSet.add(dataSource.name);
  }

  if (duplicateNames.length > 0) {
    valid = false;
    totalErrors += duplicateNames.length;
  }

  return {
    valid,
    results,
    totalErrors,
    totalWarnings,
    dataSourceCount: Object.keys(dataSources).length,
  };
}

// ========== 辅助验证函数 ==========

/**
 * 根据数据源类型验证特定配置
 * 注意:后端的 AtlDataSource 是扁平化结构,字段直接在对象上
 */
function validateDataSourceConfig(
  dataSource: AtlDataSource,
  fieldPrefix: string,
  result: DataSourceValidationResult
): void {
  // 统一类型处理:支持字符串和数字枚举
  let type: string;
  if (typeof dataSource.type === 'string') {
    type = dataSource.type.toLowerCase();
  } else if (typeof dataSource.type === 'number') {
    // 后端枚举: 1=Array, 2=Api, 3=Sql
    switch (dataSource.type) {
      case 1:
        type = 'array';
        break;
      case 2:
        type = 'api';
        break;
      case 3:
        type = 'sql';
        break;
      default:
        type = String(dataSource.type).toLowerCase();
    }
  } else {
    type = String(dataSource.type).toLowerCase();
  }

  switch (type) {
    case 'api':
    case '2': // 兼容数字字符串
      // API数据源必须配置url(字段直接在 dataSource 上)
      if (!dataSource.url || (typeof dataSource.url === 'string' && dataSource.url.trim() === '')) {
        addError(
          result,
          `${fieldPrefix}.url`,
          ErrorCode.INVALID_API_ENDPOINT,
          'API数据源必须配置url字段',
          Severity.Error,
          { hint: getConfigHint('api') }
        );
      } else if (!isValidUrl(dataSource.url as string)) {
        addError(
          result,
          `${fieldPrefix}.url`,
          ErrorCode.INVALID_API_ENDPOINT,
          `API端点URL格式无效: ${dataSource.url}`,
          Severity.Error,
          { url: dataSource.url }
        );
      }

      // method可选,默认GET
      if (dataSource.method) {
        const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
        if (!validMethods.includes((dataSource.method as string).toUpperCase())) {
          addError(
            result,
            `${fieldPrefix}.method`,
            ErrorCode.INVALID_API_ENDPOINT,
            `HTTP方法无效: ${dataSource.method},有效方法: ${validMethods.join(', ')}`,
            Severity.Warning,
            { method: dataSource.method, validMethods }
          );
        }
      }
      break;

    case 'sql':
    case '3': // 兼容数字字符串
      // SQL数据源必须配置connectionString和query(字段直接在 dataSource 上)
      if (!dataSource.connectionString || (typeof dataSource.connectionString === 'string' && dataSource.connectionString.trim() === '')) {
        addError(
          result,
          `${fieldPrefix}.connectionString`,
          ErrorCode.INVALID_CONNECTION_STRING,
          'SQL数据源必须配置connectionString字段',
          Severity.Error,
          { hint: getConfigHint('sql') }
        );
      }

      if (!dataSource.query || (typeof dataSource.query === 'string' && dataSource.query.trim() === '')) {
        addError(
          result,
          `${fieldPrefix}.query`,
          ErrorCode.INVALID_SQL_QUERY,
          'SQL数据源必须配置query字段',
          Severity.Error,
          { hint: getConfigHint('sql') }
        );
      } else if (typeof dataSource.query === 'string') {
        // 简单SQL语法检查
        const query = dataSource.query.trim().toUpperCase();
        if (!query.startsWith('SELECT')) {
          addError(
            result,
            `${fieldPrefix}.query`,
            ErrorCode.INVALID_SQL_QUERY,
            'SQL查询必须以SELECT开头(只支持查询操作)',
            Severity.Warning
          );
        }
      }
      break;

    case 'static':
    case 'array': // 后端枚举名称
    case '1': // 兼容数字字符串
      // 静态数据源/数组数据源必须配置data(字段直接在 dataSource 上)
      if (!dataSource.data || !Array.isArray(dataSource.data)) {
        addError(
          result,
          `${fieldPrefix}.data`,
          ErrorCode.MISSING_DATASOURCE_CONFIG,
          '数组数据源必须配置data字段且为数组类型',
          Severity.Error,
          { hint: getConfigHint('array') }
        );
      } else if (dataSource.data.length === 0) {
        addError(
          result,
          `${fieldPrefix}.data`,
          ErrorCode.MISSING_DATASOURCE_CONFIG,
          '数组数据不能为空,请至少添加一条数据',
          Severity.Warning
        );
      }
      break;

    case 'computed':
      // 计算数据源需要其他配置,这里暂不验证
      break;

    default:
      // 未知类型,已在主函数中验证
      break;
  }
}

/**
 * 解析参数引用表达式
 *
 * 将参数引用字符串解析为结构化信息
 */
function parseParameterReference(reference: string): ParameterReferenceInfo {
  const result: ParameterReferenceInfo = {
    type: RefType.StaticValue,
    path: reference,
    valid: false,
  };

  // 1. 尝试匹配模板参数引用
  if (isTemplateParameterReference(reference)) {
    const paramName = extractParameterName(reference);
    if (paramName) {
      result.type = RefType.TemplateParameter;
      result.parameterName = paramName;
      result.path = reference;
      result.valid = true;
      return result;
    }
  }

  // 2. 尝试匹配数据源字段引用
  if (isDataSourceFieldReference(reference)) {
    const dsRef = extractDataSourceReference(reference);
    if (dsRef) {
      result.type = RefType.DataSourceField;
      result.dataSourceName = dsRef.dataSourceName;
      result.fieldPath = dsRef.fieldPath;
      result.path = reference;
      result.valid = true;
      return result;
    }
  }

  // 3. 尝试匹配Scriban表达式
  if (isScribanExpression(reference)) {
    const exprContent = extractExpressionContent(reference);
    if (exprContent) {
      result.type = RefType.Expression;
      result.expression = exprContent;
      result.path = reference;
      result.valid = true;
      return result;
    }
  }

  // 4. 检查是否为变量引用
  if (PARAMETER_REFERENCE_PATTERNS.TEMPLATE_VARIABLE.test(reference)) {
    const match = reference.match(PARAMETER_REFERENCE_PATTERNS.TEMPLATE_VARIABLE);
    if (match) {
      result.type = RefType.Expression; // 变量引用视为表达式的一种
      result.expression = reference;
      result.path = reference;
      result.valid = true;
      return result;
    }
  }

  if (PARAMETER_REFERENCE_PATTERNS.COMPUTED_VARIABLE.test(reference)) {
    const match = reference.match(PARAMETER_REFERENCE_PATTERNS.COMPUTED_VARIABLE);
    if (match) {
      result.type = RefType.Expression;
      result.expression = reference;
      result.path = reference;
      result.valid = true;
      return result;
    }
  }

  // 5. 静态值(不匹配任何模式)
  result.type = RefType.StaticValue;
  result.staticValue = reference;
  result.valid = true; // 静态值也是有效的

  return result;
}

/**
 * 批量验证参数映射
 *
 * 验证数据源的所有参数映射
 */
export function validateParameterMappingsBatch(
  dataSourceName: string,
  parameterMappings: ParameterMappings,
  availableParams: string[]
): ParameterMappingsBatchValidationResult {
  const results: ParameterMappingValidationResult[] = [];
  let errorCount = 0;
  let warningCount = 0;

  for (const [paramName, refExpression] of Object.entries(parameterMappings)) {
    const mapping: ParameterMapping = {
      sourceParameterName: paramName,
      referenceExpression: refExpression,
    };

    const result = validateParameterMapping(mapping, availableParams);
    results.push(result);

    if (!result.valid) {
      errorCount++;
    }

    warningCount += result.warnings?.length || 0;
  }

  return {
    dataSourceName,
    valid: errorCount === 0,
    results,
    errorCount,
    warningCount,
  };
}
