// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/wms/out-inspection-task/finish-list */
export async function OutInspectionTaskIntegrationGetFinishListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionTaskIntegrationGetFinishListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto>('/integration-api/wms/out-inspection-task/finish-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
