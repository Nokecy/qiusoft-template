// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-definition/create-draft-definition/${param0} */
export async function WorkflowDefinitionCreateDraftDefinition(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionCreateDraftDefinitionParams,
	options?: { [key: string]: any }
) {
	const { name: param0, ...queryParams } = params;
	return request<API.VoloAbpElsaAbstractServicesWorkflowDefinitionDto>(`/api/workflow-management/workflow-definition/create-draft-definition/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-definition/find-by-name/${param0} */
export async function WorkflowDefinitionFindByName(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionFindByNameParams,
	options?: { [key: string]: any }
) {
	const { name: param0, ...queryParams } = params;
	return request<API.VoloAbpElsaAbstractServicesWorkflowDefinitionDto>(`/api/workflow-management/workflow-definition/find-by-name/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-definition/draft-definition */
export async function WorkflowDefinitionCreateDraftDefinition2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionCreateDraftDefinition2Params,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpElsaAbstractServicesWorkflowDefinitionDto>('/integration-api/workflow/workflow-definition/draft-definition', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-definition/find-by-name */
export async function WorkflowDefinitionFindByName2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionFindByName2Params,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpElsaAbstractServicesWorkflowDefinitionDto>('/integration-api/workflow/workflow-definition/find-by-name', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
