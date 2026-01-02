/**
 * ParameterEditor 组件专用类型定义
 */

import type { TemplateParameter, ParameterType } from '../../types/parameter';

/**
 * ParameterEditor 组件属性
 */
export interface ParameterEditorProps {
  /** 参数定义字典 */
  parameters: Record<string, TemplateParameter>;

  /** 添加参数回调 */
  onAdd?: (parameter: TemplateParameter) => void;

  /** 更新参数回调 */
  onUpdate?: (name: string, updates: Partial<TemplateParameter>) => void;

  /** 删除参数回调 */
  onRemove?: (name: string) => void;

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
 * 参数表格行数据
 */
export interface ParameterTableRow {
  /** 参数名称(唯一标识) */
  key: string;

  /** 参数名称 */
  name: string;

  /** 参数类型 */
  type: ParameterType;

  /** 是否必填 */
  required: boolean;

  /** 默认值 */
  defaultValue: any;

  /** 约束条件摘要 */
  constraintsSummary?: string;

  /** 参数描述 */
  description?: string;

  /** 显示标签 */
  label?: string;

  /** 原始参数对象 */
  rawParameter: TemplateParameter;
}

/**
 * 参数编辑表单数据
 */
export interface ParameterFormData {
  /** 参数名称 */
  name: string;

  /** 参数类型 */
  type: ParameterType;

  /** 是否必填 */
  required: boolean;

  /** 默认值 */
  defaultValue?: any;

  /** 参数描述 */
  description?: string;

  /** 显示标签 */
  label?: string;

  /** 约束条件: 最小值 */
  min?: number;

  /** 约束条件: 最大值 */
  max?: number;

  /** 约束条件: 正则表达式 */
  pattern?: string;

  /** 约束条件: 最小长度 */
  minLength?: number;

  /** 约束条件: 最大长度 */
  maxLength?: number;

  /** 约束条件: 最小数组项数 */
  minItems?: number;

  /** 约束条件: 最大数组项数 */
  maxItems?: number;

  /** 约束条件: 数组项类型 */
  itemType?: ParameterType;

  /** 约束条件: 枚举值列表 */
  enum?: Array<string | number | boolean>;

  /** 约束条件: 枚举标签列表 */
  enumLabels?: string[];

  /** 参数分组 */
  group?: string;

  /** 显示顺序 */
  order?: number;

  /** 参数提示 */
  placeholder?: string;

  /** 帮助文本 */
  helpText?: string;
}

/**
 * 参数编辑模态框操作类型
 */
export type ParameterEditMode = 'add' | 'edit';
