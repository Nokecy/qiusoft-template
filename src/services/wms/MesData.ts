// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取载具下层箱以及编码数据 GET /api/wms/mes-data/boxlist/by-traceId/${param0} */
export async function MesDataGetTraceIdBoxListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MesDataGetTraceIdBoxListAsyncParams,
	options?: { [key: string]: any }
) {
	const { traceId: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_1MESshujuMesDataDto>(`/api/wms/mes-data/boxlist/by-traceId/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取SN信息 GET /api/wms/mes-data/by-serialnumber */
export async function MesDataGetBySerialNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MesDataGetBySerialNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMSMEStiaomalaiyuanProductBarCodeInfo>('/api/wms/mes-data/by-serialnumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取箱号下层编码数据 GET /api/wms/mes-data/snList/by-boxNumber/${param0} */
export async function MesDataGetSNListByBoxNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MesDataGetSNListByBoxNumberAsyncParams,
	options?: { [key: string]: any }
) {
	const { boxNumber: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_1MESshujuMesDataDto>(`/api/wms/mes-data/snList/by-boxNumber/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
