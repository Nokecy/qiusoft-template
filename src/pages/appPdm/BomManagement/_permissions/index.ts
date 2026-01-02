/**
 * BOM 管理权限定义
 * 从后端 Burn.Abp.Pdm 应用中的 PdmPermissions.cs 同步
 * 更新时间：2025-01-25
 */

export const BOM_PERMISSIONS = {
  DEFAULT: 'Pdm.BomManagement',
  CREATE: 'Pdm.BomManagement.Create',
  UPDATE: 'Pdm.BomManagement.Update',
  DELETE: 'Pdm.BomManagement.Delete',
  IMPORT: 'Pdm.BomManagement.Import',
  EXPORT: 'Pdm.BomManagement.Export',
  CREATE_VERSION: 'Pdm.BomManagement.CreateVersion',
  SUBMIT_VERSION: 'Pdm.BomManagement.SubmitVersion',
  APPROVE_VERSION: 'Pdm.BomManagement.ApproveVersion',
  SET_EFFECTIVE_VERSION: 'Pdm.BomManagement.SetEffectiveVersion',
  ADD_ITEM: 'Pdm.BomManagement.AddItem',
  DELETE_ITEM: 'Pdm.BomManagement.DeleteItem',
  COMPARE: 'Pdm.BomManagement.Compare',
  REVERSE_LOOKUP: 'Pdm.BomManagement.ReverseLookup',
  DOCUMENT_VIEW: 'Pdm.BomManagement.DocumentView',
  // 别名定义，用于向后兼容
  VIEW: 'Pdm.BomManagement',
  EDIT: 'Pdm.BomManagement.Update',
  COPY: 'Pdm.BomManagement.CreateVersion',
} as const;

export type BomPermissionKey = keyof typeof BOM_PERMISSIONS;
