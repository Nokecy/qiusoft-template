// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/traceId-manage/list */
export async function TraceIdGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TraceIdGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceIdDto>('/api/wms/traceId-manage/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/traceId-manage/MassProduction */
export async function TraceIdMassProduction(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TraceIdMassProductionParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_zhanbanLPNxinxiTraceIdDto>('/api/wms/traceId-manage/MassProduction', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
