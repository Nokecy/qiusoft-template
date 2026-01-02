// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-type */
export async function DocumentTypeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto>('/api/pdm/document-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-type */
export async function DocumentTypeCreateAsync(body: API.BurnAbpPdmDocumentManagementDocumentTypesCreateDocumentTypeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto>('/api/pdm/document-type', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-type/${param0} */
export async function DocumentTypeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto>(`/api/pdm/document-type/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 激活文档类型 POST /api/pdm/document-type/${param0}/activate */
export async function DocumentTypeActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-type/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 停用文档类型 POST /api/pdm/document-type/${param0}/deactivate */
export async function DocumentTypeDeactivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeDeactivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-type/${param0}/deactivate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-type/${param0}/delete */
export async function DocumentTypeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-type/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置排序序号 POST /api/pdm/document-type/${param0}/set-sort-order */
export async function DocumentTypeSetSortOrderAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeSetSortOrderAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-type/${param0}/set-sort-order`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-type/${param0}/update */
export async function DocumentTypeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentTypesUpdateDocumentTypeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto>(`/api/pdm/document-type/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取激活的文档类型列表 GET /api/pdm/document-type/active-types */
export async function DocumentTypeGetActiveTypesAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto[]>('/api/pdm/document-type/active-types', {
		method: 'GET',
		...(options || {}),
	});
}

/** 根据类型代码获取文档类型 GET /api/pdm/document-type/by-code */
export async function DocumentTypeGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentTypeGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentTypesDocumentTypeDto>('/api/pdm/document-type/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
