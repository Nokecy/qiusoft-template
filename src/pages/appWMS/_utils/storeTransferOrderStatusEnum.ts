/**
 * 库存调拨订单状态枚举
 */
export enum StoreTransferOrderStatusEnum {
  /** 等待处理 */
  WaitingProcess = 5,
  /** 正在调拨 */
  Transferring = 10,
  /** 调拨出库 */
  TransferOut = 15,
  /** 调拨入库 */
  TransferIn = 20,
  /** 取消 */
  Cancelled = 25,
  /** 完成 */
  Completed = 30
}

/**
 * 库存调拨订单状态 valueEnum 配置 - 用于 AgGridColumn
 */
export const storeTransferOrderStatusEnum = [
  { label: "等待处理", value: StoreTransferOrderStatusEnum.WaitingProcess, color: '#1890ff' },
  { label: "正在调拨", value: StoreTransferOrderStatusEnum.Transferring, color: '#52c41a' },
  { label: "调拨出库", value: StoreTransferOrderStatusEnum.TransferOut, color: '#13c2c2' },
  { label: "调拨入库", value: StoreTransferOrderStatusEnum.TransferIn, color: '#faad14' },
  { label: "取消", value: StoreTransferOrderStatusEnum.Cancelled, color: '#f5222d' },
  { label: "完成", value: StoreTransferOrderStatusEnum.Completed, color: '#52c41a' }
];

/**
 * 库存调拨订单状态选项数据 - 用于 Select 组件
 */
export const storeTransferOrderStatusOptions = storeTransferOrderStatusEnum.map(item => ({
  label: item.label,
  value: item.value
}));