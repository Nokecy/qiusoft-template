// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/unit */
export async function UnitGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonUnitManagementUnitsUnitDto>('/api/common/unit', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit */
export async function UnitCreateAsync(body: API.BurnAbpErpCommonUnitManagementUnitsCreateUpdateUnitInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitDto>('/api/common/unit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/unit/${param0} */
export async function UnitGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitDto>(`/api/common/unit/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit/${param0}/delete */
export async function UnitDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/unit/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit/${param0}/update */
export async function UnitUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitUpdateAsyncParams,
	body: API.BurnAbpErpCommonUnitManagementUnitsCreateUpdateUnitInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitDto>(`/api/common/unit/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取单位 GET /api/common/unit/by-code */
export async function UnitGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitDto>('/api/common/unit/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取单位转换信息 GET /api/common/unit/conversion-info */
export async function UnitGetConversionInfoAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGetConversionInfoAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitConversionInfoDto>('/api/common/unit/conversion-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 单位转换 POST /api/common/unit/convert */
export async function UnitConvertAsync(body: API.BurnAbpErpCommonUnitManagementUnitsUnitConversionInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitConversionResult>('/api/common/unit/convert', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 批量单位转换 POST /api/common/unit/convert-batch */
export async function UnitConvertBatchAsync(body: API.BurnAbpErpCommonUnitManagementUnitsBatchUnitConversionInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitConversionResult[]>('/api/common/unit/convert-batch', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/unit/export */
export async function UnitExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/unit/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/unit/import */
export async function UnitImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/unit/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/unit/import-template */
export async function UnitGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/unit/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 设置主单位 POST /api/common/unit/set-main-unit/${param0} */
export async function UnitSetMainUnitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitSetMainUnitAsyncParams,
	options?: { [key: string]: any }
) {
	const { unitId: param0, ...queryParams } = params;
	return request<any>(`/api/common/unit/set-main-unit/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取单位组的所有单位 GET /api/common/unit/unit-group-units/${param0} */
export async function UnitGetUnitGroupUnitsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitGetUnitGroupUnitsAsyncParams,
	options?: { [key: string]: any }
) {
	const { unitGroupId: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitGroupUnitsDto>(`/api/common/unit/unit-group-units/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 验证单位转换 POST /api/common/unit/validate-conversion */
export async function UnitValidateConversionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UnitValidateConversionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonUnitManagementUnitsUnitConversionValidationResult>('/api/common/unit/validate-conversion', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}
