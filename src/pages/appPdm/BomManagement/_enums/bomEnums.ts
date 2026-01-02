/**
 * BOM 管理模块枚举定义
 */

// BOM 状态枚举
export enum BomStatusEnum {
  Draft = 0,          // 草稿
  Released = 5,       // 激活
  Obsolete = 10,      // 停用
}

export const bomStatusMap = [
  { label: '草稿', value: BomStatusEnum.Draft, color: '#d9d9d9' },
  { label: '激活', value: BomStatusEnum.Released, color: '#52c41a' },
  { label: '停用', value: BomStatusEnum.Obsolete, color: '#ff4d4f' },
];

// BOM 子项激活状态
export enum BomItemActivationStatusEnum {
  Draft = 0,          // 草稿
  Active = 5,         // 激活
  Inactive = 10,      // 停用
}

export const bomItemActivationStatusMap = [
  { label: '草稿', value: BomItemActivationStatusEnum.Draft, color: '#d9d9d9' },
  { label: '激活', value: BomItemActivationStatusEnum.Active, color: '#52c41a' },
  { label: '停用', value: BomItemActivationStatusEnum.Inactive, color: '#ff4d4f' },
];

// 物料版本状态
export enum MaterialEditionStatusEnum {
  Draft = 0,          // 草稿
  Active = 1,         // 激活
  Obsolete = 2,       // 停用
}

export const materialEditionStatusMap = [
  { label: '草稿', value: MaterialEditionStatusEnum.Draft, color: '#d9d9d9' },
  { label: '激活', value: MaterialEditionStatusEnum.Active, color: '#52c41a' },
  { label: '停用', value: MaterialEditionStatusEnum.Obsolete, color: '#ff4d4f' },
];

// 通用版本状态 (匹配后端 Burn.Abp.Pdm.Common.VersionStatus)
export enum CommonVersionStatusEnum {
  Draft = 0,             // 草稿
  PendingApproval = 10,  // 待审批
  Released = 20,         // 已发布
  Obsolete = 40,         // 已作废
}

export const commonVersionStatusMap = [
  { label: '草稿', value: CommonVersionStatusEnum.Draft, color: '#d9d9d9' },
  { label: '待审批', value: CommonVersionStatusEnum.PendingApproval, color: '#faad14' },
  { label: '已发布', value: CommonVersionStatusEnum.Released, color: '#52c41a' },
  { label: '已作废', value: CommonVersionStatusEnum.Obsolete, color: '#ff4d4f' },
];

// BOM 版本状态（使用通用版本状态）
export const bomVersionStatusMap = commonVersionStatusMap;
