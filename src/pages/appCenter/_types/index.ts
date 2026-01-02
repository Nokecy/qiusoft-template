/**
 * 应用中心类型定义
 */

// 字段数据类型枚举（与后端 FieldDataType 对应）
export enum FieldDataType {
  String = 0,
  Int = 1,
  Long = 2,
  Decimal = 3,
  Boolean = 4,
  DateTime = 5,
  Guid = 6,
  Enum = 7,
  Json = 8,
  Text = 9,
  Binary = 10,
  Double = 11,
  Float = 12,
  Byte = 13,
  Short = 14,
  Reference = 15,
}

// 字段类型到列定义的映射
export const fieldDataTypeConfig: Record<number, { width: number; hideInSearch: boolean }> = {
  [FieldDataType.String]: { width: 150, hideInSearch: false },
  [FieldDataType.Int]: { width: 100, hideInSearch: true },
  [FieldDataType.Long]: { width: 100, hideInSearch: true },
  [FieldDataType.Decimal]: { width: 120, hideInSearch: true },
  [FieldDataType.Boolean]: { width: 80, hideInSearch: false },
  [FieldDataType.DateTime]: { width: 160, hideInSearch: false },
  [FieldDataType.Guid]: { width: 280, hideInSearch: true },
  [FieldDataType.Enum]: { width: 100, hideInSearch: false },
  [FieldDataType.Json]: { width: 200, hideInSearch: true },
  [FieldDataType.Text]: { width: 200, hideInSearch: true },
  [FieldDataType.Binary]: { width: 100, hideInSearch: true },
  [FieldDataType.Double]: { width: 100, hideInSearch: true },
  [FieldDataType.Float]: { width: 100, hideInSearch: true },
  [FieldDataType.Byte]: { width: 80, hideInSearch: true },
  [FieldDataType.Short]: { width: 80, hideInSearch: true },
  [FieldDataType.Reference]: { width: 150, hideInSearch: false },
};

// 应用信息
export interface AppInfo {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  icon?: string;
  isEnabled?: boolean;
  entities?: EntityInfo[];
}

// 实体信息
export interface EntityInfo {
  id: string;
  name: string;
  displayName?: string;
  role: number; // 0 = Primary
  fields?: FieldInfo[];
}

// 字段信息
export interface FieldInfo {
  name: string;
  displayName?: string;
  dataType: number;
  isRequired?: boolean;
  isVisible?: boolean;
  displayOrder?: number;
  defaultValue?: any;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  enumOptions?: Array<{ label: string; value: any }>;
}

// 统计数据
export interface StatisticsData {
  total: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
}

// 动态数据项
export interface DynamicDataItem {
  id: string;
  creationTime: string;
  lastModificationTime?: string;
  data?: Record<string, any>;
  extraProperties?: Record<string, any>;
  [key: string]: any;
}
