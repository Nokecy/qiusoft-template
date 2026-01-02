// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取具有可用数量的库位库存 POST /api/wms/stock-bin/available-list */
export async function StockBinInfoGetAvailableListAsync(body: API.VoloAbpApplicationDtosDynamicQueryInput, options?: { [key: string]: any }) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto>('/api/wms/stock-bin/available-list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据载具号获取载具信息 GET /api/wms/stock-bin/by-traceId */
export async function StockBinInfoGetByTraceIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetByTraceIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto>('/api/wms/stock-bin/by-traceId', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 比对库位库存和ITEM库存 GET /api/wms/stock-bin/compare-stockBin-and-stock */
export async function StockBinInfoCompareStockBinAndStockAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoStockBinCompareStockDto[]>('/api/wms/stock-bin/compare-stockBin-and-stock', {
		method: 'GET',
		...(options || {}),
	});
}

/** 批量延期lpn物料 POST /api/wms/stock-bin/delay */
export async function StockBinInfoDelayStockBinAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoStockBinInfoDelayDto[], options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/delay', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 导出载具库存列表 GET /api/wms/stock-bin/export */
export async function StockBinInfoExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/stock-bin/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导出已超期的库存列表 GET /api/wms/stock-bin/export-time-out */
export async function StockBinInfoExportTimeOutAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoExportTimeOutAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/stock-bin/export-time-out', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据载具号获取 箱列表信息或者SN信息 POST /api/wms/stock-bin/get-boxlist-by-traceId */
export async function StockBinInfoGetBoxListByTraceIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetBoxListByTraceIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoGetTraceInfoBoxNumberDto>('/api/wms/stock-bin/get-boxlist-by-traceId', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/stock-bin/get-trace-info-by-lotNumber */
export async function StockBinInfoGetTraceInfoByLotNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetTraceInfoByLotNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoGetTraceInfoBoxNumberDto>('/api/wms/stock-bin/get-trace-info-by-lotNumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据箱号或者Sn以及数量获取载具信息 GET /api/wms/stock-bin/get-traceInfo-by-box-qty */
export async function StockBinInfoGetTraceInfoByBoxAndQtyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetTraceInfoByBoxAndQtyAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoGetTraceInfoBoxNumberDto>('/api/wms/stock-bin/get-traceInfo-by-box-qty', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 通过批次号/箱号获取载具箱或SN信息或业务批次信息 GET /api/wms/stock-bin/get-traceInfo-by-lot-qty */
export async function StockBinInfoGetTraceInfoByLotAndQtyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetTraceInfoByLotAndQtyAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoGetTraceInfoBoxNumberDto>('/api/wms/stock-bin/get-traceInfo-by-lot-qty', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取载具列表信息 GET /api/wms/stock-bin/list */
export async function StockBinInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto>('/api/wms/stock-bin/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 合并两个或多个箱号的数据 POST /api/wms/stock-bin/merge-box-info */
export async function StockBinInfoMergeBoxInfoAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMergeBoxInfoInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoMergeBoxOutPutDto>('/api/wms/stock-bin/merge-box-info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 合并两个相同批次的载具上的物料 POST /api/wms/stock-bin/merge-traceId */
export async function StockBinInfoMergeTraceIdAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMergeTraceIdInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/merge-traceId', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 移动库位物料到另一个物料上 POST /api/wms/stock-bin/merget-location */
export async function StockBinInfoMergeLocationAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMergeLocationInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/merget-location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 移动箱号到指定库位上 POST /api/wms/stock-bin/move-box-location */
export async function StockBinInfoMoveBoxToLocationAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMoveBoxLocationInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/move-box-location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 移动指定库位上的 某个编码到另一个库位上 POST /api/wms/stock-bin/move-material-location */
export async function StockBinInfoMoveMaterialToLocationAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMoveMaterialLocationInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/move-material-location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 整个库位移动到另一个库位上 POST /api/wms/stock-bin/move-stock-location */
export async function StockBinInfoMoveStockToLocationAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMoveStockToLocationInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/move-stock-location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 移动载具到另一个库位 POST /api/wms/stock-bin/move-trace-to-location */
export async function StockBinInfoMoveTraceIdToLocationAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoMoveTraceToTraceInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/move-trace-to-location', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据任务令批量下架库存 GET /api/wms/stock-bin/pick-by-workjob */
export async function StockBinInfoPickStockBinByWorkJobAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoPickStockBinByWorkJobAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/stock-bin/pick-by-workjob', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 手动批量下架库位库存 POST /api/wms/stock-bin/pick-stock-bin */
export async function StockBinInfoPickStockBinAsync(body: string[], options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/pick-stock-bin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 拆分载具号到另一个载具号中 POST /api/wms/stock-bin/split-trace */
export async function StockBinInfoSplitTraceIdAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoSplitTraceIdInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/stock-bin/split-trace', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按SN拆分载具到另一个载具中 POST /api/wms/stock-bin/split-trace-serialnumber */
export async function StockBinInfoSplitTraceIdBySerialNumberAsync(body: API.BurnAbpWMS_kucun_kucunliebiaoSplitBoxInfoInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoSplitBoxOutPutDto>('/api/wms/stock-bin/split-trace-serialnumber', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据任务令分组获取任务令物料总数信息 GET /api/wms/stock-bin/stock-groupby-workjobcode */
export async function StockBinInfoGetStockByWorkJobCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetStockByWorkJobCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpWMS_kucun_kucunliebiaoWorkJobStockBinDto>('/api/wms/stock-bin/stock-groupby-workjobcode', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取给定条件的库存总数量 GET /api/wms/stock-bin/sum-quantity */
export async function StockBinInfoGetSumQuantityAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetSumQuantityAsyncParams,
	options?: { [key: string]: any }
) {
	return request<number>('/api/wms/stock-bin/sum-quantity', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取库存按物料和库位汇总的列表数据(分页)
返回数据包含物料ID、物料编码、物料外码、物料描述、库位编码、总数量、可用数量、预占数量 GET /api/wms/stock-bin/summary-by-material-and-location */
export async function StockBinInfoGetSummaryByMaterialAndLocationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetSummaryByMaterialAndLocationAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosExtensiblePagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinSummaryDto>('/api/wms/stock-bin/summary-by-material-and-location', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取已超期的库存列表，剔除数量为0的数据 GET /api/wms/stock-bin/time-out-list */
export async function StockBinInfoGetTimeOutListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetTimeOutListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_kucun_kucunliebiaoStockBinInfoDto>('/api/wms/stock-bin/time-out-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据箱号获取LPN信息，并检查先进先出原则 GET /api/wms/stock-bin/traceInfo-by-boxNumber */
export async function StockBinInfoGetTraceInfoByBoxNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StockBinInfoGetTraceInfoByBoxNumberAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_kucun_kucunliebiaoGetTraceInfoBoxNumberDto>('/api/wms/stock-bin/traceInfo-by-boxNumber', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
