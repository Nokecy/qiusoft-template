// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/setting-ui */
export async function SettingUiGroupSettingDefinitionsAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpSettingManagementApplicationProDtoSettingGroup[]>('/api/setting-ui', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/setting-ui/reset-setting-values */
export async function SettingUiResetSettingValuesAsync(body: string[], options?: { [key: string]: any }) {
	return request<any>('/api/setting-ui/reset-setting-values', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/setting-ui/set-setting-values */
export async function SettingUiSetSettingValuesAsync(body: Record<string, any>, options?: { [key: string]: any }) {
	return request<any>('/api/setting-ui/set-setting-values', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
