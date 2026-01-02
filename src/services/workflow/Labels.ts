// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/labels */
export async function ElsaLabelsEndpointsLabelsListList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaLabelsEndpointsLabelsListListParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaLabelsEndpointsLabelsListResponse>('/elsa/api/labels', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/labels */
export async function ElsaLabelsEndpointsLabelsPostCreate(body: API.ElsaLabelsEndpointsLabelsPostRequest, options?: { [key: string]: any }) {
	return request<API.ElsaLabelsEndpointsLabelsPostResponse>('/elsa/api/labels', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/labels/${param0} */
export async function ElsaLabelsEndpointsLabelsGetGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaLabelsEndpointsLabelsGetGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaLabelsEndpointsLabelsGetResponse>(`/elsa/api/labels/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/labels/${param0} */
export async function ElsaLabelsEndpointsLabelsUpdateUpdate(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaLabelsEndpointsLabelsUpdateUpdateParams,
	body: API.ElsaLabelsEndpointsLabelsUpdateRequest,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaLabelsEndpointsLabelsUpdateResponse>(`/elsa/api/labels/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /elsa/api/labels/${param0} */
export async function ElsaLabelsEndpointsLabelsDeleteDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaLabelsEndpointsLabelsDeleteDeleteParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/labels/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
