// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建物权信息 POST /api/wms/real-right-info/create */
export async function RealRightInfoCreateAsync(body: API.BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto>('/api/wms/real-right-info/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除物权信息 POST /api/wms/real-right-info/delete/${param0} */
export async function RealRightInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealRightInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/real-right-info/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据ID查询物权信息 GET /api/wms/real-right-info/get/${param0} */
export async function RealRightInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealRightInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto>(`/api/wms/real-right-info/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 查询所有物权信息 GET /api/wms/real-right-info/list */
export async function RealRightInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealRightInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto>('/api/wms/real-right-info/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新物权信息 POST /api/wms/real-right-info/update/${param0} */
export async function RealRightInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RealRightInfoUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuquanxinxiRealRightInfoDto>(`/api/wms/real-right-info/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
