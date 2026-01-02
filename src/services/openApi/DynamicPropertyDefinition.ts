// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/label-management/dynamic-property-definition */
export async function DynamicPropertyDefinitionCreateAsync(
	body: API.BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosCreateDynamicPropertyDefinitionDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosDynamicPropertyDefinitionDto>('/api/label-management/dynamic-property-definition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/dynamic-property-definition/${param0} */
export async function DynamicPropertyDefinitionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicPropertyDefinitionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosDynamicPropertyDefinitionDto>(`/api/label-management/dynamic-property-definition/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/dynamic-property-definition/${param0}/delete */
export async function DynamicPropertyDefinitionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicPropertyDefinitionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/label-management/dynamic-property-definition/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/dynamic-property-definition/${param0}/update */
export async function DynamicPropertyDefinitionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicPropertyDefinitionUpdateAsyncParams,
	body: API.BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosUpdateDynamicPropertyDefinitionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosDynamicPropertyDefinitionDto>(
		`/api/label-management/dynamic-property-definition/${param0}/update`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			params: { ...queryParams },
			data: body,
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 GET /api/label-management/dynamic-property-definition/by-feature */
export async function DynamicPropertyDefinitionGetListByFeatureAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DynamicPropertyDefinitionGetListByFeatureAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementApplicationContractsPropertyDefinitionsDtosDynamicPropertyDefinitionDto[]>(
		'/api/label-management/dynamic-property-definition/by-feature',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}
