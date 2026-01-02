// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/bnr-resolve-rule/${param0} */
export async function BNRResolveRuleDefinitionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRResolveRuleDefinitionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto>(`/api/bnr-management/bnr-resolve-rule/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/bnr-resolve-rule/create */
export async function BNRResolveRuleDefinitionCreateAsync(body: API.BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto>('/api/bnr-management/bnr-resolve-rule/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/bnr-resolve-rule/delete/${param0} */
export async function BNRResolveRuleDefinitionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRResolveRuleDefinitionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/bnr-management/bnr-resolve-rule/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/bnr-resolve-rule/list */
export async function BNRResolveRuleDefinitionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRResolveRuleDefinitionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto>('/api/bnr-management/bnr-resolve-rule/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/bnr-resolve-rule/mock */
export async function BNRResolveRuleDefinitionMockResolveAsync(body: API.BurnAbpBNRManagementBNRResolveRulesMockResolveInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpBNRManagementBNRResolveRulesBNRResolveResultDto>('/api/bnr-management/bnr-resolve-rule/mock', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/bnr-resolve-rule/update/${param0} */
export async function BNRResolveRuleDefinitionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRResolveRuleDefinitionUpdateAsyncParams,
	body: API.BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementBNRResolveRulesBNRResolveRuleDefinitionDto>(`/api/bnr-management/bnr-resolve-rule/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
