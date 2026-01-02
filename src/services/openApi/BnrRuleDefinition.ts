// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition */
export async function BnrRuleDefinitionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleDefinitionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto>('/api/bnr-management/rule-definition', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/bnr-management/rule-definition */
export async function BnrRuleDefinitionUpdateAsync(
	body: API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsUpdateBnrRuleDefinitionInput,
	options?: { [key: string]: any }
) {
	return request<any>('/api/bnr-management/rule-definition', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/rule-definition */
export async function BnrRuleDefinitionCreateAsync(
	body: API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateBnrRuleDefinitionInput,
	options?: { [key: string]: any }
) {
	return request<any>('/api/bnr-management/rule-definition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition/${param0} */
export async function BnrRuleDefinitionGetRulesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleDefinitionGetRulesAsyncParams,
	options?: { [key: string]: any }
) {
	const { ruleName: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto[]>(`/api/bnr-management/rule-definition/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/bnr-management/rule-definition/${param0}/${param1} */
export async function BnrRuleDefinitionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleDefinitionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { ruleName: param0, name: param1, ...queryParams } = params;
	return request<any>(`/api/bnr-management/rule-definition/${param0}/${param1}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition/${param0}/properties */
export async function BnrRuleDefinitionGetPropertiesByRuleNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleDefinitionGetPropertiesByRuleNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { ruleName: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto[]>(`/api/bnr-management/rule-definition/${param0}/properties`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition/by-group-name/${param0} */
export async function BnrRuleDefinitionGetRulesByGroupNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleDefinitionGetRulesByGroupNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { groupName: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto[]>(`/api/bnr-management/rule-definition/by-group-name/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition/dynamic-rules */
export async function BnrRuleDefinitionGetDynamicRulesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrRuleDefinitionGetDynamicRulesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto[]>('/api/bnr-management/rule-definition/dynamic-rules', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition/groups */
export async function BnrRuleDefinitionGetGroupsAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleGroupDefinitionDto[]>('/api/bnr-management/rule-definition/groups', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/rule-definition/static-rules */
export async function BnrRuleDefinitionGetStaticRulesAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrRuleDefinitionDto[]>('/api/bnr-management/rule-definition/static-rules', {
		method: 'GET',
		...(options || {}),
	});
}
