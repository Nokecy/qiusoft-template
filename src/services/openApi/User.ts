// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/identity/users */
export async function UserGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>('/api/identity/users', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/identity/users */
export async function UserCreateAsync(body: API.VoloAbpIdentityIdentityUserCreateDto, options?: { [key: string]: any }) {
	return request<API.VoloAbpIdentityIdentityUserDto>('/api/identity/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/${param0} */
export async function UserGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpIdentityIdentityUserDto>(`/api/identity/users/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/identity/users/${param0} */
export async function UserUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserUpdateAsyncParams,
	body: API.VoloAbpIdentityIdentityUserUpdateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpIdentityIdentityUserDto>(`/api/identity/users/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/identity/users/${param0} */
export async function UserDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/identity/users/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/${param0}/roles */
export async function UserGetRolesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserGetRolesAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoVoloAbpIdentityIdentityRoleDto>(`/api/identity/users/${param0}/roles`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/identity/users/${param0}/roles */
export async function UserUpdateRolesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserUpdateRolesAsyncParams,
	body: API.VoloAbpIdentityIdentityUserUpdateRolesDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/identity/users/${param0}/roles`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/identity/users/add-users-to-role */
export async function UserAddUsersToRoleAsync(body: API.BurnAbpIdentityProHttpApiModelsAddRoleInput, options?: { [key: string]: any }) {
	return request<any>('/api/identity/users/add-users-to-role', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/assignable-roles */
export async function UserGetAssignableRolesAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoVoloAbpIdentityIdentityRoleDto>('/api/identity/users/assignable-roles', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/by-email/${param0} */
export async function UserFindByEmailAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserFindByEmailAsyncParams,
	options?: { [key: string]: any }
) {
	const { email: param0, ...queryParams } = params;
	return request<API.VoloAbpIdentityIdentityUserDto>(`/api/identity/users/by-email/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/identity/users/by-username/${param0} */
export async function UserFindByUsernameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserFindByUsernameAsyncParams,
	options?: { [key: string]: any }
) {
	const { userName: param0, ...queryParams } = params;
	return request<API.VoloAbpIdentityIdentityUserDto>(`/api/identity/users/by-username/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建客户子账户 GET /api/identity/users/customer-user-create */
export async function UserCreateCustomerUserAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserCreateCustomerUserAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpIdentityIdentityUserDto>('/api/identity/users/customer-user-create', {
		method: 'GET',
		params: {
			...params,
			ExtraProperties: undefined,
			...params['ExtraProperties'],
		},
		...(options || {}),
	});
}

/** 获取客户子账户列表 GET /api/identity/users/list-with-customer */
export async function UserGetCustomerUserListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserGetCustomerUserListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>('/api/identity/users/list-with-customer', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取角色对应的用户列表 GET /api/identity/users/list-with-role */
export async function UserGetListWithRoleAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserGetListWithRoleAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>('/api/identity/users/list-with-role', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取供应商用户列表 GET /api/identity/users/list-with-supplier */
export async function UserGetSupplierUserListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserGetSupplierUserListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoVoloAbpIdentityIdentityUserDto>('/api/identity/users/list-with-supplier', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建供应商子账户 GET /api/identity/users/supplier-user-create */
export async function UserCreateSupplierUserAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserCreateSupplierUserAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpIdentityIdentityUserDto>('/api/identity/users/supplier-user-create', {
		method: 'GET',
		params: {
			...params,
			ExtraProperties: undefined,
			...params['ExtraProperties'],
		},
		...(options || {}),
	});
}
