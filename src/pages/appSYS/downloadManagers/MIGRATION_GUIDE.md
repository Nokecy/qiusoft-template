# 下载管理页面迁移指南

从 v1.x 升级到 v2.0

## 变更概述

### 主要变更
1. **后端接口统一**: Android 和 Windows 上传使用统一接口
2. **参数标准化**: 通过 `AppName` 和 `Force` 参数控制上传行为
3. **组件增强**: 快速上传组件支持动态选择应用类型

## 后端接口变更

### 上传接口

**v1.x (旧版本):**
```
POST /api/update/upload?AppName=PdaApk&Force=true
POST /api/update/upload?AppName=PrinterClient&Force=true
```

**v2.0 (新版本):**
```
POST /api/update/upload?AppName={AppName}&Force={Force}
```

### 参数说明

| 参数 | 类型 | 说明 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| AppName | string | 应用类型 | PdaApk, PrinterClient | 必填 |
| Force | boolean | 强制覆盖 | true, false | true |

## 前端组件变更

### ClientImport 组件

**v1.x 用法:**
```tsx
<ClientImport
    onAfterSubmit={onRefresh}
    title="上传PDA客户端"
    fileType='PdaApk'
    uploadUrl={`/api/update/upload?AppName=PdaApk&Force=true`}
/>
```

**v2.0 用法（方式一 - 固定类型）:**
```tsx
<ClientImport
    onAfterSubmit={onRefresh}
    title="上传PDA客户端"
    fileType='PdaApk'
    uploadUrl={`/api/update/upload`}
    showAppSelector={false}
/>
```

**v2.0 用法（方式二 - 动态选择）:**
```tsx
<ClientImport
    onAfterSubmit={onRefresh}
    title="快速上传"
    uploadUrl={`/api/update/upload`}
    showAppSelector={true}
/>
```

### 新增Props

```typescript
interface ClientImportProps {
    // ... 原有Props
    showAppSelector?: boolean; // 是否显示应用选择器，默认true
}
```

## 迁移步骤

### 第一步: 更新后端接口（如需要）

确保后端接口支持以下格式：

```csharp
[HttpPost("upload")]
public async Task<IActionResult> Upload(
    [FromQuery] string appName,
    [FromQuery] bool force = true,
    IFormFile file)
{
    // 根据 appName 处理不同应用类型
    // force 参数控制是否覆盖
}
```

### 第二步: 更新前端组件

#### 选项A: 最小改动（保持现有功能）

只需移除 URL 中的查询参数：

```diff
<ClientImport
    onAfterSubmit={onRefresh}
    title="上传客户端"
    fileType='PdaApk'
-   uploadUrl={`/api/update/upload?AppName=PdaApk&Force=true`}
+   uploadUrl={`/api/update/upload`}
+   showAppSelector={false}
/>
```

#### 选项B: 启用新功能（推荐）

使用动态选择功能：

```tsx
<ClientImport
    onAfterSubmit={onRefresh}
    title="快速上传"
    uploadUrl={`/api/update/upload`}
    showAppSelector={true}  // 启用应用选择
/>
```

### 第三步: 更新工具栏配置

```tsx
toolBarRender={() => [
    // 分片上传按钮（推荐用于大文件）
    <ChunkUpload
        key="chunk-pda"
        title="分片上传 - PDA客户端"
        fileType='PdaApk'
        appName='PdaApk'
        force={true}
    />,
    <ChunkUpload
        key="chunk-printer"
        title="分片上传 - 打印客户端"
        fileType='PrinterClient'
        appName='PrinterClient'
        force={true}
    />,

    // 快速上传按钮（新增动态选择功能）
    <ClientImport
        key="quick-upload"
        title="快速上传"
        uploadUrl={`/api/update/upload`}
        showAppSelector={true}
    />
]}
```

## 兼容性说明

### 向后兼容

v2.0 完全向后兼容 v1.x：

- ✅ 旧的 `uploadUrl` 格式仍然有效
- ✅ 所有 v1.x Props 保持不变
- ✅ 组件行为保持一致

### 推荐配置

```tsx
// 推荐配置 - 结合分片上传和快速上传
const uploadButtons = [
    // 大文件专用
    {
        type: 'chunk',
        title: '分片上传 - PDA',
        fileType: 'PdaApk'
    },
    {
        type: 'chunk',
        title: '分片上传 - 打印',
        fileType: 'PrinterClient'
    },
    // 小文件快速上传（动态选择）
    {
        type: 'quick',
        title: '快速上传',
        dynamic: true
    }
];
```

## 功能对比

| 功能 | v1.x | v2.0 |
|------|------|------|
| 固定应用类型上传 | ✅ | ✅ |
| 动态选择应用类型 | ❌ | ✅ |
| 强制覆盖控制 | ✅ (URL参数) | ✅ (UI选择) |
| 分片上传 | ✅ | ✅ |
| 上传进度显示 | ✅ | ✅ |
| 断点续传 | ✅ | ✅ |

## 常见问题

### Q1: 需要修改后端代码吗？

**A:** 如果后端已经支持统一的 `/api/update/upload` 接口，则无需修改。只需确保接口接受 `AppName` 和 `Force` 参数。

### Q2: v1.x 配置是否还能使用？

**A:** 是的，完全兼容。但推荐使用新的配置方式以获得更好的用户体验。

### Q3: 如何禁用应用选择器？

**A:** 设置 `showAppSelector={false}` 或指定 `fileType` 属性。

### Q4: 强制覆盖在哪里设置？

**v1.x:** URL 参数 `Force=true`
**v2.0:** UI 界面选择（快速上传）或组件 Props（分片上传）

### Q5: 分片上传是否受影响？

**A:** 不受影响。分片上传使用独立的接口，功能保持不变。

## 测试清单

迁移后请测试以下功能：

- [ ] PDA客户端分片上传
- [ ] 打印客户端分片上传
- [ ] 快速上传 - 选择PDA
- [ ] 快速上传 - 选择打印客户端
- [ ] 强制覆盖功能
- [ ] 保留已存在文件功能
- [ ] 上传进度显示
- [ ] 上传取消功能
- [ ] 文件列表刷新

## 回滚方案

如果需要回滚到 v1.x：

1. 恢复旧的组件代码
2. 恢复 URL 中的查询参数
3. 移除 `showAppSelector` 属性

```tsx
// 回滚配置示例
<ClientImport
    onAfterSubmit={onRefresh}
    title="上传PDA客户端"
    fileType='PdaApk'
    uploadUrl={`/api/update/upload?AppName=PdaApk&Force=true`}
/>
```

## 技术支持

如有问题，请参考：
- [README.md](./README.md) - 功能说明
- [EXAMPLES.md](./EXAMPLES.md) - 使用示例
- 提交 Issue 到项目仓库