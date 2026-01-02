// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /integration-api/wms/box-lot-resolve-rule/resolve */
export async function BoxLotResolveRuleIntegrationResolveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BoxLotResolveRuleIntegrationResolveAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_ruku_rukupicitiaomajiexiBoxLotResolveResultDto>('/integration-api/wms/box-lot-resolve-rule/resolve', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
