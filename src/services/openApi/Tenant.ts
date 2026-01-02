// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/multi-tenancy/tenants */
export async function TenantGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpTenantManagementTenantDto>('/api/multi-tenancy/tenants', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/multi-tenancy/tenants */
export async function TenantCreateAsync(body: API.VoloAbpTenantManagementTenantCreateDto, options?: { [key: string]: any }) {
	return request<API.VoloAbpTenantManagementTenantDto>('/api/multi-tenancy/tenants', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/multi-tenancy/tenants/${param0} */
export async function TenantGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpTenantManagementTenantDto>(`/api/multi-tenancy/tenants/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/multi-tenancy/tenants/${param0} */
export async function TenantUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantUpdateAsyncParams,
	body: API.VoloAbpTenantManagementTenantUpdateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpTenantManagementTenantDto>(`/api/multi-tenancy/tenants/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/multi-tenancy/tenants/${param0} */
export async function TenantDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/multi-tenancy/tenants/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/multi-tenancy/tenants/${param0}/default-connection-string */
export async function TenantGetDefaultConnectionStringAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantGetDefaultConnectionStringAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/multi-tenancy/tenants/${param0}/default-connection-string`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/multi-tenancy/tenants/${param0}/default-connection-string */
export async function TenantUpdateDefaultConnectionStringAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantUpdateDefaultConnectionStringAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/multi-tenancy/tenants/${param0}/default-connection-string`, {
		method: 'PUT',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/multi-tenancy/tenants/${param0}/default-connection-string */
export async function TenantDeleteDefaultConnectionStringAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TenantDeleteDefaultConnectionStringAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/multi-tenancy/tenants/${param0}/default-connection-string`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
