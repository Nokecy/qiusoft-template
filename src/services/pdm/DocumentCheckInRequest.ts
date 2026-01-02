// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-check-in-request */
export async function DocumentCheckInRequestGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto>('/api/pdm/document-check-in-request', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建检入申请单 POST /api/pdm/document-check-in-request */
export async function DocumentCheckInRequestCreateAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsCreateDocumentCheckInRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto>('/api/pdm/document-check-in-request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-check-in-request/${param0} */
export async function DocumentCheckInRequestGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto>(`/api/pdm/document-check-in-request/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除检入申请单 POST /api/pdm/document-check-in-request/${param0}/delete */
export async function DocumentCheckInRequestDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-check-in-request/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-check-in-request/${param0}/execute-workflow */
export async function DocumentCheckInRequestExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsExecuteDocumentCheckInRequestWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto>(`/api/pdm/document-check-in-request/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交申请单 POST /api/pdm/document-check-in-request/${param0}/submit */
export async function DocumentCheckInRequestSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-check-in-request/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新检入申请单 POST /api/pdm/document-check-in-request/${param0}/update */
export async function DocumentCheckInRequestUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsUpdateDocumentCheckInRequestDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestDto>(`/api/pdm/document-check-in-request/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） GET /api/pdm/document-check-in-request/item-details-list */
export async function DocumentCheckInRequestGetItemDetailsListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckInRequestGetItemDetailsListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInRequestItemDetailDto>(
		'/api/pdm/document-check-in-request/item-details-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 批量验证文档是否可以检入 POST /api/pdm/document-check-in-request/validate-batch-check-in */
export async function DocumentCheckInRequestValidateBatchCheckInAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInValidationRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentCheckInValidationResultDto>('/api/pdm/document-check-in-request/validate-batch-check-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 验证新版本号是否唯一 POST /api/pdm/document-check-in-request/validate-version-uniqueness */
export async function DocumentCheckInRequestValidateVersionUniquenessAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentVersionValidationRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckInRequestsDocumentVersionValidationResultDto>('/api/pdm/document-check-in-request/validate-version-uniqueness', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
