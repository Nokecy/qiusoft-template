# 代码复用度优化指南

本指南详细介绍了项目中代码复用度优化的完整方案，包括新组件的使用方法、迁移步骤和最佳实践。

## 📋 目录

1. [项目概述](#项目概述)
2. [新组件介绍](#新组件介绍)
3. [使用指南](#使用指南)
4. [迁移策略](#迁移策略)
5. [最佳实践](#最佳实践)
6. [性能优化](#性能优化)
7. [常见问题](#常见问题)
8. [团队协作](#团队协作)

## 项目概述

### 优化目标

通过引入通用组件和标准化模式，实现：

- **减少重复代码**: 预计减少35,000行重复代码
- **提升开发效率**: 新页面开发时间减少80%
- **统一用户体验**: 标准化的UI和交互模式
- **降低维护成本**: 集中式的功能管理和bug修复

### 核心组件

1. **GeneratedListPage**: 通用列表页面生成器
2. **StandardFormDialog**: 标准化表单对话框
3. **ConfigurableToolbar**: 配置化工具栏

### 预期收益

| 指标 | 原有方式 | 优化后 | 提升幅度 |
|------|----------|--------|----------|
| 新页面开发时间 | 2-3天 | 0.5-1天 | 70-80% |
| 代码行数 | ~150行/页面 | ~80行/页面 | 47% |
| Bug修复影响范围 | 单页面 | 全项目 | 10x |
| 新功能推广速度 | 逐页面 | 自动应用 | 立即生效 |

## 新组件介绍

### GeneratedListPage

**核心功能**:
- 基于配置自动生成标准化列表页面
- 统一的API调用和错误处理
- 内置权限控制和工具栏管理
- 支持树形数据和普通列表数据

**适用场景**:
- 标准的CRUD列表页面
- 带有导入导出功能的管理页面
- 树形数据展示页面
- 需要权限控制的业务页面

### StandardFormDialog

**核心功能**:
- 标准化的表单对话框生成
- 自动的数据加载和提交逻辑
- 统一的错误处理和用户反馈
- 灵活的Schema配置支持

**适用场景**:
- 新建/编辑表单对话框
- 基于Formily的表单页面
- 需要复杂业务逻辑的表单
- 标准化的数据录入界面

## 使用指南

### 快速开始

#### 1. 创建简单列表页面

```tsx
import React from 'react';
import { GeneratedListPage } from '@/components/GeneratedListPage';
import { withStandardForm, FieldCreators } from '@/components/StandardFormDialog';

// 创建表单对话框
const MyFormDialog = withStandardForm({
  formId: 'My.Entity',
  businessFields: {
    code: FieldCreators.input('编码', true),
    name: FieldCreators.input('名称', true),
    description: FieldCreators.textarea('描述')
  },
  apiConfig: {
    get: MyGetAsync,
    create: MyCreateAsync,
    update: MyUpdateAsync
  }
});

// 创建列表页面
const MyPage = () => (
  <GeneratedListPage
    title="我的页面"
    gridKey="my-page"
    apiConfig={{
      list: MyGetListAsync,
      delete: MyDeleteAsync
    }}
    permissions={{
      create: My.Create,
      update: My.Update,
      delete: My.Delete
    }}
    columnDefs={[
      { headerName: '编码', field: 'code', width: 120 },
      { headerName: '名称', field: 'name', width: 150 }
    ]}
    formDialog={{
      component: MyFormDialog,
      createTitle: '新建',
      editTitle: '编辑'
    }}
  />
);
```

#### 2. 迁移现有页面

```tsx
// 原有页面 (150行代码)
const OldPage = () => {
  const gridRef = useRef<GridRef>();
  const access = useAccess();
  // ... 大量重复代码
  return <AgGridPlus {...complexProps} />;
};

// 迁移后 (80行代码)
const NewPage = () => (
  <GeneratedListPage {...config} />
);
```

### 进阶使用

#### 树形数据页面

```tsx
<GeneratedListPage
  // ... 基础配置
  treeConfig={{
    enabled: true,
    treeApi: GetTreeDataAsync,
    childrenFieldName: 'items',
    autoGroupColumnDef: {
      headerName: '分类编码',
      field: 'code',
      minWidth: 200,
      cellRenderer: "agGroupCellRenderer"
    },
    groupDefaultExpanded: -1
  }}
/>
```

#### 自定义工具栏

```tsx
const customActions = [
  {
    type: 'create' as const,
    permission: Permissions.Create,
    label: '新建'
  },
  {
    type: 'custom' as const,
    label: '特殊操作',
    onClick: handleSpecialAction
  }
];

<GeneratedListPage
  // ... 基础配置
  toolbarActions={customActions}
/>
```

#### 复杂表单Schema

```tsx
const complexFields = {
  basicInfo: {
    type: 'void',
    title: '基础信息',
    'x-component': 'FormGrid',
    properties: {
      code: FieldCreators.input('编码', true),
      name: FieldCreators.input('名称', true)
    }
  },
  detailInfo: {
    type: 'void', 
    title: '详细信息',
    'x-component': 'FormGrid',
    properties: {
      description: FieldCreators.textarea('描述', 4, 2)
    }
  }
};
```

## 迁移策略

### 阶段化迁移方案

#### 第一阶段：试点迁移（1-2周）

**选择标准**:
- 选择3-5个典型页面作为试点
- 包含普通列表、树形数据、复杂表单等类型
- 优先选择使用频率高的页面

**试点页面建议**:
1. `appCommon/warehouse/warehouses` - 基础列表页面
2. `appQms/basicInfo/defectCategory` - 树形数据页面  
3. `appQms/basicInfo/checker` - 复杂表单页面

**迁移步骤**:
1. 创建 `IndexNew.tsx` 文件，保留原文件
2. 使用新组件重写页面逻辑
3. 对比测试功能一致性
4. 收集团队反馈和建议

#### 第二阶段：模块迁移（2-4周）

**按模块优先级**:
1. `appCommon` - 通用模块，影响面大
2. `appQms` - 业务模块，使用频繁
3. 其他业务模块按使用频率排序

**迁移原则**:
- 每个模块完成迁移后进行回归测试
- 保持API和业务逻辑不变
- 收集性能数据和用户反馈

#### 第三阶段：全面推广（1-2周）

**推广策略**:
- 新页面强制使用新组件
- 现有页面逐步替换旧实现
- 提供培训和技术支持

### 迁移检查清单

#### 迁移前检查
- [ ] 确认页面的API接口和数据结构
- [ ] 识别特殊的业务逻辑和交互需求
- [ ] 检查权限配置和错误处理方式
- [ ] 备份原有实现文件

#### 迁移过程检查
- [ ] 配置GeneratedListPage的所有必要参数
- [ ] 使用withStandardForm创建FormDialog
- [ ] 测试CRUD操作的完整流程
- [ ] 验证导入导出功能正常
- [ ] 检查权限控制是否生效

#### 迁移后验证
- [ ] 功能对比测试通过
- [ ] 性能测试满足要求
- [ ] UI/UX体验一致
- [ ] 错误处理正确
- [ ] 代码质量符合标准

## 最佳实践

### 组件使用最佳实践

#### GeneratedListPage

**✅ 推荐做法**:
```tsx
// 1. 清晰的配置结构
const pageConfig = {
  title: '页面标题',
  gridKey: 'unique-key',
  apiConfig: { /* API配置 */ },
  permissions: { /* 权限配置 */ },
  columnDefs: [ /* 列定义 */ ]
};

<GeneratedListPage {...pageConfig} />

// 2. 使用常量定义权限
import { MyEntity } from '@/pages/myModule/_permissions';
permissions: {
  create: MyEntity.Create,
  update: MyEntity.Update,
  // ...
}

// 3. 列定义遵循项目规范
columnDefs: [
  { headerName: '编码', field: 'code', width: 120 },
  { headerName: '名称', field: 'name', width: 150 },
  { headerName: '数量', field: 'quantity', width: 100, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', initialSort: 'desc' }
]
```

**❌ 避免做法**:
```tsx
// 1. 直接在JSX中定义复杂配置
<GeneratedListPage
  columnDefs={[
    { /* 大量列定义直接写在这里 */ }
  ]}
  apiConfig={{
    list: async (params) => {
      // 复杂逻辑直接写在这里
    }
  }}
/>

// 2. 硬编码权限字符串
permissions: {
  create: "MyModule.MyEntity.Create", // 应该使用常量
}
```

#### StandardFormDialog

**✅ 推荐做法**:
```tsx
// 1. 使用HOC包装器
const MyFormDialog = withStandardForm({
  formId: 'MyModule.MyEntity',
  businessFields: {
    code: FieldCreators.input('编码', true),
    name: FieldCreators.input('名称', true)
  },
  apiConfig: {
    get: MyGetAsync,
    create: MyCreateAsync,
    update: MyUpdateAsync
  }
});

// 2. 复杂字段使用工具函数
const businessFields = {
  status: createSelectField('状态', [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ], { required: true })
};

// 3. 自定义提交逻辑（需要时）
defaultDialogConfig: {
  customSubmitHandler: async (values, isEdit) => {
    // 预处理数据
    const processedValues = processFormData(values);
    
    if (isEdit) {
      await MyUpdateAsync({ id: values.id }, processedValues);
    } else {
      await MyCreateAsync(processedValues);
    }
  }
}
```

### 代码组织最佳实践

#### 目录结构
```
src/pages/myModule/
├── myEntity/
│   ├── index.tsx          # 新版页面 
│   ├── IndexOld.tsx       # 旧版页面（迁移期间保留）
│   ├── components/
│   │   ├── FormDialog.tsx # 如果需要自定义FormDialog
│   │   └── CustomComponents.tsx
│   └── types.ts          # 类型定义
```

#### 配置提取
```tsx
// config.ts - 提取配置到独立文件
export const entityPageConfig = {
  title: '实体管理',
  gridKey: 'my-entity',
  permissions: {
    create: MyEntity.Create,
    update: MyEntity.Update,
    delete: MyEntity.Delete
  }
};

export const entityFormFields = {
  code: FieldCreators.input('编码', true),
  name: FieldCreators.input('名称', true)
};
```

### 性能优化最佳实践

#### 大数据量处理
```tsx
// 1. 启用分页
paginationConfig: {
  enabled: true,
  defaultPageSize: 50 // 根据数据量调整
}

// 2. 优化列定义
columnDefs: [
  { headerName: '编码', field: 'code', width: 120 },
  { headerName: '名称', field: 'name', width: 150 },
  // 避免使用flex: 1在大量数据时
  { headerName: '描述', field: 'description', width: 200 }
]

// 3. 树形数据优化
treeConfig: {
  enabled: true,
  groupDefaultExpanded: 2, // 限制默认展开层级
  // ...
}
```

#### 组件重用优化
```tsx
// 1. 缓存FormDialog组件
const MyFormDialog = useMemo(
  () => withStandardForm(formConfig),
  [/* 依赖项 */]
);

// 2. 使用回调优化
const handleRefresh = useCallback(() => {
  gridRef.current?.onRefresh();
}, []);
```

## 性能优化

### 组件性能

#### GeneratedListPage优化

**内存优化**:
- 大数据量时启用虚拟滚动
- 合理设置分页大小
- 避免在columnDefs中使用复杂的cellRenderer

**渲染优化**:
- 使用固定宽度列而非flex
- 减少不必要的列重新计算
- 合理使用hideInSearch隐藏搜索字段

#### StandardFormDialog优化

**表单性能**:
- 复杂表单使用分步骤或分组布局
- 避免在Schema中进行复杂计算
- 使用useCallback优化事件处理

**网络优化**:
- 合并相关API调用
- 使用适当的缓存策略
- 优化数据传输格式

### 打包优化

```tsx
// 1. 按需导入
import { GeneratedListPage } from '@/components/GeneratedListPage';
// 而不是: import * from '@/components/GeneratedListPage';

// 2. 代码分割
const MyFormDialog = lazy(() => import('./components/FormDialog'));

// 3. 类型定义优化
import type { GeneratedListPageConfig } from '@/components/GeneratedListPage';
```

## 常见问题

### Q1: 如何处理特殊的业务逻辑？

**A**: 通过自定义配置和钩子函数：

```tsx
// 自定义初始化
<StandardFormDialog
  customInitializer={async (form, entityId) => {
    const data = await getCustomData(entityId);
    form.setInitialValues(processData(data));
  }}
  customSubmitHandler={async (values, isEdit) => {
    // 自定义提交逻辑
    await handleCustomSubmit(values, isEdit);
  }}
/>

// 自定义操作列
<GeneratedListPage
  customOptionsComponent={CustomOptionsColumn}
/>
```

### Q2: 如何集成现有的业务组件？

**A**: 通过工具栏自定义配置：

```tsx
const customActions = [
  {
    type: 'custom' as const,
    permission: MyEntity.Special,
    component: MyCustomButton,
    componentProps: { /* 组件属性 */ }
  }
];
```

### Q3: 如何处理复杂的表单验证？

**A**: 在Schema中定义验证规则：

```tsx
const businessFields = {
  email: {
    type: 'string',
    title: '邮箱',
    'x-component': 'Input',
    'x-validator': [
      { required: true, message: '请输入邮箱' },
      { format: 'email', message: '邮箱格式不正确' }
    ]
  }
};
```

### Q4: 如何处理权限的动态变化？

**A**: 权限配置支持动态值：

```tsx
const MyPage = () => {
  const userPermissions = useUserPermissions();
  
  return (
    <GeneratedListPage
      permissions={{
        create: userPermissions.canCreate ? MyEntity.Create : undefined,
        // ...
      }}
    />
  );
};
```

## 团队协作

### 开发规范

#### 命名规范
```tsx
// 1. 组件命名
const CustomerFormDialog = withStandardForm(/* ... */);
const CustomerPage = () => <GeneratedListPage /* ... */ />;

// 2. 配置对象命名
const customerPageConfig = { /* ... */ };
const customerFormFields = { /* ... */ };

// 3. 文件命名
CustomerManagementPage.tsx
CustomerFormDialog.tsx
customerPageConfig.ts
```

#### 代码注释
```tsx
/**
 * 客户管理页面
 * 
 * 功能：
 * - 客户信息的增删改查
 * - 支持批量导入导出
 * - 客户联系人管理
 */
const CustomerPage = () => {
  return (
    <GeneratedListPage
      // 页面基础配置
      title="客户管理"
      gridKey="customer-management"
      
      // API配置：使用客户相关的API
      apiConfig={{
        list: CustomerGetListAsync,
        delete: CustomerDeleteAsync,
        export: CustomerExportAsync
      }}
      
      // ... 其他配置
    />
  );
};
```

### 团队培训

#### 培训计划
1. **第1周**: 新组件介绍和基础使用
2. **第2周**: 高级功能和最佳实践
3. **第3周**: 迁移实战和问题解决
4. **第4周**: 性能优化和团队规范

#### 知识分享
- 组件设计思路和架构原理
- 迁移过程中的经验教训
- 性能优化的具体措施
- 未来规划和扩展方向

### 持续改进

#### 反馈收集
- 定期收集团队使用反馈
- 监控页面性能数据
- 跟踪开发效率提升情况
- 记录常见问题和解决方案

#### 版本迭代
- 根据反馈持续优化组件
- 定期更新最佳实践文档
- 扩展新的功能特性
- 保持向后兼容性

---

## 📈 预期成果

通过实施本优化方案，预期将实现：

- **开发效率提升80%**: 新页面开发从2-3天缩短到0.5-1天
- **代码量减少50%**: 每个页面平均减少70-80行重复代码
- **维护成本降低90%**: 统一修改，全项目受益
- **用户体验统一**: 一致的交互模式和视觉效果
- **团队协作改善**: 标准化的开发模式，降低沟通成本

这套优化方案不仅能显著提高开发效率，更重要的是建立了可持续的代码复用机制，为项目的长期发展奠定了坚实的技术基础。