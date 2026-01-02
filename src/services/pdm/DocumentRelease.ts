// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-release */
export async function DocumentReleaseGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto>('/api/pdm/document-release', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建文档发放单 POST /api/pdm/document-release */
export async function DocumentReleaseCreateAsync(body: API.BurnAbpPdmDocumentManagementDocumentReleasesCreateDocumentReleaseDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto>('/api/pdm/document-release', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-release/${param0} */
export async function DocumentReleaseGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto>(`/api/pdm/document-release/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 关闭发放单 POST /api/pdm/document-release/${param0}/close */
export async function DocumentReleaseCloseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseCloseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/close`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 接收人确认接收 POST /api/pdm/document-release/${param0}/confirm-receipt */
export async function DocumentReleaseConfirmReceiptAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseConfirmReceiptAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/confirm-receipt`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-release/${param0}/delete */
export async function DocumentReleaseDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 添加文档到发放单 POST /api/pdm/document-release/${param0}/document */
export async function DocumentReleaseAddDocumentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseAddDocumentAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentReleasesCreateUpdateReleaseDocumentItemDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/document`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 执行发放 POST /api/pdm/document-release/${param0}/execute */
export async function DocumentReleaseExecuteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseExecuteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/execute`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/document-release/${param0}/execute-workflow */
export async function DocumentReleaseExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentReleasesExecuteDocumentReleaseWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto>(`/api/pdm/document-release/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 标记文档已回收 POST /api/pdm/document-release/${param0}/mark-document-recalled/${param1} */
export async function DocumentReleaseMarkDocumentRecalledAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseMarkDocumentRecalledAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, documentItemId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/mark-document-recalled/${param1}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 添加接收人 POST /api/pdm/document-release/${param0}/recipient */
export async function DocumentReleaseAddRecipientAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseAddRecipientAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentReleasesReleaseRecipientInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/recipient`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 移除发放单中的文档 POST /api/pdm/document-release/${param0}/remove-document/${param1} */
export async function DocumentReleaseRemoveDocumentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseRemoveDocumentAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, documentItemId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/remove-document/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 移除接收人 POST /api/pdm/document-release/${param0}/remove-recipient/${param1} */
export async function DocumentReleaseRemoveRecipientAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseRemoveRecipientAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, recipientId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/remove-recipient/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置文档的不回收对象列表 POST /api/pdm/document-release/${param0}/set-non-recall-recipients/${param1} */
export async function DocumentReleaseSetNonRecallRecipientsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseSetNonRecallRecipientsAsyncParams,
	body: API.BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto[],
	options?: { [key: string]: any }
) {
	const { id: param0, documentItemId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/set-non-recall-recipients/${param1}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交审批 POST /api/pdm/document-release/${param0}/submit */
export async function DocumentReleaseSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-release/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新文档发放单（仅允许更新基本信息，且仅草稿状态可更新） POST /api/pdm/document-release/${param0}/update */
export async function DocumentReleaseUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentReleasesUpdateDocumentReleaseDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDto>(`/api/pdm/document-release/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取文档每日发放汇总列表
支持动态查询和分页 GET /api/pdm/document-release/daily-summary-list */
export async function DocumentReleaseGetDailySummaryListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentReleaseGetDailySummaryListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesDocumentReleaseDailySummaryDto>(
		'/api/pdm/document-release/daily-summary-list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
