# BOM树+文档列表整合 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在前端以紧凑 2B 风格展示 BOM 树，并联动物料域与文档域，按节点实时显示关联文档列表（含文件与生命周期信息），支撑工程查料、审图、变更协同。

**Architecture:** 以现有 IBomAppService/IBomVersionAppService 提供的 BOM 数据为入口，结合 PartDocumentLink + Document 聚合查询文档，新增一个编排型应用服务聚合 BOM 节点与文档；前端采用左右分栏树+表格信息密集布局，按需加载、缓存与分页。

**Tech Stack:** Backend：ABP (.NET 7/EF Core)、Domain/Application/HttpApi 层；Frontend：React 18 + TypeScript（Ant Design 5 紧凑模式，Table 虚拟滚动）、Axios/Abp HttpApi Client JS 代理、状态管理（Zustand 或 Redux Toolkit）。

---

## 1. 背景与需求
- 业务目标：在同屏展示 BOM 树与节点文档，减少跨页面跳转，提升工程师查阅效率。
- 信息来源：BOM（物料组成与版本）、物料主数据（Part）、文档域（Document + PartDocumentLink）。
- 关键场景：① 输入物料编码/版本查看结构与文档；② 通过树节点切换查看下层子件文档；③ 快速筛选主/次要文件、版本/修订、文件类型；④ 支持导出/下载。
- 交互要求：界面紧凑、单屏信息量高，树+表格固定表头，快捷过滤与批量操作。

## 2. 现有域模型与可用接口（结合代码）
- BOM：`IBomAppService.GetBomTreeRecursiveAsync` 返回 `List<BomItemTreeDto>`（含 ChildMaterialCode/Version、Quantity、ActivationStatus、LevelCode 等）；`IBomVersionAppService.GetListAsync` 获取版本列表（`BomVersionDto`）。实现：`src/Burn.Abp.Pdm.Application/BomManagement/Boms/BomAppService.cs`。
- 物料：`IPartAppService` 提供物料详情（`PartDto`，含 PartNumber/Description/Specification/VersionInfo/Category/Unit 等），路径：`src/Burn.Abp.Pdm.Application.Contracts/PartManagement/Parts`。
- 文档：`IDocumentAppService` 返回 `DocumentDto`（含 Version/Revision/Type/SecurityLevel/Files/PartDocumentLinks 等），路径：`src/Burn.Abp.Pdm.Application.Contracts/DocumentManagement/Documents`。
- 物料-文档关联：`IPartDocumentLinkAppService`（CrudAppService，实现于 `src/Burn.Abp.Pdm.Application/PartManagement/PartDocumentLinks/PartDocumentLinkAppService.cs`），当前列表查询缺少按 PartNumber/Usage 过滤，需扩展以支持按物料批量查询。

## 3. 总体方案
- 数据编排：新增 `BomDocumentQueryAppService`（应用层）封装“给定物料编码+版本 → BOM 树 + 节点文档列表”。内部流程：① 查询版本；② 调用 `GetBomTreeRecursiveAsync` 得到树；③ 收集节点物料编码列表；④ 批量查 `PartDocumentLink`（按物料+用途过滤）；⑤ 一次性查文档主数据（`IDocumentAppService.GetListAsync` 通过 DynamicQuery 按编号集合过滤），返回映射到节点。
- 前端布局：左右分栏（左 30% 树，右 70% 信息区），顶部筛选条。节点展示版本/数量/状态标签、文档计数；右侧以标签页承载“文档列表（默认）/物料概要/生命周期”。
- 加载策略：默认加载前两级，子级按需展开；文档列表按节点懒加载并缓存；表格分页/列宽可拖拽，支持本地多条件过滤。
- 权限：沿用 `PdmPermissions.BomManagement.Default`、`PdmPermissions.DocumentManagement.Default`，新增编排接口标记为查询类权限。

## 4. 接口与数据契约设计
1) **BOM树查询（复用）**  
   - Service：`IBomAppService.GetBomTreeRecursiveAsync(long bomId, string bomVersion)`  
   - 输出：`List<BomItemTreeDto>`（携带 Children、ActivationStatus、Quantity、UnitOfMeasure 等）。
2) **版本列表（复用）**  
   - Service：`IBomVersionAppService.GetListAsync(DynamicQueryInput)`，前端按物料编码过滤并按生效日期倒序。
3) **新增编排接口：BOM + 文档**  
   - Contract：`BomDocumentQueryInput`（MaterialCode, BomVersion, IncludeInactive, RelationUsages[], DocumentTypeIds[], Keywords）。  
   - Output DTO：`BomNodeDocumentDto`（BomItemId, MaterialCode, Description, LevelCode, Quantity, Version, ActivationStatus, Documents[]）。`Documents` 内含 DocumentNumber/Name/Version/Revision/TypeName/LifecycleState/SecurityLevel/IsPrimary/FileRoleSummary/LatestFiles[]。  
   - Service：`IBomDocumentQueryAppService.GetTreeWithDocumentsAsync(BomDocumentQueryInput input)`，返回根节点列表（含 Children 与文档聚合）。
4) **物料-文档过滤扩展（PartDocumentLink）**  
   - 新增 Input：`GetPartDocumentLinksInput : PagedAndSortedResultRequestDto`（PartNumbers[], Usage?, IsPrimary?）。  
   - `PartDocumentLinkRepository` 增加批量查询（按 PartNumbers In，支持用途过滤）。  
5) **文档获取（复用）**  
   - 使用 `IDocumentAppService.GetListAsync(DynamicQueryInput)`，通过 `DocumentNumber in (...)`、`DocumentTypeId in (...)`、`Keywords` 过滤，确保返回 Files/Revision/PartDocumentLinks。
6) **文件获取/下载（复用）**  
   - `IDocumentFileAppService.DownloadAsync` 用于下载；前端不改造接口，仅在表格操作列调用。

## 5. UI 信息架构与线框图（紧凑 2B 风格）
- 布局：顶部筛选条 + 左右分栏；固定表头 + 粘性操作区；以标签页容纳多视图。
- 关键信息：树节点显示物料编码/描述/版本/用量/激活状态/文档计数；右侧文档表格显示文档编号、名称、版本/修订、类型、文件数、安全级别、关联用途、更新时间、操作。

```
+-----------------------------------------------------------------------------------------------+
| 物料编码[输入框]  版本[下拉]  生效范围[日期区间]  用途[多选]  文件类型[多选]  [展开全部][折叠] |
+---------------------------+-------------------------------------------------------------------+
| 左侧 30%: BOM 树          | 右侧 70%: 信息区                                                  |
| - 搜索物料/描述           | [物料概要卡片] 物料编码/名称/规格/版本/状态/来源                  |
| - 节点行：图标+编码+版本  | ----------------------------------------------------------------  |
| - 标签：数量、UoM、状态   | Tab: 文档列表 | 生命周期 | 变更记录                              |
| - 文档计数徽标            | 文档列表(紧凑表格，单行 42px，高度自适应)                          |
| - 展开/勾选               | 列：编号 | 名称 | 版本/修订 | 类型 | 主/次 | 安全级别 | 用途 | 更新时间 | 操作 |
+---------------------------+-------------------------------------------------------------------+
| 底部工具条：选择计数 | [批量下载] [导出清单 CSV] [刷新]                                       |
+-----------------------------------------------------------------------------------------------+
```

## 6. UI 交互流程图（关键路径）
- **初始加载**：输入物料编码 → 触发版本下拉查询 → 选定版本 → 加载 BOM 树（默认展开 2 级） → 选中根节点 → 请求文档列表 → 渲染表格。  
- **节点切换**：点击树节点 → 高亮节点 → 调用编排接口（带 MaterialCode + Version + 筛选条件）→ 表格进入骨架态 → 返回后缓存结果 → 支持前进/后退保持选中状态。  
- **筛选与操作**：右侧表头筛选用途/类型/安全级别 → 客户端过滤 + 后端重新拉取；文档行操作：预览（打开抽屉显示主文件/缩略图）、下载（调用 DocumentFile 下载）、查看关联（显示 PartDocumentLink 详情），支持批量下载/导出。  

```
[物料编码/版本选择]
      ↓
[GetBomTreeRecursiveAsync] → [BOM 树渲染]
      ↓(节点点击)
[收集 PartNumber] → [GetTreeWithDocumentsAsync]
      ↓
[文档表格渲染 + 本地过滤]
      ↓
[行操作: 预览/下载/关联查看] ↔ [DocumentFile 下载接口]
```

## 7. 权限、安全与性能
- 权限：树与文档查询需 `PdmPermissions.BomManagement.Default` + `PdmPermissions.DocumentManagement.Default`；批量下载受文档安全级别与用户密级约束（前端显示不可用状态）。
- 性能：树懒加载 + 子节点分页（一次 200 条以内）；文档列表分页（前端 20/50/100 行），启用行虚拟化；接口层通过 IN 查询批量获取文档与链接，避免 N+1；适配缓存（短期内缓存同节点文档）。
- 错误处理：节点无关联文档时展示空态与“去关联”入口；文档作废/版本不一致标红提示。

## 8. 实施计划（小步迭代，TDD 优先）

### Task 1: 后端编排与查询扩展
**Files:**
- Create: `src/Burn.Abp.Pdm.Application.Contracts/BomManagement/Boms/BomDocumentQueryInput.cs`
- Create: `src/Burn.Abp.Pdm.Application.Contracts/BomManagement/Boms/BomNodeDocumentDto.cs`
- Modify: `src/Burn.Abp.Pdm.Application.Contracts/PartManagement/PartDocumentLinks/IPartDocumentLinkAppService.cs`
- Create: `src/Burn.Abp.Pdm.Application.Contracts/PartManagement/PartDocumentLinks/GetPartDocumentLinksInput.cs`
- Create: `src/Burn.Abp.Pdm.Application/BomManagement/Boms/BomDocumentQueryAppService.cs`
- Modify: `src/Burn.Abp.Pdm.EntityFrameworkCore/PartManagement/PartDocumentLinks/PartDocumentLinkRepository.cs`（新增按 PartNumbers/Usage 过滤查询）
- Modify: `src/Burn.Abp.Pdm.HttpApi/Controllers/BomManagement/BomDocumentQueryController.cs`（新建控制器映射编排接口）
- Test: `test/Burn.Abp.Pdm.Application.Tests/BomManagement/BomDocumentQueryAppService_Tests.cs`

**Steps:**
1. 写失败用例：覆盖“给定物料编码+版本返回节点与文档数量”“用途过滤”“作废文档不返回”。  
2. 运行测试确认失败：`dotnet test test/Burn.Abp.Pdm.Application.Tests -v minimal`。  
3. 实现 GetTreeWithDocumentsAsync：聚合 BOM 树、链接、文档（含 Files/PartDocumentLinks）。  
4. 扩展 PartDocumentLinkRepository 按 PartNumbers 批量取数并按 Usage 过滤。  
5. 增加 HttpApi 控制器路由（REST：`GET /api/app/bom-document/tree`）。  
6. 再跑测试确保通过。

### Task 2: 前端页面与交互实现（React 版）
**Files:**
- Create: `src/Burn.Abp.Pdm.Web/ClientApp/src/pages/BomDocuments/index.tsx`
- Create: `src/Burn.Abp.Pdm.Web/ClientApp/src/pages/BomDocuments/hooks/useBomDocuments.ts`
- Create: `src/Burn.Abp.Pdm.Web/ClientApp/src/pages/BomDocuments/components/BomTree.tsx`
- Create: `src/Burn.Abp.Pdm.Web/ClientApp/src/pages/BomDocuments/components/DocumentTable.tsx`
- Create: `src/Burn.Abp.Pdm.Web/ClientApp/src/pages/BomDocuments/components/MaterialSummary.tsx`
- Modify: `src/Burn.Abp.Pdm.Web/ClientApp/src/routes.tsx`（注册路由）
- Modify: `src/Burn.Abp.Pdm.Web/Menus/PdmMenuContributor.cs`（新增菜单“BOM文档视图”，指向前端路由）

**Steps:**
1. 搭建页面骨架：顶部筛选条（Form + Space）、左右分栏（Resizable SplitPane）、标签页容器（Tabs），AntD Table 使用 `size="small"`、虚拟滚动。  
2. 数据层：封装 `useBomDocuments` hook（Zustand/RTK query），调用 HttpApi Client/axios：版本列表、BOM 树、GetTreeWithDocumentsAsync；实现懒加载与节点缓存（Map<MaterialCode, DocumentList>）。  
3. 组件：`BomTree`（Tree/DirectoryTree + 节点徽标）、`DocumentTable`（列筛选用途/类型/安全级别、本地快速过滤、操作列预览/下载）、`MaterialSummary`（卡片展示物料概要/状态）。  
4. 交互：批量下载/导出按钮，表格列宽拖拽（use-resizable-header），固定表头，Loading/Skeleton 空态，权限禁用态。  
5. 自测交互：基本加载、节点切换、过滤、下载；Lighthouse/性能检查表格虚拟滚动。

### Task 3: 验证与交付
**Files:**
- Test: `test/Burn.Abp.Pdm.Web.Tests/BomDocumentsPage_Tests.cs`（或现有 UI 自动化脚本）
- Docs: `docs/runbooks/bom-document-view.md`（操作指南，含权限要求）

**Steps:**
1. 编写 UI 自动化/集成测试：树加载、节点切换、过滤、下载按钮可用性。  
2. 在开发环境跑全量回归：`dotnet test`（包含 Application + Web 测试）。  
3. 更新文档与菜单说明，补充权限矩阵。  
4. 准备发布说明与回滚方案。

## 9. 验收与测试清单
- BOM 树：能按物料/版本加载，展开/收起正常，激活状态标识正确。  
- 文档列表：按节点拉取，过滤用途/类型/安全级别生效，分页/滚动流畅。  
- 文件操作：预览/下载可用，权限不足时按钮置灰并提示。  
- 性能：首屏加载 < 2s（缓存命中），节点切换 < 1s（200 条以内）。  
- 异常：无文档时显示空态；接口错误时出现轻量通知且不影响已缓存数据。
