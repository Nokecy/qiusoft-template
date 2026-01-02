// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/pick-task-agent */
export async function PickTaskAgentGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskAgentGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto>('/api/wms/pick-task-agent', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/pick-task-agent */
export async function PickTaskAgentCreateAsync(body: API.BurnAbpWMS_jichuxinxi_renwudailirenCreatePickTaskAgentInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto>('/api/wms/pick-task-agent', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/pick-task-agent/${param0} */
export async function PickTaskAgentGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskAgentGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto>(`/api/wms/pick-task-agent/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/pick-task-agent/${param0} */
export async function PickTaskAgentUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskAgentUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_renwudailirenUpdatePickTaskAgentInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_renwudailirenPickTaskAgentDto>(`/api/wms/pick-task-agent/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/pick-task-agent/${param0} */
export async function PickTaskAgentDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskAgentDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/pick-task-agent/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
