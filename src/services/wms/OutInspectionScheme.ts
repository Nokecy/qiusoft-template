// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新建出库检验方案 POST /api/wms/out-inspection-scheme/create */
export async function OutInspectionSchemeCreateAsync(body: API.BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto>('/api/wms/out-inspection-scheme/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除出库检验方案 POST /api/wms/out-inspection-scheme/delete/${param0} */
export async function OutInspectionSchemeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionSchemeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-inspection-scheme/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据物料查询复检方案信息 GET /api/wms/out-inspection-scheme/get-scheme-by-material/${param0} */
export async function OutInspectionSchemeGetItemByMaterialAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionSchemeGetItemByMaterialAsyncParams,
	options?: { [key: string]: any }
) {
	const { materialCode: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto>(`/api/wms/out-inspection-scheme/get-scheme-by-material/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询指定出库检验方案 GET /api/wms/out-inspection-scheme/get/${param0} */
export async function OutInspectionSchemeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionSchemeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto>(`/api/wms/out-inspection-scheme/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询出库检验方案列表 GET /api/wms/out-inspection-scheme/list */
export async function OutInspectionSchemeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionSchemeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto>('/api/wms/out-inspection-scheme/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新出库检验方案信息 POST /api/wms/out-inspection-scheme/update/${param0} */
export async function OutInspectionSchemeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionSchemeUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chukujianyanfanganOutInspectionSchemeDto>(`/api/wms/out-inspection-scheme/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
