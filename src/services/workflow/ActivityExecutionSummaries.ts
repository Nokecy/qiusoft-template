// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/activity-execution-summaries/list */
export async function ElsaWorkflowsApiEndpointsActivityExecutionSummariesListSummariesEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsActivityExecutionSummariesListSummariesEndpointParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaModelsListResponseOfActivityExecutionRecordSummary>('/elsa/api/activity-execution-summaries/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
