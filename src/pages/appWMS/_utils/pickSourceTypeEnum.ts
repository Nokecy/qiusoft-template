/**
 * 拣货来源类型枚举
 */
export enum PickSourceTypeEnum {
  /** 无 */
  None = 10,
  /** 生产领料 */
  ProductionMaterial = 20,
  /** 成品发货 */
  FinishedProductShipment = 30
}

/**
 * 拣货来源类型 valueEnum 配置 - 用于 AgGridColumn
 */
export const pickSourceTypeEnum = [
  { label: "无", value: PickSourceTypeEnum.None, color: '#d9d9d9' },
  { label: "生产领料", value: PickSourceTypeEnum.ProductionMaterial, color: '#1890ff' },
  { label: "成品发货", value: PickSourceTypeEnum.FinishedProductShipment, color: '#52c41a' }
];

/**
 * 拣货来源类型选项数据 - 用于 Select 组件
 */
export const pickSourceTypeOptions = pickSourceTypeEnum.map(item => ({
  label: item.label,
  value: item.value
}));