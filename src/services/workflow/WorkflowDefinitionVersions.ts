// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 DELETE /elsa/api/workflow-definition-versions/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteVersionDeleteVersion(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteVersionDeleteVersionParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definition-versions/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
