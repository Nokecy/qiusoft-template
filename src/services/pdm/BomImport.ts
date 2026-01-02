// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 导入 BOM Excel 文件 POST /api/pdm/bom-import/import */
export async function BomImportImportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomImportImportAsyncParams,
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

	return request<API.BurnAbpPdmBomManagementBomsBomImportResultDto>('/api/pdm/bom-import/import', {
		method: 'POST',
		params: {
			...params,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 获取导入模板 GET /api/pdm/bom-import/import-template */
export async function BomImportGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/pdm/bom-import/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
