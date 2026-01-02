// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取工作流实体列表（支持动态 WorkflowName） GET /integration-api/dynamic-schema/dynamic-schema-workflow-entity */
export async function DynamicSchemaWorkflowEntityGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicSchemaWorkflowEntityGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/dynamic-schema/dynamic-schema-workflow-entity', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取单个工作流实体 GET /integration-api/dynamic-schema/dynamic-schema-workflow-entity/${param0} */
export async function DynamicSchemaWorkflowEntityGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicSchemaWorkflowEntityGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/integration-api/dynamic-schema/dynamic-schema-workflow-entity/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}
