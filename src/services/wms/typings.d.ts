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

	type BoxLotResolveRuleDeleteAsyncParams = {
		id: string;
	};

	type BoxLotResolveRuleGetAsyncParams = {
		id: string;
	};

	type BoxLotResolveRuleGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type BoxLotResolveRuleIntegrationResolveAsyncParams = {
		barcode?: string;
	};

	type BoxLotResolveRuleResolveAsyncParams = {
		id: string;
		barcode?: string;
	};

	type BoxLotResolveRuleUpdateAsyncParams = {
		id: string;
	};

	type BurnAbpWMS_1MESshujuMesDataDto = {
		/** 物料编码 */
		materialItemCode?: string;
		/** 物料外码 */
		materialItemOutCode?: string;
		/** PO号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		/** 是否Rosh */
		isRosh?: boolean;
		/** 是否临技 */
		isTemporary?: boolean;
		/** 车间编码 */
		workshopCode?: string;
		items?: BurnAbpWMSMEStiaomalaiyuanProductBarCodeInfo[];
	};

	type BurnAbpWMS_biaoqianguanliLabelTemplateInputDto = {
		feature?: string;
		/** 标签类型编码 */
		type?: string;
		/** 条码 */
		code?: string;
	};

	type BurnAbpWMS_biaoqianguanliLabelTemplatePrintResultDto = {
		/** 打印数据源 */
		printTemplate?: string;
	};

	type BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionResolveDto = {
		/** 检验任务ID */
		inspectionTaskId?: string;
		/** 复检箱明细 */
		boxItems?: BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskBoxItemDto[];
	};

	type BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskBoxItemDto = {
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
		outInspectionTaskId?: string;
		/** 检验单号 */
		inspectionTaskNumber?: string;
		/** 来源单号 */
		sourceOrderNumber?: string;
		/** 出库单号 */
		outInstructionOrderNumber?: string;
		/** 栈板号 */
		traceId?: string;
		/** 业务批次号 */
		businessLotNumber?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 数量 */
		quantity?: number;
		/** DC */
		dateCode?: string;
		/** 过期日期 */
		expiryDate?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 环保属性(N:非环保,Y:环保) */
		fufilRohsFlag?: boolean;
		/** 物料版本 */
		materialVersion?: string;
		/** 是否是贵重物品 */
		isExpensive?: boolean;
	};

	type BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto = {
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
		/** 检验单号 */
		inspectionTaskNumber?: string;
		/** 来源单据号 */
		sourceOrderNumber?: string;
		/** 任务令 */
		workJobCode?: string;
		/** 物权信息 */
		realRightCode?: string;
		/** 出库单号 */
		outInstructionOrderNumber?: string;
		/** 出库库房 */
		wareHouseId?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 收货人 */
		consignee?: string;
		/** 收货电话 */
		consigneeTel?: string;
		/** 收货地址 */
		consigneeAddress?: string;
		/** 拣料日期 */
		pickingTime?: string;
		/** 需求发运时间 */
		needShipmentTime?: string;
		/** 需求到达时间 */
		needArrivalTime?: string;
		outInstructionType?: BurnAbpWMS_chukujianyanEnumOutInstructionType;
		taskStatus?: BurnAbpWMS_chukujianyanOutInspectionTaskStatus;
		/** 复检任务明细 */
		items?: BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskItemDto[];
		/** 备注 */
		memo?: string;
		/** QC复核人 */
		qcInspectionUser?: string;
		/** QC复核时间 */
		qcInspectionTime?: string;
		/** QC复核备注 */
		qcMemo?: string;
	};

	type BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskItemDto = {
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
		outInspectionTaskId?: string;
		/** 检验单号 */
		inspectionTaskNumber?: string;
		/** 来源单号 */
		sourceOrderNumber?: string;
		/** 出库单号 */
		outInstructionOrderNumber?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 物料版本 */
		materialVersion?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 数量 */
		quantity?: number;
		/** 检验数量 */
		inspectionQuantity?: number;
		taskStatus?: BurnAbpWMS_chukujianyanOutInspectionTaskStatus;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpWMS_chuku_chukujianyanrenwuQcInspectionResolveDto = {
		/** 检验任务ID */
		inspectionTaskId?: string;
		/** 是否合格 */
		isQualified?: boolean;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpWMS_chuku_chukuxuqiuGetItemsByOutInstructionOrderIdAndMaterialIdInput = {
		maxResultCount?: number;
		skipCount?: number;
		sorting?: string;
		/** 出库指令ID */
		outInstructionOrderId?: string;
		/** 物料ID */
		materialId?: string;
	};

	type BurnAbpWMS_chuku_chukuxuqiuhebingcelveCreateUpdateOutInstructionDemandMergeRuleDto = {
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 提供者名称 */
		providerName?: string;
		/** 提供者显示名称 */
		providerDisplayName?: string;
		/** 库房编码 */
		warehouseCode?: string;
		/** 库房名称 */
		warehouseName?: string;
		/** 下架任务类型编码 */
		taskTypeCode?: string;
		/** 下架任务类型名称 */
		taskType?: string;
		/** 时间间隔(分钟 */
		timePeriodMinute?: number;
		condition?: BurnAbpWMS_chukuxuqiuhebingcelveMergeCondition;
		mergeMode?: BurnAbpWMS_chukuxuqiuhebingcelveMergeMode;
		/** 阈值 */
		quantityThreshold?: number;
		/** 最大合并数 */
		maxMergeCount?: number;
		/** 是否启用 */
		isEnabled?: boolean;
		/** 排除时间 */
		exclusionTimePeriods?: BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleExclusionTimePeriodDto[];
	};

	type BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto = {
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
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 提供者名称 */
		providerName?: string;
		/** 提供者显示名称 */
		providerDisplayName?: string;
		/** 库房编码 */
		warehouseCode?: string;
		/** 库房名称 */
		warehouseName?: string;
		/** 下架任务类型编码 */
		taskTypeCode?: string;
		/** 下架任务类型名称 */
		taskType?: string;
		/** 时间间隔(分钟) */
		timePeriodMinute?: number;
		condition?: BurnAbpWMS_chukuxuqiuhebingcelveMergeCondition;
		mergeMode?: BurnAbpWMS_chukuxuqiuhebingcelveMergeMode;
		/** 阈值 */
		quantityThreshold?: number;
		/** 最大合并数 */
		maxMergeCount?: number;
		/** 是否启用 */
		isEnabled?: boolean;
		/** 排除时间 */
		exclusionTimePeriods?: BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleExclusionTimePeriodDto[];
	};

	type BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleExclusionTimePeriodDto = {
		startTime?: string;
		endTime?: string;
	};

	type BurnAbpWMS_chuku_chukuxuqiuMegerOutInstructionDemandDto = {
		ids?: string[];
	};

	type BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandDto = {
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
		code?: string;
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号1 */
		sourceOrderNo1?: string;
		/** 来源单据号2 */
		sourceOrderNo2?: string;
		/** 出库指令来源系统 */
		sourceOrderProvider?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		/** 发货库房 */
		wareHouseId?: string;
		/** 发货库房编码 */
		warehouseCode?: string;
		/** 发货库房名称 */
		warehouseName?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		/** 预计合并时间 */
		expectedMergeTime?: string;
		/** 需求开始时间 */
		requiredStartTime?: string;
		/** 要求完成时间 */
		requiredCompletedTime?: string;
		/** 产品编码(生产件编码) */
		productCode?: string;
		/** 产品名称(生产件名称) */
		productName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		/** 数据来源 */
		sourceProvider?: string;
		/** 是否复核 */
		isReCheck?: boolean;
		/** 下架任务类型编码 */
		taskTypeCode?: string;
		/** 下架任务类型名称 */
		taskType?: string;
		/** 备注 */
		remark?: string;
		/** 是否已处理 */
		processed?: boolean;
		/** 处理时间 */
		processingTime?: string;
		/** 关联出库指令Id */
		outInstructionOrderId?: string;
		/** 关联出库指令编码 */
		outInstructionOrderNumber?: string;
		callBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 开始回传时间 */
		startCallBackTime?: string;
		/** 完成回传时间 */
		completedCallBackTime?: string;
		/** 回传错误信息时间 */
		callBackErrorTime?: string;
		/** 回传错误信息 */
		callBackError?: string;
		status?: BurnAbpWMS_chukuxuqiuOutInstructionDemandStatus;
		items?: BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto[];
	};

	type BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		outInstructionDemandId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 物料ID */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 交付数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
		/** 预占数量 */
		sharedQuantity?: number;
		status?: BurnAbpWMS_chukuxuqiuOutInstructionDemandItemStatus;
		/** 创建人 */
		creator?: string;
		/** 修改人 */
		lastModifier?: string;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
	};

	type BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemWithOutInstructionDemandDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		outInstructionDemandId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 物料ID */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 交付数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
		/** 预占数量 */
		sharedQuantity?: number;
		status?: BurnAbpWMS_chukuxuqiuOutInstructionDemandItemStatus;
		/** 创建人 */
		creator?: string;
		/** 修改人 */
		lastModifier?: string;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
		outInstructionDemand?: BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandDto;
	};

	type BurnAbpWMS_chuku_chukuzhilingAllotOutInstructionOrderInput = {
		id?: string;
		itemIds?: string[];
	};

	type BurnAbpWMS_chuku_chukuzhilingAllotOutInstructionOrdersInput = {
		orders?: BurnAbpWMS_chuku_chukuzhilingAllotOutInstructionOrderInput[];
	};

	type BurnAbpWMS_chuku_chukuzhilingBatchReleaseTaskDto = {
		/** 库房ID */
		wareHouseId: string;
		/** 开始时间 */
		startTime: string;
		/** 结束时间 */
		endTime: string;
		/** 是否强制释放（默认false，true时会强制释放所有状态的任务） */
		forceRelease?: boolean;
		/** 释放原因 */
		reason?: string;
	};

	type BurnAbpWMS_chuku_chukuzhilingBatchReleaseTaskResultDto = {
		/** 总处理任务数 */
		totalTaskCount?: number;
		/** 成功释放的任务数 */
		successTaskCount?: number;
		/** 失败的任务数 */
		failedTaskCount?: number;
		/** 总处理指令数 */
		totalInstructionCount?: number;
		/** 成功关闭的指令数 */
		successInstructionCount?: number;
		/** 失败的指令数 */
		failedInstructionCount?: number;
		/** 释放的库存总数量 */
		releasedStockQuantity?: number;
		/** 处理消息 */
		message?: string;
		/** 是否成功 */
		isSuccess?: boolean;
	};

	type BurnAbpWMS_chuku_chukuzhilingConsigneeDto = {
		/** 收货人编码 */
		id?: string;
		/** 收货人名称 */
		name?: string;
		/** 收货联系人 */
		contact?: string;
		/** 联系电话 */
		tel?: string;
		/** 城市 */
		city?: string;
		province?: string;
		country?: string;
		/** 详细地址 */
		address?: string;
	};

	type BurnAbpWMS_chuku_chukuzhilingCreateOrUpdateOutInstructionOrderDto = {
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号1 */
		sourceOrderNo1?: string;
		/** 来源单据号2 */
		sourceOrderNo2?: string;
		/** 出库指令来源系统 */
		sourceOrderProvider?: string;
		/** 发货库房 */
		wareHouseId?: string;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		/** 任务令（由明细生成） */
		taskOrder?: string;
		/** 要求捡料开始时间 */
		requiredStartTime?: string;
		/** 要求捡料完成时间 */
		requiredCompletedTime?: string;
		deliveryStatus?: BurnAbpWMS_chukuzhilingOutInstructionStatus;
		/** 备注 */
		remark?: string;
		/** 是否复核 */
		isReCheck?: boolean;
		/** 下架任务类型编码 */
		taskTypeCode?: string;
		/** 下架任务类型名称 */
		taskType?: string;
		/** 是否应该回传 */
		shouldCallBack?: boolean;
		items?: BurnAbpWMS_chuku_chukuzhilingCreateOrUpdateOutInstructionOrderItemDto[];
	};

	type BurnAbpWMS_chuku_chukuzhilingCreateOrUpdateOutInstructionOrderItemDto = {
		id?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 物料主键Id */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 分配数量 */
		shareQuantity?: number;
		/** 出库数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
		/** 理货数量 */
		tallyQuantity?: number;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto = {
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
		/** 单据编码 */
		orderNo?: string;
		/** 出库指令分类 */
		orderClass?: number;
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号1 */
		sourceOrderNo1?: string;
		/** 来源单据号2 */
		sourceOrderNo2?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		/** 出库指令来源系统 */
		sourceOrderProvider?: string;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		/** 要求捡料开始时间 */
		requiredStartTime?: string;
		/** 要求捡料完成时间 */
		requiredCompletedTime?: string;
		/** 产品编码(生产件编码) */
		productCode?: string;
		/** 产品名称(生产件名称) */
		productName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		/** 欠料交付是否自动分发 */
		isLessCloseAutoDistribution?: boolean;
		/** 是否允许超发 */
		allowOverIssuance?: boolean;
		/** 允许超发系数 */
		allowableOverIssuanceCoefficient?: number;
		/** 是否允许欠料 */
		allowUnderIssuance?: boolean;
		/** 欠料发运是否自动生成欠料单 */
		isAutoGenShortageOrderOnUnderIssuance?: boolean;
		/** 转库出库单是否自动生成入库单 */
		isTransferOutOrderAutoGenInOrder?: boolean;
		/** 转库入库单提供者名称 */
		transferInOrderProviderName?: string;
		/** 转库入库单提供者描述 */
		transferInOrderProviderDescribe?: string;
		/** 数据来源 */
		sourceProvider?: string;
		/** 是否复检 */
		reInspection?: boolean;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 是否复核 */
		isReCheck?: boolean;
		/** 下架任务类型编码 */
		taskTypeCode?: string;
		/** 下架任务类型名称 */
		taskType?: string;
		/** 提交人 */
		submiter?: string;
		/** 提交时间 */
		submitTime?: string;
		/** 审核人 */
		verifyer?: string;
		/** 审核时间 */
		verifyTime?: string;
		deliveryStatus?: BurnAbpWMS_chukuzhilingOutInstructionStatus;
		/** 备注 */
		remark?: string;
		/** 是否从出库需求中创建 */
		isCreateByOutInstructionDemand?: boolean;
		callBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 开始回传时间 */
		startCallBackTime?: string;
		/** 完成回传时间 */
		completedCallBackTime?: string;
		/** 回传错误信息时间 */
		callBackErrorTime?: string;
		/** 回传错误信息 */
		callBackError?: string;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		items?: BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderItemDto[];
	};

	type BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderItemDto = {
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
		shipmentOrderId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 物料主键Id */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 分配数量 */
		shareQuantity?: number;
		/** 出库数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
		/** 理货数量 */
		tallyQuantity?: number;
		pickItemStatus?: BurnAbpWMS_chukuzhilingOutInstructionItemStatus;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		peoples?: BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderItemPeopleDto[];
		shipmentOrder?: BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderDto;
	};

	type BurnAbpWMS_chuku_chukuzhilingManualAllocationInstructionDto = {
		/** 出库指令单Id */
		outInstructionId?: string;
		/** 出库指令明细Id */
		outInstructionItemId?: string;
		/** 手动挑选明细项 */
		manualItems?: BurnAbpWMS_chukuzhilingManualTraceItem[];
	};

	type BurnAbpWMS_chuku_chukuzhilingmingxiAssignHandlerInputDto = {
		/** 下架任务ID */
		id?: string[];
		/** 处理人ID */
		handlerId?: string;
		/** 处理人姓名 */
		handlerName?: string;
	};

	type BurnAbpWMS_chuku_chukuzhilingmingxiManualAllocationPickTaskDto = {
		pickTaskId?: string;
		/** 手动挑选明细项 */
		manualItems?: BurnAbpWMS_chukuzhilingManualTraceItem[];
	};

	type BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto = {
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
		/** 捡料任务号 */
		pickTaskCode?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		/** 出库指令单号 */
		outInstructionOrderNo?: string;
		/** 出库指令单号明细ID */
		outInstructionOrderItemId?: string;
		/** 出库指令分类 */
		orderClass?: number;
		/** 出库指令分类类型 */
		orderType?: number;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		pickType?: BurnAbpWMS_chukuzhilingOutInstructionType;
		/** 捡料栈板 */
		traceId?: string;
		/** 载具上物料数量 */
		traceQuantity?: number;
		/** 数量 */
		qty?: number;
		/** 下架数量 */
		pickQty?: number;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		/** 上架自动分发 */
		putAutoDistribution?: boolean;
		/** 是否整栈板 */
		isFullLPN?: boolean;
		/** 欠料交付是否自动分发 */
		isLessCloseAutoDistribution?: boolean;
		pickItemStatus?: BurnAbpWMS_chukuzhilingPickItemStatus;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 交付对象 */
		deliveryObject?: string;
		/** 交付地址 */
		deliveryAddress?: string;
		/** 需求开始时间 */
		needStartTime?: string;
		/** 实际开始时间 */
		actualStartTime?: string;
		/** 完成时间 */
		finishTime?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		warehouseZone?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseZoneReferenceDto;
		warehouseLocation?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		peoples?: BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemPeopleDto[];
		/** 物料ID */
		materialId?: string;
		/** 仓库ID */
		wareHouseId?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		/** 库区编码 */
		wareHouseZoneCode?: string;
		/** 库位信息 */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
	};

	type BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemPeopleDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 分配的捡料班组 */
		warehouseTeamId?: string;
		/** 班组编码 */
		warehouseTeamCode?: string;
		/** 班组名称 */
		warehouseTeamName?: string;
		/** 分配人ID */
		assigneeId?: string;
		/** 分配人姓名 */
		assigneeName?: string;
	};

	type BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskSumDto = {
		/** 处理人 */
		assigneeName?: string;
		/** 总数量 */
		totalSum?: number;
		/** 完成数量 */
		finishSum?: number;
		/** 未完成数量 */
		unFinishSum?: number;
	};

	type BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderDto = {
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
		/** 单据编码 */
		orderNo?: string;
		/** 出库指令分类 */
		orderClass?: number;
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号1 */
		sourceOrderNo1?: string;
		/** 来源单据号2 */
		sourceOrderNo2?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		/** 出库指令来源系统 */
		sourceOrderProvider?: string;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		/** 要求捡料开始时间 */
		requiredStartTime?: string;
		/** 要求捡料完成时间 */
		requiredCompletedTime?: string;
		/** 产品编码(生产件编码) */
		productCode?: string;
		/** 产品名称(生产件名称) */
		productName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		/** 欠料交付是否自动分发 */
		isLessCloseAutoDistribution?: boolean;
		/** 是否允许超发 */
		allowOverIssuance?: boolean;
		/** 允许超发系数 */
		allowableOverIssuanceCoefficient?: number;
		/** 是否允许欠料 */
		allowUnderIssuance?: boolean;
		/** 欠料发运是否自动生成欠料单 */
		isAutoGenShortageOrderOnUnderIssuance?: boolean;
		/** 转库出库单是否自动生成入库单 */
		isTransferOutOrderAutoGenInOrder?: boolean;
		/** 转库入库单提供者名称 */
		transferInOrderProviderName?: string;
		/** 转库入库单提供者描述 */
		transferInOrderProviderDescribe?: string;
		/** 数据来源 */
		sourceProvider?: string;
		/** 是否复检 */
		reInspection?: boolean;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 是否复核 */
		isReCheck?: boolean;
		/** 下架任务类型编码 */
		taskTypeCode?: string;
		/** 下架任务类型名称 */
		taskType?: string;
		/** 提交人 */
		submiter?: string;
		/** 提交时间 */
		submitTime?: string;
		/** 审核人 */
		verifyer?: string;
		/** 审核时间 */
		verifyTime?: string;
		deliveryStatus?: BurnAbpWMS_chukuzhilingOutInstructionStatus;
		/** 备注 */
		remark?: string;
		/** 是否从出库需求中创建 */
		isCreateByOutInstructionDemand?: boolean;
		callBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 开始回传时间 */
		startCallBackTime?: string;
		/** 完成回传时间 */
		completedCallBackTime?: string;
		/** 回传错误信息时间 */
		callBackErrorTime?: string;
		/** 回传错误信息 */
		callBackError?: string;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
	};

	type BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderItemDto = {
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
		shipmentOrderId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 物料主键Id */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 分配数量 */
		shareQuantity?: number;
		/** 出库数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
		/** 理货数量 */
		tallyQuantity?: number;
		pickItemStatus?: BurnAbpWMS_chukuzhilingOutInstructionItemStatus;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		peoples?: BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderItemPeopleDto[];
	};

	type BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderItemPeopleDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 分配的捡料班组 */
		warehouseTeamId?: string;
		/** 班组编码 */
		warehouseTeamCode?: string;
		/** 班组名称 */
		warehouseTeamName?: string;
		/** 处理人ID */
		assigneeId?: string;
		/** 处理人姓名 */
		assigneeName?: string;
	};

	type BurnAbpWMS_chuku_chukuzhilingOutInstructionPickItemUnfinishedCountDto = {
		orderType?: number;
		count?: number;
	};

	type BurnAbpWMS_chuku_chukuzhilingOutInstructionSummaryDto = {
		/** 发运总数量 */
		totalCount?: number;
		/** 已发运数量 */
		shippedCount?: number;
		/** 未发运数量 */
		unShippedCount?: number;
		/** 已发运百分比 */
		shippedPercentage?: number;
		/** 未发运百分比 */
		unShippedPercentage?: number;
	};

	type BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto = {
		/** 指定来源单号 */
		sourceOrderNo?: string;
		/** 指定DateCode */
		dateCode?: string;
		/** 指定批次 */
		lotNumber?: string;
		/** 指定合同号 */
		contractNo?: string;
		/** 指定任务令 */
		taskOrderNo?: string;
		/** 指定箱号 */
		boxNumber?: string;
		/** 指定序列号 */
		serialNumber?: string;
	};

	type BurnAbpWMS_chuku_gundongfaliaojiluMaterialLoopPickInfoDto = {
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
		/** 库房 */
		warehouseId?: string;
		/** 物料编码 */
		materialItemId?: string;
		/** 来源单据 */
		sourceOrderNo?: string;
		/** 载具号 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 库存DC */
		dateCode?: string;
		/** 批次号 */
		businessLotNumber?: string;
		/** 发料数量 */
		pickQty?: number;
		loopType?: BurnAbpWMS_jichuxinxi_wuliaoxinxiLoopType;
		/** 批次属性名称 */
		loopLotAttrName?: string;
		/** 滚动指定值 */
		loopValue?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_chuku_songhuodanBindDeliveryItemDto = {
		deliveryOrderId?: string;
		ids?: string[];
	};

	type BurnAbpWMS_chuku_songhuodanCheckDeliveryDto = {
		asnOrderNo?: string;
		traceId?: string;
	};

	type BurnAbpWMS_chuku_songhuodanCreateDeliveryOrderByTraceDto = {
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
		/** 单据编码 */
		orderNo?: string;
		/** 客户送货预约号 */
		asnOrderNo?: string;
		/** 库房ID */
		wareHouseId?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 备注 */
		remark?: string;
		items?: BurnAbpWMS_chuku_songhuodanDeliveryOrderItemDto[];
		traceIds?: string[];
	};

	type BurnAbpWMS_chuku_songhuodanCreateOrUpdateDeliveryOrderDto = {
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
		/** 单据编码 */
		orderNo?: string;
		/** 客户送货预约号 */
		asnOrderNo?: string;
		/** 库房ID */
		wareHouseId?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 备注 */
		remark?: string;
		items?: BurnAbpWMS_chuku_songhuodanDeliveryOrderItemDto[];
		bindPickItems?: string[];
	};

	type BurnAbpWMS_chuku_songhuodanDeliveryOrderDto = {
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
		/** 单据编码 */
		orderNo?: string;
		/** 客户送货预约号 */
		asnOrderNo?: string;
		/** 库房ID */
		wareHouseId?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpWMS_chuku_songhuodanDeliveryOrderItemDto = {
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
		deliveryOrderId?: string;
		/** 出库指令单号 */
		outInstructionOrderNo?: string;
		/** 出库指令单号明细ID */
		outInstructionOrderItemId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 送货数量 */
		quantity?: number;
		remark?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		/** 物料 */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_chuku_songhuodanFullDeliveryOrderDto = {
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
		/** 单据编码 */
		orderNo?: string;
		/** 客户送货预约号 */
		asnOrderNo?: string;
		/** 库房ID */
		wareHouseId?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 备注 */
		remark?: string;
		items?: BurnAbpWMS_chuku_songhuodanDeliveryOrderItemDto[];
	};

	type BurnAbpWMS_chuku_songhuodanLabeValue = {
		vlaue?: string;
		label?: string;
		downLoadName?: string;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaBusinessLotPickInputDto = {
		/** 新栈板号 */
		newTraceId?: string;
		/** 任务ID */
		taskId?: string;
		/** 物料ID */
		materialId?: string;
		/** 数量 */
		totalQuantity?: number;
		/** 箱号 */
		boxList?: BurnAbpWMS_chuku_wuliaoxiajiaBusinessLotPrePickItem[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaBusinessLotPrePickItem = {
		/** 库位 */
		locationCode?: string;
		/** 箱的LPN */
		traceId?: string;
		/** 批次号 */
		businessLotNumber?: string;
		/** 数量 */
		quantity?: number;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaHybridItemPickItem = {
		/** 箱的LPN */
		traceId?: string;
		/** 业务批次编码 -- 按批次杂出传递 */
		businessLotNumber?: string;
		/** 库位 */
		locationCode?: string;
		/** 箱号 */
		boxNumber: string;
		/** 序列号 */
		serialNumber?: string;
		/** 数量 */
		quantity?: number;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaItemPrePickInputDto = {
		/** 任务Id */
		taskId?: string;
		/** 物料编码 */
		materialId?: string;
		/** 新LPN 没有就与旧LPN一致 */
		newTraceId?: string;
		/** 总下架数量 */
		totalQuantity?: number;
		/** 下架箱列表 */
		boxList?: BurnAbpWMS_chuku_wuliaoxiajiaItemPrePickItem[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaItemPrePickItem = {
		/** 箱的LPN */
		traceId?: string;
		/** 库位 */
		locationCode?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 序列号 */
		serialNumber?: string;
		/** 数量 */
		quantity?: number;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaManualHybridOutInput = {
		/** 箱的LPN */
		traceId?: string;
		/** 库位 */
		locationCode?: string;
		/** 库房信息 */
		warehouseId?: string;
		/** 物料编码 */
		materialItemCode?: string;
		/** 物料外码 */
		materialItemOutCode?: string;
		/** 总下架数量 */
		totalQuantity?: number;
		/** 是否回传 */
		isCallBack?: boolean;
		/** 下架箱列表 */
		boxList?: BurnAbpWMS_chuku_wuliaoxiajiaHybridItemPickItem[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaMaterialHybridPickByBoxOrSerialDto = {
		/** 是否整箱下架--按编码杂出时不需要传该参数，默认True */
		fullPick?: boolean;
		/** 是否回传 */
		isCallBack?: boolean;
		/** 备注信息 */
		remark?: string;
		/** 下架箱列表 不是整箱下架时 需要回传该参数，编码杂出不需要回传该参数 */
		boxList?: BurnAbpWMS_chukuzhilingPickTraceBoxInfoModel[];
		/** 扫描Lpn、箱号、Sn信息 */
		boxNumber?: string;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaMaterialHybridPickByMaterialCodeDto = {
		/** 是否整箱下架--按编码杂出时不需要传该参数，默认True */
		fullPick?: boolean;
		/** 是否回传 */
		isCallBack?: boolean;
		/** 备注信息 */
		remark?: string;
		/** 下架箱列表 不是整箱下架时 需要回传该参数，编码杂出不需要回传该参数 */
		boxList?: BurnAbpWMS_chukuzhilingPickTraceBoxInfoModel[];
		/** 库位编码 */
		locationCode: string;
		/** 物料编码或批次号 */
		materialCodeOrLotNo: string;
		/** 需下架数量 */
		quantity: number;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaMaterialPickDto = {
		/** 下架任务Id */
		taskId?: string;
		/** 新栈板Lpn */
		newTraceId?: string;
		/** 扫描Lpn、箱号、Sn信息 */
		boxNumber?: string;
		/** 附件 */
		attachments?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxAttachmentViewModel[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 出库指令单号 */
		outInstructionOrderNo?: string;
		/** 出库指令单号明细ID */
		outInstructionOrderItemId?: string;
		/** 出库任务Id */
		pickTaskItemId?: string;
		/** 送货单号 */
		deliveryOrderNo?: string;
		/** 客户预约ASN单号 */
		asnOrderNo?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		status?: BurnAbpWMS_chukuzhilingDeliveryStatus;
		/** 绑定时间 */
		bindTime?: string;
		/** 复核时间 */
		checkTime?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
		/** 库房 */
		wareHouseId?: string;
		/** 库区编码 */
		wareHouseZoneCode?: string;
		/** 库位信息 */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 旧载具编码号 */
		traceId?: string;
		/** 新载具编码号 */
		newTraceId?: string;
		/** 库存DateCode */
		dateCode?: string;
		/** 数量 */
		qty?: number;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		/** 物料编码 */
		materialId?: string;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaMaterialPickInputDto = {
		newTraceId?: string;
		taskId?: string;
		traceId?: string;
		materialId?: string;
		locationCode?: string;
		totalQuantity?: number;
		boxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiamingxiCreateOrUpdateMaterialPickItemBoxDetailAttachmentDto = {
		id?: string;
		attachmentType?: BurnAbpWMS_rukuzhiling_rukuInOutInstructionOrderLpnItemAttachmentType;
		/** 文件名 */
		fileName?: string;
		contentType?: string;
		/** 大小 */
		size?: number;
		/** Blob */
		blobName?: string;
		/** 缩略图的Blob */
		thumbnailBlobName?: string;
		/** 缩略图大小 */
		thumbnailSize?: number;
		creator?: string;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiamingxiCreateOrUpdateMaterialPickItemBoxDetailAttachmentInput = {
		attachments?: BurnAbpWMS_chuku_wuliaoxiajiamingxiCreateOrUpdateMaterialPickItemBoxDetailAttachmentDto[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailAttachmentDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		attachmentType?: BurnAbpWMS_rukuzhiling_rukuInOutInstructionOrderLpnItemAttachmentType;
		/** 文件名 */
		fileName?: string;
		contentType?: string;
		/** 大小 */
		size?: number;
		/** Blob */
		blobName?: string;
		/** 缩略图的Blob */
		thumbnailBlobName?: string;
		/** 缩略图大小 */
		thumbnailSize?: number;
		creator?: string;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 出库指令单号 */
		outInstructionOrderNo?: string;
		/** 出库指令单号明细ID */
		outInstructionOrderItemId?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		/** 库区 */
		wareHouseZoneCode?: string;
		/** 库位 */
		wareHouseLocationCode?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 物料 */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 载具号(LPN) */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 序列号SN */
		serialNumber?: string;
		/** 数量 */
		qty?: number;
		attachments?: BurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailAttachmentDto[];
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaPickByMaterialAutoFindTaskDto = {
		/** 新栈板号 */
		newTraceId?: string;
		/** 出库指令单号 */
		outInstructionOrderNo: string;
		/** 物料编码 */
		materialCode: string;
		/** 库位编码 */
		locationCode: string;
		/** 下架数量 */
		quantity: number;
	};

	type BurnAbpWMS_chuku_wuliaoxiajiaPickByMaterialDto = {
		/** 任务ID */
		taskId?: string;
		/** 新栈板号 */
		newTraceId?: string;
		/** 物料ID */
		materialCode?: string;
		/** 库位编码 */
		locationCode?: string;
		/** 下架数量 */
		quantity?: number;
	};

	type BurnAbpWMS_chuku_zhuangchefuheCreateLoadCheckInfo = {
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 出库指令单号 */
		outInstructionOrderNo?: string;
		/** 送货单号 */
		deliveryOrderNo?: string;
		/** 车牌号 */
		licensePlateNumber?: string;
		/** 密封编码 */
		sealCode?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		traceId?: string;
	};

	type BurnAbpWMS_chuku_zhuangchefuheLoadCheckRecordDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 出库指令单号 */
		outInstructionOrderNo?: string;
		/** 出库指令明细Id */
		outInstructionOrderItemId?: string;
		/** 送货单号 */
		deliveryOrderNo?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 物料编码 */
		materialId?: string;
		/** 车牌号 */
		licensePlateNumber?: string;
		/** 密封编码 */
		sealCode?: string;
		/** 载具号(LPN) */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 序列号SN */
		serialNumber?: string;
		/** 数量 */
		quantity?: number;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_chukujianyanEnumOutInstructionType = 1;

	type BurnAbpWMS_chukujianyanOutInspectionTaskResolveData = {
		businessLotNumber?: string;
		boxNumber?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		quantity?: number;
		dateCode?: string;
		expiryDate?: string;
		acProperty?: string;
		manufacturerName?: string;
		fufilRohsFlag?: string;
		materialVersion?: string;
		isExpensive?: boolean;
	};

	type BurnAbpWMS_chukujianyanOutInspectionTaskStatus = 15 | 16 | 20 | 25;

	type BurnAbpWMS_chukuxuqiuhebingcelveMergeCondition = 1 | 2;

	type BurnAbpWMS_chukuxuqiuhebingcelveMergeMode = 0 | 1;

	type BurnAbpWMS_chukuxuqiuOutInstructionDemandItemStatus = 0 | 5 | 10 | 11 | 20;

	type BurnAbpWMS_chukuxuqiuOutInstructionDemandStatus = 0 | 5 | 10 | 15 | -999;

	type BurnAbpWMS_chukuzhilingDeliveryStatus = 5 | 10 | 15;

	type BurnAbpWMS_chukuzhilingManualTraceItem = {
		traceId?: string;
		quantity?: number;
	};

	type BurnAbpWMS_chukuzhilingOutInstructionItemStatus = 1 | 5 | 6 | 10 | 11 | 15 | 20 | 26 | 27 | 28;

	type BurnAbpWMS_chukuzhilingOutInstructionOrderType = 5 | 6 | 10 | 11 | 12 | 14 | 15 | 16 | 20;

	type BurnAbpWMS_chukuzhilingOutInstructionStatus = 5 | 6 | 7 | 10 | 15 | 18 | 19 | 20 | 25 | 30 | -999;

	type BurnAbpWMS_chukuzhilingOutInstructionType = 10 | 20;

	type BurnAbpWMS_chukuzhilingPickItemStatus = 5 | 10 | 15 | 19 | 20;

	type BurnAbpWMS_chukuzhilingPickTraceBoxInfoModel = {
		materialId?: string;
		warehouseId?: string;
		traceId?: string;
		boxNumber: string;
		targetBoxNumber?: string;
		serialNumber?: string;
		quantity?: number;
		takeBox?: boolean;
		locationCode?: string;
		boxLotList?: BurnAbpWMS_chukuzhilingPickTraceBoxInfoModel[];
	};

	type BurnAbpWMS_danjulaiyuan_caigoudingdanPurchaseOrderItemModel = {
		purchaseOrderNo?: string;
		supplierCode?: string;
		supplierName?: string;
		purchaseOrderItemId?: string;
		sort?: number;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		qty?: number;
		acceptQty?: number;
		deliveryDate?: string;
	};

	type BurnAbpWMS_danjulaiyuan_xiaoshoudingdanSaleOrderItemModel = {
		sourceOrderNo?: string;
		sourceOrderItemId?: string;
		customerCode?: string;
		customerName?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		qty?: number;
	};

	type BurnAbpWMS_danjulaiyuan_xiaoshoupeiliaodanSaleOrderIncomModel = {
		saleOrderNo?: string;
		customerCode?: string;
		customerName?: string;
		saleOrderInComItemId?: string;
		sort?: number;
		mainMaterialCode?: string;
		mainMaterialOutCode?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		qty?: number;
		acceptQty?: number;
	};

	type BurnAbpWMS_diaoboAssignStockTaskItemDto = {
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
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 关联调拨单Id */
		storeTransferOrderId?: string;
		/** 物料编码 */
		materialItemId?: string;
		/** 物料编码 */
		materialItemCode?: string;
		/** 调拨数量 */
		quantity?: number;
		/** 已调拨下架数量 */
		pickQuantity?: number;
		/** 已调拨上架数量 */
		putQuantity?: number;
		stockBinInfoDtos?: BurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto[];
	};

	type BurnAbpWMS_diaoboCreateStoreTransferOrderDto = {
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
		/** 单据号 */
		orderNo?: string;
		/** 源库房 */
		sourceWarehouseId?: string;
		/** 目标库房 */
		targetWarehouseId?: string;
		sourceWarehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		targetWarehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 备注 */
		remark?: string;
		materialItemDtos?: BurnAbpWMS_diaoboMaterialItemInfo[];
	};

	type BurnAbpWMS_diaoboManualTransferInputDto = {
		sourceWarehouseId?: string;
		targetWarehouseId?: string;
		transferLocationCode?: string;
		transferTraceItems?: BurnAbpWMS_diaoboManualTransferTraceItem[];
	};

	type BurnAbpWMS_diaoboManualTransferTraceItem = {
		traceId?: string;
		warehouseId?: string;
		warehouseCode?: string;
		localCode?: string;
		materialItemId?: string;
		quantity?: number;
	};

	type BurnAbpWMS_diaoboMaterialItemInfo = {
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		materialQty?: number;
	};

	type BurnAbpWMS_diaoboQuickCreateItemDto = {
		/** 跟踪号/容器号 */
		traceId?: string;
		/** 物料ID */
		materialItemId?: string;
		/** 物料编码 */
		materialItemCode?: string;
		/** 数量 */
		qty?: number;
	};

	type BurnAbpWMS_diaoboQuickCreateStoreTransferOrderDto = {
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
		/** 单据号 */
		orderNo?: string;
		/** 源库房 */
		sourceWarehouseId?: string;
		/** 源库房编码 */
		sourceWarehouseCode?: string;
		/** 源库房名称 */
		sourceWareHouseName?: string;
		/** 目标库房 */
		targetWarehouseId?: string;
		/** 目标库房编码 */
		targetWarehouseCode?: string;
		/** 目标库房名称 */
		targetWarehouseName?: string;
		/** 备注 */
		remark?: string;
		quickCreateItem?: BurnAbpWMS_diaoboQuickCreateItemDto[];
	};

	type BurnAbpWMS_diaoboStoreTransferOrderDto = {
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
		/** 单据号 */
		orderNo?: string;
		/** 源库房 */
		sourceWarehouseId?: string;
		/** 目标库房 */
		targetWarehouseId?: string;
		/** 备注 */
		remark?: string;
		orderStatus?: BurnAbpWMSOrderStatus;
		transferOrderStatus?: BurnAbpWMS_diaoboTransferOrderStatus;
		sourceWarehouseReference?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		targetWarehouseReference?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
	};

	type BurnAbpWMS_diaoboStoreTransferOrderItemDto = {
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
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 关联调拨单Id */
		storeTransferOrderId?: string;
		/** 物料编码 */
		materialItemId?: string;
		/** 物料编码 */
		materialItemCode?: string;
		/** 调拨数量 */
		quantity?: number;
		/** 已调拨下架数量 */
		pickQuantity?: number;
		/** 已调拨上架数量 */
		putQuantity?: number;
		/** 所属调拨任务ID */
		storeTransferTaskItemId?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_diaoboStoreTransferTaskItemDto = {
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
		/** 调拨单号 */
		storeTransferOrderNo?: string;
		/** 源库房编码 */
		sourceWarehouseCode?: string;
		/** 源库房名称 */
		sourceWareHouseName?: string;
		/** 目标库房 */
		targetWarehouseId?: string;
		/** 目标库房编码 */
		targetWarehouseCode?: string;
		/** 目标库房名称 */
		targetWarehouseName?: string;
		/** 源库区 */
		sourceWarehouseZoneCode?: string;
		/** 源库位 */
		sourceWarehouseLocationCode?: string;
		/** 载具LPN */
		sourceTraceId?: string;
		/** 物料Id */
		materialItemId?: string;
		/** 调拨数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
		/** 上架数量 */
		putQuantity?: number;
		transferTaskStatus?: BurnAbpWMS_diaoboTransferTaskStatus;
		sourceWarehouseReference?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		targetWarehouseReference?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_diaoboTransferOrderStatus = 5 | 10 | 15 | 20 | 25 | 30;

	type BurnAbpWMS_diaoboTransferTaskStatus = 5 | 10 | 15 | 20;

	type BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto = {
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
		name?: string;
		phoneTel?: string;
		/** 所属仓库 */
		wareHouseId?: string;
		wareHouseName?: string;
		/** 所属仓库班组 */
		warehouseTeamId?: string;
		warehouseTeamName?: string;
		userId?: string;
		userName?: string;
		remark?: string;
	};

	type BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto = {
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
		/** 名称 */
		name?: string;
		/** 剩余天数 */
		lastDays?: number;
		/** 推送间隔 */
		intervalDays?: number;
		/** 推送人Id */
		pusherId?: string;
		/** 推送人姓名 */
		pusherName?: string;
	};

	type BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto = {
		id?: string;
		name?: string;
		liceseNumber?: string;
		vehicleModel?: string;
		brand?: string;
		productionDate?: string;
		yearCheckDate?: string;
		purchaseTime?: string;
		driver?: string;
		owner?: string;
		palletCount?: number;
	};

	type BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto = {
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
		/** 方案编码 */
		code?: string;
		/** 方案名称 */
		name?: string;
		/** 是否默认 */
		isDefault?: boolean;
		/** 备注 */
		memo?: string;
		/** 检验项目列表 */
		items?: BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeItemDto[];
	};

	type BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeItemDto = {
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
		outInspectionSchemeId?: string;
		/** 出库检验项目Id */
		outInspectionProjectId?: string;
		/** 排序 */
		sort?: number;
		/** 是否启用 */
		isEnable?: boolean;
		outInspectionProject?: BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto;
	};

	type BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectCheckerDto = {
		id?: string;
		outInspectionProjectId?: string;
		/** 校验器提供者 */
		providerName?: string;
		/** 属性名称 */
		propertyName?: string;
	};

	type BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto = {
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
		/** 字段名称 */
		field?: string;
		/** 显示标签 */
		label?: string;
		/** 类型 0 字符串 1数字  2日期 3bool  4下拉 */
		type?: number;
		/** 可选操作选项 */
		optionValues?: string;
		/** 检验器提供者名称 */
		checkProviderName?: string;
		outInspectionProjectCheckers?: BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectCheckerDto[];
	};

	type BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiEnumInstructionConfigType = 5 | 10;

	type BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto = {
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
		/** 指令提供者编码 */
		providerCode?: string;
		/** 指令提供者名称 */
		providerName?: string;
		type?: BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiEnumInstructionConfigType;
		/** 自动指令 */
		isAuto?: boolean;
		/** 欠料交付 */
		isLessCloseAutoDistribution?: boolean;
		/** 自动分发 */
		putAutoDistribution?: boolean;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 是否允许超发 */
		allowOverIssuance?: boolean;
		/** 允许超发系数 */
		allowableOverIssuanceCoefficient?: number;
		/** 是否允许欠料交付 */
		allowUnderIssuance?: boolean;
		/** 欠料发运是否自动生成欠料单 */
		isAutoGenShortageOrderOnUnderIssuance?: boolean;
		/** 转库出库单是否自动生成入库单 */
		isTransferOutOrderAutoGenInOrder?: boolean;
		/** 转库入库单提供者名称 */
		transferInOrderProviderName?: string;
		/** 转库入库单提供者描述 */
		transferInOrderProviderDescribe?: string;
		/** 是否需要回传 */
		needCallBack?: boolean;
		/** 生效库房 */
		wareHouses?: string;
		/** 使用来源单号入库 */
		useSourceOrderNo?: boolean;
		/** 是否验证来源单号 */
		validateSourceOrderNo?: boolean;
		/** 是否启用 */
		isEnable?: boolean;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto = {
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
		/** 原库房 */
		sourceWarehouseId?: string;
		/** 原库房 */
		sourceWarehouseName?: string;
		/** 调拨不良品库 */
		rejectWarehouseId?: string;
		/** 调拨不良品库 */
		rejectWarehouseName?: string;
		/** 调拨良品库 */
		goodWarehouseId?: string;
		/** 调拨良品库 */
		goodWarehouseName?: string;
		/** 备注 */
		note?: string;
		sourceWarehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		rejectWarehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		goodWarehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
	};

	type BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto = {
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
		/** 区域 */
		factoryZoneId?: string;
		factoryZoneName?: string;
		zoneClass?: BurnAbpWMSWarehouseZoneClass;
		useType?: BurnAbpWMSUseType;
		/** 编码 */
		code?: string;
		warehouseTeamId?: string;
		/** 地址 */
		address?: string;
		/** 描述 */
		remark?: string;
		factoryZone?: BurnAbpWMS_jichuxinxi_quyuFactoryZoneDto;
		warehouseTeam?: BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto;
	};

	type BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto = {
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
		/** 班组编码 */
		code?: string;
		/** 班组名称 */
		name?: string;
		/** 班组领导 */
		leaderId?: string;
		leaderName?: string;
		/** 备注 */
		remark?: string;
		leader?: BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuquCreateWareHouseZoneInput = {
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 库房（已过时，请使用Warehouse属性） */
		wareHouseId?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		/** 库区编码 */
		code: string;
		/** 库区描述 */
		remark?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 区域Id */
		factoryZoneId?: string;
		warehouseTeamId?: string;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuquUpdateWarehouseZoneInput = {
		/** 库房 */
		wareHouseId?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		/** 库区编码 */
		code: string;
		/** 库区描述 */
		remark?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 区域Id */
		factoryZoneId?: string;
		warehouseTeamId?: string;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto = {
		extraProperties?: Record<string, any>;
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
		/** 库房 */
		wareHouseId?: string;
		/** 库房名称 */
		wareHouseName?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		/** 库区编码 */
		code?: string;
		/** 库区描述 */
		remark?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 区域Id */
		factoryZoneId?: string;
		/** 区域名称 */
		factoryZoneName?: string;
		warehouseTeamId?: string;
		warehouseTeamName?: string;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuweiBatchCreateLocationDto = {
		/** 库房Id */
		wareHouseId?: string;
		/** 库区Id */
		warehouseZoneId?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		usePriority?: BurnAbpWMSLocationUsePriority;
		/** 是否环保 */
		isRoHs?: boolean;
		/** 最大承重(kg) */
		weight?: number;
		/** 长(mm) */
		lenght?: number;
		/** 宽(mm) */
		width?: number;
		/** 高(mm) */
		height?: number;
		startCol?: number;
		endCol?: number;
		startRow?: number;
		endRow?: number;
		startLayer?: number;
		endLayer?: number;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuweiCreateWarehouseLocationInput = {
		/** 库房Id */
		wareHouseId?: string;
		/** 库区Id */
		warehouseZoneId?: string;
		/** 库区编码 */
		code?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		usePriority?: BurnAbpWMSLocationUsePriority;
		/** 是否环保 */
		isRoHs?: boolean;
		weight?: number;
		lenght?: number;
		width?: number;
		height?: number;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuweiUpdateWarehouseLocationInput = {
		/** 库房Id */
		wareHouseId?: string;
		/** 库区Id */
		warehouseZoneId?: string;
		/** 库区编码 */
		code?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		usePriority?: BurnAbpWMSLocationUsePriority;
		/** 是否环保 */
		isRoHs?: boolean;
		/** 是否维修件/翻新件 */
		isMakeOver?: boolean;
		weight?: number;
		lenght?: number;
		width?: number;
		height?: number;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto = {
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
		/** 库房Id */
		wareHouseId?: string;
		/** 库区Id */
		warehouseZoneId?: string;
		/** 库位编码 */
		code?: string;
		type?: BurnAbpWMSWarehouseZoneType;
		usePriority?: BurnAbpWMSLocationUsePriority;
		/** 是否环保 */
		isRoHs?: boolean;
		weight?: number;
		lenght?: number;
		width?: number;
		height?: number;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		wareHouseZone?: BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto;
	};

	type BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationUseDto = {
		/** 总数量 */
		totalQuantity?: number;
		/** 使用数量 */
		useQuantity?: number;
		/** 未使用数量 */
		unUseQuantity?: number;
	};

	type BurnAbpWMS_jichuxinxi_kufangWareHouseDto = {
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
		/** 库位编码 */
		code?: string;
		/** 库位名称 */
		name?: string;
		wareHouseType?: BurnAbpWMSWareHouseType;
		warehousePropertyType?: BurnAbpWMSWarehousePropertyType;
		/** 该库房是否需要物权 */
		needRealRightCode?: boolean;
		/** 地址 */
		address?: string;
		/** 库房负责人 */
		contact?: string;
		/** 联系电话 */
		tel?: string;
		memo?: string;
	};

	type BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto = {
		/** 库位ID */
		id?: string;
		/** 库位编码 */
		code?: string;
		usePriority?: BurnAbpWMSLocationUsePriority;
	};

	type BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto = {
		/** 库房ID */
		id?: string;
		/** 库房编码 */
		code?: string;
		/** 库房名称 */
		name?: string;
	};

	type BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseZoneReferenceDto = {
		/** 库区ID */
		id?: string;
		/** 库区编码 */
		code?: string;
		type?: BurnAbpWMSWarehouseZoneType;
	};

	type BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto = {
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
		/** 名称 */
		name?: string;
		/** 剩余天数（天） */
		stockAge?: number;
		/** 推送人Id */
		pusherId?: string;
		/** 推送人姓名 */
		pusherName?: string;
	};

	type BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto = {
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
		/** 字段 LotAttr01  LotAttr02 */
		field?: string;
		/** 显示标签 */
		label?: string;
		/** 类型 */
		type?: number;
		flag?: boolean;
		/** 可选操作选项 */
		optionValues?: string;
		productionDateProviderName?: string;
		lotAttrItemResolvers?: BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemResolverDto[];
	};

	type BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemResolverDto = {
		id?: string;
		lotAttrItemId?: string;
		/** 数据解析提供者 */
		resolverProviderName?: string;
		/** 属性名称 */
		propertyName?: string;
	};

	type BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto = {
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
		/** 批次名称 */
		name?: string;
		/** 是否默认 */
		isDefault?: boolean;
		/** 描述 */
		description?: string;
		items?: BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupItemDto[];
	};

	type BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupItemDto = {
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
		lotAttrGroupId?: string;
		lotAttrItemId?: string;
		lotAttrItemLabel?: string;
		flag?: boolean;
		sort?: number;
		lotAttrItem?: BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto;
	};

	type BurnAbpWMS_jichuxinxi_qianliaoyuanyinCreateOrUpdateLessReasonDto = {
		/** 原因编码 */
		code?: string;
		/** 原因名称 */
		name?: string;
	};

	type BurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto = {
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
		/** 原因编码 */
		code?: string;
		/** 原因名称 */
		name?: string;
	};

	type BurnAbpWMS_jichuxinxi_quyuCreateFactoryZoneInput = {
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 地址 */
		address?: string;
		/** 厂区类型 */
		factoryType: string;
		/** 是否参与生成树路径 */
		generateTreePath?: boolean;
		/** 备注 */
		remark?: string;
		/** 父级Id */
		parentId?: string;
	};

	type BurnAbpWMS_jichuxinxi_quyuFactoryZoneDto = {
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
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 地址 */
		address?: string;
		/** 厂区类型 */
		factoryType?: string;
		/** 是否参与生成树路径 */
		generateTreePath?: boolean;
		/** 备注 */
		remark?: string;
		parentId?: string;
		path?: string;
	};

	type BurnAbpWMS_jichuxinxi_quyuUpdateFactoryZoneInput = {
		/** 名称 */
		name: string;
		/** 地址 */
		address?: string;
		/** 厂区类型 */
		factoryType: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpWMS_jichuxinxi_renwudailirenCreatePickTaskAgentInput = {
		/** 委托人Id */
		principalId?: string;
		/** 委托人名称 */
		principalName?: string;
		/** 代理人Id */
		agentId?: string;
		/** 代理人名称 */
		agentName?: string;
		/** 开始时间 */
		startTime?: string;
		/** 结束时间 */
		endTime?: string;
	};

	type BurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 委托人Id */
		principalId?: string;
		/** 委托人名称 */
		principalName?: string;
		/** 代理人Id */
		agentId?: string;
		/** 代理人名称 */
		agentName?: string;
		/** 开始时间 */
		startTime?: string;
		/** 结束时间 */
		endTime?: string;
	};

	type BurnAbpWMS_jichuxinxi_renwudailirenUpdatePickTaskAgentInput = {
		/** 委托人Id */
		principalId?: string;
		/** 委托人名称 */
		principalName?: string;
		/** 代理人Id */
		agentId?: string;
		/** 代理人名称 */
		agentName?: string;
		/** 开始时间 */
		startTime?: string;
		/** 结束时间 */
		endTime?: string;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianCreatePutItemRecommendStrategyDto = {
		/** 名称 */
		name?: string;
		/** 仓库Id */
		warehouseId?: string;
		/** 仓库名称 */
		warehouseName?: string;
		/** 物料类型编码,多个用逗号隔开 */
		materialItemCategoryCodes?: string;
		/** 库区编码 */
		warehouseZoneCodes?: string;
		/** 库位编码 */
		warehouseLocationCodes?: string;
		providerName?: string;
		providerDescription?: string;
		/** 优先级 */
		priorityLevel?: number;
		/** 描述 */
		description?: string;
		materialRecommendType?: BurnAbpWMS_jichuxinxi_shangjiatuijianMaterialRecommendType;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianCreatePutItemRecommendStrategyItemDto = {
		/** 上架推荐策略Id */
		putItemRecommendStrategyId?: string;
		/** 物料前缀 */
		materialCodePrefix?: string;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianImportPutItemRecommendStrategyItemDto = {
		putItemRecommendStrategyId?: string;
		file?: string;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianMaterialRecommendType = 0 | 1;

	type BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendResultDto = {
		/** 库位编码 */
		warehouseLocationCode?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 名称 */
		name?: string;
		/** 仓库Id */
		warehouseId?: string;
		/** 仓库名称 */
		warehouseName?: string;
		/** 物料类型编码,多个用逗号分隔 */
		materialCategoryCodes?: string;
		materialRecommendType?: BurnAbpWMS_jichuxinxi_shangjiatuijianMaterialRecommendType;
		/** 库区编码,多个用逗号分隔 */
		warehouseZoneCodes?: string;
		/** 库位编码,多个用逗号分隔 */
		warehouseLocationCodes?: string;
		providerName?: string;
		providerDescription?: string;
		/** 优先级 */
		priorityLevel?: number;
		/** 描述 */
		description?: string;
		items?: BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto[];
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		/** 上架推荐策略Id */
		putItemRecommendStrategyId?: string;
		/** 物料编码前缀 */
		materialCodePrefix?: string;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianUpdatePutItemRecommendStrategyDto = {
		/** 名称 */
		name?: string;
		/** 仓库Id */
		warehouseId?: string;
		/** 仓库名称 */
		warehouseName?: string;
		/** 物料类型编码 */
		materialItemCategoryCode?: string;
		/** 物料类型名称 */
		materialItemCategoryName?: string;
		/** 库区Id */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		/** 库位Id */
		warehouseLocationId?: string;
		/** 库位编码 */
		warehouseLocationCode?: string;
		providerName?: string;
		providerDescription?: string;
		/** 优先级 */
		priorityLevel?: number;
		/** 描述 */
		description?: string;
		materialRecommendType?: BurnAbpWMS_jichuxinxi_shangjiatuijianMaterialRecommendType;
	};

	type BurnAbpWMS_jichuxinxi_shangjiatuijianUpdatePutItemRecommendStrategyItemDto = {
		/** 物料前缀 */
		materialCodePrefix?: string;
	};

	type BurnAbpWMS_jichuxinxi_wuliaocunchuqiCreateOrUpdateMaterialItemLifeDayDto = {
		/** 物料ID */
		materialItemId: string;
		/** 物料编码 */
		materialItemCode: string;
		/** 物料版本 */
		version?: string;
		/** 供应商代码 */
		supplierCode?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 存储周期(天) */
		shelfLifeDays: number;
		/** 最大存储周期(天) */
		maxinumShelfLifeDays?: number;
	};

	type BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto = {
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
		/** 物料版本 */
		version?: string;
		/** 供应商代码 */
		supplierCode?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 存储周期(天) */
		shelfLifeDays?: number;
		/** 最大存储周期(天) */
		maxinumShelfLifeDays?: number;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto = {
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
		/** 物料分类名称 */
		name?: string;
		/** 物料分类显示名称 */
		displayName?: string;
		/** 编码 */
		code?: string;
		level?: number;
		/** 上级分类 */
		parentId?: string;
		parent?: BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiBulkReplaceSettingDto = {
		materialItemId?: string;
		materialItemCategoryId?: string;
		formManagerId?: string;
		toManagerId?: string;
		toManagerName?: string;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiCreateMaterialItemManagerSettingInput = {
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 物料默认管理班组 */
		warehouseTeamId?: string;
		/** 班组名称 */
		warehouseTeamName?: string;
		/** 管理员ID */
		managerId?: string;
		/** 管理员姓名 */
		managerName?: string;
		/** 物料ID */
		materialItemId?: string;
		/** 物料分类ID */
		materialItemCategoryId?: string;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto = {
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
		/** 库房（已过时，请使用Warehouse属性） */
		wareHouseId?: string;
		/** 物料默认管理班组 */
		warehouseTeamId?: string;
		/** 班组名称 */
		warehouseTeamName?: string;
		/** 管理员ID */
		managerId?: string;
		/** 管理员姓名 */
		managerName?: string;
		/** 物料分类Id */
		materialItemCategoryId?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		manager?: BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto;
		materialItemCategory?: BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiUpdateMaterialItemManagerSettingInput = {
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 物料默认管理班组 */
		warehouseTeamId?: string;
		/** 班组名称 */
		warehouseTeamName?: string;
		/** 管理员ID */
		managerId?: string;
		/** 管理员姓名 */
		managerName?: string;
		/** 物料ID */
		materialItemId?: string;
		/** 物料分类ID */
		materialItemCategoryId?: string;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoxinxiCreateOrUpdateMaterialItemDto = {
		extraProperties?: Record<string, any>;
		/** 物料分类Id */
		materialItemCategoryId?: string;
		/** 物料编码 */
		code?: string;
		/** 物料外码 */
		outCode?: string;
		/** 物料描述 */
		description?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 是否是贵重物品 */
		isExpensive?: boolean;
		/** 是否启用批次属性 */
		lotAttrEnable?: boolean;
		/** 物料所属批次属性 */
		lotAttrGroupId?: string;
		productionDateProviderType?: BurnAbpWMS_jichuxinxiProductionDateProviderType;
		/** 生产日期 批次属性 */
		productionDateAttrCode?: string;
		materialStoreSetting?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialStoreSettingDto;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoxinxiLoopType = 10 | 20 | 30;

	type BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 物料分类Id */
		materialItemCategoryId?: string;
		/** 物料编码 */
		code?: string;
		/** 物料外码 */
		outCode?: string;
		/** 物料描述 */
		description?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 是否是贵重物品 */
		isExpensive?: boolean;
		/** 是否启用批次属性 */
		lotAttrEnable?: boolean;
		/** 物料所属批次属性 */
		lotAttrGroupId?: string;
		productionDateProviderType?: BurnAbpWMS_jichuxinxiProductionDateProviderType;
		/** 生产日期 批次属性 */
		productionDateAttrCode?: string;
		/** 扩展属性值信息 */
		attributeValues?: Record<string, any>;
		materialStoreSetting?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialStoreSettingDto;
		lotAttrGroup?: BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto;
		materialItemCategory?: BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto = {
		/** 物料ID */
		id?: string;
		/** 物料编码 */
		code?: string;
		/** 物料外码 */
		outCode?: string;
		/** 物料描述 */
		description?: string;
		/** 规格型号 */
		specificationModel?: string;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialStoreSettingDto = {
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 是否可以拆箱 */
		takeBox?: boolean;
		pickType?: BurnAbpWMS_chukuzhilingOutInstructionType;
		loopType?: BurnAbpWMS_jichuxinxi_wuliaoxinxiLoopType;
		/** 批次属性名称 */
		loopLotAttrName?: string;
		/** 滚动次数 */
		loopTimes?: number;
		/** 批次最大值 */
		max?: number;
		/** 每次滚动量 */
		loopNum?: number;
		/** 超期警告预警天数 */
		overdueWarningDays?: number;
	};

	type BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel = 5 | 10 | 15;

	type BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto = {
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
		/** 物权编码 */
		code?: string;
		/** 物权名称 */
		name?: string;
		/** 描述 */
		description?: string;
	};

	type BurnAbpWMS_jichuxinxi_xiajiarenwuleixingCreateMaterialPickTaskTypeDto = {
		/** 类型 */
		type: string;
		/** 名称 */
		name: string;
		/** 备注 */
		remark?: string;
		/** 是否启用 */
		isEnabled?: boolean;
	};

	type BurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto = {
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
		/** 类型 */
		type?: string;
		/** 名称 */
		name?: string;
		/** 备注 */
		remark?: string;
		/** 是否启用 */
		isEnabled?: boolean;
	};

	type BurnAbpWMS_jichuxinxi_xiajiarenwuleixingUpdateMaterialPickTaskTypeDto = {
		/** 类型 */
		type: string;
		/** 名称 */
		name: string;
		/** 备注 */
		remark?: string;
		/** 是否启用 */
		isEnabled?: boolean;
	};

	type BurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceIdDto = {
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
		/** 载具号 */
		traceId?: string;
		traceType?: BurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceType;
		/** 顺序号 */
		sort?: number;
	};

	type BurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceType = 0 | 1 | 2;

	type BurnAbpWMS_jichuxinxiProductionDateProviderType = 5 | 10;

	type BurnAbpWMS_kucun_kucunliebiaoGetTraceInfoBoxNumberDto = {
		/** 0 箱号  1 SN  2 批次 */
		barCodeType?: number;
		/** 目标箱号 */
		targetBoxNumber?: string;
		stockBoxList?: BurnAbpWMS_kucun_kucunliebiaoStockBoxInfoDto[];
	};

	type BurnAbpWMS_kucun_kucunliebiaoMergeBoxInfoInput = {
		/** 目标箱号 */
		sourceBox?: string;
		/** 目标数量 */
		qty?: number;
		/** 扫码SN列表 */
		boxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
		/** 是否生成新箱号 */
		clearSourceStockBin?: boolean;
	};

	type BurnAbpWMS_kucun_kucunliebiaoMergeBoxOutPutDto = {
		newBoxNumber?: string;
		/** 新的箱号标签模板 */
		newBoxLabelTemplate?: string;
		/** 尾箱标签模板 */
		tailBoxLabelTemplate?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoMergeLocationInput = {
		sourceLocationCode?: string;
		targetLocationCode?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoMergeTraceIdInput = {
		srouceTraceId?: string;
		targetTraceId?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoMoveBoxLocationInput = {
		/** 目标载具号 */
		targetTraceId?: string;
		/** 目标库位号 */
		targetLocationCode?: string;
		/** 需要移动的箱号列表 */
		moveBoxNumberList?: string[];
	};

	type BurnAbpWMS_kucun_kucunliebiaoMoveMaterialLocationInput = {
		/** 来源库位号 */
		sourceLocationCode: string;
		/** 目标库位号 */
		targetLocationCode: string;
		/** 需要移动的物料 */
		materialId?: string;
		/** 移动的数量, 空或0表示所有 */
		quantity?: number;
	};

	type BurnAbpWMS_kucun_kucunliebiaoMoveStockToLocationInput = {
		sourceLocationCode?: string;
		targetLocationCode?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoMoveTraceToTraceInput = {
		traceId?: string;
		targetLocationCode?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoSplitBoxDto = {
		/** 箱号待分解的 */
		boxNumber?: string;
		/** Sn序列号 */
		serialNumber?: string;
		/** 拆分数量 */
		splitQty?: number;
		/** 箱号对应批次-DC列表 */
		boxLotList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoLotModel[];
	};

	type BurnAbpWMS_kucun_kucunliebiaoSplitBoxInfoInput = {
		/** 来源载具Lpn */
		sourceTraceId: string;
		/** 目标Lpn */
		targetTraceId?: string;
		/** 目标箱号 */
		targetBoxNumber?: string;
		sourceBoxList?: BurnAbpWMS_kucun_kucunliebiaoSplitBoxDto[];
	};

	type BurnAbpWMS_kucun_kucunliebiaoSplitBoxOutPutDto = {
		/** 新箱号 */
		newSourceBoxNumber?: string;
		/** 新的来源箱号标签模板 */
		newSourceBoxTemplate?: string;
		/** 目标箱号 */
		targetBoxNumber?: string;
		/** 目标箱号标签模板 */
		targetBoxTemplate?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoSplitTraceIdInput = {
		/** 来源载具(LPN) */
		sourceTraceId?: string;
		/** 目标载具(LPN) */
		targetTraceId?: string;
		/** 来源箱列表 (源载具) */
		sourceBoxList?: string[];
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBinBoxLotInfoDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 库房Id */
		warehouseId?: string;
		/** 库区 */
		warehouseZoneId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 载具号 信息 */
		parentTraceId?: string;
		/** 物料主键Id */
		materialItemId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 物料型号 */
		modelNumber?: string;
		/** 生产批次 */
		lotNumber?: string;
		/** 批次号 */
		batchNo?: string;
		/** DC */
		dateCode?: string;
		/** 该批次数量 */
		qty?: number;
		/** 产地 */
		origin?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBinCompareStockDto = {
		/** 仓库ID */
		wareHouseId?: string;
		wareHouseCode?: string;
		/** 物料ID */
		materialId?: string;
		materialCode?: string;
		materialOutCode?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 数量 */
		stockBinQty?: number;
		/** 预占数量 */
		stockBinPreRegisteredQuantity?: number;
		/** 可用数量 */
		stockBinAvailableQuantity?: number;
		/** 数量 */
		stockQty?: number;
		/** 预占数量 */
		stockPreRegisteredQuantity?: number;
		/** 可用数量 */
		stockAvailableQuantity?: number;
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBinInfoDelayDto = {
		id?: string;
		/** 设置超期时间 */
		expiryDate?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 仓库编码（已过时，请使用WareHouse.Id） */
		wareHouseId?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 库区 */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		warehouseZoneType?: BurnAbpWMSWarehouseZoneType;
		/** 库位编码 */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 批次 */
		internalLotNumber?: string;
		/** 跟踪号/容器号 */
		traceId?: string;
		/** 业务批次编码 */
		businessLotNumber?: string;
		/** 物料ID */
		materialId?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 开箱状态 */
		isOpen?: boolean;
		/** 开箱时间 */
		openTime?: string;
		/** 上架日期 */
		putDate?: string;
		/** 生产日期 */
		productionDate?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 库存DateCode */
		dateCode?: string;
		/** 超期日期 */
		expiryDate?: string;
		/** 超期次数 */
		expiryCount?: number;
		/** 超期预警日期 */
		overdueWarningDate?: string;
		/** 数量 */
		qty?: number;
		/** 预占数量 */
		preRegisteredQuantity?: number;
		/** 可用数量 */
		availableQuantity?: number;
		qualityStatus?: BurnAbpWMS_rukuzhiling_zhiliangzhuangtaiQualityStatus;
		/** 检验时间 */
		inspectionTime?: string;
		/** 检验人 */
		inspectioner?: string;
		/** 质量检验单号 */
		qualityInspectionNumber?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** 是否维修件/翻新件 */
		isMakeOver?: boolean;
		transferOrderStatus?: BurnAbpWMS_diaoboTransferOrderStatus;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		lotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		warehouseZone?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseZoneReferenceDto;
		wareHouseLocation?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto;
		extraIndexProperties?: Record<string, any>;
		organizationCode?: string;
		organizationName?: string;
		companyCode?: string;
		factoryCode?: string;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto = {
		property1?: string;
		property2?: string;
		property3?: string;
		property4?: string;
		property5?: string;
		property6?: string;
		property7?: string;
		property8?: string;
		property9?: string;
		property10?: string;
		property11?: string;
		property12?: string;
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBinSummaryDto = {
		/** 物料ID */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 总数量 */
		totalQuantity?: number;
		/** 可用数量 */
		availableQuantity?: number;
		/** 预占数量 */
		preRegisteredQuantity?: number;
	};

	type BurnAbpWMS_kucun_kucunliebiaoStockBoxInfoDto = {
		/** 库位 */
		locationCode?: string;
		/** 物料Id */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 栈板号 */
		traceId?: string;
		/** 业务批次号 */
		businessLotNumber?: string;
		/** 箱号 */
		boxNumber?: string;
		/** SN序列号信息 */
		serialNumber?: string;
		/** 数量 */
		quantity?: number;
	};

	type BurnAbpWMS_kucun_kucunliebiaoWorkJobStockBinDto = {
		/** 任务令号 */
		taskOrder?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 数量 */
		qty?: number;
	};

	type BurnAbpWMS_kucun_kucunSNliebiaoStockBinSNInfoDto = {
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
		/** 载具号LPN */
		parentTraceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 物料ID */
		materialId?: string;
		/** 序列号 */
		serialNumber?: string;
		/** 库房ID */
		wareHouseId?: string;
		/** 库区ID */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		warehouseZoneType?: BurnAbpWMSWarehouseZoneType;
		/** 库位ID */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		qty?: number;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		warehouseZone?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseZoneReferenceDto;
		wareHouseLocation?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto = {
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
		parentId?: string;
		/** LPN载具号 */
		parentTraceId?: string;
		/** 库房ID */
		wareHouseId?: string;
		/** 库区ID */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		warehouseZoneType?: BurnAbpWMSWarehouseZoneType;
		/** 库位ID */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 库存DateCode */
		dateCode?: string;
		/** 业务批次编码 */
		businessLotNumber?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 原始箱号 */
		originalBoxNumber?: string;
		/** 箱数量 */
		qty?: number;
		/** 是否可以拆箱 */
		takeBox?: boolean;
		/** 开箱状态 */
		isOpen?: boolean;
		/** 开箱时间 */
		openTime?: string;
		/** 滚动发料次数 */
		loopTimes?: number;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		warehouseZone?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseZoneReferenceDto;
		wareHouseLocation?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_kucun_kucunyanqiStockBinDelayDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 跟踪号/容器号 */
		traceId?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 物料ID */
		materialId?: string;
		/** 物料版本 */
		version?: string;
		/** 生产日期 */
		productionDate?: string;
		/** （旧）过期日期 */
		beforeExpiryDate?: string;
		/** （新）过期日期 */
		newExpiryDate?: string;
		/** 超期次数 */
		expiryCount?: number;
		/** 延期人 */
		delayMan?: string;
		/** 延期记录时间 */
		delayTime?: string;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** TraceId 栈板载具号 */
		traceId?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令 */
		workJobCode?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		recordType?: BurnAbpWMS_kucunStockBinSplitCombinType;
		/** 明细 */
		items?: BurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordItemDto[];
	};

	type BurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		stockBinSplitCombinRecordId?: string;
		recordType?: BurnAbpWMS_kucunStockBinSplitCombinType;
		/** Source lpn 载具号信息 */
		sourceTraceId?: string;
		/** 箱号 */
		sourceBoxNumber?: string;
		/** 新的源箱号 */
		newSourceBoxNumber?: string;
		/** 目标LPN 载具号 */
		targetTraceId?: string;
		/** 模具箱号 */
		targetBoxNumber?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 移动数量 */
		quantity?: number;
	};

	type BurnAbpWMS_kucun_kuweiyidongMaterialLocationMoveItemDto = {
		id?: string;
		sourceWareHouseId?: string;
		sourceWareHouseLocationId?: string;
		materialId?: string;
		/** 生产厂家 */
		materialManufacturer?: string;
		/** 规格型号 */
		materialModel?: string;
		/** 批次条码 */
		batchNo?: string;
		/** 箱条码 */
		barCode?: string;
		/** 日期代码 */
		dateCode?: string;
		/** 批次代码 */
		lotCode?: string;
		/** 数量 */
		qty?: number;
		/** 上架日期 */
		putDate?: string;
		/** 超期日期 */
		expiryDate?: string;
		targetWareHouseId?: string;
		targetWareHouseLocationId?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		sourceWareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		sourceLocation?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto;
		targetWareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		targetLocation?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseLocationReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_kucun_pandianrenwuCountTaskStatus = 5 | 10 | 15 | 20;

	type BurnAbpWMS_kucun_pandianrenwuDifferncesType = 0 | 1 | 2 | 3;

	type BurnAbpWMS_kucunduizhang_duizhangxinxiHistoryCompareDto = {
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
		/** 对账时间 */
		compareTime?: string;
		/** 对账类型 */
		compareType?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 对账信息描述 Describe */
		compareDescribe?: string;
		/** 库房名称 */
		wareHouseName?: string;
		/** 库位编码 */
		wareLocationCode?: string;
		/** 库位名称 */
		wareLocationName?: string;
		/** 物权 */
		realRight?: string;
		/** WMS数量 */
		wmsQty?: number;
		/** ERP数量 */
		compareQty?: number;
		/** 差异数量 */
		differenceQty?: number;
		/** 入库待回传数量 */
		waitForCallBackInstructionQuantity?: number;
		/** 出库待回传数量 */
		waitForCallBackOutInstructionQuantity?: number;
		/** 待回传量 */
		waitForCallBackQuantity?: number;
		/** 备注 */
		remarks?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 版本 */
		editionNo?: string;
	};

	type BurnAbpWMS_kucunduizhang_duizhangxinxiRealTimeCompareDto = {
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
		/** 对账时间 */
		compareTime?: string;
		/** 对账类型 */
		compareType?: string;
		/** 对账描述 */
		compareDescribe?: string;
		/** 库房编码 */
		wareHouseCode?: string;
		/** 库房名称 */
		wareHouseName?: string;
		/** 库位编码 */
		wareLocationCode?: string;
		/** 库位名称 */
		wareLocationName?: string;
		/** 物权 */
		realRight?: string;
		/** WMS数量 */
		wmsQty?: number;
		/** ERP数量 */
		compareQty?: number;
		/** 差异数量 */
		differenceQty?: number;
		/** 入库待回传数量 */
		waitForCallBackInstructionQuantity?: number;
		/** 出库待回传数量 */
		waitForCallBackOutInstructionQuantity?: number;
		/** 待回传量 */
		waitForCallBackQuantity?: number;
		/** 备注 */
		remarks?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 版本 */
		editionNo?: string;
	};

	type BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiCompareTypeDto = {
		itemName?: string;
		itemValue?: number;
	};

	type BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto = {
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
		excludeType?: BurnAbpWMS_kucunduizhangExcludeType;
		/** 排除值 */
		excludeValue?: string;
		/** 是否启用 */
		enableFlag?: boolean;
	};

	type BurnAbpWMS_kucunduizhangExcludeType = 10 | 20 | 30 | 40;

	type BurnAbpWMS_kucunduizhangWaitForCallbackModel = {
		time?: string;
		orderNo?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		waitForCallBackInstructionQuantity?: number;
		waitForCallBackOutInstructionQuantity?: number;
		warehouseCode?: string;
		warehouseName?: string;
	};

	type BurnAbpWMS_kucunITEMkucunStockDto = {
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
		/** 仓库ID */
		wareHouseId?: string;
		/** 物权编码 */
		realRightCode?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 数量 */
		qty?: number;
		/** 预占数量 */
		preRegisteredQuantity?: number;
		/** 可用数量 */
		availableQuantity?: number;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_kucunITEMkucunStockSumDto = {
		/** 编码总数 */
		codeSumQuantity?: number;
		/** 库存总数 */
		stockSumQuantity?: number;
		/** 较昨日新增编码数量 */
		newCodeSumQuantity?: number;
		/** 较昨日新增库存数量 */
		newStockSumQuantity?: number;
	};

	type BurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemBoxLotItemDto = {
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
		/** 交易单号 */
		transactionNumber?: string;
		/** 库房编码 */
		warehouseCode?: string;
		/** 库房名称 */
		warehouseName?: string;
		/** 库区 */
		warehouseZoneCode?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 载具号 信息 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 物料型号 */
		modelNumber?: string;
		/** 生产批次 */
		lotNumber?: string;
		/** 批次号 */
		batchNo?: string;
		/** DC */
		dateCode?: string;
		/** 该批次数量 */
		quantity?: number;
		/** 产地 */
		origin?: string;
	};

	type BurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemDto = {
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
		/** 交易单号 */
		transactionNumber?: string;
		transactionType?: BurnAbpWMS_kucunjiaoyiTransactionTypeEnum;
		transactionCategory?: BurnAbpWMS_kucunjiaoyiTransactionCategoryEnum;
		/** 交易时间 */
		transactionTime?: string;
		/** 指令单号 */
		instructionOrderNo?: string;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 下架任务Id */
		pickTaskId?: string;
		/** 交易库房 */
		warehouseCode?: string;
		/** 交易库房名称 */
		warehouseName?: string;
		/** 交易库位 */
		warehouseLocationCode?: string;
		/** 交易物料编码 */
		materialCode?: string;
		/** 交易物料外码 */
		materialOutCode?: string;
		/** 交易物料描述 */
		materialDescription?: string;
		/** 来源 LPN */
		sourceTraceId?: string;
		/** 捡料LPN */
		newTraceId?: string;
		/** 来源箱号 */
		sourceBoxNumber?: string;
		/** 捡料箱号 */
		newBoxNumber?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 供应商 */
		supplierName?: string;
		/** 业务批次 */
		bussinsLotNumber?: string;
		/** 日期代码 */
		dateCode?: string;
		/** 批次代码 */
		lotNo?: string;
		/** 超期日期 */
		expiryDate?: string;
		/** 交易数量 */
		transactionQuantity?: number;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 是否可以拆箱 */
		takeBox?: boolean;
		/** 开箱时间 */
		openTime?: string;
		/** 生产日期 */
		productionDate?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** 是否维修件/翻新件 */
		isMakeOver?: boolean;
		/** 质量检验单号 */
		qualityInspectionNumber?: string;
		qualityStatus?: BurnAbpWMS_rukuzhiling_zhiliangzhuangtaiQualityStatus;
		/** 开始检验时间 */
		startInspectionTime?: string;
		/** 结束检验时间 */
		endInspectionTime?: string;
		/** 检验人 */
		inspectioner?: string;
		/** 交易人工号 */
		operationCode?: string;
		/** 交易人姓名 */
		operationName?: string;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpWMS_kucunjiaoyijiluInventoryTransactionSerialNumberItemDto = {
		extraProperties?: Record<string, any>;
		/** 交易单号 */
		transactionNumber?: string;
		transactionType?: BurnAbpWMS_kucunjiaoyiTransactionTypeEnum;
		/** 交易时间 */
		transactionTime?: string;
		/** 指令单号 */
		instructionOrderNo?: string;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 下架任务Id */
		pickTaskId?: string;
		/** 交易库房 */
		warehouseCode?: string;
		/** 交易库房名称 */
		warehouseName?: string;
		/** 交易库位 */
		warehouseLocationCode?: string;
		/** 交易物料编码 */
		materialCode?: string;
		/** 交易物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 来源 LPN */
		sourceTraceId?: string;
		/** 捡料LPN */
		newTraceId?: string;
		/** 来源箱号 */
		sourceBoxNumber?: string;
		/** 捡料箱号 */
		newBoxNumber?: string;
		/** 减料SN */
		serialNumber?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 供应商 */
		supplierName?: string;
		/** 日期代码 */
		dateCode?: string;
		/** 批次代码 */
		lotNo?: string;
		/** 超期日期 */
		expiryDate?: string;
		/** 交易数量 */
		transactionQuantity?: number;
	};

	type BurnAbpWMS_kucunjiaoyiTransactionCategoryEnum = 0 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 30 | 31 | 32 | 33 | 34 | 35 | 36;

	type BurnAbpWMS_kucunjiaoyiTransactionTypeEnum = 5 | 10 | 15 | 20;

	type BurnAbpWMS_kucunStockBinSplitCombinType = 5 | 10;

	type BurnAbpWMS_neibufuwu_chukuzhilingCreateAndExecuteOutInstructionOrderInput = {
		createInput?: BurnAbpWMS_neibufuwu_chukuzhilingOutInstructionOrderIntegrationDto;
		pickBoxItem?: BurnAbpWMS_neibufuwu_chukuzhilingPickBoxItemInput;
	};

	type BurnAbpWMS_neibufuwu_chukuzhilingOutInstructionOrderIntegrationDto = {
		/** 单据编码 */
		orderNo?: string;
		/** 单据类型 */
		orderType?: number;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 出库指令来源系统 */
		sourceOrderProvider?: string;
		/** 出库库房编码 */
		wareHouseCode?: string;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		/** 任务令（由明细生成） */
		taskOrder?: string;
		/** 要求交货时间 */
		requiredDeliveryTime?: string;
		/** 预期发运时间 */
		expectedShipmentTime?: string;
		orderStatus?: BurnAbpWMSOrderStatus;
		deliveryStatus?: BurnAbpWMS_chukuzhilingOutInstructionStatus;
		/** 是否复核 */
		isReCheck?: boolean;
		/** 备注 */
		remark?: string;
		items?: BurnAbpWMS_neibufuwu_chukuzhilingOutInstructionOrderItemIntegrationDto[];
	};

	type BurnAbpWMS_neibufuwu_chukuzhilingOutInstructionOrderItemIntegrationDto = {
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
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源单号明细 */
		sourceOrderItemId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 物料版本 */
		version?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 销售合同号 */
		contractNo?: string;
		/** 任务令 */
		taskOrder?: string;
		specifyProperty?: BurnAbpWMS_chuku_chukuzhilingSpecifyPropertyDto;
		preRegisteredModel?: BurnAbpWMS_jichuxinxi_wuliaoxinxiPreRegisteredModel;
		/** 出库数量 */
		quantity?: number;
		/** 下架数量 */
		pickQuantity?: number;
	};

	type BurnAbpWMS_neibufuwu_chukuzhilingPickBoxItemInput = {
		pickItems?: BurnAbpWMS_neibufuwu_chukuzhilingTraceItem[];
	};

	type BurnAbpWMS_neibufuwu_chukuzhilingTraceItem = {
		/** 栈板号 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 序列号 */
		serialNumber?: string;
		/** 数量 */
		quantity?: number;
	};

	type BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderIntegrationDto = {
		/** 入库指令单号 */
		orderNo?: string;
		/** 入库指令类型 */
		sourceOrderType?: number;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号 */
		sourceBillNumber?: string;
		/** 来源单据提供者 */
		sourceOrderProvider?: string;
		/** 预期到货时间 */
		expectedArriveTime?: string;
		/** 实际到货时间 */
		actualArriveTime?: string;
		/** 仓库编码 */
		wareHouseCode?: string;
		/** 仓库名称 */
		wareHouseName?: string;
		sender?: BurnAbpWMS_ruku_rukuzhilingSenderDto;
		/** 车型 */
		deliveryVehicleType?: string;
		/** 车号 */
		deliveryVehicleNo?: string;
		/** 司机 */
		driver?: string;
		/** 预期到货通知状态 */
		asnStatus?: number;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 提交人 */
		submiter?: string;
		/** 提交时间 */
		submitTime?: string;
		/** 审核人 */
		verifyer?: string;
		/** 审核时间 */
		verifyTime?: string;
		/** 备注 */
		remark?: string;
		items?: BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderItemIntegrationDto[];
	};

	type BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderItemIntegrationDto = {
		/** 需求单号 */
		sourceOrderNo?: string;
		/** 需求行号 */
		sourceOrderItemId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 批次号 */
		businessLotNumber?: string;
		/** 送货数量 */
		deliveryQty?: number;
		/** 最小包装数量 */
		minPackQty?: number;
		/** 接收数量 */
		receiveQty?: number;
		/** 上架数量 */
		putQty?: number;
		/** 行状态 */
		asnItemStatus?: number;
		qcType?: BurnAbpWMS_rukuzhilingInInstructionQcType;
		/** 质检单号 */
		qcBillNumber?: string;
		/** 良品数量 */
		qualifiedQuantity?: number;
		/** 不良品数量 */
		noQualifiedQuantity?: number;
		/** 实际物权 */
		actualProperty?: string;
		/** 环保属性(N:非环保,Y:环保) */
		fufilRohsFlag?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 制造商品牌 */
		manufacturerBrand?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 型号 */
		mfgPartNo?: string;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
		/** 箱明细信息 */
		lpnItems?: BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderLpnItemIntegrationDto[];
	};

	type BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderLpnItemIntegrationDto = {
		qcType?: BurnAbpWMS_rukuzhilingInInstructionQcType;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 载具(LPN)号 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 箱数量 */
		quantity?: number;
		/** 业务批次条码 */
		businessLotNumber?: string;
		/** 生产日期Date */
		productionDate?: string;
		/** 到期日期 */
		dueDate?: string;
		/** 生产日期Date Code（YYWW） */
		productionDateCode?: string;
		/** 包含的SN序列号 */
		serialNumbers?: string[];
	};

	type BurnAbpWMS_neibufuwu_zidongchurukuAutoInAndOutInputIntegrationDto = {
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 出库库房编码 */
		wareHouseCode?: string;
		/** 入库指令单据类型 */
		inInstructionOrderType?: number;
		/** 入库指令来源 */
		inInstructionSourceOrderProvider?: string;
		/** 入库指令明细列表 */
		inInstructionOrderItems?: BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderItemIntegrationDto[];
		/** 出库指令类型 */
		outInstructionOrderType?: number;
		/** 出库指令来源 */
		outInstructionSourceOrderProvider?: string;
		consignee?: BurnAbpWMS_chuku_chukuzhilingConsigneeDto;
		/** 出库指令明细列表 */
		outInstructionOrderItems?: BurnAbpWMS_neibufuwu_chukuzhilingOutInstructionOrderItemIntegrationDto[];
		pickBoxItem?: BurnAbpWMS_neibufuwu_chukuzhilingPickBoxItemInput;
	};

	type BurnAbpWMS_neibufuwuStockTransactionBoxInfo = {
		/** LPN */
		parentTraceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 任务令 */
		taskOrder?: string;
		/** 合同号 */
		contractNo?: string;
		/** 数量 */
		qty?: number;
	};

	type BurnAbpWMS_neibufuwuWmsSerialNumberInfoDto = {
		extraProperties?: Record<string, any>;
		/** 交易库房 */
		warehouseCode?: string;
		/** 交易库房名称 */
		warehouseName?: string;
		/** 交易库位 */
		warehouseLocationCode?: string;
		/** 交易物料编码 */
		materialCode?: string;
		/** 交易物料外码 */
		materialOutCode?: string;
		/** 来源 LPN */
		sourceTraceId?: string;
		/** 捡料LPN */
		newTraceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** sn序列号 */
		serialNumber?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 业务批次 */
		businessLotNumber?: string;
		/** 日期代码 */
		dateCode?: string;
		/** 批次代码 */
		lotNo?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 超期日期 */
		expiryDate?: string;
		/** 是否可以拆箱 */
		takeBox?: boolean;
		/** 开箱时间 */
		openTime?: string;
		/** 上架日期 */
		putDate?: string;
		/** 生产日期 */
		productionDate?: string;
		/** 交易数量 */
		transactionQuantity?: number;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 超期次数 */
		expiryCount?: number;
		/** 超期预警日期 */
		overdueWarningDate?: string;
		/** 是否环保 */
		isRoHs?: boolean;
		/** 质量检验单号 */
		qualityInspectionNumber?: string;
		qualityStatus?: BurnAbpWMS_rukuzhiling_zhiliangzhuangtaiQualityStatus;
		/** 开始检验时间 */
		startInspectionTime?: string;
		/** 结束检验时间 */
		endInspectionTime?: string;
		/** 检验人 */
		inspectioner?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		lotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 交易人工号 */
		operationCode?: string;
		/** 交易人姓名 */
		operationName?: string;
	};

	type BurnAbpWMS_pandian_pandiancanshuCountParamDto = {
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
		/** 盘点参数名称 */
		name?: string;
		/** 盘点类型 */
		countType?: number;
		/** 物料ABC类型 */
		itemType?: string;
		/** 全部/整箱/开箱 */
		boxStatus?: number;
		/** 盘点比率 */
		countRate?: number;
		/** 盘点周期(天) eg:90 / 60 /30 天生成一次 */
		countCycleDays?: number;
		/** 库龄期限 */
		goodsAgeDueTime?: number;
		highValueFlag?: BurnAbpWMS_pandianHighValueFlag;
	};

	type BurnAbpWMS_pandian_pandiancanshuCreateOrUpdateCountParamDto = {
		/** 盘点参数名称 */
		name?: string;
		countType?: BurnAbpWMS_pandianCountType;
		/** 物料ABC类型 */
		itemType?: string;
		boxStatus?: BurnAbpWMS_pandianBoxStatus;
		/** 盘点比率 */
		countRate?: number;
		/** 盘点周期(天) eg:90 / 60 /30 天生成一次 */
		countCycleDays?: number;
		/** 库龄期限 */
		goodsAgeDueTime?: number;
		highValueFlag?: BurnAbpWMS_pandianHighValueFlag;
	};

	type BurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		reason?: string;
		remark?: string;
		creator?: string;
	};

	type BurnAbpWMS_pandian_pandianchayiyuanyinCreateCountDiffReasonDto = {
		reason?: string;
		remark?: string;
	};

	type BurnAbpWMS_pandian_pandianchayiyuanyinUpdateCountDiffReasonDto = {
		reason?: string;
		remark?: string;
	};

	type BurnAbpWMS_pandian_pandianguizeCountRuleDto = {
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
		/** 规则名称 */
		name?: string;
		/** 规则描述 */
		description?: string;
		/** 库房 */
		warehouseId?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 盘点参数 */
		countParamId?: string;
		/** 捡料完成下发任务 */
		pickedSendOutTask?: boolean;
		/** 任务开始时间 */
		taskStartTime?: string;
		/** 包含物料 */
		materialCode?: string;
		/** 包含库区 */
		zoneCode?: string;
		/** 包含库位 */
		locationCode?: string;
		/** 是否启用 */
		isActive?: boolean;
		countParam?: BurnAbpWMS_pandian_pandiancanshuCountParamDto;
	};

	type BurnAbpWMS_pandian_pandianguizeCreateOrUpdateCountRuleDto = {
		/** 规则名称 */
		name?: string;
		/** 规则描述 */
		description?: string;
		/** 库房 */
		warehouseId?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 盘点参数 */
		countParamId?: string;
		countType?: BurnAbpWMS_pandianCountType;
		/** 捡料完成下发任务 */
		pickedSendOutTask?: boolean;
		/** 任务开始时间 */
		taskStartTime?: string;
		/** 包含物料 */
		materialCode?: string;
		/** 包含库区 */
		zoneCode?: string;
		/** 包含库位 */
		locationCode?: string;
		/** 是否启用 */
		isActive?: boolean;
	};

	type BurnAbpWMS_pandian_pandianqingdanCountOrderDto = {
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
		/** 盘点清单号 */
		number?: string;
		/** 盘点类型 */
		countType?: number;
		/** 盘点规则名称 */
		countRuleName?: string;
		/** 库房 */
		wareHouseId?: string;
		checkStatus?: BurnAbpWMS_pandianCountOrderStatus;
		/** 完成时间 */
		closeTime?: string;
		/** 备注 */
		remark?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
	};

	type BurnAbpWMS_pandian_pandianqingdanCreateCountOrderDto = {
		wareHouseId?: string;
		remark?: string;
	};

	type BurnAbpWMS_pandian_pandianqingdanUpdateCountOrderDto = {
		warehouseId?: string;
		remark?: string;
	};

	type BurnAbpWMS_pandian_pandianrenwuCountOrderBoxInfoDto = {
		boxNumber?: string;
		materialId?: string;
		materialCode?: string;
		materialOutCode?: string;
		countTaskDetailStatus?: number;
		/** 批次属性 */
		lotAttr?: Record<string, any>;
	};

	type BurnAbpWMS_pandian_pandianrenwuCountOrderCountDto = {
		/** 任务Id */
		id?: string;
		/** LPN 信息 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 序列号信息 */
		serialNumber?: string;
		/** 盘点数量 */
		countQty?: number;
	};

	type BurnAbpWMS_pandian_pandianrenwuCountOrderLpnInfoDto = {
		/** 仓库编码 */
		wareHouseId?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 库区 */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		/** 库位编码 */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 跟踪号/容器号 */
		traceId?: string;
		/** 业务批次编码 */
		businessLotNumber?: string;
		/** 物料ID */
		materialId?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 开箱状态 */
		isOpen?: boolean;
		/** 是否环保 */
		isRoHS?: boolean;
		/** 批次属性 */
		lotAttr?: Record<string, any>;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		warehouseZone?: BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto;
		countTaskStatus?: BurnAbpWMS_kucun_pandianrenwuCountTaskStatus;
	};

	type BurnAbpWMS_pandian_pandianrenwuCountOrderTaskItemDto = {
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
		/** 盘点清单号 */
		checkOrderNo?: string;
		/** 盘点任务号 */
		countTaskNo?: string;
		/** 仓库 */
		wareHouseId?: string;
		/** 仓库编码 */
		wareHouseCode?: string;
		/** 仓库名称 */
		wareHouseName?: string;
		/** 库区主键标识 */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		/** 库区名称 */
		warehouseZoneName?: string;
		/** 库位信息 */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 库位名称 */
		wareHouseLocationName?: string;
		/** 物料ABC */
		itemType?: string;
		/** LPN 载具号 */
		traceId?: string;
		/** 是否需要盘点SN信息 */
		needSerialNumber?: boolean;
		/** 开箱标识 */
		isOpen?: boolean;
		countTaskStatus?: BurnAbpWMS_kucun_pandianrenwuCountTaskStatus;
		/** 盘点状态描述 */
		taskStatus?: string;
		/** 初盘库存 */
		systemQty?: number;
		/** 是否环保 */
		systemIsRoHS?: boolean;
		/** ac 属性 */
		systemAcProperty?: string;
		/** 物权 */
		systemRealRightCode?: string;
		systemLotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 初盘数量 */
		countQty?: number;
		/** 初盘差异 */
		diffQty?: number;
		/** 初盘时间 */
		countTime?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** ac 属性 */
		acProperty?: string;
		/** 物权 */
		realRightCode?: string;
		lotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 复盘库存 */
		replaySystemQty?: number;
		/** 复盘数量 */
		replayCountQty?: number;
		/** 复盘差异 */
		replayDiffQty?: number;
		/** 复盘是否环保 */
		replayIsRoHS?: boolean;
		/** 复盘ac 属性 */
		replayAcProperty?: string;
		/** 复盘物权 */
		replayRealRightCode?: string;
		replayLotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 复盘时间 */
		replayCountTime?: string;
		/** 复盘人 */
		replayOperator?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		wareHouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		/** 物料ID */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料名称 */
		materialName?: string;
	};

	type BurnAbpWMS_pandian_pandianrenwumingxiCountOrderTaskItemDetailDto = {
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
		/** 盘点清单号 */
		checkOrderNo?: string;
		/** 盘点任务号 */
		countTaskNo?: string;
		/** 仓库（已过时，请使用Warehouse属性） */
		wareHouseId?: string;
		/** 库区主键标识 */
		warehouseZoneId?: string;
		/** 库区编码 */
		warehouseZoneCode?: string;
		/** 库位信息 */
		wareHouseLocationId?: string;
		/** 库位编码 */
		wareHouseLocationCode?: string;
		/** 物料ID */
		materialId?: string;
		/** 物料ABC */
		itemType?: string;
		/** LPN 载具号 */
		traceId?: string;
		/** 批次/箱号 */
		boxNumber?: string;
		/** SN */
		serialNumber?: string;
		countTaskDetailStatus?: BurnAbpWMS_kucun_pandianrenwuCountTaskStatus;
		/** 初盘库存 */
		systemQty?: number;
		/** 是否环保 */
		systemIsRoHS?: boolean;
		/** ac 属性 */
		systemAcProperty?: string;
		/** 物权 */
		systemRealRightCode?: string;
		systemLotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 初盘数量 */
		countQty?: number;
		/** 初盘差异 */
		diffQty?: number;
		/** 初盘时间 */
		countTime?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** ac 属性 */
		acProperty?: string;
		/** 物权 */
		realRightCode?: string;
		lotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 复盘库存 */
		replaySystemQty?: number;
		/** 复盘数量 */
		replayCountQty?: number;
		/** 复盘差异 */
		replayDiffQty?: number;
		/** 复盘是否环保 */
		replayIsRoHS?: boolean;
		/** 复盘ac 属性 */
		replayAcProperty?: string;
		/** 复盘物权 */
		replayRealRightCode?: string;
		replayLotProperty?: BurnAbpWMS_kucun_kucunliebiaoStockBinLotPropertyModelDto;
		/** 复盘时间 */
		replayCountTime?: string;
		/** 复盘人 */
		replayOperator?: string;
		differncesType?: BurnAbpWMS_kucun_pandianrenwuDifferncesType;
		differenceResolveType?: BurnAbpWMS_pandianDifferenceResolveType;
		/** 差异原因 */
		differencesInfo?: string;
		/** 差异维护用户ID */
		differencesUserId?: string;
		/** 差异维护用户名称 */
		differencesUserName?: string;
		/** 差异维护时间 */
		differencesTime?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		material?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_pandian_pandianrenwumingxiDifferenceResolveDto = {
		id?: string;
		differencesInfo?: string;
		differenceResolveType?: BurnAbpWMS_pandianDifferenceResolveType;
	};

	type BurnAbpWMS_pandian_pandianrenwuSubmitCountTaskItemDto = {
		taskNo?: string;
		materialId?: string;
		/** 是否环保 */
		isRoHS?: boolean;
		/** ac 属性 */
		acProperty?: string;
		/** 物权 */
		realRightCode?: string;
		lotAttrs?: Record<string, any>;
		details?: BurnAbpWMS_pandian_pandianrenwuCountOrderCountDto[];
	};

	type BurnAbpWMS_pandian_pandianrenwuSubmitNewCountTaskItemDto = {
		/** 盘点单Id */
		countOrderId?: string;
		/** 仓库库房Id */
		warehouseId?: string;
		/** 库位编码 */
		warehouseLocationCode?: string;
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		traceId?: string;
		isOpen?: boolean;
		/** 是否环保 */
		isRoHS?: boolean;
		/** ac 属性 */
		acProperty?: string;
		/** 物权 */
		realRightCode?: string;
		lotAttrs?: Record<string, any>;
		details?: BurnAbpWMS_pandian_pandianrenwuCountOrderCountDto[];
	};

	type BurnAbpWMS_pandianBoxStatus = 5 | 10 | 15;

	type BurnAbpWMS_pandianCountOrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

	type BurnAbpWMS_pandianCountType = 5 | 10 | 15 | 20 | 25;

	type BurnAbpWMS_pandianDifferenceResolveType = 0 | 10;

	type BurnAbpWMS_pandianHighValueFlag = 0 | 1 | 2;

	type BurnAbpWMS_ruku_liushuirukujiluProductionInInstructionItemDto = {
		/** 车间 */
		workshopCode?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 库房编码（已过时，请使用 Warehouse.Code） */
		warehouseCode?: string;
		/** 库房Id（已过时，请使用 Warehouse.Id） */
		warehouseId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 数量 */
		quantity?: number;
		/** 载具号 */
		traceId?: string;
		/** 是否回写 */
		isCallBack?: boolean;
		/** 回写入库指令号 */
		callBackInInstructionOrderNo?: string;
		/** 回写时间 */
		callBackTime?: string;
	};

	type BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveResultDto = {
		extraProperties?: Record<string, any>;
		/** 型号 */
		partNo?: string;
		/** 生成批次 */
		lotNumber?: string;
		/** 年周 */
		dateCode?: string;
		/** 数量 */
		qty?: number;
		/** 批次 */
		batchNo?: string;
		/** 产地 */
		origin?: string;
	};

	type BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 名称 */
		name?: string;
		/** 属性分割字符,允许多个 */
		propertiesSplitChars?: string;
		propertyResolveMode?: BurnAbpWMS_rukupicitiaomajiexiBoxLotPropertyResolveMode;
		/** 是否校验长度 */
		validLength?: boolean;
		/** 长度 */
		length?: number;
		/** 是否校验属性长度 */
		validPropertyLength?: boolean;
		/** 属性长度 */
		propertyLength?: number;
		/** 键值分割字符, 多个用;号分割 */
		keyValueSplitChars?: string;
		/** 备注 */
		remark?: string;
		/** 是否启用 */
		isEnabled?: boolean;
		items?: BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleItemDto[];
	};

	type BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 属性名 */
		propertyName?: string;
		/** 序号 */
		index?: number;
		/** 键名 */
		keyName?: string;
		valueResolveMode?: BurnAbpWMS_rukupicitiaomajiexiBoxLotPropertyValueResolveMode;
		/** 正则表达式 */
		regexPattern?: string;
		/** 是否必填,如果设置为必填,则必须解析出键值 */
		isRequired?: boolean;
	};

	type BurnAbpWMS_ruku_rukupicitiaomajiexiCreateOrUpdateBoxLotResolveRuleInput = {
		/** 名称 */
		name: string;
		/** 属性分割字符,允许多个 */
		propertiesSplitChars?: string;
		propertyResolveMode?: BurnAbpWMS_rukupicitiaomajiexiBoxLotPropertyResolveMode;
		/** 是否校验长度 */
		validLength?: boolean;
		/** 长度 */
		length?: number;
		/** 是否校验属性长度 */
		validPropertyLength?: boolean;
		/** 属性长度 */
		propertyLength?: number;
		/** 键值分割字符, 多个用;号分割 */
		keyValueSplitChars?: string;
		/** 备注 */
		remark?: string;
		/** 是否启用 */
		isEnabled?: boolean;
		items?: BurnAbpWMS_ruku_rukupicitiaomajiexiCreateOrUpdateBoxLotResolveRuleItemInput[];
	};

	type BurnAbpWMS_ruku_rukupicitiaomajiexiCreateOrUpdateBoxLotResolveRuleItemInput = {
		/** 属性名 */
		propertyName?: string;
		/** 序号 */
		index?: number;
		/** 键名 */
		keyName?: string;
		valueResolveMode?: BurnAbpWMS_rukupicitiaomajiexiBoxLotPropertyValueResolveMode;
		/** 正则表达式 */
		regexPattern?: string;
		/** 是否必填,如果设置为必填,则必须解析出键值 */
		isRequired?: boolean;
	};

	type BurnAbpWMS_ruku_rukuzhilingBoxesAndOrderInfoDto = {
		/** 入库指令号 */
		orderNo?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 物料Id */
		materialItemId?: string;
		/** 物料编码 */
		materialItemCode?: string;
		/** 物料外码 */
		materialItemOutCode?: string;
		/** 物料描述 */
		materialItemDescript?: string;
		/** 送货数量 */
		deliveryQty?: number;
		/** 接收数量 */
		receiveQty?: number;
		/** 仓库 */
		wareHouseId?: string;
		/** 仓库编码 */
		wareHouseCode?: string;
		/** 仓库名 */
		wareHouseName?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** ac属性 */
		acProperty?: string;
		/** 到期时间 */
		dueDate?: string;
		/** 是否环保 */
		isRosh?: boolean;
		lotAttr?: Record<string, any>;
		boxes?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_ruku_rukuzhilingCreateOrUpdateInInstructionOrderDto = {
		/** 预期到货通知单号 */
		orderNo?: string;
		sourceOrderType?: BurnAbpWMS_rukuzhilingInInstructionOrderType;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号1 */
		sourceOrderNo1?: string;
		/** 来源单据号2 */
		sourceOrderNo2?: string;
		/** 预期到货时间 */
		expectedArriveTime?: string;
		/** 实际到货时间 */
		actualArriveTime?: string;
		/** 仓库 */
		wareHouseId?: string;
		sender?: BurnAbpWMS_ruku_rukuzhilingSenderDto;
		/** 车型 */
		deliveryVehicleType?: string;
		/** 车号 */
		deliveryVehicleNo?: string;
		/** 司机 */
		driver?: string;
		/** 预期到货通知状态 */
		asnStatus?: number;
		/** 备注 */
		remark?: string;
		callBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 箱数 */
		boxQuantity?: number;
		items?: BurnAbpWMS_ruku_rukuzhilingInInstructionOrderItemDto[];
	};

	type BurnAbpWMS_ruku_rukuzhilingFullInInstructionOrderItemDto = {
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
		inInstructionOrderId?: string;
		/** 需求单号 */
		sourceOrderNo?: string;
		/** 需求行号 */
		sourceOrderItemId?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 批次号 */
		businessLotNumber?: string;
		/** 指定位置 */
		specifyLocation?: string;
		/** 送货数量 */
		deliveryQty?: number;
		/** 最小包装数量 */
		minPackQty?: number;
		/** 接收数量 */
		receiveQty?: number;
		/** 上架数量 */
		putQty?: number;
		/** 行状态 */
		asnItemStatus?: number;
		qcType?: BurnAbpWMS_rukuzhilingInInstructionQcType;
		/** 质检单号 */
		qcBillNumber?: string;
		/** 良品数量 */
		qualifiedQuantity?: number;
		/** 不良品数量 */
		noQualifiedQuantity?: number;
		/** 实际物权 */
		actualProperty?: string;
		/** 环保属性(N:非环保,Y:环保) */
		fufilRohsFlag?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		/** 制造商品牌 */
		manufacturerBrand?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 型号 */
		mfgPartNo?: string;
		/** Erp采购订单号 */
		purchaseOrderCode?: string;
		/** 箱数 */
		boxQuantity?: number;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		materialId?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescript?: string;
		inInstructionOrder?: BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto;
	};

	type BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto = {
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
		/** 预期到货通知单号 */
		orderNo?: string;
		sourceOrderType?: BurnAbpWMS_rukuzhilingInInstructionOrderType;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据号1 */
		sourceOrderNo1?: string;
		/** 来源单据号2 */
		sourceOrderNo2?: string;
		/** 来源单据提供者 */
		sourceOrderProvider?: string;
		/** 预期到货时间 */
		expectedArriveTime?: string;
		/** 实际到货时间 */
		actualArriveTime?: string;
		warehouse?: BurnAbpWMS_jichuxinxi_kufangxinxiWarehouseReferenceDto;
		/** 仓库（已过时，请使用 Warehouse.Id） */
		wareHouseId?: string;
		/** 仓库名称（已过时，请使用 Warehouse.Name） */
		wareHouseName?: string;
		sender?: BurnAbpWMS_ruku_rukuzhilingSenderDto;
		/** 车型 */
		deliveryVehicleType?: string;
		/** 车号 */
		deliveryVehicleNo?: string;
		/** 司机 */
		driver?: string;
		/** 预期到货通知状态 */
		asnStatus?: number;
		orderStatus?: BurnAbpWMSOrderStatus;
		/** 提交人 */
		submiter?: string;
		/** 提交时间 */
		submitTime?: string;
		/** 审核人 */
		verifyer?: string;
		/** 审核时间 */
		verifyTime?: string;
		/** 备注 */
		remark?: string;
		callBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 回传错误信息 */
		callBackError?: string;
		/** 开始回传时间 */
		startCallBackTime?: string;
		/** 完成回传时间 */
		completedCallBackTime?: string;
		/** 箱数 */
		boxQuantity?: number;
		items?: BurnAbpWMS_ruku_rukuzhilingInInstructionOrderItemDto[];
	};

	type BurnAbpWMS_ruku_rukuzhilingInInstructionOrderItemDto = {
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
		inInstructionOrderId?: string;
		/** 需求单号 */
		sourceOrderNo?: string;
		/** 需求行号 */
		sourceOrderItemId?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 批次号 */
		businessLotNumber?: string;
		/** 指定位置 */
		specifyLocation?: string;
		/** 送货数量 */
		deliveryQty?: number;
		/** 最小包装数量 */
		minPackQty?: number;
		/** 接收数量 */
		receiveQty?: number;
		/** 上架数量 */
		putQty?: number;
		/** 行状态 */
		asnItemStatus?: number;
		qcType?: BurnAbpWMS_rukuzhilingInInstructionQcType;
		/** 质检单号 */
		qcBillNumber?: string;
		/** 良品数量 */
		qualifiedQuantity?: number;
		/** 不良品数量 */
		noQualifiedQuantity?: number;
		/** 实际物权 */
		actualProperty?: string;
		/** 环保属性(N:非环保,Y:环保) */
		fufilRohsFlag?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户名称 */
		customerName?: string;
		/** 制造商品牌 */
		manufacturerBrand?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 型号 */
		mfgPartNo?: string;
		/** Erp采购订单号 */
		purchaseOrderCode?: string;
		/** 箱数 */
		boxQuantity?: number;
		itemCallBackStatus?: BurnAbpWMS_rukuzhilingCallBackStatus;
		/** 明细回传时间 */
		itemCallBackTime?: string;
		/** 明细回传消息 */
		itemCallBackMessage?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		materialId?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescript?: string;
	};

	type BurnAbpWMS_ruku_rukuzhilingInInstructionOrderReceiveUnfinishedCountDto = {
		orderType?: BurnAbpWMS_rukuzhilingInInstructionOrderType;
		/** 数量 */
		count?: number;
	};

	type BurnAbpWMS_ruku_rukuzhilingSenderDto = {
		id?: string;
		name?: string;
		contact?: string;
		tel?: string;
		city?: string;
		province?: string;
		country?: string;
		address?: string;
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangmingxiCreateUpdateInInstructionOrderLpnItemAttachmentDto = {
		id?: string;
		attachmentType?: BurnAbpWMS_rukuzhiling_rukuInOutInstructionOrderLpnItemAttachmentType;
		/** 文件名 */
		fileName?: string;
		contentType?: string;
		/** 大小 */
		size?: number;
		/** Blob */
		blobName?: string;
		/** 缩略图的Blob */
		thumbnailBlobName?: string;
		/** 缩略图大小 */
		thumbnailSize?: number;
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangmingxiCreateUpdateInInstructionOrderLpnItemAttachmentInput = {
		attachments?: BurnAbpWMS_ruku_rukuzhilingxiangmingxiCreateUpdateInInstructionOrderLpnItemAttachmentDto[];
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangmingxiGenerateLotCodeDto = {
		asnOrderNo?: string;
		asnOrderItemId?: string;
		/** 批次号 */
		lotNumber?: string;
		/** 总数量数量 */
		count?: number;
		/** 最小包装数量 */
		minPackQty?: number;
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemAttachmentDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		attachmentType?: BurnAbpWMS_rukuzhiling_rukuInOutInstructionOrderLpnItemAttachmentType;
		/** 文件名 */
		fileName?: string;
		contentType?: string;
		/** 大小 */
		size?: number;
		/** Blob */
		blobName?: string;
		/** 缩略图的Blob */
		thumbnailBlobName?: string;
		/** 缩略图大小 */
		thumbnailSize?: number;
		creator?: string;
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto = {
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
		/** 入库指令单号 */
		inInstructionOrderNo?: string;
		/** 入库指令明细ID */
		inInstructionOrderItemId?: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 来源明细单号 */
		sourceOrderItemId?: string;
		qcType?: BurnAbpWMS_rukuzhilingInInstructionQcType;
		/** 实际物权 */
		actualProperty?: string;
		/** 环保属性(N:非环保,Y:环保) */
		fufilRohsFlag?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 供应商名称 */
		supplierName?: string;
		/** 制造商品牌 */
		manufacturerBrand?: string;
		/** 制造商名称 */
		manufacturerName?: string;
		/** 型号 */
		mfgPartNo?: string;
		/** 每箱数量 */
		quantity?: number;
		/** 收货数量 */
		receiveQuantity?: number;
		/** 物料编码id */
		materialItemId?: string;
		/** 物料版本 */
		version?: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 业务批次条码 */
		businessLotNumber?: string;
		/** 载具(LPN)号 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 打印次数 */
		printCount?: number;
		/** 最小包装数 */
		minPacking?: number;
		/** 生产日期Date */
		productionDate?: string;
		/** 到期日期 */
		dueDate?: string;
		/** 生产日期Date Code（YYWW） */
		productionDateCode?: string;
		/** 最小包装箱号 */
		psn?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
		attachments?: BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemAttachmentDto[];
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderSnItemDto = {
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
		/** 入库指令单号 */
		inInstructionOrderNo?: string;
		/** 入库指令明细ID */
		inInstructionOrderItemId?: string;
		materialItemId?: string;
		/** 载具(LPN)号 */
		traceId?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 打印次数 */
		printNum?: number;
		/** 生产日期Date */
		productionDate?: string;
		/** 到期日期 */
		dueDate?: string;
		/** 序列号SN信息 */
		serialNumber?: string;
		materialItem?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialReferenceDto;
	};

	type BurnAbpWMS_ruku_rukuzhilingxiangpicimingxiInInstructionOrderLpnSubItemDto = {
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 入库指令编号 */
		inInstructionOrderNo?: string;
		/** 箱号 */
		boxNumber?: string;
		/** 物料内码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 型号 */
		mfgPartNo?: string;
		/** 生产日期Date Code（YYWW） */
		productionDateCode?: string;
		/** 批次条码 */
		businessLotNumber?: string;
		/** 数量 */
		quantity?: number;
		/** 批次 */
		batchNo?: string;
		/** 产地 */
		origin?: string;
	};

	type BurnAbpWMS_ruku_shouhuocaijiCancelReceiptInput = {
		inInstructionOrderId: string;
		boxNumber: string;
	};

	type BurnAbpWMS_ruku_shouhuocaijiMaterialBoxReceiptDto = {
		traceItem?: BurnAbpWMS_ruku_shouhuocaijiMaterialReceiptTraceItemDto;
		boxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_ruku_shouhuocaijiMaterialCodeReceiptDto = {
		/** 入库指令号 */
		inInstructionOrderNo: string;
		/** 物料编码 */
		materialItemId: string;
		/** 物料外码 */
		materialCode: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 合同号 */
		contractNo?: string;
		/** 工单号 ---生产入库时使用 */
		taskOrder?: string;
		/** 载具号-LPN */
		traceId?: string;
		/** 业务批次号 */
		businessLotNumber?: string;
		/** 总数量 */
		totalQuantity?: number;
		/** 是否环保属性 */
		isRoHs?: boolean;
		/** AC属性 */
		acProperty?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 库位信息 */
		locationCode?: string;
		/** 批次属性 */
		lotAttrs?: Record<string, any>;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpWMS_ruku_shouhuocaijiMaterialLotReceiptDto = {
		/** 入库指令号 */
		inInstructionOrderNo: string;
		/** 物料编码 */
		materialItemId: string;
		/** 物料外码 */
		materialCode: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 合同号 */
		contractNo?: string;
		/** 工单号 ---生产入库时使用 */
		taskOrder?: string;
		/** 载具号-LPN */
		traceId?: string;
		/** 总数量 */
		totalQuantity?: number;
		/** 是否环保属性 */
		isRoHs?: boolean;
		/** AC属性 */
		acProperty?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 库位信息 */
		locationCode?: string;
		/** 批次属性 */
		lotAttrs?: Record<string, any>;
		extraProperties?: Record<string, any>;
		/** 业务批次号 */
		businessLotNumber: string;
	};

	type BurnAbpWMS_ruku_shouhuocaijiMaterialReceiptTraceItemDto = {
		/** 入库指令号 */
		inInstructionOrderNo: string;
		/** 物料编码 */
		materialItemId: string;
		/** 物料外码 */
		materialCode: string;
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 合同号 */
		contractNo?: string;
		/** 工单号 ---生产入库时使用 */
		taskOrder?: string;
		/** 载具号-LPN */
		traceId?: string;
		/** 业务批次号 */
		businessLotNumber?: string;
		/** 总数量 */
		totalQuantity?: number;
		/** 是否环保属性 */
		isRoHs?: boolean;
		/** AC属性 */
		acProperty?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 库位信息 */
		locationCode?: string;
		/** 批次属性 */
		lotAttrs?: Record<string, any>;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpWMS_ruku_shouhuocaijiReceiptBoxLotBarcodeResolvedDto = {
		extraProperties?: Record<string, any>;
		/** 型号 */
		partNo?: string;
		/** 生产批次 */
		lotNumber?: string;
		/** 年周 */
		dateCode?: string;
		/** 数量 */
		qty?: number;
		/** 批次 */
		batchNo?: string;
		/** 产地 */
		origin?: string;
		/** 物料Id */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaMaterialBoxHybridDto = {
		traceItem: BurnAbpWMS_rukuzhilingMaterialBoxHybridItemInfo;
		boxList: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaMaterialHybridDto = {
		/** LPN 编码 */
		traceId?: string;
		/** 业务批次号 */
		businessLotNumber?: string;
		/** 物料编码 */
		materialItemCode: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 是否环保 */
		isRoHs?: boolean;
		/** 供应商编码 */
		supplierCode?: string;
		/** 杂入数量 */
		quantity: number;
		/** 是否回传 */
		isCallBack?: boolean;
		/** 库位编码 */
		locationCode: string;
		/** 备注信息 */
		remark?: string;
		/** 批次属性 */
		lotAttrs?: Record<string, any>;
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaMaterialLotHybridDto = {
		/** LPN 编码 */
		traceId?: string;
		/** 物料编码 */
		materialItemCode: string;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 物权编码 */
		realRightCode?: string;
		/** 是否环保 */
		isRoHs?: boolean;
		/** 供应商编码 */
		supplierCode?: string;
		/** 杂入数量 */
		quantity: number;
		/** 是否回传 */
		isCallBack?: boolean;
		/** 库位编码 */
		locationCode: string;
		/** 备注信息 */
		remark?: string;
		/** 批次属性 */
		lotAttrs?: Record<string, any>;
		/** 业务批次号 */
		businessLotNumber: string;
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaMaterialPutToStorageDto = {
		traceId?: string;
		/** 货位号 */
		locationCode?: string;
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaMaterialSnHybridDto = {
		traceItem?: BurnAbpWMS_rukuzhilingMaterialBoxHybridItemInfo;
		boxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaWorkshopBoxInputDto = {
		traceItem?: BurnAbpWMS_ruku_wuliaoshangjiaWorkshopBoxInputItemDto;
		boxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaWorkshopBoxInputItemDto = {
		extraProperties?: Record<string, any>;
		/** 载具号信息 */
		traceId?: string;
		poNumber?: string;
		/** 合同单号 */
		contractNo?: string;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 车间 */
		workshopCode?: string;
		/** 库位信息 */
		locationCode?: string;
		/** 物料编码 */
		materialItemCode?: string;
		/** 业务批次号 */
		businessLotNumber?: string;
		/** 总数量 */
		totalQuantity?: number;
		lotAttrs?: Record<string, any>;
	};

	type BurnAbpWMS_ruku_wuliaoshangjiaWorkshopSnInputDto = {
		extraProperties?: Record<string, any>;
		/** 序列号 */
		serialNumber?: string;
		/** PO号 */
		poNumber?: string;
		/** 合同单号 */
		contractNo?: string;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 车间 */
		workshopCode?: string;
		/** 库位号 */
		locationCode?: string;
		/** 物料编码 */
		materialItemCode?: string;
		lotAttrs?: Record<string, any>;
		boxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_rukupicitiaomajiexiBoxLotPropertyResolveMode = 0 | 1;

	type BurnAbpWMS_rukupicitiaomajiexiBoxLotPropertyValueResolveMode = 0 | 1;

	type BurnAbpWMS_rukuzhiling_rukuInOutInstructionOrderLpnItemAttachmentType = 1 | 2;

	type BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxAttachmentViewModel = {
		attachmentType?: BurnAbpWMS_rukuzhiling_rukuInOutInstructionOrderLpnItemAttachmentType;
		fileName?: string;
		contentType?: string;
		size?: number;
		blobName?: string;
		thumbnailBlobName?: string;
		thumbnailSize?: number;
	};

	type BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoLotModel = {
		modelNumber?: string;
		lotNumber?: string;
		batchNo?: string;
		dateCode?: string;
		qty?: number;
		origin?: string;
	};

	type BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel = {
		extraProperties?: Record<string, any>;
		contractNo?: string;
		taskOrder?: string;
		businessLotNumber?: string;
		boxNumber: string;
		originalBoxNumber?: string;
		targetBoxNumber?: string;
		serialNumber?: string;
		quantity?: number;
		boxLotList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoLotModel[];
		attachments?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxAttachmentViewModel[];
	};

	type BurnAbpWMS_rukuzhiling_zhiliangzhuangtaiQualityStatus = 5 | 10 | 20;

	type BurnAbpWMS_rukuzhilingCallBackStatus = 5 | 6 | 10 | 15 | 20 | 25;

	type BurnAbpWMS_rukuzhilingInInstructionOrderType = 0 | 5 | 6 | 10 | 15 | 20 | 21 | 22 | 23 | 25;

	type BurnAbpWMS_rukuzhilingInInstructionQcType = 0 | 1 | 2;

	type BurnAbpWMS_rukuzhilingMaterialBoxHybridItemInfo = {
		traceId?: string;
		businessLotNumber?: string;
		materialItemCode?: string;
		acProperty?: string;
		realRightCode?: string;
		isRoHs?: boolean;
		supplierCode?: string;
		totalQuantity?: number;
		isCallBack?: boolean;
		locationCode?: string;
		remark?: string;
		lotAttrs?: Record<string, any>;
	};

	type BurnAbpWMS_tiaomashujuBarCodeData = {
		/** 条码 */
		barCode?: string;
		/** 入库指令 */
		inInstructionOrderNo?: string;
		/** 入库指令明细ID */
		inInstructionOrderItemId?: string;
		/** 来源单据号 */
		sourceOrderNo?: string;
		/** 来源单据明细Id */
		sourceOrderItemId?: string;
		/** 物料主键Id */
		materialId?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescript?: string;
		/** 合同号 */
		contractNo?: string;
		/** 任务令号 */
		taskOrder?: string;
		/** 数量 */
		qty?: number;
		/** 是否环保 */
		isRoHs?: boolean;
		/** AC属性     属性值A、B、C */
		acProperty?: string;
		/** 物权信息 */
		realRightCode?: string;
		lotAttr?: Record<string, any>;
		/** 条码下级明细信息 */
		boxInfos?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
	};

	type BurnAbpWMS_tiaomashujuResolverDataDto = {
		/** 栈板号信息 */
		traceId?: string;
		/** 收货/出货单号 */
		orderNo?: string;
		/** 采集条码 */
		barCode?: string;
		/** 物料信息 */
		materialId?: string;
		/** 物权信息 */
		realRightCode?: string;
		/** ac属性 */
		acProperty?: string;
		/** 当前已采集列表 */
		traceBoxList?: BurnAbpWMS_rukuzhiling_shouhuocaijiTraceBoxInfoModel[];
		/** 扩展属性
BarCodeType(TraceId---BoxNumber--BusinessLotNumber--SerialNumber)
OrderNo 入库指令单号 */
		properties?: Record<string, any>;
	};

	type BurnAbpWMS_tiaomashujuResolverMultipleSerialNumberModelDto = {
		materialId?: string;
		/** 栈板号信息 */
		traceId?: string;
		/** 收货/出货单号 */
		orderNo?: string;
		/** 采集条码 */
		serialNumber?: string;
	};

	type BurnAbpWMS_zhilinglaiyuanInstructionPendRecordInfoDto = {
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
		/** 来源单号 */
		sourceOrderNo?: string;
		/** 提供者名称 */
		providerCode?: string;
		/** 错误原因 */
		errorMsg?: string;
		/** 是否处理 */
		isHandle?: boolean;
		isError?: boolean;
		type?: BurnAbpWMSInstructionPendRecordType;
	};

	type BurnAbpWMSInstructionPendRecordType = 0 | 1;

	type BurnAbpWMSLocationUsePriority = 5 | 10 | 15;

	type BurnAbpWMSMEStiaomalaiyuanProductBarCodeInfo = {
		traceId?: string;
		boxNumber?: string;
		serialNumber?: string;
		taskOrder?: string;
		isRosh?: boolean;
		isTemporary?: boolean;
		temporaryNo?: string;
		workshopCode?: string;
		contractNo?: string;
		materialId?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescript?: string;
		quantity?: number;
		extraProperties?: Record<string, any>;
	};

	type BurnAbpWMSOrderStatus = 5 | 10 | 15 | 20;

	type BurnAbpWMSProductionDateProviderDto = {
		label?: string;
		value?: string;
	};

	type BurnAbpWMSStockBinBoxTypeInfo = {
		traceId?: string;
		contractNo?: string;
		taskOrder?: string;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		boxType?: string;
		quantity?: string;
	};

	type BurnAbpWMSUseType = 5 | 10;

	type BurnAbpWMSWarehousePropertyType = 5 | 10 | 15;

	type BurnAbpWMSWareHouseType = 5 | 10 | 15;

	type BurnAbpWMSWarehouseZoneClass = 5 | 10;

	type BurnAbpWMSWarehouseZoneType = 5 | 6 | 10;

	type CargoAreaDeleteAsyncParams = {
		id?: string;
	};

	type CargoAreaGetAsyncParams = {
		id?: string;
	};

	type CargoAreaGetByCodeAsyncParams = {
		code: string;
	};

	type CargoAreaGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CargoAreaUpdateAsyncParams = {
		id: string;
	};

	type CountDiffReasonDeleteAsyncParams = {
		id: string;
	};

	type CountDiffReasonExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountDiffReasonGetAsyncParams = {
		id: string;
	};

	type CountDiffReasonGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountDiffReasonUpdateAsyncParams = {
		id: string;
	};

	type CountOrderCloseAsyncParams = {
		id: string;
	};

	type CountOrderDeleteAsyncParams = {
		id: string;
	};

	type CountOrderDistributeAsyncParams = {
		id: string;
	};

	type CountOrderFinishFirstCountAsyncParams = {
		id: string;
	};

	type CountOrderGetAsyncParams = {
		id: string;
	};

	type CountOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountOrderTaskItemDetailGetDifferencessAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountOrderTaskItemDetailGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountOrderTaskItemDetailGetTaskItemDetailByTaskIdParams = {
		countTaskNo: string;
	};

	type CountOrderTaskItemGetCountOrderTaskItemDetailAsyncParams = {
		taskNo: string;
		boxNumber: string;
	};

	type CountOrderTaskItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountOrderTaskItemGetLpnInfoAsyncParams = {
		TaskNo: string;
		TraceId: string;
	};

	type CountOrderUpdateAsyncParams = {
		id: string;
	};

	type CountParamDeleteAsyncParams = {
		id: string;
	};

	type CountParamGetAsyncParams = {
		id: string;
	};

	type CountParamGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountParamUpdateAsyncParams = {
		id: string;
	};

	type CountRuleDeleteAsyncParams = {
		id: string;
	};

	type CountRuleGetAsyncParams = {
		id: string;
	};

	type CountRuleGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CountRuleUpdateAsyncParams = {
		id: string;
	};

	type DeliveryOrderCheckAsnOrderNoAsyncParams = {
		asnOrderNo: string;
	};

	type DeliveryOrderDeleteAsyncParams = {
		id: string;
	};

	type DeliveryOrderExportAsyncParams = {
		providerName?: string;
		deliveryOrderNo?: string;
	};

	type DeliveryOrderGetAsyncParams = {
		id: string;
	};

	type DeliveryOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ExcludeCompareSettingDeleteAsyncParams = {
		id: string;
	};

	type ExcludeCompareSettingGetAsyncParams = {
		id: string;
	};

	type ExcludeCompareSettingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ExcludeCompareSettingUpdateAsyncParams = {
		id: string;
	};

	type FactoryZoneDeleteAsyncParams = {
		id: string;
	};

	type FactoryZoneGetAsyncParams = {
		id: string;
	};

	type FactoryZoneGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type FactoryZoneUpdateAsyncParams = {
		id: string;
	};

	type HistoryCompareExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type HistoryCompareGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderCallBackAsyncParams = {
		id: string;
	};

	type InInstructionOrderCallBackItemAsyncParams = {
		itemId: string;
	};

	type InInstructionOrderCancelSubmitAsyncParams = {
		id: string;
	};

	type InInstructionOrderCancelVerifyAsyncParams = {
		id: string;
	};

	type InInstructionOrderDeleteAsyncParams = {
		id: string;
	};

	type InInstructionOrderExportItemAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderGetAsyncParams = {
		id: string;
	};

	type InInstructionOrderGetBoxAndOrderInfoAsyncParams = {
		BoxNumber: string;
		InInstructionOrderCode?: string;
		/** 物料ID */
		'MaterialItem.Id'?: string;
		/** 物料编码 */
		'MaterialItem.Code'?: string;
		/** 物料外码 */
		'MaterialItem.OutCode'?: string;
		/** 物料描述 */
		'MaterialItem.Description'?: string;
		/** 规格型号 */
		'MaterialItem.SpecificationModel'?: string;
	};

	type InInstructionOrderGetBoxesAndOrderInfoAsyncParams = {
		Lpn: string;
		InInstructionOrderCode?: string;
		/** 物料ID */
		'MaterialItem.Id'?: string;
		/** 物料编码 */
		'MaterialItem.Code'?: string;
		/** 物料外码 */
		'MaterialItem.OutCode'?: string;
		/** 物料描述 */
		'MaterialItem.Description'?: string;
		/** 规格型号 */
		'MaterialItem.SpecificationModel'?: string;
	};

	type InInstructionOrderGetByAsnNoAsyncParams = {
		inInstructionOrderNo: string;
	};

	type InInstructionOrderGetItemListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderGetItemListByIdAsyncParams = {
		itemId: string;
	};

	type InInstructionOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderGetSerialNumberAndOrderInfoAsyncParams = {
		SerialNumber: string;
		InInstructionOrderCode?: string;
		/** 物料ID */
		'MaterialItem.Id'?: string;
		/** 物料编码 */
		'MaterialItem.Code'?: string;
		/** 物料外码 */
		'MaterialItem.OutCode'?: string;
		/** 物料描述 */
		'MaterialItem.Description'?: string;
		/** 规格型号 */
		'MaterialItem.SpecificationModel'?: string;
	};

	type InInstructionOrderIntegrationDeleteAsyncParams = {
		orderNo?: string;
		sourceOrderType?: string;
	};

	type InInstructionOrderLpnItemDeleteAsyncParams = {
		id: string;
	};

	type InInstructionOrderLpnItemGetByBarCodeAsyncParams = {
		barCode: string;
	};

	type InInstructionOrderLpnItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderLpnItemGetLpnItemByItemIdAsyncParams = {
		itemId?: string;
	};

	type InInstructionOrderLpnItemGetSnListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderLpnItemUpdateAttachmentAsyncParams = {
		/** 入库指令箱Id */
		id: string;
	};

	type InInstructionOrderLpnSubItemGetAsyncParams = {
		id: string;
	};

	type InInstructionOrderLpnSubItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InInstructionOrderReceiveCompletedParams = {
		id?: string;
	};

	type InInstructionOrderSubmitAsyncParams = {
		id: string;
	};

	type InInstructionOrderUpdateAsyncParams = {
		id: string;
	};

	type InInstructionOrderVerifyAsyncParams = {
		id: string;
	};

	type InInstructionSourceItemGetPurchaseItemAsyncParams = {
		PO?: string;
		SupplierCode?: string;
		SupplierName?: string;
		MaterialCode?: string;
		StartDate?: string;
		EndDate?: string;
		MaxResultCount?: number;
		SkipCount?: number;
		Sorting?: string;
	};

	type InInstructionSourceItemGetSaleOrderIncomItemAsyncParams = {
		SaleOrderNo?: string;
		SupplierCode?: string;
		SupplierName?: string;
		MaterialCode?: string;
		StartDate?: string;
		EndDate?: string;
		MaxResultCount?: number;
		SkipCount?: number;
		Sorting?: string;
	};

	type InInstructionSourceItemGetSaleOrderItemAsyncParams = {
		SaleOrderNo?: string;
		CustomerCode?: string;
		CustomerName?: string;
		MaterialCode?: string;
		StartDate?: string;
		EndDate?: string;
		MaxResultCount?: number;
		SkipCount?: number;
		Sorting?: string;
	};

	type InstructionConfigDeleteAsyncParams = {
		id: string;
	};

	type InstructionConfigGetAsyncParams = {
		id: string;
	};

	type InstructionConfigGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InstructionConfigUpdateAsyncParams = {
		id: string;
	};

	type InstructionPendRecordInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InstructionPendRecordInfoReTryDataRecordAsyncParams = {
		id: string;
	};

	type InventoryTransactionItemExportToExcelAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InventoryTransactionItemGetBoxLotListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InventoryTransactionItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type InventoryTransactionItemGetSerialListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LessReasonDeleteAsyncParams = {
		id: string;
	};

	type LessReasonGetAsyncParams = {
		id: string;
	};

	type LessReasonGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LessReasonUpdateAsyncParams = {
		id: string;
	};

	type LoadCheckRecordExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LoadCheckRecordGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LotAttrGroupDeleteAsyncParams = {
		id: string;
	};

	type LotAttrGroupGetAsyncParams = {
		id: string;
	};

	type LotAttrGroupGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LotAttrGroupSetDefaultAsyncParams = {
		id: string;
	};

	type LotAttrGroupUpdateAsyncParams = {
		id: string;
	};

	type LotAttrItemDeleteAsyncParams = {
		id: string;
	};

	type LotAttrItemGetAsyncParams = {
		id: string;
	};

	type LotAttrItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LotAttrItemUpdateAsyncParams = {
		id: string;
	};

	type MaterialItemCategoryDeleteAsyncParams = {
		id: string;
	};

	type MaterialItemCategoryGetAsyncParams = {
		id: string;
	};

	type MaterialItemCategoryGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemCategoryUpdateAsyncParams = {
		id: string;
	};

	type MaterialItemDeleteAsyncParams = {
		id: string;
	};

	type MaterialItemExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemFindMaterialLotAttrAsyncParams = {
		materialId: string;
	};

	type MaterialItemFindMaterialLotAttrByCodeAsyncParams = {
		materialCode: string;
	};

	type MaterialItemFindMaterialRuleAsyncParams = {
		materialCode: string;
	};

	type MaterialItemGetAsyncParams = {
		id: string;
	};

	type MaterialItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemLifeDayDeleteAsyncParams = {
		id: string;
	};

	type MaterialItemLifeDayExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemLifeDayGetAsyncParams = {
		id: string;
	};

	type MaterialItemLifeDayGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemLifeDayUpdateAsyncParams = {
		id: string;
	};

	type MaterialItemLifeDayUpdateMaterialItemLifeDayAsyncParams = {
		id: string;
	};

	type MaterialItemManagerSettingDeleteAsyncParams = {
		id: string;
	};

	type MaterialItemManagerSettingExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemManagerSettingGetAsyncParams = {
		id: string;
	};

	type MaterialItemManagerSettingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialItemManagerSettingUpdateAsyncParams = {
		id: string;
	};

	type MaterialItemUpdateAsyncParams = {
		id: string;
	};

	type MaterialLocationMoveItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialLoopPickInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialPickItemBoxDetailExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialPickItemBoxDetailGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialPickItemBoxDetailUpdateAttachmentsAsyncParams = {
		id: string;
	};

	type MaterialPickItemGetBindListAsyncParams = {
		asnOrderNo: string;
	};

	type MaterialPickItemGetCheckedListAsyncParams = {
		asnOrderNo: string;
	};

	type MaterialPickItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialPickItemGetUnBindListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialPickItemManualPickByTraceIdAsyncParams = {
		TraceIds?: string[];
	};

	type MaterialPickTaskTypeDeleteAsyncParams = {
		id: string;
	};

	type MaterialPickTaskTypeGetAsyncParams = {
		id: string;
	};

	type MaterialPickTaskTypeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialPickTaskTypeUpdateAsyncParams = {
		id: string;
	};

	type MaterialPutAwayCheckBoxNumberAsyncParams = {
		boxNumber: string;
	};

	type MaterialPutAwayCheckLpnOnlyAsyncParams = {
		lpn: string;
	};

	type MesDataGetBySerialNumberAsyncParams = {
		serialNumber?: string;
	};

	type MesDataGetSNListByBoxNumberAsyncParams = {
		boxNumber: string;
	};

	type MesDataGetTraceIdBoxListAsyncParams = {
		traceId: string;
	};

	type OutInspectionProjectDeleteAsyncParams = {
		id: string;
	};

	type OutInspectionProjectGetAsyncParams = {
		id: string;
	};

	type OutInspectionProjectGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInspectionProjectUpdateAsyncParams = {
		id: string;
	};

	type OutInspectionSchemeDeleteAsyncParams = {
		id: string;
	};

	type OutInspectionSchemeGetAsyncParams = {
		id: string;
	};

	type OutInspectionSchemeGetItemByMaterialAsyncParams = {
		materialCode: string;
	};

	type OutInspectionSchemeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInspectionSchemeUpdateAsyncParams = {
		id: string;
	};

	type OutInspectionTaskGetAsyncParams = {
		id: string;
	};

	type OutInspectionTaskGetBoxListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInspectionTaskGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInspectionTaskIntegrationGetFinishListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInspectionTaskResolveAsyncParams = {
		code: string;
	};

	type OutInstructionDemandDeleteAsyncParams = {
		id: string;
	};

	type OutInstructionDemandGetAsyncParams = {
		id: string;
	};

	type OutInstructionDemandGetDemandItemsAsyncParams = {
		outInstructionOrderId: string;
		materialCode: string;
	};

	type OutInstructionDemandGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionDemandItemGetAsyncParams = {
		id: string;
	};

	type OutInstructionDemandItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionDemandMergeRuleDeleteAsyncParams = {
		id: string;
	};

	type OutInstructionDemandMergeRuleGetAsyncParams = {
		id: string;
	};

	type OutInstructionDemandMergeRuleGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionDemandMergeRuleUpdateAsyncParams = {
		id: string;
	};

	type OutInstructionDemandReCallBackAsyncParams = {
		id?: string;
	};

	type OutInstructionDemandReCallBackItemAsyncParams = {
		id?: string;
		itemId?: string;
	};

	type OutInstructionOrderCallBackAsyncParams = {
		id: string;
	};

	type OutInstructionOrderCallBackItemAsyncParams = {
		itemId: string;
	};

	type OutInstructionOrderCancelDemandMergeAsyncParams = {
		id: string;
	};

	type OutInstructionOrderCancelSubmitAsyncParams = {
		id: string;
	};

	type OutInstructionOrderCancelVerifyAsyncParams = {
		id: string;
	};

	type OutInstructionOrderDeleteAsyncParams = {
		id: string;
	};

	type OutInstructionOrderExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderExportItemAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderGetAsyncParams = {
		id: string;
	};

	type OutInstructionOrderGetBySourceOrderNoAsyncParams = {
		sourceOrderNo?: string;
	};

	type OutInstructionOrderGetItemListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderGetMyItemListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderGetMyListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderGetShipmentSummaryAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OutInstructionOrderImportAsyncParams = {
		/** 

5 = 销售出库

6 = 车间维修

10 = 生产领料

11 = 杂出

12 = 服务领料

14 = 采购出库

15 = 采购退货

16 = 客供退货

20 = 转库出库 */
		orderType?: BurnAbpWMS_chukuzhilingOutInstructionOrderType;
	};

	type OutInstructionOrderIntegrationDeleteAsyncParams = {
		orderNo?: string;
		sourceOrderType?: string;
	};

	type OutInstructionOrderManualShipmentAsyncParams = {
		id: string;
	};

	type OutInstructionOrderSubmitAsyncParams = {
		id: string;
	};

	type OutInstructionOrderUpdateAsyncParams = {
		id: string;
	};

	type OutInstructionOrderVerifyAsyncParams = {
		id: string;
	};

	type OverduePushRuleDeleteAsyncParams = {
		id: string;
	};

	type OverduePushRuleGetAsyncParams = {
		id: string;
	};

	type OverduePushRuleGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type OverduePushRuleUpdateAsyncParams = {
		id: string;
	};

	type PickTaskAgentDeleteAsyncParams = {
		id: string;
	};

	type PickTaskAgentGetAsyncParams = {
		id: string;
	};

	type PickTaskAgentGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PickTaskAgentUpdateAsyncParams = {
		id: string;
	};

	type PickTaskItemExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PickTaskItemGetAsyncParams = {
		id: string;
	};

	type PickTaskItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PickTaskItemGetListByShipmentAsyncParams = {
		shipmentOrderItemId?: string;
	};

	type PickTaskItemGetListByZoneAsyncParams = {
		ZoneCode?: string;
		TraceId?: string;
		IsLpnMaterials?: boolean;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PickTaskItemGetMyTaskListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PickTaskItemGetSumAsyncParams = {
		/** 开始日期 */
		StartDate?: string;
		/** 结束日期 */
		EndDate?: string;
		/** 库房编码 */
		WarehouseCode?: string;
	};

	type ProductionInInstructionItemCreateInInstructionAsyncParams = {
		sourceOrderNo?: string;
	};

	type ProductionInInstructionItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PutItemRecommendStrategyDeleteAsyncParams = {
		id: string;
	};

	type PutItemRecommendStrategyGetAsyncParams = {
		id: string;
	};

	type PutItemRecommendStrategyGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PutItemRecommendStrategyGetRecommendAsyncParams = {
		/** 仓库Id */
		WarehouseId?: string;
		/** 物料编码 */
		MaterialCode?: string;
	};

	type PutItemRecommendStrategyItemDeleteAsyncParams = {
		id: string;
	};

	type PutItemRecommendStrategyItemGetAsyncParams = {
		id: string;
	};

	type PutItemRecommendStrategyItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PutItemRecommendStrategyItemUpdateAsyncParams = {
		id: string;
	};

	type PutItemRecommendStrategyUpdateAsyncParams = {
		id: string;
	};

	type RealRightInfoDeleteAsyncParams = {
		id: string;
	};

	type RealRightInfoGetAsyncParams = {
		id: string;
	};

	type RealRightInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RealRightInfoUpdateAsyncParams = {
		id: string;
	};

	type RealTimeCompareExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RealTimeCompareGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type RealTimeCompareGetWaitForCallbackDataAsyncParams = {
		/** 物料编码 */
		MaterialCode?: string;
		/** 物料外码 */
		MaterialOutCode?: string;
		/** 物料描述 */
		MaterialDescription?: string;
		/** 库存编码 */
		WarehouseCode?: string;
		/** 库存名称 */
		WarehouseName?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type ReceiptCollectionItemResolveBarcodeAsyncParams = {
		barcode?: string;
	};

	type StockAgePushRuleDeleteAsyncParams = {
		id: string;
	};

	type StockAgePushRuleGetAsyncParams = {
		id: string;
	};

	type StockAgePushRuleGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockAgePushRuleUpdateAsyncParams = {
		id: string;
	};

	type StockBinBoxInfoCheckTraceIdAndBoxNumberAsyncParams = {
		traceId?: string;
		boxNumber?: string;
	};

	type StockBinBoxInfoExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinBoxInfoGetBoxTypeByTraceListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinBoxInfoGetBoxTypeSumByCodeListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinBoxInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinBoxInfoGetListByTraceIdAsyncParams = {
		traceId?: string;
	};

	type StockBinBoxInfoGetStockBinBoxInfoAsyncParams = {
		boxNumber: string;
	};

	type StockBinBoxInfoInteriorGetBoxItemAsyncParams = {
		boxCode?: string;
	};

	type StockBinBoxInfoInteriorGetBoxItemListAsyncParams = {
		code?: string;
	};

	type StockBinBoxInfoInteriorGetBoxLotListAsyncParams = {
		boxCode?: string;
	};

	type StockBinBoxInfoInteriorGetLastTransactionListAsyncParams = {
		code?: string;
	};

	type StockBinBoxInfoInteriorGetSerialNumberInfoAsyncParams = {
		/** 交易类型

5 = 收货

10 = 转移

15 = 调整

20 = 发货 */
		TransactionType?: BurnAbpWMS_kucunjiaoyiTransactionTypeEnum;
		/** 指定Sn信息 */
		SerialNumberList?: string[];
	};

	type StockBinBoxLotInfoGetAsyncParams = {
		id: string;
	};

	type StockBinBoxLotInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinDelayGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoExportTimeOutAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoGetBoxListByTraceIdAsyncParams = {
		taskId?: string;
		traceId?: string;
	};

	type StockBinInfoGetByTraceIdAsyncParams = {
		traceId?: string;
	};

	type StockBinInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoGetStockByWorkJobCodeAsyncParams = {
		/** 任务令号 */
		TaskOrder?: string;
		/** 库房编码 */
		WareHouseCode?: string;
		/** 物料外码 */
		MaterialOutCode?: string;
	};

	type StockBinInfoGetSummaryByMaterialAndLocationAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoGetSumQuantityAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoGetTimeOutListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinInfoGetTraceInfoByBoxAndQtyAsyncParams = {
		/** 箱号或者Sn信息 */
		boxOrSerialNumber?: string;
		/** 需求数量 */
		quantity?: number;
	};

	type StockBinInfoGetTraceInfoByBoxNumberAsyncParams = {
		taskId?: string;
		boxNumber?: string;
		remainQty?: number;
	};

	type StockBinInfoGetTraceInfoByLotAndQtyAsyncParams = {
		/** 库位信息 */
		locationCode?: string;
		/** 批次信息 */
		businessLotNumber?: string;
		/** 需求数量 */
		quantity?: number;
	};

	type StockBinInfoGetTraceInfoByLotNumberAsyncParams = {
		locationCode?: string;
		businessLotNumber?: string;
	};

	type StockBinInfoPickStockBinByWorkJobAsyncParams = {
		workJobCode?: string;
	};

	type StockBinSnInfoCheckSerialNumberAsyncParams = {
		traceId?: string;
		serialNumber?: string;
	};

	type StockBinSnInfoExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinSnInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinSplitCombinRecordGetAsyncParams = {
		id: string;
	};

	type StockBinSplitCombinRecordGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockBinSplitCombinRecordGetRecordPrintAsyncParams = {
		traceId: string;
	};

	type StockExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockGetStockSumAsyncParams = {
		warehouseCode?: string;
	};

	type StockRefreshItemStockAsyncParams = {
		materialCode?: string;
	};

	type StoreDataCompareCompareAsynParams = {
		warehouseCode?: string;
	};

	type StoreTransferMapDeleteAsyncParams = {
		id: string;
	};

	type StoreTransferMapGetAsyncParams = {
		id: string;
	};

	type StoreTransferMapGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StoreTransferMapUpdateAsyncParams = {
		id: string;
	};

	type StoreTransferOrderCancelAsyncParams = {
		id?: string;
	};

	type StoreTransferOrderCancelVerifyAsyncParams = {
		id: string;
	};

	type StoreTransferOrderGetAsyncParams = {
		id: string;
	};

	type StoreTransferOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StoreTransferOrderItemGetAsyncParams = {
		id: string;
	};

	type StoreTransferOrderItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StoreTransferOrderVerifyAsyncParams = {
		id: string;
	};

	type StoreTransferTaskItemGetAsyncParams = {
		id: string;
	};

	type StoreTransferTaskItemGetByTarceIdAsyncParams = {
		traceId?: string;
	};

	type StoreTransferTaskItemGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StoreTransferTaskItemGetListByManAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StoreTransferTaskItemPickAsyncParams = {
		traceId?: string;
	};

	type StoreTransferTaskItemPutAsyncParams = {
		traceId?: string;
		localtionCode?: string;
	};

	type TraceIdGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TraceIdMassProductionParams = {
		/** 

0 = 箱

1 = 栈板

2 = 批次 */
		traceType?: BurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceType;
		number?: number;
	};

	type VehicleInfoDeleteAsyncParams = {
		id: string;
	};

	type VehicleInfoGetAsyncParams = {
		id: string;
	};

	type VehicleInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type VehicleInfoUpdateAsyncParams = {
		id: string;
	};

	type VoloAbpApplicationDtosDynamicQueryInput = {
		maxResultCount?: number;
		skipCount?: number;
		sorting?: string;
		filter?: string;
		page?: number;
		pageSize?: number;
		orderBy?: string;
	};

	type VoloAbpApplicationDtosExtensiblePagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinSummaryDto = {
		extraProperties?: Record<string, any>;
		items?: BurnAbpWMS_kucun_kucunliebiaoStockBinSummaryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosExtensiblePagedResultDtoBurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto = {
		extraProperties?: Record<string, any>;
		items?: BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto = {
		items?: BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskSumDto = {
		items?: BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskSumDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingOutInstructionPickItemUnfinishedCountDto = {
		items?: BurnAbpWMS_chuku_chukuzhilingOutInstructionPickItemUnfinishedCountDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpWMS_kucun_kucunliebiaoWorkJobStockBinDto = {
		items?: BurnAbpWMS_kucun_kucunliebiaoWorkJobStockBinDto[];
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpWMS_ruku_rukuzhilingInInstructionOrderReceiveUnfinishedCountDto = {
		items?: BurnAbpWMS_ruku_rukuzhilingInInstructionOrderReceiveUnfinishedCountDto[];
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskBoxItemDto = {
		items?: BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskBoxItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto = {
		items?: BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto = {
		items?: BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandDto = {
		items?: BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto = {
		items?: BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto = {
		items?: BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderItemDto = {
		items?: BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto = {
		items?: BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_gundongfaliaojiluMaterialLoopPickInfoDto = {
		items?: BurnAbpWMS_chuku_gundongfaliaojiluMaterialLoopPickInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_songhuodanDeliveryOrderDto = {
		items?: BurnAbpWMS_chuku_songhuodanDeliveryOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto = {
		items?: BurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailDto = {
		items?: BurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_zhuangchefuheLoadCheckRecordDto = {
		items?: BurnAbpWMS_chuku_zhuangchefuheLoadCheckRecordDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_danjulaiyuan_caigoudingdanPurchaseOrderItemModel = {
		items?: BurnAbpWMS_danjulaiyuan_caigoudingdanPurchaseOrderItemModel[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_danjulaiyuan_xiaoshoudingdanSaleOrderItemModel = {
		items?: BurnAbpWMS_danjulaiyuan_xiaoshoudingdanSaleOrderItemModel[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_danjulaiyuan_xiaoshoupeiliaodanSaleOrderIncomModel = {
		items?: BurnAbpWMS_danjulaiyuan_xiaoshoupeiliaodanSaleOrderIncomModel[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferOrderDto = {
		items?: BurnAbpWMS_diaoboStoreTransferOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferOrderItemDto = {
		items?: BurnAbpWMS_diaoboStoreTransferOrderItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferTaskItemDto = {
		items?: BurnAbpWMS_diaoboStoreTransferTaskItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto = {
		items?: BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto = {
		items?: BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto = {
		items?: BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto = {
		items?: BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto = {
		items?: BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto = {
		items?: BurnAbpWMS_jichuxinxi_churukuzhilingpeizhiInstructionConfigDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto = {
		items?: BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto = {
		items?: BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto = {
		items?: BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto = {
		items?: BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto = {
		items?: BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangWareHouseDto = {
		items?: BurnAbpWMS_jichuxinxi_kufangWareHouseDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto = {
		items?: BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto = {
		items?: BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto = {
		items?: BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto = {
		items?: BurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_quyuFactoryZoneDto = {
		items?: BurnAbpWMS_jichuxinxi_quyuFactoryZoneDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto = {
		items?: BurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto = {
		items?: BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto = {
		items?: BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto = {
		items?: BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto = {
		items?: BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto = {
		items?: BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto = {
		items?: BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto = {
		items?: BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto = {
		items?: BurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceIdDto = {
		items?: BurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceIdDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinBoxLotInfoDto = {
		items?: BurnAbpWMS_kucun_kucunliebiaoStockBinBoxLotInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto = {
		items?: BurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunSNliebiaoStockBinSNInfoDto = {
		items?: BurnAbpWMS_kucun_kucunSNliebiaoStockBinSNInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto = {
		items?: BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunyanqiStockBinDelayDto = {
		items?: BurnAbpWMS_kucun_kucunyanqiStockBinDelayDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordDto = {
		items?: BurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kuweiyidongMaterialLocationMoveItemDto = {
		items?: BurnAbpWMS_kucun_kuweiyidongMaterialLocationMoveItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhang_duizhangxinxiHistoryCompareDto = {
		items?: BurnAbpWMS_kucunduizhang_duizhangxinxiHistoryCompareDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhang_duizhangxinxiRealTimeCompareDto = {
		items?: BurnAbpWMS_kucunduizhang_duizhangxinxiRealTimeCompareDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto = {
		items?: BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhangWaitForCallbackModel = {
		items?: BurnAbpWMS_kucunduizhangWaitForCallbackModel[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunITEMkucunStockDto = {
		items?: BurnAbpWMS_kucunITEMkucunStockDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemBoxLotItemDto = {
		items?: BurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemBoxLotItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemDto = {
		items?: BurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunjiaoyijiluInventoryTransactionSerialNumberItemDto = {
		items?: BurnAbpWMS_kucunjiaoyijiluInventoryTransactionSerialNumberItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandiancanshuCountParamDto = {
		items?: BurnAbpWMS_pandian_pandiancanshuCountParamDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto = {
		items?: BurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianguizeCountRuleDto = {
		items?: BurnAbpWMS_pandian_pandianguizeCountRuleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianqingdanCountOrderDto = {
		items?: BurnAbpWMS_pandian_pandianqingdanCountOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianrenwuCountOrderTaskItemDto = {
		items?: BurnAbpWMS_pandian_pandianrenwuCountOrderTaskItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianrenwumingxiCountOrderTaskItemDetailDto = {
		items?: BurnAbpWMS_pandian_pandianrenwumingxiCountOrderTaskItemDetailDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_liushuirukujiluProductionInInstructionItemDto = {
		items?: BurnAbpWMS_ruku_liushuirukujiluProductionInInstructionItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto = {
		items?: BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingFullInInstructionOrderItemDto = {
		items?: BurnAbpWMS_ruku_rukuzhilingFullInInstructionOrderItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto = {
		items?: BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderSnItemDto = {
		items?: BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderSnItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingxiangpicimingxiInInstructionOrderLpnSubItemDto = {
		items?: BurnAbpWMS_ruku_rukuzhilingxiangpicimingxiInInstructionOrderLpnSubItemDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_zhilinglaiyuanInstructionPendRecordInfoDto = {
		items?: BurnAbpWMS_zhilinglaiyuanInstructionPendRecordInfoDto[];
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

	type VoloAbpNameValueSystemString = {
		name?: string;
		value?: string;
	};

	type WareHouseDeleteAsyncParams = {
		id: string;
	};

	type WareHouseExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WareHouseGetAsyncParams = {
		id: string;
	};

	type WareHouseGetByCodeAsyncParams = {
		code: string;
	};

	type WareHouseGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WareHouseLocationDeleteAsyncParams = {
		id: string;
	};

	type WareHouseLocationExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WareHouseLocationGetAsyncParams = {
		id: string;
	};

	type WareHouseLocationGetByCodeAsyncParams = {
		code: string;
	};

	type WareHouseLocationGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WareHouseLocationGetUseRateAsyncParams = {
		warehouseCode?: string;
	};

	type WareHouseLocationUpdateAsyncParams = {
		/** 主键ID */
		id: string;
	};

	type WarehouseManDeleteAsyncParams = {
		id: string;
	};

	type WarehouseManGetAsyncParams = {
		id: string;
	};

	type WarehouseManGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WarehouseManIntegrationGetAsyncParams = {
		userId?: string;
	};

	type WarehouseManUpdateAsyncParams = {
		id: string;
	};

	type WareHouseTeamDeleteAsyncParams = {
		id: string;
	};

	type WareHouseTeamGetAsyncParams = {
		id: string;
	};

	type WareHouseTeamGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WareHouseTeamUpdateAsyncParams = {
		id: string;
	};

	type WareHouseUpdateAsyncParams = {
		id: string;
	};

	type WarehouseZoneDeleteAsyncParams = {
		id: string;
	};

	type WarehouseZoneExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WarehouseZoneGetAsyncParams = {
		id: string;
	};

	type WarehouseZoneGetByCodeAsyncParams = {
		code: string;
	};

	type WarehouseZoneGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WarehouseZoneUpdateAsyncParams = {
		id: string;
	};
}
