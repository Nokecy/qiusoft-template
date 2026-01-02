// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/account/pro/confirm-email */
export async function AccountProConfirmEmailAsync(body: API.VoloAbpAccountConfirmEmailInput, options?: { [key: string]: any }) {
	return request<any>('/api/account/pro/confirm-email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/pro/confirm-phone-number */
export async function AccountProConfirmPhoneNumberAsync(body: API.VoloAbpAccountConfirmPhoneNumberInput, options?: { [key: string]: any }) {
	return request<any>('/api/account/pro/confirm-phone-number', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 重置用户密码到默认密码 POST /api/account/pro/reset-default-password */
export async function AccountProResetDefaultPasswordAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AccountProResetDefaultPasswordAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/account/pro/reset-default-password', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/pro/send-email-confirmation-token */
export async function AccountProSendEmailConfirmationTokenAsync(body: API.VoloAbpAccountSendEmailConfirmationTokenDto, options?: { [key: string]: any }) {
	return request<any>('/api/account/pro/send-email-confirmation-token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/pro/send-phone-confirmation-token */
export async function AccountProSendPhoneNumberConfirmationTokenAsync(body: API.VoloAbpAccountSendPhoneNumberConfirmationTokenDto, options?: { [key: string]: any }) {
	return request<any>('/api/account/pro/send-phone-confirmation-token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/account/pro/verify-email-confirmation-token */
export async function AccountProVerifyEmailConfirmationTokenAsync(body: API.VoloAbpAccountVerifyEmailConfirmationTokenInput, options?: { [key: string]: any }) {
	return request<boolean>('/api/account/pro/verify-email-confirmation-token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
