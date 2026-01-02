// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 指定LPN分配调拨任务 POST /api/wms/store-transfer-orderitem/assin-stock-task */
export async function StoreTransferOrderItemAssignStockTaskAsync(body: API.BurnAbpWMS_diaoboAssignStockTaskItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/store-transfer-orderitem/assin-stock-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfer-orderitem/get/${param0} */
export async function StoreTransferOrderItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_diaoboStoreTransferOrderItemDto>(`/api/wms/store-transfer-orderitem/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/store-transfer-orderitem/list */
export async function StoreTransferOrderItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferOrderItemDto>('/api/wms/store-transfer-orderitem/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
