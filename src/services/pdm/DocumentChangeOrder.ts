// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-change-order */
export async function DocumentChangeOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementDocumentChangeOrderDto>('/api/pdm/document-change-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建文档变更单 POST /api/pdm/document-change-order */
export async function DocumentChangeOrderCreateAsync(body: API.BurnAbpPdmChangeManagementCreateDocumentChangeOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmChangeManagementDocumentChangeOrderDto>('/api/pdm/document-change-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-change-order/${param0} */
export async function DocumentChangeOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementDocumentChangeOrderDto>(`/api/pdm/document-change-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 添加受影响的文档（变更单明细项） POST /api/pdm/document-change-order/${param0}/affected-document */
export async function DocumentChangeOrderAddAffectedDocumentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderAddAffectedDocumentAsyncParams,
	body: API.BurnAbpPdmChangeManagementAddAffectedDocumentDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-change-order/${param0}/affected-document`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 批准变更单 POST /api/pdm/document-change-order/${param0}/approve */
export async function DocumentChangeOrderApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderApproveAsyncParams,
	body: API.BurnAbpPdmChangeManagementApproveChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-change-order/${param0}/approve`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-change-order/${param0}/delete */
export async function DocumentChangeOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-change-order/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/document-change-order/${param0}/execute-workflow */
export async function DocumentChangeOrderExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmChangeManagementExecuteDocumentChangeOrderWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementDocumentChangeOrderDto>(`/api/pdm/document-change-order/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 拒绝变更单 POST /api/pdm/document-change-order/${param0}/reject */
export async function DocumentChangeOrderRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderRejectAsyncParams,
	body: API.BurnAbpPdmChangeManagementRejectChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-change-order/${param0}/reject`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 移除受影响的文档（变更单明细项） POST /api/pdm/document-change-order/${param0}/remove-affected-document/${param1} */
export async function DocumentChangeOrderRemoveAffectedDocumentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderRemoveAffectedDocumentAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, itemId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/document-change-order/${param0}/remove-affected-document/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交审批 POST /api/pdm/document-change-order/${param0}/submit-for-approval */
export async function DocumentChangeOrderSubmitForApprovalAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderSubmitForApprovalAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-change-order/${param0}/submit-for-approval`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新文档变更单 POST /api/pdm/document-change-order/${param0}/update */
export async function DocumentChangeOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderUpdateAsyncParams,
	body: API.BurnAbpPdmChangeManagementUpdateDocumentChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementDocumentChangeOrderDto>(`/api/pdm/document-change-order/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据变更单号获取变更单 GET /api/pdm/document-change-order/by-change-order-number */
export async function DocumentChangeOrderGetByChangeOrderNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderGetByChangeOrderNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmChangeManagementDocumentChangeOrderDto>('/api/pdm/document-change-order/by-change-order-number', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取变更单明细列表（支持动态查询） GET /api/pdm/document-change-order/item-details-list */
export async function DocumentChangeOrderGetItemDetailsListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderGetItemDetailsListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementDocumentChangeOrderItemDetailDto>('/api/pdm/document-change-order/item-details-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取待审批的变更单列表 GET /api/pdm/document-change-order/pending-approvals */
export async function DocumentChangeOrderGetPendingApprovalsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentChangeOrderGetPendingApprovalsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementDocumentChangeOrderDto>('/api/pdm/document-change-order/pending-approvals', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
