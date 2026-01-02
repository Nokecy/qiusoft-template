// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/put-item-recommend-strategy-item */
export async function PutItemRecommendStrategyItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto>('/api/wms/put-item-recommend-strategy-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/put-item-recommend-strategy-item */
export async function PutItemRecommendStrategyItemCreateAsync(
	body: API.BurnAbpWMS_jichuxinxi_shangjiatuijianCreatePutItemRecommendStrategyItemDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto>('/api/wms/put-item-recommend-strategy-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/put-item-recommend-strategy-item/${param0} */
export async function PutItemRecommendStrategyItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto>(`/api/wms/put-item-recommend-strategy-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/put-item-recommend-strategy-item/${param0} */
export async function PutItemRecommendStrategyItemUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyItemUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_shangjiatuijianUpdatePutItemRecommendStrategyItemDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyItemDto>(`/api/wms/put-item-recommend-strategy-item/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/put-item-recommend-strategy-item/${param0} */
export async function PutItemRecommendStrategyItemDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyItemDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/put-item-recommend-strategy-item/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/put-item-recommend-strategy-item/import */
export async function PutItemRecommendStrategyItemImportAsync(
	body: API.BurnAbpWMS_jichuxinxi_shangjiatuijianImportPutItemRecommendStrategyItemDto,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/put-item-recommend-strategy-item/import', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/put-item-recommend-strategy-item/import-template */
export async function PutItemRecommendStrategyItemGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/put-item-recommend-strategy-item/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
