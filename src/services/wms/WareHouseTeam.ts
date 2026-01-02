// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/warehouse-team/${param0} */
export async function WareHouseTeamGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseTeamGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto>(`/api/wms/warehouse-team/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-team/create */
export async function WareHouseTeamCreateAsync(body: API.BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto>('/api/wms/warehouse-team/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-team/delete/${param0} */
export async function WareHouseTeamDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseTeamDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/warehouse-team/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/warehouse-team/list */
export async function WareHouseTeamGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseTeamGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto>('/api/wms/warehouse-team/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-team/update/${param0} */
export async function WareHouseTeamUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseTeamUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangbanzuWarehouseTeamDto>(`/api/wms/warehouse-team/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
