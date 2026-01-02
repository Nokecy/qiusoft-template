// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/runtime-label-print/printer-code */
export async function RuntimeLabelPrintGetPrinterCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RuntimeLabelPrintGetPrinterCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementRuntimePrintingRuntimeLabelPrintResultDto>('/api/label-management/runtime-label-print/printer-code', {
		method: 'GET',
		params: {
			...params,
			Parameters: undefined,
			...params['Parameters'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/runtime-label-print/printer-code */
export async function RuntimeLabelPrintGetPrinterCodeAsync_2(body: API.BurnAbpLabelManagementRuntimePrintingRuntimeLabelPrintRequestDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementRuntimePrintingRuntimeLabelPrintResultDto>('/api/label-management/runtime-label-print/printer-code', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
