// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/resilience/retries/${param0} */
export async function ElsaResilienceEndpointsRetriesListEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaResilienceEndpointsRetriesListEndpointParams,
	options?: { [key: string]: any }
) {
	const { activityInstanceId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/resilience/retries/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/resilience/strategies */
export async function ElsaResilienceEndpointsResilienceStrategiesListEndpoint(options?: { [key: string]: any }) {
	return request<any>('/elsa/api/resilience/strategies', {
		method: 'GET',
		...(options || {}),
	});
}
