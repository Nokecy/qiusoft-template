# 项目风险状态管理功能设计

## 概述

为项目风险模块增加"关闭"、"取消"、"重新打开"功能，完善风险生命周期管理。

---

## 一、状态模型设计

### 1.1 状态定义

| 状态值 | 状态名称 | 业务含义 |
|-------|---------|---------|
| 0 | 打开 (Open) | 风险待处理 |
| 10 | 已解决 (Resolved) | 风险被成功应对/消除 |
| 20 | 已关闭 (Closed) | 风险已不再适用（如项目范围变更） |
| 30 | 已取消 (Cancelled) | 风险误报/重复创建 |

### 1.2 状态流转规则

```
打开(0) ──解决──→ 已解决(10) ──重新打开──→ 打开(0)
   ├────关闭──→ 已关闭(20) ──重新打开──→ 打开(0)
   └────取消──→ 已取消(30) ──重新打开──→ 打开(0)
```

| 当前状态 | 可执行操作 | 目标状态 |
|---------|-----------|---------|
| 打开 | 解决 | 已解决 |
| 打开 | 关闭 | 已关闭 |
| 打开 | 取消 | 已取消 |
| 已解决 | 重新打开 | 打开 |
| 已关闭 | 重新打开 | 打开 |
| 已取消 | 重新打开 | 打开 |

---

## 二、后端 API 需求

### 2.1 状态枚举扩展

**文件**: `RiskStatus.cs` (或相应的枚举定义文件)

```csharp
public enum RiskStatus
{
    /// <summary>
    /// 打开 - 风险待处理
    /// </summary>
    Open = 0,

    /// <summary>
    /// 已解决 - 风险被成功应对/消除
    /// </summary>
    Resolved = 10,

    /// <summary>
    /// 已关闭 - 风险已不再适用（如项目范围变更）
    /// </summary>
    Closed = 20,

    /// <summary>
    /// 已取消 - 风险误报/重复创建
    /// </summary>
    Cancelled = 30,
}
```

### 2.2 新增 API 接口

#### 2.2.1 关闭风险

**接口路径**: `POST /api/pdm/project-risk/{id}/close`

**请求参数**:
```json
{
  "remark": "string (可选) - 关闭原因备注"
}
```

**响应**: `ProjectRiskDto`

**权限**: `Pdm.ProjectRisk.Resolve` (复用现有权限)

**业务逻辑**:
- 校验风险状态必须为"打开(0)"
- 更新状态为"已关闭(20)"
- 记录操作备注（如果提供）

---

#### 2.2.2 取消风险

**接口路径**: `POST /api/pdm/project-risk/{id}/cancel`

**请求参数**:
```json
{
  "remark": "string (可选) - 取消原因备注"
}
```

**响应**: `ProjectRiskDto`

**权限**: `Pdm.ProjectRisk.Resolve` (复用现有权限)

**业务逻辑**:
- 校验风险状态必须为"打开(0)"
- 更新状态为"已取消(30)"
- 记录操作备注（如果提供）

---

#### 2.2.3 重新打开风险 (现有接口调整)

**接口路径**: `POST /api/pdm/project-risk/{id}/reopen`

**请求参数** (新增可选参数):
```json
{
  "remark": "string (可选) - 重新打开原因备注"
}
```

**响应**: `ProjectRiskDto`

**权限**: `Pdm.ProjectRisk.Reopen` (现有权限)

**业务逻辑调整**:
- 校验风险状态必须为"已解决(10)"、"已关闭(20)"或"已取消(30)"
- 更新状态为"打开(0)"
- 记录操作备注（如果提供）

---

### 2.3 DTO 调整

如果需要记录状态变更备注，建议在 `ProjectRiskDto` 中增加字段：

```csharp
/// <summary>
/// 最后一次状态变更备注
/// </summary>
public string? StatusRemark { get; set; }

/// <summary>
/// 最后一次状态变更时间
/// </summary>
public DateTime? StatusChangedTime { get; set; }
```

---

## 三、前端实现设计

### 3.1 状态枚举定义

```typescript
const RiskStatus = {
  Open: 0,        // 打开
  Resolved: 10,   // 已解决
  Closed: 20,     // 已关闭
  Cancelled: 30,  // 已取消
};

const riskStatusEnum = [
  { label: '打开', value: RiskStatus.Open, color: 'error' },
  { label: '已解决', value: RiskStatus.Resolved, color: 'success' },
  { label: '已关闭', value: RiskStatus.Closed, color: 'default' },
  { label: '已取消', value: RiskStatus.Cancelled, color: 'warning' },
];
```

### 3.2 操作按钮布局

**表格操作列结构**:
```
[编辑] [解决/重新打开] [更多 ▼]
                         ├── 关闭
                         └── 取消
```

**按钮显示逻辑**:

| 当前状态 | 行内按钮 | 下拉菜单 |
|---------|---------|---------|
| 打开 | 编辑、解决 | 关闭、取消 |
| 已解决 | 重新打开 | - |
| 已关闭 | 重新打开 | - |
| 已取消 | 重新打开 | - |

### 3.3 操作确认弹窗

所有状态变更操作使用统一的确认弹窗，包含可选的备注输入：

```
┌─────────────────────────────┐
│  确认关闭风险？              │
├─────────────────────────────┤
│  风险编码：RISK-2024-001    │
│  风险名称：供应商交付延迟    │
│                             │
│  备注（可选）：              │
│  ┌─────────────────────┐    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│        [取消]  [确认]       │
└─────────────────────────────┘
```

### 3.4 权限控制

| 操作 | 所需权限 |
|-----|---------|
| 解决 | `Pdm.ProjectRisk.Resolve` |
| 关闭 | `Pdm.ProjectRisk.Resolve` |
| 取消 | `Pdm.ProjectRisk.Resolve` |
| 重新打开 | `Pdm.ProjectRisk.Reopen` |

---

## 四、待后端完成事项清单

- [ ] 扩展 `RiskStatus` 枚举，新增 `Closed = 20` 和 `Cancelled = 30`
- [ ] 实现 `POST /api/pdm/project-risk/{id}/close` 接口
- [ ] 实现 `POST /api/pdm/project-risk/{id}/cancel` 接口
- [ ] 调整 `POST /api/pdm/project-risk/{id}/reopen` 接口，支持更多源状态和可选备注
- [ ] (可选) 在 DTO 中增加 `StatusRemark` 和 `StatusChangedTime` 字段
- [ ] 运行 OpenAPI 生成，更新前端 API 定义

---

## 五、前端实现步骤

后端 API 完成后，前端需要：

1. 运行 `yarn openapi` 更新 API 定义
2. 更新 `RiskList/index.tsx` 中的状态枚举
3. 调整操作列按钮逻辑
4. 实现状态变更确认弹窗组件
5. 对接新增的 API 接口

---

*文档创建时间: 2025-12-10*
