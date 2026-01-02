// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /integration-api/wms/auto-in-and-out/auto-order-and-execute */
export async function AutoInAndOutIntegrationCreateAutoOrderAndExecuteAsync(
	body: API.BurnAbpWMS_neibufuwu_zidongchurukuAutoInAndOutInputIntegrationDto,
	options?: { [key: string]: any }
) {
	return request<any>('/integration-api/wms/auto-in-and-out/auto-order-and-execute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
