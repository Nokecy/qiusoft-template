// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/label-category */
export async function LabelCategoryGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelCategoryGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelCategoriesLabelCategoryDto>('/api/label-management/label-category', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-category */
export async function LabelCategoryCreateAsync(body: API.BurnAbpLabelManagementLabelCategoriesCreateLabelCategoryInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelCategoriesLabelCategoryDto>('/api/label-management/label-category', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-category/${param0} */
export async function LabelCategoryGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelCategoryGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelCategoriesLabelCategoryDto>(`/api/label-management/label-category/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-category/${param0}/delete */
export async function LabelCategoryDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelCategoryDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/label-management/label-category/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-category/${param0}/update */
export async function LabelCategoryUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelCategoryUpdateAsyncParams,
	body: API.BurnAbpLabelManagementLabelCategoriesUpdateLabelCategoryInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelCategoriesLabelCategoryDto>(`/api/label-management/label-category/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
