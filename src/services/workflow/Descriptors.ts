// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/descriptors/activities */
export async function ElsaWorkflowsApiEndpointsActivityDescriptorsListList(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsActivityDescriptorsListResponse>('/elsa/api/descriptors/activities', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/activities/${param0} */
export async function ElsaWorkflowsApiEndpointsActivityDescriptorsGetGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsActivityDescriptorsGetGetParams,
	options?: { [key: string]: any }
) {
	const { typeName: param0, ...queryParams } = params;
	return request<API.ElsaWorkflowsModelsActivityDescriptor>(`/elsa/api/descriptors/activities/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /elsa/api/descriptors/activities/${param0}/options/${param1} */
export async function ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetGetParams,
	body: API.ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetRequest,
	options?: { [key: string]: any }
) {
	const { activityTypeName: param0, propertyName: param1, ...queryParams } = params;
	return request<API.ElsaWorkflowsApiEndpointsActivityDescriptorOptionsGetResponse>(`/elsa/api/descriptors/activities/${param0}/options/${param1}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/commit-strategies/activities */
export async function ElsaWorkflowsApiEndpointsCommitStrategiesActivitiesListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfCommitStrategyDescriptor>('/elsa/api/descriptors/commit-strategies/activities', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/commit-strategies/workflows */
export async function ElsaWorkflowsApiEndpointsCommitStrategiesWorkflowsListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfCommitStrategyDescriptor>('/elsa/api/descriptors/commit-strategies/workflows', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/expression-descriptors */
export async function ElsaWorkflowsApiEndpointsScriptingExpressionDescriptorsListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfExpressionDescriptorModel>('/elsa/api/descriptors/expression-descriptors', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/incident-strategies */
export async function ElsaWorkflowsApiEndpointsIncidentStrategiesListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfIncidentStrategyDescriptor>('/elsa/api/descriptors/incident-strategies', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/log-persistence-strategies */
export async function ElsaWorkflowsApiEndpointsLogPersistenceStrategiesListEndpoint(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfLogPersistenceStrategyDescriptor>('/elsa/api/descriptors/log-persistence-strategies', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/storage-drivers */
export async function ElsaWorkflowsApiEndpointsStorageDriversListList(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsStorageDriversListResponse>('/elsa/api/descriptors/storage-drivers', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/variables */
export async function ElsaWorkflowsApiEndpointsVariableTypesListList(options?: { [key: string]: any }) {
	return request<API.ElsaWorkflowsApiEndpointsVariableTypesListResponse>('/elsa/api/descriptors/variables', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /elsa/api/descriptors/workflow-activation-strategies */
export async function ElsaWorkflowsApiEndpointsWorkflowActivationStrategiesListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfWorkflowActivationStrategyDescriptor>('/elsa/api/descriptors/workflow-activation-strategies', {
		method: 'GET',
		...(options || {}),
	});
}
