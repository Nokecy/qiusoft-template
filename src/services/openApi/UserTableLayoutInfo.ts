// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/extra-object/user-table-layout-info */
export async function UserTableLayoutInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserTableLayoutInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto>('/api/extra-object/user-table-layout-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/user-table-layout-info */
export async function UserTableLayoutInfoCreateAsync(body: API.BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto>('/api/extra-object/user-table-layout-info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/extra-object/user-table-layout-info/${param0} */
export async function UserTableLayoutInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserTableLayoutInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto>(`/api/extra-object/user-table-layout-info/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/user-table-layout-info/${param0}/delete */
export async function UserTableLayoutInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserTableLayoutInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/extra-object/user-table-layout-info/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/user-table-layout-info/${param0}/update */
export async function UserTableLayoutInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserTableLayoutInfoUpdateAsyncParams,
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto>(`/api/extra-object/user-table-layout-info/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/user-table-layout-info/clear */
export async function UserTableLayoutInfoClearAsync(body: API.BurnAbpExtraObjectManagementApplication_biaogefanganClearUserTableDto, options?: { [key: string]: any }) {
	return request<any>('/api/extra-object/user-table-layout-info/clear', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/extra-object/user-table-layout-info/my-table-layout-list */
export async function UserTableLayoutInfoGetMyTableLayoutListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto>(
		'/api/extra-object/user-table-layout-info/my-table-layout-list',
		{
			method: 'GET',
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/extra-object/user-table-layout-info/save */
export async function UserTableLayoutInfoSaveAsync(body: API.BurnAbpExtraObjectManagementApplication_biaogefanganUserTableLayoutInfoDto, options?: { [key: string]: any }) {
	return request<any>('/api/extra-object/user-table-layout-info/save', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
