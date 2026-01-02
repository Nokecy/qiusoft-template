# Formily 选择器字段快速参考

## 🚀 快速模板

### Schema 配置模板
```typescript
"{value:fieldCode,label:fieldName}": {
  "type": "string",
  "title": "显示名称",
  "x-decorator": "FormItem",
  "x-component": "SelectComponent",
  "x-validator": [
    {
      "required": true,
      "message": "请选择..."
    }
  ],
  "x-component-props": {
    "labelInValue": true
  },
  "name": "{value:fieldCode,label:fieldName}"
}
```

### 数据处理模板
```typescript
// 提交时：无需手动转换，Formily 自动处理
// 表单会自动将 {value:fieldCode,label:fieldName} 拆分为 fieldCode 和 fieldName 字段

// 回填时转换
if (configInfo.fieldCode && configInfo.fieldName) {
  configInfo['{value:fieldCode,label:fieldName}'] = {
    value: configInfo.fieldCode,
    label: configInfo.fieldName
  };
}
```

## 📋 常用组件映射

| 业务场景 | 字段名格式 | 组件名 |
|----------|------------|--------|
| 线体选择 | `{value:lineCode,label:lineName}` | `WorkLineSelect` |
| 部门选择 | `{value:departCode,label:departName}` | `DeptSelect` |
| 班组选择 | `{value:workTeamCode,label:workTeamName}` | `WorkTeamSelect` |
| 工序选择 | `{value:workProcedureCode,label:workProcedureName}` | `WorkProcedureSelect` |
| 设备选择 | `{value:equipmentCode,label:equipmentName}` | `EquipmentAssetSelect` |

## ✅ 检查清单

### Schema 配置
- [ ] 字段名使用 `{value:code,label:name}` 格式
- [ ] 设置 `"labelInValue": true`
- [ ] 添加必要的验证规则

### 数据处理
- [ ] 实现回填时的数据转换（提交时 Formily 自动处理）
- [ ] 处理嵌套对象中的选择器字段（如有）

### 测试验证
- [ ] 新建功能正常
- [ ] 编辑功能正常
- [ ] 数据格式正确

## 🔧 故障排除

### 常见问题
1. **选择器不显示数据** → 检查组件是否支持 `labelInValue`
2. **提交数据格式错误** → 检查字段名格式是否为 `{value:code,label:name}`
3. **编辑时不回填** → 检查回填时的数据格式转换
4. **验证不生效** → 检查字段名是否正确
5. **自动转换不工作** → 确认使用了正确的字段名格式和 `labelInValue: true`

### 调试技巧
```typescript
// 在 forConfirm 中添加调试日志
console.log('Formily 自动转换后的数据:', values);
// 检查是否包含期望的 code 和 name 字段

// 在 onFormInit 中检查回填数据
console.log('回填前的数据:', configInfo);
console.log('回填后的数据:', configInfo);
```

### 最佳实践提醒
- ✅ 使用 `{value:code,label:name}` 格式
- ✅ 设置 `labelInValue: true`
- ✅ 只在回填时进行数据转换
- ❌ 不要手动编写提交时的转换代码
- ❌ 不要修改 Formily 的自动转换结果

## 📚 参考示例

完整示例请参考：
- `src/pages/appMES/workforceInfo/employee/components/schema.ts`
- `src/pages/appMES/basicInfo/lineWorkProcedureConfig/components/schema.ts`
- `src/pages/appMES/basicInfo/lineWorkProcedureConfig/components/formDialog.tsx`
