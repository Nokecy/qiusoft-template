// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/pdm/category-import/import */
export async function CategoryImportImportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CategoryImportImportAsyncParams,
	body: {},
	File?: File,
	options?: { [key: string]: any }
) {
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

	return request<API.BurnAbpPdmPartManagementPartCategoriesCategoryImportResultDto>('/api/pdm/category-import/import', {
		method: 'POST',
		params: {
			...params,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/category-import/import-template */
export async function CategoryImportGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/pdm/category-import/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
