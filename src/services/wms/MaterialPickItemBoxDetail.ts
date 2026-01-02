// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 PUT /api/wms/materialPickItem-box-detail/${param0}/attachments */
export async function MaterialPickItemBoxDetailUpdateAttachmentsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemBoxDetailUpdateAttachmentsAsyncParams,
	body: API.BurnAbpWMS_chuku_wuliaoxiajiamingxiCreateOrUpdateMaterialPickItemBoxDetailAttachmentInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailDto>(`/api/wms/materialPickItem-box-detail/${param0}/attachments`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialPickItem-box-detail/export */
export async function MaterialPickItemBoxDetailExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemBoxDetailExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/materialPickItem-box-detail/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/materialPickItem-box-detail/list */
export async function MaterialPickItemBoxDetailGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemBoxDetailGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiamingxiMaterialPickItemBoxDetailDto>('/api/wms/materialPickItem-box-detail/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
