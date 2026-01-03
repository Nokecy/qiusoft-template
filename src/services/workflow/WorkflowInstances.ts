// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances */
export async function GetElsaWorkflowsApiEndpointsWorkflowInstancesListList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaWorkflowsApiEndpointsWorkflowInstancesListListParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesListResponse>('/elsa/api/workflow-instances', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-instances */
export async function PostElsaWorkflowsApiEndpointsWorkflowInstancesListList(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesListResponse>('/elsa/api/workflow-instances', {
		method: 'POST',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesGetGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesGetGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiModelsWorkflowInstanceModel>(`/elsa/api/workflow-instances/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /elsa/api/workflow-instances/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesDeleteDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesDeleteDeleteParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-instances/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances/${param0}/execution-state */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesExecutionStateExecutionState(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesExecutionStateExecutionStateParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesExecutionStateResponse>(`/elsa/api/workflow-instances/${param0}/execution-state`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances/${param0}/export */
export async function GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2Params,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-instances/${param0}/export`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-instances/${param0}/export */
export async function PostElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PostElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2Params,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-instances/${param0}/export`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances/${param0}/journal */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesJournalListGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesJournalListGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesJournalListResponse>(`/elsa/api/workflow-instances/${param0}/journal`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-instances/${param0}/journal */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListGetParams,
	body: API.ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListRequest,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesJournalFilteredListResponse>(`/elsa/api/workflow-instances/${param0}/journal`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances/${param0}/journal/${param1} */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesJournalGetLastEntryGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesJournalGetLastEntryGetParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, activityId: param1, ...queryParams } = params;
	return request<API.ElsaWorkflowsRuntimeEntitiesWorkflowExecutionLogRecord>(`/elsa/api/workflow-instances/${param0}/journal/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-instances/${param0}/variables */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesListList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesListListParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaModelsListResponseOfResolvedVariableModel2>(`/elsa/api/workflow-instances/${param0}/variables`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-instances/${param0}/variables */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostListParams,
	body: API.ElsaWorkflowsApiEndpointsWorkflowInstancesVariablesPostRequest,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaModelsListResponseOfResolvedVariableModel>(`/elsa/api/workflow-instances/${param0}/variables`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
