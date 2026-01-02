/**
 * DependencyGraphViewer 组件专用类型定义
 */

import type { DependencyGraph } from '../../types/dependency';

/**
 * DependencyGraphViewer 组件属性
 */
export interface DependencyGraphViewerProps {
  /** 依赖关系图数据 */
  dependencyGraph: DependencyGraph | null;

  /** 数据源执行顺序(层级化数组) */
  executionOrder?: string[][];

  /** 是否显示加载状态 */
  loading?: boolean;

  /** 自定义类名 */
  className?: string;

  /** 自定义样式 */
  style?: React.CSSProperties;

  /** 图表高度 */
  height?: number;

  /** 节点点击回调 */
  onNodeClick?: (nodeId: string) => void;
}

/**
 * 图节点数据
 */
export interface GraphNode {
  /** 节点ID */
  id: string;

  /** 节点标签(显示文本) */
  label: string;

  /** 节点类型 */
  type?: string;

  /** 节点样式 */
  style?: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
  };

  /** 节点大小 */
  size?: number | [number, number];

  /** 节点层级 */
  layer?: number;
}

/**
 * 图边数据
 */
export interface GraphEdge {
  /** 源节点ID */
  source: string;

  /** 目标节点ID */
  target: string;

  /** 边标签 */
  label?: string;

  /** 边样式 */
  style?: {
    stroke?: string;
    lineWidth?: number;
    lineDash?: number[];
    endArrow?: boolean | { path: string; fill: string };
  };

  /** 是否为循环依赖边 */
  isCycle?: boolean;
}

/**
 * 图数据
 */
export interface GraphData {
  /** 节点列表 */
  nodes: GraphNode[];

  /** 边列表 */
  edges: GraphEdge[];
}
