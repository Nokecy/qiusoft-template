// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/abp/localization-definition */
export async function AbpLocalizationDefinitionGetAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpSystemSharedHostControllersLanguageSwitchViewComponentModel>('/api/abp/localization-definition', {
		method: 'GET',
		...(options || {}),
	});
}
