// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/abp/permission-definition */
export async function AbpPermissionDefinitionGetAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpAspNetCoreMvcModelsPermissionDefinitionDto[]>('/api/abp/permission-definition', {
		method: 'GET',
		...(options || {}),
	});
}
