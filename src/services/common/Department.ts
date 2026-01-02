// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/department */
export async function DepartmentGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DepartmentGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto>('/api/common/department', {
		method: 'GET',
		params: {
			...params,
			ExtraProperties: undefined,
			...params['ExtraProperties'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/department */
export async function DepartmentCreateAsync(body: API.BurnAbpErpCommonDepartmentManagementDepartmentsCreateDepartmentInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto>('/api/common/department', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/department/${param0} */
export async function DepartmentGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DepartmentGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto>(`/api/common/department/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/department/${param0}/delete */
export async function DepartmentDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DepartmentDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/department/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/department/${param0}/update */
export async function DepartmentUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DepartmentUpdateAsyncParams,
	body: API.BurnAbpErpCommonDepartmentManagementDepartmentsUpdateDepartmentDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto>(`/api/common/department/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取部门 GET /api/common/department/by-code */
export async function DepartmentGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DepartmentGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonDepartmentManagementDepartmentsDepartmentDto>('/api/common/department/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/department/export */
export async function DepartmentExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DepartmentExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/department/export', {
		method: 'GET',
		params: {
			...params,
			ExtraProperties: undefined,
			...params['ExtraProperties'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/department/import */
export async function DepartmentImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/department/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/department/import-template */
export async function DepartmentGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/department/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
