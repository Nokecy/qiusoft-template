// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/alterations/${param0} */
export async function ElsaAlterationsEndpointsAlterationsGetGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaAlterationsEndpointsAlterationsGetGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaAlterationsEndpointsAlterationsGetResponse>(`/elsa/api/alterations/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/alterations/dry-run */
export async function ElsaAlterationsEndpointsAlterationsDryRunDryRun(body: API.ElsaAlterationsCoreModelsAlterationWorkflowInstanceFilter, options?: { [key: string]: any }) {
	return request<API.ElsaAlterationsEndpointsAlterationsDryRunResponse>('/elsa/api/alterations/dry-run', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/alterations/run */
export async function ElsaAlterationsEndpointsAlterationsRunRun(body: API.ElsaAlterationsEndpointsAlterationsRunRequest, options?: { [key: string]: any }) {
	return request<API.ElsaAlterationsEndpointsAlterationsRunResponse>('/elsa/api/alterations/run', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/alterations/submit */
export async function ElsaAlterationsEndpointsAlterationsSubmitSubmit(body: API.ElsaAlterationsCoreModelsAlterationPlanParams, options?: { [key: string]: any }) {
	return request<API.ElsaAlterationsEndpointsAlterationsSubmitResponse>('/elsa/api/alterations/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/alterations/workflows/retry */
export async function GetElsaAlterationsEndpointsWorkflowsRetryRetry(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaAlterationsEndpointsWorkflowsRetryRetryParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaAlterationsEndpointsWorkflowsRetryResponse>('/elsa/api/alterations/workflows/retry', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/alterations/workflows/retry */
export async function PostElsaAlterationsEndpointsWorkflowsRetryRetry(options?: { [key: string]: any }) {
	return request<API.ElsaAlterationsEndpointsWorkflowsRetryResponse>('/elsa/api/alterations/workflows/retry', {
		method: 'POST',
		...(options || {}),
	});
}
