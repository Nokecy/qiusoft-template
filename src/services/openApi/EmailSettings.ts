// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/setting-management/emailing */
export async function EmailSettingsGetAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpSettingManagementEmailSettingsDto>('/api/setting-management/emailing', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/setting-management/emailing */
export async function EmailSettingsUpdateAsync(body: API.VoloAbpSettingManagementUpdateEmailSettingsDto, options?: { [key: string]: any }) {
	return request<any>('/api/setting-management/emailing', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/setting-management/emailing/send-test-email */
export async function EmailSettingsSendTestEmailAsync(body: API.VoloAbpSettingManagementSendTestEmailInput, options?: { [key: string]: any }) {
	return request<any>('/api/setting-management/emailing/send-test-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
