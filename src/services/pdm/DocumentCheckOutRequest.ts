// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-check-out-request */
export async function DocumentCheckOutRequestGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto>('/api/pdm/document-check-out-request', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建检出申请单 POST /api/pdm/document-check-out-request */
export async function DocumentCheckOutRequestCreateAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsCreateDocumentCheckOutRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto>('/api/pdm/document-check-out-request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-check-out-request/${param0} */
export async function DocumentCheckOutRequestGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto>(`/api/pdm/document-check-out-request/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除检出申请单 POST /api/pdm/document-check-out-request/${param0}/delete */
export async function DocumentCheckOutRequestDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-check-out-request/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批 POST /api/pdm/document-check-out-request/${param0}/execute-workflow */
export async function DocumentCheckOutRequestExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsExecuteDocumentCheckOutRequestWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto>(`/api/pdm/document-check-out-request/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交申请单 POST /api/pdm/document-check-out-request/${param0}/submit */
export async function DocumentCheckOutRequestSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-check-out-request/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新检出申请单 POST /api/pdm/document-check-out-request/${param0}/update */
export async function DocumentCheckOutRequestUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsUpdateDocumentCheckOutRequestDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestDto>(`/api/pdm/document-check-out-request/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取检出申请明细列表（支持动态查询） GET /api/pdm/document-check-out-request/item-details-list */
export async function DocumentCheckOutRequestGetItemDetailsListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCheckOutRequestGetItemDetailsListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutRequestItemDetailDto>(
		'/api/pdm/document-check-out-request/item-details-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 批量验证文档是否可以检出 POST /api/pdm/document-check-out-request/validate-batch-check-out */
export async function DocumentCheckOutRequestValidateBatchCheckOutAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutValidationRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentCheckOutRequestsDocumentCheckOutValidationResultDto>('/api/pdm/document-check-out-request/validate-batch-check-out', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
