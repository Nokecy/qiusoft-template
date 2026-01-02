// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-menu/menu-item */
export async function MenuItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MenuItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto>('/api/dynamic-menu/menu-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-menu/menu-item */
export async function MenuItemCreateAsync(body: API.BurnAbpDynamicMenuManagementMenuItemsDtosCreateMenuItemDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto>('/api/dynamic-menu/menu-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-menu/menu-item/${param0} */
export async function MenuItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MenuItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { Name: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto>(`/api/dynamic-menu/menu-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-menu/menu-item/delete/${param0} */
export async function MenuItemDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MenuItemDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { Name: param0, ...queryParams } = params;
	return request<any>(`/api/dynamic-menu/menu-item/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-menu/menu-item/dynamic-menu-list */
export async function MenuItemGetDynamicMenuListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto[]>('/api/dynamic-menu/menu-item/dynamic-menu-list', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-menu/menu-item/export */
export async function MenuItemExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MenuItemExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/dynamic-menu/menu-item/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/dynamic-menu/menu-item/get-template */
export async function MenuItemGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/dynamic-menu/menu-item/get-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-menu/menu-item/import */
export async function MenuItemImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/dynamic-menu/menu-item/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/dynamic-menu/menu-item/update/${param0} */
export async function MenuItemUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MenuItemUpdateAsyncParams,
	body: API.BurnAbpDynamicMenuManagementMenuItemsDtosUpdateMenuItemDto,
	options?: { [key: string]: any }
) {
	const { Name: param0, ...queryParams } = params;
	return request<API.BurnAbpDynamicMenuManagementMenuItemsDtosMenuItemDto>(`/api/dynamic-menu/menu-item/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
