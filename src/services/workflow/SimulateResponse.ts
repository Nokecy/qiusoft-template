// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/simulate-response */
export async function ElsaResilienceEndpointsSimulateResponseSimulateResponseEndpoint(options?: { [key: string]: any }) {
	return request<API.ElsaResilienceEndpointsSimulateResponseSimulatedResponse>('/elsa/api/simulate-response', {
		method: 'GET',
		...(options || {}),
	});
}
