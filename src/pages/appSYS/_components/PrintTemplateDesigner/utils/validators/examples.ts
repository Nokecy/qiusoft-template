/**
 * ATL模板验证工具使用示例
 *
 * 本文件展示如何使用验证工具进行各种验证操作
 */

import { ParameterType } from '../../types/parameter';
import type { TemplateParameter } from '../../types/parameter';
import {
  validateParameter,
  validateParameterValue,
  validateAllParameters,
  validateDataSource,
  validateParameterMapping,
  validateAllDataSources,
  buildDependencyGraph,
  detectCircularDependency,
  topologicalSort,
  getExecutionOrder,
  validateTemplate,
  validateTemplateRuntimeParameters,
} from './index';

// ========== 示例1: 参数验证 ==========

export function example1_ParameterValidation() {
  console.log('=== 示例1: 参数验证 ===\n');

  // 1.1 验证单个参数定义
  const userIdParam: TemplateParameter = {
    name: 'userId',
    type: ParameterType.Int,
    required: true,
    defaultValue: 0,
    description: '用户ID',
    constraints: {
      min: 0,
      max: 999999,
    },
  };

  const result1 = validateParameter(userIdParam);
  console.log('1.1 参数定义验证:', result1.valid ? '通过' : '失败');
  if (!result1.valid) {
    result1.errors.forEach((err) => {
      console.log(`  错误: [${err.code}] ${err.message}`);
    });
  }

  // 1.2 验证参数值
  const result2 = validateParameterValue(12345, userIdParam);
  console.log('\n1.2 参数值验证(12345):', result2.valid ? '通过' : '失败');

  const result3 = validateParameterValue(9999999, userIdParam);
  console.log('1.2 参数值验证(9999999):', result3.valid ? '通过' : '失败');
  if (!result3.valid) {
    result3.errors.forEach((err) => {
      console.log(`  错误: [${err.code}] ${err.message}`);
    });
  }

  // 1.3 批量验证参数
  const allParams = {
    userId: userIdParam,
    userName: {
      name: 'userName',
      type: ParameterType.String,
      required: true,
      defaultValue: '',
      constraints: {
        minLength: 2,
        maxLength: 50,
      },
    },
    isActive: {
      name: 'isActive',
      type: ParameterType.Bool,
      required: false,
      defaultValue: true,
    },
  };

  const result4 = validateAllParameters(allParams);
  console.log(`\n1.3 批量参数验证: ${result4.parameterCount} 个参数`);
  console.log(`  通过: ${result4.valid ? '是' : '否'}`);
  console.log(`  错误: ${result4.totalErrors}, 警告: ${result4.totalWarnings}`);

  console.log('\n');
}

// ========== 示例2: 数据源验证 ==========

export function example2_DataSourceValidation() {
  console.log('=== 示例2: 数据源验证 ===\n');

  // 2.1 验证API数据源
  const apiDataSource = {
    name: 'userData',
    type: 'api',
    description: '用户数据API',
    config: {
      url: '/api/users',
      method: 'GET',
    },
    parameterMappings: {
      userId: '$parameters.userId',
    },
  };

  const result1 = validateDataSource(apiDataSource);
  console.log('2.1 API数据源验证:', result1.valid ? '通过' : '失败');

  // 2.2 验证SQL数据源
  const sqlDataSource = {
    name: 'orderData',
    type: 'sql',
    config: {
      connectionString: 'Server=localhost;Database=test;',
      query: 'SELECT * FROM orders WHERE user_id = @userId',
    },
    parameterMappings: {
      userId: '$parameters.userId',
    },
  };

  const result2 = validateDataSource(sqlDataSource);
  console.log('2.2 SQL数据源验证:', result2.valid ? '通过' : '失败');

  // 2.3 验证参数映射
  const result3 = validateParameterMapping(
    {
      sourceParameterName: 'userId',
      referenceExpression: '$parameters.userId',
    },
    ['userId', 'userName']
  );
  console.log('2.3 参数映射验证:', result3.valid ? '通过' : '失败');

  // 2.4 批量验证数据源
  const allDataSources = {
    userData: apiDataSource,
    orderData: sqlDataSource,
  };

  const result4 = validateAllDataSources(allDataSources);
  console.log(`\n2.4 批量数据源验证: ${result4.dataSourceCount} 个数据源`);
  console.log(`  通过: ${result4.valid ? '是' : '否'}`);
  console.log(`  错误: ${result4.totalErrors}, 警告: ${result4.totalWarnings}`);

  console.log('\n');
}

// ========== 示例3: 依赖关系分析 ==========

export function example3_DependencyAnalysis() {
  console.log('=== 示例3: 依赖关系分析 ===\n');

  // 3.1 简单依赖链: baseData -> derivedData -> summaryData
  const dataSources = {
    baseData: {
      name: 'baseData',
      type: 'api',
      config: { url: '/api/base' },
    },
    derivedData: {
      name: 'derivedData',
      type: 'computed',
      config: { expression: '...' },
      parameterMappings: {
        base: '$dataSources.baseData.id',
      },
    },
    summaryData: {
      name: 'summaryData',
      type: 'computed',
      config: { expression: '...' },
      parameterMappings: {
        derived: '$dataSources.derivedData.total',
      },
    },
  };

  // 3.2 构建依赖图
  const graph = buildDependencyGraph(dataSources);
  console.log('3.1 依赖图构建完成');
  console.log(`  节点数: ${graph.nodes.length}`);
  console.log(`  边数: ${graph.edges.length}`);
  console.log(`  执行层级: ${graph.layers.length}`);

  // 3.3 检测循环依赖
  const cycles = detectCircularDependency(graph);
  console.log(`\n3.2 循环依赖检测: ${cycles.length > 0 ? '存在循环' : '无循环'}`);

  // 3.4 拓扑排序
  const sortResult = topologicalSort(graph);
  console.log(`\n3.3 拓扑排序: ${sortResult.success ? '成功' : '失败'}`);
  if (sortResult.success) {
    console.log('  执行顺序(按层级):');
    sortResult.layers.forEach((layer, index) => {
      console.log(`    层级 ${index}: ${layer.join(', ')}`);
    });
  }

  // 3.5 获取执行计划
  const plan = getExecutionOrder(dataSources);
  console.log('\n3.4 执行计划生成完成');
  console.log(`  总数据源: ${plan.totalDataSources}`);
  console.log(`  最大并行度: ${plan.maxParallelism}`);
  console.log('  执行阶段:');
  plan.stages.forEach((stage) => {
    console.log(`    阶段 ${stage.stageIndex + 1}: ${stage.dataSourceNames.join(', ')} (${stage.count}个)`);
  });

  console.log('\n');
}

// ========== 示例4: 循环依赖检测 ==========

export function example4_CircularDependencyDetection() {
  console.log('=== 示例4: 循环依赖检测 ===\n');

  // 构造循环依赖: A -> B -> C -> A
  const circularDataSources = {
    A: {
      name: 'A',
      type: 'computed',
      config: { expression: '...' },
      parameterMappings: {
        c: '$dataSources.C.value',
      },
    },
    B: {
      name: 'B',
      type: 'computed',
      config: { expression: '...' },
      parameterMappings: {
        a: '$dataSources.A.value',
      },
    },
    C: {
      name: 'C',
      type: 'computed',
      config: { expression: '...' },
      parameterMappings: {
        b: '$dataSources.B.value',
      },
    },
  };

  const graph = buildDependencyGraph(circularDataSources);
  const cycles = detectCircularDependency(graph);

  console.log('4.1 循环依赖检测结果:');
  console.log(`  存在循环: ${cycles.length > 0 ? '是' : '否'}`);

  if (cycles.length > 0) {
    console.log(`  检测到 ${cycles.length} 个循环:`);
    cycles.forEach((cycle, index) => {
      console.log(`    循环 ${index + 1}: ${cycle.join(' -> ')}`);
    });
  }

  console.log('\n');
}

// ========== 示例5: 完整模板验证 ==========

export function example5_TemplateValidation() {
  console.log('=== 示例5: 完整模板验证 ===\n');

  const template = {
    name: 'InvoiceTemplate',
    version: '1.0.0',
    description: '发票打印模板',
    parameters: {
      orderId: {
        name: 'orderId',
        type: ParameterType.Int,
        required: true,
        defaultValue: 0,
        description: '订单ID',
        constraints: { min: 0 },
      },
      includeDetails: {
        name: 'includeDetails',
        type: ParameterType.Bool,
        required: false,
        defaultValue: true,
        description: '是否包含明细',
      },
    },
    dataSources: {
      orderInfo: {
        name: 'orderInfo',
        type: 'api',
        config: {
          url: '/api/orders/:id',
          method: 'GET',
        },
        parameterMappings: {
          id: '$parameters.orderId',
        },
      },
      orderDetails: {
        name: 'orderDetails',
        type: 'api',
        config: {
          url: '/api/orders/:id/details',
          method: 'GET',
        },
        parameterMappings: {
          id: '$parameters.orderId',
        },
      },
      summary: {
        name: 'summary',
        type: 'computed',
        config: {
          expression: '{{ $dataSources.orderInfo.total + $dataSources.orderDetails.tax }}',
        },
        parameterMappings: {
          orderTotal: '$dataSources.orderInfo.total',
          detailsTax: '$dataSources.orderDetails.tax',
        },
      },
    },
    elements: [],
  };

  const result = validateTemplate(template);

  console.log('5.1 模板验证结果:');
  console.log(`  有效: ${result.valid ? '是' : '否'}`);
  console.log(`  可保存: ${result.canSave ? '是' : '否'}`);
  console.log(`  可发布: ${result.canPublish ? '是' : '否'}`);

  if (result.summary) {
    console.log('\n5.2 验证摘要:');
    console.log(`  总检查项: ${result.summary.totalChecks}`);
    console.log(`  错误数: ${result.summary.errorCount}`);
    console.log(`  警告数: ${result.summary.warningCount}`);
    console.log(`  通过率: ${(result.summary.passRate * 100).toFixed(2)}%`);
  }

  if (result.metadata) {
    console.log('\n5.3 验证元数据:');
    console.log(`  验证时间: ${result.metadata.validationTime}ms`);
    console.log(`  验证版本: ${result.metadata.validatorVersion}`);
  }

  if (result.errors.length > 0) {
    console.log('\n5.4 错误列表:');
    result.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. [${error.code}] ${error.field}: ${error.message}`);
    });
  }

  if (result.warnings && result.warnings.length > 0) {
    console.log('\n5.5 警告列表:');
    result.warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. [${warning.code}] ${warning.field}: ${warning.message}`);
    });
  }

  console.log('\n');
}

// ========== 示例6: 运行时参数值验证 ==========

export function example6_RuntimeParameterValidation() {
  console.log('=== 示例6: 运行时参数值验证 ===\n');

  const template = {
    name: 'ReportTemplate',
    parameters: {
      startDate: {
        name: 'startDate',
        type: ParameterType.DateTime,
        required: true,
        defaultValue: '2024-01-01T00:00:00.000Z',
        description: '开始日期',
        constraints: {
          minDate: '2020-01-01T00:00:00.000Z',
          maxDate: '2030-12-31T23:59:59.999Z',
        },
      },
      endDate: {
        name: 'endDate',
        type: ParameterType.DateTime,
        required: true,
        defaultValue: '2024-12-31T23:59:59.999Z',
        description: '结束日期',
      },
      department: {
        name: 'department',
        type: ParameterType.String,
        required: false,
        description: '部门',
        constraints: {
          enum: ['Sales', 'Marketing', 'Engineering', 'HR'],
        },
      },
    },
  };

  // 6.1 有效的参数值
  const validParams = {
    startDate: '2024-01-01T00:00:00.000Z',
    endDate: '2024-03-31T23:59:59.999Z',
    department: 'Sales',
  };

  const result1 = validateTemplateRuntimeParameters(template, validParams);
  console.log('6.1 有效参数值验证:', result1.valid ? '通过' : '失败');

  // 6.2 无效的参数值(日期超出范围)
  const invalidParams = {
    startDate: '2019-01-01T00:00:00.000Z', // 早于minDate
    endDate: '2024-12-31T23:59:59.999Z',
    department: 'Sales',
  };

  const result2 = validateTemplateRuntimeParameters(template, invalidParams);
  console.log('\n6.2 无效参数值验证:', result2.valid ? '通过' : '失败');
  if (!result2.valid) {
    result2.errors.forEach((err) => {
      console.log(`  错误: [${err.code}] ${err.field}: ${err.message}`);
    });
  }

  console.log('\n');
}

// ========== 主函数: 运行所有示例 ==========

export function runAllExamples() {
  console.log('############################################');
  console.log('#  ATL模板验证工具使用示例              #');
  console.log('############################################\n');

  try {
    example1_ParameterValidation();
    example2_DataSourceValidation();
    example3_DependencyAnalysis();
    example4_CircularDependencyDetection();
    example5_TemplateValidation();
    example6_RuntimeParameterValidation();

    console.log('############################################');
    console.log('#  所有示例执行完成                    #');
    console.log('############################################');
  } catch (error) {
    console.error('示例执行出错:', error);
  }
}

// 如果直接运行此文件,则执行所有示例
if (typeof window === 'undefined') {
  // Node.js环境
  runAllExamples();
}
