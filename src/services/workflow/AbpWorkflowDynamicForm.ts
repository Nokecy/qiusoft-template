// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-dynamic-form/execute-dynamic-form-workflow/${param0} */
export async function AbpWorkflowDynamicFormExecuteDynamicFormWorkflow(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AbpWorkflowDynamicFormExecuteDynamicFormWorkflowParams,
	body: API.BurnAbpWorkflowManagementApplicationExecuteWorkflowDynamicFormInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/workflow-management/workflow-dynamic-form/execute-dynamic-form-workflow/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-dynamic-form/start-dynamic-form-workflow */
export async function AbpWorkflowDynamicFormStartDynamicFormWorkflow(
	body: API.BurnAbpWorkflowManagementApplicationCreateWorkflowDynamicFormDataInput,
	options?: { [key: string]: any }
) {
	return request<any>('/api/workflow-management/workflow-dynamic-form/start-dynamic-form-workflow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
