// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/delivery-man */
export async function DeliveryManGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryManGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto>('/api/common/delivery-man', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-man */
export async function DeliveryManCreateAsync(body: API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenCreateUpdateDeliveryManDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto>('/api/common/delivery-man', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/delivery-man/${param0} */
export async function DeliveryManGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryManGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto>(`/api/common/delivery-man/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-man/${param0}/delete */
export async function DeliveryManDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryManDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/delivery-man/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/delivery-man/${param0}/update */
export async function DeliveryManUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryManUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenCreateUpdateDeliveryManDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto>(`/api/common/delivery-man/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取送货员 GET /api/common/delivery-man/by-code */
export async function DeliveryManGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DeliveryManGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementDeliveryMenDeliveryManDto>('/api/common/delivery-man/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
