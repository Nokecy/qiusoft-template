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

	type AssetDeleteAsyncParams = {
		id: string;
	};

	type AssetExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AssetGetAsyncParams = {
		id: string;
	};

	type AssetGetByCodeAsyncParams = {
		/** 资产编码 */
		code?: string;
	};

	type AssetGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AssetUpdateAsyncParams = {
		id: string;
	};

	type AttributeDeleteAsyncParams = {
		id: string;
	};

	type AttributeExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeFindByDisplayNameAsyncParams = {
		displayName?: string;
	};

	type AttributeFindByNameAsyncParams = {
		name?: string;
	};

	type AttributeGetAsyncParams = {
		id: string;
	};

	type AttributeGetAttributeGroupsByAttributeAsyncParams = {
		attributeId: string;
	};

	type AttributeGetBatchAsyncParams = {
		ids?: string[];
	};

	type AttributeGetByDataTypeAsyncParams = {
		dataType?: number;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeGetByNameAsyncParams = {
		name?: string;
	};

	type AttributeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeGroupAddAttributeToGroupAsyncParams = {
		attributeGroupId: string;
	};

	type AttributeGroupBatchAddAttributesToGroupAsyncParams = {
		attributeGroupId: string;
	};

	type AttributeGroupBatchRemoveAttributesFromGroupAsyncParams = {
		attributeGroupId: string;
	};

	type AttributeGroupDeleteAsyncParams = {
		id: string;
	};

	type AttributeGroupExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeGroupGetAsyncParams = {
		id: string;
	};

	type AttributeGroupGetAttributesInGroupAsyncParams = {
		attributeGroupId: string;
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeGroupGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeGroupGetWithMembersAsyncParams = {
		id: string;
	};

	type AttributeGroupGetWithMembersAsyncParams = {
		/** 特性组ID列表 */
		Ids?: string[];
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type AttributeGroupIsAttributeInGroupAsyncParams = {
		attributeGroupId?: string;
		attributeId?: string;
	};

	type AttributeGroupRemoveAttributeFromGroupAsyncParams = {
		attributeGroupId?: string;
		attributeId?: string;
	};

	type AttributeGroupUpdateAsyncParams = {
		id: string;
	};

	type AttributeIsNameExistsAsyncParams = {
		name?: string;
		excludeId: string;
	};

	type AttributeUpdateAsyncParams = {
		id: string;
	};

	type BurnAbpErpCommonCustomerManagementCustomerContactsCreateUpdateCustomerContactDto = {
		extraProperties?: Record<string, any>;
		/** 联系人编码 */
		code: string;
		/** 客户ID */
		customerId: number;
		/** 客户编码 */
		customerCode: string;
		/** DT编码 */
		dtId?: string;
		/** 联系人姓名 */
		contactName: string;
		/** 性别 */
		sex?: string;
		/** 性别名称 */
		sexName?: string;
		/** 生日 */
		birthday?: string;
		/** 血型 */
		blood?: string;
		/** 电话 */
		tel?: string;
		/** 传真 */
		fax?: string;
		/** 手机 */
		mobile?: string;
		/** 邮箱 */
		email?: string;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
		/** 提交人 */
		submitter?: string;
		/** 提交日期 */
		submitDate?: string;
		/** 审核人 */
		checker?: string;
		/** 审核日期 */
		checkDate?: string;
		/** 更新人 */
		updater?: string;
		/** 更新日期 */
		updateDate?: string;
		/** 职务 */
		duty?: string;
		/** 住址 */
		dwellingPlace?: string;
		/** 是否主要联系人 */
		isMainContact?: string;
	};

	type BurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 联系人编码 */
		code?: string;
		/** 客户ID */
		customerId?: number;
		/** 客户编码 */
		customerCode?: string;
		/** DT编码 */
		dtId?: string;
		/** 联系人姓名 */
		contactName?: string;
		/** 性别 */
		sex?: string;
		/** 性别名称 */
		sexName?: string;
		/** 生日 */
		birthday?: string;
		/** 血型 */
		blood?: string;
		/** 电话 */
		tel?: string;
		/** 传真 */
		fax?: string;
		/** 手机 */
		mobile?: string;
		/** 邮箱 */
		email?: string;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
		/** 提交人 */
		submitter?: string;
		/** 提交日期 */
		submitDate?: string;
		/** 审核人 */
		checker?: string;
		/** 审核日期 */
		checkDate?: string;
		/** 更新人 */
		updater?: string;
		/** 更新日期 */
		updateDate?: string;
		/** 职务 */
		duty?: string;
		/** 住址 */
		dwellingPlace?: string;
		/** 是否主要联系人 */
		isMainContact?: string;
	};

	type BurnAbpErpCommonCustomerManagementCustomersCreateCustomerInput = {
		extraProperties?: Record<string, any>;
		/** 客户编码 */
		code: string;
		/** 客户名称 */
		name: string;
		/** 客户简称 */
		abbName: string;
		/** 客户地址 */
		address?: string;
		/** 联系电话 */
		tel?: string;
		/** 供应商代码 --代表我方在客户系统的代码 */
		vendorCode?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonCustomerManagementCustomersCustomerDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 客户编码 */
		code?: string;
		/** 客户名称 */
		name?: string;
		/** 客户简称 */
		abbName?: string;
		/** 客户地址 */
		address?: string;
		/** 联系电话 */
		tel?: string;
		/** 单价含税否：0 未税；1 含税 */
		priceIsTax?: string;
		/** 结算方式(信息来自PayMent) */
		payMethod?: string;
		/** 发票编码(信息来自InvoiceType) */
		invoiceCode?: string;
		/** 货币编码(信息来自ExchangeRate) */
		currencyCode?: string;
		/** 交易方式：10 定金采购款到发货；20 定金采购货到付款；30 定金方式款到发货；40 定金方式货到付款；50 款到发货；60 货到付款；70 按月月结；80 按单月结 */
		businessType?: string;
		/** 定金比例 */
		earnest?: number;
		/** 销售员编码 */
		salesmanCode?: string;
		/** 销售员 */
		salesmanName?: string;
		/** 供应商代码 --代表我方在客户系统的代码 */
		vendorCode?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonCustomerManagementCustomersUpdateCustomerInput = {
		extraProperties?: Record<string, any>;
		/** 客户编码 */
		code: string;
		/** 客户名称 */
		name: string;
		/** 客户简称 */
		abbName: string;
		/** 客户地址 */
		address?: string;
		/** 联系电话 */
		tel?: string;
		/** 供应商代码 --代表我方在客户系统的代码 */
		vendorCode?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementDepartmentsCreateDepartmentInput = {
		extraProperties?: Record<string, any>;
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 地址 */
		address?: string;
	};

	type BurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 地址 */
		address?: string;
	};

	type BurnAbpErpCommonDepartmentManagementDepartmentsUpdateDepartmentDto = {
		extraProperties?: Record<string, any>;
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 地址 */
		address?: string;
	};

	type BurnAbpErpCommonDepartmentManagementEmployeesCreateEmployeeInput = {
		extraProperties?: Record<string, any>;
		/** 工号 */
		code: string;
		/** 用户姓名 */
		name: string;
		/** 头像Blob名称 */
		avatarBlobName?: string;
		sex?: BurnAbpErpCommonDepartmentManagementEmployeesEmployeeSex;
		/** 出生日期 */
		birthday?: string;
		/** 身份证号 */
		idCode?: string;
		/** 邮箱 */
		email?: string;
		/** 婚姻状态 */
		marriage?: string;
		/** 手机号 */
		mobile?: string;
		/** 联系电话 */
		tel?: string;
		/** 联系地址 */
		address?: string;
		/** 入职日期 */
		hireDate?: string;
		/** 紧急联系人 */
		contactMan?: string;
		/** 紧急联系电话 */
		contactTel?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 班组编码 */
		workTeamCode?: string;
		/** 班组名称 */
		workTeamName?: string;
		/** 备注 */
		memo?: string;
		/** 状态 0 离职 */
		status?: string;
	};

	type BurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 工号 */
		code?: string;
		/** 用户姓名 */
		name?: string;
		/** 头像Blob名称 */
		avatarBlobName?: string;
		sex?: BurnAbpErpCommonDepartmentManagementEmployeesEmployeeSex;
		/** 出生日期 */
		birthday?: string;
		/** 身份证号 */
		idCode?: string;
		/** 邮箱 */
		email?: string;
		/** 婚姻状态 */
		marriage?: string;
		/** 手机号 */
		mobile?: string;
		/** 联系电话 */
		tel?: string;
		/** 联系地址 */
		address?: string;
		/** 入职日期 */
		hireDate?: string;
		/** 紧急联系人 */
		contactMan?: string;
		/** 紧急联系电话 */
		contactTel?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 班组编码 */
		workTeamCode?: string;
		/** 班组名称 */
		workTeamName?: string;
		/** 备注 */
		memo?: string;
		/** 状态 0 离职 */
		status?: string;
	};

	type BurnAbpErpCommonDepartmentManagementEmployeesEmployeeSex = 0 | 1;

	type BurnAbpErpCommonDepartmentManagementEmployeesUpdateEmployeeInput = {
		extraProperties?: Record<string, any>;
		/** 工号 */
		code: string;
		/** 用户姓名 */
		name: string;
		/** 头像Blob名称 */
		avatarBlobName?: string;
		sex?: BurnAbpErpCommonDepartmentManagementEmployeesEmployeeSex;
		/** 出生日期 */
		birthday?: string;
		/** 身份证号 */
		idCode?: string;
		/** 邮箱 */
		email?: string;
		/** 婚姻状态 */
		marriage?: string;
		/** 手机号 */
		mobile?: string;
		/** 联系电话 */
		tel?: string;
		/** 联系地址 */
		address?: string;
		/** 入职日期 */
		hireDate?: string;
		/** 紧急联系人 */
		contactMan?: string;
		/** 紧急联系电话 */
		contactTel?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 班组编码 */
		workTeamCode?: string;
		/** 班组名称 */
		workTeamName?: string;
		/** 备注 */
		memo?: string;
		/** 状态 0 离职 */
		status?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkCentersAddUserToWorkCenterDto = {
		workCenterCode?: string;
		users?: BurnAbpErpCommonDepartmentManagementWorkCentersWorkCenterUserDto[];
	};

	type BurnAbpErpCommonDepartmentManagementWorkCentersCreateUpdateWorkCenterDto = {
		/** 工作中心编码 */
		code: string;
		/** 工作中心名称 */
		name: string;
		/** 车间编码 */
		workShopCode?: string;
		/** 车间名称 */
		workShopName?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 类型 */
		type?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkCentersRemoveUserWithWorkCenterDto = {
		workCenterCode?: string;
		users?: BurnAbpErpCommonDepartmentManagementWorkCentersWorkCenterUserDto[];
	};

	type BurnAbpErpCommonDepartmentManagementWorkCentersWorkCenterDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 车间编码 */
		workShopCode?: string;
		/** 车间名称 */
		workShopName?: string;
		/** 部门编码 */
		departCode?: string;
		/** 部门名称 */
		departName?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkCentersWorkCenterUserDto = {
		userName?: string;
		name?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkLinesCreateUpdateWorkLineDto = {
		/** 线体编码 */
		code: string;
		/** 线体名称 */
		name: string;
		/** 车间编码 */
		workCode?: string;
		/** 车间名称 */
		workName?: string;
		/** 班组编码 */
		workTeamCode?: string;
		/** 班组名称 */
		workTeamName?: string;
		/** 开始时间 */
		startTime?: string;
		/** 结束时间 */
		endTime?: string;
		/** 工位数量 */
		stationNum?: number;
		/** 人员数量 */
		employNum?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 线体编码 */
		code?: string;
		/** 线体名称 */
		name?: string;
		/** 车间编码 */
		workCode?: string;
		/** 车间名称 */
		workName?: string;
		/** 班组编码 */
		workTeamCode?: string;
		/** 班组名称 */
		workTeamName?: string;
		/** 生效时间 */
		startTime?: string;
		/** 失效时间 */
		endTime?: string;
		/** 岗位数量 */
		stationNum?: number;
		/** 员工数量 */
		employNum?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkShopsCreateUpdateWorkShopDto = {
		/** 车间编码 */
		code: string;
		/** 车间名称 */
		name: string;
		/** 入库库房 */
		warehouseCode?: string;
		/** 是否为外协车间 */
		isOut?: boolean;
		/** 车间类型 */
		workType?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 车间编码 */
		code?: string;
		/** 车间名称 */
		name?: string;
		/** 入库库房 */
		warehouseCode?: string;
		/** 是否为外协车间 */
		isOut?: boolean;
		/** 车间类型 */
		workType?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkTeamsCreateUpdateWorkTeamDto = {
		extraProperties?: Record<string, any>;
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 车间编码 */
		workCenterCode?: string;
		/** 组长编码 */
		teamLeadCode?: string;
		/** 组长姓名 */
		teamLeadName?: string;
		/** 联系方式 */
		leadTel?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonDepartmentManagementWorkTeamsWorkTeamDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 车间编码 */
		workCenterCode?: string;
		/** 组长编码 */
		teamLeadCode?: string;
		/** 组长姓名 */
		teamLeadName?: string;
		/** 联系方式 */
		leadTel?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementCurrenciesCreateUpdateCurrencyDto = {
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 英文名称 */
		nameEN?: string;
		/** 简称 */
		abbName?: string;
		/** 英文简称 */
		abbNameEN?: string;
		/** 税率 */
		rate?: number;
		/** 汇率 */
		exchangeRate?: number;
		/** 美元汇率 */
		exchangeRateUS?: number;
		/** 是否本位币：0 不是；1 是 */
		isAccountCurrency?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementCurrenciesCurrencyDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 英文名称 */
		nameEN?: string;
		/** 简称 */
		abbName?: string;
		/** 英文简称 */
		abbNameEN?: string;
		/** 税率 */
		rate?: number;
		/** 汇率 */
		exchangeRate?: number;
		/** 美元汇率 */
		exchangeRateUS?: number;
		/** 是否本位币：0 不是；1 是 */
		isAccountCurrency?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCreateUpdateCustomerCreditRatingDto = {
		/** 参数类别：10 信誉额度控制；20；30 预期天数控制 */
		type?: string;
		/** 超额百分比 */
		rating?: number;
		/** 处理方式：10 预警；20 严重预警；30 采取措施；40 停止做单送货 */
		controlType?: string;
		/** 提示信息 */
		prompt?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto = {
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
		/** 参数类别：10 信誉额度控制；20；30 预期天数控制 */
		type?: string;
		/** 超额百分比 */
		rating?: number;
		/** 处理方式：10 预警；20 严重预警；30 采取措施；40 停止做单送货 */
		controlType?: string;
		/** 提示信息 */
		prompt?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCreateUpdateCustomerDeliveryAddressDto = {
		/** 客户ID */
		customerId?: number;
		/** 送货地址 */
		address?: string;
		/** 运费天数 */
		freightDays?: number;
		/** 更改类型：10 新增；20 修改；30 失效 */
		flag?: string;
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto = {
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
		/** 客户ID */
		customerId?: number;
		/** 送货地址 */
		address?: string;
		/** 运费天数 */
		freightDays?: number;
		/** 更改类型：10 新增；20 修改；30 失效 */
		flag?: string;
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenCreateUpdateDeliveryManDto = {
		/** 编码 */
		code: string;
		/** 姓名 */
		name: string;
		/** 组织代码 */
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
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto = {
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
		/** 编码 */
		code?: string;
		/** 姓名 */
		name?: string;
		/** 组织代码 */
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
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysCreateUpdateDeliveryWayDto = {
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 英文名称 */
		nameEN?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto = {
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
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 英文名称 */
		nameEN?: string;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsCreateUpdatePaymentMethodDto = {
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 英文名称 */
		nameEN?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 英文名称 */
		nameEN?: string;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementPriceClausesCreateUpdatePriceClauseDto = {
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementTaxRatesCreateUpdateTaxRateDto = {
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 英文名称 */
		nameEN?: string;
		/** 税率 */
		rate?: number;
		/** 备注 */
		memo?: string;
		/** 状态 */
		status?: string;
		/** 序号 */
		showSort?: number;
	};

	type BurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 英文名称 */
		nameEN?: string;
		/** 税率 */
		rate?: number;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	type BurnAbpErpCommonMaterialComFromInfosMaterialComFromInfoModel = {
		comFormCode?: string;
		comFormName?: string;
		comeFormTypeCode?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		comeFormTypeName?: string;
	};

	type BurnAbpErpCommonMaterialManagementAssetsAssetDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 内控编码 */
		code?: string;
		/** 物料分类编码 */
		materialCategoryCode?: string;
		/** 物料分类名称 */
		materialCategoryName?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 型号 */
		model?: string;
		/** 资产数量 */
		quantity?: number;
		/** 客户 */
		customerCode?: string;
		customerName?: string;
		/** 库房编码 */
		warehouseCode?: string;
		/** 库房名称 */
		warehouseName?: string;
		/** 库位 */
		location?: string;
		/** 管理员 */
		manager?: string;
		assetStatus?: BurnAbpErpCommonMaterialManagementAssetsAssetStatus;
		positionStatus?: BurnAbpErpCommonMaterialManagementAssetsPositionStatus;
		usageStatus?: BurnAbpErpCommonMaterialManagementAssetsUsageStatus;
		/** 盘点日期 */
		inventoryDate?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpErpCommonMaterialManagementAssetsAssetStatus = 0 | 1;

	type BurnAbpErpCommonMaterialManagementAssetsCreateAssetInput = {
		extraProperties?: Record<string, any>;
		/** 内控编码 */
		code: string;
		/** 物料分类编码 */
		materialCategoryCode?: string;
		/** 物料分类名称 */
		materialCategoryName?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 型号 */
		model?: string;
		/** 资产数量 */
		quantity?: number;
		/** 客户 */
		customerCode?: string;
		customerName?: string;
		/** 库房编码 */
		warehouseCode?: string;
		/** 库房名称 */
		warehouseName?: string;
		/** 库位 */
		location?: string;
		/** 管理员 */
		manager?: string;
		assetStatus?: BurnAbpErpCommonMaterialManagementAssetsAssetStatus;
		positionStatus?: BurnAbpErpCommonMaterialManagementAssetsPositionStatus;
		usageStatus?: BurnAbpErpCommonMaterialManagementAssetsUsageStatus;
		/** 盘点日期 */
		inventoryDate?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpErpCommonMaterialManagementAssetsPositionStatus = 0 | 1 | 2;

	type BurnAbpErpCommonMaterialManagementAssetsUpdateAssetInput = {
		extraProperties?: Record<string, any>;
		/** 内控编码 */
		code: string;
		/** 物料分类编码 */
		materialCategoryCode?: string;
		/** 物料分类名称 */
		materialCategoryName?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 型号 */
		model?: string;
		/** 资产数量 */
		quantity?: number;
		/** 客户 */
		customerCode?: string;
		customerName?: string;
		/** 库房编码 */
		warehouseCode?: string;
		/** 库房名称 */
		warehouseName?: string;
		/** 库位 */
		location?: string;
		/** 管理员 */
		manager?: string;
		assetStatus?: BurnAbpErpCommonMaterialManagementAssetsAssetStatus;
		positionStatus?: BurnAbpErpCommonMaterialManagementAssetsPositionStatus;
		usageStatus?: BurnAbpErpCommonMaterialManagementAssetsUsageStatus;
		/** 盘点日期 */
		inventoryDate?: string;
		/** 备注 */
		remark?: string;
	};

	type BurnAbpErpCommonMaterialManagementAssetsUsageStatus = 0 | 1 | 2 | 3 | 4;

	type BurnAbpErpCommonMaterialManagementAttributeGroupsAddAttributeToGroupDto = {
		/** 特性组ID */
		attributeGroupId: string;
		/** 特性ID */
		attributeId: string;
	};

	type BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto = {
		extraProperties?: Record<string, any>;
		/** 特性组ID */
		id?: string;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 名称 */
		name?: string;
		/** 描述 */
		description?: string;
		/** 特性组成员列表 */
		members?: BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupMemberDto[];
		/** 特性数量 */
		attributeCount?: number;
	};

	type BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupMemberDto = {
		extraProperties?: Record<string, any>;
		/** 成员ID */
		id?: string;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 特性组ID */
		attributeGroupId?: string;
		/** 特性ID */
		attributeId?: string;
		/** 特性名称 */
		attributeName?: string;
		/** 特性显示名称 */
		attributeDisplayName?: string;
		attribute?: BurnAbpErpCommonMaterialManagementAttributesAttributeDto;
	};

	type BurnAbpErpCommonMaterialManagementAttributeGroupsCreateAttributeGroupDto = {
		/** 特性组ID */
		id: string;
		/** 名称 */
		name: string;
		/** 描述 */
		description?: string;
	};

	type BurnAbpErpCommonMaterialManagementAttributeGroupsUpdateAttributeGroupDto = {
		/** 名称 */
		name: string;
		/** 描述 */
		description?: string;
	};

	type BurnAbpErpCommonMaterialManagementAttributesAttributeDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		/** 特性编码 */
		name?: string;
		/** 特性显示名称 */
		displayName?: string;
		/** 数据类型 */
		dataType?: number;
		/** 是否必填 */
		required?: boolean;
		/** 附加数据 */
		attachData?: string;
		/** 所属的特性组列表 */
		attributeGroups?: BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto[];
		/** 特性值列表 */
		attributeValues?: BurnAbpErpCommonMaterialManagementAttributesAttributeValueDto[];
	};

	type BurnAbpErpCommonMaterialManagementAttributesAttributeValueDto = {
		extraProperties?: Record<string, any>;
		id?: string;
		/** 特性ID */
		attributeId?: string;
		/** 特性值 */
		value?: string;
		objectDependencyType?: BurnAbpErpCommonMaterialManagementAttributesObjectDependencyType;
		/** 对象依赖 */
		objectDependency?: string;
	};

	type BurnAbpErpCommonMaterialManagementAttributesCreateAttributeDto = {
		/** 特性编码 */
		name: string;
		/** 特性显示名称 */
		displayName: string;
		/** 数据类型 */
		dataType?: number;
		/** 是否必填 */
		required?: boolean;
		/** 附加数据 */
		attachData?: string;
	};

	type BurnAbpErpCommonMaterialManagementAttributesObjectDependencyType = 0 | 1 | 2;

	type BurnAbpErpCommonMaterialManagementAttributesUpdateAttributeDto = {
		/** 特性编码 */
		name: string;
		/** 特性显示名称 */
		displayName: string;
		/** 数据类型 */
		dataType?: number;
		/** 是否必填 */
		required?: boolean;
		/** 附加数据 */
		attachData?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialClassesCreateMaterialClassInput = {
		extraProperties?: Record<string, any>;
		/** 父ID */
		parentId?: number;
		/** 分类编码 */
		code: string;
		/** 分类名称 */
		name: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialClassesMaterialClassDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 父ID */
		parentId?: number;
		/** 分类编码 */
		code?: string;
		/** 分类名称 */
		name?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialClassesUpdateMaterialClassInput = {
		extraProperties?: Record<string, any>;
		/** 父ID */
		parentId?: number;
		/** 分类编码 */
		code: string;
		/** 分类名称 */
		name: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialComFromInfosCreateUpdateMaterialComFromInfoDto = {
		/** 来源编码 */
		comFromCode: string;
		/** 来源名称 */
		comFromName: string;
		comeFromTypeCode: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** 来源类型名称 */
		comeFromTypeName: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		isDeleted?: boolean;
		deleterId?: string;
		deletionTime?: string;
		/** 来源编码 */
		comFromCode?: string;
		/** 来源名称 */
		comFromName?: string;
		comeFromTypeCode?: BurnAbpErpCommonMaterialComFromInfosMaterialComeFromType;
		/** 来源类型名称 */
		comeFromTypeName?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialEditionsCreateUpdateMaterialEditionDto = {
		/** 物料编码 */
		code: string;
		/** 版本号 */
		version: string;
		/** 生效时间 */
		startDate?: string;
		/** 结束时间 */
		endDate?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto = {
		id?: number;
		/** 物料编码 */
		code?: string;
		/** 版本号 */
		version?: string;
		/** 生效时间 */
		startDate?: string;
		/** 结束时间 */
		endDate?: string;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialsCreateMaterialInput = {
		/** 物料编码 */
		code: string;
		/** 物料外码 */
		outCode?: string;
		/** 物料分类(信息来自MainClass) */
		classCode?: string;
		/** 基本单位编码(信息来自Units表) */
		unitCode?: string;
		/** 基本单位编码(信息来自Units表) */
		unitName?: string;
		/** 来源（信息自定义时，来源sysComeFrom表） */
		comeFrom?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 物料描述 */
		description?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 英文描述 */
		engDescription?: string;
		/** 对外英文描述 */
		outEngDescription?: string;
		/** 项目英文描述    --兼容OutEngDescription 没有值则选择 EngItemsDescription */
		engItemsDescription?: string;
		/** 工艺路线编码 */
		craftRouteCode?: string;
		/** 节拍 */
		ct?: number;
		/** 颜色代码 */
		colorCode?: string;
		/** 材质编码 */
		materialPropertyCode?: string;
		/** 长（单位：mm） */
		length?: number;
		/** 宽（单位：mm） */
		width?: number;
		/** 厚（单位：mm） */
		thickness?: number;
		/** 面积 */
		area?: number;
		/** 产品工时 */
		productionHour?: number;
		/** EAN码 通用商品代码 */
		eanCode?: string;
		/** Upc 通用产品代码 */
		upcCode?: string;
		effectStatus?: BurnAbpErpCommonMaterialManagementMaterialsMaterialEffectStatus;
		status?: BurnAbpErpCommonMaterialManagementMaterialsMaterialStatus;
	};

	type BurnAbpErpCommonMaterialManagementMaterialsFormilySchemaDto = {
		type?: string;
		title?: string;
		description?: string;
		default?: string;
		readOnly?: string;
		writeOnly?: string;
		enum?: any[];
		required?: boolean;
		'x-component'?: string;
		'x-component-props'?: any;
		'x-decorator'?: string;
		properties?: Record<string, any>;
	};

	type BurnAbpErpCommonMaterialManagementMaterialsMaterialDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 物料编码 */
		code?: string;
		/** 物料外码 */
		outCode?: string;
		/** 物料分类(信息来自MainClass) */
		classCode?: string;
		/** 基本单位编码(信息来自Units表) */
		unitCode?: string;
		/** 基本单位编码(信息来自Units表) */
		unitName?: string;
		/** 来源（信息自定义时，来源sysComeFrom表） */
		comeFrom?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 物料描述 */
		description?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 英文描述 */
		engDescription?: string;
		/** 对外英文描述 */
		outEngDescription?: string;
		/** 项目英文描述    --兼容OutEngDescription 没有值则选择 EngItemsDescription */
		engItemsDescription?: string;
		/** 工艺路线编码 */
		craftRouteCode?: string;
		/** 节拍 */
		ct?: number;
		/** 颜色代码 */
		colorCode?: string;
		/** 材质编码 */
		materialPropertyCode?: string;
		/** 长（单位：mm） */
		length?: number;
		/** 宽（单位：mm） */
		width?: number;
		/** 厚（单位：mm） */
		thickness?: number;
		/** 面积 */
		area?: number;
		/** 产品工时 */
		productionHour?: number;
		/** EAN码 通用商品代码 */
		eanCode?: string;
		/** Upc 通用产品代码 */
		upcCode?: string;
		/** 销售单价 */
		salePrice?: number;
		/** 采购单价 */
		purchasePrice?: number;
		/** 特性组编码 */
		attributeGroupId?: string;
		entityVersion?: number;
		effectStatus?: BurnAbpErpCommonMaterialManagementMaterialsMaterialEffectStatus;
		status?: BurnAbpErpCommonMaterialManagementMaterialsMaterialStatus;
		/** 提交人 */
		submitter?: string;
		/** 提交时间 */
		submissionDate?: string;
		/** 最后审核人 */
		reviewer?: string;
		/** 审核时间 */
		reviewDate?: string;
	};

	type BurnAbpErpCommonMaterialManagementMaterialsMaterialEffectStatus = 1 | 5 | 10 | 15;

	type BurnAbpErpCommonMaterialManagementMaterialsMaterialStatus = 1 | 2 | 4 | 6;

	type BurnAbpErpCommonMaterialManagementMaterialsUpdateMaterialInput = {
		/** 物料编码 */
		code: string;
		/** 物料外码 */
		outCode?: string;
		/** 物料分类(信息来自MainClass) */
		classCode?: string;
		/** 基本单位编码(信息来自Units表) */
		unitCode?: string;
		/** 基本单位编码(信息来自Units表) */
		unitName?: string;
		/** 来源（信息自定义时，来源sysComeFrom表） */
		comeFrom?: string;
		/** 规格型号 */
		specificationModel?: string;
		/** 对外规格型号 */
		outSpecification?: string;
		/** 物料描述 */
		description?: string;
		/** 对外描述 */
		outDescription?: string;
		/** 英文描述 */
		engDescription?: string;
		/** 对外英文描述 */
		outEngDescription?: string;
		/** 项目英文描述    --兼容OutEngDescription 没有值则选择 EngItemsDescription */
		engItemsDescription?: string;
		/** 工艺路线编码 */
		craftRouteCode?: string;
		/** 节拍 */
		ct?: number;
		/** 颜色代码 */
		colorCode?: string;
		/** 材质编码 */
		materialPropertyCode?: string;
		/** 长（单位：mm） */
		length?: number;
		/** 宽（单位：mm） */
		width?: number;
		/** 厚（单位：mm） */
		thickness?: number;
		/** 面积 */
		area?: number;
		/** 产品工时 */
		productionHour?: number;
		/** EAN码 通用商品代码 */
		eanCode?: string;
		/** Upc 通用产品代码 */
		upcCode?: string;
		effectStatus?: BurnAbpErpCommonMaterialManagementMaterialsMaterialEffectStatus;
		status?: BurnAbpErpCommonMaterialManagementMaterialsMaterialStatus;
	};

	type BurnAbpErpCommonPartnerMaterialsCreatePartnerMaterialInput = {
		/** 类型 (Customer/Supplier) */
		type: string;
		/** 客户编码 */
		customerCode?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 物料编码 */
		materialCode: string;
		/** 物料外部编码 */
		materialOutCode: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 物料规格型号 */
		materialSpecificationModel?: string;
		/** 单位名称 */
		unitName?: string;
	};

	type BurnAbpErpCommonPartnerMaterialsPartnerMaterialDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 类型 (Customer/Supplier) */
		type?: string;
		/** 客户编码 */
		customerCode?: string;
		/** 供应商编码 */
		supplierCode?: string;
		/** 物料编码 */
		materialCode?: string;
		/** 物料外部编码 */
		materialOutCode?: string;
		/** 物料描述 */
		materialDescription?: string;
		/** 物料规格型号 */
		materialSpecificationModel?: string;
		/** 单位名称 */
		unitName?: string;
	};

	type BurnAbpErpCommonPartnerMaterialsUpdatePartnerMaterialInput = {
		/** 物料描述 */
		materialDescription?: string;
		/** 物料规格型号 */
		materialSpecificationModel?: string;
		/** 单位名称 */
		unitName?: string;
	};

	type BurnAbpErpCommonSupplierManagementSupplierContactsCreateUpdatePurSupplierContactDto = {
		extraProperties?: Record<string, any>;
		/** 联系人编码 */
		code: string;
		/** 联系人姓名 */
		name: string;
		/** 性别 */
		sex?: string;
		/** 生日 */
		birthday?: string;
		/** 血型 */
		blood?: string;
		/** 电话 */
		tel?: string;
		/** 传真 */
		fax?: string;
		/** 手机 */
		mobile?: string;
		/** 邮箱 */
		email?: string;
		/** 备注 */
		memo?: string;
		/** 职务 */
		duty?: string;
		/** 供应商ID */
		supplierId: number;
		/** 供应商编码 */
		supplierCode: string;
		/** DT编码 */
		dtId?: string;
		/** 住址 */
		dwellingPlace?: string;
		/** 是否主要联系人 */
		isMainContact?: string;
		/** 状态 */
		status?: string;
		/** 提交人 */
		submitter?: string;
		/** 提交日期 */
		submitDate?: string;
		/** 审核人 */
		checker?: string;
		/** 审核日期 */
		checkDate?: string;
		/** 更新人 */
		updater?: string;
		/** 更新日期 */
		updateDate?: string;
	};

	type BurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 联系人编码 */
		code?: string;
		/** 联系人姓名 */
		name?: string;
		/** 性别 */
		sex?: string;
		/** 生日 */
		birthday?: string;
		/** 血型 */
		blood?: string;
		/** 电话 */
		tel?: string;
		/** 传真 */
		fax?: string;
		/** 手机 */
		mobile?: string;
		/** 邮箱 */
		email?: string;
		/** 备注 */
		memo?: string;
		/** 职务 */
		duty?: string;
		/** 供应商ID */
		supplierId?: number;
		/** 供应商编码 */
		supplierCode?: string;
		/** DT编码 */
		dtId?: string;
		/** 住址 */
		dwellingPlace?: string;
		/** 是否主要联系人 */
		isMainContact?: string;
		/** 状态 */
		status?: string;
		/** 提交人 */
		submitter?: string;
		/** 提交日期 */
		submitDate?: string;
		/** 审核人 */
		checker?: string;
		/** 审核日期 */
		checkDate?: string;
		/** 更新人 */
		updater?: string;
		/** 更新日期 */
		updateDate?: string;
	};

	type BurnAbpErpCommonSupplierManagementSuppliersCreateSupplierInput = {
		extraProperties?: Record<string, any>;
		/** 供应商编码 */
		code: string;
		/** 供应商名称 */
		name: string;
		/** 供应商简称 */
		abbName: string;
		/** 地址 */
		address?: string;
		/** 联系电话 */
		tel?: string;
		/** 供应商代码 */
		vendorCode?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonSupplierManagementSuppliersSupplierDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 供应商编码 */
		code?: string;
		/** 供应商名称 */
		name?: string;
		/** 供应商简称 */
		abbName?: string;
		/** 地址 */
		address?: string;
		/** 联系电话 */
		tel?: string;
		/** 供应商代码 */
		vendorCode?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonSupplierManagementSuppliersUpdateSupplierInput = {
		extraProperties?: Record<string, any>;
		/** 供应商编码 */
		code?: string;
		/** 供应商名称 */
		name: string;
		/** 供应商简称 */
		abbName: string;
		/** 地址 */
		address?: string;
		/** 联系电话 */
		tel?: string;
		/** 供应商代码 */
		vendorCode?: string;
		/** 备注 */
		memo?: string;
	};

	type BurnAbpErpCommonUnitManagementUnitGroupsCreateUnitGroupInput = {
		/** 单位组编码 */
		code: string;
		/** 单位组名称 */
		name: string;
		unitType: BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupType;
	};

	type BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto = {
		id?: number;
		creationTime?: string;
		creatorId?: string;
		lastModificationTime?: string;
		lastModifierId?: string;
		/** 单位组编码 */
		code?: string;
		/** 单位组名称 */
		name?: string;
		unitType?: BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupType;
		/** 单位类型名称 */
		unitTypeName?: string;
	};

	type BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupType = 0 | 1 | 2;

	type BurnAbpErpCommonUnitManagementUnitGroupsUpdateUnitGroupInput = {
		/** 单位组名称 */
		name: string;
		unitType: BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupType;
	};

	type BurnAbpErpCommonUnitManagementUnitsBatchUnitConversionInput = {
		/** 源单位编码 */
		fromUnitCode: string;
		/** 目标单位编码 */
		toUnitCode: string;
		/** 需要转换的数量列表 */
		quantities: number[];
		/** 单位组ID（可选）
指定单位组以提高查询性能 */
		unitGroupId?: number;
	};

	type BurnAbpErpCommonUnitManagementUnitsCreateUpdateUnitInput = {
		/** 单位编码 */
		code: string;
		/** 单位名称 */
		name: string;
		/** 单位组主键 */
		unitGroupId?: number;
		/** 单位组编码 */
		unitGroupCode?: string;
		/** 是否主单位
主单位代表此单位分组中的基准单位 */
		isMainUnit?: boolean;
		/** 转换率
针对主单位的转换率 */
		exchangeRate?: number;
		/** 转换标志
0 乘以转换率，1 除以转换率 */
		exchangeFlag?: string;
	};

	type BurnAbpErpCommonUnitManagementUnitsUnitConversionInfoDto = {
		/** 源单位编码 */
		fromUnitCode?: string;
		/** 源单位名称 */
		fromUnitName?: string;
		/** 目标单位编码 */
		toUnitCode?: string;
		/** 目标单位名称 */
		toUnitName?: string;
		/** 转换率
从源单位转换到目标单位的乘数 */
		conversionRate?: number;
		/** 转换公式模板
例如："{quantity} {fromUnit} × {rate} = {result} {toUnit}" */
		formulaTemplate?: string;
		/** 示例转换公式
使用数量1进行示例计算
例如："1 米 × 100 = 100 厘米" */
		exampleFormula?: string;
		/** 单位组编码 */
		unitGroupCode?: string;
		/** 单位组名称 */
		unitGroupName?: string;
		/** 是否为同一单位 */
		isSameUnit?: boolean;
		/** 是否可逆转换
通常都可以逆转换，除非存在特殊业务限制 */
		isReversible?: boolean;
		/** 转换精度建议
建议保留的小数位数 */
		recommendedPrecision?: number;
		/** 备注信息 */
		remarks?: string;
	};

	type BurnAbpErpCommonUnitManagementUnitsUnitConversionInput = {
		/** 源单位编码 */
		fromUnitCode: string;
		/** 目标单位编码 */
		toUnitCode: string;
		/** 需要转换的数量 */
		quantity: number;
		/** 单位组ID（可选）
指定单位组以提高查询性能 */
		unitGroupId?: number;
	};

	type BurnAbpErpCommonUnitManagementUnitsUnitConversionResult = {
		/** 源单位编码 */
		fromUnitCode?: string;
		/** 源单位名称 */
		fromUnitName?: string;
		/** 目标单位编码 */
		toUnitCode?: string;
		/** 目标单位名称 */
		toUnitName?: string;
		/** 原始数量 */
		originalQuantity?: number;
		/** 转换后数量 */
		convertedQuantity?: number;
		/** 转换率 */
		conversionRate?: number;
		/** 转换公式描述
例如："1 米 × 100 = 100 厘米" */
		formula?: string;
		/** 单位组编码 */
		unitGroupCode?: string;
		/** 单位组名称 */
		unitGroupName?: string;
		/** 转换时间 */
		conversionTime?: string;
		/** 是否成功 */
		isSuccess?: boolean;
		/** 错误消息 */
		errorMessage?: string;
	};

	type BurnAbpErpCommonUnitManagementUnitsUnitConversionValidationResult = {
		/** 是否可以转换 */
		canConvert?: boolean;
		/** 验证消息 */
		message?: string;
		/** 错误列表 */
		errors?: string[];
		/** 警告列表 */
		warnings?: string[];
		fromUnit?: BurnAbpErpCommonUnitManagementUnitsUnitDto;
		toUnit?: BurnAbpErpCommonUnitManagementUnitsUnitDto;
		/** 单位组信息 */
		unitGroupName?: string;
		/** 预估转换率
仅在可以转换时有效 */
		estimatedConversionRate?: number;
	};

	type BurnAbpErpCommonUnitManagementUnitsUnitDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 单位编码 */
		code?: string;
		/** 单位名称 */
		name?: string;
		/** 单位组主键 */
		unitGroupId?: number;
		/** 单位组编码 */
		unitGroupCode?: string;
		/** 单位组名称 */
		unitGroupName?: string;
		/** 是否主单位
主单位代表此单位分组中的基准单位 */
		isMainUnit?: boolean;
		/** 转换率
针对主单位的转换率 */
		exchangeRate?: number;
		/** 转换标志
0 乘以转换率，1 除以转换率 */
		exchangeFlag?: string;
		/** 转换标志描述 */
		exchangeFlagDescription?: string;
		/** 排序顺序 */
		sortOrder?: number;
		/** 转换公式描述
描述如何转换到主单位 */
		conversionDescription?: string;
	};

	type BurnAbpErpCommonUnitManagementUnitsUnitGroupUnitsDto = {
		/** 单位组ID */
		id?: number;
		/** 单位组编码 */
		code?: string;
		/** 单位组名称 */
		name?: string;
		/** 单位类型 */
		unitType?: string;
		/** 单位类型名称 */
		unitTypeName?: string;
		mainUnit?: BurnAbpErpCommonUnitManagementUnitsUnitDto;
		/** 单位列表 */
		units?: BurnAbpErpCommonUnitManagementUnitsUnitDto[];
		/** 是否可以进行转换
无换算类型的单位组不能进行转换 */
		canConvert?: boolean;
		/** 单位数量 */
		unitCount?: number;
		/** 是否有主单位 */
		hasMainUnit?: boolean;
	};

	type BurnAbpErpCommonWarehouseManagementsLocationsCreateLocationInput = {
		extraProperties?: Record<string, any>;
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 备注 */
		remark?: string;
		/** 仓库Id */
		warehouseId?: number;
	};

	type BurnAbpErpCommonWarehouseManagementsLocationsLocationDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 编码 */
		code?: string;
		/** 名称 */
		name?: string;
		/** 备注 */
		remark?: string;
		/** 仓库Id */
		warehouseId?: number;
		warehouse?: BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto;
	};

	type BurnAbpErpCommonWarehouseManagementsLocationsUpdateLocationInput = {
		extraProperties?: Record<string, any>;
		/** 编码 */
		code: string;
		/** 名称 */
		name: string;
		/** 备注 */
		remark?: string;
		/** 仓库Id */
		warehouseId?: number;
	};

	type BurnAbpErpCommonWarehouseManagementsWarehousesCreateWarehouseInput = {
		extraProperties?: Record<string, any>;
		/** 库房编码 */
		code: string;
		/** 库房名称 */
		name: string;
		/** 库房地址 */
		address?: string;
		/** 库房联系人 */
		contact?: string;
		/** 联系人电话 */
		tel?: string;
		/** 备注信息 */
		memo?: string;
	};

	type BurnAbpErpCommonWarehouseManagementsWarehousesUpdateWarehouseInput = {
		extraProperties?: Record<string, any>;
		/** 库房编码 */
		code: string;
		/** 库房名称 */
		name: string;
		/** 库房地址 */
		address?: string;
		/** 库房联系人 */
		contact?: string;
		/** 联系人电话 */
		tel?: string;
		/** 备注信息 */
		memo?: string;
	};

	type BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto = {
		extraProperties?: Record<string, any>;
		id?: number;
		/** 创建人 */
		creator?: string;
		/** 创建时间 */
		creationTime?: string;
		/** 修改人 */
		lastModifier?: string;
		/** 修改时间 */
		lastModificationTime?: string;
		/** 库房编码 */
		code?: string;
		/** 库房名称 */
		name?: string;
		/** 库房地址 */
		address?: string;
		/** 库房联系人 */
		contact?: string;
		/** 联系人电话 */
		tel?: string;
		/** 备注信息 */
		memo?: string;
	};

	type CurrencyDeleteAsyncParams = {
		id: number;
	};

	type CurrencyExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CurrencyGetAsyncParams = {
		id: number;
	};

	type CurrencyGetByCodeAsyncParams = {
		/** 货币编码 */
		code?: string;
	};

	type CurrencyGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CurrencyUpdateAsyncParams = {
		id: number;
	};

	type CustomerContactDeleteAsyncParams = {
		id: number;
	};

	type CustomerContactExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerContactGetAsyncParams = {
		id: number;
	};

	type CustomerContactGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerContactGetMainContactAsyncParams = {
		customerCode?: string;
	};

	type CustomerContactUpdateAsyncParams = {
		/** 联系人ID */
		id: number;
	};

	type CustomerCreditRatingDeleteAsyncParams = {
		id: number;
	};

	type CustomerCreditRatingGetAsyncParams = {
		id: number;
	};

	type CustomerCreditRatingGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerCreditRatingUpdateAsyncParams = {
		id: number;
	};

	type CustomerDeleteAsyncParams = {
		id: number;
	};

	type CustomerDeliveryAddressDeleteAsyncParams = {
		id: number;
	};

	type CustomerDeliveryAddressGetAsyncParams = {
		id: number;
	};

	type CustomerDeliveryAddressGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerDeliveryAddressUpdateAsyncParams = {
		id: number;
	};

	type CustomerExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerGetAsyncParams = {
		id: number;
	};

	type CustomerGetByCodeAsyncParams = {
		/** 客户编码 */
		code?: string;
	};

	type CustomerGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type CustomerUpdateAsyncParams = {
		id: number;
	};

	type DeliveryManDeleteAsyncParams = {
		id: number;
	};

	type DeliveryManGetAsyncParams = {
		id: number;
	};

	type DeliveryManGetByCodeAsyncParams = {
		/** 送货员编码 */
		code?: string;
	};

	type DeliveryManGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DeliveryManUpdateAsyncParams = {
		id: number;
	};

	type DeliveryWayDeleteAsyncParams = {
		id: number;
	};

	type DeliveryWayExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DeliveryWayGetAsyncParams = {
		id: number;
	};

	type DeliveryWayGetByCodeAsyncParams = {
		/** 交货方式编码 */
		code?: string;
	};

	type DeliveryWayGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type DeliveryWayUpdateAsyncParams = {
		id: number;
	};

	type DepartmentDeleteAsyncParams = {
		id: number;
	};

	type DepartmentExportAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
		ExtraProperties?: Record<string, any>;
	};

	type DepartmentGetAsyncParams = {
		id: number;
	};

	type DepartmentGetByCodeAsyncParams = {
		/** 部门编码 */
		code?: string;
	};

	type DepartmentGetListAsyncParams = {
		Filter?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
		ExtraProperties?: Record<string, any>;
	};

	type DepartmentUpdateAsyncParams = {
		id: number;
	};

	type EmployeeDeleteAsyncParams = {
		id: number;
	};

	type EmployeeExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type EmployeeGetAsyncParams = {
		id: number;
	};

	type EmployeeGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type EmployeeUpdateAsyncParams = {
		id: number;
	};

	type LocationDeleteAsyncParams = {
		id: number;
	};

	type LocationExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LocationGetAsyncParams = {
		id: number;
	};

	type LocationGetByCodeAsyncParams = {
		/** 库位编码 */
		code?: string;
	};

	type LocationGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type LocationUpdateAsyncParams = {
		id: number;
	};

	type MaterialClassDeleteAsyncParams = {
		id: number;
	};

	type MaterialClassExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialClassGetAsyncParams = {
		id: number;
	};

	type MaterialClassGetByCodeAsyncParams = {
		/** 物料分类编码 */
		code?: string;
	};

	type MaterialClassGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialClassUpdateAsyncParams = {
		id: number;
	};

	type MaterialComFromInfoDeleteAsyncParams = {
		id: number;
	};

	type MaterialComFromInfoGetAsyncParams = {
		id: number;
	};

	type MaterialComFromInfoGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialComFromInfoUpdateAsyncParams = {
		id: number;
	};

	type MaterialDeleteAsyncParams = {
		id: number;
	};

	type MaterialEditionDeleteAsyncParams = {
		id: number;
	};

	type MaterialEditionGetAllVersionsAsyncParams = {
		code?: string;
	};

	type MaterialEditionGetAsyncParams = {
		id: number;
	};

	type MaterialEditionGetEffectiveVersionAsyncParams = {
		code?: string;
	};

	type MaterialEditionGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialEditionUpdateAsyncParams = {
		id: number;
	};

	type MaterialExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialGetAsyncParams = {
		id: number;
	};

	type MaterialGetAttributeFormAsyncParams = {
		materialId: number;
	};

	type MaterialGetByCodeAsyncParams = {
		/** 物料编码 */
		code?: string;
	};

	type MaterialGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type MaterialGetMaterialAttributeListAsyncParams = {
		materialId: number;
	};

	type MaterialUpdateAsyncParams = {
		/** 物料ID */
		id: number;
	};

	type PartnerMaterialDeleteAsyncParams = {
		id: number;
	};

	type PartnerMaterialExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartnerMaterialGetAsyncParams = {
		id: number;
	};

	type PartnerMaterialGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PartnerMaterialUpdateAsyncParams = {
		id: number;
	};

	type PaymentMethodDeleteAsyncParams = {
		id: number;
	};

	type PaymentMethodGetAsyncParams = {
		id: number;
	};

	type PaymentMethodGetByCodeAsyncParams = {
		/** 支付方式编码 */
		code?: string;
	};

	type PaymentMethodGetListAsyncParams = {
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PaymentMethodUpdateAsyncParams = {
		id: number;
	};

	type PriceClauseDeleteAsyncParams = {
		id: number;
	};

	type PriceClauseExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PriceClauseGetAsyncParams = {
		id: number;
	};

	type PriceClauseGetByCodeAsyncParams = {
		/** 价格条款编码 */
		code?: string;
	};

	type PriceClauseGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PriceClauseUpdateAsyncParams = {
		id: number;
	};

	type PurSupplierContactDeleteAsyncParams = {
		id: number;
	};

	type PurSupplierContactExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PurSupplierContactGetAsyncParams = {
		id: number;
	};

	type PurSupplierContactGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type PurSupplierContactUpdateAsyncParams = {
		/** 联系人ID */
		id: number;
	};

	type SupplierDeleteAsyncParams = {
		id: number;
	};

	type SupplierExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type SupplierGetAsyncParams = {
		id: number;
	};

	type SupplierGetByCodeAsyncParams = {
		/** 供应商编码 */
		code?: string;
	};

	type SupplierGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type SupplierUpdateAsyncParams = {
		id: number;
	};

	type TaxRateDeleteAsyncParams = {
		id: number;
	};

	type TaxRateExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TaxRateGetAsyncParams = {
		id: number;
	};

	type TaxRateGetByCodeAsyncParams = {
		/** 税率编码 */
		code?: string;
	};

	type TaxRateGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type TaxRateUpdateAsyncParams = {
		id: number;
	};

	type UnitDeleteAsyncParams = {
		id: number;
	};

	type UnitExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UnitGetAsyncParams = {
		id: number;
	};

	type UnitGetByCodeAsyncParams = {
		/** 单位编码 */
		code?: string;
	};

	type UnitGetConversionInfoAsyncParams = {
		/** 源单位编码 */
		FromUnitCode: string;
		/** 目标单位编码 */
		ToUnitCode: string;
		/** 单位组ID（可选）
指定单位组以提高查询性能 */
		UnitGroupId?: number;
	};

	type UnitGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UnitGetUnitGroupUnitsAsyncParams = {
		unitGroupId: number;
	};

	type UnitGroupDeleteAsyncParams = {
		id: number;
	};

	type UnitGroupExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UnitGroupGetAsyncParams = {
		id: number;
	};

	type UnitGroupGetByCodeAsyncParams = {
		/** 单位组编码 */
		code?: string;
	};

	type UnitGroupGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type UnitGroupUpdateAsyncParams = {
		id: number;
	};

	type UnitSetMainUnitAsyncParams = {
		unitId: number;
	};

	type UnitUpdateAsyncParams = {
		id: number;
	};

	type UnitValidateConversionAsyncParams = {
		fromUnitCode?: string;
		toUnitCode?: string;
	};

	type VoloAbpApplicationDtosListResultDtoBurnAbpErpCommonMaterialManagementAttributesAttributeDto = {
		items?: BurnAbpErpCommonMaterialManagementAttributesAttributeDto[];
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto = {
		items?: BurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonCustomerManagementCustomersCustomerDto = {
		items?: BurnAbpErpCommonCustomerManagementCustomersCustomerDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto = {
		items?: BurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto = {
		items?: BurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementWorkCentersWorkCenterDto = {
		items?: BurnAbpErpCommonDepartmentManagementWorkCentersWorkCenterDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto = {
		items?: BurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto = {
		items?: BurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementWorkTeamsWorkTeamDto = {
		items?: BurnAbpErpCommonDepartmentManagementWorkTeamsWorkTeamDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementCurrenciesCurrencyDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementCurrenciesCurrencyDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto = {
		items?: BurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAssetsAssetDto = {
		items?: BurnAbpErpCommonMaterialManagementAssetsAssetDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto = {
		items?: BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributesAttributeDto = {
		items?: BurnAbpErpCommonMaterialManagementAttributesAttributeDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialClassesMaterialClassDto = {
		items?: BurnAbpErpCommonMaterialManagementMaterialClassesMaterialClassDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto = {
		items?: BurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto = {
		items?: BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialsMaterialDto = {
		items?: BurnAbpErpCommonMaterialManagementMaterialsMaterialDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonPartnerMaterialsPartnerMaterialDto = {
		items?: BurnAbpErpCommonPartnerMaterialsPartnerMaterialDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto = {
		items?: BurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonSupplierManagementSuppliersSupplierDto = {
		items?: BurnAbpErpCommonSupplierManagementSuppliersSupplierDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto = {
		items?: BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonUnitManagementUnitsUnitDto = {
		items?: BurnAbpErpCommonUnitManagementUnitsUnitDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonWarehouseManagementsLocationsLocationDto = {
		items?: BurnAbpErpCommonWarehouseManagementsLocationsLocationDto[];
		totalCount?: number;
	};

	type VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto = {
		items?: BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto[];
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

	type VoloAbpNameValueSystemInt64 = {
		name?: string;
		value?: number;
	};

	type WarehouseDeleteAsyncParams = {
		id: number;
	};

	type WarehouseExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WarehouseGetAsyncParams = {
		id: number;
	};

	type WarehouseGetByCodeAsyncParams = {
		/** 仓库编码 */
		code?: string;
	};

	type WarehouseGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WarehouseUpdateAsyncParams = {
		id: number;
	};

	type WorkCenterDeleteAsyncParams = {
		id: number;
	};

	type WorkCenterExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkCenterGetAsyncParams = {
		id: number;
	};

	type WorkCenterGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkCenterGetWorkCenterUserListAsyncParams = {
		workCenterCode?: string;
	};

	type WorkCenterUpdateAsyncParams = {
		id: number;
	};

	type WorkLineDeleteAsyncParams = {
		id: number;
	};

	type WorkLineExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkLineGetAsyncParams = {
		id: number;
	};

	type WorkLineGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkLineUpdateAsyncParams = {
		id: number;
	};

	type WorkShopDeleteAsyncParams = {
		id: number;
	};

	type WorkShopExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkShopGetAsyncParams = {
		id: number;
	};

	type WorkShopGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkShopUpdateAsyncParams = {
		id: number;
	};

	type WorkTeamDeleteAsyncParams = {
		id: number;
	};

	type WorkTeamExportAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkTeamGetAsyncParams = {
		id: number;
	};

	type WorkTeamGetListAsyncParams = {
		Filter?: string;
		Page?: number;
		PageSize?: number;
		OrderBy?: string;
		Sorting?: string;
		SkipCount?: number;
		MaxResultCount?: number;
	};

	type WorkTeamUpdateAsyncParams = {
		id: number;
	};
}
