// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/wms/stock-bin-box-info-interior/box-item */
export async function StockBinBoxInfoInteriorGetBoxItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoInteriorGetBoxItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto>('/integration-api/wms/stock-bin-box-info-interior/box-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据箱号/栈板号查询装箱信息 GET /integration-api/wms/stock-bin-box-info-interior/box-item-list */
export async function StockBinBoxInfoInteriorGetBoxItemListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoInteriorGetBoxItemListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto[]>('/integration-api/wms/stock-bin-box-info-interior/box-item-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取箱批次数据 GET /integration-api/wms/stock-bin-box-info-interior/box-lot-list */
export async function StockBinBoxInfoInteriorGetBoxLotListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoInteriorGetBoxLotListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoStockBinBoxLotInfoDto[]>('/integration-api/wms/stock-bin-box-info-interior/box-lot-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取LPN下架的最后交易记录 GET /integration-api/wms/stock-bin-box-info-interior/last-transaction-list */
export async function StockBinBoxInfoInteriorGetLastTransactionListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoInteriorGetLastTransactionListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_neibufuwuStockTransactionBoxInfo[]>('/integration-api/wms/stock-bin-box-info-interior/last-transaction-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 查询Wms模块中的sn信息 包含已下架和未下架的 GET /integration-api/wms/stock-bin-box-info-interior/serial-number-info */
export async function StockBinBoxInfoInteriorGetSerialNumberInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoInteriorGetSerialNumberInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_neibufuwuWmsSerialNumberInfoDto[]>('/integration-api/wms/stock-bin-box-info-interior/serial-number-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
