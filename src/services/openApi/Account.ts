// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/account/register */
export async function AccountRegisterAsync(body: API.VoloAbpAccountRegisterDto, options?: { [key: string]: any }) {
	return request<API.VoloAbpIdentityIdentityUserDto>('/api/account/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/reset-password */
export async function AccountResetPasswordAsync(body: API.VoloAbpAccountResetPasswordDto, options?: { [key: string]: any }) {
	return request<any>('/api/account/reset-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/send-password-reset-code */
export async function AccountSendPasswordResetCodeAsync(body: API.VoloAbpAccountSendPasswordResetCodeDto, options?: { [key: string]: any }) {
	return request<any>('/api/account/send-password-reset-code', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/verify-password-reset-token */
export async function AccountVerifyPasswordResetTokenAsync(body: API.VoloAbpAccountVerifyPasswordResetTokenInput, options?: { [key: string]: any }) {
	return request<boolean>('/api/account/verify-password-reset-token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
