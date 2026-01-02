// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/label-print-feature-definition */
export async function LabelPrintFeatureDefinitionGetListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto>(
		'/api/label-management/label-print-feature-definition',
		{
			method: 'GET',
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 GET /api/label-management/label-print-feature-definition/property-schema */
export async function LabelPrintFeatureDefinitionGetPropertySchemaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintFeatureDefinitionGetPropertySchemaAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpLabelManagementLabelPrintFeaturesPropertySchemaDto>('/api/label-management/label-print-feature-definition/property-schema', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
