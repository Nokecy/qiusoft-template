// 文档发放权限定义
export const DocumentReleasePermissions = {
	// 基础权限
	Default: 'Pdm.DocumentReleases',
	Create: 'Pdm.DocumentReleases.Create',
	Update: 'Pdm.DocumentReleases.Update',
	Delete: 'Pdm.DocumentReleases.Delete',

	// 工作流权限
	Submit: 'Pdm.DocumentReleases.Submit',
	Approve: 'Pdm.DocumentReleases.Approve',
	Reject: 'Pdm.DocumentReleases.Reject',
	Execute: 'Pdm.DocumentReleases.Execute',
	Close: 'Pdm.DocumentReleases.Close',

	// 文档管理权限
	AddDocument: 'Pdm.DocumentReleases.AddDocument',
	RemoveDocument: 'Pdm.DocumentReleases.RemoveDocument',

	// 接收人管理权限
	AddRecipient: 'Pdm.DocumentReleases.AddRecipient',
	RemoveRecipient: 'Pdm.DocumentReleases.RemoveRecipient',

	// 回收权限
	MarkRecalled: 'Pdm.DocumentReleases.MarkRecalled',
	ConfirmReceipt: 'Pdm.DocumentReleases.ConfirmReceipt',
};
