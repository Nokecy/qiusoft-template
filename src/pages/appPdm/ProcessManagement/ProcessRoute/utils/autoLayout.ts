import dagre from 'dagre';
import { Node, Edge } from 'reactflow';

/**
 * Dagre 自动布局配置
 */
export interface LayoutConfig {
  direction?: 'TB' | 'LR' | 'BT' | 'RL'; // 布局方向: TB=从上到下, LR=从左到右, BT=从下到上, RL=从右到左
  nodeWidth?: number; // 节点宽度
  nodeHeight?: number; // 节点高度
  rankSep?: number; // 层级间距
  nodeSep?: number; // 节点间距
}

/**
 * 使用 Dagre 算法自动布局节点
 * @param nodes ReactFlow 节点数组
 * @param edges ReactFlow 边数组
 * @param config 布局配置
 * @returns 布局后的节点数组
 */
export const getLayoutedNodes = (
  nodes: Node[],
  edges: Edge[],
  config: LayoutConfig = {},
): Node[] => {
  const {
    direction = 'TB',
    nodeWidth = 280,
    nodeHeight = 180,
    rankSep = 150,
    nodeSep = 100,
  } = config;

  // 创建 dagre 图
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // 设置图的布局配置
  dagreGraph.setGraph({
    rankdir: direction, // 布局方向
    ranksep: rankSep, // 层级间距
    nodesep: nodeSep, // 节点间距
    marginx: 50, // 边距 x
    marginy: 50, // 边距 y
  });

  // 添加节点到 dagre 图
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
    });
  });

  // 添加边到 dagre 图
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 执行布局计算
  dagre.layout(dagreGraph);

  // 获取布局后的节点位置
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    // dagre 返回的是节点中心点位置,需要转换为左上角位置
    const x = nodeWithPosition.x - nodeWidth / 2;
    const y = nodeWithPosition.y - nodeHeight / 2;

    return {
      ...node,
      position: {
        x,
        y,
      },
    };
  });

  return layoutedNodes;
};

/**
 * 检测节点是否需要自动布局
 * 当节点位置重叠或者排列混乱时返回 true
 */
export const needsAutoLayout = (nodes: Node[]): boolean => {
  if (nodes.length <= 1) {
    return false;
  }

  // 简单检测:检查是否有节点位置重叠
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const node1 = nodes[i];
      const node2 = nodes[j];

      // 计算两个节点的距离
      const dx = Math.abs(node1.position.x - node2.position.x);
      const dy = Math.abs(node1.position.y - node2.position.y);

      // 如果距离太近,认为需要重新布局
      if (dx < 100 && dy < 100) {
        return true;
      }
    }
  }

  return false;
};

/**
 * 智能自动布局
 * 根据工艺路线的特点,自动选择最佳布局方向
 */
export const smartAutoLayout = (nodes: Node[], edges: Edge[]): Node[] => {
  // 工艺路线优先使用从左到右的布局(生产流程横向展示)
  const direction = 'LR';

  return getLayoutedNodes(nodes, edges, {
    direction,
    nodeWidth: 240,
    nodeHeight: 150,
    rankSep: 120,
    nodeSep: 80,
  });
};
