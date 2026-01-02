// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/part-application-request */
export async function PartApplicationRequestGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>('/api/pdm/part-application-request', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建物料申请单 POST /api/pdm/part-application-request */
export async function PartApplicationRequestCreateAsync(body: API.BurnAbpPdmPartManagementApplicationsDtosCreatePartApplicationRequestDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>('/api/pdm/part-application-request', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取单个物料申请单（包含属性值） GET /api/pdm/part-application-request/${param0} */
export async function PartApplicationRequestGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>(`/api/pdm/part-application-request/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消申请 POST /api/pdm/part-application-request/${param0}/cancel */
export async function PartApplicationRequestCancelAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestCancelAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-application-request/${param0}/cancel`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part-application-request/${param0}/delete */
export async function PartApplicationRequestDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-application-request/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/part-application-request/${param0}/execute-workflow */
export async function PartApplicationRequestExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmPartManagementApplicationsDtosExecutePartApplicationRequestWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>(`/api/pdm/part-application-request/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交申请（进入审批流程）
支持初次提交（Pending）和驳回后重新提交（Rejected） POST /api/pdm/part-application-request/${param0}/submit */
export async function PartApplicationRequestSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>(`/api/pdm/part-application-request/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新物料申请单（仅限 Pending 状态） POST /api/pdm/part-application-request/${param0}/update */
export async function PartApplicationRequestUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApplicationRequestUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementApplicationsDtosUpdatePartApplicationRequestDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>(`/api/pdm/part-application-request/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 创建并提交申请（一键提交审核）
相当于 CreateAsync + SubmitAsync 的组合操作 POST /api/pdm/part-application-request/and-submit */
export async function PartApplicationRequestCreateAndSubmitAsync(
	body: API.BurnAbpPdmPartManagementApplicationsDtosCreatePartApplicationRequestDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementApplicationsDtosPartApplicationRequestDto>('/api/pdm/part-application-request/and-submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
