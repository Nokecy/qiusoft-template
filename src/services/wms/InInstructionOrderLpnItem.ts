// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 更新附件 PUT /api/wms/inInstruction-detail-item/${param0}/attachment */
export async function InInstructionOrderLpnItemUpdateAttachmentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnItemUpdateAttachmentAsyncParams,
	body: API.BurnAbpWMS_ruku_rukuzhilingxiangmingxiCreateUpdateInInstructionOrderLpnItemAttachmentInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto>(`/api/wms/inInstruction-detail-item/${param0}/attachment`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/inInstruction-detail-item/barcode/${param0} */
export async function InInstructionOrderLpnItemGetByBarCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnItemGetByBarCodeAsyncParams,
	options?: { [key: string]: any }
) {
	const { barCode: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto>(`/api/wms/inInstruction-detail-item/barcode/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/inInstruction-detail-item/delete/${param0} */
export async function InInstructionOrderLpnItemDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnItemDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/inInstruction-detail-item/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/inInstruction-detail-item/generate/batch/bar-code */
export async function InInstructionOrderLpnItemGenerateLotCodeAsync(body: API.BurnAbpWMS_ruku_rukuzhilingxiangmingxiGenerateLotCodeDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/inInstruction-detail-item/generate/batch/bar-code', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/inInstruction-detail-item/generate/carton/bar-code */
export async function InInstructionOrderLpnItemGenerateBoxNumberAsync(body: API.BurnAbpWMS_ruku_rukuzhilingxiangmingxiGenerateLotCodeDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/inInstruction-detail-item/generate/carton/bar-code', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/inInstruction-detail-item/get-template */
export async function InInstructionOrderLpnItemGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/inInstruction-detail-item/get-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/inInstruction-detail-item/getlpnitem */
export async function InInstructionOrderLpnItemGetLpnItemByItemIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnItemGetLpnItemByItemIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto>('/api/wms/inInstruction-detail-item/getlpnitem', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/inInstruction-detail-item/getsnlist */
export async function InInstructionOrderLpnItemGetSnListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnItemGetSnListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderSnItemDto>('/api/wms/inInstruction-detail-item/getsnlist', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/inInstruction-detail-item/import */
export async function InInstructionOrderLpnItemImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/inInstruction-detail-item/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/inInstruction-detail-item/list */
export async function InInstructionOrderLpnItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderLpnItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosExtensiblePagedResultDtoBurnAbpWMS_ruku_rukuzhilingxiangmingxiInInstructionOrderLpnItemDto>('/api/wms/inInstruction-detail-item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
