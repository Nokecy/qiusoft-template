import type { ISchema } from '@formily/react';

/**
 * 内置 Schema 定义
 */
export interface DynamicSchemaDefinition {
  /** 场景标识（唯一 Key） */
  scenarioKey: string;
  /** 显示名称 */
  label: string;
  /** 描述说明 */
  description?: string;
  /** Formily Form 配置 */
  form: {
    labelCol?: number;
    wrapperCol?: number;
    labelWidth?: string;
    feedbackLayout?: string;
    [key: string]: any;
  };
  /** Formily Schema */
  schema: ISchema;
}

/**
 * 后端返回的已发布 Schema DTO
 */
export interface PublishedSchemaDto {
  scenarioKey: string;
  schemaJson: string;
  version: number;
  publishedAt: string | null;
  hostEntityId: string | null;
  entityType: string | null;
}

/**
 * 批量获取响应
 */
export interface AllPublishedSchemasDto {
  schemas: Record<string, PublishedSchemaDto>;
  fetchedAt: string;
}

/**
 * Context 值类型
 */
export interface DynamicSchemaContextValue {
  backendSchemas: Record<string, PublishedSchemaDto>;
  builtinSchemas: Record<string, DynamicSchemaDefinition>;
  isInitialized: boolean;
  lastFetchedAt: Date | null;
  refresh: () => Promise<void>;
}

/**
 * 场景信息（用于场景选择器）
 */
export interface ScenarioInfo {
  scenarioKey: string;
  label: string;
  description?: string;
  source: 'builtin' | 'backend';
  hasBackendOverride?: boolean;
}
