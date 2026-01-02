// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/count-diff-reason */
export async function CountDiffReasonGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountDiffReasonGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto>('/api/wms/count-diff-reason', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/count-diff-reason */
export async function CountDiffReasonCreateAsync(body: API.BurnAbpWMS_pandian_pandianchayiyuanyinCreateCountDiffReasonDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto>('/api/wms/count-diff-reason', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/count-diff-reason/${param0} */
export async function CountDiffReasonGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountDiffReasonGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto>(`/api/wms/count-diff-reason/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/count-diff-reason/${param0} */
export async function CountDiffReasonUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountDiffReasonUpdateAsyncParams,
	body: API.BurnAbpWMS_pandian_pandianchayiyuanyinUpdateCountDiffReasonDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_pandian_pandianchayiyuanyinCountDiffReasonDto>(`/api/wms/count-diff-reason/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/count-diff-reason/${param0} */
export async function CountDiffReasonDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountDiffReasonDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/count-diff-reason/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/count-diff-reason/export */
export async function CountDiffReasonExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountDiffReasonExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/count-diff-reason/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/count-diff-reason/import */
export async function CountDiffReasonImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/count-diff-reason/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/count-diff-reason/import-template */
export async function CountDiffReasonGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/count-diff-reason/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
