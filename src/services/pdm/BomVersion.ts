// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取物料版本列表 GET /api/pdm/bom-version */
export async function BomVersionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBomManagementBomVersionsBomVersionDto>('/api/pdm/bom-version', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建物料版本 POST /api/pdm/bom-version */
export async function BomVersionCreateAsync(body: API.BurnAbpPdmBomManagementBomVersionsCreateBomVersionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto>('/api/pdm/bom-version', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取物料版本详情 GET /api/pdm/bom-version/${param0} */
export async function BomVersionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto>(`/api/pdm/bom-version/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 激活版本 POST /api/pdm/bom-version/${param0}/activate */
export async function BomVersionActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto>(`/api/pdm/bom-version/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除物料版本（仅草稿状态） POST /api/pdm/bom-version/${param0}/delete */
export async function BomVersionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/bom-version/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 作废版本 POST /api/pdm/bom-version/${param0}/obsolete */
export async function BomVersionObsoleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionObsoleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto>(`/api/pdm/bom-version/${param0}/obsolete`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 更新物料版本 POST /api/pdm/bom-version/${param0}/update */
export async function BomVersionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionUpdateAsyncParams,
	body: API.BurnAbpPdmBomManagementBomVersionsUpdateBomVersionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto>(`/api/pdm/bom-version/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取物料的所有版本 GET /api/pdm/bom-version/by-material-code */
export async function BomVersionGetByMaterialCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionGetByMaterialCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpPdmBomManagementBomVersionsBomVersionDto>('/api/pdm/bom-version/by-material-code', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取物料在指定日期的有效版本 GET /api/pdm/bom-version/effective-version */
export async function BomVersionGetEffectiveVersionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomVersionGetEffectiveVersionAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto>('/api/pdm/bom-version/effective-version', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
