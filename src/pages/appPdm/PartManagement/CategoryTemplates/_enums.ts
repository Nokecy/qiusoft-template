/**
 * 分类层级模板枚举定义
 */

/** 版本号样式枚举 */
export enum VersionNumberStyleEnum {
  /** 数字递增 (1, 2, 3...) */
  Numeric = 1,
  /** 字母递增 (A, B, C...) */
  Alphabetic = 2,
  /** 主.次版本号 (1.0, 1.1, 2.0...) */
  MajorMinor = 3,
}

/** 版本号样式配置 */
export const versionNumberStyleOptions = [
  { label: '数字递增', value: VersionNumberStyleEnum.Numeric },
  { label: '字母递增', value: VersionNumberStyleEnum.Alphabetic },
  { label: '主.次版本号', value: VersionNumberStyleEnum.MajorMinor },
];

/** 启用状态配置 */
export const activeStatusEnum = [
  { label: '启用', value: true, color: '#52c41a' },
  { label: '禁用', value: false, color: '#d9d9d9' },
];
