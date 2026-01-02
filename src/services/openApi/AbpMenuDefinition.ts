// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/abp/menu-definition */
export async function AbpMenuDefinitionGetAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpSystemSharedHostControllersApplicationMenuModel>('/api/abp/menu-definition', {
		method: 'GET',
		...(options || {}),
	});
}
