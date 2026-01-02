// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据送货ASN获取已经绑定的列表 GET /api/wms/material-pick/bind-list/${param0} */
export async function MaterialPickItemGetBindListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemGetBindListAsyncParams,
	options?: { [key: string]: any }
) {
	const { asnOrderNo: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto>(`/api/wms/material-pick/bind-list/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取已复核的下架明细 GET /api/wms/material-pick/checked/list/${param0} */
export async function MaterialPickItemGetCheckedListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemGetCheckedListAsyncParams,
	options?: { [key: string]: any }
) {
	const { asnOrderNo: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto>(`/api/wms/material-pick/checked/list/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取物料下架列表 GET /api/wms/material-pick/list */
export async function MaterialPickItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto>('/api/wms/material-pick/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/material-pick/manual-pick-by-traceId */
export async function MaterialPickItemManualPickByTraceIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemManualPickByTraceIdAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/wms/material-pick/manual-pick-by-traceId', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 按箱杂出 POST /api/wms/material-pick/material-box-hybrid-out */
export async function MaterialPickItemMaterialBoxHybridOutAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaManualHybridOutInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/material-box-hybrid-out', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按批次杂出 POST /api/wms/material-pick/material-lot-hybrid-out */
export async function MaterialPickItemMaterialLotHybridOutAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaManualHybridOutInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/material-lot-hybrid-out', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按SN杂出 POST /api/wms/material-pick/material-sn-hybrid-out */
export async function MaterialPickItemMaterialSnHybridOutAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaManualHybridOutInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/material-sn-hybrid-out', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据任务Id 和 扫描到的条码进行实物库存下架 POST /api/wms/material-pick/pick */
export async function MaterialPickItemPickAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaMaterialPickDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/material-pick/pick', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 下架批次 预分配的任务 POST /api/wms/material-pick/pick-bussins-lot */
export async function MaterialPickItemPickBusinessLotAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaBusinessLotPickInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/pick-bussins-lot', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 下架任务 扫描物料下架接口 POST /api/wms/material-pick/pick-by-material */
export async function MaterialPickItemPickByMaterialAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaPickByMaterialDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/material-pick/pick-by-material', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 下架任务 扫描物料下架 自动查找任务 POST /api/wms/material-pick/pick-by-material-auto-find-task */
export async function MaterialPickItemPickByMaterialAutoFindTaskAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaPickByMaterialAutoFindTaskDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chuku_chukuzhilingmingxiPickTaskItemDto>('/api/wms/material-pick/pick-by-material-auto-find-task', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据扫描到的条码进行杂出 POST /api/wms/material-pick/pick-hybrid-by-boxOrSn */
export async function MaterialPickItemPickHybridByBarCodeAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaMaterialHybridPickByBoxOrSerialDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chukuzhilingPickTraceBoxInfoModel[]>('/api/wms/material-pick/pick-hybrid-by-boxOrSn', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据物料编码或批次条码进行杂出下架 POST /api/wms/material-pick/pick-hybrid-by-material */
export async function MaterialPickItemPickHybridByMaterialAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaMaterialHybridPickByMaterialCodeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_chukuzhilingPickTraceBoxInfoModel[]>('/api/wms/material-pick/pick-hybrid-by-material', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 下架任务 手动选择下架数据 POST /api/wms/material-pick/pick-item-manual */
export async function MaterialPickItemPickItemManualPickByTaskAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaItemPrePickInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/pick-item-manual', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 下架Item 预分配的任务 POST /api/wms/material-pick/pick-item-pre */
export async function MaterialPickItemPickItemPreAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaItemPrePickInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/pick-item-pre', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 下架LPN 预分配的任务 POST /api/wms/material-pick/pick-material */
export async function MaterialPickItemPickMaterialAsync(body: API.BurnAbpWMS_chuku_wuliaoxiajiaMaterialPickInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-pick/pick-material', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取没有绑定送货单的下架明细 GET /api/wms/material-pick/un-bind/list */
export async function MaterialPickItemGetUnBindListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPickItemGetUnBindListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_chuku_wuliaoxiajiaMaterialPickingItemDto>('/api/wms/material-pick/un-bind/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
