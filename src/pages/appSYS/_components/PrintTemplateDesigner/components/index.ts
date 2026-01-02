/**
 * 打印模板设计器 - 数据源组件统一导出
 */

// 数据源面板（主组件）
export { DataSourcePanel } from './DataSourcePanel.v2';
export type { DataSourcePanelProps } from './DataSourcePanel.v2';

// 测试结果展示组件
export { TestResultModal } from './TestResultModal';
export type { TestResultModalProps } from './TestResultModal';

export { BatchTestResultModal } from './BatchTestResultModal';
export type { BatchTestResultModalProps } from './BatchTestResultModal';

// 数据源配置表单
export { DataSourceFormModal } from './DataSourceFormModal';
export type { DataSourceFormModalProps } from './DataSourceFormModal/types';

// 分类型配置表单组件
export { ArrayDataSourceForm } from './forms/ArrayDataSourceForm';
export type { ArrayDataSourceFormProps } from './forms/ArrayDataSourceForm';

export { ApiDataSourceForm } from './forms/ApiDataSourceForm';
export type { ApiDataSourceFormProps } from './forms/ApiDataSourceForm';

export { SqlDataSourceForm } from './forms/SqlDataSourceForm';
export type { SqlDataSourceFormProps } from './forms/SqlDataSourceForm';

// ========== Phase 4: 参数化功能组件 ==========

// 参数编辑器
export { ParameterEditor } from './ParameterEditor';
export type { ParameterEditorProps } from './ParameterEditor/types';

// 参数映射编辑器
export { ParameterMappingEditor } from './ParameterMappingEditor';
export type { ParameterMappingEditorProps } from './ParameterMappingEditor/types';

// 依赖关系图查看器
export { DependencyGraphViewer } from './DependencyGraphViewer';
export type { DependencyGraphViewerProps } from './DependencyGraphViewer/types';
