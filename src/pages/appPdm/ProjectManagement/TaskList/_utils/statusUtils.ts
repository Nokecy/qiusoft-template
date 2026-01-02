import { TaskStatus } from './taskEnums';

/**
 * 任务状态判断工具函数
 */

/**
 * 判断是否可以开始任务
 * @param status 当前状态
 */
export const canStart = (status?: number): boolean => {
  return status === TaskStatus.NotStarted;
};

/**
 * 判断是否可以完成任务
 * @param status 当前状态
 */
export const canComplete = (status?: number): boolean => {
  return status === TaskStatus.InProgress;
};

/**
 * 判断是否可以取消任务
 * @param status 当前状态
 */
export const canCancel = (status?: number): boolean => {
  return status !== TaskStatus.Completed && status !== TaskStatus.Cancelled;
};

/**
 * 判断是否可以指派任务
 * @param status 当前状态
 */
export const canAssign = (status?: number): boolean => {
  return status !== TaskStatus.Completed && status !== TaskStatus.Cancelled;
};
