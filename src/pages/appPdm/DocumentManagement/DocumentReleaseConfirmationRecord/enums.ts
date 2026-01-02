/**
 * 接收人确认状态枚举
 */
export enum RecipientConfirmationStatusEnum {
  /** 未确认 - 等待接收人确认 */
  Pending = 0,
  /** 已确认 - 接收人已确认接收 */
  Confirmed = 10,
  /** 已拒绝 - 接收人拒绝接收 */
  Rejected = 20,
  /** 已回收 - 文档已被回收 */
  Recalled = 30,
}

/**
 * 接收人确认状态枚举配置
 */
export const recipientConfirmationStatusEnum = [
  { label: '未确认', value: RecipientConfirmationStatusEnum.Pending, color: 'default' },
  { label: '已确认', value: RecipientConfirmationStatusEnum.Confirmed, color: '#52c41a' },
  { label: '已拒绝', value: RecipientConfirmationStatusEnum.Rejected, color: '#ff4d4f' },
  { label: '已回收', value: RecipientConfirmationStatusEnum.Recalled, color: '#faad14' },
];
