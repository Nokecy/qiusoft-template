// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取采购订单来源 GET /api/wms/asn-source-order/purchaseItems */
export async function InInstructionSourceItemGetPurchaseItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionSourceItemGetPurchaseItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_danjulaiyuan_caigoudingdanPurchaseOrderItemModel>('/api/wms/asn-source-order/purchaseItems', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取销售配料单来源 GET /api/wms/asn-source-order/sale-order-incom-item */
export async function InInstructionSourceItemGetSaleOrderIncomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionSourceItemGetSaleOrderIncomItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_danjulaiyuan_xiaoshoupeiliaodanSaleOrderIncomModel>('/api/wms/asn-source-order/sale-order-incom-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取销售订单来源 GET /api/wms/asn-source-order/sale-order-item */
export async function InInstructionSourceItemGetSaleOrderItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionSourceItemGetSaleOrderItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_danjulaiyuan_xiaoshoudingdanSaleOrderItemModel>('/api/wms/asn-source-order/sale-order-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
