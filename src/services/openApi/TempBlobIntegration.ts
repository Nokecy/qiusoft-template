// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/attachment/temp-blob/bytes */
export async function TempBlobIntegrationGetAllBytesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempBlobIntegrationGetAllBytesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/integration-api/attachment/temp-blob/bytes', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/attachment/temp-blob/exists */
export async function TempBlobIntegrationExistsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempBlobIntegrationExistsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/integration-api/attachment/temp-blob/exists', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/attachment/temp-blob/save */
export async function TempBlobIntegrationSaveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempBlobIntegrationSaveAsyncParams,
	body: string,
	options?: { [key: string]: any }
) {
	return request<boolean>('/integration-api/attachment/temp-blob/save', {
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

/** 此处后端没有提供注释 POST /integration-api/attachment/temp-blob/save-by-name */
export async function TempBlobIntegrationSaveByNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempBlobIntegrationSaveByNameAsyncParams,
	body: string,
	options?: { [key: string]: any }
) {
	return request<boolean>('/integration-api/attachment/temp-blob/save-by-name', {
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
