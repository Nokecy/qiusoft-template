// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 解析扫描的多行序列号信息 POST /api/wms/barcode-resolver/resolver--multiple-serialnumber */
export async function BarCodeResolverResolverMultipleSerialNumberAsync(body: API.BurnAbpWMS_tiaomashujuResolverMultipleSerialNumberModelDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_tiaomashujuBarCodeData[]>('/api/wms/barcode-resolver/resolver--multiple-serialnumber', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 解析扫描到的箱条码 LPN码以及SN条码 POST /api/wms/barcode-resolver/resolver-data */
export async function BarCodeResolverResolverDataAsync(body: API.BurnAbpWMS_tiaomashujuResolverDataDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_tiaomashujuBarCodeData>('/api/wms/barcode-resolver/resolver-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
