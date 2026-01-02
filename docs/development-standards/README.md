# 开发规范文档

本目录包含项目的各种开发规范和最佳实践文档。

## 📋 规范列表

### Formily 相关规范
- [Formily 选择器字段配置规范](./formily-selector-field-specification.md) - 完整的规范文档
- [Formily 选择器字段快速参考](./formily-selector-quick-reference.md) - 快速查阅指南
- [Formily 选择器代码模板](./formily-selector-templates.ts) - 可复制的代码模板
- [Formily 选择器最佳实践](./formily-selector-best-practices.md) - 最佳实践总结

## 🚀 快速开始

### 新建选择器字段
1. 查阅 [快速参考指南](./formily-selector-quick-reference.md)
2. 复制 [代码模板](./formily-selector-templates.ts) 中的相应模板
3. 根据业务需求调整字段名和组件
4. 只需实现数据回填逻辑（Formily 自动处理提交转换）

### 重构现有字段
1. 参考 [完整规范文档](./formily-selector-field-specification.md)
2. 查看 [最佳实践总结](./formily-selector-best-practices.md)
3. 对照检查清单进行逐项检查
4. 移除手动转换代码，利用框架自动转换

### 学习路径
1. **入门**: 快速参考指南 → 代码模板
2. **深入**: 完整规范文档 → 最佳实践总结
3. **实践**: 参考示例 → 实际项目应用

## 📚 参考示例

### 标准实现示例
- `src/pages/appMES/workforceInfo/employee/components/schema.ts`
- `src/pages/appMES/basicInfo/lineWorkProcedureConfig/components/schema.ts`
- `src/pages/appMES/basicInfo/lineWorkProcedureConfig/components/formDialog.tsx`

## 🔄 规范更新

规范文档会根据项目发展和最佳实践的演进进行更新。如有建议或问题，请：

1. 提交 Issue 讨论
2. 提出改进建议
3. 分享最佳实践

## 📞 联系方式

如有疑问，请联系：
- 技术负责人
- 架构师团队
- 开发团队 Lead

---

**注意**：所有开发人员都应该熟悉并遵循这些规范，以确保代码质量和项目的可维护性。
