/**
 * 文档回收单状态枚举
 */
export enum DocumentRecycleOrderStatus {
  /** 草稿 - 可编辑 */
  Draft = 0,
  /** 待审核 - 已提交等待审核 */
  PendingApproval = 10,
  /** 审批中 - 工作流审批中 */
  InApproval = 15,
  /** 通过 - 审核通过 */
  Approved = 20,
  /** 驳回 - 审核驳回 */
  Rejected = 30,
}

/**
 * 文档回收单状态枚举配置
 */
export const documentRecycleOrderStatusEnum = [
  {
    label: '草稿',
    value: DocumentRecycleOrderStatus.Draft,
    color: 'default',
  },
  {
    label: '待审核',
    value: DocumentRecycleOrderStatus.PendingApproval,
    color: '#108ee9',
  },
  {
    label: '审批中',
    value: DocumentRecycleOrderStatus.InApproval,
    color: '#2db7f5',
  },
  {
    label: '已通过',
    value: DocumentRecycleOrderStatus.Approved,
    color: '#87d068',
  },
  {
    label: '已驳回',
    value: DocumentRecycleOrderStatus.Rejected,
    color: '#f50',
  },
];

/**
 * 回收明细状态枚举
 */
export enum RecycleItemStatus {
  /** 待回收 */
  Pending = 0,
  /** 部分回收 */
  PartialRecycled = 10,
  /** 已回收 */
  Recycled = 20,
}

/**
 * 回收明细状态枚举配置
 */
export const recycleItemStatusEnum = [
  {
    label: '待回收',
    value: RecycleItemStatus.Pending,
    color: '#108ee9',
  },
  {
    label: '部分回收',
    value: RecycleItemStatus.PartialRecycled,
    color: '#faad14',
  },
  {
    label: '已回收',
    value: RecycleItemStatus.Recycled,
    color: '#52c41a',
  },
];
