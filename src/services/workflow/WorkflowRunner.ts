// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-runner/execute-workflow */
export async function WorkflowRunnerExecuteWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowRunnerExecuteWorkflowParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/workflow-management/workflow-runner/execute-workflow', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-runner/reject-workflow */
export async function WorkflowRunnerRejectWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowRunnerRejectWorkflowParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/workflow-management/workflow-runner/reject-workflow', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-runner/revive-workflow */
export async function WorkflowRunnerReviveWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowRunnerReviveWorkflowParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/workflow-management/workflow-runner/revive-workflow', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
