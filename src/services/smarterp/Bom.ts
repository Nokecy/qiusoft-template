// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/smart-erp/bom */
export async function BomGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto>('/api/smart-erp/bom', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/bom */
export async function BomCreateAsync(body: API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto>('/api/smart-erp/bom', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/smart-erp/bom/${param0} */
export async function BomGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto>(`/api/smart-erp/bom/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/bom/${param0}/delete */
export async function BomDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/smart-erp/bom/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/bom/${param0}/update */
export async function BomUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomUpdateAsyncParams,
	body: API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoBomDto>(`/api/smart-erp/bom/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/smart-erp/bom/calculation-super-bom */
export async function BomCalculationSuperBomAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomCalculationSuperBomAsyncParams,
	body: API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoAttributeVariableDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpSmartErpSuperBomItemsSuperBomItem[]>('/api/smart-erp/bom/calculation-super-bom', {
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

/** 此处后端没有提供注释 POST /api/smart-erp/bom/calculation-super-configuration */
export async function BomCalculationSuperConfigurationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomCalculationSuperConfigurationAsyncParams,
	body: API.BurnAbpSmartErp_jichuxinxi_wuliaoqingdanDtoAttributeVariableDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpSmartErpSuperBomItemsSuperBomItem[]>('/api/smart-erp/bom/calculation-super-configuration', {
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
