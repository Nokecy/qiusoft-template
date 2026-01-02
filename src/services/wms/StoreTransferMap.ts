// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/wms/store-transfre-map/create */
export async function StoreTransferMapCreateAsync(body: API.BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto>('/api/wms/store-transfre-map/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/store-transfre-map/delete/${param0} */
export async function StoreTransferMapDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferMapDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/store-transfre-map/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfre-map/get/${param0} */
export async function StoreTransferMapGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferMapGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto>(`/api/wms/store-transfre-map/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfre-map/list */
export async function StoreTransferMapGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferMapGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto>('/api/wms/store-transfre-map/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/store-transfre-map/update/${param0} */
export async function StoreTransferMapUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferMapUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_diaoboguanxiStoreTransferMapDto>(`/api/wms/store-transfre-map/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
