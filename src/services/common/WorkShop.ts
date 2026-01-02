// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/work-shop */
export async function WorkShopGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkShopGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto>('/api/common/work-shop', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-shop */
export async function WorkShopCreateAsync(body: API.BurnAbpErpCommonDepartmentManagementWorkShopsCreateUpdateWorkShopDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto>('/api/common/work-shop', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/work-shop/${param0} */
export async function WorkShopGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkShopGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto>(`/api/common/work-shop/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-shop/${param0}/delete */
export async function WorkShopDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkShopDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/work-shop/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-shop/${param0}/update */
export async function WorkShopUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkShopUpdateAsyncParams,
	body: API.BurnAbpErpCommonDepartmentManagementWorkShopsCreateUpdateWorkShopDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementWorkShopsWorkShopDto>(`/api/common/work-shop/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/work-shop/export */
export async function WorkShopExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkShopExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/work-shop/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-shop/import */
export async function WorkShopImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/work-shop/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/work-shop/import-template */
export async function WorkShopGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/work-shop/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
