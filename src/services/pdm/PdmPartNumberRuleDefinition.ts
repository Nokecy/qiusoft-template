// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/pdm-part-number-rule-definition */
export async function PdmPartNumberRuleDefinitionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PdmPartNumberRuleDefinitionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto>('/api/pdm/pdm-part-number-rule-definition', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/pdm-part-number-rule-definition */
export async function PdmPartNumberRuleDefinitionCreateAsync(body: API.BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionCreateUpdateDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto>('/api/pdm/pdm-part-number-rule-definition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/pdm-part-number-rule-definition/${param0} */
export async function PdmPartNumberRuleDefinitionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PdmPartNumberRuleDefinitionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto>(`/api/pdm/pdm-part-number-rule-definition/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/pdm-part-number-rule-definition/${param0}/delete */
export async function PdmPartNumberRuleDefinitionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PdmPartNumberRuleDefinitionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/pdm-part-number-rule-definition/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/pdm-part-number-rule-definition/${param0}/set-default */
export async function PdmPartNumberRuleDefinitionSetDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PdmPartNumberRuleDefinitionSetDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/pdm-part-number-rule-definition/${param0}/set-default`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/pdm-part-number-rule-definition/${param0}/update */
export async function PdmPartNumberRuleDefinitionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PdmPartNumberRuleDefinitionUpdateAsyncParams,
	body: API.BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionCreateUpdateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBnrIntegrationDtosPdmPartNumberRuleDefinitionDto>(`/api/pdm/pdm-part-number-rule-definition/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
