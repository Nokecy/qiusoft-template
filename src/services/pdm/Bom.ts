// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取BOM列表 GET /api/pdm/bom */
export async function BomGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBomManagementBomsBomDto>('/api/pdm/bom', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建BOM（BomManager 自动创建父项 BomItem POST /api/pdm/bom */
export async function BomCreateAsync(body: API.BurnAbpPdmBomManagementBomsCreateBomDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBomManagementBomsBomDto>('/api/pdm/bom', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取BOM详情 GET /api/pdm/bom/${param0} */
export async function BomGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomsBomDto>(`/api/pdm/bom/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除BOM（通过领域服务处理业务规则验证） POST /api/pdm/bom/${param0}/delete */
export async function BomDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/bom/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批量更新BOM明细项 POST /api/pdm/bom/batch-update-items */
export async function BomBatchUpdateItemsAsync(body: API.BurnAbpPdmBomManagementBomsBatchUpdateBomItemsDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBomManagementBomsBomItemDto[]>('/api/pdm/bom/batch-update-items', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取BOM递归树形结构（按版本号查询，树形结构）
根据物料来源（生产、虚拟、模型）自动递归查询子 BOM GET /api/pdm/bom/bom-tree-recursive/${param0} */
export async function BomGetBomTreeRecursiveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetBomTreeRecursiveAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomsBomItemTreeDto[]>(`/api/pdm/bom/bom-tree-recursive/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 获取BOM树形结构（按版本号查询，扁平列表） GET /api/pdm/bom/bom-tree/${param0} */
export async function BomGetBomTreeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetBomTreeAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmBomManagementBomsBomItemDto>(`/api/pdm/bom/bom-tree/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 比对两个BOM版本的差异 POST /api/pdm/bom/compare-bom-versions/${param0} */
export async function BomCompareBomVersionsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomCompareBomVersionsAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmBomManagementBomDifferenceDto>(`/api/pdm/bom/compare-bom-versions/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 跨BOM比对（不同物料编码的BOM结构对照） POST /api/pdm/bom/compare-cross-bom */
export async function BomCompareCrossBomAsync(body: API.BurnAbpPdmBomManagementCrossBomCompareInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBomManagementCrossBomCompareResultDto>('/api/pdm/bom/compare-cross-bom', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 复制BOM版本（创建新版本号的明细副本） POST /api/pdm/bom/copy-bom-version/${param0} */
export async function BomCopyBomVersionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomCopyBomVersionAsyncParams,
	options?: { [key: string]: any }
) {
	const { bomId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/bom/copy-bom-version/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 删除BOM明细项（考虑版本延续性） POST /api/pdm/bom/delete-item */
export async function BomDeleteItemAsync(body: API.BurnAbpPdmBomManagementBomsDeleteBomItemDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/bom/delete-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取指定物料的直接子项列表 GET /api/pdm/bom/direct-children */
export async function BomGetDirectChildrenAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetDirectChildrenAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmBomManagementBomsBomRelationViewDto[]>('/api/pdm/bom/direct-children', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取指定物料的直接父项列表 GET /api/pdm/bom/direct-parents */
export async function BomGetDirectParentsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetDirectParentsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmBomManagementBomsBomRelationViewDto[]>('/api/pdm/bom/direct-parents', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 为BOM添加明细（指定版本号） POST /api/pdm/bom/item */
export async function BomAddItemAsync(body: API.BurnAbpPdmBomManagementBomsCreateBomItemDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBomManagementBomsBomItemDto>('/api/pdm/bom/item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据子项物料编码反查父项BOM（递归查找所有上级）
✅ P0修复：批量查询避免N+1问题，添加递归深度限制防止DoS攻击 GET /api/pdm/bom/parent-boms */
export async function BomGetParentBomsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetParentBomsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]>('/api/pdm/bom/parent-boms', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取指定物料的顶级父项列表 GET /api/pdm/bom/top-level-parents */
export async function BomGetTopLevelParentsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.BomGetTopLevelParentsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmBomManagementBomsBomRelationViewDto[]>('/api/pdm/bom/top-level-parents', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新BOM明细项 POST /api/pdm/bom/update-item */
export async function BomUpdateItemAsync(body: API.BurnAbpPdmBomManagementBomsUpdateBomItemDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmBomManagementBomsBomItemDto>('/api/pdm/bom/update-item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
