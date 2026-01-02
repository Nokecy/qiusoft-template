// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/pdm/engineering-file-notification-workflow-context/${param0} */
export async function EngineeringFileNotificationWorkflowContextGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationWorkflowContextGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>(
		`/integration-api/pdm/engineering-file-notification-workflow-context/${param0}`,
		{
			method: 'GET',
			params: { ...queryParams },
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /integration-api/pdm/engineering-file-notification-workflow-context/update */
export async function EngineeringFileNotificationWorkflowContextUpdateAsync(
	body: API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>(
		'/integration-api/pdm/engineering-file-notification-workflow-context/update',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: body,
			...(options || {}),
		}
	);
}
