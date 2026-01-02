// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/language-manager/languageText */
export async function LanguageTextGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageTextGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLanguageManagementDtoLanguageTextDto>('/api/language-manager/languageText', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/languageText/export */
export async function LanguageTextExportAsync(body: API.BurnAbpLanguageManagementDtoGetLanguagesTextsInput, options?: { [key: string]: any }) {
	return request<string>('/api/language-manager/languageText/export', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/languageText/import */
export async function LanguageTextImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/language-manager/languageText/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/language-manager/languageText/import/template */
export async function LanguageTextGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/language-manager/languageText/import/template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/language-manager/languageText/list */
export async function LanguageTextGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageTextGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLanguageManagementDtoLanguageTextDto>('/api/language-manager/languageText/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/language-manager/languageText/restoreToDefault */
export async function LanguageTextRestoreToDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageTextRestoreToDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/language-manager/languageText/restoreToDefault', {
		method: 'PUT',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/languageText/update */
export async function LanguageTextUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageTextUpdateAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/language-manager/languageText/update', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
