// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-remind/${param0} */
export async function WorkflowItemRemindGet(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemRemindGetParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowItemRemindsWorkflowItemRemindDto>(`/api/workflow-management/workflow-remind/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-remind/list */
export async function WorkflowItemRemindGetList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemRemindGetListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemRemindDto>('/api/workflow-management/workflow-remind/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/workflow-remind/selfList */
export async function WorkflowItemRemindGetSelfList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowItemRemindGetSelfListParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoOfWorkflowItemRemindDto>('/api/workflow-management/workflow-remind/selfList', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
