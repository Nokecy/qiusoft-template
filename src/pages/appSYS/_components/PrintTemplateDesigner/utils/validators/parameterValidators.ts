/**
 * 参数验证工具
 * 提供完整的模板参数验证功能,包括参数定义验证、参数值验证、约束条件验证等
 */

import type {
  TemplateParameter,
  ParameterType,
  ParameterConstraints,
  ParameterValue,
  ParameterValues,
} from '../../types/parameter';

import type {
  ValidationResult,
  ValidationError,
  ValidationErrorCode,
  ValidationSeverity,
  ParameterValidationResult,
  BatchParameterValidationResult,
} from '../../types/validation';

import {
  isNumericParameterType,
  isValidParameterType,
  isValidISODateString,
} from '../../types/parameter';

import {
  createValidationError,
  ValidationSeverity as Severity,
  ValidationErrorCode as ErrorCode,
} from '../../types/validation';

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
 * 验证参数名称格式
 * 规则: [a-zA-Z_][a-zA-Z0-9_]*
 */
function isValidParameterName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
}

// ========== 核心验证函数 ==========

/**
 * 验证单个参数定义
 *
 * 检查参数定义的完整性和正确性:
 * - 参数名称格式验证
 * - 参数类型有效性验证
 * - 必填参数默认值验证
 * - 约束条件逻辑验证
 *
 * @param parameter - 参数定义对象
 * @returns 验证结果,包含错误、警告和信息
 *
 * @example
 * ```typescript
 * const result = validateParameter({
 *   name: 'userId',
 *   type: ParameterType.Int,
 *   required: true,
 *   defaultValue: 0
 * });
 * if (!result.valid) {
 *   console.error('参数定义无效:', result.errors);
 * }
 * ```
 */
export function validateParameter(parameter: TemplateParameter): ValidationResult {
  const result = createEmptyValidationResult();
  const fieldPrefix = `parameter.${parameter.name}`;

  // 1. 验证参数名称
  if (!parameter.name) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.INVALID_PARAMETER_NAME,
      '参数名称不能为空',
      Severity.Error
    );
    return result; // 名称无效则无法继续验证
  }

  if (!isValidParameterName(parameter.name)) {
    addError(
      result,
      `${fieldPrefix}.name`,
      ErrorCode.INVALID_PARAMETER_NAME,
      `参数名称格式无效: "${parameter.name}",必须符合规则 [a-zA-Z_][a-zA-Z0-9_]*`,
      Severity.Error,
      { parameterName: parameter.name }
    );
  }

  // 2. 验证参数类型
  if (!parameter.type) {
    addError(
      result,
      `${fieldPrefix}.type`,
      ErrorCode.INVALID_PARAMETER_TYPE,
      '参数类型不能为空',
      Severity.Error
    );
    return result;
  }

  if (!isValidParameterType(parameter.type)) {
    addError(
      result,
      `${fieldPrefix}.type`,
      ErrorCode.INVALID_PARAMETER_TYPE,
      `参数类型无效: "${parameter.type}"`,
      Severity.Error,
      { parameterType: parameter.type }
    );
    return result;
  }

  // 3. 验证必填参数默认值
  if (parameter.required && parameter.defaultValue === undefined) {
    addError(
      result,
      `${fieldPrefix}.defaultValue`,
      ErrorCode.REQUIRED_PARAMETER_MISSING,
      `必填参数 "${parameter.name}" 必须提供默认值`,
      Severity.Error,
      { parameterName: parameter.name }
    );
  }

  // 4. 验证默认值类型匹配
  if (parameter.defaultValue !== undefined) {
    const valueValidation = validateParameterValueType(
      parameter.defaultValue,
      parameter.type
    );
    if (!valueValidation.valid) {
      addError(
        result,
        `${fieldPrefix}.defaultValue`,
        ErrorCode.TYPE_MISMATCH,
        `默认值类型不匹配: 期望 ${parameter.type},实际 ${typeof parameter.defaultValue}`,
        Severity.Error,
        {
          expectedType: parameter.type,
          actualType: typeof parameter.defaultValue,
          value: parameter.defaultValue
        }
      );
    }
  }

  // 5. 验证约束条件
  if (parameter.constraints) {
    const constraintsValidation = validateConstraintsDefinition(
      parameter.constraints,
      parameter.type,
      fieldPrefix
    );

    // 合并约束验证结果
    result.errors.push(...constraintsValidation.errors);
    if (constraintsValidation.warnings) {
      result.warnings = result.warnings || [];
      result.warnings.push(...constraintsValidation.warnings);
    }
    if (!constraintsValidation.valid) {
      result.valid = false;
    }
  }

  // 6. 验证枚举配置
  if (parameter.constraints?.enum && parameter.constraints.enumLabels) {
    if (parameter.constraints.enum.length !== parameter.constraints.enumLabels.length) {
      addError(
        result,
        `${fieldPrefix}.constraints.enumLabels`,
        ErrorCode.CUSTOM_VALIDATION_FAILED,
        `枚举标签数量 (${parameter.constraints.enumLabels.length}) 与枚举值数量 (${parameter.constraints.enum.length}) 不匹配`,
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
 * 验证参数值
 *
 * 验证运行时参数值是否符合参数定义的要求:
 * - 类型匹配验证
 * - 必填验证
 * - 约束条件验证
 *
 * @param value - 参数值
 * @param parameter - 参数定义
 * @returns 参数验证结果
 *
 * @example
 * ```typescript
 * const result = validateParameterValue(123, {
 *   name: 'count',
 *   type: ParameterType.Int,
 *   required: true,
 *   constraints: { min: 0, max: 100 }
 * });
 * ```
 */
export function validateParameterValue(
  value: unknown,
  parameter: TemplateParameter
): ParameterValidationResult {
  const result: ParameterValidationResult = {
    ...createEmptyValidationResult(),
    parameterName: parameter.name,
    parameterType: parameter.type,
    validatedValue: value,
    constraintsValid: true,
  };

  const fieldPrefix = `parameter.${parameter.name}.value`;

  // 1. 验证必填参数
  if (parameter.required && (value === undefined || value === null)) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.REQUIRED_PARAMETER_MISSING,
      `必填参数 "${parameter.name}" 的值不能为空`,
      Severity.Error,
      { parameterName: parameter.name }
    );
    return result;
  }

  // 2. 允许可选参数为空
  if (!parameter.required && (value === undefined || value === null)) {
    return result;
  }

  // 3. 验证类型匹配
  const typeValidation = validateParameterValueType(value, parameter.type);
  if (!typeValidation.valid) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.TYPE_MISMATCH,
      `参数 "${parameter.name}" 类型不匹配: 期望 ${parameter.type},实际 ${typeof value}`,
      Severity.Error,
      {
        expectedType: parameter.type,
        actualType: typeof value,
        value
      }
    );
    return result;
  }

  // 4. 验证约束条件
  if (parameter.constraints) {
    const constraintsValidation = validateConstraints(
      value,
      parameter.constraints,
      parameter.type
    );

    result.errors.push(...constraintsValidation.errors);
    if (constraintsValidation.warnings) {
      result.warnings = result.warnings || [];
      result.warnings.push(...constraintsValidation.warnings);
    }

    result.constraintsValid = constraintsValidation.valid;
    if (!constraintsValidation.valid) {
      result.valid = false;
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
 * 验证约束条件
 *
 * 验证参数值是否满足定义的约束条件
 *
 * @param value - 参数值
 * @param constraints - 约束条件定义
 * @param type - 参数类型
 * @returns 验证结果
 *
 * @example
 * ```typescript
 * const result = validateConstraints(
 *   150,
 *   { min: 0, max: 100 },
 *   ParameterType.Int
 * );
 * // result.valid === false, 值超出范围
 * ```
 */
export function validateConstraints(
  value: unknown,
  constraints: ParameterConstraints,
  type: ParameterType
): ValidationResult {
  const result = createEmptyValidationResult();
  const fieldPrefix = `value`;

  // 1. 数值类型约束验证
  if (isNumericParameterType(type)) {
    validateNumericConstraints(value as number, constraints, fieldPrefix, result);
  }

  // 2. 字符串类型约束验证
  if (type === ParameterType.String) {
    validateStringConstraints(value as string, constraints, fieldPrefix, result);
  }

  // 3. 数组类型约束验证
  if (type === ParameterType.Array) {
    validateArrayConstraints(value as unknown[], constraints, fieldPrefix, result);
  }

  // 4. 日期时间类型约束验证
  if (type === ParameterType.DateTime) {
    validateDateTimeConstraints(value as string, constraints, fieldPrefix, result);
  }

  // 5. 枚举约束验证(适用于所有类型)
  if (constraints.enum && constraints.enum.length > 0) {
    validateEnumConstraint(value, constraints.enum, fieldPrefix, result);
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
 * 验证所有参数
 *
 * 批量验证多个参数定义
 *
 * @param parameters - 参数定义字典
 * @returns 批量验证结果
 *
 * @example
 * ```typescript
 * const result = validateAllParameters({
 *   userId: { name: 'userId', type: ParameterType.Int, required: true, defaultValue: 0 },
 *   userName: { name: 'userName', type: ParameterType.String, required: false }
 * });
 * ```
 */
export function validateAllParameters(
  parameters: Record<string, TemplateParameter>
): BatchParameterValidationResult {
  const results: Record<string, ParameterValidationResult> = {};
  let totalErrors = 0;
  let totalWarnings = 0;
  let valid = true;

  // 验证每个参数
  for (const [name, parameter] of Object.entries(parameters)) {
    const paramResult = validateParameter(parameter);

    results[name] = {
      ...paramResult,
      parameterName: name,
      parameterType: parameter.type,
    };

    totalErrors += paramResult.errors.length;
    totalWarnings += paramResult.warnings?.length || 0;

    if (!paramResult.valid) {
      valid = false;
    }
  }

  // 检查参数名称重复(理论上Record不会有重复key,但检查一下定义内部的name字段)
  const nameSet = new Set<string>();
  const duplicateNames: string[] = [];

  for (const parameter of Object.values(parameters)) {
    if (nameSet.has(parameter.name)) {
      duplicateNames.push(parameter.name);
    }
    nameSet.add(parameter.name);
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
    parameterCount: Object.keys(parameters).length,
  };
}

// ========== 类型验证辅助函数 ==========

/**
 * 验证参数值类型是否匹配参数定义类型
 */
function validateParameterValueType(
  value: unknown,
  type: ParameterType
): ValidationResult {
  const result = createEmptyValidationResult();

  switch (type) {
    case ParameterType.String:
      if (typeof value !== 'string') {
        result.valid = false;
      }
      break;

    case ParameterType.Int:
    case ParameterType.Long:
    case ParameterType.Double:
      if (typeof value !== 'number' || isNaN(value)) {
        result.valid = false;
      }
      // 整数类型额外检查
      if ((type === ParameterType.Int || type === ParameterType.Long) &&
          !Number.isInteger(value)) {
        result.valid = false;
      }
      break;

    case ParameterType.Bool:
      if (typeof value !== 'boolean') {
        result.valid = false;
      }
      break;

    case ParameterType.DateTime:
      if (typeof value !== 'string' || !isValidISODateString(value)) {
        result.valid = false;
      }
      break;

    case ParameterType.Array:
      if (!Array.isArray(value)) {
        result.valid = false;
      }
      break;

    default:
      result.valid = false;
  }

  return result;
}

/**
 * 验证约束定义的逻辑一致性
 */
function validateConstraintsDefinition(
  constraints: ParameterConstraints,
  type: ParameterType,
  fieldPrefix: string
): ValidationResult {
  const result = createEmptyValidationResult();

  // 验证数值约束
  if (isNumericParameterType(type)) {
    if (constraints.min !== undefined && constraints.max !== undefined) {
      if (constraints.min > constraints.max) {
        addError(
          result,
          `${fieldPrefix}.constraints`,
          ErrorCode.CUSTOM_VALIDATION_FAILED,
          `最小值 (${constraints.min}) 不能大于最大值 (${constraints.max})`,
          Severity.Error,
          { min: constraints.min, max: constraints.max }
        );
      }
    }

    if (constraints.positiveOnly && constraints.min !== undefined && constraints.min < 0) {
      addError(
        result,
        `${fieldPrefix}.constraints`,
        ErrorCode.CUSTOM_VALIDATION_FAILED,
        `positiveOnly为true时,最小值不能为负数`,
        Severity.Warning
      );
    }
  }

  // 验证字符串约束
  if (type === ParameterType.String) {
    if (constraints.minLength !== undefined && constraints.maxLength !== undefined) {
      if (constraints.minLength > constraints.maxLength) {
        addError(
          result,
          `${fieldPrefix}.constraints`,
          ErrorCode.CUSTOM_VALIDATION_FAILED,
          `最小长度 (${constraints.minLength}) 不能大于最大长度 (${constraints.maxLength})`,
          Severity.Error
        );
      }
    }

    if (constraints.pattern) {
      try {
        new RegExp(constraints.pattern);
      } catch {
        addError(
          result,
          `${fieldPrefix}.constraints.pattern`,
          ErrorCode.PATTERN_MISMATCH,
          `正则表达式无效: ${constraints.pattern}`,
          Severity.Error
        );
      }
    }
  }

  // 验证数组约束
  if (type === ParameterType.Array) {
    if (constraints.minItems !== undefined && constraints.maxItems !== undefined) {
      if (constraints.minItems > constraints.maxItems) {
        addError(
          result,
          `${fieldPrefix}.constraints`,
          ErrorCode.CUSTOM_VALIDATION_FAILED,
          `最小项数 (${constraints.minItems}) 不能大于最大项数 (${constraints.maxItems})`,
          Severity.Error
        );
      }
    }
  }

  // 验证日期约束
  if (type === ParameterType.DateTime) {
    if (constraints.minDate && !isValidISODateString(constraints.minDate)) {
      addError(
        result,
        `${fieldPrefix}.constraints.minDate`,
        ErrorCode.INVALID_DATE_FORMAT,
        `最早日期格式无效: ${constraints.minDate}`,
        Severity.Error
      );
    }

    if (constraints.maxDate && !isValidISODateString(constraints.maxDate)) {
      addError(
        result,
        `${fieldPrefix}.constraints.maxDate`,
        ErrorCode.INVALID_DATE_FORMAT,
        `最晚日期格式无效: ${constraints.maxDate}`,
        Severity.Error
      );
    }

    if (constraints.minDate && constraints.maxDate) {
      const minDate = new Date(constraints.minDate);
      const maxDate = new Date(constraints.maxDate);
      if (minDate > maxDate) {
        addError(
          result,
          `${fieldPrefix}.constraints`,
          ErrorCode.CUSTOM_VALIDATION_FAILED,
          `最早日期不能晚于最晚日期`,
          Severity.Error
        );
      }
    }
  }

  return result;
}

// ========== 具体约束验证函数 ==========

/**
 * 验证数值约束
 */
function validateNumericConstraints(
  value: number,
  constraints: ParameterConstraints,
  fieldPrefix: string,
  result: ValidationResult
): void {
  // 最小值验证
  if (constraints.min !== undefined && value < constraints.min) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.VALUE_OUT_OF_RANGE,
      `值 ${value} 小于最小值 ${constraints.min}`,
      Severity.Error,
      { value, min: constraints.min }
    );
  }

  // 最大值验证
  if (constraints.max !== undefined && value > constraints.max) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.VALUE_OUT_OF_RANGE,
      `值 ${value} 大于最大值 ${constraints.max}`,
      Severity.Error,
      { value, max: constraints.max }
    );
  }

  // 不允许为0验证
  if (constraints.allowZero === false && value === 0) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.CUSTOM_VALIDATION_FAILED,
      `值不能为0`,
      Severity.Error,
      { value }
    );
  }

  // 只允许正数验证
  if (constraints.positiveOnly && value <= 0) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.VALUE_OUT_OF_RANGE,
      `值必须为正数,当前值: ${value}`,
      Severity.Error,
      { value }
    );
  }
}

/**
 * 验证字符串约束
 */
function validateStringConstraints(
  value: string,
  constraints: ParameterConstraints,
  fieldPrefix: string,
  result: ValidationResult
): void {
  // 最小长度验证
  if (constraints.minLength !== undefined && value.length < constraints.minLength) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.STRING_LENGTH_EXCEEDED,
      `字符串长度 ${value.length} 小于最小长度 ${constraints.minLength}`,
      Severity.Error,
      { length: value.length, minLength: constraints.minLength }
    );
  }

  // 最大长度验证
  if (constraints.maxLength !== undefined && value.length > constraints.maxLength) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.STRING_LENGTH_EXCEEDED,
      `字符串长度 ${value.length} 超过最大长度 ${constraints.maxLength}`,
      Severity.Error,
      { length: value.length, maxLength: constraints.maxLength }
    );
  }

  // 空字符串验证
  if (constraints.allowEmpty === false && value === '') {
    addError(
      result,
      fieldPrefix,
      ErrorCode.CUSTOM_VALIDATION_FAILED,
      `不允许空字符串`,
      Severity.Error
    );
  }

  // 正则表达式验证
  if (constraints.pattern) {
    try {
      const regex = new RegExp(constraints.pattern);
      if (!regex.test(value)) {
        addError(
          result,
          fieldPrefix,
          ErrorCode.PATTERN_MISMATCH,
          `值不匹配正则表达式: ${constraints.pattern}`,
          Severity.Error,
          { value, pattern: constraints.pattern }
        );
      }
    } catch (error) {
      addError(
        result,
        fieldPrefix,
        ErrorCode.PATTERN_MISMATCH,
        `正则表达式无效: ${constraints.pattern}`,
        Severity.Error
      );
    }
  }
}

/**
 * 验证数组约束
 */
function validateArrayConstraints(
  value: unknown[],
  constraints: ParameterConstraints,
  fieldPrefix: string,
  result: ValidationResult
): void {
  // 最小项数验证
  if (constraints.minItems !== undefined && value.length < constraints.minItems) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.ARRAY_SIZE_EXCEEDED,
      `数组项数 ${value.length} 小于最小项数 ${constraints.minItems}`,
      Severity.Error,
      { count: value.length, minItems: constraints.minItems }
    );
  }

  // 最大项数验证
  if (constraints.maxItems !== undefined && value.length > constraints.maxItems) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.ARRAY_SIZE_EXCEEDED,
      `数组项数 ${value.length} 超过最大项数 ${constraints.maxItems}`,
      Severity.Error,
      { count: value.length, maxItems: constraints.maxItems }
    );
  }

  // 空数组验证
  if (constraints.allowEmptyArray === false && value.length === 0) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.CUSTOM_VALIDATION_FAILED,
      `不允许空数组`,
      Severity.Error
    );
  }

  // 数组项类型验证
  if (constraints.itemType) {
    value.forEach((item, index) => {
      const itemValidation = validateParameterValueType(item, constraints.itemType!);
      if (!itemValidation.valid) {
        addError(
          result,
          `${fieldPrefix}[${index}]`,
          ErrorCode.TYPE_MISMATCH,
          `数组项 [${index}] 类型不匹配: 期望 ${constraints.itemType}`,
          Severity.Error,
          { index, expectedType: constraints.itemType, actualType: typeof item }
        );
      }
    });
  }
}

/**
 * 验证日期时间约束
 */
function validateDateTimeConstraints(
  value: string,
  constraints: ParameterConstraints,
  fieldPrefix: string,
  result: ValidationResult
): void {
  // 先验证日期格式
  if (!isValidISODateString(value)) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.INVALID_DATE_FORMAT,
      `日期格式无效: ${value}`,
      Severity.Error,
      { value }
    );
    return;
  }

  const date = new Date(value);

  // 最早日期验证
  if (constraints.minDate) {
    const minDate = new Date(constraints.minDate);
    if (date < minDate) {
      addError(
        result,
        fieldPrefix,
        ErrorCode.VALUE_OUT_OF_RANGE,
        `日期 ${value} 早于最早日期 ${constraints.minDate}`,
        Severity.Error,
        { value, minDate: constraints.minDate }
      );
    }
  }

  // 最晚日期验证
  if (constraints.maxDate) {
    const maxDate = new Date(constraints.maxDate);
    if (date > maxDate) {
      addError(
        result,
        fieldPrefix,
        ErrorCode.VALUE_OUT_OF_RANGE,
        `日期 ${value} 晚于最晚日期 ${constraints.maxDate}`,
        Severity.Error,
        { value, maxDate: constraints.maxDate }
      );
    }
  }
}

/**
 * 验证枚举约束
 */
function validateEnumConstraint(
  value: unknown,
  enumValues: Array<string | number | boolean>,
  fieldPrefix: string,
  result: ValidationResult
): void {
  if (!enumValues.includes(value as string | number | boolean)) {
    addError(
      result,
      fieldPrefix,
      ErrorCode.VALUE_NOT_IN_ENUM,
      `值 ${value} 不在枚举列表中: [${enumValues.join(', ')}]`,
      Severity.Error,
      { value, enumValues }
    );
  }
}
