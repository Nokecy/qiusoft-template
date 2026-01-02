// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/unit-group */
export async function UnitGroupGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGroupGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto>('/api/common/unit-group', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit-group */
export async function UnitGroupCreateAsync(body: API.BurnAbpErpCommonUnitManagementUnitGroupsCreateUnitGroupInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto>('/api/common/unit-group', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/unit-group/${param0} */
export async function UnitGroupGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGroupGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto>(`/api/common/unit-group/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit-group/${param0}/delete */
export async function UnitGroupDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGroupDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/unit-group/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit-group/${param0}/update */
export async function UnitGroupUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGroupUpdateAsyncParams,
	body: API.BurnAbpErpCommonUnitManagementUnitGroupsUpdateUnitGroupInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto>(`/api/common/unit-group/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取单位组 GET /api/common/unit-group/by-code */
export async function UnitGroupGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGroupGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonUnitManagementUnitGroupsUnitGroupDto>('/api/common/unit-group/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/unit-group/export */
export async function UnitGroupExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGroupExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/unit-group/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit-group/import */
export async function UnitGroupImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>('/api/common/unit-group/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/unit-group/import-template */
export async function UnitGroupGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/unit-group/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
