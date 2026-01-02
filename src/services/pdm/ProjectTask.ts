// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-task */
export async function ProjectTaskGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目任务 POST /api/pdm/project-task */
export async function ProjectTaskCreateAsync(body: API.BurnAbpPdmProjectManagementProjectTasksCreateProjectTaskDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-task/${param0} */
export async function ProjectTaskGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskDto>(`/api/pdm/project-task/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除项目任务（仅创建人可删除） POST /api/pdm/project-task/${param0}/delete */
export async function ProjectTaskDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-task/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目任务（仅创建人可修改） POST /api/pdm/project-task/${param0}/update */
export async function ProjectTaskUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectTasksUpdateProjectTaskDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskDto>(`/api/pdm/project-task/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 指派任务 POST /api/pdm/project-task/assign-task */
export async function ProjectTaskAssignTaskAsync(body: API.BurnAbpPdmProjectManagementProjectTasksAssignTaskDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/assign-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据里程碑 ID 获取任务列表 GET /api/pdm/project-task/by-milestone-id/${param0} */
export async function ProjectTaskGetListByMilestoneIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetListByMilestoneIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { milestoneId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto>(`/api/pdm/project-task/by-milestone-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 根据父任务编码获取子任务列表 GET /api/pdm/project-task/by-parent-code */
export async function ProjectTaskGetListByParentCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetListByParentCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task/by-parent-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取任务列表 GET /api/pdm/project-task/by-project-code */
export async function ProjectTaskGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据任务编码获取任务 GET /api/pdm/project-task/by-task-code */
export async function ProjectTaskGetByTaskCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetByTaskCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task/by-task-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 取消任务 POST /api/pdm/project-task/cancel-task/${param0} */
export async function ProjectTaskCancelTaskAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskCancelTaskAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-task/cancel-task/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 完成任务 POST /api/pdm/project-task/complete-task */
export async function ProjectTaskCompleteTaskAsync(body: API.BurnAbpPdmProjectManagementProjectTasksCompleteTaskDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/complete-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取任务的执行记录列表 GET /api/pdm/project-task/execution-records/${param0} */
export async function ProjectTaskGetExecutionRecordsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetExecutionRecordsAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksTaskExecutionRecordDto[]>(`/api/pdm/project-task/execution-records/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 为任务添加问题关联 POST /api/pdm/project-task/issue */
export async function ProjectTaskAddIssueAsync(body: API.BurnAbpPdmProjectManagementProjectTasksAddTaskIssueInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/issue', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批量为任务添加问题关联 POST /api/pdm/project-task/issues */
export async function ProjectTaskAddIssuesAsync(body: API.BurnAbpPdmProjectManagementProjectTasksAddTaskIssuesInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/issues', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取任务关联的所有问题 GET /api/pdm/project-task/issues/${param0} */
export async function ProjectTaskGetIssuesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetIssuesAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskIssueDto[]>(`/api/pdm/project-task/issues/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取我的任务列表（我负责或我处理的任务） GET /api/pdm/project-task/my-tasks */
export async function ProjectTaskGetMyTasksAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetMyTasksAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task/my-tasks', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取我关注的任务列表 GET /api/pdm/project-task/my-watched-list */
export async function ProjectTaskGetMyWatchedListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetMyWatchedListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTasksProjectTaskDto>('/api/pdm/project-task/my-watched-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 移除任务的问题关联 POST /api/pdm/project-task/remove-issue */
export async function ProjectTaskRemoveIssueAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskRemoveIssueAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/project-task/remove-issue', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 移除任务的风险关联 POST /api/pdm/project-task/remove-risk */
export async function ProjectTaskRemoveRiskAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskRemoveRiskAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/project-task/remove-risk', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 为任务添加风险关联 POST /api/pdm/project-task/risk */
export async function ProjectTaskAddRiskAsync(body: API.BurnAbpPdmProjectManagementProjectTasksAddTaskRiskInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/risk', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批量为任务添加风险关联 POST /api/pdm/project-task/risks */
export async function ProjectTaskAddRisksAsync(body: API.BurnAbpPdmProjectManagementProjectTasksAddTaskRisksInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/risks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取任务关联的所有风险 GET /api/pdm/project-task/risks/${param0} */
export async function ProjectTaskGetRisksAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetRisksAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskRiskDto[]>(`/api/pdm/project-task/risks/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 开始任务 POST /api/pdm/project-task/start-task */
export async function ProjectTaskStartTaskAsync(body: API.BurnAbpPdmProjectManagementProjectTasksStartTaskDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-task/start-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取关联了指定问题的所有任务 GET /api/pdm/project-task/tasks-by-issue/${param0} */
export async function ProjectTaskGetTasksByIssueAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetTasksByIssueAsyncParams,
	options?: { [key: string]: any }
) {
	const { issueId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[]>(`/api/pdm/project-task/tasks-by-issue/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取关联了指定风险的所有任务 GET /api/pdm/project-task/tasks-by-risk/${param0} */
export async function ProjectTaskGetTasksByRiskAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTaskGetTasksByRiskAsyncParams,
	options?: { [key: string]: any }
) {
	const { riskId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTasksProjectTaskDto[]>(`/api/pdm/project-task/tasks-by-risk/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
