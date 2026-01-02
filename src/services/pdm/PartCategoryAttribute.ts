// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建分类属性定义 POST /api/pdm/part-category-attribute */
export async function PartCategoryAttributeCreateAsync(body: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto>('/api/pdm/part-category-attribute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除分类属性定义 POST /api/pdm/part-category-attribute/${param0}/delete */
export async function PartCategoryAttributeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryAttributeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-category-attribute/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新分类属性定义 POST /api/pdm/part-category-attribute/${param0}/update */
export async function PartCategoryAttributeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryAttributeUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto>(`/api/pdm/part-category-attribute/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据分类ID获取属性定义 GET /api/pdm/part-category-attribute/by-category-id/${param0} */
export async function PartCategoryAttributeGetByCategoryIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryAttributeGetByCategoryIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { categoryId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]>(`/api/pdm/part-category-attribute/by-category-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
