// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/bnr-management/sequence-type/${param0} */
export async function BNRSequenceTypeGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRSequenceTypeGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpBNRManagementApplicationBNRSequenceTypeDto>(`/api/bnr-management/sequence-type/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/sequence-type/create */
export async function BNRSequenceTypeCreateAsync(body: API.BurnAbpBNRManagementApplicationBNRSequenceTypeDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpBNRManagementApplicationBNRSequenceTypeDto>('/api/bnr-management/sequence-type/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/sequence-type/delete/${param0} */
export async function BNRSequenceTypeDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRSequenceTypeDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/bnr-management/sequence-type/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/bnr-management/sequence-type/list */
export async function BNRSequenceTypeGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRSequenceTypeGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBNRManagementApplicationBNRSequenceTypeDto>('/api/bnr-management/sequence-type/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/bnr-management/sequence-type/update */
export async function BNRSequenceTypeUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BNRSequenceTypeUpdateAsyncParams,
	body: API.BurnAbpBNRManagementApplicationBNRSequenceTypeDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpBNRManagementApplicationBNRSequenceTypeDto>('/api/bnr-management/sequence-type/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}
