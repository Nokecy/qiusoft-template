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

  type BnrSequenceSettingDeleteAsyncParams = {
    id: string;
  };

  type BnrSequenceSettingGetAsyncParams = {
    id: string;
  };

  type BnrSequenceSettingGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type BnrSequenceSettingUpdateAsyncParams = {
    id: string;
  };

  type BnrSequenceTypeDeleteAsyncParams = {
    id: string;
  };

  type BnrSequenceTypeGetAsyncParams = {
    id: string;
  };

  type BnrSequenceTypeGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type BnrSequenceTypeUpdateAsyncParams = {
    id: string;
  };

  type BurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto = {
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
    name?: string;
    sequenceRuleCode: string;
    sequenceRuleName: string;
    description?: string;
  };

  type BurnAbpBnrSettingBnrSequenceTypesCreateOrUpdateBnrSequenceTypeDto = {
    code?: string;
    name?: string;
    sequenceRuleCode: string;
    sequenceRuleName: string;
    description?: string;
  };

  type BurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto = {
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
    sequenceTypeCode: string;
    sequenceTypeName: string;
    materialClassCode?: string;
    materialClassName?: string;
    materialItemCode?: string;
    materialItemDescription?: string;
    customerCode?: string;
    customerName?: string;
    sequenceRuleCode: string;
    sequenceRuleName: string;
    remark?: string;
  };

  type BurnAbpBnrSettingBnrSettingSettingsCreateOrUpdateBnrSequenceSettingDto = {
    sequenceTypeCode: string;
    sequenceTypeName: string;
    materialClassCode?: string;
    materialClassName?: string;
    materialItemCode?: string;
    materialItemDescription?: string;
    customerCode?: string;
    customerName?: string;
    sequenceRuleCode: string;
    sequenceRuleName: string;
    remark?: string;
  };

  type BurnAbpLabelManagementLabelCategoriesCreateLabelCategoryInput = {
    extraProperties?: Record<string, any>;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 备注 */
    remark?: string;
  };

  type BurnAbpLabelManagementLabelCategoriesLabelCategoryDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 备注 */
    remark?: string;
    /** 并发标记 */
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelCategoriesUpdateLabelCategoryInput = {
    extraProperties?: Record<string, any>;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 并发标记 */
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelDatasGetLabelDataResultDto = {
    /** 打印数据内容 */
    content?: string;
  };

  type BurnAbpLabelManagementLabelPrintDefinitionsCreateLabelPrintDefinitionInput = {
    extraProperties?: Record<string, any>;
    /** 功能 */
    feature: string;
    /** 标签类型编码 */
    labelTypeCode: string;
    /** 标签类型名称 */
    labelTypeName: string;
    /** 排序 */
    order?: number;
  };

  type BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 功能 */
    feature?: string;
    /** 标签类型编码 */
    labelTypeCode?: string;
    /** 标签类型名称 */
    labelTypeName?: string;
    /** 排序 */
    order?: number;
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionWithTemplateDto = {
    /** 序号 */
    order?: number;
    /** 标签分类编码 */
    labelCategoryCode?: string;
    /** 标签分类名称 */
    labelCategoryName?: string;
    /** 标签类型编码 */
    labelTypeCode?: string;
    /** 标签类型名称 */
    labelTypeName?: string;
    /** 标签打印模板编码 */
    labelPrintTemplateId?: string;
    /** 标签打印模板名称 */
    labelPrintTemplateName?: string;
    /** 标签打印模板宽度 */
    labelPrintTemplateWidth?: number;
    /** 标签打印模板高度 */
    labelPrintTemplateHeight?: number;
    /** 打印份数 */
    printQuantity?: number;
  };

  type BurnAbpLabelManagementLabelPrintDefinitionsUpdateLabelPrintDefinitionInput = {
    extraProperties?: Record<string, any>;
    /** 功能 */
    feature: string;
    /** 标签类型编码 */
    labelTypeCode: string;
    /** 标签类型名称 */
    labelTypeName: string;
    /** 排序 */
    order?: number;
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto = {
    feature?: string;
    displayName?: string;
  };

  type BurnAbpLabelManagementLabelPrintSettingsCreateLabelSettingInput = {
    extraProperties?: Record<string, any>;
    /** 标签模板类型 */
    printTemplateId: string;
    /** 标签模板名称 */
    printTemplateName: string;
    /** 标签类型编码 */
    labelTypeCode: string;
    /** 打印份数 */
    printQuantity?: number;
    /** 标签类型名称 */
    labelTypeName: string;
    /** 物料分类编码 */
    materialClassCode?: string;
    /** 物料分类名称 */
    materialClassName?: string;
    /** 物料编码 */
    materialItemCode?: string;
    /** 物料名称 */
    materialItemName?: string;
    /** 物料描述 */
    materialItemDescription?: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 备注 */
    remark?: string;
  };

  type BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 标签模板类型 */
    printTemplateId?: string;
    /** 标签模板名称 */
    printTemplateName?: string;
    /** 打印份数 */
    printQuantity?: number;
    /** 标签类型编码 */
    labelTypeCode?: string;
    /** 标签类型名称 */
    labelTypeName?: string;
    /** 物料分类编码 */
    materialClassCode?: string;
    /** 物料分类名称 */
    materialClassName?: string;
    /** 物料编码 */
    materialItemCode?: string;
    /** 物料名称 */
    materialItemName?: string;
    /** 物料描述 */
    materialItemDescription?: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 备注 */
    remark?: string;
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelPrintSettingsUpdateLabelSettingInput = {
    extraProperties?: Record<string, any>;
    /** 标签模板类型 */
    printTemplateId: string;
    /** 标签模板名称 */
    printTemplateName: string;
    /** 打印份数 */
    printQuantity?: number;
    /** 标签类型编码 */
    labelTypeCode: string;
    /** 标签类型名称 */
    labelTypeName: string;
    /** 物料分类编码 */
    materialClassCode?: string;
    /** 物料分类名称 */
    materialClassName?: string;
    /** 物料编码 */
    materialItemCode?: string;
    /** 物料名称 */
    materialItemName?: string;
    /** 物料描述 */
    materialItemDescription?: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 备注 */
    remark?: string;
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelPrintTemplatesCreateLabelPrintTemplateInput = {
    extraProperties?: Record<string, any>;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 宽度 */
    width?: number;
    /** 高度 */
    height?: number;
    templateType?: BurnAbpLabelManagementLabelPrintTemplatesPrintTemplateType;
    /** 模板内容 */
    content?: string;
  };

  type BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 宽度 */
    width?: number;
    /** 高度 */
    height?: number;
    templateType?: BurnAbpLabelManagementLabelPrintTemplatesPrintTemplateType;
    /** 模板内容 */
    content?: string;
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelPrintTemplatesPrintTemplateType = 5 | 10 | 15 | 20;

  type BurnAbpLabelManagementLabelPrintTemplatesUpdateLabelPrintTemplateInput = {
    extraProperties?: Record<string, any>;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 宽度 */
    width?: number;
    /** 高度 */
    height?: number;
    templateType?: BurnAbpLabelManagementLabelPrintTemplatesPrintTemplateType;
    /** 模板内容 */
    content?: string;
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelTypeAdvancedSettingsCreateOrUpdateLabelTypeAdvancedSetting = {
    /** 编码 */
    labelCode?: string;
    /** 名称 */
    labelName?: string;
    /** 优先级 */
    sort?: number;
    /** 提供者名称 */
    providerName?: string;
    /** 提供者描述 */
    providerDescribe?: string;
    /** 标签模板类型 */
    labelTemplateId?: string;
    /** 标签模板名称 */
    labelTemplateName?: string;
  };

  type BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelAdvancedSettingProviderNameDto = {
    /** 编码 */
    code?: string;
    /** 名称 */
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
    /** 编码 */
    labelCode?: string;
    /** 名称 */
    labelName?: string;
    /** 优先级 */
    sort?: number;
    /** 提供者名称 */
    providerName?: string;
    /** 提供者描述 */
    providerDescribe?: string;
    /** 标签模板类型 */
    labelTemplateId?: string;
    /** 标签模板名称 */
    labelTemplateName?: string;
    /** 打印份数 */
    printQuantity?: number;
  };

  type BurnAbpLabelManagementLabelTypesCreateLabelTypeInput = {
    extraProperties?: Record<string, any>;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    categoryCode: string;
    categoryName: string;
    /** 默认打印模板 */
    defaultPrintTemplateId: string;
    /** 默认打印模板名称 */
    defaultPrintTemplateName: string;
    /** 默认打印数量 */
    defaultPrintQuantity: number;
    /** 备注 */
    remark?: string;
  };

  type BurnAbpLabelManagementLabelTypesLabelTypeDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 分类编码 */
    categoryCode?: string;
    /** 分类名称 */
    categoryName?: string;
    /** 默认打印模板 */
    defaultPrintTemplateId?: string;
    /** 默认打印模板名称 */
    defaultPrintTemplateName?: string;
    /** 默认打印份数 */
    defaultPrintQuantity?: number;
    /** 备注 */
    remark?: string;
    /** 并发标记 */
    concurrencyStamp?: string;
  };

  type BurnAbpLabelManagementLabelTypesUpdateLabelTypeInput = {
    extraProperties?: Record<string, any>;
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    categoryCode: string;
    categoryName: string;
    /** 默认打印模板 */
    defaultPrintTemplateId: string;
    /** 默认打印模板名称 */
    defaultPrintTemplateName: string;
    /** 默认打印数量 */
    defaultPrintQuantity: number;
    /** 备注 */
    remark?: string;
    /** 并发标记 */
    concurrencyStamp?: string;
  };

  type BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 车辆编码 */
    vehicleCode?: string;
    /** 车辆描述 */
    vehicleDescription?: string;
    /** 车牌号 */
    vehicleNo?: string;
    /** 车型 */
    vehicleType?: string;
    /** 货箱规格 */
    containerSpecification?: string;
    /** 驾驶员 */
    driver?: string;
    /** 驾驶员电话 */
    driverPhone?: string;
    /** 位置 */
    location?: string;
    /** 经度 */
    longitude?: string;
    /** 纬度 */
    latitude?: string;
    /** 行驶日期时间 */
    travelDate?: string;
    /** 车辆载货状态 00 空载；10 载货 */
    carryStatus?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_cheliangxinxiDtoCancelRecheckInputDto = {
    /** 单据号 */
    number?: string;
    /** 类型  10=箱号,20=LPN,30=送货单 */
    type?: string;
    /** 箱号/LPN/ASN */
    code?: string;
  };

  type BurnAbpTMS_cheliangxinxiDtoVehicleDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 车牌号 */
    carNo: string;
    /** 驾驶证照片 */
    carLicenseBlobName?: string;
    /** 车辆所有权分类：0 公司；1 个人 */
    ownerType?: string;
    /** 运输公司ID */
    transportCompanyld?: string;
    /** 运输公司名称 */
    transportCompanyName?: string;
    /** 车型 */
    vehicleModel?: string;
    /** 车型名称 */
    vehicleModelName?: string;
    /** 载重(kg) */
    loadCapacity?: number;
    /** 集装箱尺寸 */
    containerSize?: string;
    /** 长度 */
    length?: number;
    /** 品牌 */
    brand?: string;
    /** 出厂日期 */
    productionDate?: string;
    /** 年检截至 */
    yearCheckDate?: string;
    /** 司机姓名 */
    driver?: string;
    /** 司机电话 */
    driverTel?: string;
    /** 用户登录Id */
    driverUserId?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_chengyunshangTransportCompanyDto = {
    id?: string;
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
    /** 联系人 */
    contacts?: string;
    /** 联系方式 */
    contactTel?: string;
    /** 邮箱 */
    contactEmail?: string;
    /** 信用代码 */
    socialCreditCode?: string;
    /** 银行账户 */
    payBankAccount?: string;
    /** 开户行 */
    payBankName?: string;
    /** 发票抬头 */
    invoiceTitle?: string;
    /** 税号 */
    taxNumber?: string;
    /** 地址 */
    address?: string;
    /** 开户行 */
    invoiceBankName?: string;
    /** 开票银行账户 */
    invoiceBankAccount?: string;
    /** 营业执照 */
    businessLicenseBlobName?: string;
    /** 道路运输经营许可证 */
    transportLicenseBlobName?: string;
    /** 备注 */
    remark?: string;
  };

  type BurnAbpTMS_chexingguanliVehicleModelDto = {
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
    /** 额定载重 */
    ratedLoad?: number;
    /** 额定载积 */
    ratedStowage?: number;
    /** 备注 */
    remark?: string;
  };

  type BurnAbpTMS_danweixinxiUnitDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
  };

  type BurnAbpTMS_fayunbanzuShipmentTeamDto = {
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
    /** 发运班组编码 */
    code: string;
    /** 发运班组名称 */
    name: string;
    /** 发运班组备注 */
    memo?: string;
  };

  type BurnAbpTMS_fayundingdan_neibufuwuIntegrationShipmentOrderBoxItemDto = {
    /** 发运订单主键ID */
    shipmentOrderId?: number;
    /** 发运单号 */
    shipmentOrderNumber?: string;
    /** 派车单行号 */
    transportOrderId?: number;
    /** 派车单号 */
    transportOrderNo?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 物料规格型号 */
    materialSpecificationModel?: string;
    /** 任务令号 */
    taskOrder?: string;
    /** 合同号 */
    contractNo?: string;
    /** 采购合同号 */
    purchaseOrderCode?: string;
    /** LPN */
    traceId?: string;
    /** 箱号 */
    boxNumber?: string;
    /** 原始箱号 */
    originalBoxNumber?: string;
    /** SN序列号 */
    serialNumber?: string;
    /** 数量 */
    quantity?: number;
    boxLots?: BurnAbpTMS_fayundingdan_neibufuwuIntegrationShipmentOrderBoxLotDto[];
  };

  type BurnAbpTMS_fayundingdan_neibufuwuIntegrationShipmentOrderBoxLotDto = {
    /** 销售订单号 */
    saleOrderNo?: string;
    /** 销售合同号 */
    salesContractCode?: string;
    /** 来源单号(采购单号) */
    purchaseOrderCode?: string;
    /** 箱号 */
    boxNumber?: string;
    /** 原始箱号 */
    originalBoxNumber?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料型号 */
    modelNumber?: string;
    /** 客户型号 */
    mfgPartNo?: string;
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

  type BurnAbpTMS_fayundingdan_neibufuwuWriteBackBoxInputDto = {
    /** ASN号 */
    asnNo?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 物料规格型号 */
    materialSpecificationModel?: string;
    /** SN集合 */
    sn?: string;
    /** 箱号 */
    boxNumber?: string;
    /** 数量 */
    quantity?: number;
  };

  type BurnAbpTMS_fayundingdanCallBackStatusEnum = 1 | 2 | 5 | 10 | 15;

  type BurnAbpTMS_fayundingdanCompareBoxLotInput = {
    shipmentOrderCode: string;
    supplierBoxNumber: string;
    customerBoxNumber: string;
    barcode?: string;
  };

  type BurnAbpTMS_fayundingdanDtoBindCustomerSideCodeInput = {
    customerSideCode: string;
    shipmentOrderIds: number[];
  };

  type BurnAbpTMS_fayundingdanDtoCancelLoadInput = {
    /** 类型  10=箱号,20=LPN,30=送货单 */
    type?: string;
    /** 箱号/LPN/ASN */
    code?: string;
    /** 发运单号 */
    asnNumber?: string;
  };

  type BurnAbpTMS_fayundingdanDtoCollectBoxInputDto = {
    /** 送货单号 */
    number: string;
    /** 是否装车采集 */
    isLoading?: boolean;
    /** 车牌号 */
    carNo?: string;
    /** 箱号/栈板号 */
    boxCarton: string;
    /** 库房编码 */
    warehouseCode?: string;
    /** 库房名称-无 */
    warehouseName?: string;
  };

  type BurnAbpTMS_fayundingdanDtoCollectBoxResultDto = {
    /** 单据号 */
    number?: string;
    /** ASN号 */
    asnNo?: string;
    /** 仓库编码 */
    warehouseCode?: string;
    /** 仓库名称 */
    warehouseName?: string;
    /** 送货地址 */
    sendAddress?: string;
    /** 总箱数 */
    totalBoxQty?: number;
    /** 已装箱量 */
    completeBoxQty?: number;
    /** 总数量 */
    totalQty?: number;
    /** 已装量 */
    completeQty?: number;
    /** 是否复核完成 */
    isFinish?: boolean;
    /** 复核人 */
    reCheckUser?: string;
    /** 是否打印箱批次标签 */
    isPrintBoxLots?: boolean;
    /** 物料列表 */
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
    /** 已复核箱列表 */
    boxItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
  };

  type BurnAbpTMS_fayundingdanDtoCreateOrUpdateShipmentOrderDto = {
    /** 单号 */
    number?: string;
    /** 交付类型 EnumShipType - 无 */
    shipType?: string;
    /** 发运班组名称 */
    shipmentTeamName?: string;
    /** 优先级-无 */
    priority?: string;
    /** 要求发运日期 */
    requireShipmentTime: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户简称 */
    customerAbbName?: string;
    /** 客户名称 */
    customerName?: string;
    /** 库房编码 */
    warehouseCode?: string;
    /** 库房名称-无 */
    warehouseName?: string;
    /** 收货方联系人 */
    receiverContacts?: string;
    /** 收货方联系电话 */
    receiverContactTel?: string;
    /** 收货方传真 */
    receiverContactFax?: string;
    /** 收货地址编码 */
    deliveryAddressCode?: string;
    /** 收货地址 */
    deliveryAddress?: string;
    /** 客方送货号 */
    customerSideCode?: string;
    /** 销售编码 */
    saleNo?: string;
    /** 货运类型：10 汽运；20 海运；30 空运；40 快递 */
    freightType?: string;
    /** 车牌号 */
    carNo?: string;
    /** 备注 */
    memo?: string;
    /** 运输是否检查地址匹配 */
    transportCheckAddress?: boolean;
    /** 允许多车 */
    allowMultipleVehicle?: boolean;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    dynamicShipmentQuantity?: boolean;
    /** 是否提交 */
    isSubmit?: boolean;
    /** 发运单明细 */
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
    /** 发运单装车明细 */
    boxItems?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
  };

  type BurnAbpTMS_fayundingdanDtoGetAsnMaterialPackDto = {
    /** ASN单据号 */
    asnNo?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 发运数量 */
    sendQty?: number;
    /** 需求箱数 */
    needBoxQty?: number;
    /** 已采集箱数 */
    collectQty?: number;
  };

  type BurnAbpTMS_fayundingdanDtoOneClickCollectionInput = {
    /** 发运单号 */
    number?: string;
    /** 仓库编码 */
    warehouseCode?: string;
    /** 仓库名称 */
    warehouseName?: string;
  };

  type BurnAbpTMS_fayundingdanDtoOrderCheckInputDto = {
    /** 订单单号 */
    number?: string;
    /** 原因 */
    reason?: string;
  };

  type BurnAbpTMS_fayundingdanDtoReCheckDto = {
    /** 送货单号 */
    number?: string;
    /** 车牌号 */
    carNo?: string;
    /** 箱号/或LPN */
    boxNumber?: string;
    /** 栈板号 */
    palletTypCode?: string;
    /** 是否同时扫码栈板箱号 */
    isSimultaneously?: boolean;
    /** 库房编码 */
    warehouseCode?: string;
    /** 库房名称 */
    warehouseName?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    /** 发运订单主键ID */
    shipmentOrderId?: number;
    /** 发运单号 */
    shipmentOrderNumber?: string;
    /** 派车单行号 */
    transportOrderId?: number;
    /** 派车单号 */
    transportOrderNo?: string;
    /** 允许多车 */
    allowMultipleVehicle?: boolean;
    /** 发运班组名称 */
    shipmentTeamName?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 物料规格型号 */
    materialSpecificationModel?: string;
    /** 任务令号 */
    taskOrder?: string;
    /** 合同号 */
    contractNo?: string;
    /** 采购合同号 */
    purchaseOrderCode?: string;
    /** LPN */
    traceId?: string;
    /** 箱号 */
    boxNumber?: string;
    /** 原始箱号 */
    originalBoxNumber?: string;
    /** SN序列号 */
    serialNumber?: string;
    /** 数量 */
    quantity?: number;
    barCodeStatus?: BurnAbpTMS_tiaomajiexiBarCodeStatus;
    /** 复核完成 */
    isCheck?: boolean;
    /** 装车位置编码 */
    loadingLocationCode?: string;
    /** 装车位置名称 */
    loadingLocationName?: string;
    /** 装车地点 */
    loadingLocationDefiniteName?: string;
    /** 车牌号 */
    licensePlateNumber?: string;
    /** 复核人 */
    checkUser?: string;
    /** 复核时间 */
    checkTime?: string;
    /** 是否已发运 */
    isShipped?: boolean;
    /** 发运时间 */
    shipmentDate?: string;
    /** 供应商型号 */
    mfgPartNo?: string;
    /** 是否已比对通过 */
    isComparePass?: boolean;
    /** 比对通过时间 */
    comparePassTime?: string;
    organizationCode?: string;
    companyCode?: string;
    factoryCode?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentOrderBoxLotDto = {
    extraProperties?: Record<string, any>;
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 发运订单主键ID */
    shipmentOrderId?: number;
    /** 发运单号 */
    shipmentOrderNumber?: string;
    /** 销售订单号 */
    saleOrderNo?: string;
    /** 销售合同号 */
    salesContractCode?: string;
    /** 来源单号(采购单号) */
    purchaseOrderCode?: string;
    /** 箱号 */
    boxNumber?: string;
    /** 原始箱号 */
    originalBoxNumber?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料型号 */
    modelNumber?: string;
    /** 客户型号 */
    mfgPartNo?: string;
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
    /** 是否已比对通过 */
    isComparePass?: boolean;
    /** 比对通过时间 */
    comparePassTime?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentOrderDto = {
    id?: number;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 单号 */
    number?: string;
    /** 派车单状态 B1草稿 C1提交 D1审核 G5已发运 E1全部签返 E2部分签返 */
    status?: string;
    /** 交付类型 EnumShipType - 无 */
    shipType?: string;
    /** 发运班组名称 */
    shipmentTeamName?: string;
    /** 优先级-无 */
    priority?: string;
    /** 来源系统 */
    sourceSystem?: string;
    callBackStatus?: BurnAbpTMS_fayundingdanCallBackStatusEnum;
    /** 回传时间 */
    callBackTime?: string;
    /** 回传错误消息 */
    callBackErrorMessage?: string;
    /** 要求发运日期 */
    requireShipmentTime?: string;
    /** 实际发运日期 */
    actualityShipmentTime?: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户简称 */
    customerAbbName?: string;
    /** 客户名称 */
    customerName?: string;
    /** 库房编码 */
    warehouseCode?: string;
    /** 库房名称-无 */
    warehouseName?: string;
    /** 收货方联系人 */
    receiverContacts?: string;
    /** 收货方联系电话 */
    receiverContactTel?: string;
    /** 收货方传真 */
    receiverContactFax?: string;
    /** 收货地址编码 */
    deliveryAddressCode?: string;
    /** 收货地址 */
    deliveryAddress?: string;
    /** 客方送货号 */
    customerSideCode?: string;
    /** 销售编码 */
    saleNo?: string;
    /** 货运类型：10 汽运；20 海运；30 空运；40 快递 */
    freightType?: string;
    /** 车牌号 */
    carNo?: string;
    /** 备注 */
    memo?: string;
    /** 截至收货时间-无 */
    closeShipmentTime?: string;
    /** 是否复核完成-无 */
    isFinish?: boolean;
    /** 发运时间 */
    shipmentDate?: string;
    /** 签收日期 */
    signbackDate?: string;
    /** 签收人 */
    signback?: string;
    /** 签返顺序号 */
    signBackNumber?: string;
    /** 运输是否检查地址匹配 */
    transportCheckAddress?: boolean;
    /** 允许多车 */
    allowMultipleVehicle?: boolean;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    dynamicShipmentQuantity?: boolean;
    /** 发运单明细 */
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
    /** 发运单装车明细 */
    boxItems?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
  };

  type BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 序号 */
    sort?: number;
    /** 送货单号 */
    shipmentOrderNo?: string;
    /** 送货订单主键ID */
    shipmentOrderId?: number;
    /** 发运班组名称 */
    shipmentTeamName?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 规格型号 */
    materialSpecification?: string;
    /** 供应商型号 */
    mfgPartNo?: string;
    /** 单位 */
    unitName?: string;
    /** 来源单据号 */
    sourceOrderNo?: string;
    /** 来源单据号明细行号 */
    sourceOrderItemId?: number;
    /** 任务令号 */
    workJobCode?: string;
    /** 库房编码 */
    wareHouseCode?: string;
    /** 库房名称 */
    wareHouseName?: string;
    /** 实际送货数量 */
    deliveryQuantity?: number;
    /** 需求数量 */
    requiredQuantity?: number;
    /** 送货签收量 */
    passQuantity?: number;
    /** 需求箱数 */
    boxQuantity?: number;
    /** 绑定箱数量 */
    boundBoxQuantity?: number;
    /** 已复核箱数量 */
    scanBoxQuantity?: number;
    /** 已复核量 */
    scanQuantity?: number;
    /** 需求日期 */
    requestDeliveryDate?: string;
    /** 交货地址 */
    deliveryAddress?: string;
    /** 交货日期 */
    soDeliveryDate?: string;
    /** 签收时间 */
    receiveDate?: string;
    /** 销售合同号 */
    salesContractCode?: string;
    /** 采购订单号 */
    purchaseOrderCode?: string;
    memo?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentOrderItemWithOrderDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 序号 */
    sort?: number;
    /** 送货单号 */
    shipmentOrderNo?: string;
    /** 送货订单主键ID */
    shipmentOrderId?: number;
    /** 发运班组名称 */
    shipmentTeamName?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 规格型号 */
    materialSpecification?: string;
    /** 供应商型号 */
    mfgPartNo?: string;
    /** 单位 */
    unitName?: string;
    /** 来源单据号 */
    sourceOrderNo?: string;
    /** 来源单据号明细行号 */
    sourceOrderItemId?: number;
    /** 任务令号 */
    workJobCode?: string;
    /** 库房编码 */
    wareHouseCode?: string;
    /** 库房名称 */
    wareHouseName?: string;
    /** 实际送货数量 */
    deliveryQuantity?: number;
    /** 需求数量 */
    requiredQuantity?: number;
    /** 送货签收量 */
    passQuantity?: number;
    /** 需求箱数 */
    boxQuantity?: number;
    /** 绑定箱数量 */
    boundBoxQuantity?: number;
    /** 已复核箱数量 */
    scanBoxQuantity?: number;
    /** 已复核量 */
    scanQuantity?: number;
    /** 需求日期 */
    requestDeliveryDate?: string;
    /** 交货地址 */
    deliveryAddress?: string;
    /** 交货日期 */
    soDeliveryDate?: string;
    /** 签收时间 */
    receiveDate?: string;
    /** 销售合同号 */
    salesContractCode?: string;
    /** 采购订单号 */
    purchaseOrderCode?: string;
    memo?: string;
    shipmentOrder?: BurnAbpTMS_fayundingdanDtoShipmentOrderDto;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentOrderRecheckDto = {
    /** 单据号 */
    number?: string;
    /** ASN号 */
    asnNo?: string;
    /** 仓库编码 */
    warehouseCode?: string;
    /** 仓库名称 */
    warehouseName?: string;
    /** 送货地址 */
    sendAddress?: string;
    /** 总箱数 */
    totalBoxQty?: number;
    /** 已装箱量 */
    completeBoxQty?: number;
    /** 总数量 */
    totalQty?: number;
    /** 已装量 */
    completeQty?: number;
    /** 是否复核完成 */
    isFinish?: boolean;
    /** 复核人 */
    reCheckUser?: string;
    /** 物料列表 */
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
    /** 已复核箱列表 */
    boxItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
    /** 待复核箱列表 */
    waitBoxItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
    /** 是否同时扫码栈板箱号 */
    isSimultaneously?: boolean;
    /** 是否继续进行，只有复核入参 IsSimultaneously 为 true 才使用该字段 */
    keepRunning?: boolean;
    message?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentTemplateResolverDto = {
    name?: string;
    describe?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentTimeSlotInputDto = {
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentTimeSlotTopInputDto = {
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 数量 */
    topQty?: number;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentTimeSlotTopViewModel = {
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 发运数量 */
    sendQty?: number;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentTimeSlotViewModel = {
    /** 日期 */
    dayTime?: string;
    /** 发运数量 */
    sendQty?: number;
  };

  type BurnAbpTMS_fayundingdanDtoShipmentViewModel = {
    /** 待发运数量 */
    waitSendQty?: number;
    /** 已发运数量 */
    sendQty?: number;
    /** 已签收数量 */
    completeQty?: number;
    /** 发运编码数量 */
    sendMaterialQty?: number;
    /** 待发运列表 */
    waitItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
    /** 已发运列表 */
    sendItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
  };

  type BurnAbpTMS_fayundingdanDtoUnBindBoxItemInput = {
    /** 送货单号 */
    number?: string;
    /** 箱号/栈板号 */
    boxCarton?: string;
    warehouseCode?: string;
  };

  type BurnAbpTMS_huowuxinxiMaterialItemDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 物料编码 */
    code?: string;
    /** 物料外码 */
    outCode?: string;
    /** 物料分类(信息来自MainClass) */
    classCode?: string;
    /** 物料描述 */
    descript?: string;
    /** 基本单位编码(信息来自Units表) */
    unitCode?: string;
    /** 基本单位编码(信息来自Units表) */
    unitName?: string;
    /** 规格型号 */
    specificationModel?: string;
    /** 对外规格型号 */
    outSpecificationModel?: string;
    /** 对外描述 */
    outDescription?: string;
    /** 英文描述 */
    engDescription?: string;
    /** 对外英文描述 */
    foreignDescription?: string;
    /** 项目英文描述 */
    engItemsDescription?: string;
  };

  type BurnAbpTMS_huoyunfeiyongCreateFreightCostInput = {
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 是否默认 */
    isDefault?: boolean;
    calcMode?: BurnAbpTMS_huoyunfeiyongFreightCostCalcMode;
    /** 固定金额 */
    fixedAmount?: number;
    /** 备注 */
    memo?: string;
    intervals?: BurnAbpTMS_huoyunfeiyongCreateFreightCostIntervalInput[];
  };

  type BurnAbpTMS_huoyunfeiyongCreateFreightCostIntervalInput = {
    startInterval?: number;
    endInterval?: number;
    price?: number;
  };

  type BurnAbpTMS_huoyunfeiyongFreightCostCalcMode = 0 | 1;

  type BurnAbpTMS_huoyunfeiyongFreightCostDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 是否系统内置 */
    isSystem?: boolean;
    /** 是否默认 */
    isDefault?: boolean;
    calcMode?: BurnAbpTMS_huoyunfeiyongFreightCostCalcMode;
    /** 固定金额 */
    fixedAmount?: number;
    /** 备注 */
    memo?: string;
    intervals?: BurnAbpTMS_huoyunfeiyongFreightCostIntervalDto[];
  };

  type BurnAbpTMS_huoyunfeiyongFreightCostIntervalDto = {
    id?: string;
    startInterval?: number;
    endInterval?: number;
    price?: number;
  };

  type BurnAbpTMS_huoyunfeiyongUpdateFreightCostInput = {
    /** 编码 */
    code: string;
    /** 名称 */
    name: string;
    /** 是否默认 */
    isDefault?: boolean;
    calcMode?: BurnAbpTMS_huoyunfeiyongFreightCostCalcMode;
    /** 固定金额 */
    fixedAmount?: number;
    /** 备注 */
    memo?: string;
    intervals?: BurnAbpTMS_huoyunfeiyongCreateFreightCostIntervalInput[];
  };

  type BurnAbpTMS_huoyunfeiyongUpdateFreightCostIntervalInput = {
    startInterval?: number;
    endInterval?: number;
    price?: number;
  };

  type BurnAbpTMS_huoyunlichengCreateFreightMileageInput = {
    /** 起点 */
    startPoint: string;
    /** 起点名称 */
    startPointName: string;
    /** 起点地址 */
    startPointAddress: string;
    /** 起点经度 */
    startPointLongitude: string;
    /** 起点纬度 */
    startPointLatitude: string;
    /** 终点 */
    endPoint: string;
    /** 终点名称 */
    endPointName: string;
    /** 终点地址 */
    endPointAddress: string;
    /** 终点经度 */
    endPointLongitude: string;
    /** 终点纬度 */
    endPointLatitude: string;
    /** 里程 */
    distance?: number;
    /** 时长 */
    duration?: number;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_huoyunlichengFreightMileageDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 起点 */
    startPoint?: string;
    /** 起点名称 */
    startPointName?: string;
    /** 起点地址 */
    startPointAddress?: string;
    /** 起点经度 */
    startPointLongitude?: string;
    /** 起点纬度 */
    startPointLatitude?: string;
    /** 终点 */
    endPoint?: string;
    /** 终点名称 */
    endPointName?: string;
    /** 终点地址 */
    endPointAddress?: string;
    /** 终点经度 */
    endPointLongitude?: string;
    /** 终点纬度 */
    endPointLatitude?: string;
    /** 里程 */
    distance?: number;
    /** 时长 */
    duration?: number;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_huoyunlichengUpdateFreightMileageInput = {
    /** 起点 */
    startPoint: string;
    /** 起点名称 */
    startPointName: string;
    /** 起点地址 */
    startPointAddress: string;
    /** 起点经度 */
    startPointLongitude: string;
    /** 起点纬度 */
    startPointLatitude: string;
    /** 终点 */
    endPoint: string;
    /** 终点名称 */
    endPointName: string;
    /** 终点地址 */
    endPointAddress: string;
    /** 终点经度 */
    endPointLongitude: string;
    /** 终点纬度 */
    endPointLatitude: string;
    /** 里程 */
    distance?: number;
    /** 时长 */
    duration?: number;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto = {
    id?: number;
    /** 客户编码 */
    customerCode?: string;
    /** 联系方式 */
    tel?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_kehuxinxiCustomerDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 客户编码 */
    code?: string;
    /** 客户名称 */
    name?: string;
    /** 客户简称 */
    abbName?: string;
    /** 客户地址 */
    address?: string;
    /** 启用日期 */
    openDate?: string;
    /** 联系电话 */
    tel?: string;
    /** 是否转标 0 不转 1 要转 */
    isSpecificationConvert?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_kufangxinxiWareHouseDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 地址 */
    address?: string;
    /** 联系人 */
    contact?: string;
    /** 联系电话 */
    tel?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_paichedingdanDtoAppendLocationDto = {
    /** 派车单号 */
    transportOrderNumber: string;
    /** 需要新增的停靠地址列表 */
    items: BurnAbpTMS_paichedingdanDtoTransportOrderLocationDetailItemModel[];
  };

  type BurnAbpTMS_paichedingdanDtoAppendShipmentDto = {
    /** 派车单号 */
    transportOrderNumber: string;
    /** 需要挂载的派车订单信息 */
    items: BurnAbpTMS_paichedingdanShipmentOrderRelationModel[];
  };

  type BurnAbpTMS_paichedingdanDtoBindTransportPalletItemDto = {
    /** 派车单号 */
    transportOrderNumber: string;
    /** 是否满载 */
    isFully?: boolean;
    /** 未满载原因 */
    unFullReason?: string;
    items: BurnAbpTMS_paichedingdanDtoTransportOrderLocationPalletItemDto[];
  };

  type BurnAbpTMS_paichedingdanDtoCheckCompleteDto = {
    /** 派车单号 */
    transportOrderNumber: string;
    /** 装货地点编码 */
    locationCode: string;
    /** 装货地点名称 */
    locationName: string;
    /** 是否满载 */
    isFully?: boolean;
    /** 未满载原因 */
    unFullReason?: string;
    items?: BurnAbpTMS_paichedingdanDtoTransportOrderLocationPalletItemDto[];
  };

  type BurnAbpTMS_paichedingdanDtoConfirmUnloadLocationDto = {
    /** 停靠点Id */
    locationId?: number;
    /** 经度 */
    longitude?: number;
    /** 纬度 */
    latitude?: number;
  };

  type BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportCostInput = {
    /** 费用编码 */
    costCode: string;
    /** 费用名称 */
    costName: string;
    /** 是否系统内置 */
    isSystem?: boolean;
    /** 是否默认 */
    isDefault?: boolean;
  };

  type BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportOrderLocationItemDto = {
    id?: number;
    /** 派车单行号 */
    transportOrderId?: number;
    /** 派车单号 */
    transportOrderNumber?: string;
    /** 排序序号 */
    sort?: number;
    transportLocationType?: BurnAbpTMS_paichedingdanTransportLocationType;
    /** 地点编码 */
    locationCode?: string;
    /** 地点名称 */
    locationName?: string;
    /** 地点具体位置 */
    locationDefinite?: string;
    /** 地点具体位置 */
    locationDefiniteText?: string;
    /** 地点地址 */
    locationAddress?: string;
    /** 地点联系人 */
    locationContact?: string;
    /** 地点联系电话 */
    locationContactTel?: string;
    /** 地点经度 */
    locationLongitude?: string;
    /** 地点纬度 */
    locationLatitude?: string;
  };

  type BurnAbpTMS_paichedingdanDtoCreateTransportOrderInput = {
    /** 派车单号 */
    number?: string;
    /** 装车人 */
    transportLoading?: string;
    /** 运输类型编码 */
    transportTypeCode?: string;
    /** 运输类型名称 */
    transportTypeName?: string;
    offStrategy?: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 起点编码 */
    startLocationCode?: string;
    /** 起点名称 */
    startLocationName?: string;
    /** 起点具体点 */
    startLocationDefinite?: string;
    /** 起点地址 */
    startLocationAddress?: string;
    /** 起点联系人 */
    startLocationContacts?: string;
    /** 起点联系电话 */
    startLocationContactTel?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车辆载重 */
    vehicleLoadCapactity?: number;
    /** 车辆容积尺寸 */
    vehicleContainerSize?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 司机登录用户 */
    driverUserId?: string;
    /** 装车员 */
    deliveryMan?: string;
    /** 装车员电话 */
    deliveryManTel?: string;
    /** 驾驶员是否卸货：0 否；1 是 */
    allowDriverUnload?: string;
    /** 预计发车日期 */
    planSendDate?: string;
    /** 计划发车时间 */
    planSendTime?: string;
    /** 备注 */
    memo?: string;
    transportationType?: BurnAbpTMS_paichedingdanTransportationType;
    /** 快递公司 */
    expressCompany?: string;
    /** 快递单号 */
    expressNumber?: string;
    /** 是否提交 */
    isSubmit?: boolean;
    /** 派车明细点信息 */
    locationDetailItems?: BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportOrderLocationItemDto[];
    costs?: BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportCostInput[];
  };

  type BurnAbpTMS_paichedingdanDtoDepartTransportOrderInputDto = {
    transportOrderNumber: string;
  };

  type BurnAbpTMS_paichedingdanDtoRemoveShipmentsDto = {
    /** 派车单号 */
    transportOrderNumber: string;
    shipmentOrderNumbers?: string[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderDto = {
    id?: number;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 派车单号 */
    number?: string;
    /** 派车单状态 B1草稿 C1提交 D1审核 D2装车中 D4装车完成 E1已发车  I1 已返司 */
    status?: string;
    /** 派车申请人 */
    transportApplicant?: string;
    /** 派车人 */
    transportCreater?: string;
    /** 装车人 */
    transportLoading?: string;
    /** 运输类型编码 */
    transportTypeCode?: string;
    /** 运输类型名称 */
    transportTypeName?: string;
    offStrategy?: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 起点编码 */
    startLocationCode?: string;
    /** 起点名称 */
    startLocationName?: string;
    /** 起点具体点 */
    startLocationDefinite?: string;
    /** 起点地址 */
    startLocationAddress?: string;
    /** 起点联系人 */
    startLocationContacts?: string;
    /** 起点联系电话 */
    startLocationContactTel?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车辆载重 */
    vehicleLoadCapactity?: number;
    /** 车辆容积尺寸 */
    vehicleContainerSize?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 司机登录用户 */
    driverUserId?: string;
    /** 司机是否领取 */
    isToReceive?: string;
    /** 装车员 */
    deliveryMan?: string;
    /** 装车员电话 */
    deliveryManTel?: string;
    /** 驾驶员是否卸货：0 否；1 是 */
    allowDriverUnload?: string;
    /** 预计发车日期 */
    planSendDate?: string;
    /** 计划发车时间 */
    planSendTime?: string;
    /** 是否满载 */
    isFully?: boolean;
    /** 未满载原因 */
    unFullReason?: string;
    /** 实际发车日期 */
    sendDate?: string;
    /** 实际发车时间 */
    sendTime?: string;
    /** 返回日期 */
    returnDate?: string;
    /** 返回时间 */
    returnTime?: string;
    /** 备注 */
    memo?: string;
    /** 运输路径 */
    transportPath?: string;
    transportationType?: BurnAbpTMS_paichedingdanTransportationType;
    /** 快递公司 */
    expressCompany?: string;
    /** 快递单号 */
    expressNumber?: string;
    locationDetailItems?: BurnAbpTMS_paichedingdanDtoTransportOrderLocationDetailItemDto[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderLoadShpmentOrderDto = {
    /** 派车单号 */
    transportOrderNumber?: string;
    /** 发车位置编码 */
    startLocationCode?: string;
    /** 发车位置名称 */
    startLocationName?: string;
    /** 发车位置具体点 */
    startLocationDefinite?: string;
    /** 发车位置地址 */
    startLocationAddress?: string;
    /** 发车位置公司 */
    startLocationCompany?: string;
    /** 发车位置联系人 */
    startLocationContacts?: string;
    /** 发车位置联系电话 */
    startLocationContactTel?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车辆载重 */
    vehicleLoadCapactity?: number;
    /** 车辆容积尺寸 */
    vehicleContainerSize?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 装车员 */
    deliveryMan?: string;
    /** 装车员电话 */
    deliveryManTel?: string;
    /** 驾驶员是否卸货：0 否；1 是 */
    allowDriverUnload?: string;
    /** 预计发车日期 */
    planSendDate?: string;
    /** 计划发车时间 */
    planSendTime?: string;
    /** 备注 */
    memo?: string;
    items?: BurnAbpTMS_paichedingdanDtoTransportOrderLoadShpmentOrderItemDto[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderLoadShpmentOrderItemDto = {
    sort?: number;
    /** 发运订单主键Id */
    shipmentOrderId?: number;
    /** 发运订单号 */
    shipmentOrderNumber?: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 发运时间 */
    shipmentTime?: string;
    /** 发运地点 */
    shipmentLocationCode?: string;
    /** 发运地点名称 */
    shipmentLocationName?: string;
    /** 发运地点具体位置 */
    shipmentLocationDefiniteText?: string;
    /** 发运备注情况 */
    shipmentMemo?: string;
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderLocationDetailItemDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 派车单行号 */
    transportOrderId?: number;
    /** 派车单号 */
    transportOrderNumber?: string;
    /** 排序序号 */
    sort?: number;
    transportLocationType?: BurnAbpTMS_paichedingdanTransportLocationType;
    /** 地点编码 */
    locationCode?: string;
    /** 地点名称 */
    locationName?: string;
    /** 地点具体位置 */
    locationDefinite?: string;
    /** 地点具体位置 */
    locationDefiniteText?: string;
    /** 地点地址 */
    locationAddress?: string;
    /** 地点联系人 */
    locationContact?: string;
    /** 地点联系电话 */
    locationContactTel?: string;
    /** 地点经度 */
    locationLongitude?: string;
    /** 地点纬度 */
    locationLatitude?: string;
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderLocationDetailItemModel = {
    /** 排序序号 */
    sort?: number;
    /** 地点编码 */
    locationCode?: string;
    /** 地点名称 */
    locationName?: string;
    /** 地点具体位置 */
    locationDefiniteText?: string;
    /** 地点地址 */
    locationAddress?: string;
    /** 地点公司 */
    locationCompany?: string;
    /** 地点联系人 */
    locationContact?: string;
    /** 地点联系电话 */
    locationContactTel?: string;
    /** 地点经度 */
    locationLongitude?: string;
    /** 地点纬度 */
    locationLatitude?: string;
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderLocationItemDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 序号信息 */
    sort?: number;
    /** 派车单行号 */
    transportOrderId?: number;
    /** 派车单号 */
    transportOrderNumber?: string;
    transportLocationType?: BurnAbpTMS_paichedingdanTransportLocationType;
    /** 数据类型 10 转运点信息；20 送货信息；30 领料转库信息 */
    itemType?: string;
    /** 地点编码 */
    locationCode?: string;
    /** 地点名称 */
    locationName?: string;
    /** 地址 */
    locationAddress?: string;
    /** 公司 */
    locationCompany?: string;
    /** 联系人 */
    locationContact?: string;
    /** 联系电话 */
    locationContactTel?: string;
    /** 经度 */
    locationLongitude?: string;
    /** 纬度 */
    locationLatitude?: string;
    /** 送货具体点路径 */
    transportPath?: string;
    /** 抵达状态--到达确认：0 未确认；1 已确认 */
    arrivalConfirmStatus?: string;
    /** 确认时间 */
    arrivalConfirmDate?: string;
    /** 确认人 */
    arrivalConfirmPerson?: string;
    /** 确认经度 */
    arrivalConfirmLongitude?: string;
    /** 确认纬度 */
    arrivalConfirmLatitude?: string;
    /** 备注 */
    memo?: string;
    /** 停靠点详细送货点列表 */
    locationDetailItems?: BurnAbpTMS_paichedingdanDtoTransportOrderLocationDetailItemDto[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderLocationPalletItemDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 派车单行号 */
    transportOrderld?: number;
    /** 派车单号 */
    transportOrderNumber?: string;
    /** 停靠点编码 */
    locationCode?: string;
    /** 停靠点名称 */
    locationName?: string;
    /** 停靠点地址 */
    locationAddress?: string;
    /** 具体点位置 */
    locationDefiniteText?: string;
    /** 周转箱类型 */
    palletType?: string;
    /** 周转箱编码 */
    palletCode?: string;
    /** 周转箱名称 */
    palletName?: string;
    /** 数量 */
    quantity?: number;
    /** 备注信息 */
    memo?: string;
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderPrintDto = {
    /** 派车单号 */
    number?: string;
    /** 车牌号 */
    carNo?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 运输路线 */
    transportPath?: string;
    /** 具体停靠点位置 */
    locationDetailStr?: string;
    /** 送货栈板 */
    shipmentPalletStr?: string;
    /** 备注 */
    memo?: string;
    /** 派车人 */
    creater?: string;
    /** 装车人 */
    loader?: string;
    createTime?: string;
    /** 发运订单列表 */
    shipmentItems?: BurnAbpTMS_paichedingdanDtoTransportShipmentOrderItemDto[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderPrintListDto = {
    items?: BurnAbpTMS_paichedingdanDtoTransportOrderPrintDto[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderRecheckInputDto = {
    /** 派车单号 */
    number: string;
    /** 装货地点编码 */
    locationCode: string;
    /** 装货地点名称 */
    locationName: string;
    /** 栈板号 */
    palletTypCode?: string;
    /** 箱号/或LPN */
    boxNumber?: string;
    /** 是否装车复核---区分复核和绑定操作  复核-已存在箱列表  绑定-不存在箱列表 */
    isCheck?: boolean;
    /** 发运单号列表 */
    shipmentOrderNumberList?: string[];
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderRecheckOutputDto = {
    transportOrderId?: number;
    /** 派车单号 */
    number?: string;
    /** 运输类型编码 */
    transportTypeCode?: string;
    /** 运输类型名称 */
    transportTypeName?: string;
    offStrategy?: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 起点编码 */
    startLocationCode?: string;
    /** 起点名称 */
    startLocationName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 总箱数 */
    totalBoxQty?: number;
    /** 已装箱量 */
    completeBoxQty?: number;
    /** 必须采集的总数量，存在可以装多车的单据不记录在内 */
    requireTotalQty?: number;
    /** 总数量 */
    totalQty?: number;
    /** 已装量 */
    completeQty?: number;
    /** 是否复核完成 */
    isFinish?: boolean;
    /** 复核人 */
    reCheckUser?: string;
    keepRunning?: boolean;
    /** 运输路线 */
    transportPath?: string;
    /** 运输路线点列表 */
    transportLineList?: BurnAbpTMS_paichedingdanDtoTransportOrderLocationItemDto[];
    /** 已复核箱列表 */
    boxItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
    /** 待复核箱列表 */
    waitBoxItem?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
    /** 发运单号列表 */
    shipmentOrderNumberList?: string[];
    /** 是否同时扫码栈板箱号 */
    isSimultaneously?: boolean;
  };

  type BurnAbpTMS_paichedingdanDtoTransportOrderReturnCompanyInputDto = {
    transportOrderNumber: string;
  };

  type BurnAbpTMS_paichedingdanDtoTransportShipmentOrderItemDto = {
    shipmentNumber?: string;
    materialCode?: string;
    materialOutCode?: string;
    quantity?: number;
  };

  type BurnAbpTMS_paichedingdanDtoUnLoadCheckDto = {
    /** 派车单号 */
    transportOrderNo?: string;
    /** 发运单号 */
    shipmentOrderNo?: string;
    /** 卸车地点 */
    unloadLocationCode?: string;
    /** 卸车地点 */
    unloadLocationName?: string;
    /** 卸车地点 */
    unloadLocationDefiniteName?: string;
    /** 卸车LPN或箱号 */
    boxNumber?: string;
  };

  type BurnAbpTMS_paichedingdanDtoUpdateTransportOrderInput = {
    /** 派车单号 */
    number?: string;
    /** 装车人 */
    transportLoading?: string;
    /** 运输类型编码 */
    transportTypeCode?: string;
    /** 运输类型名称 */
    transportTypeName?: string;
    offStrategy?: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 起点编码 */
    startLocationCode?: string;
    /** 起点名称 */
    startLocationName?: string;
    /** 起点具体点 */
    startLocationDefinite?: string;
    /** 起点地址 */
    startLocationAddress?: string;
    /** 起点联系人 */
    startLocationContacts?: string;
    /** 起点联系电话 */
    startLocationContactTel?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车辆载重 */
    vehicleLoadCapactity?: number;
    /** 车辆容积尺寸 */
    vehicleContainerSize?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 司机登录用户 */
    driverUserId?: string;
    /** 装车员 */
    deliveryMan?: string;
    /** 装车员电话 */
    deliveryManTel?: string;
    /** 驾驶员是否卸货：0 否；1 是 */
    allowDriverUnload?: string;
    /** 预计发车日期 */
    planSendDate?: string;
    /** 计划发车时间 */
    planSendTime?: string;
    /** 备注 */
    memo?: string;
    transportationType?: BurnAbpTMS_paichedingdanTransportationType;
    /** 快递公司 */
    expressCompany?: string;
    /** 快递单号 */
    expressNumber?: string;
    /** 是否提交 */
    isSubmit?: boolean;
    /** 派车明细点信息 */
    locationDetailItems?: BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportOrderLocationItemDto[];
    costs?: BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportCostInput[];
  };

  type BurnAbpTMS_paichedingdanShipmentOrderRelationModel = {
    shipmentOrderId?: number;
    shipmentOrderNumber?: string;
    customerCode?: string;
    customerName?: string;
    shipmentTime?: string;
    transportCheckAddress?: boolean;
    allowMultipleVehicle?: boolean;
    isFinish?: boolean;
    shipmentLocationDefiniteText?: string;
    shipmentMemo?: string;
  };

  type BurnAbpTMS_paichedingdanTransportationType = 0 | 1;

  type BurnAbpTMS_paichedingdanTransportLocationType = 1 | 2;

  type BurnAbpTMS_paicheshenqingdanDtoCreateOrUpdateTransportDistributeOrderDto = {
    /** 派车单号 */
    number?: string;
    /** 运输类型编码 */
    transportTypeCode?: string;
    /** 运输类型名称 */
    transportTypeName?: string;
    offStrategy?: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 发车位置编码 */
    startLocationCode?: string;
    /** 发车位置名称 */
    startLocationName?: string;
    /** 发车位置具体点 */
    startLocationDefinite?: string;
    /** 发车位置地址 */
    startLocationAddress?: string;
    /** 发车位置公司 */
    startLocationCompany?: string;
    /** 发车位置联系人 */
    startLocationContacts?: string;
    /** 发车位置联系电话 */
    startLocationContactTel?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车辆载重 */
    vehicleLoadCapactity?: number;
    /** 车辆容积尺寸 */
    vehicleContainerSize?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 装车员 */
    deliveryMan?: string;
    /** 司机登录用户 */
    driverUserId?: string;
    /** 装车员电话 */
    deliveryManTel?: string;
    /** 驾驶员是否卸货：0 否；1 是 */
    allowDriverUnload?: string;
    /** 预计发车日期 */
    planSendDate?: string;
    /** 计划发车时间 */
    planSendTime?: string;
    /** 备注 */
    memo?: string;
    isSubmit?: boolean;
    /** 派车申请关联发运订单明细列表 */
    items?: BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto[];
    /** 派车申请单运输路线列表 */
    locationItems?: BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderLocationItemDto[];
  };

  type BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    /** 派车单号 */
    number?: string;
    /** 单据状态 B1草稿 C1待审批 D1通过审批 E1确认下发 F1取消派车 */
    status?: string;
    /** 运输类型编码 */
    transportTypeCode?: string;
    /** 运输类型名称 */
    transportTypeName?: string;
    offStrategy?: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 发车位置编码 */
    startLocationCode?: string;
    /** 发车位置名称 */
    startLocationName?: string;
    /** 发车位置具体点 */
    startLocationDefinite?: string;
    /** 发车位置地址 */
    startLocationAddress?: string;
    /** 发车位置公司 */
    startLocationCompany?: string;
    /** 发车位置联系人 */
    startLocationContacts?: string;
    /** 发车位置联系电话 */
    startLocationContactTel?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 派车单行号--确认派车后写入 */
    transportOrderId?: number;
    /** 派车单单号--确认派车后写入 */
    transportOrderNumber?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车辆载重 */
    vehicleLoadCapactity?: number;
    /** 车辆容积尺寸 */
    vehicleContainerSize?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 装车员 */
    deliveryMan?: string;
    /** 司机登录用户 */
    driverUserId?: string;
    /** 装车员电话 */
    deliveryManTel?: string;
    /** 驾驶员是否卸货：0 否；1 是 */
    allowDriverUnload?: string;
    /** 预计发车日期 */
    planSendDate?: string;
    /** 计划发车时间 */
    planSendTime?: string;
    /** 备注 */
    memo?: string;
    /** 派车申请关联发运订单明细列表 */
    items?: BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto[];
    /** 派车申请单运输路线列表 */
    locationItems?: BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderLocationItemDto[];
  };

  type BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    transportDistributeOrderId?: string;
    sort: number;
    /** 发运订单主键Id */
    shipmentOrderId?: number;
    /** 发运订单号 */
    shipmentOrderNumber?: string;
    /** 客户编码 */
    customerCode?: string;
    /** 客户名称 */
    customerName?: string;
    /** 发运时间 */
    shipmentTime?: string;
    /** 发运地点 */
    shipmentLocationCode?: string;
    /** 发运地点名称 */
    shipmentLocationName?: string;
    /** 发运地点具体位置 */
    shipmentLocationDefiniteText?: string;
    /** 发运备注情况 */
    shipmentMemo?: string;
  };

  type BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderLocationItemDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    transportDistributeOrderId?: string;
    /** 派车单号 */
    sort: number;
    /** 地点编码 */
    locationCode: string;
    /** 地点名称 */
    locationName: string;
    /** 具体运输位置信息 */
    locationDefiniteText: string;
    transportLocationType: BurnAbpTMS_paichedingdanTransportLocationType;
    /** 地址 */
    locationAddress?: string;
    /** 联系人 */
    locationContact?: string;
    /** 联系电话 */
    locationContactTel?: string;
    /** 经度 */
    locationLongitude: string;
    /** 纬度 */
    locationLatitude: string;
  };

  type BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 设备编码 */
    deviceCode?: string;
    /** 设备名称 */
    deviceName?: string;
    /** 车辆车牌号 */
    vehicleCarNo: string;
  };

  type BurnAbpTMS_shoufahuorenxinxiContactsDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted?: boolean;
    deleterId?: string;
    deletionTime?: string;
    type?: BurnAbpTMSEnumEnumContactsType;
    /** 姓名 */
    name?: string;
    /** 手机号 */
    phone?: string;
    /** 邮箱 */
    email?: string;
  };

  type BurnAbpTMS_sijixinxiDtoDriverDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 编号 */
    code?: string;
    /** 姓名 */
    name?: string;
    /** 司机电话 */
    tel?: string;
    /** 性别 */
    sex?: string;
    /** 用户登录Id */
    userId?: string;
    /** 驾驶证等级：A1，A2，B1，B2,C1 */
    driverLicenseLevel?: string;
    /** 驾驶证编号 */
    driverLicense?: string;
    /** 驾驶证照片信息 */
    driverLicenseBlobName?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_tiaomajiexiBarCodeStatus = 5 | 10 | 15;

  type BurnAbpTMS_tiaomajiexiShipmentBarCodeBoxLotModel = {
    modelNumber?: string;
    lotNumber?: string;
    batchNo?: string;
    dateCode?: string;
    qty?: number;
    origin?: string;
  };

  type BurnAbpTMS_tiaomajiexiShipmentBarCodeInfoModel = {
    traceId?: string;
    boxNumber?: string;
    barCode?: string;
    shipmentOrderNo?: string;
    materialCode?: string;
    materialOutCode?: string;
    materialDescript?: string;
    materialSpecificationModel?: string;
    unitName?: string;
    taskOrder?: string;
    contractNo?: string;
    purchaseOrderCode?: string;
    qty?: number;
    barCodeStatus?: BurnAbpTMS_tiaomajiexiBarCodeStatus;
    sourceBillNumber?: string;
    sourceBillNumberItemId?: number;
    boxLots?: BurnAbpTMS_tiaomajiexiShipmentBarCodeBoxLotModel[];
  };

  type BurnAbpTMS_weizhixinxiDtoLocationInfoDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 货运点编号 */
    code?: string;
    /** 货运点名称 */
    name?: string;
    /** 是否可以作为起点 */
    canStart?: boolean;
    /** 地址 */
    address?: string;
    /** 经度 */
    longitude?: string;
    /** 纬度 */
    latitude?: string;
    /** 联系人 */
    contact?: string;
    /** 联系人电话 */
    contactTel?: string;
    /** 备注 */
    memo?: string;
    items?: BurnAbpTMS_weizhixinxiDtoLocationInfoItemDto[];
  };

  type BurnAbpTMS_weizhixinxiDtoLocationInfoItemDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 货运点ID */
    locationInfoId?: number;
    /** 交货点编码 */
    locationInfoCode?: string;
    /** 交货点简称 */
    name?: string;
    /** 交货具体点 */
    definite?: string;
    /** 联系人 */
    contact?: string;
    /** 联系人电话 */
    contactTel?: string;
    /** 交货点具体地址 */
    address?: string;
    /** 经度 */
    longitude?: string;
    /** 纬度 */
    latitude?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto = {
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
    /** 物料编码 */
    materialCode?: string;
    /** 物料外码 */
    materialOutCode?: string;
    /** 物料描述 */
    materialDescription?: string;
    /** 发运班组编码 */
    shipmentTeamCode?: string;
    /** 发运班组名称 */
    shipmentTeamName?: string;
    /** 备注信息 */
    memo?: string;
  };

  type BurnAbpTMS_wuliaofenleiMaterialClassDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 父ID */
    parentId?: number;
    /** 分类编码 */
    code?: string;
    /** 分类名称 */
    name?: string;
    /** 分类类型 */
    type?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_yunshufeiyongjieguoTransportCostResultDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 派车单Id */
    transportOrderId?: number;
    /** 派车单号 */
    transportOrderNumber?: string;
    /** 车牌号 */
    carNo?: string;
    /** 车型 */
    vehicleModel?: string;
    /** 司机 */
    deliveryMan?: string;
    /** 司机手机 */
    deliveryManTel?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 总里程 */
    totalDistance?: number;
    /** 总耗时 */
    totalDuration?: number;
    /** 总费用 */
    totalCost?: number;
    costItems?: BurnAbpTMS_yunshufeiyongjieguoTransportCostResultItemDto[];
  };

  type BurnAbpTMS_yunshufeiyongjieguoTransportCostResultItemDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    /** 费用编码 */
    costCode?: string;
    /** 费用名称 */
    costName?: string;
    /** 单价 */
    price?: number;
    /** 数量 */
    qty?: number;
    /** 费用 */
    cost?: number;
  };

  type BurnAbpTMS_yunshuleixingcelveTransportStrategy = 1 | 2 | 4 | 8;

  type BurnAbpTMS_yunshuleixingTransportTypeDto = {
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
    code: string;
    /** 类型名称 */
    name: string;
    offStrategy: BurnAbpTMS_yunshuleixingcelveTransportStrategy;
    /** 描述 */
    description?: string;
  };

  type BurnAbpTMS_yunshuluxianTransportLineDto = {
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
    /** 距离 */
    distance?: number;
    /** 费率 */
    cost?: number;
    /** 是否启用 */
    isEnable?: boolean;
    /** 运输路线停靠明细列表 */
    items?: BurnAbpTMS_yunshuluxianTransportLineItemDto[];
  };

  type BurnAbpTMS_yunshuluxianTransportLineItemDto = {
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
    /** 主要单据ID */
    transportLineId?: string;
    /** 序号 */
    sort: number;
    /** 地点编码 */
    locationCode: string;
    /** 地点名称 */
    locationName: string;
    /** 具体地址 */
    locationAddress?: string;
    /** 联系人 */
    locationContacts?: string;
    /** 联系电话 */
    locationContactTel?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_zhanbanLPNxinxiTraceIdDto = {
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
    traceType?: BurnAbpTMS_zhanbanLPNxinxiTraceType;
    /** 顺序号 */
    sort?: number;
  };

  type BurnAbpTMS_zhanbanLPNxinxiTraceType = 0 | 1;

  type BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto = {
    id?: string;
    /** 编码 */
    code?: string;
    /** 名称 */
    name?: string;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto = {
    id?: number;
    /** 状态
B1 草稿;
B2 退回修改;
B3 退回修改(通过);
C1 待审批;
C2 重新审批;
C3 重新审批(通过);
D1 通过 */
    status?: string;
    /** 提交人 */
    creator?: string;
    /** 提交日期 */
    creationTime?: string;
    /** 创建人 */
    submiter?: string;
    /** 创建日期 */
    submitDate?: string;
    /** 审核人 */
    checker?: string;
    /** 审核日期 */
    checkDate?: string;
    /** 更改人 */
    lastModifier?: string;
    /** 更改日期 */
    lastModificationTime?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    extraIndexProperties?: Record<string, any>;
    /** 编号 */
    code?: string;
    /** 描述 */
    name?: string;
    /** 周转箱类型编码 */
    palletTypCode?: string;
    /** 周转箱类型名称 */
    palletTypName?: string;
    /** 规格 */
    specification?: string;
    /** 长 */
    long?: number;
    /** 宽 */
    width?: number;
    /** 备注 */
    memo?: string;
  };

  type BurnAbpTMSBindDeviceInfoDto = {
    /** 车辆车牌号 */
    vehicleCarNo?: string;
  };

  type BurnAbpTMSCreateDeviceInfoDto = {
    /** 设备编码 */
    code?: string;
    /** 设备名称 */
    name?: string;
    deviceType?: BurnAbpTMSEnumEnumDeviceType;
    /** 来源类型 */
    sourceType?: string;
    /** 绑定车辆车牌号 */
    bindVehicleCarNo?: string;
  };

  type BurnAbpTMSDailyDeliveryDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 发运班组 */
    teamName?: string;
    /** JIT类型 */
    shipType?: string;
    /** 合同号 */
    contractNo?: string;
    /** 编码 */
    code?: string;
    /** 物料编码 */
    materialCode?: string;
    /** 需求数量 */
    quantity?: number;
    /** 交货日期 */
    deliveryDate?: string;
    /** 交货地址 */
    deliveryAddress?: string;
    /** 数据提供者 */
    providerName?: string;
    /** 备注 */
    remark?: string;
    /** asn单号 */
    asnCode?: string;
    shipmentStatus?: BurnAbpTMSEnumEnumShipmentStatus;
    deliveryStatus?: BurnAbpTMSEnumEnumDeliveryStatus;
  };

  type BurnAbpTMSDeviceInfoDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 设备编码 */
    code?: string;
    /** 设备名称 */
    name?: string;
    deviceType?: BurnAbpTMSEnumEnumDeviceType;
    /** 来源类型 */
    sourceType?: string;
    /** 绑定车辆车牌号 */
    bindVehicleCarNo?: string;
    /** 创建人 */
    creator?: string;
    /** 最后修改人 */
    lastModifier?: string;
  };

  type BurnAbpTMSEnumDirection = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  type BurnAbpTMSEnumEnumContactsType = 5 | 10;

  type BurnAbpTMSEnumEnumDeliveryStatus = 0 | 1 | 2;

  type BurnAbpTMSEnumEnumDeviceType = 0 | 1;

  type BurnAbpTMSEnumEnumShipmentStatus = 0 | 1;

  type BurnAbpTMSEnumVehicleLocationStatus = 0 | 1 | 2 | 3;

  type BurnAbpTMSGpsDeviceLocationProviderDto = {
    name?: string;
    displayName?: string;
  };

  type BurnAbpTMSShipmentBoxLotCompareFailedLogsCreateShipmentBoxLotCompareFailedLogAttachmentDto =
    {
      /** 文件名 */
      fileName: string;
      /** 内容类型 */
      contentType?: string;
      /** 大小 */
      size?: number;
      /** Blob */
      blobName: string;
    };

  type BurnAbpTMSShipmentBoxLotCompareFailedLogsCreateShipmentBoxLotCompareFailedLogAttachmentInput =
    {
      attachments?: BurnAbpTMSShipmentBoxLotCompareFailedLogsCreateShipmentBoxLotCompareFailedLogAttachmentDto[];
    };

  type BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogAttachmentDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    /** 文件名 */
    fileName?: string;
    /** 内容类型 */
    contentType?: string;
    /** 大小 */
    size?: number;
    /** Blob */
    blobName?: string;
  };

  type BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 发运单号 */
    shipmentOrderCode?: string;
    /** 供应商箱号 */
    supplierBoxNumber?: string;
    /** 客户箱号 */
    customerBoxNumber?: string;
    /** 批号 */
    lotNumber?: string;
    /** 信息 */
    message?: string;
    /** 是否已处理 */
    isHandled?: boolean;
    attachments?: BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogAttachmentDto[];
  };

  type BurnAbpTMSSubmitOrderBaseDto = {
    /** 提交的单据Id */
    id?: string;
    /** 提交方向 0-反审核 1-审核 */
    direction?: number;
  };

  type BurnAbpTMSTransportOrderVehicleTravelLocusDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    /** 订单Id */
    orderId?: number;
    /** 订单编号 */
    orderNumber?: string;
    /** 车型编码 */
    vehicleModelCode?: string;
    /** 车型 */
    vehicleModelName?: string;
    /** 车牌号 */
    carNo?: string;
    /** 驾驶员 */
    driverName?: string;
    /** 驾驶员电话 */
    driverTel?: string;
    /** 来源 */
    sourceName?: string;
    points?: BurnAbpTMSTransportOrderVehicleTravelLocusPointDto[];
  };

  type BurnAbpTMSTransportOrderVehicleTravelLocusPointDto = {
    id?: string;
    /** 记录Id */
    recordId?: string;
    /** 经度 */
    longitude?: number;
    /** 纬度 */
    latitude?: number;
    /** 速度 */
    speed?: number;
    direction?: BurnAbpTMSEnumDirection;
    /** 方向偏移度数 */
    directionDegree?: number;
    /** 记录时间 */
    recordTime?: string;
    /** Creation time. */
    creationTime?: string;
  };

  type BurnAbpTMSUpdateDailyDeliveryDto = {
    /** JIT类型 */
    shipType?: string;
    /** 合同号 */
    contractNo?: string;
    /** 备注 */
    remark?: string;
    /** asn单号 */
    asnCode?: string;
  };

  type BurnAbpTMSUpdateDeviceInfoDto = {
    /** 设备编码 */
    code?: string;
    /** 设备名称 */
    name?: string;
    deviceType?: BurnAbpTMSEnumEnumDeviceType;
    /** 来源类型 */
    sourceType?: string;
    /** 绑定车辆车牌号 */
    bindVehicleCarNo?: string;
  };

  type BurnAbpTMSVehicleLocationDto = {
    id?: string;
    /** 车辆车牌号 */
    vehicleCarNo?: string;
    /** 经度 */
    longitude?: number;
    /** 维度 */
    latitude?: number;
    status?: BurnAbpTMSEnumVehicleLocationStatus;
    /** 运输轨迹 */
    transportPath?: string;
    /** 位置提供者 */
    providerName?: string;
    /** Creation time. */
    creationTime?: string;
    /** The last modified time for this entity. */
    lastModificationTime?: string;
  };

  type ContactsDeleteAsyncParams = {
    id: string;
  };

  type ContactsGetAsyncParams = {
    id: string;
  };

  type ContactsGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ContactsUpdateAsyncParams = {
    id: string;
  };

  type CustomerContactDeleteAsyncParams = {
    id: number;
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

  type CustomerContactUpdateAsyncParams = {
    id: number;
  };

  type CustomerDeleteAsyncParams = {
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

  type CustomerGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type CustomerGetLocationInfosAsyncParams = {
    id: number;
  };

  type CustomerUpdateAsyncParams = {
    id: number;
  };

  type CustomerUpdateLocationsAsyncParams = {
    id: number;
  };

  type DailyDeliveryGetAsyncParams = {
    id: string;
  };

  type DailyDeliveryGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type DailyDeliveryUpdateAsyncParams = {
    id: string;
  };

  type DeviceBindRecordDeleteAsyncParams = {
    id: string;
  };

  type DeviceBindRecordGetAsyncParams = {
    id: string;
  };

  type DeviceBindRecordGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type DeviceBindRecordUpdateAsyncParams = {
    id: string;
  };

  type DeviceInfoBindAsyncParams = {
    id: string;
  };

  type DeviceInfoDeleteAsyncParams = {
    id: string;
  };

  type DeviceInfoGetAsyncParams = {
    id?: string;
  };

  type DeviceInfoGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type DeviceInfoUnBindAsyncParams = {
    id: string;
  };

  type DeviceInfoUpdateAsyncParams = {
    id: string;
  };

  type DriverDeleteAsyncParams = {
    id: number;
  };

  type DriverExportAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type DriverGetAsyncParams = {
    id?: number;
  };

  type DriverGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type DriverImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type DriverUpdateAsyncParams = {
    id: number;
  };

  type FreightCostCreateFreightCostIntervalAsyncParams = {
    id: string;
  };

  type FreightCostDeleteAsyncParams = {
    id: string;
  };

  type FreightCostDeleteFreightCostIntervalAsyncParams = {
    id: string;
    intervalId: string;
  };

  type FreightCostGetAsyncParams = {
    id: string;
  };

  type FreightCostGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type FreightCostUpdateAsyncParams = {
    id: string;
  };

  type FreightCostUpdateFreightCostIntervalAsyncParams = {
    id: string;
    intervalId: string;
  };

  type FreightMileageDeleteAsyncParams = {
    id: number;
  };

  type FreightMileageGetAsyncParams = {
    id: number;
  };

  type FreightMileageGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type FreightMileageUpdateAsyncParams = {
    id: number;
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
    /** 标签类型编码 */
    PrintFeatureCode?: string;
    /** 标签模板Id或者编码 */
    LabelTemplateId?: string;
    /** 条码 */
    Identifier?: string;
    /** 是否试机打印 */
    IsTest?: boolean;
    ExtraProperties?: Record<string, any>;
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
    /** 功能 */
    Feature?: string;
    /** 物料分类编码 */
    MaterialClassCode?: string;
    /** 物料编码 */
    MaterialItemCode?: string;
    /** 客户编码 */
    CustomerCode?: string;
    /** 扩展属性 */
    ExtensionProperties?: Record<string, any>;
  };

  type LabelPrintDefinitionUpdateAsyncParams = {
    id: string;
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

  type LabelPrintTemplateDeleteAsyncParams = {
    id: string;
  };

  type LabelPrintTemplateGetAsyncParams = {
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

  type LocationInfoDeleteAsyncParams = {
    id: number;
  };

  type LocationInfoExportAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type LocationInfoGetAsyncParams = {
    id?: number;
  };

  type LocationInfoGetDetailListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type LocationInfoGetItemListByCodeAsyncParams = {
    code?: string;
  };

  type LocationInfoGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type LocationInfoImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type LocationInfoUpdateAsyncParams = {
    id: number;
  };

  type MaterialClassDeleteAsyncParams = {
    id: number;
  };

  type MaterialClassGetAsyncParams = {
    id: number;
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

  type MaterialItemDeleteAsyncParams = {
    id: number;
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

  type MaterialItemGetAsyncParams = {
    id?: number;
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

  type MaterialItemUpdateAsyncParams = {
    id: number;
  };

  type MaterialTeamRelationMapDeleteAsyncParams = {
    id: string;
  };

  type MaterialTeamRelationMapGetAsyncParams = {
    id: string;
  };

  type MaterialTeamRelationMapGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type MaterialTeamRelationMapImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type MaterialTeamRelationMapUpdateAsyncParams = {
    id: string;
  };

  type PalletDeleteAsyncParams = {
    id: number;
  };

  type PalletExportAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type PalletGetAsyncParams = {
    id?: number;
  };

  type PalletGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type PalletImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type PalletTypeDeleteAsyncParams = {
    id: string;
  };

  type PalletTypeGetAsyncParams = {
    id: string;
  };

  type PalletTypeGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type PalletTypeUpdateAsyncParams = {
    id: string;
  };

  type PalletUpdateAsyncParams = {
    id: number;
  };

  type ShipmentBarCodeResolverResolverDataAsyncParams = {
    barCode?: string;
  };

  type ShipmentBoxLotCompareFailedGetAsyncParams = {
    id: string;
  };

  type ShipmentBoxLotCompareFailedGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentBoxLotCompareFailedMarkAsHandledAsyncParams = {
    id: string;
  };

  type ShipmentBoxLotCompareFailedUploadAttachmentsAsyncParams = {
    id: string;
  };

  type ShipmentOrderDeleteAsyncParams = {
    id: number;
  };

  type ShipmentOrderExportAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderExportDetailsAsyncParams = {
    id: number;
  };

  type ShipmentOrderGetAsyncParams = {
    id?: number;
  };

  type ShipmentOrderGetBoxItemListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetBoxLotListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetByNumberAsyncParams = {
    number?: string;
  };

  type ShipmentOrderGetCancelableListAsyncParams = {
    number?: string;
  };

  type ShipmentOrderGetCheckedBoxListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetCollectBoxListAsyncParams = {
    number: string;
  };

  type ShipmentOrderGetItemListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetShipmentCheckItemAsyncParams = {
    number: string;
  };

  type ShipmentOrderGetShipmentViewAsyncParams = {
    dateTime: string;
  };

  type ShipmentOrderGetSignBackInfoByNumberAsyncParams = {
    number?: string;
  };

  type ShipmentOrderGetUnRelationTransportListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetWaitBoxListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderGetWaitItemListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentOrderImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type ShipmentOrderImportShipmentBoxAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type ShipmentOrderInteriorGetAsnItemByMaterialAsyncParams = {
    /** 物料编码 */
    MaterialCode?: string;
    /** 物料外码 */
    MaterialOutCode?: string;
  };

  type ShipmentOrderInteriorGetAsnMaterialPackAsyncParams = {
    /** ASN单据号 */
    AsnNo?: string;
    /** 物料编码 */
    MaterialCode?: string;
    /** 物料外码 */
    MaterialOutCode?: string;
  };

  type ShipmentOrderInteriorGetByAsnNoAsyncParams = {
    asnNo?: string;
  };

  type ShipmentOrderInteriorGetShipmentOrderBoxItemAsyncParams = {
    boxNumber?: string;
  };

  type ShipmentOrderReCallBackAsyncParams = {
    id?: number;
  };

  type ShipmentOrderShipmentCompletedAsyncParams = {
    number?: string;
  };

  type ShipmentOrderShouldPrintShipmentBoxLotLabelsAsyncParams = {
    id: number;
    materialCode?: string;
  };

  type ShipmentOrderSubmitAsyncParams = {
    id: number;
  };

  type ShipmentOrderSynchronousAssignedAsnAsyncParams = {
    shipmentOrderNo?: string;
  };

  type ShipmentOrderUpdateAsyncParams = {
    id: number;
  };

  type ShipmentTeamDeleteAsyncParams = {
    id: string;
  };

  type ShipmentTeamGetAsyncParams = {
    id: string;
  };

  type ShipmentTeamGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type ShipmentTeamUpdateAsyncParams = {
    id: string;
  };

  type TraceIdGetAsyncParams = {
    id: string;
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

1 = 栈板 */
    traceType?: BurnAbpTMS_zhanbanLPNxinxiTraceType;
    number?: number;
  };

  type TransportCompanyDeleteAsyncParams = {
    id: string;
  };

  type TransportCompanyGetAsyncParams = {
    id: string;
  };

  type TransportCompanyGetAvatarBlobFileAsyncParams = {
    blobName: string;
  };

  type TransportCompanyGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportCompanyUpdateAsyncParams = {
    id: string;
  };

  type TransportCostResultGetAsyncParams = {
    id: string;
  };

  type TransportCostResultGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportCostResultRecalculateAsyncParams = {
    id: string;
  };

  type TransportDistributeOrderDeleteAsyncParams = {
    id: string;
  };

  type TransportDistributeOrderGetAsyncParams = {
    id?: string;
  };

  type TransportDistributeOrderGetItemListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportDistributeOrderGetItemListByIdAsyncParams = {
    transportDistributeId?: string;
  };

  type TransportDistributeOrderGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportDistributeOrderGetLocationItemListByIdAsyncParams = {
    transportDistributeId?: string;
  };

  type TransportDistributeOrderUpdateAsyncParams = {
    id: string;
  };

  type TransportLineDeleteAsyncParams = {
    id: string;
  };

  type TransportLineGetAsyncParams = {
    id: string;
  };

  type TransportLineGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportLineUpdateAsyncParams = {
    id: string;
  };

  type TransportOrderCancelCheckCompleteAsyncParams = {
    id?: number;
  };

  type TransportOrderConfirmUnloadLocationAsyncParams = {
    id?: number;
  };

  type TransportOrderDeleteAsyncParams = {
    id: number;
  };

  type TransportOrderExportAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderGetAsyncParams = {
    id?: number;
  };

  type TransportOrderGetAvailableVehicleListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderGetBoxItemListByTransportNumberAsyncParams = {
    transportNumber?: string;
  };

  type TransportOrderGetCheckCompletedOrdersAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderGetLocationDetailItemListByIdAsyncParams = {
    transportOrderId?: number;
  };

  type TransportOrderGetLocationItemListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderGetLocationItemListByIdAsyncParams = {
    transportOrderId?: number;
  };

  type TransportOrderGetLocationPalletItemListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderGetPrintSourceDataAsyncParams = {
    number?: string;
  };

  type TransportOrderGetShipmentBoxItemListByIdAsyncParams = {
    transportOrderId?: number;
  };

  type TransportOrderGetShipmentListByIdAsyncParams = {
    transportOrderId?: number;
  };

  type TransportOrderGetShipmentListByNumberAsyncParams = {
    transportOrderNumber?: string;
  };

  type TransportOrderGetTransportingOrdersAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportOrderUpdateAsyncParams = {
    id: number;
  };

  type TransportOrderVehicleTravelLocusFindByOrderIdAsyncParams = {
    orderId: number;
  };

  type TransportOrderVehicleTravelLocusGetAsyncParams = {
    id: string;
  };

  type TransportOrderVehicleTravelLocusGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportTypeDeleteAsyncParams = {
    id: string;
  };

  type TransportTypeGetAsyncParams = {
    id: string;
  };

  type TransportTypeGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type TransportTypeUpdateAsyncParams = {
    id: string;
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
    id?: number;
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

  type UnitUpdateAsyncParams = {
    id: number;
  };

  type VehicleDeleteAsyncParams = {
    id: number;
  };

  type VehicleExportAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type VehicleGetAsyncParams = {
    id?: number;
  };

  type VehicleGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type VehicleImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type VehicleLocationGetAsyncParams = {
    id: string;
  };

  type VehicleLocationGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type VehicleModelDeleteAsyncParams = {
    id: string;
  };

  type VehicleModelGetAsyncParams = {
    id: string;
  };

  type VehicleModelGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type VehicleModelUpdateAsyncParams = {
    id: string;
  };

  type VehicleTravelLocusDeleteAsyncParams = {
    id: number;
  };

  type VehicleTravelLocusGetAsyncParams = {
    id: number;
  };

  type VehicleTravelLocusGetListAsyncParams = {
    Filter?: string;
    Page?: number;
    PageSize?: number;
    OrderBy?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
  };

  type VehicleTravelLocusUpdateAsyncParams = {
    id: number;
  };

  type VehicleUpdateAsyncParams = {
    id: number;
  };

  type VoloAbpApplicationDtosListResultDtoBurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto =
    {
      items?: BurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto[];
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto = {
    items?: BurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto =
    {
      items?: BurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelCategoriesLabelCategoryDto = {
    items?: BurnAbpLabelManagementLabelCategoriesLabelCategoryDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto =
    {
      items?: BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto =
    {
      items?: BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto =
    {
      items?: BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto =
    {
      items?: BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelTypesLabelTypeDto = {
    items?: BurnAbpLabelManagementLabelTypesLabelTypeDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto = {
    items?: BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_cheliangxinxiDtoVehicleDto = {
    items?: BurnAbpTMS_cheliangxinxiDtoVehicleDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_chengyunshangTransportCompanyDto = {
    items?: BurnAbpTMS_chengyunshangTransportCompanyDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_chexingguanliVehicleModelDto = {
    items?: BurnAbpTMS_chexingguanliVehicleModelDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_danweixinxiUnitDto = {
    items?: BurnAbpTMS_danweixinxiUnitDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayunbanzuShipmentTeamDto = {
    items?: BurnAbpTMS_fayunbanzuShipmentTeamDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto = {
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderBoxLotDto = {
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderBoxLotDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderDto = {
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderItemDto = {
    items?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderItemWithOrderDto =
    {
      items?: BurnAbpTMS_fayundingdanDtoShipmentOrderItemWithOrderDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_huowuxinxiMaterialItemDto = {
    items?: BurnAbpTMS_huowuxinxiMaterialItemDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_huoyunfeiyongFreightCostDto = {
    items?: BurnAbpTMS_huoyunfeiyongFreightCostDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_huoyunlichengFreightMileageDto = {
    items?: BurnAbpTMS_huoyunlichengFreightMileageDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto = {
    items?: BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_kehuxinxiCustomerDto = {
    items?: BurnAbpTMS_kehuxinxiCustomerDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_kufangxinxiWareHouseDto = {
    items?: BurnAbpTMS_kufangxinxiWareHouseDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderDto = {
    items?: BurnAbpTMS_paichedingdanDtoTransportOrderDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderLocationItemDto =
    {
      items?: BurnAbpTMS_paichedingdanDtoTransportOrderLocationItemDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderLocationPalletItemDto =
    {
      items?: BurnAbpTMS_paichedingdanDtoTransportOrderLocationPalletItemDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto =
    {
      items?: BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto =
    {
      items?: BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto = {
    items?: BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_shoufahuorenxinxiContactsDto = {
    items?: BurnAbpTMS_shoufahuorenxinxiContactsDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_sijixinxiDtoDriverDto = {
    items?: BurnAbpTMS_sijixinxiDtoDriverDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_weizhixinxiDtoLocationInfoDto = {
    items?: BurnAbpTMS_weizhixinxiDtoLocationInfoDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_weizhixinxiDtoLocationInfoItemDto = {
    items?: BurnAbpTMS_weizhixinxiDtoLocationInfoItemDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto =
    {
      items?: BurnAbpTMS_wuliaobanzuyingsheMaterialTeamRelationMapDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_wuliaofenleiMaterialClassDto = {
    items?: BurnAbpTMS_wuliaofenleiMaterialClassDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_yunshufeiyongjieguoTransportCostResultDto = {
    items?: BurnAbpTMS_yunshufeiyongjieguoTransportCostResultDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_yunshuleixingTransportTypeDto = {
    items?: BurnAbpTMS_yunshuleixingTransportTypeDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_yunshuluxianTransportLineDto = {
    items?: BurnAbpTMS_yunshuluxianTransportLineDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_zhanbanLPNxinxiTraceIdDto = {
    items?: BurnAbpTMS_zhanbanLPNxinxiTraceIdDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto = {
    items?: BurnAbpTMS_zhouzhuanxiangleixingDtoPalletTypeDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto = {
    items?: BurnAbpTMS_zhouzhuanxiangxinxiDtoPalletDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSDailyDeliveryDto = {
    items?: BurnAbpTMSDailyDeliveryDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSDeviceInfoDto = {
    items?: BurnAbpTMSDeviceInfoDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto =
    {
      items?: BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto[];
      totalCount?: number;
    };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSTransportOrderVehicleTravelLocusDto = {
    items?: BurnAbpTMSTransportOrderVehicleTravelLocusDto[];
    totalCount?: number;
  };

  type VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSVehicleLocationDto = {
    items?: BurnAbpTMSVehicleLocationDto[];
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

  type WareHouseDeleteAsyncParams = {
    id: number;
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
    id: number;
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

  type WareHouseImportAsyncParams = {
    ProviderName?: string;
    ShipmentOrderId?: number;
    /** 是否动态发运数量(如果箱的数量超过明细数量,则更新明细数量) */
    DynamicShipmentQuantity?: boolean;
  };

  type WareHouseUpdateAsyncParams = {
    id: number;
  };
}
