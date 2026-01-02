// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 导出装车复核校验记录 GET /api/wms/load-check/export */
export async function LoadCheckRecordExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LoadCheckRecordExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/load-check/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取装车复核校验记录列表 GET /api/wms/load-check/list */
export async function LoadCheckRecordGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LoadCheckRecordGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_zhuangchefuheLoadCheckRecordDto>('/api/wms/load-check/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 装车复核校验 POST /api/wms/load-check/load-check */
export async function LoadCheckRecordLoadCheckAsync(body: API.BurnAbpWMS_chuku_zhuangchefuheCreateLoadCheckInfo, options?: { [key: string]: any }) {
	return request<any>('/api/wms/load-check/load-check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
