// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-application */
export async function DynamicApplicationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaDtosDynamicApplicationDefinitionListDto>('/api/dynamic-schema/dynamic-application', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application */
export async function DynamicApplicationCreateAsync(body: API.BurnAbpDynamicSchemaDtosCreateUpdateDynamicApplicationDefinitionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaDtosDynamicApplicationDefinitionDto>('/api/dynamic-schema/dynamic-application', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-application/${param0} */
export async function DynamicApplicationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaDtosDynamicApplicationDefinitionDto>(`/api/dynamic-schema/dynamic-application/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/${param0}/delete */
export async function DynamicApplicationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-schema/dynamic-application/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/${param0}/update */
export async function DynamicApplicationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationUpdateAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosCreateUpdateDynamicApplicationDefinitionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaDtosDynamicApplicationDefinitionDto>(`/api/dynamic-schema/dynamic-application/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/delete-entity */
export async function DynamicApplicationDeleteEntityAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationDeleteEntityAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/dynamic-schema/dynamic-application/delete-entity', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/delete-field */
export async function DynamicApplicationDeleteFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationDeleteFieldAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/dynamic-schema/dynamic-application/delete-field', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-application/entity */
export async function DynamicApplicationGetEntityAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationGetEntityAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosDynamicEntityDefinitionDto>('/api/dynamic-schema/dynamic-application/entity', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/entity/${param0} */
export async function DynamicApplicationAddEntityAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationAddEntityAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosCreateEntityInput,
	options?: { [key: string]: any }
) {
	const { applicationId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaDtosDynamicEntityDefinitionDto>(`/api/dynamic-schema/dynamic-application/entity/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/field */
export async function DynamicApplicationAddFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationAddFieldAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosCreateFieldInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosDynamicFieldDefinitionDto>('/api/dynamic-schema/dynamic-application/field', {
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

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/relation/${param0} */
export async function DynamicApplicationAddRelationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationAddRelationAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosCreateRelationInput,
	options?: { [key: string]: any }
) {
	const { applicationId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaDtosDynamicEntityRelationDto>(`/api/dynamic-schema/dynamic-application/relation/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/update-entity */
export async function DynamicApplicationUpdateEntityAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationUpdateEntityAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosUpdateEntityInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosDynamicEntityDefinitionDto>('/api/dynamic-schema/dynamic-application/update-entity', {
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

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-application/update-field */
export async function DynamicApplicationUpdateFieldAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicApplicationUpdateFieldAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosUpdateFieldInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosDynamicFieldDefinitionDto>('/api/dynamic-schema/dynamic-application/update-field', {
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
