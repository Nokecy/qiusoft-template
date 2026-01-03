// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/package/version */
export async function ElsaWorkflowsApiEndpointsPackageVersion(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsPackageResponse>('/elsa/api/package/version', {
		method: 'GET',
		...(options || {}),
	});
}
