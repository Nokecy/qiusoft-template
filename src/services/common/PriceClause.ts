// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/price-clause */
export async function PriceClauseGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PriceClauseGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto>('/api/common/price-clause', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/price-clause */
export async function PriceClauseCreateAsync(body: API.BurnAbpErpCommonInventoryAndSalesManagementPriceClausesCreateUpdatePriceClauseDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto>('/api/common/price-clause', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/price-clause/${param0} */
export async function PriceClauseGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PriceClauseGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto>(`/api/common/price-clause/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/price-clause/${param0}/delete */
export async function PriceClauseDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PriceClauseDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/price-clause/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/price-clause/${param0}/update */
export async function PriceClauseUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PriceClauseUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementPriceClausesCreateUpdatePriceClauseDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto>(`/api/common/price-clause/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取价格条款 GET /api/common/price-clause/by-code */
export async function PriceClauseGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PriceClauseGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementPriceClausesPriceClauseDto>('/api/common/price-clause/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/price-clause/export */
export async function PriceClauseExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PriceClauseExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/price-clause/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/price-clause/import */
export async function PriceClauseImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
	const formData = new FormData();

	if (File) {
		formData.append('File', File);
	}

	Object.keys(body).forEach(ele => {
		const item = (body as any)[ele];

		if (item !== undefined && item !== null) {
			if (typeof item === 'object' && !(item instanceof File)) {
				if (item instanceof Array) {
					item.forEach(f => formData.append(ele, f || ''));
				} else {
					formData.append(ele, new Blob([JSON.stringify(item)], { type: 'application/json' }));
				}
			} else {
				formData.append(ele, item);
			}
		}
	});

	return request<any>('/api/common/price-clause/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/price-clause/import-template */
export async function PriceClauseGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/price-clause/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
