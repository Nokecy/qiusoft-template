// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-form */
export async function ProjectFormGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectFormsProjectFormDto>('/api/pdm/project-form', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目表单 POST /api/pdm/project-form */
export async function ProjectFormCreateAsync(body: API.BurnAbpPdmProjectManagementProjectFormsCreateProjectFormDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectFormsProjectFormDto>('/api/pdm/project-form', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-form/${param0} */
export async function ProjectFormGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectFormsProjectFormDto>(`/api/pdm/project-form/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-form/${param0}/delete */
export async function ProjectFormDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-form/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 发布表单 POST /api/pdm/project-form/${param0}/publish */
export async function ProjectFormPublishAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormPublishAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectFormsProjectFormDto>(`/api/pdm/project-form/${param0}/publish`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置表单状态 POST /api/pdm/project-form/${param0}/set-status */
export async function ProjectFormSetStatusAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormSetStatusAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectFormsProjectFormDto>(`/api/pdm/project-form/${param0}/set-status`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 取消发布表单 POST /api/pdm/project-form/${param0}/unpublish */
export async function ProjectFormUnpublishAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormUnpublishAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectFormsProjectFormDto>(`/api/pdm/project-form/${param0}/unpublish`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目表单 POST /api/pdm/project-form/${param0}/update */
export async function ProjectFormUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectFormsUpdateProjectFormDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectFormsProjectFormDto>(`/api/pdm/project-form/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据里程碑ID获取表单列表 GET /api/pdm/project-form/by-milestone-id/${param0} */
export async function ProjectFormGetListByMilestoneIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormGetListByMilestoneIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { milestoneId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectFormsProjectFormDto>(`/api/pdm/project-form/by-milestone-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取表单列表 GET /api/pdm/project-form/by-project-code */
export async function ProjectFormGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectFormsProjectFormDto>('/api/pdm/project-form/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据模板编码获取表单列表 GET /api/pdm/project-form/by-template-code */
export async function ProjectFormGetListByTemplateCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectFormGetListByTemplateCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectFormsProjectFormDto>('/api/pdm/project-form/by-template-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
