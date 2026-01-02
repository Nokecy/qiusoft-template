// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/lot-attr-group/${param0} */
export async function LotAttrGroupGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrGroupGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto>(`/api/wms/lot-attr-group/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/lot-attr-group/create */
export async function LotAttrGroupCreateAsync(body: API.BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto>('/api/wms/lot-attr-group/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/lot-attr-group/delete/${param0} */
export async function LotAttrGroupDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrGroupDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/lot-attr-group/delete/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/lot-attr-group/list */
export async function LotAttrGroupGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrGroupGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto>('/api/wms/lot-attr-group/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/lot-attr-group/set-default/${param0} */
export async function LotAttrGroupSetDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrGroupSetDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/lot-attr-group/set-default/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/lot-attr-group/update/${param0} */
export async function LotAttrGroupUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrGroupUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingzuLotAttrGroupDto>(`/api/wms/lot-attr-group/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
