# PropertyBinding 示例模板库

本目录包含展示 PropertyBinding 系统各种功能的示例模板。

## 示例列表

### 1. 基础文本标签 (basicTextLabel.ts)
- 静态文本
- 数据路径绑定
- 表达式计算
- 适合：初学者

### 2. 动态条码标签 (dynamicBarcode.ts)
- 条码内容绑定
- 字符串函数
- 日期格式化
- 适合：初学者

### 3. 表格数据展示 (tableData.ts)
- 表格数据源
- 数组迭代
- 小计计算
- 适合：中级

### 4. 条件显示控制 (conditionalDisplay.ts)
- visible属性控制
- 条件表达式
- 状态显示
- 适合：中级

### 5. 格式化输出 (formattedOutput.ts)
- 日期/数值/字符串格式化
- 自定义格式模板
- 适合：高级

## 使用方法

```typescript
import { basicTextLabelExample } from './examples/basicTextLabel';

// 在设计器中加载示例
designer.loadTemplate(basicTextLabelExample);
```

## 示例数据结构

所有示例都包含完整的数据源配置和元素定义，可以直接用于测试和学习。
