/**
 * 质量状态枚举
 */
export enum QualityStatusEnum {
  /** 检验中 */
  Testing = 5,
  /** 合格 */
  Qualified = 10,
  /** 不合格 */
  Unqualified = 20
}

/**
 * 质量状态 valueEnum 配置 - 用于 AgGridColumn
 */
export const qualityStatusEnum = [
  { label: "检验中", value: QualityStatusEnum.Testing, color: '#1890ff' },
  { label: "合格", value: QualityStatusEnum.Qualified, color: '#52c41a' },
  { label: "不合格", value: QualityStatusEnum.Unqualified, color: '#f5222d' }
];

/**
 * 质量状态选项数据 - 用于 Select 组件
 */
export const qualityStatusOptions = qualityStatusEnum.map(item => ({
  label: item.label,
  value: item.value
}));