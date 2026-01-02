// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/factory-zone/${param0} */
export async function FactoryZoneGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryZoneGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_quyuFactoryZoneDto>(`/api/wms/factory-zone/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/factory-zone/create */
export async function FactoryZoneCreateAsync(body: API.BurnAbpWMS_jichuxinxi_quyuCreateFactoryZoneInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_quyuFactoryZoneDto>('/api/wms/factory-zone/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/factory-zone/delete/${param0} */
export async function FactoryZoneDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryZoneDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/factory-zone/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/factory-zone/list */
export async function FactoryZoneGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryZoneGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_quyuFactoryZoneDto>('/api/wms/factory-zone/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/factory-zone/update/${param0} */
export async function FactoryZoneUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FactoryZoneUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_quyuUpdateFactoryZoneInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_quyuFactoryZoneDto>(`/api/wms/factory-zone/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
