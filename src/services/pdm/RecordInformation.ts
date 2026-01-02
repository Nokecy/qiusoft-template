// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/record-information */
export async function RecordInformationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementRecordInformationRecordInformationDto>('/api/pdm/record-information', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建记录单 POST /api/pdm/record-information */
export async function RecordInformationCreateAsync(body: API.BurnAbpPdmProjectManagementRecordInformationCreateRecordInformationDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>('/api/pdm/record-information', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/record-information/${param0} */
export async function RecordInformationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 异常关闭 POST /api/pdm/record-information/${param0}/abnormal-close */
export async function RecordInformationAbnormalCloseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationAbnormalCloseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}/abnormal-close`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行完成 POST /api/pdm/record-information/${param0}/complete-execution */
export async function RecordInformationCompleteExecutionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationCompleteExecutionAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}/complete-execution`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除记录单 POST /api/pdm/record-information/${param0}/delete */
export async function RecordInformationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/record-information/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 开始执行 POST /api/pdm/record-information/${param0}/start-execution */
export async function RecordInformationStartExecutionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationStartExecutionAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}/start-execution`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交记录单 POST /api/pdm/record-information/${param0}/submit */
export async function RecordInformationSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新记录单 POST /api/pdm/record-information/${param0}/update */
export async function RecordInformationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementRecordInformationUpdateRecordInformationDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 退回记录单 POST /api/pdm/record-information/${param0}/withdraw */
export async function RecordInformationWithdrawAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RecordInformationWithdrawAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementRecordInformationRecordInformationDto>(`/api/pdm/record-information/${param0}/withdraw`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
