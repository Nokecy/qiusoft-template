// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand */
export async function OutInstructionDemandGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandDto>('/api/wms/out-instruction-demand', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand/${param0} */
export async function OutInstructionDemandGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandDto>(`/api/wms/out-instruction-demand/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-instruction-demand/delete/${param0} */
export async function OutInstructionDemandDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction-demand/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand/demand-items/${param0}/${param1} */
export async function OutInstructionDemandGetDemandItemsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandGetDemandItemsAsyncParams,
	options?: { [key: string]: any }
) {
	const { outInstructionOrderId: param0, materialCode: param1, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemWithOutInstructionDemandDto[]>(`/api/wms/out-instruction-demand/demand-items/${param0}/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-instruction-demand/merge */
export async function OutInstructionDemandMergeAsync(body: API.BurnAbpWMS_chuku_chukuxuqiuMegerOutInstructionDemandDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/out-instruction-demand/merge', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-instruction-demand/re-call-back */
export async function OutInstructionDemandReCallBackAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandReCallBackAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/out-instruction-demand/re-call-back', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-instruction-demand/re-call-back-item */
export async function OutInstructionDemandReCallBackItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandReCallBackItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/out-instruction-demand/re-call-back-item', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
