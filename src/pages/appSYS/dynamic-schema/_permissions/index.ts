/**
 * DynamicSchema 权限常量定义
 */

// 动态应用权限
export const DynamicApplicationPermissions = {
  Default: 'DynamicSchema.DynamicApplication',
  Create: 'DynamicSchema.DynamicApplication.Create',
  Update: 'DynamicSchema.DynamicApplication.Update',
  Delete: 'DynamicSchema.DynamicApplication.Delete',
  Manage: 'DynamicSchema.DynamicApplication.Manage',
};

// 宿主实体权限
export const HostEntityPermissions = {
  Default: 'DynamicSchema.HostEntity',
  Register: 'DynamicSchema.HostEntity.Register',
  Unregister: 'DynamicSchema.HostEntity.Unregister',
  Enable: 'DynamicSchema.HostEntity.Enable',
  Disable: 'DynamicSchema.HostEntity.Disable',
  ManageFields: 'DynamicSchema.HostEntity.ManageFields',
  ManageSchema: 'DynamicSchema.HostEntity.ManageSchema',
};

// 表单Schema权限
export const FormSchemaPermissions = {
  Default: 'DynamicSchema.FormSchema',
  Create: 'DynamicSchema.FormSchema.Create',
  Update: 'DynamicSchema.FormSchema.Update',
  Delete: 'DynamicSchema.FormSchema.Delete',
  Publish: 'DynamicSchema.FormSchema.Publish',
};

// 字段提升权限
export const FieldPromotionPermissions = {
  Default: 'DynamicSchema.FieldPromotion',
  Promote: 'DynamicSchema.FieldPromotion.Promote',
  PreCheck: 'DynamicSchema.FieldPromotion.PreCheck',
};

// 动态数据权限
export const DynamicDataPermissions = {
  Default: 'DynamicSchema.DynamicData',
  Create: 'DynamicSchema.DynamicData.Create',
  Update: 'DynamicSchema.DynamicData.Update',
  Delete: 'DynamicSchema.DynamicData.Delete',
  Export: 'DynamicSchema.DynamicData.Export',
  Import: 'DynamicSchema.DynamicData.Import',
};

// Schema管理权限
export const SchemaManagementPermissions = {
  Default: 'DynamicSchema.SchemaManagement',
  ClearCache: 'DynamicSchema.SchemaManagement.ClearCache',
  ViewAuditLog: 'DynamicSchema.SchemaManagement.ViewAuditLog',
  ExecuteDdl: 'DynamicSchema.SchemaManagement.ExecuteDdl',
};
