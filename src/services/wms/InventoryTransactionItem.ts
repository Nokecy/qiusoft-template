// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取交易记录箱批次信息 GET /api/wms/inventory-transaction-item/box-lot-list */
export async function InventoryTransactionItemGetBoxLotListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InventoryTransactionItemGetBoxLotListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemBoxLotItemDto>('/api/wms/inventory-transaction-item/box-lot-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导出全部库存交易记录到Excel GET /api/wms/inventory-transaction-item/export-excel */
export async function InventoryTransactionItemExportToExcelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InventoryTransactionItemExportToExcelAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/inventory-transaction-item/export-excel', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取LPN/箱交易列表 GET /api/wms/inventory-transaction-item/list */
export async function InventoryTransactionItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InventoryTransactionItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunjiaoyijiluInventoryTransactionItemDto>('/api/wms/inventory-transaction-item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取SN交易列表 GET /api/wms/inventory-transaction-item/serial-number-list */
export async function InventoryTransactionItemGetSerialListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InventoryTransactionItemGetSerialListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunjiaoyijiluInventoryTransactionSerialNumberItemDto>(
		'/api/wms/inventory-transaction-item/serial-number-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
