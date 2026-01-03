// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-definition-setting/${param0} */
export async function WorkflowDefinitionSettingGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionSettingGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto>(`/api/workflow-management/workflow-definition-setting/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/workflow-management/workflow-definition-setting/${param0} */
export async function WorkflowDefinitionSettingDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionSettingDeleteParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/workflow-management/workflow-definition-setting/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-definition-setting/by-definitionId/${param0} */
export async function WorkflowDefinitionSettingGetByDefinitionId(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionSettingGetByDefinitionIdParams,
	options?: { [key: string]: any }
) {
	const { definitionId: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto>(
		`/api/workflow-management/workflow-definition-setting/by-definitionId/${param0}`,
		{
			method: 'GET',
			params: { ...queryParams },
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-definition-setting/by-definitionName */
export async function WorkflowDefinitionSettingGetByDefinitionName(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionSettingGetByDefinitionNameParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto>(
		'/api/workflow-management/workflow-definition-setting/by-definitionName',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-definition-setting/create */
export async function WorkflowDefinitionSettingCreate(
	body: API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto>('/api/workflow-management/workflow-definition-setting/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-definition-setting/list */
export async function WorkflowDefinitionSettingGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionSettingGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowDefinitionSettingDto>('/api/workflow-management/workflow-definition-setting/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-definition-setting/update/${param0} */
export async function WorkflowDefinitionSettingUpdate(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowDefinitionSettingUpdateParams,
	body: API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowDefinitionSettingsWorkflowDefinitionSettingDto>(
		`/api/workflow-management/workflow-definition-setting/update/${param0}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			params: { ...queryParams },
			data: body,
			...(options || {}),
		}
	);
}
