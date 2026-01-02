/**
 * 依赖关系分析工具
 * 提供依赖图构建、循环依赖检测、拓扑排序和执行顺序计算功能
 */

import type {
  DependencyGraph,
  DependencyGraphNode,
  DependencyGraphEdge,
  TopologicalSortResult,
  CircularDependencyDetectionResult,
  DataSourceExecutionPlan,
  ExecutionStage,
  DependencyEdgeType,
} from '../../types/dependency';

import type { ParameterMappings } from '../../types/dataSourceParameter';

// 临时数据源接口定义(后续根据实际类型调整)
interface AtlDataSource {
  name: string;
  type: string;
  description?: string;
  config: Record<string, unknown>;
  parameterMappings?: ParameterMappings;
  enabled?: boolean;
}

// ========== 辅助函数 ==========

/**
 * 从参数映射中提取依赖的数据源名称
 *
 * 分析参数映射表达式,提取引用的其他数据源
 */
function extractDataSourceDependencies(
  parameterMappings: ParameterMappings | undefined
): string[] {
  if (!parameterMappings) {
    return [];
  }

  const dependencies = new Set<string>();
  const dataSourcePattern = /\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*)/g;

  for (const expression of Object.values(parameterMappings)) {
    let match;
    while ((match = dataSourcePattern.exec(expression)) !== null) {
      dependencies.add(match[1]);
    }
  }

  return Array.from(dependencies);
}

/**
 * 生成边ID
 */
function generateEdgeId(source: string, target: string): string {
  return `${source}->${target}`;
}

// ========== 核心分析函数 ==========

/**
 * 构建依赖关系图
 *
 * 分析数据源之间的依赖关系,构建完整的依赖图
 *
 * @param dataSources - 数据源定义字典
 * @returns 依赖关系图
 *
 * @example
 * ```typescript
 * const graph = buildDependencyGraph({
 *   baseData: { name: 'baseData', type: 'api', config: {...} },
 *   derivedData: {
 *     name: 'derivedData',
 *     type: 'computed',
 *     parameterMappings: { base: '$dataSources.baseData.id' }
 *   }
 * });
 * // graph.nodes.length === 2
 * // graph.edges.length === 1
 * ```
 */
export function buildDependencyGraph(
  dataSources: Record<string, AtlDataSource>
): DependencyGraph {
  const nodes: DependencyGraphNode[] = [];
  const edges: DependencyGraphEdge[] = [];
  const dependencyMap = new Map<string, string[]>();

  // 1. 构建节点和依赖映射
  for (const [name, dataSource] of Object.entries(dataSources)) {
    // 提取依赖
    const dependencies = extractDataSourceDependencies(dataSource.parameterMappings);
    dependencyMap.set(name, dependencies);

    // 创建节点(layer暂时设为0,后续通过拓扑排序计算)
    const node: DependencyGraphNode = {
      id: name,
      label: dataSource.description || name,
      type: dataSource.type as any, // 临时类型转换
      dependsOn: dependencies,
      dependents: [],
      layer: 0,
      metadata: {
        description: dataSource.description,
      },
    };

    nodes.push(node);
  }

  // 2. 构建反向依赖(dependents)
  for (const node of nodes) {
    for (const depName of node.dependsOn) {
      const depNode = nodes.find((n) => n.id === depName);
      if (depNode) {
        depNode.dependents = depNode.dependents || [];
        depNode.dependents.push(node.id);
      }
    }
  }

  // 3. 构建边
  for (const node of nodes) {
    for (const depName of node.dependsOn) {
      const edge: DependencyGraphEdge = {
        id: generateEdgeId(depName, node.id),
        source: depName,
        target: node.id,
        dependencyType: DependencyEdgeType.Strong,
        metadata: {
          style: 'solid',
        },
      };
      edges.push(edge);
    }
  }

  // 4. 执行拓扑排序计算层级
  const sortResult = topologicalSort({ nodes, edges, layers: [], hasCycle: false });

  // 5. 更新节点层级
  if (sortResult.success) {
    sortResult.layers.forEach((layer, index) => {
      layer.forEach((nodeId) => {
        const node = nodes.find((n) => n.id === nodeId);
        if (node) {
          node.layer = index;
        }
      });
    });
  }

  // 6. 检测循环依赖
  const cycles = detectCircularDependency({ nodes, edges, layers: sortResult.layers, hasCycle: false });

  // 7. 标记循环依赖节点和边
  if (cycles.length > 0) {
    const cycleNodeSet = new Set<string>();
    cycles.forEach((cycle) => {
      cycle.forEach((nodeId) => cycleNodeSet.add(nodeId));
    });

    nodes.forEach((node) => {
      if (cycleNodeSet.has(node.id)) {
        node.isInCycle = true;
        node.cycleChain = cycles.find((cycle) => cycle.includes(node.id));
      }
    });

    edges.forEach((edge) => {
      const cycle = cycles.find((c) =>
        c.includes(edge.source) && c.includes(edge.target)
      );
      if (cycle) {
        edge.isCyclic = true;
        if (edge.metadata) {
          edge.metadata.color = 'red';
          edge.metadata.animated = true;
        }
      }
    });
  }

  // 8. 构建完整图
  const graph: DependencyGraph = {
    nodes,
    edges,
    layers: sortResult.layers,
    hasCycle: cycles.length > 0,
    cycles: cycles.length > 0 ? cycles : undefined,
    statistics: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      maxLayer: sortResult.layers.length - 1,
      cycleCount: cycles.length,
    },
  };

  return graph;
}

/**
 * 检测循环依赖
 *
 * 使用深度优先搜索(DFS)检测依赖图中的循环
 *
 * @param graph - 依赖关系图
 * @returns 循环依赖链数组
 *
 * @example
 * ```typescript
 * const cycles = detectCircularDependency(graph);
 * if (cycles.length > 0) {
 *   console.error('检测到循环依赖:', cycles);
 *   // cycles = [['A', 'B', 'C', 'A'], ['D', 'E', 'D']]
 * }
 * ```
 */
export function detectCircularDependency(graph: DependencyGraph): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const currentPath: string[] = [];

  /**
   * DFS递归函数
   */
  function dfs(nodeId: string): boolean {
    // 检测到环
    if (recursionStack.has(nodeId)) {
      // 提取环路径
      const cycleStartIndex = currentPath.indexOf(nodeId);
      if (cycleStartIndex !== -1) {
        const cycle = [...currentPath.slice(cycleStartIndex), nodeId];
        cycles.push(cycle);
      }
      return true;
    }

    // 已访问过且不在递归栈中,说明这条路径已检查过
    if (visited.has(nodeId)) {
      return false;
    }

    // 标记为访问中
    visited.add(nodeId);
    recursionStack.add(nodeId);
    currentPath.push(nodeId);

    // 获取节点
    const node = graph.nodes.find((n) => n.id === nodeId);
    if (!node) {
      // 节点不存在,移除标记并返回
      currentPath.pop();
      recursionStack.delete(nodeId);
      return false;
    }

    // 递归检查所有依赖节点
    let hasCycle = false;
    for (const depId of node.dependsOn) {
      if (dfs(depId)) {
        hasCycle = true;
        // 继续检查其他依赖,可能有多个环
      }
    }

    // 回溯
    currentPath.pop();
    recursionStack.delete(nodeId);

    return hasCycle;
  }

  // 对每个节点执行DFS
  for (const node of graph.nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id);
    }
  }

  return cycles;
}

/**
 * 拓扑排序
 *
 * 对依赖图进行拓扑排序,计算执行层级
 *
 * @param graph - 依赖关系图
 * @returns 拓扑排序结果
 *
 * @example
 * ```typescript
 * const sortResult = topologicalSort(graph);
 * if (sortResult.success) {
 *   console.log('执行顺序:', sortResult.layers);
 *   // layers = [['A', 'B'], ['C', 'D'], ['E']]
 *   // 第一层A和B可并行执行,第二层C和D可并行执行,最后执行E
 * }
 * ```
 */
export function topologicalSort(graph: DependencyGraph): TopologicalSortResult {
  const startTime = Date.now();
  const layers: string[][] = [];
  const inDegree = new Map<string, number>();
  const nodeMap = new Map<string, DependencyGraphNode>();

  // 1. 初始化入度和节点映射
  for (const node of graph.nodes) {
    nodeMap.set(node.id, node);
    inDegree.set(node.id, 0);
  }

  // 2. 计算入度
  for (const edge of graph.edges) {
    const currentDegree = inDegree.get(edge.target) || 0;
    inDegree.set(edge.target, currentDegree + 1);
  }

  // 3. Kahn算法进行拓扑排序
  const queue: string[] = [];
  const sorted: string[] = [];

  // 找到所有入度为0的节点(根节点)
  for (const [nodeId, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }

  // 分层处理
  while (queue.length > 0) {
    const currentLayer: string[] = [...queue];
    layers.push(currentLayer);
    queue.length = 0; // 清空队列

    for (const nodeId of currentLayer) {
      sorted.push(nodeId);
      const node = nodeMap.get(nodeId);

      if (!node) continue;

      // 减少依赖此节点的所有节点的入度
      const dependents = node.dependents || [];
      for (const depId of dependents) {
        const currentDegree = inDegree.get(depId) || 0;
        const newDegree = currentDegree - 1;
        inDegree.set(depId, newDegree);

        // 入度变为0,加入队列
        if (newDegree === 0) {
          queue.push(depId);
        }
      }
    }
  }

  // 4. 检查是否有环(如果排序后的节点数少于总节点数,说明有环)
  const hasCycle = sorted.length < graph.nodes.length;
  const unresolvedDataSources = hasCycle
    ? graph.nodes.filter((n) => !sorted.includes(n.id)).map((n) => n.id)
    : undefined;

  // 5. 检测循环依赖链
  const cycles = hasCycle ? detectCircularDependency(graph) : undefined;

  const endTime = Date.now();

  return {
    success: !hasCycle,
    layers,
    hasCycle,
    cycles,
    unresolvedDataSources,
    metadata: {
      sortedCount: sorted.length,
      totalCount: graph.nodes.length,
      executionTime: endTime - startTime,
    },
  };
}

/**
 * 获取执行顺序
 *
 * 基于依赖关系生成数据源执行计划
 *
 * @param dataSources - 数据源定义字典
 * @returns 数据源执行计划
 *
 * @example
 * ```typescript
 * const plan = getExecutionOrder(dataSources);
 * console.log('执行计划:');
 * plan.stages.forEach((stage, index) => {
 *   console.log(`阶段 ${index + 1}:`, stage.dataSourceNames.join(', '));
 * });
 * // 输出:
 * // 阶段 1: baseData, staticData
 * // 阶段 2: userData, orderData
 * // 阶段 3: summaryData
 * ```
 */
export function getExecutionOrder(
  dataSources: Record<string, AtlDataSource>
): DataSourceExecutionPlan {
  // 1. 构建依赖图
  const graph = buildDependencyGraph(dataSources);

  // 2. 执行拓扑排序
  const sortResult = topologicalSort(graph);

  // 3. 检查循环依赖
  if (sortResult.hasCycle) {
    throw new Error(
      `无法生成执行计划: 检测到循环依赖 ${JSON.stringify(sortResult.cycles)}`
    );
  }

  // 4. 构建执行阶段
  const stages: ExecutionStage[] = sortResult.layers.map((layer, index) => ({
    stageIndex: index,
    dataSourceNames: layer,
    count: layer.length,
    description: `执行阶段 ${index + 1}: ${layer.length} 个数据源可并行执行`,
  }));

  // 5. 计算最大并行度
  const maxParallelism = Math.max(...stages.map((s) => s.count), 0);

  // 6. 构建执行计划
  const plan: DataSourceExecutionPlan = {
    stages,
    totalDataSources: graph.nodes.length,
    maxParallelism,
  };

  return plan;
}

/**
 * 检测循环依赖(增强版)
 *
 * 返回更详细的循环依赖检测结果
 *
 * @param graph - 依赖关系图
 * @returns 循环依赖检测结果
 */
export function detectCircularDependencyEnhanced(
  graph: DependencyGraph
): CircularDependencyDetectionResult {
  const startTime = Date.now();
  const cycles = detectCircularDependency(graph);
  const involvedDataSources = new Set<string>();

  cycles.forEach((cycle) => {
    cycle.forEach((nodeId) => involvedDataSources.add(nodeId));
  });

  const endTime = Date.now();

  return {
    hasCycle: cycles.length > 0,
    cycles,
    involvedDataSources,
    metadata: {
      detectionTime: endTime - startTime,
      totalDataSources: graph.nodes.length,
    },
  };
}

/**
 * 验证依赖关系完整性
 *
 * 检查依赖图中是否所有依赖的数据源都存在
 *
 * @param graph - 依赖关系图
 * @returns 缺失的依赖列表
 */
export function validateDependencyIntegrity(
  graph: DependencyGraph
): Map<string, string[]> {
  const missingDependencies = new Map<string, string[]>();
  const nodeIds = new Set(graph.nodes.map((n) => n.id));

  for (const node of graph.nodes) {
    const missing: string[] = [];

    for (const depId of node.dependsOn) {
      if (!nodeIds.has(depId)) {
        missing.push(depId);
      }
    }

    if (missing.length > 0) {
      missingDependencies.set(node.id, missing);
    }
  }

  return missingDependencies;
}

/**
 * 获取节点的所有祖先节点
 *
 * 递归获取节点依赖的所有祖先节点(传递依赖)
 *
 * @param nodeId - 节点ID
 * @param graph - 依赖关系图
 * @returns 祖先节点ID集合
 */
export function getAncestors(nodeId: string, graph: DependencyGraph): Set<string> {
  const ancestors = new Set<string>();
  const visited = new Set<string>();

  function collectAncestors(id: string): void {
    if (visited.has(id)) return;
    visited.add(id);

    const node = graph.nodes.find((n) => n.id === id);
    if (!node) return;

    for (const depId of node.dependsOn) {
      ancestors.add(depId);
      collectAncestors(depId);
    }
  }

  collectAncestors(nodeId);
  return ancestors;
}

/**
 * 获取节点的所有后代节点
 *
 * 递归获取依赖此节点的所有后代节点(传递被依赖)
 *
 * @param nodeId - 节点ID
 * @param graph - 依赖关系图
 * @returns 后代节点ID集合
 */
export function getDescendants(nodeId: string, graph: DependencyGraph): Set<string> {
  const descendants = new Set<string>();
  const visited = new Set<string>();

  function collectDescendants(id: string): void {
    if (visited.has(id)) return;
    visited.add(id);

    const node = graph.nodes.find((n) => n.id === id);
    if (!node || !node.dependents) return;

    for (const depId of node.dependents) {
      descendants.add(depId);
      collectDescendants(depId);
    }
  }

  collectDescendants(nodeId);
  return descendants;
}

/**
 * 计算最长依赖路径
 *
 * 计算从根节点到指定节点的最长路径(关键路径)
 *
 * @param nodeId - 目标节点ID
 * @param graph - 依赖关系图
 * @returns 最长路径长度
 */
export function getLongestPath(nodeId: string, graph: DependencyGraph): number {
  const node = graph.nodes.find((n) => n.id === nodeId);
  if (!node) return 0;

  // 如果节点没有依赖,路径长度为0
  if (node.dependsOn.length === 0) {
    return 0;
  }

  // 递归计算所有依赖路径的最大值
  let maxPath = 0;
  for (const depId of node.dependsOn) {
    const depPath = getLongestPath(depId, graph);
    maxPath = Math.max(maxPath, depPath);
  }

  return maxPath + 1;
}

/**
 * 优化执行计划
 *
 * 通过分析依赖关系优化执行顺序,最大化并行度
 *
 * @param plan - 原始执行计划
 * @param graph - 依赖关系图
 * @returns 优化后的执行计划
 */
export function optimizeExecutionPlan(
  plan: DataSourceExecutionPlan,
  graph: DependencyGraph
): DataSourceExecutionPlan {
  // 当前版本直接返回原始计划
  // 未来可以添加更多优化策略:
  // 1. 合并小阶段减少调度开销
  // 2. 根据历史执行时间调整顺序
  // 3. 考虑资源限制进行负载均衡
  return plan;
}
