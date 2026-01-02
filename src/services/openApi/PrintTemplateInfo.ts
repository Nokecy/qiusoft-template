// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/print-template-info */
export async function PrintTemplateInfoGetListAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>('/api/PrintTemplateManagement/print-template-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/print-template-info */
export async function PrintTemplateInfoCreateAsync_2(body: API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>('/api/PrintTemplateManagement/print-template-info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/print-template-info/${param0} */
export async function PrintTemplateInfoGetAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>(`/api/PrintTemplateManagement/print-template-info/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/print-template-info/${param0}/delete */
export async function PrintTemplateInfoDeleteAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/PrintTemplateManagement/print-template-info/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/print-template-info/${param0}/export-template */
export async function PrintTemplateInfoExportTemplateAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoExportTemplateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/PrintTemplateManagement/print-template-info/${param0}/export-template`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/print-template-info/${param0}/import-template */
export async function PrintTemplateInfoImportTemplateAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoImportTemplateAsyncParams,
	body: {},
	File?: File,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>(`/api/PrintTemplateManagement/print-template-info/${param0}/import-template`, {
		method: 'POST',
		params: { ...queryParams },
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/print-template-info/${param0}/update */
export async function PrintTemplateInfoUpdateAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoUpdateAsyncParams,
	body: API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>(`/api/PrintTemplateManagement/print-template-info/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/print-template-info/print-template-by-code */
export async function PrintTemplateInfoGetPrintTemplateByCodeAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoGetPrintTemplateByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>('/api/PrintTemplateManagement/print-template-info/print-template-by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/printTemplateInfo/${param0} */
export async function PrintTemplateInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>(`/api/PrintTemplateManagement/printTemplateInfo/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/printTemplateInfo/${param0}/export */
export async function PrintTemplateInfoExportTemplateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoExportTemplateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/PrintTemplateManagement/printTemplateInfo/${param0}/export`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/PrintTemplateManagement/printTemplateInfo/${param0}/import */
export async function PrintTemplateInfoImportTemplateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoImportTemplateAsyncParams,
	body: {},
	File?: File,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>(`/api/PrintTemplateManagement/printTemplateInfo/${param0}/import`, {
		method: 'PUT',
		params: { ...queryParams },
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/printTemplateInfo/create */
export async function PrintTemplateInfoCreateAsync(body: API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>('/api/PrintTemplateManagement/printTemplateInfo/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/printTemplateInfo/delete/${param0} */
export async function PrintTemplateInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/PrintTemplateManagement/printTemplateInfo/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/printTemplateInfo/get-template-by-code */
export async function PrintTemplateInfoGetPrintTemplateByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoGetPrintTemplateByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>('/api/PrintTemplateManagement/printTemplateInfo/get-template-by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/printTemplateInfo/list */
export async function PrintTemplateInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>(
		'/api/PrintTemplateManagement/printTemplateInfo/list',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/printTemplateInfo/update/${param0} */
export async function PrintTemplateInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTemplateInfoUpdateAsyncParams,
	body: API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrintTemplateInfosPrintTemplateInfoDto>(`/api/PrintTemplateManagement/printTemplateInfo/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
