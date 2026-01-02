// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/identity/users/${param0} */
export async function UserIntegrationFindByIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserIntegrationFindByIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpUsersUserData>(`/integration-api/identity/users/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /integration-api/identity/users/${param0}/role-names */
export async function UserIntegrationGetRoleNamesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserIntegrationGetRoleNamesAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string[]>(`/integration-api/identity/users/${param0}/role-names`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /integration-api/identity/users/by-username/${param0} */
export async function UserIntegrationFindByUserNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserIntegrationFindByUserNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { userName: param0, ...queryParams } = params;
	return request<API.VoloAbpUsersUserData>(`/integration-api/identity/users/by-username/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /integration-api/identity/users/count */
export async function UserIntegrationGetCountAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserIntegrationGetCountAsyncParams,
	options?: { [key: string]: any }
) {
	return request<number>('/integration-api/identity/users/count', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /integration-api/identity/users/search */
export async function UserIntegrationSearchAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserIntegrationSearchAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoVoloAbpUsersUserData>('/integration-api/identity/users/search', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
