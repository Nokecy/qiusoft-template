declare namespace API {
	type AbpApiDefinitionGetParams = {
		IncludeTypes?: boolean;
	};

	type AbpApplicationConfigurationGetAsyncParams = {
		IncludeLocalizationResources?: boolean;
	};

	type AbpApplicationLocalizationGetAsyncParams = {
		CultureName: string;
		OnlyDynamics?: boolean;
	};

	type BurnAbpDataCopilotChartType = 0 | 1 | 2 | 3 | 4 | 5;

	type BurnAbpDataCopilotChatSessionsChatMessageDto = {
		id?: string;
		role?: BurnAbpDataCopilotMessageRole;
		/** 消息内容 */
		content?: string;
		/** 创建时间 */
		creationTime?: string;
		execution?: BurnAbpDataCopilotChatSessionsQueryExecutionDto;
		/** 输入 Token 数 */
		promptTokens?: number;
		/** 输出 Token 数 */
		completionTokens?: number;
	};

	type BurnAbpDataCopilotChatSessionsChatResponseDto = {
		userMessage?: BurnAbpDataCopilotChatSessionsChatMessageDto;
		assistantMessage?: BurnAbpDataCopilotChatSessionsChatMessageDto;
		queryResult?: BurnAbpDataCopilotChatSessionsQueryResultDto;
	};

	type BurnAbpDataCopilotChatSessionsChatSessionDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 会话标题 */
		title?: string;
		/** 关联的数据源ID */
		dataSourceId?: string;
		/** 数据源名称 */
		dataSourceName?: string;
		/** 关联的 LLM 配置ID */
		llmConfigId?: string;
		/** LLM 配置名称 */
		llmConfigName?: string;
		/** 消息数量 */
		messageCount?: number;
		/** 总输入 Token 数 */
		totalPromptTokens?: number;
		/** 总输出 Token 数 */
		totalCompletionTokens?: number;
		/** 总 Token 数 */
		totalTokens?: number;
	};

	type BurnAbpDataCopilotChatSessionsChatSessionWithMessagesDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 会话标题 */
		title?: string;
		/** 关联的数据源ID */
		dataSourceId?: string;
		/** 数据源名称 */
		dataSourceName?: string;
		/** 关联的 LLM 配置ID */
		llmConfigId?: string;
		/** LLM 配置名称 */
		llmConfigName?: string;
		/** 消息数量 */
		messageCount?: number;
		/** 总输入 Token 数 */
		totalPromptTokens?: number;
		/** 总输出 Token 数 */
		totalCompletionTokens?: number;
		/** 总 Token 数 */
		totalTokens?: number;
		/** 消息列表 */
		messages?: BurnAbpDataCopilotChatSessionsChatMessageDto[];
	};

	type BurnAbpDataCopilotChatSessionsCreateChatSessionDto = {
		/** 会话标题 */
		title?: string;
		/** 关联的数据源ID */
		dataSourceId?: string;
		/** 关联的 LLM 配置ID（可选，为空则使用默认配置） */
		llmConfigId?: string;
	};

	type BurnAbpDataCopilotChatSessionsQueryColumnDto = {
		/** 列名 */
		name?: string;
		/** 数据类型 */
		dataType?: string;
	};

	type BurnAbpDataCopilotChatSessionsQueryExecutionDto = {
		id?: string;
		/** 生成的 SQL */
		generatedSql?: string;
		/** SQL 解释说明 */
		explanation?: string;
		status?: BurnAbpDataCopilotExecutionStatus;
		/** 错误信息 */
		errorMessage?: string;
		/** 执行时间（毫秒） */
		executionTimeMs?: number;
		/** 返回行数 */
		rowCount?: number;
		chartType?: BurnAbpDataCopilotChartType;
		/** 图表配置（ECharts option JSON） */
		chartConfigJson?: string;
		/** 重试次数 */
		retryCount?: number;
		/** Token 消耗 */
		tokensUsed?: number;
	};

	type BurnAbpDataCopilotChatSessionsQueryResultDto = {
		/** 列定义 */
		columns?: BurnAbpDataCopilotChatSessionsQueryColumnDto[];
		/** 数据行（JSON 数组） */
		rows?: Record<string, any>[];
		/** 总行数 */
		totalCount?: number;
		/** 是否被截断 */
		isTruncated?: boolean;
	};

	type BurnAbpDataCopilotChatSessionsSendMessageDto = {
		/** 会话ID */
		sessionId?: string;
		/** 用户消息内容 */
		message?: string;
	};

	type BurnAbpDataCopilotChatSessionsUpdateChatSessionDto = {
		/** 会话标题 */
		title?: string;
	};

	type BurnAbpDataCopilotDatabaseType = 1 | 2 | 3;

	type BurnAbpDataCopilotDataSourcesColumnSchemaDto = {
		id?: string;
		/** 列名 */
		columnName?: string;
		/** 业务别名 */
		businessAlias?: string;
		/** 数据类型 */
		dataType?: string;
		/** 注释 */
		comment?: string;
		/** 是否可空 */
		isNullable?: boolean;
		/** 是否主键 */
		isPrimaryKey?: boolean;
		/** 是否外键 */
		isForeignKey?: boolean;
		/** 排序序号 */
		ordinalPosition?: number;
		/** 样本值 */
		sampleValues?: string[];
	};

	type BurnAbpDataCopilotDataSourcesCreateDataSourceDto = {
		/** 数据源名称 */
		name?: string;
		/** 描述 */
		description?: string;
		dbType?: BurnAbpDataCopilotDatabaseType;
		/** 连接字符串（明文，后端会加密存储） */
		connectionString?: string;
	};

	type BurnAbpDataCopilotDataSourcesDataSourceDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 数据源名称 */
		name?: string;
		/** 描述 */
		description?: string;
		dbType?: BurnAbpDataCopilotDatabaseType;
		/** 是否启用 */
		isActive?: boolean;
		/** 最后 Schema 同步时间 */
		lastSchemaSyncTime?: string;
		syncStatus?: BurnAbpDataCopilotSchemaSyncStatus;
		/** 表数量 */
		tableCount?: number;
	};

	type BurnAbpDataCopilotDataSourcesDataSourceWithTablesDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 数据源名称 */
		name?: string;
		/** 描述 */
		description?: string;
		dbType?: BurnAbpDataCopilotDatabaseType;
		/** 是否启用 */
		isActive?: boolean;
		/** 最后 Schema 同步时间 */
		lastSchemaSyncTime?: string;
		syncStatus?: BurnAbpDataCopilotSchemaSyncStatus;
		/** 表数量 */
		tableCount?: number;
		/** 表结构列表 */
		tables?: BurnAbpDataCopilotDataSourcesTableSchemaDto[];
	};

	type BurnAbpDataCopilotDataSourcesRemoteColumnDto = {
		name?: string;
		dataType?: string;
		comment?: string;
		isPrimaryKey?: boolean;
		isNullable?: boolean;
	};

	type BurnAbpDataCopilotDataSourcesRemoteTableDto = {
		name?: string;
		schema?: string;
		comment?: string;
		type?: string;
		estimatedRowCount?: number;
	};

	type BurnAbpDataCopilotDataSourcesSchemaSyncResultDto = {
		/** 是否成功 */
		success?: boolean;
		/** 错误信息 */
		errorMessage?: string;
		/** 发现的表数量 */
		tablesFound?: number;
		/** 已索引的表数量 */
		tablesIndexed?: number;
		/** 新增表数量（增量同步） */
		tablesAdded?: number;
		/** 更新表数量（增量同步） */
		tablesUpdated?: number;
		/** 删除表数量（增量同步） */
		tablesDeleted?: number;
		/** 耗时（毫秒） */
		durationMs?: number;
	};

	type BurnAbpDataCopilotDataSourcesSelectedTableInfo = {
		name?: string;
		schema?: string;
		/** 表别名 */
		businessAlias?: string;
		/** 列别名配置 (ColumnName -> Alias) */
		columnAliases?: Record<string, any>;
	};

	type BurnAbpDataCopilotDataSourcesSyncSelectedTablesInput = {
		/** 要同步的表列表（Schema.TableName 或 TableName） */
		tables?: BurnAbpDataCopilotDataSourcesSelectedTableInfo[];
	};

	type BurnAbpDataCopilotDataSourcesTableSchemaDto = {
		id?: string;
		/** 表名 */
		tableName?: string;
		/** 业务别名 */
		businessAlias?: string;
		/** 注释 */
		comment?: string;
		/** Schema 名称 */
		schemaName?: string;
		/** 表类型 */
		tableType?: string;
		/** 估算行数 */
		estimatedRowCount?: number;
		/** 列数量 */
		columnCount?: number;
		/** 列结构 */
		columns?: BurnAbpDataCopilotDataSourcesColumnSchemaDto[];
	};

	type BurnAbpDataCopilotDataSourcesTestConnectionDto = {
		dbType?: BurnAbpDataCopilotDatabaseType;
		/** 连接字符串 */
		connectionString?: string;
	};

	type BurnAbpDataCopilotDataSourcesTestConnectionResultDto = {
		/** 是否成功 */
		success?: boolean;
		/** 消息 */
		message?: string;
		/** 数据库版本 */
		databaseVersion?: string;
	};

	type BurnAbpDataCopilotDataSourcesUpdateBusinessAliasDto = {
		/** 表别名 */
		tableAlias?: string;
		/** 列别名字典（列ID -> 别名） */
		columnAliases?: Record<string, any>;
	};

	type BurnAbpDataCopilotDataSourcesUpdateDataSourceDto = {
		/** 数据源名称 */
		name?: string;
		/** 描述 */
		description?: string;
		/** 是否启用 */
		isActive?: boolean;
		/** 连接字符串（可选，为空则不更新） */
		connectionString?: string;
	};

	type BurnAbpDataCopilotExampleSource = 1 | 2;

	type BurnAbpDataCopilotExecutionStatus = 0 | 1 | 2 | 3 | 4;

	type BurnAbpDataCopilotFeedbackCreateUserFeedbackDto = {
		/** 关联的会话 ID */
		sessionId: string;
		/** 关联的消息 ID */
		messageId: string;
		feedbackType: BurnAbpDataCopilotFeedbackType;
		/** 用户评论 */
		comment?: string;
		/** 修正后的 SQL（如果用户提供） */
		correctedSql?: string;
	};

	type BurnAbpDataCopilotFeedbackType = 1 | 2;

	type BurnAbpDataCopilotFeedbackUpdateUserFeedbackDto = {
		feedbackType: BurnAbpDataCopilotFeedbackType;
		/** 用户评论 */
		comment?: string;
		/** 修正后的 SQL */
		correctedSql?: string;
	};

	type BurnAbpDataCopilotFeedbackUserFeedbackDto = {
		id?: string;
		/** 关联的会话 ID */
		sessionId?: string;
		/** 关联的消息 ID */
		messageId?: string;
		feedbackType?: BurnAbpDataCopilotFeedbackType;
		/** 用户评论 */
		comment?: string;
		/** 修正后的 SQL（如果用户提供） */
		correctedSql?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 创建用户 ID */
		creatorId?: string;
	};

	type BurnAbpDataCopilotFewShotCreateFewShotExampleDto = {
		/** 关联的数据源 ID */
		dataSourceId: string;
		/** 自然语言问题 */
		question: string;
		/** 标准 SQL 答案 */
		sql: string;
		source?: BurnAbpDataCopilotExampleSource;
		/** 质量评分（1-5） */
		qualityScore?: number;
		/** 标签（用于分类和检索，多个标签用逗号分隔） */
		tags?: string;
	};

	type BurnAbpDataCopilotFewShotFewShotExampleDto = {
		id?: string;
		/** 关联的数据源 ID */
		dataSourceId?: string;
		/** 数据源名称 */
		dataSourceName?: string;
		/** 自然语言问题 */
		question?: string;
		/** 标准 SQL 答案 */
		sql?: string;
		source?: BurnAbpDataCopilotExampleSource;
		/** 质量评分（1-5） */
		qualityScore?: number;
		/** 是否激活 */
		isActive?: boolean;
		/** 标签（用于分类和检索） */
		tags?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 创建用户 ID */
		creatorId?: string;
	};

	type BurnAbpDataCopilotFewShotUpdateFewShotExampleDto = {
		/** 自然语言问题 */
		question: string;
		/** 标准 SQL 答案 */
		sql: string;
		/** 质量评分（1-5） */
		qualityScore?: number;
		/** 是否激活 */
		isActive?: boolean;
		/** 标签 */
		tags?: string;
	};

	type BurnAbpDataCopilotLlmConfigsCreateLlmConfigDto = {
		/** 配置名称 */
		name?: string;
		/** 描述 */
		description?: string;
		provider?: BurnAbpDataCopilotLlmProvider;
		/** API 端点 */
		endpoint?: string;
		/** API Key（明文，后端会加密存储） */
		apiKey?: string;
		/** 模型名称 */
		modelName?: string;
		/** Embedding 模型名称 */
		embeddingModelName?: string;
		/** 最大 Token 数 */
		maxTokens?: number;
		/** Temperature 参数 */
		temperature?: number;
	};

	type BurnAbpDataCopilotLlmConfigsLlmConfigDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 配置名称 */
		name?: string;
		/** 描述 */
		description?: string;
		provider?: BurnAbpDataCopilotLlmProvider;
		/** API 端点 */
		endpoint?: string;
		/** 模型名称 */
		modelName?: string;
		/** Embedding 模型名称 */
		embeddingModelName?: string;
		/** 最大 Token 数 */
		maxTokens?: number;
		/** Temperature 参数 */
		temperature?: number;
		/** 是否为默认配置 */
		isDefault?: boolean;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpDataCopilotLlmConfigsTestLlmConnectionDto = {
		provider?: BurnAbpDataCopilotLlmProvider;
		/** API 端点 */
		endpoint?: string;
		/** API Key */
		apiKey?: string;
		/** 模型名称 */
		modelName?: string;
	};

	type BurnAbpDataCopilotLlmConfigsTestLlmConnectionResultDto = {
		/** 是否成功 */
		success?: boolean;
		/** 消息 */
		message?: string;
		/** 响应时间（毫秒） */
		responseTimeMs?: number;
	};

	type BurnAbpDataCopilotLlmConfigsUpdateLlmConfigDto = {
		/** 配置名称 */
		name?: string;
		/** 描述 */
		description?: string;
		/** API 端点 */
		endpoint?: string;
		/** API Key（可选，为空则不更新） */
		apiKey?: string;
		/** 模型名称 */
		modelName?: string;
		/** Embedding 模型名称 */
		embeddingModelName?: string;
		/** 最大 Token 数 */
		maxTokens?: number;
		/** Temperature 参数 */
		temperature?: number;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpDataCopilotLlmProvider = 1 | 2 | 3 | 4 | 5 | 99;

	type BurnAbpDataCopilotMessageRole = 1 | 2 | 3;

	type BurnAbpDataCopilotSchemaSyncStatus = 0 | 1 | 2 | 3 | 4;

	type ChatSessionDeleteAsyncParams = {
		id: string;
	};

	type ChatSessionGetAsyncParams = {
		id: string;
	};

	type ChatSessionGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ChatSessionGetRecentListAsyncParams = {
		count?: number;
	};

	type ChatSessionGetWithMessagesAsyncParams = {
		id: string;
		messageLimit?: number;
	};

	type ChatSessionUpdateAsyncParams = {
		id: string;
	};

	type DataSourceDeleteAsyncParams = {
		id: string;
	};

	type DataSourceGetAsyncParams = {
		id: string;
	};

	type DataSourceGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DataSourceGetRemoteTableColumnsAsyncParams = {
		id: string;
		tableName: string;
	};

	type DataSourceGetRemoteTablesAsyncParams = {
		id: string;
	};

	type DataSourceGetWithTablesAsyncParams = {
		id: string;
	};

	type DataSourceIncrementalSyncSchemaAsyncParams = {
		id: string;
	};

	type DataSourceReindexAsyncParams = {
		id: string;
	};

	type DataSourceSyncSchemaAsyncParams = {
		id: string;
	};

	type DataSourceSyncSelectedTablesAsyncParams = {
		id: string;
	};

	type DataSourceUpdateAsyncParams = {
		id: string;
	};

	type DataSourceUpdateBusinessAliasAsyncParams = {
		dataSourceId: string;
		tableId: string;
	};

	type FeedbackDeleteAsyncParams = {
		id: string;
	};

	type FeedbackGetAsyncParams = {
		id: string;
	};

	type FeedbackGetByMessageAsyncParams = {
		messageId: string;
	};

	type FeedbackGetListAsyncParams = {
		/** 反馈类型筛选

1 = Like

2 = Dislike */
		FeedbackType?: BurnAbpDataCopilotFeedbackType;
		/** 会话 ID 筛选 */
		SessionId?: string;
		/** 关键词筛选（评论或修正 SQL） */
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FeedbackGetListBySessionAsyncParams = {
		sessionId: string;
	};

	type FeedbackUpdateAsyncParams = {
		id: string;
	};

	type FewShotExampleActivateAsyncParams = {
		id: string;
	};

	type FewShotExampleDeactivateAsyncParams = {
		id: string;
	};

	type FewShotExampleDeleteAsyncParams = {
		id: string;
	};

	type FewShotExampleGetActiveByDataSourceAsyncParams = {
		dataSourceId: string;
		maxCount?: number;
	};

	type FewShotExampleGetAsyncParams = {
		id: string;
	};

	type FewShotExampleGetListAsyncParams = {
		/** 数据源 ID（可选筛选） */
		DataSourceId?: string;
		/** 来源筛选

1 = Manual

2 = UserFeedback */
		Source?: BurnAbpDataCopilotExampleSource;
		/** 激活状态筛选 */
		IsActive?: boolean;
		/** 标签筛选（模糊匹配） */
		Tag?: string;
		/** 关键词搜索（问题中包含） */
		Keyword?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FewShotExampleUpdateAsyncParams = {
		id: string;
	};

	type LlmConfigDeleteAsyncParams = {
		id: string;
	};

	type LlmConfigGetAsyncParams = {
		id: string;
	};

	type LlmConfigGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LlmConfigSetAsDefaultAsyncParams = {
		id: string;
	};

	type LlmConfigUpdateAsyncParams = {
		id: string;
	};

	type SchemaGetDataSourceWithTablesAsyncParams = {
		dataSourceId: string;
	};

	type SchemaGetTablesAsyncParams = {
		dataSourceId: string;
	};

	type SchemaSyncSchemaAsyncParams = {
		dataSourceId: string;
	};

	type SchemaUpdateTableAliasAsyncParams = {
		dataSourceId: string;
		tableId: string;
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotChatSessionsChatSessionDto = {
		items?: BurnAbpDataCopilotChatSessionsChatSessionDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesDataSourceDto = {
		items?: BurnAbpDataCopilotDataSourcesDataSourceDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesRemoteColumnDto = {
		items?: BurnAbpDataCopilotDataSourcesRemoteColumnDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesRemoteTableDto = {
		items?: BurnAbpDataCopilotDataSourcesRemoteTableDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesTableSchemaDto = {
		items?: BurnAbpDataCopilotDataSourcesTableSchemaDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotFeedbackUserFeedbackDto = {
		items?: BurnAbpDataCopilotFeedbackUserFeedbackDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotFewShotFewShotExampleDto = {
		items?: BurnAbpDataCopilotFewShotFewShotExampleDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotLlmConfigsLlmConfigDto = {
		items?: BurnAbpDataCopilotLlmConfigsLlmConfigDto[];
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotChatSessionsChatSessionDto = {
		items?: BurnAbpDataCopilotChatSessionsChatSessionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotDataSourcesDataSourceDto = {
		items?: BurnAbpDataCopilotDataSourcesDataSourceDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotFeedbackUserFeedbackDto = {
		items?: BurnAbpDataCopilotFeedbackUserFeedbackDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotFewShotFewShotExampleDto = {
		items?: BurnAbpDataCopilotFewShotFewShotExampleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotLlmConfigsLlmConfigDto = {
		items?: BurnAbpDataCopilotLlmConfigsLlmConfigDto[];
		totalCount?: number;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto = {
		grantedPolicies?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationConfigurationDto = {
		localization?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto;
		auth?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationAuthConfigurationDto;
		setting?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto;
		currentUser?: VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto;
		features?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto;
		globalFeatures?: VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto;
		multiTenancy?: VoloAbpAspNetCoreMvcMultiTenancyMultiTenancyInfoDto;
		currentTenant?: VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto;
		timing?: VoloAbpAspNetCoreMvcApplicationConfigurationsTimingDto;
		clock?: VoloAbpAspNetCoreMvcApplicationConfigurationsClockDto;
		objectExtensions?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingObjectExtensionsDto;
		extraProperties?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationFeatureConfigurationDto = {
		values?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationGlobalFeatureConfigurationDto = {
		enabledFeatures?: string[];
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationConfigurationDto = {
		values?: Record<string, any>;
		resources?: Record<string, any>;
		languages?: VoloAbpLocalizationLanguageInfo[];
		currentCulture?: VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentCultureDto;
		defaultResourceName?: string;
		languagesMap?: Record<string, any>;
		languageFilesMap?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationDto = {
		resources?: Record<string, any>;
		currentCulture?: VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentCultureDto;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationLocalizationResourceDto = {
		texts?: Record<string, any>;
		baseResources?: string[];
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsApplicationSettingConfigurationDto = {
		values?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsClockDto = {
		kind?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentCultureDto = {
		displayName?: string;
		englishName?: string;
		threeLetterIsoLanguageName?: string;
		twoLetterIsoLanguageName?: string;
		isRightToLeft?: boolean;
		cultureName?: string;
		name?: string;
		nativeName?: string;
		dateTimeFormat?: VoloAbpAspNetCoreMvcApplicationConfigurationsDateTimeFormatDto;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsCurrentUserDto = {
		isAuthenticated?: boolean;
		id?: string;
		tenantId?: string;
		impersonatorUserId?: string;
		impersonatorTenantId?: string;
		impersonatorUserName?: string;
		impersonatorTenantName?: string;
		userName?: string;
		name?: string;
		surName?: string;
		email?: string;
		emailVerified?: boolean;
		phoneNumber?: string;
		phoneNumberVerified?: boolean;
		roles?: string[];
		sessionId?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsDateTimeFormatDto = {
		calendarAlgorithmType?: string;
		dateTimeFormatLong?: string;
		shortDatePattern?: string;
		fullDateTimePattern?: string;
		dateSeparator?: string;
		shortTimePattern?: string;
		longTimePattern?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsIanaTimeZone = {
		timeZoneName?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingEntityExtensionDto = {
		properties?: Record<string, any>;
		configuration?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionEnumDto = {
		fields?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionEnumFieldDto[];
		localizationResource?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionEnumFieldDto = {
		name?: string;
		value?: any;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiCreateDto = {
		isAvailable?: boolean;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiDto = {
		onGet?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiGetDto;
		onCreate?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiCreateDto;
		onUpdate?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiUpdateDto;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiGetDto = {
		isAvailable?: boolean;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiUpdateDto = {
		isAvailable?: boolean;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyAttributeDto = {
		typeSimple?: string;
		config?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyDto = {
		type?: string;
		typeSimple?: string;
		displayName?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingLocalizableStringDto;
		api?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyApiDto;
		ui?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiDto;
		attributes?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyAttributeDto[];
		configuration?: Record<string, any>;
		defaultValue?: any;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiDto = {
		onTable?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiTableDto;
		onCreateForm?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiFormDto;
		onEditForm?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiFormDto;
		lookup?: VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiLookupDto;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiFormDto = {
		isVisible?: boolean;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiLookupDto = {
		url?: string;
		resultListPropertyName?: string;
		displayPropertyName?: string;
		valuePropertyName?: string;
		filterParamName?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingExtensionPropertyUiTableDto = {
		isVisible?: boolean;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingLocalizableStringDto = {
		name?: string;
		resource?: string;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingModuleExtensionDto = {
		entities?: Record<string, any>;
		configuration?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsObjectExtendingObjectExtensionsDto = {
		modules?: Record<string, any>;
		enums?: Record<string, any>;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsTimeZone = {
		iana?: VoloAbpAspNetCoreMvcApplicationConfigurationsIanaTimeZone;
		windows?: VoloAbpAspNetCoreMvcApplicationConfigurationsWindowsTimeZone;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsTimingDto = {
		timeZone?: VoloAbpAspNetCoreMvcApplicationConfigurationsTimeZone;
	};

	type VoloAbpAspNetCoreMvcApplicationConfigurationsWindowsTimeZone = {
		timeZoneId?: string;
	};

	type VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto = {
		id?: string;
		name?: string;
		isAvailable?: boolean;
	};

	type VoloAbpAspNetCoreMvcMultiTenancyMultiTenancyInfoDto = {
		isEnabled?: boolean;
	};

	type VoloAbpHttpModelingActionApiDescriptionModel = {
		uniqueName?: string;
		name?: string;
		httpMethod?: string;
		url?: string;
		supportedVersions?: string[];
		parametersOnMethod?: VoloAbpHttpModelingMethodParameterApiDescriptionModel[];
		parameters?: VoloAbpHttpModelingParameterApiDescriptionModel[];
		returnValue?: VoloAbpHttpModelingReturnValueApiDescriptionModel;
		allowAnonymous?: boolean;
		implementFrom?: string;
	};

	type VoloAbpHttpModelingApplicationApiDescriptionModel = {
		modules?: Record<string, any>;
		types?: Record<string, any>;
	};

	type VoloAbpHttpModelingControllerApiDescriptionModel = {
		controllerName?: string;
		controllerGroupName?: string;
		isRemoteService?: boolean;
		isIntegrationService?: boolean;
		apiVersion?: string;
		type?: string;
		interfaces?: VoloAbpHttpModelingControllerInterfaceApiDescriptionModel[];
		actions?: Record<string, any>;
	};

	type VoloAbpHttpModelingControllerInterfaceApiDescriptionModel = {
		type?: string;
		name?: string;
		methods?: VoloAbpHttpModelingInterfaceMethodApiDescriptionModel[];
	};

	type VoloAbpHttpModelingInterfaceMethodApiDescriptionModel = {
		name?: string;
		parametersOnMethod?: VoloAbpHttpModelingMethodParameterApiDescriptionModel[];
		returnValue?: VoloAbpHttpModelingReturnValueApiDescriptionModel;
	};

	type VoloAbpHttpModelingMethodParameterApiDescriptionModel = {
		name?: string;
		typeAsString?: string;
		type?: string;
		typeSimple?: string;
		isOptional?: boolean;
		defaultValue?: any;
	};

	type VoloAbpHttpModelingModuleApiDescriptionModel = {
		rootPath?: string;
		remoteServiceName?: string;
		controllers?: Record<string, any>;
	};

	type VoloAbpHttpModelingParameterApiDescriptionModel = {
		nameOnMethod?: string;
		name?: string;
		jsonName?: string;
		type?: string;
		typeSimple?: string;
		isOptional?: boolean;
		defaultValue?: any;
		constraintTypes?: string[];
		bindingSourceId?: string;
		descriptorName?: string;
	};

	type VoloAbpHttpModelingPropertyApiDescriptionModel = {
		name?: string;
		jsonName?: string;
		type?: string;
		typeSimple?: string;
		isRequired?: boolean;
		minLength?: number;
		maxLength?: number;
		minimum?: string;
		maximum?: string;
		regex?: string;
	};

	type VoloAbpHttpModelingReturnValueApiDescriptionModel = {
		type?: string;
		typeSimple?: string;
	};

	type VoloAbpHttpModelingTypeApiDescriptionModel = {
		baseType?: string;
		isEnum?: boolean;
		enumNames?: string[];
		enumValues?: any[];
		genericArguments?: string[];
		properties?: VoloAbpHttpModelingPropertyApiDescriptionModel[];
	};

	type VoloAbpHttpRemoteServiceErrorInfo = {
		code?: string;
		message?: string;
		details?: string;
		data?: Record<string, any>;
		validationErrors?: VoloAbpHttpRemoteServiceValidationErrorInfo[];
	};

	type VoloAbpHttpRemoteServiceErrorResponse = {
		error?: VoloAbpHttpRemoteServiceErrorInfo;
	};

	type VoloAbpHttpRemoteServiceValidationErrorInfo = {
		message?: string;
		members?: string[];
	};

	type VoloAbpLocalizationLanguageInfo = {
		cultureName?: string;
		uiCultureName?: string;
		displayName?: string;
		twoLetterISOLanguageName?: string;
	};

	type VoloAbpNameValue = {
		name?: string;
		value?: string;
	};
}
