// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/task-overdue-warning-setting */
export async function TaskOverdueWarningSettingGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskOverdueWarningSettingGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfTaskOverdueWarningSettingDto>('/api/workflow-management/task-overdue-warning-setting', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/task-overdue-warning-setting */
export async function TaskOverdueWarningSettingCreate(
	body: API.BurnAbpWorkflowManagementApplicationTaskOverdueWarningsCreateTaskOverdueWarningSettingDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningSettingDto>('/api/workflow-management/task-overdue-warning-setting', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/task-overdue-warning-setting/${param0} */
export async function TaskOverdueWarningSettingGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskOverdueWarningSettingGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningSettingDto>(`/api/workflow-management/task-overdue-warning-setting/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/workflow-management/task-overdue-warning-setting/${param0} */
export async function TaskOverdueWarningSettingUpdate(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskOverdueWarningSettingUpdateParams,
	body: API.BurnAbpWorkflowManagementApplicationTaskOverdueWarningsUpdateTaskOverdueWarningSettingDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationTaskOverdueWarningsTaskOverdueWarningSettingDto>(`/api/workflow-management/task-overdue-warning-setting/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/workflow-management/task-overdue-warning-setting/${param0} */
export async function TaskOverdueWarningSettingDelete(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskOverdueWarningSettingDeleteParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/workflow-management/task-overdue-warning-setting/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
