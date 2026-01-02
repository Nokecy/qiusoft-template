// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/workflow-management/visualization/${param0} */
export async function WorkflowVisualizationGetVisualization(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowVisualizationGetVisualizationParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, ...queryParams } = params;
	return request<API.VoloAbpElsaAbstractModelsVisualizationWorkflowVisualizationDto>(`/api/workflow-management/visualization/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/visualization/${param0}/nodes/${param1}/completion */
export async function WorkflowVisualizationGetNodeCompletionDetail(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowVisualizationGetNodeCompletionDetailParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, nodeId: param1, ...queryParams } = params;
	return request<API.VoloAbpElsaAbstractModelsVisualizationNodeCompletionInfo>(`/api/workflow-management/visualization/${param0}/nodes/${param1}/completion`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/workflow-management/visualization/${param0}/steps */
export async function WorkflowVisualizationGetSteps(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkflowVisualizationGetStepsParams,
	options?: { [key: string]: any }
) {
	const { workflowInstanceId: param0, ...queryParams } = params;
	return request<API.VoloAbpElsaAbstractModelsVisualizationWorkflowStepDto[]>(`/api/workflow-management/visualization/${param0}/steps`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
