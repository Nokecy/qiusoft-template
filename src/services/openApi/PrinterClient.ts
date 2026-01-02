// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/printer-client */
export async function PrinterClientGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto>('/api/PrintTemplateManagement/printer-client', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/printer-client/${param0} */
export async function PrinterClientGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto>(`/api/PrintTemplateManagement/printer-client/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/printer-client/${param0}/delete */
export async function PrinterClientDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/PrintTemplateManagement/printer-client/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/PrintTemplateManagement/printer-client/${param0}/update */
export async function PrinterClientUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientUpdateAsyncParams,
	body: API.BurnAbpPrintTemplateManagementPrinterClientsUpdatePrinterClientInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrinterClientsPrinterClientDto>(`/api/PrintTemplateManagement/printer-client/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新打印机信息 POST /api/PrintTemplateManagement/printer-client/${param0}/update-printer */
export async function PrinterClientUpdatePrinterAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientUpdatePrinterAsyncParams,
	body: API.BurnAbpPrintTemplateManagementPrinterClientsUpdatePrinterInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrintersPrinterDto>(`/api/PrintTemplateManagement/printer-client/${param0}/update-printer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 发起打印任务 POST /api/PrintTemplateManagement/printer-client/print/${param0} */
export async function PrinterClientPrintAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientPrintAsyncParams,
	body: API.BurnAbpPrintTemplateManagementPrintersPrintDataInput,
	options?: { [key: string]: any }
) {
	const { printerId: param0, ...queryParams } = params;
	return request<any>(`/api/PrintTemplateManagement/printer-client/print/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取打印机分页列表 GET /api/PrintTemplateManagement/printer-client/printers */
export async function PrinterClientGetPrintersAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrinterClientGetPrintersAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintersPrinterDto>('/api/PrintTemplateManagement/printer-client/printers', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
