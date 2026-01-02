// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/wms/warehouse-man */
export async function WarehouseManIntegrationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WarehouseManIntegrationGetAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_cangguanyuanWarehouseManDto>('/integration-api/wms/warehouse-man', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
