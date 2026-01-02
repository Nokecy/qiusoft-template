/**
 * BOM 管理工具函数
 */

import { message } from 'antd';
import type {
  BurnAbpPdmBomManagementBomsBomDto,
  BurnAbpPdmBomManagementBomsBomItemDto,
  BurnAbpPdmBomManagementBomsBomItemTreeDto,
  BomGetListAsyncParams,
  BomGetBomTreeAsyncParams,
  BomGetBomTreeRecursiveAsyncParams,
} from '@/services/pdm/typings';
import {
  BomGetListAsync,
  BomGetAsync,
  BomGetBomTreeAsync,
  BomGetBomTreeRecursiveAsync,
  BomDeleteItemAsync,
  BomCopyBomVersionAsync,
} from '@/services/pdm/Bom';

// 统一 API 错误处理
const handleApiError = (error: any, defaultMessage: string) => {
  console.error(defaultMessage, error);
  message.error(error?.message || defaultMessage);
  throw error;
};

/**
 * 获取 BOM 列表
 */
export const fetchBomList = async (params: BomGetListAsyncParams) => {
  try {
    const data = await BomGetListAsync(params);
    return {
      success: true,
      data: data.items || [],
      total: data.totalCount || 0,
    };
  } catch (error) {
    handleApiError(error, '加载 BOM 列表失败');
    return { success: false, data: [], total: 0 };
  }
};

/**
 * 获取 BOM 详情
 */
export const fetchBomDetail = async (bomId: string | number) => {
  try {
    const data = await BomGetAsync({ id: Number(bomId) });
    return { success: true, data };
  } catch (error) {
    handleApiError(error, '加载 BOM 详情失败');
    return { success: false, data: null };
  }
};

/**
 * 获取 BOM 递归树形结构
 */
export const fetchBomTree = async (params: { bomId: number | string; bomVersion?: string }) => {
  try {
    const data = await BomGetBomTreeRecursiveAsync({
      bomId: Number(params.bomId),
      bomVersion: params.bomVersion,
    });
    return { success: true, data: data || [] };
  } catch (error) {
    handleApiError(error, '加载 BOM 树失败');
    return { success: false, data: [] };
  }
};

/**
 * 删除 BOM 子项
 */
export const deleteBomItem = async (itemId: number, version: string) => {
  try {
    await BomDeleteItemAsync({
      bomItemId: itemId,
      parentMaterialEditionNo: version,
    });
    message.success('删除成功');
    return { success: true };
  } catch (error) {
    handleApiError(error, '删除失败');
    return { success: false };
  }
};

/**
 * 复制 BOM 版本
 */
export const copyBomVersion = async (
  bomId: string,
  sourceVersion: string,
  targetVersion: string,
  remark?: string
) => {
  try {
    await BomCopyBomVersionAsync({
      bomId,
      sourceEditionNo: sourceVersion,
      targetEditionNo: targetVersion,
      remark,
    });
    message.success('版本复制成功');
    return { success: true };
  } catch (error) {
    handleApiError(error, '版本复制失败');
    return { success: false };
  }
};

/**
 * 从递归树中收集所有节点为扁平数组
 */
export const collectAllItemsFromTree = (
  treeNodes: BurnAbpPdmBomManagementBomsBomItemTreeDto[]
): BurnAbpPdmBomManagementBomsBomItemDto[] => {
  const items: BurnAbpPdmBomManagementBomsBomItemDto[] = [];

  const traverse = (nodes: BurnAbpPdmBomManagementBomsBomItemTreeDto[]) => {
    nodes.forEach((node) => {
      // 将树节点转为普通BomItemDto（去除children字段）
      const { children, ...itemData } = node;
      items.push(itemData as BurnAbpPdmBomManagementBomsBomItemDto);

      // 递归处理子节点
      if (children && children.length > 0) {
        traverse(children);
      }
    });
  };

  traverse(treeNodes);
  return items;
};

/**
 * 构建 BOM 递归树形数据结构（用于 Antd Tree 组件）
 */
export const buildTreeDataFromRecursive = (treeNodes: BurnAbpPdmBomManagementBomsBomItemTreeDto[]) => {
  const map = new Map<string, BurnAbpPdmBomManagementBomsBomItemDto>();

  // 递归转换树节点
  const convertNode = (node: BurnAbpPdmBomManagementBomsBomItemTreeDto): any => {
    // 保存原始数据（去除children字段）
    const { children, ...itemData } = node;
    const item = itemData as BurnAbpPdmBomManagementBomsBomItemDto;
    map.set(item.id!, item);

    // 转换为Antd Tree节点格式
    return {
      key: item.id!,
      title: `${item.childMaterialCode} ${item.childMaterialName || ''}`,
      isLeaf: !children || children.length === 0,
      data: item,
      children: children ? children.map(convertNode) : [],
    };
  };

  const tree = treeNodes.map(convertNode);
  return { tree, map };
};

/**
 * 构建 BOM 树形数据结构（从扁平列表，向后兼容）
 */
export const buildTreeData = (items: BurnAbpPdmBomManagementBomsBomItemDto[]) => {
  const map = new Map<string, BurnAbpPdmBomManagementBomsBomItemDto>();
  const treeNodeMap = new Map<string, any>();

  // 第一遍：创建所有节点
  items.forEach((item) => {
    map.set(item.id!, item);
    const node = {
      key: item.id!,
      title: `${item.childMaterialCode} ${item.childMaterialName || ''}`,
      isLeaf: false,
      data: item,
      children: [] as any[],
    };
    treeNodeMap.set(item.id!, node);
  });

  // 第二遍：构建父子关系
  const tree: any[] = [];
  items.forEach((item) => {
    const node = treeNodeMap.get(item.id!)!;
    if (item.parentItemId) {
      const parentNode = treeNodeMap.get(item.parentItemId);
      if (parentNode) {
        parentNode.children.push(node);
      }
    } else {
      tree.push(node);
    }
  });

  return { tree, map, treeNodeMap };
};

/**
 * 获取所有树节点的 key
 */
export const getAllNodeKeys = (nodes: any[]): React.Key[] => {
  let keys: React.Key[] = [];
  nodes.forEach((node) => {
    keys.push(node.key);
    if (node.children && node.children.length > 0) {
      keys = keys.concat(getAllNodeKeys(node.children));
    }
  });
  return keys;
};

/**
 * 获取树的最大层级
 */
export const getMaxLevel = (items: BurnAbpPdmBomManagementBomsBomItemDto[]): number => {
  if (items.length === 0) return 0;
  const levels = items
    .map((item) => parseInt(item.levelCode?.substring(1) || '1'))
    .filter((level) => !isNaN(level));
  return Math.max(...levels);
};

/**
 * 统计 BOM 子项
 */
export const countBomItems = (items: BurnAbpPdmBomManagementBomsBomItemDto[]) => {
  return {
    total: items.length,
    active: items.filter((i) => i.activationStatus === 5).length,
    draft: items.filter((i) => i.activationStatus === 0).length,
    inactive: items.filter((i) => i.activationStatus === 10).length,
    maxLevel: getMaxLevel(items),
  };
};
