// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-obsolescence-request */
export async function DocumentObsolescenceRequestGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>(
		'/api/pdm/document-obsolescence-request',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 创建作废申请 POST /api/pdm/document-obsolescence-request */
export async function DocumentObsolescenceRequestCreateAsync(
	body: API.BurnAbpPdmApplicationContractsDocumentManagementRequestsCreateDocumentObsolescenceRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>('/api/pdm/document-obsolescence-request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-obsolescence-request/${param0} */
export async function DocumentObsolescenceRequestGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>(`/api/pdm/document-obsolescence-request/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-obsolescence-request/${param0}/delete */
export async function DocumentObsolescenceRequestDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-obsolescence-request/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/document-obsolescence-request/${param0}/execute-workflow */
export async function DocumentObsolescenceRequestExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmApplicationContractsDocumentManagementRequestsExecuteDocumentObsolescenceRequestWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>(`/api/pdm/document-obsolescence-request/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交审批 POST /api/pdm/document-obsolescence-request/${param0}/submit */
export async function DocumentObsolescenceRequestSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-obsolescence-request/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新申请 (仅待审批状态可更新) POST /api/pdm/document-obsolescence-request/${param0}/update */
export async function DocumentObsolescenceRequestUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestUpdateAsyncParams,
	body: API.BurnAbpPdmApplicationContractsDocumentManagementRequestsUpdateDocumentObsolescenceRequestDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>(`/api/pdm/document-obsolescence-request/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 撤回申请 POST /api/pdm/document-obsolescence-request/${param0}/withdraw */
export async function DocumentObsolescenceRequestWithdrawAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestWithdrawAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-obsolescence-request/${param0}/withdraw`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 根据文档ID获取作废申请列表 GET /api/pdm/document-obsolescence-request/by-document-id/${param0} */
export async function DocumentObsolescenceRequestGetByDocumentIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestGetByDocumentIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto[]>(`/api/pdm/document-obsolescence-request/by-document-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取我发起的申请列表 GET /api/pdm/document-obsolescence-request/my-applications */
export async function DocumentObsolescenceRequestGetMyApplicationsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestGetMyApplicationsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>(
		'/api/pdm/document-obsolescence-request/my-applications',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 获取待我审批的申请列表 GET /api/pdm/document-obsolescence-request/pending-approval-list */
export async function DocumentObsolescenceRequestGetPendingApprovalListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentObsolescenceRequestGetPendingApprovalListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsDocumentManagementRequestsDocumentObsolescenceRequestDto>(
		'/api/pdm/document-obsolescence-request/pending-approval-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
