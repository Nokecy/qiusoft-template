export enum OrderStatus {
  Draft = 2,                    // 草稿状态 - 对应 "B1"
  Draft1 = 4,                   // 草稿状态1 - 对应 "B2"
  Draft2 = 8,                   // 草稿状态2 - 对应 "B3"
  ReturnedForModification = 16, // 退回修改状态 - 对应 "C1"
  Approved = 32                 // 审核通过状态 - 对应 "D1"
}

export const orderStatusEnum = [
  { label: "草稿", value: 2, color: '#d9d9d9' },
  { label: "草稿1", value: 4, color: '#d9d9d9' },
  { label: "草稿2", value: 8, color: '#d9d9d9' },
  { label: "退回修改", value: 16, color: '#faad14' },
  { label: "已审核", value: 32, color: '#52c41a' }
];