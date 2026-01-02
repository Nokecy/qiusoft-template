// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取盘点任务明细 GET /api/wms/count-order-task-item/${param0}/detail/${param1} */
export async function CountOrderTaskItemGetCountOrderTaskItemDetailAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderTaskItemGetCountOrderTaskItemDetailAsyncParams,
	options?: { [key: string]: any }
) {
	const { taskNo: param0, boxNumber: param1, ...queryParams } = params;
	return request<API.BurnAbpWMS_pandian_pandianrenwuCountOrderBoxInfoDto>(`/api/wms/count-order-task-item/${param0}/detail/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取盘点任务清单列表 GET /api/wms/count-order-task-item/list */
export async function CountOrderTaskItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderTaskItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianrenwuCountOrderTaskItemDto>('/api/wms/count-order-task-item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取单个盘点任务信息 GET /api/wms/count-order-task-item/lpn-info */
export async function CountOrderTaskItemGetLpnInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderTaskItemGetLpnInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_pandian_pandianrenwuCountOrderLpnInfoDto>('/api/wms/count-order-task-item/lpn-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 提交盘点结果信息 POST /api/wms/count-order-task-item/submit-count-result */
export async function CountOrderTaskItemSubmitCountResultAsync(body: API.BurnAbpWMS_pandian_pandianrenwuSubmitCountTaskItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/count-order-task-item/submit-count-result', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 提交新的盘点任务(盘点清单不存在的LPN盘点) POST /api/wms/count-order-task-item/submit-new-count-task-item */
export async function CountOrderTaskItemSubmitNewCountTaskItemAsync(body: API.BurnAbpWMS_pandian_pandianrenwuSubmitNewCountTaskItemDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_pandian_pandianrenwuCountOrderTaskItemDto>('/api/wms/count-order-task-item/submit-new-count-task-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
