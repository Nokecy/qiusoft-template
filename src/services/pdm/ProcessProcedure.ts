// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/process-procedure */
export async function ProcessProcedureGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto>('/api/pdm/process-procedure', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-procedure */
export async function ProcessProcedureCreateAsync(body: API.BurnAbpPdmProcessManagementProcessProceduresCreateUpdateProcessProcedureDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto>('/api/pdm/process-procedure', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/process-procedure/${param0} */
export async function ProcessProcedureGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto>(`/api/pdm/process-procedure/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-procedure/${param0}/delete */
export async function ProcessProcedureDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-procedure/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-procedure/${param0}/update */
export async function ProcessProcedureUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureUpdateAsyncParams,
	body: API.BurnAbpPdmProcessManagementProcessProceduresCreateUpdateProcessProcedureDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProcessManagementProcessProceduresProcessProcedureDto>(`/api/pdm/process-procedure/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
