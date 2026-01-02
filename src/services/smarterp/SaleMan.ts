// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/smart-erp/sale-man */
export async function SaleManGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleManGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto>('/api/smart-erp/sale-man', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/sale-man */
export async function SaleManCreateAsync(body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto>('/api/smart-erp/sale-man', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/sale-man/${param0} */
export async function SaleManGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleManGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto>(`/api/smart-erp/sale-man/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/sale-man/${param0}/delete */
export async function SaleManDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleManDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/sale-man/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/sale-man/${param0}/update */
export async function SaleManUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.SaleManUpdateAsyncParams,
	body: API.BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_xiaoshouguanli_xiaoshouyuanxinxiSaleManDto>(`/api/smart-erp/sale-man/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
