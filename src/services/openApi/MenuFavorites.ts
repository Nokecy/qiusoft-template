// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/menu-favorites/menu-colletion/cancel */
export async function MenuFavoritesCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MenuFavoritesCancelAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/menu-favorites/menu-colletion/cancel', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/menu-favorites/menu-colletion/create */
export async function MenuFavoritesCreateAsync(body: API.BurnAbpMenuFavoritesApplicationContractsMenuFavoritesDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpMenuFavoritesApplicationContractsMenuFavoritesDto>('/api/menu-favorites/menu-colletion/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/menu-favorites/menu-colletion/list */
export async function MenuFavoritesGetListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpMenuFavoritesApplicationContractsMenuFavoritesDto[]>('/api/menu-favorites/menu-colletion/list', {
		method: 'GET',
		...(options || {}),
	});
}
