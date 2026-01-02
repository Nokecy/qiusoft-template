// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据LPN获取调拨任务信息 GET /api/wms/store-transfer-taskitem/get-by-traceid */
export async function StoreTransferTaskItemGetByTarceIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferTaskItemGetByTarceIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_diaoboStoreTransferTaskItemDto>('/api/wms/store-transfer-taskitem/get-by-traceid', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfer-taskitem/get/${param0} */
export async function StoreTransferTaskItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferTaskItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_diaoboStoreTransferTaskItemDto>(`/api/wms/store-transfer-taskitem/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfer-taskitem/list */
export async function StoreTransferTaskItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferTaskItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferTaskItemDto>('/api/wms/store-transfer-taskitem/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfer-taskitem/listbyman */
export async function StoreTransferTaskItemGetListByManAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferTaskItemGetListByManAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferTaskItemDto>('/api/wms/store-transfer-taskitem/listbyman', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/store-transfer-taskitem/pick */
export async function StoreTransferTaskItemPickAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferTaskItemPickAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/store-transfer-taskitem/pick', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/store-transfer-taskitem/put */
export async function StoreTransferTaskItemPutAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferTaskItemPutAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/store-transfer-taskitem/put', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
