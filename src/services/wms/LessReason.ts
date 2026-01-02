// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/less-reasson/${param0} */
export async function LessReasonGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LessReasonGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto>(`/api/wms/less-reasson/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/less-reasson/${param0} */
export async function LessReasonDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LessReasonDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/less-reasson/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/less-reasson/create */
export async function LessReasonCreateAsync(body: API.BurnAbpWMS_jichuxinxi_qianliaoyuanyinCreateOrUpdateLessReasonDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto>('/api/wms/less-reasson/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/less-reasson/list */
export async function LessReasonGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LessReasonGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto>('/api/wms/less-reasson/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/less-reasson/updagte/${param0} */
export async function LessReasonUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LessReasonUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_qianliaoyuanyinCreateOrUpdateLessReasonDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_qianliaoyuanyinLessReasonDto>(`/api/wms/less-reasson/updagte/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
