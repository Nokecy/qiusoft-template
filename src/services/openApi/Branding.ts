// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/abp/branding */
export async function BrandingGetAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpSystemSharedHostControllersBrandDto>('/api/abp/branding', {
		method: 'GET',
		...(options || {}),
	});
}
