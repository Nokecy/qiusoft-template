/**
 * 树形结构工具函数
 */

import type { DataNode } from 'antd/es/tree';

/**
 * 查找树中的节点
 */
export const findNodeInTree = (
  tree: DataNode[],
  key: React.Key
): DataNode | null => {
  for (const node of tree) {
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const found = findNodeInTree(node.children, key);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/**
 * 获取节点的父路径
 */
export const getNodePath = (tree: DataNode[], key: React.Key): DataNode[] => {
  const path: DataNode[] = [];

  const search = (nodes: DataNode[]) => {
    for (const node of nodes) {
      if (node.key === key) {
        path.push(node);
        return true;
      }
      if (node.children) {
        if (search(node.children)) {
          path.unshift(node);
          return true;
        }
      }
    }
    return false;
  };

  search(tree);
  return path;
};

/**
 * 计算节点在树中的深度（层级）
 */
export const getNodeDepth = (
  tree: DataNode[],
  key: React.Key,
  currentDepth = 0
): number => {
  for (const node of tree) {
    if (node.key === key) {
      return currentDepth + 1;
    }
    if (node.children) {
      const depth = getNodeDepth(node.children, key, currentDepth + 1);
      if (depth > 0) {
        return depth;
      }
    }
  }
  return 0;
};

/**
 * 递归获取树中所有节点
 */
export const getAllNodes = (tree: DataNode[]): DataNode[] => {
  const nodes: DataNode[] = [];

  const traverse = (nodes: DataNode[]) => {
    nodes.forEach((node) => {
      nodes.push(node);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  };

  tree.forEach((node) => {
    nodes.push(node);
    if (node.children && node.children.length > 0) {
      traverse(node.children);
    }
  });

  return nodes;
};

/**
 * 过滤树中的节点（返回匹配节点及其所有祖先）
 */
export const filterTree = (
  tree: DataNode[],
  predicate: (node: DataNode) => boolean
): DataNode[] => {
  return tree
    .map((node) => {
      const children = node.children ? filterTree(node.children, predicate) : [];
      return {
        ...node,
        children: children.length > 0 ? children : undefined,
      };
    })
    .filter((node) => predicate(node) || (node.children && node.children.length > 0));
};

/**
 * 递归展开整棵树
 */
export const expandAllKeys = (tree: DataNode[]): React.Key[] => {
  const keys: React.Key[] = [];

  const traverse = (nodes: DataNode[]) => {
    nodes.forEach((node) => {
      keys.push(node.key);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  };

  traverse(tree);
  return keys;
};

/**
 * 树节点排序
 */
export const sortTree = (
  tree: DataNode[],
  compareFn: (a: DataNode, b: DataNode) => number
): DataNode[] => {
  return tree
    .sort(compareFn)
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children, compareFn) : undefined,
    }));
};
