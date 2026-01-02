/**
 * 问题状态枚举
 * 对应后端: BurnAbpPdmProjectsIssueStatus
 */
export enum IssueStatus {
  Open = 0,              // 打开（未指派）
  PendingReceive = 5,    // 待接收（已指派未接收）
  InProgress = 10,       // 处理中
  Received = 15,         // 已接收（已接收未开始）
  Resolved = 20,         // 已解决
  Closed = 30,           // 已关闭
  Cancelled = 40,        // 已取消
}

/**
 * 问题状态枚举配置
 */
export const issueStatusEnum = [
  { label: '打开', value: IssueStatus.Open, color: 'default' },
  { label: '待接收', value: IssueStatus.PendingReceive, color: 'orange' },
  { label: '已接收', value: IssueStatus.Received, color: 'blue' },
  { label: '处理中', value: IssueStatus.InProgress, color: 'processing' },
  { label: '已解决', value: IssueStatus.Resolved, color: 'success' },
  { label: '已关闭', value: IssueStatus.Closed, color: 'default' },
  { label: '已取消', value: IssueStatus.Cancelled, color: 'default' },
];

/**
 * 严重程度枚举
 * 对应后端: BurnAbpPdmProjectsRiskPriority
 */
export const severityEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
  { label: '紧急', value: 30, color: 'red' },
];

/**
 * 紧急程度枚举
 * 对应后端: BurnAbpPdmProjectsUrgencyLevel
 */
export const urgencyEnum = [
  { label: '低', value: 0, color: 'default' },
  { label: '中', value: 10, color: 'warning' },
  { label: '高', value: 20, color: 'error' },
];
