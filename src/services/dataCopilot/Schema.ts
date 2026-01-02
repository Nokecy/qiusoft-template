// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取数据源详情（含表结构） GET /api/data-copilot/schema/${param0} */
export async function SchemaGetDataSourceWithTablesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SchemaGetDataSourceWithTablesAsyncParams,
	options?: { [key: string]: any }
) {
	const { dataSourceId: param0, ...queryParams } = params;
	return request<API.BurnAbpDataCopilotDataSourcesDataSourceWithTablesDto>(`/api/data-copilot/schema/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 同步数据源 Schema POST /api/data-copilot/schema/${param0}/sync */
export async function SchemaSyncSchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SchemaSyncSchemaAsyncParams,
	options?: { [key: string]: any }
) {
	const { dataSourceId: param0, ...queryParams } = params;
	return request<any>(`/api/data-copilot/schema/${param0}/sync`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取数据源的表列表 GET /api/data-copilot/schema/${param0}/tables */
export async function SchemaGetTablesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SchemaGetTablesAsyncParams,
	options?: { [key: string]: any }
) {
	const { dataSourceId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpDataCopilotDataSourcesTableSchemaDto>(`/api/data-copilot/schema/${param0}/tables`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新表的业务别名 PUT /api/data-copilot/schema/${param0}/tables/${param1}/alias */
export async function SchemaUpdateTableAliasAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SchemaUpdateTableAliasAsyncParams,
	body: API.BurnAbpDataCopilotDataSourcesUpdateBusinessAliasDto,
	options?: { [key: string]: any }
) {
	const { dataSourceId: param0, tableId: param1, ...queryParams } = params;
	return request<any>(`/api/data-copilot/schema/${param0}/tables/${param1}/alias`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 测试数据源连接 POST /api/data-copilot/schema/test-connection */
export async function SchemaTestConnectionAsync(body: API.BurnAbpDataCopilotDataSourcesTestConnectionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpDataCopilotDataSourcesTestConnectionResultDto>('/api/data-copilot/schema/test-connection', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
