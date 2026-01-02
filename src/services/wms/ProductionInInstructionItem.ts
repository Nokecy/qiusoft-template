// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据任务令号 创建流水入库指令 POST /api/wms/product_ininstruction-item/create-ininstruction */
export async function ProductionInInstructionItemCreateInInstructionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductionInInstructionItemCreateInInstructionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/product_ininstruction-item/create-ininstruction', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取流水入库指令明细 GET /api/wms/product_ininstruction-item/list */
export async function ProductionInInstructionItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductionInInstructionItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_liushuirukujiluProductionInInstructionItemDto>('/api/wms/product_ininstruction-item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
