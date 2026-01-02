// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/supplier */
export async function SupplierGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SupplierGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonSupplierManagementSuppliersSupplierDto>('/api/common/supplier', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/supplier */
export async function SupplierCreateAsync(body: API.BurnAbpErpCommonSupplierManagementSuppliersCreateSupplierInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonSupplierManagementSuppliersSupplierDto>('/api/common/supplier', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/supplier/${param0} */
export async function SupplierGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SupplierGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonSupplierManagementSuppliersSupplierDto>(`/api/common/supplier/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/supplier/${param0}/delete */
export async function SupplierDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SupplierDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/supplier/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/supplier/${param0}/update */
export async function SupplierUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SupplierUpdateAsyncParams,
	body: API.BurnAbpErpCommonSupplierManagementSuppliersUpdateSupplierInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonSupplierManagementSuppliersSupplierDto>(`/api/common/supplier/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取供应商 GET /api/common/supplier/by-code */
export async function SupplierGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SupplierGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonSupplierManagementSuppliersSupplierDto>('/api/common/supplier/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/supplier/export */
export async function SupplierExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SupplierExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/supplier/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/supplier/import */
export async function SupplierImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/supplier/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/supplier/import-template */
export async function SupplierGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/supplier/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
