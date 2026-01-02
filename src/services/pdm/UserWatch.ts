// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/user-watch */
export async function UserWatchGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementUserWatchesUserWatchDto>('/api/pdm/user-watch', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建用户关注 POST /api/pdm/user-watch */
export async function UserWatchCreateAsync(body: API.BurnAbpPdmProjectManagementUserWatchesCreateUserWatchDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementUserWatchesUserWatchDto>('/api/pdm/user-watch', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/user-watch/${param0} */
export async function UserWatchGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementUserWatchesUserWatchDto>(`/api/pdm/user-watch/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/user-watch/${param0}/delete */
export async function UserWatchDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/user-watch/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新用户关注 POST /api/pdm/user-watch/${param0}/update */
export async function UserWatchUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementUserWatchesUpdateUserWatchDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementUserWatchesUserWatchDto>(`/api/pdm/user-watch/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据目标对象编码获取关注该对象的用户列表 GET /api/pdm/user-watch/by-target-code */
export async function UserWatchGetListByTargetCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchGetListByTargetCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementUserWatchesUserWatchDto>('/api/pdm/user-watch/by-target-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据关注目标类型获取关注列表 GET /api/pdm/user-watch/by-target-type */
export async function UserWatchGetListByTargetTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchGetListByTargetTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementUserWatchesUserWatchDto>('/api/pdm/user-watch/by-target-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据用户编码获取关注列表 GET /api/pdm/user-watch/by-user-code */
export async function UserWatchGetListByUserCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchGetListByUserCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementUserWatchesUserWatchDto>('/api/pdm/user-watch/by-user-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据用户编码和目标类型获取关注列表 GET /api/pdm/user-watch/by-user-code-and-type */
export async function UserWatchGetListByUserCodeAndTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchGetListByUserCodeAndTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementUserWatchesUserWatchDto>('/api/pdm/user-watch/by-user-code-and-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 检查用户是否关注指定对象 POST /api/pdm/user-watch/is-watching */
export async function UserWatchIsWatchingAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchIsWatchingAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/api/pdm/user-watch/is-watching', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/user-watch/toggle-watch */
export async function UserWatchToggleWatchAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchToggleWatchAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/api/pdm/user-watch/toggle-watch', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/user-watch/unwatch */
export async function UserWatchUnwatchAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchUnwatchAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/api/pdm/user-watch/unwatch', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/user-watch/watch */
export async function UserWatchWatchAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserWatchWatchAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/api/pdm/user-watch/watch', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
