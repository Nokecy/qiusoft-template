// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 取消调拨单 POST /api/wms/store-transfer-order/cancel */
export async function StoreTransferOrderCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderCancelAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/store-transfer-order/cancel', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 反审核调拨单 POST /api/wms/store-transfer-order/cancel-verify/${param0} */
export async function StoreTransferOrderCancelVerifyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderCancelVerifyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/store-transfer-order/cancel-verify/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建调拨单 POST /api/wms/store-transfer-order/create */
export async function StoreTransferOrderCreateAsync(body: API.BurnAbpWMS_diaoboCreateStoreTransferOrderDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/store-transfer-order/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据ID获取调拨单信息 GET /api/wms/store-transfer-order/get/${param0} */
export async function StoreTransferOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_diaoboStoreTransferOrderDto>(`/api/wms/store-transfer-order/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取调拨单列表 GET /api/wms/store-transfer-order/list */
export async function StoreTransferOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_diaoboStoreTransferOrderDto>('/api/wms/store-transfer-order/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 手动根据LPN列表创建调拨单 POST /api/wms/store-transfer-order/manual-transfer */
export async function StoreTransferOrderManualTransferAsync(body: API.BurnAbpWMS_diaoboManualTransferInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/store-transfer-order/manual-transfer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 快速创建调拨单信息 POST /api/wms/store-transfer-order/quick-create */
export async function StoreTransferOrderQuickCreateAsync(body: API.BurnAbpWMS_diaoboQuickCreateStoreTransferOrderDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/store-transfer-order/quick-create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 审核调拨单 POST /api/wms/store-transfer-order/verify/${param0} */
export async function StoreTransferOrderVerifyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreTransferOrderVerifyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/store-transfer-order/verify/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
