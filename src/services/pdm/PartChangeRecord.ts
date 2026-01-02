// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据物料 ID 获取变更记录列表 GET /api/pdm/part-change-record/by-part-id/${param0} */
export async function PartChangeRecordGetListByPartIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartChangeRecordGetListByPartIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { partId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartChangeRecordDto[]>(`/api/pdm/part-change-record/by-part-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据物料编号获取变更记录列表 GET /api/pdm/part-change-record/by-part-number */
export async function PartChangeRecordGetListByPartNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartChangeRecordGetListByPartNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementPartsDtosPartChangeRecordDto[]>('/api/pdm/part-change-record/by-part-number', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据物料 ID 获取最新变更记录 GET /api/pdm/part-change-record/latest-by-part-id/${param0} */
export async function PartChangeRecordGetLatestByPartIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartChangeRecordGetLatestByPartIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { partId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartChangeRecordDto>(`/api/pdm/part-change-record/latest-by-part-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
