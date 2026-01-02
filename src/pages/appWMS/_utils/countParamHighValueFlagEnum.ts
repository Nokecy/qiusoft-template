/**
 * 盘点参数贵重品标志枚举
 */
export enum CountParamHighValueFlagEnum {
  /** 全部 */
  All = 0,
  /** 是 */
  Yes = 1,
  /** 否 */
  No = 2
}

/**
 * 盘点参数贵重品标志 valueEnum 配置 - 用于 AgGridColumn
 */
export const countParamHighValueFlagEnum = [
  { label: "全部", value: CountParamHighValueFlagEnum.All, color: '#13c2c2' },
  { label: "是", value: CountParamHighValueFlagEnum.Yes, color: '#52c41a' },
  { label: "否", value: CountParamHighValueFlagEnum.No, color: '#d9d9d9' }
];

/**
 * 盘点参数贵重品标志选项数据 - 用于 Select 组件
 */
export const countParamHighValueFlagOptions = countParamHighValueFlagEnum.map(item => ({
  label: item.label,
  value: item.value
}));