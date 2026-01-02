# 项目详情页面 Tab 结构重构设计文档

## 项目概述

将项目详情页面（Copy 页面）从垂直罗列布局改造为 Tab 布局，实现更好的内容组织和用户体验。

**实施日期**: 2025-12-05
**影响范围**: `src/pages/appPdm/ProjectManagement/ProjectList/Copy/`

## 需求背景

### 原有结构
- Copy 页面采用垂直罗列所有内容（里程碑、任务、风险、问题、团队、文件等）
- 内容过多导致页面过长，用户需要频繁滚动

### 新需求
1. 采用 Tab 布局组织内容
2. 第一个 Tab "项目详情"：包含项目基本信息 + 里程碑 + 任务 + 风险 + 问题
3. 第二个 Tab "项目团队"：显示团队成员列表
4. 第三个 Tab "项目文件"：显示文件/文档管理
5. 整个页面设置为只读模式（`pattern: 'readPretty'`）

## 技术方案

### 1. Schema 结构改造

#### 文件：`Copy/schema.ts`

**改造前**：
```typescript
schema: {
  type: 'object',
  properties: {
    milestoneFlowChart: { ... },
    milestones: { ... },
    tasks: { ... },
    documents: { ... },
    risks: { ... },
    issues: { ... },
    overviewGrid: { ... },
    teamMembers: { ... },
  }
}
```

**改造后**：
```typescript
schema: {
  type: 'object',
  properties: {
    tabs: {
      type: 'void',
      'x-component': 'FormTab',
      properties: {
        // Tab 1: 项目详情
        projectDetail: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': { tab: '项目详情' },
          properties: {
            overviewGrid: { ... },        // 项目概况信息
            milestoneFlowChart: { ... },  // 里程碑流程图
            completeMilestoneButton: { ... },
            milestones: { ... },          // 里程碑列表（隐藏）
            tasks: { ... },               // 任务列表
            risks: { ... },               // 风险列表
            issues: { ... },              // 问题列表
          }
        },
        // Tab 2: 项目团队
        teamMembers: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': { tab: '项目团队' },
          properties: {
            teamMembers: { ... }
          }
        },
        // Tab 3: 项目文件
        projectFiles: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': { tab: '项目文件' },
          properties: {
            documents: { ... }
          }
        }
      }
    }
  }
}
```

### 2. 组件改造

#### 文件：`Copy/index.tsx`

**主要修改**：

1. **组件名称更新**：
   ```typescript
   // 改造前
   const ProjectEdit: React.FC = () => { ... }
   export default ProjectEdit;

   // 改造后
   const ProjectDetail: React.FC = () => { ... }
   export default ProjectDetail;
   ```

2. **只读模式设置**：
   ```typescript
   const form = createForm({
     // 详情页面统一设置为只读模式
     pattern: 'readPretty',
     effects: () => { ... }
   });
   ```

3. **移除编辑功能**：
   - 删除 `mode` 和 `isViewMode` 变量
   - 删除 `getPageTitle()` 函数
   - 删除 `handleSubmit()` 函数（约 295 行）
   - 简化页面头部，只保留"项目详情"标题和"关闭"按钮

4. **组件注册保持不变**：
   ```typescript
   const SchemaField = useSchemaField({
     ProjectCategorySelect,
     MaterialSelect,
     ProjectTemplateSelect,
     UserSelect,
     ProjectRoleSelect,
     TaskTypeSelect,
     RiskTypeSelect,
     MilestoneFlowChart,
     DocumentExplorer,  // Tab 3 需要
     ProjectFormSelect,
     ProjectImageUpload,
     CompleteMilestoneButtonSimple,
   });
   ```

### 3. FormId 更新

```typescript
// 改造前
export const formId: string = 'Pdm.Project.Edit';

// 改造后
export const formId: string = 'Pdm.Project.Detail';
```

## 数据加载逻辑

**无变化**，完全复用原有的数据加载逻辑：
- 里程碑数据处理（ID到名称映射、拓扑排序）
- 文档数据处理（树形结构展平）
- 风险/问题处理人回显
- 任务数据转换（JSON字符串 → 数组）

## Tab 内容分布

| Tab | 包含内容 | 说明 |
|-----|---------|------|
| 项目详情 | 项目概况、里程碑流程图、里程碑列表、任务列表、风险列表、问题列表 | 主要业务数据展示 |
| 项目团队 | 团队成员 ArrayTable | 团队成员信息 |
| 项目文件 | DocumentExplorer 文件管理器 | 文件/文档管理 |

## 文件变更清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `Copy/schema.ts` | 重写 | 整体改造为 Tab 结构 |
| `Copy/index.tsx` | 修改 | 移除编辑功能，设置只读模式 |
| `Copy/schema.ts.backup2` | 新增 | 原 schema.ts 备份 |
| `Copy/index.tsx.backup2` | 新增 | 原 index.tsx 备份 |

## 关键技术点

### 1. Schema 数据依赖
虽然 teamMembers 移到了单独的 Tab，但第一个 Tab 中的里程碑、任务、风险、问题字段仍然依赖 teamMembers 数据（用于下拉选择处理人/责任人）。由于所有数据都在同一个 form 实例中，使用 `$form.values.teamMembers` 可以正常访问。

### 2. 只读模式渲染
设置 `pattern: 'readPretty'` 后，Formily 自动将所有表单字段渲染为只读状态：
- Input → Text
- Select → Tag
- ArrayTable → 只读表格（隐藏操作列）

### 3. 路由无变化
列表页点击详情按钮仍然导航到 `/ProjectList/Copy?id=xxx`，无需修改列表页代码。

## 测试要点

1. **Tab 切换功能**
   - 验证三个 Tab 可以正常切换
   - 切换后数据正确显示

2. **数据加载**
   - 项目基本信息正确显示
   - 里程碑流程图正确渲染
   - 里程碑、任务、风险、问题列表数据完整
   - 团队成员列表正确显示
   - 文件列表正确显示

3. **只读模式**
   - 所有字段均为只读状态
   - 无编辑、保存按钮
   - ArrayTable 无"添加"、"删除"按钮

4. **字段依赖**
   - 里程碑责任人下拉列表正确显示团队成员
   - 风险/问题处理人下拉列表正确显示团队成员

## 回滚方案

如需回滚，执行以下操作：

```bash
# 恢复 schema.ts
cp Copy/schema.ts.backup2 Copy/schema.ts

# 恢复 index.tsx
cp Copy/index.tsx.backup2 Copy/index.tsx
```

## 后续优化建议

1. **性能优化**：如果项目数据量大，考虑 Tab 懒加载
2. **用户体验**：记住用户最后访问的 Tab，下次打开时自动定位
3. **权限控制**：根据权限动态显示/隐藏 Tab
4. **导出功能**：支持按 Tab 导出数据（如导出团队成员列表、文件清单等）

## 总结

本次重构成功将垂直罗列的详情页改造为 Tab 布局，提升了页面组织性和用户体验。通过复用现有的数据加载逻辑和组件，保证了功能的稳定性。整体改造量适中，风险可控。
