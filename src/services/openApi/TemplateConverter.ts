// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/label-management/template-converter/convert */
export async function TemplateConverterConvertAsync(body: API.BurnAbpLabelManagementTemplateConverterConvertTemplateInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementTemplateConverterConvertTemplateOutput>('/api/label-management/template-converter/convert', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/template-converter/converter-name */
export async function TemplateConverterGetConverterNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TemplateConverterGetConverterNameAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/label-management/template-converter/converter-name', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/template-converter/supported-languages */
export async function TemplateConverterGetSupportedLanguagesAsync(options?: { [key: string]: any }) {
	return request<API.BurnLabelEngineModelsEnumsPrintTemplateType[]>('/api/label-management/template-converter/supported-languages', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/template-converter/test-all-data-sources */
export async function TemplateConverterTestAllDataSourcesAsync(body: API.BurnLabelEngineModelsAtlTemplate, options?: { [key: string]: any }) {
	return request<Record<string, any>>('/api/label-management/template-converter/test-all-data-sources', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/template-converter/test-data-source */
export async function TemplateConverterTestDataSourceAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TemplateConverterTestDataSourceAsyncParams,
	body: API.BurnLabelEngineModelsAtlDataSource,
	options?: { [key: string]: any }
) {
	return request<API.BurnDataSourcesDataSourceTestResult>('/api/label-management/template-converter/test-data-source', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/template-converter/validate */
export async function TemplateConverterValidateAsync(body: API.BurnAbpLabelManagementTemplateConverterValidateTemplateInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementTemplateConverterTemplateValidationResult>('/api/label-management/template-converter/validate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
