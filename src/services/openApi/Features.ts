// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/feature-management/features */
export async function FeaturesGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeaturesGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpFeatureManagementGetFeatureListResultDto>('/api/feature-management/features', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/feature-management/features */
export async function FeaturesUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeaturesUpdateAsyncParams,
	body: API.VoloAbpFeatureManagementUpdateFeaturesDto,
	options?: { [key: string]: any }
) {
	return request<any>('/api/feature-management/features', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/feature-management/features */
export async function FeaturesDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeaturesDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/feature-management/features', {
		method: 'DELETE',
		params: {
			...params,
		},
		...(options || {}),
	});
}
