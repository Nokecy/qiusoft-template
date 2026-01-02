// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/dynamic-schema/dynamic-menu */
export async function DynamicMenuGetAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpDynamicSchemaMenusDynamicMenuDto>('/api/dynamic-schema/dynamic-menu', {
		method: 'GET',
		...(options || {}),
	});
}
