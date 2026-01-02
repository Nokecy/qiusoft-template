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

  type AttachmentBlobDownloadAsyncParams = {
    id: string;
  };

  type AttachmentBlobDownloadByBlobNameAsyncParams = {
    blobName: string;
  };

  type AttachmentDeleteAsyncParams = {
    id: string;
  };

  type AttachmentGetAsyncParams = {
    id: string;
  };

  type AttachmentGetListAsyncParams = {
    entityId?: string;
    entityName?: string;
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
  };

  type BurnAbpAttachmentManageModelsMediaAttachmentModel = {
    fileName?: string;
    size?: number;
    contentType?: string;
    blobName?: string;
    thumbnailBlobName?: string;
    thumbnailSize?: number;
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
  };

  type BurnAbpTempBlobAspNetCoreModelValidateFileModel = {
    chunks?: number;
    fileName?: string;
    fullSize?: number;
    uid?: string;
    extName?: string;
  };

  type MediaTempBlobConfirmVideoAsyncParams = {
    Uid?: string;
    FileName?: string;
    ContentType?: string;
    Chunks?: number;
  };

  type StaticFileBlobGetStaticFileAsyncParams = {
    blobName: string;
  };

  type StaticFileBlobGetStaticFileBaseAsyncParams = {
    blobName: string;
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
    flagIcon?: string;
  };

  type VoloAbpNameValue = {
    name?: string;
    value?: string;
  };
}
