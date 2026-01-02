// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/app/identity-user/users-in-permission */
export async function IdentityUserIntegrationGetUsersInPermissionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.IdentityUserIntegrationGetUsersInPermissionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>('/integration-api/app/identity-user/users-in-permission', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
