// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 执行复核检验 POST /api/wms/out-inspection-task-order/check */
export async function OutInspectionTaskCheckAsync(body: API.BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionResolveDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto>('/api/wms/out-inspection-task-order/check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取已复核的箱明细列表 GET /api/wms/out-inspection-task-order/get-box-list */
export async function OutInspectionTaskGetBoxListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionTaskGetBoxListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskBoxItemDto>('/api/wms/out-inspection-task-order/get-box-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 通过业务批次查询库存信息 GET /api/wms/out-inspection-task-order/get-by-code/${param0} */
export async function OutInspectionTaskResolveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionTaskResolveAsyncParams,
	options?: { [key: string]: any }
) {
	const { code: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chukujianyanOutInspectionTaskResolveData>(`/api/wms/out-inspection-task-order/get-by-code/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取指定检验任务信息 GET /api/wms/out-inspection-task-order/get/${param0} */
export async function OutInspectionTaskGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionTaskGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto>(`/api/wms/out-inspection-task-order/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取出库检验任务 GET /api/wms/out-inspection-task-order/list */
export async function OutInspectionTaskGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInspectionTaskGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto>('/api/wms/out-inspection-task-order/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** QC复核确认 POST /api/wms/out-inspection-task-order/qc-check */
export async function OutInspectionTaskQcCheckAsync(body: API.BurnAbpWMS_chuku_chukujianyanrenwuQcInspectionResolveDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukujianyanrenwuOutInspectionTaskDto>('/api/wms/out-inspection-task-order/qc-check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
