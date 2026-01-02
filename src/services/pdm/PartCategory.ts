// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/part-category */
export async function PartCategoryGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto>('/api/pdm/part-category', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建物料分类（根节点或子节点），并自动维护叶子标记。 POST /api/pdm/part-category */
export async function PartCategoryCreateAsync(body: API.BurnAbpPdmPartManagementPartCategoriesDtosCreatePartCategoryDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto>('/api/pdm/part-category', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/part-category/${param0} */
export async function PartCategoryGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto>(`/api/pdm/part-category/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-category/${param0}/delete */
export async function PartCategoryDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-category/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-category/${param0}/update */
export async function PartCategoryUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementPartCategoriesDtosCreatePartCategoryDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto>(`/api/pdm/part-category/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取指定父节点的直接子分类。 GET /api/pdm/part-category/children/${param0} */
export async function PartCategoryGetChildrenAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryGetChildrenAsyncParams,
	options?: { [key: string]: any }
) {
	const { parentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]>(`/api/pdm/part-category/children/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取完整分类树，按路径排序。 GET /api/pdm/part-category/tree */
export async function PartCategoryGetTreeAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]>('/api/pdm/part-category/tree', {
		method: 'GET',
		...(options || {}),
	});
}
