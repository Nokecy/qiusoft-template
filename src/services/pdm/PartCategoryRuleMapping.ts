// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/part-category-rule-mapping */
export async function PartCategoryRuleMappingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryRuleMappingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto>('/api/pdm/part-category-rule-mapping', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-category-rule-mapping */
export async function PartCategoryRuleMappingCreateAsync(
	body: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingCreateUpdateDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto>('/api/pdm/part-category-rule-mapping', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/part-category-rule-mapping/${param0} */
export async function PartCategoryRuleMappingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryRuleMappingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto>(`/api/pdm/part-category-rule-mapping/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-category-rule-mapping/${param0}/delete */
export async function PartCategoryRuleMappingDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryRuleMappingDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-category-rule-mapping/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-category-rule-mapping/${param0}/update */
export async function PartCategoryRuleMappingUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCategoryRuleMappingUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingCreateUpdateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryRuleMappingDto>(`/api/pdm/part-category-rule-mapping/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
