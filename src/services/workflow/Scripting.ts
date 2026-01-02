// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /elsa/api/scripting/javascript/type-definitions/${param0} */
export async function ElsaJavaScriptEndpointsTypeDefinitionsGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaJavaScriptEndpointsTypeDefinitionsGetParams,
	body: API.ElsaJavaScriptEndpointsTypeDefinitionsRequest,
	options?: { [key: string]: any }
) {
	const { workflowDefinitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/scripting/javascript/type-definitions/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
