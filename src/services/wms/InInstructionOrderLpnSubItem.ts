// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/inInstruction-order-lpn-subitem */
export async function InInstructionOrderLpnSubItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnSubItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingxiangpicimingxiInInstructionOrderLpnSubItemDto>('/api/wms/inInstruction-order-lpn-subitem', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/inInstruction-order-lpn-subitem/${param0} */
export async function InInstructionOrderLpnSubItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnSubItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingxiangpicimingxiInInstructionOrderLpnSubItemDto>(`/api/wms/inInstruction-order-lpn-subitem/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
