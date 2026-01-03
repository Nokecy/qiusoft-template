// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/cancel-workflow/${param0} */
export async function WorkflowLaunchpadCancelWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadCancelWorkflowParams,
	options?: { [key: string]: any }
) {
	const { workflowInstaneId: param0, ...queryParams } = params;
	return request<any>(`/integration-api/workflow/workflow-launchpad/cancel-workflow/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/draft-definition */
export async function WorkflowLaunchpadCreateDraftDefinition(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadCreateDraftDefinitionParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpElsaAbstractServicesWorkflowDefinitionDto>('/integration-api/workflow/workflow-launchpad/draft-definition', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/execute-workflow */
export async function WorkflowLaunchpadExecuteWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadExecuteWorkflowParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowInputDto,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/workflow/workflow-launchpad/execute-workflow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/reject-workflow */
export async function WorkflowLaunchpadRejectWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadRejectWorkflowParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowInputDto,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/workflow/workflow-launchpad/reject-workflow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/revive-workflow/${param0} */
export async function WorkflowLaunchpadReviveWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadReviveWorkflowParams,
	options?: { [key: string]: any }
) {
	const { workflowInstaneId: param0, ...queryParams } = params;
	return request<any>(`/integration-api/workflow/workflow-launchpad/revive-workflow/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/start-workflow-by-name */
export async function WorkflowLaunchpadStartWorkflowByName(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadStartWorkflowByNameParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowInputDto,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/workflow/workflow-launchpad/start-workflow-by-name', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/startable-workflow */
export async function WorkflowLaunchpadStartableWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadStartableWorkflowParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowInputDto,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/workflow/workflow-launchpad/startable-workflow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/workflow/workflow-launchpad/terminate-workflow */
export async function WorkflowLaunchpadTerminateWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowLaunchpadTerminateWorkflowParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowInputDto,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/workflow/workflow-launchpad/terminate-workflow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}
