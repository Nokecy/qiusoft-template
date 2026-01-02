// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除实体文档文件 POST /api/pdm/change-order-document-upload/delete */
export async function ChangeOrderDocumentUploadDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChangeOrderDocumentUploadDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/change-order-document-upload/delete', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 下载实体文档文件 POST /api/pdm/change-order-document-upload/download */
export async function ChangeOrderDocumentUploadDownloadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChangeOrderDocumentUploadDownloadAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentFileDto>('/api/pdm/change-order-document-upload/download', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 上传实体文档文件 POST /api/pdm/change-order-document-upload/upload/${param0} */
export async function ChangeOrderDocumentUploadUploadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ChangeOrderDocumentUploadUploadAsyncParams,
	body: API.SystemIOStream,
	options?: { [key: string]: any }
) {
	const { entityId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto>(`/api/pdm/change-order-document-upload/upload/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...queryParams,
		},
		data: body,
		...(options || {}),
	});
}
