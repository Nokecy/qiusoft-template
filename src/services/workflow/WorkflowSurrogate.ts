// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-surrogate/${param0} */
export async function WorkflowSurrogateGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowSurrogateGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto>(`/api/workflow-management/workflow-surrogate/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-surrogate/create */
export async function WorkflowSurrogateCreate(body: API.BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto>('/api/workflow-management/workflow-surrogate/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-surrogate/delete/${param0} */
export async function WorkflowSurrogateDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowSurrogateDeleteParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/workflow-management/workflow-surrogate/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-surrogate/list */
export async function WorkflowSurrogateGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowSurrogateGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowSurrogateDto>('/api/workflow-management/workflow-surrogate/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-surrogate/update/${param0} */
export async function WorkflowSurrogateUpdate(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowSurrogateUpdateParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowSurrogatesWorkflowSurrogateDto>(`/api/workflow-management/workflow-surrogate/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
