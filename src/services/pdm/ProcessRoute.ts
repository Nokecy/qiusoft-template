// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/process-route */
export async function ProcessRouteGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProcessManagementProcessRoutesProcessRouteDto>('/api/pdm/process-route', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route */
export async function ProcessRouteCreateAsync(body: API.BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProcessManagementProcessRoutesProcessRouteDto>('/api/pdm/process-route', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/process-route/${param0} */
export async function ProcessRouteGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProcessManagementProcessRoutesProcessRouteDto>(`/api/pdm/process-route/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route/${param0}/check */
export async function ProcessRouteCheckAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteCheckAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-route/${param0}/check`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route/${param0}/delete */
export async function ProcessRouteDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-route/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route/${param0}/submit */
export async function ProcessRouteSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-route/${param0}/submit`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route/${param0}/un-check */
export async function ProcessRouteUnCheckAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteUnCheckAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-route/${param0}/un-check`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route/${param0}/un-submit */
export async function ProcessRouteUnSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteUnSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-route/${param0}/un-submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-route/${param0}/update */
export async function ProcessRouteUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteUpdateAsyncParams,
	body: API.BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProcessManagementProcessRoutesProcessRouteDto>(`/api/pdm/process-route/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/process-route/version-list-by-code */
export async function ProcessRouteGetVersionListByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessRouteGetVersionListByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpPdmProcessManagementProcessRoutesProcessRouteDto>('/api/pdm/process-route/version-list-by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
