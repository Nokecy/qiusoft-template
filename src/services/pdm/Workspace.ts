// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取我的检出物料列表 GET /api/pdm/workspace/my-checked-out-parts */
export async function WorkspaceGetMyCheckedOutPartsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkspaceGetMyCheckedOutPartsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspaceMyCheckedOutPartDto>('/api/pdm/workspace/my-checked-out-parts', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取我的检出文档列表 GET /api/pdm/workspace/my-checkouts */
export async function WorkspaceGetMyCheckoutsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkspaceGetMyCheckoutsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspaceMyCheckoutDto>('/api/pdm/workspace/my-checkouts', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取我的待办任务列表 GET /api/pdm/workspace/my-pending-tasks */
export async function WorkspaceGetMyPendingTasksAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkspaceGetMyPendingTasksAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspacePendingTaskDto>('/api/pdm/workspace/my-pending-tasks', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取最近访问的文档列表
TODO: 需要实现文档访问记录功能 GET /api/pdm/workspace/recent-documents */
export async function WorkspaceGetRecentDocumentsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkspaceGetRecentDocumentsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmApplicationContractsWorkspaceDocumentSearchResultDto[]>('/api/pdm/workspace/recent-documents', {
		method: 'GET',
		params: {
			// maxCount has a default value: 10
			maxCount: '10',
			...params,
		},
		...(options || {}),
	});
}

/** 文档高级搜索 POST /api/pdm/workspace/search-documents */
export async function WorkspaceSearchDocumentsAsync(body: API.BurnAbpPdmApplicationContractsWorkspaceDocumentSearchInput, options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmApplicationContractsWorkspaceDocumentSearchResultDto>('/api/pdm/workspace/search-documents', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取工作区统计信息 GET /api/pdm/workspace/workspace-statistics */
export async function WorkspaceGetWorkspaceStatisticsAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmApplicationContractsWorkspaceWorkspaceStatisticsDto>('/api/pdm/workspace/workspace-statistics', {
		method: 'GET',
		...(options || {}),
	});
}
