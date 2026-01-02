// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /elsa/api/workflow-contexts/provider-descriptors */
export async function ElsaWorkflowContextsEndpointsProviderTypesListList(options?: { [key: string]: any }) {
	return request<API.ElsaModelsListResponseOfWorkflowContextProviderDescriptor>('/elsa/api/workflow-contexts/provider-descriptors', {
		method: 'GET',
		...(options || {}),
	});
}
