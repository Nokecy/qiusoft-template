// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/customer */
export async function CustomerGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonCustomerManagementCustomersCustomerDto>('/api/common/customer', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer */
export async function CustomerCreateAsync(body: API.BurnAbpErpCommonCustomerManagementCustomersCreateCustomerInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonCustomerManagementCustomersCustomerDto>('/api/common/customer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer/${param0} */
export async function CustomerGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonCustomerManagementCustomersCustomerDto>(`/api/common/customer/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer/${param0}/delete */
export async function CustomerDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/customer/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer/${param0}/update */
export async function CustomerUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerUpdateAsyncParams,
	body: API.BurnAbpErpCommonCustomerManagementCustomersUpdateCustomerInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonCustomerManagementCustomersCustomerDto>(`/api/common/customer/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取客户 GET /api/common/customer/by-code */
export async function CustomerGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonCustomerManagementCustomersCustomerDto>('/api/common/customer/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer/export */
export async function CustomerExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/customer/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer/import */
export async function CustomerImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/customer/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer/import-template */
export async function CustomerGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/customer/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
