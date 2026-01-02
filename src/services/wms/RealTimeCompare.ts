// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 导出数据 GET /api/wms/erp-store/realtime-compare/export */
export async function RealTimeCompareExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealTimeCompareExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/erp-store/realtime-compare/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** ERP对账实时表 GET /api/wms/erp-store/realtime-compare/realtime-list */
export async function RealTimeCompareGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealTimeCompareGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhang_duizhangxinxiRealTimeCompareDto>('/api/wms/erp-store/realtime-compare/realtime-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/erp-store/realtime-compare/wait-for-callback */
export async function RealTimeCompareGetWaitForCallbackDataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealTimeCompareGetWaitForCallbackDataAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhangWaitForCallbackModel>('/api/wms/erp-store/realtime-compare/wait-for-callback', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
