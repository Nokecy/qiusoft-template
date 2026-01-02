// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/language-manager/language */
export async function LanguageGetAllListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpLanguageManagementDtoLanguageDto>('/api/language-manager/language', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/language */
export async function LanguageCreateAsync(body: API.BurnAbpLanguageManagementDtoCreateLanguageDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpLanguageManagementDtoLanguageDto>('/api/language-manager/language', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/language-manager/language/${param0} */
export async function LanguageGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLanguageManagementDtoLanguageDto>(`/api/language-manager/language/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/language/${param0} */
export async function LanguageUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageUpdateAsyncParams,
	body: API.BurnAbpLanguageManagementDtoUpdateLanguageDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLanguageManagementDtoLanguageDto>(`/api/language-manager/language/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/language/${param0}/setAsDefault */
export async function LanguageSetAsDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageSetAsDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/language-manager/language/${param0}/setAsDefault`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/language-manager/language/cultureList */
export async function LanguageGetCulturelistAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpLanguageManagementDtoCultureInfoDto[]>('/api/language-manager/language/cultureList', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/language-manager/language/delete/${param0} */
export async function LanguageDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LanguageDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/language-manager/language/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/language-manager/language/resources */
export async function LanguageGetResourcesAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpLanguageManagementDtoLanguageResourceDto[]>('/api/language-manager/language/resources', {
		method: 'GET',
		...(options || {}),
	});
}
