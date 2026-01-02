// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 将授权模板应用到文档库。 POST /api/pdm/document-authorization/apply-template-to-library */
export async function DocumentAuthorizationApplyTemplateToLibraryAsync(body: API.BurnAbpPdmDocumentManagementAuthorizationApplyTemplateInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/document-authorization/apply-template-to-library', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取文档协作者列表。 GET /api/pdm/document-authorization/collaborators/${param0} */
export async function DocumentAuthorizationGetCollaboratorsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationGetCollaboratorsAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementAuthorizationDocumentCollaboratorDto[]>(`/api/pdm/document-authorization/collaborators/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除授权模板。 POST /api/pdm/document-authorization/delete-template/${param0} */
export async function DocumentAuthorizationDeleteTemplateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationDeleteTemplateAsyncParams,
	options?: { [key: string]: any }
) {
	const { templateId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-authorization/delete-template/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 诊断文档权限，返回命中规则与证据链。 POST /api/pdm/document-authorization/diagnose-document */
export async function DocumentAuthorizationDiagnoseDocumentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationDiagnoseDocumentAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementAuthorizationAuthorizationDiagnosticDto>('/api/pdm/document-authorization/diagnose-document', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 诊断文档库权限，返回命中规则与证据链。 POST /api/pdm/document-authorization/diagnose-library */
export async function DocumentAuthorizationDiagnoseLibraryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationDiagnoseLibraryAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementAuthorizationAuthorizationDiagnosticDto>('/api/pdm/document-authorization/diagnose-library', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取文档 ACL 列表。 GET /api/pdm/document-authorization/document-acl/${param0} */
export async function DocumentAuthorizationGetDocumentAclAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationGetDocumentAclAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementAuthorizationAclListDto>(`/api/pdm/document-authorization/document-acl/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取文档库 ACL 列表。 GET /api/pdm/document-authorization/library-acl/${param0} */
export async function DocumentAuthorizationGetLibraryAclAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationGetLibraryAclAsyncParams,
	options?: { [key: string]: any }
) {
	const { libraryId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementAuthorizationAclListDto>(`/api/pdm/document-authorization/library-acl/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置文档协作者。 POST /api/pdm/document-authorization/set-collaborators */
export async function DocumentAuthorizationSetCollaboratorsAsync(body: API.BurnAbpPdmDocumentManagementAuthorizationSetCollaboratorsInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/document-authorization/set-collaborators', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 设置文档 ACL。 POST /api/pdm/document-authorization/set-document-acl */
export async function DocumentAuthorizationSetDocumentAclAsync(body: API.BurnAbpPdmDocumentManagementAuthorizationUpdateAclInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/document-authorization/set-document-acl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 设置文档库 ACL。 POST /api/pdm/document-authorization/set-library-acl */
export async function DocumentAuthorizationSetLibraryAclAsync(body: API.BurnAbpPdmDocumentManagementAuthorizationUpdateAclInput, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/document-authorization/set-library-acl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 创建授权模板。 POST /api/pdm/document-authorization/template */
export async function DocumentAuthorizationCreateTemplateAsync(body: API.BurnAbpPdmDocumentManagementAuthorizationCreateTemplateInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementAuthorizationDocumentAuthorizationTemplateDto>('/api/pdm/document-authorization/template', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取授权模板列表。 GET /api/pdm/document-authorization/template-list */
export async function DocumentAuthorizationGetTemplateListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementAuthorizationDocumentAuthorizationTemplateDto[]>('/api/pdm/document-authorization/template-list', {
		method: 'GET',
		...(options || {}),
	});
}

/** 更新授权模板。 POST /api/pdm/document-authorization/update-template/${param0} */
export async function DocumentAuthorizationUpdateTemplateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentAuthorizationUpdateTemplateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementAuthorizationUpdateTemplateInput,
	options?: { [key: string]: any }
) {
	const { templateId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementAuthorizationDocumentAuthorizationTemplateDto>(`/api/pdm/document-authorization/update-template/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
