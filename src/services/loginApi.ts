import { request } from 'umi';

/**
 * 移动端oauth密码登录接口
 * @param param0
 * @returns
 */
export const login = ({ username, password }: any) => {
	const clientId = OAUTH_ClientID;
	const clientSecret = OAUTH_ClientSecret;
	const scope = OAUTH_Scope;

	return request<any>(`/connect/token`, {
		method: 'POST',
		//@ts-ignore
		baseURL: window.serverUrl.authServerUrl,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: `grant_type=password&scope=${scope}&client_id=${clientId}&client_secret=${clientSecret}&username=${username}&password=${password}`,
	});
};

/**
 * 刷新Token
 * @param param0
 * @returns
 */
export const refreshToken = () => {
	const clientId = OAUTH_ClientID;
	const clientSecret = OAUTH_ClientSecret;
	const scope = OAUTH_Scope;

	return request<any>(`/connect/token`, {
		method: 'POST',
		//@ts-ignore
		baseURL: window.serverUrl.authServerUrl,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: `grant_type=refresh_token&scope=${scope}&client_id=${clientId}&client_secret=${clientSecret}`,
	});
};

/**
 * 注销当前登录用户信息
 * @returns
 */
export const logout = () => {
	return request<any>(`/identity/account/logout`, {
		//@ts-ignore
		baseURL: window.serverUrl.authServerUrl,
		method: 'GET',
	});
};
