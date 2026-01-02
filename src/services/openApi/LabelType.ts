// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/label-management/label-type */
export async function LabelTypeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelTypeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelTypesLabelTypeDto>('/api/label-management/label-type', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-type */
export async function LabelTypeCreateAsync(body: API.BurnAbpLabelManagementLabelTypesCreateLabelTypeInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpLabelManagementLabelTypesLabelTypeDto>('/api/label-management/label-type', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/label-management/label-type/${param0} */
export async function LabelTypeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelTypeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelTypesLabelTypeDto>(`/api/label-management/label-type/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-type/${param0}/delete */
export async function LabelTypeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelTypeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/label-management/label-type/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/label-management/label-type/${param0}/update */
export async function LabelTypeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.LabelTypeUpdateAsyncParams,
	body: API.BurnAbpLabelManagementLabelTypesUpdateLabelTypeInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpLabelManagementLabelTypesLabelTypeDto>(`/api/label-management/label-type/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
