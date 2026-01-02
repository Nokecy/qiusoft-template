// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand-merge-rule */
export async function OutInstructionDemandMergeRuleGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandMergeRuleGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto>('/api/wms/out-instruction-demand-merge-rule', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/out-instruction-demand-merge-rule */
export async function OutInstructionDemandMergeRuleCreateAsync(
	body: API.BurnAbpWMS_chuku_chukuxuqiuhebingcelveCreateUpdateOutInstructionDemandMergeRuleDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto>('/api/wms/out-instruction-demand-merge-rule', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction-demand-merge-rule/${param0} */
export async function OutInstructionDemandMergeRuleGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandMergeRuleGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto>(`/api/wms/out-instruction-demand-merge-rule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/out-instruction-demand-merge-rule/${param0} */
export async function OutInstructionDemandMergeRuleUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandMergeRuleUpdateAsyncParams,
	body: API.BurnAbpWMS_chuku_chukuxuqiuhebingcelveCreateUpdateOutInstructionDemandMergeRuleDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuxuqiuhebingcelveOutInstructionDemandMergeRuleDto>(`/api/wms/out-instruction-demand-merge-rule/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/out-instruction-demand-merge-rule/${param0} */
export async function OutInstructionDemandMergeRuleDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionDemandMergeRuleDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction-demand-merge-rule/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
