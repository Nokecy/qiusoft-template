// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/materialItem/${param0} */
export async function MaterialItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto>(`/api/wms/materialItem/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem/create */
export async function MaterialItemCreateAsync(body: API.BurnAbpWMS_jichuxinxi_wuliaoxinxiCreateOrUpdateMaterialItemDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto>('/api/wms/materialItem/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem/delete/${param0} */
export async function MaterialItemDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/materialItem/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出物料数据 GET /api/wms/materialItem/export */
export async function MaterialItemExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/materialItem/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem/find/lotAttr/${param0} */
export async function MaterialItemFindMaterialLotAttrAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemFindMaterialLotAttrAsyncParams,
	options?: { [key: string]: any }
) {
	const { materialId: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto[]>(`/api/wms/materialItem/find/lotAttr/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem/find/lotattr/by-code/${param0} */
export async function MaterialItemFindMaterialLotAttrByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemFindMaterialLotAttrByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	const { materialCode: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto[]>(`/api/wms/materialItem/find/lotattr/by-code/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem/find/rule/${param0} */
export async function MaterialItemFindMaterialRuleAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemFindMaterialRuleAsyncParams,
	options?: { [key: string]: any }
) {
	const { materialCode: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto>(`/api/wms/materialItem/find/rule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 物料批量导入接口 POST /api/wms/materialItem/import */
export async function MaterialItemImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/materialItem/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 批量更新物料数据 POST /api/wms/materialItem/import-batchinput */
export async function MaterialItemUpdateImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/materialItem/import-batchinput', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 下载物料导入模板 GET /api/wms/materialItem/import-template */
export async function MaterialItemImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/materialItem/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem/list */
export async function MaterialItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto>('/api/wms/materialItem/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 下载批量更新模板 GET /api/wms/materialItem/update-import-template */
export async function MaterialItemUpdateImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/materialItem/update-import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 根据ID更新物料数据 POST /api/wms/materialItem/update/${param0} */
export async function MaterialItemUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_wuliaoxinxiCreateOrUpdateMaterialItemDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoxinxiMaterialItemDto>(`/api/wms/materialItem/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
