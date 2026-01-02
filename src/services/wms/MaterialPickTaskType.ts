// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/materialPickTaskType */
export async function MaterialPickTaskTypeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickTaskTypeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto>('/api/wms/materialPickTaskType', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/materialPickTaskType */
export async function MaterialPickTaskTypeCreateAsync(body: API.BurnAbpWMS_jichuxinxi_xiajiarenwuleixingCreateMaterialPickTaskTypeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto>('/api/wms/materialPickTaskType', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialPickTaskType/${param0} */
export async function MaterialPickTaskTypeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickTaskTypeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto>(`/api/wms/materialPickTaskType/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/materialPickTaskType/${param0} */
export async function MaterialPickTaskTypeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickTaskTypeUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_xiajiarenwuleixingUpdateMaterialPickTaskTypeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_xiajiarenwuleixingMaterialPickTaskTypeDto>(`/api/wms/materialPickTaskType/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/materialPickTaskType/${param0} */
export async function MaterialPickTaskTypeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickTaskTypeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/materialPickTaskType/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
