# PDM 模块表单统一改造设计文档

**日期**: 2025-12-11
**作者**: Claude
**状态**: 实施中

## 1. 背景

PDM 模块存在以下问题需要统一解决:

1. 合理化建议、任务管理、记录单信息更改为全页表单后,附件上传功能丢失
2. 项目变更单使用 FormDialog,需改为全页表单模式
3. 合理化建议和记录单信息的详情/编辑页,关联项目显示为 ID 而非名称
4. 项目成果点击详情页报错: `SchemaField.registerComponent is not a function`
5. 项目风险表单未回显关联项目和里程碑
6. 项目问题仍使用 FormDialog,需统一为全页表单

## 2. 设计目标

### 2.1 统一架构

所有表单采用**全页表单模式**,统一三文件结构:

```
FeatureName/
├── index.tsx              # 列表页
├── form.tsx              # 新建/编辑表单页
├── detail.tsx            # 只读详情页
└── components/
    ├── schema.ts         # 表单 Schema 定义
    └── [FormDialog.tsx]  # 将被废弃
```

### 2.2 核心组件

#### useAttachmentUpload Hook

已创建通用附件上传 Hook: `src/hooks/useAttachmentUpload.tsx`

**使用方式**:

```typescript
import { useAttachmentUpload } from '@/hooks';

// 在form.tsx中
const AttachmentUploadWithConfig = useAttachmentUpload(
  entityId,  // 编辑时为实际ID,新建时为undefined(内部自动生成临时ID)
  '/api/pdm/project-management/risks'  // API基础路径
);

const SchemaField = useSchemaField({
  UserSelect,
  ProjectSelect,
  MultiAttachmentUpload: AttachmentUploadWithConfig,  // 注册包装后的组件
});
```

**特性**:
- 自动生成临时 entityId(新建模式)
- 自动处理上传/下载/删除 API 调用
- 使用 FormData 格式上传
- 完全兼容 MultiAttachmentUpload 组件

## 3. 改造清单

### 3.1 已完成

- ✅ **useAttachmentUpload Hook**: `src/hooks/useAttachmentUpload.tsx`
- ✅ **合理化建议附件上传**: 已添加到 form.tsx

### 3.2 待完成

#### 任务管理 (TaskList)

**文件**: `src/pages/appPdm/ProjectManagement/TaskList/form.tsx`

**改造内容**:
1. 添加导入: `import { useAttachmentUpload } from '@/hooks';`
2. 添加 Hook 调用:
   ```typescript
   const AttachmentUploadWithConfig = useAttachmentUpload(
     taskId,
     '/api/pdm/project-management/tasks'
   );
   ```
3. 在 SchemaField 中注册: `MultiAttachmentUpload: AttachmentUploadWithConfig`
4. 加载数据时处理附件: `if (res.attachments) formData.attachments = res.attachments;`
5. 保存时移除附件字段: `delete (values as any).attachments;`

**API 路径**: `/api/pdm/project-management/tasks/{entityId}/documents`

---

#### 记录单信息 (RecordInformationList)

**文件**: `src/pages/appPdm/ProjectManagement/RecordInformationList/form.tsx`

**改造内容**: 与任务管理相同

**API 路径**: `/api/pdm/project-management/record-forms/{entityId}/documents`

---

#### 项目变更单 (ProjectChangeList)

**状态**: 当前使用 FormDialog,需完全改造

**新建文件**: `src/pages/appPdm/ProjectManagement/ProjectChangeList/form.tsx`

**参考模板**: 复制 `RationalizationProposalList/form.tsx`

**关键修改**:
1. 修改 API 调用:
   - `ProjectChangeGetAsync`
   - `ProjectChangeCreateAsync`
   - `ProjectChangeUpdateAsync`
2. 修改路由路径: `/appPdm/ProjectManagement/ProjectChangeList/form`
3. 修改 API 基础路径: `/api/pdm/change-management/change-orders`
4. 调整字段映射(根据实际 DTO)

**修改文件**: `src/pages/appPdm/ProjectManagement/ProjectChangeList/index.tsx`

**改造内容**:
1. 移除 FormDialog 导入和使用
2. 添加 navigate 跳转:
   ```typescript
   // 新建
   <Button
     type="primary"
     icon={<PlusOutlined />}
     onClick={() => navigate('/appPdm/ProjectManagement/ProjectChangeList/form')}
   >
     新建
   </Button>

   // 编辑
   const handleEdit = () => {
     navigate(`/appPdm/ProjectManagement/ProjectChangeList/form?id=${data.id}`);
   };
   ```

**修改文件**: `src/pages/appPdm/ProjectManagement/ProjectChangeList/detail.tsx`

**改造内容**: 已存在,但需验证数据回显是否正确

---

#### 项目成果 (ProjectDeliverableList)

**修复文件**: `src/pages/appPdm/ProjectManagement/ProjectDeliverableList/detail.tsx`

**问题**: 第32行使用了错误的 API `SchemaField.registerComponent()`

**修复方案**:
```typescript
// ❌ 错误写法(第22-35行)
const SchemaField = useSchemaField();

SchemaField.registerComponent({
  UserSelect,
  ProjectSelect,
});

// ✅ 正确写法
const SchemaField = useSchemaField({
  UserSelect,
  ProjectSelect,
});
```

**新建文件**: `src/pages/appPdm/ProjectManagement/ProjectDeliverableList/form.tsx`

**参考模板**: 复制 `RationalizationProposalList/form.tsx`

**关键修改**:
1. 修改 API 调用:
   - `ProjectDeliverableGetAsync`
   - `ProjectDeliverableCreateAsync`
   - `ProjectDeliverableUpdateAsync`
2. 修改路由路径: `/appPdm/ProjectManagement/ProjectDeliverableList/form`
3. 修改 API 基础路径: (需确认后端 API 路径)
4. 调整字段映射(根据实际 DTO)

**修改文件**: `src/pages/appPdm/ProjectManagement/ProjectDeliverableList/index.tsx`

**改造内容**: 移除 FormDialog,改为 navigate 跳转

---

#### 项目风险 (RiskList)

**文件**: `src/pages/appPdm/ProjectManagement/RiskList/form.tsx`

**问题**: 编辑时未回显关联项目和里程碑

**改造内容**:

1. 在数据加载部分(第56-100行)添加项目处理:
   ```typescript
   // 处理项目字段 - 后端返回 projectCode
   if (res.projectCode) {
     // 如果后端同时返回 projectName,直接使用
     if (res.projectName) {
       formData['{value:projectCode,label:projectName}'] = {
         value: res.projectCode,
         label: res.projectName,
       };
     } else {
       // 否则查询项目列表获取名称
       const projectList = await ProjectGetListAsync({ MaxResultCount: 1000 });
       const project = projectList.items?.find(p => p.projectCode === res.projectCode);
       if (project) {
         formData['{value:projectCode,label:projectName}'] = {
           value: res.projectCode,
           label: project.projectName,
         };
       }
     }
   }
   ```

2. 里程碑回显已存在(第74-79行),确认是否正常工作

3. 添加附件上传支持(参考任务管理改造)

**验证点**:
- 确认后端 API 返回的字段名
- 确认 schema 中项目字段的配置

---

#### 项目问题 (IssueList)

**状态**: 当前使用 FormDialog,需完全改造

**新建文件**: `src/pages/appPdm/ProjectManagement/IssueList/form.tsx`

**注意**:
- IssueList 有复杂的执行流程(execute.tsx)
- 需要确认是否需要全页表单模式
- 可能需要保留 FormDialog 用于快速操作

**建议**: 先完成其他改造,最后评估 IssueList 是否需要改造

---

## 4. 字段回显问题通用解决方案

### 4.1 问题描述

多个页面存在"关联项目显示为 ID 而非名称"的问题。

### 4.2 根本原因

1. 后端API返回的是 `projectId` 或 `projectCode`
2. 前端 ProjectSelect 组件期望 labelInValue 格式: `{value, label}`
3. 表单回显时未进行格式转换

### 4.3 统一解决方案

在 `form.tsx` 和 `detail.tsx` 的数据加载时,添加项目查询和转换:

```typescript
// 方案A: 后端同时返回 projectCode 和 projectName
if (res.projectCode && res.projectName) {
  formData['{value:projectCode,label:projectName}'] = {
    value: res.projectCode,
    label: res.projectName,
  };
}

// 方案B: 后端只返回 projectCode,前端查询
if (res.projectCode && !res.projectName) {
  const projectList = await ProjectGetListAsync({ MaxResultCount: 1000 });
  const project = projectList.items?.find(p => p.projectCode === res.projectCode);
  if (project) {
    formData['{value:projectCode,label:projectName}'] = {
      value: res.projectCode,
      label: project.projectName,
    };
  }
}
```

**建议**: 优先采用方案A(后端返回),减少前端查询次数

---

## 5. Schema 中的附件字段配置

所有 schema.ts 中的附件字段应遵循统一格式:

```typescript
{
  type: 'array',
  title: '附件列表',
  'x-decorator': 'FormItem',
  'x-component': 'MultiAttachmentUpload',
  'x-component-props': {
    maxSize: 50,        // 最大文件大小(MB)
    maxCount: 10,       // 最大文件数量
    description: '支持多个文件上传',
    entityTypeName: 'FeatureName',  // 实体类型名称
  },
  name: 'attachments',
}
```

**注意**: 不需要在 schema 中配置 `uploadFn/downloadFn/deleteFn`,这些函数由 `useAttachmentUpload` Hook 自动注入。

---

## 6. API 路径规范

各模块的附件 API 路径:

| 模块 | API 基础路径 |
|------|--------------|
| 合理化建议 | `/api/pdm/project-management/rationalization-proposals` |
| 任务管理 | `/api/pdm/project-management/tasks` |
| 记录单信息 | `/api/pdm/project-management/record-forms` |
| 项目变更单 | `/api/pdm/change-management/change-orders` |
| 项目成果 | (待确认) |
| 项目风险 | `/api/pdm/project-management/risks` |
| 项目问题 | `/api/pdm/project-management/issues` |

**附件操作 API**:
- 上传: `POST {基础路径}/{entityId}/documents`
- 下载: `GET {基础路径}/{entityId}/documents/{blobName}`
- 删除: `DELETE {基础路径}/{entityId}/documents/{blobName}`

---

## 7. 实施步骤

### 7.1 第一阶段: 附件上传修复(优先级高)

1. ✅ 创建 useAttachmentUpload Hook
2. ✅ 合理化建议 form.tsx 添加附件上传
3. ⏳ 任务管理 form.tsx 添加附件上传
4. ⏳ 记录单信息 form.tsx 添加附件上传

### 7.2 第二阶段: 项目成果修复(优先级高)

1. ⏳ 修复 detail.tsx 的 SchemaField 错误
2. ⏳ 创建 form.tsx
3. ⏳ 修改 index.tsx 移除 FormDialog

### 7.3 第三阶段: 项目变更单改造

1. ⏳ 创建 form.tsx
2. ⏳ 验证/修复 detail.tsx
3. ⏳ 修改 index.tsx 移除 FormDialog

### 7.4 第四阶段: 项目风险修复

1. ⏳ 修复项目字段回显
2. ⏳ 验证里程碑回显
3. ⏳ 添加附件上传支持

### 7.5 第五阶段: 项目问题改造(待评估)

1. ⏳ 评估是否需要改为全页表单
2. ⏳ 如需改造,创建 form.tsx
3. ⏳ 如需改造,修改 index.tsx

---

## 8. 测试检查清单

每个改造完成后,需要验证:

### 8.1 新建功能
- [ ] 打开新建页面无报错
- [ ] 所有必填字段验证正常
- [ ] 附件可以正常上传
- [ ] 保存成功后跳转到列表页
- [ ] 列表页刷新显示新数据

### 8.2 编辑功能
- [ ] 打开编辑页面无报错
- [ ] 所有字段正确回显(包括项目、里程碑等)
- [ ] 附件列表正确显示
- [ ] 可以新增/删除附件
- [ ] 修改后保存成功
- [ ] 列表页刷新显示修改后数据

### 8.3 详情功能
- [ ] 打开详情页面无报错
- [ ] 所有字段正确显示(只读)
- [ ] 附件可以下载
- [ ] 项目/里程碑显示名称而非ID

### 8.4 列表功能
- [ ] 新建按钮跳转到 form 页面
- [ ] 编辑按钮跳转到 form 页面
- [ ] 详情按钮跳转到 detail 页面
- [ ] 删除功能正常

---

## 9. 常见问题

### Q1: 新建时如何处理 entityId?

**A**: `useAttachmentUpload` Hook 内部会自动生成临时 UUID。新建时传入 `undefined`,编辑时传入实际 ID。

### Q2: 附件数据何时提交到后端?

**A**: 附件通过独立的 API 即时上传,不在表单的 Create/Update 接口中提交。因此保存时需要 `delete (values as any).attachments;`

### Q3: 如何确认 API 路径是否正确?

**A**:
1. 查看对应的 FormDialog 实现
2. 查看后端 Controller 的路由定义
3. 使用浏览器开发者工具查看网络请求

### Q4: ProjectSelect 的 valueField 应该用什么?

**A**: 根据后端 DTO:
- 如果后端使用 `projectId` (UUID) → `valueField: 'id'`
- 如果后端使用 `projectCode` (字符串) → `valueField: 'projectCode'`

### Q5: 为什么要移除 FormDialog 而不是保留两种模式?

**A**:
1. 统一架构,降低维护成本
2. 全页表单对复杂表单体验更好
3. 避免代码重复,减少潜在bug

---

## 10. 后续优化建议

1. **后端 API 改进**: 建议所有 Get 接口同时返回关联实体的 Code 和 Name,避免前端二次查询

2. **ProjectSelect 组件增强**: 考虑在组件内部处理 ID/Code 到 Name 的转换

3. **文档生成**: 基于改造完成的代码,生成标准的表单页面开发文档

4. **代码生成器**: 考虑开发代码生成器,根据后端 DTO 自动生成表单页面

---

## 11. 参考文件

- 通用 Hook: `src/hooks/useAttachmentUpload.tsx`
- 标准模板: `src/pages/appPdm/ProjectManagement/RationalizationProposalList/form.tsx`
- Schema 示例: `src/pages/appPdm/ProjectManagement/RationalizationProposalList/components/schema.ts`
