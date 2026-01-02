// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取项目列表（包含当前里程碑信息） GET /api/pdm/project */
export async function ProjectGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectsProjectDto>('/api/pdm/project', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目 POST /api/pdm/project */
export async function ProjectCreateAsync(body: API.BurnAbpPdmProjectManagementProjectsCreateProjectDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectsProjectDto>('/api/pdm/project', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取项目（包含所有子项） GET /api/pdm/project/${param0} */
export async function ProjectGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectsProjectDto>(`/api/pdm/project/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 归档项目 POST /api/pdm/project/${param0}/archive */
export async function ProjectArchiveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectArchiveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/archive`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消项目 POST /api/pdm/project/${param0}/cancel */
export async function ProjectCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/cancel`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 完成项目 POST /api/pdm/project/${param0}/complete */
export async function ProjectCompleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCompleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/complete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除项目（级联删除所有子项） POST /api/pdm/project/${param0}/delete */
export async function ProjectDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 暂停项目 POST /api/pdm/project/${param0}/pause */
export async function ProjectPauseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectPauseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/pause`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 添加项目经理 POST /api/pdm/project/${param0}/project-manager/${param1} */
export async function ProjectAddProjectManagerAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectAddProjectManagerAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, userId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/project-manager/${param1}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 发布项目 POST /api/pdm/project/${param0}/publish */
export async function ProjectPublishAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectPublishAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/publish`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 移除项目经理 POST /api/pdm/project/${param0}/remove-project-manager/${param1} */
export async function ProjectRemoveProjectManagerAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRemoveProjectManagerAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, userId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/remove-project-manager/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 恢复项目 POST /api/pdm/project/${param0}/resume */
export async function ProjectResumeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectResumeAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/resume`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 保存为草稿 POST /api/pdm/project/${param0}/save-as-draft */
export async function ProjectSaveAsDraftAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectSaveAsDraftAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/save-as-draft`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 启动项目 POST /api/pdm/project/${param0}/start */
export async function ProjectStartAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectStartAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project/${param0}/start`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目 POST /api/pdm/project/${param0}/update */
export async function ProjectUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectsUpdateProjectDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectsProjectDto>(`/api/pdm/project/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取指定里程碑的详细数据（包含关联的任务、风险、问题） GET /api/pdm/project/milestone-data */
export async function ProjectGetMilestoneDataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectGetMilestoneDataAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectsMilestoneDetailDto>('/api/pdm/project/milestone-data', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
