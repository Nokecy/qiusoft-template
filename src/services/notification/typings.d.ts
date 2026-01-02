declare namespace API {
  type AbpApiDefinitionGetParams = {
    IncludeTypes?: boolean;
    'api-version'?: string;
  };

  type AbpApplicationConfigurationGetAsyncParams = {
    IncludeLocalizationResources?: boolean;
    'api-version'?: string;
  };

  type AbpApplicationLocalizationGetAsyncParams = {
    CultureName: string;
    OnlyDynamics?: boolean;
    'api-version'?: string;
  };

  type BurnAbpNotificationManagerNotificationDefinitionDto = {
    name?: string;
    displayName?: VoloAbpLocalizationILocalizableString;
    description?: VoloAbpLocalizationILocalizableString;
    attributes?: Record<string, any>;
    isSubscription?: boolean;
  };

  type BurnAbpNotificationManagerNotificationDetailDto = {
    id?: string;
    notificationName?: string;
    data?: BurnAbpNotificationsNotificationData;
    entityTypeName?: string;
    entityId?: any;
    severity?: BurnAbpNotificationsNotificationSeverity;
    creationTime?: string;
  };

  type BurnAbpNotificationManagerNotificationPublishDto = {
    notificationName?: string;
    data?: BurnAbpNotificationsNotificationData;
    entityIdentifier?: BurnAbpNotificationsEntityIdentifier;
    severity?: BurnAbpNotificationsNotificationSeverity;
    userIds?: BurnAbpNotificationsUserIdentifier[];
    excludedUserIds?: BurnAbpNotificationsUserIdentifier[];
    tenantIds?: string[];
  };

  type BurnAbpNotificationManagerUserNotificationDto = {
    id?: string;
    userId?: string;
    state?: BurnAbpNotificationsUserNotificationState;
    detail?: BurnAbpNotificationManagerNotificationDetailDto;
  };

  type BurnAbpNotificationsEntityIdentifier = {
    type?: SystemType;
    id?: any;
  };

  type BurnAbpNotificationsNotificationData = {
    type?: string;
    properties?: Record<string, any>;
  };

  type BurnAbpNotificationsNotificationSeverity = 0 | 1 | 2 | 3 | 4;

  type BurnAbpNotificationsUserIdentifier = {
    tenantId?: string;
    userId?: string;
  };

  type BurnAbpNotificationsUserNotificationState = 0 | 1;

  type DotNetifyWebApiDisposeVMParams = {
    vmId: string;
    'api-version'?: string;
  };

  type DotNetifyWebApiDotNetifyWebApiIntegrationPayload = {
    callType?: string;
    vmId?: string;
    vmArgs?: string;
    value?: string;
  };

  type DotNetifyWebApiDotNetifyWebApiIntegrationRequest = {
    connectionId?: string;
    payload?: DotNetifyWebApiDotNetifyWebApiIntegrationPayload;
  };

  type DotNetifyWebApiIntegrationDisconnectParams = {
    'api-version'?: string;
  };

  type DotNetifyWebApiIntegrationMessageParams = {
    'api-version'?: string;
  };

  type DotNetifyWebApiRequestVMParams = {
    vmId: string;
    vmArg?: string;
    'api-version'?: string;
  };

  type DotNetifyWebApiUpdateVMParams = {
    vmId: string;
    'api-version'?: string;
  };

  type NotificationDefinitionGetListAsyncParams = {
    'api-version'?: string;
  };

  type NotificationDefinitionSubscribeAsyncParams = {
    notificationName: string;
    'api-version'?: string;
  };

  type NotificationDefinitionUnsubscribeAsyncParams = {
    notificationName: string;
    'api-version'?: string;
  };

  type SystemIntPtr = true;

  type SystemModuleHandle = {
    mdStreamVersion?: number;
  };

  type SystemReflectionAssembly = {
    definedTypes?: SystemReflectionTypeInfo[];
    exportedTypes?: SystemType[];
    codeBase?: string;
    entryPoint?: SystemReflectionMethodInfo;
    fullName?: string;
    imageRuntimeVersion?: string;
    isDynamic?: boolean;
    location?: string;
    reflectionOnly?: boolean;
    isCollectible?: boolean;
    isFullyTrusted?: boolean;
    customAttributes?: SystemReflectionCustomAttributeData[];
    escapedCodeBase?: string;
    manifestModule?: SystemReflectionModule;
    modules?: SystemReflectionModule[];
    globalAssemblyCache?: boolean;
    hostContext?: number;
    securityRuleSet?: SystemSecuritySecurityRuleSet;
  };

  type SystemReflectionCallingConventions = 1 | 2 | 3 | 32 | 64;

  type SystemReflectionConstructorInfo = {
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    attributes?: SystemReflectionMethodAttributes;
    methodImplementationFlags?: SystemReflectionMethodImplAttributes;
    callingConvention?: SystemReflectionCallingConventions;
    isAbstract?: boolean;
    isConstructor?: boolean;
    isFinal?: boolean;
    isHideBySig?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isVirtual?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isConstructedGenericMethod?: boolean;
    isGenericMethod?: boolean;
    isGenericMethodDefinition?: boolean;
    containsGenericParameters?: boolean;
    methodHandle?: SystemRuntimeMethodHandle;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    memberType?: SystemReflectionMemberTypes;
  };

  type SystemReflectionCustomAttributeData = {
    attributeType?: SystemType;
    constructor?: SystemReflectionConstructorInfo;
    constructorArguments?: SystemReflectionCustomAttributeTypedArgument[];
    namedArguments?: SystemReflectionCustomAttributeNamedArgument[];
  };

  type SystemReflectionCustomAttributeNamedArgument = {
    memberInfo?: SystemReflectionMemberInfo;
    typedValue?: SystemReflectionCustomAttributeTypedArgument;
    memberName?: string;
    isField?: boolean;
  };

  type SystemReflectionCustomAttributeTypedArgument = {
    argumentType?: SystemType;
    value?: any;
  };

  type SystemReflectionEventAttributes = 0 | 512 | 1024;

  type SystemReflectionEventInfo = {
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    memberType?: SystemReflectionMemberTypes;
    attributes?: SystemReflectionEventAttributes;
    isSpecialName?: boolean;
    addMethod?: SystemReflectionMethodInfo;
    removeMethod?: SystemReflectionMethodInfo;
    raiseMethod?: SystemReflectionMethodInfo;
    isMulticast?: boolean;
    eventHandlerType?: SystemType;
  };

  type SystemReflectionFieldAttributes =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 16
    | 32
    | 64
    | 128
    | 256
    | 512
    | 1024
    | 4096
    | 8192
    | 32768
    | 38144;

  type SystemReflectionFieldInfo = {
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    memberType?: SystemReflectionMemberTypes;
    attributes?: SystemReflectionFieldAttributes;
    fieldType?: SystemType;
    isInitOnly?: boolean;
    isLiteral?: boolean;
    isNotSerialized?: boolean;
    isPinvokeImpl?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    fieldHandle?: SystemRuntimeFieldHandle;
  };

  type SystemReflectionGenericParameterAttributes = 0 | 1 | 2 | 3 | 4 | 8 | 16 | 28;

  type SystemReflectionICustomAttributeProvider = true;

  type SystemReflectionMemberInfo = {
    memberType?: SystemReflectionMemberTypes;
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
  };

  type SystemReflectionMemberTypes = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 191;

  type SystemReflectionMethodAttributes =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 16
    | 32
    | 64
    | 128
    | 256
    | 512
    | 1024
    | 2048
    | 4096
    | 8192
    | 16384
    | 32768
    | 53248;

  type SystemReflectionMethodBase = {
    memberType?: SystemReflectionMemberTypes;
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    attributes?: SystemReflectionMethodAttributes;
    methodImplementationFlags?: SystemReflectionMethodImplAttributes;
    callingConvention?: SystemReflectionCallingConventions;
    isAbstract?: boolean;
    isConstructor?: boolean;
    isFinal?: boolean;
    isHideBySig?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isVirtual?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isConstructedGenericMethod?: boolean;
    isGenericMethod?: boolean;
    isGenericMethodDefinition?: boolean;
    containsGenericParameters?: boolean;
    methodHandle?: SystemRuntimeMethodHandle;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
  };

  type SystemReflectionMethodImplAttributes =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 8
    | 16
    | 32
    | 64
    | 128
    | 256
    | 512
    | 4096
    | 65535;

  type SystemReflectionMethodInfo = {
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    attributes?: SystemReflectionMethodAttributes;
    methodImplementationFlags?: SystemReflectionMethodImplAttributes;
    callingConvention?: SystemReflectionCallingConventions;
    isAbstract?: boolean;
    isConstructor?: boolean;
    isFinal?: boolean;
    isHideBySig?: boolean;
    isSpecialName?: boolean;
    isStatic?: boolean;
    isVirtual?: boolean;
    isAssembly?: boolean;
    isFamily?: boolean;
    isFamilyAndAssembly?: boolean;
    isFamilyOrAssembly?: boolean;
    isPrivate?: boolean;
    isPublic?: boolean;
    isConstructedGenericMethod?: boolean;
    isGenericMethod?: boolean;
    isGenericMethodDefinition?: boolean;
    containsGenericParameters?: boolean;
    methodHandle?: SystemRuntimeMethodHandle;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    memberType?: SystemReflectionMemberTypes;
    returnParameter?: SystemReflectionParameterInfo;
    returnType?: SystemType;
    returnTypeCustomAttributes?: SystemReflectionICustomAttributeProvider;
  };

  type SystemReflectionModule = {
    assembly?: SystemReflectionAssembly;
    fullyQualifiedName?: string;
    name?: string;
    mdStreamVersion?: number;
    moduleVersionId?: string;
    scopeName?: string;
    moduleHandle?: SystemModuleHandle;
    customAttributes?: SystemReflectionCustomAttributeData[];
    metadataToken?: number;
  };

  type SystemReflectionParameterAttributes =
    | 0
    | 1
    | 2
    | 4
    | 8
    | 16
    | 4096
    | 8192
    | 16384
    | 32768
    | 61440;

  type SystemReflectionParameterInfo = {
    attributes?: SystemReflectionParameterAttributes;
    member?: SystemReflectionMemberInfo;
    name?: string;
    parameterType?: SystemType;
    position?: number;
    isIn?: boolean;
    isLcid?: boolean;
    isOptional?: boolean;
    isOut?: boolean;
    isRetval?: boolean;
    defaultValue?: any;
    rawDefaultValue?: any;
    hasDefaultValue?: boolean;
    customAttributes?: SystemReflectionCustomAttributeData[];
    metadataToken?: number;
  };

  type SystemReflectionPropertyAttributes = 0 | 512 | 1024 | 4096 | 8192 | 16384 | 32768 | 62464;

  type SystemReflectionPropertyInfo = {
    name?: string;
    declaringType?: SystemType;
    reflectedType?: SystemType;
    module?: SystemReflectionModule;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    memberType?: SystemReflectionMemberTypes;
    propertyType?: SystemType;
    attributes?: SystemReflectionPropertyAttributes;
    isSpecialName?: boolean;
    canRead?: boolean;
    canWrite?: boolean;
    getMethod?: SystemReflectionMethodInfo;
    setMethod?: SystemReflectionMethodInfo;
  };

  type SystemReflectionTypeAttributes =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 16
    | 24
    | 32
    | 128
    | 256
    | 1024
    | 2048
    | 4096
    | 8192
    | 16384
    | 65536
    | 131072
    | 196608
    | 262144
    | 264192
    | 1048576
    | 12582912;

  type SystemReflectionTypeInfo = {
    name?: string;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    isInterface?: boolean;
    memberType?: SystemReflectionMemberTypes;
    namespace?: string;
    assemblyQualifiedName?: string;
    fullName?: string;
    assembly?: SystemReflectionAssembly;
    module?: SystemReflectionModule;
    isNested?: boolean;
    declaringType?: SystemType;
    declaringMethod?: SystemReflectionMethodBase;
    reflectedType?: SystemType;
    underlyingSystemType?: SystemType;
    isTypeDefinition?: boolean;
    isArray?: boolean;
    isByRef?: boolean;
    isPointer?: boolean;
    isConstructedGenericType?: boolean;
    isGenericParameter?: boolean;
    isGenericTypeParameter?: boolean;
    isGenericMethodParameter?: boolean;
    isGenericType?: boolean;
    isGenericTypeDefinition?: boolean;
    isSZArray?: boolean;
    isVariableBoundArray?: boolean;
    isByRefLike?: boolean;
    hasElementType?: boolean;
    genericTypeArguments?: SystemType[];
    genericParameterPosition?: number;
    genericParameterAttributes?: SystemReflectionGenericParameterAttributes;
    attributes?: SystemReflectionTypeAttributes;
    isAbstract?: boolean;
    isImport?: boolean;
    isSealed?: boolean;
    isSpecialName?: boolean;
    isClass?: boolean;
    isNestedAssembly?: boolean;
    isNestedFamANDAssem?: boolean;
    isNestedFamily?: boolean;
    isNestedFamORAssem?: boolean;
    isNestedPrivate?: boolean;
    isNestedPublic?: boolean;
    isNotPublic?: boolean;
    isPublic?: boolean;
    isAutoLayout?: boolean;
    isExplicitLayout?: boolean;
    isLayoutSequential?: boolean;
    isAnsiClass?: boolean;
    isAutoClass?: boolean;
    isUnicodeClass?: boolean;
    isCOMObject?: boolean;
    isContextful?: boolean;
    isEnum?: boolean;
    isMarshalByRef?: boolean;
    isPrimitive?: boolean;
    isValueType?: boolean;
    isSignatureType?: boolean;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    structLayoutAttribute?: SystemRuntimeInteropServicesStructLayoutAttribute;
    typeInitializer?: SystemReflectionConstructorInfo;
    typeHandle?: SystemRuntimeTypeHandle;
    guid?: string;
    baseType?: SystemType;
    isSerializable?: boolean;
    containsGenericParameters?: boolean;
    isVisible?: boolean;
    genericTypeParameters?: SystemType[];
    declaredConstructors?: SystemReflectionConstructorInfo[];
    declaredEvents?: SystemReflectionEventInfo[];
    declaredFields?: SystemReflectionFieldInfo[];
    declaredMembers?: SystemReflectionMemberInfo[];
    declaredMethods?: SystemReflectionMethodInfo[];
    declaredNestedTypes?: SystemReflectionTypeInfo[];
    declaredProperties?: SystemReflectionPropertyInfo[];
    implementedInterfaces?: SystemType[];
  };

  type SystemRuntimeFieldHandle = {
    value?: SystemIntPtr;
  };

  type SystemRuntimeInteropServicesLayoutKind = 0 | 2 | 3;

  type SystemRuntimeInteropServicesStructLayoutAttribute = {
    typeId?: any;
    value?: SystemRuntimeInteropServicesLayoutKind;
  };

  type SystemRuntimeMethodHandle = {
    value?: SystemIntPtr;
  };

  type SystemRuntimeTypeHandle = {
    value?: SystemIntPtr;
  };

  type SystemSecuritySecurityRuleSet = 0 | 1 | 2;

  type SystemType = {
    name?: string;
    customAttributes?: SystemReflectionCustomAttributeData[];
    isCollectible?: boolean;
    metadataToken?: number;
    isInterface?: boolean;
    memberType?: SystemReflectionMemberTypes;
    namespace?: string;
    assemblyQualifiedName?: string;
    fullName?: string;
    assembly?: SystemReflectionAssembly;
    module?: SystemReflectionModule;
    isNested?: boolean;
    declaringType?: SystemType;
    declaringMethod?: SystemReflectionMethodBase;
    reflectedType?: SystemType;
    underlyingSystemType?: SystemType;
    isTypeDefinition?: boolean;
    isArray?: boolean;
    isByRef?: boolean;
    isPointer?: boolean;
    isConstructedGenericType?: boolean;
    isGenericParameter?: boolean;
    isGenericTypeParameter?: boolean;
    isGenericMethodParameter?: boolean;
    isGenericType?: boolean;
    isGenericTypeDefinition?: boolean;
    isSZArray?: boolean;
    isVariableBoundArray?: boolean;
    isByRefLike?: boolean;
    hasElementType?: boolean;
    genericTypeArguments?: SystemType[];
    genericParameterPosition?: number;
    genericParameterAttributes?: SystemReflectionGenericParameterAttributes;
    attributes?: SystemReflectionTypeAttributes;
    isAbstract?: boolean;
    isImport?: boolean;
    isSealed?: boolean;
    isSpecialName?: boolean;
    isClass?: boolean;
    isNestedAssembly?: boolean;
    isNestedFamANDAssem?: boolean;
    isNestedFamily?: boolean;
    isNestedFamORAssem?: boolean;
    isNestedPrivate?: boolean;
    isNestedPublic?: boolean;
    isNotPublic?: boolean;
    isPublic?: boolean;
    isAutoLayout?: boolean;
    isExplicitLayout?: boolean;
    isLayoutSequential?: boolean;
    isAnsiClass?: boolean;
    isAutoClass?: boolean;
    isUnicodeClass?: boolean;
    isCOMObject?: boolean;
    isContextful?: boolean;
    isEnum?: boolean;
    isMarshalByRef?: boolean;
    isPrimitive?: boolean;
    isValueType?: boolean;
    isSignatureType?: boolean;
    isSecurityCritical?: boolean;
    isSecuritySafeCritical?: boolean;
    isSecurityTransparent?: boolean;
    structLayoutAttribute?: SystemRuntimeInteropServicesStructLayoutAttribute;
    typeInitializer?: SystemReflectionConstructorInfo;
    typeHandle?: SystemRuntimeTypeHandle;
    guid?: string;
    baseType?: SystemType;
    isSerializable?: boolean;
    containsGenericParameters?: boolean;
    isVisible?: boolean;
  };

  type UserNotificationDeleteAllNotificationsAsyncParams = {
    State?: BurnAbpNotificationsUserNotificationState;
    StartDate?: string;
    EndDate?: string;
    'api-version'?: string;
  };

  type UserNotificationDeleteNotificationAsyncParams = {
    userNotificationId: string;
    'api-version'?: string;
  };

  type UserNotificationGetNotificationAsyncParams = {
    userNotificationId: string;
    'api-version'?: string;
  };

  type UserNotificationGetNotificationCountAsyncParams = {
    State?: BurnAbpNotificationsUserNotificationState;
    StartDate?: string;
    EndDate?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
    'api-version'?: string;
  };

  type UserNotificationGetNotificationsAsyncParams = {
    State?: BurnAbpNotificationsUserNotificationState;
    StartDate?: string;
    EndDate?: string;
    Sorting?: string;
    SkipCount?: number;
    MaxResultCount?: number;
    'api-version'?: string;
  };

  type UserNotificationIntegrationPublishAsyncParams = {
    'api-version'?: string;
  };

  type UserNotificationUpdateAllNotificationStatesAsyncParams = {
    state?: BurnAbpNotificationsUserNotificationState;
    'api-version'?: string;
  };

  type UserNotificationUpdateNotificationStateAsyncParams = {
    userNotificationId: string;
    state?: BurnAbpNotificationsUserNotificationState;
    'api-version'?: string;
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

  type VoloAbpLocalizationILocalizableString = true;

  type VoloAbpLocalizationLanguageInfo = {
    cultureName?: string;
    uiCultureName?: string;
    displayName?: string;
    flagIcon?: string;
  };

  type VoloAbpNameValue = {
    name?: string;
    value?: string;
  };
}
