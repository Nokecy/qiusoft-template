// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 批量创建文档
事务处理：全部成功或全部失败
验证策略：全量验证所有输入，返回所有验证错误 POST /api/pdm/document-batch/batch-create */
export async function DocumentBatchBatchCreateAsync(body: API.BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentResult>('/api/pdm/document-batch/batch-create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批量创建文档并关联物料 POST /api/pdm/document-batch/batch-create-documents-and-link-parts */
export async function DocumentBatchBatchCreateDocumentsAndLinkPartsAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentsAndLinkPartsInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsBatchCreateDocumentsAndLinkPartsResult>('/api/pdm/document-batch/batch-create-documents-and-link-parts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
