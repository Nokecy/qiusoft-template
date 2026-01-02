// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/property-definitions */
export async function BnrPropertyDefinitionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrPropertyDefinitionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto>(
		'/api/bnr-management/property-definitions',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/bnr-management/property-definitions */
export async function BnrPropertyDefinitionCreateAsync(
	body: API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateOrUpdateBnrPropertyDefinitionDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto>('/api/bnr-management/property-definitions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/property-definitions/${param0} */
export async function BnrPropertyDefinitionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrPropertyDefinitionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto>(`/api/bnr-management/property-definitions/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/bnr-management/property-definitions/${param0} */
export async function BnrPropertyDefinitionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrPropertyDefinitionUpdateAsyncParams,
	body: API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsCreateOrUpdateBnrPropertyDefinitionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsBnrRuleDefinitionsBnrPropertyDefinitionDto>(`/api/bnr-management/property-definitions/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/bnr-management/property-definitions/${param0} */
export async function BnrPropertyDefinitionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrPropertyDefinitionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/bnr-management/property-definitions/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
