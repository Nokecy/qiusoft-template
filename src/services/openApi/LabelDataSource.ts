// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/label-data-source/data */
export async function LabelDataSourceGetDataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelDataSourceGetDataAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementDataSourcesGetDataSourceDataOutput>('/api/label-management/label-data-source/data', {
		method: 'GET',
		params: {
			...params,
			Parameters: undefined,
			...params['Parameters'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-data-source/preview-data */
export async function LabelDataSourcePreviewDataAsync(body: API.BurnAbpLabelManagementDataSourcesGetDataSourceDataInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementDataSourcesGetDataSourceDataOutput>('/api/label-management/label-data-source/preview-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-data-source/test-connection */
export async function LabelDataSourceTestConnectionAsync(body: API.BurnAbpLabelManagementDataSourcesTestDataSourceInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementDataSourcesTestDataSourceOutput>('/api/label-management/label-data-source/test-connection', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-data-source/validate */
export async function LabelDataSourceValidateAsync(body: API.BurnAbpLabelManagementDataSourcesValidateDataSourceInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementDataSourcesValidateDataSourceOutput>('/api/label-management/label-data-source/validate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
