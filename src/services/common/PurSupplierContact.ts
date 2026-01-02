// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/pur-supplier-contact */
export async function PurSupplierContactGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PurSupplierContactGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto>('/api/common/pur-supplier-contact', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建供应商联系人 POST /api/common/pur-supplier-contact */
export async function PurSupplierContactCreateAsync(
	body: API.BurnAbpErpCommonSupplierManagementSupplierContactsCreateUpdatePurSupplierContactDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto>('/api/common/pur-supplier-contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/pur-supplier-contact/${param0} */
export async function PurSupplierContactGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PurSupplierContactGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto>(`/api/common/pur-supplier-contact/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/pur-supplier-contact/${param0}/delete */
export async function PurSupplierContactDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PurSupplierContactDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/pur-supplier-contact/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新供应商联系人 POST /api/common/pur-supplier-contact/${param0}/update */
export async function PurSupplierContactUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PurSupplierContactUpdateAsyncParams,
	body: API.BurnAbpErpCommonSupplierManagementSupplierContactsCreateUpdatePurSupplierContactDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonSupplierManagementSupplierContactsPurSupplierContactDto>(`/api/common/pur-supplier-contact/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/pur-supplier-contact/export */
export async function PurSupplierContactExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PurSupplierContactExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/pur-supplier-contact/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/pur-supplier-contact/import */
export async function PurSupplierContactImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/pur-supplier-contact/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/pur-supplier-contact/import-template */
export async function PurSupplierContactGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/pur-supplier-contact/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
