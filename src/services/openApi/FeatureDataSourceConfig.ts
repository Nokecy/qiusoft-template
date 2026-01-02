// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/feature-data-source-config */
export async function FeatureDataSourceConfigGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeatureDataSourceConfigGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto>(
		'/api/label-management/feature-data-source-config',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/label-management/feature-data-source-config */
export async function FeatureDataSourceConfigCreateAsync(
	body: API.BurnAbpLabelManagementLabelPrintFeatureDataSourcesCreateFeatureDataSourceConfigDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto>('/api/label-management/feature-data-source-config', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/feature-data-source-config/${param0} */
export async function FeatureDataSourceConfigGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeatureDataSourceConfigGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto>(`/api/label-management/feature-data-source-config/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/feature-data-source-config/${param0}/delete */
export async function FeatureDataSourceConfigDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeatureDataSourceConfigDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/label-management/feature-data-source-config/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/feature-data-source-config/${param0}/update */
export async function FeatureDataSourceConfigUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeatureDataSourceConfigUpdateAsyncParams,
	body: API.BurnAbpLabelManagementLabelPrintFeatureDataSourcesUpdateFeatureDataSourceConfigDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto>(`/api/label-management/feature-data-source-config/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/feature-data-source-config/by-print-feature-code */
export async function FeatureDataSourceConfigGetByPrintFeatureCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.FeatureDataSourceConfigGetByPrintFeatureCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementLabelPrintFeatureDataSourcesFeatureDataSourceConfigDto>('/api/label-management/feature-data-source-config/by-print-feature-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
