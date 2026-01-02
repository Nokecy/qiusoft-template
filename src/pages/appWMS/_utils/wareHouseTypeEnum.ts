/**
 * 仓库类型枚举
 */
export enum WareHouseTypeEnum {
  /** 自有库 */
  OwnedWarehouse = 5,
  /** 客户库 */
  CustomerWarehouse = 10,
  /** WMI库 */
  WMIWarehouse = 15
}

/**
 * 仓库类型 valueEnum 配置 - 用于 AgGridColumn
 */
export const wareHouseTypeEnum = [
  { label: "自有库", value: WareHouseTypeEnum.OwnedWarehouse, color: '#52c41a' },
  { label: "客户库", value: WareHouseTypeEnum.CustomerWarehouse, color: '#1890ff' },
  { label: "WMI库", value: WareHouseTypeEnum.WMIWarehouse, color: '#faad14' }
];

/**
 * 仓库类型选项数据 - 用于 Select 组件
 */
export const wareHouseTypeOptions = wareHouseTypeEnum.map(item => ({
  label: item.label,
  value: item.value
}));