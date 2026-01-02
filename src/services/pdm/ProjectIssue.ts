// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-issue */
export async function ProjectIssueGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目问题 POST /api/pdm/project-issue */
export async function ProjectIssueCreateAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesCreateProjectIssueDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-issue/${param0} */
export async function ProjectIssueGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>(`/api/pdm/project-issue/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-issue/${param0}/delete */
export async function ProjectIssueDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-issue/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目问题 POST /api/pdm/project-issue/${param0}/update */
export async function ProjectIssueUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectIssuesUpdateProjectIssueDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>(`/api/pdm/project-issue/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 激活问题(重新打开) POST /api/pdm/project-issue/activate */
export async function ProjectIssueActivateAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesActivateIssueDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/activate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 审批通过问题解决方案 POST /api/pdm/project-issue/approve-resolution */
export async function ProjectIssueApproveResolutionAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesApproveIssueResolutionDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/approve-resolution', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 指派问题 POST /api/pdm/project-issue/assign */
export async function ProjectIssueAssignAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesAssignIssueDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/assign', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据问题编码获取问题 GET /api/pdm/project-issue/by-code */
export async function ProjectIssueGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据里程碑 ID 获取问题列表 GET /api/pdm/project-issue/by-milestone-id/${param0} */
export async function ProjectIssueGetListByMilestoneIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetListByMilestoneIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { milestoneId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>(`/api/pdm/project-issue/by-milestone-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取问题列表 GET /api/pdm/project-issue/by-project-code */
export async function ProjectIssueGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据状态获取问题列表 GET /api/pdm/project-issue/by-status */
export async function ProjectIssueGetListByStatusAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetListByStatusAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue/by-status', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据任务 ID 获取问题列表 GET /api/pdm/project-issue/by-task-id/${param0} */
export async function ProjectIssueGetListByTaskIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetListByTaskIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>(`/api/pdm/project-issue/by-task-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 关闭问题 POST /api/pdm/project-issue/close */
export async function ProjectIssueCloseAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesCloseIssueDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/close', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 添加问题备注 POST /api/pdm/project-issue/comment/${param0} */
export async function ProjectIssueAddCommentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueAddCommentAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectIssuesAddIssueCommentDto,
	options?: { [key: string]: any }
) {
	const { issueId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-issue/comment/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 确认接收问题 POST /api/pdm/project-issue/confirm-receive */
export async function ProjectIssueConfirmReceiveAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesConfirmReceiveIssueDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/confirm-receive', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取问题执行周期列表 GET /api/pdm/project-issue/execution-cycles/${param0} */
export async function ProjectIssueGetExecutionCyclesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetExecutionCyclesAsyncParams,
	options?: { [key: string]: any }
) {
	const { issueId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectIssuesProjectIssueExecutionCycleDto[]>(`/api/pdm/project-issue/execution-cycles/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取问题执行记录列表 GET /api/pdm/project-issue/execution-records/${param0} */
export async function ProjectIssueGetExecutionRecordsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetExecutionRecordsAsyncParams,
	options?: { [key: string]: any }
) {
	const { issueId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectIssuesIssueExecutionRecordDto[]>(`/api/pdm/project-issue/execution-records/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取我负责/我处理的问题列表（工作区语义） GET /api/pdm/project-issue/my-issues */
export async function ProjectIssueGetMyIssuesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetMyIssuesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue/my-issues', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取我关注的问题列表 GET /api/pdm/project-issue/my-watched-list */
export async function ProjectIssueGetMyWatchedListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectIssueGetMyWatchedListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectIssuesProjectIssueDto>('/api/pdm/project-issue/my-watched-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 拒绝问题解决方案 POST /api/pdm/project-issue/reject-resolution */
export async function ProjectIssueRejectResolutionAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesRejectIssueResolutionDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/reject-resolution', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 解决问题 POST /api/pdm/project-issue/resolve */
export async function ProjectIssueResolveAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesResolveIssueDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/resolve', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 开始处理问题 POST /api/pdm/project-issue/start-processing */
export async function ProjectIssueStartProcessingAsync(body: API.BurnAbpPdmProjectManagementProjectIssuesStartProcessingIssueDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-issue/start-processing', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
