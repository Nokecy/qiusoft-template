// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/app/organization-unit */
export async function OrganizationUnitGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpIdentityProOrganizationUnitDto>('/api/app/organization-unit', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/app/organization-unit */
export async function OrganizationUnitCreateAsync(body: API.BurnAbpIdentityProOrganizationUnitDto, options?: { [key: string]: any }) {
	return request<any>('/api/app/organization-unit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/app/organization-unit/${param0} */
export async function OrganizationUnitGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpIdentityProOrganizationUnitDto>(`/api/app/organization-unit/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/app/organization-unit/${param0}/delete */
export async function OrganizationUnitDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/app/organization-unit/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/app/organization-unit/children-list-by-id */
export async function OrganizationUnitGetChildrenListByIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitGetChildrenListByIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpIdentityProOrganizationUnitDto>('/api/app/organization-unit/children-list-by-id', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/app/organization-unit/remove-user-from-organization-unit */
export async function OrganizationUnitRemoveUserFromOrganizationUnit(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitRemoveUserFromOrganizationUnitParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/app/organization-unit/remove-user-from-organization-unit', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/app/organization-unit/tree-list */
export async function OrganizationUnitGetTreeListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitGetTreeListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpIdentityProOrganizationUnitTreeDto>('/api/app/organization-unit/tree-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/app/organization-unit/update */
export async function OrganizationUnitUpdateAsync(body: API.BurnAbpIdentityProOrganizationUnitDto, options?: { [key: string]: any }) {
	return request<any>('/api/app/organization-unit/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/app/organization-unit/user-list-by-organization-id/${param0} */
export async function OrganizationUnitGetUserListByOrganizationId(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitGetUserListByOrganizationIdParams,
	options?: { [key: string]: any }
) {
	const { organizationId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>(`/api/app/organization-unit/user-list-by-organization-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/app/organization-unit/user-to-organization-unit */
export async function OrganizationUnitAddUserToOrganizationUnitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationUnitAddUserToOrganizationUnitAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/app/organization-unit/user-to-organization-unit', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/app/organization-unit/users-to-organization-unit */
export async function OrganizationUnitAddUsersToOrganizationUnit(body: API.BurnAbpIdentityProAddUsersToOUInput, options?: { [key: string]: any }) {
	return request<any>('/api/app/organization-unit/users-to-organization-unit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
