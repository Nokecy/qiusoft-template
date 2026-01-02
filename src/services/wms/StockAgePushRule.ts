// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取库龄推送规则数据 GET /api/wms/stock-age-push-rule/${param0} */
export async function StockAgePushRuleGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockAgePushRuleGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto>(`/api/wms/stock-age-push-rule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建库龄推送规则 POST /api/wms/stock-age-push-rule/create */
export async function StockAgePushRuleCreateAsync(body: API.BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto>('/api/wms/stock-age-push-rule/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除库龄推送规则 POST /api/wms/stock-age-push-rule/delete/${param0} */
export async function StockAgePushRuleDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockAgePushRuleDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/stock-age-push-rule/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取库龄推送规则列表 GET /api/wms/stock-age-push-rule/list */
export async function StockAgePushRuleGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockAgePushRuleGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto>('/api/wms/stock-age-push-rule/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新库龄推送规则信息 POST /api/wms/stock-age-push-rule/update/${param0} */
export async function StockAgePushRuleUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockAgePushRuleUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_kulingyujingtuisongguizeStockAgePushRuleDto>(`/api/wms/stock-age-push-rule/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
