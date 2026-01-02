declare namespace API {
	type AbpApiDefinitionGetParams = {
		IncludeTypes?: boolean;
	};

	type AbpApplicationConfigurationGetParams = {
		IncludeLocalizationResources?: boolean;
	};

	type AbpApplicationLocalizationGetParams = {
		CultureName?: string;
		OnlyDynamics?: boolean;
	};

	type AbpWorkflowDynamicFormExecuteDynamicFormWorkflowParams = {
		id: string;
	};

	type BurnAbpBadgeBadgeInfo = {
		name?: string;
		count?: number;
	};

	type BurnAbpWorkflowManagementApplicationCreateWorkflowDynamicFormDataInput = {
		tableName?: string;
		data?: Record<string, any>;
		workflowDefinitionId?: string;
		workflowVersion?: number;
		workflowInstanceId?: string;
		workflowName?: string;
		activityId?: string;
		activityName?: string;
		activityDisplayName?: string;
		activityDescription?: string;
		assigneeName?: string;
		assigneeTime?: string;
		status?: number;
	};

	type BurnAbpWorkflowManagementApplicationExecuteWorkflowDynamicFormInput =
		// #/components/schemas/BurnAbpWorkflowManagementApplicationCreateWorkflowDynamicFormDataInput
		BurnAbpWorkflowManagementApplicationCreateWorkflowDynamicFormDataInput & {
			executeInput?: BurnAbpWorkflowManagementApplicationExecuteWorkflowInputDto;
		};

	type BurnAbpWorkflowManagementApplicationExecuteWorkflowInputDto = {
		executeType?: VoloAbpElsaAbstractEnumsExecuteType;
		nextActivity?: string;
		assignUser?: string;
		backActivity?: string;
		nextAssignUser?: string;
		message?: string;
		executor?: string;
		copyToUsers?: string[];
	};

	type BurnAbpWorkflowManagementApplicationTaskOverdueWarningsCreateTaskOverdueWarningSettingDto = {
		workflowName?: string;
		workflowDisplayName?: string;
		overdueDurationHours?: number;
		topCount?: number;
		recipients?: BurnAbpWorkflowManagementApplicationTaskOverdueWarningsCreateUpdateTaskOverdueWarningRecipientDto[];
	};

	type BurnAbpWorkflowManagementApplicationTaskOverdueWarningsCreateUpdateTaskOverdueWarningRecipientDto = {
		id?: string;
		userId?: string;
		name?: string;
	};

	type BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningRecipientDto = {
		userId?: string;
		name?: string;
	};

	type BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningSettingDto =
		// #/components/schemas/VoloAbpApplicationDtosAuditedEntityDtoOfGuid
		VoloAbpApplicationDtosAuditedEntityDtoOfGuid & {
			workflowName?: string;
			workflowDisplayName?: string;
			overdueDurationHours?: number;
			topCount?: number;
			recipients?: BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningRecipientDto[];
		};

	type BurnAbpWorkflowManagementApplicationTaskOverdueWarningsUpdateTaskOverdueWarningSettingDto = {
		workflowName?: string;
		workflowDisplayName?: string;
		overdueDurationHours?: number;
		topCount?: number;
		recipients?: BurnAbpWorkflowManagementApplicationTaskOverdueWarningsCreateUpdateTaskOverdueWarningRecipientDto[];
	};

	type BurnAbpWorkflowManagementApplicationWorkflowActivitiesActivityDto = {
		activityNodeId?: string;
		activityName?: string;
	};

	type BurnAbpWorkflowManagementApplicationWorkflowCategoryDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			name?: string;
			sort?: number;
			description?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowContextExceptionsWorkflowContextExceptionDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			workflowInstanceName?: string;
			workflowInstanceId?: string;
			exceptionInfo?: string;
			createTime?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			category?: string;
			icon?: string;
			workflowDefinitionId?: string;
			workflowDefinitionName?: string;
			workflowDefinitionDisplayName?: string;
			isCustomForm?: boolean;
			startFormUrl?: string;
			startPermissionDefinition?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowExecutionLogsWorkflowExecutionLogDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			workflowName?: string;
			workflowInstanceId?: string;
			executeType?: VoloAbpElsaAbstractEnumsExecuteType;
			activityNodeId?: string;
			activityType?: string;
			activityName?: string;
			activityDisplayName?: string;
			bookmarkId?: string;
			assignUser?: string;
			backActivity?: string;
			nextActivity?: string;
			nextAssignUser?: string;
			message?: string;
			executor?: string;
			executeTime?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowInputDto = {
		input?: BurnAbpWorkflowManagementApplicationExecuteWorkflowInputDto;
		storageProviderName?: string;
	};

	type BurnAbpWorkflowManagementApplicationWorkflowItemCopyTosReadWorkflowItemCopyTosDto = {
		ids?: string[];
	};

	type BurnAbpWorkflowManagementApplicationWorkflowItemCopyTosWorkflowItemCopyToDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			copyUserId?: string;
			copyUserName?: string;
			copyToUserId?: string;
			copyToUserName?: string;
			workItemId?: string;
			workflowDefinitionId?: string;
			workflowInstanceId?: string;
			correlationId?: string;
			activityId?: string;
			activityDisplayName?: string;
			title?: string;
			formUrl?: string;
			copyTime?: string;
			isRead?: boolean;
			readTime?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowItemRemindsWorkflowItemRemindDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			workItemId?: string;
			content?: string;
			remindTime?: string;
			remidUserId?: string;
			remidUserName?: string;
			remidToUserId?: string;
			remidToUserName?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowItemsUrgingWorkflowItemDto = {
		workflowInstanceId: string;
		workflowActivityIds: string[];
		content: string;
	};

	type BurnAbpWorkflowManagementApplicationWorkflowItemsUserWorkflowWaitCountDto = {
		workflowName?: string;
		workflowDescription?: string;
		count?: number;
	};

	type BurnAbpWorkflowManagementApplicationWorkflowItemsUserWorkItemStatusCountDto = {
		assigneeId?: string;
		assigneeName?: string;
		count?: number;
		status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
	};

	type BurnAbpWorkflowManagementApplicationWorkflowItemsWorkflowItemCountDto = {
		pendingTaskCount?: number;
		finishTaskCount?: number;
		startInstanceCount?: number;
		copyInstanceCount?: number;
	};

	type BurnAbpWorkflowManagementApplicationWorkflowItemsWorkflowItemDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			workflowDefinitionId?: string;
			workflowVersion?: number;
			workflowInstanceId?: string;
			workflowName?: string;
			workflowDescription?: string;
			correlationId?: string;
			title?: string;
			activityId?: string;
			activityName?: string;
			activityDisplayName?: string;
			activityDescription?: string;
			formUrl?: string;
			assigneeId?: string;
			assigneeName?: string;
			status?: number;
			createTime?: string;
			isAssistUserType?: boolean;
			timeoutNotifyInterval?: number;
			nextTimeoutNotifyTime?: string;
			completeTime?: string;
			type?: VoloAbpElsaAbstractEntitiesWorkItemType;
			lastUrgingNotifyTime?: string;
			urgingNotifyCount?: number;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			workflowDefinitionId?: string;
			workflowName?: string;
			principalId?: string;
			principal?: string;
			trusteeId?: string;
			trustee?: string;
			startDate?: string;
			endDate?: string;
		};

	type BurnAbpWorkflowManagementApplicationWorkflowUserActionsUserAction = {
		action?: string;
		actorSelectionMode?: number;
	};

	type ElsaAlterationsCoreContractsIAlteration = true;

	type ElsaAlterationsCoreEntitiesAlterationJob =
		// #/components/schemas/ElsaCommonEntitiesEntity
		ElsaCommonEntitiesEntity & {
			planId?: string;
			workflowInstanceId?: string;
			status?: ElsaAlterationsCoreEnumsAlterationJobStatus;
			log?: ElsaAlterationsCoreModelsAlterationLogEntry[];
			createdAt?: string;
			startedAt?: string;
			completedAt?: string;
		};

	type ElsaAlterationsCoreEntitiesAlterationPlan =
		// #/components/schemas/ElsaCommonEntitiesEntity
		ElsaCommonEntitiesEntity & {
			alterations?: ElsaAlterationsCoreContractsIAlteration[];
			workflowInstanceFilter?: ElsaAlterationsCoreModelsAlterationWorkflowInstanceFilter;
			status?: ElsaAlterationsCoreEnumsAlterationPlanStatus;
			createdAt?: string;
			startedAt?: string;
			completedAt?: string;
		};

	type ElsaAlterationsCoreEnumsAlterationJobStatus = 0 | 1 | 2 | 3;

	type ElsaAlterationsCoreEnumsAlterationPlanStatus = 0 | 1 | 2 | 3 | 4 | 5;

	type ElsaAlterationsCoreModelsActivityFilter = {
		activityId?: string;
		activityInstanceId?: string;
		nodeId?: string;
		name?: string;
		status?: ElsaWorkflowsActivityStatus;
	};

	type ElsaAlterationsCoreModelsAlterationLog = {
		logEntries?: ElsaAlterationsCoreModelsAlterationLogEntry[];
	};

	type ElsaAlterationsCoreModelsAlterationLogEntry = {
		message?: string;
		logLevel?: MicrosoftExtensionsLoggingLogLevel;
		timestamp?: string;
		eventName?: string;
	};

	type ElsaAlterationsCoreModelsAlterationPlanParams = {
		id?: string;
		alterations?: ElsaAlterationsCoreContractsIAlteration[];
		filter?: ElsaAlterationsCoreModelsAlterationWorkflowInstanceFilter;
	};

	type ElsaAlterationsCoreModelsAlterationWorkflowInstanceFilter = {
		emptyFilterSelectsAll?: boolean;
		workflowInstanceIds?: string[];
		correlationIds?: string[];
		names?: string[];
		searchTerm?: string;
		timestampFilters?: ElsaWorkflowsManagementModelsTimestampFilter[];
		definitionIds?: string[];
		definitionVersionIds?: string[];
		hasIncidents?: boolean;
		isSystem?: boolean;
		statuses?: ElsaWorkflowsWorkflowStatus[];
		subStatuses?: ElsaWorkflowsWorkflowSubStatus[];
		activityFilters?: ElsaAlterationsCoreModelsActivityFilter[];
	};

	type ElsaAlterationsCoreResultsRunAlterationsResult = {
		workflowInstanceId?: string;
		log?: ElsaAlterationsCoreModelsAlterationLog;
		workflowHasScheduledWork?: boolean;
		isSuccessful?: boolean;
	};

	type ElsaAlterationsEndpointsAlterationsDryRunResponse = {
		workflowInstanceIds?: string[];
	};

	type ElsaAlterationsEndpointsAlterationsGetGetParams = {
		id: string;
	};

	type ElsaAlterationsEndpointsAlterationsGetResponse = {
		plan?: ElsaAlterationsCoreEntitiesAlterationPlan;
		jobs?: ElsaAlterationsCoreEntitiesAlterationJob[];
	};

	type ElsaAlterationsEndpointsAlterationsRunRequest = {
		alterations?: ElsaAlterationsCoreContractsIAlteration[];
		workflowInstanceIds?: string[];
	};

	type ElsaAlterationsEndpointsAlterationsRunResponse = {
		results?: ElsaAlterationsCoreResultsRunAlterationsResult[];
	};

	type ElsaAlterationsEndpointsAlterationsSubmitResponse = {
		planId?: string;
	};

	type ElsaAlterationsEndpointsWorkflowsRetryRequest = true;

	type ElsaAlterationsEndpointsWorkflowsRetryResponse = {
		results?: ElsaAlterationsCoreResultsRunAlterationsResult[];
	};

	type ElsaCommonEntitiesEntity = {
		id?: string;
		tenantId?: string;
	};

	type ElsaCommonEntitiesOrderDirection = 0 | 1;

	type ElsaExpressionsModelsMemoryBlockReference = {
		id?: string;
	};

	type ElsaFeaturesModelsFeatureDescriptor = {
		name?: string;
		namespace?: string;
		fullName?: string;
		displayName?: string;
		description?: string;
	};

	type ElsaJavaScriptEndpointsTypeDefinitionsGetParams = {
		workflowDefinitionId: string;
	};

	type ElsaJavaScriptEndpointsTypeDefinitionsRequest = {
		activityTypeName?: string;
		propertyName?: string;
	};

	type ElsaLabelsEndpointsLabelsDeleteDeleteParams = {
		id: string;
	};

	type ElsaLabelsEndpointsLabelsDeleteRequest = true;

	type ElsaLabelsEndpointsLabelsGetGetParams = {
		id: string;
	};

	type ElsaLabelsEndpointsLabelsGetRequest = true;

	type ElsaLabelsEndpointsLabelsGetResponse = {
		id?: string;
		normalizedName?: string;
		description?: string;
		color?: string;
	};

	type ElsaLabelsEndpointsLabelsListListParams = {
		page?: number;
		pageSize?: number;
	};

	type ElsaLabelsEndpointsLabelsListRequest = true;

	type ElsaLabelsEndpointsLabelsListResponse = {
		items?: ElsaLabelsEntitiesLabel[];
		totalCount?: number;
	};

	type ElsaLabelsEndpointsLabelsPostRequest = {
		name?: string;
		description?: string;
		color?: string;
	};

	type ElsaLabelsEndpointsLabelsPostResponse = {
		id?: string;
		normalizedName?: string;
		description?: string;
		color?: string;
	};

	type ElsaLabelsEndpointsLabelsUpdateRequest = {
		name?: string;
		description?: string;
		color?: string;
	};

	type ElsaLabelsEndpointsLabelsUpdateResponse = {
		id?: string;
		normalizedName?: string;
		description?: string;
		color?: string;
	};

	type ElsaLabelsEndpointsLabelsUpdateUpdateParams = {
		id: string;
	};

	type ElsaLabelsEndpointsWorkflowDefinitionLabelsListListParams = {
		id: string;
	};

	type ElsaLabelsEndpointsWorkflowDefinitionLabelsListRequest = true;

	type ElsaLabelsEndpointsWorkflowDefinitionLabelsListResponse = {
		items?: string[];
	};

	type ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateRequest = {
		labelIds?: string[];
	};

	type ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateResponse = {
		labelIds?: string[];
	};

	type ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateUpdateParams = {
		id: string;
	};

	type ElsaLabelsEntitiesLabel =
		// #/components/schemas/ElsaCommonEntitiesEntity
		ElsaCommonEntitiesEntity & {
			name?: string;
			normalizedName?: string;
			description?: string;
			color?: string;
		};

	type ElsaModelsCountResponse = {
		count?: number;
	};

	type ElsaModelsLink = {
		href?: string;
		rel?: string;
		method?: string;
	};

	type ElsaModelsLinkedResource = {
		links?: ElsaModelsLink[];
	};

	type ElsaModelsListResponseOfActivityExecutionRecord = {
		items?: ElsaWorkflowsRuntimeEntitiesActivityExecutionRecord[];
		count?: number;
	};

	type ElsaModelsListResponseOfActivityExecutionRecordSummary = {
		items?: ElsaWorkflowsRuntimeEntitiesActivityExecutionRecordSummary[];
		count?: number;
	};

	type ElsaModelsListResponseOfCommitStrategyDescriptor = {
		items?: ElsaWorkflowsApiEndpointsCommitStrategiesCommitStrategyDescriptor[];
		count?: number;
	};

	type ElsaModelsListResponseOfExpressionDescriptorModel = {
		items?: ElsaWorkflowsApiEndpointsScriptingExpressionDescriptorsListExpressionDescriptorModel[];
		count?: number;
	};

	type ElsaModelsListResponseOfFeatureDescriptor = {
		items?: ElsaFeaturesModelsFeatureDescriptor[];
		count?: number;
	};

	type ElsaModelsListResponseOfIncidentStrategyDescriptor = {
		items?: ElsaWorkflowsApiEndpointsIncidentStrategiesListIncidentStrategyDescriptor[];
		count?: number;
	};

	type ElsaModelsListResponseOfLogPersistenceStrategyDescriptor = {
		items?: ElsaWorkflowsApiEndpointsLogPersistenceStrategiesListLogPersistenceStrategyDescriptor[];
		count?: number;
	};

	type ElsaModelsListResponseOfResolvedVariableModel = {
		items?: ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostResolvedVariableModel[];
		count?: number;
	};

	type ElsaModelsListResponseOfResolvedVariableModel2 = {
		items?: ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesListResolvedVariableModel[];
		count?: number;
	};

	type ElsaModelsListResponseOfWorkflowActivationStrategyDescriptor = {
		items?: ElsaWorkflowsApiEndpointsWorkflowActivationStrategiesListWorkflowActivationStrategyDescriptor[];
		count?: number;
	};

	type ElsaModelsListResponseOfWorkflowContextProviderDescriptor = {
		items?: ElsaWorkflowContextsEndpointsProviderTypesListWorkflowContextProviderDescriptor[];
		count?: number;
	};

	type ElsaModelsPagedListResponseOfLinkedWorkflowDefinitionSummary =
		// #/components/schemas/ElsaModelsLinkedResource
		ElsaModelsLinkedResource & {
			items?: ElsaWorkflowsApiModelsLinkedWorkflowDefinitionSummary[];
			totalCount?: number;
		};

	type ElsaResilienceEndpointsRetriesListEndpointParams = {
		activityInstanceId: string;
	};

	type ElsaResilienceEndpointsSimulateResponseSimulatedResponse = {
		message?: string;
	};

	type ElsaWorkflowContextsEndpointsProviderTypesListWorkflowContextProviderDescriptor = {
		name?: string;
		type?: string;
	};

	type ElsaWorkflowsActivityKind = 0 | 1 | 2 | 3;

	type ElsaWorkflowsActivityStatus = 0 | 1 | 2 | 3 | 4;

	type ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetGetParams = {
		activityTypeName: string;
		propertyName: string;
	};

	type ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetRequest = {
		version?: number;
		context?: any;
	};

	type ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetResponse = {
		items?: Record<string, any>;
	};

	type ElsaWorkflowsApiEndpointsActivityDescriptorsGetGetParams = {
		typeName: string;
		version?: number;
	};

	type ElsaWorkflowsApiEndpointsActivityDescriptorsGetRequest = true;

	type ElsaWorkflowsApiEndpointsActivityDescriptorsListResponse = {
		items?: ElsaWorkflowsModelsActivityDescriptor[];
		count?: number;
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionsCountCountParams = {
		workflowInstanceId: string;
		activityId: string;
		completed?: boolean;
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionsCountRequest = true;

	type ElsaWorkflowsApiEndpointsActivityExecutionsGetEndpointParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionsListListParams = {
		workflowInstanceId: string;
		activityNodeId: string;
		completed?: boolean;
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionsListRequest = true;

	type ElsaWorkflowsApiEndpointsActivityExecutionsReportRequest = {
		workflowInstanceId?: string;
		activityNodeIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionsReportResponse = {
		stats?: ElsaWorkflowsRuntimeActivityExecutionStats[];
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionSummariesListSummariesEndpointParams = {
		workflowInstanceId: string;
		activityNodeId: string;
		completed?: boolean;
	};

	type ElsaWorkflowsApiEndpointsActivityExecutionSummariesListSummariesRequest = true;

	type ElsaWorkflowsApiEndpointsBookmarksResumeRequest = true;

	type ElsaWorkflowsApiEndpointsCommitStrategiesCommitStrategyDescriptor = {
		name?: string;
		displayName?: string;
		description?: string;
	};

	type ElsaWorkflowsApiEndpointsEventsTriggerAuthenticatedRequest = {
		workflowInstanceId?: string;
		correlationId?: string;
		activityInstanceId?: string;
		input?: any;
		workflowExecutionMode?: ElsaWorkflowsModelsWorkflowExecutionMode;
	};

	type ElsaWorkflowsApiEndpointsEventsTriggerAuthenticatedTriggerParams = {
		eventName: string;
	};

	type ElsaWorkflowsApiEndpointsFeaturesGetGetParams = {
		fullName: string;
	};

	type ElsaWorkflowsApiEndpointsIncidentStrategiesListIncidentStrategyDescriptor = {
		displayName?: string;
		description?: string;
		typeName?: string;
	};

	type ElsaWorkflowsApiEndpointsLogPersistenceStrategiesListLogPersistenceStrategyDescriptor = {
		displayName?: string;
		description?: string;
		typeName?: string;
	};

	type ElsaWorkflowsApiEndpointsPackageResponse = {
		packageVersion?: string;
	};

	type ElsaWorkflowsApiEndpointsScriptingExpressionDescriptorsListExpressionDescriptorModel = {
		type?: string;
		displayName?: string;
		isSerializable?: boolean;
		isBrowsable?: boolean;
		properties?: Record<string, any>;
	};

	type ElsaWorkflowsApiEndpointsStorageDriversListResponse = {
		items?: ElsaWorkflowsApiEndpointsStorageDriversListStorageDriverDescriptor[];
	};

	type ElsaWorkflowsApiEndpointsStorageDriversListStorageDriverDescriptor = {
		typeName?: string;
		displayName?: string;
		priority?: number;
		deprecated?: boolean;
	};

	type ElsaWorkflowsApiEndpointsTasksCompleteCompleteParams = {
		taskId: string;
	};

	type ElsaWorkflowsApiEndpointsTasksCompleteRequest = {
		result?: any;
	};

	type ElsaWorkflowsApiEndpointsTasksCompleteResponse = true;

	type ElsaWorkflowsApiEndpointsVariableTypesListResponse = {
		items?: ElsaWorkflowsApiEndpointsVariableTypesListVariableTypeDescriptor[];
	};

	type ElsaWorkflowsApiEndpointsVariableTypesListVariableTypeDescriptor = {
		typeName?: string;
		displayName?: string;
		category?: string;
		description?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowActivationStrategiesListWorkflowActivationStrategyDescriptor = {
		displayName?: string;
		description?: string;
		typeName?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteRequest = {
		definitionIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteResponse = {
		deleted?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteVersionsRequest = {
		ids?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteVersionsResponse = {
		deleted?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchEndpointParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchRequest = {
		versionOptions?: string;
		triggerActivityId?: string;
		input?: any;
		count?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchResponse = {
		workflowInstanceIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkPublishRequest = {
		definitionIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkPublishResponse = {
		published?: string[];
		alreadyPublished?: string[];
		notFound?: string[];
		skipped?: string[];
		updatedConsumers?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkRetractRequest = {
		definitionIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkRetractResponse = {
		retracted?: string[];
		alreadyRetracted?: string[];
		skipped?: string[];
		notPublished?: string[];
		notFound?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsCountResponse = {
		count?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteDeleteParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteVersionDeleteVersionParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteVersionRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchEndpointParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchRequest = {
		instanceId?: string;
		correlationId?: string;
		triggerActivityId?: string;
		versionOptions?: string;
		input?: any;
		channel?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchResponse = {
		workflowInstanceId?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecuteGetEndpointParams = {
		definitionId: string;
		correlationId?: string;
		name?: string;
		triggerActivityId?: string;
		activityHandle?: ElsaWorkflowsModelsActivityHandle;
		versionOptions?: string;
		input?: string;
		variables?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecuteGetRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecutePostEndpointParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecuteResponse = {
		workflowState?: ElsaWorkflowsStateWorkflowState;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsExportRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdGetByDefinitionId1Params = {
		definitionId: string;
		versionOptions?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdGetByDefinitionId2Params = {
		definitionId: string;
		versionOptions?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByIdRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetManyByIdGetManyByIdParams = {
		ids: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetManyByIdRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphGraphParams = {
		id: string;
		parentNodeId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphSegmentsNodesParams = {
		id: string;
		childNodeId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphSegmentsRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsIsNameUniqueIsNameUniqueParams = {
		name: string;
		definitionId?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsIsNameUniqueRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsListListParams = {
		versionOptions?: string;
		definitionIds?: string[];
		ids?: string[];
		materializer?: string;
		label?: string[];
		page?: number;
		pageSize?: number;
		orderBy?: ElsaWorkflowsApiModelsOrderByWorkflowDefinition;
		orderDirection?: ElsaCommonEntitiesOrderDirection;
		searchTerm?: string;
		isSystem?: boolean;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsListRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsPublishPublishParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsPublishRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsPublishResponse = {
		workflowDefinition?: ElsaWorkflowsApiModelsLinkedWorkflowDefinitionModel;
		alreadyPublished?: boolean;
		consumingWorkflowCount?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsRefreshRequest = {
		definitionIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsRetractRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsRetractRetractParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsUpdateReferencesRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsUpdateReferencesResponse = {
		affectedWorkflows?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsUpdateReferencesUpdateReferencesParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionDeleteVersionParams = {
		definitionId: string;
		version: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionListVersionsParams = {
		definitionId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionRevertVersionParams = {
		definitionId: string;
		version: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesBulkCancelRequest = {
		ids?: string[];
		definitionVersionId?: string;
		definitionId?: string;
		versionOptions?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesBulkCancelResponse = {
		cancelled?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteRequest = {
		ids?: string[];
		workflowDefinitionId?: string;
		workflowDefinitionIds?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteResponse = {
		deleted?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesCancelCancelParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesCancelRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesDeleteDeleteParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesDeleteRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesExecutionStateExecutionStateParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesExecutionStateRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesExecutionStateResponse = {
		status?: ElsaWorkflowsWorkflowStatus;
		subStatus?: ElsaWorkflowsWorkflowSubStatus;
		updatedAt?: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesExportRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesGetGetParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesGetRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesImportResponse = {
		imported?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListGetParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListJournalFilter = {
		activityIds?: string[];
		activityNodeIds?: string[];
		excludedActivityTypes?: string[];
		eventNames?: string[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListRequest = {
		filter?: ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListJournalFilter;
		page?: number;
		pageSize?: number;
		skip?: number;
		take?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListResponse = {
		items?: ElsaWorkflowsApiModelsExecutionLogRecord[];
		totalCount?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalGetLastEntryGetParams = {
		workflowInstanceId: string;
		activityId: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalGetLastEntryRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalListGetParams = {
		id: string;
		page?: number;
		pageSize?: number;
		skip?: number;
		take?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalListRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesJournalListResponse = {
		items?: ElsaWorkflowsApiModelsExecutionLogRecord[];
		totalCount?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesListRequest = true;

	type ElsaWorkflowsApiEndpointsWorkflowInstancesListResponse = {
		items?: ElsaWorkflowsManagementModelsWorkflowInstanceSummary[];
		totalCount?: number;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesListListParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesListResolvedVariableModel = {
		id?: string;
		name?: string;
		value?: any;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostListParams = {
		id: string;
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostRequest = {
		variables?: ElsaWorkflowsVariableUpdateValue[];
	};

	type ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostResolvedVariableModel = {
		id?: string;
		name?: string;
		value?: any;
	};

	type ElsaWorkflowsApiModelsExecutionLogRecord = {
		id?: string;
		activityInstanceId?: string;
		parentActivityInstanceId?: string;
		activityId?: string;
		activityType?: string;
		activityTypeVersion?: number;
		activityName?: string;
		nodeId?: string;
		timestamp?: string;
		sequence?: number;
		eventName?: string;
		message?: string;
		source?: string;
		activityState?: Record<string, any>;
		payload?: any;
	};

	type ElsaWorkflowsApiModelsLinkedWorkflowDefinitionModel =
		// #/components/schemas/ElsaWorkflowsManagementModelsWorkflowDefinitionModel
		ElsaWorkflowsManagementModelsWorkflowDefinitionModel & {
			links?: ElsaModelsLink[];
		};

	type ElsaWorkflowsApiModelsLinkedWorkflowDefinitionSummary =
		// #/components/schemas/ElsaWorkflowsManagementModelsWorkflowDefinitionSummary
		ElsaWorkflowsManagementModelsWorkflowDefinitionSummary & {
			links?: ElsaModelsLink[];
		};

	type ElsaWorkflowsApiModelsOrderByWorkflowDefinition = 0 | 1 | 2;

	type ElsaWorkflowsApiModelsOrderByWorkflowInstance = 0 | 1 | 2 | 3;

	type ElsaWorkflowsApiModelsWorkflowInstanceModel = {
		id?: string;
		definitionId?: string;
		definitionVersionId?: string;
		version?: number;
		parentWorkflowInstanceId?: string;
		workflowState?: ElsaWorkflowsStateWorkflowState;
		status?: ElsaWorkflowsWorkflowStatus;
		subStatus?: ElsaWorkflowsWorkflowSubStatus;
		isExecuting?: boolean;
		correlationId?: string;
		name?: string;
		incidentCount?: number;
		isSystem?: boolean;
		createdAt?: string;
		updatedAt?: string;
		finishedAt?: string;
	};

	type ElsaWorkflowsIActivity = {
		id?: string;
		nodeId?: string;
		name?: string;
		type?: string;
		version?: number;
		customProperties?: Record<string, any>;
		metadata?: Record<string, any>;
	};

	type ElsaWorkflowsManagementEnumsTimestampFilterOperator = 0 | 1 | 2 | 3 | 4 | 5;

	type ElsaWorkflowsManagementModelsSaveWorkflowDefinitionRequest = {
		model?: ElsaWorkflowsManagementModelsWorkflowDefinitionModel;
		publish?: boolean;
	};

	type ElsaWorkflowsManagementModelsTimestampFilter = {
		column?: string;
		operator?: ElsaWorkflowsManagementEnumsTimestampFilterOperator;
		timestamp?: string;
	};

	type ElsaWorkflowsManagementModelsWorkflowDefinitionModel = {
		id?: string;
		tenantId?: string;
		name?: string;
		description?: string;
		createdAt?: string;
		version?: number;
		toolVersion?: string;
		variables?: ElsaWorkflowsModelsVariableDefinition[];
		inputs?: ElsaWorkflowsModelsInputDefinition[];
		outputs?: ElsaWorkflowsModelsOutputDefinition[];
		outcomes?: string[];
		customProperties?: Record<string, any>;
		isReadonly?: boolean;
		isSystem?: boolean;
		isLatest?: boolean;
		isPublished?: boolean;
		options?: ElsaWorkflowsModelsWorkflowOptions;
		usableAsActivity?: boolean;
		root?: ElsaWorkflowsIActivity;
	};

	type ElsaWorkflowsManagementModelsWorkflowDefinitionSummary = {
		id?: string;
		definitionId?: string;
		name?: string;
		description?: string;
		version?: number;
		toolVersion?: string;
		isLatest?: boolean;
		isPublished?: boolean;
		providerName?: string;
		materializerName?: string;
		createdAt?: string;
		isReadonly?: boolean;
	};

	type ElsaWorkflowsManagementModelsWorkflowInstanceSummary = {
		id?: string;
		definitionId?: string;
		definitionVersionId?: string;
		version?: number;
		status?: ElsaWorkflowsWorkflowStatus;
		subStatus?: ElsaWorkflowsWorkflowSubStatus;
		correlationId?: string;
		name?: string;
		incidentCount?: number;
		createdAt?: string;
		updatedAt?: string;
		finishedAt?: string;
	};

	type ElsaWorkflowsMemoryVariable =
		// #/components/schemas/ElsaExpressionsModelsMemoryBlockReference
		ElsaExpressionsModelsMemoryBlockReference & {
			name?: string;
			value?: any;
			storageDriverType?: string;
		};

	type ElsaWorkflowsModelsActivityDescriptor = {
		typeName?: string;
		namespace?: string;
		name?: string;
		version?: number;
		category?: string;
		displayName?: string;
		description?: string;
		inputs?: ElsaWorkflowsModelsInputDescriptor[];
		outputs?: ElsaWorkflowsModelsOutputDescriptor[];
		kind?: ElsaWorkflowsActivityKind;
		ports?: ElsaWorkflowsModelsPort[];
		customProperties?: Record<string, any>;
		constructionProperties?: Record<string, any>;
		isContainer?: boolean;
		isBrowsable?: boolean;
		isStart?: boolean;
		isTerminal?: boolean;
	};

	type ElsaWorkflowsModelsActivityHandle = {
		activityId?: string;
		activityNodeId?: string;
		activityInstanceId?: string;
		activityHash?: string;
	};

	type ElsaWorkflowsModelsActivityIncident = {
		activityId?: string;
		activityNodeId?: string;
		activityType?: string;
		message?: string;
		exception?: ElsaWorkflowsStateExceptionState;
		timestamp?: string;
	};

	type ElsaWorkflowsModelsArgumentDefinition = {
		type?: string;
		name?: string;
		displayName?: string;
		description?: string;
		category?: string;
	};

	type ElsaWorkflowsModelsBookmark = {
		id?: string;
		name?: string;
		hash?: string;
		payload?: any;
		activityId?: string;
		activityNodeId?: string;
		activityInstanceId?: string;
		createdAt?: string;
		autoBurn?: boolean;
		callbackMethodName?: string;
		autoComplete?: boolean;
		metadata?: Record<string, any>;
	};

	type ElsaWorkflowsModelsInputDefinition =
		// #/components/schemas/ElsaWorkflowsModelsArgumentDefinition
		ElsaWorkflowsModelsArgumentDefinition & {
			uiHint?: string;
			storageDriverType?: string;
		};

	type ElsaWorkflowsModelsInputDescriptor =
		// #/components/schemas/ElsaWorkflowsModelsPropertyDescriptor
		ElsaWorkflowsModelsPropertyDescriptor & {
			isWrapped?: boolean;
			uiHint?: string;
			category?: string;
			defaultValue?: any;
			defaultSyntax?: string;
			isReadOnly?: boolean;
			isSensitive?: boolean;
			storageDriverType?: string;
			autoEvaluate?: boolean;
			evaluatorType?: string;
			uiSpecifications?: Record<string, any>;
		};

	type ElsaWorkflowsModelsOutputDefinition =
		// #/components/schemas/ElsaWorkflowsModelsArgumentDefinition
		ElsaWorkflowsModelsArgumentDefinition & {};

	type ElsaWorkflowsModelsOutputDescriptor =
		// #/components/schemas/ElsaWorkflowsModelsPropertyDescriptor
		ElsaWorkflowsModelsPropertyDescriptor & {};

	type ElsaWorkflowsModelsPort = {
		name?: string;
		displayName?: string;
		type?: ElsaWorkflowsModelsPortType;
		isBrowsable?: boolean;
	};

	type ElsaWorkflowsModelsPortType = 0 | 1;

	type ElsaWorkflowsModelsPropertyDescriptor = {
		name?: string;
		typeName?: string;
		displayName?: string;
		description?: string;
		order?: number;
		isBrowsable?: boolean;
		isSerializable?: boolean;
		isSynthetic?: boolean;
	};

	type ElsaWorkflowsModelsVariableDefinition = {
		id?: string;
		name?: string;
		typeName?: string;
		isArray?: boolean;
		value?: string;
		storageDriverTypeName?: string;
	};

	type ElsaWorkflowsModelsWorkflowExecutionMode = 0 | 1;

	type ElsaWorkflowsModelsWorkflowOptions = {
		activationStrategyType?: string;
		usableAsActivity?: boolean;
		autoUpdateConsumingWorkflows?: boolean;
		activityCategory?: string;
		incidentStrategyType?: string;
		commitStrategyName?: string;
	};

	type ElsaWorkflowsRuntimeActivityExecutionStats = {
		activityId?: string;
		activityNodeId?: string;
		startedCount?: number;
		completedCount?: number;
		uncompletedCount?: number;
		isBlocked?: boolean;
		isFaulted?: boolean;
		aggregateFaultCount?: number;
		metadata?: Record<string, any>;
	};

	type ElsaWorkflowsRuntimeEntitiesActivityExecutionRecord =
		// #/components/schemas/ElsaCommonEntitiesEntity
		ElsaCommonEntitiesEntity & {
			workflowInstanceId?: string;
			activityId?: string;
			activityNodeId?: string;
			activityType?: string;
			activityTypeVersion?: number;
			activityName?: string;
			activityState?: Record<string, any>;
			payload?: Record<string, any>;
			outputs?: Record<string, any>;
			properties?: Record<string, any>;
			metadata?: Record<string, any>;
			exception?: ElsaWorkflowsStateExceptionState;
			startedAt?: string;
			hasBookmarks?: boolean;
			status?: ElsaWorkflowsActivityStatus;
			aggregateFaultCount?: number;
			completedAt?: string;
		};

	type ElsaWorkflowsRuntimeEntitiesActivityExecutionRecordSummary =
		// #/components/schemas/ElsaCommonEntitiesEntity
		ElsaCommonEntitiesEntity & {
			workflowInstanceId?: string;
			activityId?: string;
			activityNodeId?: string;
			activityType?: string;
			activityTypeVersion?: number;
			activityName?: string;
			startedAt?: string;
			hasBookmarks?: boolean;
			status?: ElsaWorkflowsActivityStatus;
			metadata?: Record<string, any>;
			aggregateFaultCount?: number;
			completedAt?: string;
		};

	type ElsaWorkflowsRuntimeEntitiesWorkflowExecutionLogRecord =
		// #/components/schemas/ElsaCommonEntitiesEntity
		ElsaCommonEntitiesEntity & {
			workflowDefinitionId?: string;
			workflowDefinitionVersionId?: string;
			workflowInstanceId?: string;
			workflowVersion?: number;
			activityInstanceId?: string;
			parentActivityInstanceId?: string;
			activityId?: string;
			activityType?: string;
			activityTypeVersion?: number;
			activityName?: string;
			activityNodeId?: string;
			timestamp?: string;
			sequence?: number;
			eventName?: string;
			message?: string;
			source?: string;
			activityState?: Record<string, any>;
			payload?: any;
		};

	type ElsaWorkflowsStateActivityExecutionContextState = {
		id?: string;
		parentContextId?: string;
		scheduledActivityNodeId?: string;
		ownerActivityNodeId?: string;
		properties?: Record<string, any>;
		metadata?: Record<string, any>;
		activityState?: Record<string, any>;
		dynamicVariables?: ElsaWorkflowsMemoryVariable[];
		status?: ElsaWorkflowsActivityStatus;
		isExecuting?: boolean;
		faultCount?: number;
		startedAt?: string;
		completedAt?: string;
		tag?: any;
	};

	type ElsaWorkflowsStateActivityWorkItemState = {
		activityNodeId?: string;
		ownerContextId?: string;
		tag?: any;
		variables?: ElsaWorkflowsMemoryVariable[];
		existingActivityExecutionContextId?: string;
		input?: Record<string, any>;
	};

	type ElsaWorkflowsStateCompletionCallbackState = {
		ownerInstanceId?: string;
		childNodeId?: string;
		methodName?: string;
		tag?: any;
	};

	type ElsaWorkflowsStateExceptionState = {
		type?: string;
		message?: string;
		stackTrace?: string;
		innerException?: ElsaWorkflowsStateExceptionState;
	};

	type ElsaWorkflowsStateWorkflowState = {
		id?: string;
		definitionId?: string;
		definitionVersionId?: string;
		definitionVersion?: number;
		parentWorkflowInstanceId?: string;
		correlationId?: string;
		name?: string;
		status?: ElsaWorkflowsWorkflowStatus;
		subStatus?: ElsaWorkflowsWorkflowSubStatus;
		isExecuting?: boolean;
		bookmarks?: ElsaWorkflowsModelsBookmark[];
		incidents?: ElsaWorkflowsModelsActivityIncident[];
		isSystem?: boolean;
		completionCallbacks?: ElsaWorkflowsStateCompletionCallbackState[];
		activityExecutionContexts?: ElsaWorkflowsStateActivityExecutionContextState[];
		scheduledActivities?: ElsaWorkflowsStateActivityWorkItemState[];
		executionLogSequence?: number;
		input?: Record<string, any>;
		output?: Record<string, any>;
		properties?: Record<string, any>;
		createdAt?: string;
		updatedAt?: string;
		finishedAt?: string;
	};

	type ElsaWorkflowsVariableUpdateValue = {
		id?: string;
		value?: any;
	};

	type ElsaWorkflowsWorkflowStatus = 0 | 1;

	type ElsaWorkflowsWorkflowSubStatus = 0 | 1 | 2 | 3 | 4 | 5;

	type FastEndpointsEmptyRequest = true;

	type FastEndpointsErrorResponse = {
		statusCode?: number;
		message?: string;
		errors?: Record<string, any>;
	};

	type GetElsaAlterationsEndpointsWorkflowsRetryRetryParams = {
		workflowInstanceIds: string[];
		activityIds?: string[];
	};

	type GetElsaWorkflowsApiEndpointsBookmarksResumeResumeParams = {
		input?: Record<string, any>;
	};

	type GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport1Params = {
		definitionId?: string;
		versionOptions?: string;
		ids?: string[];
	};

	type GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2Params = {
		definitionId: string;
		versionOptions?: string;
		ids?: string[];
	};

	type GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport1Params = {
		id?: string;
		ids: string[];
		includeBookmarks: boolean;
		includeActivityExecutionLog: boolean;
		includeWorkflowExecutionLog: boolean;
	};

	type GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2Params = {
		id: string;
		ids: string[];
		includeBookmarks: boolean;
		includeActivityExecutionLog: boolean;
		includeWorkflowExecutionLog: boolean;
	};

	type GetElsaWorkflowsApiEndpointsWorkflowInstancesListListParams = {
		page?: number;
		pageSize?: number;
		searchTerm?: string;
		definitionId?: string;
		definitionIds?: string[];
		correlationId?: string;
		name?: string;
		version?: number;
		hasIncidents?: boolean;
		isSystem?: boolean;
		status?: ElsaWorkflowsWorkflowStatus;
		statuses?: string[];
		subStatus?: ElsaWorkflowsWorkflowSubStatus;
		subStatuses?: string[];
		orderBy?: ElsaWorkflowsApiModelsOrderByWorkflowInstance;
		orderDirection?: ElsaCommonEntitiesOrderDirection;
		timestampFilters?: ElsaWorkflowsManagementModelsTimestampFilter[];
	};

	type GetWorkflowDefinitionByIdParams = {
		id: string;
	};

	type MicrosoftExtensionsLoggingLogLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type PostElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2Params = {
		definitionId: string;
	};

	type PostElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport2Params = {
		definitionId: string;
	};

	type PostElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2Params = {
		id: string;
	};

	type PutElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport2Params = {
		definitionId: string;
	};

	type TaskOverdueWarningSettingDeleteParams = {
		id: string;
	};

	type TaskOverdueWarningSettingGetListParams = {
		RecipientName?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TaskOverdueWarningSettingGetParams = {
		id: string;
	};

	type TaskOverdueWarningSettingUpdateParams = {
		id: string;
	};

	type VoloAbpApplicationDtosAuditedEntityDtoOfGuid =
		// #/components/schemas/VoloAbpApplicationDtosCreationAuditedEntityDtoOfGuid
		VoloAbpApplicationDtosCreationAuditedEntityDtoOfGuid & {
			lastModificationTime?: string;
			lastModifierId?: string;
		};

	type VoloAbpApplicationDtosCreationAuditedEntityDtoOfGuid =
		// #/components/schemas/VoloAbpApplicationDtosEntityDtoOfGuid
		VoloAbpApplicationDtosEntityDtoOfGuid & {
			creationTime?: string;
			creatorId?: string;
		};

	type VoloAbpApplicationDtosEntityDto = true;

	type VoloAbpApplicationDtosEntityDtoOfGuid =
		// #/components/schemas/VoloAbpApplicationDtosEntityDto
		VoloAbpApplicationDtosEntityDto & {
			id?: string;
		};

	type VoloAbpApplicationDtosListResultDtoOfTaskOverdueWarningSettingDto = {
		items?: BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningSettingDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowCategoryDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowCategoryDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowContextExceptionDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowContextExceptionsWorkflowContextExceptionDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowDefinitionSettingDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowExecutionLogDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowExecutionLogsWorkflowExecutionLogDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowItemCopyToDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowItemCopyTosWorkflowItemCopyToDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowItemDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowItemsWorkflowItemDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowItemRemindDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowItemRemindsWorkflowItemRemindDto[];
	};

	type VoloAbpApplicationDtosListResultDtoOfWorkflowSurrogateDto = {
		items?: BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto[];
	};

	type VoloAbpApplicationDtosPagedResultDtoOfTaskOverdueWarningSettingDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfTaskOverdueWarningSettingDto
		VoloAbpApplicationDtosListResultDtoOfTaskOverdueWarningSettingDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowCategoryDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowCategoryDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowCategoryDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowContextExceptionDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowContextExceptionDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowContextExceptionDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowDefinitionSettingDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowDefinitionSettingDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowDefinitionSettingDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowExecutionLogDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowExecutionLogDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowExecutionLogDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemCopyToDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowItemCopyToDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowItemCopyToDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowItemDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowItemDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemRemindDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowItemRemindDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowItemRemindDto & {
			totalCount?: number;
		};

	type VoloAbpApplicationDtosPagedResultDtoOfWorkflowSurrogateDto =
		// #/components/schemas/VoloAbpApplicationDtosListResultDtoOfWorkflowSurrogateDto
		VoloAbpApplicationDtosListResultDtoOfWorkflowSurrogateDto & {
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
		extraProperties?: VoloAbpDataExtraPropertyDictionary;
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

	type VoloAbpDataExtraPropertyDictionary = true;

	type VoloAbpElsaAbstractEntitiesWorkItemStatus = 0 | 1 | 2 | 3 | 4 | 5;

	type VoloAbpElsaAbstractEntitiesWorkItemType = 0 | 1;

	type VoloAbpElsaAbstractEnumsExecuteType = 5 | 10 | 11 | 15 | 20 | 25 | 30;

	type VoloAbpElsaAbstractModelsVisualizationApproverInfo = {
		userId?: string;
		userName?: string;
		status?: VoloAbpElsaAbstractModelsVisualizationApproverStatus;
		completedTime?: string;
		message?: string;
	};

	type VoloAbpElsaAbstractModelsVisualizationApproverStatus = 0 | 1;

	type VoloAbpElsaAbstractModelsVisualizationNodeCompletionInfo = {
		totalCount?: number;
		completedCount?: number;
		percentage?: number;
		approvers?: VoloAbpElsaAbstractModelsVisualizationApproverInfo[];
	};

	type VoloAbpElsaAbstractModelsVisualizationNodePosition = {
		x?: number;
		y?: number;
		width?: number;
		height?: number;
	};

	type VoloAbpElsaAbstractModelsVisualizationNodeStatus = 0 | 1 | 2 | 3;

	type VoloAbpElsaAbstractModelsVisualizationParallelNodeInfo = {
		nodeId?: string;
		displayName?: string;
		status?: VoloAbpElsaAbstractModelsVisualizationStepStatus;
		completion?: VoloAbpElsaAbstractModelsVisualizationNodeCompletionInfo;
		currentAssigneeName?: string;
	};

	type VoloAbpElsaAbstractModelsVisualizationStepStatus = 0 | 1 | 2 | 3;

	type VoloAbpElsaAbstractModelsVisualizationWorkflowEdgeDto = {
		sourceNodeId?: string;
		targetNodeId?: string;
		sourcePort?: string;
		targetPort?: string;
		isExecuted?: boolean;
	};

	type VoloAbpElsaAbstractModelsVisualizationWorkflowNodeDto = {
		nodeId?: string;
		name?: string;
		displayName?: string;
		type?: string;
		status?: VoloAbpElsaAbstractModelsVisualizationNodeStatus;
		completion?: VoloAbpElsaAbstractModelsVisualizationNodeCompletionInfo;
		position?: VoloAbpElsaAbstractModelsVisualizationNodePosition;
	};

	type VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto = {
		stepIndex?: number;
		isParallel?: boolean;
		nodeId?: string;
		displayName?: string;
		parallelNodes?: VoloAbpElsaAbstractModelsVisualizationParallelNodeInfo[];
		status?: VoloAbpElsaAbstractModelsVisualizationStepStatus;
		completion?: VoloAbpElsaAbstractModelsVisualizationNodeCompletionInfo;
		startTime?: string;
		completedTime?: string;
		currentAssigneeName?: string;
	};

	type VoloAbpElsaAbstractModelsVisualizationWorkflowVisualizationDto = {
		definitionId?: string;
		instanceId?: string;
		workflowName?: string;
		status?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		nodes?: VoloAbpElsaAbstractModelsVisualizationWorkflowNodeDto[];
		edges?: VoloAbpElsaAbstractModelsVisualizationWorkflowEdgeDto[];
		steps?: VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto[];
		totalUserTaskCount?: number;
		completedUserTaskCount?: number;
	};

	type VoloAbpElsaAbstractServicesWorkflowDefinitionDto = {
		id?: string;
		name?: string;
		version?: number;
	};

	type VoloAbpElsaDomainEntitiesEnumWorkflowStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
		data?: any[];
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

	type VoloAbpNameValue =
		// #/components/schemas/VoloAbpNameValueOfString
		VoloAbpNameValueOfString & {};

	type VoloAbpNameValueOfString = {
		name?: string;
		value?: string;
	};

	type WorkflowActivityGetLeftListParams = {
		definitionId?: string;
		activityId?: string;
	};

	type WorkflowCategoryDeleteParams = {
		id: string;
	};

	type WorkflowCategoryGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowCategoryGetParams = {
		id: string;
	};

	type WorkflowCategoryUpdateParams = {
		id: string;
	};

	type WorkflowContextExceptionGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowContextExceptionRetryParams = {
		workflowInstanceId?: string;
	};

	type WorkflowCorrelationEntityGetListParams = {
		WorkflowName?: string;
		AssigneeId?: string;
		Status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
		Filter?: string;
		SkipCount?: number;
		MaxResultCount?: number;
		Sorting?: string;
	};

	type WorkflowDefinitionCreateDraftDefinition2Params = {
		name?: string;
	};

	type WorkflowDefinitionCreateDraftDefinitionParams = {
		name: string;
	};

	type WorkflowDefinitionFindByName2Params = {
		name?: string;
	};

	type WorkflowDefinitionFindByNameParams = {
		name: string;
	};

	type WorkflowDefinitionSettingDeleteParams = {
		id: string;
	};

	type WorkflowDefinitionSettingGetByDefinitionIdParams = {
		definitionId: string;
	};

	type WorkflowDefinitionSettingGetByDefinitionNameParams = {
		definitionName?: string;
	};

	type WorkflowDefinitionSettingGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowDefinitionSettingGetParams = {
		id: string;
	};

	type WorkflowDefinitionSettingUpdateParams = {
		id: string;
	};

	type WorkflowExecutionLogGetListByCorrelationIdParams = {
		correlationId: string;
	};

	type WorkflowExecutionLogGetListByInstanceParams = {
		instanceId: string;
	};

	type WorkflowExecutionLogGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowItemAssignParams = {
		workItemId?: string;
		assignId?: string;
		assignName?: string;
	};

	type WorkflowItemCopyToGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowItemCopyToGetParams = {
		id: string;
	};

	type WorkflowItemCopyToGetSelfListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowItemGetByActivityParams = {
		correlationId?: string;
		activityId?: string;
	};

	type WorkflowItemGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowItemGetParams = {
		id: string;
	};

	type WorkflowItemGetSelfListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowItemGetUserWorkItemStatusCountRankingParams = {
		workflowName?: string;
		status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
		maxCount?: number;
	};

	type WorkflowItemRemindGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowItemRemindGetParams = {
		id: string;
	};

	type WorkflowItemRemindGetSelfListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowLaunchpadCancelWorkflowParams = {
		workflowInstaneId: string;
	};

	type WorkflowLaunchpadCreateDraftDefinitionParams = {
		name?: string;
	};

	type WorkflowLaunchpadExecuteWorkflowParams = {
		workflowInstanceId?: string;
		activityId?: string;
	};

	type WorkflowLaunchpadRejectWorkflowParams = {
		workflowInstanceId?: string;
		activityId?: string;
	};

	type WorkflowLaunchpadReviveWorkflowParams = {
		workflowInstaneId: string;
	};

	type WorkflowLaunchpadStartableWorkflowParams = {
		workflowDefinitionId?: string;
		correlationId?: string;
		contextId?: string;
		workflowInstanceId?: string;
	};

	type WorkflowLaunchpadStartWorkflowByNameParams = {
		workflowDefinitionName?: string;
		correlationId?: string;
		contextId?: string;
		workflowInstanceId?: string;
	};

	type WorkflowLaunchpadTerminateWorkflowParams = {
		workflowInstanceId?: string;
		activityId?: string;
	};

	type WorkflowRunnerExecuteWorkflowParams = {
		workflowInstanceId?: string;
		activityId?: string;
		ExecuteType?: VoloAbpElsaAbstractEnumsExecuteType;
		NextActivity?: string;
		AssignUser?: string;
		BackActivity?: string;
		NextAssignUser?: string;
		Message?: string;
		Executor?: string;
		CopyToUsers?: string[];
	};

	type WorkflowRunnerRejectWorkflowParams = {
		workflowInstanceId?: string;
		activityId?: string;
	};

	type WorkflowRunnerReviveWorkflowParams = {
		workflowInstaneId?: string;
	};

	type WorkflowSurrogateDeleteParams = {
		id: string;
	};

	type WorkflowSurrogateGetListParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkflowSurrogateGetParams = {
		id: string;
	};

	type WorkflowSurrogateUpdateParams = {
		id: string;
	};

	type WorkflowUserActionGetActionListByActivityParams = {
		workflowInstanceId: string;
		activityId: string;
	};

	type WorkflowUserActionGetListByActivityParams = {
		workflowInstanceId: string;
		activityId: string;
	};

	type WorkflowUserActionGetListParams = {
		workflowInstanceId: string;
	};

	type WorkflowVisualizationGetNodeCompletionDetailParams = {
		workflowInstanceId: string;
		nodeId: string;
	};

	type WorkflowVisualizationGetStepsParams = {
		workflowInstanceId: string;
	};

	type WorkflowVisualizationGetVisualizationParams = {
		workflowInstanceId: string;
	};
}
