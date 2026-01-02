/**
 * 任务状态枚举
 * 对应后端: BurnAbpPdmProjectsTaskStatus
 */
export enum TaskStatus {
  NotStarted = 0,     // 未开始
  InProgress = 10,    // 执行中
  Completed = 20,     // 已完成
  Cancelled = 30,     // 已取消
}

/**
 * 任务状态枚举配置
 */
export const taskStatusEnum = [
  { label: '未开始', value: TaskStatus.NotStarted, color: 'default' },
  { label: '执行中', value: TaskStatus.InProgress, color: 'processing' },
  { label: '已完成', value: TaskStatus.Completed, color: 'success' },
  { label: '已取消', value: TaskStatus.Cancelled, color: 'default' },
];

/**
 * 任务优先级枚举
 * 对应后端: BurnAbpPdmProjectsTaskPriority
 */
export const taskPriorityEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
  { label: '紧急', value: 30, color: 'red' },
];
