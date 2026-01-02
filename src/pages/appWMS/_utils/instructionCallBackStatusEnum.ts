/**
 * 指令回传状态枚举
 */
export enum InstructionCallBackStatusEnum {
  /** 未设置 */
  NotSet = 0,
  /** 不回传 */
  NoCallBack = 5,
  /** 合并回传 */
  MergeCallBack = 6,
  /** 等待回传 */
  WaitingCallBack = 10,
  /** 回传中 */
  Calling = 15,
  /** 回传完成 */
  CallBackCompleted = 20,
  /** 回传失败 */
  CallBackFailed = 25
}

/**
 * 回传状态 valueEnum 配置 - 用于 AgGridColumn
 */
export const instructionCallBackStatusEnum = [
  { label: "未设置", value: InstructionCallBackStatusEnum.NotSet, color: '#bfbfbf' },
  { label: "不回传", value: InstructionCallBackStatusEnum.NoCallBack, color: '#d9d9d9' },
  { label: "合并回传", value: InstructionCallBackStatusEnum.MergeCallBack, color: '#91d5ff' },
  { label: "等待回传", value: InstructionCallBackStatusEnum.WaitingCallBack, color: '#faad14' },
  { label: "回传中", value: InstructionCallBackStatusEnum.Calling, color: '#108ee9' },
  { label: "回传完成", value: InstructionCallBackStatusEnum.CallBackCompleted, color: '#52c41a' },
  { label: "回传失败", value: InstructionCallBackStatusEnum.CallBackFailed, color: '#f5222d' }
];

/**
 * 回传状态选项数据 - 用于 Select 组件
 */
export const callBackStatusOptions = instructionCallBackStatusEnum.map(item => ({
  label: item.label,
  value: item.value
}));