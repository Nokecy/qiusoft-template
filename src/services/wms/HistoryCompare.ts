// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 导出数据 GET /api/wms/erp-store/history-compare/export */
export async function HistoryCompareExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HistoryCompareExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/erp-store/history-compare/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** ERP对账历史数据 GET /api/wms/erp-store/history-compare/history-list */
export async function HistoryCompareGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.HistoryCompareGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhang_duizhangxinxiHistoryCompareDto>('/api/wms/erp-store/history-compare/history-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
