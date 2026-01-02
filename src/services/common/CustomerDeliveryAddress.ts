// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/customer-delivery-address */
export async function CustomerDeliveryAddressGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerDeliveryAddressGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto>(
		'/api/common/customer-delivery-address',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 此处后端没有提供注释 POST /api/common/customer-delivery-address */
export async function CustomerDeliveryAddressCreateAsync(
	body: API.BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCreateUpdateCustomerDeliveryAddressDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto>('/api/common/customer-delivery-address', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/customer-delivery-address/${param0} */
export async function CustomerDeliveryAddressGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerDeliveryAddressGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto>(`/api/common/customer-delivery-address/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer-delivery-address/${param0}/delete */
export async function CustomerDeliveryAddressDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerDeliveryAddressDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/customer-delivery-address/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/customer-delivery-address/${param0}/update */
export async function CustomerDeliveryAddressUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CustomerDeliveryAddressUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCreateUpdateCustomerDeliveryAddressDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementCustomerDeliveryAddressesCustomerDeliveryAddressDto>(`/api/common/customer-delivery-address/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
