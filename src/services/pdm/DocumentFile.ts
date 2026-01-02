// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除文档附件并清理存储 POST /api/pdm/document-file/delete-file */
export async function DocumentFileDeleteFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileDeleteFileAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/document-file/delete-file', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 下载文档当前版本的所有文件打包为ZIP 优先返回当前修订（草稿）的工作文件；如果没有当前修订，
则返回最新发布版本的文件快照。 POST /api/pdm/document-file/download-current-revision-files-as-zip/${param0} */
export async function DocumentFileDownloadCurrentRevisionFilesAsZipAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileDownloadCurrentRevisionFilesAsZipAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>(`/api/pdm/document-file/download-current-revision-files-as-zip/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 下载指定文档附件 POST /api/pdm/document-file/download-file */
export async function DocumentFileDownloadFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileDownloadFileAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>('/api/pdm/document-file/download-file', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 下载指定版本的单个文件 POST /api/pdm/document-file/download-version-file */
export async function DocumentFileDownloadVersionFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileDownloadVersionFileAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>('/api/pdm/document-file/download-version-file', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 下载指定版本的所有文件打包为ZIP POST /api/pdm/document-file/download-version-files-as-zip */
export async function DocumentFileDownloadVersionFilesAsZipAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileDownloadVersionFilesAsZipAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>('/api/pdm/document-file/download-version-files-as-zip', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 添加文件到当前修订（仅签出人可操作） POST /api/pdm/document-file/file/${param0} */
export async function DocumentFileAddFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileAddFileAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsAddFileToRevisionInput,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentFileDto>(`/api/pdm/document-file/file/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取文档的附件列表 优先返回当前修订（草稿）的工作文件；如果没有当前修订，
则返回最新发布版本的文件快照。 GET /api/pdm/document-file/files/${param0} */
export async function DocumentFileGetFilesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileGetFilesAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentFileDto[]>(`/api/pdm/document-file/files/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取文件预览信息（前端只需 documentId + fileId） GET /api/pdm/document-file/preview-info */
export async function DocumentFileGetPreviewInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileGetPreviewInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentFilePreviewInfoDto>('/api/pdm/document-file/preview-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取指定版本的文件列表 GET /api/pdm/document-file/version-files */
export async function DocumentFileGetVersionFilesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileGetVersionFilesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentVersionFileDto[]>('/api/pdm/document-file/version-files', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
