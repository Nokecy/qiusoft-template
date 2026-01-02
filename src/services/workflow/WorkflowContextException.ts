// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-context-exception/get-list */
export async function WorkflowContextExceptionGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowContextExceptionGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowContextExceptionDto>('/api/workflow-management/workflow-context-exception/get-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/workflow-management/workflow-context-exception/retry */
export async function WorkflowContextExceptionRetry(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowContextExceptionRetryParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/workflow-management/workflow-context-exception/retry', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
