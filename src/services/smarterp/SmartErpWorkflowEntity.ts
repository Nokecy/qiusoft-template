// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/smart-erp/smart-erp-workflow-entity */
export async function SmartErpWorkflowEntityGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SmartErpWorkflowEntityGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/smart-erp/smart-erp-workflow-entity', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /integration-api/smart-erp/smart-erp-workflow-entity/${param0} */
export async function SmartErpWorkflowEntityGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SmartErpWorkflowEntityGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/integration-api/smart-erp/smart-erp-workflow-entity/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}
