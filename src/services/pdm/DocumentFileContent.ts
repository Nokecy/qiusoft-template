// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取文件内容（支持 Range） GET /api/pdm/document-files/${param0}/${param1}/content */
export async function DocumentFileContentGetContentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileContentGetContentAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, fileId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/document-files/${param0}/${param1}/content`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 下载当前修订的所有文件打包为 ZIP GET /api/pdm/document-files/${param0}/download-as-zip */
export async function DocumentFileContentDownloadAsZipAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFileContentDownloadAsZipAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-files/${param0}/download-as-zip`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
