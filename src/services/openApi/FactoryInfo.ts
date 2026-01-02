// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/factory-management/factoryinfo/${param0} */
export async function FactoryInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpFactoryManagementFactorysFactoryInfoDto>(`/api/factory-management/factoryinfo/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/factoryinfo/create */
export async function FactoryInfoCreateAsync(body: API.BurnAbpFactoryManagementFactorysFactoryInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpFactoryManagementFactorysFactoryInfoDto>('/api/factory-management/factoryinfo/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/factoryinfo/delete/${param0} */
export async function FactoryInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/factory-management/factoryinfo/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/factory-management/factoryinfo/list */
export async function FactoryInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpFactoryManagementFactorysFactoryInfoDto>('/api/factory-management/factoryinfo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/factoryinfo/update/${param0} */
export async function FactoryInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryInfoUpdateAsyncParams,
	body: API.BurnAbpFactoryManagementFactorysFactoryInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpFactoryManagementFactorysFactoryInfoDto>(`/api/factory-management/factoryinfo/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
