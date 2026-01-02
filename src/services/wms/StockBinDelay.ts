// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 库存延期记录列表 GET /api/wms/stock-bin-delay/getlist */
export async function StockBinDelayGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinDelayGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunyanqiStockBinDelayDto>('/api/wms/stock-bin-delay/getlist', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
