// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/materialItem-lifeDay/${param0} */
export async function MaterialItemLifeDayGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemLifeDayGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto>(`/api/wms/materialItem-lifeDay/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem-lifeDay/create */
export async function MaterialItemLifeDayCreateMaterialItemLifeDayAsync(
	body: API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiCreateOrUpdateMaterialItemLifeDayDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto>('/api/wms/materialItem-lifeDay/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem-lifeDay/delete/${param0} */
export async function MaterialItemLifeDayDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemLifeDayDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/materialItem-lifeDay/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem-lifeDay/disuse-create */
export async function MaterialItemLifeDayCreateAsync(body: API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto>('/api/wms/materialItem-lifeDay/disuse-create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem-lifeDay/disuse-update/${param0} */
export async function MaterialItemLifeDayUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemLifeDayUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto>(`/api/wms/materialItem-lifeDay/disuse-update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem-lifeDay/export */
export async function MaterialItemLifeDayExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemLifeDayExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/materialItem-lifeDay/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem-lifeDay/import */
export async function MaterialItemLifeDayImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<string[]>('/api/wms/materialItem-lifeDay/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem-lifeDay/import-template */
export async function MaterialItemLifeDayImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/materialItem-lifeDay/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialItem-lifeDay/list */
export async function MaterialItemLifeDayGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemLifeDayGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto>('/api/wms/materialItem-lifeDay/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialItem-lifeDay/update/${param0} */
export async function MaterialItemLifeDayUpdateMaterialItemLifeDayAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemLifeDayUpdateMaterialItemLifeDayAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiCreateOrUpdateMaterialItemLifeDayDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaocunchuqiMaterialItemLifeDayDto>(`/api/wms/materialItem-lifeDay/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
