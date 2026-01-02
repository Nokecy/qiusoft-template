/**
 * DependencyGraphViewer 组件
 *
 * 数据源依赖关系图可视化查看器
 * - 使用 @ant-design/charts 实现节点和边的渲染
 * - 支持自动布局
 * - 高亮循环依赖路径
 * - 显示数据源执行顺序
 */

import React, { useMemo, useCallback, useState } from 'react';
import { Card, Empty, Space, Tag, Typography, Alert, Button, Tooltip } from 'antd';
import { ReloadOutlined, FullscreenOutlined } from '@ant-design/icons';
import { OrganizationGraph } from '@ant-design/charts';
import type { DependencyGraphViewerProps, GraphData, GraphNode, GraphEdge } from './types';
import type { DependencyGraph } from '../../types/dependency';
import './style.less';

const { Text, Title } = Typography;

/**
 * 将依赖图转换为可视化图数据
 */
function convertDependencyGraphToGraphData(
  dependencyGraph: DependencyGraph,
  executionOrder?: string[][]
): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // 构建层级映射
  const layerMap = new Map<string, number>();
  if (executionOrder && executionOrder.length > 0) {
    executionOrder.forEach((layer, index) => {
      layer.forEach((nodeId) => {
        layerMap.set(nodeId, index);
      });
    });
  }

  // 添加节点
  dependencyGraph.nodes.forEach((node) => {
    const layer = layerMap.get(node.id);
    const hasCycle = node.metadata?.hasCyclicDependency || false;

    nodes.push({
      id: node.id,
      label: node.id,
      type: 'rect',
      size: [120, 40],
      layer,
      style: {
        fill: hasCycle ? '#fff1f0' : layer !== undefined ? '#e6f7ff' : '#fafafa',
        stroke: hasCycle ? '#ff4d4f' : layer !== undefined ? '#1890ff' : '#d9d9d9',
        lineWidth: 2,
      },
    });
  });

  // 添加边
  dependencyGraph.edges.forEach((edge) => {
    const isCycle = edge.metadata?.isCyclic || false;

    edges.push({
      source: edge.from,
      target: edge.to,
      isCycle,
      style: {
        stroke: isCycle ? '#ff4d4f' : '#1890ff',
        lineWidth: isCycle ? 2 : 1,
        lineDash: isCycle ? [5, 5] : undefined,
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: isCycle ? '#ff4d4f' : '#1890ff',
        },
      },
    });
  });

  return { nodes, edges };
}

/**
 * 检测循环依赖路径
 */
function detectCycles(dependencyGraph: DependencyGraph): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const currentPath: string[] = [];

  const adjacencyList = new Map<string, string[]>();
  dependencyGraph.edges.forEach((edge) => {
    if (!adjacencyList.has(edge.from)) {
      adjacencyList.set(edge.from, []);
    }
    adjacencyList.get(edge.from)!.push(edge.to);
  });

  function dfs(node: string): boolean {
    visited.add(node);
    recursionStack.add(node);
    currentPath.push(node);

    const neighbors = adjacencyList.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) {
          return true;
        }
      } else if (recursionStack.has(neighbor)) {
        // 发现循环
        const cycleStartIndex = currentPath.indexOf(neighbor);
        const cycle = currentPath.slice(cycleStartIndex);
        cycles.push([...cycle, neighbor]);
        return true;
      }
    }

    currentPath.pop();
    recursionStack.delete(node);
    return false;
  }

  dependencyGraph.nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      dfs(node.id);
    }
  });

  return cycles;
}

/**
 * DependencyGraphViewer 组件
 */
export const DependencyGraphViewer: React.FC<DependencyGraphViewerProps> = ({
  dependencyGraph,
  executionOrder,
  loading = false,
  className,
  style,
  height = 500,
  onNodeClick,
}) => {
  const [autoLayout, setAutoLayout] = useState(true);

  // 转换为图数据
  const graphData = useMemo(() => {
    if (!dependencyGraph) return null;
    return convertDependencyGraphToGraphData(dependencyGraph, executionOrder);
  }, [dependencyGraph, executionOrder]);

  // 检测循环依赖
  const cycles = useMemo(() => {
    if (!dependencyGraph) return [];
    return detectCycles(dependencyGraph);
  }, [dependencyGraph]);

  // 统计信息
  const stats = useMemo(() => {
    if (!dependencyGraph) {
      return { nodeCount: 0, edgeCount: 0, layerCount: 0, hasCycle: false };
    }
    return {
      nodeCount: dependencyGraph.nodes.length,
      edgeCount: dependencyGraph.edges.length,
      layerCount: executionOrder?.length || 0,
      hasCycle: cycles.length > 0,
    };
  }, [dependencyGraph, executionOrder, cycles]);

  // 刷新布局
  const handleRefresh = useCallback(() => {
    setAutoLayout((prev) => !prev);
    setTimeout(() => setAutoLayout((prev) => !prev), 100);
  }, []);

  // 节点点击处理
  const handleNodeClick = useCallback(
    (evt: any) => {
      const { item } = evt;
      if (item && item._cfg?.model?.id) {
        onNodeClick?.(item._cfg.model.id);
      }
    },
    [onNodeClick]
  );

  // 图配置
  const graphConfig = useMemo(() => {
    if (!graphData) return null;

    return {
      data: {
        id: 'root',
        children: graphData.nodes.map((node) => ({
          id: node.id,
          value: {
            name: node.label,
            style: node.style,
          },
        })),
      },
      nodeCfg: {
        size: [120, 40],
        type: 'rect',
        style: (node: any) => {
          const originalNode = graphData.nodes.find((n) => n.id === node.id);
          return originalNode?.style || {};
        },
        label: {
          style: {
            fill: '#000',
            fontSize: 12,
          },
        },
      },
      edgeCfg: {
        type: 'polyline',
        style: (edge: any) => {
          const isCycle = cycles.some((cycle) => {
            const cycleEdges = cycle.map((node, idx) => ({
              from: node,
              to: cycle[(idx + 1) % cycle.length],
            }));
            return cycleEdges.some((e) => e.from === edge.source && e.to === edge.target);
          });

          return {
            stroke: isCycle ? '#ff4d4f' : '#1890ff',
            lineWidth: isCycle ? 2 : 1,
            lineDash: isCycle ? [5, 5] : undefined,
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: isCycle ? '#ff4d4f' : '#1890ff',
            },
          };
        },
      },
      layout: {
        type: 'compactBox',
        direction: 'TB',
        getId: (d: any) => d.id,
        getHeight: () => 40,
        getWidth: () => 120,
        getVGap: () => 50,
        getHGap: () => 50,
      },
      autoFit: true,
      height,
      onReady: (graph: any) => {
        graph.on('node:click', handleNodeClick);
      },
    };
  }, [graphData, cycles, height, handleNodeClick]);

  // 空状态
  if (!dependencyGraph) {
    return (
      <Card className={`dependency-graph-viewer ${className || ''}`} style={style}>
        <Empty description="暂无依赖关系图数据" />
      </Card>
    );
  }

  // 无数据源
  if (stats.nodeCount === 0) {
    return (
      <Card className={`dependency-graph-viewer ${className || ''}`} style={style}>
        <Empty description="没有数据源,无法生成依赖关系图" />
      </Card>
    );
  }

  return (
    <div className={`dependency-graph-viewer ${className || ''}`} style={style}>
      <Card
        title={
          <Space>
            <Title level={5} style={{ margin: 0 }}>
              数据源依赖关系图
            </Title>
            <Text type="secondary">
              ({stats.nodeCount} 个数据源, {stats.edgeCount} 条依赖)
            </Text>
          </Space>
        }
        extra={
          <Space>
            <Tooltip title="刷新布局">
              <Button icon={<ReloadOutlined />} size="small" onClick={handleRefresh} />
            </Tooltip>
          </Space>
        }
        loading={loading}
      >
        {/* 循环依赖警告 */}
        {stats.hasCycle && (
          <Alert
            type="error"
            message="检测到循环依赖"
            description={
              <div>
                <div style={{ marginBottom: 8 }}>以下数据源存在循环引用关系,将导致执行失败:</div>
                {cycles.map((cycle, idx) => (
                  <div key={idx} style={{ marginBottom: 4 }}>
                    <Tag color="error">循环 {idx + 1}</Tag>
                    {cycle.map((node, i) => (
                      <React.Fragment key={i}>
                        <Text code>{node}</Text>
                        {i < cycle.length - 1 && <Text type="secondary"> → </Text>}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            }
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {/* 执行顺序 */}
        {executionOrder && executionOrder.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Text strong>执行顺序 (按层级):</Text>
            <div style={{ marginTop: 8 }}>
              {executionOrder.map((layer, idx) => (
                <div key={idx} style={{ marginBottom: 8 }}>
                  <Tag color="blue">Layer {idx + 1}</Tag>
                  {layer.map((node) => (
                    <Tag key={node} style={{ marginLeft: 4 }}>
                      {node}
                    </Tag>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 图例 */}
        <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
          <Space>
            <div
              style={{
                width: 16,
                height: 16,
                border: '2px solid #1890ff',
                backgroundColor: '#e6f7ff',
              }}
            />
            <Text type="secondary">正常依赖</Text>
          </Space>
          <Space>
            <div
              style={{
                width: 16,
                height: 16,
                border: '2px solid #ff4d4f',
                backgroundColor: '#fff1f0',
              }}
            />
            <Text type="secondary">循环依赖</Text>
          </Space>
          <Space>
            <div
              style={{
                width: 30,
                height: 2,
                backgroundColor: '#1890ff',
              }}
            />
            <Text type="secondary">依赖关系</Text>
          </Space>
          <Space>
            <div
              style={{
                width: 30,
                height: 2,
                backgroundColor: '#ff4d4f',
                backgroundImage: 'linear-gradient(to right, #ff4d4f 50%, transparent 50%)',
                backgroundSize: '8px 2px',
              }}
            />
            <Text type="secondary">循环依赖边</Text>
          </Space>
        </div>

        {/* 依赖图 */}
        {graphConfig && autoLayout && (
          <div className="dependency-graph-viewer-canvas" style={{ height }}>
            <OrganizationGraph {...graphConfig} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default DependencyGraphViewer;
