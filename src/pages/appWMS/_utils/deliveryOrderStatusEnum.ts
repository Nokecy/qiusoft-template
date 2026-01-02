/**
 * 送货单状态枚举
 */
export enum DeliveryOrderStatusEnum {
  /** 待排产 */
  WaitingProduction = -999,
  /** 等待处理 */
  WaitingProcess = 5,
  /** 预占失败 */
  PreAllocationFailed = 6,
  /** 部分预占失败 */
  PartialPreAllocationFailed = 7,
  /** 生成下架指令 */
  GeneratePickingInstruction = 10,
  /** 下架中 */
  Picking = 15,
  /** 部分交付 */
  PartialDelivery = 18,
  /** 欠料交付 */
  ShortageDelivery = 19,
  /** 下架完成 */
  PickingCompleted = 20,
  /** 待复核 */
  WaitingReview = 21,
  /** 复核中 */
  Reviewing = 22,
  /** 复核完成 */
  ReviewCompleted = 23,
  /** 发运中 */
  Shipping = 25,
  /** 发运完成 */
  ShippingCompleted = 30
}

/**
 * 送货单状态 valueEnum 配置 - 用于 AgGridColumn
 */
export const deliveryOrderStatusEnum = [
  { label: "待排产", value: DeliveryOrderStatusEnum.WaitingProduction, color: '#f5222d' },
  { label: "等待处理", value: DeliveryOrderStatusEnum.WaitingProcess, color: '#f5222d' },
  { label: "预占失败", value: DeliveryOrderStatusEnum.PreAllocationFailed, color: '#f5222d' },
  { label: "部分预占失败", value: DeliveryOrderStatusEnum.PartialPreAllocationFailed, color: '#f5222d' },
  { label: "生成下架指令", value: DeliveryOrderStatusEnum.GeneratePickingInstruction, color: '#a0d911' },
  { label: "下架中", value: DeliveryOrderStatusEnum.Picking, color: '#faad14' },
  { label: "部分交付", value: DeliveryOrderStatusEnum.PartialDelivery, color: '#faad14' },
  { label: "欠料交付", value: DeliveryOrderStatusEnum.ShortageDelivery, color: '#faad14' },
  { label: "下架完成", value: DeliveryOrderStatusEnum.PickingCompleted, color: '#52c41a' },
  { label: "待复核", value: DeliveryOrderStatusEnum.WaitingReview, color: '#1890ff' },
  { label: "复核中", value: DeliveryOrderStatusEnum.Reviewing, color: '#1890ff' },
  { label: "复核完成", value: DeliveryOrderStatusEnum.ReviewCompleted, color: '#52c41a' },
  { label: "发运中", value: DeliveryOrderStatusEnum.Shipping, color: '#13c2c2' },
  { label: "发运完成", value: DeliveryOrderStatusEnum.ShippingCompleted, color: '#52c41a' }
];

/**
 * 送货单状态选项数据 - 用于 Select 组件
 */
export const deliveryOrderStatusOptions = deliveryOrderStatusEnum.map(item => ({
  label: item.label,
  value: item.value
}));