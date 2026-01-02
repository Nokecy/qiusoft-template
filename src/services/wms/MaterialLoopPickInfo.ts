// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/material-loop-pickinfo/list */
export async function MaterialLoopPickInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialLoopPickInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_gundongfaliaojiluMaterialLoopPickInfoDto>('/api/wms/material-loop-pickinfo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
