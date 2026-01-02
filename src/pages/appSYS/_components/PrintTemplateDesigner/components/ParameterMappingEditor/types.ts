/**
 * ParameterMappingEditor 组件专用类型定义
 */

import type { ParameterMapping, ParameterReferenceType } from '../../types/dataSourceParameter';

/**
 * ParameterMappingEditor 组件属性
 */
export interface ParameterMappingEditorProps {
  /** 数据源ID(名称) */
  dataSourceId: string;

  /** 数据源参数名称列表(需要映射的参数) */
  dataSourceParameters: string[];

  /** 当前参数映射配置 */
  parameterMappings: Record<string, string>;

  /** 可用的模板参数列表 */
  availableTemplateParameters: string[];

  /** 可用的数据源列表(用于引用其他数据源字段) */
  availableDataSources: Array<{
    name: string;
    fields?: string[];
  }>;

  /** 更新参数映射回调 */
  onUpdate?: (parameterName: string, mapping: ParameterMapping) => void;

  /** 删除参数映射回调 */
  onRemove?: (parameterName: string) => void;

  /** 是否只读模式 */
  readonly?: boolean;

  /** 是否显示加载状态 */
  loading?: boolean;

  /** 自定义类名 */
  className?: string;

  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 参数映射表格行数据
 */
export interface ParameterMappingTableRow {
  /** 行键(参数名称) */
  key: string;

  /** 参数名称 */
  parameterName: string;

  /** 引用类型 */
  referenceType: ParameterReferenceType | null;

  /** 引用表达式 */
  referenceExpression: string;

  /** 是否有效 */
  valid: boolean;

  /** 错误消息 */
  error?: string;

  /** 警告消息 */
  warnings?: string[];
}

/**
 * 参数映射编辑表单数据
 */
export interface ParameterMappingFormData {
  /** 参数名称 */
  parameterName: string;

  /** 引用类型 */
  referenceType: ParameterReferenceType;

  /** 引用表达式 */
  referenceExpression: string;

  /** 映射说明 */
  description?: string;

  /** 默认值(当引用失败时使用) */
  fallbackValue?: any;
}

/**
 * 引用路径建议项
 */
export interface ReferenceSuggestion {
  /** 显示文本 */
  label: string;

  /** 实际值 */
  value: string;

  /** 引用类型 */
  type: ParameterReferenceType;

  /** 描述 */
  description?: string;
}
