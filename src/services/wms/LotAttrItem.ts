// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/lot-attr-item/${param0} */
export async function LotAttrItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto>(`/api/wms/lot-attr-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/lot-attr-item/create */
export async function LotAttrItemCreateAsync(body: API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto>('/api/wms/lot-attr-item/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/lot-attr-item/delete/${param0} */
export async function LotAttrItemDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrItemDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/lot-attr-item/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/lot-attr-item/list */
export async function LotAttrItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto>('/api/wms/lot-attr-item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/lot-attr-item/update/${param0} */
export async function LotAttrItemUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LotAttrItemUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_picishuxingLotAttrItemDto>(`/api/wms/lot-attr-item/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
