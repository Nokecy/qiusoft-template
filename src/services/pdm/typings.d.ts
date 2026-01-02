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

	type BomCompareBomVersionsAsyncParams = {
		bomId: number;
		sourceVersion?: string;
		targetVersion?: string;
		includeUnchanged?: boolean;
	};

	type BomCopyBomVersionAsyncParams = {
		bomId: number;
		sourceBomVersion?: string;
		targetBomVersion?: string;
		remark?: string;
	};

	type BomDeleteAsyncParams = {
		id: number;
	};

	type BomGetAsyncParams = {
		id: number;
	};

	type BomGetBomTreeAsyncParams = {
		bomId: number;
		bomVersion?: string;
	};

	type BomGetBomTreeRecursiveAsyncParams = {
		bomId: number;
		bomVersion?: string;
	};

	type BomGetDirectChildrenAsyncParams = {
		materialCode?: string;
		bomVersion?: string;
	};

	type BomGetDirectParentsAsyncParams = {
		materialCode?: string;
	};

	type BomGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BomGetParentBomsAsyncParams = {
		childMaterialCode?: string;
	};

	type BomGetTopLevelParentsAsyncParams = {
		materialCode?: string;
	};

	type BomImportImportAsyncParams = {
		/** 是否忽略警告（默认 false） */
		IgnoreWarnings?: boolean;
	};

	type BomVersionActivateAsyncParams = {
		id: number;
	};

	type BomVersionDeleteAsyncParams = {
		id: number;
	};

	type BomVersionGetAsyncParams = {
		id: number;
	};

	type BomVersionGetByMaterialCodeAsyncParams = {
		materialCode?: string;
	};

	type BomVersionGetEffectiveVersionAsyncParams = {
		materialCode?: string;
		asOfDate?: string;
	};

	type BomVersionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BomVersionObsoleteAsyncParams = {
		id: number;
		expiryDate?: string;
	};

	type BomVersionUpdateAsyncParams = {
		id: number;
	};

	type BurnAbpBNRBnrBnrRuleDefinitionItemType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	type BurnAbpBNRBnrBnrRuleLeftPadModel = {
		leftPadChar?: string;
		totalLength?: number;
	};

	type BurnAbpBNRBnrWordConvertType = 0 | 1 | 2;

	type BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	type BurnAbpPdmApplicationContractsDocumentManagementRequestsCreateDocumentObsolescenceRequestDto = {
		/** 申请标题 */
		title?: string;
		/** 申请说明 */
		description?: string;
		/** 关联的文档ID */
		documentId?: string;
		/** 文档编号（冗余，从 Document 自动获取） */
		documentNumber?: string;
		/** 文档名称（冗余，从 Document 自动获取） */
		documentName?: string;
		/** 文档版本号 */
		documentVersion?: string;
		/** 失效时间 */
		effectiveDate?: string;
		reasonType?: BurnAbpPdmApprovalsObsolescenceReasonType;
		/** 详细说明 */
		reasonDescription?: string;
		/** 替代文档ID */
		replacementDocumentId?: string;
		/** 影响范围 */
		impactScope?: string;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人名称（冗余存储） */
		assignedToUserName?: string;
	};

	type BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto = {
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
		/** 租户ID */
		tenantId?: string;
		/** 申请单编号 */
		requestNumber?: string;
		/** 申请标题 */
		title?: string;
		/** 申请说明 */
		description?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 关联的文档ID */
		documentId?: string;
		/** 文档编号（冗余） */
		documentNumber?: string;
		/** 文档名称（冗余） */
		documentName?: string;
		/** 文档版本号 */
		documentVersion?: string;
		/** 失效时间 */
		effectiveDate?: string;
		reasonType?: BurnAbpPdmApprovalsObsolescenceReasonType;
		/** 详细说明 */
		reasonDescription?: string;
		/** 替代文档ID */
		replacementDocumentId?: string;
		/** 影响范围 */
		impactScope?: string;
		status?: BurnAbpPdmApprovalsApprovalStatus;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人名称（冗余存储） */
		assignedToUserName?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmApplicationContractsDocumentManagementRequestsExecuteDocumentObsolescenceRequestWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmApplicationContractsDocumentManagementRequestsUpdateDocumentObsolescenceRequestDto = {
		/** 申请标题 */
		title?: string;
		/** 申请说明 */
		description?: string;
		/** 文档版本号 */
		documentVersion?: string;
		/** 失效时间 */
		effectiveDate?: string;
		reasonType?: BurnAbpPdmApprovalsObsolescenceReasonType;
		/** 详细说明 */
		reasonDescription?: string;
		/** 替代文档ID */
		replacementDocumentId?: string;
		/** 影响范围 */
		impactScope?: string;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人名称（冗余存储） */
		assignedToUserName?: string;
	};

	type BurnAbpPdmApplicationContractsWorkspaceDocumentSearchInput = {
		maxResultCount?: number;
		skipCount?: number;
		sorting?: string;
		/** 关键词（搜索文档编号、名称、描述） */
		keyword?: string;
		/** 文档库ID */
		documentLibraryId?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		publishState?: BurnAbpPdmDocumentManagementDocumentPublishState;
		currentRevisionState?: BurnAbpPdmDocumentManagementDocumentState;
		/** 创建人ID */
		creatorId?: string;
		/** 创建时间起始 */
		createdFrom?: string;
		/** 创建时间截止 */
		createdTo?: string;
		/** 是否只查询我的文档 */
		onlyMyDocuments?: boolean;
		/** 是否只查询检出的文档 */
		onlyCheckedOut?: boolean;
	};

	type BurnAbpPdmApplicationContractsWorkspaceDocumentSearchResultDto = {
		/** 文档ID */
		id?: string;
		/** 文档编号 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档版本 */
		version?: string;
		publishState?: BurnAbpPdmDocumentManagementDocumentPublishState;
		currentRevisionState?: BurnAbpPdmDocumentManagementDocumentState;
		/** 文档类型 */
		documentTypeName?: string;
		/** 文档库名称 */
		documentLibraryName?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 是否被检出 */
		isCheckedOut?: boolean;
		/** 检出人姓名 */
		checkedOutByName?: string;
	};

	type BurnAbpPdmApplicationContractsWorkspaceMyCheckedOutPartDto = {
		/** 物料ID */
		partId?: number;
		/** 物料编号 */
		partNumber?: string;
		/** 物料描述/名称 */
		description?: string;
		/** 物料版本 */
		version?: string;
		lifecycleStatus?: BurnAbpPdmCommonVersionStatus;
		/** 检出时间 */
		checkedOutAt?: string;
		/** 检出说明 */
		checkOutComment?: string;
		/** 检出过期时间 */
		expireAt?: string;
		/** 是否已过期 */
		isExpired?: boolean;
		/** 分类名称 */
		categoryName?: string;
		/** 单位 */
		unitName?: string;
	};

	type BurnAbpPdmApplicationContractsWorkspaceMyCheckoutDto = {
		/** 文档ID */
		documentId?: string;
		/** 文档编号 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档版本 */
		version?: string;
		/** 检出人ID */
		checkedOutBy?: string;
		/** 检出时间 */
		checkedOutAt?: string;
		/** 检出说明 */
		checkOutReason?: string;
		/** 文档类型 */
		documentTypeName?: string;
		/** 文档库名称 */
		documentLibraryName?: string;
	};

	type BurnAbpPdmApplicationContractsWorkspacePendingTaskDto = {
		/** 任务ID (申请单ID) */
		taskId?: string;
		taskType?: BurnAbpPdmApplicationContractsWorkspacePendingTaskType;
		/** 任务标题 */
		title?: string;
		/** 任务描述 */
		description?: string;
		/** 申请单编号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 提交时间 */
		submittedAt?: string;
		/** 优先级 */
		priority?: number;
		/** 关联文档ID */
		documentId?: string;
		/** 关联文档编号 */
		documentNumber?: string;
	};

	type BurnAbpPdmApplicationContractsWorkspacePendingTaskType = 3;

	type BurnAbpPdmApplicationContractsWorkspaceWorkspaceStatisticsDto = {
		/** 我的检出文档数量 */
		checkedOutDocumentsCount?: number;
		/** 我的检出物料数量 */
		checkedOutPartsCount?: number;
		/** 待我审批数量 */
		pendingApprovalCount?: number;
		/** 待我确认的发放数量 */
		pendingConfirmationCount?: number;
		/** 我发起的申请数量（待审批状态） */
		myPendingApplicationsCount?: number;
		/** 我的草稿文档数量 */
		draftDocumentsCount?: number;
		/** 我的检出总数（文档 + 物料） */
		totalCheckedOutCount?: number;
	};

	type BurnAbpPdmApprovalsApprovalStatus = 0 | 10 | 15 | 20 | 30 | 40;

	type BurnAbpPdmApprovalsObsolescenceReasonType = 1 | 2 | 3 | 4 | 99;

	type BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionCreateUpdateDto = {
		name: string;
		displayName: string;
		numberStart?: number;
		numberIncrement?: number;
		numberBinary?: number;
		isDefault?: boolean;
		active?: boolean;
		serviceName?: string;
		items?: BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionItemCreateUpdateDto[];
	};

	type BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto = {
		id?: number;
		name?: string;
		displayName?: string;
		rule?: string;
		ruleDisplayName?: string;
		ruleDescription?: string;
		numberStart?: number;
		numberIncrement?: number;
		numberBinary?: number;
		isDefault?: boolean;
		active?: boolean;
		serviceName?: string;
		/** 规则中可引用的属性集合，Key=PropertyName，Value=DisplayName。 */
		properties?: Record<string, any>;
		/** 规则项列表（友好的规则定义方式，由规则字符串解析得到）。 */
		items?: BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionItemDto[];
	};

	type BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionItemCreateUpdateDto = {
		/** 内容（固定文本、属性名称、日期格式等）。
示例：
- Type=FixedText: "P" (固定前缀)
- Type=Property: "Category" (物料分类属性)
- Type=Date: "yyyyMM" (年月格式)
- Type=Sequence: "" (序号不需要 Content) */
		content?: string;
		type?: BurnAbpBNRBnrBnrRuleDefinitionItemType;
		wordConvert?: BurnAbpBNRBnrWordConvertType;
		/** 占位符（用于预览，可选）。 */
		placeholder?: string;
		/** 右分隔符（追加在规则项后的分隔符，如 "-"）。 */
		rightSeparator?: string;
		padLeft?: BurnAbpBNRBnrBnrRuleLeftPadModel;
		/** 序号长度（仅当 Type=Sequence 时有效）。
示例：SequenceLength = 4 → "0001" */
		sequenceLength?: number;
		/** 是否作为序号依据（用于序号重置条件）。
示例：按日期重置序号时，将日期规则项的 SequenceBasis 设为 true。 */
		sequenceBasis?: boolean;
	};

	type BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionItemDto = {
		id?: string;
		/** 内容（固定文本、属性名称、日期格式等）。 */
		content?: string;
		type?: BurnAbpBNRBnrBnrRuleDefinitionItemType;
		wordConvert?: BurnAbpBNRBnrWordConvertType;
		/** 占位符（用于预览）。 */
		placeholder?: string;
		/** 右分隔符（追加在规则项后的分隔符）。 */
		rightSeparator?: string;
		padLeft?: BurnAbpBNRBnrBnrRuleLeftPadModel;
		/** 序号长度（仅当 Type 为序号类型时有效）。 */
		sequenceLength?: number;
		/** 是否作为序号依据（用于序号重置条件）。 */
		sequenceBasis?: boolean;
	};

	type BurnAbpPdmBomManagementBomDifferenceDto = {
		sourceVersion?: BurnAbpPdmBomManagementBomVersionSummary;
		targetVersion?: BurnAbpPdmBomManagementBomVersionSummary;
		differences?: BurnAbpPdmBomManagementBomItemDifferenceDto[];
		statistics?: BurnAbpPdmBomManagementBomDifferenceStatistics;
	};

	type BurnAbpPdmBomManagementBomDifferenceStatistics = {
		addedCount?: number;
		deletedCount?: number;
		modifiedCount?: number;
		relocatedCount?: number;
		unchangedCount?: number;
		totalDifferences?: number;
		totalItems?: number;
	};

	type BurnAbpPdmBomManagementBomDifferenceType = 1 | 2 | 3 | 4 | 5;

	type BurnAbpPdmBomManagementBomItemActivationStatus = 0 | 1;

	type BurnAbpPdmBomManagementBomItemDifferenceDto = {
		differenceType?: BurnAbpPdmBomManagementBomDifferenceType;
		childMaterialCode?: string;
		sourceItem?: BurnAbpPdmBomManagementBomItemSnapshot;
		targetItem?: BurnAbpPdmBomManagementBomItemSnapshot;
		fieldChanges?: BurnAbpPdmBomManagementFieldChangeDetail[];
		isStructuralChange?: boolean;
	};

	type BurnAbpPdmBomManagementBomItemSnapshot = {
		id?: number;
		bomId?: number;
		childMaterialCode?: string;
		childMaterialDescription?: string;
		quantity?: number;
		unitOfMeasure?: string;
		materialComeFrom?: string;
		childMaterialEditionNo?: string;
		parentItemId?: number;
		levelCode?: string;
		sequence?: number;
		effectiveDate?: string;
		expiryDate?: string;
		activationStatus?: BurnAbpPdmBomManagementBomItemActivationStatus;
		isVisible?: boolean;
		remark?: string;
	};

	type BurnAbpPdmBomManagementBomsBatchUpdateBomItemsDto = {
		/** BOM 聚合根 Id */
		bomId: number;
		/** 目标父项版本号（必须为最新版本） */
		targetVersion: string;
		/** 要更新的BOM明细列表 */
		items: BurnAbpPdmBomManagementBomsUpdateBomItemDto[];
	};

	type BurnAbpPdmBomManagementBomsBomDto = {
		id?: number;
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
		/** 物料编码 */
		materialCode?: string;
		/** 物料描述（快照） */
		materialDescription?: string;
		/** 顶级物料编码（用于多层BOM展开查询） */
		topMaterialCode?: string;
		/** 工程师编码 */
		engineerCode?: string;
		/** 工程师姓名 */
		engineerName?: string;
		status?: BurnAbpPdmBomManagementBomStatus;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmBomManagementBomsBomImportErrorDto = {
		/** Excel 行号 */
		rowNumber?: number;
		/** 字段名称 */
		fieldName?: string;
		/** 错误描述 */
		errorMessage?: string;
	};

	type BurnAbpPdmBomManagementBomsBomImportResultDto = {
		/** 成功导入数量 */
		successCount?: number;
		/** 失败数量 */
		failureCount?: number;
		/** 警告列表 */
		warnings?: BurnAbpPdmBomManagementBomsBomImportWarningDto[];
		/** 错误列表 */
		errors?: BurnAbpPdmBomManagementBomsBomImportErrorDto[];
		/** 根 BOM ID */
		rootBomId?: number;
		/** 是否成功 */
		isSuccess?: boolean;
	};

	type BurnAbpPdmBomManagementBomsBomImportWarningDto = {
		/** Excel 行号 */
		rowNumber?: number;
		/** 物料编码 */
		materialCode?: string;
		warningType?: BurnAbpPdmBomManagementBomsBomImportWarningType;
		/** 警告描述 */
		message?: string;
		/** 差异明细 */
		differenceDetails?: string[];
	};

	type BurnAbpPdmBomManagementBomsBomImportWarningType = 1 | 2;

	type BurnAbpPdmBomManagementBomsBomItemDto = {
		id?: number;
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
		/** BOM ID（外键，直接关联到Bom聚合根，long类型） */
		bomId?: number;
		/** 顶级物料编码 */
		topMaterialCode?: string;
		/** 父级明细ID（用于多层BOM树形结构） */
		parentItemId?: number;
		/** 子项物料版本号 */
		childMaterialVersion?: string;
		/** 子件物料编码 */
		childMaterialCode?: string;
		/** 子件描述（快照） */
		childMaterialDescription?: string;
		/** 用量 */
		quantity?: number;
		/** 计量单位 */
		unitOfMeasure?: string;
		/** 物料来源（如：自制、外购、委外等） */
		materialComeFrom?: string;
		/** 物料来源名称（格式化显示用） */
		materialComeFromName?: string;
		materialComeFromType?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** 层级代码（如 1, 1.1, 1.1.1） */
		levelCode?: string;
		/** 序号 */
		sequence?: number;
		/** 生效日期（父项行为 null，子项行从 BomVersion 同步） */
		effectiveDate?: string;
		/** 失效日期（父项行为 null，子项行从 BomVersion 同步） */
		expiryDate?: string;
		activationStatus?: BurnAbpPdmBomManagementBomItemActivationStatus;
		/** 是否显示（用于BOM树形展示控制） */
		isVisible?: boolean;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmBomManagementBomsBomItemTreeDto = {
		id?: number;
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
		/** BOM ID */
		bomId?: number;
		/** 子项物料版本号 */
		childMaterialVersion?: string;
		/** 子件物料编码 */
		childMaterialCode?: string;
		/** 子件描述 */
		childMaterialDescription?: string;
		/** 用量 */
		quantity?: number;
		/** 计量单位 */
		unitOfMeasure?: string;
		/** 物料来源（如：自制、外购、委外等） */
		materialComeFrom?: string;
		/** 物料来源名称（格式化显示用） */
		materialComeFromName?: string;
		materialComeFromType?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** 父级明细ID */
		parentItemId?: number;
		/** 层级代码 */
		levelCode?: string;
		/** 序号 */
		sequence?: number;
		/** 生效日期 */
		effectiveDate?: string;
		/** 失效日期 */
		expiryDate?: string;
		activationStatus?: BurnAbpPdmBomManagementBomItemActivationStatus;
		/** 是否显示 */
		isVisible?: boolean;
		/** 备注 */
		remark?: string;
		/** 子节点列表（递归结构） */
		children?: BurnAbpPdmBomManagementBomsBomItemTreeDto[];
	};

	type BurnAbpPdmBomManagementBomsBomRelationViewDto = {
		id?: number;
		/** 物料编码 */
		materialCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 图号 */
		drawingNumber?: string;
		/** 数量（用量） */
		quantity?: number;
		/** 单位 */
		unitOfMeasure?: string;
		/** 版本 */
		version?: string;
		/** 层级（仅用于顶级父项查询时有意义） */
		level?: number;
	};

	type BurnAbpPdmBomManagementBomsBomReverseLookupDto = {
		id?: number;
		/** 父项物料编码 */
		materialCode?: string;
		/** 父项物料描述 */
		materialDescription?: string;
		/** 父项版本号 */
		version?: string;
		/** 版本生效日期 */
		effectiveDate?: string;
		/** 版本失效日期 */
		expiryDate?: string;
		/** 层级（1表示直接父项，2表示祖父项...） */
		level?: number;
		/** 关联的子项物料编码（即通过哪个子项找到的该父项） */
		childMaterialCode?: string;
		/** 用量 */
		quantity?: number;
		/** 单位 */
		unitOfMeasure?: string;
	};

	type BurnAbpPdmBomManagementBomsCreateBomDto = {
		/** 物料编码 */
		materialCode: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 版本号 (可空)
系统会自动创建版本记录，生效日期为当天，失效日期为 9999-12-31 */
		version?: string;
		/** 顶层物料编码 */
		topMaterialCode?: string;
		/** 工程师编码 */
		engineerCode?: string;
		/** 工程师名称 */
		engineerName?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmBomManagementBomsCreateBomItemDto = {
		/** BOM ID */
		bomId: number;
		/** 父项 BOM 版本号（用于查询父项版本的日期范围） */
		bomVersion: string;
		/** 子项物料版本号（可选，用于标识子项物料的具体版本） */
		childMaterialVersion?: string;
		/** 子件物料编码 */
		childMaterialCode: string;
		/** 子件物料描述 */
		childMaterialDescription: string;
		/** 用量 */
		quantity: number;
		/** 计量单位 */
		unitOfMeasure: string;
		/** 物料来源 */
		materialComeFrom?: string;
		/** 父级明细ID */
		parentItemId?: number;
	};

	type BurnAbpPdmBomManagementBomsDeleteBomItemDto = {
		/** BOM 明细 ID */
		bomItemId: number;
		/** 父项物料版本号 */
		parentMaterialEditionNo: string;
		/** 是否影响后续版本（true 表示删除后续所有版本） */
		affectSubsequentVersions?: boolean;
	};

	type BurnAbpPdmBomManagementBomStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

	type BurnAbpPdmBomManagementBomsUpdateBomItemDto = {
		/** BOM明细ID */
		bomItemId: number;
		/** BOM版本号 */
		bomVersion: string;
		/** 用量（可选） */
		quantity?: number;
		/** 子项物料编码（可选） */
		childMaterialCode?: string;
		/** 子项物料版本号（可选） */
		childMaterialVersion?: string;
		/** 子项物料描述（可选） */
		childMaterialDescription?: string;
		/** 计量单位（可选） */
		unitOfMeasure?: string;
		/** 物料来源（可选） */
		materialComeFrom?: string;
		/** 序号（可选） */
		sequence?: number;
		/** 是否影响后续版本（默认 false）
true: 修改会影响后续所有版本（不创建克隆）
false: 只影响当前版本（创建克隆，默认行为） */
		affectSubsequentVersions?: boolean;
	};

	type BurnAbpPdmBomManagementBomVersionsBomVersionDto = {
		id?: number;
		/** 物料编码 */
		materialCode?: string;
		/** 版本号 */
		version?: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 失效日期 */
		expiryDate?: string;
		status?: BurnAbpPdmCommonVersionStatus;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmBomManagementBomVersionsCreateBomVersionDto = {
		/** 物料编码 */
		materialCode: string;
		/** 版本号 */
		version: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 失效日期 */
		expiryDate?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmBomManagementBomVersionSummary = {
		version?: string;
		effectiveDate?: string;
		expiryDate?: string;
		status?: string;
		totalItemCount?: number;
	};

	type BurnAbpPdmBomManagementBomVersionsUpdateBomVersionDto = {
		/** 生效日期 */
		effectiveDate?: string;
		/** 失效日期 */
		expiryDate?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmBomManagementCrossBomCompareInput = {
		baseMaterialCode?: string;
		baseVersion?: string;
		compareMaterialCode?: string;
		compareVersion?: string;
		includeUnchanged?: boolean;
	};

	type BurnAbpPdmBomManagementCrossBomCompareResultDto = {
		baseBom?: BurnAbpPdmBomManagementCrossBomSummary;
		compareBom?: BurnAbpPdmBomManagementCrossBomSummary;
		baseItems?: BurnAbpPdmBomManagementCrossBomItemCompareDto[];
		compareItems?: BurnAbpPdmBomManagementCrossBomItemCompareDto[];
		statistics?: BurnAbpPdmBomManagementCrossBomCompareStatistics;
	};

	type BurnAbpPdmBomManagementCrossBomCompareStatistics = {
		sameCount?: number;
		valueDifferentCount?: number;
		baseMissingCount?: number;
		compareMissingCount?: number;
		baseTotalCount?: number;
		compareTotalCount?: number;
	};

	type BurnAbpPdmBomManagementCrossBomDifferenceType = 0 | 1 | 2;

	type BurnAbpPdmBomManagementCrossBomItemCompareDto = {
		id?: number;
		bomId?: number;
		childMaterialCode?: string;
		childMaterialDescription?: string;
		quantity?: number;
		unitOfMeasure?: string;
		sequence?: number;
		levelCode?: string;
		materialComeFrom?: string;
		materialComeFromName?: string;
		childMaterialVersion?: string;
		parentItemId?: number;
		differenceType?: BurnAbpPdmBomManagementCrossBomDifferenceType;
		fieldChanges?: BurnAbpPdmBomManagementFieldChangeDetail[];
		matchedItemId?: number;
		children?: BurnAbpPdmBomManagementCrossBomItemCompareDto[];
	};

	type BurnAbpPdmBomManagementCrossBomSummary = {
		bomId?: number;
		materialCode?: string;
		materialDescription?: string;
		version?: string;
		totalItemCount?: number;
	};

	type BurnAbpPdmBomManagementFieldChangeDetail = {
		fieldName?: string;
		fieldDisplayName?: string;
		sourceValue?: string;
		targetValue?: string;
		isCritical?: boolean;
	};

	type BurnAbpPdmChangeManagementAddAffectedDocumentDto = {
		/** 文档ID */
		documentId: string;
		/** 文档编号 */
		documentNumber: string;
		/** 文档名称 */
		documentName: string;
		/** 文档类型 */
		documentType?: string;
		/** 当前版本 */
		currentVersion: string;
		/** 变更后文件上传ID（从临时文件上传获取，可选） */
		changeAfterFileUploadId?: string;
	};

	type BurnAbpPdmChangeManagementApproveChangeOrderDto = {
		/** 审批意见 */
		comment?: string;
	};

	type BurnAbpPdmChangeManagementChangeOrderStatus = 0 | 10 | 20 | 30 | 40 | 50 | 60;

	type BurnAbpPdmChangeManagementChangeReasonCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

	type BurnAbpPdmChangeManagementChangeReasonDto = {
		category?: BurnAbpPdmChangeManagementChangeReasonCategory;
		/** 变更原因描述 */
		description?: string;
		/** 是否客户驱动 */
		isCustomerDriven?: boolean;
	};

	type BurnAbpPdmChangeManagementCreateDocumentChangeOrderDto = {
		/** 变更标题/主题 */
		title: string;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人名称（冗余存储） */
		assignedToUserName?: string;
		/** 变更原因 */
		changeReason?: string;
		/** 备注 */
		remarks?: string;
		/** 变更单明细项列表（受影响的文档） */
		items?: BurnAbpPdmChangeManagementCreateDocumentChangeOrderItemDto[];
	};

	type BurnAbpPdmChangeManagementCreateDocumentChangeOrderItemDto = {
		/** 文档ID */
		documentId: string;
		/** 文档编号 */
		documentNumber: string;
		/** 文档名称 */
		documentName: string;
		/** 文档描述 */
		documentDescription?: string;
		/** 文档类型 */
		documentType?: string;
		/** 当前版本 */
		currentVersion: string;
		/** 物料编码 */
		partCode?: string;
		/** 物料图号 */
		partDrawingNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 物料描述 */
		partDescription?: string;
		/** 变更前文件ID（DocumentFile的ID，从文档版本获取） */
		beforeChangeFileId?: string;
		/** 变更后文件名称 */
		afterChangeFileName?: string;
		/** 变更后文件描述 */
		afterChangeFileDescription?: string;
		/** 是否需要升级 */
		isUpgradeRequired?: boolean;
		/** 升级后版本 */
		versionAfterUpgrade?: string;
		/** 内部库存 */
		internalStorage?: string;
		/** 外部库存 */
		externalStorage?: string;
		/** 制品处理意见 */
		productHandlingOpinion?: string;
		/** 更改后说明 */
		changeAfterDescription?: string;
		/** 关联单号 */
		relatedOrderNumber?: string;
		/** 变更后文件上传ID（从临时文件上传获取） */
		changeAfterFileUploadId?: string;
	};

	type BurnAbpPdmChangeManagementCreateEngineeringChangeNotificationDto = {
		/** 通知标题 */
		title: string;
		/** 通知描述 */
		description?: string;
		reasonCategory: BurnAbpPdmChangeManagementChangeReasonCategory;
		/** 变更原因描述 */
		reasonDescription: string;
		urgencyLevel?: BurnAbpPdmChangeManagementUrgencyLevel;
		/** 通知类型 */
		notificationType: string;
		/** 是否需要确认 */
		requiresAcknowledgment?: boolean;
		/** 目标接收人 */
		targetRecipients: string;
		/** 源变更单ID（可选） */
		sourceChangeOrderId?: string;
	};

	type BurnAbpPdmChangeManagementCreateEngineeringChangeOrderDto = {
		/** 变更标题 */
		title: string;
		/** 变更描述 */
		description?: string;
		reasonCategory: BurnAbpPdmChangeManagementChangeReasonCategory;
		/** 变更原因描述 */
		reasonDescription: string;
		urgencyLevel?: BurnAbpPdmChangeManagementUrgencyLevel;
		riskLevel?: BurnAbpPdmChangeManagementRiskLevel;
		/** 变更分类 */
		changeCategory: string;
		/** 是否影响互换性 */
		affectsInterchangeability?: boolean;
		/** 产品ID（可选） */
		productId?: string;
		productVersion?: BurnAbpPdmChangeManagementProductVersionDto;
	};

	type BurnAbpPdmChangeManagementDocumentChangeOrderDto = {
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
		/** 变更单号 */
		changeOrderNumber?: string;
		/** 变更主题/标题 */
		title?: string;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人名称（冗余存储） */
		assignedToUserName?: string;
		status?: BurnAbpPdmChangeManagementDocumentChangeOrderStatus;
		/** 变更原因 */
		changeReason?: string;
		/** 备注 */
		remarks?: string;
		/** 受影响的文档列表 */
		items?: BurnAbpPdmChangeManagementDocumentChangeOrderItemDto[];
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmChangeManagementDocumentChangeOrderItemDetailDto = {
		id?: string;
		/** 变更单ID */
		changeOrderId?: string;
		/** 变更单号 */
		changeOrderNumber?: string;
		/** 变更版本/标题 */
		title?: string;
		/** 变更原因 */
		changeReason?: string;
		/** 变更期限（完成截止时间） */
		deadline?: string;
		changeOrderStatus?: BurnAbpPdmChangeManagementDocumentChangeOrderStatus;
		/** 变更单状态显示名称 */
		changeOrderStatusDisplay?: string;
		/** 当前环节/处理人 */
		currentHandler?: string;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人姓名 */
		assignedToUserName?: string;
		/** 备注 */
		remarks?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档描述 */
		documentDescription?: string;
		/** 文档类型 */
		documentType?: string;
		/** 文档阶段（当前版本） */
		documentPhase?: string;
		/** 当前版本 */
		currentVersion?: string;
		/** 文档版本描述 */
		documentVersion?: string;
		/** 物料编号 */
		partCode?: string;
		/** 物料图号 */
		partDrawingNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 物料编码（组合显示：编号-图号） */
		partCodeDisplay?: string;
		/** 是否需要升级 */
		isUpgradeRequired?: boolean;
		/** 升级后版本 */
		versionAfterUpgrade?: string;
		/** 内部库存 */
		internalStorage?: string;
		/** 外部库存 */
		externalStorage?: string;
		/** 制品处理意见 */
		productHandlingOpinion?: string;
		/** 更改后说明 */
		changeAfterDescription?: string;
		/** 关联单号 */
		relatedOrderNumber?: string;
		/** 附件数量 */
		attachmentCount?: number;
		/** 附件描述（例如：工艺附件） */
		attachmentDescription?: string;
		/** 变更后文件名称 */
		afterChangeFileName?: string;
		/** 变更后文件Blob名称 */
		changeAfterFileBlobName?: string;
		/** 变更后文件大小（字节） */
		changeAfterFileSize?: number;
		/** 是否已应用 */
		isApplied?: boolean;
		/** 应用时间 */
		appliedAt?: string;
	};

	type BurnAbpPdmChangeManagementDocumentChangeOrderItemDto = {
		id?: string;
		/** 变更单ID */
		changeOrderId?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编号（冗余） */
		documentNumber?: string;
		/** 文档名称（冗余） */
		documentName?: string;
		/** 文档描述 */
		documentDescription?: string;
		/** 文档类型 */
		documentType?: string;
		/** 当前版本 */
		currentVersion?: string;
		/** 物料编码 */
		partCode?: string;
		/** 物料图号 */
		partDrawingNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 物料描述 */
		partDescription?: string;
		/** 变更前文件ID */
		beforeChangeFileId?: string;
		/** 变更后文件名称 */
		afterChangeFileName?: string;
		/** 变更后文件描述 */
		afterChangeFileDescription?: string;
		/** 是否需要升级 */
		isUpgradeRequired?: boolean;
		/** 升级后版本 */
		versionAfterUpgrade?: string;
		/** 内部库存 */
		internalStorage?: string;
		/** 外部库存 */
		externalStorage?: string;
		/** 制品处理意见 */
		productHandlingOpinion?: string;
		/** 更改后说明 */
		changeAfterDescription?: string;
		/** 关联单号 */
		relatedOrderNumber?: string;
		/** 变更后文件Blob名称 */
		changeAfterFileBlobName?: string;
		/** 变更后文件大小（字节） */
		changeAfterFileSize?: number;
		/** 是否已应用 */
		isApplied?: boolean;
		/** 应用时间 */
		appliedAt?: string;
	};

	type BurnAbpPdmChangeManagementDocumentChangeOrderStatus = 0 | 10 | 20 | 30 | 40;

	type BurnAbpPdmChangeManagementEngineeringChangeNotificationDto = {
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
		/** 变更单号 */
		changeOrderNumber?: string;
		/** 变更标题 */
		title?: string;
		/** 变更描述 */
		description?: string;
		changeReason?: BurnAbpPdmChangeManagementChangeReasonDto;
		impactAnalysis?: BurnAbpPdmChangeManagementImpactAnalysisDto;
		status?: BurnAbpPdmChangeManagementChangeOrderStatus;
		urgencyLevel?: BurnAbpPdmChangeManagementUrgencyLevel;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前活动名称 */
		currentActivityName?: string;
		/** 当前分配人姓名 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签列表 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		/** 源变更单ID（可选）
如果该 ECN 是由某个 ECO 触发的，记录源 ECO 的 ID */
		sourceChangeOrderId?: string;
		/** 通知类型 */
		notificationType?: string;
		/** 是否需要确认 */
		requiresAcknowledgment?: boolean;
		/** 目标接收人 */
		targetRecipients?: string;
	};

	type BurnAbpPdmChangeManagementEngineeringChangeOrderDto = {
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
		/** 变更单号 */
		changeOrderNumber?: string;
		/** 变更标题 */
		title?: string;
		/** 变更描述 */
		description?: string;
		changeReason?: BurnAbpPdmChangeManagementChangeReasonDto;
		impactAnalysis?: BurnAbpPdmChangeManagementImpactAnalysisDto;
		status?: BurnAbpPdmChangeManagementChangeOrderStatus;
		urgencyLevel?: BurnAbpPdmChangeManagementUrgencyLevel;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前活动名称 */
		currentActivityName?: string;
		/** 当前分配人姓名 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签列表 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		/** 变更分类 */
		changeCategory?: string;
		/** 是否影响互换性 */
		affectsInterchangeability?: boolean;
		/** 库存处置策略 */
		inventoryDispositionStrategy?: string;
		/** 生效日期 */
		effectiveDate?: string;
	};

	type BurnAbpPdmChangeManagementExecuteDocumentChangeOrderWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmChangeManagementImpactAnalysisDto = {
		/** 受影响的部门列表 */
		affectedDepartments?: string[];
		/** 预估成本 */
		estimatedCost?: number;
		/** 预估工期（小时） */
		estimatedDurationHours?: number;
		riskLevel?: BurnAbpPdmChangeManagementRiskLevel;
		/** 风险描述 */
		riskDescription?: string;
		/** 是否影响在产品 */
		affectsInProductionItems?: boolean;
	};

	type BurnAbpPdmChangeManagementProductVersionDto = {
		/** 主版本号 */
		majorVersion?: number;
		/** 次版本号 */
		minorVersion?: number;
		/** 补丁版本号 */
		patchVersion?: number;
		/** 版本后缀（如 alpha, beta, rc1） */
		suffix?: string;
	};

	type BurnAbpPdmChangeManagementRejectChangeOrderDto = {
		/** 拒绝原因 */
		rejectReason: string;
	};

	type BurnAbpPdmChangeManagementRiskLevel = 1 | 2 | 3 | 4;

	type BurnAbpPdmChangeManagementUpdateDocumentChangeOrderDto = {
		/** 变更标题/主题 */
		title: string;
		/** 处理人Code */
		assignedToUserCode?: string;
		/** 处理人名称（冗余存储） */
		assignedToUserName?: string;
		/** 变更原因 */
		changeReason?: string;
		/** 备注 */
		remarks?: string;
	};

	type BurnAbpPdmChangeManagementUpdateEngineeringChangeNotificationDto = {
		/** 通知标题 */
		title: string;
		/** 通知描述 */
		description?: string;
		reasonCategory: BurnAbpPdmChangeManagementChangeReasonCategory;
		/** 变更原因描述 */
		reasonDescription: string;
		urgencyLevel?: BurnAbpPdmChangeManagementUrgencyLevel;
		/** 通知类型 */
		notificationType: string;
	};

	type BurnAbpPdmChangeManagementUpdateEngineeringChangeOrderDto = {
		/** 变更标题 */
		title: string;
		/** 变更描述 */
		description?: string;
		reasonCategory: BurnAbpPdmChangeManagementChangeReasonCategory;
		/** 变更原因描述 */
		reasonDescription: string;
		urgencyLevel?: BurnAbpPdmChangeManagementUrgencyLevel;
		riskLevel?: BurnAbpPdmChangeManagementRiskLevel;
		/** 变更分类 */
		changeCategory: string;
	};

	type BurnAbpPdmChangeManagementUrgencyLevel = 1 | 2 | 3 | 4;

	type BurnAbpPdmCommonVersionStatus = 0 | 10 | 20 | 40;

	type BurnAbpPdmControllersDocumentManagementMissingChunksDto = {
		missingChunkIndexes?: number[];
	};

	type BurnAbpPdmDocumentManagementArchiveType = 0 | 1 | 2;

	type BurnAbpPdmDocumentManagementAuthorizationAclEntryDto = {
		principalType?: BurnAbpPdmDocumentManagementAuthorizationDocumentPrincipalType;
		/** 主体标识（用户为 UserId 字符串，角色/组织为编码） */
		principalKey?: string;
		/** 主体描述（用户/角色/组织名称） */
		principalDisplayName?: string;
		action?: BurnAbpPdmDocumentManagementAuthorizationDocumentPermissionAction;
		effect?: BurnAbpPdmDocumentManagementAuthorizationPermissionEffect;
		/** 是否继承到子级 */
		inheritToChildren?: boolean;
	};

	type BurnAbpPdmDocumentManagementAuthorizationAclListDto = {
		/** 资源标识 */
		resourceId?: string;
		resourceType?: BurnAbpPdmDocumentManagementAuthorizationDocumentResourceType;
		/** ACL 条目 */
		entries?: BurnAbpPdmDocumentManagementAuthorizationAclEntryDto[];
	};

	type BurnAbpPdmDocumentManagementAuthorizationApplyTemplateInput = {
		/** 模板标识 */
		templateId?: string;
		/** 文档库标识 */
		libraryId?: string;
		mode?: BurnAbpPdmDocumentManagementAuthorizationTemplateApplyMode;
	};

	type BurnAbpPdmDocumentManagementAuthorizationAuthorizationDiagnosticDto = {
		/** 是否允许 */
		isAllowed?: boolean;
		/** 命中规则 */
		matchedRule?: string;
		/** 命中证据 */
		evidence?: BurnAbpPdmDocumentManagementAuthorizationAuthorizationEvidenceDto[];
	};

	type BurnAbpPdmDocumentManagementAuthorizationAuthorizationEvidenceDto = {
		/** 证据类型 */
		kind?: string;
		/** 证据详情 */
		detail?: string;
		/** 关联资源标识 */
		resourceId?: string;
	};

	type BurnAbpPdmDocumentManagementAuthorizationCreateTemplateInput = {
		/** 模板名称 */
		name?: string;
		/** 描述 */
		description?: string;
		/** 模板条目 */
		entries?: BurnAbpPdmDocumentManagementAuthorizationTemplateEntryDto[];
	};

	type BurnAbpPdmDocumentManagementAuthorizationDocumentAuthorizationTemplateDto = {
		/** 模板标识 */
		id?: string;
		/** 模板名称 */
		name?: string;
		/** 描述 */
		description?: string;
		/** 是否启用 */
		isEnabled?: boolean;
		/** 模板条目 */
		entries?: BurnAbpPdmDocumentManagementAuthorizationTemplateEntryDto[];
	};

	type BurnAbpPdmDocumentManagementAuthorizationDocumentCollaborationRole = 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementAuthorizationDocumentCollaboratorDto = {
		/** 协作者标识 */
		id?: string;
		/** 文档标识 */
		documentId?: string;
		/** 用户标识 */
		userId?: string;
		role?: BurnAbpPdmDocumentManagementAuthorizationDocumentCollaborationRole;
		/** 过期时间 */
		expireTime?: string;
		/** 是否启用 */
		isEnabled?: boolean;
	};

	type BurnAbpPdmDocumentManagementAuthorizationDocumentPermissionAction = 1 | 2 | 3 | 4 | 10 | 11 | 12 | 13 | 14 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 90 | 91;

	type BurnAbpPdmDocumentManagementAuthorizationDocumentPrincipalType = 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementAuthorizationDocumentResourceType = 1 | 2;

	type BurnAbpPdmDocumentManagementAuthorizationPermissionEffect = 0 | 1;

	type BurnAbpPdmDocumentManagementAuthorizationSetCollaboratorsInput = {
		/** 文档标识 */
		documentId?: string;
		/** 协作者列表 */
		collaborators?: BurnAbpPdmDocumentManagementAuthorizationDocumentCollaboratorDto[];
	};

	type BurnAbpPdmDocumentManagementAuthorizationTemplateApplyMode = 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementAuthorizationTemplateEntryDto = {
		principalType?: BurnAbpPdmDocumentManagementAuthorizationDocumentPrincipalType;
		/** 主体标识（用户为 UserId 字符串，角色/组织为编码） */
		principalKey?: string;
		action?: BurnAbpPdmDocumentManagementAuthorizationDocumentPermissionAction;
		effect?: BurnAbpPdmDocumentManagementAuthorizationPermissionEffect;
		/** 是否继承到子级 */
		inheritToChildren?: boolean;
	};

	type BurnAbpPdmDocumentManagementAuthorizationUpdateAclInput = {
		/** 资源标识 */
		resourceId?: string;
		resourceType?: BurnAbpPdmDocumentManagementAuthorizationDocumentResourceType;
		/** ACL 条目 */
		entries?: BurnAbpPdmDocumentManagementAuthorizationAclEntryDto[];
	};

	type BurnAbpPdmDocumentManagementAuthorizationUpdateTemplateInput = {
		/** 模板名称 */
		name?: string;
		/** 描述 */
		description?: string;
		/** 模板条目 */
		entries?: BurnAbpPdmDocumentManagementAuthorizationTemplateEntryDto[];
	};

	type BurnAbpPdmDocumentManagementCADSystemType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

	type BurnAbpPdmDocumentManagementCheckInRequestStatus = 0 | 10 | 15 | 20 | 30;

	type BurnAbpPdmDocumentManagementCheckOutRequestStatus = 0 | 10 | 15 | 20 | 30;

	type BurnAbpPdmDocumentManagementConversionsCancelConversionInput = {
		/** 转换ID */
		conversionId: string;
		/** 取消原因 */
		reason: string;
	};

	type BurnAbpPdmDocumentManagementConversionsConversionEngineType = 0 | 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementConversionsConversionLogDto = {
		/** 日志ID */
		id?: string;
		level?: BurnAbpPdmDocumentManagementConversionsConversionLogLevel;
		/** 日志消息 */
		message?: string;
		/** 记录时间 */
		loggedAt?: string;
	};

	type BurnAbpPdmDocumentManagementConversionsConversionLogLevel = 0 | 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementConversionsConversionMetadataDto = {
		/** 顶点数 */
		vertexCount?: number;
		/** 面数 */
		faceCount?: number;
		/** 总文件大小 */
		totalFileSize?: number;
		/** 格式详情 */
		format?: string;
	};

	type BurnAbpPdmDocumentManagementConversionsConversionResultFileDto = {
		/** 文件ID */
		id?: string;
		/** 转换ID */
		conversionId?: string;
		/** 文件名 */
		fileName?: string;
		/** Blob存储名称 */
		blobName?: string;
		/** 文件大小(字节) */
		fileSize?: number;
		/** 文件URL */
		fileUrl?: string;
		/** 文件类型(如gltf, glb, bin, png) */
		fileType?: string;
	};

	type BurnAbpPdmDocumentManagementConversionsConversionStatisticsDto = {
		/** 总转换任务数 */
		totalCount?: number;
		/** 待转换数量 */
		pendingCount?: number;
		/** 转换中数量 */
		convertingCount?: number;
		/** 已完成数量 */
		completedCount?: number;
		/** 失败数量 */
		failedCount?: number;
		/** 已取消数量 */
		cancelledCount?: number;
		/** 成功率(百分比) */
		successRate?: number;
		/** 平均耗时(秒) */
		averageDurationSeconds?: number;
	};

	type BurnAbpPdmDocumentManagementConversionsConversionStatus = 0 | 10 | 20 | 30 | 40;

	type BurnAbpPdmDocumentManagementConversionsCreateDocumentConversionDto = {
		/** 文档ID */
		documentId: string;
		/** 源文件ID */
		sourceFileId: string;
		engineType?: BurnAbpPdmDocumentManagementConversionsConversionEngineType;
		targetFormat?: BurnAbpPdmDocumentManagementConversionsLightweightFormat;
		drawingType?: BurnAbpPdmDocumentManagementConversionsDrawingType;
		/** 优先级(1-10) */
		priority?: number;
		/** 转换选项JSON */
		conversionOptionsJson?: string;
	};

	type BurnAbpPdmDocumentManagementConversionsDocumentConversionDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编号 */
		documentNumber?: string;
		/** 源文件ID */
		sourceFileId?: string;
		/** 源文件名 */
		sourceFileName?: string;
		/** 源文件 Blob 路径 */
		sourceBlobName?: string;
		engineType?: BurnAbpPdmDocumentManagementConversionsConversionEngineType;
		targetFormat?: BurnAbpPdmDocumentManagementConversionsLightweightFormat;
		drawingType?: BurnAbpPdmDocumentManagementConversionsDrawingType;
		/** 优先级(1-10) */
		priority?: number;
		/** 转换选项JSON */
		conversionOptionsJson?: string;
		status?: BurnAbpPdmDocumentManagementConversionsConversionStatus;
		/** 进度百分比(0-100) */
		progressPercentage?: number;
		/** 开始时间 */
		startedAt?: string;
		/** 完成时间 */
		completedAt?: string;
		/** 耗时(秒) */
		durationSeconds?: number;
		/** 外部任务ID */
		externalTaskId?: string;
		/** 错误信息 */
		errorMessage?: string;
		/** 重试次数 */
		retryCount?: number;
		/** 结果文件列表 */
		resultFiles?: BurnAbpPdmDocumentManagementConversionsConversionResultFileDto[];
		metadata?: BurnAbpPdmDocumentManagementConversionsConversionMetadataDto;
		/** 转换日志列表 */
		logs?: BurnAbpPdmDocumentManagementConversionsConversionLogDto[];
	};

	type BurnAbpPdmDocumentManagementConversionsDocumentConversionStatisticsDto = {
		/** 总转换任务数 */
		totalCount?: number;
		/** 待处理数量 */
		pendingCount?: number;
		/** 转换中数量 */
		convertingCount?: number;
		/** 已完成数量 */
		completedCount?: number;
		/** 失败数量 */
		failedCount?: number;
		/** 已取消数量 */
		cancelledCount?: number;
	};

	type BurnAbpPdmDocumentManagementConversionsDocumentConversionSummaryDto = {
		/** 转换任务ID */
		id?: string;
		/** 源文件名 */
		sourceFileName?: string;
		engineType?: BurnAbpPdmDocumentManagementConversionsConversionEngineType;
		targetFormat?: BurnAbpPdmDocumentManagementConversionsLightweightFormat;
		drawingType?: BurnAbpPdmDocumentManagementConversionsDrawingType;
		status?: BurnAbpPdmDocumentManagementConversionsConversionStatus;
		/** 进度百分比(0-100) */
		progressPercentage?: number;
		/** 开始时间 */
		startedAt?: string;
		/** 完成时间 */
		completedAt?: string;
		/** 错误信息 */
		errorMessage?: string;
		/** 结果文件列表 */
		resultFiles?: BurnAbpPdmDocumentManagementConversionsConversionResultFileDto[];
		/** 转换日志列表（最近10条） */
		recentLogs?: BurnAbpPdmDocumentManagementConversionsConversionLogDto[];
		/** 创建时间 */
		creationTime?: string;
	};

	type BurnAbpPdmDocumentManagementConversionsDrawingType = 0 | 1 | 2;

	type BurnAbpPdmDocumentManagementConversionsLightweightFormat = 1 | 2 | 3 | 4 | 5 | 6;

	type BurnAbpPdmDocumentManagementConversionsRetryConversionInput = {
		/** 转换ID */
		conversionId: string;
	};

	type BurnAbpPdmDocumentManagementConversionsTriggerManualConversionInput = {
		/** 文档ID */
		documentId: string;
		/** 源原始文件ID（工作区原始文件的ID；已发布版本场景也应传 SourceDocumentFileId） */
		sourceFileId: string;
		engineType?: BurnAbpPdmDocumentManagementConversionsConversionEngineType;
		targetFormat?: BurnAbpPdmDocumentManagementConversionsLightweightFormat;
		/** true：强制创建新转换任务并切为当前（用于“重新转换/修复”） */
		force?: boolean;
		/** 触发原因（用于审计/日志，可选） */
		reason?: string;
	};

	type BurnAbpPdmDocumentManagementConversionsWebhookCallbackResultDto = {
		/** 是否成功 */
		success?: boolean;
		/** 消息 */
		message?: string;
		/** HTTP状态码(可选) */
		statusCode?: number;
	};

	type BurnAbpPdmDocumentManagementDocumentArchivesCreateDocumentArchiveDto = {
		/** 文档编码 */
		docNo?: string;
		/** 目标文档ID（优化/变更归档时用于命中目标文档） */
		targetDocumentId?: string;
		/** 文档类型ID */
		documentTypeId: string;
		/** 文档类型编码 */
		documentTypeCode: string;
		/** 文档类型名称 */
		documentTypeName: string;
		/** 文档版本 */
		docVersion?: string;
		/** 文档名称（可选） */
		documentName?: string;
		/** 物料编码 */
		partNo?: string;
		/** 物料名称 */
		partName?: string;
		/** 描述 */
		remark?: string;
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId: string;
		archiveType?: BurnAbpPdmDocumentManagementDocumentArchiveType;
		/** 修改内容 */
		modifyContent: string;
		/** 华为单号 */
		hwOrderNumber?: string;
		/** 审批人Code */
		approverCode: string;
		/** 审批人名称 */
		approverName: string;
		/** GDP文件路径（GDP系统使用） */
		gdpFilePath?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto = {
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
		/** 更改单号 */
		number?: string;
		/** 文档编码 */
		docNo?: string;
		/** 目标文档ID（优化/变更归档时用于命中目标文档） */
		targetDocumentId?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型编码 */
		documentTypeCode?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 文档版本 */
		docVersion?: string;
		/** BlobName */
		blobName?: string;
		/** 原始文件名（带扩展名） */
		fileName?: string;
		/** 文档名称 */
		documentName?: string;
		/** 物料编码 */
		partNo?: string;
		/** 物料名称 */
		partName?: string;
		/** 描述 */
		remark?: string;
		archiveType?: BurnAbpPdmDocumentManagementDocumentArchiveType;
		/** 修改内容 */
		modifyContent?: string;
		/** 华为单号 */
		hwOrderNumber?: string;
		orderStatus?: BurnAbpPdmChangeManagementDocumentChangeOrderStatus;
		/** 审批人Code */
		approverCode?: string;
		/** 审批人名称 */
		approverName?: string;
		/** 存储库ID（文档的当前所属存储库）
在审批时设置，审批通过后用于创建正式文档 */
		storageLibraryId?: string;
		/** 回收库ID（文档作废时移入的回收库） */
		recycleLibraryId?: string;
		/** 驳回原因 */
		rejectionReason?: string;
		/** 生成的正式文档ID（审批通过后自动创建的文档） */
		generatedDocumentId?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentArchivesExecuteDocumentArchiveDto = {
		id?: string;
		number?: string;
		docNo?: string;
		targetDocumentId?: string;
		documentName?: string;
		documentTypeId?: string;
		documentTypeCode?: string;
		documentTypeName?: string;
		docVersion?: string;
		blobName?: string;
		partNo?: string;
		partName?: string;
		remark?: string;
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId?: string;
		archiveType?: BurnAbpPdmDocumentManagementDocumentArchiveType;
		modifyContent?: string;
		hwOrderNumber?: string;
		storageLibraryId?: string;
		recycleLibraryId?: string;
		eventKey?: string;
		outcomeValue?: string;
		comment?: string;
		nextAssignment?: string;
		candidateNotifyUsers?: string[];
		direction?: number;
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
		executeInput?: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementDocumentArchivesExecuteDocumentArchiveWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
		/** 文档编码（用于验证唯一性） */
		docNo: string;
		/** 文档名称（必填） */
		documentName: string;
		/** 存储库ID（审批通过后文档的存储库） */
		storageLibraryId: string;
		/** 回收库ID（文档作废时移入的回收库） */
		recycleLibraryId: string;
	};

	type BurnAbpPdmDocumentManagementDocumentArchivesUpdateDocumentArchiveDto = {
		id?: string;
		/** 文档编号 */
		docNo?: string;
		/** 目标文档ID（优化/变更归档时使用） */
		targetDocumentId?: string;
		/** 文档类型编码 */
		documentTypeCode: string;
		/** 文档类型名称 */
		documentTypeName: string;
		/** 文档类型ID */
		documentTypeId: string;
		/** 文档版本 */
		docVersion?: string;
		/** 物料编码 */
		partNo?: string;
		/** 物料名称 */
		partName?: string;
		/** 备注 */
		remark?: string;
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId: string;
		archiveType?: BurnAbpPdmDocumentManagementDocumentArchiveType;
		/** 修改内容 */
		modifyContent: string;
		/** 华为单据号 */
		hwOrderNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentArchiveType = 0 | 1 | 2;

	type BurnAbpPdmDocumentManagementDocumentChangeOrderStatus = 0 | 5 | 10 | 15;

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsCreateDocumentCheckInRequestDto = {
		/** 申请人ID */
		applicantId: string;
		/** 申请人姓名 */
		applicantName: string;
		/** 处理人Code(审批人) */
		processorCode: string;
		/** 处理人姓名 */
		processorName: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		/** 检入明细列表 */
		items: BurnAbpPdmDocumentManagementDocumentCheckInRequestsCreateDocumentCheckInRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsCreateDocumentCheckInRequestItemDto = {
		/** 变更前文档编码 */
		beforeDocumentNumber: string;
		/** 变更前文档名称 */
		beforeDocumentName?: string;
		/** 变更前文档描述 */
		beforeDescription?: string;
		/** 变更前文档版本 */
		beforeDocumentVersion?: string;
		/** 变更前文件名称 */
		beforeFileName?: string;
		/** 变更后文档名称 */
		afterDocumentName?: string;
		/** 变更后文档描述 */
		afterDescription?: string;
		/** 是否升级版本 */
		isVersionUpgrade?: boolean;
		/** 变更后文档版本 */
		afterVersion?: string;
		/** 变更后文件名称 */
		afterFileName?: string;
		/** 变更后文件UploadId(临时存储) */
		afterFileUploadId?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料描述(物料名称) */
		partName?: string;
		/** 物料图号 */
		drawingNumber?: string;
		/** 修改内容 */
		modificationDescription?: string;
		/** 关联变更单ID(可选) */
		changeOrderId?: string;
		/** 关联变更单号 */
		changeOrderNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto = {
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
		/** 申请单号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 申请时间 */
		applicationTime?: string;
		/** 处理人Code(审批人) */
		processorCode?: string;
		/** 处理人姓名 */
		processorName?: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		checkInStatus?: BurnAbpPdmDocumentManagementCheckInRequestStatus;
		/** 租户ID */
		tenantId?: string;
		/** 检入明细列表 */
		items?: BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestItemDto[];
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestItemDetailDto = {
		id?: string;
		/** 申请单ID */
		requestId?: string;
		/** 申请单号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 申请时间 */
		applicationTime?: string;
		/** 处理人Code（审批人） */
		processorCode?: string;
		/** 处理人姓名 */
		processorName?: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		checkInStatus?: BurnAbpPdmDocumentManagementCheckInRequestStatus;
		/** 租户ID */
		tenantId?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 最后修改人ID */
		lastModifierId?: string;
		/** 变更前文档编码 */
		beforeDocumentNumber?: string;
		/** 变更前文档名称 */
		beforeDocumentName?: string;
		/** 变更前文档描述 */
		beforeDescription?: string;
		/** 变更前文档版本 */
		beforeDocumentVersion?: string;
		/** 变更前文件名称 */
		beforeFileName?: string;
		/** 变更后文档编码 */
		afterDocumentNumber?: string;
		/** 变更后文档名称 */
		afterDocumentName?: string;
		/** 变更后文档描述 */
		afterDescription?: string;
		/** 是否升级版本 */
		isVersionUpgrade?: boolean;
		/** 变更后文档版本 */
		afterVersion?: string;
		/** 变更后文件名称 */
		afterFileName?: string;
		/** 变更后文件Blob名称 */
		afterFileBlobName?: string;
		/** 变更后文件大小 */
		afterFileSize?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
		/** 修改内容 */
		modificationDescription?: string;
		/** 关联变更单ID */
		changeOrderId?: string;
		/** 关联变更单号 */
		changeOrderNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestItemDto = {
		/** ID */
		id?: string;
		/** 申请单ID */
		requestId?: string;
		/** 变更前文档编码 */
		beforeDocumentNumber?: string;
		/** 变更前文档名称 */
		beforeDocumentName?: string;
		/** 变更前文档描述 */
		beforeDescription?: string;
		/** 变更前文档版本 */
		beforeDocumentVersion?: string;
		/** 变更前文件名称 */
		beforeFileName?: string;
		/** 变更前文件Blob名称 */
		beforeFileBlobName?: string;
		/** 变更前文件大小 */
		beforeFileSize?: string;
		/** 变更后文档编码(与变更前相同) */
		afterDocumentNumber?: string;
		/** 变更后文档名称 */
		afterDocumentName?: string;
		/** 变更后文档描述 */
		afterDescription?: string;
		/** 是否升级版本 */
		isVersionUpgrade?: boolean;
		/** 变更后文档版本 */
		afterVersion?: string;
		/** 变更后文件名称 */
		afterFileName?: string;
		/** 变更后文件Blob名称 */
		afterFileBlobName?: string;
		/** 变更后文件大小 */
		afterFileSize?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料描述(物料名称) */
		partName?: string;
		/** 物料图号 */
		drawingNumber?: string;
		/** 修改内容 */
		modificationDescription?: string;
		/** 关联变更单ID(可选) */
		changeOrderId?: string;
		/** 关联变更单号 */
		changeOrderNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInValidationErrorDto = {
		/** 文档编码 */
		documentNumber?: string;
		/** 错误码（领域错误码） */
		errorCode?: string;
		/** 错误数据（用于前端本地化/模板化展示） */
		errorData?: Record<string, any>;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInValidationRequestDto = {
		/** 要验证的文档编码列表 */
		documentNumbers?: string[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInValidationResultDto = {
		/** 验证成功的文档 */
		successDocuments?: string[];
		/** 验证失败的文档及原因 */
		errors?: BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInValidationErrorDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentVersionValidationRequestDto = {
		/** 文档编码 */
		documentNumber?: string;
		/** 新版本号 */
		newVersion?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentVersionValidationResultDto = {
		/** 是否唯一 */
		isUnique?: boolean;
		/** 错误码（不唯一时） */
		errorCode?: string;
		/** 错误数据（不唯一时） */
		errorData?: Record<string, any>;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsExecuteDocumentCheckInRequestWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsUpdateDocumentCheckInRequestDto = {
		/** 处理人Code(审批人) */
		processorCode: string;
		/** 处理人姓名 */
		processorName: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		/** 检入明细列表 */
		items: BurnAbpPdmDocumentManagementDocumentCheckInRequestsUpdateDocumentCheckInRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckInRequestsUpdateDocumentCheckInRequestItemDto = {
		/** ID(仅更新时需要) */
		id?: string;
		/** 变更前文档编码 */
		beforeDocumentNumber: string;
		/** 变更前文档名称 */
		beforeDocumentName?: string;
		/** 变更前文档描述 */
		beforeDescription?: string;
		/** 变更前文档版本 */
		beforeDocumentVersion?: string;
		/** 变更前文件名称 */
		beforeFileName?: string;
		/** 变更后文档名称 */
		afterDocumentName?: string;
		/** 变更后文档描述 */
		afterDescription?: string;
		/** 是否升级版本 */
		isVersionUpgrade?: boolean;
		/** 变更后文档版本 */
		afterVersion?: string;
		/** 变更后文件名称 */
		afterFileName?: string;
		/** 变更后文件UploadId(临时存储,仅新增或替换时需要) */
		afterFileUploadId?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料描述(物料名称) */
		partName?: string;
		/** 物料图号 */
		drawingNumber?: string;
		/** 修改内容 */
		modificationDescription?: string;
		/** 关联变更单ID(可选) */
		changeOrderId?: string;
		/** 关联变更单号 */
		changeOrderNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsCreateDocumentCheckOutRequestDto = {
		/** 申请人ID */
		applicantId: string;
		/** 申请人姓名 */
		applicantName: string;
		/** 处理人Code(审批人) */
		processorCode: string;
		/** 处理人姓名 */
		processorName: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		/** 检出明细列表 */
		items: BurnAbpPdmDocumentManagementDocumentCheckOutRequestsCreateDocumentCheckOutRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsCreateDocumentCheckOutRequestItemDto = {
		/** 文档编码 */
		documentNumber: string;
		/** 文档名称 */
		documentName: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId: string;
		/** 文档类型名称 */
		documentTypeName: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
		/** 关联变更单ID(可选) */
		changeOrderId?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto = {
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
		/** 申请单号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 申请时间 */
		applicationTime?: string;
		/** 处理人Code(审批人) */
		processorCode?: string;
		/** 处理人姓名 */
		processorName?: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		checkOutStatus?: BurnAbpPdmDocumentManagementCheckOutRequestStatus;
		/** 租户ID */
		tenantId?: string;
		/** 检出明细列表 */
		items?: BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestItemDto[];
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestItemDetailDto = {
		id?: string;
		/** 申请单ID */
		requestId?: string;
		/** 申请单号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 申请时间 */
		applicationTime?: string;
		/** 处理人Code（审批人） */
		processorCode?: string;
		/** 处理人姓名 */
		processorName?: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		checkOutStatus?: BurnAbpPdmDocumentManagementCheckOutRequestStatus;
		/** 租户ID */
		tenantId?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 最后修改人ID */
		lastModifierId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
		/** 关联变更单ID（可选） */
		changeOrderId?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestItemDto = {
		/** ID */
		id?: string;
		/** 申请单ID */
		requestId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
		/** 关联变更单ID(可选) */
		changeOrderId?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutValidationErrorDto = {
		/** 文档编码 */
		documentNumber?: string;
		/** 错误码（领域错误码） */
		errorCode?: string;
		/** 错误数据（用于前端本地化/模板化展示） */
		errorData?: Record<string, any>;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutValidationRequestDto = {
		/** 要验证的文档编码列表 */
		documentNumbers?: string[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutValidationResultDto = {
		/** 验证成功的文档 */
		successDocuments?: string[];
		/** 验证失败的文档及原因 */
		errors?: BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutValidationErrorDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsExecuteDocumentCheckOutRequestWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsUpdateDocumentCheckOutRequestDto = {
		/** 处理人Code(审批人) */
		processorCode: string;
		/** 处理人姓名 */
		processorName: string;
		/** 申请原因 */
		reason?: string;
		/** 备注 */
		remark?: string;
		/** 检出明细列表 */
		items: BurnAbpPdmDocumentManagementDocumentCheckOutRequestsUpdateDocumentCheckOutRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentCheckOutRequestsUpdateDocumentCheckOutRequestItemDto = {
		/** ID(仅更新时需要) */
		id?: string;
		/** 文档编码 */
		documentNumber: string;
		/** 文档名称 */
		documentName: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId: string;
		/** 文档类型名称 */
		documentTypeName: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
		/** 关联变更单ID(可选) */
		changeOrderId?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentFileRole = 0 | 1;

	type BurnAbpPdmDocumentManagementDocumentLibrariesCreateDocumentLibraryDto = {
		/** 文档库名称。 */
		libraryName?: string;
		/** 父级文档库 ID，根目录可为空。 */
		parentLibraryId?: string;
		/** 文档库描述。 */
		description?: string;
		libraryType?: BurnAbpPdmDocumentManagementDocumentLibraryType;
		/** 存储方案ID */
		storageSolutionId?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto = {
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
		/** 文档库编码，唯一标识库节点。 */
		libraryCode?: string;
		/** 文档库名称。 */
		libraryName?: string;
		/** 父级文档库主键，根节点为空。 */
		parentLibraryId?: string;
		/** 父级文档库编码 */
		parentLibraryCode?: string;
		/** 父级文档库名称 */
		parentLibraryName?: string;
		/** 全路径字符串（例如 ROOT/设计/图纸）。 */
		path?: string;
		/** 层级深度，根节点为 0 或 1。 */
		level?: number;
		/** 排序号，值越小越靠前。 */
		sortOrder?: number;
		/** 文档库描述信息。 */
		description?: string;
		/** 是否启用，禁用后前端不可选择。 */
		isActive?: boolean;
		libraryType?: BurnAbpPdmDocumentManagementDocumentLibraryType;
		/** 存储方案ID */
		storageSolutionId?: string;
		/** 存储方案名称 */
		storageSolutionName?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentLibrariesUpdateDocumentLibraryDto = {
		/** 文档库名称。 */
		libraryName?: string;
		/** 父级文档库 ID，设置为 null 表示移到根目录。 */
		parentLibraryId?: string;
		/** 文档库描述。 */
		description?: string;
		libraryType?: BurnAbpPdmDocumentManagementDocumentLibraryType;
		/** 存储方案ID（可选，不传表示不修改存储方案）。 */
		storageSolutionId?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentLibraryType = 1 | 2;

	type BurnAbpPdmDocumentManagementDocumentOperationType = 0 | 1 | 2 | 10 | 11 | 12 | 20 | 21 | 22 | 23 | 30 | 31 | 32 | 33 | 34 | 40 | 41 | 42 | 50 | 51 | 52;

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsCreateDocumentPublishRequestDto = {
		/** 审批人Code */
		approverCode: string;
		/** 审批人姓名 */
		approverName: string;
		/** 发布标题 */
		title: string;
		/** 发布说明 */
		description?: string;
		/** 备注 */
		remark?: string;
		/** 发布明细列表 */
		items?: BurnAbpPdmDocumentManagementDocumentPublishRequestsCreateUpdateDocumentPublishRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsCreateUpdateDocumentPublishRequestItemDto = {
		/** 文档ID */
		documentId: string;
		/** 文档编码 */
		documentNumber: string;
		/** 文档名称 */
		documentName: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId: string;
		/** 文档类型名称 */
		documentTypeName: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto = {
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
		/** 申请单号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 申请时间 */
		applicationTime?: string;
		/** 审批人Code */
		approverCode?: string;
		/** 审批人姓名 */
		approverName?: string;
		/** 发布标题 */
		title?: string;
		/** 发布说明 */
		description?: string;
		/** 备注 */
		remark?: string;
		status?: BurnAbpPdmDocumentManagementPublishRequestStatus;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		/** 发布明细列表 */
		items?: BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestItemDetailDto = {
		id?: string;
		/** 申请单ID */
		requestId?: string;
		/** 申请单号 */
		requestNumber?: string;
		/** 申请人ID */
		applicantId?: string;
		/** 申请人姓名 */
		applicantName?: string;
		/** 申请时间 */
		applicationTime?: string;
		/** 审批人Code */
		approverCode?: string;
		/** 审批人姓名 */
		approverName?: string;
		/** 发布标题 */
		title?: string;
		/** 发布说明 */
		description?: string;
		/** 备注 */
		remark?: string;
		status?: BurnAbpPdmDocumentManagementPublishRequestStatus;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 最后修改人ID */
		lastModifierId?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestItemDto = {
		/** ID */
		id?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档版本 */
		documentVersion?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 文件名称 */
		fileName?: string;
		/** 物料编码 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 图号 */
		drawingNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsExecuteDocumentPublishRequestWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementDocumentPublishRequestsUpdateDocumentPublishRequestDto = {
		/** 发布标题 */
		title: string;
		/** 发布说明 */
		description?: string;
		/** 备注 */
		remark?: string;
		/** 发布明细列表 */
		items?: BurnAbpPdmDocumentManagementDocumentPublishRequestsCreateUpdateDocumentPublishRequestItemDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentPublishState = 0 | 1 | 2;

	type BurnAbpPdmDocumentManagementDocumentReleasesConfirmDocumentInput = {
		/** 确认备注 */
		confirmNote?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesCreateDocumentReleaseDto = {
		/** 发文号（可选，若不传则自动生成） */
		releaseNumber?: string;
		/** 发放标题 */
		title: string;
		/** 发放说明 */
		description?: string;
		/** 审批人Code */
		approverCode: string;
		/** 审批人姓名 */
		approverName: string;
		/** 发放的文档列表 */
		documents?: BurnAbpPdmDocumentManagementDocumentReleasesCreateUpdateReleaseDocumentItemDto[];
		/** 接收人列表 */
		recipients?: BurnAbpPdmDocumentManagementDocumentReleasesReleaseRecipientInput[];
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesCreateUpdateReleaseDocumentItemDto = {
		/** 文档版本ID */
		documentVersionId: string;
		/** 文档编号（冗余，用于显示） */
		documentNumber: string;
		/** 文档名称（冗余，用于显示） */
		documentName: string;
		/** 份数 */
		copies: number;
		/** 是否首发 */
		isFirstRelease?: boolean;
		/** 发放版本号 */
		releaseVersion: string;
		/** 回收版本号（首发时可以为空） */
		recallVersion?: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 是否需要确认 */
		requiresConfirmation?: boolean;
		/** 不回收对象（用户快照） */
		nonRecallUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 预计回收时间 */
		expectedRecallDate?: string;
		/** 备注 */
		remarks?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseConfirmationRecordDto = {
		id?: string;
		/** 所属发放单ID */
		documentReleaseId?: string;
		/** 发放文档项ID */
		releaseDocumentItemId?: string;
		/** 接收人ID */
		recipientId?: string;
		/** 接收人姓名 */
		recipientName?: string;
		/** 接收人部门/班组名称 */
		departmentName?: string;
		/** 文档编号 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		confirmationStatus?: BurnAbpPdmDocumentManagementRecipientConfirmationStatus;
		/** 确认时间 */
		confirmedAt?: string;
		/** 确认备注 */
		confirmNote?: string;
		/** 拒绝时间 */
		rejectedAt?: string;
		/** 拒绝原因 */
		rejectionReason?: string;
		/** 发文文号（来自发放单） */
		releaseNumber?: string;
		/** 发放说明/描述（来自发放单） */
		description?: string;
		/** 份数 */
		copies?: number;
		/** 是否首发 */
		isFirstRelease?: boolean;
		/** 发放版本号 */
		releaseVersion?: string;
		/** 回收版本号 */
		recallVersion?: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 失效日期 */
		expiredDate?: string;
		/** 备注 */
		remarks?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 创建人姓名 */
		creatorName?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 最后修改人ID */
		lastModifierId?: string;
		/** 最后修改人姓名 */
		lastModifierName?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDailySummaryDto = {
		/** 发放文档项ID */
		id?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 发放版本 */
		releaseVersion?: string;
		/** 首发 */
		isFirstRelease?: boolean;
		/** 回收版本 */
		recallVersion?: string;
		/** 文件份数 */
		copies?: number;
		/** 备注 */
		remarks?: string;
		/** 发放单ID（用于关联查询） */
		documentReleaseId?: string;
		/** 发文号 */
		releaseNumber?: string;
		/** 发放时间 */
		releasedAt?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto = {
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
		/** 发文号 */
		releaseNumber?: string;
		/** 发放标题 */
		title?: string;
		/** 发放说明 */
		description?: string;
		/** 审批人Code */
		approverCode?: string;
		/** 审批人姓名 */
		approverName?: string;
		status?: BurnAbpPdmDocumentManagementDocumentReleaseStatus;
		/** 审批通过时间 */
		approvedAt?: string;
		/** 实际发放时间 */
		releasedAt?: string;
		/** 关闭时间 */
		closedAt?: string;
		/** 发放的文档列表 */
		documents?: BurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemDto[];
		/** 接收人列表 */
		recipients?: BurnAbpPdmDocumentManagementDocumentReleasesReleaseRecipientDto[];
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesExecuteDocumentReleaseWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesRejectDocumentInput = {
		/** 拒绝原因（必填） */
		rejectionReason: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemDto = {
		/** ID */
		id?: string;
		/** 文档版本ID */
		documentVersionId?: string;
		/** 文档编号（冗余） */
		documentNumber?: string;
		/** 文档名称（冗余） */
		documentName?: string;
		/** 份数 */
		copies?: number;
		/** 是否首发 */
		isFirstRelease?: boolean;
		/** 发放版本号 */
		releaseVersion?: string;
		/** 回收版本号 */
		recallVersion?: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 是否需要确认 */
		requiresConfirmation?: boolean;
		/** 不回收对象（用户快照） */
		nonRecallUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 预计回收时间 */
		expectedRecallDate?: string;
		/** 备注 */
		remarks?: string;
		/** 是否已回收 */
		isRecalled?: boolean;
		recallStatus?: BurnAbpPdmDocumentManagementRecallStatus;
		/** 实际回收日期 */
		actualRecallDate?: string;
		/** 回收备注 */
		recallNote?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemListDto = {
		/** ID */
		id?: string;
		/** 鎵€灞炲彂鏀惧崟ID */
		documentReleaseId?: string;
		/** 鍙戞枃鍙凤紙鏉ヨ嚜DocumentRelease锛? */
		releaseNumber?: string;
		/** 鍙戞斁鏍囬锛堟潵鑷狣ocumentRelease锛? */
		releaseTitle?: string;
		releaseStatus?: BurnAbpPdmDocumentManagementDocumentReleaseStatus;
		/** 标题 */
		title?: string;
		/** 说明 */
		description?: string;
		/** 审批人Code */
		approverCode?: string;
		status?: BurnAbpPdmDocumentManagementDocumentReleaseStatus;
		/** 审批通过时间 */
		approvedAt?: string;
		/** 关闭时间 */
		closedAt?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 最后修改人ID */
		lastModifierId?: string;
		/** 瀹℃壒浜哄鍚嶏紙鏉ヨ嚜DocumentRelease锛? */
		approverName?: string;
		/** 瀹為檯鍙戞斁鏃堕棿锛堟潵鑷狣ocumentRelease锛? */
		releasedAt?: string;
		/** 鏂囨。鐗堟湰ID */
		documentVersionId?: string;
		/** 鏂囨。缂栧彿 */
		documentNumber?: string;
		/** 鏂囨。鍚嶇О */
		documentName?: string;
		/** 浠芥暟 */
		copies?: number;
		/** 鏄惁棣栧彂 */
		isFirstRelease?: boolean;
		/** 鍙戞斁鐗堟湰鍙? */
		releaseVersion?: string;
		/** 鍥炴敹鐗堟湰鍙? */
		recallVersion?: string;
		/** 鐢熸晥鏃ユ湡 */
		effectiveDate?: string;
		/** 鏄惁闇€瑕佺‘璁? */
		requiresConfirmation?: boolean;
		/** 棰勮鍥炴敹鏃堕棿 */
		expectedRecallDate?: string;
		/** 澶囨敞 */
		remarks?: string;
		/** 鏄惁宸插洖鏀? */
		isRecalled?: boolean;
		recallStatus?: BurnAbpPdmDocumentManagementRecallStatus;
		/** 瀹為檯鍥炴敹鏃ユ湡 */
		actualRecallDate?: string;
		/** 鍥炴敹澶囨敞 */
		recallNote?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesReleaseRecipientDto = {
		/** ID */
		id?: string;
		/** 接收人ID（用户ID） */
		recipientId?: string;
		/** 接收人姓名 */
		recipientName?: string;
		/** 接收部门ID */
		departmentId?: string;
		/** 接收部门名称 */
		departmentName?: string;
		confirmationStatus?: BurnAbpPdmDocumentManagementRecipientConfirmationStatus;
		/** 确认时间 */
		confirmedAt?: string;
		/** 确认备注 */
		confirmNote?: string;
		/** 拒绝原因 */
		rejectReason?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleasesReleaseRecipientInput = {
		/** 接收人ID（用户ID） */
		recipientId: string;
		/** 接收人姓名 */
		recipientName: string;
		/** 接收部门ID */
		departmentId?: string;
		/** 接收部门名称 */
		departmentName?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentReleaseStatus = 0 | 10 | 15 | 20 | 30 | 40 | 50 | 60 | 99;

	type BurnAbpPdmDocumentManagementDocumentReleasesUpdateDocumentReleaseDto = {
		/** 发放标题 */
		title: string;
		/** 发放说明 */
		description?: string;
		/** 审批人Code */
		approverCode: string;
		/** 审批人姓名 */
		approverName: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsAddFileToRevisionInput = {
		/** 临时文件上传ID（通过 TempFileUpload 上传后获得） */
		uploadId: string;
		fileRole: BurnAbpPdmDocumentManagementDocumentFileRole;
	};

	type BurnAbpPdmDocumentManagementDocumentsApproveDocumentRevisionInput = {
		revisionId?: string;
		approvalComment?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentInput = {
		/** 要创建的文档列表 */
		documents: BurnAbpPdmDocumentManagementDocumentsCreateDocumentDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentResult = {
		/** 是否全部创建成功 */
		isSuccess?: boolean;
		/** 成功创建的文档列表（仅在 IsSuccess=true 时有值） */
		documents?: BurnAbpPdmDocumentManagementDocumentsDocumentDto[];
		/** 验证/创建错误列表（仅在 IsSuccess=false 时有值） */
		errors?: BurnAbpPdmDocumentManagementDocumentsDocumentCreationError[];
	};

	type BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentsAndLinkPartsInput = {
		/** 物料关联配置集合（每个物料可以单独设置用途和主要关联） */
		partLinkConfigs: BurnAbpPdmDocumentManagementDocumentsPartLinkConfig[];
		/** 要创建的文档集合 */
		documents: BurnAbpPdmDocumentManagementDocumentsCreateDocumentDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentsAndLinkPartsResult = {
		/** 是否全部成功 */
		isSuccess?: boolean;
		/** 总物料数量 */
		totalParts?: number;
		/** 创建的文档数量 */
		createdDocumentsCount?: number;
		/** 创建的关联数量 */
		createdLinksCount?: number;
		/** 创建的文档列表 */
		createdDocuments?: BurnAbpPdmDocumentManagementDocumentsDocumentDto[];
		/** 创建的物料-文档关联列表 */
		createdLinks?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto[];
		/** 错误详情 */
		errors?: string[];
	};

	type BurnAbpPdmDocumentManagementDocumentsCADMetadataDto = {
		cadSystem?: BurnAbpPdmDocumentManagementCADSystemType;
		cadVersion?: string;
		customProperties?: Record<string, any>;
	};

	type BurnAbpPdmDocumentManagementDocumentsCheckOutInfoDto = {
		checkedOutUserId?: string;
		checkedOutUserName?: string;
		checkedOutTime?: string;
		checkOutComment?: string;
		expireAt?: string;
		forceUnlockReason?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsCompareStatisticsDto = {
		totalChanges?: number;
		metadataChanges?: number;
		filesAdded?: number;
		filesRemoved?: number;
		filesModified?: number;
		filesUnchanged?: number;
	};

	type BurnAbpPdmDocumentManagementDocumentsCreateDocumentDto = {
		documentNumber: string;
		documentName: string;
		documentTypeId: string;
		storageLibraryId: string;
		/** 回收库ID（可选，文档作废时将移入此回收库） */
		recycleLibraryId?: string;
		securityLevel?: BurnAbpPdmDocumentManagementSecurityLevel;
		description?: string;
		/** 关键词 */
		keywords?: string;
		/** 允许编码不一致（允许上传文件名与主物料编码或文档类型不一致）
默认为 false */
		allowCodeInconsistency?: boolean;
		/** 临时文件上传信息列表
包含文件角色(主文档/次要文档) */
		tempFileUploads?: BurnAbpPdmDocumentManagementDocumentsTempFileUploadInfoDto[];
		/** 物料关联信息列表(可选)
表示其他物料借用/引用该文档 */
		partLinks?: BurnAbpPdmDocumentManagementDocumentsCreatePartDocumentLinkDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentsCreateDocumentRevisionInput = {
		/** true 表示晋升主版本号（A→B），false 表示在当前主版本下增加次修订 */
		promoteMajorVersion?: boolean;
	};

	type BurnAbpPdmDocumentManagementDocumentsCreatePartDocumentLinkDto = {
		partCode: string;
		usage: BurnAbpPdmPartManagementEnumsRelationUsage;
		isPrimary?: boolean;
		/** 图号 */
		drawingNumber?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentAuditLogDto = {
		id?: string;
		documentId?: string;
		documentNumber?: string;
		documentVersionId?: string;
		documentRevisionId?: string;
		fileId?: string;
		operationType?: BurnAbpPdmDocumentManagementDocumentOperationType;
		operationTypeName?: string;
		operatorId?: string;
		operatorName?: string;
		creationTime?: string;
		clientIpAddress?: string;
		userAgent?: string;
		correlationId?: string;
		details?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentConsistencyCheckInputDto = {
		/** 最大处理文档数量（用于限流，避免一次性治理过大导致超时） */
		maxDocuments?: number;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentConsistencyIssueDto = {
		documentId?: string;
		/** 问题类型（字符串化，避免 Contracts 直接依赖 Domain 枚举） */
		type?: string;
		currentRevisionIds?: string[];
		selectedRevisionId?: string;
		message?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentCreationError = {
		/** 错误发生的文档索引位置（基于输入列表，从 0 开始） */
		index?: number;
		/** 文档编号（如果已提供） */
		documentNumber?: string;
		/** 错误代码 */
		errorCode?: string;
		/** 错误消息 */
		errorMessage?: string;
		/** 错误详情（可选） */
		errorData?: Record<string, any>;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentDto = {
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
		documentNumber?: string;
		documentName?: string;
		authorUserId?: string;
		authorUserName?: string;
		authorDisplayName?: string;
		version?: string;
		revision?: string;
		documentTypeId?: string;
		documentTypeName?: string;
		/** 存储库ID */
		storageLibraryId?: string;
		/** 存储库名称 */
		storageLibraryName?: string;
		/** 回收库ID */
		recycleLibraryId?: string;
		/** 回收库名称 */
		recycleLibraryName?: string;
		securityLevel?: BurnAbpPdmDocumentManagementSecurityLevel;
		description?: string;
		keywords?: string;
		/** 允许编码不一致（允许上传文件名与主物料编码或文档类型不一致） */
		allowCodeInconsistency?: boolean;
		/** 作废原因 */
		obsoleteReason?: string;
		/** 作废时间 */
		obsoleteTime?: string;
		/** 来源归档单据ID（如果该文档是从DocumentArchive审批通过后自动创建的） */
		sourceArchiveId?: string;
		publishState?: BurnAbpPdmDocumentManagementDocumentPublishState;
		currentRevisionState?: BurnAbpPdmDocumentManagementDocumentState;
		/** 当前修订 ID（指针字段） */
		currentRevisionId?: string;
		/** 最新发布版本 ID（指针字段） */
		latestVersionId?: string;
		isCheckedOut?: boolean;
		checkOutInfo?: BurnAbpPdmDocumentManagementDocumentsCheckOutInfoDto;
		cadMetadata?: BurnAbpPdmDocumentManagementDocumentsCADMetadataDto;
		conversionStatistics?: BurnAbpPdmDocumentManagementConversionsDocumentConversionStatisticsDto;
		/** 最新的转换任务列表（最多返回最近5个） */
		recentConversions?: BurnAbpPdmDocumentManagementConversionsDocumentConversionSummaryDto[];
		/** 物料-文档关联集合 */
		partDocumentLinks?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto[];
		primaryPartLink?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentFileDto = {
		id?: string;
		fileName?: string;
		blobName?: string;
		fileType?: BurnAbpPdmDocumentManagementFileType;
		fileRole?: BurnAbpPdmDocumentManagementDocumentFileRole;
		fileSize?: number;
		fileExtension?: string;
		mimeType?: string;
		creationTime?: string;
		/** 所属修订 ID，便于区分工作副本/历史副本 */
		documentRevisionId?: string;
		/** 来源文件ID（用于表达派生关系，如轻量化包来自某个原始文件） */
		sourceDocumentFileId?: string;
		conversion?: BurnAbpPdmDocumentManagementConversionsDocumentConversionSummaryDto;
		currentConversionStatus?: BurnAbpPdmDocumentManagementConversionsConversionStatus;
		/** 轻量化预览是否已就绪（通常表示同一修订/版本下已生成并写入轻量化包文件） */
		lightweightReady?: boolean;
		/** 轻量化包文件ID（工作区：DocumentFileId；已发布版本：可能为空） */
		lightweightFileId?: string;
		/** 轻量化包 BlobName（用于前端展示预览按钮并拉流） */
		lightweightBlobName?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentFilePreviewInfoDto = {
		/** 文档ID */
		documentId?: string;
		/** 文件ID（可能来自工作区 DocumentFile，或版本快照 DocumentVersionFile） */
		fileId?: string;
		/** 文件名 */
		fileName?: string;
		fileType?: BurnAbpPdmDocumentManagementFileType;
		/** 源原始文件ID（用于前端触发转换/重新转换；发布版本场景下等同于 SourceDocumentFileId） */
		sourceOriginalFileId?: string;
		/** 预览范围：Revision（工作区修订）或 Version（已发布版本快照） */
		scope?: string;
		drawingType?: BurnAbpPdmDocumentManagementConversionsDrawingType;
		/** 预览模式：
- ConversionFiles：基于 conversion-files 静态资源（适合 glTF/glb 等多文件加载）
- DirectFile：直接下载当前文件（适合 PDF/图片/zip）
- Unsupported：暂无可用预览 */
		mode?: string;
		/** 当 Mode=DirectFile 时，前端可用 DownloadFileAsync 获取文件流并创建 blob URL 进行渲染/下载 */
		useDownloadApi?: boolean;
		/** 当 Mode=ConversionFiles 时，转换任务ID */
		conversionId?: string;
		/** 当 Mode=ConversionFiles 时，静态资源根地址（以 / 结尾）
示例：/api/pdm/conversion-files/{conversionId}/ */
		resourceBaseUrl?: string;
		/** 当 Mode=ConversionFiles 时，入口文件的完整 URL（便于三方 Loader 直接加载）
示例：/api/pdm/conversion-files/{conversionId}/0/model.gltf */
		entryUrl?: string;
		/** 当 Mode=ConversionFiles 时，入口文件相对路径（供 Viewer 加载）
示例：0/model.gltf 或 model.glb 或 preview.html */
		entryFilePath?: string;
		/** 当 Mode=ConversionFiles 时，可选的资源清单（相对路径） */
		resources?: BurnAbpPdmDocumentManagementDocumentsDocumentFilePreviewResourceDto[];
		conversionStatus?: BurnAbpPdmDocumentManagementConversionsConversionStatus;
		/** 进度（若存在转换任务） */
		progressPercentage?: number;
		/** 错误信息（若存在转换任务） */
		errorMessage?: string;
		/** 是否允许强制重新转换（用于“转换失败/产物丢失修复”按钮；你选择的 A：不自动触发，仅返回按钮所需信息） */
		canForceReconvert?: boolean;
		/** 强制重新转换原因码（便于前端展示不同文案/埋点）
- Failed：转换失败
- MissingArtifacts：转换完成但产物缺失（或转换记录缺失）
- NoConversion：未生成过预览 */
		forceReconvertReason?: string;
		/** 附加提示（例如“未生成预览，请触发转换”） */
		message?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentFilePreviewResourceDto = {
		/** 相对路径（配合 ResourceBaseUrl 拼接访问） */
		filePath?: string;
		/** 文件扩展名（如 .gltf/.glb/.bin/.png） */
		fileType?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentRevisionDto = {
		id?: string;
		/** 所属文档ID */
		documentId?: string;
		/** 工作名称（修订期间可修改） */
		documentName?: string;
		/** 工作描述（修订期间可修改） */
		description?: string;
		/** 工作关键词（修订期间可修改） */
		keywords?: string;
		securityLevel?: BurnAbpPdmDocumentManagementSecurityLevel;
		/** 主版本号 */
		majorVersion?: string;
		/** 次修订号 */
		minorRevision?: string;
		/** 完整版本号（如 A.1） */
		fullVersion?: string;
		/** 变更描述 */
		changeDescription?: string;
		state?: BurnAbpPdmDocumentManagementDocumentState;
		changeRequestId?: string;
		approvalRoute?: string;
		approvalComment?: string;
		approvedBy?: string;
		approverName?: string;
		approvedTime?: string;
		creationTime?: string;
		workingFiles?: BurnAbpPdmDocumentManagementDocumentsDocumentFileDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentVersionCompareResultDto = {
		sourceVersionId?: string;
		targetVersionId?: string;
		sourceVersion?: string;
		targetVersion?: string;
		metadataChanges?: BurnAbpPdmDocumentManagementDocumentsFieldDiffDto[];
		fileChanges?: BurnAbpPdmDocumentManagementDocumentsFileCompareResultDto;
		statistics?: BurnAbpPdmDocumentManagementDocumentsCompareStatisticsDto;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentVersionDto = {
		id?: string;
		version?: string;
		revision?: string;
		fullVersion?: string;
		changeDescription?: string;
		creationTime?: string;
		publishStatus?: BurnAbpPdmDocumentManagementDocumentVersionPublishStatus;
		/** 作废时间（UTC） */
		voidedAt?: string;
		/** 作废人ID */
		voidedBy?: string;
		/** 作废原因（可空） */
		voidReason?: string;
		files?: BurnAbpPdmDocumentManagementDocumentsDocumentVersionFileDto[];
		/** 文档ID（所属文档） */
		documentId?: string;
		/** 文档编号 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 描述信息（版本快照） */
		description?: string;
		/** 关键词（版本快照） */
		keywords?: string;
		securityLevel?: BurnAbpPdmDocumentManagementSecurityLevel;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		publishState?: BurnAbpPdmDocumentManagementDocumentPublishState;
	};

	type BurnAbpPdmDocumentManagementDocumentsDocumentVersionFileDto = {
		id?: string;
		sourceDocumentFileId?: string;
		fileName?: string;
		blobName?: string;
		fileType?: BurnAbpPdmDocumentManagementFileType;
		fileRole?: BurnAbpPdmDocumentManagementDocumentFileRole;
		fileSize?: number;
		fileExtension?: string;
		mimeType?: string;
		creationTime?: string;
		conversion?: BurnAbpPdmDocumentManagementConversionsDocumentConversionSummaryDto;
		currentConversionStatus?: BurnAbpPdmDocumentManagementConversionsConversionStatus;
		/** 轻量化预览是否已就绪（通常表示该版本下存在与此源文件关联的轻量化包文件） */
		lightweightReady?: boolean;
		/** 轻量化包版本文件ID（DocumentVersionFileId） */
		lightweightVersionFileId?: string;
		/** 轻量化包 BlobName（用于前端展示预览按钮并拉流） */
		lightweightBlobName?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput = {
		/** 文件名 */
		fileName?: string;
		/** 内容类型 */
		contentType?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsFieldChangeType = 0 | 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementDocumentsFieldDiffDto = {
		fieldName?: string;
		displayName?: string;
		category?: string;
		changeType?: BurnAbpPdmDocumentManagementDocumentsFieldChangeType;
		oldValue?: string;
		newValue?: string;
		isCritical?: boolean;
	};

	type BurnAbpPdmDocumentManagementDocumentsFileChangeDto = {
		fileId?: string;
		fileName?: string;
		fileSize?: number;
		fileType?: BurnAbpPdmDocumentManagementFileType;
	};

	type BurnAbpPdmDocumentManagementDocumentsFileCompareResultDto = {
		added?: BurnAbpPdmDocumentManagementDocumentsFileChangeDto[];
		removed?: BurnAbpPdmDocumentManagementDocumentsFileChangeDto[];
		modified?: BurnAbpPdmDocumentManagementDocumentsFileChangeDto[];
		unchanged?: BurnAbpPdmDocumentManagementDocumentsFileChangeDto[];
	};

	type BurnAbpPdmDocumentManagementDocumentsPartLinkConfig = {
		/** 物料编号 */
		partNumber: string;
		/** 图号 */
		drawingNumber?: string;
		usage: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 是否设置为主要关联（默认 false） */
		isPrimary?: boolean;
	};

	type BurnAbpPdmDocumentManagementDocumentsSubmitDocumentRevisionInput = {
		revisionId?: string;
		changeRequestId?: string;
		approvalRoute?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentState = 0 | 1 | 2 | 3 | 4 | 5;

	type BurnAbpPdmDocumentManagementDocumentsTempFileUploadInfoDto = {
		uploadId: string;
		fileRole?: BurnAbpPdmDocumentManagementDocumentFileRole;
	};

	type BurnAbpPdmDocumentManagementDocumentsUpdateDocumentDto = {
		documentName?: string;
		description?: string;
		keywords?: string;
		/** 允许编码不一致（允许上传文件名与主物料编码或文档类型不一致） */
		allowCodeInconsistency?: boolean;
		/** 作废原因 */
		obsoleteReason?: string;
		/** 作废时间 */
		obsoleteTime?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentsUpdateWorkingDocumentInput = {
		/** 文档名称 */
		documentName: string;
		/** 描述信息 */
		description?: string;
		/** 关键词 */
		keywords?: string;
		securityLevel?: BurnAbpPdmDocumentManagementSecurityLevel;
		/** 变更说明（记录本次修订的变更内容） */
		changeDescription?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentTypesCreateDocumentTypeDto = {
		/** 类型代码 */
		typeCode: string;
		/** 类型名称 */
		typeName: string;
		/** 支持的文件扩展名 */
		fileExtensions?: string;
		/** 描述 */
		description?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto = {
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
		/** 类型代码 */
		typeCode?: string;
		/** 类型名称 */
		typeName?: string;
		/** 支持的文件扩展名 */
		fileExtensions?: string;
		/** 描述 */
		description?: string;
		/** 是否激活 */
		isActive?: boolean;
		/** 排序序号 */
		sortOrder?: number;
		defaultPartLinkUsage?: BurnAbpPdmPartManagementEnumsRelationUsage;
	};

	type BurnAbpPdmDocumentManagementDocumentTypesUpdateDocumentTypeDto = {
		/** 类型名称 */
		typeName: string;
		/** 支持的文件扩展名 */
		fileExtensions?: string;
		/** 描述 */
		description?: string;
	};

	type BurnAbpPdmDocumentManagementDocumentVersionPublishStatus = 0 | 1 | 2;

	type BurnAbpPdmDocumentManagementEngineeringFileNotificationsCreateEngineeringFileNotificationDto = {
		/** 更改单号 */
		number?: string;
		/** 产品编码 */
		partNo?: string;
		/** 产品名称 */
		partName?: string;
		/** 是否更改版本 */
		changeVersion?: boolean;
		/** 文件名称 */
		docName?: string;
		/** 版本 */
		docVersion?: string;
		/** 页码 */
		changePage?: string;
		/** 提交人意见 */
		note?: string;
		/** BlobName */
		blobName?: string;
		/** 描述 */
		description?: string;
		/** 图纸类型 */
		category?: string;
		/** 图纸路径 */
		categoryPath?: string;
		/** 过期路径 */
		expirationPath?: string;
		/** 图纸单号 */
		docNo?: string;
		/** 目标文档ID（优化/变更归档时用于命中目标文档） */
		targetDocumentId?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId?: string;
		archiveType?: BurnAbpPdmDocumentManagementArchiveType;
		/** 修订内容 */
		modifyContent?: string;
		/** 华为单据号 */
		hwOrderNumber?: string;
		/** 工艺审批人编码 */
		auditCraftUserCode?: string;
		/** 工艺审批人名称 */
		auditCraftUserName?: string;
		workflowId?: string;
		version?: number;
		candidateNotifyUsers?: string[];
		nextAssignment?: string;
		outcomeValue?: string;
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
		orderStatus?: BurnAbpPdmDocumentManagementDocumentChangeOrderStatus;
		executeInput?: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
		assigneeId?: string;
		status?: VoloAbpElsaAbstractEntitiesWorkflowStatusEnum;
	};

	type BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto = {
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
		/** 更改单号 */
		number?: string;
		/** 产品编码 */
		partNo?: string;
		/** 产品名称 */
		partName?: string;
		/** 是否更改版本 */
		changeVersion?: boolean;
		/** 文件名称 */
		docName?: string;
		/** 版本 */
		docVersion?: string;
		/** 页码 */
		changePage?: string;
		archiveType?: BurnAbpPdmDocumentManagementArchiveType;
		/** 修订内容 */
		modifyContent?: string;
		/** 华为单据号 */
		hwOrderNumber?: string;
		/** 提交人意见 */
		note?: string;
		/** BlobName */
		blobName?: string;
		/** 图纸类型 */
		category?: string;
		/** 图纸路径 */
		categoryPath?: string;
		/** 过期路径 */
		expirationPath?: string;
		/** 图纸单号 */
		docNo?: string;
		/** 目标文档ID（优化/变更归档时用于命中目标文档） */
		targetDocumentId?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 存储库ID */
		storageLibraryId?: string;
		/** 回收库ID */
		recycleLibraryId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 描述 */
		description?: string;
		orderStatus?: BurnAbpPdmDocumentManagementDocumentChangeOrderStatus;
		workflowDefinitionId?: string;
		workflowVersion?: number;
		workflowInstanceId?: string;
		workflowName?: string;
		activityId?: string;
		activityName?: string;
		activityDisplayName?: string;
		activityDescription?: string;
		assigneeId?: string;
		assigneeName?: string;
		assigneeTime?: string;
		status?: VoloAbpElsaAbstractEntitiesWorkflowStatusEnum;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工艺审批人编码 */
		auditCraftUserCode?: string;
		/** 工艺审批人 */
		auditCraftUserName?: string;
		/** 工艺审批意见 */
		auditCraftReason?: string;
		/** 车间主任编码 */
		auditWorkShopUserCode?: string;
		/** 车间主任 */
		auditWorkShopUserName?: string;
		/** 车间主任审批意见 */
		auditWorkShopReason?: string;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmDocumentManagementEngineeringFileNotificationsExecuteEngineeringFileNotificationDto = {
		id?: string;
		number?: string;
		partNo?: string;
		changeVersion?: boolean;
		docName?: string;
		docVersion?: string;
		changePage?: string;
		note?: string;
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId?: string;
		archiveType?: number;
		modifyContent?: string;
		hwOrderNumber?: string;
		category?: string;
		categoryPath?: string;
		expirationPath?: string;
		docNo?: string;
		docType?: string;
		description?: string;
		blobName?: string;
		eventKey?: string;
		outcomeValue?: string;
		comment?: string;
		nextAssignment?: string;
		candidateNotifyUsers?: string[];
		direction?: number;
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
		executeInput?: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementEngineeringFileNotificationsExecuteEngineeringFileNotificationWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
		/** 存储库ID */
		storageLibraryId?: string;
		/** 回收库ID */
		recycleLibraryId?: string;
		/** 车间主任审批人编码（工艺审批人选择） */
		auditWorkShopUserCode?: string;
		/** 车间主任审批人名称 */
		auditWorkShopUserName?: string;
		/** 工艺审批意见 */
		auditCraftReason?: string;
		/** 车间主任审批意见 */
		auditWorkShopReason?: string;
	};

	type BurnAbpPdmDocumentManagementEngineeringFileNotificationsUpdateEngineeringFileNotificationDto = {
		id?: string;
		/** 更改单号 */
		number?: string;
		/** 产品编码 */
		partNo?: string;
		/** 产品名称 */
		partName?: string;
		/** 是否更改版本 */
		changeVersion?: boolean;
		/** 文件名称 */
		docName?: string;
		/** 版本 */
		docVersion?: string;
		/** 页码 */
		changePage?: string;
		/** 归档类型 */
		archiveType?: number;
		/** 修改内容 */
		modifyContent?: string;
		/** 华为单据号 */
		hwOrderNumber?: string;
		/** 提交人意见 */
		note?: string;
		/** BlobName（仅显示用，实际由上传逻辑维护） */
		blobName?: string;
		/** 图纸类型 */
		category?: string;
		/** 图纸路径 */
		categoryPath?: string;
		/** 过期路径 */
		expirationPath?: string;
		/** 图纸单号 */
		docNo?: string;
		/** 目标文档ID（优化/变更归档时用于命中目标文档） */
		targetDocumentId?: string;
		/** 文档类型编码（前端通常通过类型选择器维护） */
		docType?: string;
		/** 文档类型 ID */
		documentTypeId?: string;
		/** 描述 */
		description?: string;
		/** 新上传附件的 UploadId（来自 TempFileUploadAppService） */
		uploadId?: string;
	};

	type BurnAbpPdmDocumentManagementFileType = 0 | 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersCreatePartDocumentChangeOrderDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		number?: string;
		partNo?: string;
		productLine?: string;
		allowDifferent?: boolean;
		orderType?: string;
		outsideAttribute?: string;
		customerChangeNo?: string;
		fileCategory?: number;
		docNo?: string;
		documentTypeId?: string;
		docName?: string;
		docVersion?: string;
		category?: string;
		categoryPath?: string;
		expirationPath?: string;
		blobName?: string;
		changeRemark?: string;
		effectiveDate?: string;
		engineId?: string;
		engineer?: string;
		engineerInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersEngineerInfoDto;
		planInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPlanInfoDto;
		materielQuantity?: number;
		materielPurchasePeriod?: number;
		inTransitQuantity?: number;
		newMaterielPurchasePeriod?: number;
		orderStatus?: BurnAbpPdmDocumentManagementDocumentChangeOrderStatus;
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderItemDto[];
		temporaryNotes?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderTemporaryNoteDto[];
		implementItems?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderImplementItemDto[];
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId?: string;
		/** 工程审批人编码 */
		auditEngineeringUserCode?: string;
		/** 工程审批人名称 */
		auditEngineeringUserName?: string;
		workflowId?: string;
		version?: number;
		candidateNotifyUsers?: string[];
		nextAssignment?: string;
		outcomeValue?: string;
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
		status?: VoloAbpElsaAbstractEntitiesWorkflowStatusEnum;
		executeInput?: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
		assigneeId?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersEngineerInfoDto = {
		changeType?: string;
		switchType?: string;
		needRetry?: boolean;
		existDifferent?: boolean;
		processMateriel?: string;
		warehouseMateriel?: string;
		contractMateriel?: string;
		contractWithOutMateriel?: string;
		processProduct?: string;
		warehouseProduct?: string;
		contractWithOutProduct?: string;
		engineerComment?: string;
		isUnderstand?: boolean;
		needChangeDoc?: boolean;
		changeERP?: boolean;
		isRequestHWPCN?: boolean;
		pcnFeedback?: string;
		pcnLastFeedback?: string;
		pcnAttachment?: string;
		pcnAttachmentName?: string;
		pcnBlobName?: string;
		/** PCN 附件上传 Id（临时文件，用于执行阶段替换附件） */
		pcnUploadId?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersExecutePartDocumentChangeOrderDto = {
		id?: string;
		eventKey?: string;
		outcomeValue?: string;
		comment?: string;
		nextAssignment?: string;
		candidateNotifyUsers?: string[];
		direction?: number;
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
		executeInput?: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
		partNo?: string;
		productLine?: string;
		orderType?: string;
		outsideAttribute?: string;
		customerChangeNo?: string;
		fileCategory?: number;
		docNo?: string;
		docType?: string;
		docVersion?: string;
		docName?: string;
		category?: string;
		categoryPath?: string;
		expirationPath?: string;
		blobName?: string;
		changeRemark?: string;
		effectiveDate?: string;
		assignDate?: string;
		engineId?: string;
		engineer?: string;
		engineerInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersEngineerInfoDto;
		planInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPlanInfoDto;
		materielQuantity?: number;
		materielPurchasePeriod?: number;
		inTransitQuantity?: number;
		newMaterielPurchasePeriod?: number;
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderItemDto[];
		temporaryNotes?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderTemporaryNoteDto[];
		implementItems?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderImplementItemDto[];
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersExecutePartDocumentChangeOrderWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
		auditEngineeringUserCode?: string;
		auditEngineeringUserName?: string;
		auditEngineeringReason?: string;
		auditMaterialUserCode?: string;
		auditMaterialUserName?: string;
		auditMaterialReason?: string;
		auditPurchaseUserCode?: string;
		auditPurchaseUserName?: string;
		auditPurchaseReason?: string;
		auditPlanUserCode?: string;
		auditPlanUserName?: string;
		auditPlanReason?: string;
		auditMarketplaceUserCode?: string;
		auditMarketplaceUserName?: string;
		auditMarketplaceReason?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDocumentLookupDto = {
		/** 文档ID */
		documentId?: string;
		/** 文档编码（DocumentNumber / DocNo） */
		docNo?: string;
		/** 文档名称（DocumentName） */
		docName?: string;
		/** 文档类型ID */
		documentTypeId?: string;
		/** 文档类型名称 */
		documentTypeName?: string;
		/** 失效路径（按需求：等于文档存储库 Path） */
		expirationPath?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto = {
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
		number?: string;
		partNo?: string;
		productLine?: string;
		outsideAttribute?: string;
		orderType?: string;
		customerChangeNo?: string;
		fileCategory?: number;
		docNo?: string;
		documentTypeId?: string;
		documentTypeName?: string;
		docVersion?: string;
		docName?: string;
		category?: string;
		categoryPath?: string;
		allowDifferent?: boolean;
		expirationPath?: string;
		blobName?: string;
		changeRemark?: string;
		effectiveDate?: string;
		assignDate?: string;
		engineId?: string;
		engineer?: string;
		engineerInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersEngineerInfoDto;
		planInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPlanInfoDto;
		materielQuantity?: number;
		materielPurchasePeriod?: number;
		inTransitQuantity?: number;
		newMaterielPurchasePeriod?: number;
		orderStatus?: BurnAbpPdmDocumentManagementDocumentChangeOrderStatus;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		status?: VoloAbpElsaAbstractEntitiesWorkflowStatusEnum;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		auditEngineeringUserCode?: string;
		auditEngineeringUserName?: string;
		auditEngineeringReason?: string;
		auditMaterialUserCode?: string;
		auditMaterialUserName?: string;
		auditMaterialReason?: string;
		auditPurchaseUserCode?: string;
		auditPurchaseUserName?: string;
		auditPurchaseReason?: string;
		auditPlanUserCode?: string;
		auditPlanUserName?: string;
		auditPlanReason?: string;
		auditMarketplaceUserCode?: string;
		auditMarketplaceUserName?: string;
		auditMarketplaceReason?: string;
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderItemDto[];
		temporaryNotes?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderTemporaryNoteDto[];
		implementItems?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderImplementItemDto[];
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderImplementItemDto = {
		id?: string;
		partDocumentChangeOrderId?: string;
		department?: string;
		content?: string;
		result?: string;
		signature?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderItemDto = {
		id?: string;
		changeOrderId?: string;
		docNo?: string;
		docType?: string;
		docName?: string;
		docVersion?: string;
		blobName?: string;
		isBorrow?: boolean;
		borrowDocNo?: string;
		fileName?: string;
		size?: number;
		miniType?: string;
		/** 上传 ID（来自 TempFileUploadAppService） */
		uploadId?: string;
		gdpFilePath?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderMaterialCodeLookupDto = {
		/** 物料编码 */
		materialCode?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderTemporaryNoteDto = {
		id?: string;
		partDocumentChangeOrderId?: string;
		name?: string;
		color?: string;
		remark?: string;
		note?: string;
		reference?: string;
		order?: number;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPlanInfoDto = {
		planAdjust?: boolean;
		temporaryRelease?: boolean;
		switchTime?: string;
		releaseOrderNumber?: string;
		orderHandle?: string;
	};

	type BurnAbpPdmDocumentManagementPartDocumentChangeOrdersUpdatePartDocumentChangeOrderDto = {
		id?: string;
		/** 更改单号 */
		number?: string;
		/** 物料编码 */
		partNo?: string;
		/** 产品线 */
		productLine?: string;
		/** 是否允许不同 */
		allowDifferent?: boolean;
		/** 订单类型 */
		orderType?: string;
		/** 外部属性 */
		outsideAttribute?: string;
		/** 客户变更单号 */
		customerChangeNo?: string;
		/** 文件类别 */
		fileCategory?: number;
		/** 文件号 */
		docNo?: string;
		/** 文档类型 Id */
		documentTypeId?: string;
		/** 文档名称 */
		docName?: string;
		/** 文档版本 */
		docVersion?: string;
		/** 图纸类型 */
		docType?: string;
		/** 图纸分类 */
		category?: string;
		/** 图纸路径 */
		categoryPath?: string;
		/** 过期路径 */
		expirationPath?: string;
		/** 主附件 BlobName（仅用于展示，实际由上传逻辑维护） */
		blobName?: string;
		/** 变更说明 */
		changeRemark?: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 引擎 Id */
		engineId?: string;
		/** 工程师 */
		engineer?: string;
		engineerInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersEngineerInfoDto;
		planInfo?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPlanInfoDto;
		/** 物料数量 */
		materielQuantity?: number;
		/** 物料采购周期 */
		materielPurchasePeriod?: number;
		/** 在途数量 */
		inTransitQuantity?: number;
		/** 新物料采购周期 */
		newMaterielPurchasePeriod?: number;
		/** 明细行 */
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderItemDto[];
		/** 临时注释 */
		temporaryNotes?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderTemporaryNoteDto[];
		/** 实施项 */
		implementItems?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderImplementItemDto[];
		/** 新上传主附件的 UploadId（来自 TempFileUploadAppService） */
		uploadId?: string;
	};

	type BurnAbpPdmDocumentManagementPublishRequestStatus = 0 | 10 | 15 | 20 | 30;

	type BurnAbpPdmDocumentManagementRecallStatus = 0 | 1 | 2;

	type BurnAbpPdmDocumentManagementRecipientConfirmationStatus = 0 | 10 | 20 | 30;

	type BurnAbpPdmDocumentManagementRecycleOrdersAddRecycleOrderItemDto = {
		/** 文档ID */
		documentId: string;
		/** 份数 */
		quantity: number;
		/** 回收版本 */
		recycleVersion: string;
		/** 不回收对象（用户快照）- 多选 */
		excludeUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 预计回收时间 */
		expectedRecycleTime?: string;
		/** 备注 */
		remarks?: string;
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersCreateDocumentRecycleOrderDto = {
		/** 审批人Code */
		approverCode: string;
		/** 审批人姓名 */
		approverName: string;
		/** 回收对象（用户快照）- 必填，多选 */
		recycleUsers: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 回收时间 - 必填 */
		recycleTime: string;
		/** 备注 */
		remarks?: string;
		/** 回收明细列表（创建回收单时可同时添加明细） */
		items?: BurnAbpPdmDocumentManagementRecycleOrdersAddRecycleOrderItemDto[];
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto = {
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
		/** 回收单编号 */
		recycleOrderNumber?: string;
		/** 回收对象（用户快照） */
		recycleUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 回收人用户ID */
		recycleUserId?: string;
		/** 回收人姓名 */
		recycleUserName?: string;
		/** 回收时间 */
		recycleTime?: string;
		status?: BurnAbpPdmDocumentManagementRecycleOrdersRecycleOrderStatus;
		/** 审批人Code */
		approverCode?: string;
		/** 审批人姓名 */
		approverName?: string;
		/** 备注 */
		remarks?: string;
		/** 回收明细列表 */
		items?: BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderItemDto[];
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderItemDetailDto = {
		id?: string;
		/** 回收单ID */
		recycleOrderId?: string;
		/** 回收单号 */
		recycleOrderNumber?: string;
		/** 回收对象列表 */
		recycleUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 回收人ID */
		recycleUserId?: string;
		/** 回收人名称 */
		recycleUserName?: string;
		/** 回收时间 */
		recycleTime?: string;
		status?: BurnAbpPdmDocumentManagementRecycleOrdersRecycleOrderStatus;
		/** 审批人Code */
		approverCode?: string;
		/** 审批人名称 */
		approverName?: string;
		/** 回收单备注 */
		orderRemarks?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 创建时间 */
		creationTime?: string;
		/** 创建人ID */
		creatorId?: string;
		/** 最后修改时间 */
		lastModificationTime?: string;
		/** 最后修改人ID */
		lastModifierId?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档描述 */
		documentDescription?: string;
		/** 数量 */
		quantity?: number;
		/** 回收版本 */
		recycleVersion?: string;
		/** 不回收对象 */
		excludeUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 预计回收时间 */
		expectedRecycleTime?: string;
		/** 明细备注 */
		itemRemarks?: string;
		/** 实际回收时间 */
		actualRecycleTime?: string;
		/** 实际回收数量 */
		actualQuantity?: number;
		itemStatus?: BurnAbpPdmDocumentManagementRecycleOrdersRecycleItemStatus;
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderItemDto = {
		/** 明细ID */
		id?: string;
		/** 所属回收单ID */
		recycleOrderId?: string;
		/** 文档ID */
		documentId?: string;
		/** 文档编码 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 文档描述 */
		documentDescription?: string;
		/** 份数 */
		quantity?: number;
		/** 回收版本 */
		recycleVersion?: string;
		/** 不回收对象（用户快照） */
		excludeUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 预计回收时间 */
		expectedRecycleTime?: string;
		/** 备注 */
		remarks?: string;
		/** 实际回收时间 */
		actualRecycleTime?: string;
		/** 实际回收份数 */
		actualQuantity?: number;
		status?: BurnAbpPdmDocumentManagementRecycleOrdersRecycleItemStatus;
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersExecuteRecycleOrderWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersRecycleItemStatus = 0 | 10 | 20;

	type BurnAbpPdmDocumentManagementRecycleOrdersRecycleOrderStatus = 0 | 10 | 15 | 20 | 30;

	type BurnAbpPdmDocumentManagementRecycleOrdersUpdateDocumentRecycleOrderDto = {
		/** 审批人Code */
		approverCode: string;
		/** 审批人姓名 */
		approverName: string;
		/** 回收对象（用户快照）- 必填，多选 */
		recycleUsers: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 回收时间 - 必填 */
		recycleTime: string;
		/** 备注 */
		remarks?: string;
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersUpdateRecycleOrderItemDto = {
		/** 份数 */
		quantity: number;
		/** 不回收对象（用户快照）- 多选 */
		excludeUsers?: BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[];
		/** 预计回收时间 */
		expectedRecycleTime?: string;
		/** 备注 */
		remarks?: string;
	};

	type BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto = {
		/** 用户ID */
		userId: string;
		/** 用户名称（快照） */
		userName: string;
	};

	type BurnAbpPdmDocumentManagementSecurityLevel = 0 | 1 | 2 | 3 | 4;

	type BurnAbpPdmDocumentManagementStorageSolutionsCreateStorageConfigurationDto = {
		providerType?: BurnAbpPdmDocumentManagementStorageSolutionsStorageProviderType;
		fileSystemBasePath?: string;
		aliyunOssEndpoint?: string;
		aliyunOssAccessKeyId?: string;
		aliyunOssAccessKeySecret?: string;
		aliyunOssBucketName?: string;
		aliyunOssCreateBucketIfNotExists?: boolean;
		azureBlobConnectionString?: string;
		azureBlobContainerName?: string;
		azureBlobCreateContainerIfNotExists?: boolean;
		minIOEndpoint?: string;
		minIOAccessKey?: string;
		minIOSecretKey?: string;
		minIOBucketName?: string;
		minIOUseSSL?: boolean;
		minIOCreateBucketIfNotExists?: boolean;
		amazonS3Region?: string;
		amazonS3AccessKeyId?: string;
		amazonS3SecretAccessKey?: string;
		amazonS3BucketName?: string;
		amazonS3ServiceUrl?: string;
		amazonS3ForcePathStyle?: boolean;
		amazonS3CreateBucketIfNotExists?: boolean;
		ftpHost?: string;
		ftpPort?: number;
		ftpUsername?: string;
		ftpPassword?: string;
		ftpBasePath?: string;
		ftpUsePassiveMode?: boolean;
		ftpUseSsl?: boolean;
		ftpAcceptAllCertificates?: boolean;
		ftpTimeoutSeconds?: number;
		ftpCreateBasePathIfNotExists?: boolean;
		networkShareUncPath?: string;
		networkShareUsername?: string;
		networkSharePassword?: string;
		networkShareSubDirectory?: string;
		networkShareCreateSubDirectoryIfNotExists?: boolean;
		networkShareTimeoutSeconds?: number;
		networkShareUseCredentialImpersonation?: boolean;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsCreateStorageSolutionDto = {
		solutionCode: string;
		solutionName: string;
		providerType: BurnAbpPdmDocumentManagementStorageSolutionsStorageProviderType;
		description?: string;
		configuration: BurnAbpPdmDocumentManagementStorageSolutionsCreateStorageConfigurationDto;
		quotaInBytes?: number;
		quotaWarningThreshold?: number;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsSetQuotaDto = {
		quotaInBytes?: number;
		quotaWarningThreshold?: number;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageConfigurationDto = {
		providerType?: BurnAbpPdmDocumentManagementStorageSolutionsStorageProviderType;
		fileSystemBasePath?: string;
		aliyunOssEndpoint?: string;
		aliyunOssAccessKeyId?: string;
		aliyunOssAccessKeySecret?: string;
		aliyunOssBucketName?: string;
		aliyunOssCreateBucketIfNotExists?: boolean;
		azureBlobConnectionString?: string;
		azureBlobContainerName?: string;
		azureBlobCreateContainerIfNotExists?: boolean;
		minIOEndpoint?: string;
		minIOAccessKey?: string;
		minIOSecretKey?: string;
		minIOBucketName?: string;
		minIOUseSSL?: boolean;
		minIOCreateBucketIfNotExists?: boolean;
		amazonS3Region?: string;
		amazonS3AccessKeyId?: string;
		amazonS3SecretAccessKey?: string;
		amazonS3BucketName?: string;
		amazonS3ServiceUrl?: string;
		amazonS3ForcePathStyle?: boolean;
		amazonS3CreateBucketIfNotExists?: boolean;
		ftpHost?: string;
		ftpPort?: number;
		ftpUsername?: string;
		ftpPassword?: string;
		ftpBasePath?: string;
		ftpUsePassiveMode?: boolean;
		ftpUseSsl?: boolean;
		ftpAcceptAllCertificates?: boolean;
		ftpTimeoutSeconds?: number;
		ftpCreateBasePathIfNotExists?: boolean;
		networkShareUncPath?: string;
		networkShareUsername?: string;
		networkSharePassword?: string;
		networkShareSubDirectory?: string;
		networkShareCreateSubDirectoryIfNotExists?: boolean;
		networkShareTimeoutSeconds?: number;
		networkShareUseCredentialImpersonation?: boolean;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageHealthCheckResultDto = {
		status?: BurnAbpPdmDocumentManagementStorageSolutionsStorageHealthStatus;
		statusDisplayName?: string;
		checkedAt?: string;
		responseTimeMs?: number;
		message?: string;
		failureReason?: string;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageHealthStatus = 0 | 1 | 2 | 3;

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageProviderType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		solutionCode?: string;
		solutionName?: string;
		providerType?: BurnAbpPdmDocumentManagementStorageSolutionsStorageProviderType;
		providerTypeDisplayName?: string;
		description?: string;
		isActive?: boolean;
		isDefault?: boolean;
		configuration?: BurnAbpPdmDocumentManagementStorageSolutionsStorageConfigurationDto;
		quotaInBytes?: number;
		quotaDisplay?: string;
		usedInBytes?: number;
		usedDisplay?: string;
		quotaUsagePercentage?: number;
		quotaWarningThreshold?: number;
		isOverQuota?: boolean;
		isQuotaWarning?: boolean;
		healthStatus?: BurnAbpPdmDocumentManagementStorageSolutionsStorageHealthStatus;
		healthStatusDisplayName?: string;
		lastHealthCheckAt?: string;
		healthCheckFailureReason?: string;
		linkedLibraryCount?: number;
		fileCount?: number;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionLookupDto = {
		id?: string;
		solutionCode?: string;
		solutionName?: string;
		providerType?: BurnAbpPdmDocumentManagementStorageSolutionsStorageProviderType;
		providerTypeDisplayName?: string;
		isDefault?: boolean;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsStorageUsageStatisticsDto = {
		solutionId?: string;
		solutionCode?: string;
		solutionName?: string;
		quotaInBytes?: number;
		quotaDisplay?: string;
		usedInBytes?: number;
		usedDisplay?: string;
		availableInBytes?: number;
		availableDisplay?: string;
		usagePercentage?: number;
		fileCount?: number;
		linkedLibraryCount?: number;
		statisticsDate?: string;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsUpdateStorageConfigurationDto = {
		configuration: BurnAbpPdmDocumentManagementStorageSolutionsCreateStorageConfigurationDto;
	};

	type BurnAbpPdmDocumentManagementStorageSolutionsUpdateStorageSolutionDto = {
		solutionName: string;
		description?: string;
	};

	type BurnAbpPdmDocumentManagementTempFilesInitiateUploadInput = {
		/** 文件名 */
		fileName: string;
		/** 文件总大小（字节） */
		totalSize: number;
		/** 文件 MIME 类型 */
		contentType: string;
		/** 分片大小（字节）
默认 5MB = 5 * 1024 * 1024 */
		chunkSize?: number;
	};

	type BurnAbpPdmDocumentManagementTempFilesTempFileUploadDto = {
		id?: string;
		/** 上传 ID（Blob 存储中的唯一标识） */
		uploadId?: string;
		/** 上传用户 ID */
		userId?: string;
		/** 原始文件名 */
		fileName?: string;
		/** 文件总大小（字节） */
		totalSize?: number;
		/** 分片大小（字节） */
		chunkSize?: number;
		/** 总分片数 */
		totalChunks?: number;
		/** 已上传的分片数 */
		uploadedChunksCount?: number;
		status?: BurnAbpPdmDocumentManagementTempFileUploadStatus;
		/** 文件 MIME 类型 */
		contentType?: string;
		/** 过期时间 */
		expiresAt?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 完成时间 */
		completedAt?: string;
	};

	type BurnAbpPdmDocumentManagementTempFilesUploadChunkInput = {
		/** 上传 ID */
		uploadId: string;
		/** 分片索引（从 0 开始） */
		chunkIndex: number;
		chunkStream: SystemIOStream;
	};

	type BurnAbpPdmDocumentManagementTempFilesUploadProgressDto = {
		/** 上传 ID */
		uploadId?: string;
		/** 文件名 */
		fileName?: string;
		/** 总分片数 */
		totalChunks?: number;
		/** 已上传的分片数 */
		uploadedChunksCount?: number;
		/** 上传进度百分比（0-100） */
		progressPercentage?: number;
		status?: BurnAbpPdmDocumentManagementTempFileUploadStatus;
		/** 缺失的分片索引列表 */
		missingChunkIndexes?: number[];
		/** 是否已完成 */
		isCompleted?: boolean;
		/** 过期时间 */
		expiresAt?: string;
	};

	type BurnAbpPdmDocumentManagementTempFileUploadStatus = 0 | 1 | 2 | 3;

	type BurnAbpPdmPartManagementApplicationsDtosCreatePartApplicationRequestDto = {
		/** 物料分类 ID */
		categoryId: number;
		/** 申请理由 */
		requestReason?: string;
		partInfo: BurnAbpPdmPartManagementApplicationsDtosPartBasicInfoDto;
		/** 属性值集合 */
		attributeValues?: BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestAttributeValueDto[];
	};

	type BurnAbpPdmPartManagementApplicationsDtosExecutePartApplicationRequestWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestAttributeValueDto = {
		/** 属性编码（前端传递，后端根据分类匹配属性定义） */
		attributeCode?: string;
		/** 属性值（统一字符串存储） */
		attributeValue?: string;
		/** 显示文本（用于下拉框等选项的显示） */
		displayText?: string;
	};

	type BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto = {
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
		/** 申请单号（业务主键） */
		requestNumber?: string;
		/** 申请日期 */
		requestDate?: string;
		/** 申请理由 */
		requestReason?: string;
		status?: BurnAbpPdmPartManagementEnumsPartApplicationRequestStatus;
		/** 物料分类 ID */
		categoryId?: number;
		/** 产品系列 ID（可选） */
		productSeriesId?: number;
		/** 产品系列编码（冗余存储） */
		productSeriesCode?: string;
		/** 产品系列名称（冗余存储） */
		productSeriesName?: string;
		partInfo?: BurnAbpPdmPartManagementApplicationsDtosPartBasicInfoDto;
		/** 属性值集合 */
		attributeValues?: BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestAttributeValueDto[];
		/** 审批通过后生成的物料编号 */
		approvedPartNumber?: string;
		/** 创建的物料 ID */
		createdPartId?: number;
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
	};

	type BurnAbpPdmPartManagementApplicationsDtosPartBasicInfoDto = {
		/** 产品系列 ID（可选） */
		productSeriesId?: number;
		/** 规格型号 */
		specification?: string;
		/** 计量单位 */
		unitName?: string;
		/** 物料用途描述 */
		description?: string;
		/** 是否关键物料 */
		isCritical?: boolean;
		/** 外部编码(MES 对接用) */
		outCode?: string;
		/** 类别编码(MES 对接用) */
		categoryCode?: string;
		/** 单位编码(MES 对接用) */
		unitCode?: string;
		/** 来源编码(MES 对接用) */
		comeFrom?: string;
		/** 来源名称（格式化显示用） */
		comeFromName?: string;
		comeFromType?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** EAN 条码 */
		eanCode?: string;
		/** UPC 条码 */
		upcCode?: string;
		/** 英文描述 */
		engDescription?: string;
		/** 外部描述 */
		outDescription?: string;
		/** 外部规格 */
		outSpecification?: string;
		/** 图号 */
		drawingNumber?: string;
	};

	type BurnAbpPdmPartManagementApplicationsDtosUpdatePartApplicationRequestDto = {
		id?: string;
		/** 物料分类 ID */
		categoryId: number;
		/** 产品系列 ID（可选） */
		productSeriesId?: number;
		/** 申请理由 */
		requestReason?: string;
		partInfo: BurnAbpPdmPartManagementApplicationsDtosPartBasicInfoDto;
		/** 属性值集合 */
		attributeValues?: BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestAttributeValueDto[];
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationErrorDto = {
		/** 分类编码 */
		categoryCode?: string;
		/** 错误消息 */
		errorMessage?: string;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationPreviewDto = {
		/** 预览项列表 */
		items?: BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationPreviewItemDto[];
		/** 总数 */
		totalCount?: number;
		/** 新增数量 */
		newCount?: number;
		/** 冲突数量 */
		conflictCount?: number;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationPreviewItemDto = {
		/** 分类编码 */
		categoryCode?: string;
		/** 分类名称 */
		categoryName?: string;
		/** 父分类编码 */
		parentCategoryCode?: string;
		/** 分类路径 */
		path?: string;
		/** 层级 */
		level?: number;
		/** 是否为叶子节点 */
		isLeaf?: boolean;
		/** 物料编号前缀 */
		partNumberPrefix?: string;
		/** 是否参与编码 */
		isCodeParticipant?: boolean;
		/** 编码分隔符 */
		codeSeparator?: string;
		/** 备注 */
		memo?: string;
		/** 是否启用 */
		isActive?: boolean;
		versionNumberStyle?: BurnAbpPdmPartManagementEnumsVersionNumberStyle;
		/** 是否允许自定义版本号 */
		allowCustomVersionNumber?: boolean;
		/** 是否冲突 */
		isConflict?: boolean;
		/** 冲突原因 */
		conflictReason?: string;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationResultDto = {
		/** 成功数量 */
		successCount?: number;
		/** 失败数量 */
		failedCount?: number;
		/** 跳过数量 */
		skippedCount?: number;
		/** 错误列表 */
		errors?: BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationErrorDto[];
		/** 跳过项列表 */
		skippedItems?: BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationSkippedItemDto[];
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationSkippedItemDto = {
		/** 分类编码 */
		categoryCode?: string;
		/** 分类名称 */
		categoryName?: string;
		/** 跳过原因 */
		reason?: string;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelDto = {
		id?: number;
		/** 所属模板ID */
		templateId?: number;
		/** 层级序号 */
		levelOrder?: number;
		/** 层级名称 */
		levelName?: string;
		/** 是否参与编码 */
		isCodeParticipant?: boolean;
		/** 层级候选项列表 */
		items?: BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelItemDto[];
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelItemDto = {
		id?: number;
		/** 所属层级ID */
		levelId?: number;
		/** 候选项代码 */
		itemCode?: string;
		/** 候选项名称 */
		itemName?: string;
		/** 允许的父项代码列表 */
		allowedParentCodes?: string[];
		/** 排序号 */
		sortOrder?: number;
		/** 物料编号前缀 */
		partNumberPrefix?: string;
		/** 是否参与编码 */
		isCodeParticipant?: boolean;
		/** 编码分隔符 */
		codeSeparator?: string;
		/** 备注 */
		memo?: string;
		/** 是否启用 */
		isActive?: boolean;
		versionNumberStyle?: BurnAbpPdmPartManagementEnumsVersionNumberStyle;
		/** 是否允许自定义版本号 */
		allowCustomVersionNumber?: boolean;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto = {
		id?: number;
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
		/** 模板名称 */
		templateName?: string;
		/** 模板描述 */
		description?: string;
		/** 默认编码分隔符 */
		defaultSeparator?: string;
		/** 是否启用 */
		isActive?: boolean;
		/** 层级定义列表 */
		levels?: BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelDto[];
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelDto = {
		/** 层级序号（1, 2, 3...） */
		levelOrder?: number;
		/** 层级名称 */
		levelName: string;
		/** 是否参与编码（默认 true） */
		isCodeParticipant?: boolean;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelItemDto = {
		/** 候选项代码 */
		itemCode: string;
		/** 候选项名称 */
		itemName: string;
		/** 允许的父项代码列表（空表示允许所有） */
		allowedParentCodes?: string[];
		/** 排序号 */
		sortOrder?: number;
		/** 物料编号前缀 */
		partNumberPrefix?: string;
		/** 是否参与编码（默认 true） */
		isCodeParticipant?: boolean;
		/** 编码分隔符（为空则继承模板默认值） */
		codeSeparator?: string;
		/** 备注 */
		memo?: string;
		/** 是否启用（默认 true） */
		isActive?: boolean;
		versionNumberStyle?: BurnAbpPdmPartManagementEnumsVersionNumberStyle;
		/** 是否允许自定义版本号 */
		allowCustomVersionNumber?: boolean;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelTemplateDto = {
		/** 模板名称 */
		templateName: string;
		/** 模板描述 */
		description?: string;
		/** 默认编码分隔符（默认 "-"） */
		defaultSeparator?: string;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosUpdateCategoryLevelItemDto = {
		/** 候选项名称 */
		itemName: string;
		/** 允许的父项代码列表（空表示允许所有） */
		allowedParentCodes?: string[];
		/** 排序号 */
		sortOrder?: number;
		/** 物料编号前缀 */
		partNumberPrefix?: string;
		/** 是否参与编码 */
		isCodeParticipant?: boolean;
		/** 编码分隔符 */
		codeSeparator?: string;
		/** 备注 */
		memo?: string;
		/** 是否启用 */
		isActive?: boolean;
		versionNumberStyle?: BurnAbpPdmPartManagementEnumsVersionNumberStyle;
		/** 是否允许自定义版本号 */
		allowCustomVersionNumber?: boolean;
	};

	type BurnAbpPdmPartManagementCategoryTemplatesDtosUpdateCategoryLevelTemplateDto = {
		/** 模板名称 */
		templateName: string;
		/** 模板描述 */
		description?: string;
		/** 默认编码分隔符 */
		defaultSeparator?: string;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpPdmPartManagementEnumsAttributeDataType = 1 | 3 | 4 | 5 | 6 | 8 | 9;

	type BurnAbpPdmPartManagementEnumsPartApplicationRequestStatus = 0 | 1 | 2 | 3 | 4 | 5;

	type BurnAbpPdmPartManagementEnumsPartChangeType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	type BurnAbpPdmPartManagementEnumsRelationUsage = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 999;

	type BurnAbpPdmPartManagementEnumsVersionNumberStyle = 1 | 2 | 3;

	type BurnAbpPdmPartManagementPartCategoriesCategoryImportConflictStrategy = 0 | 1;

	type BurnAbpPdmPartManagementPartCategoriesCategoryImportErrorDto = {
		/** Excel 行号 */
		rowNumber?: number;
		/** 字段名 */
		fieldName?: string;
		/** 错误消息 */
		errorMessage?: string;
	};

	type BurnAbpPdmPartManagementPartCategoriesCategoryImportResultDto = {
		successCount?: number;
		failureCount?: number;
		errors?: BurnAbpPdmPartManagementPartCategoriesCategoryImportErrorDto[];
		/** 警告列表（例如跳过已存在数据） */
		warnings?: BurnAbpPdmPartManagementPartCategoriesCategoryImportErrorDto[];
	};

	type BurnAbpPdmPartManagementPartCategoriesDtosCreatePartCategoryDto = {
		/** 分类代码(业务主键，必填) */
		categoryCode: string;
		/** 分类名称(必填) */
		categoryName: string;
		/** 父分类 ID(可选，null 表示创建根分类) */
		parentId?: number;
		/** 物料编号前缀(可选，用于自动生成物料编号) */
		partNumberPrefix?: string;
		/** 是否参与编码(默认 true，用于物料编码生成时根据分类树层级拼接编码段) */
		isCodeParticipant?: boolean;
		/** 编码分隔符(用于物料编码生成时各编码段之间的连接符，如 "-", "_" 等) */
		codeSeparator?: string;
		/** 备注(可选) */
		memo?: string;
	};

	type BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto = {
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
		/** 所属分类 ID */
		categoryId?: number;
		/** 属性编码(业务主键,在同一分类下唯一)
例如: "RESISTANCE", "POWER", "TOLERANCE" */
		attributeCode?: string;
		/** 属性显示名称(支持本地化) */
		displayName?: string;
		dataType?: BurnAbpPdmPartManagementEnumsAttributeDataType;
		/** 是否必填 */
		isRequired?: boolean;
		/** 显示顺序 */
		displayOrder?: number;
		/** 最小值(适用于 Integer 和 Decimal 类型) */
		minValue?: number;
		/** 最大值(适用于 Integer 和 Decimal 类型) */
		maxValue?: number;
		/** 默认值(JSON 格式) */
		defaultValue?: string;
		/** 静态选项列表 JSON(适用于 SingleSelect 和 MultiSelect 类型)
存储 List<AttributeOption> 的 JSON 序列化 */
		optionsJson?: string;
		/** 帮助文本(字段说明) */
		helpText?: string;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto = {
		id?: number;
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
		/** 分类代码(业务主键) */
		categoryCode?: string;
		/** 分类名称 */
		categoryName?: string;
		/** 父分类 ID(根节点为 null) */
		parentId?: number;
		/** 分类路径(物化路径，格式: /Electronics/Resistor/SMD) */
		path?: string;
		/** 层级(根节点为 0) */
		level?: number;
		/** 是否为叶子节点(只有叶子节点可以创建物料) */
		isLeaf?: boolean;
		/** 物料编号前缀(可选，用于自动生成物料编号) */
		partNumberPrefix?: string;
		/** 是否参与编码(用于物料编码生成时根据分类树层级拼接编码段) */
		isCodeParticipant?: boolean;
		/** 编码分隔符(用于物料编码生成时各编码段之间的连接符) */
		codeSeparator?: string;
		/** 是否启用 */
		isActive?: boolean;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingCreateUpdateDto = {
		categoryId: number;
		ruleDefinitionId: number;
		/** 规则评估优先级（数值越大优先级越高） */
		priority?: number;
	};

	type BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto = {
		id?: string;
		categoryId?: number;
		categoryCode?: string;
		categoryName?: string;
		ruleDefinitionId?: number;
		ruleName?: string;
		ruleDisplayName?: string;
		ruleEvaluationConfigId?: string;
		priority?: number;
	};

	type BurnAbpPdmPartManagementPartDocumentLinksCreatePartDocumentLinkDto = {
		/** 物料编号 */
		partNumber: string;
		/** 文档编号 */
		documentNumber: string;
		/** 图号 */
		drawingNumber?: string;
		usage: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 是否主要关联 */
		isPrimary?: boolean;
	};

	type BurnAbpPdmPartManagementPartDocumentLinksDocumentLinkedPartDto = {
		/** 料号 */
		partNumber?: string;
		/** 料号名称/描述 */
		partName?: string;
		/** 层级（0 为直接关联，>0 表示向上递归的层级深度） */
		level?: number;
		/** 当为父项时，表示通过哪个子项料号反查得到 */
		viaChildPartNumber?: string;
		/** 父项 BOM 版本号（若有） */
		bomVersion?: string;
		/** 父项中该子项的用量 */
		quantity?: number;
		/** 用量单位 */
		unitOfMeasure?: string;
		usage?: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 直接关联时是否主关联（父项递归时可能为空） */
		isPrimary?: boolean;
	};

	type BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDocumentDto = {
		link?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto;
		document?: BurnAbpPdmDocumentManagementDocumentsDocumentDto;
	};

	type BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 物料编号 */
		partNumber?: string;
		/** 物料名称 */
		partName?: string;
		/** 文档编号 */
		documentNumber?: string;
		/** 文档名称 */
		documentName?: string;
		/** 图号 */
		drawingNumber?: string;
		usage?: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 是否主要关联 */
		isPrimary?: boolean;
	};

	type BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkWithDocumentsDto = {
		/** BOM 明细主键（无 BOM 时为空） */
		bomItemId?: number;
		/** 全局路径（如 1、1.1、1.1.1），便于前端排序/定位 */
		bomPath?: string;
		partNumber?: string;
		partName?: string;
		documents?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDocumentDto[];
		children?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkWithDocumentsDto[];
	};

	type BurnAbpPdmPartManagementPartDocumentLinksUpdatePartDocumentLinkDto = {
		/** 图号 */
		drawingNumber?: string;
		usage: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 是否主要关联 */
		isPrimary?: boolean;
	};

	type BurnAbpPdmPartManagementPartsDtosApprovePartDto = {
		/** 审批意见（可选） */
		comment?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosCheckOutInfoDto = {
		/** 检出用户 ID */
		checkedOutUserId?: string;
		/** 检出用户名 */
		checkedOutUserName?: string;
		/** 检出时间 */
		checkedOutTime?: string;
		/** 检出备注 */
		checkOutComment?: string;
		/** 过期时间 */
		expireAt?: string;
		/** 强制解锁原因（如果被强制解锁） */
		forceUnlockReason?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosCheckOutPartDto = {
		/** 检出备注（可选） */
		comment?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosCreateNewVersionDto = {
		/** 新版本号（可选，留空则自动计算） */
		newVersion?: string;
		/** 版本变更原因 */
		versionReason: string;
		/** 版本日期（可选，留空则使用当前时间） */
		versionDate?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosCreatePartDto = {
		/** 物料分类 ID */
		categoryId: number;
		/** 产品系列 ID（可选） */
		productSeriesId?: number;
		/** 物料编号(可选,如果不提供则自动生成) */
		partNumber?: string;
		/** 物料名称 (对应实体的 Description 属性) */
		description: string;
		/** 规格型号描述 */
		specification?: string;
		/** 图号(设计图纸编号) */
		drawingNumber?: string;
		/** 物料外码（MES: m_OutID） */
		outCode?: string;
		/** 计量单位 */
		unitName: string;
		/** 计量单位编码（MES: u_ID） */
		unitCode?: string;
		/** 来源（MES: m_ComeFrom） */
		comeFrom: string;
		/** EAN 码（MES: m_Ean） */
		eanCode?: string;
		/** UPC 码（MES: m_Upc） */
		upcCode?: string;
		/** 英文描述（MES: m_EngDescript） */
		engDescription?: string;
		/** 对外描述（MES: m_OutDescript） */
		outDescription?: string;
		/** 对外规格型号（MES: m_OutSpecification） */
		outSpecification?: string;
		/** 物料分类编码（对应实体的 CategoryCode 属性，MES: mc_ID） */
		categoryCode?: string;
		/** 是否关键物料 */
		isCritical?: boolean;
		/** 版本原因 */
		versionReason?: string;
		/** 物料属性值列表（EAV 模式）
根据物料分类定义的属性，填写对应的属性值 */
		attributeValues?: BurnAbpPdmPartManagementPartsDtosPartAttributeValueInput[];
		/** 材料/材质 */
		material?: string;
		/** 表面处理 */
		surfaceTreatment?: string;
		/** 颜色 */
		color?: string;
		dimension?: BurnAbpPdmPartManagementPartsDtosPartDimensionDto;
	};

	type BurnAbpPdmPartManagementPartsDtosObsoletePartDto = {
		/** 作废原因 */
		obsoleteReason: string;
		/** 推荐替代物料 ID */
		replacementPartId?: number;
	};

	type BurnAbpPdmPartManagementPartsDtosPartAttributeValueDto = {
		id?: string;
		/** 物料 ID */
		partId: number;
		/** 属性定义 ID */
		attributeId: string;
		/** 属性编码(冗余字段,用于快速识别) */
		attributeCode: string;
		/** 属性值（统一存储，所有类型都转为字符串）
- 整数: "123"
- 小数: "123.45"
- 布尔: "true" / "false"
- 日期: "2024-01-01"
- 文本: 原始文本
- 选择: 选项的Key（多选用逗号分隔） */
		value: string;
		/** 显示文本 */
		displayText?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosPartAttributeValueInput = {
		/** 属性编码（前端传递，后端根据分类自动匹配 AttributeId） */
		attributeCode: string;
		/** 属性值（统一字段，支持所有数据类型）
- 文本类型：直接存储文本内容
- 整数类型：存储为字符串，如 "123"
- 小数类型：存储为字符串，如 "123.45"
- 布尔类型：存储为 "true" 或 "false"
- 日期类型：存储为 "yyyy-MM-dd" 格式，如 "2025-01-13"
- 选项类型：存储选项的 Key 值 */
		value?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosPartChangeRecordDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 租户 ID */
		tenantId?: string;
		/** 物料 ID */
		partId?: number;
		/** 物料编号 */
		partNumber?: string;
		/** 版本号 */
		version?: string;
		changeType?: BurnAbpPdmPartManagementEnumsPartChangeType;
		/** 变更类型名称（便于前端展示） */
		changeTypeName?: string;
		/** 操作人 ID */
		operatorId?: string;
		/** 操作人姓名 */
		operatorName?: string;
		/** 操作时间 */
		operationTime?: string;
		/** 备注/评论 */
		comment?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosPartDimensionDto = {
		/** 长度 (mm) */
		length?: number;
		/** 宽度 (mm) */
		width?: number;
		/** 高度 (mm) */
		height?: number;
		/** 重量 (g) */
		weight?: number;
		/** 直径 (mm) */
		diameter?: number;
		/** 体积 (mm³) */
		volume?: number;
	};

	type BurnAbpPdmPartManagementPartsDtosPartDimensionInput = {
		/** 长度 (mm) */
		length?: number;
		/** 宽度 (mm) */
		width?: number;
		/** 高度 (mm) */
		height?: number;
		/** 重量 (g) */
		weight?: number;
		/** 直径 (mm) */
		diameter?: number;
	};

	type BurnAbpPdmPartManagementPartsDtosPartDto = {
		id?: number;
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
		/** 物料编号 */
		partNumber?: string;
		/** 物料名称 (对应实体的 Description 属性) */
		description?: string;
		/** 规格型号描述 */
		specification?: string;
		/** 图号(设计图纸编号) */
		drawingNumber?: string;
		/** 物料外码（MES: m_OutID） */
		outCode?: string;
		versionInfo?: BurnAbpPdmPartManagementPartsDtosPartVersionInfoDto;
		/** 产品系列 ID（可选，用于产品规划和配置管理） */
		productSeriesId?: number;
		/** 产品系列编码（冗余存储，用于列表显示） */
		productSeriesCode?: string;
		/** 产品系列名称（冗余存储，用于列表显示） */
		productSeriesName?: string;
		/** 物料分类 ID */
		categoryId?: number;
		/** 物料分类编码（对应实体的 CategoryCode 属性，） */
		categoryCode?: string;
		/** 分类名称 (冗余) */
		categoryName?: string;
		lifecycleStatus?: BurnAbpPdmCommonVersionStatus;
		/** 计量单位 */
		unitName?: string;
		/** 计量单位编码（MES: u_ID） */
		unitCode?: string;
		/** 来源编码（MES: m_ComeFrom） */
		comeFrom?: string;
		/** 来源名称（格式化显示用） */
		comeFromName?: string;
		comeFromType?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** EAN 码（MES: m_Ean） */
		eanCode?: string;
		/** UPC 码（MES: m_Upc） */
		upcCode?: string;
		/** 英文描述（MES: m_EngDescript） */
		engDescription?: string;
		/** 对外描述（MES: m_OutDescript） */
		outDescription?: string;
		/** 对外规格型号（MES: m_OutSpecification） */
		outSpecification?: string;
		/** 是否关键物料 */
		isCritical?: boolean;
		/** 是否启用 */
		isActive?: boolean;
		currentSpecification?: BurnAbpPdmPartManagementPartsDtosPartSpecificationDto;
		/** 发布日期 */
		releaseDate?: string;
		/** 发布人 ID */
		releasedBy?: string;
		/** 作废日期 */
		obsoleteDate?: string;
		/** 作废原因 */
		obsoleteReason?: string;
		/** 推荐替代物料 ID */
		replacementPartId?: number;
		/** 物料属性值列表 */
		attributeValues?: BurnAbpPdmPartManagementPartsDtosPartAttributeValueDto[];
		/** 是否已检出 */
		isCheckedOut?: boolean;
		checkOutInfo?: BurnAbpPdmPartManagementPartsDtosCheckOutInfoDto;
	};

	type BurnAbpPdmPartManagementPartsDtosPartSpecificationDto = {
		/** 材料/材质 */
		material?: string;
		/** 表面处理 */
		surfaceTreatment?: string;
		/** 颜色 */
		color?: string;
		dimension?: BurnAbpPdmPartManagementPartsDtosPartDimensionDto;
	};

	type BurnAbpPdmPartManagementPartsDtosPartVersionInfoDto = {
		/** 版本号（例如 V1、A01），用于对外展示。 */
		version?: string;
		/** 版本生效日期（通常为审批通过或发布的时间戳）。 */
		versionDate?: string;
		/** 版本变更原因或说明，记录变更背景。 */
		versionReason?: string;
		/** 是否为当前有效版本（true 表示最新发布版本）。 */
		isCurrent?: boolean;
	};

	type BurnAbpPdmPartManagementPartsDtosRejectPartDto = {
		/** 拒绝原因（必填） */
		reason: string;
	};

	type BurnAbpPdmPartManagementPartsDtosSubmitPartDto = {
		/** 审批路由（可选，用于指定审批流程） */
		approvalRoute?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosUndoCheckOutPartDto = {
		/** 撤销原因（可选，管理员强制撤销时建议填写） */
		reason?: string;
	};

	type BurnAbpPdmPartManagementPartsDtosUpdatePartDto = {
		/** 产品系列 ID（可选） */
		productSeriesId?: number;
		/** 物料名称 (对应实体的 Description 属性) */
		description: string;
		/** 规格型号描述 */
		specification?: string;
		/** 图号(设计图纸编号) */
		drawingNumber?: string;
		/** 计量单位编码 */
		unitCode?: string;
		/** 计量单位 */
		unitName: string;
		/** 物料外码（MES: m_OutID） */
		outCode?: string;
		/** 物料分类编码（对应实体的 CategoryCode 属性，MES: mc_ID） */
		categoryCode?: string;
		/** 来源（MES: m_ComeFrom） */
		comeFrom?: string;
		/** EAN 码（MES: m_Ean） */
		eanCode?: string;
		/** UPC 码（MES: m_Upc） */
		upcCode?: string;
		/** 英文描述（MES: m_EngDescript） */
		engDescription?: string;
		/** 对外描述（MES: m_OutDescript） */
		outDescription?: string;
		/** 对外规格型号（MES: m_OutSpecification） */
		outSpecification?: string;
		/** 物料属性值列表（EAV 模式）
根据物料分类定义的属性，填写对应的属性值 */
		attributeValues?: BurnAbpPdmPartManagementPartsDtosPartAttributeValueInput[];
		/** 材料/材质 */
		material?: string;
		/** 表面处理 */
		surfaceTreatment?: string;
		/** 颜色 */
		color?: string;
		dimension?: BurnAbpPdmPartManagementPartsDtosPartDimensionDto;
	};

	type BurnAbpPdmPartManagementPartsMaterialImportErrorDto = {
		rowNumber?: number;
		fieldName?: string;
		errorMessage?: string;
	};

	type BurnAbpPdmPartManagementPartsMaterialImportResultDto = {
		successCount?: number;
		failureCount?: number;
		errors?: BurnAbpPdmPartManagementPartsMaterialImportErrorDto[];
		warnings?: BurnAbpPdmPartManagementPartsMaterialImportErrorDto[];
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonCompareVersionsInput = {
		/** 物料 ID */
		partId: number;
		/** 源版本号 */
		sourceVersion: string;
		/** 目标版本号 */
		targetVersion: string;
		/** 是否包含无变化字段 */
		includeUnchanged?: boolean;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonCompareWithDraftInput = {
		/** 物料 ID */
		partId: number;
		/** 历史版本号 */
		historicalVersion: string;
		/** 是否包含无变化字段 */
		includeUnchanged?: boolean;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportDto = {
		format?: BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportFormat;
		/** 报告内容 */
		content?: string;
		/** 文件名（建议） */
		fileName?: string;
		/** 内容类型 */
		contentType?: string;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportFormat = 0 | 1;

	type BurnAbpPdmPartManagementPartVersionsComparisonComparisonStatisticsDto = {
		/** 总字段数 */
		totalFieldCount?: number;
		/** 修改字段数 */
		modifiedCount?: number;
		/** 新增字段数 */
		addedCount?: number;
		/** 删除字段数 */
		removedCount?: number;
		/** 无变化字段数 */
		unchangedCount?: number;
		/** 关键字段变更数 */
		criticalChangeCount?: number;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto = {
		/** 字段名 */
		fieldName?: string;
		/** 显示名称 */
		displayName?: string;
		/** 分类 */
		category?: string;
		differenceType?: BurnAbpPdmPartManagementPartVersionsPartVersionDifferenceType;
		/** 源值 */
		sourceValue?: string;
		/** 目标值 */
		targetValue?: string;
		/** 是否关键变更 */
		isCritical?: boolean;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonGenerateReportInput = {
		/** 物料 ID */
		partId: number;
		/** 源版本号 */
		sourceVersion: string;
		/** 目标版本号 */
		targetVersion: string;
		format?: BurnAbpPdmPartManagementPartVersionsComparisonComparisonReportFormat;
		/** 是否包含无变化字段 */
		includeUnchanged?: boolean;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonPartVersionComparisonResultDto = {
		/** 物料 ID */
		partId?: number;
		/** 物料编号 */
		partNumber?: string;
		sourceVersion?: BurnAbpPdmPartManagementPartVersionsComparisonVersionSummaryDto;
		targetVersion?: BurnAbpPdmPartManagementPartVersionsComparisonVersionSummaryDto;
		/** 字段变更列表 */
		fieldChanges?: BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto[];
		statistics?: BurnAbpPdmPartManagementPartVersionsComparisonComparisonStatisticsDto;
		/** 是否有差异 */
		hasDifferences?: boolean;
	};

	type BurnAbpPdmPartManagementPartVersionsComparisonVersionSummaryDto = {
		/** 版本 ID */
		versionId?: number;
		/** 版本号 */
		version?: string;
		/** 状态 */
		status?: string;
		/** 生效日期 */
		effectiveDate?: string;
		/** 失效日期 */
		expiryDate?: string;
		/** 是否为草稿 */
		isDraft?: boolean;
	};

	type BurnAbpPdmPartManagementPartVersionsDtosPartVersionAttributeValueDto = {
		id?: string;
		/** 属性定义 ID */
		attributeId?: string;
		/** 属性编码(冗余字段,用于快速识别) */
		attributeCode?: string;
		/** 属性值 */
		value?: string;
		/** 显示文本 */
		displayText?: string;
	};

	type BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 物料 ID */
		partId?: number;
		/** 物料编号（快照复制） */
		partNumber?: string;
		/** 版本号 (A, B, 1.0, 2.0) */
		version?: string;
		/** 版本变更原因 */
		versionReason?: string;
		status?: BurnAbpPdmCommonVersionStatus;
		/** 生效日期（发布时间） */
		effectiveDate?: string;
		/** 失效日期（被替代或作废时设置） */
		expiryDate?: string;
		/** 产品系列 ID（快照复制） */
		productSeriesId?: number;
		/** 产品系列编码（快照复制） */
		productSeriesCode?: string;
		/** 产品系列名称（快照复制） */
		productSeriesName?: string;
		/** 物料名称 */
		description?: string;
		/** 规格型号描述 */
		specification?: string;
		/** 物料分类 ID */
		categoryId?: number;
		/** 物料分类编码 */
		categoryCode?: string;
		/** 分类名称 */
		categoryName?: string;
		/** 物料类型(自制/外购/虚拟等) - 来源编码 */
		comeFrom?: string;
		/** 来源名称（格式化显示用） */
		comeFromName?: string;
		comeFromType?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** 计量单位 */
		unitName?: string;
		/** 计量单位编码 */
		unitCode?: string;
		/** EAN 码 */
		eanCode?: string;
		/** UPC 码 */
		upcCode?: string;
		/** 英文描述 */
		engDescription?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 物料外码 */
		outCode?: string;
		/** 是否关键物料 */
		isCritical?: boolean;
		/** 图号 */
		drawingNumber?: string;
		currentSpecification?: BurnAbpPdmPartManagementPartsDtosPartSpecificationDto;
		/** 发布日期 */
		releaseDate?: string;
		/** 发布人 ID */
		releasedBy?: string;
		/** 属性值快照集合 */
		attributeValues?: BurnAbpPdmPartManagementPartVersionsDtosPartVersionAttributeValueDto[];
	};

	type BurnAbpPdmPartManagementPartVersionsDtosUpdatePartVersionDto = {
		/** 产品系列 ID（可选） */
		productSeriesId?: number;
		/** 物料名称 */
		description: string;
		/** 规格型号描述 */
		specification?: string;
		/** 计量单位 */
		unitName: string;
		/** 图号(设计图纸编号) */
		drawingNumber?: string;
		/** 物料外码 */
		outCode?: string;
		/** 计量单位编码 */
		unitCode?: string;
		/** 物料分类编码 */
		categoryCode?: string;
		/** 来源 */
		comeFrom?: string;
		/** EAN 码 */
		eanCode?: string;
		/** UPC 码 */
		upcCode?: string;
		/** 英文描述 */
		engDescription?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 材料/材质 */
		material?: string;
		/** 表面处理 */
		surfaceTreatment?: string;
		/** 颜色 */
		color?: string;
		dimension?: BurnAbpPdmPartManagementPartsDtosPartDimensionInput;
		/** 物料属性值列表 */
		attributeValues?: BurnAbpPdmPartManagementPartsDtosPartAttributeValueInput[];
	};

	type BurnAbpPdmPartManagementPartVersionsPartVersionDifferenceType = 0 | 1 | 2 | 3;

	type BurnAbpPdmPartManagementProductSeriesDtosCreateProductSeriesDto = {
		/** 产品系列编码（业务主键，必填） */
		seriesCode: string;
		/** 产品系列名称（必填） */
		seriesName: string;
		/** 产品系列描述（可选） */
		description?: string;
		/** 备注（可选） */
		memo?: string;
		/** 父系列ID（可选，null 表示创建根系列） */
		parentId?: number;
		/** 排序号（默认 0） */
		sortOrder?: number;
		/** 是否参与编码（默认 true，用于物料编码生成时根据系列树层级拼接编码段） */
		isCodeParticipant?: boolean;
		/** 物料编号前缀（可选，用于自动生成物料编号） */
		partNumberPrefix?: string;
		/** 编码分隔符（默认 "-"） */
		codeSeparator?: string;
	};

	type BurnAbpPdmPartManagementProductSeriesDtosMoveProductSeriesDto = {
		/** 新的父系列ID（null 表示移动到根级别） */
		newParentId?: number;
	};

	type BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto = {
		id?: number;
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
		/** 产品系列编码（业务主键） */
		seriesCode?: string;
		/** 产品系列名称 */
		seriesName?: string;
		/** 产品系列描述 */
		description?: string;
		/** 备注 */
		memo?: string;
		/** 父系列ID（null 表示根系列） */
		parentId?: number;
		/** 物化路径（格式：/1/2/3/） */
		path?: string;
		/** 层级（根节点为 1） */
		level?: number;
		/** 是否为叶子节点 */
		isLeaf?: boolean;
		/** 排序号 */
		sortOrder?: number;
		/** 是否参与编码（用于物料编码生成时根据系列树层级拼接编码段） */
		isCodeParticipant?: boolean;
		/** 物料编号前缀（可选） */
		partNumberPrefix?: string;
		/** 编码分隔符 */
		codeSeparator?: string;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpPdmPartManagementProductSeriesDtosProductSeriesTreeDto = {
		/** 产品系列ID */
		id?: number;
		/** 产品系列编码 */
		seriesCode?: string;
		/** 产品系列名称 */
		seriesName?: string;
		/** 父系列ID */
		parentId?: number;
		/** 层级 */
		level?: number;
		/** 是否为叶子节点 */
		isLeaf?: boolean;
		/** 排序号 */
		sortOrder?: number;
		/** 是否启用 */
		isActive?: boolean;
		/** 子节点列表 */
		children?: BurnAbpPdmPartManagementProductSeriesDtosProductSeriesTreeDto[];
	};

	type BurnAbpPdmPartManagementProductSeriesDtosUpdateProductSeriesDto = {
		/** 产品系列名称（必填） */
		seriesName: string;
		/** 产品系列描述（可选） */
		description?: string;
		/** 备注（可选） */
		memo?: string;
		/** 排序号 */
		sortOrder?: number;
		/** 是否参与编码（用于物料编码生成时根据系列树层级拼接编码段） */
		isCodeParticipant?: boolean;
		/** 物料编号前缀（可选） */
		partNumberPrefix?: string;
		/** 编码分隔符 */
		codeSeparator?: string;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpPdmProcessManagementProcessProcedureCategoriesCreateUpdateProcessProcedureCategoryDto = {
		/** 工序分类编码 */
		code: string;
		/** 工序分类名称 */
		name: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 工序分类编码 */
		code?: string;
		/** 工序分类名称 */
		name?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpPdmProcessManagementProcessProceduresCreateUpdateProcessProcedureDto = {
		/** 工序编码 */
		code: string;
		/** 工序名称 */
		name: string;
		/** 工作中心编码 */
		workCenterCode?: string;
		/** 工作中心名称 */
		workCenterName?: string;
		/** 工序分类编码 */
		processProcedureCategoryCode?: string;
		/** 工序分类名称 */
		processProcedureCategoryName?: string;
		/** 是否委外 */
		isOutsourced?: string;
		/** 动作类型 */
		actionType?: string;
		/** 是否入库工序 */
		isInboundProcess?: boolean;
		/** 是否需要原材料 */
		isNeedRawMaterial?: boolean;
		/** 固定合格数量 */
		fixPassCount?: number;
		/** 失败报废数量 */
		failScrapCount?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 工序编码 */
		code?: string;
		/** 工序名称 */
		name?: string;
		/** 工作中心编码 */
		workCenterCode?: string;
		/** 工作中心名称 */
		workCenterName?: string;
		/** 工序分类编码 */
		processProcedureCategoryCode?: string;
		/** 工序分类名称 */
		processProcedureCategoryName?: string;
		/** 是否委外 */
		isOutsourced?: string;
		/** 动作类型 */
		actionType?: string;
		/** 是否入库工序 */
		isInboundProcess?: boolean;
		/** 是否需要原材料 */
		isNeedRawMaterial?: boolean;
		/** 固定合格数量 */
		fixPassCount?: number;
		/** 失败报废数量 */
		failScrapCount?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteDto = {
		/** 工艺路线编码 */
		code: string;
		/** 工艺路线名称 */
		name: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 版本号 */
		version: string;
		/** 备注 */
		memo?: string;
		/** 工艺路线明细列表 */
		processRouteItems?: BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteItemDto[];
	};

	type BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteItemDto = {
		/** 明细ID（更新时必传，新增时为空） */
		id?: number;
		/** 排序号 */
		sort?: number;
		/** 工序分类编码 */
		processProcedureCategoryCode?: string;
		/** 工序分类名称 */
		processProcedureCategoryName?: string;
		previousProcessProcedure?: BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto;
		currentProcessProcedure?: BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto;
		nextProcessProcedure?: BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto;
		/** 工位 */
		station?: string;
		/** ATP 名称 */
		atpName?: string;
		/** 是否需要检查前工序 */
		isNeedCheckPrevWp?: string;
		/** 检查前工序数量 */
		checkPrevQuantity?: number;
		/** 是否需要检查当前工序 */
		isNeedCheckWp?: string;
		/** 工序执行动作 */
		actionType?: string;
		/** 是否外协工序 */
		isOutsourced?: string;
		/** 工人数量 */
		workerCount?: number;
		/** 重测合格次数 */
		fixPassCount?: number;
		/** 失败报废次数 */
		failScrapCount?: number;
		/** 成功次数 */
		successCount?: number;
		/** 条码解析贡献者编码 */
		barCodeResolveContributorCode?: string;
		/** 条码解析贡献者名称 */
		barCodeResolveContributorName?: string;
		/** 最大等待时间 */
		maximumWaitTime?: number;
		/** 最小等待时间 */
		minimumWaitTime?: number;
		/** 制造成本 */
		manuFactureCost?: number;
		/** 检验方案编码 */
		inspectionSchemeCode?: string;
		/** 检验方案名称 */
		inspectionSchemeName?: string;
		/** 抽样方案编码 */
		sampleSchemeCode?: string;
		/** 抽样方案名称 */
		sampleSchemeName?: string;
		/** ESOP Blob 名称 */
		esopBlobName?: string;
		/** ESOP 文件名 */
		esopFileName?: string;
		/** 是否需要拍照 */
		needPicture?: boolean;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto = {
		/** 工作中心编码 */
		workCenterCode?: string;
		/** 工作中心名称 */
		workCenterName?: string;
		/** 工序编码 */
		processProcedureCode?: string;
		/** 工序名称 */
		processProcedureName?: string;
	};

	type BurnAbpPdmProcessManagementProcessRoutesProcessRouteDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 工艺路线编码 */
		code?: string;
		/** 工艺路线名称 */
		name?: string;
		/** 版本号 */
		version?: string;
		/** 版本发布日期 */
		versionPublishDate?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 人员数量 */
		peopleQty?: number;
		/** 总时间 */
		totalTime?: number;
		/** 换线间隔时间 */
		switchLineInterval?: number;
		/** 设定节拍时间 */
		setTactTime?: number;
		/** 实际节拍时间 */
		actualTactTime?: number;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
		/** 提交人 */
		submiter?: string;
		/** 提交日期 */
		submitDate?: string;
		/** 审核人 */
		checker?: string;
		/** 审核日期 */
		checkDate?: string;
		/** 工艺路线明细列表 */
		processRouteItems?: BurnAbpPdmProcessManagementProcessRoutesProcessRouteItemDto[];
	};

	type BurnAbpPdmProcessManagementProcessRoutesProcessRouteItemDto = {
		id?: number;
		/** 工艺路线 ID */
		processRouteId?: number;
		/** 工艺路线编码 */
		processRouteCode?: string;
		/** 排序号 */
		sort?: number;
		/** 工序分类编码 */
		processProcedureCategoryCode?: string;
		/** 工序分类名称 */
		processProcedureCategoryName?: string;
		previousProcessProcedure?: BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto;
		currentProcessProcedure?: BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto;
		nextProcessProcedure?: BurnAbpPdmProcessManagementProcessRoutesProcessProcedureItemDto;
		/** 工位 */
		station?: string;
		/** ATP 名称 */
		atpName?: string;
		/** 是否需要检查前工序 */
		isNeedCheckPrevWp?: string;
		/** 检查前工序数量 */
		checkPrevQuantity?: number;
		/** 是否需要检查当前工序 */
		isNeedCheckWp?: string;
		/** 工序执行动作 */
		actionType?: string;
		/** 是否外协工序 */
		isOutsourced?: string;
		/** 工人数量 */
		workerCount?: number;
		/** 重测合格次数 */
		fixPassCount?: number;
		/** 失败报废次数 */
		failScrapCount?: number;
		/** 成功次数 */
		successCount?: number;
		/** 条码解析贡献者编码 */
		barCodeResolveContributorCode?: string;
		/** 条码解析贡献者名称 */
		barCodeResolveContributorName?: string;
		/** 最大等待时间 */
		maximumWaitTime?: number;
		/** 最小等待时间 */
		minimumWaitTime?: number;
		/** 制造成本 */
		manuFactureCost?: number;
		/** 检验方案编码 */
		inspectionSchemeCode?: string;
		/** 检验方案名称 */
		inspectionSchemeName?: string;
		/** 抽样方案编码 */
		sampleSchemeCode?: string;
		/** 抽样方案名称 */
		sampleSchemeName?: string;
		/** ESOP Blob 名称 */
		esopBlobName?: string;
		/** ESOP 文件名 */
		esopFileName?: string;
		/** 是否需要拍照 */
		needPicture?: boolean;
		/** 备注 */
		memo?: string;
		/** 提交人 */
		submiter?: string;
		/** 提交日期 */
		submitDate?: string;
		/** 审核人 */
		checker?: string;
		/** 审核日期 */
		checkDate?: string;
	};

	type BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentFileDto = {
		/** 文件名 */
		fileName?: string;
		/** MIME类型 */
		contentType?: string;
		/** 文件内容 */
		content?: string;
	};

	type BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto = {
		/** Blob存储名称 */
		blobName?: string;
		/** 原始文件名 */
		fileName?: string;
		/** MIME类型 */
		contentType?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** 下载URL */
		documentUrl?: string;
		/** 上传时间 */
		uploadTime?: string;
		/** 附件描述（可选） */
		description?: string;
	};

	type BurnAbpPdmProjectManagementFileType = 0 | 1;

	type BurnAbpPdmProjectManagementImplementationStatus = 0 | 1 | 2 | 3;

	type BurnAbpPdmProjectManagementIssueTypesCreateIssueTypeDto = {
		/** 类型编码 */
		code: string;
		/** 类型名称 */
		name: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementIssueTypesIssueTypeDto = {
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
		/** 类型编码 */
		code?: string;
		/** 类型名称 */
		name?: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementIssueTypesUpdateIssueTypeDto = {
		/** 类型编码 */
		code: string;
		/** 类型名称 */
		name: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementMeetingStatus = 0 | 1;

	type BurnAbpPdmProjectManagementMeetingType = 0 | 1 | 2;

	type BurnAbpPdmProjectManagementMilestoneStatus = 0 | 10 | 20 | 30 | 40;

	type BurnAbpPdmProjectManagementProjectCategoriesCreateProjectCategoryDto = {
		/** 分类编码 */
		code: string;
		/** 分类名称 */
		name: string;
		/** 备注 */
		remark?: string;
		/** 父级分类编码（支持树状结构） */
		parentCode?: string;
		/** 绑定的项目模板编码
业务规则：如果绑定了模板，则该分类不能有子级 */
		templateCode?: string;
	};

	type BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto = {
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
		/** 分类编码 */
		code?: string;
		/** 分类名称 */
		name?: string;
		/** 备注 */
		remark?: string;
		/** 父级分类编码（支持树状结构） */
		parentCode?: string;
		/** 绑定的项目模板编码 */
		templateCode?: string;
		/** 是否为叶子节点（没有子级） */
		isLeaf?: boolean;
	};

	type BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryTreeDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 分类编码 */
		code?: string;
		/** 分类名称 */
		name?: string;
		/** 备注 */
		remark?: string;
		/** 父级分类编码（支持树状结构） */
		parentCode?: string;
		/** 绑定的项目模板编码 */
		templateCode?: string;
		/** 是否为叶子节点（没有子级） */
		isLeaf?: boolean;
		/** 子级分类列表 */
		children?: BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryTreeDto[];
	};

	type BurnAbpPdmProjectManagementProjectCategoriesUpdateProjectCategoryDto = {
		/** 分类编码 */
		code: string;
		/** 分类名称 */
		name: string;
		/** 备注 */
		remark?: string;
		/** 父级分类编码（支持树状结构） */
		parentCode?: string;
		/** 绑定的项目模板编码
业务规则：如果绑定了模板，则该分类不能有子级 */
		templateCode?: string;
	};

	type BurnAbpPdmProjectManagementProjectChangesCreateProjectChangeDto = {
		/** 关联项目编码 */
		projectCode?: string;
		/** 变更名称 */
		name: string;
		changeType: BurnAbpPdmProjectsChangeType;
		/** 变更描述 */
		description?: string;
		/** 变更原因 */
		reason?: string;
		/** 变更影响分析 */
		impactAnalysis?: string;
		priority: BurnAbpPdmProjectsRiskPriority;
		/** 负责人编码（可选） */
		ownerCode?: string;
		/** 负责人姓名（可选） */
		ownerName?: string;
		/** 计划实施日期 */
		plannedImplementationDate?: string;
		/** 变更备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectChangesExecuteProjectChangeWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmProjectManagementProjectChangesProjectChangeDto = {
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
		/** 项目编码 */
		projectCode?: string;
		/** 变更编码（业务唯一标识） */
		projectChangeCode?: string;
		/** 变更标题 */
		name?: string;
		changeType?: BurnAbpPdmProjectsChangeType;
		/** 变更描述 */
		description?: string;
		/** 变更原因 */
		reason?: string;
		/** 影响分析 */
		impactAnalysis?: string;
		priority?: BurnAbpPdmProjectsRiskPriority;
		/** 申请人编码 */
		requesterCode?: string;
		/** 申请人姓名 */
		requesterName?: string;
		/** 负责人编码 */
		ownerCode?: string;
		/** 负责人姓名 */
		ownerName?: string;
		/** 申请日期 */
		requestDate?: string;
		/** 计划实施日期 */
		plannedImplementationDate?: string;
		/** 实际实施日期 */
		actualImplementationDate?: string;
		/** 完成日期 */
		completionDate?: string;
		/** 审批意见 */
		approvalComments?: string;
		/** 实施结果 */
		implementationResult?: string;
		status?: BurnAbpPdmProjectsChangeStatus;
		/** 备注 */
		remark?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		/** 附件列表 */
		attachments?: BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto[];
	};

	type BurnAbpPdmProjectManagementProjectChangesUpdateProjectChangeDto = {
		/** 变更名称 */
		name: string;
		changeType: BurnAbpPdmProjectsChangeType;
		/** 变更描述 */
		description?: string;
		/** 变更原因 */
		reason?: string;
		/** 变更影响分析 */
		impactAnalysis?: string;
		priority: BurnAbpPdmProjectsRiskPriority;
		/** 负责人编码 */
		ownerCode?: string;
		/** 负责人姓名 */
		ownerName?: string;
		/** 计划实施日期 */
		plannedImplementationDate?: string;
		/** 变更备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectDeliverablesCreateProjectDeliverableDto = {
		/** 项目模板Code（可为空，直接在项目中创建的成果） */
		templateCode?: string;
		/** 项目Code */
		projectCode: string;
		/** 成果编码（唯一标识） */
		deliverableCode: string;
		/** 成果名称 */
		deliverableName: string;
		/** 成果描述 */
		description: string;
		deliverableType: BurnAbpPdmProjectsDeliverableType;
		status?: BurnAbpPdmProjectsDeliverableStatus;
		/** 计划完成日期 */
		plannedDate?: string;
		/** 实际完成日期 */
		actualDate?: string;
		/** 负责人ID */
		responsibleUserId?: string;
		/** 负责人姓名 */
		responsibleUserName?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectDeliverablesDeliverableAttachmentDto = {
		id?: string;
		/** 文件名称 */
		fileName?: string;
		/** 文件路径/URL */
		fileUrl?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		fileType?: BurnAbpPdmProjectManagementFileType;
		/** 备注 */
		remark?: string;
		/** 上传时间 */
		uploadTime?: string;
	};

	type BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto = {
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
		/** 项目模板Code（可为空，直接在项目中创建的成果） */
		templateCode?: string;
		/** 项目Code */
		projectCode?: string;
		/** 成果编码（唯一标识） */
		deliverableCode?: string;
		/** 成果名称 */
		deliverableName?: string;
		/** 成果描述 */
		description?: string;
		deliverableType?: BurnAbpPdmProjectsDeliverableType;
		status?: BurnAbpPdmProjectsDeliverableStatus;
		/** 计划完成日期 */
		plannedDate?: string;
		/** 实际完成日期 */
		actualDate?: string;
		/** 负责人ID */
		responsibleUserId?: string;
		/** 负责人姓名（冗余字段） */
		responsibleUserName?: string;
		/** 备注 */
		remark?: string;
		/** 附件列表（如图纸、报告等），使用 Burn.Abp.Pdm.ProjectManagement.ProjectDeliverables.DeliverableAttachmentDto 描述。 */
		attachments?: BurnAbpPdmProjectManagementProjectDeliverablesDeliverableAttachmentDto[];
	};

	type BurnAbpPdmProjectManagementProjectDeliverablesUpdateProjectDeliverableDto = {
		/** 成果ID（可空）。如果有值表示更新现有成果，如果为null表示创建新成果 */
		id?: string;
		/** 成果名称。 */
		deliverableName: string;
		/** 成果描述。 */
		description: string;
		deliverableType: BurnAbpPdmProjectsDeliverableType;
		status?: BurnAbpPdmProjectsDeliverableStatus;
		/** 计划完成日期。 */
		plannedDate?: string;
		/** 实际完成日期 */
		actualDate?: string;
		/** 负责人用户 ID。 */
		responsibleUserId?: string;
		/** 负责人姓名（冗余）。 */
		responsibleUserName?: string;
		/** 备注信息。 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectDocumentsCreateProjectDocumentDto = {
		/** 文档ID（更新时必填，创建时为空） */
		id?: string;
		/** 项目模板Code */
		templateCode?: string;
		/** 项目Code */
		projectCode?: string;
		/** 文档名称 */
		documentName: string;
		/** 文档地址（可选，用于外部链接） */
		documentUrl?: string;
		/** Blob存储名称（文件在Blob存储中的标识） */
		blobName?: string;
		/** 原始文件名 */
		fileName?: string;
		/** 文件MIME类型 */
		contentType?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** 父级ID */
		parentId?: string;
		/** 父级文档名称（当ParentId为null但需要指定父文档时使用，主要用于创建时的临时引用） */
		parentDocumentName?: string;
		/** 是否允许下载 */
		isDownload?: boolean;
		type: BurnAbpPdmProjectManagementFileType;
		/** 描述 */
		description?: string;
	};

	type BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto = {
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
		/** 项目模板编码（若来源于模板，为空表示直接在项目下创建）。 */
		templateCode?: string;
		/** 关联项目编码。 */
		projectCode?: string;
		/** 文档名称。 */
		documentName?: string;
		/** 文档访问地址（可为相对路径或 URL）。 */
		documentUrl?: string;
		/** Blob存储名称（文件在Blob存储中的标识） */
		blobName?: string;
		/** 原始文件名 */
		fileName?: string;
		/** 文件MIME类型 */
		contentType?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** 父文档 ID（用于构建树形目录）。 */
		parentId?: string;
		/** 父级文档名称（当ParentId为null但需要指定父文档时使用，主要用于创建时的临时引用） */
		parentDocumentName?: string;
		/** 是否允许下载（false 表示仅在线预览）。 */
		isDownload?: boolean;
		type?: BurnAbpPdmProjectManagementFileType;
		/** 文档描述或用途说明。 */
		description?: string;
		/** 下载链接（根据 BlobName 生成）
格式: /api/pdm/project-documents/download/{BlobName} */
		downloadUrl?: string;
		/** 子文档列表（用于构建树形结构，前端需要） */
		children?: BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto[];
	};

	type BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentFileDto = {
		/** 文件名 */
		fileName?: string;
		/** MIME类型 */
		contentType?: string;
		/** 文件内容 */
		content?: string;
	};

	type BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentUploadResultDto = {
		/** Blob存储名称（文件在Blob存储中的标识） */
		blobName?: string;
		/** 原始文件名 */
		fileName?: string;
		/** 文件MIME类型 */
		contentType?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** 文档访问URL（可选，如果支持生成临时访问链接） */
		documentUrl?: string;
		/** 上传时间 */
		uploadTime?: string;
		/** 下载链接（根据 BlobName 生成）
格式: /api/pdm/project-management/project-document-uploads/{BlobName} */
		downloadUrl?: string;
	};

	type BurnAbpPdmProjectManagementProjectDocumentsUpdateProjectDocumentDto = {
		/** 文档名称 */
		documentName: string;
		/** 文档地址（可选，用于外部链接） */
		documentUrl?: string;
		/** Blob存储名称（文件在Blob存储中的标识） */
		blobName?: string;
		/** 原始文件名 */
		fileName?: string;
		/** 文件MIME类型 */
		contentType?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** 父级ID */
		parentId?: string;
		/** 是否允许下载 */
		isDownload?: boolean;
		type: BurnAbpPdmProjectManagementFileType;
		/** 描述 */
		description?: string;
	};

	type BurnAbpPdmProjectManagementProjectFilesProjectFileDto = {
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
		/** 项目Code */
		projectCode?: string;
		/** 文件名称 */
		fileName?: string;
		/** 文件描述 */
		description?: string;
		/** Blob存储名称 */
		blobName?: string;
		/** 原始文件名 */
		originalFileName?: string;
		/** 文件MIME类型 */
		contentType?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** 文件访问URL */
		fileUrl?: string;
		/** 文件类别 */
		fileCategory?: string;
		/** 关联里程碑ID */
		milestoneId?: string;
		/** 关联任务ID */
		taskId?: string;
		/** 上传人ID */
		uploaderId?: string;
		/** 上传人姓名 */
		uploaderName?: string;
	};

	type BurnAbpPdmProjectManagementProjectFormsCreateProjectFormDto = {
		/** 模板编码（可选） */
		templateCode?: string;
		/** 项目编码（可选） */
		projectCode?: string;
		/** 里程碑ID（可选，用于关联特定里程碑的表单） */
		milestoneId?: string;
		/** 表单内容（JSON格式，无限制大小） */
		formContent: string;
		/** 表单名称 */
		formName: string;
		/** 表单描述 */
		description?: string;
		/** 场景Key（可选，用于引用 FormSchema） */
		scenarioKey?: string;
		/** 版本号（可选） */
		version?: string;
	};

	type BurnAbpPdmProjectManagementProjectFormsProjectFormDto = {
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
		/** 模板编码（与ProjectCode互斥，二选一） */
		templateCode?: string;
		/** 项目编码（与TemplateCode互斥，二选一） */
		projectCode?: string;
		/** 里程碑ID（可选，用于关联特定里程碑的表单） */
		milestoneId?: string;
		/** 里程碑编码（可选，用于关联特定里程碑的表单） */
		milestoneCode?: string;
		/** 表单内容（JSON格式，无限制大小） */
		formContent?: string;
		/** 表单名称 */
		formName?: string;
		/** 表单描述 */
		description?: string;
		/** 场景Key（可选，用于引用 FormSchema） */
		scenarioKey?: string;
		/** 是否已发布 */
		isPublished?: boolean;
		/** 状态（0=草稿, 1=审核中, 2=已发布, 3=已废弃） */
		status?: number;
		/** 版本号（可选） */
		version?: string;
	};

	type BurnAbpPdmProjectManagementProjectFormsUpdateProjectFormDto = {
		/** 里程碑ID（可选，用于关联特定里程碑的表单） */
		milestoneId?: string;
		/** 表单内容（JSON格式，无限制大小） */
		formContent: string;
		/** 表单名称 */
		formName: string;
		/** 表单描述 */
		description?: string;
		/** 场景Key（可选，用于引用 FormSchema） */
		scenarioKey?: string;
		/** 版本号（可选） */
		version?: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesActivateIssueDto = {
		/** 问题ID */
		id?: string;
		/** 执行备注 */
		remark?: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
		/** 激活原因（必填） */
		activationReason: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesAddIssueCommentDto = {
		/** 备注内容 */
		remark: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
	};

	type BurnAbpPdmProjectManagementProjectIssuesApproveIssueResolutionDto = {
		/** 问题ID */
		id: string;
		/** 审批意见 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesAssignIssueDto = {
		/** 问题ID */
		id?: string;
		/** 执行备注 */
		remark?: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
		/** 处理人编码 */
		handlerCode: string;
		/** 处理人姓名 */
		handlerName: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesCloseIssueDto = {
		/** 问题ID */
		id?: string;
		/** 执行备注 */
		remark?: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
	};

	type BurnAbpPdmProjectManagementProjectIssuesConfirmReceiveIssueDto = {
		/** 问题ID */
		id?: string;
		/** 执行备注 */
		remark?: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
	};

	type BurnAbpPdmProjectManagementProjectIssuesCreateProjectIssueDto = {
		/** 关联项目编码 */
		projectCode?: string;
		/** 问题名称 */
		name: string;
		/** 问题描述 */
		description?: string;
		/** 问题类别（如：技术问题、管理问题、资源问题、沟通问题） */
		issueCategory?: string;
		/** 关联里程碑ID */
		milestoneId?: string;
		/** 关联里程碑名称（冗余字段） */
		milestoneName?: string;
		severity: BurnAbpPdmProjectsRiskPriority;
		urgency?: BurnAbpPdmProjectsUrgencyLevel;
		/** 处理人编码 */
		handlerCode?: string;
		/** 关联任务编码 */
		taskCode?: string;
		/** 期望解决日期 */
		expectedResolvedDate?: string;
		/** 备注 */
		remark?: string;
		/** 是否需要审批（解决问题时需要审批流程） */
		requiresApproval?: boolean;
		/** 关注人用户ID列表 */
		watcherUserIds?: string[];
		/** 关注人信息列表（推荐：用于返回可读 watcher 信息；不传则后端将使用 ID 兜底） */
		watcherUsers?: BurnAbpPdmProjectManagementSharedWatcherUserInputDto[];
	};

	type BurnAbpPdmProjectManagementProjectIssuesIssueExecutionRecordAttachmentDto = {
		/** Blob存储名称 */
		blobName?: string;
		/** 文件名称 */
		fileName?: string;
		/** 文件路径/URL */
		fileUrl?: string;
		/** 文件大小（字节） */
		fileSize?: number;
		/** MIME类型 */
		contentType?: string;
		/** 附件描述 */
		description?: string;
		/** 上传时间 */
		uploadTime?: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesIssueExecutionRecordDto = {
		id?: string;
		/** 关联问题ID */
		projectIssueId?: string;
		recordType?: BurnAbpPdmProjectsIssueExecutionRecordType;
		/** 记录类型名称(用于前端显示) */
		recordTypeName?: string;
		/** 操作人ID */
		operatorId?: string;
		/** 操作人姓名 */
		operatorName?: string;
		/** 操作时间 */
		operationTime?: string;
		/** 备注说明 */
		remark?: string;
		/** 转发来源用户姓名(仅指派时使用) */
		fromUserName?: string;
		/** 转发目标用户姓名(仅指派时使用) */
		toUserName?: string;
		/** 附件JSON */
		attachmentsJson?: string;
		/** 附件列表（从 AttachmentsJson 解析得到） */
		attachments?: BurnAbpPdmProjectManagementProjectIssuesIssueExecutionRecordAttachmentDto[];
		/** 创建时间 */
		creationTime?: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto = {
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
		projectCode?: string;
		issueCode?: string;
		name?: string;
		description?: string;
		issueCategory?: string;
		milestoneId?: string;
		milestoneName?: string;
		taskId?: string;
		taskCode?: string;
		severity?: BurnAbpPdmProjectsRiskPriority;
		urgency?: BurnAbpPdmProjectsUrgencyLevel;
		handlerCode?: string;
		expectedResolvedDate?: string;
		remark?: string;
		status?: BurnAbpPdmProjectsIssueStatus;
		/** 解决方案 */
		resolution?: string;
		/** 实际解决日期 */
		actualResolutionDate?: string;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		/** 是否被当前用户关注 */
		isWatched?: boolean;
		/** 关注人列表 */
		watchers?: BurnAbpPdmProjectManagementSharedWatcherDto[];
		/** 是否需要审批 */
		requiresApproval?: boolean;
		/** 当前执行周期号 */
		currentCycleNumber?: number;
		/** 总周期数 */
		totalCycles?: number;
		/** 执行周期列表 */
		executionCycles?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueExecutionCycleDto[];
	};

	type BurnAbpPdmProjectManagementProjectIssuesProjectIssueExecutionCycleDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 关联的问题ID */
		projectIssueId?: string;
		/** 问题编码 */
		issueCode?: string;
		/** 周期序号（第几次执行） */
		cycleNumber?: number;
		/** 周期开始时间 */
		startTime?: string;
		/** 周期结束时间 */
		endTime?: string;
		/** 周期状态
0=进行中 1=已完成 2=已取消 */
		status?: number;
		/** 激活原因 */
		activationReason?: string;
		/** 本周期的解决方案 */
		resolution?: string;
		/** 本周期备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesRejectIssueResolutionDto = {
		/** 问题ID */
		id: string;
		/** 拒绝原因 */
		rejectReason: string;
		/** 审批意见 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectIssuesResolveIssueDto = {
		/** 问题ID */
		id?: string;
		/** 执行备注 */
		remark?: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
		/** 解决方案描述 */
		resolution: string;
		/** 是否需要审批
如果为 true,则启动审批流程 */
		requiresApproval?: boolean;
	};

	type BurnAbpPdmProjectManagementProjectIssuesStartProcessingIssueDto = {
		/** 问题ID */
		id?: string;
		/** 执行备注 */
		remark?: string;
		/** 附件JSON(可选，历史兼容字段) */
		attachmentsJson?: string;
		/** 附件ID列表（BlobName列表）
用于关联上传到 EntityDocument 的附件 */
		attachmentIds?: string[];
	};

	type BurnAbpPdmProjectManagementProjectIssuesUpdateProjectIssueDto = {
		/** 问题ID（可空）。如果有值表示更新现有问题，如果为null表示创建新问题 */
		id?: string;
		/** 问题名称 */
		name: string;
		/** 问题描述 */
		description?: string;
		/** 问题类别（如：技术问题、管理问题、资源问题、沟通问题） */
		issueCategory?: string;
		/** 关联里程碑ID */
		milestoneId?: string;
		/** 关联里程碑名称（冗余字段） */
		milestoneName?: string;
		severity: BurnAbpPdmProjectsRiskPriority;
		urgency?: BurnAbpPdmProjectsUrgencyLevel;
		/** 处理人编码 */
		handlerCode?: string;
		/** 关联任务编码 */
		taskCode?: string;
		/** 期望解决日期 */
		expectedResolvedDate?: string;
		/** 备注 */
		remark?: string;
		/** 是否需要审批（解决问题时需要审批流程） */
		requiresApproval?: boolean;
		/** 关注人用户ID列表 */
		watcherUserIds?: string[];
		/** 关注人信息列表（推荐：用于返回可读 watcher 信息；不传则后端将使用 ID 兜底） */
		watcherUsers?: BurnAbpPdmProjectManagementSharedWatcherUserInputDto[];
	};

	type BurnAbpPdmProjectManagementProjectMeetingsCreateProjectMeetingDto = {
		/** 会议名称 */
		meetingName: string;
		/** 会议开始时间 */
		startTime: string;
		/** 会议结束时间 */
		endTime: string;
		/** 会议地点 */
		location?: string;
		/** 主持人ID */
		hostId: string;
		/** 主持人名称 */
		hostName: string;
		/** 记录人ID */
		recorderId: string;
		/** 记录人名称 */
		recorderName: string;
		/** 参会人员ID (多个,以逗号分隔) */
		participantIds: string;
		/** 参会人员名称 (多个,以逗号分隔) */
		participantNames: string;
		/** 会议主要内容 */
		mainContent?: string;
		/** 执行内容 */
		executionContent?: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 项目编码（关联项目） */
		projectCode?: string;
		/** 任务列表（统一处理新增和关联已存在的任务）
- 有 Id：关联已存在的任务
- 无 Id：创建新任务 */
		tasks?: BurnAbpPdmProjectManagementProjectMeetingsUpdateProjectMeetingTaskDto[];
	};

	type BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 会议编号 */
		meetingCode?: string;
		/** 会议名称 */
		meetingName?: string;
		/** 会议开始时间 */
		startTime?: string;
		/** 会议结束时间 */
		endTime?: string;
		/** 会议地点 */
		location?: string;
		/** 主持人ID */
		hostId?: string;
		/** 主持人名称 */
		hostName?: string;
		/** 记录人ID */
		recorderId?: string;
		/** 记录人名称 */
		recorderName?: string;
		/** 参会人员ID (多个,以逗号分隔) */
		participantIds?: string;
		/** 参会人员名称 (多个,以逗号分隔) */
		participantNames?: string;
		/** 会议主要内容 */
		mainContent?: string;
		/** 执行内容 */
		executionContent?: string;
		status?: BurnAbpPdmProjectManagementMeetingStatus;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 项目编码（关联项目） */
		projectCode?: string;
		meetingType?: BurnAbpPdmProjectManagementMeetingType;
		/** 关联的任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
	};

	type BurnAbpPdmProjectManagementProjectMeetingsUpdateProjectMeetingDto = {
		/** 会议名称 */
		meetingName: string;
		/** 会议开始时间 */
		startTime: string;
		/** 会议结束时间 */
		endTime: string;
		/** 会议地点 */
		location?: string;
		/** 主持人ID */
		hostId: string;
		/** 主持人名称 */
		hostName: string;
		/** 记录人ID */
		recorderId: string;
		/** 记录人名称 */
		recorderName: string;
		/** 参会人员ID (多个,以逗号分隔) */
		participantIds: string;
		/** 参会人员名称 (多个,以逗号分隔) */
		participantNames: string;
		/** 会议主要内容 */
		mainContent?: string;
		/** 执行内容 */
		executionContent?: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 项目编码（关联项目） */
		projectCode?: string;
		/** 任务列表（统一处理新增、编辑、删除）
- 有 Id 且数据库存在：更新任务属性
- 无 Id：新增任务
- 数据库存在但列表中没有：删除关联
传入 null 表示不修改任务关联关系 */
		tasks?: BurnAbpPdmProjectManagementProjectMeetingsUpdateProjectMeetingTaskDto[];
	};

	type BurnAbpPdmProjectManagementProjectMeetingsUpdateProjectMeetingTaskDto = {
		/** 任务ID（有值表示更新现有任务，无值表示新增任务） */
		id?: string;
		/** 项目编码（用于生成任务编码） */
		projectCode?: string;
		/** 任务编码（可选，如果不提供将自动生成） */
		taskCode?: string;
		/** 任务名称(新增任务时必填,关联现有任务时可选) */
		taskName?: string;
		/** 任务类型编码(新增任务时必填,关联现有任务时可选) */
		taskTypeCode?: string;
		/** 任务类型名称(新增任务时必填,关联现有任务时可选) */
		taskTypeName?: string;
		/** 描述或补充说明 */
		description?: string;
		/** 父级任务编码 */
		parentCode?: string;
		/** 前置任务编码 */
		frontMountedCode?: string;
		/** 后置任务编码 */
		rearMountedCode?: string;
		/** 负责人ID列表（JSON字符串） */
		chargeIds?: string;
		/** 负责人名称列表（JSON字符串） */
		chargeNames?: string;
		/** 处理人ID列表（JSON字符串） */
		processIds?: string;
		/** 处理人名称列表（JSON字符串） */
		processNames?: string;
		urgencyLevel?: BurnAbpPdmProjectsUrgencyLevel;
		/** 项目分类编码 */
		projectCategoryCode?: string;
		/** 预计工时（小时） */
		estimatedHours?: number;
		/** 关联里程碑ID */
		milestoneId?: string;
		/** 里程碑名称（冗余字段） */
		milestoneName?: string;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesCompleteProjectMilestoneApprovalDto = {
		/** 节点审批人列表（每条对应一个审批节点） */
		approvers: BurnAbpPdmProjectManagementProjectMilestonesMilestoneApproverRouteItemDto[];
	};

	type BurnAbpPdmProjectManagementProjectMilestonesCreateProjectMilestoneDto = {
		/** 模板编码 */
		templateCode?: string;
		/** 关联项目编码 */
		projectCode?: string;
		/** 里程碑名称 */
		milestoneName: string;
		/** 责任人ID
创建模板时可以为空，创建实际项目时必填 */
		responsibleId?: string;
		/** 责任人编码 */
		responsibleCode?: string;
		/** 责任人姓名 */
		responsibleName?: string;
		/** 是否需要审批 */
		isApproval?: boolean;
		/** 审批人编码（作为 Elsa/ABP 的 AssigneeId 使用）
当前一期仅支持单人：不允许包含英文逗号 */
		approverCode?: string;
		/** 审批人名称（展示用，可选） */
		approverName?: string;
		/** 关联审批流标识（推荐保存 Elsa Workflow Definition 的 Name）
说明：按《动态流程代理实现文档》第 8 章推荐使用 StartWorkflowByNameAsync 按 Name 启动；
为兼容历史数据，也允许保存 definitionId（十六进制字符串）。 */
		workflowDefinitionId?: string;
		/** 关联表单ID（一对一关系） */
		formId?: string;
		status?: BurnAbpPdmProjectManagementMilestoneStatus;
		/** 父里程碑ID列表（支持多个父节点）
支持传入 GUID 或里程碑名称（创建模板时使用名称） */
		parentMilestoneIds?: string[];
		/** 排序序号 */
		sequence?: number;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesExecuteProjectMilestoneWorkflowDto = {
		workflowInput: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesMilestoneApproverRouteItemDto = {
		/** 节点名称/Key（需与流程定义中使用的节点标识一致） */
		nodeKey: string;
		/** 审批人编码（作为 Elsa/ABP 的 AssigneeId 使用） */
		approverCode: string;
		/** 审批人姓名（展示用，可选） */
		approverName?: string;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesMilestoneDependencyDto = {
		/** 前置里程碑ID */
		predecessorMilestoneId?: string;
		dependencyType?: BurnAbpPdmProjectsDependencyType;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesMilestoneFormDataDto = {
		/** 里程碑ID */
		milestoneId?: string;
		/** 里程碑名称 */
		milestoneName?: string;
		formDefinition?: BurnAbpPdmProjectManagementProjectFormsProjectFormDto;
		/** 用户提交的表单数据（JSON格式）
null 表示尚未提交 */
		submittedFormData?: string;
		/** 表单提交时间 */
		formSubmittedAt?: string;
		/** 表单提交人编码 */
		formSubmittedByCode?: string;
		/** 表单提交人名称 */
		formSubmittedByName?: string;
		/** 是否已提交表单数据 */
		hasSubmittedData?: boolean;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesMilestoneParentDto = {
		/** 父里程碑ID */
		parentMilestoneId?: string;
		/** 父里程碑名称 */
		parentMilestoneName?: string;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesMilestoneWithTasksDto = {
		/** 里程碑 ID */
		id?: string;
		/** 里程碑编码 */
		milestoneCode?: string;
		/** 里程碑名称 */
		milestoneName?: string;
		/** 统一名称字段（前端树形展示使用，优先使用 MilestoneName，否则使用 MilestoneCode） */
		name?: string;
		/** 项目编码 */
		projectCode?: string;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 实际开始日期 */
		actualStartDate?: string;
		/** 实际结束日期 */
		actualEndDate?: string;
		status?: BurnAbpPdmProjectManagementMilestoneStatus;
		/** 负责人 */
		responsiblePerson?: string;
		/** 描述 */
		description?: string;
		/** 是否为虚拟里程碑（用于显示未分配里程碑的任务） */
		isVirtual?: boolean;
		/** 关联的任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
	};

	type BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto = {
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
		/** 模板编码 */
		templateCode?: string;
		/** 关联项目编码 */
		projectCode?: string;
		/** 里程碑编码（自动生成） */
		milestoneCode?: string;
		/** 里程碑名称 */
		milestoneName?: string;
		/** 责任人ID */
		responsibleId?: string;
		/** 责任人编码 */
		responsibleCode?: string;
		/** 责任人姓名 */
		responsibleName?: string;
		/** 是否需要审批 */
		isApproval?: boolean;
		/** 审批人编码（作为 Elsa/ABP 的 AssigneeId 使用）
当前一期仅支持单人：不允许包含英文逗号 */
		approverCode?: string;
		/** 审批人名称（展示用，可选） */
		approverName?: string;
		/** 关联审批流ID（工作流定义ID）
Elsa 工作流定义ID为字符串类型 */
		workflowDefinitionId?: string;
		/** 关联表单ID（一对一关系）
指向表单结构定义（ProjectForm） */
		formId?: string;
		form?: BurnAbpPdmProjectManagementProjectFormsProjectFormDto;
		/** 提交的表单数据（JSON格式）
用户填写并提交的表单数据 */
		submittedFormData?: string;
		/** 表单提交时间 */
		formSubmittedAt?: string;
		/** 表单提交人编码 */
		formSubmittedByCode?: string;
		/** 表单提交人名称 */
		formSubmittedByName?: string;
		status?: BurnAbpPdmProjectManagementMilestoneStatus;
		/** 父里程碑列表（支持多个父节点） */
		parentMilestones?: BurnAbpPdmProjectManagementProjectMilestonesMilestoneParentDto[];
		/** 父里程碑 ID 列表（便于前端图编辑器直接使用） */
		parentMilestoneIds?: string[];
		/** 父里程碑名称列表（与 Burn.Abp.Pdm.ProjectManagement.ProjectMilestones.ProjectMilestoneDto.ParentMilestoneIds 顺序一致，便于展示） */
		parentMilestoneNames?: string[];
		/** 排序序号 */
		sequence?: number;
		/** 里程碑依赖关系列表 */
		dependencies?: BurnAbpPdmProjectManagementProjectMilestonesMilestoneDependencyDto[];
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 实际开始日期 */
		actualStartDate?: string;
		/** 实际结束日期 */
		actualEndDate?: string;
		/** 任务总数 */
		totalTaskCount?: number;
		/** 已完成任务数 */
		completedTaskCount?: number;
		/** 任务完成率(百分比 0-100) */
		taskCompletionRate?: number;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前活动名称 */
		currentActivityName?: string;
		/** 当前处理人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签列表 */
		workflows?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneWorkflowBookmarkDto[];
	};

	type BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneWorkflowBookmarkDto = {
		/** 工作流定义ID */
		workflowDefinitionId?: string;
		/** 工作流版本 */
		workflowVersion?: number;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 活动ID */
		activityId?: string;
		/** 活动节点ID */
		activityNodeId?: string;
		/** 活动实例ID */
		activityInstanceId?: string;
		/** 活动名称 */
		activityName?: string;
		/** 活动显示名称 */
		activityDisplayName?: string;
		/** 活动描述 */
		activityDescription?: string;
		/** 书签ID */
		bookmarkId?: string;
		/** 处理人ID */
		assigneeId?: string;
		/** 处理人姓名 */
		assigneeName?: string;
		/** 分配时间 */
		assigneeTime?: string;
		/** 表单URL */
		formUrl?: string;
		status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
		/** 完成时间 */
		completionTime?: string;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesSubmitMilestoneFormDataDto = {
		/** 里程碑ID */
		milestoneId: string;
		/** 表单数据（JSON格式）
包含用户填写的所有表单字段和值 */
		formData: string;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesTaskBreakdownDto = {
		/** 项目编码 */
		projectCode?: string;
		/** 项目名称 */
		projectName?: string;
		/** 里程碑列表（包含其关联的任务） */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesMilestoneWithTasksDto[];
		/** 任务总数 */
		totalTaskCount?: number;
		/** 里程碑总数 */
		totalMilestoneCount?: number;
	};

	type BurnAbpPdmProjectManagementProjectMilestonesUpdateProjectMilestoneDto = {
		/** 里程碑名称 */
		milestoneName: string;
		/** 责任人ID
更新模板或项目时可以为空 */
		responsibleId?: string;
		/** 责任人编码 */
		responsibleCode?: string;
		/** 责任人姓名 */
		responsibleName?: string;
		/** 是否需要审批 */
		isApproval?: boolean;
		/** 审批人编码（作为 Elsa/ABP 的 AssigneeId 使用）
当前一期仅支持单人：不允许包含英文逗号 */
		approverCode?: string;
		/** 审批人名称（展示用，可选） */
		approverName?: string;
		/** 关联审批流标识（推荐保存 Elsa Workflow Definition 的 Name）
说明：按《动态流程代理实现文档》第 8 章推荐使用 StartWorkflowByNameAsync 按 Name 启动；
为兼容历史数据，也允许保存 definitionId（十六进制字符串）。 */
		workflowDefinitionId?: string;
		/** 关联表单ID（一对一关系） */
		formId?: string;
		status?: BurnAbpPdmProjectManagementMilestoneStatus;
		/** 父里程碑ID列表（支持多个父节点）
支持传入 GUID 或里程碑名称（创建模板时使用名称） */
		parentMilestoneIds?: string[];
		/** 排序序号 */
		sequence?: number;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
	};

	type BurnAbpPdmProjectManagementProjectRelationsCreateProjectRelationDto = {
		/** 项目编码 */
		projectCode: string;
		relationType: BurnAbpPdmProjectManagementProjectRelationType;
		/** 目标编码 */
		targetCode: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRelationsProjectRelationDto = {
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
		/** 项目编码 */
		projectCode?: string;
		relationType?: BurnAbpPdmProjectManagementProjectRelationType;
		/** 目标编码 */
		targetCode?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRelationsUpdateProjectRelationDto = {
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRelationType = 1 | 2 | 3;

	type BurnAbpPdmProjectManagementProjectRisksApproveRiskResolutionDto = {
		/** 风险ID */
		id: string;
		/** 审批意见 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRisksCreateProjectRiskDto = {
		/** 关联项目编码 */
		projectCode?: string;
		/** 风险名称 */
		name: string;
		/** 风险描述 */
		description?: string;
		priority: BurnAbpPdmProjectsRiskPriority;
		/** 风险类型编码 */
		riskTypeCode?: string;
		/** 处理人编码 */
		handlerCode?: string;
		/** 风险后果描述 */
		consequence?: string;
		/** 影响的里程碑ID */
		milestoneId?: string;
		/** 影响的里程碑名称（冗余字段） */
		milestoneName?: string;
		/** 是否启用评审流程 */
		enableReview?: boolean;
		/** 关注人用户ID列表 */
		watcherUserIds?: string[];
		/** 关注人信息列表（推荐：用于返回可读 watcher 信息；不传则后端将使用 ID 兜底） */
		watcherUsers?: BurnAbpPdmProjectManagementSharedWatcherUserInputDto[];
	};

	type BurnAbpPdmProjectManagementProjectRisksProjectRiskDto = {
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
		projectCode?: string;
		riskCode?: string;
		name?: string;
		description?: string;
		priority?: BurnAbpPdmProjectsRiskPriority;
		riskTypeCode?: string;
		handlerCode?: string;
		consequence?: string;
		status?: BurnAbpPdmProjectsRiskStatus;
		milestoneId?: string;
		milestoneName?: string;
		taskId?: string;
		enableReview?: boolean;
		/** 工作流实例ID */
		workflowInstanceId?: string;
		/** 当前节点名称 */
		currentActivityName?: string;
		/** 当前节点审批人名称 */
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		/** 工作流书签集合 */
		workflows?: BurnAbpPdmWorkflowBookmarkDto[];
		/** 是否被当前用户关注 */
		isWatched?: boolean;
		/** 关注人列表 */
		watchers?: BurnAbpPdmProjectManagementSharedWatcherDto[];
	};

	type BurnAbpPdmProjectManagementProjectRisksRejectRiskResolutionDto = {
		/** 风险ID */
		id: string;
		/** 拒绝原因 */
		rejectReason: string;
		/** 审批意见 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRisksUpdateProjectRiskDto = {
		/** 风险ID（可空）。如果有值表示更新现有风险，如果为null表示创建新风险 */
		id?: string;
		/** 风险名称 */
		name: string;
		/** 风险描述 */
		description?: string;
		priority: BurnAbpPdmProjectsRiskPriority;
		/** 风险类型编码 */
		riskTypeCode?: string;
		/** 处理人编码 */
		handlerCode?: string;
		/** 风险后果描述 */
		consequence?: string;
		/** 影响的里程碑ID */
		milestoneId?: string;
		/** 影响的里程碑名称（冗余字段） */
		milestoneName?: string;
		/** 是否启用评审流程 */
		enableReview?: boolean;
		/** 关注人用户ID列表 */
		watcherUserIds?: string[];
		/** 关注人信息列表（推荐：用于返回可读 watcher 信息；不传则后端将使用 ID 兜底） */
		watcherUsers?: BurnAbpPdmProjectManagementSharedWatcherUserInputDto[];
	};

	type BurnAbpPdmProjectManagementProjectRolesCreateProjectRoleDto = {
		/** 角色编码 */
		code: string;
		/** 角色名称 */
		name: string;
		/** 角色描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRolesProjectRoleDto = {
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
		/** 角色编码（如 PM、QA，用于权限匹配）。 */
		code?: string;
		/** 角色名称。 */
		name?: string;
		/** 角色描述（职责说明）。 */
		description?: string;
		/** 备注信息。 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectRolesUpdateProjectRoleDto = {
		/** 角色编码 */
		code: string;
		/** 角色名称 */
		name: string;
		/** 角色描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectsCreateProjectDto = {
		/** 项目编码 */
		projectCode: string;
		/** 项目名称 */
		projectName: string;
		/** 项目简称 */
		shortName?: string;
		/** 项目分类编码 */
		projectCategoryCode?: string;
		priority: BurnAbpPdmProjectsProjectPriority;
		category?: BurnAbpPdmProjectsProjectCategory;
		/** 关联物料编码 */
		materialCode?: string;
		/** 关联物料名称 */
		materialName?: string;
		/** 父项目ID */
		parentProjectId?: string;
		/** 项目模板编码 */
		templateCode?: string;
		/** 项目周期（天） */
		projectCycle?: number;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 项目描述 */
		description?: string;
		/** 项目目标 */
		objectives?: string;
		/** 项目范围 */
		scope?: string;
		/** 备注 */
		remarks?: string;
		/** 项目图片URL */
		projectImageUrl?: string;
		/** 默认显示表单（是否） */
		showFormByDefault?: boolean;
		/** 项目负责人ID */
		projectManagerId?: string;
		/** 项目负责人姓名 */
		projectManagerName?: string;
		/** 项目里程碑列表 */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto[];
		/** 项目团队成员列表 */
		teamMembers?: BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto[];
		/** 项目任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		/** 项目文档列表 */
		documents?: BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto[];
		/** 项目风险列表 */
		risks?: BurnAbpPdmProjectManagementProjectRisksProjectRiskDto[];
		/** 项目问题列表 */
		issues?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto[];
	};

	type BurnAbpPdmProjectManagementProjectsMilestoneDetailDto = {
		milestone?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto;
		/** 关联的任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		/** 关联的风险列表 */
		risks?: BurnAbpPdmProjectManagementProjectRisksProjectRiskDto[];
		/** 关联的问题列表 */
		issues?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto[];
	};

	type BurnAbpPdmProjectManagementProjectsProjectDto = {
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
		/** 项目编码 */
		projectCode?: string;
		/** 项目名称 */
		projectName?: string;
		/** 项目简称 */
		shortName?: string;
		/** 项目分类编码 */
		projectCategoryCode?: string;
		priority?: BurnAbpPdmProjectsProjectPriority;
		category?: BurnAbpPdmProjectsProjectCategory;
		/** 关联物料编码 */
		materialCode?: string;
		/** 关联物料名称 */
		materialName?: string;
		/** 父项目ID */
		parentProjectId?: string;
		/** 项目模板编码 */
		templateCode?: string;
		/** 当前里程碑ID */
		currentMilestoneId?: string;
		/** 当前里程碑名称 */
		currentMilestoneName?: string;
		currentMilestone?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto;
		/** 项目周期（天） */
		projectCycle?: number;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 实际开始日期 */
		actualStartDate?: string;
		/** 实际结束日期 */
		actualEndDate?: string;
		/** 计划工期(天) */
		plannedDuration?: number;
		/** 实际工期(天) */
		actualDuration?: number;
		status?: BurnAbpPdmProjectsProjectStatus;
		health?: BurnAbpPdmProjectsProjectHealth;
		/** 是否已归档 */
		isArchived?: boolean;
		/** 项目描述 */
		description?: string;
		/** 项目目标 */
		objectives?: string;
		/** 项目范围 */
		scope?: string;
		/** 备注 */
		remarks?: string;
		/** 项目图片URL */
		projectImageUrl?: string;
		/** 默认显示表单（是否） */
		showFormByDefault?: boolean;
		/** 是否已发布 */
		isPublished?: boolean;
		/** 项目负责人ID */
		projectManagerId?: string;
		/** 项目负责人名称 */
		projectManagerName?: string;
		/** 项目里程碑列表 */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto[];
		/** 项目团队成员列表 */
		teamMembers?: BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto[];
		/** 项目任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		/** 项目文档列表 */
		documents?: BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto[];
		/** 项目文件列表 */
		files?: BurnAbpPdmProjectManagementProjectFilesProjectFileDto[];
		/** 项目风险列表 */
		risks?: BurnAbpPdmProjectManagementProjectRisksProjectRiskDto[];
		/** 项目问题列表 */
		issues?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto[];
		/** 项目变更列表 */
		changes?: BurnAbpPdmProjectManagementProjectChangesProjectChangeDto[];
	};

	type BurnAbpPdmProjectManagementProjectsUpdateProjectDto = {
		/** 项目名称 */
		projectName: string;
		/** 项目简称 */
		shortName?: string;
		/** 项目分类编码 */
		projectCategoryCode?: string;
		priority: BurnAbpPdmProjectsProjectPriority;
		category?: BurnAbpPdmProjectsProjectCategory;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 项目描述 */
		description?: string;
		/** 项目目标 */
		objectives?: string;
		/** 项目范围 */
		scope?: string;
		/** 备注 */
		remarks?: string;
		/** 项目图片URL */
		projectImageUrl?: string;
		/** 默认显示表单（是否） */
		showFormByDefault?: boolean;
		/** 项目负责人ID */
		projectManagerId?: string;
		/** 项目负责人姓名 */
		projectManagerName?: string;
		/** 项目里程碑列表 */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto[];
		/** 项目团队成员列表 */
		teamMembers?: BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto[];
		/** 项目任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		/** 项目文档列表 */
		documents?: BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto[];
		/** 项目风险列表 */
		risks?: BurnAbpPdmProjectManagementProjectRisksProjectRiskDto[];
		/** 项目问题列表 */
		issues?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto[];
	};

	type BurnAbpPdmProjectManagementProjectTasksAddTaskIssueInput = {
		/** 任务ID */
		taskId: string;
		/** 问题ID */
		issueId: string;
		/** 备注说明 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksAddTaskIssuesInput = {
		/** 任务ID */
		taskId: string;
		/** 问题ID列表 */
		issueIds: string[];
		/** 备注说明 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksAddTaskRiskInput = {
		/** 任务ID */
		taskId: string;
		/** 风险ID */
		riskId: string;
		/** 备注说明 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksAddTaskRisksInput = {
		/** 任务ID */
		taskId: string;
		/** 风险ID列表 */
		riskIds: string[];
		/** 备注说明 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksAssignTaskDto = {
		/** 任务ID */
		taskId: string;
		/** 被指派人ID */
		assigneeId: string;
		/** 被指派人姓名 */
		assigneeName: string;
		/** 指派备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksCompleteTaskDto = {
		/** 任务ID */
		taskId: string;
		/** 实际开始时间 */
		actualStartTime: string;
		/** 实际完成时间 */
		actualEndTime: string;
		/** 完成备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksCreateProjectTaskDto = {
		/** 任务ID（更新时必填，创建时为空） */
		id?: string;
		/** 项目编码。 */
		projectCode?: string;
		/** 项目模板编码。 */
		templateCode?: string;
		/** 任务编码（唯一标识）。
可选，如果不提供将自动生成。
格式：
- 项目任务：{ProjectCode}任务{流水号}
- 模板任务：{TemplateCode}模板{流水号} */
		taskCode?: string;
		/** 任务名称 */
		taskName: string;
		/** 任务类型编码。 */
		taskTypeCode: string;
		/** 任务类型名称（用于展示）。 */
		taskTypeName: string;
		/** 描述或补充说明。 */
		description?: string;
		/** 父级任务编码，根任务为空。 */
		parentCode?: string;
		/** 前置任务编码（依赖任务）。 */
		frontMountedCode?: string;
		/** 后置任务编码（被当前任务驱动的任务）。 */
		rearMountedCode?: string;
		status?: BurnAbpPdmProjectsTaskStatus;
		/** 负责人 Id 列表（JSON 字符串）。 */
		chargeIds?: string;
		/** 负责人名称列表（JSON 字符串）。 */
		chargeNames?: string;
		/** 处理人 Id 列表（JSON 字符串）。 */
		processIds?: string;
		/** 处理人名称列表（JSON 字符串）。 */
		processNames?: string;
		urgencyLevel?: BurnAbpPdmProjectsUrgencyLevel;
		/** 项目分类编码，用于统计/过滤。 */
		projectCategoryCode?: string;
		/** 预计工时（小时）。 */
		estimatedHours?: number;
		/** 关联里程碑 ID。 */
		milestoneId?: string;
		/** 里程碑名称（冗余字段）。 */
		milestoneName?: string;
		taskSource?: BurnAbpPdmProjectManagementTaskSource;
		/** 来源实体ID（关联 RationalizationProposal/RecordInformation/ProjectMeeting） */
		sourceEntityId?: string;
		/** 会议ID（当任务来源为会议时） */
		meetingId?: string;
		/** 会议编号（冗余字段，用于显示） */
		meetingCode?: string;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 风险列表 */
		risks?: BurnAbpPdmProjectManagementProjectRisksCreateProjectRiskDto[];
		/** 问题列表 */
		issues?: BurnAbpPdmProjectManagementProjectIssuesCreateProjectIssueDto[];
		/** 项目成果列表 */
		deliverables?: BurnAbpPdmProjectManagementProjectDeliverablesCreateProjectDeliverableDto[];
		/** 关注人用户ID列表 */
		watcherUserIds?: string[];
	};

	type BurnAbpPdmProjectManagementProjectTasksProjectTaskDto = {
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
		/** 项目编码，用于快速定位所属项目。 */
		projectCode?: string;
		/** 任务编码（唯一标识）。 */
		taskCode?: string;
		/** 任务名称 */
		taskName?: string;
		/** 统一名称字段（前端树形展示使用，优先使用 TaskName，否则使用 TaskCode） */
		name?: string;
		/** 任务类型编码（引用任务类型字典）。 */
		taskTypeCode?: string;
		/** 任务类型名称（冗余，用于列表显示）。 */
		taskTypeName?: string;
		/** 任务描述或说明。 */
		description?: string;
		/** 父级任务编码（用于树形结构，根任务为空）。 */
		parentCode?: string;
		/** 前置任务编码（依赖的前驱任务）。 */
		frontMountedCode?: string;
		/** 后置任务编码（受当前任务驱动的后续任务）。 */
		rearMountedCode?: string;
		status?: BurnAbpPdmProjectsTaskStatus;
		/** 负责人 Id 列表（JSON 数组），支持多责任人。 */
		chargeIds?: string;
		/** 负责人名称列表（JSON），与 Burn.Abp.Pdm.ProjectManagement.ProjectTasks.ProjectTaskDto.ChargeIds 对应。 */
		chargeNames?: string;
		/** 处理人 Id 列表（JSON），用于实际执行者。 */
		processIds?: string;
		/** 处理人名称列表（JSON），与 Burn.Abp.Pdm.ProjectManagement.ProjectTasks.ProjectTaskDto.ProcessIds 对应。 */
		processNames?: string;
		urgencyLevel?: BurnAbpPdmProjectsUrgencyLevel;
		/** 项目分类编码（便于统计）。 */
		projectCategoryCode?: string;
		/** 预计工时（小时）。 */
		estimatedHours?: number;
		/** 关联里程碑 ID（可为空）。 */
		milestoneId?: string;
		/** 里程碑名称（冗余字段，避免额外查询）。 */
		milestoneName?: string;
		/** 实际执行人ID（开始任务时指定） */
		actualExecutorId?: string;
		/** 实际执行人姓名（冗余字段） */
		actualExecutorName?: string;
		/** 实际开始日期 */
		actualStartDate?: string;
		/** 实际结束日期 */
		actualEndDate?: string;
		taskSource?: BurnAbpPdmProjectManagementTaskSource;
		/** 来源实体ID（关联 RationalizationProposal/RecordInformation/ProjectMeeting） */
		sourceEntityId?: string;
		/** 会议ID（当任务来源为会议时） */
		meetingId?: string;
		/** 会议编号（冗余字段，用于显示） */
		meetingCode?: string;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 是否被当前用户关注 */
		isWatched?: boolean;
		/** 关联的风险列表 */
		risks?: BurnAbpPdmProjectManagementProjectRisksProjectRiskDto[];
		/** 关联的问题列表 */
		issues?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto[];
		/** 关联的项目成果列表 */
		deliverables?: BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto[];
		/** 附件列表 */
		attachments?: BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto[];
		/** 关注人列表 */
		watchers?: BurnAbpPdmProjectManagementSharedWatcherDto[];
	};

	type BurnAbpPdmProjectManagementProjectTasksProjectTaskIssueDto = {
		/** 问题ID */
		issueId?: string;
		/** 问题标题 */
		issueTitle?: string;
		/** 问题类型 */
		issueType?: string;
		/** 问题状态 */
		issueStatus?: string;
		/** 关联时间 */
		creationTime?: string;
		/** 关联人ID */
		creatorId?: string;
		/** 备注说明 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksProjectTaskRiskDto = {
		/** 风险ID */
		riskId?: string;
		/** 风险标题 */
		riskTitle?: string;
		/** 风险等级 */
		riskLevel?: string;
		/** 风险状态 */
		riskStatus?: string;
		/** 关联时间 */
		creationTime?: string;
		/** 关联人ID */
		creatorId?: string;
		/** 备注说明 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksStartTaskDto = {
		/** 任务ID */
		taskId: string;
		/** 实际执行人ID */
		actualExecutorId: string;
		/** 实际执行人姓名 */
		actualExecutorName: string;
		/** 实际开始时间（可选，默认当前时间） */
		actualStartTime?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksTaskExecutionRecordDto = {
		id?: string;
		/** 关联任务ID */
		projectTaskId?: string;
		recordType?: BurnAbpPdmProjectsTaskExecutionRecordType;
		/** 记录类型名称（用于前端显示） */
		recordTypeName?: string;
		/** 操作人ID */
		operatorId?: string;
		/** 操作人姓名 */
		operatorName?: string;
		/** 操作时间 */
		operationTime?: string;
		/** 备注说明 */
		remark?: string;
		/** 转发来源用户姓名（仅指派时使用） */
		fromUserName?: string;
		/** 转发目标用户姓名（仅指派时使用） */
		toUserName?: string;
		/** 创建时间 */
		creationTime?: string;
	};

	type BurnAbpPdmProjectManagementProjectTasksUpdateProjectTaskDto = {
		/** 任务名称 */
		taskName: string;
		/** 任务类型编码 */
		taskTypeCode: string;
		/** 任务类型名称 */
		taskTypeName: string;
		/** 描述 */
		description?: string;
		/** 父级任务编码 */
		parentCode?: string;
		/** 前置任务编码 */
		frontMountedCode?: string;
		/** 后置任务编码 */
		rearMountedCode?: string;
		status?: BurnAbpPdmProjectsTaskStatus;
		/** 负责人Id（Json，支持多个） */
		chargeIds?: string;
		/** 负责人名称（Json，支持多个） */
		chargeNames?: string;
		/** 处理人Id（Json，支持多个） */
		processIds?: string;
		/** 处理人名称（Json，支持多个） */
		processNames?: string;
		urgencyLevel?: BurnAbpPdmProjectsUrgencyLevel;
		/** 项目分类Code */
		projectCategoryCode?: string;
		/** 预计工时 */
		estimatedHours?: number;
		/** 项目里程碑ID */
		milestoneId?: string;
		/** 项目里程碑名称（冗余字段） */
		milestoneName?: string;
		/** 计划开始日期 */
		plannedStartDate?: string;
		/** 计划结束日期 */
		plannedEndDate?: string;
		/** 风险列表（用于增删改） */
		risks?: BurnAbpPdmProjectManagementProjectRisksUpdateProjectRiskDto[];
		/** 问题列表（用于增删改） */
		issues?: BurnAbpPdmProjectManagementProjectIssuesUpdateProjectIssueDto[];
		/** 项目成果列表（用于增删改） */
		deliverables?: BurnAbpPdmProjectManagementProjectDeliverablesUpdateProjectDeliverableDto[];
		/** 关注人用户ID列表 */
		watcherUserIds?: string[];
		taskSource?: BurnAbpPdmProjectManagementTaskSource;
	};

	type BurnAbpPdmProjectManagementProjectTeamMembersCreateProjectTeamMemberDto = {
		/** 项目Code */
		projectCode?: string;
		/** 角色Code */
		projectRoleCode: string;
		/** 角色名称 */
		projectRoleName: string;
		/** 用户ID */
		userId: string;
		/** 用户名称 */
		userName: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto = {
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
		/** 项目编码。 */
		projectCode?: string;
		/** 项目角色编码（如 PM/QA）。 */
		projectRoleCode?: string;
		/** 角色名称（冗余字段，用于展示）。 */
		projectRoleName?: string;
		/** 用户 ID。 */
		userId?: string;
		/** 用户姓名。 */
		userName?: string;
		/** 备注信息。 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTeamMembersUpdateProjectTeamMemberDto = {
		/** 角色Code */
		projectRoleCode: string;
		/** 角色名称 */
		projectRoleName: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementProjectTemplatesCreateProjectTemplateDto = {
		/** 模板编码 */
		templateCode: string;
		/** 模板名称 */
		templateName: string;
		/** 项目分类编码 */
		categoryCode: string;
		/** 是否启用 */
		isActive?: boolean;
		/** 描述 */
		description?: string;
		/** 默认执行第一阶段（是、否） */
		executeFirstPhaseByDefault?: boolean;
		/** 模板角色列表 */
		roles?: BurnAbpPdmProjectManagementProjectTemplatesCreateUpdateTemplateRoleDto[];
		/** 模板里程碑列表 */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesCreateProjectMilestoneDto[];
		/** 模板文档列表 */
		documents?: BurnAbpPdmProjectManagementProjectDocumentsCreateProjectDocumentDto[];
		/** 模板任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksCreateProjectTaskDto[];
	};

	type BurnAbpPdmProjectManagementProjectTemplatesCreateUpdateTemplateRoleDto = {
		/** 项目角色ID */
		roleId?: string;
		/** 是否必需角色 */
		isRequired?: boolean;
	};

	type BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto = {
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
		/** 模板编码。 */
		templateCode?: string;
		/** 模板名称。 */
		templateName?: string;
		/** 适用的项目分类编码。 */
		categoryCode?: string;
		/** 是否启用，false 表示暂存或禁用。 */
		isActive?: boolean;
		/** 描述/使用说明。 */
		description?: string;
		/** 默认执行第一阶段（是、否） */
		executeFirstPhaseByDefault?: boolean;
		/** 模板角色列表 */
		templateRoles?: BurnAbpPdmProjectManagementProjectTemplatesTemplateRoleDto[];
		/** 模板里程碑列表 */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto[];
		/** 模板文档列表 */
		documents?: BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto[];
		/** 模板任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
	};

	type BurnAbpPdmProjectManagementProjectTemplatesTemplateRoleDto = {
		/** 项目角色ID（引用通用配置管理的项目角色） */
		roleId?: string;
		/** 角色编码 */
		roleCode?: string;
		/** 角色名称 */
		roleName?: string;
		/** 是否必需角色 */
		isRequired?: boolean;
	};

	type BurnAbpPdmProjectManagementProjectTemplatesUpdateProjectTemplateDto = {
		/** 模板名称 */
		templateName: string;
		/** 项目分类编码 */
		categoryCode: string;
		/** 是否启用 */
		isActive?: boolean;
		/** 描述 */
		description?: string;
		/** 默认执行第一阶段（是、否） */
		executeFirstPhaseByDefault?: boolean;
		/** 模板角色列表（完全替换） */
		roles?: BurnAbpPdmProjectManagementProjectTemplatesCreateUpdateTemplateRoleDto[];
		/** 模板里程碑列表（完全替换） */
		milestones?: BurnAbpPdmProjectManagementProjectMilestonesCreateProjectMilestoneDto[];
		/** 模板文档列表（完全替换） */
		documents?: BurnAbpPdmProjectManagementProjectDocumentsCreateProjectDocumentDto[];
		/** 模板任务列表（完全替换） */
		tasks?: BurnAbpPdmProjectManagementProjectTasksCreateProjectTaskDto[];
	};

	type BurnAbpPdmProjectManagementRationalizationProposalsCreateRationalizationProposalDto = {
		/** 建议主题 */
		proposalTitle: string;
		/** 提出人ID */
		proposerUserId: string;
		/** 提出人名称 */
		proposerUserName: string;
		/** 参与人ID (多个,以逗号分隔) */
		participantIds?: string;
		/** 参与人名称 (多个,以逗号分隔) */
		participantNames?: string;
		/** 提出时间 */
		proposedDate: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 关联项目ID */
		projectId?: string;
		/** 建议内容描述 */
		description?: string;
		/** 任务列表（统一处理新增和关联已存在的任务）
- 有 Id：关联已存在的任务
- 无 Id：创建新任务 */
		tasks?: BurnAbpPdmProjectManagementRationalizationProposalsUpdateRationalizationProposalTaskDto[];
	};

	type BurnAbpPdmProjectManagementRationalizationProposalsProposalStatus = 0 | 1;

	type BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 建议单号 */
		proposalCode?: string;
		/** 建议主题 */
		proposalTitle?: string;
		implementationStatus?: BurnAbpPdmProjectManagementImplementationStatus;
		/** 提出人ID */
		proposerUserId?: string;
		/** 提出人名称 */
		proposerUserName?: string;
		/** 参与人ID (多个,以逗号分隔) */
		participantIds?: string;
		/** 参与人名称 (多个,以逗号分隔) */
		participantNames?: string;
		/** 提出时间 */
		proposedDate?: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 关联项目ID */
		projectId?: string;
		/** 建议内容描述 */
		description?: string;
		status?: BurnAbpPdmProjectManagementRationalizationProposalsProposalStatus;
		/** 关联的任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		/** 附件列表 */
		attachments?: BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto[];
	};

	type BurnAbpPdmProjectManagementRationalizationProposalsUpdateRationalizationProposalDto = {
		/** 建议主题 */
		proposalTitle: string;
		/** 提出人ID */
		proposerUserId: string;
		/** 提出人名称 */
		proposerUserName: string;
		/** 参与人ID (多个,以逗号分隔) */
		participantIds?: string;
		/** 参与人名称 (多个,以逗号分隔) */
		participantNames?: string;
		/** 提出时间 */
		proposedDate: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 关联项目ID */
		projectId?: string;
		/** 建议内容描述 */
		description?: string;
		/** 任务列表（统一处理新增、编辑、删除）
- 有 Id 且数据库存在：更新任务属性
- 无 Id：新增任务
- 数据库存在但列表中没有：删除关联
传入 null 表示不修改任务关联关系 */
		tasks?: BurnAbpPdmProjectManagementRationalizationProposalsUpdateRationalizationProposalTaskDto[];
	};

	type BurnAbpPdmProjectManagementRationalizationProposalsUpdateRationalizationProposalTaskDto = {
		/** 任务ID（有值表示更新现有任务，无值表示新增任务） */
		id?: string;
		/** 项目编码（用于生成任务编码） */
		projectCode?: string;
		/** 任务编码（可选，如果不提供将自动生成） */
		taskCode?: string;
		/** 任务名称(新增任务时必填,关联现有任务时可选) */
		taskName?: string;
		/** 任务类型编码(新增任务时必填,关联现有任务时可选) */
		taskTypeCode?: string;
		/** 任务类型名称(新增任务时必填,关联现有任务时可选) */
		taskTypeName?: string;
		/** 描述或补充说明 */
		description?: string;
		/** 父级任务编码 */
		parentCode?: string;
		/** 前置任务编码 */
		frontMountedCode?: string;
		/** 后置任务编码 */
		rearMountedCode?: string;
		/** 负责人ID列表（JSON字符串） */
		chargeIds?: string;
		/** 负责人名称列表（JSON字符串） */
		chargeNames?: string;
		/** 处理人ID列表（JSON字符串） */
		processIds?: string;
		/** 处理人名称列表（JSON字符串） */
		processNames?: string;
		urgencyLevel?: BurnAbpPdmProjectsUrgencyLevel;
		/** 项目分类编码 */
		projectCategoryCode?: string;
		/** 预计工时（小时） */
		estimatedHours?: number;
		/** 关联里程碑ID */
		milestoneId?: string;
		/** 里程碑名称（冗余字段） */
		milestoneName?: string;
	};

	type BurnAbpPdmProjectManagementRecordFormType = 1 | 2;

	type BurnAbpPdmProjectManagementRecordInformationCreateRecordInformationDto = {
		/** 主题 (必填) */
		subject: string;
		recordFormType: BurnAbpPdmProjectManagementRecordFormType;
		/** 提出人用户ID (必填) */
		proposerUserId: string;
		/** 提出人用户名 (必填) */
		proposerUserName: string;
		/** 参与人ID列表 (非必填) */
		participantIds?: string;
		/** 参与人名称列表 (非必填) */
		participantNames?: string;
		/** 提出时间 */
		proposedDate: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 关联项目ID（当类型=项目时必填） */
		projectId?: string;
		/** 事项内容 (非必填) */
		eventContent?: string;
		/** 任务列表（统一处理新增和关联已存在的任务）
- 有 Id：关联已存在的任务
- 无 Id：创建新任务 */
		tasks?: BurnAbpPdmProjectManagementRecordInformationUpdateRecordInformationTaskDto[];
	};

	type BurnAbpPdmProjectManagementRecordInformationRecordInformationDto = {
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
		/** 记录单号 */
		recordCode?: string;
		/** 主题 */
		subject?: string;
		recordFormType?: BurnAbpPdmProjectManagementRecordFormType;
		implementationStatus?: BurnAbpPdmProjectManagementImplementationStatus;
		/** 提出人用户ID */
		proposerUserId?: string;
		/** 提出人用户名 */
		proposerUserName?: string;
		/** 参与人ID列表 */
		participantIds?: string;
		/** 参与人名称列表 */
		participantNames?: string;
		/** 提出时间 */
		proposedDate?: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 关联项目ID（当类型=项目时必填） */
		projectId?: string;
		/** 事项内容 */
		eventContent?: string;
		status?: BurnAbpPdmProjectManagementRecordStatus;
		/** 关联的任务列表 */
		tasks?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		/** 附件列表 */
		attachments?: BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto[];
	};

	type BurnAbpPdmProjectManagementRecordInformationUpdateRecordInformationDto = {
		/** 主题 (必填) */
		subject: string;
		recordFormType: BurnAbpPdmProjectManagementRecordFormType;
		/** 提出人用户ID (必填) */
		proposerUserId: string;
		/** 提出人用户名 (必填) */
		proposerUserName: string;
		/** 参与人ID列表 (非必填) */
		participantIds?: string;
		/** 参与人名称列表 (非必填) */
		participantNames?: string;
		/** 提出时间 */
		proposedDate: string;
		/** 是否下发任务 */
		hasTasks?: boolean;
		/** 关联项目ID（当类型=项目时必填） */
		projectId?: string;
		/** 事项内容 (非必填) */
		eventContent?: string;
		/** 任务列表（统一处理新增、编辑、删除）
- 有 Id 且数据库存在：更新任务属性
- 无 Id：新增任务
- 数据库存在但列表中没有：删除关联
传入 null 表示不修改任务关联关系 */
		tasks?: BurnAbpPdmProjectManagementRecordInformationUpdateRecordInformationTaskDto[];
	};

	type BurnAbpPdmProjectManagementRecordInformationUpdateRecordInformationTaskDto = {
		/** 任务ID（有值表示更新现有任务，无值表示新增任务） */
		id?: string;
		/** 项目编码（用于生成任务编码） */
		projectCode?: string;
		/** 任务编码（可选，如果不提供将自动生成） */
		taskCode?: string;
		/** 任务名称(新增任务时必填,关联现有任务时可选) */
		taskName?: string;
		/** 任务类型编码(新增任务时必填,关联现有任务时可选) */
		taskTypeCode?: string;
		/** 任务类型名称(新增任务时必填,关联现有任务时可选) */
		taskTypeName?: string;
		/** 描述或补充说明 */
		description?: string;
		/** 父级任务编码 */
		parentCode?: string;
		/** 前置任务编码 */
		frontMountedCode?: string;
		/** 后置任务编码 */
		rearMountedCode?: string;
		/** 负责人ID列表（JSON字符串） */
		chargeIds?: string;
		/** 负责人名称列表（JSON字符串） */
		chargeNames?: string;
		/** 处理人ID列表（JSON字符串） */
		processIds?: string;
		/** 处理人名称列表（JSON字符串） */
		processNames?: string;
		urgencyLevel?: BurnAbpPdmProjectsUrgencyLevel;
		/** 项目分类编码 */
		projectCategoryCode?: string;
		/** 预计工时（小时） */
		estimatedHours?: number;
		/** 关联里程碑ID */
		milestoneId?: string;
		/** 里程碑名称（冗余字段） */
		milestoneName?: string;
	};

	type BurnAbpPdmProjectManagementRecordStatus = 0 | 1;

	type BurnAbpPdmProjectManagementRiskTypesCreateRiskTypeDto = {
		/** 类型编码 */
		code: string;
		/** 类型名称 */
		name: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementRiskTypesRiskTypeDto = {
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
		/** 类型编码 */
		code?: string;
		/** 类型名称 */
		name?: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementRiskTypesUpdateRiskTypeDto = {
		/** 类型编码 */
		code: string;
		/** 类型名称 */
		name: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementSharedWatcherDto = {
		/** 用户ID */
		userId?: string;
		/** 用户编码 */
		userCode?: string;
		/** 用户名称 */
		userName?: string;
		/** 关注时间 */
		watchedAt?: string;
	};

	type BurnAbpPdmProjectManagementSharedWatcherUserInputDto = {
		/** 用户ID */
		userId?: string;
		/** 用户编码（如工号/账号） */
		userCode?: string;
		/** 用户名称（如姓名） */
		userName?: string;
	};

	type BurnAbpPdmProjectManagementTaskSource = 0 | 1 | 2 | 3 | 4 | 99;

	type BurnAbpPdmProjectManagementTaskTypesCreateTaskTypeDto = {
		/** 类型编码 */
		code: string;
		/** 类型名称 */
		name: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementTaskTypesTaskTypeDto = {
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
		/** 类型编码 */
		code?: string;
		/** 类型名称 */
		name?: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementTaskTypesUpdateTaskTypeDto = {
		/** 类型编码 */
		code: string;
		/** 类型名称 */
		name: string;
		/** 类型描述 */
		description?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementUserWatchesCreateUserWatchDto = {
		/** 用户ID（主键引用） */
		userId: string;
		/** 用户编码（冗余字段，用于显示） */
		userCode: string;
		/** 用户名称（冗余字段，用于显示；建议传入姓名，缺省将使用 UserCode 兜底） */
		userName?: string;
		targetType: BurnAbpPdmProjectManagementWatchTargetType;
		/** 目标对象编码 */
		targetCode: string;
		/** 关注备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementUserWatchesUpdateUserWatchDto = {
		/** 关注备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementUserWatchesUserWatchDto = {
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
		/** 用户ID */
		userId?: string;
		/** 用户编码 */
		userCode?: string;
		/** 用户名称 */
		userName?: string;
		targetType?: BurnAbpPdmProjectManagementWatchTargetType;
		/** 目标对象编码 */
		targetCode?: string;
		/** 关注备注 */
		remark?: string;
	};

	type BurnAbpPdmProjectManagementWatchTargetType = 1 | 2 | 3;

	type BurnAbpPdmProjectsChangeStatus = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70;

	type BurnAbpPdmProjectsChangeType = 0 | 10 | 20 | 30 | 40 | 99;

	type BurnAbpPdmProjectsDeliverableStatus = 0 | 1 | 2 | 3 | 4;

	type BurnAbpPdmProjectsDeliverableType = 1 | 2 | 3 | 4 | 99;

	type BurnAbpPdmProjectsDependencyType = 0 | 1 | 2;

	type BurnAbpPdmProjectsIssueExecutionRecordType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

	type BurnAbpPdmProjectsIssueStatus = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 40;

	type BurnAbpPdmProjectsProjectCategory = 0 | 1 | 2 | 3 | 4;

	type BurnAbpPdmProjectsProjectHealth = 0 | 1 | 2 | 3;

	type BurnAbpPdmProjectsProjectPriority = 0 | 1 | 2 | 3;

	type BurnAbpPdmProjectsProjectStatus = 0 | 10 | 20 | 30 | 40;

	type BurnAbpPdmProjectsRiskPriority = 0 | 10 | 20 | 30;

	type BurnAbpPdmProjectsRiskStatus = 0 | 10 | 15 | 20 | 30;

	type BurnAbpPdmProjectsTaskExecutionRecordType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

	type BurnAbpPdmProjectsTaskStatus = 0 | 1 | 2 | 3 | 4;

	type BurnAbpPdmProjectsUrgencyLevel = 0 | 10 | 20;

	type BurnAbpPdmWorkflowBookmarkDto = {
		/** 工作流定义Id */
		workflowDefinitionId?: string;
		/** 工作流版本 */
		workflowVersion?: number;
		/** 工作流实例Id */
		workflowInstanceId?: string;
		/** 活动Id */
		activityId?: string;
		/** 活动节点Id */
		activityNodeId?: string;
		/** 活动实例Id */
		activityInstanceId?: string;
		/** 活动名称 */
		activityName?: string;
		/** 活动显示名称 */
		activityDisplayName?: string;
		/** 节点描述 */
		activityDescription?: string;
		/** 书签Id */
		bookmarkId?: string;
		assigneeId?: string;
		assigneeName?: string;
		assigneeTime?: string;
		formUrl?: string;
		status?: VoloAbpElsaAbstractEntitiesWorkItemStatus;
		completionTime?: string;
	};

	type CategoryImportImportAsyncParams = {
		/** 冲突处理策略（可覆盖行内设置）

0 = Skip

1 = Update */
		ConflictStrategy?: BurnAbpPdmPartManagementPartCategoriesCategoryImportConflictStrategy;
	};

	type CategoryLevelTemplateAddItemAsyncParams = {
		templateId?: number;
		levelId?: number;
	};

	type CategoryLevelTemplateAddLevelAsyncParams = {
		templateId: number;
	};

	type CategoryLevelTemplateDeleteAsyncParams = {
		id: number;
	};

	type CategoryLevelTemplateDeleteItemAsyncParams = {
		templateId?: number;
		levelId?: number;
		itemId?: number;
	};

	type CategoryLevelTemplateDeleteLevelAsyncParams = {
		templateId?: number;
		levelId?: number;
	};

	type CategoryLevelTemplateExecuteGenerationAsyncParams = {
		templateId: number;
	};

	type CategoryLevelTemplateGetAsyncParams = {
		id: number;
	};

	type CategoryLevelTemplateGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CategoryLevelTemplatePreviewGenerationAsyncParams = {
		templateId: number;
	};

	type CategoryLevelTemplateUpdateAsyncParams = {
		id: number;
	};

	type CategoryLevelTemplateUpdateItemAsyncParams = {
		templateId?: number;
		levelId?: number;
		itemId?: number;
	};

	type CategoryLevelTemplateUpdateLevelAsyncParams = {
		templateId?: number;
		levelId?: number;
	};

	type ChangeOrderDocumentDeleteAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type ChangeOrderDocumentDownloadAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type ChangeOrderDocumentUploadAsyncParams = {
		entityId: string;
		description?: string;
	};

	type ChangeOrderDocumentUploadDeleteAsyncParams = {
		blobName?: string;
	};

	type ChangeOrderDocumentUploadDownloadAsyncParams = {
		blobName?: string;
	};

	type ChangeOrderDocumentUploadUploadAsyncParams = {
		entityId: string;
		fileName?: string;
		contentType?: string;
		fileSize?: number;
		description?: string;
	};

	type DocumentArchiveDeleteAsyncParams = {
		/** 归档ID */
		id: string;
	};

	type DocumentArchiveDownloadAttachmentAsyncParams = {
		/** 归档ID */
		id: string;
	};

	type DocumentArchiveExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentArchiveExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentArchiveGetAsyncParams = {
		/** 归档ID */
		id: string;
	};

	type DocumentArchiveGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentArchiveSubmitAsyncParams = {
		/** 归档ID */
		id: string;
	};

	type DocumentArchiveUpdateAsyncParams = {
		id: string;
	};

	type DocumentAuthorizationDeleteTemplateAsyncParams = {
		templateId: string;
	};

	type DocumentAuthorizationDiagnoseDocumentAsyncParams = {
		documentId?: string;
		/** 

1 = View

2 = List

3 = ViewHistory

4 = DownloadFile

10 = Create

11 = Update

12 = UploadFile

13 = DeleteFile

14 = Delete

20 = CheckOut

21 = CheckIn

22 = ForceUnlock

23 = DiscardRevision

24 = CreateVersion

25 = Submit

26 = Approve

27 = Release

28 = Obsolete

90 = ManagePermissions

91 = Diagnostics */
		permissionAction?: BurnAbpPdmDocumentManagementAuthorizationDocumentPermissionAction;
		userId?: string;
		roleCodes?: string;
		organizationUnitCodes?: string;
		/** 

0 = Public

1 = Internal

2 = Confidential

3 = Secret

4 = TopSecret */
		userMaxSecurityLevel?: BurnAbpPdmDocumentManagementSecurityLevel;
	};

	type DocumentAuthorizationDiagnoseLibraryAsyncParams = {
		libraryId?: string;
		/** 

1 = View

2 = List

3 = ViewHistory

4 = DownloadFile

10 = Create

11 = Update

12 = UploadFile

13 = DeleteFile

14 = Delete

20 = CheckOut

21 = CheckIn

22 = ForceUnlock

23 = DiscardRevision

24 = CreateVersion

25 = Submit

26 = Approve

27 = Release

28 = Obsolete

90 = ManagePermissions

91 = Diagnostics */
		permissionAction?: BurnAbpPdmDocumentManagementAuthorizationDocumentPermissionAction;
		userId?: string;
		roleCodes?: string;
		organizationUnitCodes?: string;
	};

	type DocumentAuthorizationGetCollaboratorsAsyncParams = {
		documentId: string;
	};

	type DocumentAuthorizationGetDocumentAclAsyncParams = {
		documentId: string;
	};

	type DocumentAuthorizationGetLibraryAclAsyncParams = {
		libraryId: string;
	};

	type DocumentAuthorizationUpdateTemplateAsyncParams = {
		templateId: string;
	};

	type DocumentChangeOrderAddAffectedDocumentAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderApproveAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderDeleteAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderGetAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderGetByChangeOrderNumberAsyncParams = {
		changeOrderNumber?: string;
	};

	type DocumentChangeOrderGetItemDetailsListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentChangeOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentChangeOrderGetPendingApprovalsAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentChangeOrderRejectAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderRemoveAffectedDocumentAsyncParams = {
		id: string;
		itemId: string;
	};

	type DocumentChangeOrderSubmitForApprovalAsyncParams = {
		id: string;
	};

	type DocumentChangeOrderUpdateAsyncParams = {
		id: string;
	};

	type DocumentCheckInRequestDeleteAsyncParams = {
		id: string;
	};

	type DocumentCheckInRequestExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentCheckInRequestGetAsyncParams = {
		id: string;
	};

	type DocumentCheckInRequestGetItemDetailsListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentCheckInRequestGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentCheckInRequestSubmitAsyncParams = {
		id: string;
	};

	type DocumentCheckInRequestUpdateAsyncParams = {
		id: string;
	};

	type DocumentCheckOutRequestDeleteAsyncParams = {
		id: string;
	};

	type DocumentCheckOutRequestExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentCheckOutRequestGetAsyncParams = {
		id: string;
	};

	type DocumentCheckOutRequestGetItemDetailsListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentCheckOutRequestGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentCheckOutRequestSubmitAsyncParams = {
		id: string;
	};

	type DocumentCheckOutRequestUpdateAsyncParams = {
		id: string;
	};

	type DocumentClearCADMetadataAsyncParams = {
		/** 文档主键。 */
		id: string;
	};

	type DocumentCompareVersionsAsyncParams = {
		/** 文档 ID */
		documentId?: string;
		/** 源版本 ID */
		sourceVersionId?: string;
		/** 目标版本 ID */
		targetVersionId?: string;
		/** 是否包含未变更项 */
		includeUnchanged?: boolean;
	};

	type DocumentConversionDeleteAsyncParams = {
		id: string;
	};

	type DocumentConversionGetAsyncParams = {
		id: string;
	};

	type DocumentConversionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentConversionGetLogsAsyncParams = {
		conversionId: string;
	};

	type DocumentConversionGetStatisticsAsyncParams = {
		documentId: string;
	};

	type DocumentConversionHandleWebhookCallbackAsyncParams = {
		engineType?: string;
	};

	type DocumentConversionStaticFileGetFileAsyncParams = {
		/** 路由参数：优先按“转换任务ID”解析。
若不存在对应的转换记录，则回退把该参数当作“文件ID(fileId)”，自动定位文件所属的转换任务并返回静态资源。 */
		conversionId: string;
		/** 相对文件路径 (例如: 0/modelObjects.bin 或 source.zip) */
		filePath: string;
	};

	type DocumentConversionStaticFileGetFileByFileIdAsyncParams = {
		/** 文档ID */
		documentId: string;
		/** 文件ID（工作区文件或版本快照文件） */
		fileId: string;
		/** 转换产物相对路径（例如: 0/model.gltf 或 source.zip） */
		filePath: string;
	};

	type DocumentConversionStaticFileGetFileByFileIdAsyncParams = {
		/** 文件ID（工作区文件或版本快照文件） */
		fileId: string;
		/** 转换产物相对路径（例如: 0/model.gltf 或 source.zip） */
		filePath: string;
	};

	type DocumentConversionUpdateAsyncParams = {
		id: string;
	};

	type DocumentConversionWebhookHandleWebhookCallbackParams = {
		/** 引擎类型（路径参数） */
		engineType: string;
	};

	type DocumentDeleteAsyncParams = {
		id: string;
	};

	type DocumentFileAddFileAsyncParams = {
		documentId: string;
	};

	type DocumentFileContentDownloadAsZipAsyncParams = {
		documentId: string;
	};

	type DocumentFileContentGetContentAsyncParams = {
		documentId: string;
		fileId: string;
	};

	type DocumentFileDeleteFileAsyncParams = {
		/** 文档主键 */
		documentId?: string;
		/** 附件主键 */
		fileId?: string;
	};

	type DocumentFileDownloadCurrentRevisionFilesAsZipAsyncParams = {
		/** 文档主键 */
		documentId: string;
	};

	type DocumentFileDownloadFileAsyncParams = {
		/** 文档主键 */
		documentId?: string;
		/** 附件主键 */
		fileId?: string;
	};

	type DocumentFileDownloadVersionFileAsyncParams = {
		documentId?: string;
		versionId?: string;
		fileId?: string;
	};

	type DocumentFileDownloadVersionFilesAsZipAsyncParams = {
		documentId?: string;
		versionId?: string;
	};

	type DocumentFileGetFilesAsyncParams = {
		/** 文档主键 */
		documentId: string;
	};

	type DocumentFileGetPreviewInfoAsyncParams = {
		documentId?: string;
		fileId?: string;
	};

	type DocumentFileGetVersionFilesAsyncParams = {
		documentId?: string;
		versionId?: string;
	};

	type DocumentFindByNumberAsyncParams = {
		/** 文档编号。 */
		documentNumber?: string;
	};

	type DocumentGetAsyncParams = {
		id: string;
	};

	type DocumentGetAuditLogsAsyncParams = {
		/** 文档 ID */
		documentId: string;
		/** 操作类型过滤

0 = Created

1 = Updated

2 = Deleted

10 = CheckedOut

11 = CheckedIn

12 = CheckOutCancelled

20 = VersionCreated

21 = VersionPublished

22 = VersionVoided

23 = VersionCompared

30 = FileUploaded

31 = FileDownloaded

32 = FileDeleted

33 = FilePreviewed

34 = FilesDownloadedAsZip

40 = SubmittedForApproval

41 = Approved

42 = Rejected

50 = Obsoleted

51 = Restored

52 = SecurityLevelChanged */
		OperationType?: BurnAbpPdmDocumentManagementDocumentOperationType;
		/** 开始时间 */
		StartTime?: string;
		/** 结束时间 */
		EndTime?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentGetVersionAsyncParams = {
		versionId: string;
	};

	type DocumentGetVersionHistoryAsyncParams = {
		documentId: string;
	};

	type DocumentGetVersionListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentLibraryActivateAsyncParams = {
		/** 文档库主键。 */
		id: string;
	};

	type DocumentLibraryDeactivateAsyncParams = {
		/** 文档库主键。 */
		id: string;
	};

	type DocumentLibraryDeleteAsyncParams = {
		id: string;
	};

	type DocumentLibraryExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentLibraryFindByCodeAsyncParams = {
		/** 文档库编码。 */
		libraryCode?: string;
	};

	type DocumentLibraryGetAsyncParams = {
		id: string;
	};

	type DocumentLibraryGetChildrenAsyncParams = {
		/** 父级文档库 Id，根节点为空。 */
		parentLibraryId: string;
	};

	type DocumentLibraryGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentLibraryUpdateAsyncParams = {
		id: string;
	};

	type DocumentLifecycleApproveAsyncParams = {
		id: string;
	};

	type DocumentLifecycleApproveRevisionAsyncParams = {
		id: string;
	};

	type DocumentLifecycleCheckInAsyncParams = {
		id: string;
	};

	type DocumentLifecycleCheckOutAsyncParams = {
		id: string;
		comment?: string;
	};

	type DocumentLifecycleCreateRevisionAsyncParams = {
		id: string;
	};

	type DocumentLifecycleDiscardRevisionAsyncParams = {
		id: string;
		reason?: string;
	};

	type DocumentLifecycleForceUnlockAsyncParams = {
		id: string;
		reason?: string;
	};

	type DocumentLifecycleObsoleteAsyncParams = {
		id: string;
		reason?: string;
	};

	type DocumentLifecycleReleaseAsyncParams = {
		id: string;
	};

	type DocumentLifecycleSubmitForApprovalAsyncParams = {
		id: string;
	};

	type DocumentLifecycleSubmitRevisionForApprovalAsyncParams = {
		id: string;
	};

	type DocumentObsolescenceRequestDeleteAsyncParams = {
		id: string;
	};

	type DocumentObsolescenceRequestExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentObsolescenceRequestGetAsyncParams = {
		id: string;
	};

	type DocumentObsolescenceRequestGetByDocumentIdAsyncParams = {
		documentId: string;
	};

	type DocumentObsolescenceRequestGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentObsolescenceRequestGetMyApplicationsAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentObsolescenceRequestGetPendingApprovalListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentObsolescenceRequestSubmitAsyncParams = {
		id: string;
	};

	type DocumentObsolescenceRequestUpdateAsyncParams = {
		id: string;
	};

	type DocumentObsolescenceRequestWithdrawAsyncParams = {
		id: string;
		reason?: string;
	};

	type DocumentPublishRequestDeleteAsyncParams = {
		id: string;
	};

	type DocumentPublishRequestExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentPublishRequestGetAsyncParams = {
		id: string;
	};

	type DocumentPublishRequestGetItemDetailsListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentPublishRequestGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentPublishRequestSubmitAsyncParams = {
		id: string;
	};

	type DocumentPublishRequestUpdateAsyncParams = {
		id: string;
	};

	type DocumentRecycleOrderAddItemAsyncParams = {
		/** 回收单 ID。 */
		id: string;
	};

	type DocumentRecycleOrderApproveAsyncParams = {
		/** 回收单 ID。 */
		id: string;
	};

	type DocumentRecycleOrderDeleteAsyncParams = {
		id: string;
	};

	type DocumentRecycleOrderExecuteWorkflowAsyncParams = {
		/** 回收单 ID。 */
		id: string;
	};

	type DocumentRecycleOrderGetAsyncParams = {
		id: string;
	};

	type DocumentRecycleOrderGetItemDetailsListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentRecycleOrderGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentRecycleOrderRejectAsyncParams = {
		/** 回收单 ID。 */
		id: string;
		/** 驳回原因。 */
		reason?: string;
	};

	type DocumentRecycleOrderRemoveItemAsyncParams = {
		/** 回收单 ID。 */
		id: string;
		/** 明细 ID。 */
		itemId: string;
	};

	type DocumentRecycleOrderSubmitAsyncParams = {
		/** 回收单 ID。 */
		id: string;
	};

	type DocumentRecycleOrderUpdateAsyncParams = {
		/** 回收单 ID。 */
		id: string;
	};

	type DocumentRecycleOrderUpdateItemAsyncParams = {
		/** 回收单 ID。 */
		id: string;
		/** 明细 ID。 */
		itemId: string;
	};

	type DocumentReleaseAddDocumentAsyncParams = {
		id: string;
	};

	type DocumentReleaseAddRecipientAsyncParams = {
		id: string;
	};

	type DocumentReleaseCloseAsyncParams = {
		id: string;
	};

	type DocumentReleaseConfirmationRecordConfirmAsyncParams = {
		id: string;
	};

	type DocumentReleaseConfirmationRecordGetAsyncParams = {
		id: string;
	};

	type DocumentReleaseConfirmationRecordGetListAsyncParams = {
		/** 发放单ID */
		DocumentReleaseId?: string;
		/** 接收人ID */
		RecipientId?: string;
		/** 发放文档项ID */
		ReleaseDocumentItemId?: string;
		/** 确认状态

0 = Pending

10 = Confirmed

20 = Rejected

30 = Recalled */
		ConfirmationStatus?: BurnAbpPdmDocumentManagementRecipientConfirmationStatus;
		/** 文档编号（模糊查询） */
		DocumentNumber?: string;
		/** 文档名称（模糊查询） */
		DocumentName?: string;
		/** 接收人姓名（模糊查询） */
		RecipientName?: string;
		/** 确认日期起始 */
		ConfirmedDateFrom?: string;
		/** 确认日期结束 */
		ConfirmedDateTo?: string;
		/** 是否首发 */
		IsFirstRelease?: boolean;
		/** 发文号（模糊查询） */
		ReleaseNumber?: string;
		/** 发放描述（模糊查询） */
		Description?: string;
		/** 部门/班组名称（模糊查询） */
		DepartmentName?: string;
		/** 生效日期起始 */
		EffectiveDateFrom?: string;
		/** 生效日期结束 */
		EffectiveDateTo?: string;
		/** 失效日期起始 */
		ExpiredDateFrom?: string;
		/** 失效日期结束 */
		ExpiredDateTo?: string;
		/** 创建时间起始 */
		CreationTimeFrom?: string;
		/** 创建时间结束 */
		CreationTimeTo?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentReleaseConfirmationRecordRejectAsyncParams = {
		id: string;
	};

	type DocumentReleaseConfirmReceiptAsyncParams = {
		id: string;
		confirmNote?: string;
	};

	type DocumentReleaseDeleteAsyncParams = {
		id: string;
	};

	type DocumentReleaseExecuteAsyncParams = {
		id: string;
	};

	type DocumentReleaseExecuteWorkflowAsyncParams = {
		id: string;
	};

	type DocumentReleaseGetAsyncParams = {
		id: string;
	};

	type DocumentReleaseGetDailySummaryListAsyncParams = {
		/** 发放日期起始 */
		ReleasedDateFrom?: string;
		/** 发放日期结束 */
		ReleasedDateTo?: string;
		/** 文档编号（模糊查询） */
		DocumentNumber?: string;
		/** 文档名称（模糊查询） */
		DocumentName?: string;
		/** 发放版本（模糊查询） */
		ReleaseVersion?: string;
		/** 是否首发 */
		IsFirstRelease?: boolean;
		/** 回收版本（模糊查询） */
		RecallVersion?: string;
		/** 动态查询条件（Gridify格式）
示例: "DocumentNumber contains ABC, Copies > 5" */
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentReleaseGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentReleaseMarkDocumentRecalledAsyncParams = {
		id: string;
		documentItemId: string;
		recallDate?: string;
		recallNote?: string;
	};

	type DocumentReleaseRemoveDocumentAsyncParams = {
		id: string;
		documentItemId: string;
	};

	type DocumentReleaseRemoveRecipientAsyncParams = {
		id: string;
		recipientId: string;
	};

	type DocumentReleaseSetNonRecallRecipientsAsyncParams = {
		id: string;
		documentItemId: string;
	};

	type DocumentReleaseSubmitAsyncParams = {
		id: string;
	};

	type DocumentReleaseUpdateAsyncParams = {
		id: string;
	};

	type DocumentRevisionGetCurrentRevisionAsyncParams = {
		documentId: string;
	};

	type DocumentRevisionGetRevisionFilesAsyncParams = {
		documentId: string;
	};

	type DocumentTypeActivateAsyncParams = {
		id: string;
	};

	type DocumentTypeDeactivateAsyncParams = {
		id: string;
	};

	type DocumentTypeDeleteAsyncParams = {
		id: string;
	};

	type DocumentTypeGetAsyncParams = {
		id: string;
	};

	type DocumentTypeGetByCodeAsyncParams = {
		typeCode?: string;
	};

	type DocumentTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DocumentTypeSetSortOrderAsyncParams = {
		id: string;
		sortOrder?: number;
	};

	type DocumentTypeUpdateAsyncParams = {
		id: string;
	};

	type DocumentUpdateAsyncParams = {
		id: string;
	};

	type DocumentUpdateCADMetadataAsyncParams = {
		/** 文档主键。 */
		id: string;
	};

	type DocumentUpdateWorkingAsyncParams = {
		/** 文档ID */
		id: string;
	};

	type EngineeringChangeNotificationApproveAsyncParams = {
		id: string;
	};

	type EngineeringChangeNotificationCancelAsyncParams = {
		id: string;
		cancellationReason?: string;
	};

	type EngineeringChangeNotificationDeleteAsyncParams = {
		id: string;
	};

	type EngineeringChangeNotificationGetAsyncParams = {
		id: string;
	};

	type EngineeringChangeNotificationGetByChangeOrderNumberAsyncParams = {
		changeOrderNumber?: string;
	};

	type EngineeringChangeNotificationGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type EngineeringChangeNotificationLinkSourceChangeOrderAsyncParams = {
		id: string;
		sourceChangeOrderId: string;
	};

	type EngineeringChangeNotificationRejectAsyncParams = {
		id: string;
	};

	type EngineeringChangeNotificationSubmitForApprovalAsyncParams = {
		id: string;
	};

	type EngineeringChangeNotificationUpdateAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderApproveAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderCancelAsyncParams = {
		id: string;
		cancellationReason?: string;
	};

	type EngineeringChangeOrderDeleteAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderExecuteAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderGetAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderGetByChangeOrderNumberAsyncParams = {
		changeOrderNumber?: string;
	};

	type EngineeringChangeOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type EngineeringChangeOrderRejectAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderSetEffectiveDateAsyncParams = {
		id: string;
		effectiveDate?: string;
	};

	type EngineeringChangeOrderSetInventoryDispositionStrategyAsyncParams = {
		id: string;
		strategy?: string;
	};

	type EngineeringChangeOrderSubmitForApprovalAsyncParams = {
		id: string;
	};

	type EngineeringChangeOrderUpdateAsyncParams = {
		id: string;
	};

	type EngineeringFileNotificationDeleteAsyncParams = {
		/** 通知单ID */
		id: string;
	};

	type EngineeringFileNotificationDownloadAttachmentAsyncParams = {
		/** 通知单ID */
		id: string;
	};

	type EngineeringFileNotificationExecuteWorkflowAsyncParams = {
		/** 通知单ID */
		id: string;
	};

	type EngineeringFileNotificationExportListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type EngineeringFileNotificationGetAsyncParams = {
		/** 通知单ID */
		id: string;
	};

	type EngineeringFileNotificationGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type EngineeringFileNotificationUpdateAsyncParams = {
		id: string;
	};

	type EngineeringFileNotificationWorkflowContextGetAsyncParams = {
		id: string;
	};

	type IssueTypeDeleteAsyncParams = {
		id: string;
	};

	type IssueTypeGetAsyncParams = {
		id: string;
	};

	type IssueTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type IssueTypeUpdateAsyncParams = {
		id: string;
	};

	type PartApplicationRequestCancelAsyncParams = {
		id: string;
	};

	type PartApplicationRequestDeleteAsyncParams = {
		id: string;
	};

	type PartApplicationRequestExecuteWorkflowAsyncParams = {
		id: string;
	};

	type PartApplicationRequestGetAsyncParams = {
		id: string;
	};

	type PartApplicationRequestGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartApplicationRequestSubmitAsyncParams = {
		id: string;
	};

	type PartApplicationRequestUpdateAsyncParams = {
		id: string;
	};

	type PartApproveAsyncParams = {
		id: number;
	};

	type PartCategoryAttributeDeleteAsyncParams = {
		id: string;
	};

	type PartCategoryAttributeGetByCategoryIdAsyncParams = {
		categoryId: number;
	};

	type PartCategoryAttributeUpdateAsyncParams = {
		id: string;
	};

	type PartCategoryDeleteAsyncParams = {
		id: number;
	};

	type PartCategoryGetAsyncParams = {
		id: number;
	};

	type PartCategoryGetChildrenAsyncParams = {
		/** 父分类 Id，空表示根。 */
		parentId: number;
	};

	type PartCategoryGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartCategoryRuleMappingDeleteAsyncParams = {
		id: string;
	};

	type PartCategoryRuleMappingGetAsyncParams = {
		id: string;
	};

	type PartCategoryRuleMappingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartCategoryRuleMappingUpdateAsyncParams = {
		id: string;
	};

	type PartCategoryUpdateAsyncParams = {
		id: number;
	};

	type PartChangeRecordGetLatestByPartIdAsyncParams = {
		partId: number;
	};

	type PartChangeRecordGetListByPartIdAsyncParams = {
		partId: number;
	};

	type PartChangeRecordGetListByPartNumberAsyncParams = {
		partNumber?: string;
	};

	type PartCheckInAsyncParams = {
		id: number;
	};

	type PartCheckOutAsyncParams = {
		id: number;
	};

	type PartCreateNewVersionAsyncParams = {
		/** 当前物料主键 */
		id: number;
	};

	type PartDeleteAsyncParams = {
		/** 物料主键。 */
		id: number;
	};

	type PartDocumentChangeOrderDeleteAsyncParams = {
		/** 更改单ID */
		id: string;
	};

	type PartDocumentChangeOrderDownloadAttachmentAsyncParams = {
		/** 更改单ID */
		id: string;
	};

	type PartDocumentChangeOrderDownloadItemFileAsyncParams = {
		/** 更改单ID */
		orderId?: string;
		/** 文档项ID */
		itemId?: string;
	};

	type PartDocumentChangeOrderExecuteWorkflowAsyncParams = {
		id: string;
	};

	type PartDocumentChangeOrderExportListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartDocumentChangeOrderGetAsyncParams = {
		/** 更改单ID */
		id: string;
	};

	type PartDocumentChangeOrderGetDocumentsByMaterialCodeAsyncParams = {
		materialCode?: string;
	};

	type PartDocumentChangeOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartDocumentChangeOrderGetMaterialCodesAsyncParams = {
		keyword?: string;
		maxResultCount?: number;
	};

	type PartDocumentChangeOrderMatchDocumentByAttachmentNameAsyncParams = {
		fileName?: string;
	};

	type PartDocumentChangeOrderUpdateAsyncParams = {
		id: string;
	};

	type PartDocumentLinkDeleteAsyncParams = {
		id: string;
	};

	type PartDocumentLinkGetAsyncParams = {
		id: string;
	};

	type PartDocumentLinkGetDocumentsByPartAsyncParams = {
		/** 目标料号（必填） */
		PartNumber: string;
		/** 是否同时带出 BOM 子项的关联文档 */
		IncludeBomChildren?: boolean;
		/** 可选过滤：仅返回指定用途的关联

10 = Design2D (2D设计图纸)

20 = Design3D (3D设计模型)

30 = WorkInstruction (作业指导书)

40 = InspectionPlan (检验计划)

50 = Certification (认证证书)

60 = SafetyDataSheet (安全数据表)

70 = Packaging (包装规范)

80 = SupplierDocument (供应商文档)

90 = TechnicalSpecification (技术规范)

999 = Others (其他) */
		Usage?: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 可选过滤：仅返回主要关联 */
		IsPrimary?: boolean;
	};

	type PartDocumentLinkGetListAsyncParams = {
		/** 物料编号集合 */
		PartNumbers?: string[];
		/** 关联用途过滤

10 = Design2D (2D设计图纸)

20 = Design3D (3D设计模型)

30 = WorkInstruction (作业指导书)

40 = InspectionPlan (检验计划)

50 = Certification (认证证书)

60 = SafetyDataSheet (安全数据表)

70 = Packaging (包装规范)

80 = SupplierDocument (供应商文档)

90 = TechnicalSpecification (技术规范)

999 = Others (其他) */
		Usage?: BurnAbpPdmPartManagementEnumsRelationUsage;
		/** 是否仅查询主要关联 */
		IsPrimary?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartDocumentLinkGetPartsByDocumentAsyncParams = {
		/** 文档编码（必填） */
		DocumentNumber: string;
		/** 是否向上递归父项 BOM 以获取更高层物料 */
		IncludeBomAncestors?: boolean;
	};

	type PartDocumentLinkUpdateAsyncParams = {
		id: string;
	};

	type PartExportAsyncParams = {
		CategoryCode?: string;
		Keyword?: string;
		StartDate?: string;
		EndDate?: string;
	};

	type PartGetAsyncParams = {
		/** 物料主键。 */
		id: number;
	};

	type PartGetImportTemplateAsyncParams = {
		categoryCode?: string;
	};

	type PartGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartGetVersionHistoryAsyncParams = {
		/** 物料编号。 */
		partNumber?: string;
	};

	type PartGetVersionHistoryByIdAsyncParams = {
		/** 物料主键。 */
		id: number;
	};

	type PartImportAsyncParams = {
		/** 是否忽略警告 */
		IgnoreWarnings?: boolean;
	};

	type PartObsoleteAsyncParams = {
		/** 物料主键。 */
		id: number;
	};

	type PartRejectAsyncParams = {
		id: number;
	};

	type PartReleaseAsyncParams = {
		/** 物料主键。 */
		id: number;
	};

	type PartSubmitAsyncParams = {
		id: number;
	};

	type PartUndoCheckOutAsyncParams = {
		id: number;
	};

	type PartUpdateAsyncParams = {
		/** 物料主键。 */
		id: number;
	};

	type PartVersionGetAsyncParams = {
		/** 版本 ID */
		id: number;
	};

	type PartVersionGetDraftAsyncParams = {
		/** 物料 ID */
		partId: number;
	};

	type PartVersionGetVersionHistoryAsyncParams = {
		/** 物料 ID */
		partId: number;
	};

	type PartVersionUpdateDraftAsyncParams = {
		/** 版本 ID */
		id: number;
	};

	type PartWithdrawApprovalAsyncParams = {
		id: number;
	};

	type PdmPartNumberRuleDefinitionDeleteAsyncParams = {
		id: number;
	};

	type PdmPartNumberRuleDefinitionGetAsyncParams = {
		id: number;
	};

	type PdmPartNumberRuleDefinitionGetListAsyncParams = {
		Keyword?: string;
		Active?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PdmPartNumberRuleDefinitionSetDefaultAsyncParams = {
		id: number;
	};

	type PdmPartNumberRuleDefinitionUpdateAsyncParams = {
		id: number;
	};

	type PdmWorkflowEntityGetAsyncParams = {
		workflowName?: string;
		id: string;
	};

	type PdmWorkflowEntityGetListAsyncParams = {
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

	type ProcessProcedureCategoryDeleteAsyncParams = {
		id: number;
	};

	type ProcessProcedureCategoryGetAsyncParams = {
		id: number;
	};

	type ProcessProcedureCategoryGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProcessProcedureCategoryUpdateAsyncParams = {
		id: number;
	};

	type ProcessProcedureDeleteAsyncParams = {
		id: number;
	};

	type ProcessProcedureGetAsyncParams = {
		id: number;
	};

	type ProcessProcedureGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProcessProcedureUpdateAsyncParams = {
		id: number;
	};

	type ProcessRouteCheckAsyncParams = {
		id: number;
	};

	type ProcessRouteDeleteAsyncParams = {
		id: number;
	};

	type ProcessRouteGetAsyncParams = {
		id: number;
	};

	type ProcessRouteGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProcessRouteGetVersionListByCodeAsyncParams = {
		code?: string;
	};

	type ProcessRouteSubmitAsyncParams = {
		id: number;
		submitForCheck?: boolean;
	};

	type ProcessRouteUnCheckAsyncParams = {
		id: number;
	};

	type ProcessRouteUnSubmitAsyncParams = {
		id: number;
	};

	type ProcessRouteUpdateAsyncParams = {
		id: number;
	};

	type ProductSeriesActivateAsyncParams = {
		id: number;
	};

	type ProductSeriesDeactivateAsyncParams = {
		id: number;
	};

	type ProductSeriesDeleteAsyncParams = {
		id: number;
	};

	type ProductSeriesGetAncestorsAsyncParams = {
		id: number;
	};

	type ProductSeriesGetAsyncParams = {
		id: number;
	};

	type ProductSeriesGetChildrenAsyncParams = {
		parentId: number;
		includeInactive?: boolean;
	};

	type ProductSeriesGetDescendantsAsyncParams = {
		id: number;
	};

	type ProductSeriesGetFullPathAsyncParams = {
		id: number;
	};

	type ProductSeriesGetListAsyncParams = {
		/** 关键字搜索（编码或名称） */
		Filter?: string;
		/** 父系列ID（null 表示获取根节点） */
		ParentId?: number;
		/** 是否包含禁用的系列 */
		IncludeInactive?: boolean;
		/** 是否只返回叶子节点 */
		IsLeaf?: boolean;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProductSeriesIsSeriesCodeExistsAsyncParams = {
		seriesCode?: string;
		excludeId: number;
	};

	type ProductSeriesMoveAsyncParams = {
		id: number;
	};

	type ProductSeriesUpdateAsyncParams = {
		id: number;
	};

	type ProjectAddProjectManagerAsyncParams = {
		/** 项目ID */
		id: string;
		/** 用户ID */
		userId: string;
		/** 用户名称 */
		userName?: string;
	};

	type ProjectArchiveAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectCancelAsyncParams = {
		/** 项目ID */
		id: string;
		/** 取消原因 */
		reason?: string;
	};

	type ProjectCategoryDeleteAsyncParams = {
		id: string;
	};

	type ProjectCategoryGetAsyncParams = {
		id: string;
	};

	type ProjectCategoryGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectCategoryGetTreeAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectCategoryUpdateAsyncParams = {
		id: string;
	};

	type ProjectChangeApproveAsyncParams = {
		/** 变更ID */
		id: string;
		/** 审批意见（可选） */
		comments?: string;
	};

	type ProjectChangeCancelAsyncParams = {
		/** 变更ID */
		id: string;
		/** 取消原因（可选） */
		reason?: string;
	};

	type ProjectChangeCheckEntityExistsAsyncParams = {
		id: string;
	};

	type ProjectChangeCompleteAsyncParams = {
		/** 变更ID */
		id: string;
	};

	type ProjectChangeDeleteAsyncParams = {
		id: string;
	};

	type ProjectChangeDiagnoseWorkflowAsyncParams = {
		id: string;
	};

	type ProjectChangeExecuteWorkflowAsyncParams = {
		/** 变更ID */
		id: string;
	};

	type ProjectChangeGetAsyncParams = {
		id: string;
	};

	type ProjectChangeGetByCodeAsyncParams = {
		/** 变更编码 */
		code?: string;
	};

	type ProjectChangeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectChangeGetListByProjectCodeAsyncParams = {
		/** 项目编码 */
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectChangeGetListByStatusAsyncParams = {
		/** 变更状态

0 = Draft

10 = PendingApproval

20 = InApproval

30 = Approved

40 = Rejected

50 = InProgress

60 = Completed

70 = Cancelled */
		status?: BurnAbpPdmProjectsChangeStatus;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectChangeRejectAsyncParams = {
		/** 变更ID */
		id: string;
		/** 拒绝原因 */
		reason?: string;
	};

	type ProjectChangeStartImplementationAsyncParams = {
		/** 变更ID */
		id: string;
	};

	type ProjectChangeSubmitAsyncParams = {
		/** 变更ID */
		id: string;
	};

	type ProjectChangeUpdateAsyncParams = {
		/** 变更ID */
		id: string;
	};

	type ProjectCompleteAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectDeleteAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectDeliverableApproveAsyncParams = {
		id: string;
	};

	type ProjectDeliverableArchiveAsyncParams = {
		id: string;
	};

	type ProjectDeliverableDeleteAsyncParams = {
		id: string;
	};

	type ProjectDeliverableGetAsyncParams = {
		id: string;
	};

	type ProjectDeliverableGetByDeliverableCodeAsyncParams = {
		deliverableCode?: string;
	};

	type ProjectDeliverableGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDeliverableGetListByProjectCodeAsyncParams = {
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDeliverableGetListByStatusAsyncParams = {
		/** 

0 = Draft

1 = Submitted

2 = Approved

3 = Rejected

4 = Archived */
		status?: BurnAbpPdmProjectsDeliverableStatus;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDeliverableRejectAsyncParams = {
		id: string;
		reason?: string;
	};

	type ProjectDeliverableSubmitAsyncParams = {
		id: string;
	};

	type ProjectDeliverableUpdateAsyncParams = {
		id: string;
	};

	type ProjectDocumentDeleteAsyncParams = {
		id: string;
	};

	type ProjectDocumentGetAsyncParams = {
		id: string;
	};

	type ProjectDocumentGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDocumentGetListByFileTypeAsyncParams = {
		/** 

0 = File

1 = Directory */
		fileType?: BurnAbpPdmProjectManagementFileType;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDocumentGetListByParentIdAsyncParams = {
		parentId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDocumentGetListByProjectCodeAsyncParams = {
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectDocumentUpdateAsyncParams = {
		id: string;
	};

	type ProjectDocumentUploadDeleteAsyncParams = {
		blobName: string;
	};

	type ProjectDocumentUploadDeleteAsyncParams = {
		blobName?: string;
	};

	type ProjectDocumentUploadDownloadAsyncParams = {
		blobName: string;
	};

	type ProjectDocumentUploadDownloadAsyncParams = {
		blobName?: string;
	};

	type ProjectDocumentUploadUploadAsyncParams = {
		fileName?: string;
		contentType?: string;
		fileSize?: number;
	};

	type ProjectFormDeleteAsyncParams = {
		id: string;
	};

	type ProjectFormGetAsyncParams = {
		id: string;
	};

	type ProjectFormGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectFormGetListByMilestoneIdAsyncParams = {
		milestoneId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectFormGetListByProjectCodeAsyncParams = {
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectFormGetListByTemplateCodeAsyncParams = {
		templateCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectFormPublishAsyncParams = {
		id: string;
	};

	type ProjectFormSetStatusAsyncParams = {
		id: string;
		status?: number;
	};

	type ProjectFormUnpublishAsyncParams = {
		id: string;
	};

	type ProjectFormUpdateAsyncParams = {
		id: string;
	};

	type ProjectGetAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectGetMilestoneDataAsyncParams = {
		/** 项目ID */
		projectId?: string;
		/** 里程碑ID */
		milestoneId?: string;
	};

	type ProjectIssueAddCommentAsyncParams = {
		/** 问题ID */
		issueId: string;
	};

	type ProjectIssueDeleteAsyncParams = {
		id: string;
	};

	type ProjectIssueDocumentDeleteAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type ProjectIssueDocumentDownloadAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type ProjectIssueDocumentUploadAsyncParams = {
		entityId: string;
		description?: string;
	};

	type ProjectIssueDocumentUploadDeleteAsyncParams = {
		blobName?: string;
	};

	type ProjectIssueDocumentUploadDownloadAsyncParams = {
		blobName?: string;
	};

	type ProjectIssueDocumentUploadUploadAsyncParams = {
		entityId: string;
		fileName?: string;
		contentType?: string;
		fileSize?: number;
		description?: string;
	};

	type ProjectIssueGetAsyncParams = {
		id: string;
	};

	type ProjectIssueGetByCodeAsyncParams = {
		/** 问题编码 */
		code?: string;
	};

	type ProjectIssueGetExecutionCyclesAsyncParams = {
		/** 问题ID */
		issueId: string;
	};

	type ProjectIssueGetExecutionRecordsAsyncParams = {
		/** 问题ID */
		issueId: string;
	};

	type ProjectIssueGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueGetListByMilestoneIdAsyncParams = {
		/** 里程碑ID */
		milestoneId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueGetListByProjectCodeAsyncParams = {
		/** 项目编码 */
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueGetListByStatusAsyncParams = {
		/** 问题状态

0 = Open

5 = PendingReceive

10 = InProgress

15 = Received

20 = Resolved

25 = PendingApproval

30 = Closed

40 = Cancelled */
		status?: BurnAbpPdmProjectsIssueStatus;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueGetListByTaskIdAsyncParams = {
		/** 任务ID */
		taskId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueGetMyIssuesAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueGetMyWatchedListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectIssueUpdateAsyncParams = {
		/** 问题ID */
		id: string;
	};

	type ProjectMeetingDeleteAsyncParams = {
		id: string;
	};

	type ProjectMeetingGetAsyncParams = {
		id: string;
	};

	type ProjectMeetingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectMeetingSubmitAsyncParams = {
		id: string;
	};

	type ProjectMeetingUpdateAsyncParams = {
		id: string;
	};

	type ProjectMeetingWithdrawAsyncParams = {
		id: string;
	};

	type ProjectMilestoneAddDependencyAsyncParams = {
		/** 里程碑ID */
		milestoneId?: string;
		/** 前置里程碑ID */
		predecessorMilestoneId?: string;
		/** 依赖类型

0 = FinishToStart

1 = StartToStart

2 = FinishToFinish */
		dependencyType?: BurnAbpPdmProjectsDependencyType;
	};

	type ProjectMilestoneApproveAsyncParams = {
		/** 里程碑ID */
		id: string;
		/** 审批意见（可选） */
		comments?: string;
	};

	type ProjectMilestoneCancelAsyncParams = {
		/** 里程碑ID */
		id: string;
		/** 取消原因（可选） */
		reason?: string;
	};

	type ProjectMilestoneClearFormDataAsyncParams = {
		milestoneId: string;
	};

	type ProjectMilestoneCompleteAsyncParams = {
		/** 里程碑ID */
		id: string;
	};

	type ProjectMilestoneDeleteAsyncParams = {
		id: string;
	};

	type ProjectMilestoneExecuteWorkflowAsyncParams = {
		/** 里程碑ID */
		id: string;
	};

	type ProjectMilestoneGetAsyncParams = {
		id: string;
	};

	type ProjectMilestoneGetBreakdownByProjectAsyncParams = {
		/** 项目编码（必填） */
		ProjectCode: string;
		/** 任务状态筛选（可选）

0 = NotStarted

1 = InProgress

2 = Paused

3 = Completed

4 = Cancelled */
		TaskStatus?: BurnAbpPdmProjectsTaskStatus;
		/** Gridify 动态查询字符串（可选） */
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectMilestoneGetFormDataAsyncParams = {
		milestoneId: string;
	};

	type ProjectMilestoneGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectMilestoneGetListByProjectCodeAsyncParams = {
		/** 项目编码 */
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectMilestoneGetListByStatusAsyncParams = {
		/** 里程碑状态

0 = NotStarted

10 = InProgress

20 = Completed

30 = Abnormal

40 = Cancelled */
		status?: BurnAbpPdmProjectManagementMilestoneStatus;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectMilestoneRejectAsyncParams = {
		/** 里程碑ID */
		id: string;
		/** 拒绝原因 */
		reason?: string;
	};

	type ProjectMilestoneStartAsyncParams = {
		/** 里程碑ID */
		id: string;
	};

	type ProjectMilestoneSubmitAsyncParams = {
		/** 里程碑ID */
		id: string;
	};

	type ProjectMilestoneUpdateAsyncParams = {
		/** 里程碑ID */
		id: string;
	};

	type ProjectPauseAsyncParams = {
		/** 项目ID */
		id: string;
		/** 暂停原因 */
		reason?: string;
	};

	type ProjectPublishAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectRelationDeleteAsyncParams = {
		id: string;
	};

	type ProjectRelationGetAsyncParams = {
		id: string;
	};

	type ProjectRelationGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRelationGetListByProjectCodeAndTypeAsyncParams = {
		projectCode?: string;
		/** 

1 = Deliverable

2 = Issue

3 = Risk */
		relationType?: BurnAbpPdmProjectManagementProjectRelationType;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRelationGetListByProjectCodeAsyncParams = {
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRelationGetListByRelationTypeAsyncParams = {
		/** 

1 = Deliverable

2 = Issue

3 = Risk */
		relationType?: BurnAbpPdmProjectManagementProjectRelationType;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRelationGetListByTargetCodeAsyncParams = {
		targetCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRelationUpdateAsyncParams = {
		id: string;
	};

	type ProjectRemoveProjectManagerAsyncParams = {
		/** 项目ID */
		id: string;
		/** 用户ID */
		userId: string;
	};

	type ProjectResumeAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectRiskCancelAsyncParams = {
		/** 风险ID */
		id: string;
	};

	type ProjectRiskCloseAsyncParams = {
		/** 风险ID */
		id: string;
	};

	type ProjectRiskDeleteAsyncParams = {
		id: string;
	};

	type ProjectRiskGetAsyncParams = {
		id: string;
	};

	type ProjectRiskGetByCodeAsyncParams = {
		/** 风险编码 */
		code?: string;
	};

	type ProjectRiskGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskGetListByMilestoneIdAsyncParams = {
		/** 里程碑ID */
		milestoneId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskGetListByProjectCodeAsyncParams = {
		/** 项目编码 */
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskGetListByStatusAsyncParams = {
		/** 风险状态

0 = Unresolved

10 = Resolved

15 = PendingApproval

20 = Closed

30 = Cancelled */
		status?: BurnAbpPdmProjectsRiskStatus;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskGetListByTaskIdAsyncParams = {
		/** 任务ID */
		taskId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskGetMyRisksAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskGetMyWatchedListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRiskReopenAsyncParams = {
		/** 风险ID */
		id: string;
	};

	type ProjectRiskResolveAsyncParams = {
		/** 风险ID */
		id: string;
	};

	type ProjectRiskUpdateAsyncParams = {
		/** 风险ID */
		id: string;
	};

	type ProjectRoleDeleteAsyncParams = {
		id: string;
	};

	type ProjectRoleGetAsyncParams = {
		id: string;
	};

	type ProjectRoleGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectRoleUpdateAsyncParams = {
		id: string;
	};

	type ProjectSaveAsDraftAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectStartAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type ProjectTaskCancelTaskAsyncParams = {
		taskId: string;
	};

	type ProjectTaskDeleteAsyncParams = {
		id: string;
	};

	type ProjectTaskDocumentDeleteAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type ProjectTaskDocumentDownloadAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type ProjectTaskDocumentUploadAsyncParams = {
		entityId: string;
		description?: string;
	};

	type ProjectTaskDocumentUploadDeleteAsyncParams = {
		blobName?: string;
	};

	type ProjectTaskDocumentUploadDownloadAsyncParams = {
		blobName?: string;
	};

	type ProjectTaskDocumentUploadUploadAsyncParams = {
		entityId: string;
		fileName?: string;
		contentType?: string;
		fileSize?: number;
		description?: string;
	};

	type ProjectTaskGetAsyncParams = {
		id: string;
	};

	type ProjectTaskGetByTaskCodeAsyncParams = {
		taskCode?: string;
	};

	type ProjectTaskGetExecutionRecordsAsyncParams = {
		taskId: string;
	};

	type ProjectTaskGetIssuesAsyncParams = {
		taskId: string;
	};

	type ProjectTaskGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTaskGetListByMilestoneIdAsyncParams = {
		milestoneId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTaskGetListByParentCodeAsyncParams = {
		parentCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTaskGetListByProjectCodeAsyncParams = {
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTaskGetMyTasksAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTaskGetMyWatchedListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTaskGetRisksAsyncParams = {
		taskId: string;
	};

	type ProjectTaskGetTasksByIssueAsyncParams = {
		issueId: string;
	};

	type ProjectTaskGetTasksByRiskAsyncParams = {
		riskId: string;
	};

	type ProjectTaskRemoveIssueAsyncParams = {
		taskId?: string;
		issueId?: string;
	};

	type ProjectTaskRemoveRiskAsyncParams = {
		taskId?: string;
		riskId?: string;
	};

	type ProjectTaskUpdateAsyncParams = {
		id: string;
	};

	type ProjectTeamMemberDeleteAsyncParams = {
		id: string;
	};

	type ProjectTeamMemberGetAsyncParams = {
		id: string;
	};

	type ProjectTeamMemberGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTeamMemberGetListByProjectCodeAsyncParams = {
		projectCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTeamMemberGetListByProjectRoleCodeAsyncParams = {
		projectRoleCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTeamMemberGetListByUserIdAsyncParams = {
		userId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTeamMemberUpdateAsyncParams = {
		id: string;
	};

	type ProjectTemplateActivateAsyncParams = {
		/** 模板ID */
		id: string;
	};

	type ProjectTemplateDeactivateAsyncParams = {
		/** 模板ID */
		id: string;
	};

	type ProjectTemplateDeleteAsyncParams = {
		/** 模板ID */
		id: string;
	};

	type ProjectTemplateGetAsyncParams = {
		/** 模板ID */
		id: string;
	};

	type ProjectTemplateGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ProjectTemplateUpdateAsyncParams = {
		/** 模板ID */
		id: string;
	};

	type ProjectUpdateAsyncParams = {
		/** 项目ID */
		id: string;
	};

	type RationalizationProposalAbnormalCloseAsyncParams = {
		id: string;
	};

	type RationalizationProposalCompleteExecutionAsyncParams = {
		id: string;
	};

	type RationalizationProposalDeleteAsyncParams = {
		id: string;
	};

	type RationalizationProposalDocumentDeleteAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type RationalizationProposalDocumentDownloadAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type RationalizationProposalDocumentUploadAsyncParams = {
		entityId: string;
		description?: string;
	};

	type RationalizationProposalDocumentUploadDeleteAsyncParams = {
		blobName?: string;
	};

	type RationalizationProposalDocumentUploadDownloadAsyncParams = {
		blobName?: string;
	};

	type RationalizationProposalDocumentUploadUploadAsyncParams = {
		entityId: string;
		fileName?: string;
		contentType?: string;
		fileSize?: number;
		description?: string;
	};

	type RationalizationProposalGetAsyncParams = {
		id: string;
	};

	type RationalizationProposalGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RationalizationProposalStartExecutionAsyncParams = {
		id: string;
	};

	type RationalizationProposalSubmitAsyncParams = {
		id: string;
	};

	type RationalizationProposalUpdateAsyncParams = {
		id: string;
	};

	type RationalizationProposalWithdrawAsyncParams = {
		id: string;
	};

	type RecordFormDocumentDeleteAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type RecordFormDocumentDownloadAsyncParams = {
		blobName: string;
		entityId: string;
	};

	type RecordFormDocumentUploadAsyncParams = {
		entityId: string;
		description?: string;
	};

	type RecordFormDocumentUploadDeleteAsyncParams = {
		blobName?: string;
	};

	type RecordFormDocumentUploadDownloadAsyncParams = {
		blobName?: string;
	};

	type RecordFormDocumentUploadUploadAsyncParams = {
		entityId: string;
		fileName?: string;
		contentType?: string;
		fileSize?: number;
		description?: string;
	};

	type RecordInformationAbnormalCloseAsyncParams = {
		id: string;
	};

	type RecordInformationCompleteExecutionAsyncParams = {
		id: string;
	};

	type RecordInformationDeleteAsyncParams = {
		id: string;
	};

	type RecordInformationGetAsyncParams = {
		id: string;
	};

	type RecordInformationGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RecordInformationStartExecutionAsyncParams = {
		id: string;
	};

	type RecordInformationSubmitAsyncParams = {
		id: string;
	};

	type RecordInformationUpdateAsyncParams = {
		id: string;
	};

	type RecordInformationWithdrawAsyncParams = {
		id: string;
	};

	type ReleaseDocumentItemGetAsyncParams = {
		/** 发布文档项 ID。 */
		id: string;
	};

	type ReleaseDocumentItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RiskTypeDeleteAsyncParams = {
		id: string;
	};

	type RiskTypeGetAsyncParams = {
		id: string;
	};

	type RiskTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RiskTypeUpdateAsyncParams = {
		id: string;
	};

	type StorageSolutionActivateAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionDeactivateAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionDeleteAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionGetAsyncParams = {
		id: string;
	};

	type StorageSolutionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StorageSolutionGetUsageStatisticsAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionPerformHealthCheckAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionSetAsDefaultAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionSetQuotaAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type StorageSolutionUpdateAsyncParams = {
		id: string;
	};

	type StorageSolutionUpdateConfigurationAsyncParams = {
		/** 存储方案主键。 */
		id: string;
	};

	type SystemIOStream = {
		canRead?: boolean;
		canWrite?: boolean;
		canSeek?: boolean;
		canTimeout?: boolean;
		length?: number;
		position?: number;
		readTimeout?: number;
		writeTimeout?: number;
	};

	type TaskTypeDeleteAsyncParams = {
		id: string;
	};

	type TaskTypeGetAsyncParams = {
		id: string;
	};

	type TaskTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TaskTypeUpdateAsyncParams = {
		id: string;
	};

	type TempFileUploadCancelUploadAsyncParams = {
		uploadId: string;
	};

	type TempFileUploadCancelUploadAsyncParams = {
		/** 上传会话 Id。 */
		uploadId: string;
	};

	type TempFileUploadCompleteUploadAsyncParams = {
		uploadId: string;
	};

	type TempFileUploadCompleteUploadAsyncParams = {
		/** 上传会话 Id。 */
		uploadId: string;
	};

	type TempFileUploadGetMissingChunksAsyncParams = {
		uploadId: string;
	};

	type TempFileUploadGetMissingChunksAsyncParams = {
		/** 上传会话 Id。 */
		uploadId: string;
	};

	type TempFileUploadGetUploadProgressAsyncParams = {
		uploadId: string;
	};

	type TempFileUploadGetUploadProgressAsyncParams = {
		/** 上传会话 Id。 */
		uploadId: string;
	};

	type TempFileUploadUploadChunkAsyncParams = {
		uploadId: string;
		chunkIndex: number;
	};

	type UserWatchDeleteAsyncParams = {
		id: string;
	};

	type UserWatchGetAsyncParams = {
		id: string;
	};

	type UserWatchGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserWatchGetListByTargetCodeAsyncParams = {
		targetCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserWatchGetListByTargetTypeAsyncParams = {
		/** 

1 = Task

2 = Issue

3 = Risk */
		targetType?: BurnAbpPdmProjectManagementWatchTargetType;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserWatchGetListByUserCodeAndTypeAsyncParams = {
		userCode?: string;
		/** 

1 = Task

2 = Issue

3 = Risk */
		targetType?: BurnAbpPdmProjectManagementWatchTargetType;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserWatchGetListByUserCodeAsyncParams = {
		userCode?: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UserWatchIsWatchingAsyncParams = {
		userCode?: string;
		targetCode?: string;
	};

	type UserWatchToggleWatchAsyncParams = {
		/** 

1 = Task

2 = Issue

3 = Risk */
		targetType?: BurnAbpPdmProjectManagementWatchTargetType;
		targetCode?: string;
		remark?: string;
	};

	type UserWatchUnwatchAsyncParams = {
		/** 

1 = Task

2 = Issue

3 = Risk */
		targetType?: BurnAbpPdmProjectManagementWatchTargetType;
		targetCode?: string;
	};

	type UserWatchUpdateAsyncParams = {
		id: string;
	};

	type UserWatchWatchAsyncParams = {
		/** 

1 = Task

2 = Issue

3 = Risk */
		targetType?: BurnAbpPdmProjectManagementWatchTargetType;
		targetCode?: string;
		remark?: string;
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpPdmBomManagementBomVersionsBomVersionDto = {
		items?: BurnAbpPdmBomManagementBomVersionsBomVersionDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDocumentLookupDto = {
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDocumentLookupDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderMaterialCodeLookupDto = {
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderMaterialCodeLookupDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpPdmProcessManagementProcessRoutesProcessRouteDto = {
		items?: BurnAbpPdmProcessManagementProcessRoutesProcessRouteDto[];
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto = {
		items?: BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspaceDocumentSearchResultDto = {
		items?: BurnAbpPdmApplicationContractsWorkspaceDocumentSearchResultDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspaceMyCheckedOutPartDto = {
		items?: BurnAbpPdmApplicationContractsWorkspaceMyCheckedOutPartDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspaceMyCheckoutDto = {
		items?: BurnAbpPdmApplicationContractsWorkspaceMyCheckoutDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspacePendingTaskDto = {
		items?: BurnAbpPdmApplicationContractsWorkspacePendingTaskDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto = {
		items?: BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBomManagementBomsBomDto = {
		items?: BurnAbpPdmBomManagementBomsBomDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBomManagementBomsBomItemDto = {
		items?: BurnAbpPdmBomManagementBomsBomItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBomManagementBomVersionsBomVersionDto = {
		items?: BurnAbpPdmBomManagementBomVersionsBomVersionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementDocumentChangeOrderDto = {
		items?: BurnAbpPdmChangeManagementDocumentChangeOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementDocumentChangeOrderItemDetailDto = {
		items?: BurnAbpPdmChangeManagementDocumentChangeOrderItemDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementEngineeringChangeNotificationDto = {
		items?: BurnAbpPdmChangeManagementEngineeringChangeNotificationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementEngineeringChangeOrderDto = {
		items?: BurnAbpPdmChangeManagementEngineeringChangeOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementConversionsDocumentConversionDto = {
		items?: BurnAbpPdmDocumentManagementConversionsDocumentConversionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto = {
		items?: BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto = {
		items?: BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestItemDetailDto = {
		items?: BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestItemDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto = {
		items?: BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestItemDetailDto = {
		items?: BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestItemDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto = {
		items?: BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto = {
		items?: BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestItemDetailDto = {
		items?: BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestItemDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseConfirmationRecordDto = {
		items?: BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseConfirmationRecordDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDailySummaryDto = {
		items?: BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDailySummaryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto = {
		items?: BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemListDto = {
		items?: BurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemListDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentsDocumentAuditLogDto = {
		items?: BurnAbpPdmDocumentManagementDocumentsDocumentAuditLogDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentsDocumentDto = {
		items?: BurnAbpPdmDocumentManagementDocumentsDocumentDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentsDocumentVersionDto = {
		items?: BurnAbpPdmDocumentManagementDocumentsDocumentVersionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto = {
		items?: BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto = {
		items?: BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto = {
		items?: BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto = {
		items?: BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderItemDetailDto = {
		items?: BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderItemDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto = {
		items?: BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto = {
		items?: BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto = {
		items?: BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto = {
		items?: BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto = {
		items?: BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto = {
		items?: BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartsDtosPartDto = {
		items?: BurnAbpPdmPartManagementPartsDtosPartDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto = {
		items?: BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto = {
		items?: BurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto = {
		items?: BurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProcessManagementProcessRoutesProcessRouteDto = {
		items?: BurnAbpPdmProcessManagementProcessRoutesProcessRouteDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementIssueTypesIssueTypeDto = {
		items?: BurnAbpPdmProjectManagementIssueTypesIssueTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto = {
		items?: BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectChangesProjectChangeDto = {
		items?: BurnAbpPdmProjectManagementProjectChangesProjectChangeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto = {
		items?: BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto = {
		items?: BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectFormsProjectFormDto = {
		items?: BurnAbpPdmProjectManagementProjectFormsProjectFormDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto = {
		items?: BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto = {
		items?: BurnAbpPdmProjectManagementProjectMeetingsProjectMeetingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto = {
		items?: BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRelationsProjectRelationDto = {
		items?: BurnAbpPdmProjectManagementProjectRelationsProjectRelationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto = {
		items?: BurnAbpPdmProjectManagementProjectRisksProjectRiskDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRolesProjectRoleDto = {
		items?: BurnAbpPdmProjectManagementProjectRolesProjectRoleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectsProjectDto = {
		items?: BurnAbpPdmProjectManagementProjectsProjectDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto = {
		items?: BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto = {
		items?: BurnAbpPdmProjectManagementProjectTeamMembersProjectTeamMemberDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto = {
		items?: BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto = {
		items?: BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementRecordInformationRecordInformationDto = {
		items?: BurnAbpPdmProjectManagementRecordInformationRecordInformationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementRiskTypesRiskTypeDto = {
		items?: BurnAbpPdmProjectManagementRiskTypesRiskTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementTaskTypesTaskTypeDto = {
		items?: BurnAbpPdmProjectManagementTaskTypesTaskTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementUserWatchesUserWatchDto = {
		items?: BurnAbpPdmProjectManagementUserWatchesUserWatchDto[];
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

	type VoloAbpElsaAbstractEntitiesWorkflowStatusEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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

	type WorkspaceGetMyCheckedOutPartsAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkspaceGetMyCheckoutsAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkspaceGetMyPendingTasksAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkspaceGetRecentDocumentsAsyncParams = {
		maxCount?: number;
	};
}
