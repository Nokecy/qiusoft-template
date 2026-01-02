# DynamicSchema 动态表单 Schema 系统

## 概述

DynamicSchema 是一个支持前后端联动的动态表单 Schema 管理系统。它允许：

1. **内置 Schema**：在前端代码中定义默认的表单 Schema
2. **后端覆盖**：后端可以发布 Schema 来覆盖内置定义
3. **运行时切换**：系统会自动选择合适的 Schema 来渲染表单

## 目录结构

```
src/dynamicSchemas/                           # Schema 定义
├── types.ts                                  # 类型定义
├── index.ts                                  # 聚合导出
├── README.md                                 # 说明文档
└── builtin/                                  # 内置 Schema 目录
    └── example.ts                            # 示例 Schema

src/pages/appSYS/_components/DynamicSchema/   # 组件
├── index.ts                                  # 统一导出
├── DynamicForm.tsx                           # 动态表单组件
├── ScenarioSelector.tsx                      # 场景选择器
└── SchemaErrorBoundary.tsx                   # 错误边界
```

## 快速开始

### 1. 定义内置 Schema

在 `src/dynamicSchemas/builtin/` 目录下创建 Schema 文件：

```typescript
// src/dynamicSchemas/builtin/mySchemas.ts
import type { DynamicSchemaDefinition } from '../types';

const myFormSchema: DynamicSchemaDefinition = {
  scenarioKey: 'module:form-name',  // 唯一标识
  label: '表单名称',
  description: '表单描述',
  form: {
    labelCol: 6,
    wrapperCol: 18,
  },
  schema: {
    type: 'object',
    properties: {
      fieldName: {
        type: 'string',
        title: '字段标题',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  },
};

// 必须导出 schemas 数组
export const schemas: DynamicSchemaDefinition[] = [myFormSchema];
```

### 2. 使用动态表单组件

```tsx
import { DynamicForm } from '@/pages/appSYS/_components/DynamicSchema';

function MyPage() {
  const handleSubmit = async (values) => {
    console.log('表单数据:', values);
  };

  return (
    <DynamicForm
      scenarioKey="module:form-name"
      onSubmit={handleSubmit}
    />
  );
}
```

### 3. 使用 Hook 获取 Schema

```tsx
import { useDynamicSchema } from '@@/plugin-dynamicSchema';

function MyComponent() {
  const { schema, formConfig, loading, error, source } = useDynamicSchema('module:form-name');

  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败</div>;

  // 自定义渲染逻辑
  return (
    <div>
      <p>Schema 来源: {source}</p>
      {/* 使用 schema 和 formConfig */}
    </div>
  );
}
```

### 4. 获取可用场景列表

```tsx
import { useAvailableDynamicScenarios } from '@@/plugin-dynamicSchema';

function ScenarioList() {
  const scenarios = useAvailableDynamicScenarios();

  return (
    <ul>
      {scenarios.map(item => (
        <li key={item.scenarioKey}>
          {item.label} ({item.source})
          {item.hasBackendOverride && ' [已被后端覆盖]'}
        </li>
      ))}
    </ul>
  );
}
```

## 页面级 Schema

除了在 `builtin/` 目录定义全局 Schema，也可以在页面目录下定义局部 Schema：

```
src/pages/appModule/myFeature/
├── index.tsx
└── _dynamicSchemas/
    └── localSchema.ts    # 页面级 Schema
```

页面级 Schema 的文件格式与全局 Schema 相同。

## ScenarioKey 命名规范

建议使用 `模块:场景` 的格式：

- `order:create` - 订单创建
- `order:edit` - 订单编辑
- `user:profile` - 用户资料
- `approval:expense` - 费用审批

## 不使用 DynamicForm 组件

如果需要更灵活的控制，可以直接使用 Hook 获取 Schema，然后自行渲染表单。

### 基础用法

```tsx
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

function MyCustomForm() {
  const { schema, formConfig, loading, error } = useDynamicSchema('module:form-name');
  const SchemaField = useSchemaField();

  const form = useMemo(() => createForm(), []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  const handleSubmit = async () => {
    const values = await form.submit();
    console.log('表单数据:', values);
  };

  return (
    <Form form={form} {...formConfig}>
      <SchemaField schema={schema} />
      <button onClick={handleSubmit}>提交</button>
    </Form>
  );
}
```

### 带初始值和自定义组件

```tsx
import { useMemo, useEffect } from 'react';
import { createForm } from '@formily/core';
import { Form, Submit, FormButtonGroup } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import { Spin, Result } from 'antd';

// 自定义表单组件
import MyCustomInput from './MyCustomInput';
import MyCustomSelect from './MyCustomSelect';

function MyAdvancedForm({ id, onSuccess }) {
  const { schema, formConfig, loading, error, source } = useDynamicSchema('order:edit');

  // 注册自定义组件
  const SchemaField = useSchemaField({
    MyCustomInput,
    MyCustomSelect,
  });

  // 创建表单实例
  const form = useMemo(() => createForm({
    validateFirst: true,
  }), []);

  // 加载初始数据
  useEffect(() => {
    if (id) {
      fetchOrderData(id).then(data => {
        form.setInitialValues(data);
      });
    }
  }, [id, form]);

  if (loading) {
    return <Spin tip="加载表单中..." />;
  }

  if (error) {
    return <Result status="error" title="表单加载失败" subTitle={error.message} />;
  }

  const handleSubmit = async (values) => {
    await saveOrder(values);
    onSuccess?.();
  };

  return (
    <div>
      <div style={{ marginBottom: 16, color: '#999' }}>
        Schema 来源: {source === 'backend' ? '后端配置' : '内置定义'}
      </div>

      <Form form={form} {...formConfig} onAutoSubmit={handleSubmit}>
        <SchemaField schema={schema} />

        <FormButtonGroup.FormItem>
          <Submit>保存</Submit>
          <button type="button" onClick={() => form.reset()}>重置</button>
        </FormButtonGroup.FormItem>
      </Form>
    </div>
  );
}
```

### 在 FormDialog 中使用

```tsx
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { Form, FormLayout } from '@formily/antd-v5';
import { FormDialog } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

function openDynamicFormDialog(scenarioKey: string, initialValues?: any) {
  const dialog = FormDialog(
    { title: '动态表单', width: 600 },
    () => {
      const { schema, formConfig, loading, error } = useDynamicSchema(scenarioKey);
      const SchemaField = useSchemaField();

      if (loading) return <div>加载中...</div>;
      if (error) return <div>加载失败</div>;

      return (
        <FormLayout {...formConfig}>
          <SchemaField schema={schema} />
        </FormLayout>
      );
    }
  );

  dialog
    .forOpen((payload, next) => {
      next({ initialValues });
    })
    .forConfirm(async (payload, next) => {
      const values = await payload.submit();
      // 处理提交
      await saveData(values);
      next(values);
    })
    .open();
}
```

### 只读模式

```tsx
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

function MyReadOnlyForm({ data }) {
  const { schema, formConfig, loading } = useDynamicSchema('order:detail');
  const SchemaField = useSchemaField();

  // 创建只读表单
  const form = useMemo(() => createForm({
    readPretty: true,  // 只读模式
    initialValues: data,
  }), [data]);

  if (loading) return <div>加载中...</div>;

  return (
    <Form form={form} {...formConfig}>
      <SchemaField schema={schema} />
    </Form>
  );
}
```

### 动态切换 Schema

```tsx
import { useState, useMemo, useEffect } from 'react';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import { ScenarioSelector } from '@/pages/appSYS/_components/DynamicSchema';

function DynamicSchemaDemo() {
  const [scenarioKey, setScenarioKey] = useState('example:user-info');
  const { schema, formConfig, loading, source } = useDynamicSchema(scenarioKey);
  const SchemaField = useSchemaField();

  // scenarioKey 变化时重新创建表单
  const form = useMemo(() => createForm(), [scenarioKey]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <ScenarioSelector
          value={scenarioKey}
          onChange={setScenarioKey}
          style={{ width: 300 }}
        />
      </div>

      {loading ? (
        <div>加载中...</div>
      ) : (
        <Form form={form} {...formConfig}>
          <SchemaField schema={schema} />
        </Form>
      )}
    </div>
  );
}
```

## 可用组件

组件位置: `src/pages/appSYS/_components/DynamicSchema/`

```tsx
// 统一导入
import {
  DynamicForm,
  ScenarioSelector,
  SchemaErrorBoundary
} from '@/pages/appSYS/_components/DynamicSchema';
```

### DynamicForm

动态表单组件，根据 scenarioKey 渲染表单。适用于简单场景，封装了 loading/error 处理。

```tsx
<DynamicForm
  scenarioKey="module:form"
  initialValues={{ field: 'value' }}
  onSubmit={handleSubmit}
  readOnly={false}
  formWidgetComponents={customComponents}
/>
```

### ScenarioSelector

场景选择器组件，用于选择或输入场景标识。

```tsx
<ScenarioSelector
  value={scenarioKey}
  onChange={setScenarioKey}
  allowCustom={true}
  filter={(s) => s.source === 'builtin'}
/>
```

### SchemaErrorBoundary

错误边界组件，捕获表单渲染错误。

```tsx
<SchemaErrorBoundary scenarioKey="module:form" onError={handleError}>
  <DynamicForm scenarioKey="module:form" />
</SchemaErrorBoundary>
```

## 后端 API

系统会在初始化时调用后端 API 获取已发布的 Schema：

- `GET /api/dynamic-schema/all-published` - 获取所有已发布 Schema
- `GET /api/dynamic-schema/{scenarioKey}` - 获取指定场景的 Schema

后端返回的 Schema 会完全覆盖同 scenarioKey 的内置 Schema。
