// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/openIddict/pro/scope/${param0} */
export async function OpenIddictProScopeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProScopeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto>(`/api/openIddict/pro/scope/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/openIddict/pro/scope/create */
export async function OpenIddictProScopeCreateAsync(body: API.VoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto, options?: { [key: string]: any }) {
	return request<any>('/api/openIddict/pro/scope/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/openIddict/pro/scope/delete/${param0} */
export async function OpenIddictProScopeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProScopeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/openIddict/pro/scope/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/openIddict/pro/scope/list */
export async function OpenIddictProScopeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProScopeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto>('/api/openIddict/pro/scope/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/openIddict/pro/scope/update/${param0} */
export async function OpenIddictProScopeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProScopeUpdateAsyncParams,
	body: API.VoloAbpOpenIddictProApplicationScopesOpenIddictProScopeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/openIddict/pro/scope/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
