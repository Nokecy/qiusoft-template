// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/wms/material-put-away/box-hybrid */
export async function MaterialPutAwayBoxHybridAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaMaterialBoxHybridDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/box-hybrid', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 检查箱号是否唯一 POST /api/wms/material-put-away/check-box-number/${param0} */
export async function MaterialPutAwayCheckBoxNumberAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPutAwayCheckBoxNumberAsyncParams,
	options?: { [key: string]: any }
) {
	const { boxNumber: param0, ...queryParams } = params;
	return request<any>(`/api/wms/material-put-away/check-box-number/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 检查LPN唯一性 POST /api/wms/material-put-away/check-lpn/${param0} */
export async function MaterialPutAwayCheckLpnOnlyAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialPutAwayCheckLpnOnlyAsyncParams,
	options?: { [key: string]: any }
) {
	const { lpn: param0, ...queryParams } = params;
	return request<any>(`/api/wms/material-put-away/check-lpn/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 按物料料号杂入 POST /api/wms/material-put-away/material-hybrid */
export async function MaterialPutAwayMaterialHybridAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaMaterialHybridDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/material-hybrid', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按批次杂入 POST /api/wms/material-put-away/material-lot-hybrid */
export async function MaterialPutAwayMaterialLotHybridAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaMaterialLotHybridDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/material-lot-hybrid', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按SN杂入 POST /api/wms/material-put-away/sn-hybrid */
export async function MaterialPutAwaySnHybridAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaMaterialSnHybridDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/sn-hybrid', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 转运到存储区 POST /api/wms/material-put-away/transport-put */
export async function MaterialPutAwayTransportPutAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaMaterialPutToStorageDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/transport-put', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 车间入库申请 POST /api/wms/material-put-away/workshop-lpn-put */
export async function MaterialPutAwayWorkshopLpnPutAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaWorkshopBoxInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/workshop-lpn-put', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 车间SN入库申请 POST /api/wms/material-put-away/workshop-sn-put */
export async function MaterialPutAwayWorkshopSnPutAsync(body: API.BurnAbpWMS_ruku_wuliaoshangjiaWorkshopSnInputDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-put-away/workshop-sn-put', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
