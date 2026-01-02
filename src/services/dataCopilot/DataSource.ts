// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取数据源列表 GET /api/data-copilot/data-sources */
export async function DataSourceGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpDataCopilotDataSourcesDataSourceDto>('/api/data-copilot/data-sources', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建数据源 POST /api/data-copilot/data-sources */
export async function DataSourceCreateAsync(body: API.BurnAbpDataCopilotDataSourcesCreateDataSourceDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotDataSourcesDataSourceDto>('/api/data-copilot/data-sources', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取数据源详情 GET /api/data-copilot/data-sources/${param0} */
export async function DataSourceGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotDataSourcesDataSourceDto>(`/api/data-copilot/data-sources/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新数据源 PUT /api/data-copilot/data-sources/${param0} */
export async function DataSourceUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceUpdateAsyncParams,
	body: API.BurnAbpDataCopilotDataSourcesUpdateDataSourceDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotDataSourcesDataSourceDto>(`/api/data-copilot/data-sources/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除数据源 DELETE /api/data-copilot/data-sources/${param0} */
export async function DataSourceDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/data-sources/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 增量同步 Schema POST /api/data-copilot/data-sources/${param0}/incremental-sync-schema */
export async function DataSourceIncrementalSyncSchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceIncrementalSyncSchemaAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotDataSourcesSchemaSyncResultDto>(`/api/data-copilot/data-sources/${param0}/incremental-sync-schema`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 重建向量索引 POST /api/data-copilot/data-sources/${param0}/reindex */
export async function DataSourceReindexAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceReindexAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/data-sources/${param0}/reindex`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取即时远程表列表 GET /api/data-copilot/data-sources/${param0}/remote-tables */
export async function DataSourceGetRemoteTablesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceGetRemoteTablesAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesRemoteTableDto>(`/api/data-copilot/data-sources/${param0}/remote-tables`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取即时远程表列信息 GET /api/data-copilot/data-sources/${param0}/remote-tables/${param1}/columns */
export async function DataSourceGetRemoteTableColumnsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceGetRemoteTableColumnsAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, tableName: param1, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesRemoteColumnDto>(`/api/data-copilot/data-sources/${param0}/remote-tables/${param1}/columns`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 同步 Schema POST /api/data-copilot/data-sources/${param0}/sync-schema */
export async function DataSourceSyncSchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceSyncSchemaAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/data-sources/${param0}/sync-schema`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 选择性同步 Schema POST /api/data-copilot/data-sources/${param0}/sync-selected-tables */
export async function DataSourceSyncSelectedTablesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceSyncSelectedTablesAsyncParams,
	body: API.BurnAbpDataCopilotDataSourcesSyncSelectedTablesInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotDataSourcesSchemaSyncResultDto>(`/api/data-copilot/data-sources/${param0}/sync-selected-tables`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新表/列业务别名 PUT /api/data-copilot/data-sources/${param0}/tables/${param1}/alias */
export async function DataSourceUpdateBusinessAliasAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceUpdateBusinessAliasAsyncParams,
	body: API.BurnAbpDataCopilotDataSourcesUpdateBusinessAliasDto,
	options?: { [key: string]: any }
) {
	const { dataSourceId: param0, tableId: param1, ...queryParams } = params;
	return request<any>(`/api/data-copilot/data-sources/${param0}/tables/${param1}/alias`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取数据源详情（含表结构） GET /api/data-copilot/data-sources/${param0}/with-tables */
export async function DataSourceGetWithTablesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DataSourceGetWithTablesAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotDataSourcesDataSourceWithTablesDto>(`/api/data-copilot/data-sources/${param0}/with-tables`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取激活的数据源列表 GET /api/data-copilot/data-sources/active */
export async function DataSourceGetActiveListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesDataSourceDto>('/api/data-copilot/data-sources/active', {
		method: 'GET',
		...(options || {}),
	});
}

/** 测试数据库连接 POST /api/data-copilot/data-sources/test-connection */
export async function DataSourceTestConnectionAsync(body: API.BurnAbpDataCopilotDataSourcesTestConnectionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotDataSourcesTestConnectionResultDto>('/api/data-copilot/data-sources/test-connection', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
