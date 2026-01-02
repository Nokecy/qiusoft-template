/**
 * 物料料号申请单状态枚举
 * 对应后端: BurnAbpPdmPartManagementEnumsPartApplicationRequestStatus
 */
export enum PartApplicationRequestStatus {
  /** 待审批（申请单已提交，等待审批） */
  Pending = 0,
  /** 审批中（工作流执行中） */
  UnderReview = 1,
  /** 已批准（审批通过，等待生成物料） */
  Approved = 2,
  /** 已完成（审批通过并已生成物料） */
  Completed = 3,
  /** 已驳回（审批未通过） */
  Rejected = 4,
  /** 已取消（申请人主动取消） */
  Cancelled = 5,
}

/**
 * 状态枚举配置（包含颜色）
 */
export const partApplicationRequestStatusEnum = [
  { label: '待审批', value: PartApplicationRequestStatus.Pending, color: '#d9d9d9' },
  { label: '审批中', value: PartApplicationRequestStatus.UnderReview, color: '#1890ff' },
  { label: '已批准', value: PartApplicationRequestStatus.Approved, color: '#52c41a' },
  { label: '已完成', value: PartApplicationRequestStatus.Completed, color: '#722ed1' },
  { label: '已驳回', value: PartApplicationRequestStatus.Rejected, color: '#ff4d4f' },
  { label: '已取消', value: PartApplicationRequestStatus.Cancelled, color: '#faad14' },
];

/**
 * 状态文本映射
 */
export const partApplicationRequestStatusText: Record<number, string> = {
  [PartApplicationRequestStatus.Pending]: '待审批',
  [PartApplicationRequestStatus.UnderReview]: '审批中',
  [PartApplicationRequestStatus.Approved]: '已批准',
  [PartApplicationRequestStatus.Completed]: '已完成',
  [PartApplicationRequestStatus.Rejected]: '已驳回',
  [PartApplicationRequestStatus.Cancelled]: '已取消',
};
