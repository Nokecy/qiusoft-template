// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document */
export async function DocumentGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentsDocumentDto>('/api/pdm/document', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 重写 CreateAsync 以支持:
1. 原始部件编码验证
2. 临时文件自动转移(带文件角色)
3. 自动创建原始部件主关联
4. 手动创建 PartDocumentLink POST /api/pdm/document */
export async function DocumentCreateAsync(body: API.BurnAbpPdmDocumentManagementDocumentsCreateDocumentDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>('/api/pdm/document', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document/${param0} */
export async function DocumentGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 清空文档 CAD 元数据。 POST /api/pdm/document/${param0}/clear-cADMetadata */
export async function DocumentClearCADMetadataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentClearCADMetadataAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document/${param0}/clear-cADMetadata`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 依据扩展名与 MIME 推断文件类型。 POST /api/pdm/document/${param0}/delete */
export async function DocumentDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document/${param0}/update */
export async function DocumentUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsUpdateDocumentDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新文档的 CAD 元数据。 POST /api/pdm/document/${param0}/update-cADMetadata */
export async function DocumentUpdateCADMetadataAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentUpdateCADMetadataAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsCADMetadataDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document/${param0}/update-cADMetadata`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新签出中的文档信息（仅签出人可操作） POST /api/pdm/document/${param0}/update-working */
export async function DocumentUpdateWorkingAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentUpdateWorkingAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentsUpdateWorkingDocumentInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>(`/api/pdm/document/${param0}/update-working`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取文档审计日志列表 GET /api/pdm/document/audit-logs/${param0} */
export async function DocumentGetAuditLogsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentGetAuditLogsAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentsDocumentAuditLogDto>(`/api/pdm/document/audit-logs/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 比较两个版本之间的差异 POST /api/pdm/document/compare-versions */
export async function DocumentCompareVersionsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentCompareVersionsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentVersionCompareResultDto>('/api/pdm/document/compare-versions', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 按文档编号获取文档。 POST /api/pdm/document/find-by-number */
export async function DocumentFindByNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentFindByNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentDto>('/api/pdm/document/find-by-number', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取文档版本历史。 GET /api/pdm/document/version-history/${param0} */
export async function DocumentGetVersionHistoryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentGetVersionHistoryAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentVersionDto[]>(`/api/pdm/document/version-history/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取文档版本列表（支持动态查询、分页、过滤） 使用示例:
- 过滤条件: DocumentId == "guid值" (必需)
- 排序: CreationTime desc
- 分页: Page=1, PageSize=20
            
Gridify 查询语法示例:
- 按文档ID筛选: "DocumentId == guid值"
- 按版本号筛选: "Version == V1.0"
- 按创建时间排序: "CreationTime desc"
- 组合条件: "DocumentId == guid值, Version contains V1, CreationTime > 2025-01-01" GET /api/pdm/document/version-list */
export async function DocumentGetVersionListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentGetVersionListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentsDocumentVersionDto>('/api/pdm/document/version-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取指定版本信息。 GET /api/pdm/document/version/${param0} */
export async function DocumentGetVersionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentGetVersionAsyncParams,
	options?: { [key: string]: any }
) {
	const { versionId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDocumentVersionDto>(`/api/pdm/document/version/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
