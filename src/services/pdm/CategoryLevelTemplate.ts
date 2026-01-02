// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取模板列表 GET /api/pdm/category-level-template */
export async function CategoryLevelTemplateGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto>('/api/pdm/category-level-template', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建模板 POST /api/pdm/category-level-template */
export async function CategoryLevelTemplateCreateAsync(body: API.BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelTemplateDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto>('/api/pdm/category-level-template', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取模板详情（包含层级和候选项） GET /api/pdm/category-level-template/${param0} */
export async function CategoryLevelTemplateGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto>(`/api/pdm/category-level-template/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除模板 POST /api/pdm/category-level-template/${param0}/delete */
export async function CategoryLevelTemplateDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/category-level-template/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新模板 POST /api/pdm/category-level-template/${param0}/update */
export async function CategoryLevelTemplateUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementCategoryTemplatesDtosUpdateCategoryLevelTemplateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto>(`/api/pdm/category-level-template/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除候选项 POST /api/pdm/category-level-template/delete-item */
export async function CategoryLevelTemplateDeleteItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateDeleteItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/category-level-template/delete-item', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 删除层级 POST /api/pdm/category-level-template/delete-level */
export async function CategoryLevelTemplateDeleteLevelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateDeleteLevelAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/category-level-template/delete-level', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 执行批量生成 POST /api/pdm/category-level-template/execute-generation/${param0} */
export async function CategoryLevelTemplateExecuteGenerationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateExecuteGenerationAsyncParams,
	options?: { [key: string]: any }
) {
	const { templateId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationResultDto>(`/api/pdm/category-level-template/execute-generation/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 添加候选项 POST /api/pdm/category-level-template/item */
export async function CategoryLevelTemplateAddItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateAddItemAsyncParams,
	body: API.BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelItemDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelItemDto>('/api/pdm/category-level-template/item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 添加层级 POST /api/pdm/category-level-template/level/${param0} */
export async function CategoryLevelTemplateAddLevelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateAddLevelAsyncParams,
	body: API.BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelDto,
	options?: { [key: string]: any }
) {
	const { templateId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelDto>(`/api/pdm/category-level-template/level/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 预览生成结果 POST /api/pdm/category-level-template/preview-generation/${param0} */
export async function CategoryLevelTemplatePreviewGenerationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplatePreviewGenerationAsyncParams,
	options?: { [key: string]: any }
) {
	const { templateId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationPreviewDto>(`/api/pdm/category-level-template/preview-generation/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新候选项 POST /api/pdm/category-level-template/update-item */
export async function CategoryLevelTemplateUpdateItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateUpdateItemAsyncParams,
	body: API.BurnAbpPdmPartManagementCategoryTemplatesDtosUpdateCategoryLevelItemDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelItemDto>('/api/pdm/category-level-template/update-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 更新层级 POST /api/pdm/category-level-template/update-level */
export async function CategoryLevelTemplateUpdateLevelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryLevelTemplateUpdateLevelAsyncParams,
	body: API.BurnAbpPdmPartManagementCategoryTemplatesDtosCreateCategoryLevelDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelDto>('/api/pdm/category-level-template/update-level', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}
