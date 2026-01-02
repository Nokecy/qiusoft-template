// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/delivery-way */
export async function DeliveryWayGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryWayGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto>('/api/common/delivery-way', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-way */
export async function DeliveryWayCreateAsync(body: API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysCreateUpdateDeliveryWayDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto>('/api/common/delivery-way', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/delivery-way/${param0} */
export async function DeliveryWayGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryWayGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto>(`/api/common/delivery-way/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-way/${param0}/delete */
export async function DeliveryWayDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryWayDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/delivery-way/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-way/${param0}/update */
export async function DeliveryWayUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryWayUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysCreateUpdateDeliveryWayDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto>(`/api/common/delivery-way/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取交货方式 GET /api/common/delivery-way/by-code */
export async function DeliveryWayGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryWayGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryWaysDeliveryWayDto>('/api/common/delivery-way/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/delivery-way/export */
export async function DeliveryWayExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryWayExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/delivery-way/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-way/import */
export async function DeliveryWayImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/delivery-way/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/delivery-way/import-template */
export async function DeliveryWayGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/delivery-way/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
