// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取实体的 Formily Schema
优先从数据库读取已保存的 Schema，如果没有则从元数据生成 GET /api/dynamic-schema/formily-schema/entity-schema */
export async function FormilySchemaGetEntitySchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormilySchemaGetEntitySchemaAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaFormilyFormilySchemaDto>('/api/dynamic-schema/formily-schema/entity-schema', {
		method: 'GET',
		params: {
			// scenarioKey has a default value: default
			scenarioKey: 'default',
			...params,
		},
		...(options || {}),
	});
}

/** 保存设计器 Schema（从设计器同步元数据） POST /api/dynamic-schema/formily-schema/save-designer-schema */
export async function FormilySchemaSaveDesignerSchemaAsync(body: API.BurnAbpDynamicSchemaFormilySaveDesignerSchemaInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaFormilySyncSchemaResult>('/api/dynamic-schema/formily-schema/save-designer-schema', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取应用的 Formily Schema
优先从数据库读取已保存的 Schema，如果没有则从元数据生成 GET /api/dynamic-schema/formily-schema/schema */
export async function FormilySchemaGetSchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FormilySchemaGetSchemaAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpDynamicSchemaFormilyFormilySchemaDto>('/api/dynamic-schema/formily-schema/schema', {
		method: 'GET',
		params: {
			// scenarioKey has a default value: default
			scenarioKey: 'default',
			...params,
		},
		...(options || {}),
	});
}
