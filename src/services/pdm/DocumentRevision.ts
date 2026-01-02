// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-revision/current-revision/${param0} */
export async function DocumentRevisionGetCurrentRevisionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRevisionGetCurrentRevisionAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentRevisionDto>(`/api/pdm/document-revision/current-revision/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-revision/revision-files/${param0} */
export async function DocumentRevisionGetRevisionFilesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRevisionGetRevisionFilesAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentFileDto[]>(`/api/pdm/document-revision/revision-files/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
