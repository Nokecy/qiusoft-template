# SmartNavigation 智能导航组件使用文档

## 📚 概述

SmartNavigation 是专为 UmiJS KeepAlive 多tab环境设计的智能导航组件，解决了多tab项目中页面切换、参数冲突检测和表单数据刷新等问题。

## ✨ 核心特性

- 🎯 **智能tab检测** - 自动检测已打开的表单tab，避免重复创建
- ⚡ **参数冲突检测** - 当相同页面参数不同时，提示用户确认切换
- 🔄 **KeepAlive缓存更新** - 自动更新tab的location信息，保持URL同步
- 🎨 **自定义确认对话框** - 支持自定义标题、内容、按钮文本
- 🐛 **调试模式** - 内置详细日志，便于开发调试
- 📱 **响应式设计** - 适配不同屏幕尺寸和设备

## 🚀 快速开始

### 基础安装
组件已内置在项目中，无需额外安装。

### 导入组件
```tsx
import { useSmartNavigation } from '@/components/smartNavigation';
```

## 📖 API 参考

### useSmartNavigation()

智能导航的主要Hook，返回配置化的smartNavigate函数。

```tsx
const smartNavigate = useSmartNavigation();
```

### SmartNavigationConfig 接口

```tsx
interface SmartNavigationConfig {
  /** 目标路径 */
  targetPath: string;
  /** 新的参数对象 */
  newParams?: Record<string, any>;
  /** 确认对话框标题 */
  confirmTitle?: string;
  /** 确认对话框内容模板，支持变量：{currentId}、{newId} */
  confirmContent?: string;
  /** 确认按钮文本 */
  okText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 是否启用调试日志 */
  debug?: boolean;
}
```

### 默认配置

```tsx
const defaultConfig = {
  confirmTitle: '切换编辑记录确认',
  confirmContent: '检测到已有该表单页面打开编辑记录 {currentId}，是否要切换到编辑记录 {newId}？',
  okText: '是，切换',
  cancelText: '否，取消',
  debug: false
};
```

## 💡 使用示例

### 示例1: 基础使用
```tsx
import React from 'react';
import { Button } from 'antd';
import { useSmartNavigation } from '@/components/smartNavigation';
import { EditOutlined } from '@ant-design/icons';

const ProductList = () => {
  const smartNavigate = useSmartNavigation();

  const handleEdit = (productId: string) => {
    smartNavigate({
      targetPath: '/product/form',
      newParams: { id: productId },
      debug: true // 开发阶段启用调试
    });
  };

  return (
    <Button 
      icon={<EditOutlined />} 
      onClick={() => handleEdit('product-123')}
    >
      编辑产品
    </Button>
  );
};
```

### 示例2: 自定义确认对话框
```tsx
import React from 'react';
import { useSmartNavigation } from '@/components/smartNavigation';

const OrderList = () => {
  const smartNavigate = useSmartNavigation();

  const handleEditOrder = (orderId: string) => {
    smartNavigate({
      targetPath: '/order/edit',
      newParams: { orderId },
      confirmTitle: '订单切换确认',
      confirmContent: '您正在编辑订单 {currentId}，确定要切换到订单 {newId} 吗？',
      okText: '确定切换',
      cancelText: '继续编辑当前订单',
      debug: process.env.NODE_ENV === 'development'
    });
  };

  return (
    // 组件内容...
  );
};
```

### 示例3: 列表页面集成
```tsx
import React from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { useSmartNavigation } from '@/components/smartNavigation';

const UserGrid = () => {
  const smartNavigate = useSmartNavigation();

  // 工具栏创建按钮
  const handleCreate = () => {
    smartNavigate({
      targetPath: '/user/form',
      newParams: {}, // 创建模式不需要ID
      debug: true
    });
  };

  // 编辑按钮渲染器
  const EditButton = ({ data }: any) => (
    <Button 
      type="link" 
      onClick={() => smartNavigate({
        targetPath: '/user/form',
        newParams: { id: data.id },
        confirmContent: '当前正在编辑用户 {currentId}，是否切换到用户 {newId}？'
      })}
    >
      编辑
    </Button>
  );

  return (
    <AgGridPlus
      toolBarRender={() => [
        <Button key="create" type="primary" onClick={handleCreate}>
          新建用户
        </Button>
      ]}
      // 列定义...
    />
  );
};
```

### 示例4: 表单页面配置
配合智能导航，表单页面需要添加URL参数监听：

```tsx
import React, { useEffect } from 'react';
import { useLocation } from 'umi';
import { parse } from 'querystring';
import { Form } from '@formily/antd-v5';

const UserForm = () => {
  const location = useLocation();
  const query = parse(location.search.substring(1));
  const id = query?.id;
  
  // 存储上一次的ID，避免无效重复加载
  const previousIdRef = React.useRef(id);

  // 监听URL参数变化，重新加载数据（KeepAlive模式必需）
  useEffect(() => {
    const currentQuery = parse(location.search.substring(1));
    const currentId = currentQuery?.id;
    const previousId = previousIdRef.current;
    
    console.log('URL参数变化检测:', { 
      previousId, 
      currentId,
      needReload: currentId && currentId !== previousId
    });
    
    if (currentId && currentId !== previousId) {
      console.log('检测到ID参数变化，重新加载数据');
      previousIdRef.current = currentId;
      
      // 重新加载表单数据
      loadUserData(currentId).then(userData => {
        form.reset();
        form.setInitialValues(userData);
        form.setValues(userData);
      });
    } else if (!currentId && previousId) {
      // 从编辑模式切换到创建模式
      console.log('切换到创建模式，清空表单');
      previousIdRef.current = undefined;
      form.reset();
    } else if (currentId) {
      // 更新引用值，即使没有重新加载
      previousIdRef.current = currentId;
    }
  }, [location.search]);

  return (
    <Form form={form}>
      {/* 表单内容... */}
    </Form>
  );
};
```

## 🔧 高级配置

### 条件性导航
```tsx
const handleConditionalEdit = (item: any) => {
  // 根据业务逻辑决定是否使用智能导航
  if (item.status === 'editing') {
    smartNavigate({
      targetPath: '/item/form',
      newParams: { id: item.id },
      confirmContent: '该项目正在被其他用户编辑，确定要接管编辑权限吗？',
    });
  } else {
    // 直接跳转，不需要确认
    history.push(`/item/form?id=${item.id}`);
  }
};
```

### 批量操作集成
```tsx
const BatchEditButton = ({ selectedItems }: any) => {
  const smartNavigate = useSmartNavigation();
  
  const handleBatchEdit = () => {
    const ids = selectedItems.map(item => item.id).join(',');
    
    smartNavigate({
      targetPath: '/batch/edit',
      newParams: { ids },
      confirmTitle: '批量编辑确认',
      confirmContent: '检测到批量编辑页面已打开，是否切换到新的批量编辑任务？',
    });
  };

  return (
    <Button 
      disabled={selectedItems.length === 0}
      onClick={handleBatchEdit}
    >
      批量编辑 ({selectedItems.length})
    </Button>
  );
};
```

## 📋 最佳实践

### 1. 调试模式使用
```tsx
// 开发环境启用调试，生产环境关闭
const smartNavigate = useSmartNavigation();

const handleEdit = (id: string) => {
  smartNavigate({
    targetPath: '/edit',
    newParams: { id },
    debug: process.env.NODE_ENV === 'development' // 👍 推荐
  });
};
```

### 2. 错误处理
```tsx
const handleNavigateWithErrorHandling = async (id: string) => {
  try {
    // 可以在导航前进行数据验证
    const isValid = await validateBeforeEdit(id);
    
    if (!isValid) {
      message.error('该记录无法编辑');
      return;
    }

    smartNavigate({
      targetPath: '/form',
      newParams: { id },
    });
  } catch (error) {
    console.error('导航失败:', error);
    message.error('跳转失败，请重试');
  }
};
```

### 3. 权限控制集成
```tsx
import { Access, useAccess } from 'umi';

const EditButton = ({ data }: any) => {
  const access = useAccess();
  const smartNavigate = useSmartNavigation();

  return (
    <Access accessible={access.canEdit}>
      <Button 
        onClick={() => smartNavigate({
          targetPath: '/edit',
          newParams: { id: data.id }
        })}
      >
        编辑
      </Button>
    </Access>
  );
};
```

### 4. 性能优化
```tsx
// 使用 useCallback 缓存导航函数
const handleEdit = useCallback((id: string) => {
  smartNavigate({
    targetPath: '/form',
    newParams: { id },
    debug: false // 生产环境关闭调试
  });
}, [smartNavigate]);
```

## ⚠️ 注意事项

### 1. 表单数据刷新
**❌ 错误的做法：**
```tsx
// 在KeepAlive模式下，这样比较会失败
if (currentId !== id) {
  // 因为 id 不会更新
}
```

**✅ 正确的做法：**
```tsx
// 使用 useRef 存储上一次的值
const previousIdRef = React.useRef(id);

if (currentId !== previousIdRef.current) {
  previousIdRef.current = currentId;
  // 重新加载数据
}
```

### 2. 路径配置
```tsx
// 确保路径配置正确
smartNavigate({
  targetPath: '/appWMS/inInstruction/form', // ✅ 完整路径
  // targetPath: 'form', // ❌ 相对路径可能有问题
  newParams: { id }
});
```

### 3. 参数类型
```tsx
// 确保参数类型正确
smartNavigate({
  targetPath: '/form',
  newParams: { 
    id: String(id), // ✅ 转换为字符串
    // id: id, // ❌ 可能是数字类型
  }
});
```

## 🐛 故障排除

### 问题1: 智能导航不生效
**可能原因：**
- KeepAlive上下文不可用
- 路径配置错误
- 参数格式不正确

**解决方案：**
```tsx
// 启用调试模式查看日志
smartNavigate({
  targetPath: '/form',
  newParams: { id },
  debug: true // 启用调试
});
```

### 问题2: 表单数据不刷新
**可能原因：**
- 没有添加URL参数监听
- 参数比较逻辑错误
- useEffect依赖项配置错误

**解决方案：**
```tsx
// 确保正确的监听配置
useEffect(() => {
  // 监听逻辑...
}, [location.search]); // 确保依赖项正确
```

### 问题3: 确认对话框不显示
**可能原因：**
- 参数相同，不需要确认
- 路径未匹配到已打开的tab
- KeepAlive配置问题

**解决方案：**
```tsx
// 检查控制台日志
smartNavigate({
  targetPath: '/form',
  newParams: { id },
  debug: true // 查看详细日志
});
```

## 📈 版本历史

### v1.0.0 (当前版本)
- ✨ 初始版本发布
- 🎯 智能tab检测功能
- ⚡ 参数冲突检测
- 🔄 KeepAlive缓存更新
- 🎨 自定义确认对话框
- 🐛 调试模式支持

## 🤝 贡献指南

如果你发现bug或有改进建议，请：

1. 在项目中创建issue描述问题
2. 提供复现步骤和环境信息
3. 如果可能，提供修复方案

## 📄 许可证

本组件遵循项目的许可证协议。