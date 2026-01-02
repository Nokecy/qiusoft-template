// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/put-item-recommend-strategy */
export async function PutItemRecommendStrategyGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto>('/api/wms/put-item-recommend-strategy', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/put-item-recommend-strategy */
export async function PutItemRecommendStrategyCreateAsync(body: API.BurnAbpWMS_jichuxinxi_shangjiatuijianCreatePutItemRecommendStrategyDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto>('/api/wms/put-item-recommend-strategy', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/put-item-recommend-strategy/${param0} */
export async function PutItemRecommendStrategyGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto>(`/api/wms/put-item-recommend-strategy/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/put-item-recommend-strategy/${param0} */
export async function PutItemRecommendStrategyUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_shangjiatuijianUpdatePutItemRecommendStrategyDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendStrategyDto>(`/api/wms/put-item-recommend-strategy/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/put-item-recommend-strategy/${param0} */
export async function PutItemRecommendStrategyDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/put-item-recommend-strategy/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/put-item-recommend-strategy/providers */
export async function PutItemRecommendStrategyGetProviderListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpNameValueSystemString[]>('/api/wms/put-item-recommend-strategy/providers', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取推荐库位 GET /api/wms/put-item-recommend-strategy/recommend */
export async function PutItemRecommendStrategyGetRecommendAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutItemRecommendStrategyGetRecommendAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_shangjiatuijianPutItemRecommendResultDto[]>('/api/wms/put-item-recommend-strategy/recommend', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
