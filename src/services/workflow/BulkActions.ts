// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/cancel/workflow-instances */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesBulkCancelBulkCancel(
	body: API.ElsaWorkflowsApiEndpointsWorkflowInstancesBulkCancelRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesBulkCancelResponse>('/elsa/api/bulk-actions/cancel/workflow-instances', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/delete/workflow-definitions/by-definition-id */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteBulkDelete(
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteResponse>('/elsa/api/bulk-actions/delete/workflow-definitions/by-definition-id', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/delete/workflow-definitions/by-id */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteVersionsBulkDeleteVersions(
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteVersionsRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDeleteVersionsResponse>('/elsa/api/bulk-actions/delete/workflow-definitions/by-id', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/delete/workflow-instances */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteBulkDelete1(
	body: API.ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteResponse>('/elsa/api/bulk-actions/delete/workflow-instances', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/delete/workflow-instances/by-id */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteBulkDelete2(
	body: API.ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesBulkDeleteResponse>('/elsa/api/bulk-actions/delete/workflow-instances/by-id', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/bulk-actions/export/workflow-definitions */
export async function GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport1(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport1Params,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/bulk-actions/export/workflow-definitions', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/export/workflow-definitions */
export async function PostElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport1(options?: { [key: string]: any }) {
	return request<any>('/elsa/api/bulk-actions/export/workflow-definitions', {
		method: 'POST',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/bulk-actions/export/workflow-instances */
export async function GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport1(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport1Params,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/bulk-actions/export/workflow-instances', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/export/workflow-instances */
export async function PostElsaWorkflowsApiEndpointsWorkflowInstancesExportExport1(options?: { [key: string]: any }) {
	return request<any>('/elsa/api/bulk-actions/export/workflow-instances', {
		method: 'POST',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/import/workflow-instances */
export async function ElsaWorkflowsApiEndpointsWorkflowInstancesImportImport(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowInstancesImportResponse>('/elsa/api/bulk-actions/import/workflow-instances', {
		method: 'POST',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/publish/workflow-definitions/by-definition-ids */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkPublishBulkPublish(
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkPublishRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkPublishResponse>('/elsa/api/bulk-actions/publish/workflow-definitions/by-definition-ids', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/bulk-actions/retract/workflow-definitions/by-definition-ids */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkRetractBulkRetract(
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkRetractRequest,
	options?: { [key: string]: any }
) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkRetractResponse>('/elsa/api/bulk-actions/retract/workflow-definitions/by-definition-ids', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
