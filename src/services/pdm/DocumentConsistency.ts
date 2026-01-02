// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/pdm/document-consistency/check-and-fix */
export async function DocumentConsistencyCheckAndFixAsync(body: API.BurnAbpPdmDocumentManagementDocumentsDocumentConsistencyCheckInputDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentConsistencyIssueDto[]>('/api/pdm/document-consistency/check-and-fix', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
