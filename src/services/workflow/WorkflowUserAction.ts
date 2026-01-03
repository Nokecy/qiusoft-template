// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-user-action/list/by-workflow-instance/${param0} */
export async function WorkflowUserActionGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowUserActionGetListParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, ...queryParams } = params;
	return request<string[]>(`/api/workflow-management/workflow-user-action/list/by-workflow-instance/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-user-action/list/by-workflow-instance/${param0}/${param1} */
export async function WorkflowUserActionGetListByActivity(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowUserActionGetListByActivityParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, activityId: param1, ...queryParams } = params;
	return request<string[]>(`/api/workflow-management/workflow-user-action/list/by-workflow-instance/${param0}/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-user-action/user-action/list/${param0}/${param1} */
export async function WorkflowUserActionGetActionListByActivity(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowUserActionGetActionListByActivityParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, activityId: param1, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowUserActionsUserAction[]>(`/api/workflow-management/workflow-user-action/user-action/list/${param0}/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
