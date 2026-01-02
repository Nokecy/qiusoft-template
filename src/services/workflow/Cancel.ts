// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /elsa/api/cancel/workflow-instances/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesCancelCancel(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowInstancesCancelCancelParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/cancel/workflow-instances/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
