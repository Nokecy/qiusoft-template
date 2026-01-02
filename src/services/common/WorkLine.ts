// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/work-line */
export async function WorkLineGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkLineGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto>('/api/common/work-line', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-line */
export async function WorkLineCreateAsync(body: API.BurnAbpErpCommonDepartmentManagementWorkLinesCreateUpdateWorkLineDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto>('/api/common/work-line', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/work-line/${param0} */
export async function WorkLineGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkLineGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto>(`/api/common/work-line/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-line/${param0}/delete */
export async function WorkLineDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkLineDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/work-line/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-line/${param0}/update */
export async function WorkLineUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkLineUpdateAsyncParams,
	body: API.BurnAbpErpCommonDepartmentManagementWorkLinesCreateUpdateWorkLineDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonDepartmentManagementWorkLinesWorkLineDto>(`/api/common/work-line/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/work-line/export */
export async function WorkLineExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.WorkLineExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/work-line/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/work-line/import */
export async function WorkLineImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>('/api/common/work-line/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/work-line/import-template */
export async function WorkLineGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/work-line/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
