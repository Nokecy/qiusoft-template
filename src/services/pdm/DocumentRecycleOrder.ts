// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-recycle-order */
export async function DocumentRecycleOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>('/api/pdm/document-recycle-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建回收单。 POST /api/pdm/document-recycle-order */
export async function DocumentRecycleOrderCreateAsync(body: API.BurnAbpPdmDocumentManagementRecycleOrdersCreateDocumentRecycleOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>('/api/pdm/document-recycle-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-recycle-order/${param0} */
export async function DocumentRecycleOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 审批回收单。 POST /api/pdm/document-recycle-order/${param0}/approve */
export async function DocumentRecycleOrderApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/approve`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-recycle-order/${param0}/delete */
export async function DocumentRecycleOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-recycle-order/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行回收单工作流审批动作。 POST /api/pdm/document-recycle-order/${param0}/execute-workflow */
export async function DocumentRecycleOrderExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementRecycleOrdersExecuteRecycleOrderWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 添加回收明细。 POST /api/pdm/document-recycle-order/${param0}/item */
export async function DocumentRecycleOrderAddItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderAddItemAsyncParams,
	body: API.BurnAbpPdmDocumentManagementRecycleOrdersAddRecycleOrderItemDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/item`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 驳回回收单。 POST /api/pdm/document-recycle-order/${param0}/reject */
export async function DocumentRecycleOrderRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderRejectAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/reject`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 删除回收明细。 POST /api/pdm/document-recycle-order/${param0}/remove-item/${param1} */
export async function DocumentRecycleOrderRemoveItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderRemoveItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, itemId: param1, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/remove-item/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交回收单。 POST /api/pdm/document-recycle-order/${param0}/submit */
export async function DocumentRecycleOrderSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新回收单。 POST /api/pdm/document-recycle-order/${param0}/update */
export async function DocumentRecycleOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementRecycleOrdersUpdateDocumentRecycleOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新回收明细。 POST /api/pdm/document-recycle-order/${param0}/update-item/${param1} */
export async function DocumentRecycleOrderUpdateItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderUpdateItemAsyncParams,
	body: API.BurnAbpPdmDocumentManagementRecycleOrdersUpdateRecycleOrderItemDto,
	options?: { [key: string]: any }
) {
	const { id: param0, itemId: param1, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderDto>(`/api/pdm/document-recycle-order/${param0}/update-item/${param1}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取回收明细列表（动态过滤）。 GET /api/pdm/document-recycle-order/item-details-list */
export async function DocumentRecycleOrderGetItemDetailsListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentRecycleOrderGetItemDetailsListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementRecycleOrdersDocumentRecycleOrderItemDetailDto>(
		'/api/pdm/document-recycle-order/item-details-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
