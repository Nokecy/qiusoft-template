/**
 * 库存调拨任务状态枚举
 */
export enum StoreTransferTaskStatusEnum {
  /** 等待处理 */
  WaitingProcess = 5,
  /** 备货下架完成 */
  PickingCompleted = 10,
  /** 调拨完成 */
  TransferCompleted = 15,
  /** 取消 */
  Cancelled = 20
}

/**
 * 库存调拨任务状态 valueEnum 配置 - 用于 AgGridColumn
 */
export const storeTransferTaskStatusEnum = [
  { label: "等待处理", value: StoreTransferTaskStatusEnum.WaitingProcess, color: '#1890ff' },
  { label: "备货下架完成", value: StoreTransferTaskStatusEnum.PickingCompleted, color: '#52c41a' },
  { label: "调拨完成", value: StoreTransferTaskStatusEnum.TransferCompleted, color: '#13c2c2' },
  { label: "取消", value: StoreTransferTaskStatusEnum.Cancelled, color: '#faad14' }
];

/**
 * 库存调拨任务状态选项数据 - 用于 Select 组件
 */
export const storeTransferTaskStatusOptions = storeTransferTaskStatusEnum.map(item => ({
  label: item.label,
  value: item.value
}));