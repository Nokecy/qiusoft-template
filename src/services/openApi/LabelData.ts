// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/label-management/label-data/gen-label-print-data */
export async function LabelDataGenLabelPrintDataAsync(body: API.BurnAbpLabelManagementLabelDatasGetLabelDataInputDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelDatasGetLabelDataResultDto>('/api/label-management/label-data/gen-label-print-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-data/label-print-data */
export async function LabelDataGetLabelPrintDataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelDataGetLabelPrintDataAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementLabelDatasGetLabelDataResultDto>('/api/label-management/label-data/label-print-data', {
		method: 'GET',
		params: {
			...params,
			ExtraProperties: undefined,
			...params['ExtraProperties'],
		},
		...(options || {}),
	});
}
