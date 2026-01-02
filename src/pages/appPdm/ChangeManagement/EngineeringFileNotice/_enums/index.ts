/**
 * 工程文件通知单状态枚举
 * 对应后端: BurnAbpPdmDocumentManagementDocumentChangeOrderStatus
 */
export enum EngineeringFileNotificationStatus {
  /** 草稿 */
  Draft = 0,
  /** 审核中 */
  UnderReview = 5,
  /** 审批中（与 UnderReview 等价，仅用于统一命名） */
  InApproval = 5,
  /** 已通过 */
  Approved = 10,
  /** 驳回 */
  Rejected = 15,
}

/**
 * 状态枚举配置(包含颜色)
 */
export const engineeringFileNotificationStatusEnum = [
  { label: '草稿', value: EngineeringFileNotificationStatus.Draft, color: 'default' },
  { label: '审批中', value: EngineeringFileNotificationStatus.UnderReview, color: '#1890ff' },
  { label: '已完成', value: EngineeringFileNotificationStatus.Approved, color: '#52c41a' },
  { label: '已驳回', value: EngineeringFileNotificationStatus.Rejected, color: '#ff4d4f' },
];

/**
 * 状态文本映射
 */
export const engineeringFileNotificationStatusText: Record<number, string> = {
  [EngineeringFileNotificationStatus.Draft]: '草稿',
  [EngineeringFileNotificationStatus.UnderReview]: '审批中',
  [EngineeringFileNotificationStatus.Approved]: '已完成',
  [EngineeringFileNotificationStatus.Rejected]: '已驳回',
};

/**
 * 归档类型枚举
 */
export enum ArchiveType {
  /** 首次归档 */
  FirstArchive = 0,
  /** 优化归档 */
  OptimizedArchive = 1,
  /** 变更归档 */
  ChangeArchive = 2,
}

/**
 * 归档类型选项(用于表单)
 */
export const archiveTypeOptions = [
  { label: '首次归档', value: ArchiveType.FirstArchive },
  { label: '优化归档', value: ArchiveType.OptimizedArchive },
  { label: '变更归档', value: ArchiveType.ChangeArchive },
];

/**
 * 归档类型文本映射
 */
export const archiveTypeText: Record<number, string> = {
  [ArchiveType.FirstArchive]: '首次归档',
  [ArchiveType.OptimizedArchive]: '优化归档',
  [ArchiveType.ChangeArchive]: '变更归档',
};
