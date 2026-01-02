// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/customer-credit-rating */
export async function CustomerCreditRatingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerCreditRatingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto>(
		'/api/common/customer-credit-rating',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/common/customer-credit-rating */
export async function CustomerCreditRatingCreateAsync(
	body: API.BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCreateUpdateCustomerCreditRatingDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto>('/api/common/customer-credit-rating', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer-credit-rating/${param0} */
export async function CustomerCreditRatingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerCreditRatingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto>(`/api/common/customer-credit-rating/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer-credit-rating/${param0}/delete */
export async function CustomerCreditRatingDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerCreditRatingDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/customer-credit-rating/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer-credit-rating/${param0}/update */
export async function CustomerCreditRatingUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerCreditRatingUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCreateUpdateCustomerCreditRatingDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementCustomerCreditRatingsCustomerCreditRatingDto>(`/api/common/customer-credit-rating/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
