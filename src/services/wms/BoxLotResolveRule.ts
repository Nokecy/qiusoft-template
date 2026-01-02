// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/box-lot-resolve-rule */
export async function BoxLotResolveRuleGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BoxLotResolveRuleGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto>('/api/wms/box-lot-resolve-rule', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/box-lot-resolve-rule */
export async function BoxLotResolveRuleCreateAsync(body: API.BurnAbpWMS_ruku_rukupicitiaomajiexiCreateOrUpdateBoxLotResolveRuleInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto>('/api/wms/box-lot-resolve-rule', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/box-lot-resolve-rule/${param0} */
export async function BoxLotResolveRuleGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BoxLotResolveRuleGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto>(`/api/wms/box-lot-resolve-rule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/box-lot-resolve-rule/${param0} */
export async function BoxLotResolveRuleUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BoxLotResolveRuleUpdateAsyncParams,
	body: API.BurnAbpWMS_ruku_rukupicitiaomajiexiCreateOrUpdateBoxLotResolveRuleInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveRuleDto>(`/api/wms/box-lot-resolve-rule/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/box-lot-resolve-rule/${param0} */
export async function BoxLotResolveRuleDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BoxLotResolveRuleDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/box-lot-resolve-rule/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/box-lot-resolve-rule/${param0}/resolve */
export async function BoxLotResolveRuleResolveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BoxLotResolveRuleResolveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveResultDto>(`/api/wms/box-lot-resolve-rule/${param0}/resolve`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}
