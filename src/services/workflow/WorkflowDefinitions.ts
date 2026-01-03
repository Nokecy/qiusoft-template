// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsListListParams,
	options?: { [key: string]: any }
) {
	return request<API.ElsaModelsPagedListResponseOfLinkedWorkflowDefinitionSummary>('/elsa/api/workflow-definitions', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsPostPost(body: API.ElsaWorkflowsManagementModelsSaveWorkflowDefinitionRequest, options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiModelsLinkedWorkflowDefinitionModel>('/elsa/api/workflow-definitions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdGetByDefinitionId2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdGetByDefinitionId2Params,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /elsa/api/workflow-definitions/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsDeleteDeleteParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/bulk-dispatch */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchEndpointParams,
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchRequest,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsBulkDispatchResponse>(`/elsa/api/workflow-definitions/${param0}/bulk-dispatch`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/dispatch */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchEndpointParams,
	body: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchRequest,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsDispatchResponse>(`/elsa/api/workflow-definitions/${param0}/dispatch`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/${param0}/execute */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecuteGetEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecuteGetEndpointParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/execute`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/execute */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecutePostEndpoint(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecutePostEndpointParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsExecuteResponse>(`/elsa/api/workflow-definitions/${param0}/execute`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/${param0}/export */
export async function GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2Params,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/export`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/export */
export async function PostElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PostElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2Params,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/export`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /elsa/api/workflow-definitions/${param0}/import */
export async function PutElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PutElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport2Params,
	body: API.ElsaWorkflowsManagementModelsWorkflowDefinitionModel,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/import`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/import */
export async function PostElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PostElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport2Params,
	body: API.ElsaWorkflowsManagementModelsWorkflowDefinitionModel,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/import`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/${param0}/labels */
export async function ElsaLabelsEndpointsWorkflowDefinitionLabelsListList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaLabelsEndpointsWorkflowDefinitionLabelsListListParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaLabelsEndpointsWorkflowDefinitionLabelsListResponse>(`/elsa/api/workflow-definitions/${param0}/labels`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/labels */
export async function ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateUpdate(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateUpdateParams,
	body: API.ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateRequest,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.ElsaLabelsEndpointsWorkflowDefinitionLabelsUpdateResponse>(`/elsa/api/workflow-definitions/${param0}/labels`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/publish */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsPublishPublish(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsPublishPublishParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsPublishResponse>(`/elsa/api/workflow-definitions/${param0}/publish`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/retract */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsRetractRetract(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsRetractRetractParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiModelsLinkedWorkflowDefinitionModel>(`/elsa/api/workflow-definitions/${param0}/retract`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/revert/${param1} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionRevertVersion(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionRevertVersionParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, version: param1, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/revert/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/${param0}/update-references */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsUpdateReferencesUpdateReferences(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsUpdateReferencesUpdateReferencesParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsUpdateReferencesResponse>(`/elsa/api/workflow-definitions/${param0}/update-references`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /elsa/api/workflow-definitions/${param0}/version/${param1} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionDeleteVersion(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionDeleteVersionParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, version: param1, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/version/${param1}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/${param0}/versions */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionListVersions(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsVersionListVersionsParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/${param0}/versions`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/by-definition-id/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdGetByDefinitionId1(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetByDefinitionIdGetByDefinitionId1Params,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/by-definition-id/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/by-id/${param0} */
export async function GetWorkflowDefinitionById(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.GetWorkflowDefinitionByIdParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/by-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /elsa/api/workflow-definitions/import */
export async function PutElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport1(
	body: API.ElsaWorkflowsManagementModelsWorkflowDefinitionModel,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/workflow-definitions/import', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/import */
export async function PostElsaWorkflowsApiEndpointsWorkflowDefinitionsImportImport1(
	body: API.ElsaWorkflowsManagementModelsWorkflowDefinitionModel,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/workflow-definitions/import', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/workflow-definitions/import-files */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsImportFilesImportFiles(
	body: API.ElsaWorkflowsManagementModelsWorkflowDefinitionModel,
	options?: { [key: string]: any }
) {
	const formData = new FormData();

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

	return request<any>('/elsa/api/workflow-definitions/import-files', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/many-by-id */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetManyByIdGetManyById(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsGetManyByIdGetManyByIdParams,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/workflow-definitions/many-by-id', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/query/count */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsCountCount(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsCountResponse>('/elsa/api/workflow-definitions/query/count', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/subgraph/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphGraph(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphGraphParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/subgraph/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/subgraph/segments/${param0} */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphSegmentsNodes(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsGraphSegmentsNodesParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/elsa/api/workflow-definitions/subgraph/segments/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/workflow-definitions/validation/is-name-unique */
export async function ElsaWorkflowsApiEndpointsWorkflowDefinitionsIsNameUniqueIsNameUnique(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsWorkflowDefinitionsIsNameUniqueIsNameUniqueParams,
	options?: { [key: string]: any }
) {
	return request<any>('/elsa/api/workflow-definitions/validation/is-name-unique', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
