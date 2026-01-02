/**
 * 使用优先级枚举定义
 */

// 1. 枚举类型定义
export enum UsePriorityEnum {
  Low = 5,      // 低
  Medium = 10,  // 中
  High = 15     // 高
}

// 2. valueEnum配置（用于AgGrid显示和颜色）
export const usePriorityEnum = [
  { label: "低", value: UsePriorityEnum.Low, color: '#d9d9d9' },
  { label: "中", value: UsePriorityEnum.Medium, color: '#faad14' },
  { label: "高", value: UsePriorityEnum.High, color: '#f5222d' }
];

// 3. 选项数据（用于Select组件）
export const usePriorityOptions = usePriorityEnum.map(item => ({
  label: item.label,
  value: item.value
}));