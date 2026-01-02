// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/list-config/by-key */
export async function ListConfigGetByKeyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ListConfigGetByKeyAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosListConfigDto>('/api/dynamic-schema/list-config/by-key', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/list-config/delete */
export async function ListConfigDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ListConfigDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/dynamic-schema/list-config/delete', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/list-config/generate */
export async function ListConfigGenerateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ListConfigGenerateAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosListConfigDto>('/api/dynamic-schema/list-config/generate', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-schema/list-config/save */
export async function ListConfigSaveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ListConfigSaveAsyncParams,
	body: API.BurnAbpDynamicSchemaDtosSaveListConfigInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaDtosListConfigDto>('/api/dynamic-schema/list-config/save', {
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
