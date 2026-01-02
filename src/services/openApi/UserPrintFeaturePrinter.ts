// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/user-print-feature-printer */
export async function UserPrintFeaturePrinterGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserPrintFeaturePrinterGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto>(
		'/api/PrintTemplateManagement/user-print-feature-printer',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/user-print-feature-printer/${param0} */
export async function UserPrintFeaturePrinterGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserPrintFeaturePrinterGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto>(`/api/PrintTemplateManagement/user-print-feature-printer/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/user-print-feature-printer/self */
export async function UserPrintFeaturePrinterGetSelfAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto[]>('/api/PrintTemplateManagement/user-print-feature-printer/self', {
		method: 'GET',
		...(options || {}),
	});
}

/** 为指定用户配置打印功能与打印机的绑定关系。 POST /api/PrintTemplateManagement/user-print-feature-printer/set */
export async function UserPrintFeaturePrinterSetAsync(
	body: API.BurnAbpPrintTemplateManagementUserPrintFeaturePrintersSetUserPrintFeaturePrinterInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto>('/api/PrintTemplateManagement/user-print-feature-printer/set', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 为当前登录用户设置打印功能与打印机的绑定关系。 POST /api/PrintTemplateManagement/user-print-feature-printer/set-self */
export async function UserPrintFeaturePrinterSetSelfAsync(
	body: API.BurnAbpPrintTemplateManagementUserPrintFeaturePrintersSetSelfUserPrintFeaturePrinterInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPrintTemplateManagementUserPrintFeaturePrintersUserPrintFeaturePrinterDto[]>('/api/PrintTemplateManagement/user-print-feature-printer/set-self', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
