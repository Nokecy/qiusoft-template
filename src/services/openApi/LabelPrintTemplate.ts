// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/label-print-template */
export async function LabelPrintTemplateGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>('/api/label-management/label-print-template', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template */
export async function LabelPrintTemplateCreateAsync(body: API.BurnAbpLabelManagementLabelPrintTemplatesCreateLabelPrintTemplateInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>('/api/label-management/label-print-template', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-print-template/${param0} */
export async function LabelPrintTemplateGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(`/api/label-management/label-print-template/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-print-template/${param0}/atl */
export async function LabelPrintTemplateGetAtlAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateGetAtlAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnLabelEngineModelsAtlTemplate>(`/api/label-management/label-print-template/${param0}/atl`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/${param0}/clone */
export async function LabelPrintTemplateCloneAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateCloneAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(`/api/label-management/label-print-template/${param0}/clone`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/${param0}/delete */
export async function LabelPrintTemplateDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/label-management/label-print-template/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-print-template/${param0}/export-atl */
export async function LabelPrintTemplateExportAtlAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateExportAtlAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/label-management/label-print-template/${param0}/export-atl`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-print-template/${param0}/export-prn */
export async function LabelPrintTemplateExportPrnAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateExportPrnAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/label-management/label-print-template/${param0}/export-prn`, {
		method: 'GET',
		params: {
			...queryParams,
			Data: undefined,
			...queryParams['Data'],
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/${param0}/update */
export async function LabelPrintTemplateUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateUpdateAsyncParams,
	body: API.BurnAbpLabelManagementLabelPrintTemplatesUpdateLabelPrintTemplateInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(`/api/label-management/label-print-template/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/${param0}/update-atl */
export async function LabelPrintTemplateUpdateAtlAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelPrintTemplateUpdateAtlAsyncParams,
	body: API.BurnAbpLabelManagementLabelPrintTemplatesUpdateAtlTemplateInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(`/api/label-management/label-print-template/${param0}/update-atl`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/from-atl */
export async function LabelPrintTemplateCreateFromAtlAsync(body: API.BurnAbpLabelManagementLabelPrintTemplatesCreateAtlTemplateInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>('/api/label-management/label-print-template/from-atl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/import-atl */
export async function LabelPrintTemplateImportAtlAsync(body: API.BurnAbpLabelManagementLabelPrintTemplatesImportAtlTemplateInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>('/api/label-management/label-print-template/import-atl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/render-to-image */
export async function LabelPrintTemplateRenderToImageAsync(body: API.BurnAbpLabelManagementLabelPrintTemplatesRenderToImageInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesRenderImageOutput>('/api/label-management/label-print-template/render-to-image', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-print-template/render-with-data */
export async function LabelPrintTemplateRenderWithDataAsync(body: API.BurnAbpLabelManagementLabelPrintTemplatesRenderWithDataInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelPrintTemplatesRenderImageOutput>('/api/label-management/label-print-template/render-with-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
