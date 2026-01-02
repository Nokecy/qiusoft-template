// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取预警推送规则 GET /api/wms/overduePushRule/${param0} */
export async function OverduePushRuleGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OverduePushRuleGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto>(`/api/wms/overduePushRule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建库存超期预警推送规则 POST /api/wms/overduePushRule/create */
export async function OverduePushRuleCreateAsync(body: API.BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto>('/api/wms/overduePushRule/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除库存超期预警推送规则 POST /api/wms/overduePushRule/delete/${param0} */
export async function OverduePushRuleDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OverduePushRuleDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/overduePushRule/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取预警推送规则列表 GET /api/wms/overduePushRule/list */
export async function OverduePushRuleGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OverduePushRuleGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto>('/api/wms/overduePushRule/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新预警推送规则数据 POST /api/wms/overduePushRule/update/${param0} */
export async function OverduePushRuleUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OverduePushRuleUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_chaoqiyujingtuisongguizeOverduePushRuleDto>(`/api/wms/overduePushRule/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
