/**
 * 文档检出申请单状态枚举
 */
export enum DocumentCheckOutRequestStatus {
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
 * 文档检出申请单状态枚举配置
 */
export const documentCheckOutRequestStatusEnum = [
  {
    label: '待审批',
    value: DocumentCheckOutRequestStatus.Pending,
    color: '#108ee9',
  },
  {
    label: '审批中',
    value: DocumentCheckOutRequestStatus.UnderReview,
    color: '#2db7f5',
  },
  {
    label: '已批准',
    value: DocumentCheckOutRequestStatus.Approved,
    color: '#87d068',
  },
  {
    label: '已拒绝',
    value: DocumentCheckOutRequestStatus.Rejected,
    color: '#f50',
  },
  {
    label: '已取消',
    value: DocumentCheckOutRequestStatus.Cancelled,
    color: '#d9d9d9',
  },
];

/**
 * 文档检出单据状态枚举
 */
export enum CheckOutStatus {
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
 * 文档检出单据状态枚举配置
 */
export const checkOutStatusEnum = [
  {
    label: '草稿',
    value: CheckOutStatus.Draft,
    color: '#d9d9d9',
  },
  {
    label: '已提交',
    value: CheckOutStatus.Submitted,
    color: '#108ee9',
  },
  {
    label: '审批中',
    value: CheckOutStatus.InApproval,
    color: '#1677ff',
  },
  {
    label: '已审批',
    value: CheckOutStatus.Approved,
    color: '#87d068',
  },
  {
    label: '已拒绝',
    value: CheckOutStatus.Rejected,
    color: '#f50',
  },
];
