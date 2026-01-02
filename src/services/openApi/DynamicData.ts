// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data */
export async function DynamicDataGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicSchemaDtosDynamicDataDto>('/api/dynamic-schema/dynamic-data', {
		method: 'GET',
		params: {
			...params,
			Filters: undefined,
			...params['Filters'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data */
export async function DynamicDataCreateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataCreateAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosCreateDataWithChildrenInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosDynamicDataWithChildrenDto>('/api/dynamic-schema/dynamic-data', {
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

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data/${param0} */
export async function DynamicDataGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaDtosDynamicDataWithChildrenDto>(`/api/dynamic-schema/dynamic-data/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data/${param0}/delete */
export async function DynamicDataDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-schema/dynamic-data/${param0}/delete`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data/${param0}/update */
export async function DynamicDataUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataUpdateAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosUpdateDataWithChildrenInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaDtosDynamicDataWithChildrenDto>(`/api/dynamic-schema/dynamic-data/${param0}/update`, {
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

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data/batch-delete */
export async function DynamicDataBatchDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataBatchDeleteAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosBatchDeleteInput,
	options?: { [key: string]: any }
) {
	return request<number>('/api/dynamic-schema/dynamic-data/batch-delete', {
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
