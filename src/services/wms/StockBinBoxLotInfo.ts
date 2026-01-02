// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/stock-bin-box-lot-Info */
export async function StockBinBoxLotInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxLotInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinBoxLotInfoDto>('/api/wms/stock-bin-box-lot-Info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/stock-bin-box-lot-Info/${param0} */
export async function StockBinBoxLotInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinBoxLotInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_kucun_kucunliebiaoStockBinBoxLotInfoDto>(`/api/wms/stock-bin-box-lot-Info/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
