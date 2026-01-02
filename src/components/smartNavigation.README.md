# SmartNavigation 智能导航组件

专为 UmiJS KeepAlive 多tab环境设计的智能导航组件。

## 🚀 快速使用

```tsx
import { useSmartNavigation } from '@/components/smartNavigation';

const MyComponent = () => {
  const smartNavigate = useSmartNavigation();

  const handleEdit = (id: string) => {
    smartNavigate({
      targetPath: '/form',
      newParams: { id },
      debug: true // 开发阶段启用调试
    });
  };

  return <Button onClick={() => handleEdit('123')}>编辑</Button>;
};
```

## ✨ 核心特性

- 🎯 智能tab检测，避免重复创建
- ⚡ 参数冲突检测，提示用户确认
- 🔄 KeepAlive缓存自动更新
- 🎨 自定义确认对话框
- 🐛 内置调试模式

## 📖 配置参数

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `targetPath` | `string` | ✅ | - | 目标路径 |
| `newParams` | `Record<string, any>` | ❌ | `{}` | 新的参数对象 |
| `confirmTitle` | `string` | ❌ | `'切换编辑记录确认'` | 确认对话框标题 |
| `confirmContent` | `string` | ❌ | - | 确认对话框内容，支持 `{currentId}` `{newId}` |
| `okText` | `string` | ❌ | `'是，切换'` | 确认按钮文本 |
| `cancelText` | `string` | ❌ | `'否，取消'` | 取消按钮文本 |
| `debug` | `boolean` | ❌ | `false` | 是否启用调试日志 |

## 🔧 表单页面配置

表单组件需要添加URL参数监听：

```tsx
const previousIdRef = React.useRef(id);

useEffect(() => {
  const currentQuery = parse(location.search.substring(1));
  const currentId = currentQuery?.id;
  const previousId = previousIdRef.current;
  
  if (currentId && currentId !== previousId) {
    previousIdRef.current = currentId;
    // 重新加载数据
    loadData(currentId);
  }
}, [location.search]);
```

## 📚 详细文档

查看完整文档: [smartNavigation使用文档.md](../../docs/smartNavigation使用文档.md)