// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取任务详细信息 GET /api/wms/count-order-task-item-detail/get_detail_by_taskid/${param0} */
export async function CountOrderTaskItemDetailGetTaskItemDetailByTaskId(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderTaskItemDetailGetTaskItemDetailByTaskIdParams,
	options?: { [key: string]: any }
) {
	const { countTaskNo: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_pandian_pandianrenwumingxiCountOrderTaskItemDetailDto[]>(`/api/wms/count-order-task-item-detail/get_detail_by_taskid/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取任务箱信息列表 GET /api/wms/count-order-task-item-detail/list */
export async function CountOrderTaskItemDetailGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderTaskItemDetailGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianrenwumingxiCountOrderTaskItemDetailDto>('/api/wms/count-order-task-item-detail/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 查询差异维护信息 GET /api/wms/count-order-task-item-detail/list-differences */
export async function CountOrderTaskItemDetailGetDifferencessAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderTaskItemDetailGetDifferencessAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianrenwumingxiCountOrderTaskItemDetailDto>(
		'/api/wms/count-order-task-item-detail/list-differences',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 提交差异维护信息 POST /api/wms/count-order-task-item-detail/submit-differences-maintain */
export async function CountOrderTaskItemDetailDifferencesMaintainAsync(body: API.BurnAbpWMS_pandian_pandianrenwumingxiDifferenceResolveDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/count-order-task-item-detail/submit-differences-maintain', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
