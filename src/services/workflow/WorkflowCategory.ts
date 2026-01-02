// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-category/${param0} */
export async function WorkflowCategoryGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowCategoryGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowCategoryDto>(`/api/workflow-management/workflow-category/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-category/create */
export async function WorkflowCategoryCreate(body: API.BurnAbpWorkflowManagementApplicationWorkflowCategoryDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowCategoryDto>('/api/workflow-management/workflow-category/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-category/delete/${param0} */
export async function WorkflowCategoryDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowCategoryDeleteParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/workflow-management/workflow-category/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-category/list */
export async function WorkflowCategoryGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowCategoryGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowCategoryDto>('/api/workflow-management/workflow-category/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-category/update/${param0} */
export async function WorkflowCategoryUpdate(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowCategoryUpdateParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowCategoryDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowCategoryDto>(`/api/workflow-management/workflow-category/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
