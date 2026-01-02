// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/asset */
export async function AssetGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AssetGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAssetsAssetDto>('/api/common/asset', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/asset */
export async function AssetCreateAsync(body: API.BurnAbpErpCommonMaterialManagementAssetsCreateAssetInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialManagementAssetsAssetDto>('/api/common/asset', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/asset/${param0} */
export async function AssetGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AssetGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAssetsAssetDto>(`/api/common/asset/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/asset/${param0}/delete */
export async function AssetDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AssetDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/asset/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/asset/${param0}/update */
export async function AssetUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AssetUpdateAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementAssetsUpdateAssetInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAssetsAssetDto>(`/api/common/asset/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据编码获取资产 GET /api/common/asset/by-code */
export async function AssetGetByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AssetGetByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementAssetsAssetDto>('/api/common/asset/by-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/asset/export */
export async function AssetExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AssetExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/asset/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/asset/import */
export async function AssetImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/asset/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/asset/import-template */
export async function AssetGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/asset/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
