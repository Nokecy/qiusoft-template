// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取版本详情（包含属性值） GET /api/pdm/part-version/${param0} */
export async function PartVersionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartVersionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto>(`/api/pdm/part-version/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新草稿版本 POST /api/pdm/part-version/${param0}/update-draft */
export async function PartVersionUpdateDraftAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartVersionUpdateDraftAsyncParams,
	body: API.BurnAbpPdmPartManagementPartVersionsDtosUpdatePartVersionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto>(`/api/pdm/part-version/${param0}/update-draft`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取物料的草稿版本 GET /api/pdm/part-version/draft/${param0} */
export async function PartVersionGetDraftAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartVersionGetDraftAsyncParams,
	options?: { [key: string]: any }
) {
	const { partId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto>(`/api/pdm/part-version/draft/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取物料的版本历史列表 GET /api/pdm/part-version/version-history/${param0} */
export async function PartVersionGetVersionHistoryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartVersionGetVersionHistoryAsyncParams,
	options?: { [key: string]: any }
) {
	const { partId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto[]>(`/api/pdm/part-version/version-history/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
