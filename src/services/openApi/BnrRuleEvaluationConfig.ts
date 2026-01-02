// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/rule-evaluation-config */
export async function BnrRuleEvaluationConfigGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleEvaluationConfigGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto>(
		'/api/bnr-management/rule-evaluation-config',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/bnr-management/rule-evaluation-config */
export async function BnrRuleEvaluationConfigCreateAsync(
	body: API.BurnAbpBNRManagementApplicationContractsRuleEvaluationCreateOrUpdateBnrRuleEvaluationConfigDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto>('/api/bnr-management/rule-evaluation-config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-evaluation-config/${param0} */
export async function BnrRuleEvaluationConfigGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleEvaluationConfigGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto>(`/api/bnr-management/rule-evaluation-config/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/bnr-management/rule-evaluation-config/${param0} */
export async function BnrRuleEvaluationConfigUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleEvaluationConfigUpdateAsyncParams,
	body: API.BurnAbpBNRManagementApplicationContractsRuleEvaluationCreateOrUpdateBnrRuleEvaluationConfigDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto>(`/api/bnr-management/rule-evaluation-config/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/bnr-management/rule-evaluation-config/${param0} */
export async function BnrRuleEvaluationConfigDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleEvaluationConfigDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/bnr-management/rule-evaluation-config/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-evaluation-config/by-rule-name/${param0} */
export async function BnrRuleEvaluationConfigGetByRuleNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleEvaluationConfigGetByRuleNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { ruleName: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsRuleEvaluationBnrRuleEvaluationConfigDto[]>(`/api/bnr-management/rule-evaluation-config/by-rule-name/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
