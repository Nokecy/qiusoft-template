// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-publish-request */
export async function DocumentPublishRequestGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto>('/api/pdm/document-publish-request', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建发布申请单 POST /api/pdm/document-publish-request */
export async function DocumentPublishRequestCreateAsync(
	body: API.BurnAbpPdmDocumentManagementDocumentPublishRequestsCreateDocumentPublishRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto>('/api/pdm/document-publish-request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-publish-request/${param0} */
export async function DocumentPublishRequestGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto>(`/api/pdm/document-publish-request/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除发布申请单 POST /api/pdm/document-publish-request/${param0}/delete */
export async function DocumentPublishRequestDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-publish-request/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/document-publish-request/${param0}/execute-workflow */
export async function DocumentPublishRequestExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentPublishRequestsExecuteDocumentPublishRequestWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto>(`/api/pdm/document-publish-request/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交申请单 POST /api/pdm/document-publish-request/${param0}/submit */
export async function DocumentPublishRequestSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-publish-request/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新发布申请单 POST /api/pdm/document-publish-request/${param0}/update */
export async function DocumentPublishRequestUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentPublishRequestsUpdateDocumentPublishRequestDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestDto>(`/api/pdm/document-publish-request/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取发布申请明细列表（支持动态查询） GET /api/pdm/document-publish-request/item-details-list */
export async function DocumentPublishRequestGetItemDetailsListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentPublishRequestGetItemDetailsListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentPublishRequestsDocumentPublishRequestItemDetailDto>(
		'/api/pdm/document-publish-request/item-details-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
