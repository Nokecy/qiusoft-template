// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-conversion */
export async function DocumentConversionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementConversionsDocumentConversionDto>('/api/pdm/document-conversion', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建转换任务（重写基类方法以添加后台作业） POST /api/pdm/document-conversion */
export async function DocumentConversionCreateAsync(body: API.BurnAbpPdmDocumentManagementConversionsCreateDocumentConversionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementConversionsDocumentConversionDto>('/api/pdm/document-conversion', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 重写 GetAsync 以自动包含导航属性 GET /api/pdm/document-conversion/${param0} */
export async function DocumentConversionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementConversionsDocumentConversionDto>(`/api/pdm/document-conversion/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-conversion/${param0}/delete */
export async function DocumentConversionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-conversion/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 禁用更新操作（转换任务不支持直接更新） POST /api/pdm/document-conversion/${param0}/update */
export async function DocumentConversionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementConversionsCreateDocumentConversionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementConversionsDocumentConversionDto>(`/api/pdm/document-conversion/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 取消转换 POST /api/pdm/document-conversion/cancel */
export async function DocumentConversionCancelAsync(body: API.BurnAbpPdmDocumentManagementConversionsCancelConversionInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/document-conversion/cancel', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 处理Webhook回调（统一接口，支持所有转换引擎） POST /api/pdm/document-conversion/handle-webhook-callback */
export async function DocumentConversionHandleWebhookCallbackAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionHandleWebhookCallbackAsyncParams,
	body: Record<string, any>,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementConversionsWebhookCallbackResultDto>('/api/pdm/document-conversion/handle-webhook-callback', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 获取转换日志列表 GET /api/pdm/document-conversion/logs/${param0} */
export async function DocumentConversionGetLogsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionGetLogsAsyncParams,
	options?: { [key: string]: any }
) {
	const { conversionId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementConversionsConversionLogDto[]>(`/api/pdm/document-conversion/logs/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 重试失败的转换 POST /api/pdm/document-conversion/retry */
export async function DocumentConversionRetryAsync(body: API.BurnAbpPdmDocumentManagementConversionsRetryConversionInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementConversionsDocumentConversionDto>('/api/pdm/document-conversion/retry', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取转换统计信息 GET /api/pdm/document-conversion/statistics/${param0} */
export async function DocumentConversionGetStatisticsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionGetStatisticsAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementConversionsConversionStatisticsDto>(`/api/pdm/document-conversion/statistics/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 手动触发/重新触发转换（支持 force=true 强制重新转换） POST /api/pdm/document-conversion/trigger-manual */
export async function DocumentConversionTriggerManualAsync(body: API.BurnAbpPdmDocumentManagementConversionsTriggerManualConversionInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementConversionsDocumentConversionDto>('/api/pdm/document-conversion/trigger-manual', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
