// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /DevExpressReport/Print */
export async function DevExpressReportPrint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DevExpressReportPrintParams,
	options?: { [key: string]: any }
) {
	return request<any>('/DevExpressReport/Print', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /DevExpressReport/Print */
export async function DevExpressReportPrint_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DevExpressReportPrintParams,
	body: any,
	options?: { [key: string]: any }
) {
	return request<any>('/DevExpressReport/Print', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}
