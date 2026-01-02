// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /elsa/api/tasks/${param0}/complete */
export async function ElsaWorkflowsApiEndpointsTasksCompleteComplete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsTasksCompleteCompleteParams,
	body: API.ElsaWorkflowsApiEndpointsTasksCompleteRequest,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsTasksCompleteResponse>(`/elsa/api/tasks/${param0}/complete`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
