/**
 * 模板验证器
 * 提供完整的ATL模板验证功能,包括参数、数据源、依赖关系的综合验证
 */

import type {
  TemplateParameter,
  ParameterValues,
} from '../../types/parameter';

import type {
  ValidationResult,
  TemplateValidationResult,
  ValidationSeverity,
  ValidationErrorCode,
} from '../../types/validation';

import {
  createValidationError,
  mergeValidationResults,
  ValidationSeverity as Severity,
  ValidationErrorCode as ErrorCode,
} from '../../types/validation';

import {
  validateAllParameters,
  validateParameterValue,
} from './parameterValidators';

import {
  validateAllDataSources,
} from './dataSourceValidators';

import {
  buildDependencyGraph,
  detectCircularDependency,
  validateDependencyIntegrity,
} from './dependencyAnalyzer';

// 临时接口定义(后续根据实际类型调整)
interface AtlDataSource {
  name: string;
  type: string;
  description?: string;
  config: Record<string, unknown>;
  parameterMappings?: Record<string, string>;
  enabled?: boolean;
}

interface AtlTemplate {
  id?: string;
  name: string;
  version?: string;
  description?: string;
  parameters?: Record<string, TemplateParameter>;
  dataSources?: Record<string, AtlDataSource>;
  elements?: unknown[];
  metadata?: Record<string, unknown>;
}

// ========== 辅助函数 ==========

/**
 * 将批量参数验证结果转换为ValidationResult
 */
function convertBatchParameterValidationToValidationResult(
  batchResult: import('../../types/validation').BatchParameterValidationResult
): ValidationResult {
  const errors: import('../../types/validation').ValidationError[] = [];
  const warnings: import('../../types/validation').ValidationError[] = [];

  // 收集所有参数验证结果中的错误和警告
  Object.values(batchResult.results).forEach((paramResult) => {
    errors.push(...paramResult.errors);
    if (paramResult.warnings) {
      warnings.push(...paramResult.warnings);
    }
  });

  return {
    valid: batchResult.valid,
    errors,
    warnings,
    infos: [],
    summary: {
      errorCount: batchResult.totalErrors,
      warningCount: batchResult.totalWarnings,
      infoCount: 0,
      totalChecks: batchResult.parameterCount,
      passRate: batchResult.parameterCount > 0
        ? 1 - (batchResult.totalErrors / batchResult.parameterCount)
        : 1,
    },
  };
}

/**
 * 将批量数据源验证结果转换为ValidationResult
 */
function convertBatchDataSourceValidationToValidationResult(
  batchResult: import('../../types/validation').BatchDataSourceValidationResult
): ValidationResult {
  const errors: import('../../types/validation').ValidationError[] = [];
  const warnings: import('../../types/validation').ValidationError[] = [];

  // 收集所有数据源验证结果中的错误和警告
  Object.values(batchResult.results).forEach((dsResult) => {
    errors.push(...dsResult.errors);
    if (dsResult.warnings) {
      warnings.push(...dsResult.warnings);
    }
  });

  return {
    valid: batchResult.valid,
    errors,
    warnings,
    infos: [],
    summary: {
      errorCount: batchResult.totalErrors,
      warningCount: batchResult.totalWarnings,
      infoCount: 0,
      totalChecks: batchResult.dataSourceCount,
      passRate: batchResult.dataSourceCount > 0
        ? 1 - (batchResult.totalErrors / batchResult.dataSourceCount)
        : 1,
    },
  };
}

/**
 * 创建空的模板验证结果
 */
function createEmptyTemplateValidationResult(): TemplateValidationResult {
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
    canSave: true,
    canPublish: true,
  };
}

/**
 * 添加错误到验证结果
 */
function addError(
  result: TemplateValidationResult,
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
    result.canSave = false;
    result.canPublish = false;
    if (result.summary) {
      result.summary.errorCount++;
    }
  } else if (severity === Severity.Warning) {
    result.warnings = result.warnings || [];
    result.warnings.push(error);
    result.canPublish = false; // 有警告不能发布,但可以保存
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

// ========== 核心验证函数 ==========

/**
 * 验证完整模板
 *
 * 执行模板的全面验证,包括:
 * - 基本信息验证(名称、版本等)
 * - 参数定义验证
 * - 数据源配置验证
 * - 依赖关系验证
 * - 元素绑定验证
 *
 * @param template - ATL模板对象
 * @returns 模板验证结果
 *
 * @example
 * ```typescript
 * const result = validateTemplate({
 *   name: 'InvoiceTemplate',
 *   version: '1.0.0',
 *   parameters: { ... },
 *   dataSources: { ... },
 *   elements: [ ... ]
 * });
 *
 * if (!result.valid) {
 *   console.error('模板验证失败:', result.errors);
 * }
 *
 * if (result.canSave) {
 *   // 可以保存模板(允许警告)
 * }
 *
 * if (result.canPublish) {
 *   // 可以发布模板(不允许警告和错误)
 * }
 * ```
 */
export function validateTemplate(template: AtlTemplate): TemplateValidationResult {
  const startTime = Date.now();
  const result = createEmptyTemplateValidationResult();

  result.templateId = template.id;
  result.templateName = template.name;

  // 1. 验证模板基本信息
  validateTemplateBasicInfo(template, result);

  // 2. 验证模板参数定义
  const parametersValidation = validateTemplateParameters(template);
  result.subResults = result.subResults || {};
  result.subResults.parametersValidation = parametersValidation;

  // 合并参数验证结果
  if (!parametersValidation.valid) {
    result.valid = false;
    result.canSave = false;
    result.canPublish = false;
  }

  // 3. 验证模板数据源
  const dataSourcesValidation = validateTemplateDataSources(template);
  result.subResults.dataSourcesValidation = dataSourcesValidation;

  // 合并数据源验证结果
  if (!dataSourcesValidation.valid) {
    result.valid = false;
    result.canSave = false;
    result.canPublish = false;
  }

  // 4. 验证依赖关系
  const dependenciesValidation = validateTemplateDependencies(template);
  result.subResults.dependenciesValidation = dependenciesValidation;

  // 合并依赖验证结果
  if (!dependenciesValidation.valid) {
    result.valid = false;
    result.canSave = false;
    result.canPublish = false;
  }

  // 5. 验证元素绑定(如果有元素)
  if (template.elements && template.elements.length > 0) {
    const elementsValidation = validateTemplateElements(template);
    result.subResults.elementsValidation = elementsValidation;

    if (!elementsValidation.valid) {
      result.valid = false;
      result.canSave = false;
      result.canPublish = false;
    }
  }

  // 6. 汇总所有验证结果
  // 转换批量验证结果为ValidationResult类型
  const parametersValidationResult = convertBatchParameterValidationToValidationResult(parametersValidation);
  const dataSourcesValidationResult = convertBatchDataSourceValidationToValidationResult(dataSourcesValidation);

  const allResults: ValidationResult[] = [
    parametersValidationResult,
    dataSourcesValidationResult,
    dependenciesValidation,
  ];

  if (result.subResults.elementsValidation) {
    allResults.push(result.subResults.elementsValidation);
  }

  const mergedResult = mergeValidationResults(allResults);
  result.errors = mergedResult.errors;
  result.warnings = mergedResult.warnings || [];
  result.infos = mergedResult.infos || [];

  // 7. 更新摘要
  if (result.summary) {
    result.summary.errorCount = result.errors.length;
    result.summary.warningCount = result.warnings?.length || 0;
    result.summary.infoCount = result.infos?.length || 0;
    result.summary.totalChecks = mergedResult.summary?.totalChecks || 0;
    result.summary.passRate = mergedResult.summary?.passRate || 0;
  }

  // 8. 添加验证元数据
  const endTime = Date.now();
  result.metadata = {
    validatedAt: new Date().toISOString(),
    validationTime: endTime - startTime,
    validatorVersion: '1.0.0',
  };

  return result;
}

/**
 * 验证模板参数定义
 *
 * 验证模板中所有参数的定义是否正确
 *
 * @param template - ATL模板对象
 * @returns 批量参数验证结果
 *
 * @example
 * ```typescript
 * const result = validateTemplateParameters(template);
 * if (!result.valid) {
 *   console.error('参数验证失败:', result.totalErrors);
 * }
 * ```
 */
export function validateTemplateParameters(template: AtlTemplate) {
  // 如果没有参数定义,返回空结果
  if (!template.parameters || Object.keys(template.parameters).length === 0) {
    return {
      valid: true,
      results: {},
      totalErrors: 0,
      totalWarnings: 0,
      parameterCount: 0,
    };
  }

  // 使用parameterValidators中的批量验证函数
  return validateAllParameters(template.parameters);
}

/**
 * 验证模板数据源
 *
 * 验证模板中所有数据源的配置是否正确
 *
 * @param template - ATL模板对象
 * @returns 批量数据源验证结果
 *
 * @example
 * ```typescript
 * const result = validateTemplateDataSources(template);
 * if (!result.valid) {
 *   console.error('数据源验证失败:', result.totalErrors);
 * }
 * ```
 */
export function validateTemplateDataSources(template: AtlTemplate) {
  // 如果没有数据源定义,返回空结果
  if (!template.dataSources || Object.keys(template.dataSources).length === 0) {
    return {
      valid: true,
      results: {},
      totalErrors: 0,
      totalWarnings: 0,
      dataSourceCount: 0,
    };
  }

  // 使用dataSourceValidators中的批量验证函数
  return validateAllDataSources(template.dataSources);
}

/**
 * 验证模板依赖关系
 *
 * 验证数据源之间的依赖关系是否正确,是否存在循环依赖
 *
 * @param template - ATL模板对象
 * @returns 依赖关系验证结果
 *
 * @example
 * ```typescript
 * const result = validateTemplateDependencies(template);
 * if (!result.valid) {
 *   console.error('依赖关系验证失败:', result.errors);
 * }
 * ```
 */
export function validateTemplateDependencies(template: AtlTemplate): ValidationResult {
  const result: ValidationResult = {
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

  // 如果没有数据源,无需验证依赖
  if (!template.dataSources || Object.keys(template.dataSources).length === 0) {
    return result;
  }

  try {
    // 1. 构建依赖图
    const graph = buildDependencyGraph(template.dataSources);

    // 2. 检测循环依赖
    const cycles = detectCircularDependency(graph);

    if (cycles.length > 0) {
      cycles.forEach((cycle) => {
        addError(
          result as any,
          'dataSources.dependencies',
          'CIRCULAR_DEPENDENCY',
          `检测到循环依赖: ${cycle.join(' -> ')}`,
          Severity.Error,
          { cycle }
        );
      });
    }

    // 3. 验证依赖完整性(检查引用的数据源是否存在)
    const missingDeps = validateDependencyIntegrity(graph);

    if (missingDeps.size > 0) {
      missingDeps.forEach((missing, nodeId) => {
        addError(
          result as any,
          `dataSources.${nodeId}.dependencies`,
          'REFERENCED_DATASOURCE_NOT_FOUND',
          `数据源 "${nodeId}" 引用了不存在的数据源: ${missing.join(', ')}`,
          Severity.Error,
          { dataSourceName: nodeId, missingDependencies: missing }
        );
      });
    }

    // 4. 检查孤立节点(没有依赖也不被依赖的数据源)
    // 注释掉此检查,因为独立数据源是合理的使用场景
    // const orphanNodes = graph.nodes.filter(
    //   (n) => n.dependsOn.length === 0 && (!n.dependents || n.dependents.length === 0)
    // );

    // if (orphanNodes.length > 0) {
    //   orphanNodes.forEach((node) => {
    //     addError(
    //       result as any,
    //       `dataSources.${node.id}`,
    //       'UNUSED_DATASOURCE',
    //       `数据源 "${node.id}" 既不依赖其他数据源,也不被其他数据源依赖,可能未使用`,
    //       Severity.Warning,
    //       { dataSourceName: node.id }
    //     );
    //   });
    // }

    // 5. 检查深层依赖链(超过5层的依赖链可能影响性能)
    const deepNodes = graph.nodes.filter((n) => n.layer > 5);

    if (deepNodes.length > 0) {
      deepNodes.forEach((node) => {
        addError(
          result as any,
          `dataSources.${node.id}`,
          'DEEP_DEPENDENCY_CHAIN',
          `数据源 "${node.id}" 的依赖链过深(层级: ${node.layer}),可能影响性能`,
          Severity.Warning,
          { dataSourceName: node.id, layer: node.layer }
        );
      });
    }

    // 更新摘要
    if (result.summary) {
      result.summary.passRate = result.summary.totalChecks > 0
        ? 1 - (result.summary.errorCount / result.summary.totalChecks)
        : 1;
    }

  } catch (error) {
    addError(
      result as any,
      'dataSources.dependencies',
      'INVALID_DEPENDENCY_CONFIG',
      `依赖关系分析失败: ${error instanceof Error ? error.message : String(error)}`,
      Severity.Error
    );
  }

  return result;
}

/**
 * 验证模板元素绑定
 *
 * 验证模板元素的数据绑定是否正确
 *
 * @param template - ATL模板对象
 * @returns 元素验证结果
 */
function validateTemplateElements(template: AtlTemplate): ValidationResult {
  const result: ValidationResult = {
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

  // 当前版本简单验证,后续可扩展
  // 检查元素引用的数据源是否存在
  const dataSourceNames = template.dataSources
    ? Object.keys(template.dataSources)
    : [];

  if (template.elements) {
    template.elements.forEach((element: any, index) => {
      // 检查元素是否绑定了数据源
      if (element.dataSourceName) {
        if (!dataSourceNames.includes(element.dataSourceName)) {
          addError(
            result as any,
            `elements[${index}].dataSourceName`,
            ErrorCode.ELEMENT_DATASOURCE_NOT_FOUND,
            `元素 [${index}] 引用的数据源 "${element.dataSourceName}" 不存在`,
            Severity.Error,
            { elementIndex: index, dataSourceName: element.dataSourceName }
          );
        }
      }

      // 检查绑定表达式
      if (element.binding && typeof element.binding === 'string') {
        // 简单的表达式检查(检查是否包含未定义的数据源引用)
        const dsRefs = element.binding.match(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
        if (dsRefs) {
          dsRefs.forEach((ref: string) => {
            const dsName = ref.replace('$dataSources.', '').split('.')[0];
            if (!dataSourceNames.includes(dsName)) {
              addError(
                result as any,
                `elements[${index}].binding`,
                ErrorCode.INVALID_ELEMENT_BINDING,
                `元素 [${index}] 的绑定表达式引用了不存在的数据源 "${dsName}"`,
                Severity.Error,
                { elementIndex: index, dataSourceName: dsName, binding: element.binding }
              );
            }
          });
        }
      }
    });
  }

  return result;
}

/**
 * 验证模板基本信息
 *
 * 验证模板的名称、版本等基本信息
 */
function validateTemplateBasicInfo(
  template: AtlTemplate,
  result: TemplateValidationResult
): void {
  // 1. 验证模板名称
  if (!template.name || template.name.trim() === '') {
    addError(
      result,
      'template.name',
      ErrorCode.INVALID_TEMPLATE_NAME,
      '模板名称不能为空',
      Severity.Error
    );
  }

  // 2. 验证模板版本格式(如果提供)
  if (template.version) {
    const versionPattern = /^\d+\.\d+\.\d+$/;
    if (!versionPattern.test(template.version)) {
      addError(
        result,
        'template.version',
        ErrorCode.INCOMPATIBLE_TEMPLATE_VERSION,
        `模板版本格式无效: "${template.version}",应符合语义化版本格式(如: 1.0.0)`,
        Severity.Warning,
        { version: template.version }
      );
    }
  }
}

/**
 * 验证模板运行时参数值
 *
 * 验证运行时提供的参数值是否符合模板参数定义
 *
 * @param template - ATL模板对象
 * @param parameterValues - 运行时参数值
 * @returns 验证结果
 *
 * @example
 * ```typescript
 * const result = validateTemplateRuntimeParameters(template, {
 *   userId: 123,
 *   userName: 'John Doe'
 * });
 *
 * if (!result.valid) {
 *   console.error('参数值验证失败:', result.errors);
 * }
 * ```
 */
export function validateTemplateRuntimeParameters(
  template: AtlTemplate,
  parameterValues: ParameterValues
): ValidationResult {
  const result: ValidationResult = {
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

  if (!template.parameters) {
    return result;
  }

  // 验证每个参数值
  for (const [paramName, paramDef] of Object.entries(template.parameters)) {
    const value = parameterValues[paramName];
    const valueResult = validateParameterValue(value, paramDef);

    // 合并验证结果
    result.errors.push(...valueResult.errors);
    if (valueResult.warnings) {
      result.warnings = result.warnings || [];
      result.warnings.push(...valueResult.warnings);
    }

    if (!valueResult.valid) {
      result.valid = false;
    }
  }

  // 更新摘要
  if (result.summary) {
    result.summary.errorCount = result.errors.length;
    result.summary.warningCount = result.warnings?.length || 0;
    result.summary.totalChecks = Object.keys(template.parameters).length;
    result.summary.passRate = result.summary.totalChecks > 0
      ? 1 - (result.summary.errorCount / result.summary.totalChecks)
      : 1;
  }

  return result;
}
