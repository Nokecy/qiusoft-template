// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/activity/left */
export async function WorkflowActivityGetLeftList(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowActivityGetLeftListParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWorkflowManagementApplicationWorkflowActivitiesActivityDto[]>('/api/workflow-management/activity/left', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
