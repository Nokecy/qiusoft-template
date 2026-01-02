// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/label-print-setting */
export async function LabelPrintSettingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintSettingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto>('/api/label-management/label-print-setting', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-setting */
export async function LabelPrintSettingCreateAsync(body: API.BurnAbpLabelManagementLabelPrintSettingsCreateLabelSettingInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto>('/api/label-management/label-print-setting', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-print-setting/${param0} */
export async function LabelPrintSettingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintSettingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto>(`/api/label-management/label-print-setting/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-setting/${param0}/delete */
export async function LabelPrintSettingDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintSettingDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/label-management/label-print-setting/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-setting/${param0}/update */
export async function LabelPrintSettingUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintSettingUpdateAsyncParams,
	body: API.BurnAbpLabelManagementLabelPrintSettingsUpdateLabelSettingInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintSettingsLabelPrintSettingDto>(`/api/label-management/label-print-setting/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-setting/simulate-rule */
export async function LabelPrintSettingSimulateRuleAsync(body: API.BurnAbpLabelManagementLabelPrintSettingsSimulateRuleInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintSettingsRuleSimulationResult>('/api/label-management/label-print-setting/simulate-rule', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-setting/validate-rule */
export async function LabelPrintSettingValidateRuleAsync(body: API.BurnAbpLabelManagementLabelPrintSettingsValidateRuleInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintSettingsRuleValidationResult>('/api/label-management/label-print-setting/validate-rule', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
