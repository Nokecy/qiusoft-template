// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取库位信息 GET /api/wms/wareHouseLocation/${param0} */
export async function WareHouseLocationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto>(`/api/wms/wareHouseLocation/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据编码获取库位信息 GET /api/wms/wareHouseLocation/by-code/${param0} */
export async function WareHouseLocationGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	const { code: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto>(`/api/wms/wareHouseLocation/by-code/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 单独创建库位信息 POST /api/wms/wareHouseLocation/create */
export async function WareHouseLocationCreateAsync(body: API.BurnAbpWMS_jichuxinxi_kufangkuweiCreateWarehouseLocationInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto>('/api/wms/wareHouseLocation/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批量创建库位信息 POST /api/wms/wareHouseLocation/create/batch */
export async function WareHouseLocationBatchCreateAsync(body: API.BurnAbpWMS_jichuxinxi_kufangkuweiBatchCreateLocationDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/wareHouseLocation/create/batch', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除库位信息 POST /api/wms/wareHouseLocation/delete/${param0} */
export async function WareHouseLocationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/wareHouseLocation/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出库位信息 GET /api/wms/wareHouseLocation/export */
export async function WareHouseLocationExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/wareHouseLocation/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 批量导入库位信息 POST /api/wms/wareHouseLocation/import */
export async function WareHouseLocationImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/wareHouseLocation/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 下载导入库位信息模板 GET /api/wms/wareHouseLocation/import-template */
export async function WareHouseLocationGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/wareHouseLocation/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 根据给定条件获取库位列表信息 GET /api/wms/wareHouseLocation/list */
export async function WareHouseLocationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto>('/api/wms/wareHouseLocation/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新给定ID的库位信息列表 POST /api/wms/wareHouseLocation/update/${param0} */
export async function WareHouseLocationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_kufangkuweiUpdateWarehouseLocationInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationDto>(`/api/wms/wareHouseLocation/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取库位使用率 GET /api/wms/wareHouseLocation/use-rate */
export async function WareHouseLocationGetUseRateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseLocationGetUseRateAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_kufangkuweiWareHouseLocationUseDto>('/api/wms/wareHouseLocation/use-rate', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
