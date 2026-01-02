# Formily 选择器字段配置规范

## 概述

本规范定义了在项目中使用 Formily 框架配置选择器字段时的标准格式和最佳实践，确保代码的一致性、可维护性和用户体验。

## 核心原则

1. **统一格式**：所有选择器字段必须使用标准的 `{value, label}` 格式
2. **命名规范**：字段名必须遵循 `{value:codeField,label:nameField}` 模式
3. **数据转换**：前端显示格式与后端存储格式的双向转换
4. **组件复用**：优先使用项目现有的选择器组件

## 字段配置规范

### 1. Schema 字段定义

#### 标准格式
```typescript
"{value:fieldCode,label:fieldName}": {
  "type": "string",
  "title": "字段显示名称",
  "x-decorator": "FormItem",
  "x-component": "CustomSelectComponent",
  "x-validator": [
    {
      "required": true,
      "message": "请选择字段"
    }
  ],
  "x-component-props": {
    "labelInValue": true
  },
  "x-decorator-props": {},
  "name": "{value:fieldCode,label:fieldName}",
  "x-designable-id": "uniqueId",
  "x-index": 0
}
```

#### 字段命名规则
- **格式**：`{value:codeField,label:nameField}`
- **value 字段**：通常以 `Code` 结尾，存储编码值
- **label 字段**：通常以 `Name` 结尾，存储显示名称
- **示例**：
  - `{value:lineCode,label:lineName}` - 线体选择
  - `{value:departCode,label:departName}` - 部门选择
  - `{value:workTeamCode,label:workTeamName}` - 班组选择

### 2. 组件属性配置

#### 必需属性
```typescript
"x-component-props": {
  "labelInValue": true  // 启用 {value, label} 格式
}
```

#### 可选属性
```typescript
"x-component-props": {
  "labelInValue": true,
  "placeholder": "请选择...",
  "showSearch": true,
  "filterOption": false,
  "allowClear": true
}
```

### 3. 数据处理规范

#### 自动数据转换
使用 `{value:fieldCode,label:fieldName}` 格式的字段，Formily 会自动处理数据转换：
- **提交时**：自动将复合字段拆分为 `fieldCode` 和 `fieldName` 两个独立字段
- **显示时**：组件显示 `fieldName`（label），实际提交 `fieldCode`（value）

**注意**：无需手动编写提交时的数据转换逻辑，Formily 框架会自动处理。

#### 数据回填时的格式转换
```typescript
// 在 onFormInit 回调中
if (configInfo.fieldCode && configInfo.fieldName) {
  configInfo['{value:fieldCode,label:fieldName}'] = {
    value: configInfo.fieldCode,
    label: configInfo.fieldName
  };
}
```

## 组件选择指南

### 1. 优先级顺序
1. **项目现有组件**：如 `WorkLineSelect`、`DeptSelect`、`WorkTeamSelect`
2. **通用组件**：如 `PublicSelect`、`DialogSelect`
3. **标准组件**：如 `Select` + 动态数据源

### 2. 现有组件列表
| 组件名 | 用途 | 数据源接口 |
|--------|------|------------|
| `WorkLineSelect` | 线体选择 | `WorkLineGetListAsync` |
| `DeptSelect` | 部门选择 | `DepartGetListAsync` |
| `WorkTeamSelect` | 班组选择 | `WorkTeamGetListAsync` |
| `WorkProcedureSelect` | 工序选择 | `WorkProcedureGetListAsync` |
| `EquipmentAssetSelect` | 设备选择 | `EquipmentAssetGetListAsync` |

### 3. 组件要求
- 必须支持 `labelInValue` 属性
- 必须返回 `{value, label}` 格式的数据
- 建议支持搜索和分页功能

## 完整示例

### 示例1：线体选择字段

#### Schema 配置
```typescript
"{value:lineCode,label:lineName}": {
  "type": "string",
  "title": "线体编码",
  "x-decorator": "FormItem",
  "x-component": "WorkLineSelect",
  "x-validator": [
    {
      "required": true,
      "message": "请选择线体编码"
    }
  ],
  "x-component-props": {
    "labelInValue": true
  },
  "name": "{value:lineCode,label:lineName}"
}
```

#### 数据处理
```typescript
// 提交时：无需手动转换，Formily 自动处理
// 表单会自动将 {value:lineCode,label:lineName} 拆分为 lineCode 和 lineName 字段

// 回填时转换
if (configInfo.lineCode && configInfo.lineName) {
  configInfo['{value:lineCode,label:lineName}'] = {
    value: configInfo.lineCode,
    label: configInfo.lineName
  };
}
```

### 示例2：部门选择字段

#### Schema 配置
```typescript
"{value:departCode,label:departName}": {
  "type": "string",
  "title": "部门信息",
  "x-decorator": "FormItem",
  "x-component": "DeptSelect",
  "x-component-props": {
    "labelInValue": true
  },
  "name": "{value:departCode,label:departName}"
}
```

## 验证清单

### 开发阶段
- [ ] 字段名遵循 `{value:code,label:name}` 格式
- [ ] 设置 `labelInValue: true` 属性
- [ ] 实现数据提交时的格式转换
- [ ] 实现数据回填时的格式转换
- [ ] 添加适当的表单验证

### 测试阶段
- [ ] 新建记录时选择器正常工作
- [ ] 编辑记录时数据正确回填
- [ ] 表单验证按预期工作
- [ ] 提交的数据格式正确
- [ ] 后端能正确接收和处理数据

## 常见问题

### Q1: 为什么要使用复合字段名？
A: 复合字段名 `{value:code,label:name}` 是 Formily 的标准模式，能够：
- 明确表示字段的数据结构
- 避免字段名冲突
- 提供更好的类型推断

### Q2: 如何处理嵌套对象中的选择器字段？
A: 对于数组或嵌套对象中的选择器字段，Formily 同样会自动处理转换。只需要在数据回填时进行格式转换：
```typescript
// 回填时转换（编辑场景）
if (configInfo.items && Array.isArray(configInfo.items)) {
  configInfo.items = configInfo.items.map(item => {
    if (item.fieldCode && item.fieldName) {
      item['{value:fieldCode,label:fieldName}'] = {
        value: item.fieldCode,
        label: item.fieldName
      };
    }
    return item;
  });
}
```

### Q3: 为什么不需要手动编写提交时的数据转换代码？
A: Formily 框架的 `{value:fieldCode,label:fieldName}` 格式具有内置的自动转换机制：
- **提交时**：自动将复合字段拆分为独立的 `fieldCode` 和 `fieldName` 字段
- **显示时**：组件显示 `fieldName`，实际值为 `fieldCode`
- **类型安全**：框架确保数据格式的正确性
- **性能优化**：避免了手动转换的性能开销

### Q4: 如何创建新的选择器组件？
A: 参考现有组件（如 `WorkLineSelect`），确保：
- 支持 `labelInValue` 属性
- 返回 `{value, label}` 格式
- 实现搜索和分页功能
- 遵循项目的组件开发规范

## 更新记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2024-01-XX | 初始版本，定义基本规范 |
| 1.1.0 | 2024-01-XX | 优化规范，明确 Formily 自动转换机制，移除手动转换代码 |

---

**注意**：本规范是强制性的，所有新开发的选择器字段都必须遵循此规范。对于现有的不符合规范的字段，应在适当的时机进行重构。
