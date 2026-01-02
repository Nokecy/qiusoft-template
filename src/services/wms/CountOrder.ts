// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/count-order */
export async function CountOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_pandian_pandianqingdanCountOrderDto>('/api/wms/count-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/wms/count-order */
export async function CountOrderCreateAsync(body: API.BurnAbpWMS_pandian_pandianqingdanCreateCountOrderDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpWMS_pandian_pandianqingdanCountOrderDto>('/api/wms/count-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/count-order/${param0} */
export async function CountOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_pandian_pandianqingdanCountOrderDto>(`/api/wms/count-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 PUT /api/wms/count-order/${param0} */
export async function CountOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderUpdateAsyncParams,
	body: API.BurnAbpWMS_pandian_pandianqingdanUpdateCountOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_pandian_pandianqingdanCountOrderDto>(`/api/wms/count-order/${param0}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/wms/count-order/${param0} */
export async function CountOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/count-order/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 结束盘点 PUT /api/wms/count-order/${param0}/close */
export async function CountOrderCloseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderCloseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/count-order/${param0}/close`, {
		method: 'PUT',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 盘点任务下发 PUT /api/wms/count-order/${param0}/distribute */
export async function CountOrderDistributeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderDistributeAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/count-order/${param0}/distribute`, {
		method: 'PUT',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 完成初盘 PUT /api/wms/count-order/${param0}/finish-first-count */
export async function CountOrderFinishFirstCountAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.CountOrderFinishFirstCountAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/count-order/${param0}/finish-first-count`, {
		method: 'PUT',
		params: { ...queryParams },
		...(options || {}),
	});
}
