/**
 * 文档变更单枚举定义
 */

/**
 * 变更单状态枚举
 * 对应API: BurnAbpPdmChangeManagementDocumentChangeOrderStatus = 0 | 10 | 20 | 30 | 40
 */
export enum DocumentChangeOrderStatus {
  /** 草稿 */
  Draft = 0,
  /** 待审批 */
  PendingApproval = 10,
  /** 审批中 */
  InApproval = 20,
  /** 已批准 */
  Approved = 30,
  /** 已拒绝 */
  Rejected = 40,
}

/**
 * 变更单状态选项
 */
export const changeOrderStatusEnum = [
  { label: '草稿', value: DocumentChangeOrderStatus.Draft, color: '#d9d9d9' },
  { label: '待审批', value: DocumentChangeOrderStatus.PendingApproval, color: '#faad14' },
  { label: '审批中', value: DocumentChangeOrderStatus.InApproval, color: '#1890ff' },
  { label: '已批准', value: DocumentChangeOrderStatus.Approved, color: '#52c41a' },
  { label: '已拒绝', value: DocumentChangeOrderStatus.Rejected, color: '#ff4d4f' },
];
