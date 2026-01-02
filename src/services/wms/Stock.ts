// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 导出库存数据 GET /api/wms/stock/export */
export async function StockExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/stock/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取ITEM库存列表 GET /api/wms/stock/list */
export async function StockGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunITEMkucunStockDto>('/api/wms/stock/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 刷新item库存信息 GET /api/wms/stock/refresh-item-stock */
export async function StockRefreshItemStockAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockRefreshItemStockAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/stock/refresh-item-stock', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取库存编码统计以及库存数量统计 GET /api/wms/stock/stock-sum */
export async function StockGetStockSumAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockGetStockSumAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucunITEMkucunStockSumDto>('/api/wms/stock/stock-sum', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
