// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/approve */
export async function DocumentLifecycleApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/approve`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/approve-revision */
export async function DocumentLifecycleApproveRevisionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleApproveRevisionAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsApproveDocumentRevisionInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentRevisionDto>(`/api/pdm/document-lifecycle/${param0}/approve-revision`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/check-in */
export async function DocumentLifecycleCheckInAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleCheckInAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/check-in`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/check-out */
export async function DocumentLifecycleCheckOutAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleCheckOutAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/check-out`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/discard-revision */
export async function DocumentLifecycleDiscardRevisionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleDiscardRevisionAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/discard-revision`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/force-unlock */
export async function DocumentLifecycleForceUnlockAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleForceUnlockAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/force-unlock`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/obsolete */
export async function DocumentLifecycleObsoleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleObsoleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/obsolete`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/release */
export async function DocumentLifecycleReleaseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleReleaseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/release`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/revision */
export async function DocumentLifecycleCreateRevisionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleCreateRevisionAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsCreateDocumentRevisionInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentRevisionDto>(`/api/pdm/document-lifecycle/${param0}/revision`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/submit-for-approval */
export async function DocumentLifecycleSubmitForApprovalAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleSubmitForApprovalAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document-lifecycle/${param0}/submit-for-approval`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-lifecycle/${param0}/submit-revision-for-approval */
export async function DocumentLifecycleSubmitRevisionForApprovalAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLifecycleSubmitRevisionForApprovalAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsSubmitDocumentRevisionInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentRevisionDto>(`/api/pdm/document-lifecycle/${param0}/submit-revision-for-approval`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
