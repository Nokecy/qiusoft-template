// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/account/dynamic-claims/refresh */
export async function DynamicClaimsRefreshAsync(options?: { [key: string]: any }) {
	return request<any>('/api/account/dynamic-claims/refresh', {
		method: 'POST',
		...(options || {}),
	});
}
