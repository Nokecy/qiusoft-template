// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/print-task */
export async function PrintTaskGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTaskGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPrintTemplateManagementPrintTasksPrintTaskDto>('/api/PrintTemplateManagement/print-task', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/PrintTemplateManagement/print-task/${param0} */
export async function PrintTaskGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTaskGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPrintTemplateManagementPrintTasksPrintTaskDto>(`/api/PrintTemplateManagement/print-task/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 重新打印 POST /api/PrintTemplateManagement/print-task/${param0}/reprint */
export async function PrintTaskReprintAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PrintTaskReprintAsyncParams,
	body: API.BurnAbpPrintTemplateManagementPrintTasksReprintInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/PrintTemplateManagement/print-task/${param0}/reprint`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
