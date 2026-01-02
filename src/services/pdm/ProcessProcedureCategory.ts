// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/process-procedure-category */
export async function ProcessProcedureCategoryGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureCategoryGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto>('/api/pdm/process-procedure-category', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-procedure-category */
export async function ProcessProcedureCategoryCreateAsync(
	body: API.BurnAbpPdmProcessManagementProcessProcedureCategoriesCreateUpdateProcessProcedureCategoryDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto>('/api/pdm/process-procedure-category', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/process-procedure-category/${param0} */
export async function ProcessProcedureCategoryGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureCategoryGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto>(`/api/pdm/process-procedure-category/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-procedure-category/${param0}/delete */
export async function ProcessProcedureCategoryDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureCategoryDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/process-procedure-category/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/process-procedure-category/${param0}/update */
export async function ProcessProcedureCategoryUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProcessProcedureCategoryUpdateAsyncParams,
	body: API.BurnAbpPdmProcessManagementProcessProcedureCategoriesCreateUpdateProcessProcedureCategoryDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProcessManagementProcessProcedureCategoriesProcessProcedureCategoryDto>(`/api/pdm/process-procedure-category/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
