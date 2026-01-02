/**
 * DataSourceFormModal组件类型定义
 */

import type { TemplateParameter } from '../../types/parameter';
import type { AtlDataSource, AtlDataSourceWithDependency } from '../../types';

/**
 * DataSourceFormModal Props接口
 */
export interface DataSourceFormModalProps {
  /** 弹窗显示状态 */
  visible: boolean;

  /** 当前编辑的数据源(null表示新增) */
  dataSource: AtlDataSource | null;

  /** 所有数据源列表(用于依赖关系分析) */
  allDataSources: AtlDataSource[];

  /** 模板参数列表(用于参数映射) */
  templateParameters: TemplateParameter[];

  /** 保存回调函数 */
  onSave: (dataSource: AtlDataSource) => void;

  /** 取消回调函数 */
  onCancel: () => void;
}

/**
 * 表单字段类型定义
 */
export interface DataSourceFormData {
  /** 数据源名称 */
  name: string;

  /** 数据源类型 */
  type: number;

  /** 其他配置数据(根据type动态) */
  [key: string]: unknown;
}

/**
 * 参数映射编辑器Props
 */
export interface ParameterMappingEditorProps {
  /** 数据源ID */
  dataSourceId: string;

  /** 数据源参数列表 */
  dataSourceParameters: string[];

  /** 当前参数映射配置 */
  parameterMappings: Record<string, string>;

  /** 可用的模板参数 */
  availableTemplateParameters: string[];

  /** 可用的数据源列表 */
  availableDataSources: Array<{ name: string; fields?: string[] }>;

  /** 更新回调 */
  onUpdate?: (paramName: string, mapping: any) => void;

  /** 删除回调 */
  onRemove?: (paramName: string) => void;

  /** 只读模式 */
  readonly?: boolean;

  /** 加载状态 */
  loading?: boolean;

  /** 自定义样式类名 */
  className?: string;

  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 依赖关系信息
 */
export interface DependencyInfo {
  /** 依赖的数据源列表 */
  dependsOnDataSources: string[];

  /** 依赖的模板参数列表 */
  dependsOnParameters: string[];

  /** 是否有循环依赖 */
  hasCircularDependency: boolean;

  /** 循环依赖路径(如果存在) */
  circularPath?: string[];
}

/**
 * 验证结果
 */
export interface ValidationResult {
  /** 是否有效 */
  valid: boolean;

  /** 错误消息列表 */
  errors: string[];

  /** 警告消息列表 */
  warnings?: string[];
}
