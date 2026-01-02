import { ISchema } from '@formily/react';
import { ButtonProps } from 'antd';

/**
 * API配置接口
 */
export interface FormApiConfig {
  /** 获取单条记录的API */
  get?: (params: { id: string | number }) => Promise<any>;
  /** 创建记录的API */
  create: (values: any) => Promise<any>;
  /** 更新记录的API */
  update: (params: { id: string | number }, values: any) => Promise<any>;
}

/**
 * 外部Schema配置接口
 */
export interface ExternalSchemaConfig {
  /** 表单布局配置 */
  form: Record<string, any>;
  /** Schema定义 */
  schema: ISchema;
}

/**
 * Schema配置接口
 */
export interface FormSchemaConfig {
  /** 表单ID */
  formId: string;
  /** 表单配置 */
  form: Record<string, any>;
  /** Schema定义 */
  schema: ISchema;
}

/**
 * 标准化FormDialog配置接口
 */
export interface StandardFormDialogConfig {
  /** Schema配置 */
  schemaConfig: FormSchemaConfig;
  /** API配置 */
  apiConfig: FormApiConfig;
  /** 对话框宽度 */
  width?: number;
  /** 实体ID（编辑时） */
  entityId?: string | number;
  /** 标题 */
  title?: string;
  /** 按钮属性 */
  buttonProps?: ButtonProps;
  /** 提交成功后的回调 */
  onAfterSubmit?: () => void;
  /** 子元素 */
  children?: React.ReactNode;
  /** 门户ID前缀 */
  portalIdPrefix?: string;
  /** 自定义初始化逻辑 */
  customInitializer?: (form: any, entityId?: string | number) => Promise<void>;
  /** 自定义提交逻辑 */
  customSubmitHandler?: (values: any, isEdit: boolean) => Promise<void>;
  /** 是否启用统一错误处理 */
  useUnifiedErrorHandling?: boolean;
}

/**
 * withStandardForm配置接口
 */
export interface WithStandardFormConfig {
  /** 表单ID */
  formId: string;
  /** 业务字段配置 - 当未提供externalSchema时必需 */
  businessFields?: Record<string, any>;
  /** 外部Schema配置 - 支持schema.ts文件导入 */
  externalSchema?: ExternalSchemaConfig;
  /** API配置 */
  apiConfig: {
    get?: (params: any) => Promise<any>;
    create?: (data: any) => Promise<any>;
    update?: (params: any, data: any) => Promise<any>;
  };
  /** 默认对话框配置 */
  defaultDialogConfig?: {
    width?: number;
    title?: string;
  };
  /** 自定义表单处理器 */
  customHandlers?: {
    initializer?: (form: any, entityId: string) => Promise<void>;
    submitHandler?: (values: any, isEdit: boolean) => Promise<void>;
  };
}

/**
 * StandardFormDialog组件属性接口
 */
export interface StandardFormDialogProps extends Omit<StandardFormDialogConfig, 'schemaConfig'> {
  /** Schema配置 */
  schemaConfig?: FormSchemaConfig;
  /** 或者直接传入formId和schema */
  formId?: string;
  formSchema?: { form: Record<string, any>, schema: ISchema };
}