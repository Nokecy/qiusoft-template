/**
 * 仓库属性类型枚举
 */
export enum WarehousePropertyTypeEnum {
  /** 良品库 */
  GoodWarehouse = 5,
  /** 不良品库 */
  DefectiveWarehouse = 10,
  /** 黑名单 */
  Blacklist = 15
}

/**
 * 仓库属性类型 valueEnum 配置 - 用于 AgGridColumn
 */
export const warehousePropertyTypeEnum = [
  { label: "良品库", value: WarehousePropertyTypeEnum.GoodWarehouse, color: '#52c41a' },
  { label: "不良品库", value: WarehousePropertyTypeEnum.DefectiveWarehouse, color: '#f5222d' },
  { label: "黑名单", value: WarehousePropertyTypeEnum.Blacklist, color: '#faad14' }
];

/**
 * 仓库属性类型选项数据 - 用于 Select 组件
 */
export const warehousePropertyTypeOptions = warehousePropertyTypeEnum.map(item => ({
  label: item.label,
  value: item.value
}));