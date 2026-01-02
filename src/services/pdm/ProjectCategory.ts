// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/project-category */
export async function ProjectCategoryGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCategoryGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto>('/api/pdm/project-category', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-category */
export async function ProjectCategoryCreateAsync(body: API.BurnAbpPdmProjectManagementProjectCategoriesCreateProjectCategoryDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto>('/api/pdm/project-category', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/project-category/${param0} */
export async function ProjectCategoryGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCategoryGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto>(`/api/pdm/project-category/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-category/${param0}/delete */
export async function ProjectCategoryDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCategoryDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-category/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/project-category/${param0}/update */
export async function ProjectCategoryUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCategoryUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementProjectCategoriesUpdateProjectCategoryDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryDto>(`/api/pdm/project-category/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取项目分类树形结构（支持子级动态查询） 当使用动态查询过滤时，如果子节点匹配条件，则自动包含其所有父节点以保持树结构的完整性。
这样可以确保匹配的节点在树中有完整的路径显示。 GET /api/pdm/project-category/tree */
export async function ProjectCategoryGetTreeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectCategoryGetTreeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectCategoriesProjectCategoryTreeDto[]>('/api/pdm/project-category/tree', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
