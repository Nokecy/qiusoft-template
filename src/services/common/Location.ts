// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/location */
export async function LocationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LocationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonWarehouseManagementsLocationsLocationDto>('/api/common/location', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/location */
export async function LocationCreateAsync(body: API.BurnAbpErpCommonWarehouseManagementsLocationsCreateLocationInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonWarehouseManagementsLocationsLocationDto>('/api/common/location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/location/${param0} */
export async function LocationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LocationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonWarehouseManagementsLocationsLocationDto>(`/api/common/location/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/location/${param0}/delete */
export async function LocationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LocationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/location/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/location/${param0}/update */
export async function LocationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LocationUpdateAsyncParams,
	body: API.BurnAbpErpCommonWarehouseManagementsLocationsUpdateLocationInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonWarehouseManagementsLocationsLocationDto>(`/api/common/location/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取库位 GET /api/common/location/by-code */
export async function LocationGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LocationGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonWarehouseManagementsLocationsLocationDto>('/api/common/location/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/location/export */
export async function LocationExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LocationExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/location/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/location/import */
export async function LocationImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/location/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/location/import-template */
export async function LocationGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/location/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/location/warehouse-lookup */
export async function LocationGetWarehouseLookupAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpNameValueSystemInt64[]>('/api/common/location/warehouse-lookup', {
		method: 'GET',
		...(options || {}),
	});
}
