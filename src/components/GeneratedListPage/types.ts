import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ColDef } from "ag-grid-community";
import { ButtonProps } from "antd";
import { ReactNode } from "react";

/**
 * 权限配置接口
 */
export interface PermissionConfig {
  /** 查看权限 */
  view?: string;
  /** 创建权限 */
  create?: string;
  /** 更新权限 */
  update?: string;
  /** 删除权限 */
  delete?: string;
  /** 导入权限 */
  import?: string;
  /** 导出权限 */
  export?: string;
}

/**
 * API配置接口
 */
export interface ApiConfig {
  /** 列表查询API */
  list: (params: any) => Promise<{
    items?: any[];
    totalCount?: number;
  }>;
  /** 删除API */
  delete?: (params: { id: string | number }) => Promise<void>;
  /** 导出API */
  export?: (params: any) => Promise<Blob>;
  /** 获取导入模板API */
  getImportTemplate?: () => Promise<Blob>;
  /** 导入API */
  import?: (file: FormData) => Promise<void>;
}

/**
 * 工具栏按钮配置
 */
export interface ToolbarActionConfig {
  /** 按钮类型 */
  type: 'create' | 'import' | 'export' | 'downloadTemplate' | 'custom';
  /** 权限键 */
  permission?: string;
  /** 按钮文本 */
  label?: string;
  /** 按钮属性 */
  buttonProps?: ButtonProps;
  /** 自定义组件（当type为custom时） */
  component?: React.ComponentType<any>;
  /** 组件属性 */
  componentProps?: Record<string, any>;
  /** 点击处理函数（当type为custom时） */
  onClick?: () => void;
}

/**
 * 表单对话框组件配置
 */
export interface FormDialogConfig {
  /** 表单组件 */
  component: React.ComponentType<any>;
  /** 标题 */
  title?: string;
  /** 新建标题 */
  createTitle?: string;
  /** 编辑标题 */
  editTitle?: string;
}

/**
 * 树形数据配置
 */
export interface TreeDataConfig {
  /** 是否为树形数据 */
  enabled: boolean;
  /** 获取数据路径的函数 */
  getDataPath?: (data: any) => string[];
  /** 父节点字段名 */
  parentFieldName?: string;
  /** 主键字段名 */
  keyFieldName?: string;
  /** 自动分组列配置 */
  autoGroupColumnDef?: ColDef;
  /** 默认展开层级 */
  groupDefaultExpanded?: number;
  /** 树形数据API */
  treeApi?: () => Promise<any[]>;
  /** 子节点字段名 */
  childrenFieldName?: string;
}

/**
 * 通用列表页面配置接口
 */
export interface GeneratedListPageConfig {
  /** 页面标题 */
  title: string;
  /** Grid Key */
  gridKey: string;
  /** API配置 */
  apiConfig: ApiConfig;
  /** 权限配置 */
  permissions: PermissionConfig;
  /** 列定义 */
  columnDefs: ColDef[];
  /** 表单对话框配置 */
  formDialog?: FormDialogConfig;
  /** 工具栏配置 */
  toolbarActions?: ToolbarActionConfig[];
  /** 是否启用导入导出模板下载 */
  enableImportExport?: boolean;
  /** 导入配置 */
  importConfig?: {
    /** 标题 */
    title?: string;
    /** 下载模板URL */
    downUrl?: string;
    /** 上传URL */
    uploadUrl?: string;
  };
  /** 导出文件名 */
  exportFileName?: string;
  /** 树形数据配置 */
  treeConfig?: TreeDataConfig;
  /** 自定义操作列组件 */
  customOptionsComponent?: React.ComponentType<any>;
  /** 错误处理配置 */
  errorConfig?: {
    /** 是否使用统一错误处理 */
    useErrorHandler?: boolean;
  };
  /** 分页配置 */
  paginationConfig?: {
    /** 默认页大小 */
    defaultPageSize?: number;
    /** 是否启用分页 */
    enabled?: boolean;
  };
  /** Grid引用 */
  gridRef?: React.RefObject<GridRef>;
  /** 刷新回调 */
  onRefresh?: () => void;
}

/**
 * 操作列组件属性接口
 */
export interface OptionsComponentProps {
  /** 行数据 */
  data: any;
  /** 刷新函数 */
  onRefresh: () => void;
  /** 权限配置 */
  permissions: PermissionConfig;
  /** 表单对话框配置 */
  formDialog?: FormDialogConfig;
  /** 删除API */
  deleteApi?: (params: { id: string | number }) => Promise<void>;
  /** 是否使用统一错误处理 */
  useErrorHandler?: boolean;
}