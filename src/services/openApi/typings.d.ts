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

	type AccountProResetDefaultPasswordAsyncParams = {
		userId?: string;
	};

	type ApiKeySecretDeleteAsyncParams = {
		id: string;
	};

	type ApiKeySecretGetAsyncParams = {
		id: string;
	};

	type ApiKeySecretGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ApiKeySecretUpdateAsyncParams = {
		id: string;
	};

	type AttachmentBlobDownloadAsyncParams = {
		id: string;
	};

	type AttachmentBlobDownloadByBlobNameAsyncParams = {
		blobName: string;
	};

	type AttachmentDeleteAsyncParams = {
		id: string;
	};

	type AttachmentExportEntityAttachmentsZipAsyncParams = {
		entityName: string;
		entityId: string;
	};

	type AttachmentGetAsyncParams = {
		id: string;
	};

	type AttachmentGetListAsyncParams = {
		entityId?: string;
		entityName?: string;
	};

	type AttachmentIntegrationCopyEntityAttachmentToTempAttachmentAsyncParams = {
		blobName?: string;
		tempBlobName?: string;
	};

	type AttachmentIntegrationDeleteAsyncParams = {
		id: string;
	};

	type AttachmentIntegrationGetAllBytesAsyncParams = {
		blobName?: string;
	};

	type AttachmentIntegrationGetAsyncParams = {
		id: string;
	};

	type AttachmentIntegrationGetListAsyncParams = {
		entityId?: string;
		entityName?: string;
	};

	type AuditLoggingGetAsyncParams = {
		/** 审计日志ID */
		id: string;
	};

	type AuditLoggingGetEntityChangeAsyncParams = {
		/** 实体变更ID */
		id: string;
	};

	type AuditLoggingGetEntityChangesAsyncParams = {
		/** 开始时间 */
		StartTime?: string;
		/** 结束时间 */
		EndTime?: string;
		/** 实体ID筛选 */
		EntityId?: string;
		/** 实体类型全名筛选（支持模糊匹配） */
		EntityTypeFullName?: string;
		/** 变更类型筛选（Created=0, Updated=1, Deleted=2）

0 = Created

1 = Updated

2 = Deleted */
		ChangeType?: VoloAbpAuditingEntityChangeType;
		/** 用户ID筛选 */
		UserId?: string;
		/** 审计日志ID筛选 */
		AuditLogId?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AuditLoggingGetListAsyncParams = {
		/** 开始时间 */
		StartTime?: string;
		/** 结束时间 */
		EndTime?: string;
		/** URL筛选（支持模糊匹配） */
		Url?: string;
		/** 用户名筛选（支持模糊匹配） */
		UserName?: string;
		/** 应用名称筛选 */
		ApplicationName?: string;
		/** HTTP方法筛选（GET, POST, PUT, DELETE等） */
		HttpMethod?: string;
		/** HTTP状态码筛选 */
		HttpStatusCode?: number;
		/** 是否只查询有异常的记录 */
		HasException?: boolean;
		/** 最小执行时长（毫秒） */
		MinExecutionDuration?: number;
		/** 最大执行时长（毫秒） */
		MaxExecutionDuration?: number;
		/** 用户ID筛选 */
		UserId?: string;
		/** 客户端IP地址筛选 */
		ClientIpAddress?: string;
		/** 关联ID筛选 */
		CorrelationId?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AutoUpdateServerEnumsPlatformType = 1 | 2 | 99;

	type AutoUpdateServerEnumsUpdateStrategy = 1 | 2 | 3;

	type BadgeClearServiceBadgeAsyncParams = {
		/** 服务ID */
		serviceId: string;
	};

	type BadgeGetPagedListAsyncParams = {
		/** 跳过的记录数 */
		skipCount?: number;
		/** 最大返回记录数（默认 10，最大 100） */
		maxResultCount?: number;
	};

	type BadgeGetServiceBadgeAsyncParams = {
		/** 服务ID */
		serviceId: string;
	};

	type BnrDataSourceConfigDeleteAsyncParams = {
		id: string;
	};

	type BnrDataSourceConfigGetAsyncParams = {
		id: string;
	};

	type BnrDataSourceConfigGetByRuleNameAsyncParams = {
		ruleName: string;
	};

	type BnrDataSourceConfigGetListAsyncParams = {
		RuleName?: string;
		DataSourceType?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BnrDataSourceConfigTestConnectionAsyncParams = {
		id: string;
	};

	type BnrDataSourceConfigUpdateAsyncParams = {
		id: string;
	};

	type BnrDataSourceConfigValidateAsyncParams = {
		id: string;
	};

	type BNRGeneratorGeneratorListAsyncParams = {
		number?: number;
	};

	type BnrPropertyDefinitionDeleteAsyncParams = {
		id: string;
	};

	type BnrPropertyDefinitionGetAsyncParams = {
		id: string;
	};

	type BnrPropertyDefinitionGetListAsyncParams = {
		RuleName?: string;
		ServiceName?: string;
		Name?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BnrPropertyDefinitionUpdateAsyncParams = {
		id: string;
	};

	type BNRResolveRuleDefinitionDeleteAsyncParams = {
		id: string;
	};

	type BNRResolveRuleDefinitionGetAsyncParams = {
		id: string;
	};

	type BNRResolveRuleDefinitionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BNRResolveRuleDefinitionUpdateAsyncParams = {
		id: string;
	};

	type BnrRuleDefinitionDeleteAsyncParams = {
		ruleName: string;
		name: string;
	};

	type BnrRuleDefinitionGetDynamicRulesAsyncParams = {
		RuleName?: string;
		ServiceName?: string;
		Active?: boolean;
		Keyword?: string;
		IncludeSystemRule?: boolean;
	};

	type BnrRuleDefinitionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BnrRuleDefinitionGetPropertiesByRuleNameAsyncParams = {
		ruleName: string;
		serviceName?: string;
	};

	type BnrRuleDefinitionGetRulesAsyncParams = {
		ruleName: string;
	};

	type BnrRuleDefinitionGetRulesByGroupNameAsyncParams = {
		groupName: string;
	};

	type BnrRuleEvaluationConfigDeleteAsyncParams = {
		id: string;
	};

	type BnrRuleEvaluationConfigGetAsyncParams = {
		id: string;
	};

	type BnrRuleEvaluationConfigGetByRuleNameAsyncParams = {
		ruleName: string;
	};

	type BnrRuleEvaluationConfigGetListAsyncParams = {
		RuleName?: string;
		EnableRuleEvaluation?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BnrRuleEvaluationConfigUpdateAsyncParams = {
		id: string;
	};

	type BNRSequenceDataGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BNRSequenceItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BNRSequenceTypeDeleteAsyncParams = {
		id: string;
	};

	type BNRSequenceTypeGetAsyncParams = {
		id: string;
	};

	type BNRSequenceTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BNRSequenceTypeUpdateAsyncParams = {
		id?: string;
	};

	type BurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto = {
		id?: string;
		name?: string;
		key?: string;
		secret?: string;
		active?: boolean;
		expireAt?: string;
	};

	type BurnAbpApiKeySecretAuthorizationApiKeysCreateApiKeySecretDto = {
		name?: string;
		key?: string;
		active?: boolean;
		expireAt?: string;
	};

	type BurnAbpApiKeySecretAuthorizationApiKeysUpdateApiKeySecretDto = {
		name?: string;
		key?: string;
		active?: boolean;
		expireAt?: string;
	};

	type BurnAbpAttachmentManageAttachmentsAttachmentDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		entityId?: string;
		entityTypeName?: string;
		name?: string;
		size?: number;
		type?: string;
		blobName?: string;
		fileToken?: string;
		creator?: string;
	};

	type BurnAbpAttachmentManageModelsConfirmVideoModel = {
		uid?: string;
		fileName?: string;
		contentType?: string;
		chunks?: number;
	};

	type BurnAbpAttachmentManageModelsMediaAttachmentModel = {
		fileName?: string;
		size?: number;
		contentType?: string;
		blobName?: string;
		thumbnailBlobName?: string;
		thumbnailSize?: number;
	};

	type BurnAbpAttachmentManageModelsValidateFileModel = {
		chunks?: number;
		fileName?: string;
		fullSize?: number;
		uid?: string;
		extName?: string;
		contentType?: string;
	};

	type BurnAbpBadgeAbstractsDtosBadgeDetailDto = {
		serviceId?: string;
		serviceName?: string;
		badgeType?: string;
		count?: number;
		lastUpdateTime?: string;
	};

	type BurnAbpBadgeAbstractsDtosBadgeSummaryDto = {
		totalCount?: number;
		badges?: Record<string, any>;
		details?: BurnAbpBadgeAbstractsDtosBadgeDetailDto[];
	};

	type BurnAbpBadgeAbstractsDtosPagedBadgeResultDto = {
		items?: BurnAbpBadgeAbstractsDtosBadgeDetailDto[];
		totalCount?: number;
		skipCount?: number;
		maxResultCount?: number;
		hasNext?: boolean;
		hasPrevious?: boolean;
	};

	type BurnAbpBNRBnrBnrRuleDefinitionItemType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	type BurnAbpBNRBnrBnrRuleLeftPadModel = {
		leftPadChar?: string;
		totalLength?: number;
	};

	type BurnAbpBNRBnrRuleDefinitionsPropertyType = 0 | 1 | 2 | 3 | 4;

	type BurnAbpBNRBnrWordConvertType = 0 | 1 | 2;

	type BurnAbpBNRManagementApplicationBNRSequenceTypeDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		code?: string;
		name?: string;
		description?: string;
	};

	type BurnAbpBNRManagementApplicationContractsBNRResolveRulesBNRResolveRuleDefinitionExtraPropertieItemDto = {
		id?: string;
		bnrResolveRuleDefinitionId?: string;
		extraPropertyName?: string;
		extraPropertyDisplayName?: string;
		startIndex?: number;
		length?: number;
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto = {
		id?: string;
		ruleName?: string;
		serviceName?: string;
		name?: string;
		displayName?: string;
		propertyType?: BurnAbpBNRBnrRuleDefinitionsPropertyType;
		isRequired?: boolean;
		defaultValue?: string;
		validationRegex?: string;
		enumValues?: string;
		description?: string;
		displayOrder?: number;
		isStatic?: boolean;
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto = {
		name?: string;
		displayName?: string;
		ruleName?: string;
		ruleDisplayName?: string;
		ruleDescription?: string;
		rule?: string;
		numberStart?: number;
		numberIncrement?: number;
		numberBinary?: number;
		isDefault?: boolean;
		active?: boolean;
		serviceName?: string;
		definitionHash?: string;
		items?: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionItemDto[];
		properties?: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRulePropertyDefinitionDto[];
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionItemDto = {
		id?: string;
		content?: string;
		type?: BurnAbpBNRBnrBnrRuleDefinitionItemType;
		wordConvert?: BurnAbpBNRBnrWordConvertType;
		placeholder?: string;
		rightSeparator?: string;
		padLeft?: BurnAbpBNRBnrBnrRuleLeftPadModel;
		sequenceLength?: number;
		sequenceBasis?: boolean;
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleGroupDefinitionDto = {
		name?: string;
		displayName?: string;
		subGroups?: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleGroupDefinitionDto[];
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRulePropertyDefinitionDto = {
		name?: string;
		displayName?: string;
		description?: string;
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateBnrRuleDefinitionInput = {
		name: string;
		displayName?: string;
		ruleName: string;
		ruleDisplayName: string;
		ruleDescription?: string;
		numberStart?: number;
		numberIncrement?: number;
		numberBinary?: number;
		isDefault?: boolean;
		items: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateOrUpdateBnrRuleDefinitionItemDto[];
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateOrUpdateBnrPropertyDefinitionDto = {
		ruleName: string;
		name: string;
		displayName: string;
		propertyType: BurnAbpBNRBnrRuleDefinitionsPropertyType;
		isRequired?: boolean;
		defaultValue?: string;
		validationRegex?: string;
		enumValues?: string;
		description?: string;
		displayOrder?: number;
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateOrUpdateBnrRuleDefinitionItemDto = {
		content?: string;
		type?: BurnAbpBNRBnrBnrRuleDefinitionItemType;
		wordConvert?: BurnAbpBNRBnrWordConvertType;
		placeholder?: string;
		rightSeparator?: string;
		padLeft?: BurnAbpBNRBnrBnrRuleLeftPadModel;
		sequenceLength?: number;
		sequenceBasis?: boolean;
	};

	type BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsUpdateBnrRuleDefinitionInput = {
		oldName: string;
		name: string;
		displayName?: string;
		ruleName: string;
		ruleDisplayName: string;
		ruleDescription?: string;
		numberStart?: number;
		numberIncrement?: number;
		numberBinary?: number;
		isDefault?: boolean;
		items: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateOrUpdateBnrRuleDefinitionItemDto[];
	};

	type BurnAbpBNRManagementApplicationContractsBNRSequenceItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		ruleCode?: string;
		ruleContent?: string;
		sequenceValue?: string;
	};

	type BurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto = {
		id?: string;
		ruleName?: string;
		dataSourceType?: string;
		url?: string;
		connectionString?: string;
		query?: string;
		arrayData?: string;
		cacheDuration?: number;
		failureMode?: string;
		propertyMappingJson?: string;
		propertyMapping?: Record<string, any>;
		creationTime?: string;
		lastModificationTime?: string;
	};

	type BurnAbpBNRManagementApplicationContractsDataSourcesCreateOrUpdateBnrDataSourceConfigDto = {
		ruleName: string;
		dataSourceType: string;
		url?: string;
		connectionString?: string;
		query?: string;
		arrayData?: string;
		cacheDuration?: number;
		failureMode?: string;
		propertyMapping?: Record<string, any>;
	};

	type BurnAbpBNRManagementApplicationContractsGeneratorSequenceDto = {
		ruleCode?: string;
		defaultRule?: string;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto = {
		id?: string;
		ruleName?: string;
		enableRuleEvaluation?: boolean;
		ruleGroupJson?: string;
		priority?: number;
		targetRuleName?: string;
		creationTime?: string;
		lastModificationTime?: string;
	};

	type BurnAbpBNRManagementApplicationContractsRuleEvaluationCreateOrUpdateBnrRuleEvaluationConfigDto = {
		ruleName: string;
		enableRuleEvaluation?: boolean;
		ruleGroupJson?: string;
		priority?: number;
		targetRuleName?: string;
	};

	type BurnAbpBNRManagementBNRResolveRulesBNRResolveResultDto = {
		materialCode?: string;
		supplierCode?: string;
		serialNumber?: string;
		barCodeType?: string;
		editionNo?: string;
	};

	type BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto = {
		id?: string;
		name?: string;
		description?: string;
		expression?: string;
		length?: number;
		checkLength?: boolean;
		barCodeType?: string;
		barCodeTypeName?: string;
		fixedItemCode?: string;
		itemCodePrefix?: string;
		itemStart?: number;
		itemLength?: number;
		snStart?: number;
		snLength?: number;
		versionStart?: number;
		versionLength?: number;
		supplierStart?: number;
		supplierLength?: number;
		quantityStart?: number;
		quantityLength?: number;
		extraProperties?: BurnAbpBNRManagementApplicationContractsBNRResolveRulesBNRResolveRuleDefinitionExtraPropertieItemDto[];
	};

	type BurnAbpBNRManagementBNRResolveRulesMockResolveInput = {
		id?: string;
		name?: string;
		description?: string;
		expression?: string;
		length?: number;
		checkLength?: boolean;
		barCodeType?: string;
		barCodeTypeName?: string;
		fixedItemCode?: string;
		itemCodePrefix?: string;
		itemStart?: number;
		itemLength?: number;
		snStart?: number;
		snLength?: number;
		versionStart?: number;
		versionLength?: number;
		supplierStart?: number;
		supplierLength?: number;
		quantityStart?: number;
		quantityLength?: number;
		extraProperties?: BurnAbpBNRManagementApplicationContractsBNRResolveRulesBNRResolveRuleDefinitionExtraPropertieItemDto[];
		barCode?: string;
	};

	type BurnAbpBNRManagementSequenceDatasBNRSequenceDataDto = {
		id?: string;
		ruleName?: string;
		sequenceKey?: string;
		value?: number;
	};

	type BurnAbpCalendarManagementCalendarDefinitionsCalendarDateDefinitionDto = {
		id?: string;
		calendarDefinitionId?: string;
		date?: string;
		isWorkdayInConfigure?: boolean;
		isHoliday?: boolean;
		holidayName?: string;
		isWorkday?: boolean;
		isManuallySet?: boolean;
		plannedWorkHours?: number;
		actualWorkHours?: number;
		remark?: string;
	};

	type BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto = {
		id?: string;
		name?: string;
		description?: string;
		isDefault?: boolean;
		holidaySetId?: string;
		workdayConfigures?: BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionWorkdayConfigureDto[];
	};

	type BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionWorkdayConfigureDto = {
		workdayConfigureId?: string;
		workdayConfigureName?: string;
		startDate?: string;
		endDate?: string;
		priority?: number;
	};

	type BurnAbpCalendarManagementCalendarDefinitionsCreateCalendarDefinitionDto = {
		name: string;
		description?: string;
		isDefault?: boolean;
		holidaySetId?: string;
		workdayConfigures?: BurnAbpCalendarManagementCalendarDefinitionsDtosWorkdayConfigureApplicationDto[];
	};

	type BurnAbpCalendarManagementCalendarDefinitionsDtosWorkdayConfigureApplicationDto = {
		workdayConfigureId: string;
		startDate: string;
		endDate?: string;
		priority?: number;
	};

	type BurnAbpCalendarManagementCalendarDefinitionsManualAdjustmentHistoryDto = {
		id?: string;
		date?: string;
		isWorkday?: boolean;
		actualWorkHours?: number;
		manualAdjustmentRemark?: string;
		manualAdjustmentTime?: string;
		manualAdjustmentBy?: string;
	};

	type BurnAbpCalendarManagementCalendarDefinitionsSetManualWorkdayInput = {
		isWorkday: boolean;
		actualWorkHours: number;
		remark: string;
	};

	type BurnAbpCalendarManagementCalendarDefinitionsSetWorkdayConfigureInput = {
		workdayConfigures?: BurnAbpCalendarManagementCalendarDefinitionsDtosWorkdayConfigureApplicationDto[];
	};

	type BurnAbpCalendarManagementCalendarDefinitionsUpdateCalendarDefinitionDto = {
		name: string;
		description?: string;
		isDefault?: boolean;
		holidaySetId?: string;
		workdayConfigures?: BurnAbpCalendarManagementCalendarDefinitionsDtosWorkdayConfigureApplicationDto[];
	};

	type BurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		employeeId?: string;
		employeeCode?: string;
		employeeName?: string;
		date?: string;
		shiftId?: string;
		shiftName?: string;
		timeIntervals?: BurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleTimeIntervalDto[];
	};

	type BurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleTimeIntervalDto = {
		id?: string;
		startTime?: string;
		endTime?: string;
	};

	type BurnAbpCalendarManagementHolidaySetsCreateHolidayItemDto = {
		name: string;
		description?: string;
		startDate?: string;
		endDate?: string;
		isPublicHoliday?: boolean;
	};

	type BurnAbpCalendarManagementHolidaySetsCreateHolidaySetDto = {
		name: string;
		description?: string;
		countryOrRegion?: string;
		isActive?: boolean;
		items?: BurnAbpCalendarManagementHolidaySetsCreateHolidayItemDto[];
	};

	type BurnAbpCalendarManagementHolidaySetsHolidayItemDto = {
		id?: string;
		name?: string;
		description?: string;
		startDate?: string;
		endDate?: string;
		isPublicHoliday?: boolean;
	};

	type BurnAbpCalendarManagementHolidaySetsHolidaySetDto = {
		id?: string;
		name?: string;
		description?: string;
		countryOrRegion?: string;
		isActive?: boolean;
		items?: BurnAbpCalendarManagementHolidaySetsHolidayItemDto[];
	};

	type BurnAbpCalendarManagementHolidaySetsUpdateHolidayItemDto = {
		id?: string;
		name: string;
		description?: string;
		startDate?: string;
		endDate?: string;
		isPublicHoliday?: boolean;
	};

	type BurnAbpCalendarManagementHolidaySetsUpdateHolidaySetDto = {
		name: string;
		description?: string;
		countryOrRegion?: string;
		isActive?: boolean;
		items?: BurnAbpCalendarManagementHolidaySetsUpdateHolidayItemDto[];
	};

	type BurnAbpCalendarManagementShiftsCreateUpdateShiftInput = {
		name?: string;
		description?: string;
		isDefault?: boolean;
		shiftTimes?: BurnAbpCalendarManagementShiftsShiftTimeIntervalDto[];
	};

	type BurnAbpCalendarManagementShiftsShiftDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		name?: string;
		description?: string;
		isDefault?: boolean;
		shiftTimes?: BurnAbpCalendarManagementShiftsShiftTimeIntervalDto[];
	};

	type BurnAbpCalendarManagementShiftsShiftTimeIntervalDto = {
		startTime?: string;
		endTime?: string;
	};

	type BurnAbpCalendarManagementWorkdayConfiguresDtosCreateWorkdayConfigureDto = {
		code: string;
		name: string;
		description?: string;
		workdayItems?: BurnAbpCalendarManagementWorkdayConfiguresDtosCreateWorkdayConfigureItemDto[];
		isActive?: boolean;
	};

	type BurnAbpCalendarManagementWorkdayConfiguresDtosCreateWorkdayConfigureItemDto = {
		dayOfWeek: SystemDayOfWeek;
		isWorkday?: boolean;
		workHours?: number;
		overtimeHours?: number;
	};

	type BurnAbpCalendarManagementWorkdayConfiguresDtosUpdateWorkdayConfigureDto = {
		code: string;
		name: string;
		description?: string;
		workdayItems?: BurnAbpCalendarManagementWorkdayConfiguresDtosUpdateWorkdayConfigureItemDto[];
		isActive?: boolean;
	};

	type BurnAbpCalendarManagementWorkdayConfiguresDtosUpdateWorkdayConfigureItemDto = {
		id: string;
		dayOfWeek: SystemDayOfWeek;
		isWorkday?: boolean;
		workHours?: number;
		overtimeHours?: number;
	};

	type BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		code?: string;
		name?: string;
		description?: string;
		workdayItems?: BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureItemDto[];
		isActive?: boolean;
	};

	type BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureItemDto = {
		id?: string;
		dayOfWeek?: SystemDayOfWeek;
		isWorkday?: boolean;
		workHours?: number;
		overtimeHours?: number;
		totalHours?: number;
	};

	type BurnAbpDynamicMenuManagementMenuItemsDtosCreateMenuItemDto = {
		extraProperties?: Record<string, any>;
		sort?: number;
		parentName?: string;
		name?: string;
		displayName?: string;
		isDynamic?: boolean;
		icon?: string;
		url?: string;
		urlMvc?: string;
		urlBlazor?: string;
		urlAngular?: string;
		permission?: string;
		lResourceTypeName?: string;
		lResourceTypeAssemblyName?: string;
	};

	type BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto = {
		extraProperties?: Record<string, any>;
		sort?: number;
		parentName?: string;
		name?: string;
		displayName?: string;
		isDynamic?: boolean;
		icon?: string;
		url?: string;
		urlMvc?: string;
		urlBlazor?: string;
		urlAngular?: string;
		permission?: string;
		lResourceTypeName?: string;
		lResourceTypeAssemblyName?: string;
		menuItems?: BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto[];
	};

	type BurnAbpDynamicMenuManagementMenuItemsDtosUpdateMenuItemDto = {
		extraProperties?: Record<string, any>;
		isDynamic?: boolean;
		displayName?: string;
		icon?: string;
		lResourceTypeAssemblyName?: string;
		lResourceTypeName?: string;
		name?: string;
		parentName?: string;
		permission?: string;
		sort?: number;
		url?: string;
		urlAngular?: string;
		urlBlazor?: string;
		urlMvc?: string;
	};

	type BurnAbpDynamicSchemaDtosBatchActionConfigDto = {
		key?: string;
		label?: string;
		icon?: string;
		type?: BurnAbpDynamicSchemaDtosBatchActionType;
		confirmMessage?: string;
		permission?: string;
	};

	type BurnAbpDynamicSchemaDtosBatchActionType = 0 | 1 | 2;

	type BurnAbpDynamicSchemaDtosBatchDeleteInput = {
		ids: string[];
	};

	type BurnAbpDynamicSchemaDtosChildrenUpdateDto = {
		added?: Record<string, any>[];
		updated?: BurnAbpDynamicSchemaDtosChildUpdateItemDto[];
		deleted?: string[];
	};

	type BurnAbpDynamicSchemaDtosChildUpdateItemDto = {
		id?: string;
		data?: Record<string, any>;
		children?: Record<string, any>;
	};

	type BurnAbpDynamicSchemaDtosColumnConfigDto = {
		field?: string;
		headerName?: string;
		width?: number;
		minWidth?: number;
		maxWidth?: number;
		sortable?: boolean;
		filterable?: boolean;
		hidden?: boolean;
		pinned?: BurnAbpDynamicSchemaDtosColumnPinPosition;
		sortOrder?: number;
		cellRenderer?: string;
		valueFormatter?: string;
		cellClass?: string;
		headerClass?: string;
	};

	type BurnAbpDynamicSchemaDtosColumnPinPosition = 0 | 1;

	type BurnAbpDynamicSchemaDtosCreateDataWithChildrenInput = {
		data?: Record<string, any>;
		children?: Record<string, any>;
	};

	type BurnAbpDynamicSchemaDtosCreateEntityInput = {
		name: string;
		displayName: string;
		role?: BurnAbpDynamicSchemaEnumsEntityRole;
		storageMode?: BurnAbpDynamicSchemaEnumsStorageMode;
	};

	type BurnAbpDynamicSchemaDtosCreateFieldInput = {
		name: string;
		displayName: string;
		dataType?: BurnAbpDynamicSchemaEnumsFieldDataType;
		uiComponent: string;
		isRequired?: boolean;
		displayOrder?: number;
		maxLength?: number;
		precision?: number;
		scale?: number;
		defaultValue?: string;
		indexType?: BurnAbpDynamicSchemaEnumsIndexType;
	};

	type BurnAbpDynamicSchemaDtosCreateRelationInput = {
		relationName: string;
		displayName: string;
		sourceEntityId?: string;
		targetEntityId?: string;
		relationType?: BurnAbpDynamicSchemaEnumsRelationType;
		cascadeDeleteBehavior?: BurnAbpDynamicSchemaEnumsCascadeDeleteBehavior;
	};

	type BurnAbpDynamicSchemaDtosCreateUpdateDynamicApplicationDefinitionDto = {
		name: string;
		displayName: string;
		description?: string;
		routePath?: string;
		isEnabled?: boolean;
		workflowEnabled?: boolean;
		workflowName?: string;
	};

	type BurnAbpDynamicSchemaDtosDynamicApplicationDefinitionDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		tenantId?: string;
		name?: string;
		displayName?: string;
		description?: string;
		routePath?: string;
		isEnabled?: boolean;
		workflowEnabled?: boolean;
		workflowName?: string;
		entities?: BurnAbpDynamicSchemaDtosDynamicEntityDefinitionDto[];
		relations?: BurnAbpDynamicSchemaDtosDynamicEntityRelationDto[];
	};

	type BurnAbpDynamicSchemaDtosDynamicApplicationDefinitionListDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		tenantId?: string;
		name?: string;
		displayName?: string;
		description?: string;
		routePath?: string;
		isEnabled?: boolean;
		workflowEnabled?: boolean;
		workflowName?: string;
		entityCount?: number;
		relationCount?: number;
	};

	type BurnAbpDynamicSchemaDtosDynamicDataDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		tenantId?: string;
		applicationId?: string;
		entityDefinitionId?: string;
		parentId?: string;
		rootId?: string;
		nestingLevel?: number;
		sortOrder?: number;
		data?: Record<string, any>;
		workflowInstanceId?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		currentActivityName?: string;
		currentAssigneeName?: string;
	};

	type BurnAbpDynamicSchemaDtosDynamicDataWithChildrenDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		tenantId?: string;
		applicationId?: string;
		entityDefinitionId?: string;
		parentId?: string;
		rootId?: string;
		nestingLevel?: number;
		sortOrder?: number;
		data?: Record<string, any>;
		workflowInstanceId?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		currentActivityName?: string;
		currentAssigneeName?: string;
		children?: Record<string, any>;
		childCounts?: Record<string, any>;
	};

	type BurnAbpDynamicSchemaDtosDynamicEntityDefinitionDto = {
		id?: string;
		applicationId?: string;
		tenantId?: string;
		name?: string;
		displayName?: string;
		description?: string;
		role?: BurnAbpDynamicSchemaEnumsEntityRole;
		nestingLevel?: number;
		storageMode?: BurnAbpDynamicSchemaEnumsStorageMode;
		physicalTableName?: string;
		displayOrder?: number;
		icon?: string;
		isEnabled?: boolean;
		fields?: BurnAbpDynamicSchemaDtosDynamicFieldDefinitionDto[];
	};

	type BurnAbpDynamicSchemaDtosDynamicEntityRelationDto = {
		id?: string;
		applicationId?: string;
		tenantId?: string;
		relationName?: string;
		displayName?: string;
		sourceEntityId?: string;
		targetEntityId?: string;
		relationType?: BurnAbpDynamicSchemaEnumsRelationType;
		cascadeDeleteBehavior?: BurnAbpDynamicSchemaEnumsCascadeDeleteBehavior;
	};

	type BurnAbpDynamicSchemaDtosDynamicFieldDefinitionDto = {
		id?: string;
		entityDefinitionId?: string;
		tenantId?: string;
		name?: string;
		displayName?: string;
		description?: string;
		dataType?: BurnAbpDynamicSchemaEnumsFieldDataType;
		maxLength?: number;
		precision?: number;
		scale?: number;
		defaultValue?: string;
		uiComponent?: string;
		placeholder?: string;
		componentProps?: string;
		displayOrder?: number;
		isVisible?: boolean;
		isRequired?: boolean;
		validationRules?: string;
		isPromoted?: boolean;
		columnName?: string;
		indexType?: BurnAbpDynamicSchemaEnumsIndexType;
	};

	type BurnAbpDynamicSchemaDtosDynamicQueryInput = {
		maxResultCount?: number;
		skipCount?: number;
		sorting?: string;
		include?: string;
		filters?: Record<string, any>;
	};

	type BurnAbpDynamicSchemaDtosEnumOptionDto = {
		value?: any;
		label?: string;
	};

	type BurnAbpDynamicSchemaDtosFilterConfigDto = {
		field?: string;
		label?: string;
		filterType?: BurnAbpDynamicSchemaDtosFilterType;
		options?: BurnAbpDynamicSchemaDtosEnumOptionDto[];
		defaultValue?: any;
		sortOrder?: number;
	};

	type BurnAbpDynamicSchemaDtosFilterType = 0 | 1 | 2 | 3 | 4 | 5;

	type BurnAbpDynamicSchemaDtosListConfigDto = {
		id?: string;
		key?: string;
		columns?: BurnAbpDynamicSchemaDtosColumnConfigDto[];
		filters?: BurnAbpDynamicSchemaDtosFilterConfigDto[];
		defaultSort?: BurnAbpDynamicSchemaDtosSortConfigDto;
		pageSize?: number;
		rowActions?: BurnAbpDynamicSchemaDtosRowActionConfigDto[];
		batchActions?: BurnAbpDynamicSchemaDtosBatchActionConfigDto[];
		version?: number;
		sourceType?: BurnAbpDynamicSchemaDtosListConfigSourceType;
		creationTime?: string;
		lastModificationTime?: string;
	};

	type BurnAbpDynamicSchemaDtosListConfigSourceType = 0 | 1;

	type BurnAbpDynamicSchemaDtosRowActionConfigDto = {
		key?: string;
		label?: string;
		icon?: string;
		type?: BurnAbpDynamicSchemaDtosRowActionType;
		confirmMessage?: string;
		permission?: string;
		sortOrder?: number;
	};

	type BurnAbpDynamicSchemaDtosRowActionType = 0 | 1 | 2 | 3;

	type BurnAbpDynamicSchemaDtosSaveListConfigInput = {
		columns?: BurnAbpDynamicSchemaDtosColumnConfigDto[];
		filters?: BurnAbpDynamicSchemaDtosFilterConfigDto[];
		defaultSort?: BurnAbpDynamicSchemaDtosSortConfigDto;
		pageSize?: number;
		rowActions?: BurnAbpDynamicSchemaDtosRowActionConfigDto[];
		batchActions?: BurnAbpDynamicSchemaDtosBatchActionConfigDto[];
	};

	type BurnAbpDynamicSchemaDtosSortConfigDto = {
		field?: string;
		direction?: BurnAbpDynamicSchemaDtosSortDirection;
	};

	type BurnAbpDynamicSchemaDtosSortDirection = 0 | 1;

	type BurnAbpDynamicSchemaDtosUpdateDataWithChildrenInput = {
		data?: Record<string, any>;
		children?: Record<string, any>;
	};

	type BurnAbpDynamicSchemaDtosUpdateEntityInput = {
		displayName: string;
		description?: string;
		icon?: string;
		displayOrder?: number;
		isEnabled?: boolean;
	};

	type BurnAbpDynamicSchemaDtosUpdateFieldInput = {
		displayName: string;
		description?: string;
		uiComponent: string;
		isRequired?: boolean;
		displayOrder?: number;
		maxLength?: number;
		precision?: number;
		scale?: number;
		defaultValue?: string;
		placeholder?: string;
		componentProps?: string;
		validationRules?: string;
	};

	type BurnAbpDynamicSchemaEnumsCascadeDeleteBehavior = 0 | 1 | 2 | 3;

	type BurnAbpDynamicSchemaEnumsEntityRole = 0 | 1 | 2 | 3;

	type BurnAbpDynamicSchemaEnumsFieldDataType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

	type BurnAbpDynamicSchemaEnumsFieldStatus = 0 | 1 | 2 | 3 | 4;

	type BurnAbpDynamicSchemaEnumsFormSchemaSourceType = 0 | 1 | 2;

	type BurnAbpDynamicSchemaEnumsIndexType = 0 | 1 | 2 | 3;

	type BurnAbpDynamicSchemaEnumsRelationType = 0 | 1 | 2;

	type BurnAbpDynamicSchemaEnumsStorageMode = 0 | 1 | 2;

	type BurnAbpDynamicSchemaFieldPromotionDataBackfillResultDto = {
		success?: boolean;
		totalRows?: number;
		updatedRows?: number;
		skippedRows?: number;
		errorRows?: number;
		executionTimeMs?: number;
	};

	type BurnAbpDynamicSchemaFieldPromotionPromoteFieldInput = {
		applicationCode: string;
		fieldName: string;
		backfillData?: boolean;
		backfillBatchSize?: number;
	};

	type BurnAbpDynamicSchemaFieldPromotionPromoteFieldPreCheckInput = {
		applicationCode: string;
		fieldName: string;
	};

	type BurnAbpDynamicSchemaFieldPromotionPromoteFieldPreCheckResult = {
		canPromote?: boolean;
		isAlreadyPromoted?: boolean;
		columnExists?: boolean;
		estimatedRows?: number;
		estimatedTimeSeconds?: number;
		warnings?: string[];
		errorMessage?: string;
	};

	type BurnAbpDynamicSchemaFieldPromotionPromoteFieldResult = {
		success?: boolean;
		errorMessage?: string;
		columnName?: string;
		indexCreated?: boolean;
		backfillResult?: BurnAbpDynamicSchemaFieldPromotionDataBackfillResultDto;
		ddlExecutionTimeMs?: number;
	};

	type BurnAbpDynamicSchemaFormilyFormilySchemaDto = {
		form?: any;
		schema?: any;
		version?: number;
		name?: string;
		displayName?: string;
	};

	type BurnAbpDynamicSchemaFormilySaveDesignerSchemaInput = {
		applicationName: string;
		schema: any;
		scenarioKey?: string;
		syncMetadata?: boolean;
	};

	type BurnAbpDynamicSchemaFormilySyncSchemaResult = {
		success?: boolean;
		message?: string;
		addedFields?: number;
		updatedFields?: number;
		removedFields?: number;
		warnings?: string[];
	};

	type BurnAbpDynamicSchemaHostEntitiesAllPublishedSchemasDto = {
		schemas?: Record<string, any>;
		fetchedAt?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesCreateFormSchemaDto = {
		sourceType?: BurnAbpDynamicSchemaEnumsFormSchemaSourceType;
		entityDefinitionId?: string;
		hostEntityId?: string;
		scenarioKey?: string;
		entityName?: string;
		formName?: string;
		schemaJson?: string;
		remarks?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesCreateUpdateExtensionFieldDto = {
		name?: string;
		displayName?: string;
		description?: string;
		dataType?: BurnAbpDynamicSchemaEnumsFieldDataType;
		maxLength?: number;
		precision?: number;
		scale?: number;
		isRequired?: boolean;
		defaultValue?: string;
		indexType?: BurnAbpDynamicSchemaEnumsIndexType;
		sortOrder?: number;
	};

	type BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		sourceType?: BurnAbpDynamicSchemaEnumsFormSchemaSourceType;
		entityDefinitionId?: string;
		hostEntityId?: string;
		entityName?: string;
		formName?: string;
		scenarioKey?: string;
		schemaJson?: string;
		version?: number;
		isPublished?: boolean;
		publishedBy?: string;
		publishedAt?: string;
		remarks?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionListDto = {
		id?: string;
		sourceType?: BurnAbpDynamicSchemaEnumsFormSchemaSourceType;
		entityDefinitionId?: string;
		hostEntityId?: string;
		entityName?: string;
		formName?: string;
		scenarioKey?: string;
		version?: number;
		isPublished?: boolean;
		publishedAt?: string;
		creationTime?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		entityType?: string;
		displayName?: string;
		tableName?: string;
		connectionStringName?: string;
		moduleName?: string;
		isEnabled?: boolean;
		extensionFields?: BurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto[];
	};

	type BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionListDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		entityType?: string;
		displayName?: string;
		tableName?: string;
		moduleName?: string;
		isEnabled?: boolean;
		extensionFieldCount?: number;
		activeFieldCount?: number;
	};

	type BurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		hostEntityId?: string;
		tenantId?: string;
		name?: string;
		displayName?: string;
		description?: string;
		dataType?: BurnAbpDynamicSchemaEnumsFieldDataType;
		physicalColumnName?: string;
		maxLength?: number;
		precision?: number;
		scale?: number;
		isRequired?: boolean;
		defaultValue?: string;
		indexType?: BurnAbpDynamicSchemaEnumsIndexType;
		uiComponent?: string;
		placeholder?: string;
		componentProps?: string;
		isVisible?: boolean;
		validationRules?: string;
		sortOrder?: number;
		status?: BurnAbpDynamicSchemaEnumsFieldStatus;
		lastErrorMessage?: string;
		ddlExecutedAt?: string;
		retryCount?: number;
		creationTime?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesMergedFormSchemaDto = {
		hostEntityId?: string;
		entityType?: string;
		scenarioKey?: string;
		version?: number;
		isPublished?: boolean;
		mergedSchemaJson?: string;
		baseSchemaJson?: string;
		extensionSchemaJson?: string;
		designerSchemaJson?: string;
		extensionFieldCount?: number;
	};

	type BurnAbpDynamicSchemaHostEntitiesPublishedSchemaDto = {
		scenarioKey?: string;
		schemaJson?: string;
		version?: number;
		publishedAt?: string;
		hostEntityId?: string;
		entityType?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesRegisterHostEntityInput = {
		entityType?: string;
		displayName?: string;
		moduleName?: string;
		tableName?: string;
		connectionStringName?: string;
		serviceEndpoint?: string;
		baseSchemaJson?: string;
	};

	type BurnAbpDynamicSchemaHostEntitiesSaveHostEntitySchemaInput = {
		schemaJson?: string;
		publish?: boolean;
	};

	type BurnAbpDynamicSchemaHostEntitiesUpdateFormSchemaDto = {
		schemaJson?: string;
		formName?: string;
		remarks?: string;
	};

	type BurnAbpDynamicSchemaImportExportExportDataInput = {
		applicationId: string;
		entityDefinitionId: string;
		ids?: string[];
		query?: BurnAbpDynamicSchemaDtosDynamicQueryInput;
		includeChildren?: boolean;
	};

	type BurnAbpDynamicSchemaImportExportExportResultDto = {
		fileContent?: string;
		fileName?: string;
		contentType?: string;
	};

	type BurnAbpDynamicSchemaImportExportImportDataInput = {
		applicationId: string;
		entityDefinitionId: string;
		fileContent: string;
	};

	type BurnAbpDynamicSchemaImportExportImportErrorDto = {
		sheetName?: string;
		rowNumber?: number;
		fieldName?: string;
		errorMessage?: string;
	};

	type BurnAbpDynamicSchemaImportExportImportResultDto = {
		success?: boolean;
		totalRows?: number;
		importedRows?: number;
		errors?: BurnAbpDynamicSchemaImportExportImportErrorDto[];
	};

	type BurnAbpDynamicSchemaImportExportTemplateResultDto = {
		fileContent?: string;
		fileName?: string;
		contentType?: string;
	};

	type BurnAbpDynamicSchemaMenusDynamicMenuDto = {
		items?: BurnAbpDynamicSchemaMenusMenuItemDto[];
	};

	type BurnAbpDynamicSchemaMenusMenuItemDto = {
		key?: string;
		name?: string;
		icon?: string;
		path?: string;
		type?: BurnAbpDynamicSchemaMenusMenuItemType;
		children?: BurnAbpDynamicSchemaMenusMenuItemDto[];
		meta?: BurnAbpDynamicSchemaMenusMenuItemMeta;
	};

	type BurnAbpDynamicSchemaMenusMenuItemMeta = {
		appId?: string;
		entityId?: string;
		hostEntityId?: string;
		permissions?: string[];
	};

	type BurnAbpDynamicSchemaMenusMenuItemType = 0 | 1 | 2;

	type BurnAbpDynamicSchemaWorkflowDtosApplicationInfoDto = {
		applicationId?: string;
		applicationName?: string;
		displayName?: string;
	};

	type BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowBookmarkDto = {
		id?: string;
		workflowDefinitionId?: string;
		workflowVersion?: number;
		workflowInstanceId?: string;
		activityId?: string;
		activityNodeId?: string;
		activityInstanceId?: string;
		activityName?: string;
		activityDisplayName?: string;
		activityDescription?: string;
		bookmarkId?: string;
		assigneeId?: string;
		assigneeName?: string;
		assigneeTime?: string;
		formUrl?: string;
		status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
		completionTime?: string;
		message?: string;
	};

	type BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowProxyDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		applicationId?: string;
		targetRowId?: string;
		storageMode?: BurnAbpDynamicSchemaEnumsStorageMode;
		physicalTableName?: string;
		workflowInstanceId?: string;
		currentActivityName?: string;
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		creator?: string;
		workflows?: BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowBookmarkDto[];
	};

	type BurnAbpDynamicSchemaWorkflowDtosExecuteDynamicDataWorkflowInput = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpEntityAttachmentsEntityAttachment = {
		id?: string;
		entityId?: string;
		entityTypeName?: string;
		name?: string;
		size?: number;
		type?: string;
		blobName?: string;
		tenantId?: string;
		creator?: string;
		creatorId?: string;
		creationTime?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganClearUserTableDto = {
		tableKey?: string;
		providerName?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesColumnTableSchemeDto = {
		id?: string;
		name?: string;
		gridId?: string;
		userId?: string;
		description?: string;
		createdAt?: number;
		updatedAt?: number;
		isDefault?: boolean;
		isSystem?: boolean;
		tags?: string[];
		shareLevel?: BurnAbpExtraObjectManagementDomainShared_biaogefanganShareLevel;
		concurrencyStamp?: string;
		columnConfig?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesCurrentSchemeDto = {
		userId?: string;
		gridId?: string;
		columnSchemeId?: string;
		querySchemeId?: string;
		updatedAtTimestamp?: number;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesDeletedSchemesDto = {
		columnSchemes?: string[];
		querySchemes?: string[];
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesDeleteSchemeResultDto = {
		success?: boolean;
		syncTime?: number;
		message?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesQueryTableSchemeDto = {
		id?: string;
		name?: string;
		gridId?: string;
		userId?: string;
		description?: string;
		createdAt?: number;
		updatedAt?: number;
		isDefault?: boolean;
		isSystem?: boolean;
		tags?: string[];
		shareLevel?: BurnAbpExtraObjectManagementDomainShared_biaogefanganShareLevel;
		concurrencyStamp?: string;
		queryConfig?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveColumnSchemeRequestDto = {
		gridId?: string;
		scheme?: BurnAbpExtraObjectManagementApplication_biaogefanganSchemesColumnTableSchemeDto;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveQuerySchemeRequestDto = {
		gridId?: string;
		scheme?: BurnAbpExtraObjectManagementApplication_biaogefanganSchemesQueryTableSchemeDto;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveSchemeResultDto = {
		success?: boolean;
		syncTime?: number;
		scheme?: any;
		message?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeConflictDto = {
		type?: string;
		gridId?: string;
		schemeId?: string;
		serverUpdatedAt?: number;
		clientUpdatedAt?: number;
		resolution?: string;
		serverScheme?: any;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeSyncDataDto = {
		columnSchemes?: Record<string, any>;
		querySchemes?: Record<string, any>;
		currentSchemes?: Record<string, any>;
		deletedSchemes?: BurnAbpExtraObjectManagementApplication_biaogefanganSchemesDeletedSchemesDto;
		syncTime?: number;
		version?: number;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeSyncRequestDto = {
		columnSchemes?: Record<string, any>;
		querySchemes?: Record<string, any>;
		currentSchemes?: Record<string, any>;
		deletedSchemes?: BurnAbpExtraObjectManagementApplication_biaogefanganSchemesDeletedSchemesDto;
		clientSyncTime?: number;
		version?: number;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeSyncResultDto = {
		syncTime?: number;
		version?: number;
		conflicts?: BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeConflictDto[];
		stats?: BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSyncStatsDto;
		message?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSetCurrentSchemeRequestDto = {
		gridId?: string;
		columnSchemeId?: string;
		querySchemeId?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSetCurrentSchemeResultDto = {
		success?: boolean;
		syncTime?: number;
		message?: string;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSyncStatsDto = {
		columnSchemesCreated?: number;
		columnSchemesUpdated?: number;
		columnSchemesDeleted?: number;
		querySchemesCreated?: number;
		querySchemesUpdated?: number;
		querySchemesDeleted?: number;
		conflicts?: number;
	};

	type BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		extraIndexProperties?: Record<string, any>;
		creator?: string;
		lastModifier?: string;
		deleter?: string;
		organizationCode?: string;
		organizationName?: string;
		companyCode?: string;
		factoryCode?: string;
		tableKey?: string;
		providerName?: string;
		layoutContext?: string;
	};

	type BurnAbpExtraObjectManagementDomainShared_biaogefanganShareLevel = 0 | 1 | 2;

	type BurnAbpFactoryManagementCompanysCompanyInfoDto = {
		id?: number;
		code?: string;
		chinaName?: string;
		englishName?: string;
		addr?: string;
		invoiceAddr?: string;
		tel?: string;
		websit?: string;
		email?: string;
		extraIndexProperties?: Record<string, any>;
	};

	type BurnAbpFactoryManagementFactorysFactoryInfoDto = {
		id?: number;
		code?: string;
		name?: string;
		tel?: string;
		address?: string;
		deliveryAddr?: string;
		memo?: string;
		extraIndexProperties?: Record<string, any>;
	};

	type BurnAbpFactoryManagementOrganizationsAddUsersToOrganizationDto = {
		userNames?: string[];
		organizationCode?: string;
	};

	type BurnAbpFactoryManagementOrganizationsAddUserToOrganizationDto = {
		userName?: string;
		organizationCode?: string;
	};

	type BurnAbpFactoryManagementOrganizationsGetOrganizationUserInput = {
		userName?: string;
		organizationCode?: string;
	};

	type BurnAbpFactoryManagementOrganizationsOrganizationFunction = 1 | 2 | 4 | 8 | 16;

	type BurnAbpFactoryManagementOrganizationsOrganizationInfoDto = {
		id?: number;
		code?: string;
		name?: string;
		parentCode?: string;
		organizationType?: string;
		organizationFunction?: BurnAbpFactoryManagementOrganizationsOrganizationFunction;
		isPlan?: string;
		companyCode?: string;
		factoryCode?: string;
		isDefault?: boolean;
		extraIndexProperties?: Record<string, any>;
	};

	type BurnAbpFactoryManagementOrganizationsRemoveFromOrganizationDto = {
		userName?: string;
		organizationCode?: string;
	};

	type BurnAbpFactoryManagementOrganizationsUserOrganizationDto = {
		code?: string;
		name?: string;
		isDefault?: boolean;
	};

	type BurnAbpIdentityProAddUsersToOUInput = {
		userIds?: string[];
		organizationUnitId?: string;
	};

	type BurnAbpIdentityProHttpApiModelsAddRoleInput = {
		users?: string[];
		roleName?: string;
	};

	type BurnAbpIdentityProOrganizationUnitDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		code?: string;
		displayName?: string;
		parentId?: string;
		parentDisplayName?: string;
		leaderId?: string;
		leaderName?: string;
		organizationUnitType?: number;
		parent?: BurnAbpIdentityProOrganizationUnitDto;
	};

	type BurnAbpIdentityProOrganizationUnitTreeDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		key?: string;
		code?: string;
		title?: string;
		parentId?: string;
		parentDisplayName?: string;
		leaderId?: string;
		organizationUnitType?: number;
		children?: BurnAbpIdentityProOrganizationUnitTreeDto[];
	};

	type BurnAbpIdentityProUsersCheckUserPassWordDto = {
		userName?: string;
		password?: string;
	};

	type BurnAbpIdentityProUsersIdentityRoleProDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		name?: string;
		isDefault?: boolean;
		isStatic?: boolean;
		isPublic?: boolean;
		concurrencyStamp?: string;
	};

	type BurnAbpIdentityProUsersIdentityUserProDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		tenantId?: string;
		userName?: string;
		name?: string;
		surname?: string;
		email?: string;
		emailConfirmed?: boolean;
		phoneNumber?: string;
		phoneNumberConfirmed?: boolean;
		isActive?: boolean;
		lockoutEnabled?: boolean;
		accessFailedCount?: number;
		lockoutEnd?: string;
		concurrencyStamp?: string;
		entityVersion?: number;
		lastPasswordChangeTime?: string;
	};

	type BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosCreateDynamicPropertyDefinitionDto = {
		feature: string;
		propertyName: string;
		propertyType: BurnAbpLabelManagementPropertyDefinitionsPropertyType;
		displayName: string;
		description?: string;
		required?: boolean;
		defaultValue?: any;
		enumValues?: Record<string, any>;
	};

	type BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosDynamicPropertyDefinitionDto = {
		id?: string;
		feature?: string;
		propertyName?: string;
		propertyType?: BurnAbpLabelManagementPropertyDefinitionsPropertyType;
		displayName?: string;
		description?: string;
		required?: boolean;
		defaultValue?: any;
		enumValues?: Record<string, any>;
	};

	type BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosUpdateDynamicPropertyDefinitionDto = {
		displayName: string;
		description?: string;
		required?: boolean;
		defaultValue?: any;
		enumValues?: Record<string, any>;
	};

	type BurnAbpLabelManagementDataSourcesCacheConfigDto = {
		enabled?: boolean;
		expirationSeconds?: number;
		useDistributedCache?: boolean;
	};

	type BurnAbpLabelManagementDataSourcesDataSourceConfigDto = {
		key: string;
		type?: BurnDataSourcesDataSourceType;
		configJson: string;
		parameters?: BurnAbpLabelManagementDataSourcesDataSourceParameterDto[];
		cache?: BurnAbpLabelManagementDataSourcesCacheConfigDto;
	};

	type BurnAbpLabelManagementDataSourcesDataSourceParameterDto = {
		name: string;
		description?: string;
		parameterType: string;
		isRequired?: boolean;
		defaultValue?: string;
	};

	type BurnAbpLabelManagementDataSourcesGetDataSourceDataInput = {
		config: BurnAbpLabelManagementDataSourcesDataSourceConfigDto;
		parameters?: Record<string, any>;
		forceRefresh?: boolean;
	};

	type BurnAbpLabelManagementDataSourcesGetDataSourceDataOutput = {
		data?: any;
		fromCache?: boolean;
		itemCount?: number;
	};

	type BurnAbpLabelManagementDataSourcesTestDataSourceInput = {
		config: BurnAbpLabelManagementDataSourcesDataSourceConfigDto;
	};

	type BurnAbpLabelManagementDataSourcesTestDataSourceOutput = {
		success?: boolean;
		responseTimeMs?: number;
		message?: string;
		diagnostics?: Record<string, any>;
		sampleData?: any;
		errorDetails?: string;
	};

	type BurnAbpLabelManagementDataSourcesValidateDataSourceInput = {
		config: BurnAbpLabelManagementDataSourcesDataSourceConfigDto;
	};

	type BurnAbpLabelManagementDataSourcesValidateDataSourceOutput = {
		isValid?: boolean;
		errors?: string[];
		warnings?: string[];
	};

	type BurnAbpLabelManagementLabelCategoriesCreateLabelCategoryInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		remark?: string;
	};

	type BurnAbpLabelManagementLabelCategoriesLabelCategoryDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		code?: string;
		name?: string;
		remark?: string;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelCategoriesUpdateLabelCategoryInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		remark?: string;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelDatasGetLabelDataInputDto = {
		printFeatureCode?: string;
		labelTemplateId?: string;
		identifier?: string;
		isTest?: boolean;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelDatasGetLabelDataResultDto = {
		content?: string;
	};

	type BurnAbpLabelManagementLabelPrintDefinitionsCreateLabelPrintDefinitionInput = {
		extraProperties?: Record<string, any>;
		feature: string;
		labelTypeCode: string;
		labelTypeName: string;
		order?: number;
	};

	type BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		feature?: string;
		featureName?: string;
		labelTypeCode?: string;
		labelTypeName?: string;
		order?: number;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionWithTemplateDto = {
		feature?: string;
		featureName?: string;
		order?: number;
		labelCategoryCode?: string;
		labelCategoryName?: string;
		labelTypeCode?: string;
		labelTypeName?: string;
		labelPrintTemplateId?: string;
		labelPrintTemplateName?: string;
		labelPrintTemplateWidth?: number;
		labelPrintTemplateHeight?: number;
		printQuantity?: number;
	};

	type BurnAbpLabelManagementLabelPrintDefinitionsMatchTemplateByFeatureInput = {
		featureCode: string;
		businessData: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelPrintDefinitionsMatchTemplateInput = {
		printFeature: string;
		labelTypeCode: string;
		businessData: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelPrintDefinitionsUpdateLabelPrintDefinitionInput = {
		extraProperties?: Record<string, any>;
		feature: string;
		labelTypeCode: string;
		labelTypeName: string;
		order?: number;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelPrintFeatureDataSourcesCreateFeatureDataSourceConfigDto = {
		printFeatureCode: string;
		dataSourceType: BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceType;
		url?: string;
		httpMethod?: string;
		query?: string;
		connectionString?: string;
		staticPropertyMapping?: Record<string, any>;
		dynamicPropertyMapping?: Record<string, any>;
		headers?: Record<string, any>;
		cacheDuration?: number;
		timeoutSeconds?: number;
		failureMode?: BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceFailureMode;
		defaultValues?: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceFailureMode = 0 | 1 | 2;

	type BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceType = 1 | 2 | 3;

	type BurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		printFeatureCode?: string;
		dataSourceType?: BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceType;
		url?: string;
		httpMethod?: string;
		query?: string;
		connectionString?: string;
		staticPropertyMapping?: Record<string, any>;
		dynamicPropertyMapping?: Record<string, any>;
		headers?: Record<string, any>;
		cacheDuration?: number;
		timeoutSeconds?: number;
		failureMode?: BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceFailureMode;
		defaultValues?: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelPrintFeatureDataSourcesUpdateFeatureDataSourceConfigDto = {
		dataSourceType: BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceType;
		url?: string;
		httpMethod?: string;
		query?: string;
		connectionString?: string;
		staticPropertyMapping?: Record<string, any>;
		dynamicPropertyMapping?: Record<string, any>;
		headers?: Record<string, any>;
		cacheDuration?: number;
		timeoutSeconds?: number;
		failureMode?: BurnAbpLabelManagementLabelPrintFeatureDataSourcesDataSourceFailureMode;
		defaultValues?: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto = {
		feature?: string;
		displayName?: string;
		labelInfoContributorName?: string;
		serviceName?: string;
	};

	type BurnAbpLabelManagementLabelPrintFeaturesPropertyDto = {
		name?: string;
		type?: number;
		displayName?: string;
		description?: string;
		required?: boolean;
		defaultValue?: string;
		enumValues?: string;
		isDynamic?: boolean;
	};

	type BurnAbpLabelManagementLabelPrintFeaturesPropertySchemaDto = {
		properties?: BurnAbpLabelManagementLabelPrintFeaturesPropertyDto[];
	};

	type BurnAbpLabelManagementLabelPrintSettingsCreateLabelSettingInput = {
		extraProperties?: Record<string, any>;
		printFeatureCode?: string;
		printFeatureName?: string;
		printTemplateId: string;
		printTemplateName: string;
		labelTypeCode: string;
		printQuantity?: number;
		labelTypeName: string;
		materialClassCode?: string;
		materialClassName?: string;
		materialItemCode?: string;
		materialItemName?: string;
		materialItemDescription?: string;
		customerCode?: string;
		customerName?: string;
		remark?: string;
		dimensionRuleGroup?: BurnAbpLabelManagementRuleEngineRuleGroupDto;
	};

	type BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		printFeatureCode?: string;
		printFeatureName?: string;
		labelTypeCode?: string;
		labelTypeName?: string;
		printTemplateId?: string;
		printTemplateName?: string;
		printQuantity?: number;
		materialClassCode?: string;
		materialClassName?: string;
		materialItemCode?: string;
		materialItemName?: string;
		materialItemDescription?: string;
		customerCode?: string;
		customerName?: string;
		remark?: string;
		dimensionRuleGroup?: BurnAbpLabelManagementRuleEngineRuleGroupDto;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelPrintSettingsRuleEvaluationResultDto = {
		isMatch?: boolean;
		evaluationTimeMs?: number;
		steps?: BurnAbpLabelManagementLabelPrintSettingsRuleEvaluationStepDto[];
		evaluatedValues?: Record<string, any>;
		errorMessage?: string;
	};

	type BurnAbpLabelManagementLabelPrintSettingsRuleEvaluationStepDto = {
		path?: string;
		expression?: string;
		result?: boolean;
		durationMs?: number;
		actualValue?: any;
		expectedValue?: any;
	};

	type BurnAbpLabelManagementLabelPrintSettingsRuleSimulationResult = {
		isMatch?: boolean;
		evaluationDetails?: BurnAbpLabelManagementLabelPrintSettingsRuleEvaluationResultDto;
	};

	type BurnAbpLabelManagementLabelPrintSettingsRuleValidationError = {
		code?: string;
		message?: string;
		path?: string;
	};

	type BurnAbpLabelManagementLabelPrintSettingsRuleValidationResult = {
		isValid?: boolean;
		errors?: BurnAbpLabelManagementLabelPrintSettingsRuleValidationError[];
		ruleCount?: number;
		maxDepth?: number;
	};

	type BurnAbpLabelManagementLabelPrintSettingsSimulateRuleInput = {
		ruleGroup: BurnAbpLabelManagementRuleEngineRuleGroupDto;
		businessData: Record<string, any>;
	};

	type BurnAbpLabelManagementLabelPrintSettingsUpdateLabelSettingInput = {
		extraProperties?: Record<string, any>;
		printFeatureCode?: string;
		printFeatureName?: string;
		printTemplateId: string;
		printTemplateName: string;
		printQuantity?: number;
		labelTypeCode: string;
		labelTypeName: string;
		materialClassCode?: string;
		materialClassName?: string;
		materialItemCode?: string;
		materialItemName?: string;
		materialItemDescription?: string;
		customerCode?: string;
		customerName?: string;
		remark?: string;
		dimensionRuleGroup?: BurnAbpLabelManagementRuleEngineRuleGroupDto;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelPrintSettingsValidateRuleInput = {
		ruleGroup: BurnAbpLabelManagementRuleEngineRuleGroupDto;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesCreateAtlTemplateInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		template: BurnLabelEngineModelsAtlTemplate;
		targetLanguage: BurnLabelEngineModelsEnumsPrintTemplateType;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesCreateLabelPrintTemplateInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		width?: number;
		height?: number;
		templateType?: BurnLabelEngineModelsEnumsPrintTemplateType;
		content?: string;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesImageFormat = 0 | 1 | 2;

	type BurnAbpLabelManagementLabelPrintTemplatesImportAtlTemplateInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name?: string;
		atlTemplateJson: string;
		targetLanguage: BurnLabelEngineModelsEnumsPrintTemplateType;
		overwriteIfExists?: boolean;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		code?: string;
		name?: string;
		width?: number;
		height?: number;
		templateType?: BurnLabelEngineModelsEnumsPrintTemplateType;
		content?: string;
		atlTemplateJson?: string;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesRenderImageOutput = {
		imageBase64?: string;
		format?: BurnAbpLabelManagementLabelPrintTemplatesImageFormat;
		width?: number;
		height?: number;
		mimeType?: string;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesRenderToImageInput = {
		template?: BurnLabelEngineModelsAtlTemplate;
		templateId?: string;
		sampleData?: Record<string, any>;
		format?: BurnAbpLabelManagementLabelPrintTemplatesImageFormat;
		scale?: number;
		backgroundColor?: string;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesRenderWithDataInput = {
		templateId: string;
		data: Record<string, any>;
		format?: BurnAbpLabelManagementLabelPrintTemplatesImageFormat;
		scale?: number;
		backgroundColor?: string;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesUpdateAtlTemplateInput = {
		extraProperties?: Record<string, any>;
		template: BurnLabelEngineModelsAtlTemplate;
		targetLanguage?: BurnLabelEngineModelsEnumsPrintTemplateType;
		concurrencyStamp: string;
	};

	type BurnAbpLabelManagementLabelPrintTemplatesUpdateLabelPrintTemplateInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		width?: number;
		height?: number;
		templateType?: BurnLabelEngineModelsEnumsPrintTemplateType;
		content?: string;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelTypeAdvancedSettingsCreateOrUpdateLabelTypeAdvancedSetting = {
		labelCode?: string;
		labelName?: string;
		sort?: number;
		providerName?: string;
		providerDescribe?: string;
		labelTemplateId?: string;
		labelTemplateName?: string;
	};

	type BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelAdvancedSettingProviderNameDto = {
		code?: string;
		name?: string;
	};

	type BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		labelCode?: string;
		labelName?: string;
		sort?: number;
		providerName?: string;
		providerDescribe?: string;
		labelTemplateId?: string;
		labelTemplateName?: string;
		printQuantity?: number;
	};

	type BurnAbpLabelManagementLabelTypesCreateLabelTypeInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		categoryCode: string;
		categoryName: string;
		defaultPrintTemplateId: string;
		defaultPrintTemplateName: string;
		defaultPrintQuantity: number;
		remark?: string;
	};

	type BurnAbpLabelManagementLabelTypesLabelTypeDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		code?: string;
		name?: string;
		categoryCode?: string;
		categoryName?: string;
		defaultPrintTemplateId?: string;
		defaultPrintTemplateName?: string;
		defaultPrintQuantity?: number;
		remark?: string;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementLabelTypesUpdateLabelTypeInput = {
		extraProperties?: Record<string, any>;
		code: string;
		name: string;
		categoryCode: string;
		categoryName: string;
		defaultPrintTemplateId: string;
		defaultPrintTemplateName: string;
		defaultPrintQuantity: number;
		remark?: string;
		concurrencyStamp?: string;
	};

	type BurnAbpLabelManagementPropertyDefinitionsPropertyType = 0 | 1 | 2 | 3 | 4 | 5;

	type BurnAbpLabelManagementRuleEngineRuleDto = {
		fieldName: string;
		operator?: BurnAbpRuleEngineMatchOperator;
		value?: any;
		value2?: any;
	};

	type BurnAbpLabelManagementRuleEngineRuleGroupDto = {
		logic?: BurnAbpRuleEngineMatchLogic;
		rules?: BurnAbpLabelManagementRuleEngineRuleDto[];
		groups?: BurnAbpLabelManagementRuleEngineRuleGroupDto[];
	};

	type BurnAbpLabelManagementRuntimePrintingRuntimeDataSourceDetailDto = {
		name?: string;
		type?: BurnDataSourcesDataSourceType;
		status?: BurnDataSourcesRuntimeDataSourceStatus;
		durationMs?: number;
		message?: string;
		recordCount?: number;
	};

	type BurnAbpLabelManagementRuntimePrintingRuntimeLabelPrintRequestDto = {
		templateCode: string;
		targetLanguage?: BurnLabelEngineModelsEnumsPrintTemplateType;
		parameters?: Record<string, any>;
		enableValidation?: boolean;
		includeResolvedData?: boolean;
	};

	type BurnAbpLabelManagementRuntimePrintingRuntimeLabelPrintResultDto = {
		success?: boolean;
		printerCode?: string;
		fallbackScript?: string;
		hasFallback?: boolean;
		language?: BurnLabelEngineModelsEnumsPrintTemplateType;
		pageCount?: number;
		templateVersion?: number;
		validationResult?: BurnLabelEngineRenderingTemplateValidationResult;
		warnings?: string[];
		metadata?: Record<string, any>;
		dataSources?: Record<string, any>;
		dataSourceDetails?: BurnAbpLabelManagementRuntimePrintingRuntimeDataSourceDetailDto[];
		resolvedData?: Record<string, any>;
	};

	type BurnAbpLabelManagementTemplateConverterConvertTemplateInput = {
		template: BurnLabelEngineModelsAtlTemplate;
		targetLanguage: BurnLabelEngineModelsEnumsPrintTemplateType;
		data?: Record<string, any>;
		validateBeforeConvert?: boolean;
		printerDpi?: number;
	};

	type BurnAbpLabelManagementTemplateConverterConvertTemplateOutput = {
		printerCode?: string;
		targetLanguage?: BurnLabelEngineModelsEnumsPrintTemplateType;
		validationResult?: BurnAbpLabelManagementTemplateConverterTemplateValidationResult;
		metadata?: Record<string, any>;
	};

	type BurnAbpLabelManagementTemplateConverterTemplateValidationResult = {
		isValid?: boolean;
		errors?: string[];
		warnings?: string[];
		diagnostics?: Record<string, any>;
		validatedAt?: string;
	};

	type BurnAbpLabelManagementTemplateConverterValidateTemplateInput = {
		template: BurnLabelEngineModelsAtlTemplate;
		targetLanguage: BurnLabelEngineModelsEnumsPrintTemplateType;
	};

	type BurnAbpLanguageManagementDtoCreateLanguageDto = {
		extraProperties?: Record<string, any>;
		cultureName?: string;
		displayName?: string;
		flagIcon?: string;
		isEnabled?: boolean;
		uiCultureName?: string;
	};

	type BurnAbpLanguageManagementDtoCultureInfoDto = {
		displayName?: string;
		name?: string;
	};

	type BurnAbpLanguageManagementDtoGetLanguagesTextsInput = {
		maxResultCount?: number;
		skipCount?: number;
		sorting?: string;
		baseCultureName?: string;
		targetCultureName?: string;
		resourceName?: string;
		name?: string;
	};

	type BurnAbpLanguageManagementDtoLanguageDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		cultureName?: string;
		displayName?: string;
		flagIcon?: string;
		isDefaultLanguage?: boolean;
		isEnabled?: boolean;
		uiCultureName?: string;
	};

	type BurnAbpLanguageManagementDtoLanguageResourceDto = {
		name?: string;
	};

	type BurnAbpLanguageManagementDtoLanguageTextDto = {
		baseCultureName?: string;
		baseValue?: string;
		cultureName?: string;
		name?: string;
		resourceName?: string;
		value?: string;
	};

	type BurnAbpLanguageManagementDtoUpdateLanguageDto = {
		extraProperties?: Record<string, any>;
		displayName?: string;
		flagIcon?: string;
		isEnabled?: boolean;
	};

	type BurnAbpMenuFavoritesApplicationContractsMenuFavoritesDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		extraIndexProperties?: Record<string, any>;
		creator?: string;
		lastModifier?: string;
		deleter?: string;
		organizationCode?: string;
		organizationName?: string;
		companyCode?: string;
		factoryCode?: string;
		userId?: string;
		name?: string;
		displayName?: string;
		url?: string;
		icon?: string;
		isCancel?: boolean;
	};

	type BurnAbpNotificationServiceNotificationsDtosUserNotificationDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		userId?: string;
		userName?: string;
		notificationInfoId?: string;
		notificationMethod?: string;
		subject?: string;
		content?: string;
		isRead?: boolean;
		readTime?: string;
	};

	type BurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		mac?: string;
		displayName?: string;
		description?: string;
		isOnline?: boolean;
		connectionId?: string;
		clientIpAddress?: string;
		lastOnlineTime?: string;
		printers?: BurnAbpPrintTemplateManagementPrintersPrinterDto[];
	};

	type BurnAbpPrintTemplateManagementPrinterClientsUpdatePrinterClientInput = {
		displayName: string;
		description?: string;
	};

	type BurnAbpPrintTemplateManagementPrinterClientsUpdatePrinterInput = {
		displayName: string;
	};

	type BurnAbpPrintTemplateManagementPrintersPrintDataInput = {
		testPage?: boolean;
		labelTemplateCode?: string;
		identifier?: string;
		isTest?: boolean;
		url?: string;
		width?: number;
		height?: number;
		printQuantity?: number;
	};

	type BurnAbpPrintTemplateManagementPrintersPrinterDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		name?: string;
		displayName?: string;
		model?: string;
		ipAddress?: string;
		mac?: string;
		status?: BurnAbpPrintTemplateManagementPrintersPrinterStatus;
		client?: BurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto;
	};

	type BurnAbpPrintTemplateManagementPrintersPrinterStatus = 0 | 1 | -1;

	type BurnAbpPrintTemplateManagementPrintTasksPrintTaskDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		testPage?: boolean;
		printerClientId?: string;
		printerClientDisplayName?: string;
		printerId?: string;
		printerName?: string;
		status?: BurnAbpPrintTemplateManagementPrintTasksPrintTaskStatus;
		labelTemplateCode?: string;
		identifier?: string;
		isTest?: boolean;
		url?: string;
		width?: number;
		height?: number;
		printQuantity?: number;
	};

	type BurnAbpPrintTemplateManagementPrintTasksPrintTaskStatus = 0 | 1 | 2 | 3 | 4;

	type BurnAbpPrintTemplateManagementPrintTasksReprintInput = {
		printerId?: string;
	};

	type BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto = {
		id?: string;
		name?: string;
		describe?: string;
		width?: number;
		height?: number;
		templateType?: number;
		templateContent?: string;
	};

	type BurnAbpPrintTemplateManagementUserPrintFeaturePrintersSetSelfUserPrintFeaturePrinterInput = {
		items?: BurnAbpPrintTemplateManagementUserPrintFeaturePrintersSetSelfUserPrintFeaturePrinterItem[];
	};

	type BurnAbpPrintTemplateManagementUserPrintFeaturePrintersSetSelfUserPrintFeaturePrinterItem = {
		printerFeatureCode: string;
		printerClientId: string;
		printerClientDisplayName?: string;
		printerId?: string;
		printerName?: string;
	};

	type BurnAbpPrintTemplateManagementUserPrintFeaturePrintersSetUserPrintFeaturePrinterInput = {
		userId?: string;
		userName: string;
		printerFeatureCode: string;
		printerClientId?: string;
		printerClientDisplayName?: string;
		printerId?: string;
		printerName?: string;
	};

	type BurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		userId?: string;
		userName?: string;
		printerFeatureCode?: string;
		printerClientId?: string;
		printerClientDisplayName?: string;
		printerId?: string;
		printerName?: string;
	};

	type BurnAbpRuleEngineMatchLogic = 0 | 1;

	type BurnAbpRuleEngineMatchOperator = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

	type BurnAbpSettingManagementApplicationProDtoSettingGroup = {
		groupName?: string;
		groupDisplayName?: string;
		settingInfos?: BurnAbpSettingManagementApplicationProDtoSettingInfo[];
		permission?: string;
	};

	type BurnAbpSettingManagementApplicationProDtoSettingInfo = {
		name?: string;
		displayName?: string;
		description?: string;
		value?: string;
		properties?: Record<string, any>;
		permission?: string;
	};

	type BurnAbpSystemSharedHostAuditLoggingsDtosAuditLogActionDto = {
		/** Action ID */
		id?: string;
		/** 审计日志ID */
		auditLogId?: string;
		/** 服务名称（控制器或服务类名） */
		serviceName?: string;
		/** 方法名称 */
		methodName?: string;
		/** 方法参数（JSON格式） */
		parameters?: string;
		/** 执行时间 */
		executionTime?: string;
		/** 执行持续时间（毫秒） */
		executionDuration?: number;
	};

	type BurnAbpSystemSharedHostAuditLoggingsDtosAuditLogDetailDto = {
		/** 审计日志ID */
		id?: string;
		/** 应用名称 */
		applicationName?: string;
		/** 用户ID */
		userId?: string;
		/** 用户名 */
		userName?: string;
		/** 租户ID */
		tenantId?: string;
		/** 租户名称 */
		tenantName?: string;
		/** 客户端ID */
		clientId?: string;
		/** 客户端名称 */
		clientName?: string;
		/** 客户端IP地址 */
		clientIpAddress?: string;
		/** 关联ID（用于关联不同应用的日志） */
		correlationId?: string;
		/** 浏览器信息 */
		browserInfo?: string;
		/** HTTP方法（GET, POST, PUT, DELETE等） */
		httpMethod?: string;
		/** HTTP状态码 */
		httpStatusCode?: number;
		/** 请求URL */
		url?: string;
		/** 执行时间 */
		executionTime?: string;
		/** 执行持续时间（毫秒） */
		executionDuration?: number;
		/** 是否有异常 */
		hasException?: boolean;
		/** 异常信息（JSON格式） */
		exceptions?: string;
		/** 备注信息（JSON格式或纯文本） */
		comments?: string;
		/** Action 列表（控制器/服务方法调用记录） */
		actions?: BurnAbpSystemSharedHostAuditLoggingsDtosAuditLogActionDto[];
		/** 实体变更列表 */
		entityChanges?: BurnAbpSystemSharedHostAuditLoggingsDtosEntityChangeDto[];
	};

	type BurnAbpSystemSharedHostAuditLoggingsDtosAuditLogDto = {
		/** 审计日志ID */
		id?: string;
		/** 应用名称 */
		applicationName?: string;
		/** 用户ID */
		userId?: string;
		/** 用户名 */
		userName?: string;
		/** 租户ID */
		tenantId?: string;
		/** 租户名称 */
		tenantName?: string;
		/** 客户端ID */
		clientId?: string;
		/** 客户端名称 */
		clientName?: string;
		/** 客户端IP地址 */
		clientIpAddress?: string;
		/** 关联ID（用于关联不同应用的日志） */
		correlationId?: string;
		/** 浏览器信息 */
		browserInfo?: string;
		/** HTTP方法（GET, POST, PUT, DELETE等） */
		httpMethod?: string;
		/** HTTP状态码 */
		httpStatusCode?: number;
		/** 请求URL */
		url?: string;
		/** 执行时间 */
		executionTime?: string;
		/** 执行持续时间（毫秒） */
		executionDuration?: number;
		/** 是否有异常 */
		hasException?: boolean;
		/** 异常信息（JSON格式） */
		exceptions?: string;
		/** 备注信息（JSON格式或纯文本） */
		comments?: string;
	};

	type BurnAbpSystemSharedHostAuditLoggingsDtosEntityChangeDto = {
		/** 实体变更ID */
		id?: string;
		/** 审计日志ID */
		auditLogId?: string;
		/** 变更时间 */
		changeTime?: string;
		changeType?: VoloAbpAuditingEntityChangeType;
		/** 变更类型描述 */
		changeTypeText?: string;
		/** 实体ID */
		entityId?: string;
		/** 实体类型全名 */
		entityTypeFullName?: string;
		/** 实体租户ID */
		entityTenantId?: string;
		/** 属性变更列表 */
		propertyChanges?: BurnAbpSystemSharedHostAuditLoggingsDtosEntityPropertyChangeDto[];
	};

	type BurnAbpSystemSharedHostAuditLoggingsDtosEntityPropertyChangeDto = {
		/** 属性变更ID */
		id?: string;
		/** 实体变更ID */
		entityChangeId?: string;
		/** 属性名称 */
		propertyName?: string;
		/** 属性类型全名 */
		propertyTypeFullName?: string;
		/** 新值 */
		newValue?: string;
		/** 原值 */
		originalValue?: string;
	};

	type BurnAbpSystemSharedHostControllersApplicationMenuModel = {
		items?: VoloAbpUINavigationApplicationMenuItem[];
	};

	type BurnAbpSystemSharedHostControllersBrandDto = {
		appName?: string;
		logoUrl?: string;
		logoReverseUrl?: string;
	};

	type BurnAbpSystemSharedHostControllersLanguageSwitchViewComponentModel = {
		currentLanguage?: VoloAbpLocalizationLanguageInfo;
		otherLanguages?: VoloAbpLocalizationLanguageInfo[];
	};

	type BurnAbpTextTemplateManagementTextTemplatesRestoreTemplateContentInput = {
		templateName: string;
		cultureName?: string;
	};

	type BurnAbpTextTemplateManagementTextTemplatesTemplateDefinitionDto = {
		name?: string;
		displayName?: string;
		isLayout?: boolean;
		layout?: string;
		isInlineLocalized?: boolean;
		defaultCultureName?: string;
	};

	type BurnAbpTextTemplateManagementTextTemplatesTextTemplateContentDto = {
		name?: string;
		cultureName?: string;
		content?: string;
	};

	type BurnAbpTextTemplateManagementTextTemplatesUpdateTemplateContentInput = {
		templateName: string;
		cultureName?: string;
		content?: string;
	};

	type BurnDataSourcesApiArrayParameterFormat = 1 | 2 | 3;

	type BurnDataSourcesApiAuthType = 0 | 1 | 2 | 3;

	type BurnDataSourcesApiKeyLocation = 0 | 1;

	type BurnDataSourcesDatabaseType = 0 | 1 | 2 | 3 | 4;

	type BurnDataSourcesDataSourceTestResult = {
		success?: boolean;
		responseTimeMs?: number;
		message?: string;
		diagnostics?: Record<string, any>;
		sampleData?: any;
	};

	type BurnDataSourcesDataSourceType = 1 | 2 | 3;

	type BurnDataSourcesDataSourceValidationResult = {
		isValid?: boolean;
		errors?: string[];
		warnings?: string[];
	};

	type BurnDataSourcesRuntimeDataSourceStatus = 'ProvidedByCaller' | 'StaticArray' | 'Success' | 'NoProviderFound' | 'Skipped' | 'Error';

	type BurnLabelEngineModelsAtlApiAuthConfig = {
		authType?: BurnDataSourcesApiAuthType;
		bearerToken?: string;
		apiKeyName?: string;
		apiKeyValue?: string;
		apiKeyLocation?: BurnDataSourcesApiKeyLocation;
		username?: string;
		password?: string;
	};

	type BurnLabelEngineModelsAtlCacheConfig = {
		enabled?: boolean;
		ttlSeconds?: number;
		cacheKey?: string;
	};

	type BurnLabelEngineModelsAtlDataSource = {
		name?: string;
		type?: BurnDataSourcesDataSourceType;
		data?: Record<string, any>[];
		url?: string;
		method?: string;
		headers?: Record<string, any>;
		body?: string;
		contentType?: string;
		auth?: BurnLabelEngineModelsAtlApiAuthConfig;
		timeoutSeconds?: number;
		databaseType?: BurnDataSourcesDatabaseType;
		connectionString?: string;
		query?: string;
		parameters?: BurnLabelEngineModelsAtlDataSourceParameter[];
		cache?: BurnLabelEngineModelsAtlCacheConfig;
		dependsOn?: string[];
		parameterMappings?: Record<string, any>;
		queryParameters?: Record<string, any>;
		condition?: string;
	};

	type BurnLabelEngineModelsAtlDataSourceParameter = {
		name?: string;
		type?: string;
		defaultValue?: any;
		required?: boolean;
	};

	type BurnLabelEngineModelsAtlElement = {
		id?: string;
		type?: BurnLabelEngineModelsEnumsElementType;
		position?: BurnLabelEngineModelsPosition;
		size?: BurnLabelEngineModelsSize;
		properties?: BurnLabelEngineModelsElementProperties;
		dataBinding?: string;
		section?: BurnLabelEngineModelsEnumsSectionType;
		sectionId?: string;
		zIndex?: number;
		visible?: BurnLabelEngineModelsPropertyBinding;
		loop?: BurnLabelEngineModelsLoopConfig;
	};

	type BurnLabelEngineModelsAtlTemplate = {
		version?: string;
		metadata?: BurnLabelEngineModelsTemplateMetadata;
		canvas?: BurnLabelEngineModelsCanvasConfig;
		sections?: BurnLabelEngineModelsTemplateSections;
		layoutType?: BurnLabelEngineModelsEnumsLayoutType;
		dataSources?: Record<string, any>;
		elements?: BurnLabelEngineModelsAtlElement[];
		variables?: Record<string, any>;
		computedVariables?: Record<string, any>;
		parameters?: Record<string, any>;
	};

	type BurnLabelEngineModelsAutoLayoutConfig = {
		direction?: BurnLabelEngineModelsEnumsGridDirection;
		fixedColumns?: number;
		fixedRows?: number;
		maxCells?: number;
	};

	type BurnLabelEngineModelsBindingMode = 0 | 1 | 2;

	type BurnLabelEngineModelsCanvasConfig = {
		width?: number;
		height?: number;
		paperWidth?: number;
		paperHeight?: number;
		dpi?: number;
		unit?: string;
		backgroundColor?: string;
	};

	type BurnLabelEngineModelsElementProperties = true;

	type BurnLabelEngineModelsEnumsContentAreaPaginationMode = 0 | 1;

	type BurnLabelEngineModelsEnumsElementType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	type BurnLabelEngineModelsEnumsGridDirection = 0 | 1;

	type BurnLabelEngineModelsEnumsGridLayoutMode = 0 | 1;

	type BurnLabelEngineModelsEnumsLayoutType = 1 | 2;

	type BurnLabelEngineModelsEnumsPrintTemplateType = 5 | 10 | 15 | 20 | 25;

	type BurnLabelEngineModelsEnumsSectionPrintFrequency = 0 | 1 | 2 | 3;

	type BurnLabelEngineModelsEnumsSectionType = 0 | 1 | 2;

	type BurnLabelEngineModelsEnumsYPositionMode = 0 | 1;

	type BurnLabelEngineModelsLabelGridLayout = {
		mode?: BurnLabelEngineModelsEnumsGridLayoutMode;
		rows?: BurnLabelEngineModelsPropertyBinding;
		columns?: BurnLabelEngineModelsPropertyBinding;
		autoLayout?: BurnLabelEngineModelsAutoLayoutConfig;
		labelWidth?: number;
		labelHeight?: number;
		spacingX?: number;
		spacingY?: number;
		offsetX?: number;
		offsetY?: number;
		dataSourceName?: string;
		cellTemplate?: BurnLabelEngineModelsAtlElement[];
		cellVariable?: string;
		indexVariable?: string;
		rowVariable?: string;
		columnVariable?: string;
	};

	type BurnLabelEngineModelsLoopConfig = {
		dataSource?: string;
		itemVariable?: string;
		indexVariable?: string;
		maxIterations?: number;
	};

	type BurnLabelEngineModelsPosition = {
		x?: number;
		y?: number;
		rotation?: number;
	};

	type BurnLabelEngineModelsPropertyBinding = {
		mode?: BurnLabelEngineModelsBindingMode;
		staticValue?: any;
		dataPath?: string;
		expression?: string;
		format?: string;
		fallbackValue?: any;
		description?: string;
	};

	type BurnLabelEngineModelsSectionConfig = {
		id?: string;
		dataSourceKey?: string;
		height?: number;
		printFrequency?: BurnLabelEngineModelsEnumsSectionPrintFrequency;
		followLoopPagination?: boolean;
		elementIds?: string[];
		labelGridLayout?: BurnLabelEngineModelsLabelGridLayout;
		name?: string;
		yPositionMode?: BurnLabelEngineModelsEnumsYPositionMode;
		fixedY?: number;
		spacingAfterPrevious?: number;
	};

	type BurnLabelEngineModelsSize = {
		width?: number;
		height?: number;
	};

	type BurnLabelEngineModelsTemplateMetadata = {
		id?: string;
		name?: string;
		description?: string;
		created?: string;
		modified?: string;
		author?: string;
		templateVersion?: string;
		tags?: string[];
	};

	type BurnLabelEngineModelsTemplateParameter = {
		name?: string;
		type?: string;
		defaultValue?: any;
		required?: boolean;
		description?: string;
		constraints?: Record<string, any>;
	};

	type BurnLabelEngineModelsTemplateSections = {
		header?: BurnLabelEngineModelsSectionConfig;
		contentAreas?: BurnLabelEngineModelsSectionConfig[];
		content?: BurnLabelEngineModelsSectionConfig;
		footer?: BurnLabelEngineModelsSectionConfig;
		paginationMode?: BurnLabelEngineModelsEnumsContentAreaPaginationMode;
	};

	type BurnLabelEngineRenderingTemplateValidationResult = {
		isValid?: boolean;
		errors?: string[];
		warnings?: string[];
		diagnostics?: Record<string, any>;
		validatedAt?: string;
	};

	type CalendarDateDefinitionGetManualAdjustmentHistoryAsyncParams = {
		calendarDefinitionId: string;
		startDate?: string;
		endDate?: string;
	};

	type CalendarDateDefinitionResetToAutoCalculationAsyncParams = {
		id: string;
	};

	type CalendarDateDefinitionSetManualWorkdayAsyncParams = {
		id: string;
	};

	type CalendarDefinitionDeleteAsyncParams = {
		id: string;
	};

	type CalendarDefinitionGetAsyncParams = {
		id: string;
	};

	type CalendarDefinitionGetDatesAsyncParams = {
		id: string;
		Year?: number;
		Month?: number;
		StartDate?: string;
		EndDate?: string;
	};

	type CalendarDefinitionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CalendarDefinitionSetAsDefaultAsyncParams = {
		id: string;
	};

	type CalendarDefinitionSetHolidaySetAsyncParams = {
		id: string;
		holidaySetId: string;
	};

	type CalendarDefinitionSetWorkdayConfigureAsyncParams = {
		id: string;
	};

	type CalendarDefinitionUpdateAsyncParams = {
		id: string;
	};

	type CompanyInfoDeleteAsyncParams = {
		id: number;
	};

	type CompanyInfoGetAsyncParams = {
		id: number;
	};

	type CompanyInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CompanyInfoUpdateAsyncParams = {
		id: number;
	};

	type DevExpressReportPrintParams = {
		reportUrl?: string;
	};

	type DevExpressReportPrintParams = {
		reportUrl?: string;
	};

	type DynamicApplicationAddEntityAsyncParams = {
		applicationId: string;
	};

	type DynamicApplicationAddFieldAsyncParams = {
		applicationId?: string;
		entityId?: string;
	};

	type DynamicApplicationAddRelationAsyncParams = {
		applicationId: string;
	};

	type DynamicApplicationDeleteAsyncParams = {
		id: string;
	};

	type DynamicApplicationDeleteEntityAsyncParams = {
		applicationId?: string;
		entityId?: string;
	};

	type DynamicApplicationDeleteFieldAsyncParams = {
		applicationId?: string;
		entityId?: string;
		fieldId?: string;
	};

	type DynamicApplicationGetAsyncParams = {
		id: string;
	};

	type DynamicApplicationGetEntityAsyncParams = {
		applicationId?: string;
		entityId?: string;
	};

	type DynamicApplicationGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DynamicApplicationUpdateAsyncParams = {
		id: string;
	};

	type DynamicApplicationUpdateEntityAsyncParams = {
		applicationId?: string;
		entityId?: string;
	};

	type DynamicApplicationUpdateFieldAsyncParams = {
		applicationId?: string;
		entityId?: string;
		fieldId?: string;
	};

	type DynamicDataBatchDeleteAsyncParams = {
		applicationName?: string;
	};

	type DynamicDataCreateAsyncParams = {
		applicationName?: string;
	};

	type DynamicDataDeleteAsyncParams = {
		applicationName?: string;
		id: string;
	};

	type DynamicDataGetAsyncParams = {
		applicationName?: string;
		id: string;
		Include?: string;
	};

	type DynamicDataGetListAsyncParams = {
		applicationName?: string;
		Include?: string;
		Filters?: Record<string, any>;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DynamicDataImportExportExportAsyncParams = {
		ApplicationId: string;
		EntityDefinitionId: string;
		Ids?: string[];
		'Query.Include'?: string;
		'Query.Filters'?: Record<string, any>;
		'Query.Sorting'?: string;
		'Query.SkipCount'?: number;
		'Query.MaxResultCount'?: number;
		IncludeChildren?: boolean;
	};

	type DynamicDataImportExportGetTemplateAsyncParams = {
		/** 实体定义 ID */
		entityDefinitionId: string;
	};

	type DynamicDataImportExportGetTemplateAsyncParams = {
		entityDefinitionId: string;
	};

	type DynamicDataImportExportImportAsyncParams = {
		/** 应用 ID */
		applicationId?: string;
		/** 实体定义 ID */
		entityDefinitionId?: string;
	};

	type DynamicDataUpdateAsyncParams = {
		applicationName?: string;
		id: string;
	};

	type DynamicDataWorkflowCancelAsyncParams = {
		applicationId?: string;
		dataRowId?: string;
	};

	type DynamicDataWorkflowExecuteAsyncParams = {
		applicationId?: string;
		dataRowId?: string;
	};

	type DynamicDataWorkflowGetApplicationInfoByTargetRowIdAsyncParams = {
		targetRowId: string;
	};

	type DynamicDataWorkflowGetBookmarksByEntityIdAsyncParams = {
		applicationId?: string;
		dataRowId?: string;
	};

	type DynamicDataWorkflowGetBookmarksByEntityIdsAsyncParams = {
		applicationId: string;
		dataRowIds?: string[];
	};

	type DynamicDataWorkflowGetPendingTasksAsyncParams = {
		applicationId?: string;
		assigneeId?: string;
	};

	type DynamicDataWorkflowGetWorkflowHistoryAsyncParams = {
		applicationId?: string;
		dataRowId?: string;
	};

	type DynamicDataWorkflowGetWorkflowProxyAsyncParams = {
		applicationId?: string;
		dataRowId?: string;
	};

	type DynamicDataWorkflowSubmitAsyncParams = {
		applicationId?: string;
		dataRowId?: string;
	};

	type DynamicPropertyDefinitionDeleteAsyncParams = {
		id: string;
	};

	type DynamicPropertyDefinitionGetAsyncParams = {
		id: string;
	};

	type DynamicPropertyDefinitionGetListByFeatureAsyncParams = {
		feature?: string;
	};

	type DynamicPropertyDefinitionUpdateAsyncParams = {
		id: string;
	};

	type DynamicSchemaWorkflowEntityGetAsyncParams = {
		workflowName?: string;
		id: string;
	};

	type DynamicSchemaWorkflowEntityGetListAsyncParams = {
		WorkflowName: string;
		AssigneeId?: string;
		/** 

0 = Wait

1 = Completed

2 = TimeOutComplete

3 = CancelComplete

4 = Rejected

5 = Terminated */
		Status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
		Filter?: string;
		SkipCount?: number;
		MaxResultCount?: number;
		Sorting?: string;
	};

	type EmployeeScheduleGetAsyncParams = {
		id: string;
	};

	type EmployeeScheduleGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FactoryInfoDeleteAsyncParams = {
		id: number;
	};

	type FactoryInfoGetAsyncParams = {
		id: number;
	};

	type FactoryInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FactoryInfoUpdateAsyncParams = {
		id: number;
	};

	type FeatureDataSourceConfigDeleteAsyncParams = {
		id: string;
	};

	type FeatureDataSourceConfigGetAsyncParams = {
		id: string;
	};

	type FeatureDataSourceConfigGetByPrintFeatureCodeAsyncParams = {
		printFeatureCode?: string;
	};

	type FeatureDataSourceConfigGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FeatureDataSourceConfigUpdateAsyncParams = {
		id: string;
	};

	type FeaturesDeleteAsyncParams = {
		providerName?: string;
		providerKey?: string;
	};

	type FeaturesGetAsyncParams = {
		providerName?: string;
		providerKey?: string;
	};

	type FeaturesUpdateAsyncParams = {
		providerName?: string;
		providerKey?: string;
	};

	type FieldPromotionDemoteAsyncParams = {
		applicationCode?: string;
		fieldName?: string;
	};

	type FormilySchemaGetEntitySchemaAsyncParams = {
		applicationName?: string;
		entityName?: string;
		scenarioKey?: string;
	};

	type FormilySchemaGetSchemaAsyncParams = {
		applicationName?: string;
		scenarioKey?: string;
	};

	type FormSchemaCreateNewVersionAsyncParams = {
		sourceSchemaId: string;
		schemaJson?: string;
	};

	type FormSchemaDeleteAsyncParams = {
		id: string;
	};

	type FormSchemaGetAsyncParams = {
		id: string;
	};

	type FormSchemaGetByScenarioKeyAsyncParams = {
		scenarioKey?: string;
	};

	type FormSchemaGetCurrentSchemaForHostEntityAsyncParams = {
		hostEntityId: string;
		scenarioKey?: string;
	};

	type FormSchemaGetListAsyncParams = {
		/** 

0 = DynamicEntity

1 = HostEntity

2 = Standalone */
		SourceType?: BurnAbpDynamicSchemaEnumsFormSchemaSourceType;
		EntityDefinitionId?: string;
		HostEntityId?: string;
		ScenarioKey?: string;
		IsPublished?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FormSchemaGetPublishedAsyncParams = {
		/** 

0 = DynamicEntity

1 = HostEntity

2 = Standalone */
		sourceType?: BurnAbpDynamicSchemaEnumsFormSchemaSourceType;
		sourceId: string;
		scenarioKey?: string;
	};

	type FormSchemaGetVersionHistoryAsyncParams = {
		/** 

0 = DynamicEntity

1 = HostEntity

2 = Standalone */
		sourceType?: BurnAbpDynamicSchemaEnumsFormSchemaSourceType;
		sourceId: string;
		scenarioKey?: string;
	};

	type FormSchemaPublishAsyncParams = {
		id: string;
	};

	type FormSchemaUnpublishAsyncParams = {
		id: string;
	};

	type FormSchemaUpdateAsyncParams = {
		id: string;
	};

	type HolidaySetDeleteAsyncParams = {
		id: string;
	};

	type HolidaySetGetAsyncParams = {
		id: string;
	};

	type HolidaySetUpdateAsyncParams = {
		id: string;
	};

	type HostEntityAddExtensionFieldAsyncParams = {
		hostEntityId: string;
	};

	type HostEntityDisableAsyncParams = {
		id: string;
	};

	type HostEntityEnableAsyncParams = {
		id: string;
	};

	type HostEntityGetAllSchemasAsyncParams = {
		scenario?: string;
	};

	type HostEntityGetAsyncParams = {
		id: string;
	};

	type HostEntityGetByEntityTypeAsyncParams = {
		entityType?: string;
	};

	type HostEntityGetExtensionFieldAsyncParams = {
		hostEntityId?: string;
		fieldId?: string;
	};

	type HostEntityGetExtensionFieldsAsyncParams = {
		hostEntityId: string;
		Name?: string;
		DisplayName?: string;
		/** 

0 = String

1 = Int

2 = Long

3 = Decimal

4 = Boolean

5 = DateTime

6 = Date

7 = Time

8 = Guid

9 = Json

10 = Array

11 = Enum

12 = RichText

13 = File

14 = Image

15 = Reference */
		DataType?: BurnAbpDynamicSchemaEnumsFieldDataType;
		/** 

0 = Pending

1 = Active

2 = Failed

3 = Disabled

4 = Retrying */
		Status?: BurnAbpDynamicSchemaEnumsFieldStatus;
		ActiveOnly?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type HostEntityGetExtensionValuesAsyncParams = {
		entityType?: string;
		entityId: string;
	};

	type HostEntityGetListAsyncParams = {
		EntityType?: string;
		DisplayName?: string;
		ModuleName?: string;
		IsEnabled?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type HostEntityGetSchemaAsyncParams = {
		entityType?: string;
		scenario?: string;
	};

	type HostEntityRemoveExtensionFieldAsyncParams = {
		hostEntityId?: string;
		fieldId?: string;
	};

	type HostEntityRetryDdlAsyncParams = {
		hostEntityId?: string;
		fieldId?: string;
	};

	type HostEntitySaveSchemaAsyncParams = {
		entityType?: string;
		scenario?: string;
	};

	type HostEntitySetExtensionValuesAsyncParams = {
		entityType?: string;
		entityId: string;
	};

	type HostEntityUnregisterAsyncParams = {
		id: string;
	};

	type HostEntityUpdateExtensionFieldAsyncParams = {
		hostEntityId?: string;
		fieldId?: string;
	};

	type IdentityRoleProGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type IdentityUserIntegrationGetUsersInPermissionAsyncParams = {
		PermissionName: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type IdentityUserProCheckUserAndPermissionAsyncParams = {
		UserName?: string;
		Password?: string;
		PermissionName?: string;
	};

	type IdentityUserProGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type IdentityUserProGetUsersInPermissionAsyncParams = {
		PermissionName: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelCategoryDeleteAsyncParams = {
		id: string;
	};

	type LabelCategoryGetAsyncParams = {
		id: string;
	};

	type LabelCategoryGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelCategoryUpdateAsyncParams = {
		id: string;
	};

	type LabelDataGetLabelPrintDataAsyncParams = {
		PrintFeatureCode?: string;
		LabelTemplateId?: string;
		Identifier?: string;
		IsTest?: boolean;
		ExtraProperties?: Record<string, any>;
	};

	type LabelDataSourceGetDataAsyncParams = {
		'Config.Key': string;
		/** 

1 = Array

2 = Api

3 = Sql */
		'Config.Type'?: BurnDataSourcesDataSourceType;
		'Config.ConfigJson': string;
		'Config.Parameters'?: BurnAbpLabelManagementDataSourcesDataSourceParameterDto[];
		'Config.Cache.Enabled'?: boolean;
		'Config.Cache.ExpirationSeconds'?: number;
		'Config.Cache.UseDistributedCache'?: boolean;
		Parameters?: Record<string, any>;
		ForceRefresh?: boolean;
	};

	type LabelPrintDefinitionDeleteAsyncParams = {
		id: string;
	};

	type LabelPrintDefinitionGetAsyncParams = {
		id: string;
	};

	type LabelPrintDefinitionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelPrintDefinitionGetPrintTemplateListAsyncParams = {
		Features?: string[];
		MaterialClassCode?: string;
		MaterialItemCode?: string;
		CustomerCode?: string;
		ExtensionProperties?: Record<string, any>;
	};

	type LabelPrintDefinitionUpdateAsyncParams = {
		id: string;
	};

	type LabelPrintFeatureDefinitionGetPropertySchemaAsyncParams = {
		feature?: string;
	};

	type LabelPrintSettingDeleteAsyncParams = {
		id: string;
	};

	type LabelPrintSettingGetAsyncParams = {
		id: string;
	};

	type LabelPrintSettingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelPrintSettingUpdateAsyncParams = {
		id: string;
	};

	type LabelPrintTemplateCloneAsyncParams = {
		id: string;
		newCode?: string;
		newName?: string;
	};

	type LabelPrintTemplateDeleteAsyncParams = {
		id: string;
	};

	type LabelPrintTemplateExportAtlAsyncParams = {
		id: string;
	};

	type LabelPrintTemplateGetAsyncParams = {
		id: string;
	};

	type LabelPrintTemplateGetAtlAsyncParams = {
		id: string;
	};

	type LabelPrintTemplateGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelPrintTemplateUpdateAsyncParams = {
		id: string;
	};

	type LabelPrintTemplateUpdateAtlAsyncParams = {
		id: string;
	};

	type LabelTypeAdvancedSettingDeleteAsyncParams = {
		id: string;
	};

	type LabelTypeAdvancedSettingGetAsyncParams = {
		id: string;
	};

	type LabelTypeAdvancedSettingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelTypeAdvancedSettingUpdateAsyncParams = {
		id: string;
	};

	type LabelTypeDeleteAsyncParams = {
		id: string;
	};

	type LabelTypeGetAsyncParams = {
		id: string;
	};

	type LabelTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LabelTypeUpdateAsyncParams = {
		id: string;
	};

	type LanguageDeleteAsyncParams = {
		id: string;
	};

	type LanguageGetAsyncParams = {
		id: string;
	};

	type LanguageSetAsDefaultAsyncParams = {
		id: string;
	};

	type LanguageTextGetAsyncParams = {
		resourceName?: string;
		cultureName?: string;
		name?: string;
		baseCultureName?: string;
	};

	type LanguageTextGetListAsyncParams = {
		BaseCultureName?: string;
		TargetCultureName?: string;
		ResourceName?: string;
		Name?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LanguageTextRestoreToDefaultAsyncParams = {
		resourceName?: string;
		cultureName?: string;
		name?: string;
	};

	type LanguageTextUpdateAsyncParams = {
		resourceName?: string;
		cultureName?: string;
		name?: string;
		value?: string;
	};

	type LanguageUpdateAsyncParams = {
		id: string;
	};

	type ListConfigDeleteAsyncParams = {
		key?: string;
	};

	type ListConfigGenerateAsyncParams = {
		key?: string;
	};

	type ListConfigGetByKeyAsyncParams = {
		key?: string;
	};

	type ListConfigSaveAsyncParams = {
		key?: string;
	};

	type MenuFavoritesCancelAsyncParams = {
		name?: string;
	};

	type MenuItemDeleteAsyncParams = {
		Name: string;
	};

	type MenuItemExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MenuItemGetAsyncParams = {
		Name: string;
	};

	type MenuItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MenuItemUpdateAsyncParams = {
		Name: string;
	};

	type OpenIddictProApplicationDeleteAsyncParams = {
		clientId: string;
	};

	type OpenIddictProApplicationGetAsyncParams = {
		clientId: string;
	};

	type OpenIddictProApplicationGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OpenIddictProScopeDeleteAsyncParams = {
		id: string;
	};

	type OpenIddictProScopeGetAsyncParams = {
		id: string;
	};

	type OpenIddictProScopeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OpenIddictProScopeUpdateAsyncParams = {
		id: string;
	};

	type OpenIddictWeChatBindWeChatUserAsyncParams = {
		wechatCode?: string;
	};

	type OpenIddictWeChatGetWeChatOpenIdAsyncParams = {
		code?: string;
	};

	type OpenIddictWeChatGetWeChatPhoneNumberAsyncParams = {
		phoneCode?: string;
	};

	type OrganizationInfoDeleteAsyncParams = {
		id: number;
	};

	type OrganizationInfoGetAsyncParams = {
		id?: number;
	};

	type OrganizationInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OrganizationInfoGetOrganizationsByUserNameAsyncParams = {
		userName: string;
	};

	type OrganizationInfoUpdateAsyncParams = {
		id: number;
	};

	type OrganizationUnitAddUserToOrganizationUnitAsyncParams = {
		userId?: string;
		organizationId?: string;
	};

	type OrganizationUnitDeleteAsyncParams = {
		id: string;
	};

	type OrganizationUnitGetAsyncParams = {
		id: string;
	};

	type OrganizationUnitGetChildrenListByIdAsyncParams = {
		Id?: string;
		Code?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OrganizationUnitGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OrganizationUnitGetTreeListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OrganizationUnitGetUserListByOrganizationIdParams = {
		organizationId: string;
		filter?: string;
		sorting?: string;
	};

	type OrganizationUnitRemoveUserFromOrganizationUnitParams = {
		userId?: string;
		organizationUnitId?: string;
	};

	type PermissionIntegrationIsGrantedAsyncParams = {
		input?: VoloAbpPermissionManagementIsGrantedRequest[];
	};

	type PermissionsGetAsyncParams = {
		providerName?: string;
		providerKey?: string;
	};

	type PermissionsUpdateAsyncParams = {
		providerName?: string;
		providerKey?: string;
	};

	type PrinterClientDeleteAsyncParams = {
		id: string;
	};

	type PrinterClientGetAsyncParams = {
		id: string;
	};

	type PrinterClientGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PrinterClientGetPrintersAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PrinterClientPrintAsyncParams = {
		printerId: string;
	};

	type PrinterClientUpdateAsyncParams = {
		id: string;
	};

	type PrinterClientUpdatePrinterAsyncParams = {
		id: string;
	};

	type PrintTaskGetAsyncParams = {
		id: string;
	};

	type PrintTaskGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PrintTaskReprintAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoDeleteAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoDeleteAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoExportTemplateAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoExportTemplateAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoGetAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoGetAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PrintTemplateInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PrintTemplateInfoGetPrintTemplateByCodeAsyncParams = {
		code?: string;
	};

	type PrintTemplateInfoGetPrintTemplateByCodeAsyncParams = {
		code?: string;
	};

	type PrintTemplateInfoImportTemplateAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoImportTemplateAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoUpdateAsyncParams = {
		id: string;
	};

	type PrintTemplateInfoUpdateAsyncParams = {
		id: string;
	};

	type RoleDeleteAsyncParams = {
		id: string;
	};

	type RoleGetAsyncParams = {
		id: string;
	};

	type RoleGetListAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RoleUpdateAsyncParams = {
		id: string;
	};

	type RuntimeLabelPrintGetPrinterCodeAsyncParams = {
		TemplateCode: string;
		/** 

5 = Report

10 = ZPL

15 = EPL

20 = CPCL

25 = TSPL */
		TargetLanguage?: BurnLabelEngineModelsEnumsPrintTemplateType;
		Parameters?: Record<string, any>;
		EnableValidation?: boolean;
		IncludeResolvedData?: boolean;
	};

	type ShiftDeleteAsyncParams = {
		id: string;
	};

	type ShiftGetAsyncParams = {
		id: string;
	};

	type ShiftGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ShiftSetDefaultAsyncParams = {
		id: string;
		isDefault?: boolean;
	};

	type ShiftUpdateAsyncParams = {
		id: string;
	};

	type StaticFileBlobGetStaticFileAsyncParams = {
		blobName: string;
	};

	type StaticFileBlobGetStaticFileBaseAsyncParams = {
		blobName: string;
	};

	type SystemDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type TableSchemeDeleteColumnSchemeAsyncParams = {
		schemeId?: string;
		gridId?: string;
	};

	type TableSchemeDeleteQuerySchemeAsyncParams = {
		schemeId?: string;
		gridId?: string;
	};

	type TableSchemeGetAllSchemesAsyncParams = {
		lastSyncTime?: number;
		gridIds?: string[];
	};

	type TempBlobIntegrationExistsAsyncParams = {
		name?: string;
	};

	type TempBlobIntegrationGetAllBytesAsyncParams = {
		name?: string;
	};

	type TempBlobIntegrationSaveAsyncParams = {
		name?: string;
	};

	type TempBlobIntegrationSaveByNameAsyncParams = {
		name?: string;
		fileName?: string;
	};

	type TemplateConverterGetConverterNameAsyncParams = {
		/** 

5 = Report

10 = ZPL

15 = EPL

20 = CPCL

25 = TSPL */
		language?: BurnLabelEngineModelsEnumsPrintTemplateType;
	};

	type TemplateConverterTestDataSourceAsyncParams = {
		name?: string;
	};

	type TenantDeleteAsyncParams = {
		id: string;
	};

	type TenantDeleteDefaultConnectionStringAsyncParams = {
		id: string;
	};

	type TenantGetAsyncParams = {
		id: string;
	};

	type TenantGetDefaultConnectionStringAsyncParams = {
		id: string;
	};

	type TenantGetListAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TenantUpdateAsyncParams = {
		id: string;
	};

	type TenantUpdateDefaultConnectionStringAsyncParams = {
		id: string;
		defaultConnectionString?: string;
	};

	type TextTemplateContentsGetAsyncParams = {
		TemplateName: string;
		CultureName?: string;
	};

	type TextTemplateDefinitionsGetAsyncParams = {
		name?: string;
	};

	type TextTemplateDefinitionsGetListAsyncParams = {
		FilterText?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TimeZoneSettingsUpdateAsyncParams = {
		timezone?: string;
	};

	type UpdateCancelChunkUploadAsyncParams = {
		fileId: string;
	};

	type UpdateCheckUpdateAsyncParams = {
		appName?: string;
		currentVersion?: string;
		/** 

1 = Android

2 = Windows

99 = CrossPlatform */
		platform?: AutoUpdateServerEnumsPlatformType;
	};

	type UpdateCheckUpdateDetailAsyncParams = {
		appName?: string;
		currentVersion?: string;
		/** 

1 = Android

2 = Windows

99 = CrossPlatform */
		platform?: AutoUpdateServerEnumsPlatformType;
	};

	type UpdateGetAsyncParams = {
		appName: string;
		/** 

1 = Android

2 = Windows

99 = CrossPlatform */
		platform?: AutoUpdateServerEnumsPlatformType;
	};

	type UpdateGetChunkUploadProgressAsyncParams = {
		fileId: string;
	};

	type UpdateGetFileAsyncParams = {
		appName: string;
		fileName: string;
	};

	type UpdateGetLatestAsyncParams = {
		appName: string;
		/** 

1 = Android

2 = Windows

99 = CrossPlatform */
		platform?: AutoUpdateServerEnumsPlatformType;
	};

	type UpdateGetManifestAsyncParams = {
		appName: string;
	};

	type UpdateScanManifestAsyncParams = {
		appName: string;
		/** 

1 = Android

2 = Windows

99 = CrossPlatform */
		platform?: AutoUpdateServerEnumsPlatformType;
	};

	type UpdateUploadFileAsyncParams = {
		AppName: string;
		/** 

1 = Android

2 = Windows

99 = CrossPlatform */
		Platform?: AutoUpdateServerEnumsPlatformType;
		/** 

1 = Optional

2 = Recommended

3 = Force */
		Strategy?: AutoUpdateServerEnumsUpdateStrategy;
		Force?: boolean;
		Version?: string;
		Changelog?: string;
	};

	type UserCreateCustomerUserAsyncParams = {
		CustomerCode?: string;
		Password: string;
		UserName: string;
		Name?: string;
		Surname?: string;
		Email: string;
		PhoneNumber?: string;
		IsActive?: boolean;
		LockoutEnabled?: boolean;
		RoleNames?: string[];
		ExtraProperties?: Record<string, any>;
	};

	type UserCreateSupplierUserAsyncParams = {
		SupplierCode?: string;
		Password: string;
		UserName: string;
		Name?: string;
		Surname?: string;
		Email: string;
		PhoneNumber?: string;
		IsActive?: boolean;
		LockoutEnabled?: boolean;
		RoleNames?: string[];
		ExtraProperties?: Record<string, any>;
	};

	type UserDeleteAsyncParams = {
		id: string;
	};

	type UserFindByEmailAsyncParams = {
		email: string;
	};

	type UserFindByUsernameAsyncParams = {
		userName: string;
	};

	type UserGetAsyncParams = {
		id: string;
	};

	type UserGetCustomerUserListAsyncParams = {
		CustomerCode?: string;
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserGetListAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserGetListWithRoleAsyncParams = {
		RoleId?: string;
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserGetRolesAsyncParams = {
		id: string;
	};

	type UserGetSupplierUserListAsyncParams = {
		SupplierCode?: string;
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserIntegrationFindByIdAsyncParams = {
		id: string;
	};

	type UserIntegrationFindByUserNameAsyncParams = {
		userName: string;
	};

	type UserIntegrationGetCountAsyncParams = {
		Filter?: string;
	};

	type UserIntegrationGetRoleNamesAsyncParams = {
		id: string;
	};

	type UserIntegrationSearchAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserLookupFindByIdAsyncParams = {
		id: string;
	};

	type UserLookupFindByUserNameAsyncParams = {
		userName: string;
	};

	type UserLookupGetCountAsyncParams = {
		Filter?: string;
	};

	type UserLookupSearchAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserNotificationGetMyNotificationsAsyncParams = {
		OnlyUnread?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserNotificationMarkAsReadAsyncParams = {
		id: string;
	};

	type UserPrintFeaturePrinterGetAsyncParams = {
		id: string;
	};

	type UserPrintFeaturePrinterGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserTableLayoutInfoDeleteAsyncParams = {
		id: string;
	};

	type UserTableLayoutInfoGetAsyncParams = {
		id: string;
	};

	type UserTableLayoutInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserTableLayoutInfoUpdateAsyncParams = {
		id: string;
	};

	type UserUpdateAsyncParams = {
		id: string;
	};

	type UserUpdateRolesAsyncParams = {
		id: string;
	};

	type VoloAbpAccountChangePasswordInput = {
		currentPassword?: string;
		newPassword: string;
	};

	type VoloAbpAccountConfirmEmailInput = {
		userId: string;
		token: string;
	};

	type VoloAbpAccountConfirmPhoneNumberInput = {
		userId: string;
		token: string;
	};

	type VoloAbpAccountProfileDto = {
		extraProperties?: Record<string, any>;
		userName?: string;
		email?: string;
		name?: string;
		surname?: string;
		phoneNumber?: string;
		isExternal?: boolean;
		hasPassword?: boolean;
		concurrencyStamp?: string;
	};

	type VoloAbpAccountRegisterDto = {
		extraProperties?: Record<string, any>;
		userName: string;
		emailAddress: string;
		password: string;
		appName: string;
	};

	type VoloAbpAccountResetPasswordDto = {
		userId?: string;
		resetToken: string;
		password: string;
	};

	type VoloAbpAccountSendEmailConfirmationTokenDto = {
		appName: string;
		userId: string;
		returnUrl?: string;
		returnUrlHash?: string;
	};

	type VoloAbpAccountSendPasswordResetCodeDto = {
		email: string;
		appName: string;
		returnUrl?: string;
		returnUrlHash?: string;
	};

	type VoloAbpAccountSendPhoneNumberConfirmationTokenDto = {
		userId: string;
		phoneNumber?: string;
	};

	type VoloAbpAccountUpdateProfileDto = {
		extraProperties?: Record<string, any>;
		userName?: string;
		email?: string;
		name?: string;
		surname?: string;
		phoneNumber?: string;
		concurrencyStamp?: string;
	};

	type VoloAbpAccountVerifyEmailConfirmationTokenInput = {
		userId: string;
		token: string;
	};

	type VoloAbpAccountVerifyPasswordResetTokenInput = {
		userId?: string;
		resetToken: string;
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto = {
		items?: BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpIdentityProOrganizationUnitDto = {
		items?: BurnAbpIdentityProOrganizationUnitDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpIdentityProOrganizationUnitTreeDto = {
		items?: BurnAbpIdentityProOrganizationUnitTreeDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto = {
		items?: BurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpLanguageManagementDtoLanguageDto = {
		items?: BurnAbpLanguageManagementDtoLanguageDto[];
	};

	type VoloAbpApplicationDtosListResultDtoVoloAbpIdentityIdentityRoleDto = {
		items?: VoloAbpIdentityIdentityRoleDto[];
	};

	type VoloAbpApplicationDtosListResultDtoVoloAbpPermissionManagementIsGrantedResponse = {
		items?: VoloAbpPermissionManagementIsGrantedResponse[];
	};

	type VoloAbpApplicationDtosListResultDtoVoloAbpUsersUserData = {
		items?: VoloAbpUsersUserData[];
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto = {
		items?: BurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationBNRSequenceTypeDto = {
		items?: BurnAbpBNRManagementApplicationBNRSequenceTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto = {
		items?: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto = {
		items?: BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsBNRSequenceItemDto = {
		items?: BurnAbpBNRManagementApplicationContractsBNRSequenceItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto = {
		items?: BurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto = {
		items?: BurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto = {
		items?: BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementSequenceDatasBNRSequenceDataDto = {
		items?: BurnAbpBNRManagementSequenceDatasBNRSequenceDataDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto = {
		items?: BurnAbpCalendarManagementCalendarDefinitionsCalendarDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleDto = {
		items?: BurnAbpCalendarManagementEmployeeSchedulesEmployeeScheduleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementShiftsShiftDto = {
		items?: BurnAbpCalendarManagementShiftsShiftDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto = {
		items?: BurnAbpCalendarManagementWorkdayConfiguresDtosWorkdayConfigureDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto = {
		items?: BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaDtosDynamicApplicationDefinitionListDto = {
		items?: BurnAbpDynamicSchemaDtosDynamicApplicationDefinitionListDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaDtosDynamicDataDto = {
		items?: BurnAbpDynamicSchemaDtosDynamicDataDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionListDto = {
		items?: BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionListDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionListDto = {
		items?: BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionListDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto = {
		items?: BurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto = {
		items?: BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpFactoryManagementCompanysCompanyInfoDto = {
		items?: BurnAbpFactoryManagementCompanysCompanyInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpFactoryManagementFactorysFactoryInfoDto = {
		items?: BurnAbpFactoryManagementFactorysFactoryInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpFactoryManagementOrganizationsOrganizationInfoDto = {
		items?: BurnAbpFactoryManagementOrganizationsOrganizationInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpIdentityProOrganizationUnitDto = {
		items?: BurnAbpIdentityProOrganizationUnitDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpIdentityProUsersIdentityRoleProDto = {
		items?: BurnAbpIdentityProUsersIdentityRoleProDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpIdentityProUsersIdentityUserProDto = {
		items?: BurnAbpIdentityProUsersIdentityUserProDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelCategoriesLabelCategoryDto = {
		items?: BurnAbpLabelManagementLabelCategoriesLabelCategoryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto = {
		items?: BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto = {
		items?: BurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto = {
		items?: BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto = {
		items?: BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto = {
		items?: BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelTypesLabelTypeDto = {
		items?: BurnAbpLabelManagementLabelTypesLabelTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpLanguageManagementDtoLanguageTextDto = {
		items?: BurnAbpLanguageManagementDtoLanguageTextDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpNotificationServiceNotificationsDtosUserNotificationDto = {
		items?: BurnAbpNotificationServiceNotificationsDtosUserNotificationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto = {
		items?: BurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintersPrinterDto = {
		items?: BurnAbpPrintTemplateManagementPrintersPrinterDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintTasksPrintTaskDto = {
		items?: BurnAbpPrintTemplateManagementPrintTasksPrintTaskDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto = {
		items?: BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto = {
		items?: BurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSystemSharedHostAuditLoggingsDtosAuditLogDto = {
		items?: BurnAbpSystemSharedHostAuditLoggingsDtosAuditLogDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSystemSharedHostAuditLoggingsDtosEntityChangeDto = {
		items?: BurnAbpSystemSharedHostAuditLoggingsDtosEntityChangeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpTextTemplateManagementTextTemplatesTemplateDefinitionDto = {
		items?: BurnAbpTextTemplateManagementTextTemplatesTemplateDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityRoleDto = {
		items?: VoloAbpIdentityIdentityRoleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto = {
		items?: VoloAbpIdentityIdentityUserDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoVoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto = {
		items?: VoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoVoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto = {
		items?: VoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoVoloAbpTenantManagementTenantDto = {
		items?: VoloAbpTenantManagementTenantDto[];
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

	type VoloAbpAspNetCoreMvcModelsPermissionDefinitionDto = {
		value?: string;
		title?: string;
		isEnabled?: boolean;
		children?: VoloAbpAspNetCoreMvcModelsPermissionDefinitionDto[];
	};

	type VoloAbpAspNetCoreMvcMultiTenancyCurrentTenantDto = {
		id?: string;
		name?: string;
		isAvailable?: boolean;
	};

	type VoloAbpAspNetCoreMvcMultiTenancyMultiTenancyInfoDto = {
		isEnabled?: boolean;
	};

	type VoloAbpAuditingEntityChangeType = 0 | 1 | 2;

	type VoloAbpElsaAbstractEntitiesWorkItemStatus = 0 | 1 | 2 | 3 | 4 | 5;

	type VoloAbpElsaAbstractEnumsExecuteType = 5 | 10 | 11 | 15 | 20 | 25 | 30;

	type VoloAbpElsaAbstractModelsExecuteWorkflowInput = {
		executeType?: VoloAbpElsaAbstractEnumsExecuteType;
		activityId?: string;
		assignUser?: string;
		backActivity?: string;
		nextActivity?: string;
		nextAssignUser?: string;
		message?: string;
		executor?: string;
		copyToUsers?: string[];
	};

	type VoloAbpElsaDomainEntitiesEnumWorkflowStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type VoloAbpFeatureManagementFeatureDto = {
		name?: string;
		displayName?: string;
		value?: string;
		provider?: VoloAbpFeatureManagementFeatureProviderDto;
		description?: string;
		valueType?: VoloAbpValidationStringValuesIStringValueType;
		depth?: number;
		parentName?: string;
	};

	type VoloAbpFeatureManagementFeatureGroupDto = {
		name?: string;
		displayName?: string;
		features?: VoloAbpFeatureManagementFeatureDto[];
	};

	type VoloAbpFeatureManagementFeatureProviderDto = {
		name?: string;
		key?: string;
	};

	type VoloAbpFeatureManagementGetFeatureListResultDto = {
		groups?: VoloAbpFeatureManagementFeatureGroupDto[];
	};

	type VoloAbpFeatureManagementUpdateFeatureDto = {
		name?: string;
		value?: string;
	};

	type VoloAbpFeatureManagementUpdateFeaturesDto = {
		features?: VoloAbpFeatureManagementUpdateFeatureDto[];
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

	type VoloAbpIdentityIdentityRoleCreateDto = {
		extraProperties?: Record<string, any>;
		name: string;
		isDefault?: boolean;
		isPublic?: boolean;
	};

	type VoloAbpIdentityIdentityRoleDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		name?: string;
		isDefault?: boolean;
		isStatic?: boolean;
		isPublic?: boolean;
		concurrencyStamp?: string;
	};

	type VoloAbpIdentityIdentityRoleUpdateDto = {
		extraProperties?: Record<string, any>;
		name: string;
		isDefault?: boolean;
		isPublic?: boolean;
		concurrencyStamp?: string;
	};

	type VoloAbpIdentityIdentityUserCreateDto = {
		extraProperties?: Record<string, any>;
		userName: string;
		name?: string;
		surname?: string;
		email: string;
		phoneNumber?: string;
		isActive?: boolean;
		lockoutEnabled?: boolean;
		roleNames?: string[];
		password: string;
	};

	type VoloAbpIdentityIdentityUserDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		tenantId?: string;
		userName?: string;
		name?: string;
		surname?: string;
		email?: string;
		emailConfirmed?: boolean;
		phoneNumber?: string;
		phoneNumberConfirmed?: boolean;
		isActive?: boolean;
		lockoutEnabled?: boolean;
		accessFailedCount?: number;
		lockoutEnd?: string;
		concurrencyStamp?: string;
		entityVersion?: number;
		lastPasswordChangeTime?: string;
	};

	type VoloAbpIdentityIdentityUserUpdateDto = {
		extraProperties?: Record<string, any>;
		userName: string;
		name?: string;
		surname?: string;
		email: string;
		phoneNumber?: string;
		isActive?: boolean;
		lockoutEnabled?: boolean;
		roleNames?: string[];
		password?: string;
		concurrencyStamp?: string;
	};

	type VoloAbpIdentityIdentityUserUpdateRolesDto = {
		roleNames: string[];
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

	type VoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto = {
		clientId?: string;
		clientSecret?: string;
		consentType?: string;
		displayName?: string;
		postLogoutRedirectUris?: string[];
		redirectUris?: string[];
		type?: string;
		clientUri?: string;
		logoUri?: string;
		allowAuthorizationCode?: boolean;
		allowImplicit?: boolean;
		allHybrid?: boolean;
		allowPassword?: boolean;
		allowClientCredentials?: boolean;
		allowRefreshToken?: boolean;
		allowDeviceCode?: boolean;
		scopes?: string[];
	};

	type VoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto = {
		id?: string;
		description?: string;
		descriptions?: string;
		displayName?: string;
		displayNames?: string;
		name?: string;
		properties?: string;
		resources?: string;
	};

	type VoloAbpPermissionManagementGetPermissionListResultDto = {
		entityDisplayName?: string;
		groups?: VoloAbpPermissionManagementPermissionGroupDto[];
	};

	type VoloAbpPermissionManagementIsGrantedRequest = {
		userId?: string;
		permissionNames?: string[];
	};

	type VoloAbpPermissionManagementIsGrantedResponse = {
		userId?: string;
		permissions?: Record<string, any>;
	};

	type VoloAbpPermissionManagementPermissionGrantInfoDto = {
		name?: string;
		displayName?: string;
		parentName?: string;
		isGranted?: boolean;
		allowedProviders?: string[];
		grantedProviders?: VoloAbpPermissionManagementProviderInfoDto[];
	};

	type VoloAbpPermissionManagementPermissionGroupDto = {
		name?: string;
		displayName?: string;
		displayNameKey?: string;
		displayNameResource?: string;
		permissions?: VoloAbpPermissionManagementPermissionGrantInfoDto[];
	};

	type VoloAbpPermissionManagementProviderInfoDto = {
		providerName?: string;
		providerKey?: string;
	};

	type VoloAbpPermissionManagementUpdatePermissionDto = {
		name?: string;
		isGranted?: boolean;
	};

	type VoloAbpPermissionManagementUpdatePermissionsDto = {
		permissions?: VoloAbpPermissionManagementUpdatePermissionDto[];
	};

	type VoloAbpSettingManagementEmailSettingsDto = {
		smtpHost?: string;
		smtpPort?: number;
		smtpUserName?: string;
		smtpPassword?: string;
		smtpDomain?: string;
		smtpEnableSsl?: boolean;
		smtpUseDefaultCredentials?: boolean;
		defaultFromAddress?: string;
		defaultFromDisplayName?: string;
	};

	type VoloAbpSettingManagementSendTestEmailInput = {
		senderEmailAddress: string;
		targetEmailAddress: string;
		subject: string;
		body?: string;
	};

	type VoloAbpSettingManagementUpdateEmailSettingsDto = {
		smtpHost?: string;
		smtpPort?: number;
		smtpUserName?: string;
		smtpPassword?: string;
		smtpDomain?: string;
		smtpEnableSsl?: boolean;
		smtpUseDefaultCredentials?: boolean;
		defaultFromAddress: string;
		defaultFromDisplayName: string;
	};

	type VoloAbpSimpleStateCheckingISimpleStateCheckerVoloAbpUINavigationApplicationMenuItem = true;

	type VoloAbpTenantManagementTenantCreateDto = {
		extraProperties?: Record<string, any>;
		name: string;
		adminEmailAddress: string;
		adminPassword: string;
	};

	type VoloAbpTenantManagementTenantDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		name?: string;
		concurrencyStamp?: string;
	};

	type VoloAbpTenantManagementTenantUpdateDto = {
		extraProperties?: Record<string, any>;
		name: string;
		concurrencyStamp?: string;
	};

	type VoloAbpUINavigationApplicationMenuItem = {
		name?: string;
		displayName?: string;
		order?: number;
		url?: string;
		icon?: string;
		isLeaf?: boolean;
		target?: string;
		isDisabled?: boolean;
		items?: VoloAbpUINavigationApplicationMenuItem[];
		requiredPermissionName?: string;
		stateCheckers?: VoloAbpSimpleStateCheckingISimpleStateCheckerVoloAbpUINavigationApplicationMenuItem[];
		customData?: Record<string, any>;
		elementId?: string;
		cssClass?: string;
		groupName?: string;
	};

	type VoloAbpUsersUserData = {
		id?: string;
		tenantId?: string;
		userName?: string;
		name?: string;
		surname?: string;
		isActive?: boolean;
		email?: string;
		emailConfirmed?: boolean;
		phoneNumber?: string;
		phoneNumberConfirmed?: boolean;
		extraProperties?: Record<string, any>;
	};

	type VoloAbpValidationStringValuesIStringValueType = {
		name?: string;
		properties?: Record<string, any>;
		validator?: VoloAbpValidationStringValuesIValueValidator;
	};

	type VoloAbpValidationStringValuesIValueValidator = {
		name?: string;
		properties?: Record<string, any>;
	};

	type WorkdayConfigureDeleteAsyncParams = {
		id: string;
	};

	type WorkdayConfigureGetAsyncParams = {
		id: string;
	};

	type WorkdayConfigureGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkdayConfigureUpdateAsyncParams = {
		id: string;
	};
}
