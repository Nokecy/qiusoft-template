// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** ERP库存对账 POST /api/wms/store-data-compare/compare */
export async function StoreDataCompareCompareAsyn(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StoreDataCompareCompareAsynParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/store-data-compare/compare', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
