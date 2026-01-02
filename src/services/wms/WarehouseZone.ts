// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/warehouse-zone/${param0} */
export async function WarehouseZoneGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseZoneGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto>(`/api/wms/warehouse-zone/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/warehouse-zone/code/${param0} */
export async function WarehouseZoneGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseZoneGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	const { code: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto>(`/api/wms/warehouse-zone/code/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-zone/create */
export async function WarehouseZoneCreateAsync(body: API.BurnAbpWMS_jichuxinxi_kufangkuquCreateWareHouseZoneInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto>('/api/wms/warehouse-zone/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-zone/delete/${param0} */
export async function WarehouseZoneDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseZoneDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/warehouse-zone/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/warehouse-zone/export */
export async function WarehouseZoneExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseZoneExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/warehouse-zone/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-zone/import */
export async function WarehouseZoneImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/warehouse-zone/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/warehouse-zone/import-template */
export async function WarehouseZoneGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/warehouse-zone/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/warehouse-zone/list */
export async function WarehouseZoneGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseZoneGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto>('/api/wms/warehouse-zone/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/warehouse-zone/update/${param0} */
export async function WarehouseZoneUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseZoneUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_kufangkuquUpdateWarehouseZoneInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuquWarehouseZoneDto>(`/api/wms/warehouse-zone/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
