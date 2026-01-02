// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 检查序列号是否存在于LPN上如果存在返回LPN 箱号信息 GET /api/wms/stock-bin-snInfo/check-serial-number */
export async function StockBinSnInfoCheckSerialNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinSnInfoCheckSerialNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunSNliebiaoStockBinSNInfoDto>('/api/wms/stock-bin-snInfo/check-serial-number', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导出信息 GET /api/wms/stock-bin-snInfo/export */
export async function StockBinSnInfoExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinSnInfoExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/stock-bin-snInfo/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取序列号信息列表 GET /api/wms/stock-bin-snInfo/list */
export async function StockBinSnInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinSnInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunSNliebiaoStockBinSNInfoDto>('/api/wms/stock-bin-snInfo/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
