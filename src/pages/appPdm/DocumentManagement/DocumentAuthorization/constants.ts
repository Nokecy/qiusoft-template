/**
 * 文档授权管理常量定义
 */

// ==================== 主体类型 ====================

/** 主体类型枚举值 */
export const PrincipalTypes = {
  Role: 1,    // 角色
  User: 2,    // 用户
  OU: 3,      // 部门
} as const;

export type PrincipalType = typeof PrincipalTypes[keyof typeof PrincipalTypes];

/** 主体类型标签 */
export const PrincipalTypeLabels: Record<number, string> = {
  1: '角色',
  2: '用户',
  3: '部门',
};

/** 主体类型选项 */
export const PrincipalTypeOptions = [
  { value: PrincipalTypes.Role, label: '角色' },
  { value: PrincipalTypes.User, label: '用户' },
  { value: PrincipalTypes.OU, label: '部门' },
];

// ==================== 权限效果 ====================

/** 权限效果枚举值 */
export const PermissionEffects = {
  Deny: 0,    // 拒绝
  Allow: 1,   // 允许
} as const;

export type PermissionEffect = typeof PermissionEffects[keyof typeof PermissionEffects];

/** 权限效果标签 */
export const PermissionEffectLabels: Record<number, string> = {
  0: '拒绝',
  1: '允许',
};

/** 权限效果选项 */
export const PermissionEffectOptions = [
  { value: PermissionEffects.Deny, label: '拒绝' },
  { value: PermissionEffects.Allow, label: '允许' },
];

// ==================== 资源类型 ====================

/** 资源类型枚举值 */
export const ResourceTypes = {
  Library: 1,   // 文档库
  Document: 2,  // 文档
} as const;

export type ResourceType = typeof ResourceTypes[keyof typeof ResourceTypes];

// ==================== 协作角色 ====================

/** 协作角色枚举值 */
export const CollaborationRoles = {
  Editor: 1,    // 编辑协作者
  Reviewer: 2,  // 评审协作者
  Reader: 3,    // 只读协作者
} as const;

export type CollaborationRole = typeof CollaborationRoles[keyof typeof CollaborationRoles];

/** 协作角色标签 */
export const CollaborationRoleLabels: Record<number, string> = {
  1: '编辑协作者',
  2: '评审协作者',
  3: '只读协作者',
};

/** 协作角色选项 */
export const CollaborationRoleOptions = [
  { value: CollaborationRoles.Editor, label: '编辑协作者', description: '默认除发布外全部动作（不含授权管理）' },
  { value: CollaborationRoles.Reviewer, label: '评审协作者', description: '默认只读' },
  { value: CollaborationRoles.Reader, label: '只读协作者', description: '默认只读' },
];

// ==================== 权限动作 ====================

/** 权限动作枚举值 - 与API DocumentPermissionAction枚举对齐 */
export const PermissionActions = {
  // 读取类
  View: 1,
  List: 2,
  ViewHistory: 3,
  DownloadFile: 4,
  // 编辑类
  Create: 10,
  Update: 11,
  UploadFile: 12,
  DeleteFile: 13,
  Delete: 14,
  // 生命周期类
  CheckOut: 20,
  CheckIn: 21,
  ForceUnlock: 22,
  DiscardRevision: 23,
  CreateVersion: 24,
  Submit: 25,
  Approve: 26,
  Release: 27,
  Obsolete: 28,
  // 管理类
  ManageAcl: 90,
  ViewAudit: 91,
} as const;

export type PermissionAction = typeof PermissionActions[keyof typeof PermissionActions];

/** 权限动作标签 */
export const PermissionActionLabels: Record<number, string> = {
  1: '查看文档',
  2: '列出文档',
  3: '查看历史',
  4: '下载文件',
  10: '创建文档',
  11: '更新文档',
  12: '上传文件',
  13: '删除文件',
  14: '删除文档',
  20: '检出',
  21: '检入',
  22: '强制解锁',
  23: '放弃修订',
  24: '创建版本',
  25: '提交审批',
  26: '审批',
  27: '发布',
  28: '作废',
  90: '授权管理',
  91: '查看审计',
};

/** 权限动作分组（用于UI展示） */
export const PermissionActionGroups = {
  read: {
    key: 'read',
    label: '读取类',
    actions: [
      { value: PermissionActions.View, label: '查看文档' },
      { value: PermissionActions.List, label: '列出文档' },
      { value: PermissionActions.ViewHistory, label: '查看历史' },
      { value: PermissionActions.DownloadFile, label: '下载文件' },
    ],
  },
  edit: {
    key: 'edit',
    label: '编辑类',
    actions: [
      { value: PermissionActions.Create, label: '创建文档' },
      { value: PermissionActions.Update, label: '更新文档' },
      { value: PermissionActions.UploadFile, label: '上传文件' },
      { value: PermissionActions.DeleteFile, label: '删除文件' },
      { value: PermissionActions.Delete, label: '删除文档' },
    ],
  },
  lifecycle: {
    key: 'lifecycle',
    label: '生命周期',
    actions: [
      { value: PermissionActions.CheckOut, label: '检出' },
      { value: PermissionActions.CheckIn, label: '检入' },
      { value: PermissionActions.ForceUnlock, label: '强制解锁' },
      { value: PermissionActions.DiscardRevision, label: '放弃修订' },
      { value: PermissionActions.CreateVersion, label: '创建版本' },
      { value: PermissionActions.Submit, label: '提交审批' },
      { value: PermissionActions.Approve, label: '审批' },
      { value: PermissionActions.Release, label: '发布' },
      { value: PermissionActions.Obsolete, label: '作废' },
    ],
  },
  admin: {
    key: 'admin',
    label: '管理类',
    actions: [
      { value: PermissionActions.ManageAcl, label: '授权管理' },
      { value: PermissionActions.ViewAudit, label: '查看审计' },
    ],
  },
};

// ==================== 模板应用模式 ====================

/** 模板应用模式枚举值 */
export const TemplateApplyModes = {
  Replace: 1,   // 完全替换
  Merge: 2,     // 合并
  Append: 3,    // 追加
} as const;

export type TemplateApplyMode = typeof TemplateApplyModes[keyof typeof TemplateApplyModes];

/** 模板应用模式标签 */
export const TemplateApplyModeLabels: Record<number, string> = {
  1: '完全替换',
  2: '合并',
  3: '追加',
};

/** 模板应用模式选项 */
export const TemplateApplyModeOptions = [
  { value: TemplateApplyModes.Replace, label: '完全替换', description: '删除现有规则，使用模板规则' },
  { value: TemplateApplyModes.Merge, label: '合并', description: '保留现有规则，合并模板规则' },
  { value: TemplateApplyModes.Append, label: '追加', description: '在现有规则基础上追加模板规则' },
];

// ==================== 默认选中动作（最小授权原则） ====================

/** 默认只读动作集合 */
export const DefaultReadOnlyActions = [
  PermissionActions.View,
  PermissionActions.List,
  PermissionActions.DownloadFile,
];

/** 高风险动作集合（需要二次确认） */
export const HighRiskActions = [
  PermissionActions.Delete,
  PermissionActions.DeleteFile,
  PermissionActions.ForceUnlock,
  PermissionActions.Obsolete,
  PermissionActions.Release,
];
// ==================== 安全等级 ====================

/** 安全等级枚举值 */
export const SecurityLevels = {
  Public: 0,
  Internal: 1,
  Confidential: 2,
  Secret: 3,
  TopSecret: 4,
} as const;

/** 安全等级选项 */
export const SecurityLevelOptions = [
  { value: SecurityLevels.Public, label: '公开' },
  { value: SecurityLevels.Internal, label: '内部' },
  { value: SecurityLevels.Confidential, label: '秘密' },
  { value: SecurityLevels.Secret, label: '机密' },
  { value: SecurityLevels.TopSecret, label: '绝密' },
];
