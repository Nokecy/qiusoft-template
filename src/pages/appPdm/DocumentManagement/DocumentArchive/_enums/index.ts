/**
 * 文档归档状态枚举
 */
export enum DocumentArchiveStatus {
  /** 草稿(保存未提交) */
  Draft = 0,
  /** 待审批(已提交未开始审批) */
  PendingApproval = 10,
  /** 审批中(审批中未审批完成) */
  InApproval = 20,
  /** 审批通过 */
  Approved = 30,
  /** 驳回(审批被拒绝/驳回) */
  Rejected = 40,
}

/**
 * 状态枚举配置(包含颜色)
 */
export const documentArchiveStatusEnum = [
  { label: '草稿', value: DocumentArchiveStatus.Draft, color: '#d9d9d9' },
  { label: '待审批', value: DocumentArchiveStatus.PendingApproval, color: '#108ee9' },
  { label: '审批中', value: DocumentArchiveStatus.InApproval, color: '#1890ff' },
  { label: '审批通过', value: DocumentArchiveStatus.Approved, color: '#52c41a' },
  { label: '驳回', value: DocumentArchiveStatus.Rejected, color: '#f5222d' },
];

/**
 * 状态文本映射
 */
export const documentArchiveStatusText: Record<number, string> = {
  [DocumentArchiveStatus.Draft]: '草稿',
  [DocumentArchiveStatus.PendingApproval]: '待审批',
  [DocumentArchiveStatus.InApproval]: '审批中',
  [DocumentArchiveStatus.Approved]: '审批通过',
  [DocumentArchiveStatus.Rejected]: '驳回',
};

/**
 * 文档归档类型枚举
 */
export enum DocumentArchiveType {
  /** 首次归档 */
  FirstArchive = 0,
  /** 优化归档 */
  OptimizationArchive = 1,
  /** 变更归档 */
  ChangeArchive = 2,
}

/**
 * 归档类型选项(用于表单和列表显示)
 */
export const documentArchiveTypeOptions = [
  { label: '首次归档', value: DocumentArchiveType.FirstArchive, color: '#52c41a' },
  { label: '优化归档', value: DocumentArchiveType.OptimizationArchive, color: '#1890ff' },
  { label: '变更归档', value: DocumentArchiveType.ChangeArchive, color: '#faad14' },
];

/**
 * 归档类型文本映射
 */
export const documentArchiveTypeText: Record<number, string> = {
  [DocumentArchiveType.FirstArchive]: '首次归档',
  [DocumentArchiveType.OptimizationArchive]: '优化归档',
  [DocumentArchiveType.ChangeArchive]: '变更归档',
};
