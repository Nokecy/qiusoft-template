/**
 * 文档作废申请枚举定义
 */

// 审批状态枚举
// 审批状态枚举
export enum ApprovalStatus {
  Pending = 0,      // 待提交
  Submitted = 10,   // 已提交,待审批
  InApproval = 15,  // 审批中
  Approved = 20,    // 已批准
  Rejected = 30,    // 已拒绝
  Withdrawn = 40    // 已撤回
}

// 审批状态枚举配置(用于列表和详情显示)
export const approvalStatusEnum = [
  { label: '待提交', value: ApprovalStatus.Pending, color: '#d9d9d9' },
  { label: '待审批', value: ApprovalStatus.Submitted, color: '#1890ff' },
  { label: '审批中', value: ApprovalStatus.InApproval, color: '#1890ff' },
  { label: '已批准', value: ApprovalStatus.Approved, color: '#52c41a' },
  { label: '已拒绝', value: ApprovalStatus.Rejected, color: '#ff4d4f' },
  { label: '已撤回', value: ApprovalStatus.Withdrawn, color: '#faad14' },
];

// 审批模式枚举
export enum ApprovalMode {
  Simple = 1,       // 简单审批
  Workflow = 2      // 工作流审批
}

// 审批模式枚举配置
export const approvalModeEnum = [
  { label: '简单审批', value: ApprovalMode.Simple, color: '#1890ff' },
  { label: '工作流审批', value: ApprovalMode.Workflow, color: '#52c41a' },
];

// 作废原因类型枚举
export enum ObsolescenceReasonType {
  DesignChange = 1,          // 设计变更
  ProductDiscontinued = 2,   // 产品停产
  StandardUpdated = 3,       // 标准更新
  TechnologyObsolete = 4,    // 技术淘汰
  Other = 99                 // 其他原因
}

// 作废原因类型枚举配置
export const obsolescenceReasonTypeEnum = [
  { label: '设计变更', value: ObsolescenceReasonType.DesignChange, color: '#1890ff' },
  { label: '产品停产', value: ObsolescenceReasonType.ProductDiscontinued, color: '#ff4d4f' },
  { label: '标准更新', value: ObsolescenceReasonType.StandardUpdated, color: '#52c41a' },
  { label: '技术淘汰', value: ObsolescenceReasonType.TechnologyObsolete, color: '#faad14' },
  { label: '其他原因', value: ObsolescenceReasonType.Other, color: '#d9d9d9' },
];
