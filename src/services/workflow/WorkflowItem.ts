// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/${param0} */
export async function WorkflowItemGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemsWorkflowItemDto>(`/api/workflow-management/workflow-workItem/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-workItem/assign */
export async function WorkflowItemAssign(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemAssignParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/workflow-management/workflow-workItem/assign', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/by-activity */
export async function WorkflowItemGetByActivity(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemGetByActivityParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemsWorkflowItemDto>('/api/workflow-management/workflow-workItem/by-activity', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/list */
export async function WorkflowItemGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemDto>('/api/workflow-management/workflow-workItem/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/self-item-count */
export async function WorkflowItemGetSelfItemCount(options?: { [key: string]: any }) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemsWorkflowItemCountDto>('/api/workflow-management/workflow-workItem/self-item-count', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/selfList */
export async function WorkflowItemGetSelfList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemGetSelfListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemDto>('/api/workflow-management/workflow-workItem/selfList', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-workItem/urging */
export async function WorkflowItemUgring(body: API.BurnAbpWorkflowManagementApplicationWorkflowItemsUrgingWorkflowItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/workflow-management/workflow-workItem/urging', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/user-work-wait-count */
export async function WorkflowItemGetUserWorkItemWaitCount(options?: { [key: string]: any }) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemsUserWorkflowWaitCountDto[]>('/api/workflow-management/workflow-workItem/user-work-wait-count', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-workItem/user-workItem-status-count-ranking */
export async function WorkflowItemGetUserWorkItemStatusCountRanking(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemGetUserWorkItemStatusCountRankingParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemsUserWorkItemStatusCountDto[]>(
		'/api/workflow-management/workflow-workItem/user-workItem-status-count-ranking',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
