# PDM BOM 物料清单管理模块

## 📋 模块概述

BOM（Bill of Materials，物料清单）管理模块是PDM系统的核心功能之一，用于管理产品的物料组成结构、版本控制和层级关系。

## 🎯 核心功能

### 1. BOM 主数据管理
- **BOM 列表** - 支持搜索、筛选、分页
- **BOM 详情** - 三栏布局展示完整信息
- **新建 BOM** - 基于物料创建BOM清单
- **删除 BOM** - 支持权限控制的删除操作
- **复制 BOM** - 快速复制现有BOM（功能预留）

### 2. BOM 子项管理
- **树形结构展示** - 多层级物料关系可视化
- **新增子项** - 添加物料到BOM结构
- **编辑子项** - 修改子项数量、单位、序号等
- **删除子项** - 支持版本控制的删除
- **层级调整** - 支持父子关系变更

### 3. 版本管理
- **版本查询** - 按版本号查看BOM结构
- **版本切换** - 在详情页切换不同版本
- **版本复制** - 创建新版本副本（API已支持）
- **版本对比** - 对比两个版本差异（API已支持）

### 4. 状态管理
- **BOM 状态** - 草稿、待审核、已批准等8种状态
- **子项激活状态** - 草稿、激活、停用
- **可视化标识** - 彩色标签和图标展示

## 📁 项目结构

```
appPdm/BomManagement/
├── Bom/
│   ├── index.tsx                  # BOM 列表页（主入口）
│   └── components/
│       └── bomFormDialog.tsx      # BOM 新建表单对话框
├── detail.tsx                     # BOM 详情页（三栏布局）
├── _components/
│   ├── BomTree.tsx               # BOM 树形结构组件
│   ├── BomHeaderCard.tsx         # BOM 头部信息卡片
│   ├── BomItemDetail.tsx         # BOM 子项详情面板
│   ├── BomItemsDrawer.tsx        # BOM 子项抽屉
│   ├── VersionSelector.tsx       # 版本选择器
│   └── MaterialSelect.tsx        # 物料选择器（新增）
├── _formWidgets/
│   ├── BomForm.tsx               # BOM 主表单组件
│   └── BomItemForm.tsx           # BOM 子项表单组件
├── _enums/
│   └── bomEnums.ts               # BOM 枚举定义
├── _permissions/
│   └── index.ts                  # 权限定义
└── _utils/
    ├── bomUtils.ts               # BOM 工具函数
    └── treeUtils.ts              # 树形工具函数
```

## 🎨 UI/UX 设计优化

### 列表页优化
- ✅ **状态可视化** - 使用彩色 Tag 组件展示 BOM 状态
- ✅ **操作优化** - 查看详情、复制、删除按钮，带 Tooltip 提示
- ✅ **列定义完善** - 包含物料编码、名称、描述、工程师、状态等
- ✅ **搜索筛选** - 支持关键词搜索和状态筛选
- ✅ **树形展示** - 下半部分展示选中 BOM 的子项树形结构

### 树形节点优化
- ✅ **状态图标** - 🟢 激活、⚪ 草稿、🔴 停用
- ✅ **物料编码 Tag** - 蓝色标签突出显示
- ✅ **数量单位** - 灰色文字显示数量和单位
- ✅ **层级徽章** - [L1] [L2] 等标识层级深度
- ✅ **信息分层** - 通过字体粗细、颜色区分信息重要性

### 表单优化
- ✅ **MaterialSelect 组件** - 专业物料选择器
  - 支持搜索、分页、防抖
  - labelInValue 模式自动处理
  - 自定义选项渲染（Tag + 规格信息）
- ✅ **编辑功能完善** - 区分新增和编辑模式
- ✅ **表单验证** - 完整的字段验证规则
- ✅ **日期处理** - 自动格式化生效/失效日期

### 详情页布局
- ✅ **三栏布局** - 顶部信息 + 左侧树 + 右侧详情
- ✅ **响应式设计** - 支持屏幕尺寸自适应
- ✅ **多 Tab 详情** - 基本信息、文档信息、变更信息
- ✅ **操作便捷** - 编辑、删除、复制操作集成

## 🔧 技术实现

### 前端技术栈
- **React 18** + **TypeScript 5**
- **UmiJS 4** - 企业级前端框架
- **Ant Design 5** - UI 组件库
- **Formily** - 表单解决方案
- **AgGridPlus** - 高性能表格组件

### 核心组件

#### 1. MaterialSelect（物料选择器）
```tsx
<MaterialSelect
  labelInValue={true}
  placeholder="请选择物料"
  onChange={(value) => console.log(value)}
/>
```

**特性**:
- 支持搜索、分页、防抖
- 自动加载物料列表
- 自定义选项渲染
- labelInValue 模式

#### 2. BomItemForm（子项表单）
```tsx
<BomItemForm
  visible={true}
  bomData={bomData}
  treeItems={treeItems}
  data={editingItem}
  version="V1.0"
  onClose={() => setVisible(false)}
  onSuccess={() => refresh()}
/>
```

**特性**:
- Formily Schema 模式
- 支持新增和编辑
- 自动物料选择
- 父级子项选择（TreeSelect）
- 日期、数量、单位等字段

#### 3. BomTree（树形组件）
```tsx
<BomTree
  bomId="123"
  version="V1.0"
  onSelect={(item) => setSelectedItem(item)}
  onDataLoaded={(items) => setTreeItems(items)}
/>
```

**特性**:
- 递归树形结构
- 展开/折叠控制
- 节点选中事件
- 统计信息显示

## 📊 数据结构

### BOM 主表（BomDto）
```typescript
{
  id: number;                    // BOM ID
  materialCode: string;          // 物料编码
  materialName: string;          // 物料名称
  materialDescription: string;   // 物料描述
  topMaterialCode: string;       // 顶层物料编码
  engineerCode: string;          // 工程师编码
  engineerName: string;          // 工程师姓名
  status: number;                // BOM状态
  remark: string;                // 备注
  creationTime: string;          // 创建时间
}
```

### BOM 子项（BomItemDto）
```typescript
{
  id: number;                      // 子项 ID
  bomId: number;                   // BOM ID
  childMaterialCode: string;       // 子项物料编码
  childMaterialName: string;       // 子项物料名称
  childMaterialDescription: string; // 子项描述
  quantity: number;                // 数量
  unitOfMeasure: string;           // 计量单位
  materialComeFrom: string;        // 物料来源
  parentItemId?: number;           // 父级子项 ID
  levelCode: string;               // 层级代码
  sequence: number;                // 序号
  effectiveDate: string;           // 生效日期
  expiryDate?: string;             // 失效日期
  activationStatus: number;        // 激活状态
  isVisible: boolean;              // 是否可见
  remark: string;                  // 备注
}
```

## 🔌 API 接口

### BOM 主表操作
- `BomGetListAsync` - 获取 BOM 列表
- `BomCreateAsync` - 创建 BOM
- `BomGetAsync` - 获取 BOM 详情
- `BomDeleteAsync` - 删除 BOM

### BOM 子项操作
- `BomAddItemAsync` - 添加子项
- `BomUpdateItemAsync` - 更新子项
- `BomDeleteItemAsync` - 删除子项
- `BomBatchUpdateItemsAsync` - 批量更新子项

### BOM 树形结构
- `BomGetBomTreeAsync` - 获取树形结构（扁平）
- `BomGetBomTreeRecursiveAsync` - 获取树形结构（递归）

### 版本管理
- `BomCopyBomVersionAsync` - 复制版本
- `BomCompareBomVersionsAsync` - 对比版本

## 🎭 枚举定义

### BOM 状态
```typescript
enum BomStatus {
  Draft = 0,              // 草稿(B1)
  ReturnedForRevision = 1, // 退回修改(B2)
  RevisionApproved = 2,   // 修订通过(B3)
  PendingApproval = 3,    // 待审核(C1)
  ReApproval = 4,         // 重新审批(C2)
  ReApprovalApproved = 5, // 重新审批通过(C3)
  Approved = 6,           // 已批准(D1)
  Rejected = 7,           // 已拒绝(D3)
}
```

### 子项激活状态
```typescript
enum BomItemActivationStatus {
  Draft = 0,    // 草稿
  Active = 5,   // 激活
  Inactive = 10, // 停用
}
```

## 🔐 权限控制

```typescript
export const BomPermissions = {
  Default: 'Pdm.BomManagement.Bom',
  Create: 'Pdm.BomManagement.Bom.Create',
  Update: 'Pdm.BomManagement.Bom.Update',
  Delete: 'Pdm.BomManagement.Bom.Delete',
  AddItem: 'Pdm.BomManagement.Bom.AddItem',
  UpdateItem: 'Pdm.BomManagement.Bom.UpdateItem',
  DeleteItem: 'Pdm.BomManagement.Bom.DeleteItem',
};
```

## 🚀 使用指南

### 创建 BOM
1. 在列表页点击"新建 BOM"按钮
2. 填写物料编码、顶层物料、工程师信息
3. 保存后系统自动创建 BOM 和初始版本

### 添加子项
1. 在列表页选中一个 BOM
2. 下方子项区域点击"新增子项"
3. 选择子项物料、填写数量、单位等
4. 保存后子项添加到树形结构

### 编辑子项
1. 在子项树中选中要编辑的子项
2. 点击"编辑"按钮
3. 修改数量、单位、序号等信息
4. 保存后更新生效

### 查看详情
1. 在列表页操作列点击"👁️ 查看详情"
2. 进入详情页三栏布局
3. 左侧选择子项，右侧查看详情
4. 顶部切换版本

## 📈 性能优化

- ✅ **虚拟滚动** - AgGridPlus 原生支持
- ✅ **防抖搜索** - 300ms 防抖延迟
- ✅ **分页加载** - 支持大数据量
- ✅ **树形懒加载** - 按需展开节点
- ✅ **组件缓存** - React.memo 优化

## 🐛 已知问题

- [ ] 版本对比功能 UI 尚未实现
- [ ] 批量操作功能待开发
- [ ] 导入导出功能待开发
- [ ] 拖拽调整层级功能待开发

## 📝 后续规划

1. **版本管理增强**
   - 实现版本对比 UI
   - 版本历史记录
   - 版本回滚功能

2. **批量操作**
   - 批量删除子项
   - 批量修改数量
   - 批量调整序号

3. **导入导出**
   - Excel 模板下载
   - Excel 批量导入
   - BOM 结构导出

4. **高级功能**
   - 拖拽调整层级
   - BOM 成本计算
   - 物料替代管理
   - 变更历史追踪

## 👥 开发团队

- **UI/UX 设计**: Claude (AI Assistant)
- **技术架构**: 基于 UmiJS 4 + Ant Design 5
- **API 集成**: ABP Framework 后端

## 📄 License

版权所有 © 2025 PDM 项目组
