# 工程文件通知单 首次归档物料选择设计

## 背景与目标
- 页面: /appPdm/ChangeManagement/EngineeringFileNotice/form
- 需求: 归档类型为“首次归档”时，物料编码必须通过下拉选择，物料名称随选择自动带出且不可编辑。

## 方案（推荐）
- 首次归档 (archiveType=0):
  - 物料编码字段从 Input 切换为 PartSelect（下拉选择）。
  - 物料名称字段禁用，仅由物料编码选择联动回填。
- 非首次归档:
  - 维持现有逻辑（字段禁用、依赖文档选择联动）。

## 关键实现点
- 初始化: 若 archiveType=0 且已有数据，将 partNo 转为 labelInValue 结构，确保 PartSelect 正确显示。
- 联动: 选择物料后回填 partName（优先 label，其次 description）。
- 提交: 复用现有 resolvedPartNo/resolvedPartName 兜底，提交纯编码与名称。

## 风险与对策
- 风险: archiveType 切换导致旧值不匹配选择器显示。
  - 对策: 依赖既有 form.reset 和选择器回填，必要时后续增强清空逻辑。

## 测试建议
- 新建: 归档类型=首次归档时，仅能下拉选择物料编码，物料名称自动带出且不可编辑。
- 编辑: 首次归档的历史数据能在 PartSelect 正确显示并提交。
- 非首次归档: 物料字段保持原有禁用与联动逻辑。
