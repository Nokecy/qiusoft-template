// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity */
export async function HostEntityGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionListDto>('/api/dynamic-schema/host-entity', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/${param0} */
export async function HostEntityGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto>(`/api/dynamic-schema/host-entity/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/${param0}/disable */
export async function HostEntityDisableAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityDisableAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto>(`/api/dynamic-schema/host-entity/${param0}/disable`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/${param0}/enable */
export async function HostEntityEnableAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityEnableAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto>(`/api/dynamic-schema/host-entity/${param0}/enable`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/${param0}/unregister */
export async function HostEntityUnregisterAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityUnregisterAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-schema/host-entity/${param0}/unregister`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/by-entity-type */
export async function HostEntityGetByEntityTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetByEntityTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto>('/api/dynamic-schema/host-entity/by-entity-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/enabled-list */
export async function HostEntityGetEnabledListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionListDto[]>('/api/dynamic-schema/host-entity/enabled-list', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/extension-field */
export async function HostEntityGetExtensionFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetExtensionFieldAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto>('/api/dynamic-schema/host-entity/extension-field', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/extension-field/${param0} */
export async function HostEntityAddExtensionFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityAddExtensionFieldAsyncParams,
	body: API.BurnAbpDynamicSchemaHostEntitiesCreateUpdateExtensionFieldDto,
	options?: { [key: string]: any }
) {
	const { hostEntityId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto>(`/api/dynamic-schema/host-entity/extension-field/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/extension-fields/${param0} */
export async function HostEntityGetExtensionFieldsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetExtensionFieldsAsyncParams,
	options?: { [key: string]: any }
) {
	const { hostEntityId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto>(
		`/api/dynamic-schema/host-entity/extension-fields/${param0}`,
		{
			method: 'GET',
			params: {
				...queryParams,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/extension-values/${param0} */
export async function HostEntityGetExtensionValuesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetExtensionValuesAsyncParams,
	options?: { [key: string]: any }
) {
	const { entityId: param0, ...queryParams } = params;
	return request<Record<string, any>>(`/api/dynamic-schema/host-entity/extension-values/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/register */
export async function HostEntityRegisterAsync(body: API.BurnAbpDynamicSchemaHostEntitiesRegisterHostEntityInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityDefinitionDto>('/api/dynamic-schema/host-entity/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/remove-extension-field */
export async function HostEntityRemoveExtensionFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityRemoveExtensionFieldAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/dynamic-schema/host-entity/remove-extension-field', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/retry-ddl */
export async function HostEntityRetryDdlAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityRetryDdlAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/dynamic-schema/host-entity/retry-ddl', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/save-schema */
export async function HostEntitySaveSchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntitySaveSchemaAsyncParams,
	body: API.BurnAbpDynamicSchemaHostEntitiesSaveHostEntitySchemaInput,
	options?: { [key: string]: any }
) {
	return request<any>('/api/dynamic-schema/host-entity/save-schema', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/schema */
export async function HostEntityGetSchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetSchemaAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaFormilyFormilySchemaDto>('/api/dynamic-schema/host-entity/schema', {
		method: 'GET',
		params: {
			// scenario has a default value: default
			scenario: 'default',
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/host-entity/schemas */
export async function HostEntityGetAllSchemasAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityGetAllSchemasAsyncParams,
	options?: { [key: string]: any }
) {
	return request<Record<string, any>>('/api/dynamic-schema/host-entity/schemas', {
		method: 'GET',
		params: {
			// scenario has a default value: default
			scenario: 'default',
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/set-extension-values/${param0} */
export async function HostEntitySetExtensionValuesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntitySetExtensionValuesAsyncParams,
	body: Record<string, any>,
	options?: { [key: string]: any }
) {
	const { entityId: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-schema/host-entity/set-extension-values/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...queryParams,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/host-entity/update-extension-field */
export async function HostEntityUpdateExtensionFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HostEntityUpdateExtensionFieldAsyncParams,
	body: API.BurnAbpDynamicSchemaHostEntitiesCreateUpdateExtensionFieldDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesHostEntityExtensionFieldDto>('/api/dynamic-schema/host-entity/update-extension-field', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}
