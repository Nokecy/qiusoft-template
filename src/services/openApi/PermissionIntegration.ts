// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/permission-management/permissions/is-granted */
export async function PermissionIntegrationIsGrantedAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PermissionIntegrationIsGrantedAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoVoloAbpPermissionManagementIsGrantedResponse>('/integration-api/permission-management/permissions/is-granted', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
