/**
 * 任务分解数据转换工具
 * 将 API 返回的嵌套结构转换为 AgGrid 树形数据需要的扁平结构
 */

import type { API } from '@/services/typings';

/**
 * 树形节点类型
 */
export type TreeNodeType = 'milestone' | 'task';

/**
 * 扁平化后的树形节点
 */
export interface FlatTreeNode {
  // 基础字段
  id?: string;
  parentId?: string;
  nodeType: TreeNodeType;
  hierarchy: string[];

  // 里程碑字段
  milestoneCode?: string;
  milestoneName?: string;
  isVirtual?: boolean;

  // 任务字段
  taskCode?: string;
  taskName?: string;
  milestoneId?: string;
  parentCode?: string;

  // 通用字段
  status?: any;
  responsiblePerson?: string;
  description?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  actualStartDate?: string;
  actualEndDate?: string;

  // 原始数据
  [key: string]: any;
}

/**
 * 将任务分解数据扁平化为树形结构
 * 支持里程碑 -> 任务 -> 子任务的多层嵌套
 * @param data 任务分解 DTO
 * @returns 扁平化的树形节点数组
 */
export const flattenBreakdownData = (
  data: API.BurnAbpPdmProjectManagementProjectMilestonesTaskBreakdownDto
): FlatTreeNode[] => {
  if (!data || !data.milestones || data.milestones.length === 0) {
    return [];
  }

  const result: FlatTreeNode[] = [];

  data.milestones.forEach((milestone, milestoneIndex) => {
    // 使用后端的统一 name 字段，回退到 milestoneName/milestoneCode
    const milestoneName = (milestone as any).name || milestone.milestoneName || milestone.milestoneCode || '未命名里程碑';
    const milestoneId = milestone.id || `milestone-${milestoneIndex}-${milestoneName}`;

    // 添加里程碑节点
    const milestoneNode: FlatTreeNode = {
      ...milestone,
      id: milestoneId,
      nodeType: 'milestone',
      hierarchy: [milestoneName],
      isVirtual: milestone.isVirtual || false,
    };

    result.push(milestoneNode);

    // 处理任务节点（支持父子关系）
    if (milestone.tasks && milestone.tasks.length > 0) {
      // 构建任务编码到任务的映射
      const taskMap = new Map<string, any>();
      milestone.tasks.forEach((task) => {
        if (task.taskCode) {
          taskMap.set(task.taskCode, task);
        }
      });

      // 构建任务编码到名称的映射（用于层级路径）
      const taskNameMap = new Map<string, string>();
      milestone.tasks.forEach((task) => {
        // 使用后端的统一 name 字段
        const taskName = (task as any).name || task.taskName || task.taskCode || '未命名任务';
        if (task.taskCode) {
          taskNameMap.set(task.taskCode, taskName);
        }
      });

      // 递归获取任务的完整层级路径
      const getTaskHierarchy = (task: any, milestoneName: string): string[] => {
        const taskName = task.name || task.taskName || task.taskCode || '未命名任务';

        if (!task.parentCode) {
          // 没有父任务，直接挂在里程碑下
          return [milestoneName, taskName];
        }

        // 有父任务，递归构建路径
        const parentTask = taskMap.get(task.parentCode);
        if (parentTask) {
          const parentHierarchy = getTaskHierarchy(parentTask, milestoneName);
          return [...parentHierarchy, taskName];
        }

        // 父任务不存在（可能被筛选掉或数据不完整），使用父任务名称作为占位
        const parentName = taskNameMap.get(task.parentCode) || task.parentCode;
        return [milestoneName, parentName, taskName];
      };

      // 添加所有任务节点
      milestone.tasks.forEach((task, taskIndex) => {
        const taskName = (task as any).name || task.taskName || task.taskCode || '未命名任务';
        const hierarchy = getTaskHierarchy(task, milestoneName);
        const taskId = task.id || `task-${milestoneIndex}-${taskIndex}-${task.taskCode || taskName}`;
        const rawParentId = task.parentCode ? taskMap.get(task.parentCode)?.id : milestoneId;
        const parentId = rawParentId && rawParentId !== taskId ? rawParentId : milestoneId;

        const taskNode: FlatTreeNode = {
          ...task,
          id: taskId,
          parentId: parentId,
          nodeType: 'task',
          hierarchy: hierarchy,
          milestoneId: milestoneId,
          milestoneCode: milestone.milestoneCode,
          milestoneName: milestone.milestoneName,
          taskName: taskName,
        };

        result.push(taskNode);
      });
    }
  });

  return result;
};

/**
 * 获取节点显示名称
 * @param node 树形节点
 * @returns 显示名称
 */
export const getNodeDisplayName = (node: FlatTreeNode): string => {
  if (node.nodeType === 'milestone') {
    return node.milestoneName || node.milestoneCode || '未命名里程碑';
  } else {
    return node.taskName || node.taskCode || '未命名任务';
  }
};

/**
 * 检查节点是否可编辑
 * @param node 树形节点
 * @returns 是否可编辑
 */
export const isNodeEditable = (node: FlatTreeNode): boolean => {
  if (node.nodeType === 'milestone') {
    // 虚拟里程碑不可编辑
    return !node.isVirtual;
  }
  // 任务都可编辑
  return true;
};

/**
 * 检查节点是否可删除
 * @param node 树形节点
 * @returns 是否可删除
 */
export const isNodeDeletable = (node: FlatTreeNode): boolean => {
  if (node.nodeType === 'milestone') {
    // 里程碑不允许从此页面删除
    return false;
  }
  // 任务可删除（具体权限由后端控制）
  return true;
};
