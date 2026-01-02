// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/engineering-change-order */
export async function EngineeringChangeOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmChangeManagementEngineeringChangeOrderDto>('/api/pdm/engineering-change-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建工程变更单 POST /api/pdm/engineering-change-order */
export async function EngineeringChangeOrderCreateAsync(body: API.BurnAbpPdmChangeManagementCreateEngineeringChangeOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeOrderDto>('/api/pdm/engineering-change-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/engineering-change-order/${param0} */
export async function EngineeringChangeOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeOrderDto>(`/api/pdm/engineering-change-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批准变更单 POST /api/pdm/engineering-change-order/${param0}/approve */
export async function EngineeringChangeOrderApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderApproveAsyncParams,
	body: API.BurnAbpPdmChangeManagementApproveChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/approve`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 取消变更单 POST /api/pdm/engineering-change-order/${param0}/cancel */
export async function EngineeringChangeOrderCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/cancel`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/engineering-change-order/${param0}/delete */
export async function EngineeringChangeOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行变更 POST /api/pdm/engineering-change-order/${param0}/execute */
export async function EngineeringChangeOrderExecuteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderExecuteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/execute`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 拒绝变更单 POST /api/pdm/engineering-change-order/${param0}/reject */
export async function EngineeringChangeOrderRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderRejectAsyncParams,
	body: API.BurnAbpPdmChangeManagementRejectChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/reject`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 设置生效日期 POST /api/pdm/engineering-change-order/${param0}/set-effective-date */
export async function EngineeringChangeOrderSetEffectiveDateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderSetEffectiveDateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/set-effective-date`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 设置库存处置策略 POST /api/pdm/engineering-change-order/${param0}/set-inventory-disposition-strategy */
export async function EngineeringChangeOrderSetInventoryDispositionStrategyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderSetInventoryDispositionStrategyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/set-inventory-disposition-strategy`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 提交审批（包含影响分析） POST /api/pdm/engineering-change-order/${param0}/submit-for-approval */
export async function EngineeringChangeOrderSubmitForApprovalAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderSubmitForApprovalAsyncParams,
	body: API.BurnAbpPdmChangeManagementImpactAnalysisDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-change-order/${param0}/submit-for-approval`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新工程变更单 POST /api/pdm/engineering-change-order/${param0}/update */
export async function EngineeringChangeOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderUpdateAsyncParams,
	body: API.BurnAbpPdmChangeManagementUpdateEngineeringChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeOrderDto>(`/api/pdm/engineering-change-order/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据变更单号获取变更单 GET /api/pdm/engineering-change-order/by-change-order-number */
export async function EngineeringChangeOrderGetByChangeOrderNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringChangeOrderGetByChangeOrderNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmChangeManagementEngineeringChangeOrderDto>('/api/pdm/engineering-change-order/by-change-order-number', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
