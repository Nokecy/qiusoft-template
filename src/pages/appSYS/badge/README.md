# Badge通知系统

基于SignalR实时推送的Badge通知系统，支持多服务Badge管理、自动重连、降级轮询等功能。

## 📁 目录结构

```
src/pages/appSYS/badge/
├── components/              # UI组件
│   ├── BadgeIcon.tsx       # 顶部导航栏图标组件
│   ├── BadgeDropdown.tsx   # 下拉菜单组件
│   └── index.ts            # 组件导出
├── models/                  # 状态管理
│   └── badge.ts            # UmiJS Model
├── services/                # 服务层
│   ├── badgeHub.ts         # SignalR Hub连接管理
│   └── badgeUtils.ts       # 工具函数
└── README.md               # 本文档
```

## 🚀 快速开始

### 1. 在Layout中集成BadgeIcon

```tsx
import { BadgeIcon } from '@/pages/appSYS/badge/components';
import { useModel } from 'umi';

export default function Layout() {
    const { initialState } = useModel('@@initialState');

    // 获取API基础URL（根据项目配置调整）
    const apiBaseUrl = API_BASE_URL || 'https://your-api-domain';

    // 获取Token函数
    const getToken = () => {
        return initialState?.currentUser?.token;
    };

    return (
        <div>
            <Header>
                {/* 其他导航栏内容 */}
                <BadgeIcon
                    apiBaseUrl={apiBaseUrl}
                    getToken={getToken}
                />
            </Header>
            <Content>{children}</Content>
        </div>
    );
}
```

### 2. 在其他组件中使用Badge数据

```tsx
import { useModel } from 'umi';

export default function MyComponent() {
    const { totalCount, badges, details } = useModel('appSYS.badge.models.badge');

    return (
        <div>
            <p>总通知数：{totalCount}</p>
            <p>待办任务：{badges['todo'] || 0}</p>
        </div>
    );
}
```

## 🔧 核心功能

### SignalR实时推送

- ✅ 自动建立WebSocket连接
- ✅ 实时接收Badge更新事件
- ✅ 自动重连（指数退避：1s→2s→4s→8s→16s→30s）
- ✅ 连接状态监控

### 降级策略

当SignalR连接失败时，自动启用30秒轮询REST API：

```typescript
// 自动降级，无需手动配置
// 连接失败 → 启动轮询
// 连接成功 → 停止轮询
```

### 缓存机制

- Badge摘要数据缓存60秒
- SignalR更新时自动清除缓存
- 减少API请求次数

### 性能优化

- Badge更新事件使用300ms防抖
- 组件卸载时自动清理连接
- 支持多标签页同步（可选）

## 📊 API方法

### Badge Model方法

```typescript
const {
    // 状态
    totalCount,              // 总Badge数量
    badges,                  // 按服务分组的Badge
    details,                 // Badge详细信息
    isConnected,             // 是否已连接
    isConnecting,            // 是否连接中
    error,                   // 错误信息

    // 方法
    initializeConnection,    // 初始化连接
    loadSummary,            // 加载摘要
    clearServiceBadge,      // 清除指定服务
    clearAllBadges,         // 清除所有Badge
    disconnect,             // 断开连接
} = useModel('appSYS.badge.models.badge');
```

### 使用示例

```typescript
// 清除指定服务的Badge
await clearServiceBadge('todo');

// 清除所有Badge
await clearAllBadges();

// 手动刷新数据
await loadSummary();
```

## 🎨 UI组件Props

### BadgeIcon

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| apiBaseUrl | string | ✅ | API基础URL |
| getToken | () => string \| undefined | ✅ | 获取Token函数 |
| style | React.CSSProperties | ❌ | 自定义样式 |
| className | string | ❌ | 自定义类名 |

### BadgeDropdown

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| totalCount | number | ✅ | 总Badge数量 |
| details | BadgeDetail[] | ✅ | Badge详情列表 |
| onClearService | (serviceId: string) => Promise<void> | ✅ | 清除服务回调 |
| onClearAll | () => Promise<void> | ✅ | 清除所有回调 |

## 🔐 权限配置

如需使用清除缓存等管理功能，需要配置权限：

```typescript
// _permissions/index.ts
export const Badge = {
    View: 'Badge.View',
    ClearCache: 'Badge.ClearCache'
};
```

## 🐛 故障排除

### SignalR连接失败

**症状**：控制台显示401/403错误

**解决**：
1. 检查Token是否有效
2. 确认后端SignalR Hub路径正确
3. 检查CORS配置

### Badge不更新

**症状**：连接正常但收不到事件

**解决**：
1. 检查后端是否正确发布事件
2. 查看浏览器控制台日志
3. 确认UserId匹配

### 内存泄漏

**症状**：页面卡顿，内存持续增长

**解决**：
1. 确保组件卸载时调用disconnect
2. 检查useEffect依赖数组
3. 使用Chrome DevTools Memory分析

## 📝 环境变量配置

建议在`.env`文件中配置API地址：

```env
# .env.development
API_BASE_URL=http://localhost:5000

# .env.production
API_BASE_URL=https://api.your-domain.com
```

## 🔄 更新日志

### v1.0.0 (2025-01-01)

- ✅ SignalR实时推送
- ✅ 自动重连机制
- ✅ 降级轮询策略
- ✅ Badge UI组件
- ✅ 缓存优化
- ✅ 错误处理

## 📚 相关文档

- [后端集成文档](D:/Develop/NetCore/Burn.Abp/modules/microservice-shared/Burn.Abp.System.Shared.Host/FRONTEND_INTEGRATION.md)
- [SignalR文档](https://docs.microsoft.com/aspnet/core/signalr)
- [UmiJS文档](https://umijs.org)
