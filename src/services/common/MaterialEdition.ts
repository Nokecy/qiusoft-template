// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/material-edition */
export async function MaterialEditionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialEditionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto>('/api/common/material-edition', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建物料版本 POST /api/common/material-edition */
export async function MaterialEditionCreateAsync(body: API.BurnAbpErpCommonMaterialManagementMaterialEditionsCreateUpdateMaterialEditionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto>('/api/common/material-edition', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/material-edition/${param0} */
export async function MaterialEditionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialEditionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto>(`/api/common/material-edition/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/material-edition/${param0}/delete */
export async function MaterialEditionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialEditionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/material-edition/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新物料版本 POST /api/common/material-edition/${param0}/update */
export async function MaterialEditionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialEditionUpdateAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementMaterialEditionsCreateUpdateMaterialEditionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto>(`/api/common/material-edition/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 根据物料编码获取有效版本 GET /api/common/material-edition/effective-version */
export async function MaterialEditionGetEffectiveVersionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialEditionGetEffectiveVersionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto>('/api/common/material-edition/effective-version', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 根据物料编码获取所有版本 GET /api/common/material-edition/versions */
export async function MaterialEditionGetAllVersionsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialEditionGetAllVersionsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpErpCommonMaterialManagementMaterialEditionsMaterialEditionDto[]>('/api/common/material-edition/versions', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
