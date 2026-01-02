// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/task-type */
export async function TaskTypeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskTypeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmProjectManagementTaskTypesTaskTypeDto>('/api/pdm/task-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/task-type */
export async function TaskTypeCreateAsync(body: API.BurnAbpPdmProjectManagementTaskTypesCreateTaskTypeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmProjectManagementTaskTypesTaskTypeDto>('/api/pdm/task-type', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/task-type/${param0} */
export async function TaskTypeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskTypeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementTaskTypesTaskTypeDto>(`/api/pdm/task-type/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/task-type/${param0}/delete */
export async function TaskTypeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskTypeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/task-type/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/task-type/${param0}/update */
export async function TaskTypeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaskTypeUpdateAsyncParams,
	body: API.BurnAbpPdmProjectManagementTaskTypesUpdateTaskTypeDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmProjectManagementTaskTypesTaskTypeDto>(`/api/pdm/task-type/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
