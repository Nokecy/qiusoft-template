# Formily 选择器字段最佳实践总结

## 🎯 核心原则

### 1. 利用框架能力
- **充分利用 Formily 的自动转换机制**
- **避免重复造轮子，减少手动代码**
- **遵循框架的设计理念和最佳实践**

### 2. 代码简洁性
- **最小化手动干预**
- **保持代码的可读性和可维护性**
- **减少样板代码和重复逻辑**

### 3. 标准化一致性
- **统一的字段命名格式**
- **一致的组件配置方式**
- **标准化的数据处理流程**

## ✅ 推荐做法

### 字段配置
```typescript
// ✅ 正确的字段配置
"{value:lineCode,label:lineName}": {
  "type": "string",
  "title": "线体编码",
  "x-decorator": "FormItem",
  "x-component": "WorkLineSelect",
  "x-component-props": {
    "labelInValue": true  // 关键配置
  },
  "name": "{value:lineCode,label:lineName}"
}
```

### 数据回填
```typescript
// ✅ 只在编辑时进行回填转换
if (configInfo.lineCode && configInfo.lineName) {
  configInfo['{value:lineCode,label:lineName}'] = {
    value: configInfo.lineCode,
    label: configInfo.lineName
  };
}
```

### 表单提交
```typescript
// ✅ 简洁的提交逻辑，让 Formily 自动处理
.forConfirm((payload, next) => {
  let values: any = payload.values;
  // 无需手动转换，Formily 自动处理

  if (!values.id) {
    return CreateAsync(values).then(() => {
      if (onAfterSubmit) onAfterSubmit();
      next(payload);
    });
  } else {
    return UpdateAsync({ id: values.id }, values).then(() => {
      if (onAfterSubmit) onAfterSubmit();
      next(payload);
    });
  }
})
```

## ❌ 避免的做法

### 手动数据转换
```typescript
// ❌ 不要手动编写提交时的转换代码
if (values['{value:lineCode,label:lineName}']) {
  const lineData = values['{value:lineCode,label:lineName}'];
  values.lineCode = lineData.value;
  values.lineName = lineData.label;
  delete values['{value:lineCode,label:lineName}'];
}
```

### 错误的字段配置
```typescript
// ❌ 错误的配置方式
"lineCode": {
  "x-component": "WorkLineSelect",
  "x-component-props": {
    "code": true  // 过时的配置
  }
}
```

### 复杂的数据处理
```typescript
// ❌ 避免复杂的手动数据处理逻辑
if (values.items && Array.isArray(values.items)) {
  values.items = values.items.map(item => {
    // 大量的手动转换代码...
    return item;
  });
}
```

## 🔄 迁移指南

### 从旧格式迁移到新格式

#### 步骤 1: 更新字段配置
```typescript
// 旧格式
"lineCode": {
  "x-component": "WorkLineSelect",
  "x-component-props": { "code": true }
}

// 新格式
"{value:lineCode,label:lineName}": {
  "x-component": "WorkLineSelect",
  "x-component-props": { "labelInValue": true },
  "name": "{value:lineCode,label:lineName}"
}
```

#### 步骤 2: 移除手动转换代码
```typescript
// 删除所有提交时的手动转换逻辑
// 保留必要的回填转换逻辑
```

#### 步骤 3: 测试验证
- 验证新建功能正常
- 验证编辑功能正常
- 验证数据格式正确

## 📊 效果对比

### 代码量对比
| 项目 | 旧实现 | 新实现 | 减少量 |
|------|--------|--------|--------|
| 线体工序配置 | ~150 行 | ~50 行 | 66% |
| 手动转换代码 | ~80 行 | 0 行 | 100% |
| 维护复杂度 | 高 | 低 | - |

### 维护成本对比
| 方面 | 旧实现 | 新实现 |
|------|--------|--------|
| 新增字段 | 需要编写转换代码 | 只需配置字段 |
| 修改字段 | 需要同步修改转换逻辑 | 自动处理 |
| 调试难度 | 需要调试转换逻辑 | 框架保证正确性 |
| 出错概率 | 较高 | 很低 |

## 🎯 团队协作

### 代码审查要点
1. **字段格式检查**: 确保使用 `{value:code,label:name}` 格式
2. **配置验证**: 确保设置了 `labelInValue: true`
3. **代码简洁性**: 避免不必要的手动转换代码
4. **测试覆盖**: 验证自动转换机制正常工作

### 新人培训要点
1. **理解 Formily 的自动转换机制**
2. **掌握正确的字段配置方式**
3. **了解何时需要手动干预（仅回填场景）**
4. **熟悉项目的选择器组件库**

### 文档维护
1. **及时更新规范文档**
2. **记录最佳实践案例**
3. **分享踩坑经验和解决方案**
4. **保持文档与代码的同步**

## 🚀 未来展望

### 持续改进方向
1. **组件库标准化**: 确保所有选择器组件支持 `labelInValue`
2. **类型定义完善**: 提供更好的 TypeScript 类型支持
3. **开发工具优化**: 提供代码片段和模板
4. **自动化检查**: 集成 ESLint 规则检查字段格式

### 技术演进
1. **框架升级**: 跟进 Formily 框架的新特性
2. **性能优化**: 利用框架的性能优化特性
3. **开发体验**: 提升开发效率和体验
4. **质量保证**: 建立更完善的质量保证体系

---

**记住**: 好的代码不是写出来的，而是重构出来的。通过持续的优化和改进，我们的代码会越来越简洁、可维护和高效。
