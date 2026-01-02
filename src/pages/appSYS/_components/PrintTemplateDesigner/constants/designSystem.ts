/**
 * 视觉设计系统 - 统一的设计规范
 */

// 色彩系统
export const Colors = {
  // 功能区背景
  toolbarBg: '#fafafa',
  sidebarBg: '#f5f5f5',
  canvasBg: '#e6e6e6',
  propertyBg: '#ffffff',

  // 状态色（来自Ant Design）
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',

  // 文本色
  textPrimary: 'rgba(0, 0, 0, 0.88)',
  textSecondary: 'rgba(0, 0, 0, 0.65)',
  textDisabled: 'rgba(0, 0, 0, 0.25)',

  // 边框色
  border: '#f0f0f0',
  borderDark: '#d9d9d9',

  // 背景色
  bgHover: 'rgba(0, 0, 0, 0.04)',
  bgActive: 'rgba(0, 0, 0, 0.06)',
} as const;

// 间距系统
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// 图标尺寸
export const IconSize = {
  toolbar: 16,
  panel: 14,
  small: 12,
  large: 20,
} as const;

// 字体大小
export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
} as const;

// 圆角
export const BorderRadius = {
  sm: 2,
  md: 4,
  lg: 8,
  full: 9999,
} as const;

// 阴影
export const Shadow = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
} as const;

// Z-Index层级
export const ZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  tooltip: 1400,
} as const;
