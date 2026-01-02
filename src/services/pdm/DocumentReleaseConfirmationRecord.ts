// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取确认记录列表 GET /api/pdm/document-release-confirmation-record */
export async function DocumentReleaseConfirmationRecordGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseConfirmationRecordGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseConfirmationRecordDto>(
		'/api/pdm/document-release-confirmation-record',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 获取单个确认记录 GET /api/pdm/document-release-confirmation-record/${param0} */
export async function DocumentReleaseConfirmationRecordGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseConfirmationRecordGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseConfirmationRecordDto>(`/api/pdm/document-release-confirmation-record/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 确认文档 POST /api/pdm/document-release-confirmation-record/${param0}/confirm */
export async function DocumentReleaseConfirmationRecordConfirmAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseConfirmationRecordConfirmAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentReleasesConfirmDocumentInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release-confirmation-record/${param0}/confirm`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 拒绝文档 POST /api/pdm/document-release-confirmation-record/${param0}/reject */
export async function DocumentReleaseConfirmationRecordRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseConfirmationRecordRejectAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentReleasesRejectDocumentInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release-confirmation-record/${param0}/reject`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
