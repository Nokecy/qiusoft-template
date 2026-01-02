// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-copyTo/${param0} */
export async function WorkflowItemCopyToGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemCopyToGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemCopyTosWorkflowItemCopyToDto>(`/api/workflow-management/workflow-copyTo/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-copyTo/list */
export async function WorkflowItemCopyToGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemCopyToGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemCopyToDto>('/api/workflow-management/workflow-copyTo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/workflow-management/workflow-copyTo/read */
export async function WorkflowItemCopyToRead(body: API.BurnAbpWorkflowManagementApplicationWorkflowItemCopyTosReadWorkflowItemCopyTosDto, options?: { [key: string]: any }) {
	return request<any>('/api/workflow-management/workflow-copyTo/read', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/workflow-management/workflow-copyTo/read-all */
export async function WorkflowItemCopyToReadAll(options?: { [key: string]: any }) {
	return request<any>('/api/workflow-management/workflow-copyTo/read-all', {
		method: 'PUT',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-copyTo/selfList */
export async function WorkflowItemCopyToGetSelfList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemCopyToGetSelfListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemCopyToDto>('/api/workflow-management/workflow-copyTo/selfList', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
