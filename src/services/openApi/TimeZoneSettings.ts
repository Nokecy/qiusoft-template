// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/setting-management/timezone */
export async function TimeZoneSettingsGetAsync(options?: { [key: string]: any }) {
	return request<string>('/api/setting-management/timezone', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/setting-management/timezone */
export async function TimeZoneSettingsUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TimeZoneSettingsUpdateAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/setting-management/timezone', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/setting-management/timezone/timezones */
export async function TimeZoneSettingsGetTimezonesAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpNameValue[]>('/api/setting-management/timezone/timezones', {
		method: 'GET',
		...(options || {}),
	});
}
