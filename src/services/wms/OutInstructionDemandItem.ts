// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand-item */
export async function OutInstructionDemandItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto>('/api/wms/out-instruction-demand-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand-item/${param0} */
export async function OutInstructionDemandItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto>(`/api/wms/out-instruction-demand-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据出库指令ID和物料ID查询出库需求明细 POST /api/wms/out-instruction-demand-item/by-out-instruction-order-and-material */
export async function OutInstructionDemandItemGetItemsByOutInstructionOrderIdAndMaterialIdAsync(
	body: API.BurnAbpWMS_chuku_chukuxuqiuGetItemsByOutInstructionOrderIdAndMaterialIdInput,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuOutInstructionDemandItemDto>(
		'/api/wms/out-instruction-demand-item/by-out-instruction-order-and-material',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: body,
			...(options || {}),
		}
	);
}
