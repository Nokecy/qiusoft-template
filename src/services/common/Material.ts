// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/material */
export async function MaterialGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialsMaterialDto>('/api/common/material', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建物料 POST /api/common/material */
export async function MaterialCreateAsync(body: API.BurnAbpErpCommonMaterialManagementMaterialsCreateMaterialInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialManagementMaterialsMaterialDto>('/api/common/material', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material/${param0} */
export async function MaterialGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialsMaterialDto>(`/api/common/material/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/material/${param0}/delete */
export async function MaterialDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/material/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新物料 POST /api/common/material/${param0}/update */
export async function MaterialUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialUpdateAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementMaterialsUpdateMaterialInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialsMaterialDto>(`/api/common/material/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material/attribute-form/${param0} */
export async function MaterialGetAttributeFormAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialGetAttributeFormAsyncParams,
	options?: { [key: string]: any }
) {
	const { materialId: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialsFormilySchemaDto>(`/api/common/material/attribute-form/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据编码获取物料 GET /api/common/material/by-code */
export async function MaterialGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementMaterialsMaterialDto>('/api/common/material/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material/export */
export async function MaterialExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/material/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/material/import */
export async function MaterialImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/material/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material/import-template */
export async function MaterialGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/material/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material/material-attribute-list/${param0} */
export async function MaterialGetMaterialAttributeListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialGetMaterialAttributeListAsyncParams,
	options?: { [key: string]: any }
) {
	const { materialId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpErpCommonMaterialManagementAttributesAttributeDto>(`/api/common/material/material-attribute-list/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
