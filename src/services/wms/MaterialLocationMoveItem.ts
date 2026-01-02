// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/material-location-move/list */
export async function MaterialLocationMoveItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialLocationMoveItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kuweiyidongMaterialLocationMoveItemDto>('/api/wms/material-location-move/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
