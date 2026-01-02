/**
 * DataCopilot 权限定义
 */
export const DataCopilotPermissions = {
  // 数据源管理
  DataSources: {
    Default: 'DataCopilot.DataSources',
    Create: 'DataCopilot.DataSources.Create',
    Edit: 'DataCopilot.DataSources.Edit',
    Delete: 'DataCopilot.DataSources.Delete',
    SyncSchema: 'DataCopilot.DataSources.SyncSchema',
    ManageAlias: 'DataCopilot.DataSources.ManageAlias',
  },

  // LLM 配置
  LlmConfigs: {
    Default: 'DataCopilot.LlmConfigs',
    Create: 'DataCopilot.LlmConfigs.Create',
    Edit: 'DataCopilot.LlmConfigs.Edit',
    Delete: 'DataCopilot.LlmConfigs.Delete',
    SetDefault: 'DataCopilot.LlmConfigs.SetDefault',
  },

  // 对话会话
  ChatSessions: {
    Default: 'DataCopilot.ChatSessions',
    Create: 'DataCopilot.ChatSessions.Create',
    Delete: 'DataCopilot.ChatSessions.Delete',
    Chat: 'DataCopilot.ChatSessions.Chat',
  },

  // Few-Shot 示例
  FewShotExamples: {
    Default: 'DataCopilot.FewShotExamples',
    Create: 'DataCopilot.FewShotExamples.Create',
    Edit: 'DataCopilot.FewShotExamples.Edit',
    Delete: 'DataCopilot.FewShotExamples.Delete',
  },

  // 用户反馈
  Feedback: {
    Default: 'DataCopilot.Feedback',
  },
} as const;
