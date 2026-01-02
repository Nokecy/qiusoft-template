// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-import-export/export */
export async function DynamicDataImportExportExportAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataImportExportExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaImportExportExportResultDto>('/api/dynamic-schema/dynamic-data-import-export/export', {
		method: 'GET',
		params: {
			...params,
			'Query.Filters': undefined,
			...params['Query.Filters'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/dynamic-data-import-export/import */
export async function DynamicDataImportExportImportAsync_2(body: API.BurnAbpDynamicSchemaImportExportImportDataInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaImportExportImportResultDto>('/api/dynamic-schema/dynamic-data-import-export/import', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-data-import-export/template/${param0} */
export async function DynamicDataImportExportGetTemplateAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataImportExportGetTemplateAsyncParams,
	options?: { [key: string]: any }
) {
	const { entityDefinitionId: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicSchemaImportExportTemplateResultDto>(`/api/dynamic-schema/dynamic-data-import-export/template/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出数据为 Excel POST /api/dynamic-schema/import-export/export */
export async function DynamicDataImportExportExportAsync(body: API.BurnAbpDynamicSchemaImportExportExportDataInput, options?: { [key: string]: any }) {
	return request<any>('/api/dynamic-schema/import-export/export', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 导入 Excel 数据 POST /api/dynamic-schema/import-export/import */
export async function DynamicDataImportExportImportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataImportExportImportAsyncParams,
	body: {},
	file?: File,
	options?: { [key: string]: any }
) {
	const formData = new FormData();

	if (file) {
		formData.append('file', file);
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

	return request<API.BurnAbpDynamicSchemaImportExportImportResultDto>('/api/dynamic-schema/import-export/import', {
		method: 'POST',
		params: {
			...params,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 获取导入模板 GET /api/dynamic-schema/import-export/template/${param0} */
export async function DynamicDataImportExportGetTemplateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicDataImportExportGetTemplateAsyncParams,
	options?: { [key: string]: any }
) {
	const { entityDefinitionId: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-schema/import-export/template/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
