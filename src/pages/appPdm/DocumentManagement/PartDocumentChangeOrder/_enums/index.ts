/**
 * 技术图纸更改单状态枚举
 * 对应后端: BurnAbpPdmDocumentManagementDocumentChangeOrderStatus
 */
export enum PartDocumentChangeOrderStatus {
  /** 审批中 */
  InProgress = 5,
  /** 已完成 */
  Completed = 10,
  /** 已关闭 */
  Closed = 15,
}

/**
 * 状态枚举配置(包含颜色)
 */
export const partDocumentChangeOrderStatusEnum = [
  { label: '审批中', value: PartDocumentChangeOrderStatus.InProgress, color: '#1890ff' },
  { label: '已完成', value: PartDocumentChangeOrderStatus.Completed, color: '#52c41a' },
  { label: '已关闭', value: PartDocumentChangeOrderStatus.Closed, color: '#d9d9d9' },
];

/**
 * 状态文本映射
 */
export const partDocumentChangeOrderStatusText: Record<number, string> = {
  [PartDocumentChangeOrderStatus.InProgress]: '审批中',
  [PartDocumentChangeOrderStatus.Completed]: '已完成',
  [PartDocumentChangeOrderStatus.Closed]: '已关闭',
};
