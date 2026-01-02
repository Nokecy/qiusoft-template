/**
 * 库位类型枚举定义
 */

// 1. 枚举类型定义
export enum LocationTypeEnum {
  WorkArea = 5,     // 作业区
  VirtualArea = 6,  // 虚拟区
  StorageArea = 10  // 存储区
}

// 2. valueEnum配置（用于AgGrid显示和颜色）
export const locationTypeEnum = [
  { label: "作业区", value: LocationTypeEnum.WorkArea, color: '#52c41a' },
  { label: "虚拟区", value: LocationTypeEnum.VirtualArea, color: '#faad14' },
  { label: "存储区", value: LocationTypeEnum.StorageArea, color: '#1890ff' }
];

// 3. 选项数据（用于Select组件）
export const locationTypeOptions = locationTypeEnum.map(item => ({
  label: item.label,
  value: item.value
}));