// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/wms/out-inspection-project/create */
export async function OutInspectionProjectCreateAsync(body: API.BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto>('/api/wms/out-inspection-project/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-inspection-project/delete/${param0} */
export async function OutInspectionProjectDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionProjectDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-inspection-project/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-inspection-project/get/${param0} */
export async function OutInspectionProjectGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionProjectGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto>(`/api/wms/out-inspection-project/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-inspection-project/list */
export async function OutInspectionProjectGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionProjectGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto>('/api/wms/out-inspection-project/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-inspection-project/update/${param0} */
export async function OutInspectionProjectUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionProjectUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanxiangmuOutInspectionProjectDto>(`/api/wms/out-inspection-project/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
