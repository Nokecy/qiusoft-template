// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/account/my-profile */
export async function ProfileGetAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpAccountProfileDto>('/api/account/my-profile', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/account/my-profile */
export async function ProfileUpdateAsync(body: API.VoloAbpAccountUpdateProfileDto, options?: { [key: string]: any }) {
	return request<API.VoloAbpAccountProfileDto>('/api/account/my-profile', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/my-profile/change-password */
export async function ProfileChangePasswordAsync(body: API.VoloAbpAccountChangePasswordInput, options?: { [key: string]: any }) {
	return request<any>('/api/account/my-profile/change-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
