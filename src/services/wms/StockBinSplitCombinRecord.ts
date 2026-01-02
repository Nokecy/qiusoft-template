// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询指定载具打印模板 GET /api/wms/stock-bin-split-combin-record/get-trace/${param0} */
export async function StockBinSplitCombinRecordGetRecordPrintAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinSplitCombinRecordGetRecordPrintAsyncParams,
	options?: { [key: string]: any }
) {
	const { traceId: param0, ...queryParams } = params;
	return request<string[]>(`/api/wms/stock-bin-split-combin-record/get-trace/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询指定拆合记录 GET /api/wms/stock-bin-split-combin-record/get/${param0} */
export async function StockBinSplitCombinRecordGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinSplitCombinRecordGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordDto>(`/api/wms/stock-bin-split-combin-record/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询拆合列表 GET /api/wms/stock-bin-split-combin-record/list */
export async function StockBinSplitCombinRecordGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinSplitCombinRecordGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kuweichaihejiluStockBinSplitCombinRecordDto>('/api/wms/stock-bin-split-combin-record/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
