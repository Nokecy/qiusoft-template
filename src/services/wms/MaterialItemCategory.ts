// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建物料分类 POST /api/wms/material-category/create */
export async function MaterialItemCategoryCreateAsync(body: API.BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto>('/api/wms/material-category/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除物料分类 POST /api/wms/material-category/delete/${param0} */
export async function MaterialItemCategoryDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemCategoryDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/material-category/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/material-category/get/${param0} */
export async function MaterialItemCategoryGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemCategoryGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto>(`/api/wms/material-category/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/material-category/import */
export async function MaterialItemCategoryImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>('/api/wms/material-category/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/material-category/list */
export async function MaterialItemCategoryGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemCategoryGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto>('/api/wms/material-category/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/material-category/update/${param0} */
export async function MaterialItemCategoryUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemCategoryUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaofenleiMaterialItemCategoryDto>(`/api/wms/material-category/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
