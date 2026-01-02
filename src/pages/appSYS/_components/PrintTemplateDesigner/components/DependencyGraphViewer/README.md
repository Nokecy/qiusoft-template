# DependencyGraphViewer 组件

数据源依赖关系图可视化查看器,支持自动布局和循环依赖检测。

## 功能特性

- ✅ 可视化展示数据源依赖关系图
- ✅ 使用 @ant-design/charts (G6) 实现节点和边的渲染
- ✅ 支持自动布局 (分层布局算法)
- ✅ 高亮循环依赖路径
- ✅ 显示数据源执行顺序 (层级)
- ✅ 支持节点点击查看详情
- ✅ 支持图形缩放和拖拽
- ✅ 循环依赖路径展示

## 使用示例

### 基础用法

```tsx
import { DependencyGraphViewer } from '@/pages/appSYS/components/PrintTemplateDesigner/components/DependencyGraphViewer';
import { useTemplateState } from '@/pages/appSYS/components/PrintTemplateDesigner/hooks/useTemplateState';

function MyComponent() {
  const {
    dependencyGraph,
    getDataSourceExecutionOrder,
  } = useTemplateState();

  const executionOrderResult = getDataSourceExecutionOrder();

  return (
    <DependencyGraphViewer
      dependencyGraph={dependencyGraph}
      executionOrder={executionOrderResult.layers}
    />
  );
}
```

### 自定义高度

```tsx
<DependencyGraphViewer
  dependencyGraph={dependencyGraph}
  executionOrder={executionOrder}
  height={800}
/>
```

### 节点点击事件

```tsx
<DependencyGraphViewer
  dependencyGraph={dependencyGraph}
  executionOrder={executionOrder}
  onNodeClick={(nodeId) => {
    console.log('点击了数据源:', nodeId);
    // 跳转到数据源详情或执行其他操作
  }}
/>
```

## API

### DependencyGraphViewerProps

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| dependencyGraph | 依赖关系图数据 | `DependencyGraph \| null` | - | ✅ |
| executionOrder | 数据源执行顺序(层级化数组) | `string[][]` | - | ❌ |
| loading | 是否显示加载状态 | `boolean` | `false` | ❌ |
| className | 自定义类名 | `string` | - | ❌ |
| style | 自定义样式 | `React.CSSProperties` | - | ❌ |
| height | 图表高度 | `number` | `500` | ❌ |
| onNodeClick | 节点点击回调 | `(nodeId: string) => void` | - | ❌ |

## 依赖图数据结构

### DependencyGraph

```typescript
interface DependencyGraph {
  nodes: DependencyNode[];
  edges: DependencyEdge[];
}

interface DependencyNode {
  id: string;
  metadata?: {
    hasCyclicDependency?: boolean;
    [key: string]: any;
  };
}

interface DependencyEdge {
  from: string;
  to: string;
  metadata?: {
    isCyclic?: boolean;
    [key: string]: any;
  };
}
```

### 执行顺序

执行顺序是一个二维数组,每个子数组代表一个层级:

```typescript
// 示例
const executionOrder = [
  ['dataSource1'],           // Layer 1: 无依赖的数据源
  ['dataSource2', 'dataSource3'],  // Layer 2: 依赖 Layer 1 的数据源
  ['dataSource4'],           // Layer 3: 依赖 Layer 2 的数据源
];
```

## 可视化规则

### 节点样式

- **正常节点**: 蓝色边框 + 浅蓝色填充
- **循环依赖节点**: 红色边框 + 浅红色填充
- **节点大小**: 120x40 像素
- **节点形状**: 矩形

### 边样式

- **正常依赖边**: 蓝色实线 + 箭头
- **循环依赖边**: 红色虚线 + 箭头

### 布局算法

使用 G6 的 compactBox 布局算法,特点:

- **方向**: 从上到下 (TB)
- **层级间距**: 50px
- **节点间距**: 50px
- **自动适应**: 根据容器大小自动调整

## 循环依赖检测

组件会自动检测依赖图中的循环依赖,并通过以下方式展示:

1. **错误警告**: 在图表上方显示 Alert 组件,列出所有循环依赖路径
2. **节点高亮**: 参与循环依赖的节点使用红色边框和填充
3. **边高亮**: 循环依赖的边使用红色虚线

### 循环依赖示例

```
数据源A → 数据源B → 数据源C → 数据源A
```

这种情况会被检测为循环依赖,组件会显示:

```
循环 1: 数据源A → 数据源B → 数据源C → 数据源A
```

## 执行顺序展示

如果提供了 `executionOrder` 属性,组件会在图表上方展示数据源的执行顺序:

```
执行顺序 (按层级):
Layer 1: [数据源A] [数据源B]
Layer 2: [数据源C]
Layer 3: [数据源D] [数据源E]
```

## 交互功能

- ✅ **节点拖拽**: 可以拖拽节点调整位置
- ✅ **画布缩放**: 使用鼠标滚轮缩放画布
- ✅ **画布平移**: 拖拽空白区域平移画布
- ✅ **节点点击**: 点击节点触发回调事件
- ✅ **自动适应**: 自动适应容器大小

## 性能优化

- ✅ 使用 `useMemo` 缓存图数据转换结果
- ✅ 使用 `useCallback` 优化事件处理函数
- ✅ 循环依赖检测结果缓存
- ✅ 图表配置缓存

## 注意事项

1. **依赖图数据**: 必须提供有效的 `DependencyGraph` 数据,否则显示空状态
2. **循环依赖**: 循环依赖会导致数据源执行失败,必须解决
3. **节点数量**: 节点数量过多时,建议增加 `height` 以改善可视化效果
4. **浏览器兼容性**: 依赖 Canvas API,需要现代浏览器支持

## 相关组件

- [ParameterEditor](../ParameterEditor/README.md) - 模板参数编辑器
- [ParameterMappingEditor](../ParameterMappingEditor/README.md) - 参数映射配置编辑器

## 依赖项

此组件依赖以下第三方库:

- `@ant-design/charts`: 图表可视化库 (已安装)
- `antd`: UI 组件库

## 更新日志

### v1.0.0 (2024-10-18)
- ✅ 初始版本发布
- ✅ 支持依赖关系图可视化
- ✅ 循环依赖检测和高亮
- ✅ 执行顺序展示
- ✅ 节点点击事件
