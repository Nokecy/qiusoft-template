// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /integration-api/wms/in-instruction-order */
export async function InInstructionOrderIntegrationCreateAsync(body: API.BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderIntegrationDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderIntegrationDto>('/integration-api/wms/in-instruction-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/wms/in-instruction-order/and-execute */
export async function InInstructionOrderIntegrationCreateAndExecuteAsync(
	body: API.BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderIntegrationDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_neibufuwu_rukuzhilingInInstructionOrderIntegrationDto>('/integration-api/wms/in-instruction-order/and-execute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /integration-api/wms/in-instruction-order/delete */
export async function InInstructionOrderIntegrationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderIntegrationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/wms/in-instruction-order/delete', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
