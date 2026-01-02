// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据ID获取入库指令单据信息 GET /api/wms/in-instruction-order/${param0} */
export async function InInstructionOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>(`/api/wms/in-instruction-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据入库指令单号获取入库指令数据 GET /api/wms/in-instruction-order/by-asnNo/${param0} */
export async function InInstructionOrderGetByAsnNoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetByAsnNoAsyncParams,
	options?: { [key: string]: any }
) {
	const { inInstructionOrderNo: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>(`/api/wms/in-instruction-order/by-asnNo/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 回写入库指令明细到源系统 POST /api/wms/in-instruction-order/call-back-item/${param0} */
export async function InInstructionOrderCallBackItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderCallBackItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { itemId: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/call-back-item/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 回写入库指令源系统 POST /api/wms/in-instruction-order/call-back/${param0} */
export async function InInstructionOrderCallBackAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderCallBackAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/call-back/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消入库指令提交状态 POST /api/wms/in-instruction-order/cancel-submit/${param0} */
export async function InInstructionOrderCancelSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderCancelSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/cancel-submit/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消入库指令审核 POST /api/wms/in-instruction-order/cancel-verify/${param0} */
export async function InInstructionOrderCancelVerifyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderCancelVerifyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/cancel-verify/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建一个入库指令 POST /api/wms/in-instruction-order/create */
export async function InInstructionOrderCreateAsync(body: API.BurnAbpWMS_ruku_rukuzhilingCreateOrUpdateInInstructionOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>('/api/wms/in-instruction-order/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除一个入库指令 POST /api/wms/in-instruction-order/delete/${param0} */
export async function InInstructionOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出入库指令明细列表 GET /api/wms/in-instruction-order/export-item-list */
export async function InInstructionOrderExportItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderExportItemAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/in-instruction-order/export-item-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据箱号获取入库指令和箱信息 GET /api/wms/in-instruction-order/get-box-and-order-info-by-boxNumber */
export async function InInstructionOrderGetBoxAndOrderInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetBoxAndOrderInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingBoxesAndOrderInfoDto>('/api/wms/in-instruction-order/get-box-and-order-info-by-boxNumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据序列号获取 入库指令和Sn信息 GET /api/wms/in-instruction-order/get-box-and-order-info-by-serialNumber */
export async function InInstructionOrderGetSerialNumberAndOrderInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetSerialNumberAndOrderInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingBoxesAndOrderInfoDto>('/api/wms/in-instruction-order/get-box-and-order-info-by-serialNumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据LPN获取入库指令和箱信息 GET /api/wms/in-instruction-order/get-boxes-and-order-info-by-lpn */
export async function InInstructionOrderGetBoxesAndOrderInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetBoxesAndOrderInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingBoxesAndOrderInfoDto>('/api/wms/in-instruction-order/get-boxes-and-order-info-by-lpn', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 查询期初入库任务 GET /api/wms/in-instruction-order/get-default-items */
export async function InInstructionOrderGetDefaultItemListAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingFullInInstructionOrderItemDto>('/api/wms/in-instruction-order/get-default-items', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取未完成收货数量汇总 GET /api/wms/in-instruction-order/get-receive-unfinished-summary */
export async function InInstructionOrderGetReceiveUnfinishedSummaryAsync(options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpWMS_ruku_rukuzhilingInInstructionOrderReceiveUnfinishedCountDto>(
		'/api/wms/in-instruction-order/get-receive-unfinished-summary',
		{
			method: 'GET',
			...(options || {}),
		}
	);
}

/** 下载期初入库指令模板 GET /api/wms/in-instruction-order/get-template */
export async function InInstructionOrderGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/in-instruction-order/get-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 导入期初入库指令 POST /api/wms/in-instruction-order/import */
export async function InInstructionOrderImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/in-instruction-order/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 根据入库指令明细ID获取入库指令明细信息 GET /api/wms/in-instruction-order/item/${param0} */
export async function InInstructionOrderGetItemListByIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetItemListByIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { itemId: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingFullInInstructionOrderItemDto>(`/api/wms/in-instruction-order/item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 根据查询条件获取入库指令明细列表信息 GET /api/wms/in-instruction-order/item/list */
export async function InInstructionOrderGetItemListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetItemListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingFullInInstructionOrderItemDto>('/api/wms/in-instruction-order/item/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据查询条件获取入库指令单信息 不含明细信息 GET /api/wms/in-instruction-order/list */
export async function InInstructionOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>('/api/wms/in-instruction-order/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 收货完成 POST /api/wms/in-instruction-order/receive-completed */
export async function InInstructionOrderReceiveCompleted(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderReceiveCompletedParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/in-instruction-order/receive-completed', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 提交入库指令单据 POST /api/wms/in-instruction-order/submit/${param0} */
export async function InInstructionOrderSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/submit/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新入库指令单信息 POST /api/wms/in-instruction-order/update/${param0} */
export async function InInstructionOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderUpdateAsyncParams,
	body: API.BurnAbpWMS_ruku_rukuzhilingCreateOrUpdateInInstructionOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>(`/api/wms/in-instruction-order/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 审核入库指令单据 POST /api/wms/in-instruction-order/verify/${param0} */
export async function InInstructionOrderVerifyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.InInstructionOrderVerifyAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/in-instruction-order/verify/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}
