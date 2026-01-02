// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /integration-api/wms/out-instruction-order */
export async function OutInstructionOrderIntegrationCreateAsync(body: API.BurnAbpWMS_neibufuwu_chukuzhilingOutInstructionOrderIntegrationDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderDto>('/integration-api/wms/out-instruction-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/wms/out-instruction-order/and-execute */
export async function OutInstructionOrderIntegrationCreateAndExecuteAsync(
	body: API.BurnAbpWMS_neibufuwu_chukuzhilingCreateAndExecuteOutInstructionOrderInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderDto>('/integration-api/wms/out-instruction-order/and-execute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/wms/out-instruction-order/delete */
export async function OutInstructionOrderIntegrationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderIntegrationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/wms/out-instruction-order/delete', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
