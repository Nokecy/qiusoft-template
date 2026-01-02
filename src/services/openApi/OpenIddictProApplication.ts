// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/openIddict/pro/application/${param0} */
export async function OpenIddictProApplicationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProApplicationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { clientId: param0, ...queryParams } = params;
	return request<API.VoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto>(`/api/openIddict/pro/application/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/openIddict/pro/application/create */
export async function OpenIddictProApplicationCreateAsync(body: API.VoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto, options?: { [key: string]: any }) {
	return request<any>('/api/openIddict/pro/application/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/openIddict/pro/application/delete/${param0} */
export async function OpenIddictProApplicationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProApplicationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { clientId: param0, ...queryParams } = params;
	return request<any>(`/api/openIddict/pro/application/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/openIddict/pro/application/list */
export async function OpenIddictProApplicationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictProApplicationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto>('/api/openIddict/pro/application/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/openIddict/pro/application/update */
export async function OpenIddictProApplicationUpdateAsync(body: API.VoloAbpOpenIddictProApplicationApplicationsOpenIddictApplicationDto, options?: { [key: string]: any }) {
	return request<any>('/api/openIddict/pro/application/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
