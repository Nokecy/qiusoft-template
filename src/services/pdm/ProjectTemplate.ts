// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-template */
export async function ProjectTemplateGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTemplateGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto>('/api/pdm/project-template', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目模板（包含角色、里程碑、文档、任务） POST /api/pdm/project-template */
export async function ProjectTemplateCreateAsync(body: API.BurnAbpPdmProjectManagementProjectTemplatesCreateProjectTemplateDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto>('/api/pdm/project-template', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取项目模板（包含角色、里程碑、文档、任务、表单） GET /api/pdm/project-template/${param0} */
export async function ProjectTemplateGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTemplateGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto>(`/api/pdm/project-template/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 激活项目模板 POST /api/pdm/project-template/${param0}/activate */
export async function ProjectTemplateActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTemplateActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-template/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 停用项目模板 POST /api/pdm/project-template/${param0}/deactivate */
export async function ProjectTemplateDeactivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTemplateDeactivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-template/${param0}/deactivate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除项目模板 POST /api/pdm/project-template/${param0}/delete */
export async function ProjectTemplateDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTemplateDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-template/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目模板（包含角色、里程碑、文档、任务） POST /api/pdm/project-template/${param0}/update */
export async function ProjectTemplateUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectTemplateUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectTemplatesUpdateProjectTemplateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto>(`/api/pdm/project-template/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
