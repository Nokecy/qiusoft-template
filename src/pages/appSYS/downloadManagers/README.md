# 下载管理页面

## 功能概述

下载管理页面提供客户端文件的上传和下载管理功能：
- **统一上传**: 支持动态选择应用类型（PDA客户端 / 打印客户端）
- **智能控制**: 可选择是否强制覆盖已存在文件
- **文件管理**: 查看、下载客户端文件

## 🆕 v2.1 更新说明

### 简化用户体验
- ✅ **统一上传入口**: 合并所有上传功能到一个按钮
- ✅ **智能应用选择**: 动态选择应用类型，无需多个按钮
- ✅ **简洁界面**: 移除冗余按钮，提升用户体验
- ✅ **灵活配置**: 支持强制覆盖选项

### 后端接口统一
- ✅ **统一上传接口**: Android 和 Windows 客户端使用统一的 `/api/update/upload` 接口
- ✅ **参数标准化**: 通过 `AppName` 参数区分应用类型（PdaApk / PrinterClient）
- ✅ **强制覆盖控制**: 通过 `Force` 参数控制是否覆盖已存在文件

## 核心功能

### 统一上传 (ClientImport)

#### 特性
- ✅ 统一上传入口，简化操作流程
- ✅ 动态选择应用类型（PDA客户端 / 打印客户端）
- ✅ 灵活的强制覆盖选项
- ✅ 智能提示上传目标
- ✅ 完整的错误处理
- ✅ 拖拽上传支持

#### 使用方式

```tsx
<ClientImport
    onAfterSubmit={onRefresh}
    title="上传客户端"
    uploadUrl={`/api/update/upload`}
    showAppSelector={true}
/>
```

#### Props说明
```typescript
interface ClientImportProps {
    onAfterSubmit?: (response?: any) => void;  // 上传完成回调
    title?: string;                            // 按钮文案
    uploadUrl: string;                         // 上传接口
    showAppSelector?: boolean;                 // 是否显示应用选择器（默认true）
    fileType?: 'PdaApk' | 'PrinterClient';     // 固定应用类型（可选）
    icon?: React.ReactNode;                    // 自定义图标
    method?: 'POST' | 'PUT';                   // 请求方法（默认POST）
}
```

#### 上传界面
1. **应用类型选择**:
   - PDA客户端 (Android)
   - 打印客户端 (Windows)

2. **强制覆盖选择**:
   - 是（覆盖已存在的文件）
   - 否（保留已存在的文件）

3. **文件上传区**:
   - 拖拽上传
   - 点击选择文件
   - 实时进度显示

### 文件列表

#### 列定义
- **文件名称**: 点击可查看下载链接二维码
- **当前版本**: 显示客户端版本号
- **最后修改时间**: 文件最后更新时间
- **操作**: 下载按钮

#### 下载功能
- 点击下载按钮触发文件下载
- 支持通过文件名生成下载链接二维码

## 组件说明

### ChunkUpload 组件

**Props:**
```typescript
interface ChunkUploadProps {
    onAfterSubmit?: (response?: any) => void;  // 上传完成回调
    title?: string;                            // 对话框标题
    fileType: 'PdaApk' | 'PrinterClient';      // 文件类型
    appName: string;                           // 应用名称
    force?: boolean;                           // 是否强制覆盖
    chunkSize?: number;                        // 分片大小（字节）
}
```

**状态管理:**
- `uploadProgress`: 上传进度信息
  - `percent`: 百分比进度
  - `status`: 上传状态
  - `uploadedChunks`: 已上传分片数
  - `totalChunks`: 总分片数
  - `speed`: 上传速度

### ClientImport 组件

**Props:**
```typescript
interface ClientImportProps {
    onAfterSubmit?: (response?: any) => void;
    title?: string;
    uploadUrl: string;
    fileType?: 'PdaApk' | 'PrinterClient';
    id?: string;
    icon?: React.ReactNode;
    method?: 'POST' | 'PUT';
    onRealSuccess?: (response?: any) => void;
}
```

## 技术实现

### 分片上传技术
1. **文件分片**: 使用 `File.slice()` 方法
2. **哈希计算**: 使用 Web Crypto API 的 SHA-256
3. **进度追踪**: 实时计算上传速度和剩余时间
4. **取消机制**: 使用 ref 控制上传流程

### 安全性
- SHA-256 哈希验证分片完整性
- 支持强制覆盖标记
- 完整的错误处理和用户提示

## API 依赖

### Update 服务
- `UpdateGetListAsync`: 获取客户端列表
- `UpdateChunkUploadAsync`: 分片上传
- `UpdateCancelChunkUploadAsync`: 取消上传
- `UpdateGetChunkUploadProgressAsync`: 查询进度
- `UpdateUploadFileAsync`: 快速上传

## 最佳实践

### 选择上传方式
1. **使用分片上传**：
   - 文件大小 > 10MB
   - 网络不稳定
   - 需要断点续传

2. **使用快速上传**：
   - 文件大小 < 10MB
   - 网络稳定
   - 追求上传速度

### 性能优化
- 默认分片大小为 5MB，可根据网络情况调整
- 使用 SHA-256 而非 MD5，安全性更高
- 实时显示上传速度，提升用户体验

## 常见问题

### Q: 分片上传失败怎么办？
A: 系统会自动捕获错误并显示提示，可以重新上传。后续可支持断点续传。

### Q: 如何调整分片大小？
A: 修改 `ChunkUpload` 组件的 `chunkSize` prop，单位为字节。

### Q: 是否支持并发上传？
A: 当前版本采用串行上传，确保稳定性。后续可扩展并发上传能力。

## 接口变更说明

### v2.0 统一接口

**旧版本（v1.x）:**
```
POST /api/update/upload?AppName=PdaApk&Force=true
POST /api/update/upload?AppName=PrinterClient&Force=true
```

**新版本（v2.0）:**
```
POST /api/update/upload?AppName={PdaApk|PrinterClient}&Force={true|false}
```

**参数说明:**
- `AppName`: 应用类型标识
  - `PdaApk`: PDA客户端（Android）
  - `PrinterClient`: 打印客户端（Windows）
- `Force`: 是否强制覆盖
  - `true`: 覆盖已存在的文件
  - `false`: 保留已存在的文件

## 页面布局

### 工具栏按钮配置

```tsx
toolBarRender={() => [
    <ClientImport
        key="quick-upload"
        onAfterSubmit={onRefresh}
        title="上传客户端"
        uploadUrl={`/api/update/upload`}
        showAppSelector={true}
    />
]}
```

## 使用场景

### 场景1: 上传PDA客户端
1. 点击"上传客户端"按钮
2. 选择应用类型：PDA客户端 (Android)
3. 选择强制覆盖策略
4. 拖拽或选择APK文件上传
5. 等待上传完成，自动刷新列表

### 场景2: 上传打印客户端
1. 点击"上传客户端"按钮
2. 选择应用类型：打印客户端 (Windows)
3. 选择强制覆盖策略
4. 拖拽或选择EXE文件上传
5. 等待上传完成，自动刷新列表

### 场景3: 更新已存在的客户端
1. 点击"上传客户端"按钮
2. 选择对应的应用类型
3. 选择"是"强制覆盖
4. 上传新版本文件
5. 系统自动覆盖旧版本

## 更新日志

### v2.0.0 (2025-10-01)
- ✅ **后端接口统一**: 合并 Android 和 Windows 上传接口
- ✅ **动态应用选择**: 快速上传支持选择应用类型
- ✅ **强制覆盖控制**: 可选择是否覆盖已存在文件
- ✅ **智能提示**: 上传时显示目标应用信息
- ✅ **React Key优化**: 避免组件渲染问题
- ✅ **代码注释完善**: 添加详细的功能说明

### v1.0.0 (2025-09-30)
- ✅ 新增分片上传功能
- ✅ 优化快速上传组件
- ✅ 添加完整的类型定义
- ✅ 改进错误处理
- ✅ 优化代码规范