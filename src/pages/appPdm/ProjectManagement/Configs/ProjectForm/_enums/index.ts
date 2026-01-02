/**
 * 项目表单状态枚举
 */
export enum ProjectFormStatusEnum {
  /** 草稿 */
  Draft = 0,
  /** 审核中 */
  Reviewing = 1,
  /** 已发布 */
  Published = 2,
  /** 已废弃 */
  Deprecated = 3,
}

/**
 * 项目表单状态枚举配置（用于表格显示）
 */
export const projectFormStatusEnum = [
  { label: '草稿', value: ProjectFormStatusEnum.Draft, color: '#faad14' },
  { label: '审核中', value: ProjectFormStatusEnum.Reviewing, color: '#1890ff' },
  { label: '已发布', value: ProjectFormStatusEnum.Published, color: '#52c41a' },
  { label: '已废弃', value: ProjectFormStatusEnum.Deprecated, color: '#d9d9d9' },
];
