// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/tax-rate */
export async function TaxRateGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaxRateGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto>('/api/common/tax-rate', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/tax-rate */
export async function TaxRateCreateAsync(body: API.BurnAbpErpCommonInventoryAndSalesManagementTaxRatesCreateUpdateTaxRateDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto>('/api/common/tax-rate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/tax-rate/${param0} */
export async function TaxRateGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaxRateGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto>(`/api/common/tax-rate/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/tax-rate/${param0}/delete */
export async function TaxRateDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaxRateDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/tax-rate/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/tax-rate/${param0}/update */
export async function TaxRateUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaxRateUpdateAsyncParams,
	body: API.BurnAbpErpCommonInventoryAndSalesManagementTaxRatesCreateUpdateTaxRateDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto>(`/api/common/tax-rate/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取税率 GET /api/common/tax-rate/by-code */
export async function TaxRateGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaxRateGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonInventoryAndSalesManagementTaxRatesTaxRateDto>('/api/common/tax-rate/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/tax-rate/export */
export async function TaxRateExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TaxRateExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/tax-rate/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/tax-rate/import */
export async function TaxRateImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/tax-rate/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/tax-rate/import-template */
export async function TaxRateGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/tax-rate/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
