// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/activity-executions/${param0} */
export async function ElsaWorkflowsApiEndpointsActivityExecutionsGetEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsActivityExecutionsGetEndpointParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsRuntimeEntitiesActivityExecutionRecord>(`/elsa/api/activity-executions/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/activity-executions/count */
export async function ElsaWorkflowsApiEndpointsActivityExecutionsCountCount(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsActivityExecutionsCountCountParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaModelsCountResponse>('/elsa/api/activity-executions/count', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/activity-executions/list */
export async function ElsaWorkflowsApiEndpointsActivityExecutionsListList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsActivityExecutionsListListParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaModelsListResponseOfActivityExecutionRecord>('/elsa/api/activity-executions/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/activity-executions/report */
export async function ElsaWorkflowsApiEndpointsActivityExecutionsReportReport(
	body: API.ElsaWorkflowsApiEndpointsActivityExecutionsReportRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsActivityExecutionsReportResponse>('/elsa/api/activity-executions/report', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
