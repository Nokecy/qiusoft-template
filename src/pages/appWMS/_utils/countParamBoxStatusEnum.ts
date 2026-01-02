/**
 * 盘点参数箱体状态枚举
 */
export enum CountParamBoxStatusEnum {
  /** 全部 */
  All = 5,
  /** 整箱 */
  Whole = 10,
  /** 开箱 */
  Opened = 15
}

/**
 * 盘点参数箱体状态 valueEnum 配置 - 用于 AgGridColumn
 */
export const countParamBoxStatusEnum = [
  { label: "全部", value: CountParamBoxStatusEnum.All, color: '#f5222d' },
  { label: "整箱", value: CountParamBoxStatusEnum.Whole, color: '#52c41a' },
  { label: "开箱", value: CountParamBoxStatusEnum.Opened, color: '#13c2c2' }
];

/**
 * 盘点参数箱体状态选项数据 - 用于 Select 组件
 */
export const countParamBoxStatusOptions = countParamBoxStatusEnum.map(item => ({
  label: item.label,
  value: item.value
}));