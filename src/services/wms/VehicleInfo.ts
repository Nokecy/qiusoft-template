// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/vehicle-info/${param0} */
export async function VehicleInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.VehicleInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto>(`/api/wms/vehicle-info/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/vehicle-info/create */
export async function VehicleInfoCreateAsync(body: API.BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto>('/api/wms/vehicle-info/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/vehicle-info/delete/${param0} */
export async function VehicleInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.VehicleInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/vehicle-info/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/vehicle-info/list */
export async function VehicleInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.VehicleInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto>('/api/wms/vehicle-info/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/vehicle-info/update/${param0} */
export async function VehicleInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.VehicleInfoUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_cheliangVehicleInfoDto>(`/api/wms/vehicle-info/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
