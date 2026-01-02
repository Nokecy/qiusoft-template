// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取里程碑列表（包含任务统计信息） GET /api/pdm/project-milestone */
export async function ProjectMilestoneGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>('/api/pdm/project-milestone', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目里程碑 POST /api/pdm/project-milestone */
export async function ProjectMilestoneCreateAsync(body: API.BurnAbpPdmProjectManagementProjectMilestonesCreateProjectMilestoneDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>('/api/pdm/project-milestone', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取里程碑详情（包含任务统计信息） GET /api/pdm/project-milestone/${param0} */
export async function ProjectMilestoneGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>(`/api/pdm/project-milestone/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批准里程碑 POST /api/pdm/project-milestone/${param0}/approve */
export async function ProjectMilestoneApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/approve`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 取消里程碑 POST /api/pdm/project-milestone/${param0}/cancel */
export async function ProjectMilestoneCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/cancel`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 完成里程碑
逻辑：
1. 【新增】验证表单数据是否已提交（如果里程碑配置了表单）
2. 检查当前里程碑是否需要审批流
3. 如果需要审批：启动审批流程（完成将由审批回调触发）
4. 如果不需要审批：直接完成当前里程碑，开启下一个里程碑
5. 如果没有下一个里程碑：将项目状态改为完成 POST /api/pdm/project-milestone/${param0}/complete */
export async function ProjectMilestoneCompleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneCompleteAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectMilestonesCompleteProjectMilestoneApprovalDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/complete`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-milestone/${param0}/delete */
export async function ProjectMilestoneDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/project-milestone/${param0}/execute-workflow */
export async function ProjectMilestoneExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectMilestonesExecuteProjectMilestoneWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>(`/api/pdm/project-milestone/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 拒绝里程碑 POST /api/pdm/project-milestone/${param0}/reject */
export async function ProjectMilestoneRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneRejectAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/reject`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 开始里程碑 POST /api/pdm/project-milestone/${param0}/start */
export async function ProjectMilestoneStartAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneStartAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/start`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交里程碑审批 POST /api/pdm/project-milestone/${param0}/submit */
export async function ProjectMilestoneSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneSubmitAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectMilestonesCompleteProjectMilestoneApprovalDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-milestone/${param0}/submit`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新项目里程碑 POST /api/pdm/project-milestone/${param0}/update */
export async function ProjectMilestoneUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectMilestonesUpdateProjectMilestoneDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>(`/api/pdm/project-milestone/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取项目任务分解（里程碑-任务树形结构） GET /api/pdm/project-milestone/breakdown-by-project */
export async function ProjectMilestoneGetBreakdownByProjectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneGetBreakdownByProjectAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesTaskBreakdownDto>('/api/pdm/project-milestone/breakdown-by-project', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取里程碑列表 GET /api/pdm/project-milestone/by-project-code */
export async function ProjectMilestoneGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>('/api/pdm/project-milestone/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据状态获取里程碑列表 GET /api/pdm/project-milestone/by-status */
export async function ProjectMilestoneGetListByStatusAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneGetListByStatusAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>('/api/pdm/project-milestone/by-status', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 清除里程碑表单数据 POST /api/pdm/project-milestone/clear-form-data/${param0} */
export async function ProjectMilestoneClearFormDataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneClearFormDataAsyncParams,
	options?: { [key: string]: any }
) {
	const { milestoneId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>(`/api/pdm/project-milestone/clear-form-data/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 添加里程碑依赖关系 POST /api/pdm/project-milestone/dependency */
export async function ProjectMilestoneAddDependencyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneAddDependencyAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/project-milestone/dependency', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取里程碑的表单数据（用于回显） GET /api/pdm/project-milestone/form-data/${param0} */
export async function ProjectMilestoneGetFormDataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectMilestoneGetFormDataAsyncParams,
	options?: { [key: string]: any }
) {
	const { milestoneId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesMilestoneFormDataDto>(`/api/pdm/project-milestone/form-data/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交里程碑表单数据 POST /api/pdm/project-milestone/submit-form-data */
export async function ProjectMilestoneSubmitFormDataAsync(body: API.BurnAbpPdmProjectManagementProjectMilestonesSubmitMilestoneFormDataDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectMilestonesProjectMilestoneDto>('/api/pdm/project-milestone/submit-form-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
