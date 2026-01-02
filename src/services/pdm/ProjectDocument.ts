// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-document */
export async function ProjectDocumentGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>('/api/pdm/project-document', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建项目文档 POST /api/pdm/project-document */
export async function ProjectDocumentCreateAsync(body: API.BurnAbpPdmProjectManagementProjectDocumentsCreateProjectDocumentDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>('/api/pdm/project-document', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-document/${param0} */
export async function ProjectDocumentGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>(`/api/pdm/project-document/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-document/${param0}/delete */
export async function ProjectDocumentDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-document/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新项目文档 POST /api/pdm/project-document/${param0}/update */
export async function ProjectDocumentUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectDocumentsUpdateProjectDocumentDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>(`/api/pdm/project-document/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据文件类型获取文档列表 GET /api/pdm/project-document/by-file-type */
export async function ProjectDocumentGetListByFileTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentGetListByFileTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>('/api/pdm/project-document/by-file-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据父文档 ID 获取子文档列表（树形结构） GET /api/pdm/project-document/by-parent-id/${param0} */
export async function ProjectDocumentGetListByParentIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentGetListByParentIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { parentId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>(`/api/pdm/project-document/by-parent-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 根据项目编码获取文档列表 GET /api/pdm/project-document/by-project-code */
export async function ProjectDocumentGetListByProjectCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentGetListByProjectCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectDocumentsProjectDocumentDto>('/api/pdm/project-document/by-project-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
