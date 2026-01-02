// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取示例列表 GET /api/data-copilot/few-shot-examples */
export async function FewShotExampleGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotFewShotFewShotExampleDto>('/api/data-copilot/few-shot-examples', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建示例 POST /api/data-copilot/few-shot-examples */
export async function FewShotExampleCreateAsync(body: API.BurnAbpDataCopilotFewShotCreateFewShotExampleDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotFewShotFewShotExampleDto>('/api/data-copilot/few-shot-examples', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取示例详情 GET /api/data-copilot/few-shot-examples/${param0} */
export async function FewShotExampleGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotFewShotFewShotExampleDto>(`/api/data-copilot/few-shot-examples/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新示例 PUT /api/data-copilot/few-shot-examples/${param0} */
export async function FewShotExampleUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleUpdateAsyncParams,
	body: API.BurnAbpDataCopilotFewShotUpdateFewShotExampleDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotFewShotFewShotExampleDto>(`/api/data-copilot/few-shot-examples/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除示例 DELETE /api/data-copilot/few-shot-examples/${param0} */
export async function FewShotExampleDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/few-shot-examples/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 激活示例 POST /api/data-copilot/few-shot-examples/${param0}/activate */
export async function FewShotExampleActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/few-shot-examples/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 停用示例 POST /api/data-copilot/few-shot-examples/${param0}/deactivate */
export async function FewShotExampleDeactivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleDeactivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/few-shot-examples/${param0}/deactivate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取指定数据源的激活示例 GET /api/data-copilot/few-shot-examples/active/${param0} */
export async function FewShotExampleGetActiveByDataSourceAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FewShotExampleGetActiveByDataSourceAsyncParams,
	options?: { [key: string]: any }
) {
	const { dataSourceId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotFewShotFewShotExampleDto>(`/api/data-copilot/few-shot-examples/active/${param0}`, {
		method: 'GET',
		params: {
			// maxCount has a default value: 50
			maxCount: '50',
			...queryParams,
		},
		...(options || {}),
	});
}
