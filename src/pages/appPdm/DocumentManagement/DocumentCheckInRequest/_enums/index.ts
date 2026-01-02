/**
 * 文档检入申请单状态枚举
 */
export enum DocumentCheckInRequestStatus {
  /** 待审批 */
  Pending = 0,
  /** 审批中 */
  UnderReview = 5,
  /** 已批准 */
  Approved = 10,
  /** 已拒绝 */
  Rejected = 15,
  /** 已取消 */
  Cancelled = 20,
}

/**
 * 文档检入申请单状态枚举配置
 */
export const documentCheckInRequestStatusEnum = [
  {
    label: '待审批',
    value: DocumentCheckInRequestStatus.Pending,
    color: '#108ee9',
  },
  {
    label: '审批中',
    value: DocumentCheckInRequestStatus.UnderReview,
    color: '#2db7f5',
  },
  {
    label: '已批准',
    value: DocumentCheckInRequestStatus.Approved,
    color: '#87d068',
  },
  {
    label: '已拒绝',
    value: DocumentCheckInRequestStatus.Rejected,
    color: '#f50',
  },
  {
    label: '已取消',
    value: DocumentCheckInRequestStatus.Cancelled,
    color: '#d9d9d9',
  },
];

/**
 * 单据状态枚举
 */
export enum CheckInStatus {
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
 * 单据状态枚举配置
 */
export const checkInStatusEnum = [
  {
    label: '草稿',
    value: CheckInStatus.Draft,
    color: '#d9d9d9',
  },
  {
    label: '已提交',
    value: CheckInStatus.Submitted,
    color: '#108ee9',
  },
  {
    label: '审批中',
    value: CheckInStatus.InApproval,
    color: '#2db7f5',
  },
  {
    label: '已审批',
    value: CheckInStatus.Approved,
    color: '#52c41a',
  },
  {
    label: '已拒绝',
    value: CheckInStatus.Rejected,
    color: '#ff4d4f',
  },
];
