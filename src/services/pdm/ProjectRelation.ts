// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-relation */
export async function ProjectRelationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>('/api/pdm/project-relation', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-relation */
export async function ProjectRelationCreateAsync(body: API.BurnAbpPdmProjectManagementProjectRelationsCreateProjectRelationDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>('/api/pdm/project-relation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-relation/${param0} */
export async function ProjectRelationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>(`/api/pdm/project-relation/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-relation/${param0}/delete */
export async function ProjectRelationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-relation/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-relation/${param0}/update */
export async function ProjectRelationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectRelationsUpdateProjectRelationDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>(`/api/pdm/project-relation/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-relation/by-project-code */
export async function ProjectRelationGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>('/api/pdm/project-relation/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-relation/by-project-code-and-type */
export async function ProjectRelationGetListByProjectCodeAndTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationGetListByProjectCodeAndTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>('/api/pdm/project-relation/by-project-code-and-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-relation/by-relation-type */
export async function ProjectRelationGetListByRelationTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationGetListByRelationTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>('/api/pdm/project-relation/by-relation-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-relation/by-target-code */
export async function ProjectRelationGetListByTargetCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectRelationGetListByTargetCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectRelationsProjectRelationDto>('/api/pdm/project-relation/by-target-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
