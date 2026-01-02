// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema */
export async function FormSchemaGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionListDto>('/api/dynamic-schema/form-schema', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/form-schema */
export async function FormSchemaCreateAsync(body: API.BurnAbpDynamicSchemaHostEntitiesCreateFormSchemaDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>('/api/dynamic-schema/form-schema', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema/${param0} */
export async function FormSchemaGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>(`/api/dynamic-schema/form-schema/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/form-schema/${param0}/delete */
export async function FormSchemaDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-schema/form-schema/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/form-schema/${param0}/publish */
export async function FormSchemaPublishAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaPublishAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>(`/api/dynamic-schema/form-schema/${param0}/publish`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/form-schema/${param0}/unpublish */
export async function FormSchemaUnpublishAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaUnpublishAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>(`/api/dynamic-schema/form-schema/${param0}/unpublish`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/form-schema/${param0}/update */
export async function FormSchemaUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaUpdateAsyncParams,
	body: API.BurnAbpDynamicSchemaHostEntitiesUpdateFormSchemaDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>(`/api/dynamic-schema/form-schema/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema/by-scenario-key */
export async function FormSchemaGetByScenarioKeyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaGetByScenarioKeyAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesPublishedSchemaDto>('/api/dynamic-schema/form-schema/by-scenario-key', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema/current-schema-for-host-entity/${param0} */
export async function FormSchemaGetCurrentSchemaForHostEntityAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaGetCurrentSchemaForHostEntityAsyncParams,
	options?: { [key: string]: any }
) {
	const { hostEntityId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesMergedFormSchemaDto>(`/api/dynamic-schema/form-schema/current-schema-for-host-entity/${param0}`, {
		method: 'GET',
		params: {
			// scenarioKey has a default value: default
			scenarioKey: 'default',
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/form-schema/new-version/${param0} */
export async function FormSchemaCreateNewVersionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaCreateNewVersionAsyncParams,
	options?: { [key: string]: any }
) {
	const { sourceSchemaId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>(`/api/dynamic-schema/form-schema/new-version/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema/published-schemas */
export async function FormSchemaGetAllPublishedSchemasAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaHostEntitiesAllPublishedSchemasDto>('/api/dynamic-schema/form-schema/published-schemas', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema/published/${param0} */
export async function FormSchemaGetPublishedAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaGetPublishedAsyncParams,
	options?: { [key: string]: any }
) {
	const { sourceId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionDto>(`/api/dynamic-schema/form-schema/published/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/form-schema/version-history/${param0} */
export async function FormSchemaGetVersionHistoryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormSchemaGetVersionHistoryAsyncParams,
	options?: { [key: string]: any }
) {
	const { sourceId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaHostEntitiesFormSchemaDefinitionListDto[]>(`/api/dynamic-schema/form-schema/version-history/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}
