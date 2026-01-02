// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取出库指令数据 GET /api/wms/out-instruction/${param0} */
export async function OutInstructionOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto>(`/api/wms/out-instruction/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消合并出库需求 PUT /api/wms/out-instruction/${param0}/cancel-demand-merge */
export async function OutInstructionOrderCancelDemandMergeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderCancelDemandMergeAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/${param0}/cancel-demand-merge`, {
		method: 'PUT',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 分配指令需求到具体的库位上 POST /api/wms/out-instruction/allocation */
export async function OutInstructionOrderAllotAsync(body: API.BurnAbpWMS_chuku_chukuzhilingAllotOutInstructionOrdersInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/out-instruction/allocation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批量释放指定库房、指定时间段的下架任务和库存 POST /api/wms/out-instruction/batch-release-task */
export async function OutInstructionOrderBatchReleaseTaskAsync(body: API.BurnAbpWMS_chuku_chukuzhilingBatchReleaseTaskDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingBatchReleaseTaskResultDto>('/api/wms/out-instruction/batch-release-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 回写出库指令明细到源系统 POST /api/wms/out-instruction/call-back-item/${param0} */
export async function OutInstructionOrderCallBackItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderCallBackItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { itemId: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/call-back-item/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 回写出库指令源系统 POST /api/wms/out-instruction/call-back/${param0} */
export async function OutInstructionOrderCallBackAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderCallBackAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/call-back/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消提交出库指令单据 POST /api/wms/out-instruction/cancel-submit/${param0} */
export async function OutInstructionOrderCancelSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderCancelSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/cancel-submit/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消审核出库指令单据 POST /api/wms/out-instruction/cancel-verify/${param0} */
export async function OutInstructionOrderCancelVerifyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderCancelVerifyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/cancel-verify/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建出库指令 POST /api/wms/out-instruction/create */
export async function OutInstructionOrderCreateAsync(body: API.BurnAbpWMS_chuku_chukuzhilingCreateOrUpdateOutInstructionOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto>('/api/wms/out-instruction/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除出库指令 POST /api/wms/out-instruction/delete/${param0} */
export async function OutInstructionOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction/export */
export async function OutInstructionOrderExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/out-instruction/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导出出库指令明细列表信息 GET /api/wms/out-instruction/export-item */
export async function OutInstructionOrderExportItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderExportItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/out-instruction/export-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction/get-by-source-orderno */
export async function OutInstructionOrderGetBySourceOrderNoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetBySourceOrderNoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingOutInstructionOrderDto>('/api/wms/out-instruction/get-by-source-orderno', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction/get-pick-item-unfinished-summary */
export async function OutInstructionOrderGetPickItemUnfinishedSummaryAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpWMS_chuku_chukuzhilingOutInstructionPickItemUnfinishedCountDto>(
		'/api/wms/out-instruction/get-pick-item-unfinished-summary',
		{
			method: 'GET',
			...(options || {}),
		}
	);
}

/** 导入出库指令 GET /api/wms/out-instruction/import */
export async function OutInstructionOrderImportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderImportAsyncParams,
	body: {},
	File?: File,
	options?: { [key: string]: any }
) {
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

	return request<any>('/api/wms/out-instruction/import', {
		method: 'GET',
		params: {
			...params,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction/import-template */
export async function OutInstructionOrderImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/out-instruction/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取出库指令需求明细行 GET /api/wms/out-instruction/item/list */
export async function OutInstructionOrderGetItemListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetItemListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderItemDto>('/api/wms/out-instruction/item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取出库指令头列表 GET /api/wms/out-instruction/list */
export async function OutInstructionOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto>('/api/wms/out-instruction/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 手动分配 下架指令 POST /api/wms/out-instruction/manual-allocation */
export async function OutInstructionOrderManualAllocationAsync(body: API.BurnAbpWMS_chuku_chukuzhilingManualAllocationInstructionDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/out-instruction/manual-allocation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction/my-item-list */
export async function OutInstructionOrderGetMyItemListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetMyItemListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderItemDto>('/api/wms/out-instruction/my-item-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/out-instruction/my-list */
export async function OutInstructionOrderGetMyListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetMyListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto>('/api/wms/out-instruction/my-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 发运出库指令 GET /api/wms/out-instruction/shipment/${param0} */
export async function OutInstructionOrderManualShipmentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderManualShipmentAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/shipment/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取统计信息 GET /api/wms/out-instruction/shipment/summary */
export async function OutInstructionOrderGetShipmentSummaryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderGetShipmentSummaryAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingOutInstructionSummaryDto>('/api/wms/out-instruction/shipment/summary', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 提交出库指令单据 POST /api/wms/out-instruction/submit/${param0} */
export async function OutInstructionOrderSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/submit/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新出库指令信息 POST /api/wms/out-instruction/update/${param0} */
export async function OutInstructionOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderUpdateAsyncParams,
	body: API.BurnAbpWMS_chuku_chukuzhilingCreateOrUpdateOutInstructionOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_chuku_chukuzhilingFullOutInstructionOrderDto>(`/api/wms/out-instruction/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 审核出库指令单据 POST /api/wms/out-instruction/verify/${param0} */
export async function OutInstructionOrderVerifyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.OutInstructionOrderVerifyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/out-instruction/verify/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
