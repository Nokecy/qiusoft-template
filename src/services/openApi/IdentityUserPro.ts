// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/identity/pro/users/check-user-password */
export async function IdentityUserProCheckUserAndPassWordAsync(body: API.BurnAbpIdentityProUsersCheckUserPassWordDto, options?: { [key: string]: any }) {
	return request<boolean>('/api/identity/pro/users/check-user-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/pro/users/check-user-permission */
export async function IdentityUserProCheckUserAndPermissionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.IdentityUserProCheckUserAndPermissionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/api/identity/pro/users/check-user-permission', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/pro/users/in-permission */
export async function IdentityUserProGetUsersInPermissionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.IdentityUserProGetUsersInPermissionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>('/api/identity/pro/users/in-permission', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/pro/users/list */
export async function IdentityUserProGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.IdentityUserProGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpIdentityProUsersIdentityUserProDto>('/api/identity/pro/users/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
