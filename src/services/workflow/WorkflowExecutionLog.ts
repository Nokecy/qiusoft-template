// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-execution-log/by-correlation-id/${param0} */
export async function WorkflowExecutionLogGetListByCorrelationId(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowExecutionLogGetListByCorrelationIdParams,
	options?: { [key: string]: any }
) {
	const { correlationId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoOfWorkflowExecutionLogDto>(`/api/workflow-management/workflow-execution-log/by-correlation-id/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-execution-log/list */
export async function WorkflowExecutionLogGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowExecutionLogGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowExecutionLogDto>('/api/workflow-management/workflow-execution-log/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-execution-log/list/${param0} */
export async function WorkflowExecutionLogGetListByInstance(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowExecutionLogGetListByInstanceParams,
	options?: { [key: string]: any }
) {
	const { instanceId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosListResultDtoOfWorkflowExecutionLogDto>(`/api/workflow-management/workflow-execution-log/list/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
