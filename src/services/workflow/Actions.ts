// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /elsa/api/actions/workflow-definitions/refresh */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsRefreshRefresh(
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsRefreshRequest,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/actions/workflow-definitions/refresh', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/actions/workflow-definitions/reload */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsReloadReload(options?: { [key: string]: any }) {
	return request<any>('/elsa/api/actions/workflow-definitions/reload', {
		method: 'POST',
		...(options || {}),
	});
}
