// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/rationalization-proposal */
export async function RationalizationProposalGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>('/api/pdm/rationalization-proposal', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建建议 POST /api/pdm/rationalization-proposal */
export async function RationalizationProposalCreateAsync(
	body: API.BurnAbpPdmProjectManagementRationalizationProposalsCreateRationalizationProposalDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>('/api/pdm/rationalization-proposal', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/rationalization-proposal/${param0} */
export async function RationalizationProposalGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 异常关闭 POST /api/pdm/rationalization-proposal/${param0}/abnormal-close */
export async function RationalizationProposalAbnormalCloseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalAbnormalCloseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}/abnormal-close`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行完成 POST /api/pdm/rationalization-proposal/${param0}/complete-execution */
export async function RationalizationProposalCompleteExecutionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalCompleteExecutionAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}/complete-execution`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除建议 POST /api/pdm/rationalization-proposal/${param0}/delete */
export async function RationalizationProposalDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/rationalization-proposal/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 开始执行 POST /api/pdm/rationalization-proposal/${param0}/start-execution */
export async function RationalizationProposalStartExecutionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalStartExecutionAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}/start-execution`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交建议 POST /api/pdm/rationalization-proposal/${param0}/submit */
export async function RationalizationProposalSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新建议 POST /api/pdm/rationalization-proposal/${param0}/update */
export async function RationalizationProposalUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementRationalizationProposalsUpdateRationalizationProposalDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 退回建议（退回到草稿状态） POST /api/pdm/rationalization-proposal/${param0}/withdraw */
export async function RationalizationProposalWithdrawAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalWithdrawAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRationalizationProposalsRationalizationProposalDto>(`/api/pdm/rationalization-proposal/${param0}/withdraw`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
