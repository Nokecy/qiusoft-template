// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/material-com-from-info */
export async function MaterialComFromInfoGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialComFromInfoGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto>('/api/common/material-com-from-info', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/material-com-from-info */
export async function MaterialComFromInfoCreateAsync(
	body: API.BurnAbpErpCommonMaterialManagementMaterialComFromInfosCreateUpdateMaterialComFromInfoDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto>('/api/common/material-com-from-info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material-com-from-info/${param0} */
export async function MaterialComFromInfoGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialComFromInfoGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto>(`/api/common/material-com-from-info/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/material-com-from-info/${param0}/delete */
export async function MaterialComFromInfoDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialComFromInfoDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/material-com-from-info/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/material-com-from-info/${param0}/update */
export async function MaterialComFromInfoUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialComFromInfoUpdateAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementMaterialComFromInfosCreateUpdateMaterialComFromInfoDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialComFromInfosMaterialComFromInfoDto>(`/api/common/material-com-from-info/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material-com-from-info/system-material-com-from-list */
export async function MaterialComFromInfoGetSystemMaterialComFromListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialComFromInfosMaterialComFromInfoModel[]>('/api/common/material-com-from-info/system-material-com-from-list', {
		method: 'GET',
		...(options || {}),
	});
}
