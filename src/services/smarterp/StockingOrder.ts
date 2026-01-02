// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/smart-erp/stocking-order */
export async function StockingOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>('/api/smart-erp/stocking-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order */
export async function StockingOrderCreateAsync(body: API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>('/api/smart-erp/stocking-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/stocking-order/${param0} */
export async function StockingOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>(`/api/smart-erp/stocking-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/${param0}/approve */
export async function StockingOrderApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderApproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>(`/api/smart-erp/stocking-order/${param0}/approve`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/${param0}/delete */
export async function StockingOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/stocking-order/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/${param0}/submit */
export async function StockingOrderSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>(`/api/smart-erp/stocking-order/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/${param0}/unapprove */
export async function StockingOrderUnapproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderUnapproveAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>(`/api/smart-erp/stocking-order/${param0}/unapprove`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/${param0}/update */
export async function StockingOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderUpdateAsyncParams,
	body: API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>(`/api/smart-erp/stocking-order/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 创建BOM明细
根据物料信息创建BOM明细，支持自动展开子项 POST /api/smart-erp/stocking-order/bom-item */
export async function StockingOrderCreateBomItemAsync(body: API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiCreateStockingBomItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/smart-erp/stocking-order/bom-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取BOM明细详情
根据BOM明细ID获取详细信息（包含子项） GET /api/smart-erp/stocking-order/bom-item/${param0} */
export async function StockingOrderGetBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderGetBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomItemId: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemDto>(`/api/smart-erp/stocking-order/bom-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/stocking-order/by-stocking-order-no */
export async function StockingOrderGetByStockingOrderNoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderGetByStockingOrderNoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>('/api/smart-erp/stocking-order/by-stocking-order-no', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/copy/${param0} */
export async function StockingOrderCopyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderCopyAsyncParams,
	options?: { [key: string]: any }
) {
	const { sourceId: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderDto>(`/api/smart-erp/stocking-order/copy/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 导出合并后的备货单BOM项目
将相同物料编码的BOM项合并后导出 GET /api/smart-erp/stocking-order/export-merge-stocking-bom-item/${param0} */
export async function StockingOrderExportMergeStockingBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderExportMergeStockingBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { stockingOrderItemId: param0, ...queryParams } = params;
	return request<string>(`/api/smart-erp/stocking-order/export-merge-stocking-bom-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出备货单BOM项目
将指定明细项的BOM数据导出为Excel文件 GET /api/smart-erp/stocking-order/export-stocking-bom-item/${param0} */
export async function StockingOrderExportStockingBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderExportStockingBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { stockingOrderItemId: param0, ...queryParams } = params;
	return request<string>(`/api/smart-erp/stocking-order/export-stocking-bom-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除BOM明细
递归删除BOM明细及其所有子项 POST /api/smart-erp/stocking-order/remove-bom-item/${param0} */
export async function StockingOrderRemoveBomItemAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderRemoveBomItemAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomItemId: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/stocking-order/remove-bom-item/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/stocking-order/save-work-bom-items/${param0} */
export async function StockingOrderSaveWorkBomItemsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderSaveWorkBomItemsAsyncParams,
	body: API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemDto[],
	options?: { [key: string]: any }
) {
	const { stockingOrderId: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/stocking-order/save-work-bom-items/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取备货单BOM明细列表
根据明细ID获取对应的BOM明细列表 GET /api/smart-erp/stocking-order/stocking-bom-item-list/${param0} */
export async function StockingOrderGetStockingBomItemListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderGetStockingBomItemListAsyncParams,
	options?: { [key: string]: any }
) {
	const { stockingOrderItemId: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemDto[]>(`/api/smart-erp/stocking-order/stocking-bom-item-list/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新BOM明细
更新BOM明细的数量和备注信息，并递归更新所有子项的总用量 POST /api/smart-erp/stocking-order/update-bom-item */
export async function StockingOrderUpdateBomItemAsync(body: API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiUpdateStockingBomItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/smart-erp/stocking-order/update-bom-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/stocking-order/work-bom-items/${param0} */
export async function StockingOrderGetWorkBomItemsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockingOrderGetWorkBomItemsAsyncParams,
	options?: { [key: string]: any }
) {
	const { stockingOrderId: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_shengchanguanli_baohuodanxinxiStockingOrderItemWorkBomItemDto[]>(`/api/smart-erp/stocking-order/work-bom-items/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
