# CLAUDE.md

本文档为 Claude Code 提供项目开发指南，确保代码质量和开发规范的一致性。

## 交流语言

始终使用中文交流。

---

## 项目概述

财门（Caimen）是基于 React + UmiJS 4 的企业级前端应用，为 ERP、PDM、WMS 等复杂业务场景提供完整的前端解决方案。

### 技术栈

| 类别 | 技术选型 |
|------|----------|
| 前端框架 | React 18 + UmiJS 4 (Max) |
| UI 组件 | Ant Design 5 + Pro Components |
| 表单方案 | Formily (@formily/antd-v5) |
| 表格组件 | AgGrid (@nokecy/qc-ui) |
| 状态管理 | UmiJS Model + ahooks |
| 类型检查 | TypeScript 5 |
| 工作流 | Elsa Workflow 集成 |
| 实时通信 | DotNetify (SignalR) |

---

## 核心命令

```bash
# 开发服务器【强制使用】
yarn start

# 生产构建【仅部署时使用】
yarn build

# 代码检查
yarn lint
yarn lint --fix

# API 代码生成
yarn openapi
```

### 开发服务器规范【强制遵守】

- **必须使用**: 开发期间始终运行开发服务器，使用 `run_in_background: true`
- **禁止频繁构建**: 严禁在开发过程中反复运行 `yarn build`
- **热更新**: 代码修改后自动反映，编译错误直接在浏览器显示

---

## 项目结构

```
caimen-react/
├── config/                    # 配置文件
│   ├── config.ts              # 主配置
│   ├── routers.ts             # 路由配置
│   └── defaultSettings.ts     # 默认设置
│
├── plugins/                   # UmiJS 插件
│   ├── dynamicSchema/         # 动态表单 Schema 插件
│   ├── formSchema.ts          # 表单 Schema 插件
│   ├── form-widgets/          # 表单组件注册
│   ├── getInitState/          # 初始状态
│   └── ...
│
├── src/
│   ├── components/            # 通用组件
│   │   ├── agGrid/            # AgGridPlus 表格
│   │   ├── deleteConfirm/     # 删除确认
│   │   └── ...
│   │
│   ├── dynamicSchemas/        # 动态 Schema 定义
│   │   ├── types.ts           # 类型定义
│   │   ├── builtin/           # 内置 Schema
│   │   └── README.md          # 使用文档
│   │
│   ├── pages/                 # 页面组件
│   │   ├── appCenter/         # 应用中心
│   │   ├── appCommon/         # 公共模块（仓库、物料、部门）
│   │   ├── appPdm/            # PDM 产品数据管理
│   │   ├── appSmartErp/       # ERP 模块
│   │   ├── appWMS/            # WMS 仓储管理
│   │   ├── appWorkflow/       # 工作流管理
│   │   ├── appSYS/            # 系统管理
│   │   │   └── _components/DynamicSchema/  # 动态表单组件
│   │   └── appLogin/          # 登录模块
│   │
│   └── services/              # API 服务层
│       ├── common/            # 公共服务
│       ├── pdm/               # PDM 服务
│       ├── smarterp/          # ERP 服务
│       ├── wms/               # WMS 服务
│       ├── workflow/          # 工作流服务
│       └── dynamicSchema/     # 动态 Schema 服务
│
└── .claude/skills/            # Claude 开发技能
    ├── standard-page-builder/ # 标准页面开发
    └── workflow-page-builder/ # 工作流页面开发
```

### 模块内部结构

```
src/pages/appModule/
├── FeatureName/
│   ├── index.tsx              # 列表页
│   ├── form.tsx               # 表单页（可选）
│   ├── detail.tsx             # 详情页（可选）
│   ├── execute.tsx            # 工作流审批页（可选）
│   └── _dynamicSchemas/       # 页面级 Schema（可选）
├── _components/               # 模块内通用组件
├── _formWidgets/              # 模块内表单组件
├── _permissions/              # 权限定义
└── _utils/                    # 工具函数
```

---

## 开发规范

### 动态表单 Schema【强制遵守】

**所有新建表单必须使用 DynamicSchema 机制**，禁止在组件中硬编码 Schema。

#### 为什么必须使用

1. **前后端联动**: 后端可动态覆盖前端 Schema，无需重新部署
2. **统一管理**: Schema 集中管理，便于维护和复用
3. **版本控制**: 支持 Schema 版本管理和灰度发布

#### Schema 定义位置

| 位置 | 用途 |
|------|------|
| `src/dynamicSchemas/builtin/` | 全局通用 Schema |
| `src/pages/appModule/feature/_dynamicSchemas/` | 页面级 Schema |

#### 使用示例

```tsx
// ✅ 正确写法
import { useMemo } from 'react';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';

function MyForm() {
  const { schema, formConfig, loading, error } = useDynamicSchema('order:create');
  const SchemaField = useSchemaField();
  const form = useMemo(() => createForm(), []);

  if (loading) return <Spin />;
  if (error) return <Result status="error" />;

  return (
    <Form form={form} {...formConfig}>
      <SchemaField schema={schema} />
    </Form>
  );
}

// ❌ 错误写法：禁止硬编码 Schema
const schema = { type: 'object', properties: { ... } };
```

#### ScenarioKey 命名规范

使用 `模块:场景` 格式：`order:create`、`order:edit`、`user:profile`

#### 详细文档

参考: `src/dynamicSchemas/README.md`

---

### 列表页面规范

#### AgGridPlus 使用

```tsx
// ✅ 正确写法：直接返回组件
return (
  <AgGridPlus
    gridRef={gridRef}
    headerTitle="列表标题"
    gridKey="unique-grid-key"
    request={async (params) => {
      const data = await ApiGetListAsync({
        MaxResultCount: params.maxResultCount,
        SkipCount: params.skipCount,
        Filter: params.filter,
        Sorting: params.sorter,
      });
      return { success: true, data: data.items || [], total: data.totalCount || 0 };
    }}
    columnDefs={columnDefs}
  />
);

// ❌ 错误写法：不要包裹 div
return <div><AgGridPlus ... /></div>;
```

#### 列定义规范

```tsx
const columnDefs = [
  { field: 'code', headerName: '编码', width: 120 },
  { field: 'name', headerName: '名称', width: 150 },
  { field: 'quantity', headerName: '数量', width: 100, hideInSearch: true },
  { field: 'status', headerName: '状态', valueEnum: statusEnum },
  { field: 'creationTime', headerName: '创建时间', initialSort: 'desc' },
];
```

#### 工具栏按钮规范

```tsx
toolBarRender={() => [
  <Access key="create" accessible={!!access['Permission.Create']}>
    <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
      新建
    </Button>
  </Access>,
  <Access key="delete" accessible={!!access['Permission.Delete']}>
    <DeleteConfirm onConfirm={handleBatchDelete}>
      <Button danger icon={<DeleteOutlined />}>删除</Button>
    </DeleteConfirm>
  </Access>,
]}
```

---

### Formily 表单规范

#### 核心规则

- **SchemaField**: 必须使用 `useSchemaField()` Hook
- **Form 组件**: 使用 `Form`(来自 `@formily/antd-v5`)替代 `FormProvider`
- **useFormSchema**: ⚠️ **避免使用** - 会在其他页面触发动态 Schema 加载接口
- **数字输入**: 使用 `NumberPicker` 替代 `InputNumber`
- **FormGrid**: 设置 `strictAutoFit: true`
- **复合字段**: 使用 `{value:fieldId,label:fieldName}` 格式

#### 表单组件使用规范

```tsx
// ✅ 正确写法：使用 Form 组件 + 静态 Schema
import { Form } from '@formily/antd-v5';
import { formSchema } from './components/schema';

const SchemaField = useSchemaField({
  CustomComponent1,
  CustomComponent2,
});

return (
  <Form form={form} {...formSchema.form}>
    <SchemaField schema={formSchema.schema} />
  </Form>
);

// ❌ 错误写法 1：使用 FormProvider
import { FormProvider } from '@formily/react';

return (
  <FormProvider form={form}>
    <SchemaField schema={formSchema.schema} />
  </FormProvider>
);

// ❌ 错误写法 2：使用 useFormSchema（会触发不必要的接口请求）
const schema = useFormSchema(formId, formSchema);
```

#### Formily 复合字段自动拆分

Formily 在某些情况下会自动拆分复合字段,需要在提交时兼容处理:

```typescript
// Schema 定义
'{value:projectCode,label:projectName}': {
  type: 'string',
  'x-component': 'ProjectSelect',
  'x-component-props': { labelInValue: true },
}

// 提交数据处理 - 优先使用拆分后的直接字段
if (values.projectCode) {
  // Formily 已自动拆分,直接使用
  submitData.projectCode = values.projectCode;
  submitData.projectName = values.projectName;
} else if (values['{value:projectCode,label:projectName}']) {
  // 使用复合字段
  const field = values['{value:projectCode,label:projectName}'];
  submitData.projectCode = field.value;
  submitData.projectName = field.label;
}
```

#### 枚举定义规范

```typescript
// 枚举定义
export enum StatusEnum {
  Active = 5,
  Inactive = 10,
}

export const statusEnum = [
  { label: '激活', value: StatusEnum.Active, color: '#52c41a' },
  { label: '禁用', value: StatusEnum.Inactive, color: '#d9d9d9' },
];
```

#### 工作流字段控制

```typescript
// 字段只读控制
'x-reactions': {
  fulfill: {
    state: {
      pattern: "{{$workflowInfo.currentActivityName !== '目标活动' ? 'readPretty' : 'editable'}}"
    }
  }
}

// 容器显隐控制
'x-reactions': {
  fulfill: {
    state: {
      visible: "{{$workflowInfo.currentActivityName === '目标活动'}}"
    }
  }
}
```

---

### FormDialog 规范

```tsx
const dialog = FormDialog(
  { title: '表单标题', width: 600 },
  () => {
    const { schema, formConfig } = useDynamicSchema('module:dialog');
    const SchemaField = useSchemaField();

    return (
      <FormLayout {...formConfig}>
        <SchemaField schema={schema} />
      </FormLayout>
    );
  }
);

dialog
  .forOpen((payload, next) => {
    next({ initialValues: data });
  })
  .forConfirm(async (payload, next) => {
    const values = await payload.submit();
    await saveData(values);
    next(values);
  })
  .open();
```

---

### 路由配置

每个页面必须配置 `routeProps`：

```tsx
export const routeProps = {
  name: '页面显示名称',
};
```

---

## API 规范

### 调用规范

```tsx
// 必须包含错误处理
try {
  const result = await ApiCreateAsync(values);
  message.success('创建成功');
  onRefresh();
} catch (error) {
  // 错误由全局拦截器处理
}
```

### 字段映射

- 表单字段必须与后端 DTO 完全匹配
- 复合字段使用 `{value:fieldId,label:fieldName}` 格式
- 枚举值必须与后端定义一致

---

## 开发 Skills

项目提供 Claude 开发技能文档，帮助快速构建标准化功能。

### 标准页面开发

**文档**: `.claude/skills/standard-page-builder/SKILL.md`

**适用场景**:
- 标准列表页 (index.tsx)
- 树形列表页
- 左右布局页（树形 + 列表）
- FormDialog 表单对话框

**参考实现**:
- 标准列表: `src/pages/appPdm/PartManagement/PartApplicationRequest/`
- 树形列表: `src/pages/appPdm/PartManagement/PartCategory/`

### 工作流页面开发

**文档**: `.claude/skills/workflow-page-builder/SKILL.md`

**适用场景**:
- 创建/编辑表单页 (form.tsx)
- 详情展示页 (detail.tsx)
- 工作流审批页 (execute.tsx)
- 业务数据列表页 (index.tsx)

**核心组件**:
- `WorkflowInstanceInfo` - 流程实例信息
- `WorkflowExecutionForm` - 审批表单
- `WorkflowExecutionCorrelationList` - 执行历史

### 动态表单开发

**文档**: `src/dynamicSchemas/README.md`

**组件位置**: `src/pages/appSYS/_components/DynamicSchema/`

**核心组件**:
- `useDynamicSchema` - 获取动态 Schema（Hook）
- `DynamicForm` - 封装的动态表单组件
- `ScenarioSelector` - 场景选择器组件
- `SchemaErrorBoundary` - 表单错误边界组件

**导入方式**:
```tsx
import { DynamicForm, ScenarioSelector, SchemaErrorBoundary } from '@/pages/appSYS/_components/DynamicSchema';
```

---

## 开发检查清单

### 新建表单页面

- [ ] 使用 DynamicSchema 机制定义 Schema
- [ ] Schema 放置在正确位置（builtin 或 _dynamicSchemas）
- [ ] ScenarioKey 符合命名规范
- [ ] 使用 `useDynamicSchema` Hook 获取 Schema

### 新建列表页面

- [ ] 使用 AgGridPlus 组件
- [ ] 设置唯一 gridKey
- [ ] 直接返回组件，不包裹 div
- [ ] 工具栏按钮添加图标和权限控制

### 通用检查

- [ ] 配置 `routeProps` 导出
- [ ] API 调用包含错误处理
- [ ] 枚举值与后端一致
- [ ] 权限使用 `!!` 转换为布尔值

---

## 常见问题

| 问题 | 解决方案 |
|------|----------|
| API 生成失败 | 运行 `yarn openapi` 重新生成 |
| 页面缓存问题 | 检查 KeepAlive 配置 |
| Schema 加载失败 | 检查 scenarioKey 是否正确定义 |
| 表单字段不显示 | 检查 Schema 的 x-decorator 和 x-component |
| 工作流字段控制失效 | 使用 `$workflowInfo.currentActivityName` 直接访问 |
