// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-deliverable */
export async function ProjectDeliverableGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>('/api/pdm/project-deliverable', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目成果 POST /api/pdm/project-deliverable */
export async function ProjectDeliverableCreateAsync(body: API.BurnAbpPdmProjectManagementProjectDeliverablesCreateProjectDeliverableDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>('/api/pdm/project-deliverable', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-deliverable/${param0} */
export async function ProjectDeliverableGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>(`/api/pdm/project-deliverable/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批准成果 POST /api/pdm/project-deliverable/${param0}/approve */
export async function ProjectDeliverableApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-deliverable/${param0}/approve`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 归档成果 POST /api/pdm/project-deliverable/${param0}/archive */
export async function ProjectDeliverableArchiveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableArchiveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-deliverable/${param0}/archive`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-deliverable/${param0}/delete */
export async function ProjectDeliverableDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-deliverable/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 拒绝成果 POST /api/pdm/project-deliverable/${param0}/reject */
export async function ProjectDeliverableRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableRejectAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-deliverable/${param0}/reject`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 提交成果审核 POST /api/pdm/project-deliverable/${param0}/submit */
export async function ProjectDeliverableSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-deliverable/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目成果 POST /api/pdm/project-deliverable/${param0}/update */
export async function ProjectDeliverableUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectDeliverablesUpdateProjectDeliverableDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>(`/api/pdm/project-deliverable/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据成果编码获取成果 GET /api/pdm/project-deliverable/by-deliverable-code */
export async function ProjectDeliverableGetByDeliverableCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableGetByDeliverableCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>('/api/pdm/project-deliverable/by-deliverable-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取成果列表 GET /api/pdm/project-deliverable/by-project-code */
export async function ProjectDeliverableGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>('/api/pdm/project-deliverable/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据状态获取成果列表 GET /api/pdm/project-deliverable/by-status */
export async function ProjectDeliverableGetListByStatusAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDeliverableGetListByStatusAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDeliverablesProjectDeliverableDto>('/api/pdm/project-deliverable/by-status', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
