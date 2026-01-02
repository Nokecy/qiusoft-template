// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取配置列表 GET /api/data-copilot/llm-configs */
export async function LlmConfigGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LlmConfigGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotLlmConfigsLlmConfigDto>('/api/data-copilot/llm-configs', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建配置 POST /api/data-copilot/llm-configs */
export async function LlmConfigCreateAsync(body: API.BurnAbpDataCopilotLlmConfigsCreateLlmConfigDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotLlmConfigsLlmConfigDto>('/api/data-copilot/llm-configs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取配置详情 GET /api/data-copilot/llm-configs/${param0} */
export async function LlmConfigGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LlmConfigGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotLlmConfigsLlmConfigDto>(`/api/data-copilot/llm-configs/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新配置 PUT /api/data-copilot/llm-configs/${param0} */
export async function LlmConfigUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LlmConfigUpdateAsyncParams,
	body: API.BurnAbpDataCopilotLlmConfigsUpdateLlmConfigDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotLlmConfigsLlmConfigDto>(`/api/data-copilot/llm-configs/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除配置 DELETE /api/data-copilot/llm-configs/${param0} */
export async function LlmConfigDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LlmConfigDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/llm-configs/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置为默认配置 POST /api/data-copilot/llm-configs/${param0}/set-default */
export async function LlmConfigSetAsDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LlmConfigSetAsDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/llm-configs/${param0}/set-default`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取激活的配置列表 GET /api/data-copilot/llm-configs/active */
export async function LlmConfigGetActiveListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotLlmConfigsLlmConfigDto>('/api/data-copilot/llm-configs/active', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取默认配置 GET /api/data-copilot/llm-configs/default */
export async function LlmConfigGetDefaultAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotLlmConfigsLlmConfigDto>('/api/data-copilot/llm-configs/default', {
		method: 'GET',
		...(options || {}),
	});
}

/** 测试 LLM 连接 POST /api/data-copilot/llm-configs/test-connection */
export async function LlmConfigTestConnectionAsync(body: API.BurnAbpDataCopilotLlmConfigsTestLlmConnectionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotLlmConfigsTestLlmConnectionResultDto>('/api/data-copilot/llm-configs/test-connection', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
