// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-change */
export async function ProjectChangeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectChangesProjectChangeDto>('/api/pdm/project-change', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目变更 POST /api/pdm/project-change */
export async function ProjectChangeCreateAsync(body: API.BurnAbpPdmProjectManagementProjectChangesCreateProjectChangeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectChangesProjectChangeDto>('/api/pdm/project-change', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-change/${param0} */
export async function ProjectChangeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectChangesProjectChangeDto>(`/api/pdm/project-change/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批准变更 POST /api/pdm/project-change/${param0}/approve */
export async function ProjectChangeApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/approve`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 取消变更 POST /api/pdm/project-change/${param0}/cancel */
export async function ProjectChangeCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/cancel`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 检查实体是否存在 POST /api/pdm/project-change/${param0}/check-entity-exists */
export async function ProjectChangeCheckEntityExistsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeCheckEntityExistsAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<boolean>(`/api/pdm/project-change/${param0}/check-entity-exists`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 完成变更 POST /api/pdm/project-change/${param0}/complete */
export async function ProjectChangeCompleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeCompleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/complete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-change/${param0}/delete */
export async function ProjectChangeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 诊断工作流问题 POST /api/pdm/project-change/${param0}/diagnose-workflow */
export async function ProjectChangeDiagnoseWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeDiagnoseWorkflowAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/pdm/project-change/${param0}/diagnose-workflow`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/project-change/${param0}/execute-workflow */
export async function ProjectChangeExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectChangesExecuteProjectChangeWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectChangesProjectChangeDto>(`/api/pdm/project-change/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 拒绝变更 POST /api/pdm/project-change/${param0}/reject */
export async function ProjectChangeRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeRejectAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/reject`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 开始实施变更 POST /api/pdm/project-change/${param0}/start-implementation */
export async function ProjectChangeStartImplementationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeStartImplementationAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/start-implementation`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交变更审批 POST /api/pdm/project-change/${param0}/submit */
export async function ProjectChangeSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-change/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目变更 POST /api/pdm/project-change/${param0}/update */
export async function ProjectChangeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectChangesUpdateProjectChangeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectChangesProjectChangeDto>(`/api/pdm/project-change/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据变更编码获取变更 GET /api/pdm/project-change/by-code */
export async function ProjectChangeGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectChangesProjectChangeDto>('/api/pdm/project-change/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取变更列表 GET /api/pdm/project-change/by-project-code */
export async function ProjectChangeGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectChangesProjectChangeDto>('/api/pdm/project-change/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据状态获取变更列表 GET /api/pdm/project-change/by-status */
export async function ProjectChangeGetListByStatusAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectChangeGetListByStatusAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectChangesProjectChangeDto>('/api/pdm/project-change/by-status', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 诊断工作流配置（检查工作流定义是否存在和激活） POST /api/pdm/project-change/diagnose-workflow-configuration */
export async function ProjectChangeDiagnoseWorkflowConfigurationAsync(options?: { [key: string]: any }) {
	return request<string>('/api/pdm/project-change/diagnose-workflow-configuration', {
		method: 'POST',
		...(options || {}),
	});
}
