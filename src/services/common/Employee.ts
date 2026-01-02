// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/employee */
export async function EmployeeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto>('/api/common/employee', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/employee */
export async function EmployeeCreateAsync(body: API.BurnAbpErpCommonDepartmentManagementEmployeesCreateEmployeeInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto>('/api/common/employee', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/employee/${param0} */
export async function EmployeeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto>(`/api/common/employee/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/employee/${param0}/delete */
export async function EmployeeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/employee/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/employee/${param0}/update */
export async function EmployeeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeUpdateAsyncParams,
	body: API.BurnAbpErpCommonDepartmentManagementEmployeesUpdateEmployeeInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementEmployeesEmployeeDto>(`/api/common/employee/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/employee/export */
export async function EmployeeExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EmployeeExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/employee/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/employee/import */
export async function EmployeeImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/employee/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/employee/import-template */
export async function EmployeeGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/employee/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
