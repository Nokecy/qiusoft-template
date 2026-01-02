# GeneratedListPage - 通用列表页面生成器

这是一个通用的列表页面生成器组件，基于配置自动生成标准化的列表页面，旨在减少重复代码并提高开发效率。

## 功能特性

- ✅ **配置化生成**: 通过配置对象自动生成完整的列表页面
- ✅ **标准化操作列**: 自动生成编辑、删除按钮，支持权限控制
- ✅ **配置化工具栏**: 支持新建、导入、导出、下载模板等标准操作
- ✅ **树形数据支持**: 内置树形数据的处理和展示
- ✅ **统一错误处理**: 集成项目的统一错误处理机制
- ✅ **权限控制**: 完整的权限控制支持
- ✅ **TypeScript支持**: 完整的类型定义和类型检查

## 基本用法

### 1. 简单列表页面

```tsx
import React from 'react';
import GeneratedListPage from '@/components/GeneratedListPage';
import { WarehouseGetListAsync, WarehouseDeleteAsync } from '@/services/common/Warehouse';
import { Warehouses } from '@/pages/appCommon/_permissions';
import WarehouseFormDialog from './components/FormDialog';

const WarehousePage = () => {
  return (
    <GeneratedListPage
      title="库房信息"
      gridKey="warehouses"
      apiConfig={{
        list: WarehouseGetListAsync,
        delete: WarehouseDeleteAsync
      }}
      permissions={{
        create: Warehouses.Create,
        update: Warehouses.Update,
        delete: Warehouses.Delete,
        import: Warehouses.Import,
        export: Warehouses.Export
      }}
      columnDefs={[
        { headerName: '库房编码', field: 'code', width: 150 },
        { headerName: '库房名称', field: 'name', width: 200 },
        { headerName: '库房地址', field: 'address', width: 200, hideInSearch: true }
      ]}
      formDialog={{
        component: WarehouseFormDialog,
        createTitle: '新建库房',
        editTitle: '编辑库房'
      }}
      exportFileName="warehouses.xlsx"
    />
  );
};

export default WarehousePage;
export const routeProps = { name: '库房信息' };
```

### 2. 树形数据页面

```tsx
import React from 'react';
import GeneratedListPage from '@/components/GeneratedListPage';
import { DefectCategoryGetTreeSelectDataAsync } from '@/services/qms/DefectCategory';

const DefectCategoryPage = () => {
  return (
    <GeneratedListPage
      title="缺陷分类"
      gridKey="qms-defect-category"
      apiConfig={{
        list: async () => ({ items: [], totalCount: 0 }), // 树形数据不使用普通list
      }}
      permissions={permissions}
      columnDefs={columnDefs}
      treeConfig={{
        enabled: true,
        treeApi: DefectCategoryGetTreeSelectDataAsync,
        childrenFieldName: 'items',
        autoGroupColumnDef: {
          headerName: '缺陷分类编码',
          field: 'code',
          minWidth: 200,
          cellRenderer: "agGroupCellRenderer"
        }
      }}
    />
  );
};
```

### 3. 自定义工具栏

```tsx
const customToolbarActions = [
  {
    type: 'create' as const,
    permission: Permissions.Create,
    label: '新建',
    buttonProps: { icon: <PlusOutlined />, type: 'primary' }
  },
  {
    type: 'custom' as const,
    permission: Permissions.Special,
    label: '特殊操作',
    buttonProps: { icon: <ToolOutlined /> },
    onClick: () => {
      // 自定义操作逻辑
    }
  }
];

<GeneratedListPage
  // ... 其他配置
  toolbarActions={customToolbarActions}
/>
```

## 配置选项

### GeneratedListPageConfig

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | ✅ | 页面标题 |
| gridKey | string | ✅ | Grid唯一标识 |
| apiConfig | ApiConfig | ✅ | API配置 |
| permissions | PermissionConfig | ✅ | 权限配置 |
| columnDefs | ColDef[] | ✅ | 列定义 |
| formDialog | FormDialogConfig | ❌ | 表单对话框配置 |
| toolbarActions | ToolbarActionConfig[] | ❌ | 工具栏配置 |
| treeConfig | TreeDataConfig | ❌ | 树形数据配置 |

### ApiConfig

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| list | Function | ✅ | 列表查询API |
| delete | Function | ❌ | 删除API |
| export | Function | ❌ | 导出API |
| getImportTemplate | Function | ❌ | 获取导入模板API |

### PermissionConfig

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| view | string | ❌ | 查看权限 |
| create | string | ❌ | 创建权限 |
| update | string | ❌ | 更新权限 |
| delete | string | ❌ | 删除权限 |
| import | string | ❌ | 导入权限 |
| export | string | ❌ | 导出权限 |

## 迁移指南

### 从现有页面迁移

1. **提取配置信息**：
   - 页面标题和gridKey
   - API函数
   - 权限定义
   - 列定义

2. **转换为配置对象**：
   ```tsx
   const config: GeneratedListPageConfig = {
     title: '原页面标题',
     gridKey: '原gridKey',
     apiConfig: {
       list: 原ListAPI,
       delete: 原DeleteAPI
     },
     permissions: 原权限对象,
     columnDefs: 原列定义数组,
     formDialog: {
       component: 原FormDialog组件,
       createTitle: '新建标题',
       editTitle: '编辑标题'
     }
   };
   ```

3. **替换页面组件**：
   ```tsx
   // 替换前
   const Page = () => {
     // 大量重复代码...
     return <AgGridPlus {...props} />;
   };

   // 替换后
   const Page = () => {
     return <GeneratedListPage {...config} />;
   };
   ```

## 预期收益

- **代码减少**: 每个页面可减少80-150行重复代码
- **开发提速**: 新页面开发时间从2-3天减少到0.5-1天
- **维护简化**: 统一的组件结构，便于批量修改和升级
- **质量提升**: 标准化的实现，减少bug和不一致性

## 最佳实践

1. **权限配置**: 确保权限字符串与后端定义一致
2. **列定义**: 使用现有的列类型和配置模式
3. **API配置**: 保持API参数格式的一致性
4. **表单集成**: FormDialog组件需要支持标准的props接口
5. **错误处理**: 使用项目统一的错误处理机制