// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/identity/users/lookup/${param0} */
export async function UserLookupFindByIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserLookupFindByIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpUsersUserData>(`/api/identity/users/lookup/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/lookup/by-username/${param0} */
export async function UserLookupFindByUserNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserLookupFindByUserNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { userName: param0, ...queryParams } = params;
	return request<API.VoloAbpUsersUserData>(`/api/identity/users/lookup/by-username/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/lookup/count */
export async function UserLookupGetCountAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserLookupGetCountAsyncParams,
	options?: { [key: string]: any }
) {
	return request<number>('/api/identity/users/lookup/count', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/lookup/search */
export async function UserLookupSearchAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserLookupSearchAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoVoloAbpUsersUserData>('/api/identity/users/lookup/search', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
