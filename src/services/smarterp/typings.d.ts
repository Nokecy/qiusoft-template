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

	type BomCalculationSuperBomAsyncParams = {
		materialCode?: string;
	};

	type BomCalculationSuperConfigurationAsyncParams = {
		materialCode?: string;
	};

	type BomDeleteAsyncParams = {
		id: number;
	};

	type BomGetAsyncParams = {
		id: number;
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

	type BomUpdateAsyncParams = {
		id: number;
	};

	type BurnAbpErpCommonMaterialManagementAttributesObjectDependencyType = 0 | 1 | 2;

	type BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoAttributeVariableDto = {
		variables?: Record<string, any>;
	};

	type BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto = {
		id?: number;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** BOM类型：1 工程、2 生产、3 计划、4 客户… */
		type?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingBomItemDto = {
		/** 备货单编号 */
		stockingOrderNo?: string;
		/** 备货单ID */
		stockingOrderId?: number;
		/** 备货单明细ID */
		stockingOrderItemId?: number;
		/** 父项ID */
		parentId?: number;
		/** 父项物料编码 */
		parentMaterialCode?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 单位名称 */
		unitName?: string;
		/** 版本 */
		version?: string;
		/** 来源 */
		comeFrom?: string;
		/** 数量 */
		qty?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingOrderDto = {
		stockingOrderNo: string;
		/** 备货计划名称 */
		stockingOrderName?: string;
		/** 开始周 */
		startWeek?: string;
		/** 客户编码 */
		customerCode?: string;
		productionDate?: string;
		memo?: string;
		items?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingOrderItemDto[];
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingOrderItemAttributeDto = {
		name?: string;
		displayName?: string;
		value?: string;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingOrderItemDto = {
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		unitName?: string;
		version?: string;
		qty?: number;
		memo?: string;
		attributes?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingOrderItemAttributeDto[];
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto = {
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
		stockingOrderNo?: string;
		/** 备货计划名称 */
		stockingOrderName?: string;
		/** 开始周 */
		startWeek?: string;
		/** 客户编码 */
		customerCode?: string;
		productionDate?: string;
		memo?: string;
		status?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderStatus;
		statusDisplay?: string;
		items?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemDto[];
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemAttributeDto = {
		id?: string;
		name?: string;
		displayName?: string;
		value?: string;
		stockingOrderItemId?: number;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemDto = {
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
		stockingOrderNo?: string;
		stockingOrderId?: number;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		unitName?: string;
		version?: string;
		qty?: number;
		memo?: string;
		status?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderStatus;
		attributes?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemAttributeDto[];
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemAttributeDto = {
		id?: string;
		name?: string;
		displayName?: string;
		value?: string;
		stockingOrderItemWorkBomItemId?: number;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemDto = {
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
		/** 排序序号 */
		sort?: number;
		/** 备货单号 */
		stockingOrderNo?: string;
		/** 备货单ID */
		stockingOrderId?: number;
		/** 备货单明细ID */
		stockingOrderItemId?: number;
		/** 父节点ID */
		parentId?: number;
		/** 父物料编码 */
		parentMaterialCode?: string;
		/** 父物料规格型号 */
		parentSpecificationModel?: string;
		/** 父件用量 */
		parentQty?: number;
		/** 来源 */
		comeFrom?: string;
		/** 层级 */
		level?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 外文描述 */
		outDescription?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 单位 */
		unitName?: string;
		/** 单件用量 */
		qty?: number;
		/** 总用量 */
		totalQty?: number;
		/** 需求量 */
		requiredQty?: number;
		/** 是否有BOM */
		haveBom?: string;
		/** 备注 */
		memo?: string;
		/** BOM特性集合 */
		attributes?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemAttributeDto[];
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderStatus = 0 | 10 | 20;

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingBomItemDto = {
		id?: number;
		qty?: number;
		memo?: string;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingOrderDto = {
		/** 备货计划名称 */
		stockingOrderName?: string;
		/** 开始周 */
		startWeek?: string;
		/** 客户编码 */
		customerCode?: string;
		productionDate?: string;
		memo?: string;
		items?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingOrderItemDto[];
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingOrderItemAttributeDto = {
		id?: string;
		name?: string;
		displayName?: string;
		value?: string;
	};

	type BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingOrderItemDto = {
		id?: number;
		materialCode?: string;
		materialOutCode?: string;
		materialDescription?: string;
		unitName?: string;
		version?: string;
		qty?: number;
		memo?: string;
		attributes?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingOrderItemAttributeDto[];
	};

	type BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto = {
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
		/** 提交人 */
		submitter?: string;
		/** 提交时间 */
		submitDate?: string;
		/** 审批人 */
		checker?: string;
		/** 审批时间 */
		checkDate?: string;
		/** 编码 */
		code?: string;
		/** 姓名 */
		name?: string;
		/** 组织 */
		orgCode?: string;
		/** 分组 */
		group?: string;
		/** 电话 */
		tel?: string;
		/** 传真 */
		fax?: string;
		/** 手机号 */
		mobile?: string;
		/** 性别 */
		sex?: string;
		/** 邮箱 */
		email?: string;
		/** 身份证号 */
		idCard?: string;
		/** 标题 */
		title?: string;
		/** 联系地址 */
		address?: string;
		/** 备注 */
		memo?: string;
		status?: string;
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateBomItemDto = {
		/** 销售订单编号 */
		saleOrderNo?: string;
		/** 销售订单ID */
		saleOrderId?: number;
		/** 销售订单明细ID */
		saleOrderItemId?: number;
		/** 父项ID */
		parentId?: number;
		/** 父项物料编码 */
		parentMaterialCode?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 单位名称 */
		unitName?: string;
		/** 版本 */
		version?: string;
		/** 来源 */
		comeFrom?: string;
		/** 数量 */
		qty?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiCreateSaleOrderDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		extraIndexProperties?: Record<string, any>;
		lastModifier?: string;
		deleter?: string;
		organizationCode?: string;
		organizationName?: string;
		companyCode?: string;
		factoryCode?: string;
		/** 提交人 */
		submitter?: string;
		/** 提交时间 */
		submitDate?: string;
		/** 审批人 */
		checker?: string;
		/** 审批时间 */
		checkDate?: string;
		/** 订单号 */
		orderNo?: string;
		/** 订单号编码规编号 */
		orderFormula?: string;
		/** 版本 */
		version?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户简称 */
		customerAbb?: string;
		/** 客户名称 */
		customerName?: string;
		/** 销售员编码 */
		saleCode?: string;
		/** 收货人 */
		reciver?: string;
		/** 收货人电话 */
		reciverTel?: string;
		/** 收货人传真 */
		reciverFax?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 订单外部编码 */
		orderOutNo?: string;
		/** 签订日期 */
		releaseDate?: string;
		/** 紧急标志：0 否；1 是 */
		hurryStatus?: string;
		/** 订单状态 */
		orderStatus?: string;
		/** 备注 */
		memo?: string;
		/** 货币编码 */
		currencyCode?: string;
		/** 货币简称 */
		currencyAbb?: string;
		/** 货币汇率 */
		currencyRate?: number;
		/** 发票编码 */
		invoiceCode?: string;
		/** 发票名称 */
		invoiceName?: string;
		/** 发票税率 */
		invoiceRate?: number;
		/** 结算方式编码 */
		settleMethodCode?: string;
		/** 结算方式 */
		settleMethodName?: string;
		/** 订单类型：10 普通订单；20 一揽子订单；30 维修订单；40 ATO模式；50 金额订单；60 内部订单；70 样品订单 */
		orderType?: string;
		/** 交货方式编码 */
		deliverMethodCode?: string;
		/** 交货方式 */
		deliverMethodName?: string;
		/** 打印标志 */
		printMark?: number;
		/** 交货地址 */
		deliveryAddress?: string;
		/** 组织编码 */
		orgCode?: string;
		/** 补齐日期 */
		suiteDate?: string;
		/** 单价含税否：0 否；1 是 */
		priceIsTax?: string;
		/** 单号编码规则用静态信息 */
		sign?: string;
		/** 交易方式：10 定金采购款到发货；20 定金采购货到付款；30 定金方式款到发货；40 定金方式货到付款；50 款到发货；60 货到付款；70 按月月结；80 按单月结 */
		businessType?: string;
		/** 价格条款(信息来自TradeMode) */
		riceItems?: string;
		/** 定金方式：10 定金百分比；20 定金额度) */
		earnestType?: string;
		/** 定金比例 */
		earnest?: number;
		/** 结算日 */
		endDays?: number;
		/** 价格对应地址 */
		priceAddr?: string;
		/** 跟单员 */
		consigner?: string;
		/** 跟单员编码 */
		consignerCode?: string;
		status?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderStatus;
		saleOrderItems?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemDto[];
		workflowInstanceId?: string;
		currentActivityName?: string;
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		creator?: string;
		workflows?: BurnAbpSmartErpWorkflowBookmarkDto[];
		executeInput?: VoloAbpElsaAbstractModelsExecuteWorkflowInput;
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		extraIndexProperties?: Record<string, any>;
		lastModifier?: string;
		deleter?: string;
		organizationCode?: string;
		organizationName?: string;
		companyCode?: string;
		factoryCode?: string;
		/** 提交人 */
		submitter?: string;
		/** 提交时间 */
		submitDate?: string;
		/** 审批人 */
		checker?: string;
		/** 审批时间 */
		checkDate?: string;
		/** 订单号 */
		orderNo?: string;
		/** 订单号编码规编号 */
		orderFormula?: string;
		/** 版本 */
		version?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 客户简称 */
		customerAbb?: string;
		/** 客户名称 */
		customerName?: string;
		/** 销售员编码 */
		saleCode?: string;
		/** 收货人 */
		reciver?: string;
		/** 收货人电话 */
		reciverTel?: string;
		/** 收货人传真 */
		reciverFax?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 订单外部编码 */
		orderOutNo?: string;
		/** 签订日期 */
		releaseDate?: string;
		/** 紧急标志：0 否；1 是 */
		hurryStatus?: string;
		/** 订单状态 */
		orderStatus?: string;
		/** 备注 */
		memo?: string;
		/** 货币编码 */
		currencyCode?: string;
		/** 货币简称 */
		currencyAbb?: string;
		/** 货币汇率 */
		currencyRate?: number;
		/** 发票编码 */
		invoiceCode?: string;
		/** 发票名称 */
		invoiceName?: string;
		/** 发票税率 */
		invoiceRate?: number;
		/** 结算方式编码 */
		settleMethodCode?: string;
		/** 结算方式 */
		settleMethodName?: string;
		/** 订单类型：10 普通订单；20 一揽子订单；30 维修订单；40 ATO模式；50 金额订单；60 内部订单；70 样品订单 */
		orderType?: string;
		/** 交货方式编码 */
		deliverMethodCode?: string;
		/** 交货方式 */
		deliverMethodName?: string;
		/** 打印标志 */
		printMark?: number;
		/** 交货地址 */
		deliveryAddress?: string;
		/** 组织编码 */
		orgCode?: string;
		/** 补齐日期 */
		suiteDate?: string;
		/** 单价含税否：0 否；1 是 */
		priceIsTax?: string;
		/** 单号编码规则用静态信息 */
		sign?: string;
		/** 交易方式：10 定金采购款到发货；20 定金采购货到付款；30 定金方式款到发货；40 定金方式货到付款；50 款到发货；60 货到付款；70 按月月结；80 按单月结 */
		businessType?: string;
		/** 价格条款(信息来自TradeMode) */
		riceItems?: string;
		/** 定金方式：10 定金百分比；20 定金额度) */
		earnestType?: string;
		/** 定金比例 */
		earnest?: number;
		/** 结算日 */
		endDays?: number;
		/** 价格对应地址 */
		priceAddr?: string;
		/** 跟单员 */
		consigner?: string;
		/** 跟单员编码 */
		consignerCode?: string;
		status?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderStatus;
		saleOrderItems?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemDto[];
		workflowInstanceId?: string;
		currentActivityName?: string;
		currentAssigneeName?: string;
		workflowStatus?: VoloAbpElsaDomainEntitiesEnumWorkflowStatus;
		creator?: string;
		workflows?: BurnAbpSmartErpWorkflowBookmarkDto[];
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemAttributeDto = {
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
		saleOrderId?: number;
		saleOrderItemId?: number;
		name?: string;
		displayName?: string;
		value?: any;
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemDto = {
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
		/** 提交人 */
		submitter?: string;
		/** 提交时间 */
		submitDate?: string;
		/** 审批人 */
		checker?: string;
		/** 审批时间 */
		checkDate?: string;
		/** 序号 */
		sort?: number;
		/** 订单号 */
		orderNo?: string;
		/** 订单行号 */
		saleOrderId?: number;
		/** 交货地址编码 */
		deliveryCode?: string;
		/** 交货地址 */
		deliveryAddress?: string;
		/** 信息行号 */
		messageId?: number;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 单位 */
		unitName?: string;
		/** 来源 */
		comeFrom?: string;
		/** 版本 */
		version?: string;
		/** 订单量 */
		qty?: number;
		/** 取消量 */
		cancelQty?: number;
		/** 送货量 */
		sendQty?: number;
		recQty?: number;
		/** 退货量 */
		returnQty?: number;
		/** 单价 */
		price?: number;
		/** 金额 */
		amount?: number;
		/** 生效日期 */
		startDate?: string;
		/** 失效日期 */
		endDate?: string;
		/** 交货日期 */
		deliveryDate?: string;
		/** 出厂日期 */
		yieldDate?: string;
		/** 修改前订单量 */
		lastQty?: number;
		/** 修改前订单余量 */
		lastLeftQty?: number;
		/** 修改前单价 */
		lastPrice?: number;
		/** 修改前交货日期 */
		lastDeliveryDate?: string;
		/** 修改前日期 */
		lastDate?: string;
		/** 备注 */
		memo?: string;
		caseQty?: number;
		subCaseQty?: number;
		/** 交货地址 */
		fDeliveryAddress?: string;
		/** 任务令 */
		workJobCode?: string;
		/** 订单号 */
		orderNumber?: string;
		/** 合同号 */
		contractNo?: string;
		/** 备货单号 */
		goodNo?: string;
		/** 是否有BOM */
		haveBom?: string;
		/** 记录标识：0 有效；2 修改;3 删除 */
		activeType?: string;
		/** 工作在线 */
		workCenter?: string;
		/** 检查中心 */
		checkCenter?: string;
		/** 单位转换率 */
		exchangeRate?: number;
		/** 订单数(基本单位) */
		invQty?: number;
		/** 销售单位编码 */
		saleUnitCode?: string;
		invCancelQty?: number;
		/** 销售单位 */
		saleUnitName?: string;
		/** 送货量(基本单位) */
		invSendQty?: number;
		/** 退货量(基本单位) */
		invReturnQty?: number;
		/** 单位转换计算方式：0 乘；1 除 */
		uExchangeFlag?: string;
		/** 订单的物料外码是否更改标示：0 未修改过；1 修改过 */
		mountCodeEditFag?: string;
		/** 特殊标记编码 */
		typeCode?: string;
		/** 特殊标记（环保标记） */
		typeName?: string;
		/** 特控单位编码 */
		specilizeCode?: string;
		/** 特控单位 */
		specilizeName?: string;
		/** 特控数 */
		specilizeQty?: number;
		/** 特控单位转换率 */
		saleExchangeRate?: number;
		/** 是否已经运算项目计划:00 未计划、10 已计划 */
		havePlan?: string;
		/** 生产厂家 */
		manufacturer?: string;
		/** 规格型号 */
		specification?: string;
		/** 是否打样：00 否；10 是 */
		isMuster?: string;
		/** 样品数 */
		musterQty?: number;
		/** 品牌 */
		brand?: string;
		/** 单据是否结案：0 否；1 是 */
		isEnd?: string;
		/** 定金方式：10 定金百分比；20 定金额度) */
		engineryType?: string;
		status?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderStatus;
		attributes?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemAttributeDto[];
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemWorkBomItemAttributeDto = {
		id?: string;
		saleOrderItemBomId?: string;
		name?: string;
		displayName?: string;
		value?: string;
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemWorkBomItemDto = {
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
		/** 销售订单号 */
		saleOrderNo?: string;
		/** 销售订单行号 */
		saleOrderId?: number;
		/** 销售订单明细行号 */
		saleOrderItemId?: number;
		/** 父行号 */
		parentId?: number;
		/** 父行物料编码 */
		parentMaterialCode?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 版本 */
		version?: string;
		/** 单位 */
		unitName?: string;
		comeFrom?: string;
		level?: string;
		/** 单件用量 */
		qty?: number;
		/** 总用量 */
		totalQty?: number;
		memo?: string;
		status?: string;
		children?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemWorkBomItemDto[];
		attributes?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderItemWorkBomItemAttributeDto[];
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderStatus = 2 | 4 | 8 | 16 | 32;

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiUpdateBomItemDto = {
		id?: number;
		qty?: number;
		memo?: string;
	};

	type BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto = {
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
		/** 提交人 */
		submitter?: string;
		/** 提交时间 */
		submitDate?: string;
		/** 审批人 */
		checker?: string;
		/** 审批时间 */
		checkDate?: string;
		/** 工号 */
		workNo?: string;
		/** 编码 */
		code?: string;
		/** 姓名 */
		name?: string;
		/** 部门编码 */
		departCode?: string;
		/** 分组 */
		group?: string;
		/** 电话 */
		tel?: string;
		/** 传真 */
		fax?: string;
		/** 手机号 */
		mobile?: string;
		/** 性别 */
		sex?: string;
		/** 邮箱 */
		email?: string;
		/** 身份证号码 */
		idCard?: string;
		/** 标题 */
		title?: string;
		/** 联系地址 */
		address?: string;
		/** 组织 */
		orgCode?: string;
		/** 备注 */
		memo?: string;
		/** 显示姓名 */
		showName?: string;
		status?: string;
	};

	type BurnAbpSmartErpSuperBomItemsSuperBomItem = {
		id?: number;
		children?: BurnAbpSmartErpSuperBomItemsSuperBomItem[];
		attributes?: BurnAbpSmartErpSuperBomItemsSuperBomItemAttribute[];
		/** 排序 */
		sort?: number;
		/** 层级 */
		level?: string;
		/** 父级物料编码 */
		parentMaterialCode?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 单位 */
		unitName?: string;
		/** 数量 */
		qty?: number;
		/** 来源 */
		comeFrom?: string;
		/** 备注 */
		memo?: string;
		objectDependencyType?: BurnAbpErpCommonMaterialManagementAttributesObjectDependencyType;
		/** 依赖对象 */
		objectDependency?: string;
	};

	type BurnAbpSmartErpSuperBomItemsSuperBomItemAttribute = {
		name?: string;
		displayName?: string;
		value?: string;
	};

	type BurnAbpSmartErpWorkflowBookmarkDto = {
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
	};

	type CustomerConsignerDeleteAsyncParams = {
		id: number;
	};

	type CustomerConsignerGetAsyncParams = {
		id: number;
	};

	type CustomerConsignerGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerConsignerUpdateAsyncParams = {
		id: number;
	};

	type SaleManDeleteAsyncParams = {
		id: number;
	};

	type SaleManGetAsyncParams = {
		id: number;
	};

	type SaleManGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type SaleManUpdateAsyncParams = {
		id: number;
	};

	type SaleOrderApproveAsyncParams = {
		/** 销售订单ID */
		id: number;
	};

	type SaleOrderCopyAsyncParams = {
		/** 原订单ID */
		id: number;
	};

	type SaleOrderDeleteAsyncParams = {
		id: number;
	};

	type SaleOrderExecuteWorkflowAsyncParams = {
		id: number;
	};

	type SaleOrderExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type SaleOrderExportMergeSaleBomItemAsyncParams = {
		/** 销售订单项ID */
		saleOrderItemId: number;
	};

	type SaleOrderExportSaleBomItemAsyncParams = {
		/** 销售订单项ID */
		saleOrderItemId: number;
	};

	type SaleOrderGetAsyncParams = {
		id: number;
	};

	type SaleOrderGetBomItemAsyncParams = {
		/** BOM 项目ID */
		bomItemId: number;
	};

	type SaleOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type SaleOrderGetSaleBomItemListAsyncParams = {
		/** 销售订单项ID */
		saleOrderItemId: number;
	};

	type SaleOrderRemoveBomItemAsyncParams = {
		/** BOM 项目ID */
		bomItemId: number;
	};

	type SaleOrderUnapproveAsyncParams = {
		/** 销售订单ID */
		id: number;
	};

	type SaleOrderUpdateAsyncParams = {
		id: number;
	};

	type SmartErpWorkflowEntityGetAsyncParams = {
		workflowName?: string;
		id: string;
	};

	type SmartErpWorkflowEntityGetListAsyncParams = {
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

	type StockingOrderApproveAsyncParams = {
		id: number;
	};

	type StockingOrderCopyAsyncParams = {
		sourceId: number;
		newStockingOrderNo?: string;
	};

	type StockingOrderDeleteAsyncParams = {
		id: number;
	};

	type StockingOrderExportMergeStockingBomItemAsyncParams = {
		/** 备货单明细ID */
		stockingOrderItemId: number;
	};

	type StockingOrderExportStockingBomItemAsyncParams = {
		/** 备货单明细ID */
		stockingOrderItemId: number;
	};

	type StockingOrderGetAsyncParams = {
		id: number;
	};

	type StockingOrderGetBomItemAsyncParams = {
		/** BOM明细ID */
		bomItemId: number;
	};

	type StockingOrderGetByStockingOrderNoAsyncParams = {
		stockingOrderNo?: string;
	};

	type StockingOrderGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type StockingOrderGetStockingBomItemListAsyncParams = {
		/** 备货单明细ID */
		stockingOrderItemId: number;
	};

	type StockingOrderGetWorkBomItemsAsyncParams = {
		stockingOrderId: number;
	};

	type StockingOrderRemoveBomItemAsyncParams = {
		/** BOM明细ID */
		bomItemId: number;
	};

	type StockingOrderSaveWorkBomItemsAsyncParams = {
		stockingOrderId: number;
	};

	type StockingOrderSubmitAsyncParams = {
		id: number;
	};

	type StockingOrderUnapproveAsyncParams = {
		id: number;
	};

	type StockingOrderUpdateAsyncParams = {
		id: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto = {
		items?: BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto = {
		items?: BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto = {
		items?: BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto = {
		items?: BurnAbpSmartErp_xiaoshouguanli_xiaoshoudingdanxinxiSaleOrderDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto = {
		items?: BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto[];
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
}
