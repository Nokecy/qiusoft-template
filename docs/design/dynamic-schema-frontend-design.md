# DynamicSchema 前端设计文档

## 1. 概述

### 1.1 背景说明

本文档描述 DynamicSchema 模块在前端的消费端实现方案。DynamicSchema 模块支持动态表单 Schema 的管理，实现前后端联动：

- **前端内置 Schema**：在前端代码中预定义的默认表单结构
- **后端自定义 Schema**：通过表单设计器创建并保存到数据库的自定义表单
- **联动机制**：后端有定义时完全覆盖前端内置，无定义时使用前端内置

### 1.2 设计目标

1. **独立新建**：不修改现有 `formSchema` 机制，新建独立体系
2. **复用模式**：参考现有 `getAllSchema` 插件模式，保持一致性
3. **UmiJS 集成**：利用插件机制和 initialState 实现初始化
4. **简单清晰**：以 ScenarioKey 为唯一标识，一维查找

### 1.3 与现有机制的关系

| 特性 | 现有 formSchema | 新 dynamicSchema |
|------|----------------|------------------|
| 标识符 | `formId` (如 "Common.Warehouses") | `scenarioKey` (如 "warehouse:create") |
| 插件 | `getAllSchema` | `dynamicSchema`（新建） |
| Hook | `useFormSchema` | `useDynamicSchema` |
| API | `initialState.formSchemas` | `/api/dynamic-schema/form-schemas/all-published` |
| 来源 | FormSchema 表 | DynamicSchema 模块 |

两套机制并存，互不干扰。

---

## 2. 架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────────┐
│                         应用层 (Application)                         │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  DynamicForm    │  │ ScenarioSelector│  │ SchemaErrorBoundary │  │
│  │  (表单组件)     │  │  (选择器组件)   │  │   (错误边界组件)    │  │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘  │
│           │                    │                      │              │
├───────────┴────────────────────┴──────────────────────┴─────────────┤
│                         Hooks 层 (Custom Hooks)                      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────────┐  ┌─────────────────┐  │
│  │useDynamicSchema │  │useDynamicSchemaReg. │  │useAvailableScen.│  │
│  └────────┬────────┘  └──────────┬──────────┘  └────────┬────────┘  │
│           │                      │                      │            │
├───────────┴──────────────────────┴──────────────────────┴───────────┤
│                         Context 层 (React Context)                   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │              DynamicSchemaContext.Provider                   │    │
│  │  ┌─────────────────────┐  ┌─────────────────────────────┐   │    │
│  │  │  后端 Schema 缓存   │  │     内置 Schema 注册表       │   │    │
│  │  │  (BACKEND_SCHEMAS)  │  │   (BUILTIN_SCHEMAS)         │   │    │
│  │  └─────────────────────┘  └─────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              │                                       │
├──────────────────────────────┴──────────────────────────────────────┤
│                         数据层 (Data Sources)                        │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐   │
│  │      后端 API                │  │     UmiJS 插件扫描           │   │
│  │  /api/dynamic-schema/...    │  │  内置 Schema 文件聚合        │   │
│  └─────────────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
caimen-react/
├── plugins/
│   └── dynamicSchema/                # UmiJS 插件
│       ├── index.ts                  # 插件入口
│       ├── getSchemas.ts             # Schema 文件扫描
│       └── templates/                # 代码生成模板
│           ├── runtime.tpl           # 运行时 Provider
│           ├── exports.tpl           # 导出文件
│           └── builtins.tpl          # 内置 Schema 聚合
│
├── src/
│   ├── dynamicSchemas/               # 内置 Schema 定义
│   │   ├── index.ts                  # 聚合导出
│   │   ├── types.ts                  # 类型定义
│   │   └── builtin/                  # 按业务分类
│   │       ├── user.ts               # 用户相关 Schema
│   │       ├── order.ts              # 订单相关 Schema
│   │       └── approval.ts           # 审批相关 Schema
│   │
│   ├── pages/
│   │   └── appXxx/
│   │       └── _dynamicSchemas/      # 模块级内置 Schema（可选）
│   │           └── xxx.ts
│   │
│   └── services/
│       └── dynamicSchema/            # API 服务
│           ├── formSchema.ts         # Schema 相关 API
│           └── typings.d.ts          # 类型定义
│
└── docs/
    └── design/
        └── dynamic-schema-frontend-design.md  # 本文档
```

### 2.3 数据流

```
┌─────────────────────────────────────────────────────────────────────┐
│  应用启动                                                            │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  getInitialState()                                                   │
│  ├── 调用 getAllPublishedDynamicSchemas API                          │
│  └── 返回 { dynamicSchemas: {...} }                                  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DynamicSchemaProvider（由 runtime.tsx 注入）                        │
│  ├── 从 initialState 获取后端 Schema                                 │
│  ├── 聚合内置 Schema（由插件扫描生成）                                │
│  └── 提供 DynamicSchemaContext                                       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│  组件使用                                                            │
│  ├── useDynamicSchema('order:create')                                │
│  │   └── 优先后端 → 回退内置 → 抛出错误                               │
│  └── <DynamicForm scenarioKey="order:create" />                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. UmiJS 插件设计

### 3.1 插件职责

1. **扫描内置 Schema 文件**：自动发现 `src/dynamicSchemas/builtin/` 和 `src/pages/**/_dynamicSchemas/` 下的 Schema 定义
2. **生成聚合代码**：将分散的 Schema 文件聚合为统一的注册表
3. **注入运行时 Provider**：提供 DynamicSchemaContext

### 3.2 插件入口

```typescript
// plugins/dynamicSchema/index.ts

import { IApi } from '@umijs/max';
import { join } from 'path';
import { Mustache, lodash, winPath } from '@umijs/utils';
import { getSchemas } from './getSchemas';
import fs from 'fs';
import path from 'path';

export default (api: IApi) => {
  // 插件注册
  api.describe({
    key: 'dynamicSchema',
    config: {
      schema(joi) {
        return joi.object({
          // 是否启用后端 Schema 获取
          enableBackend: joi.boolean().default(true),
          // API 基础路径
          apiBasePath: joi.string().default('/api/dynamic-schema'),
        });
      },
    },
    enableBy: api.EnableBy.register,
  });

  // 获取内置 Schema 路径
  function getBuiltinSchemasPath() {
    return join(api.paths.absSrcPath!, 'dynamicSchemas/builtin');
  }

  // 扫描所有内置 Schema 文件
  function getAllBuiltinSchemas() {
    const builtinPath = getBuiltinSchemasPath();
    return lodash.uniq([
      // src/dynamicSchemas/builtin/ 下的文件
      ...getSchemas({
        base: builtinPath,
        cwd: api.cwd,
      }),
      // src/pages/**/_dynamicSchemas/ 下的文件
      ...getSchemas({
        base: api.paths.absPagesPath!,
        cwd: api.cwd,
        pattern: '**/_dynamicSchemas/*.{ts,tsx}',
      }),
    ]);
  }

  // 生成临时文件
  api.onGenerateFiles(() => {
    const schemaFiles = getAllBuiltinSchemas();

    // 生成导入信息
    const imports = schemaFiles.map((file, index) => {
      const relativePath = winPath(file).replace(/\\/g, '/');
      const varName = `schemas_${index}`;
      return {
        varName,
        importPath: relativePath,
      };
    });

    // 读取模板
    const runtimeTpl = fs.readFileSync(
      path.join(__dirname, 'templates/runtime.tpl'),
      'utf-8'
    );
    const exportsTpl = fs.readFileSync(
      path.join(__dirname, 'templates/exports.tpl'),
      'utf-8'
    );
    const builtinsTpl = fs.readFileSync(
      path.join(__dirname, 'templates/builtins.tpl'),
      'utf-8'
    );

    // 生成内置 Schema 聚合文件
    api.writeTmpFile({
      path: 'builtinSchemas.ts',
      content: Mustache.render(builtinsTpl, {
        imports: imports.map((item) =>
          `import { schemas as ${item.varName} } from '${item.importPath}';`
        ).join('\n'),
        aggregation: imports.map((item) =>
          `...${item.varName}`
        ).join(',\n  '),
      }),
    });

    // 生成运行时文件
    api.writeTmpFile({
      path: 'runtime.tsx',
      content: runtimeTpl,
    });

    // 生成导出文件
    api.writeTmpFile({
      path: 'index.ts',
      content: exportsTpl,
    });

    // 生成 Context 文件
    api.writeTmpFile({
      path: 'context.ts',
      content: `
import React from 'react';
import type { DynamicSchemaContextValue } from './types';

export const DynamicSchemaContext = React.createContext<DynamicSchemaContextValue | null>(null);
      `,
    });

    // 生成类型文件
    api.writeTmpFile({
      path: 'types.ts',
      content: `
import type { ISchema } from '@formily/react';

export interface DynamicSchemaDefinition {
  scenarioKey: string;
  label: string;
  description?: string;
  form: Record<string, any>;
  schema: ISchema;
}

export interface PublishedSchemaDto {
  scenarioKey: string;
  schemaJson: string;
  version: number;
  publishedAt: string | null;
  hostEntityId: string | null;
  entityType: string | null;
}

export interface DynamicSchemaContextValue {
  backendSchemas: Record<string, PublishedSchemaDto>;
  builtinSchemas: Record<string, DynamicSchemaDefinition>;
  isInitialized: boolean;
  lastFetchedAt: Date | null;
  refresh: () => Promise<void>;
}

export interface ScenarioInfo {
  scenarioKey: string;
  label: string;
  description?: string;
  source: 'builtin' | 'backend';
  hasBackendOverride?: boolean;
}
      `,
    });
  });

  // 添加运行时插件
  api.addRuntimePlugin(() => {
    return [require.resolve('./templates/runtime')];
  });
};
```

### 3.3 文件扫描规则

```typescript
// plugins/dynamicSchema/getSchemas.ts

import { glob, lodash, winPath } from '@umijs/utils';
import { join } from 'path';

export function getSchemas(opts: {
  base: string;
  cwd: string;
  pattern?: string;
}) {
  return lodash
    .uniq(
      glob
        .sync(opts.pattern || '**/*.{ts,tsx}', {
          cwd: opts.base,
        })
        .map((f) => join(opts.base, f))
        .map(winPath)
    )
    .filter((f) => {
      // 排除类型定义文件
      if (/\.d\.ts$/.test(f)) return false;
      // 排除测试文件
      if (/\.(test|e2e|spec)\.(j|t)sx?$/.test(f)) return false;
      // 排除 index 文件（用于聚合导出）
      if (/index\.(j|t)sx?$/.test(f)) return false;
      return true;
    });
}
```

### 3.4 代码生成模板

#### runtime.tpl

```tsx
// plugins/dynamicSchema/templates/runtime.tpl

import React, { useMemo, useCallback, useState, useEffect } from 'react';
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
    }
  }, [initialState]);

  // 刷新后端 Schema
  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/dynamic-schema/form-schemas/all-published');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBackendSchemas(data.schemas || {});
      setLastFetchedAt(new Date(data.fetchedAt));
    } catch (error) {
      console.error('[DynamicSchema] 刷新失败:', error);
      throw error;
    }
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
```

#### builtins.tpl

```typescript
// plugins/dynamicSchema/templates/builtins.tpl

import type { DynamicSchemaDefinition } from './types';

{{{ imports }}}

const allSchemas: DynamicSchemaDefinition[] = [
  {{{ aggregation }}}
];

// 转换为以 scenarioKey 为 key 的 Map
export const BUILTIN_SCHEMAS: Record<string, DynamicSchemaDefinition> = {};

allSchemas.forEach((schema) => {
  if (BUILTIN_SCHEMAS[schema.scenarioKey]) {
    console.warn(
      `[DynamicSchema] 重复的 scenarioKey: ${schema.scenarioKey}，后者将覆盖前者`
    );
  }
  BUILTIN_SCHEMAS[schema.scenarioKey] = schema;
});
```

#### exports.tpl

```typescript
// plugins/dynamicSchema/templates/exports.tpl

import React, { useContext, useMemo } from 'react';
import type { ISchema } from '@formily/react';
import { DynamicSchemaContext } from './context';
import type {
  DynamicSchemaContextValue,
  DynamicSchemaDefinition,
  ScenarioInfo
} from './types';

export * from './types';
export { DynamicSchemaContext } from './context';

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
        return {
          schema: parsed.schema || parsed,
          formConfig: parsed.form || {},
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
      return {
        schema: builtinSchema.schema,
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
```

---

## 4. 类型定义

### 4.1 核心类型

```typescript
// src/dynamicSchemas/types.ts

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
```

---

## 5. API 服务层

### 5.1 接口定义

```typescript
// src/services/dynamicSchema/formSchema.ts

import { request } from '@umijs/max';
import type { AllPublishedSchemasDto, PublishedSchemaDto } from './typings';

const API_BASE = '/api/dynamic-schema/form-schemas';

/**
 * 获取所有已发布的 Schema
 */
export async function getAllPublishedSchemas(): Promise<AllPublishedSchemasDto> {
  return request(`${API_BASE}/all-published`, {
    method: 'GET',
  });
}

/**
 * 按 ScenarioKey 获取单个已发布的 Schema
 * @param scenarioKey 场景标识
 * @returns Schema 详情，不存在返回 null
 */
export async function getSchemaByScenarioKey(
  scenarioKey: string
): Promise<PublishedSchemaDto | null> {
  try {
    return await request(`${API_BASE}/by-scenario-key`, {
      method: 'GET',
      params: { scenarioKey },
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
```

### 5.2 类型定义

```typescript
// src/services/dynamicSchema/typings.d.ts

export interface PublishedSchemaDto {
  scenarioKey: string;
  schemaJson: string;
  version: number;
  publishedAt: string | null;
  hostEntityId: string | null;
  entityType: string | null;
}

export interface AllPublishedSchemasDto {
  schemas: Record<string, PublishedSchemaDto>;
  fetchedAt: string;
}
```

---

## 6. 初始化配置

### 6.1 在 app.ts 中配置初始化

```typescript
// src/app.ts

import { getAllPublishedSchemas } from '@/services/dynamicSchema/formSchema';

export async function getInitialState() {
  // ... 现有逻辑 ...

  // 获取动态 Schema
  let dynamicSchemas = { schemas: {}, fetchedAt: new Date().toISOString() };
  try {
    dynamicSchemas = await getAllPublishedSchemas();
    console.log(`[DynamicSchema] 已加载 ${Object.keys(dynamicSchemas.schemas).length} 个后端 Schema`);
  } catch (error) {
    console.warn('[DynamicSchema] 加载后端 Schema 失败，将仅使用内置 Schema:', error);
  }

  return {
    // ... 现有数据 ...
    dynamicSchemas,
  };
}
```

---

## 7. 核心 Hooks

### 7.1 useDynamicSchema

```typescript
/**
 * 获取动态 Schema
 *
 * @param scenarioKey 场景标识
 * @returns Schema 及相关信息
 *
 * @example
 * ```tsx
 * function OrderForm() {
 *   const { schema, formConfig, source, loading, error } = useDynamicSchema('order:create');
 *
 *   if (loading) return <Spin />;
 *   if (error) return <Alert message={error.message} type="error" />;
 *
 *   return (
 *     <Form {...formConfig}>
 *       <SchemaField schema={schema} />
 *     </Form>
 *   );
 * }
 * ```
 */
export function useDynamicSchema(scenarioKey: string): {
  schema: ISchema;
  formConfig: Record<string, any>;
  source: 'backend' | 'builtin';
  version: number | null;
  loading: boolean;
  error: Error | null;
}
```

### 7.2 useDynamicSchemaRegistry

```typescript
/**
 * 获取 Schema 注册表操作
 *
 * @example
 * ```tsx
 * function SchemaManager() {
 *   const { refresh, isInitialized, lastFetchedAt } = useDynamicSchemaRegistry();
 *
 *   return (
 *     <div>
 *       <p>状态: {isInitialized ? '已初始化' : '初始化中'}</p>
 *       <p>最后更新: {lastFetchedAt?.toLocaleString()}</p>
 *       <Button onClick={refresh}>刷新</Button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useDynamicSchemaRegistry(): {
  refresh: () => Promise<void>;
  isInitialized: boolean;
  lastFetchedAt: Date | null;
}
```

### 7.3 useAvailableDynamicScenarios

```typescript
/**
 * 获取所有可用的场景列表
 *
 * @example
 * ```tsx
 * function ScenarioList() {
 *   const scenarios = useAvailableDynamicScenarios();
 *
 *   return (
 *     <List>
 *       {scenarios.map(s => (
 *         <List.Item key={s.scenarioKey}>
 *           {s.label} ({s.source})
 *           {s.hasBackendOverride && <Tag color="orange">已覆盖</Tag>}
 *         </List.Item>
 *       ))}
 *     </List>
 *   );
 * }
 * ```
 */
export function useAvailableDynamicScenarios(): ScenarioInfo[]
```

---

## 8. 组件封装

### 8.1 DynamicForm 组件

```tsx
// src/components/DynamicForm/index.tsx

import React, { useMemo, useEffect } from 'react';
import { createForm, Form as FormType } from '@formily/core';
import { Form, Submit } from '@formily/antd-v5';
import { Spin, Alert, Result } from 'antd';
import { useDynamicSchema } from 'umi';
import { useSchemaField } from '@@/plugin-formSchema';

export interface DynamicFormProps {
  /** 场景标识 */
  scenarioKey: string;
  /** 初始值 */
  initialValues?: Record<string, any>;
  /** 提交回调 */
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  /** 是否只读 */
  readOnly?: boolean;
  /** 自定义 form 实例 */
  form?: FormType;
  /** 额外的表单组件 */
  formWidgetComponents?: Record<string, React.ComponentType<any>>;
  /** 子元素（用于自定义按钮等） */
  children?: React.ReactNode;
  /** Loading 状态的占位内容 */
  loadingContent?: React.ReactNode;
  /** 错误状态的占位内容 */
  errorContent?: React.ReactNode;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  scenarioKey,
  initialValues,
  onSubmit,
  readOnly = false,
  form: externalForm,
  formWidgetComponents,
  children,
  loadingContent,
  errorContent,
}) => {
  // 获取动态 Schema
  const { schema, formConfig, source, loading, error } = useDynamicSchema(scenarioKey);

  // 创建 SchemaField
  const SchemaField = useSchemaField(formWidgetComponents);

  // 创建或使用外部 form 实例
  const form = useMemo(() => {
    return externalForm || createForm({
      readPretty: readOnly,
      initialValues,
    });
  }, [externalForm, readOnly]);

  // 当 initialValues 变化时更新表单
  useEffect(() => {
    if (initialValues && !externalForm) {
      form.setInitialValues(initialValues);
    }
  }, [initialValues, form, externalForm]);

  // 处理提交
  const handleSubmit = async (values: Record<string, any>) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  // Loading 状态
  if (loading) {
    return loadingContent || (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin tip="加载表单中..." />
      </div>
    );
  }

  // 错误状态
  if (error) {
    return errorContent || (
      <Result
        status="error"
        title="表单加载失败"
        subTitle={error.message}
      />
    );
  }

  return (
    <Form form={form} {...formConfig} onAutoSubmit={handleSubmit}>
      <SchemaField schema={schema} />
      {children || (
        <Submit block size="large">
          提交
        </Submit>
      )}
    </Form>
  );
};

export default DynamicForm;
```

### 8.2 ScenarioSelector 组件

```tsx
// src/components/ScenarioSelector/index.tsx

import React, { useState, useMemo } from 'react';
import { Select, Input, Space, Tag } from 'antd';
import { useAvailableDynamicScenarios, useDynamicSchemaHasOverride } from 'umi';
import type { ScenarioInfo } from '@/dynamicSchemas/types';

export interface ScenarioSelectorProps {
  value?: string;
  onChange?: (scenarioKey: string) => void;
  /** 是否允许自定义输入 */
  allowCustom?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 过滤函数 */
  filter?: (scenario: ScenarioInfo) => boolean;
  /** 样式 */
  style?: React.CSSProperties;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  value,
  onChange,
  allowCustom = true,
  placeholder = '请选择或输入场景',
  filter,
  style,
}) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // 获取所有可用场景
  const allScenarios = useAvailableDynamicScenarios();

  // 应用过滤
  const scenarios = useMemo(() => {
    return filter ? allScenarios.filter(filter) : allScenarios;
  }, [allScenarios, filter]);

  // 处理选择变化
  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === '__custom__') {
      setIsCustomMode(true);
      setCustomInput('');
    } else {
      setIsCustomMode(false);
      onChange?.(selectedValue);
    }
  };

  // 处理自定义输入
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCustomInput(newValue);
    onChange?.(newValue);
  };

  // 渲染选项标签
  const renderOptionLabel = (scenario: ScenarioInfo) => (
    <Space>
      <span>{scenario.label}</span>
      <Tag color={scenario.source === 'builtin' ? 'blue' : 'green'}>
        {scenario.source === 'builtin' ? '内置' : '自定义'}
      </Tag>
      {scenario.hasBackendOverride && (
        <Tag color="orange">已覆盖</Tag>
      )}
    </Space>
  );

  return (
    <Space direction="vertical" style={{ width: '100%', ...style }}>
      <Select
        value={isCustomMode ? '__custom__' : value}
        onChange={handleSelectChange}
        placeholder={placeholder}
        style={{ width: '100%' }}
        showSearch
        optionFilterProp="label"
      >
        {scenarios.map((scenario) => (
          <Select.Option
            key={scenario.scenarioKey}
            value={scenario.scenarioKey}
            label={scenario.label}
          >
            {renderOptionLabel(scenario)}
          </Select.Option>
        ))}

        {allowCustom && (
          <Select.Option value="__custom__" label="自定义">
            <span style={{ color: '#1890ff' }}>+ 自定义输入...</span>
          </Select.Option>
        )}
      </Select>

      {isCustomMode && (
        <Input
          value={customInput}
          onChange={handleCustomInputChange}
          placeholder="输入场景标识，如: approval:expense"
          addonBefore="ScenarioKey"
        />
      )}
    </Space>
  );
};

export default ScenarioSelector;
```

### 8.3 SchemaErrorBoundary 组件

```tsx
// src/components/SchemaErrorBoundary/index.tsx

import React, { Component, ErrorInfo } from 'react';
import { Result, Button } from 'antd';

interface Props {
  scenarioKey?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SchemaErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DynamicSchema] 渲染错误:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Result
          status="error"
          title="表单渲染失败"
          subTitle={
            this.props.scenarioKey
              ? `场景 "${this.props.scenarioKey}" 的表单渲染出错`
              : '表单渲染过程中发生错误'
          }
          extra={[
            <Button key="retry" type="primary" onClick={this.handleRetry}>
              重试
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default SchemaErrorBoundary;
```

---

## 9. 内置 Schema 规范

### 9.1 文件约定

内置 Schema 文件需要导出 `schemas` 数组：

```typescript
// src/dynamicSchemas/builtin/user.ts

import type { DynamicSchemaDefinition } from '../types';

export const schemas: DynamicSchemaDefinition[] = [
  {
    scenarioKey: 'user:create',
    label: '用户创建表单',
    description: '创建新用户时使用的表单',
    form: {
      labelCol: 6,
      wrapperCol: 18,
      labelWidth: '120px',
      feedbackLayout: 'none',
    },
    schema: {
      type: 'object',
      properties: {
        grid: {
          type: 'void',
          'x-component': 'FormGrid',
          'x-component-props': {
            maxColumns: 2,
            strictAutoFit: true,
          },
          properties: {
            userName: {
              type: 'string',
              title: '用户名',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入用户名',
              },
            },
            email: {
              type: 'string',
              title: '邮箱',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-validator': 'email',
            },
            phoneNumber: {
              type: 'string',
              title: '手机号',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
  {
    scenarioKey: 'user:edit',
    label: '用户编辑表单',
    form: { labelCol: 6, wrapperCol: 18 },
    schema: {
      type: 'object',
      properties: {
        // ... Schema 内容
      },
    },
  },
];
```

### 9.2 模块级内置 Schema

各业务模块也可以定义自己的内置 Schema：

```typescript
// src/pages/appOrder/_dynamicSchemas/order.ts

import type { DynamicSchemaDefinition } from '@/dynamicSchemas/types';

export const schemas: DynamicSchemaDefinition[] = [
  {
    scenarioKey: 'order:create',
    label: '订单创建表单',
    form: { labelCol: 6, wrapperCol: 18 },
    schema: {
      type: 'object',
      properties: {
        // ... 订单表单 Schema
      },
    },
  },
];
```

### 9.3 ScenarioKey 命名规范

**格式**: `{domain}:{action}` 或 `{domain}:{sub-domain}:{action}`

**规则**:
- 使用小写字母
- 使用冒号 `:` 分隔层级
- 使用连字符 `-` 连接多个单词

**示例**:

| ScenarioKey | 说明 |
|-------------|------|
| `user:create` | 用户创建表单 |
| `user:edit` | 用户编辑表单 |
| `order:create` | 订单创建表单 |
| `order:detail` | 订单详情 |
| `approval:leave` | 请假审批 |
| `approval:expense` | 报销审批 |
| `report:sales-monthly` | 月度销售报表 |

---

## 10. 使用指南

### 10.1 快速开始

#### 步骤 1：定义内置 Schema

```typescript
// src/dynamicSchemas/builtin/order.ts

import type { DynamicSchemaDefinition } from '../types';

export const schemas: DynamicSchemaDefinition[] = [
  {
    scenarioKey: 'order:create',
    label: '订单创建表单',
    form: { labelCol: 6, wrapperCol: 18 },
    schema: {
      type: 'object',
      properties: {
        orderNo: {
          type: 'string',
          title: '订单号',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': { disabled: true },
        },
        customerId: {
          type: 'string',
          title: '客户',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
        amount: {
          type: 'number',
          title: '金额',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
        },
      },
    },
  },
];
```

#### 步骤 2：在页面中使用

```tsx
// src/pages/appOrder/create/index.tsx

import React from 'react';
import { DynamicForm } from '@/components/DynamicForm';
import { message } from 'antd';

export default function OrderCreatePage() {
  const handleSubmit = async (values: Record<string, any>) => {
    // 调用 API 创建订单
    await createOrder(values);
    message.success('订单创建成功');
  };

  return (
    <DynamicForm
      scenarioKey="order:create"
      onSubmit={handleSubmit}
    />
  );
}
```

### 10.2 常见场景

#### 场景 1：使用自定义表单组件

```tsx
import { DynamicForm } from '@/components/DynamicForm';
import { CustomerSelect, ProductSelect } from '@/components/BizSelects';

<DynamicForm
  scenarioKey="order:create"
  formWidgetComponents={{
    CustomerSelect,
    ProductSelect,
  }}
/>
```

#### 场景 2：控制表单状态

```tsx
import { createForm } from '@formily/core';
import { DynamicForm } from '@/components/DynamicForm';

const form = createForm();

// 外部控制
form.setValues({ orderNo: 'ORD-001' });
form.setFieldState('amount', { disabled: true });

<DynamicForm
  scenarioKey="order:create"
  form={form}
/>
```

#### 场景 3：编辑模式

```tsx
import { DynamicForm } from '@/components/DynamicForm';
import { useParams } from 'umi';
import { useRequest } from 'ahooks';

export default function OrderEditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, loading } = useRequest(() => getOrder(id));

  if (loading) return <Spin />;

  return (
    <DynamicForm
      scenarioKey="order:edit"
      initialValues={order}
      onSubmit={handleUpdate}
    />
  );
}
```

#### 场景 4：只读模式

```tsx
<DynamicForm
  scenarioKey="order:detail"
  initialValues={orderData}
  readOnly
/>
```

### 10.3 最佳实践

1. **ScenarioKey 命名**：遵循 `{domain}:{action}` 格式，保持一致性
2. **Schema 复用**：通用字段提取为可复用的 Schema 片段
3. **错误边界**：使用 `SchemaErrorBoundary` 包裹表单，优雅处理错误
4. **性能优化**：大型表单考虑使用 `useMemo` 缓存 schema
5. **调试**：开发环境使用 `source` 字段确认 Schema 来源

---

## 11. 附录

### 11.1 错误处理策略

| 场景 | 处理方式 |
|------|----------|
| API 请求失败 | 仅使用内置 Schema，console.warn |
| Schema 解析失败 | 回退内置，console.error |
| 内置也不存在 | 返回 error 对象，由组件处理 |
| 刷新失败 | 保持旧缓存，抛出异常 |

### 11.2 API 接口汇总

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/dynamic-schema/form-schemas/all-published` | 批量获取所有已发布 Schema |
| GET | `/api/dynamic-schema/form-schemas/by-scenario-key?scenarioKey={key}` | 按 ScenarioKey 获取单个 Schema |

### 11.3 与现有 formSchema 机制对比

| 特性 | 现有 formSchema | 新 dynamicSchema |
|------|----------------|------------------|
| 标识符 | `formId` | `scenarioKey` |
| Hook | `useFormSchema(formId, schema)` | `useDynamicSchema(scenarioKey)` |
| 文件约定 | `**/components/schema.ts` 导出 `formId` + `formSchema` | `**/builtin/*.ts` 或 `**/_dynamicSchemas/*.ts` 导出 `schemas` 数组 |
| 优先级 | 后端 > 内置 | 后端 > 内置 |
| API | `initialState.formSchemas` | `/api/dynamic-schema/form-schemas/all-published` |

---

## 12. 更新日志

### v1.0 (2024-XX-XX)

- 初始版本
- 支持内置 Schema 定义
- 支持后端 Schema 覆盖
- 提供 DynamicForm、ScenarioSelector、SchemaErrorBoundary 组件
- 提供 useDynamicSchema、useDynamicSchemaRegistry、useAvailableDynamicScenarios Hooks
