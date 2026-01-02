// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/engineering-change-notification */
export async function EngineeringChangeNotificationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementEngineeringChangeNotificationDto>('/api/pdm/engineering-change-notification', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建工程变更通知 POST /api/pdm/engineering-change-notification */
export async function EngineeringChangeNotificationCreateAsync(body: API.BurnAbpPdmChangeManagementCreateEngineeringChangeNotificationDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeNotificationDto>('/api/pdm/engineering-change-notification', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/engineering-change-notification/${param0} */
export async function EngineeringChangeNotificationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeNotificationDto>(`/api/pdm/engineering-change-notification/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批准变更单 POST /api/pdm/engineering-change-notification/${param0}/approve */
export async function EngineeringChangeNotificationApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationApproveAsyncParams,
	body: API.BurnAbpPdmChangeManagementApproveChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-notification/${param0}/approve`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 取消变更单 POST /api/pdm/engineering-change-notification/${param0}/cancel */
export async function EngineeringChangeNotificationCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-notification/${param0}/cancel`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/engineering-change-notification/${param0}/delete */
export async function EngineeringChangeNotificationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-notification/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 链接源变更单 POST /api/pdm/engineering-change-notification/${param0}/link-source-change-order/${param1} */
export async function EngineeringChangeNotificationLinkSourceChangeOrderAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationLinkSourceChangeOrderAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, sourceChangeOrderId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-notification/${param0}/link-source-change-order/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 拒绝变更单 POST /api/pdm/engineering-change-notification/${param0}/reject */
export async function EngineeringChangeNotificationRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationRejectAsyncParams,
	body: API.BurnAbpPdmChangeManagementRejectChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-notification/${param0}/reject`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交审批（包含影响分析） POST /api/pdm/engineering-change-notification/${param0}/submit-for-approval */
export async function EngineeringChangeNotificationSubmitForApprovalAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationSubmitForApprovalAsyncParams,
	body: API.BurnAbpPdmChangeManagementImpactAnalysisDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-notification/${param0}/submit-for-approval`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新工程变更通知 POST /api/pdm/engineering-change-notification/${param0}/update */
export async function EngineeringChangeNotificationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationUpdateAsyncParams,
	body: API.BurnAbpPdmChangeManagementUpdateEngineeringChangeNotificationDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeNotificationDto>(`/api/pdm/engineering-change-notification/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据变更单号获取变更单 GET /api/pdm/engineering-change-notification/by-change-order-number */
export async function EngineeringChangeNotificationGetByChangeOrderNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeNotificationGetByChangeOrderNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeNotificationDto>('/api/pdm/engineering-change-notification/by-change-order-number', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
