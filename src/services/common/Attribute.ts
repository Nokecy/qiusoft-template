// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/attribute */
export async function AttributeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributesAttributeDto>('/api/common/attribute', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute */
export async function AttributeCreateAsync(body: API.BurnAbpErpCommonMaterialManagementAttributesCreateAttributeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto>('/api/common/attribute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/${param0} */
export async function AttributeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto>(`/api/common/attribute/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute/${param0}/delete */
export async function AttributeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/attribute/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute/${param0}/update */
export async function AttributeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeUpdateAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementAttributesUpdateAttributeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto>(`/api/common/attribute/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/attribute-groups-by-attribute/${param0} */
export async function AttributeGetAttributeGroupsByAttributeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGetAttributeGroupsByAttributeAsyncParams,
	options?: { [key: string]: any }
) {
	const { attributeId: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto[]>(`/api/common/attribute/attribute-groups-by-attribute/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/batch */
export async function AttributeGetBatchAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGetBatchAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto[]>('/api/common/attribute/batch', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/by-data-type */
export async function AttributeGetByDataTypeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGetByDataTypeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributesAttributeDto>('/api/common/attribute/by-data-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/by-name */
export async function AttributeGetByNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGetByNameAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto>('/api/common/attribute/by-name', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/export */
export async function AttributeExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/attribute/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute/find-by-display-name */
export async function AttributeFindByDisplayNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeFindByDisplayNameAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto>('/api/common/attribute/find-by-display-name', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute/find-by-name */
export async function AttributeFindByNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeFindByNameAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributesAttributeDto>('/api/common/attribute/find-by-name', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute/import */
export async function AttributeImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/attribute/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute/import-template */
export async function AttributeGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/attribute/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute/is-name-exists/${param0} */
export async function AttributeIsNameExistsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeIsNameExistsAsyncParams,
	options?: { [key: string]: any }
) {
	const { excludeId: param0, ...queryParams } = params;
	return request<boolean>(`/api/common/attribute/is-name-exists/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}
