// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/delivery-order/${param0} */
export async function DeliveryOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_songhuodanFullDeliveryOrderDto>(`/api/wms/delivery-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 绑定送货单送货明细 POST /api/wms/delivery-order/bind-delivery-item */
export async function DeliveryOrderBindDeliveryItemAsync(body: API.BurnAbpWMS_chuku_songhuodanBindDeliveryItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/delivery-order/bind-delivery-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 检查送货ASN单号是否合法 GET /api/wms/delivery-order/check-asn-orderNo/${param0} */
export async function DeliveryOrderCheckAsnOrderNoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryOrderCheckAsnOrderNoAsyncParams,
	options?: { [key: string]: any }
) {
	const { asnOrderNo: param0, ...queryParams } = params;
	return request<any>(`/api/wms/delivery-order/check-asn-orderNo/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 送货单复核 POST /api/wms/delivery-order/check-delivery-item */
export async function DeliveryOrderCheckDeliveryItemAsync(body: API.BurnAbpWMS_chuku_songhuodanCheckDeliveryDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/delivery-order/check-delivery-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 创建送货单 POST /api/wms/delivery-order/create */
export async function DeliveryOrderCreateAsync(body: API.BurnAbpWMS_chuku_songhuodanCreateOrUpdateDeliveryOrderDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/delivery-order/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据TraceId创建送货单 POST /api/wms/delivery-order/create-by-traceId */
export async function DeliveryOrderCreateByTraceAsync(body: API.BurnAbpWMS_chuku_songhuodanCreateDeliveryOrderByTraceDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/delivery-order/create-by-traceId', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/delivery-order/delete/${param0} */
export async function DeliveryOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/delivery-order/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据名称导出送货单箱信息 GET /api/wms/delivery-order/export-box-data */
export async function DeliveryOrderExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryOrderExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/delivery-order/export-box-data', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/delivery-order/list */
export async function DeliveryOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_songhuodanDeliveryOrderDto>('/api/wms/delivery-order/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取送货单导出提供者列表 GET /api/wms/delivery-order/provider-list */
export async function DeliveryOrderGetDeliveryExportProviderList(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_songhuodanLabeValue[]>('/api/wms/delivery-order/provider-list', {
		method: 'GET',
		...(options || {}),
	});
}
