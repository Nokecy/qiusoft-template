// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 按箱收货 POST /api/wms/receipt-collection/box-receipt */
export async function ReceiptCollectionItemBoxReceiptAsync(body: API.BurnAbpWMS_ruku_shouhuocaijiMaterialBoxReceiptDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>('/api/wms/receipt-collection/box-receipt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/receipt-collection/cancel-receipt */
export async function ReceiptCollectionItemCancelReceiptAsync(body: API.BurnAbpWMS_ruku_shouhuocaijiCancelReceiptInput, options?: { [key: string]: any }) {
	return request<any>('/api/wms/receipt-collection/cancel-receipt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批次收货 POST /api/wms/receipt-collection/lotnumber-receipt */
export async function ReceiptCollectionItemLotReceiptAsync(body: API.BurnAbpWMS_ruku_shouhuocaijiMaterialLotReceiptDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>('/api/wms/receipt-collection/lotnumber-receipt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按料号收货 POST /api/wms/receipt-collection/material-code-receipt */
export async function ReceiptCollectionItemMaterialCodeReceiptAsync(body: API.BurnAbpWMS_ruku_shouhuocaijiMaterialCodeReceiptDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>('/api/wms/receipt-collection/material-code-receipt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/receipt-collection/resolve-barcode */
export async function ReceiptCollectionItemResolveBarcodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ReceiptCollectionItemResolveBarcodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_ruku_shouhuocaijiReceiptBoxLotBarcodeResolvedDto>('/api/wms/receipt-collection/resolve-barcode', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 按SN收货 POST /api/wms/receipt-collection/sn-receipt */
export async function ReceiptCollectionItemSnReceiptAsync(body: API.BurnAbpWMS_ruku_shouhuocaijiMaterialBoxReceiptDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_ruku_rukuzhilingInInstructionOrderDto>('/api/wms/receipt-collection/sn-receipt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
