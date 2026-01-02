// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/wms-provider/barcode-resolver-list */
export async function WMSProviderGetBarCodeResolverProviderList(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMSProductionDateProviderDto[]>('/api/wms/wms-provider/barcode-resolver-list', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取入库指令提供者列表 GET /api/wms/wms-provider/get-inInstruction-provider-list */
export async function WMSProviderGetInInstructionProviderList(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMSProductionDateProviderDto[]>('/api/wms/wms-provider/get-inInstruction-provider-list', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取出库指令提供者列表 GET /api/wms/wms-provider/get-outInstruction-provider-list */
export async function WMSProviderGetOutInstructionProviderList(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMSProductionDateProviderDto[]>('/api/wms/wms-provider/get-outInstruction-provider-list', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/wms-provider/production-date-list */
export async function WMSProviderGetProductionDateProviderList(options?: { [key: string]: any }) {
	return request<API.BurnAbpWMSProductionDateProviderDto[]>('/api/wms/wms-provider/production-date-list', {
		method: 'GET',
		...(options || {}),
	});
}
