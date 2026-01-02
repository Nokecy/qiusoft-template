import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { request } from 'umi';
import { useModel } from '@@/plugin-model';
import { DynamicSchemaContext } from './context';
import { BUILTIN_SCHEMAS } from './builtinSchemas';
import type { DynamicSchemaContextValue, PublishedSchemaDto } from './types';

function DynamicSchemaProvider(props: { children: React.ReactNode }) {
  const { initialState } = useModel('@@initialState');
  const [backendSchemas, setBackendSchemas] = useState<Record<string, PublishedSchemaDto>>({});
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 从 initialState 初始化后端 Schema
  useEffect(() => {
    if (initialState?.dynamicSchemas) {
      setBackendSchemas(initialState.dynamicSchemas.schemas || {});
      setLastFetchedAt(new Date(initialState.dynamicSchemas.fetchedAt));
      setIsInitialized(true);
    } else {
      // 如果没有后端 Schema，也标记为已初始化（仅使用内置）
      setIsInitialized(true);
    }
  }, [initialState]);

  // 刷新后端 Schema
  const refresh = useCallback(async () => {
    const endpoints = [
      '/api/dynamic-schema/form-schema/published-schemas',
      '/api/dynamic-schema/form-schemas/all-published',
    ];

    for (const endpoint of endpoints) {
      try {
        const data = await request(endpoint, { method: 'GET' });
        setBackendSchemas(data.schemas || {});
        setLastFetchedAt(new Date(data.fetchedAt));
        return;
      } catch (error) {
        console.warn('[DynamicSchema] 刷新失败:', endpoint, error);
      }
    }

    throw new Error('[DynamicSchema] 刷新失败');
  }, []);

  // 构建 Context 值
  const contextValue = useMemo<DynamicSchemaContextValue>(() => ({
    backendSchemas,
    builtinSchemas: BUILTIN_SCHEMAS,
    isInitialized,
    lastFetchedAt,
    refresh,
  }), [backendSchemas, isInitialized, lastFetchedAt, refresh]);

  return (
    <DynamicSchemaContext.Provider value={contextValue}>
      {props.children}
    </DynamicSchemaContext.Provider>
  );
}

export function innerProvider(container: React.ReactNode) {
  return <DynamicSchemaProvider>{container}</DynamicSchemaProvider>;
}
