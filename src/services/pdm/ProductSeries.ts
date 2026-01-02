// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取分页列表（支持动态查询） GET /api/pdm/product-series */
export async function ProductSeriesGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto>('/api/pdm/product-series', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建产品系列 POST /api/pdm/product-series */
export async function ProductSeriesCreateAsync(body: API.BurnAbpPdmPartManagementProductSeriesDtosCreateProductSeriesDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto>('/api/pdm/product-series', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/product-series/${param0} */
export async function ProductSeriesGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto>(`/api/pdm/product-series/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 启用产品系列 POST /api/pdm/product-series/${param0}/activate */
export async function ProductSeriesActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/product-series/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取祖先链 GET /api/pdm/product-series/${param0}/ancestors */
export async function ProductSeriesGetAncestorsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesGetAncestorsAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto[]>(`/api/pdm/product-series/${param0}/ancestors`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 禁用产品系列 POST /api/pdm/product-series/${param0}/deactivate */
export async function ProductSeriesDeactivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesDeactivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/product-series/${param0}/deactivate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除产品系列 POST /api/pdm/product-series/${param0}/delete */
export async function ProductSeriesDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/product-series/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取所有后代 GET /api/pdm/product-series/${param0}/descendants */
export async function ProductSeriesGetDescendantsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesGetDescendantsAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto[]>(`/api/pdm/product-series/${param0}/descendants`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取完整路径显示 GET /api/pdm/product-series/${param0}/full-path */
export async function ProductSeriesGetFullPathAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesGetFullPathAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<string>(`/api/pdm/product-series/${param0}/full-path`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 移动产品系列到新的父节点 POST /api/pdm/product-series/${param0}/move */
export async function ProductSeriesMoveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesMoveAsyncParams,
	body: API.BurnAbpPdmPartManagementProductSeriesDtosMoveProductSeriesDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto>(`/api/pdm/product-series/${param0}/move`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新产品系列 POST /api/pdm/product-series/${param0}/update */
export async function ProductSeriesUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementProductSeriesDtosUpdateProductSeriesDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto>(`/api/pdm/product-series/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取子节点列表 GET /api/pdm/product-series/children/${param0} */
export async function ProductSeriesGetChildrenAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesGetChildrenAsyncParams,
	options?: { [key: string]: any }
) {
	const { parentId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesDto[]>(`/api/pdm/product-series/children/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 检查编码是否已存在 POST /api/pdm/product-series/is-series-code-exists/${param0} */
export async function ProductSeriesIsSeriesCodeExistsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProductSeriesIsSeriesCodeExistsAsyncParams,
	options?: { [key: string]: any }
) {
	const { excludeId: param0, ...queryParams } = params;
	return request<boolean>(`/api/pdm/product-series/is-series-code-exists/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 获取树形结构数据 GET /api/pdm/product-series/tree */
export async function ProductSeriesGetTreeAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesTreeDto[]>('/api/pdm/product-series/tree', {
		method: 'GET',
		...(options || {}),
	});
}
