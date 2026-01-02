// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/add-user-to-organization */
export async function OrganizationInfoAddUserToOrganizationAsync(body: API.BurnAbpFactoryManagementOrganizationsAddUserToOrganizationDto, options?: { [key: string]: any }) {
	return request<any>('/api/factory-management/organizationInfo/add-user-to-organization', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/add-users-to-organization */
export async function OrganizationInfoAddUsersToOrganizationAsync(body: API.BurnAbpFactoryManagementOrganizationsAddUsersToOrganizationDto, options?: { [key: string]: any }) {
	return request<any>('/api/factory-management/organizationInfo/add-users-to-organization', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/factory-management/organizationInfo/by-username/${param0} */
export async function OrganizationInfoGetOrganizationsByUserNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationInfoGetOrganizationsByUserNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { userName: param0, ...queryParams } = params;
	return request<API.BurnAbpFactoryManagementOrganizationsUserOrganizationDto[]>(`/api/factory-management/organizationInfo/by-username/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/create */
export async function OrganizationInfoCreateAsync(body: API.BurnAbpFactoryManagementOrganizationsOrganizationInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpFactoryManagementOrganizationsOrganizationInfoDto>('/api/factory-management/organizationInfo/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/factory-management/organizationInfo/current-user-organizations */
export async function OrganizationInfoGetCurrentUserOrganizationsAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpFactoryManagementOrganizationsOrganizationInfoDto[]>('/api/factory-management/organizationInfo/current-user-organizations', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/delete/${param0} */
export async function OrganizationInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/factory-management/organizationInfo/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/get-organization-user */
export async function OrganizationInfoGetUsersInOrganizationAsync(body: API.BurnAbpFactoryManagementOrganizationsGetOrganizationUserInput, options?: { [key: string]: any }) {
	return request<API.VoloAbpIdentityIdentityUserDto[]>('/api/factory-management/organizationInfo/get-organization-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/factory-management/organizationInfo/id */
export async function OrganizationInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpFactoryManagementOrganizationsOrganizationInfoDto>('/api/factory-management/organizationInfo/id', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/factory-management/organizationInfo/list */
export async function OrganizationInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpFactoryManagementOrganizationsOrganizationInfoDto>('/api/factory-management/organizationInfo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/remove-organization-user */
export async function OrganizationInfoRemoveUserFromOrganizationAsync(body: API.BurnAbpFactoryManagementOrganizationsRemoveFromOrganizationDto, options?: { [key: string]: any }) {
	return request<any>('/api/factory-management/organizationInfo/remove-organization-user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/factory-management/organizationInfo/update/${param0} */
export async function OrganizationInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OrganizationInfoUpdateAsyncParams,
	body: API.BurnAbpFactoryManagementOrganizationsOrganizationInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpFactoryManagementOrganizationsOrganizationInfoDto>(`/api/factory-management/organizationInfo/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
