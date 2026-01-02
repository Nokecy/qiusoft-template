// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/data-source-config */
export async function BnrDataSourceConfigGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto>('/api/bnr-management/data-source-config', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/data-source-config */
export async function BnrDataSourceConfigCreateAsync(
	body: API.BurnAbpBNRManagementApplicationContractsDataSourcesCreateOrUpdateBnrDataSourceConfigDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto>('/api/bnr-management/data-source-config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/data-source-config/${param0} */
export async function BnrDataSourceConfigGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto>(`/api/bnr-management/data-source-config/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/bnr-management/data-source-config/${param0} */
export async function BnrDataSourceConfigUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigUpdateAsyncParams,
	body: API.BurnAbpBNRManagementApplicationContractsDataSourcesCreateOrUpdateBnrDataSourceConfigDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto>(`/api/bnr-management/data-source-config/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/bnr-management/data-source-config/${param0} */
export async function BnrDataSourceConfigDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/bnr-management/data-source-config/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/data-source-config/${param0}/test-connection */
export async function BnrDataSourceConfigTestConnectionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigTestConnectionAsyncParams,
	body: Record<string, any>,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnDataSourcesDataSourceTestResult>(`/api/bnr-management/data-source-config/${param0}/test-connection`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/data-source-config/${param0}/validate */
export async function BnrDataSourceConfigValidateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigValidateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnDataSourcesDataSourceValidationResult>(`/api/bnr-management/data-source-config/${param0}/validate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/data-source-config/by-rule-name/${param0} */
export async function BnrDataSourceConfigGetByRuleNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BnrDataSourceConfigGetByRuleNameAsyncParams,
	options?: { [key: string]: any }
) {
	const { ruleName: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationContractsDataSourcesBnrDataSourceConfigDto>(`/api/bnr-management/data-source-config/by-rule-name/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
