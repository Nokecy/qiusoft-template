// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/warehouse-man/${param0} */
export async function WarehouseManGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseManGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto>(`/api/wms/warehouse-man/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-man/create */
export async function WarehouseManCreateAsync(body: API.BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto>('/api/wms/warehouse-man/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-man/delete/${param0} */
export async function WarehouseManDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseManDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/warehouse-man/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/warehouse-man/list */
export async function WarehouseManGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseManGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto>('/api/wms/warehouse-man/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-man/update/${param0} */
export async function WarehouseManUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseManUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto>(`/api/wms/warehouse-man/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
