// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-workflow/application-info-by-target-row-id/${param0} */
export async function DynamicDataWorkflowGetApplicationInfoByTargetRowIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowGetApplicationInfoByTargetRowIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { targetRowId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaWorkflowDtosApplicationInfoDto>(`/api/dynamic-schema/dynamic-data-workflow/application-info-by-target-row-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-workflow/bookmarks-by-entity-id */
export async function DynamicDataWorkflowGetBookmarksByEntityIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowGetBookmarksByEntityIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowBookmarkDto[]>('/api/dynamic-schema/dynamic-data-workflow/bookmarks-by-entity-id', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-workflow/bookmarks-by-entity-ids/${param0} */
export async function DynamicDataWorkflowGetBookmarksByEntityIdsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowGetBookmarksByEntityIdsAsyncParams,
	options?: { [key: string]: any }
) {
	const { applicationId: param0, ...queryParams } = params;
	return request<Record<string, any>>(`/api/dynamic-schema/dynamic-data-workflow/bookmarks-by-entity-ids/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data-workflow/cancel */
export async function DynamicDataWorkflowCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowCancelAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowProxyDto>('/api/dynamic-schema/dynamic-data-workflow/cancel', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data-workflow/execute */
export async function DynamicDataWorkflowExecuteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowExecuteAsyncParams,
	body: API.BurnAbpDynamicSchemaWorkflowDtosExecuteDynamicDataWorkflowInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowProxyDto>('/api/dynamic-schema/dynamic-data-workflow/execute', {
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

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-workflow/pending-tasks */
export async function DynamicDataWorkflowGetPendingTasksAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowGetPendingTasksAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowBookmarkDto[]>('/api/dynamic-schema/dynamic-data-workflow/pending-tasks', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data-workflow/submit */
export async function DynamicDataWorkflowSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowProxyDto>('/api/dynamic-schema/dynamic-data-workflow/submit', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-workflow/workflow-history */
export async function DynamicDataWorkflowGetWorkflowHistoryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowGetWorkflowHistoryAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowBookmarkDto[]>('/api/dynamic-schema/dynamic-data-workflow/workflow-history', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-workflow/workflow-proxy */
export async function DynamicDataWorkflowGetWorkflowProxyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataWorkflowGetWorkflowProxyAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaWorkflowDtosDynamicDataWorkflowProxyDto>('/api/dynamic-schema/dynamic-data-workflow/workflow-proxy', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
