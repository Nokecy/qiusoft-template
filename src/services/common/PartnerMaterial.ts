// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/partner-material */
export async function PartnerMaterialGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartnerMaterialGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonPartnerMaterialsPartnerMaterialDto>('/api/common/partner-material', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/partner-material */
export async function PartnerMaterialCreateAsync(body: API.BurnAbpErpCommonPartnerMaterialsCreatePartnerMaterialInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonPartnerMaterialsPartnerMaterialDto>('/api/common/partner-material', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/partner-material/${param0} */
export async function PartnerMaterialGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartnerMaterialGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonPartnerMaterialsPartnerMaterialDto>(`/api/common/partner-material/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/partner-material/${param0}/delete */
export async function PartnerMaterialDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartnerMaterialDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/partner-material/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/partner-material/${param0}/update */
export async function PartnerMaterialUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartnerMaterialUpdateAsyncParams,
	body: API.BurnAbpErpCommonPartnerMaterialsUpdatePartnerMaterialInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonPartnerMaterialsPartnerMaterialDto>(`/api/common/partner-material/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/partner-material/export */
export async function PartnerMaterialExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartnerMaterialExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/partner-material/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/partner-material/import */
export async function PartnerMaterialImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/partner-material/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/partner-material/import-template */
export async function PartnerMaterialGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/partner-material/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
