// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /elsa/api/events/${param0}/trigger */
export async function ElsaWorkflowsApiEndpointsEventsTriggerAuthenticatedTrigger(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsEventsTriggerAuthenticatedTriggerParams,
	body: API.ElsaWorkflowsApiEndpointsEventsTriggerAuthenticatedRequest,
	options?: { [key: string]: any }
) {
	const { eventName: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/events/${param0}/trigger`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/events/trigger */
export async function ElsaWorkflowsApiEndpointsEventsTriggerPublicTrigger(options?: { [key: string]: any }) {
	return request<any>('/elsa/api/events/trigger', {
		method: 'GET',
		...(options || {}),
	});
}
