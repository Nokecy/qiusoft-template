// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/payment-method */
export async function PaymentMethodGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PaymentMethodGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto>('/api/common/payment-method', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/payment-method */
export async function PaymentMethodCreateAsync(body: API.BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsCreateUpdatePaymentMethodDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto>('/api/common/payment-method', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/payment-method/${param0} */
export async function PaymentMethodGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PaymentMethodGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto>(`/api/common/payment-method/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/payment-method/${param0}/delete */
export async function PaymentMethodDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PaymentMethodDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/payment-method/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/payment-method/${param0}/update */
export async function PaymentMethodUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PaymentMethodUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsCreateUpdatePaymentMethodDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto>(`/api/common/payment-method/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取支付方式 GET /api/common/payment-method/by-code */
export async function PaymentMethodGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PaymentMethodGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPaymentMethodsPaymentMethodDto>('/api/common/payment-method/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
