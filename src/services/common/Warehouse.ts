// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/warehouse */
export async function WarehouseGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto>('/api/common/warehouse', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/warehouse */
export async function WarehouseCreateAsync(body: API.BurnAbpErpCommonWarehouseManagementsWarehousesCreateWarehouseInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto>('/api/common/warehouse', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/warehouse/${param0} */
export async function WarehouseGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto>(`/api/common/warehouse/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/warehouse/${param0}/delete */
export async function WarehouseDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/warehouse/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/warehouse/${param0}/update */
export async function WarehouseUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseUpdateAsyncParams,
	body: API.BurnAbpErpCommonWarehouseManagementsWarehousesUpdateWarehouseInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto>(`/api/common/warehouse/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取仓库 GET /api/common/warehouse/by-code */
export async function WarehouseGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonWarehouseManagementsWarehousesWarehouseDto>('/api/common/warehouse/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/warehouse/export */
export async function WarehouseExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/warehouse/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/warehouse/import */
export async function WarehouseImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/warehouse/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/warehouse/import-template */
export async function WarehouseGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/warehouse/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
