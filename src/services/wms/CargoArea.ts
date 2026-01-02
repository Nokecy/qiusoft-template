// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/cargo-area/by-code/${param0} */
export async function CargoAreaGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CargoAreaGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	const { code: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto>(`/api/wms/cargo-area/by-code/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/cargo-area/create */
export async function CargoAreaCreateAsync(body: API.BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto>('/api/wms/cargo-area/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/cargo-area/delete */
export async function CargoAreaDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CargoAreaDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/cargo-area/delete', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/cargo-area/id */
export async function CargoAreaGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CargoAreaGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto>('/api/wms/cargo-area/id', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/cargo-area/list */
export async function CargoAreaGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CargoAreaGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto>('/api/wms/cargo-area/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/cargo-area/update/${param0} */
export async function CargoAreaUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CargoAreaUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_huotaiquyuCargoAreaDto>(`/api/wms/cargo-area/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
