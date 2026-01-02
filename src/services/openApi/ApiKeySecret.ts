// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/keysecret-authorization/api-key-secret/${param0} */
export async function ApiKeySecretGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ApiKeySecretGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto>(`/api/keysecret-authorization/api-key-secret/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/keysecret-authorization/api-key-secret/create */
export async function ApiKeySecretCreateAsync(body: API.BurnAbpApiKeySecretAuthorizationApiKeysCreateApiKeySecretDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto>('/api/keysecret-authorization/api-key-secret/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/keysecret-authorization/api-key-secret/delete/${param0} */
export async function ApiKeySecretDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ApiKeySecretDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/keysecret-authorization/api-key-secret/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/keysecret-authorization/api-key-secret/list */
export async function ApiKeySecretGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ApiKeySecretGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto>('/api/keysecret-authorization/api-key-secret/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/keysecret-authorization/api-key-secret/update/${param0} */
export async function ApiKeySecretUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ApiKeySecretUpdateAsyncParams,
	body: API.BurnAbpApiKeySecretAuthorizationApiKeysUpdateApiKeySecretDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpApiKeySecretAuthorizationApiKeysApiKeySecretDto>(`/api/keysecret-authorization/api-key-secret/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
