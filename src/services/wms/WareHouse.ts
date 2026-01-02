// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取库房 GET /api/wms/warehouse/${param0} */
export async function WareHouseGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto>(`/api/wms/warehouse/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据编码获取库房 GET /api/wms/warehouse/code/${param0} */
export async function WareHouseGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	const { code: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto>(`/api/wms/warehouse/code/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 新建库房 POST /api/wms/warehouse/create */
export async function WareHouseCreateAsync(body: API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto>('/api/wms/warehouse/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 新建虚拟库区 POST /api/wms/warehouse/create-virtual-zone */
export async function WareHouseCreateVirtualZoneAsync(options?: { [key: string]: any }) {
	return request<any>('/api/wms/warehouse/create-virtual-zone', {
		method: 'POST',
		...(options || {}),
	});
}

/** 删除库房 POST /api/wms/warehouse/delete/${param0} */
export async function WareHouseDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/warehouse/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出库房 GET /api/wms/warehouse/export */
export async function WareHouseExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/warehouse/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导入库房 POST /api/wms/warehouse/import */
export async function WareHouseImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/warehouse/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 获取库房模板 GET /api/wms/warehouse/import-template */
export async function WareHouseImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/warehouse/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取库房列表 GET /api/wms/warehouse/list */
export async function WareHouseGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kufangWareHouseDto>('/api/wms/warehouse/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据当前用户获取库房及物权信息 GET /api/wms/warehouse/list-warhouse-and-real-right */
export async function WareHouseGetWareHouseAndRealRight(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto[]>('/api/wms/warehouse/list-warhouse-and-real-right', {
		method: 'GET',
		...(options || {}),
	});
}

/** 更新库房 POST /api/wms/warehouse/update/${param0} */
export async function WareHouseUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WareHouseUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kufangWareHouseDto>(`/api/wms/warehouse/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
