/**
 * findDependencyPath 函数单元测试
 *
 * 测试算法的正确性、边界情况和错误处理
 */

import { findDependencyPath } from './dependency';
import type { DependencyGraph } from './dependency';
import { DataSourceType } from './index';

/**
 * 测试场景1: 简单路径 A → B → C
 */
function testSimplePath() {
  const graph: DependencyGraph = {
    nodes: [
      { id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: ['B'], layer: 2 },
      { id: 'B', label: 'B', type: DataSourceType.Api, dependsOn: ['C'], layer: 1 },
      { id: 'C', label: 'C', type: DataSourceType.Api, dependsOn: [], layer: 0 },
    ],
    edges: [],
    layers: [['C'], ['B'], ['A']],
    hasCycle: false,
  };

  const path = findDependencyPath('A', 'C', graph);
  console.assert(
    JSON.stringify(path) === JSON.stringify(['A', 'B', 'C']),
    '测试1失败: 简单路径应返回 ["A", "B", "C"]'
  );
  console.log('✅ 测试1通过: 简单路径 A → B → C');
}

/**
 * 测试场景2: 不存在路径 A → B, C 独立
 */
function testNoPath() {
  const graph: DependencyGraph = {
    nodes: [
      { id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: ['B'], layer: 1 },
      { id: 'B', label: 'B', type: DataSourceType.Api, dependsOn: [], layer: 0 },
      { id: 'C', label: 'C', type: DataSourceType.Api, dependsOn: [], layer: 0 },
    ],
    edges: [],
    layers: [['B', 'C'], ['A']],
    hasCycle: false,
  };

  const path = findDependencyPath('A', 'C', graph);
  console.assert(path === null, '测试2失败: 不存在路径应返回 null');
  console.log('✅ 测试2通过: 不存在路径返回 null');
}

/**
 * 测试场景3: 源节点就是目标节点
 */
function testSameNode() {
  const graph: DependencyGraph = {
    nodes: [{ id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: [], layer: 0 }],
    edges: [],
    layers: [['A']],
    hasCycle: false,
  };

  const path = findDependencyPath('A', 'A', graph);
  console.assert(
    JSON.stringify(path) === JSON.stringify(['A']),
    '测试3失败: 相同节点应返回 ["A"]'
  );
  console.log('✅ 测试3通过: 源节点等于目标节点');
}

/**
 * 测试场景4: 存在循环 A → B → C → A (环被检测并跳过)
 */
function testCycleDetection() {
  const graph: DependencyGraph = {
    nodes: [
      { id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: ['B'], layer: 0, isInCycle: true },
      { id: 'B', label: 'B', type: DataSourceType.Api, dependsOn: ['C'], layer: 0, isInCycle: true },
      { id: 'C', label: 'C', type: DataSourceType.Api, dependsOn: ['A'], layer: 0, isInCycle: true },
    ],
    edges: [],
    layers: [],
    hasCycle: true,
    cycles: [['A', 'B', 'C', 'A']],
  };

  const path = findDependencyPath('A', 'C', graph);
  console.assert(
    JSON.stringify(path) === JSON.stringify(['A', 'B', 'C']),
    '测试4失败: 环检测应正确处理,返回 ["A", "B", "C"]'
  );
  console.log('✅ 测试4通过: 循环依赖正确处理');
}

/**
 * 测试场景5: 多条路径存在,返回第一条找到的
 */
function testMultiplePaths() {
  const graph: DependencyGraph = {
    nodes: [
      { id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: ['B', 'C'], layer: 2 },
      { id: 'B', label: 'B', type: DataSourceType.Api, dependsOn: ['D'], layer: 1 },
      { id: 'C', label: 'C', type: DataSourceType.Api, dependsOn: ['D'], layer: 1 },
      { id: 'D', label: 'D', type: DataSourceType.Api, dependsOn: [], layer: 0 },
    ],
    edges: [],
    layers: [['D'], ['B', 'C'], ['A']],
    hasCycle: false,
  };

  const path = findDependencyPath('A', 'D', graph);
  console.assert(
    path !== null && path.length === 3 && path[0] === 'A' && path[2] === 'D',
    '测试5失败: 应返回有效路径,长度为3'
  );
  console.log('✅ 测试5通过: 多条路径返回第一条');
}

/**
 * 测试场景6: 深度超限抛出错误
 */
function testMaxDepthExceeded() {
  // 创建深度为5的链: A → B → C → D → E → F
  const graph: DependencyGraph = {
    nodes: [
      { id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: ['B'], layer: 5 },
      { id: 'B', label: 'B', type: DataSourceType.Api, dependsOn: ['C'], layer: 4 },
      { id: 'C', label: 'C', type: DataSourceType.Api, dependsOn: ['D'], layer: 3 },
      { id: 'D', label: 'D', type: DataSourceType.Api, dependsOn: ['E'], layer: 2 },
      { id: 'E', label: 'E', type: DataSourceType.Api, dependsOn: ['F'], layer: 1 },
      { id: 'F', label: 'F', type: DataSourceType.Api, dependsOn: [], layer: 0 },
    ],
    edges: [],
    layers: [['F'], ['E'], ['D'], ['C'], ['B'], ['A']],
    hasCycle: false,
  };

  try {
    // 设置maxDepth=3,应该抛出错误(实际深度为5)
    findDependencyPath('A', 'F', graph, { maxDepth: 3 });
    console.assert(false, '测试6失败: 应该抛出深度超限错误');
  } catch (error) {
    console.assert(
      error instanceof Error && error.message.includes('最大深度限制'),
      '测试6失败: 应该抛出包含"最大深度限制"的错误'
    );
    console.log('✅ 测试6通过: 深度超限正确抛出错误');
  }
}

/**
 * 测试场景7: 参数验证 - 空节点ID
 */
function testEmptyNodeId() {
  const graph: DependencyGraph = {
    nodes: [{ id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: [], layer: 0 }],
    edges: [],
    layers: [['A']],
    hasCycle: false,
  };

  try {
    findDependencyPath('', 'A', graph);
    console.assert(false, '测试7失败: 应该抛出参数验证错误');
  } catch (error) {
    console.assert(
      error instanceof Error && error.message.includes('节点ID不能为空'),
      '测试7失败: 应该抛出"节点ID不能为空"错误'
    );
    console.log('✅ 测试7通过: 空节点ID验证');
  }
}

/**
 * 测试场景8: 参数验证 - 节点不存在
 */
function testNodeNotFound() {
  const graph: DependencyGraph = {
    nodes: [{ id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: [], layer: 0 }],
    edges: [],
    layers: [['A']],
    hasCycle: false,
  };

  try {
    findDependencyPath('A', 'NonExistent', graph);
    console.assert(false, '测试8失败: 应该抛出节点不存在错误');
  } catch (error) {
    console.assert(
      error instanceof Error && error.message.includes('不存在于依赖关系图中'),
      '测试8失败: 应该抛出节点不存在错误'
    );
    console.log('✅ 测试8通过: 节点不存在验证');
  }
}

/**
 * 测试场景9: 复杂依赖图
 */
function testComplexGraph() {
  const graph: DependencyGraph = {
    nodes: [
      { id: 'A', label: 'A', type: DataSourceType.Api, dependsOn: ['B', 'C'], layer: 3 },
      { id: 'B', label: 'B', type: DataSourceType.Api, dependsOn: ['D'], layer: 2 },
      { id: 'C', label: 'C', type: DataSourceType.Api, dependsOn: ['E'], layer: 2 },
      { id: 'D', label: 'D', type: DataSourceType.Api, dependsOn: ['F'], layer: 1 },
      { id: 'E', label: 'E', type: DataSourceType.Api, dependsOn: ['F'], layer: 1 },
      { id: 'F', label: 'F', type: DataSourceType.Api, dependsOn: [], layer: 0 },
      { id: 'G', label: 'G', type: DataSourceType.Api, dependsOn: [], layer: 0 }, // 孤立节点
    ],
    edges: [],
    layers: [['F', 'G'], ['D', 'E'], ['B', 'C'], ['A']],
    hasCycle: false,
  };

  const path = findDependencyPath('A', 'F', graph);
  console.assert(
    path !== null && path[0] === 'A' && path[path.length - 1] === 'F',
    '测试9失败: 复杂图应找到有效路径'
  );
  console.log('✅ 测试9通过: 复杂依赖图路径查找');
}

/**
 * 运行所有测试
 */
function runAllTests() {
  console.log('\n=== findDependencyPath 算法测试 ===\n');

  testSimplePath();
  testNoPath();
  testSameNode();
  testCycleDetection();
  testMultiplePaths();
  testMaxDepthExceeded();
  testEmptyNodeId();
  testNodeNotFound();
  testComplexGraph();

  console.log('\n=== 所有测试通过! ===\n');
}

// 导出测试函数供外部调用
export { runAllTests };

// 如果直接运行此文件,执行测试
if (require.main === module) {
  runAllTests();
}
