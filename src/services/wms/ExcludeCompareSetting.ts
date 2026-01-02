// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/wms/exclude-compare-setting/create */
export async function ExcludeCompareSettingCreateAsync(body: API.BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto>('/api/wms/exclude-compare-setting/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/exclude-compare-setting/delete/${param0} */
export async function ExcludeCompareSettingDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ExcludeCompareSettingDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/exclude-compare-setting/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/exclude-compare-setting/get-compare-type */
export async function ExcludeCompareSettingGetCompareTypes(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiCompareTypeDto[]>('/api/wms/exclude-compare-setting/get-compare-type', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/exclude-compare-setting/get/${param0} */
export async function ExcludeCompareSettingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ExcludeCompareSettingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto>(`/api/wms/exclude-compare-setting/get/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/exclude-compare-setting/list */
export async function ExcludeCompareSettingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ExcludeCompareSettingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto>('/api/wms/exclude-compare-setting/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/exclude-compare-setting/update/${param0} */
export async function ExcludeCompareSettingUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ExcludeCompareSettingUpdateAsyncParams,
	body: API.BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_kucunduizhang_kucunduizhangpeizhiExcludeCompareSettingDto>(`/api/wms/exclude-compare-setting/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
