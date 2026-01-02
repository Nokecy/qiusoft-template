/**
 * 验证工具统一导出
 * 提供所有验证器和分析器的统一访问入口
 */

// ========== 参数验证器 ==========
export {
  validateParameter,
  validateParameterValue,
  validateConstraints,
  validateAllParameters,
} from './parameterValidators';

// ========== 数据源验证器 ==========
export {
  validateDataSource,
  validateParameterMapping,
  validateParameterReference,
  validateAllDataSources,
  validateParameterMappingsBatch,
} from './dataSourceValidators';

// ========== 依赖关系分析器 ==========
export {
  buildDependencyGraph,
  detectCircularDependency,
  detectCircularDependencyEnhanced,
  topologicalSort,
  getExecutionOrder,
  validateDependencyIntegrity,
  getAncestors,
  getDescendants,
  getLongestPath,
  optimizeExecutionPlan,
} from './dependencyAnalyzer';

// ========== 模板验证器 ==========
export {
  validateTemplate,
  validateTemplateParameters,
  validateTemplateDataSources,
  validateTemplateDependencies,
  validateTemplateRuntimeParameters,
} from './templateValidator';

// ========== 类型导出(便于使用) ==========
export type {
  ValidationResult,
  ValidationError,
  ParameterValidationResult,
  BatchParameterValidationResult,
  DataSourceValidationResult,
  BatchDataSourceValidationResult,
  TemplateValidationResult,
} from '../../types/validation';

export type {
  DependencyGraph,
  DependencyGraphNode,
  DependencyGraphEdge,
  TopologicalSortResult,
  CircularDependencyDetectionResult,
  DataSourceExecutionPlan,
  ExecutionStage,
} from '../../types/dependency';
