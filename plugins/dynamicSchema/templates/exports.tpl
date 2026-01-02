import React, { useContext, useMemo } from 'react';
import type { ISchema } from '@formily/react';
import { DynamicSchemaContext } from './context';
import type {
  DynamicSchemaContextValue,
  DynamicSchemaDefinition,
  ScenarioInfo,
  PublishedSchemaDto,
} from './types';

export * from './types';
export { DynamicSchemaContext } from './context';

/**
 * 递归为 ArrayTable 组件自动添加 gridKey
 * @param schema Schema 节点
 * @param fieldKey 当前字段 key
 */
function addGridKeyToArrayTables(schema: any, fieldKey: string = ''): void {
  if (!schema || typeof schema !== 'object') return;

  // 如果是 ArrayTable 且缺少 gridKey
  if (schema['x-component'] === 'ArrayTable') {
    if (!schema['x-component-props']) {
      schema['x-component-props'] = {};
    }
    if (!schema['x-component-props'].gridKey) {
      // 优先使用 x-designable-id,其次使用字段 key
      schema['x-component-props'].gridKey = schema['x-designable-id'] || fieldKey || 'auto-grid-key';
    }
  }

  // 递归处理 properties
  if (schema.properties) {
    Object.entries(schema.properties).forEach(([key, value]) => {
      addGridKeyToArrayTables(value, key);
    });
  }

  // 递归处理 items (ArrayTable 的子项)
  if (schema.items) {
    addGridKeyToArrayTables(schema.items, fieldKey);
  }
}

/**
 * 获取动态 Schema
 * @param scenarioKey 场景标识
 * @returns Schema 及相关信息
 */
export function useDynamicSchema(scenarioKey: string): {
  schema: ISchema;
  formConfig: Record<string, any>;
  source: 'backend' | 'builtin';
  version: number | null;
  loading: boolean;
  error: Error | null;
} {
  const context = useContext(DynamicSchemaContext);

  if (!context) {
    throw new Error('useDynamicSchema must be used within DynamicSchemaProvider');
  }

  const { backendSchemas, builtinSchemas, isInitialized } = context;

  return useMemo(() => {
    // 未初始化时返回 loading 状态
    if (!isInitialized) {
      return {
        schema: { type: 'object', properties: {} },
        formConfig: {},
        source: 'builtin' as const,
        version: null,
        loading: true,
        error: null,
      };
    }

    // 优先使用后端 Schema
    const backendSchema = backendSchemas[scenarioKey];
    if (backendSchema) {
      try {
        const parsed = JSON.parse(backendSchema.schemaJson);
        const schema = parsed.schema || parsed;
        const formConfig = parsed.form || {};

        // 自动为 ArrayTable 添加 gridKey
        addGridKeyToArrayTables(schema);

        return {
          schema,
          formConfig,
          source: 'backend' as const,
          version: backendSchema.version,
          loading: false,
          error: null,
        };
      } catch (error) {
        console.error(`[DynamicSchema] 解析后端 Schema 失败: ${scenarioKey}`, error);
        // 解析失败时回退到内置
      }
    }

    // 使用内置 Schema
    const builtinSchema = builtinSchemas[scenarioKey];
    if (builtinSchema) {
      // 为内置 Schema 也添加 gridKey (防止内置 Schema 也缺少)
      const schema = { ...builtinSchema.schema };
      addGridKeyToArrayTables(schema);

      return {
        schema,
        formConfig: builtinSchema.form,
        source: 'builtin' as const,
        version: null,
        loading: false,
        error: null,
      };
    }

    // 都不存在时返回错误
    return {
      schema: { type: 'object', properties: {} },
      formConfig: {},
      source: 'builtin' as const,
      version: null,
      loading: false,
      error: new Error(`[DynamicSchema] 未找到 Schema: ${scenarioKey}`),
    };
  }, [scenarioKey, backendSchemas, builtinSchemas, isInitialized]);
}

/**
 * 获取 Schema 注册表操作
 */
export function useDynamicSchemaRegistry() {
  const context = useContext(DynamicSchemaContext);

  if (!context) {
    throw new Error('useDynamicSchemaRegistry must be used within DynamicSchemaProvider');
  }

  return {
    refresh: context.refresh,
    isInitialized: context.isInitialized,
    lastFetchedAt: context.lastFetchedAt,
  };
}

/**
 * 获取所有可用的场景列表
 */
export function useAvailableDynamicScenarios(): ScenarioInfo[] {
  const context = useContext(DynamicSchemaContext);

  if (!context) {
    throw new Error('useAvailableDynamicScenarios must be used within DynamicSchemaProvider');
  }

  const { backendSchemas, builtinSchemas } = context;

  return useMemo(() => {
    const result: ScenarioInfo[] = [];
    const seenKeys = new Set<string>();

    // 先添加内置 Schema
    Object.entries(builtinSchemas).forEach(([key, def]) => {
      seenKeys.add(key);
      result.push({
        scenarioKey: key,
        label: def.label,
        description: def.description,
        source: 'builtin',
        hasBackendOverride: !!backendSchemas[key],
      });
    });

    // 添加后端独有的 Schema
    Object.entries(backendSchemas).forEach(([key, dto]) => {
      if (!seenKeys.has(key)) {
        result.push({
          scenarioKey: key,
          label: key,
          source: 'backend',
        });
      }
    });

    return result;
  }, [backendSchemas, builtinSchemas]);
}

/**
 * 检查是否有后端覆盖
 */
export function useDynamicSchemaHasOverride(scenarioKey: string): boolean {
  const context = useContext(DynamicSchemaContext);
  return !!context?.backendSchemas[scenarioKey];
}
