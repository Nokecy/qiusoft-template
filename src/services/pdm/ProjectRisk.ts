// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-risk */
export async function ProjectRiskGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目风险 POST /api/pdm/project-risk */
export async function ProjectRiskCreateAsync(body: API.BurnAbpPdmProjectManagementProjectRisksCreateProjectRiskDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-risk/${param0} */
export async function ProjectRiskGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectRisksProjectRiskDto>(`/api/pdm/project-risk/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消风险 - 风险误报/重复创建 POST /api/pdm/project-risk/${param0}/cancel */
export async function ProjectRiskCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-risk/${param0}/cancel`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 关闭风险 - 风险已不再适用（如项目范围变更） POST /api/pdm/project-risk/${param0}/close */
export async function ProjectRiskCloseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskCloseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-risk/${param0}/close`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-risk/${param0}/delete */
export async function ProjectRiskDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-risk/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 重新打开风险 POST /api/pdm/project-risk/${param0}/reopen */
export async function ProjectRiskReopenAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskReopenAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-risk/${param0}/reopen`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 解决风险 POST /api/pdm/project-risk/${param0}/resolve */
export async function ProjectRiskResolveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskResolveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-risk/${param0}/resolve`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目风险 POST /api/pdm/project-risk/${param0}/update */
export async function ProjectRiskUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectRisksUpdateProjectRiskDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectRisksProjectRiskDto>(`/api/pdm/project-risk/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 审批通过风险解决方案 POST /api/pdm/project-risk/approve-resolution */
export async function ProjectRiskApproveResolutionAsync(body: API.BurnAbpPdmProjectManagementProjectRisksApproveRiskResolutionDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-risk/approve-resolution', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据风险编码获取风险 GET /api/pdm/project-risk/by-code */
export async function ProjectRiskGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据里程碑 ID 获取风险列表 GET /api/pdm/project-risk/by-milestone-id/${param0} */
export async function ProjectRiskGetListByMilestoneIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetListByMilestoneIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { milestoneId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>(`/api/pdm/project-risk/by-milestone-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取风险列表 GET /api/pdm/project-risk/by-project-code */
export async function ProjectRiskGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据状态获取风险列表 GET /api/pdm/project-risk/by-status */
export async function ProjectRiskGetListByStatusAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetListByStatusAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk/by-status', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据任务 ID 获取风险列表 GET /api/pdm/project-risk/by-task-id/${param0} */
export async function ProjectRiskGetListByTaskIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetListByTaskIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>(`/api/pdm/project-risk/by-task-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 获取我负责/我处理的风险列表（工作区语义） GET /api/pdm/project-risk/my-risks */
export async function ProjectRiskGetMyRisksAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetMyRisksAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk/my-risks', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取我关注的风险列表 GET /api/pdm/project-risk/my-watched-list */
export async function ProjectRiskGetMyWatchedListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRiskGetMyWatchedListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRisksProjectRiskDto>('/api/pdm/project-risk/my-watched-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 拒绝风险解决方案 POST /api/pdm/project-risk/reject-resolution */
export async function ProjectRiskRejectResolutionAsync(body: API.BurnAbpPdmProjectManagementProjectRisksRejectRiskResolutionDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/project-risk/reject-resolution', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
