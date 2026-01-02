// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取指定服务的 Badge 详情 GET /api/badges/${param0} */
export async function BadgeGetServiceBadgeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BadgeGetServiceBadgeAsyncParams,
	options?: { [key: string]: any }
) {
	const { serviceId: param0, ...queryParams } = params;
	return request<API.BurnAbpBadgeAbstractsDtosBadgeDetailDto>(`/api/badges/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 清除当前用户的 Badge 缓存（用于测试或手动刷新）
需要 Badge.ClearCache 权限（管理员功能） DELETE /api/badges/cache */
export async function BadgeClearCacheAsync(options?: { [key: string]: any }) {
	return request<any>('/api/badges/cache', {
		method: 'DELETE',
		...(options || {}),
	});
}

/** 清除当前用户的所有 Badge（将所有计数设置为0） POST /api/badges/clear-all */
export async function BadgeClearAllBadgesAsync(options?: { [key: string]: any }) {
	return request<any>('/api/badges/clear-all', {
		method: 'POST',
		...(options || {}),
	});
}

/** 清除指定服务的 Badge（将计数设置为0） POST /api/badges/clear/${param0} */
export async function BadgeClearServiceBadgeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BadgeClearServiceBadgeAsyncParams,
	options?: { [key: string]: any }
) {
	const { serviceId: param0, ...queryParams } = params;
	return request<any>(`/api/badges/clear/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 分页获取当前用户的 Badge 列表（从数据库查询） GET /api/badges/paged */
export async function BadgeGetPagedListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BadgeGetPagedListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpBadgeAbstractsDtosPagedBadgeResultDto>('/api/badges/paged', {
		method: 'GET',
		params: {
			// maxResultCount has a default value: 10
			maxResultCount: '10',
			...params,
		},
		...(options || {}),
	});
}

/** 获取当前用户的 Badge 摘要 GET /api/badges/summary */
export async function BadgeGetSummaryAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpBadgeAbstractsDtosBadgeSummaryDto>('/api/badges/summary', {
		method: 'GET',
		...(options || {}),
	});
}
