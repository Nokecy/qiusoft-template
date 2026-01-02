/**
 * PDM 模块权限定义
 * 从后端 Burn.Abp.Pdm 应用中的 PdmPermissions.cs 同步而来
 * 更新时间：2025-11-27
 */

// ==================== 物料与BOM相关权限 ====================

/** 物料管理权限 */
export const PartPermissions = {
  Default: 'Pdm.PartManagement',
  Create: 'Pdm.PartManagement.Create',
  Update: 'Pdm.PartManagement.Update',
  Delete: 'Pdm.PartManagement.Delete',
  Import: 'Pdm.PartManagement.Import',
  Export: 'Pdm.PartManagement.Export',
  Submit: 'Pdm.PartManagement.Submit',
  Approve: 'Pdm.PartManagement.Approve',
  Reject: 'Pdm.PartManagement.Reject',
  Withdraw: 'Pdm.PartManagement.Withdraw',
  Release: 'Pdm.PartManagement.Release',
  Obsolete: 'Pdm.PartManagement.Obsolete',
  CreateNewVersion: 'Pdm.PartManagement.CreateNewVersion',
  CheckOut: 'Pdm.PartManagement.CheckOut',
  CheckIn: 'Pdm.PartManagement.CheckIn',
  UndoCheckOut: 'Pdm.PartManagement.UndoCheckOut',
};

/** 物料替代权限（沿用 Part 权限） */
export const PartSubstitutionPermissions = PartPermissions;

/** 物料分类权限 */
export const PartCategoryPermissions = {
  Default: 'Pdm.PartCategory',
  Create: 'Pdm.PartCategory.Create',
  Update: 'Pdm.PartCategory.Update',
  Delete: 'Pdm.PartCategory.Delete',
};

/** 分类属性定义权限 */
export const PartCategoryAttributePermissions = {
  Default: 'Pdm.PartCategoryAttribute',
  Create: 'Pdm.PartCategoryAttribute.Create',
  Update: 'Pdm.PartCategoryAttribute.Update',
  Delete: 'Pdm.PartCategoryAttribute.Delete',
};

/** 物料编码规则（BNR）权限 */
export const PartNumberRulesPermissions = {
  Default: 'Pdm.PartNumberRules',
  /** 规则定义权限 */
  RuleDefinitions: {
    Default: 'Pdm.PartNumberRules.RuleDefinitions',
    Create: 'Pdm.PartNumberRules.RuleDefinitions.Create',
    Update: 'Pdm.PartNumberRules.RuleDefinitions.Update',
    Delete: 'Pdm.PartNumberRules.RuleDefinitions.Delete',
    SetDefault: 'Pdm.PartNumberRules.RuleDefinitions.SetDefault',
  },
};

/** 物料申请单权限（新物料信息申请） */
export const PartApplicationRequestPermissions = {
  Default: 'Pdm.PartApplicationRequest',
  Create: 'Pdm.PartApplicationRequest.Create',
  Update: 'Pdm.PartApplicationRequest.Update',
  Delete: 'Pdm.PartApplicationRequest.Delete',
  Submit: 'Pdm.PartApplicationRequest.Submit',
  Cancel: 'Pdm.PartApplicationRequest.Cancel',
  CreatePart: 'Pdm.PartApplicationRequest.CreatePart',
};

/** BOM管理权限 */
export const BomPermissions = {
  Default: 'Pdm.BomManagement',
  Create: 'Pdm.BomManagement.Create',
  Update: 'Pdm.BomManagement.Update',
  Delete: 'Pdm.BomManagement.Delete',
  Import: 'Pdm.BomManagement.Import',
  Export: 'Pdm.BomManagement.Export',
  CreateVersion: 'Pdm.BomManagement.CreateVersion',
  SubmitVersion: 'Pdm.BomManagement.SubmitVersion',
  ApproveVersion: 'Pdm.BomManagement.ApproveVersion',
  SetEffectiveVersion: 'Pdm.BomManagement.SetEffectiveVersion',
  AddItem: 'Pdm.BomManagement.AddItem',
  DeleteItem: 'Pdm.BomManagement.DeleteItem',
  Compare: 'Pdm.BomManagement.Compare',
  ReverseLookup: 'Pdm.BomManagement.ReverseLookup',
  DocumentView: 'Pdm.BomManagement.DocumentView',
};

/** 物料-文档关联权限 */
export const PartDocumentLinksPermissions = {
  Default: 'Pdm.PartDocumentLinks',
  Create: 'Pdm.PartDocumentLinks.Create',
  Update: 'Pdm.PartDocumentLinks.Update',
  Delete: 'Pdm.PartDocumentLinks.Delete',
  Submit: 'Pdm.PartDocumentLinks.Submit',
  Release: 'Pdm.PartDocumentLinks.Release',
  Obsolete: 'Pdm.PartDocumentLinks.Obsolete',
};

// ==================== 变更管理相关权限 ====================

/** 变更管理权限（通用） */
export const ChangeManagementPermissions = {
  Default: 'Pdm.ChangeManagement',
  Create: 'Pdm.ChangeManagement.Create',
  Update: 'Pdm.ChangeManagement.Update',
  Delete: 'Pdm.ChangeManagement.Delete',
  Submit: 'Pdm.ChangeManagement.Submit',
  Approve: 'Pdm.ChangeManagement.Approve',
  Reject: 'Pdm.ChangeManagement.Reject',
  Execute: 'Pdm.ChangeManagement.Execute',
  Cancel: 'Pdm.ChangeManagement.Cancel',
  AddDocument: 'Pdm.ChangeManagement.AddDocument',
  RemoveDocument: 'Pdm.ChangeManagement.RemoveDocument',
  SetImpactAnalysis: 'Pdm.ChangeManagement.SetImpactAnalysis',
};

/** 文档变更单 (DCO) 权限 */
export const DocumentChangeOrderPermissions = {
  Default: 'Pdm.DocumentChangeOrder',
  Create: 'Pdm.DocumentChangeOrder.Create',
  Update: 'Pdm.DocumentChangeOrder.Update',
  Delete: 'Pdm.DocumentChangeOrder.Delete',
  Submit: 'Pdm.DocumentChangeOrder.Submit',
  Approve: 'Pdm.DocumentChangeOrder.Approve',
  Reject: 'Pdm.DocumentChangeOrder.Reject',
  Execute: 'Pdm.DocumentChangeOrder.Execute',
  Cancel: 'Pdm.DocumentChangeOrder.Cancel',
  AddDocument: 'Pdm.DocumentChangeOrder.AddDocument',
  RemoveDocument: 'Pdm.DocumentChangeOrder.RemoveDocument',
  SetImpactAnalysis: 'Pdm.DocumentChangeOrder.SetImpactAnalysis',
};

/** 工程变更单 (ECO) 权限 */
export const EngineeringChangeOrderPermissions = {
  Default: 'Pdm.EngineeringChangeOrder',
  Create: 'Pdm.EngineeringChangeOrder.Create',
  Update: 'Pdm.EngineeringChangeOrder.Update',
  Delete: 'Pdm.EngineeringChangeOrder.Delete',
  Submit: 'Pdm.EngineeringChangeOrder.Submit',
  Approve: 'Pdm.EngineeringChangeOrder.Approve',
  Reject: 'Pdm.EngineeringChangeOrder.Reject',
  Execute: 'Pdm.EngineeringChangeOrder.Execute',
  Cancel: 'Pdm.EngineeringChangeOrder.Cancel',
  SetInventoryStrategy: 'Pdm.EngineeringChangeOrder.SetInventoryStrategy',
  SetEffectiveDate: 'Pdm.EngineeringChangeOrder.SetEffectiveDate',
};

/** 工程变更通知 (ECN) 权限 */
export const EngineeringChangeNotificationPermissions = {
  Default: 'Pdm.EngineeringChangeNotification',
  Create: 'Pdm.EngineeringChangeNotification.Create',
  Update: 'Pdm.EngineeringChangeNotification.Update',
  Delete: 'Pdm.EngineeringChangeNotification.Delete',
  Submit: 'Pdm.EngineeringChangeNotification.Submit',
  Approve: 'Pdm.EngineeringChangeNotification.Approve',
  Reject: 'Pdm.EngineeringChangeNotification.Reject',
  Cancel: 'Pdm.EngineeringChangeNotification.Cancel',
  LinkSourceOrder: 'Pdm.EngineeringChangeNotification.LinkSourceOrder',
};

/** 技术图纸更改单 (Part Document Change Order) 权限 */
export const PartDocumentChangeOrderPermissions = {
  Default: 'Pdm.PartDocumentChangeOrder',
  Create: 'Pdm.PartDocumentChangeOrder.Create',
  Update: 'Pdm.PartDocumentChangeOrder.Update',
  Delete: 'Pdm.PartDocumentChangeOrder.Delete',
  Execute: 'Pdm.PartDocumentChangeOrder.Execute',
  Close: 'Pdm.PartDocumentChangeOrder.Close',
  Export: 'Pdm.PartDocumentChangeOrder.Export',
};

// ==================== 文档管理相关权限 ====================

/** 文档类型权限 */
export const DocumentTypePermissions = {
  Default: 'Pdm.DocumentTypes',
  Create: 'Pdm.DocumentTypes.Create',
  Update: 'Pdm.DocumentTypes.Update',
  Delete: 'Pdm.DocumentTypes.Delete',
};

/** 文档库管理权限 */
export const DocumentLibraryPermissions = {
  Default: 'Pdm.DocumentLibrary',
  Create: 'Pdm.DocumentLibrary.Create',
  Update: 'Pdm.DocumentLibrary.Update',
  Delete: 'Pdm.DocumentLibrary.Delete',
  Import: 'Pdm.DocumentLibrary.Import',
  Export: 'Pdm.DocumentLibrary.Export',
};

/** 文档管理权限 */
export const DocumentManagementPermissions = {
  Default: 'Pdm.DocumentManagement',
  Create: 'Pdm.DocumentManagement.Create',
  Update: 'Pdm.DocumentManagement.Update',
  Delete: 'Pdm.DocumentManagement.Delete',
  CheckIn: 'Pdm.DocumentManagement.CheckIn',
  CheckOut: 'Pdm.DocumentManagement.CheckOut',
  CancelCheckOut: 'Pdm.DocumentManagement.CancelCheckOut',
  ForceUnlock: 'Pdm.DocumentManagement.ForceUnlock',
  DiscardRevision: 'Pdm.DocumentManagement.DiscardRevision',
  CreateVersion: 'Pdm.DocumentManagement.CreateVersion',
  Submit: 'Pdm.DocumentManagement.Submit',
  Approve: 'Pdm.DocumentManagement.Approve',
  Release: 'Pdm.DocumentManagement.Release',
  Obsolete: 'Pdm.DocumentManagement.Obsolete',
  // 文件操作权限
  UploadFile: 'Pdm.DocumentManagement.UploadFile',
  DownloadFile: 'Pdm.DocumentManagement.DownloadFile',
  DeleteFile: 'Pdm.DocumentManagement.DeleteFile',
  /** 文档转换权限 */
  Conversions: {
    Default: 'Pdm.DocumentManagement.Conversions',
    Create: 'Pdm.DocumentManagement.Conversions.Create',
    Retry: 'Pdm.DocumentManagement.Conversions.Retry',
    Cancel: 'Pdm.DocumentManagement.Conversions.Cancel',
    Delete: 'Pdm.DocumentManagement.Conversions.Delete',
  },
};

/** 文档授权管理权限 */
export const DocumentAuthorizationPermissions = {
  Default: 'Pdm.DocumentAuthorization',
  ManageLibraryAcl: 'Pdm.DocumentAuthorization.ManageLibraryAcl',
  ManageDocumentAcl: 'Pdm.DocumentAuthorization.ManageDocumentAcl',
  ManageTemplates: 'Pdm.DocumentAuthorization.ManageTemplates',
  ManageCollaborators: 'Pdm.DocumentAuthorization.ManageCollaborators',
  Diagnostics: 'Pdm.DocumentAuthorization.Diagnostics',
};


// ==================== 项目管理相关权限 ====================

/** 项目管理权限 */
export const ProjectPermissions = {
  Default: 'Pdm.Project',
  Create: 'Pdm.Project.Create',
  Update: 'Pdm.Project.Update',
  Delete: 'Pdm.Project.Delete',
  Publish: 'Pdm.Project.Publish',
  SaveAsDraft: 'Pdm.Project.SaveAsDraft',
};

/** 项目模板权限 */
export const ProjectTemplatePermissions = {
  Default: 'Pdm.ProjectTemplate',
  Create: 'Pdm.ProjectTemplate.Create',
  Update: 'Pdm.ProjectTemplate.Update',
  Delete: 'Pdm.ProjectTemplate.Delete',
};

/** 项目分类权限 */
export const ProjectCategoryPermissions = {
  Default: 'Pdm.ProjectCategory',
  Create: 'Pdm.ProjectCategory.Create',
  Update: 'Pdm.ProjectCategory.Update',
  Delete: 'Pdm.ProjectCategory.Delete',
};

/** 项目角色权限 */
export const ProjectRolePermissions = {
  Default: 'Pdm.ProjectRole',
  Create: 'Pdm.ProjectRole.Create',
  Update: 'Pdm.ProjectRole.Update',
  Delete: 'Pdm.ProjectRole.Delete',
};

/** 项目表单权限 */
export const ProjectFormPermissions = {
  Default: 'Pdm.ProjectForm',
  Create: 'Pdm.ProjectForm.Create',
  Update: 'Pdm.ProjectForm.Update',
  Delete: 'Pdm.ProjectForm.Delete',
};

/** 项目文档权限 */
export const ProjectDocumentPermissions = {
  Default: 'Pdm.ProjectDocument',
  Create: 'Pdm.ProjectDocument.Create',
  Update: 'Pdm.ProjectDocument.Update',
  Delete: 'Pdm.ProjectDocument.Delete',
};

/** 项目团队权限 */
export const ProjectTeamMemberPermissions = {
  Default: 'Pdm.ProjectTeamMember',
  Create: 'Pdm.ProjectTeamMember.Create',
  Update: 'Pdm.ProjectTeamMember.Update',
  Delete: 'Pdm.ProjectTeamMember.Delete',
};

/** 项目任务权限 */
export const ProjectTaskPermissions = {
  Default: 'Pdm.ProjectTask',
  Create: 'Pdm.ProjectTask.Create',
  Update: 'Pdm.ProjectTask.Update',
  Delete: 'Pdm.ProjectTask.Delete',
};

/** 项目里程碑权限 */
export const ProjectMilestonePermissions = {
  Default: 'Pdm.ProjectMilestone',
  Create: 'Pdm.ProjectMilestone.Create',
  Update: 'Pdm.ProjectMilestone.Update',
  Delete: 'Pdm.ProjectMilestone.Delete',
  Start: 'Pdm.ProjectMilestone.Start',
  Complete: 'Pdm.ProjectMilestone.Complete',
  ViewBreakdown: 'Pdm.ProjectMilestone.ViewBreakdown',
};

/** 项目成果权限 */
export const ProjectDeliverablePermissions = {
  Default: 'Pdm.ProjectDeliverable',
  Create: 'Pdm.ProjectDeliverable.Create',
  Update: 'Pdm.ProjectDeliverable.Update',
  Delete: 'Pdm.ProjectDeliverable.Delete',
  Submit: 'Pdm.ProjectDeliverable.Submit',
  Approve: 'Pdm.ProjectDeliverable.Approve',
  Reject: 'Pdm.ProjectDeliverable.Reject',
  Archive: 'Pdm.ProjectDeliverable.Archive',
};

/** 项目变更权限 */
export const ProjectChangePermissions = {
  Default: 'Pdm.ProjectChange',
  Create: 'Pdm.ProjectChange.Create',
  Update: 'Pdm.ProjectChange.Update',
  Delete: 'Pdm.ProjectChange.Delete',
  Submit: 'Pdm.ProjectChange.Submit',
  Approve: 'Pdm.ProjectChange.Approve',
  Reject: 'Pdm.ProjectChange.Reject',
  Implement: 'Pdm.ProjectChange.Implement',
  Complete: 'Pdm.ProjectChange.Complete',
  Cancel: 'Pdm.ProjectChange.Cancel',
};

/** 项目风险权限 */
export const ProjectRiskPermissions = {
  Default: 'Pdm.ProjectRisk',
  Create: 'Pdm.ProjectRisk.Create',
  Update: 'Pdm.ProjectRisk.Update',
  Delete: 'Pdm.ProjectRisk.Delete',
  Resolve: 'Pdm.ProjectRisk.Resolve',
  Reopen: 'Pdm.ProjectRisk.Reopen',
};

/** 项目问题权限 */
export const ProjectIssuePermissions = {
  Default: 'Pdm.ProjectIssue',
  Create: 'Pdm.ProjectIssue.Create',
  Update: 'Pdm.ProjectIssue.Update',
  Delete: 'Pdm.ProjectIssue.Delete',
  Process: 'Pdm.ProjectIssue.Process',
  Resolve: 'Pdm.ProjectIssue.Resolve',
  Close: 'Pdm.ProjectIssue.Close',
  Activate: 'Pdm.ProjectIssue.Activate',
};

/** 项目会议权限 */
export const ProjectMeetingsPermissions = {
  Default: 'Pdm.ProjectMeetings',
  Create: 'Pdm.ProjectMeetings.Create',
  Update: 'Pdm.ProjectMeetings.Update',
  Delete: 'Pdm.ProjectMeetings.Delete',
  Submit: 'Pdm.ProjectMeetings.Submit',
  Withdraw: 'Pdm.ProjectMeetings.Withdraw',
};

// ==================== 类型定义权限 ====================

/** 任务类型权限 */
export const TaskTypePermissions = {
  Default: 'Pdm.TaskType',
  Create: 'Pdm.TaskType.Create',
  Update: 'Pdm.TaskType.Update',
  Delete: 'Pdm.TaskType.Delete',
};

/** 问题类型权限 */
export const IssueTypePermissions = {
  Default: 'Pdm.IssueType',
  Create: 'Pdm.IssueType.Create',
  Update: 'Pdm.IssueType.Update',
  Delete: 'Pdm.IssueType.Delete',
};

/** 风险类型权限 */
export const RiskTypePermissions = {
  Default: 'Pdm.RiskType',
  Create: 'Pdm.RiskType.Create',
  Update: 'Pdm.RiskType.Update',
  Delete: 'Pdm.RiskType.Delete',
};

// ==================== 其他权限 ====================

/** 项目关联权限 */
export const ProjectRelationPermissions = {
  Default: 'Pdm.ProjectRelation',
  Create: 'Pdm.ProjectRelation.Create',
  Update: 'Pdm.ProjectRelation.Update',
};

/** 任务关联权限（兼容旧命名，已废弃） */
/** @deprecated 请使用 ProjectRelationPermissions */
export const TaskRelationPermissions = ProjectRelationPermissions;

/** 用户关注权限 */
export const UserWatchPermissions = {
  Default: 'Pdm.UserWatch',
  Create: 'Pdm.UserWatch.Create',
  Update: 'Pdm.UserWatch.Update',
};

/** 合理化建议权限 */
export const RationalizationProposalPermissions = {
  Default: 'Pdm.RationalizationProposal',
  Create: 'Pdm.RationalizationProposal.Create',
  Update: 'Pdm.RationalizationProposal.Update',
  Delete: 'Pdm.RationalizationProposal.Delete',
  Submit: 'Pdm.RationalizationProposal.Submit',
  Withdraw: 'Pdm.RationalizationProposal.Withdraw',
  StartExecution: 'Pdm.RationalizationProposal.StartExecution',
  CompleteExecution: 'Pdm.RationalizationProposal.CompleteExecution',
  AbnormalClose: 'Pdm.RationalizationProposal.AbnormalClose',
};

/** 记录单信息权限 */
export const RecordInformationPermissions = {
  Default: 'Pdm.RecordInformation',
  Create: 'Pdm.RecordInformation.Create',
  Update: 'Pdm.RecordInformation.Update',
  Delete: 'Pdm.RecordInformation.Delete',
  Submit: 'Pdm.RecordInformation.Submit',
  Withdraw: 'Pdm.RecordInformation.Withdraw',
  StartExecution: 'Pdm.RecordInformation.StartExecution',
  CompleteExecution: 'Pdm.RecordInformation.CompleteExecution',
  AbnormalClose: 'Pdm.RecordInformation.AbnormalClose',
};

/** 文档新增申请权限 */
export const DocumentCreationRequestsPermissions = {
  Default: 'Pdm.DocumentCreationRequests',
  Create: 'Pdm.DocumentCreationRequests.Create',
  Update: 'Pdm.DocumentCreationRequests.Update',
  Delete: 'Pdm.DocumentCreationRequests.Delete',
  Submit: 'Pdm.DocumentCreationRequests.Submit',
  Approve: 'Pdm.DocumentCreationRequests.Approve',
  Reject: 'Pdm.DocumentCreationRequests.Reject',
  Withdraw: 'Pdm.DocumentCreationRequests.Withdraw',
};

/** 文档变更申请权限 */
export const DocumentChangeRequestsPermissions = {
  Default: 'Pdm.DocumentChangeRequests',
  Create: 'Pdm.DocumentChangeRequests.Create',
  Update: 'Pdm.DocumentChangeRequests.Update',
  Delete: 'Pdm.DocumentChangeRequests.Delete',
  Submit: 'Pdm.DocumentChangeRequests.Submit',
  Approve: 'Pdm.DocumentChangeRequests.Approve',
  Reject: 'Pdm.DocumentChangeRequests.Reject',
  Withdraw: 'Pdm.DocumentChangeRequests.Withdraw',
};

/** 文档检出申请权限 */
export const DocumentCheckOutRequestPermissions = {
  Default: 'Pdm.DocumentCheckOutRequest',
  Create: 'Pdm.DocumentCheckOutRequest.Create',
  Update: 'Pdm.DocumentCheckOutRequest.Update',
  Delete: 'Pdm.DocumentCheckOutRequest.Delete',
  Submit: 'Pdm.DocumentCheckOutRequest.Submit',
  Approve: 'Pdm.DocumentCheckOutRequest.Approve',
  Reject: 'Pdm.DocumentCheckOutRequest.Reject',
};

/** 文档检入申请权限 */
export const DocumentCheckInRequestPermissions = {
  Default: 'Pdm.DocumentCheckInRequest',
  Create: 'Pdm.DocumentCheckInRequest.Create',
  Update: 'Pdm.DocumentCheckInRequest.Update',
  Delete: 'Pdm.DocumentCheckInRequest.Delete',
  Submit: 'Pdm.DocumentCheckInRequest.Submit',
  Approve: 'Pdm.DocumentCheckInRequest.Approve',
  Reject: 'Pdm.DocumentCheckInRequest.Reject',
};

/** 文档作废申请权限 */
export const DocumentObsolescenceRequestsPermissions = {
  Default: 'Pdm.DocumentObsolescenceRequests',
  Create: 'Pdm.DocumentObsolescenceRequests.Create',
  Update: 'Pdm.DocumentObsolescenceRequests.Update',
  Delete: 'Pdm.DocumentObsolescenceRequests.Delete',
  Submit: 'Pdm.DocumentObsolescenceRequests.Submit',
  Approve: 'Pdm.DocumentObsolescenceRequests.Approve',
  Reject: 'Pdm.DocumentObsolescenceRequests.Reject',
  Withdraw: 'Pdm.DocumentObsolescenceRequests.Withdraw',
};

/** 工作区权限 */
export const WorkspacePermissions = {
  Default: 'Pdm.Workspace',
  ViewMyCheckouts: 'Pdm.Workspace.ViewMyCheckouts',
  SearchDocuments: 'Pdm.Workspace.SearchDocuments',
  ViewMyTasks: 'Pdm.Workspace.ViewMyTasks',
};

// ==================== 工艺管理相关权限 ====================

/** 工序分类权限 */
export const ProcessProcedureCategoryPermissions = {
  Default: 'Pdm.ProcessProcedureCategory',
  Create: 'Pdm.ProcessProcedureCategory.Create',
  Update: 'Pdm.ProcessProcedureCategory.Update',
  Delete: 'Pdm.ProcessProcedureCategory.Delete',
};

/** 工序信息权限 */
export const ProcessProcedurePermissions = {
  Default: 'Pdm.ProcessProcedure',
  Create: 'Pdm.ProcessProcedure.Create',
  Update: 'Pdm.ProcessProcedure.Update',
  Delete: 'Pdm.ProcessProcedure.Delete',
};

/** 工艺路线权限 */
export const ProcessRoutePermissions = {
  Default: 'Pdm.ProcessRoute',
  Create: 'Pdm.ProcessRoute.Create',
  Update: 'Pdm.ProcessRoute.Update',
  Delete: 'Pdm.ProcessRoute.Delete',
  Submit: 'Pdm.ProcessRoute.Submit',
  UnSubmit: 'Pdm.ProcessRoute.UnSubmit',
  Check: 'Pdm.ProcessRoute.Check',
  UnCheck: 'Pdm.ProcessRoute.UnCheck',
};

/** 分类层级模板权限 */
export const CategoryLevelTemplatePermissions = {
  Default: 'Pdm.CategoryTemplates',
  Create: 'Pdm.CategoryTemplates.Create',
  Update: 'Pdm.CategoryTemplates.Update',
  Delete: 'Pdm.CategoryTemplates.Delete',
  Generate: 'Pdm.CategoryTemplates.Generate',
};

// ==================== 向后兼容性导出 ====================

/**
 * @deprecated 请使用 DocumentManagementPermissions 替代
 * 为了向后兼容，保留此导出别名
 */
export const DocumentPermissions = DocumentManagementPermissions;
