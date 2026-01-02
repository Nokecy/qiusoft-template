// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/openiddict-wechat-info/bind-we-chat-user */
export async function OpenIddictWeChatBindWeChatUserAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictWeChatBindWeChatUserAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/openiddict-wechat-info/bind-we-chat-user', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/openiddict-wechat-info/get-we-chat-phoneNumber */
export async function OpenIddictWeChatGetWeChatPhoneNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictWeChatGetWeChatPhoneNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/openiddict-wechat-info/get-we-chat-phoneNumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/openiddict-wechat-info/we-chat-openId */
export async function OpenIddictWeChatGetWeChatOpenIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OpenIddictWeChatGetWeChatOpenIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/openiddict-wechat-info/we-chat-openId', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
