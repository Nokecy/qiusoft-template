// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/stock-bin-boxInfo/box-type-by-code */
export async function StockBinBoxInfoGetBoxTypeSumByCodeListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoGetBoxTypeSumByCodeListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMSStockBinBoxTypeInfo[]>('/api/wms/stock-bin-boxInfo/box-type-by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/stock-bin-boxInfo/box-type-by-trace */
export async function StockBinBoxInfoGetBoxTypeByTraceListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoGetBoxTypeByTraceListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMSStockBinBoxTypeInfo[]>('/api/wms/stock-bin-boxInfo/box-type-by-trace', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 检查载具号和箱号是否匹配 GET /api/wms/stock-bin-boxInfo/check-trace-and-boxnumber */
export async function StockBinBoxInfoCheckTraceIdAndBoxNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoCheckTraceIdAndBoxNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto>('/api/wms/stock-bin-boxInfo/check-trace-and-boxnumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/stock-bin-boxInfo/export */
export async function StockBinBoxInfoExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/stock-bin-boxInfo/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 查询在库箱信息 GET /api/wms/stock-bin-boxInfo/get-box-info/${param0} */
export async function StockBinBoxInfoGetStockBinBoxInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoGetStockBinBoxInfoAsyncParams,
	options?: { [key: string]: any }
) {
	const { boxNumber: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto>(`/api/wms/stock-bin-boxInfo/get-box-info/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/stock-bin-boxInfo/list */
export async function StockBinBoxInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto>('/api/wms/stock-bin-boxInfo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/stock-bin-boxInfo/list-by-traceId */
export async function StockBinBoxInfoGetListByTraceIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxInfoGetListByTraceIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunxiangliebiaoStockBinBoxInfoDto[]>('/api/wms/stock-bin-boxInfo/list-by-traceId', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
