// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/permission-management/permissions */
export async function PermissionsGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PermissionsGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpPermissionManagementGetPermissionListResultDto>('/api/permission-management/permissions', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/permission-management/permissions */
export async function PermissionsUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PermissionsUpdateAsyncParams,
	body: API.VoloAbpPermissionManagementUpdatePermissionsDto,
	options?: { [key: string]: any }
) {
	return request<any>('/api/permission-management/permissions', {
		method: 'PUT',
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
