// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 按物料/用途/主关联过滤列表 GET /api/pdm/part-document-link */
export async function PartDocumentLinkGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentLinkGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto>('/api/pdm/part-document-link', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-document-link */
export async function PartDocumentLinkCreateAsync(body: API.BurnAbpPdmPartManagementPartDocumentLinksCreatePartDocumentLinkDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto>('/api/pdm/part-document-link', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/part-document-link/${param0} */
export async function PartDocumentLinkGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentLinkGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto>(`/api/pdm/part-document-link/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-document-link/${param0}/delete */
export async function PartDocumentLinkDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentLinkDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-document-link/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-document-link/${param0}/update */
export async function PartDocumentLinkUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentLinkUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementPartDocumentLinksUpdatePartDocumentLinkDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto>(`/api/pdm/part-document-link/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 按料号查询关联文档，支持可选展开 BOM 子项 GET /api/pdm/part-document-link/documents-by-part */
export async function PartDocumentLinkGetDocumentsByPartAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentLinkGetDocumentsByPartAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkWithDocumentsDto>('/api/pdm/part-document-link/documents-by-part', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 按文档编码查询关联料号，可选向上递归父项 BOM GET /api/pdm/part-document-link/parts-by-document */
export async function PartDocumentLinkGetPartsByDocumentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentLinkGetPartsByDocumentAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementPartDocumentLinksDocumentLinkedPartDto[]>('/api/pdm/part-document-link/parts-by-document', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
