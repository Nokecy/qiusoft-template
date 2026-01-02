// 文档发放状态枚举
export enum DocumentReleaseStatus {
	Draft = 0, // 草稿 - 初始创建状态
	PendingApproval = 10, // 待审批 - 已提交审批流程
	InApproval = 15, // 审批中 - 工作流已开始
	Approved = 20, // 已审批 - 审批通过，等待执行发放
	Released = 30, // 已发放 - 已执行发放
	PartiallyRecalled = 40, // 部分回收 - 部分文档已回收
	FullyRecalled = 50, // 已回收 - 所有文档都已回收
	Closed = 60, // 已关闭 - 发放单已关闭
	Rejected = 99, // 已拒绝 - 审批被拒绝
}

export const documentReleaseStatusEnum = [
	{ label: '草稿', value: DocumentReleaseStatus.Draft, color: '#d9d9d9' },
	{ label: '待审批', value: DocumentReleaseStatus.PendingApproval, color: '#faad14' },
	{ label: '审批中', value: DocumentReleaseStatus.InApproval, color: '#fa8c16' },
	{ label: '已审批', value: DocumentReleaseStatus.Approved, color: '#1890ff' },
	{ label: '已发放', value: DocumentReleaseStatus.Released, color: '#52c41a' },
	{ label: '部分回收', value: DocumentReleaseStatus.PartiallyRecalled, color: '#13c2c2' },
	{ label: '已回收', value: DocumentReleaseStatus.FullyRecalled, color: '#722ed1' },
	{ label: '已关闭', value: DocumentReleaseStatus.Closed, color: '#8c8c8c' },
	{ label: '已拒绝', value: DocumentReleaseStatus.Rejected, color: '#f5222d' },
];

// 回收状态枚举
export enum RecallStatus {
	NotRecalled = 0, // 未回收
	PartiallyRecalled = 1, // 部分回收
	FullyRecalled = 2, // 完全回收
}

export const recallStatusEnum = [
	{ label: '未回收', value: RecallStatus.NotRecalled, color: '#d9d9d9' },
	{ label: '部分回收', value: RecallStatus.PartiallyRecalled, color: '#faad14' },
	{ label: '完全回收', value: RecallStatus.FullyRecalled, color: '#52c41a' },
];

// 接收确认状态枚举
export enum RecipientConfirmationStatus {
	Pending = 0, // 待确认
	Confirmed = 10, // 已确认
	Rejected = 20, // 已拒绝
}

export const recipientConfirmationStatusEnum = [
	{ label: '待确认', value: RecipientConfirmationStatus.Pending, color: '#faad14' },
	{ label: '已确认', value: RecipientConfirmationStatus.Confirmed, color: '#52c41a' },
	{ label: '已拒绝', value: RecipientConfirmationStatus.Rejected, color: '#f5222d' },
];
