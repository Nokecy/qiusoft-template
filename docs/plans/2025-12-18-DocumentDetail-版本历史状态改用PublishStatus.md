# DocumentDetail 版本历史状态改用 PublishStatus 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** `/appPdm/DocumentManagement/Document/detail` 的“版本历史”列表中，“状态”列改为使用后端返回的 `publishStatus` 字段，并按枚举（0/1/2）展示为“未发布/已发布/已作废”。

**Architecture:** 不改接口与数据流，只在详情页的版本历史数据映射层补齐 `publishStatus` 字段，并将列表列定义由 `state` 切换为 `publishStatus`；为兼容历史数据，保留兜底读取 `publishState/state`。

**Tech Stack:** React + TypeScript + Umi Max + AgGridPlus + Ant Design

---

### Task 1: 定位版本历史列表的数据来源与字段

**Files:**
- Modify: `src/pages/appPdm/DocumentManagement/Document/detail.tsx`

**Step 1: 确认版本历史数据来自哪个接口**
- 检查 `loadDetail` 内是否调用 `DocumentGetVersionListAsync`。

**Step 2: 确认接口 DTO 字段**
- 在 `src/services/pdm/typings.d.ts` 中确认 `BurnAbpPdmDocumentManagementDocumentsDocumentVersionDto` 含 `publishStatus?: 0|1|2`。

**Verification**
- 搜索：`rg -n "DocumentGetVersionListAsync|publishStatus" src/pages/appPdm/DocumentManagement/Document/detail.tsx src/services/pdm/typings.d.ts`

---

### Task 2: 在 RevisionHistoryData 增加 publishStatus 字段并映射

**Files:**
- Modify: `src/pages/appPdm/DocumentManagement/Document/detail.tsx`

**Step 1: 扩展类型**
- 在 `interface RevisionHistoryData` 中新增 `publishStatus?: number;`

**Step 2: 映射字段**
- 在 `historyRes.items.map(...)` 中把 `publishStatus` 从 `item.publishStatus` 映射出来。
- 兼容兜底：`publishStatus: item.publishStatus ?? item.publishState ?? (item as any).state`

**Step 3: fallback 记录补齐**
- 当 `revisionHistory.length === 0` 的 fallback 记录补齐 `publishStatus: 0`。

**Verification**
- 运行 TypeScript 检查（可选其一）：
  - `yarn lint`
  - `npx tsc -p tsconfig.json --noEmit`

---

### Task 3: 版本历史列表“状态”列改用 publishStatus + 枚举展示

**Files:**
- Modify: `src/pages/appPdm/DocumentManagement/Document/detail.tsx`

**Step 1: safeRevisionData 透传 publishStatus**
- 在 `safeRevisionData` 的返回对象中增加 `publishStatus`（从 `item.publishStatus` 安全转换）。

**Step 2: 修改列定义**
- 将 `<AgGridColumn field="state" ...>` 替换为 `<AgGridColumn field="publishStatus" ...>`。
- 按枚举展示：
  - 0 → 未发布（default/灰）
  - 1 → 已发布（green/绿）
  - 2 → 已作废（red/红）

**Verification**
- 本地启动并手工回归（建议）：
  - `yarn start`
  - 打开任意文档详情 → 切到“版本历史” → 确认“状态”列显示符合预期

---

### Task 4: 回归检查（防御性与兼容）

**Files:**
- Modify: `src/pages/appPdm/DocumentManagement/Document/detail.tsx`

**Step 1: 数据缺失兜底**
- 当 `publishStatus` 缺失时，列表显示 `-` 或“未知”（按现有 `AgGridColumn` 行为选择一致的方式）。

**Step 2: 不影响原有“修订状态”显示**
- 保留 `state` 字段用于页面其它位置（若仍在使用）。

**Verification**
- `yarn lint`（若此前未运行）

