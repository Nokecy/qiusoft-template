/**
 * 数据源依赖关系类型定义
 * 用于定义数据源之间的依赖关系、执行顺序和循环检测
 */

import type { DataSourceType } from './index';

/**
 * 数据源依赖配置接口
 *
 * 定义数据源对其他数据源的依赖关系
 */
export interface DataSourceDependency {
  /** 数据源名称(唯一标识) */
  dataSourceName: string;

  /** 依赖的数据源列表(需要在此数据源执行前完成的数据源) */
  dependsOn: string[];

  /** 执行层级(由拓扑排序算法计算,0表示最先执行) */
  executionLayer?: number;

  /** 是否条件执行(默认false) */
  conditionalExecution?: boolean;

  /** 条件表达式(Scriban语法,当conditionalExecution=true时必须提供) */
  condition?: string;

  /** 超时时间(毫秒,可选,用于避免无限等待) */
  timeoutMs?: number;

  /** 失败策略 */
  failureStrategy?: DependencyFailureStrategy;
}

/**
 * 依赖失败策略枚举
 *
 * 定义当依赖的数据源执行失败时的处理策略
 */
export enum DependencyFailureStrategy {
  /** 中断执行(默认策略,依赖失败则停止整个执行流程) */
  Abort = 'abort',
  /** 跳过当前数据源(继续执行其他不依赖此数据源的部分) */
  Skip = 'skip',
  /** 使用回退值(使用预定义的默认值继续执行) */
  UseFallback = 'use_fallback',
  /** 忽略错误(继续执行,但标记为警告) */
  Ignore = 'ignore',
}

/**
 * 依赖关系图节点接口
 *
 * 用于依赖关系可视化和分析
 */
export interface DependencyGraphNode {
  /** 节点ID(数据源名称) */
  id: string;

  /** 显示标签(可自定义,默认为数据源名称) */
  label: string;

  /** 数据源类型 */
  type: DataSourceType;

  /** 依赖的节点ID列表 */
  dependsOn: string[];

  /** 被依赖的节点ID列表(反向依赖) */
  dependents?: string[];

  /** 执行层级(由拓扑排序计算) */
  layer: number;

  /** 是否参与循环依赖 */
  isInCycle?: boolean;

  /** 所属循环依赖链(如果参与循环) */
  cycleChain?: string[];

  /** 节点元数据(用于UI展示) */
  metadata?: {
    description?: string;
    tags?: string[];
    color?: string;
    icon?: string;
  };
}

/**
 * 依赖关系图边接口
 *
 * 表示数据源之间的依赖关系连接
 */
export interface DependencyGraphEdge {
  /** 边ID(唯一标识) */
  id: string;

  /** 源节点ID(被依赖的数据源) */
  source: string;

  /** 目标节点ID(依赖方数据源) */
  target: string;

  /** 是否为循环依赖边 */
  isCyclic?: boolean;

  /** 依赖类型 */
  dependencyType?: DependencyEdgeType;

  /** 边元数据(用于UI展示) */
  metadata?: {
    label?: string;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted';
    animated?: boolean;
  };
}

/**
 * 依赖边类型枚举
 */
export enum DependencyEdgeType {
  /** 强依赖(必须等待依赖完成) */
  Strong = 'strong',
  /** 弱依赖(优先级建议,非强制) */
  Weak = 'weak',
  /** 条件依赖(根据条件决定是否依赖) */
  Conditional = 'conditional',
}

/**
 * 完整的依赖关系图
 *
 * 包含节点和边的完整图结构
 */
export interface DependencyGraph {
  /** 图中的所有节点 */
  nodes: DependencyGraphNode[];

  /** 图中的所有边 */
  edges: DependencyGraphEdge[];

  /** 执行层级(按顺序排列的数据源名称数组的数组) */
  layers: string[][];

  /** 是否存在循环依赖 */
  hasCycle: boolean;

  /** 循环依赖链列表(如果存在) */
  cycles?: string[][];

  /** 图的统计信息 */
  statistics?: {
    totalNodes: number;
    totalEdges: number;
    maxLayer: number;
    cycleCount: number;
  };
}

/**
 * 拓扑排序结果接口
 *
 * 表示数据源的拓扑排序结果和执行顺序
 */
export interface TopologicalSortResult {
  /** 是否成功(无循环依赖) */
  success: boolean;

  /** 执行层级(二维数组,每一层可并行执行) */
  layers: string[][];

  /** 是否存在循环依赖 */
  hasCycle: boolean;

  /** 循环依赖链列表(如果存在) */
  cycles?: string[][];

  /** 未解析的数据源(存在未满足的依赖) */
  unresolvedDataSources?: string[];

  /** 排序元数据 */
  metadata?: {
    sortedCount: number;
    totalCount: number;
    executionTime: number; // 毫秒
  };
}

/**
 * 循环依赖检测结果
 */
export interface CircularDependencyDetectionResult {
  /** 是否存在循环依赖 */
  hasCycle: boolean;

  /** 循环依赖链列表(每个循环是一个数据源名称数组) */
  cycles: string[][];

  /** 参与循环依赖的数据源名称集合 */
  involvedDataSources: Set<string>;

  /** 检测元数据 */
  metadata?: {
    detectionTime: number; // 毫秒
    totalDataSources: number;
  };
}

/**
 * 依赖关系验证结果
 */
export interface DependencyValidationResult {
  /** 是否有效(无循环依赖,所有依赖数据源存在) */
  valid: boolean;

  /** 错误列表 */
  errors: DependencyValidationError[];

  /** 警告列表 */
  warnings?: DependencyValidationWarning[];

  /** 依赖关系图(如果验证成功) */
  graph?: DependencyGraph;
}

/**
 * 依赖验证错误
 */
export interface DependencyValidationError {
  /** 错误代码 */
  code: DependencyErrorCode;

  /** 错误消息 */
  message: string;

  /** 相关数据源名称 */
  dataSourceName: string;

  /** 错误上下文(额外信息) */
  context?: {
    missingDependencies?: string[];
    cycleChain?: string[];
    [key: string]: unknown;
  };
}

/**
 * 依赖验证警告
 */
export interface DependencyValidationWarning {
  /** 警告代码 */
  code: DependencyWarningCode;

  /** 警告消息 */
  message: string;

  /** 相关数据源名称 */
  dataSourceName: string;

  /** 警告上下文 */
  context?: Record<string, unknown>;
}

/**
 * 依赖错误代码枚举
 */
export enum DependencyErrorCode {
  /** 循环依赖 */
  CIRCULAR_DEPENDENCY = 'CIRCULAR_DEPENDENCY',
  /** 缺失依赖(依赖的数据源不存在) */
  MISSING_DEPENDENCY = 'MISSING_DEPENDENCY',
  /** 自引用(数据源依赖自己) */
  SELF_REFERENCE = 'SELF_REFERENCE',
  /** 无效依赖配置 */
  INVALID_DEPENDENCY_CONFIG = 'INVALID_DEPENDENCY_CONFIG',
  /** 条件表达式错误 */
  INVALID_CONDITION_EXPRESSION = 'INVALID_CONDITION_EXPRESSION',
}

/**
 * 依赖警告代码枚举
 */
export enum DependencyWarningCode {
  /** 冗余依赖(传递依赖导致的冗余) */
  REDUNDANT_DEPENDENCY = 'REDUNDANT_DEPENDENCY',
  /** 深层依赖链(依赖链过长可能影响性能) */
  DEEP_DEPENDENCY_CHAIN = 'DEEP_DEPENDENCY_CHAIN',
  /** 未使用的数据源(定义了但未被引用) */
  UNUSED_DATASOURCE = 'UNUSED_DATASOURCE',
  /** 条件执行可能死锁 */
  POTENTIAL_DEADLOCK = 'POTENTIAL_DEADLOCK',
}

/**
 * 依赖解析选项
 */
export interface DependencyResolutionOptions {
  /** 是否允许条件依赖(默认true) */
  allowConditionalDependency?: boolean;

  /** 是否检测冗余依赖(默认false,性能考虑) */
  detectRedundantDependencies?: boolean;

  /** 最大依赖链深度(默认10,超过则警告) */
  maxDependencyChainDepth?: number;

  /** 是否允许孤立数据源(无依赖也不被依赖,默认true) */
  allowOrphanDataSources?: boolean;

  /** 超时时间(毫秒,拓扑排序最长执行时间,默认5000) */
  timeout?: number;
}

/**
 * 执行计划接口
 *
 * 基于依赖关系生成的数据源执行计划
 */
export interface DataSourceExecutionPlan {
  /** 执行阶段列表(按顺序执行) */
  stages: ExecutionStage[];

  /** 总数据源数量 */
  totalDataSources: number;

  /** 并行度(最多同时执行的数据源数量) */
  maxParallelism: number;

  /** 预估执行时间(毫秒,基于历史数据) */
  estimatedExecutionTime?: number;
}

/**
 * 执行阶段接口
 *
 * 表示一个可并行执行的数据源组
 */
export interface ExecutionStage {
  /** 阶段序号(从0开始) */
  stageIndex: number;

  /** 此阶段要执行的数据源名称列表(可并行执行) */
  dataSourceNames: string[];

  /** 此阶段的数据源数量 */
  count: number;

  /** 是否条件执行阶段 */
  conditional?: boolean;

  /** 阶段描述 */
  description?: string;
}

/**
 * 依赖关系变更事件
 */
export interface DependencyChangeEvent {
  /** 事件类型 */
  type: DependencyChangeEventType;

  /** 受影响的数据源名称 */
  dataSourceName: string;

  /** 变更前的依赖列表 */
  oldDependencies?: string[];

  /** 变更后的依赖列表 */
  newDependencies?: string[];

  /** 时间戳 */
  timestamp: number;
}

/**
 * 依赖变更事件类型
 */
export enum DependencyChangeEventType {
  /** 添加依赖 */
  DEPENDENCY_ADDED = 'DEPENDENCY_ADDED',
  /** 移除依赖 */
  DEPENDENCY_REMOVED = 'DEPENDENCY_REMOVED',
  /** 依赖更新 */
  DEPENDENCY_UPDATED = 'DEPENDENCY_UPDATED',
  /** 数据源添加 */
  DATASOURCE_ADDED = 'DATASOURCE_ADDED',
  /** 数据源移除 */
  DATASOURCE_REMOVED = 'DATASOURCE_REMOVED',
}

/**
 * 类型守卫: 检查节点是否参与循环依赖
 */
export function isNodeInCycle(node: DependencyGraphNode): boolean {
  return node.isInCycle === true;
}

/**
 * 类型守卫: 检查边是否为循环依赖边
 */
export function isCyclicEdge(edge: DependencyGraphEdge): boolean {
  return edge.isCyclic === true;
}

/**
 * 工具函数: 获取依赖深度(从根节点到当前节点的最长路径)
 */
export function getDependencyDepth(
  nodeId: string,
  graph: DependencyGraph
): number {
  const node = graph.nodes.find((n) => n.id === nodeId);
  return node?.layer ?? 0;
}

/**
 * 工具函数: 获取所有叶子节点(没有被其他节点依赖的节点)
 */
export function getLeafNodes(graph: DependencyGraph): DependencyGraphNode[] {
  return graph.nodes.filter(
    (node) => !node.dependents || node.dependents.length === 0
  );
}

/**
 * 工具函数: 获取所有根节点(不依赖任何其他节点的节点)
 */
export function getRootNodes(graph: DependencyGraph): DependencyGraphNode[] {
  return graph.nodes.filter((node) => node.dependsOn.length === 0);
}

/**
 * 工具函数: 计算两个节点之间的依赖路径
 *
 * 使用深度优先搜索(DFS)算法查找从源节点到目标节点的依赖路径。
 * 实现了环检测、深度限制和完整的错误处理,确保算法健壮性。
 *
 * @param fromNodeId - 起始节点ID(数据源名称)
 * @param toNodeId - 目标节点ID(数据源名称)
 * @param graph - 依赖关系图
 * @param options - 可选配置项
 * @param options.maxDepth - 最大搜索深度,防止栈溢出(默认100)
 * @param options.findAllPaths - 是否查找所有路径(默认false,只返回第一条)
 *
 * @returns 依赖路径数组,如果不存在路径则返回null
 *
 * @throws {Error} 当节点不存在或参数无效时抛出错误
 *
 * @example
 * // 基本用法 - 查找单条路径
 * const path = findDependencyPath('DataSource_A', 'DataSource_C', graph);
 * // 返回: ['DataSource_A', 'DataSource_B', 'DataSource_C'] 或 null
 *
 * @example
 * // 使用自定义深度限制
 * const path = findDependencyPath('A', 'Z', graph, { maxDepth: 50 });
 *
 * @example
 * // 测试用例场景:
 * // 场景1: 简单路径 A → B → C
 * // findDependencyPath('A', 'C', graph) => ['A', 'B', 'C']
 *
 * // 场景2: 不存在路径 A → B, C 独立
 * // findDependencyPath('A', 'C', graph) => null
 *
 * // 场景3: 源节点就是目标节点
 * // findDependencyPath('A', 'A', graph) => ['A']
 *
 * // 场景4: 存在循环 A → B → C → A
 * // findDependencyPath('A', 'C', graph) => ['A', 'B', 'C'] (环被检测并跳过)
 *
 * // 场景5: 深度超限 (100层嵌套)
 * // findDependencyPath('A', 'Z', deepGraph) => 抛出错误
 *
 * // 场景6: 多条路径存在,返回第一条找到的
 * // A → B → D, A → C → D
 * // findDependencyPath('A', 'D', graph) => ['A', 'B', 'D'] 或 ['A', 'C', 'D']
 *
 * @complexity
 * - 时间复杂度: O(V + E) 其中V是节点数,E是边数
 * - 空间复杂度: O(V) 用于visited集合和路径栈
 *
 * @algorithm
 * 1. 参数验证: 检查节点存在性和参数有效性
 * 2. 边界情况处理: 源节点等于目标节点的情况
 * 3. DFS递归搜索:
 *    - 使用visited Set避免重复访问和环
 *    - 跟踪当前深度,超过maxDepth时终止
 *    - 使用路径栈记录当前路径
 *    - 回溯时正确弹出路径节点
 * 4. 路径返回: 找到路径返回副本,未找到返回null
 */
export function findDependencyPath(
  fromNodeId: string,
  toNodeId: string,
  graph: DependencyGraph,
  options: {
    maxDepth?: number;
    findAllPaths?: boolean;
  } = {}
): string[] | null {
  const { maxDepth = 100 } = options;

  // 参数验证
  if (!fromNodeId || !toNodeId) {
    throw new Error('节点ID不能为空');
  }

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    throw new Error('依赖关系图无效或为空');
  }

  // 检查起始节点和目标节点是否存在
  const fromNode = graph.nodes.find((n) => n.id === fromNodeId);
  const toNode = graph.nodes.find((n) => n.id === toNodeId);

  if (!fromNode) {
    throw new Error(`起始节点 '${fromNodeId}' 不存在于依赖关系图中`);
  }

  if (!toNode) {
    throw new Error(`目标节点 '${toNodeId}' 不存在于依赖关系图中`);
  }

  // 边界情况: 源节点就是目标节点
  if (fromNodeId === toNodeId) {
    return [fromNodeId];
  }

  // 用于环检测和避免重复访问的Set
  const visited = new Set<string>();
  // 当前搜索路径
  const currentPath: string[] = [];

  /**
   * DFS递归函数
   * @param nodeId - 当前节点ID
   * @param depth - 当前递归深度
   * @returns 是否找到目标节点
   */
  function dfs(nodeId: string, depth: number): boolean {
    // 深度限制检查,防止栈溢出
    if (depth > maxDepth) {
      throw new Error(
        `依赖路径搜索超过最大深度限制 ${maxDepth},可能存在过深的依赖链或配置错误`
      );
    }

    // 找到目标节点
    if (nodeId === toNodeId) {
      currentPath.push(nodeId);
      return true;
    }

    // 环检测: 如果节点已被访问,说明存在环,跳过避免无限循环
    if (visited.has(nodeId)) {
      return false;
    }

    // 标记节点为已访问
    visited.add(nodeId);
    currentPath.push(nodeId);

    // 获取当前节点
    const node = graph.nodes.find((n) => n.id === nodeId);

    // 节点不存在的防御性检查(理论上不应该发生)
    if (!node) {
      // 回溯: 移除当前节点
      currentPath.pop();
      visited.delete(nodeId);
      return false;
    }

    // 遍历所有依赖节点(子节点)
    for (const dependencyId of node.dependsOn) {
      // 递归搜索依赖节点
      if (dfs(dependencyId, depth + 1)) {
        return true; // 找到路径,立即返回
      }
    }

    // 回溯: 未找到路径,移除当前节点
    currentPath.pop();
    visited.delete(nodeId);
    return false;
  }

  // 执行DFS搜索
  try {
    const found = dfs(fromNodeId, 0);
    // 返回路径的副本,避免外部修改
    return found ? [...currentPath] : null;
  } catch (error) {
    // 捕获并重新抛出错误,添加上下文信息
    if (error instanceof Error) {
      throw new Error(
        `依赖路径搜索失败 (从 '${fromNodeId}' 到 '${toNodeId}'): ${error.message}`
      );
    }
    throw error;
  }
}
