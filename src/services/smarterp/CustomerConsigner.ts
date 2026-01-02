// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/smart-erp/customer-consigner */
export async function CustomerConsignerGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerConsignerGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto>('/api/smart-erp/customer-consigner', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/customer-consigner */
export async function CustomerConsignerCreateAsync(body: API.BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto>('/api/smart-erp/customer-consigner', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/customer-consigner/${param0} */
export async function CustomerConsignerGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerConsignerGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto>(`/api/smart-erp/customer-consigner/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/customer-consigner/${param0}/delete */
export async function CustomerConsignerDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerConsignerDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/customer-consigner/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/customer-consigner/${param0}/update */
export async function CustomerConsignerUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerConsignerUpdateAsyncParams,
	body: API.BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_gendanyuanxinxiCustomerConsignerDto>(`/api/smart-erp/customer-consigner/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
