// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取下架任务信息 GET /api/wms/shipment-allocation/${param0} */
export async function PickTaskItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>(`/api/wms/shipment-allocation/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 分配或更改下架任务处理人 POST /api/wms/shipment-allocation/assign-handler */
export async function PickTaskItemAssignHandlerAsync(body: API.BurnAbpWMS_chuku_chukuzhilingmingxiAssignHandlerInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/shipment-allocation/assign-handler', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 导出下架任务 GET /api/wms/shipment-allocation/export */
export async function PickTaskItemExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/shipment-allocation/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取下架任务列表 GET /api/wms/shipment-allocation/list */
export async function PickTaskItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/shipment-allocation/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据出库指令Id生成下架任务 GET /api/wms/shipment-allocation/list/by-shipment */
export async function PickTaskItemGetListByShipmentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemGetListByShipmentAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/shipment-allocation/list/by-shipment', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据traceId 获取下架任务信息 GET /api/wms/shipment-allocation/list/by-zone */
export async function PickTaskItemGetListByZoneAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemGetListByZoneAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/shipment-allocation/list/by-zone', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 手动分配任务LPN位置 POST /api/wms/shipment-allocation/manual-allocation */
export async function PickTaskItemManualAllocationAsync(body: API.BurnAbpWMS_chuku_chukuzhilingmingxiManualAllocationPickTaskDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/shipment-allocation/manual-allocation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取我的下架任务列表 GET /api/wms/shipment-allocation/my-task-list */
export async function PickTaskItemGetMyTaskListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemGetMyTaskListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/shipment-allocation/my-task-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 释放下架任务 POST /api/wms/shipment-allocation/release-pick-task */
export async function PickTaskItemReleasePickTaskAsync(body: string[], options?: { [key: string]: any }) {
	return request<any>('/api/wms/shipment-allocation/release-pick-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据条件获取下架任务统计 GET /api/wms/shipment-allocation/sum */
export async function PickTaskItemGetSumAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PickTaskItemGetSumAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingmingxiPickTaskSumDto>('/api/wms/shipment-allocation/sum', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
