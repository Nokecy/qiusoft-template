# 问题执行流程前端实施进度

## 📋 实施概览

本文档记录问题执行流程重新设计的前端实施进度和待办事项。

## ✅ 已完成的工作

### 1. 核心枚举和工具更新
- ✅ 更新问题状态枚举 (`src/pages/appPdm/ProjectManagement/IssueList/_utils/issueEnums.ts`)
  - 新增 `PendingReceive` (5) - 待接收
  - 调整 `Received` (15) - 已接收
  - 移除 `Activated`,新增 `Cancelled` (40)

- ✅ 更新状态工具函数 (`statusUtils.ts`)
  - 实现完整的状态转换逻辑
  - 按钮显示/禁用控制

### 2. 新建对话框组件
- ✅ `StartProcessingDialog.tsx` - 开始处理问题
- ✅ `ActivateDialog.tsx` - 激活/重新打开问题
- ✅ `AttachmentUpload.tsx` - 通用附件上传组件(新建)

### 3. 执行抽屉组件
- ✅ `IssueExecutionDialog.tsx` - 主执行抽屉
  - 包含3个标签页:问题信息、执行操作、执行记录
  - 集成所有执行操作按钮

### 4. 页面简化
- ✅ 列表页 (`index.tsx`)
  - 操作列简化为单一"执行"按钮

- ✅ 详情页 (`detail.tsx`)
  - 头部操作区简化:返回、编辑、删除、执行

### 5. 文档
- ✅ 对话框更新指南 (`docs/issue-dialog-update-guide.md`)

## 🔄 进行中的工作

### 对话框改造(添加附件和备注)

已完成:
- ✅ `ConfirmReceiveDialog.tsx` - 已更新

待更新:
- ⏳ `AssignDialog.tsx` - 指派问题
- ⏳ `StartProcessingDialog.tsx` - 开始处理(需检查是否已有备注/附件)
- ⏳ `ResolveDialog.tsx` - 解决问题
- ⏳ `CloseDialog.tsx` - 关闭问题
- ⏳ `ActivateDialog.tsx` - 激活问题(需检查是否已有备注/附件)
- ⏳ `AddCommentDialog.tsx` - 添加备注

### 更新方法
所有对话框更新遵循统一模式:
1. 导入 `AttachmentUpload` 组件
2. 在 `SchemaField` 中注册
3. 在 schema 中添加 `attachmentIds` 字段
4. 确保有 `remark` 字段
5. 更新 API 调用传递完整 DTO

## 📝 待完成的工作

### 1. 周期化执行记录组件
**优先级**: 高

组件需求:
- 按执行周期分组显示执行记录
- 每个周期显示:周期号、开始时间、结束时间、状态
- 周期内的所有操作记录以时间线展示
- 支持展开/折叠周期

建议实现:
```typescript
// src/pages/appPdm/ProjectManagement/IssueList/_components/ExecutionCycleTimeline.tsx
interface ExecutionCycleTimelineProps {
  issueId: string;
  cycles: ExecutionCycle[]; // 从 API 获取
  records: ExecutionRecord[]; // 从 API 获取
}
```

需要的 API:
- `GET /api/projectManagement/projectIssue/{id}/execution-cycles`
- `GET /api/projectManagement/projectIssue/{id}/execution-records`

### 2. 任务关联选择器组件
**优先级**: 中

组件需求:
- 搜索和选择项目任务
- 支持多选
- 显示任务编码、名称、状态
- 可在问题创建/编辑时使用

建议实现:
```typescript
// src/pages/appPdm/ProjectManagement/IssueList/_components/TaskSelector.tsx
interface TaskSelectorProps {
  projectCode: string;
  value?: string[]; // 任务ID列表
  onChange?: (value: string[]) => void;
  multiple?: boolean;
}
```

### 3. 表单页任务关联功能
**优先级**: 中

在问题创建/编辑表单中:
- 添加任务关联字段
- 集成 TaskSelector 组件
- 提交时保存任务关联关系

文件需要修改:
- `src/pages/appPdm/ProjectManagement/IssueList/form.tsx`

## 🔧 技术债务和优化

### API 调用
当前所有对话框的 API 调用都被注释,需要后端 API 完成后:
1. 取消注释 API 导入
2. 取消注释 API 调用
3. 移除临时的 `console.log` 和警告提示
4. 启用成功回调和对话框关闭

### 类型定义
需要添加 TypeScript 类型定义:
```typescript
// src/pages/appPdm/ProjectManagement/IssueList/_types/index.ts
export interface ExecutionCycle {
  id: string;
  projectIssueId: string;
  cycleNumber: number;
  startTime: string;
  endTime?: string;
  status: number; // 0=进行中,1=已完成,2=已取消
  activationReason?: string;
  resolution?: string;
  remark?: string;
}

export interface ExecutionRecord {
  id: string;
  projectIssueId: string;
  recordType: number;
  operatorId: string;
  operatorName: string;
  remark?: string;
  operationTime: string;
  attachmentIds?: string[];
}
```

### 权限控制
需要添加的权限(如果尚未定义):
- `ProjectIssue.Assign` - 指派问题
- `ProjectIssue.ConfirmReceive` - 确认接收
- `ProjectIssue.StartProcessing` - 开始处理
- `ProjectIssue.Resolve` - 解决问题
- `ProjectIssue.Close` - 关闭问题
- `ProjectIssue.Activate` - 激活问题

## 🧪 测试计划

### 单元测试
- 状态转换逻辑测试
- 按钮显示/禁用逻辑测试
- 表单验证测试

### 集成测试
- 完整的问题生命周期流程测试
- 多周期执行测试
- 附件上传和关联测试
- 工作流审批集成测试

### 用户验收测试
- 创建问题 → 指派 → 接收 → 开始处理 → 解决 → 关闭
- 关闭后重新激活
- 附件和备注的添加和查看
- 执行记录的完整性

## 📊 进度统计

### 整体进度
- 后端实施: ✅ 95% (已完成核心代码,待数据库迁移和最终调试)
- 前端实施: 🔄 70% (核心组件完成,对话框更新和高级组件待完成)

### 前端详细进度
- 基础设施: ✅ 100% (枚举、工具函数、通用组件)
- 对话框更新: 🔄 15% (1/7 已完成)
- 执行抽屉: ✅ 100%
- 页面简化: ✅ 100%
- 高级组件: ⏳ 0% (周期时间线、任务选择器)
- 表单集成: ⏳ 0%

## 🚀 下一步行动

### 立即执行(本次会话)
1. ✅ 创建 AttachmentUpload 组件
2. ✅ 更新 ConfirmReceiveDialog
3. ⏳ 更新其余6个对话框(可使用批处理或手动)
4. ⏳ 创建 ExecutionCycleTimeline 组件

### 短期(本周)
1. 完成所有对话框更新
2. 实现周期化时间线组件
3. 后端完成后集成 API 调用
4. 基础功能测试

### 中期(下周)
1. 实现任务关联选择器
2. 表单页集成任务关联
3. 完整的集成测试
4. 用户验收测试

## 📁 关键文件清单

### 已修改/创建的文件
```
src/pages/appPdm/ProjectManagement/IssueList/
├── _utils/
│   ├── issueEnums.ts              ✅ 已更新
│   └── statusUtils.ts             ✅ 已更新
├── _components/
│   ├── AttachmentUpload.tsx       ✅ 新建
│   ├── ConfirmReceiveDialog.tsx   ✅ 已更新
│   ├── StartProcessingDialog.tsx  ✅ 新建
│   ├── ActivateDialog.tsx         ✅ 新建
│   ├── AssignDialog.tsx           ⏳ 待更新
│   ├── ResolveDialog.tsx          ⏳ 待更新
│   ├── CloseDialog.tsx            ⏳ 待更新
│   └── AddCommentDialog.tsx       ⏳ 待更新
├── components/
│   └── IssueExecutionDialog.tsx   ✅ 新建
├── index.tsx                      ✅ 已简化
└── detail.tsx                     ✅ 已简化
```

### 待创建的文件
```
src/pages/appPdm/ProjectManagement/IssueList/
├── _components/
│   ├── ExecutionCycleTimeline.tsx ⏳ 待创建
│   └── TaskSelector.tsx           ⏳ 待创建
└── _types/
    └── index.ts                   ⏳ 待创建
```

## 💡 实施建议

1. **优先完成对话框更新**: 这是用户直接交互的界面,应优先完成
2. **周期时间线组件**: 这是新功能的核心展示,建议尽快实现
3. **任务关联功能**: 可以作为第二阶段的增强功能
4. **充分测试**: 状态转换逻辑复杂,需要充分测试各种场景

## 🔗 相关文档

- [设计文档](../../docs/plans/2025-01-11-issue-execution-redesign.md)
- [后端实施指南](../../zrxt/Burn.Abp.Pdm/docs/ProjectIssueAppService-Implementation-Guide.md)
- [对话框更新指南](../docs/issue-dialog-update-guide.md)
