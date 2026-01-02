// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/features/installed */
export async function ElsaWorkflowsApiEndpointsFeaturesListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfFeatureDescriptor>('/elsa/api/features/installed', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/features/installed/${param0} */
export async function ElsaWorkflowsApiEndpointsFeaturesGetGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsFeaturesGetGetParams,
	options?: { [key: string]: any }
) {
	const { fullName: param0, ...queryParams } = params;
	return request<API.ElsaFeaturesModelsFeatureDescriptor>(`/elsa/api/features/installed/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
