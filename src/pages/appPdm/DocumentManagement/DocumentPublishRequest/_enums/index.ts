/**
 * 文档发布申请单状态枚举
 */
export enum DocumentPublishRequestStatus {
  /** 草稿 */
  Draft = 0,
  /** 已提交（待审批） */
  Submitted = 10,
  /** 审批中（工作流已开始） */
  InApproval = 15,
  /** 已审批 */
  Approved = 20,
  /** 已拒绝 */
  Rejected = 30,
}

/**
 * 状态枚举配置（包含颜色）
 */
export const documentPublishRequestStatusEnum = [
  { label: '草稿', value: DocumentPublishRequestStatus.Draft, color: '#d9d9d9' },
  { label: '已提交', value: DocumentPublishRequestStatus.Submitted, color: '#1890ff' },
  { label: '审批中', value: DocumentPublishRequestStatus.InApproval, color: '#faad14' },
  { label: '已审批', value: DocumentPublishRequestStatus.Approved, color: '#52c41a' },
  { label: '已拒绝', value: DocumentPublishRequestStatus.Rejected, color: '#ff4d4f' },
];

/**
 * 状态文本映射
 */
export const documentPublishRequestStatusText: Record<number, string> = {
  [DocumentPublishRequestStatus.Draft]: '草稿',
  [DocumentPublishRequestStatus.Submitted]: '已提交',
  [DocumentPublishRequestStatus.InApproval]: '审批中',
  [DocumentPublishRequestStatus.Approved]: '已审批',
  [DocumentPublishRequestStatus.Rejected]: '已拒绝',
};

/**
 * 发布类型枚举
 */
export enum PublishType {
  /** 正式发布 */
  Official = 0,
  /** 试发布 */
  Trial = 1,
}

/**
 * 发布类型枚举配置
 */
export const publishTypeEnum = [
  { label: '正式发布', value: PublishType.Official },
  { label: '试发布', value: PublishType.Trial },
];

/**
 * 发布类型文本映射
 */
export const publishTypeText: Record<number, string> = {
  [PublishType.Official]: '正式发布',
  [PublishType.Trial]: '试发布',
};
