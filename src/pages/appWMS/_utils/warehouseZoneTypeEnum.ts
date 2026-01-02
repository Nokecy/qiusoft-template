/**
 * 库区类型枚举
 */
export enum WarehouseZoneTypeEnum {
  /** 作业区 */
  WorkArea = 5,
  /** 虚拟区 */
  VirtualArea = 6,
  /** 存储区 */
  StorageArea = 10
}

/**
 * 库区类型 valueEnum 配置 - 用于 AgGridColumn
 */
export const warehouseZoneTypeEnum = [
  { label: "作业区", value: WarehouseZoneTypeEnum.WorkArea, color: '#52c41a' },
  { label: "虚拟区", value: WarehouseZoneTypeEnum.VirtualArea, color: '#faad14' },
  { label: "存储区", value: WarehouseZoneTypeEnum.StorageArea, color: '#1890ff' }
];

/**
 * 库区类型选项数据 - 用于 Select 组件
 */
export const warehouseZoneTypeOptions = warehouseZoneTypeEnum.map(item => ({
  label: item.label,
  value: item.value
}));