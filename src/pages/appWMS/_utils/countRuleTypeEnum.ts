/**
 * 盘点规则类型枚举
 */
export enum CountRuleTypeEnum {
  /** 指令盘点 */
  InstructionCount = 5,
  /** 循环盘点 */
  CycleCount = 10,
  /** 冻结盘点 */
  FrozenCount = 15,
  /** 主动盘点 */
  ActiveCount = 20,
  /** 退库盘点 */
  ReturnCount = 25
}

/**
 * 盘点规则类型 valueEnum 配置 - 用于 AgGridColumn
 */
export const countRuleTypeEnum = [
  { label: "指令盘点", value: CountRuleTypeEnum.InstructionCount, color: '#1890ff' },
  { label: "循环盘点", value: CountRuleTypeEnum.CycleCount, color: '#52c41a' },
  { label: "冻结盘点", value: CountRuleTypeEnum.FrozenCount, color: '#13c2c2' },
  { label: "主动盘点", value: CountRuleTypeEnum.ActiveCount, color: '#faad14' },
  { label: "退库盘点", value: CountRuleTypeEnum.ReturnCount, color: '#f5222d' }
];

/**
 * 盘点规则类型选项数据 - 用于 Select 组件
 */
export const countRuleTypeOptions = countRuleTypeEnum.map(item => ({
  label: item.label,
  value: item.value
}));