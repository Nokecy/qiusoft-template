# 项目管理 BUG 梳理与修复计划（前端）

> 本文档由 `docs/plans/2025-12-15-project-management-bug-triage.md` 拆分而来（前端执行版）。
>
> 后端对齐计划见：`docs/plans/2025-12-15-project-management-bug-triage-backend.md`。

> **For Codex:** 后续逐项修复时建议先使用 `superpowers:executing-plans` 将本计划拆解执行。

**目标**：对“项目管理/工作区/关注/风险/里程碑/任务分解/项目图片”相关问题做一次可追溯的 BUG 梳理，给出当前代码检查结论、验收标准、初步定位与修复建议，并为后续产出可操控原型提供落地路径。

**技术栈**：Umi Max + React + TypeScript + Ant Design + Formily + `@nokecy/qc-ui`(AgGridPlus) + ReactFlow(已有于工艺路线) + Mermaid(当前里程碑图)

---

## 0. 快速结论（这次“检查”发现的关键点）

- **任务分解树**：项目内已有树形实现范例，使用 `AgGridPlus` 的 `treeData + getDataPath`（见 `src/pages/appPdm/ProjectManagement/TaskBreakdown/index.tsx`）。
- **项目详情-项目任务**：当前“任务名称”列在项目详情页只是文本，不支持点击进详情；且项目详情页内对任务/问题/风险主要提供“新建对话框”，**缺少与列表页对齐的编辑/删除入口**（需确认产品期望：在详情页做全量 CRUD，还是跳转到列表页）。
- **我的工作区/我的任务**：页面已有“我负责的任务/问题/风险”统计卡片，但下方 Tabs 目前仅有“待我审批/我的申请”，**缺少‘我的任务/我的问题/我的风险’列表视图**（其中“我的问题/我的风险”的后端口径需先确认）。
- **我的关注**：三个关注列表页（任务/问题/风险）与对应原列表页字段/功能不一致：
  - 列字段缺少（例如 IssueList 的 `requiresApproval` 在关注页未展示）；
  - “取消关注/关注切换”功能在关注列表页缺失（目前只能看列表）。
- **项目风险详情**：风险详情页字段基本已经在展示（风险类型/处理人/后果/是否启用评审/关注人），但要注意后端 DTO 字段为 `watchers` 列表，不一定有 `watchUserCodes`；若显示为空或为 ID 串，需要前端映射（同时建议后端保证返回可读字段）。
- **里程碑父子拖拉连线（重要）**：当前里程碑图是 Mermaid 渲染（不可交互），与“工艺路线 form 页面”使用的 ReactFlow 连线方式不同；要实现“拖拉里程碑设置父子”，需要引入 **ReactFlow 版里程碑编辑器**（建议复用 `ProcessRoute/form.tsx` 的交互范式），并明确父子关系字段口径。
- **新增 BUG：ProjectImageUrl 存储绝对地址**：`ProjectImageUpload` 当前会把 `apiServerUrl + documentUrl` 拼成完整 URL 并写回表单值，导致保存/返回携带 `http://192.168.2.2:10010` 这类环境地址；应改为 **仅保存相对路径**，展示时再拼接。

---

## 1. 相关页面/文件定位（可点击路径）

- 任务分解（树）：`src/pages/appPdm/ProjectManagement/TaskBreakdown/index.tsx`
- 任务分解数据转换：`src/pages/appPdm/ProjectManagement/TaskBreakdown/_utils/dataTransform.ts`
- 项目详情（含任务/问题/风险只读表）：`src/pages/appPdm/ProjectManagement/ProjectList/Detail/index.tsx`
- 项目详情只读表组件：`src/pages/appPdm/ProjectManagement/ProjectList/Detail/_components/ReadOnlyArrayTable.tsx`
- 项目任务列表（CRUD/详情入口）：`src/pages/appPdm/ProjectManagement/TaskList/index.tsx`
- 项目问题列表（CRUD/详情入口）：`src/pages/appPdm/ProjectManagement/IssueList/index.tsx`
- 项目风险列表（CRUD/详情入口）：`src/pages/appPdm/ProjectManagement/RiskList/index.tsx`
- 我的任务（工作区）：`src/pages/appPdm/Workspace/MyTasks/index.tsx`
- 我的关注：
  - 任务关注：`src/pages/appPdm/ProjectManagement/TaskAttention/index.tsx`
  - 问题关注：`src/pages/appPdm/ProjectManagement/IssueAttention/index.tsx`
  - 风险关注：`src/pages/appPdm/ProjectManagement/RiskAttention/index.tsx`
- 风险详情页：`src/pages/appPdm/ProjectManagement/RiskList/detail.tsx`
- 里程碑流程图（当前不可交互）：`src/pages/appPdm/ProjectManagement/TemplateList/components/MilestoneFlowChart.tsx`
- 工艺路线（ReactFlow 连线范例）：`src/pages/appPdm/ProcessManagement/ProcessRoute/form.tsx`
- 项目图片上传组件：`src/pages/appPdm/_formWidgets/ProjectImageUpload.tsx`

---

## 2. 任务分解“树结构控件”能力查询（第1点需求）

当前项目树结构是通过 `@nokecy/qc-ui` 的 `AgGridPlus`（AG-Grid 封装）实现。

### 2.1 关键 Props（树形）

在 `TaskBreakdown` 页面已落地使用（见 `src/pages/appPdm/ProjectManagement/TaskBreakdown/index.tsx`）：

- `treeData={true}`：启用树数据模式
- `getDataPath={(rowData) => rowData.hierarchy}`：告诉 AG-Grid 每行的层级路径（数组）
- `autoGroupColumnDef`：配置树的“分组列”展示（标题/宽度/是否显示计数等）
- `groupDefaultExpanded={-1}`：默认展开层级（-1 表示全部展开）
- `getContextMenuItems`：右键菜单（项目里用于新增子任务/编辑/删除）

此外，`AgGridPlus` 本身额外暴露了旧式树形参数（来自 qc-ui 的 `GridProps` 类型定义）：

- `treeKeyName?: string`、`treeParentName?: string`：用于把扁平数据按 parent 字段转树（旧逻辑）
- `useNativeTreeFilter?: boolean`：启用 AG-Grid 原生树过滤

### 2.2 Ref 方法（“控件支持的方法”）

`AgGridPlus` 的 `gridRef` 类型为 `GridRef`，当前公开的方法只有：

- `onRefresh(): void`（刷新）

来源：`node_modules/@nokecy/qc-ui/dist/esm/ag-grid-plus/interface.d.ts`

> 结论：树形交互主要依赖 AG-Grid 的 props/事件，而不是通过 ref 暴露大量方法。

---

## 3. BUG 清单（前端执行版：验收标准 + 初步定位 + 修复建议）

> 说明：以下编号用于后续排期/跟踪；“重要”项建议优先。涉及后端口径的内容以 `[后端依赖]` 标注。

### BUG-01（任务分解）树结构交互/编辑能力需要对齐

- 【成功】已确认（当前 `TaskBreakdown` 已具备树形展示与右键新增/编辑/删除等基础交互；“拖拽调整父子/排序/跨里程碑移动”属于新增能力，需产品确认后再排期实现）。

- **模块**：项目管理 / 项目任务分解
- **现状检查**：已存在树形页面 `TaskBreakdown`，支持按项目加载、树形展示、右键新增子任务/编辑/删除。
- **缺口风险**：若产品希望“树上直接拖拽调整父子关系/排序/跨里程碑移动”，目前未看到对应实现；当前通过 `parentCode`（创建子任务时赋值）建立父子。
- **建议验收标准**：
  - 能以树形展示里程碑 -> 任务 -> 子任务层级
  - 节点支持：查看详情、编辑、删除（权限控制）
  - 需要确认：是否要支持拖拽变更父子/排序（如果要，需引入 rowDrag 或自研逻辑）
- **涉及文件**：`src/pages/appPdm/ProjectManagement/TaskBreakdown/index.tsx`

### BUG-02（项目详情）项目任务“任务名称”可点击进入详情

- 【成功】已实现（任务 Tab 表格的“任务名称”支持点击跳转到任务详情；详情页的“项目任务”区域改为 List 后同样支持点击）。

- **模块**：项目管理 / 项目详情
- **复现**：进入项目详情 -> 项目任务表格 -> 点击“任务名称”
- **当前表现**：`taskName` 列为纯文本，不跳转。
- **期望**：点击任务名称（或任务编码）进入任务详情页。
- **初步定位**：项目详情使用只读表 `ReadOnlyArrayTable`，列配置在 `src/pages/appPdm/ProjectManagement/ProjectList/Detail/index.tsx` 的 `tableType === 'tasks'` 分支。
- **修复建议**：给 `taskName` 增加 `render`，用 `<Button type="link" />` 跳转 `'/appPdm/ProjectManagement/TaskList/detail?id=${record.id}'`。
- **验收点**：
  - 点击任务名称能打开详情
  - 在 KeepAlive/多 Tab 下返回逻辑正常

### BUG-03（项目详情）详情页内“增删改”能力不完整

- 【成功】已实现（详情页任务/问题/风险列表为每条增加“编辑”入口，跳转到对应 `/form?id=...` 页面；“查看详情”已通过名称点击进入 `/detail?id=...`）。

- **模块**：项目管理 / 项目详情
- **现状检查**：项目详情页存在隐藏对话框用于“新建任务/风险/问题”（见 `src/pages/appPdm/ProjectManagement/ProjectList/Detail/index.tsx` 下方 `ProjectTaskFormDialog/ProjectRiskFormDialog/ProjectIssueFormDialog`）。
- **当前表现**：详情页内对列表仅展示（只读 Table），**缺少与列表页一致的编辑/删除入口**；用户需要去列表页处理。
- **期望**：详情页支持增删改（需确认范围：任务/问题/风险三类都要？是否受项目状态限制？）。
- **修复建议（两种路线，需产品确认）**：
  1) **轻量方案（推荐）**：详情页增加“查看/编辑”链接，编辑跳转到对应 form 页；删除可跳转到列表页处理。
  2) **重方案**：详情页表格增加操作列（编辑/删除），复用对应 FormDialog 和 Delete API，并做权限+状态约束（例如任务未开始才可编辑）。

### BUG-04（工作区）缺少“我的任务/我的问题/我的风险”列表页签

- 【成功】已实现（“我的任务”页 Tabs 增加：我的任务/我的问题/我的风险三个列表页签；其中问题/风险暂用“我关注的列表”兜底并在页面提示后端口径待补齐）。

- **模块**：我的工作区 / 我的任务
- **现状检查**：`src/pages/appPdm/Workspace/MyTasks/index.tsx` 已显示三张统计卡（我负责的任务/问题/风险），但 Tabs 仅有“待我审批/我的申请”。
- **期望**：Tabs 增加三个页签：我的任务、我的问题、我的风险，并支持列表查看（至少查看/跳转详情）。
- **[后端依赖]**：
  - 任务已有专用 API：`/api/pdm/project-task/my-tasks`。
  - 问题/风险目前只看到“我关注的列表”API（`my-watched-list`），未看到“我负责/我处理”的专用 API；需后端补接口或明确筛选参数口径。
- **建议**：
  - 若“我的问题/我的风险”指“我关注的”，可直接复用 watched-list。
  - 若指“我处理/我负责”，待后端补齐后再接入。

### BUG-05（我的关注）字段/功能与原列表不一致

- 【成功】已实现（关注页新增“取消关注”入口；IssueAttention 补齐 `requiresApproval` 列，三页均保留“编码点击进详情”）。

- **模块**：我的关注（任务/问题/风险关注）
- **现状检查**：关注页已实现“编码点击进详情”。
- **缺口**：
  - **字段不齐**：例如 `IssueList` 有 `requiresApproval` 列，`IssueAttention` 未展示；其它字段需要对齐以“原列表页”为准。
  - **功能不齐**：关注列表页缺少“取消关注”入口（关注页理论上应该以“管理关注”为核心）。
- **建议验收标准**：
  - 字段：与对应原列表页（TaskList/IssueList/RiskList）字段一致或至少覆盖产品要求字段
  - 功能：支持查看详情 + 取消关注（必要时支持批量取消关注）
- **涉及文件**：
  - `src/pages/appPdm/ProjectManagement/TaskAttention/index.tsx`
  - `src/pages/appPdm/ProjectManagement/IssueAttention/index.tsx`
  - `src/pages/appPdm/ProjectManagement/RiskAttention/index.tsx`

### BUG-06（风险详情）字段缺失/显示不正确

- 【成功】已实现（风险详情页关注人展示优先使用 `watchers` 列表，回退到 `watchUserCodes`；风险类型回退到 `riskTypeCode`）。

- **模块**：项目风险 / 详情页
- **现状检查**：`src/pages/appPdm/ProjectManagement/RiskList/detail.tsx` 已展示：风险类型、处理人、风险后果、是否启用评审流程、关注人。
- **可能问题点（需要以实际接口返回确认）**：
  - DTO 中关注人更可能在 `watchers`（数组）里，而不是 `watchUserCodes`；若字段不匹配，会导致前端显示 `-` 或显示为 ID 串。
- **修复建议**：
  - 展示关注人优先用 `data.watchers?.map((w) => w.userName || w.userCode).join(',')`。
  - 风险类型：优先展示 `riskTypeName`，缺失时回退 `riskTypeCode`。
- **验收点**：
  - 详情页字段完整且展示为“人可读”
  - 与风险列表页字段语义一致

### BUG-07（里程碑，重要）支持拖拉连线设置父子里程碑

- 【成功】已实现（模板/项目里程碑页将 Mermaid 流程图替换为 ReactFlow 版 `MilestoneFlowEditor`，支持拖拽连线写入 `parentCodes`，并做循环依赖保护）。

- **模块**：项目模板 / 项目创建 / 里程碑编辑
- **当前表现**：里程碑流程图组件 `MilestoneFlowChart` 使用 Mermaid 生成 SVG/HTML，**不可交互**，无法拖拉连线。
- **期望**：参考工艺路线 `ProcessRoute/form.tsx` 的连线方式，实现里程碑节点拖拉、连线设置父子（即写入 `parentCodes` 或 `parentMilestoneIds`）。
- **建议实现路线**：
  1) 新增 `MilestoneFlowEditor`（ReactFlow 版），支持：
     - 节点拖拽
     - 连接线创建/删除
     - 将 edges 同步回 Formily 表单字段（例如对某里程碑写入 `parentMilestoneIds`）
  2) 在项目模板/项目创建的 schema 中，将 `MilestoneFlowChart` 替换为 Editor（或提供“编辑模式/只读模式”切换）。
- **关键难点（含后端口径）**：
  - Mermaid 使用的是 `parentCodes`（按名称），而项目实体可能用 `parentMilestoneIds`（按 ID）；需要统一数据结构，并考虑“重命名里程碑”对父子关系的影响。
  - **[后端依赖]**：父子字段最终口径（`parentMilestoneIds` vs `parentCodes`）需后端确认并稳定。

### BUG-08（原型，重要）基于现有前端页面产出“可操控原型图”

- 【成功】已实现（方案 2：docs 静态原型，入口：`docs/prototypes/project-management/index.html`；包含里程碑拖拽连线/项目详情列表交互/工作区 Tabs/关注取消关注等核心交互）。

- **模块**：产品原型/交互确认
- **建议产出形式（两种可选）**：
  1) **Umi 路由原型（推荐）**：新增 `src/pages/appPdm/ProjectManagement/_prototype`，用静态 mock 数据复刻页面结构，支持点击/弹窗/拖拽（里程碑用 ReactFlow），用于后续迭代对齐。
  2) **docs 下纯前端原型**：在 `docs/` 增加一份静态 HTML（不接后端），用最小 JS 驱动交互。
- **需要你确认**：原型范围与交付形态（方案 1/2）

### BUG-09（项目图片）`projectImageUrl` 保存/返回不应包含环境域名

- 【成功】已实现（上传/提交时统一保存相对路径；展示时按 `apiServerUrl` 拼接，兼容历史绝对 URL 数据）。

- **模块**：项目管理 / 项目编辑 / 项目卡片展示
- **现象**：上传图片后 `projectImageUrl` 为完整 URL，例如 `http://192.168.2.2:10010/api/.../xxx.jpg`；环境切换会失效。
- **期望**：保存与接口返回仅保存相对路径（如 `/api/pdm/.../xxx.jpg` 或 `/projects/shared/uploads/...`），由前端根据 `apiServerUrl` 拼接展示。
- **初步定位**：`src/pages/appPdm/_formWidgets/ProjectImageUpload.tsx` 内 `customRequest` 里把 `apiServerUrl + response.documentUrl` 拼成 `fullImageUrl` 并 `setValue(fullImageUrl)`。
- **修复建议**：
  - **存储**：表单值只保存 `response.documentUrl`（相对路径）。
  - **展示**：组件内部渲染时把相对路径转成绝对 URL（用于 `<UploadFile.url>`/`<img src>`）。
  - **兼容历史数据**：若后端已存了绝对 URL，前端展示时允许输入绝对 URL；保存前做一次“去域名化”归一化。
- **受影响点**：`ProjectCard` 使用 `data.projectImageUrl` 直接作为背景图和 `<img src>`（见 `src/pages/appPdm/ProjectManagement/ProjectList/components/ProjectCard.tsx`），也需要做同样的归一化/拼接逻辑。
- **[后端依赖]（可选但推荐）**：后端存储层也应避免把绝对域名入库，保证跨环境可迁移（见后端计划）。

### BUG-10（项目详情 UI）用 List 替换 Table，保证“一行就是一行高度”

- 【成功】已实现（项目详情 Tab1 的“项目任务/项目风险/项目问题”三块区域从 Table 替换为 List，行高随内容自适应，且名称支持点击进详情）。

- **模块**：项目管理 / 项目详情
- **背景**：当前项目详情页任务/问题/风险区域使用 `ReadOnlyArrayTable`（Antd Table），即使只有 1 条也会包含表头/分页等最小高度，造成视觉噪声。
- **期望**：将该区域改为 `List` 风格展示（每条一行，高度随内容），整体样式与现有差距不大；点击“名称”进入详情。
- **初步定位**：`src/pages/appPdm/ProjectManagement/ProjectList/Detail/schema.ts`：
  - `tasksSection.filteredTasks`
  - `risksSection.filteredRisks`
  - `issuesSection.filteredIssues`
- **跳转规则（验收点）**：
  - 任务：点击 `taskName` → `'/appPdm/ProjectManagement/TaskList/detail?id=${id}'`
  - 问题：点击 `name` → `'/appPdm/ProjectManagement/IssueList/detail?id=${id}'`
  - 风险：点击 `name` → `'/appPdm/ProjectManagement/RiskList/detail?id=${id}'`
- **样式约束（验收点）**：
  - 保留现有 `CollapsibleSection` 的标题/新增按钮样式
  - 行分隔使用轻量分割线（或 `List` 的 `itemLayout`），不引入明显“表格感”
  - 空态与加载态表现与现在一致（空数据不占固定高度）

---

## 4. 建议修复优先级（按风险/价值）

1) BUG-07 里程碑拖拉连线（重要，影响模板/创建核心流程）
2) BUG-09 项目图片 URL 归一化（环境切换直接导致数据不可用）
3) BUG-02/03 项目详情任务可点击 + 详情页 CRUD 能力对齐
4) BUG-04 工作区补齐三个列表页签（依赖后端 API 口径）
5) BUG-05 我的关注字段/功能对齐
6) BUG-06 风险详情字段映射优化
7) BUG-10 项目详情 List 替换 Table

---

## 5. 下一步执行建议（前端）

- 优先做 BUG-09（项目图片 URL）最小修复：
  - 只改 `ProjectImageUpload` + `ProjectCard` 的 URL 归一化
  - 不改后端，先保证前端保存为相对路径
- 然后做 BUG-02/10（详情页点击与行高优化），风险低且收益明显。
- BUG-07（里程碑 ReactFlow 编辑器）建议先做“原型版”，用少量 mock 数据验证交互，再与后端字段口径对齐落地。

---

## 附录A：关注列表字段/功能对齐对照（用于第4点验收）

> 对齐基准：对应的原列表页 `TaskList/IssueList/RiskList`。

### A.1 字段对照

| 页面 | 原列表关键列 | 关注页当前列 | 缺失/差异 |
|---|---|---|---|
| 任务关注 | `taskCode`/`taskName`/`projectCode`/`taskTypeName`/`status`/`urgencyLevel`/`estimatedHours`/`milestoneName`/`chargeNames`/`processNames`/`action` | 已覆盖除 `action` 外大多数列；`taskCode` 可点击进详情 | 缺 `action`（至少需要“取消关注/查看详情”）；可考虑 `taskName` 也可点击 |
| 问题关注 | 原列表含 `requiresApproval` + `action` | 已覆盖除 `requiresApproval`、`action` 外多数列；`issueCode` 可点击进详情 | 缺 `requiresApproval`；缺 `action`（取消关注/查看/编辑/执行视需求） |
| 风险关注 | 原列表含 `action` | 已覆盖除 `action` 外多数列；`riskCode` 可点击进详情 | 缺 `action`（取消关注/查看详情） |

### A.2 功能对齐（建议最小集合）

- 关注页必须有“取消关注”能力（单条/批量二选一，优先单条可用）。
- 关注页保留“查看详情”的入口（当前通过编码点击已满足）。
- 是否允许在关注页直接编辑/删除：建议由产品决定；若不做，至少提供跳转到原列表页并自动定位/筛选。

---

## 附录B：本轮新增/确认项（与前端实现相关）

### B.1 项目详情页任务/问题/风险使用 List 优化 UI（细化）

- **背景**：当前项目详情页（Tab1 的“项目任务/项目风险/项目问题”卡片区）使用 `ReadOnlyArrayTable`（Antd Table），即使只有 1 条数据也会出现 Table 头部/分页等最小高度，导致“1 行不是 1 行高度”的观感。
- **期望**：将任务/问题/风险展示组件改为 `List` 风格（每条一行，行高随内容），整体样式与当前差距不大；点击名称可进入详情。
- **初步定位**：`src/pages/appPdm/ProjectManagement/ProjectList/Detail/schema.ts` 下列字段：
  - `tasksSection.filteredTasks`（tableType='filteredTasks'）
  - `risksSection.filteredRisks`（tableType='risks'）
  - `issuesSection.filteredIssues`（tableType='issues'）
- **实现建议**：新增一个只读列表组件（例如 `ProjectEntityList`），支持三种类型渲染与 name 点击跳转：
  - 任务：跳 `'/appPdm/ProjectManagement/TaskList/detail?id=${id}'`
  - 问题：跳 `'/appPdm/ProjectManagement/IssueList/detail?id=${id}'`
  - 风险：跳 `'/appPdm/ProjectManagement/RiskList/detail?id=${id}'`

### B.2 里程碑父子字段口径（前端侧现状）

- **现状**：项目/模板编辑页表单字段为 `parentCodes`，选项值是“里程碑名称”（见 `src/pages/appPdm/ProjectManagement/ProjectList/Edit/schema.ts` 的 `parentCodes` Select）。
- **提交转换**：
  - 项目编辑页会把 `parentCodes` 转为 `parentMilestones[{parentMilestoneId,parentMilestoneName}]`（见 `src/pages/appPdm/ProjectManagement/ProjectList/Edit/index.tsx`）。
  - 模板编辑页会把 `parentCodes` 解析后写入 `parentMilestoneIds`（见 `src/pages/appPdm/ProjectManagement/TemplateList/Edit/index.tsx`）。
- **对拖拽连线的影响**：如果我们复用现有页面逻辑，拖拽连线建议先更新 `parentCodes`（名称数组），复用既有提交转换，改动最小。
