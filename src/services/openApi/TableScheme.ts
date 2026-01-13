// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 将用户方案应用到全局 POST /api/extra-object/table-scheme/apply-to-global */
export async function TableSchemeApplyToGlobalAsync(
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesApplyToGlobalRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesApplyToGlobalResultDto>('/api/extra-object/table-scheme/apply-to-global', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除列方案 POST /api/extra-object/table-scheme/delete-column-scheme */
export async function TableSchemeDeleteColumnSchemeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TableSchemeDeleteColumnSchemeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesDeleteSchemeResultDto>('/api/extra-object/table-scheme/delete-column-scheme', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 删除查询方案 POST /api/extra-object/table-scheme/delete-query-scheme */
export async function TableSchemeDeleteQuerySchemeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TableSchemeDeleteQuerySchemeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesDeleteSchemeResultDto>('/api/extra-object/table-scheme/delete-query-scheme', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 重置所有用户配置（管理员操作） POST /api/extra-object/table-scheme/reset-all-users */
export async function TableSchemeResetAllUsersAsync(
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesResetAllUsersRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesResetAllUsersResultDto>('/api/extra-object/table-scheme/reset-all-users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 重置当前用户配置，回退到全局配置 POST /api/extra-object/table-scheme/reset-to-global */
export async function TableSchemeResetToGlobalAsync(
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesResetToGlobalRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesResetToGlobalResultDto>('/api/extra-object/table-scheme/reset-to-global', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 保存或更新列方案 POST /api/extra-object/table-scheme/save-column-scheme */
export async function TableSchemeSaveColumnSchemeAsync(
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveColumnSchemeRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveSchemeResultDto>('/api/extra-object/table-scheme/save-column-scheme', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/table-scheme/save-query-scheme */
export async function TableSchemeSaveQuerySchemeAsync(
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveQuerySchemeRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSaveSchemeResultDto>('/api/extra-object/table-scheme/save-query-scheme', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/extra-object/table-scheme/schemes */
export async function TableSchemeGetAllSchemesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TableSchemeGetAllSchemesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeSyncDataDto>('/api/extra-object/table-scheme/schemes', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/table-scheme/set-current-scheme */
export async function TableSchemeSetCurrentSchemeAsync(
	body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSetCurrentSchemeRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSetCurrentSchemeResultDto>('/api/extra-object/table-scheme/set-current-scheme', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/extra-object/table-scheme/sync-schemes */
export async function TableSchemeSyncSchemesAsync(body: API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeSyncRequestDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpExtraObjectManagementApplication_biaogefanganSchemesSchemeSyncResultDto>('/api/extra-object/table-scheme/sync-schemes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
