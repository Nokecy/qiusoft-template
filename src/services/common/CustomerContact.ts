// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/customer-contact */
export async function CustomerContactGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerContactGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto>('/api/common/customer-contact', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建客户联系人 POST /api/common/customer-contact */
export async function CustomerContactCreateAsync(body: API.BurnAbpErpCommonCustomerManagementCustomerContactsCreateUpdateCustomerContactDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto>('/api/common/customer-contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer-contact/${param0} */
export async function CustomerContactGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerContactGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto>(`/api/common/customer-contact/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer-contact/${param0}/delete */
export async function CustomerContactDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerContactDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/customer-contact/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新客户联系人 POST /api/common/customer-contact/${param0}/update */
export async function CustomerContactUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerContactUpdateAsyncParams,
	body: API.BurnAbpErpCommonCustomerManagementCustomerContactsCreateUpdateCustomerContactDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto>(`/api/common/customer-contact/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer-contact/export */
export async function CustomerContactExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerContactExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/customer-contact/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer-contact/import */
export async function CustomerContactImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/customer-contact/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer-contact/import-template */
export async function CustomerContactGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/customer-contact/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer-contact/main-contact */
export async function CustomerContactGetMainContactAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerContactGetMainContactAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonCustomerManagementCustomerContactsCustomerContactDto>('/api/common/customer-contact/main-contact', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
