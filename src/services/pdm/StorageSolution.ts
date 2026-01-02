// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取存储方案列表。 GET /api/pdm/storage-solution */
export async function StorageSolutionGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>('/api/pdm/storage-solution', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/storage-solution */
export async function StorageSolutionCreateAsync(body: API.BurnAbpPdmDocumentManagementStorageSolutionsCreateStorageSolutionDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>('/api/pdm/storage-solution', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取存储方案详情。 GET /api/pdm/storage-solution/${param0} */
export async function StorageSolutionGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 激活存储方案。 POST /api/pdm/storage-solution/${param0}/activate */
export async function StorageSolutionActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 停用存储方案。 POST /api/pdm/storage-solution/${param0}/deactivate */
export async function StorageSolutionDeactivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionDeactivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}/deactivate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除存储方案。 POST /api/pdm/storage-solution/${param0}/delete */
export async function StorageSolutionDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/storage-solution/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行健康检查。 TODO: 当前为简化版本，实际应实现：
- 连接性测试
- 读写权限测试
- 存储空间检查
- 响应时间测量 POST /api/pdm/storage-solution/${param0}/perform-health-check */
export async function StorageSolutionPerformHealthCheckAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionPerformHealthCheckAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageHealthCheckResultDto>(`/api/pdm/storage-solution/${param0}/perform-health-check`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置为默认存储方案。 设置默认方案时会自动取消当前的默认方案。 POST /api/pdm/storage-solution/${param0}/set-as-default */
export async function StorageSolutionSetAsDefaultAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionSetAsDefaultAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}/set-as-default`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 设置存储配额。 POST /api/pdm/storage-solution/${param0}/set-quota */
export async function StorageSolutionSetQuotaAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionSetQuotaAsyncParams,
	body: API.BurnAbpPdmDocumentManagementStorageSolutionsSetQuotaDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}/set-quota`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/storage-solution/${param0}/update */
export async function StorageSolutionUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementStorageSolutionsUpdateStorageSolutionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新存储方案配置。 POST /api/pdm/storage-solution/${param0}/update-configuration */
export async function StorageSolutionUpdateConfigurationAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionUpdateConfigurationAsyncParams,
	body: API.BurnAbpPdmDocumentManagementStorageSolutionsUpdateStorageConfigurationDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionDto>(`/api/pdm/storage-solution/${param0}/update-configuration`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取存储使用情况统计。 GET /api/pdm/storage-solution/${param0}/usage-statistics */
export async function StorageSolutionGetUsageStatisticsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.StorageSolutionGetUsageStatisticsAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageUsageStatisticsDto>(`/api/pdm/storage-solution/${param0}/usage-statistics`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取激活的存储方案查找列表（用于下拉选择）。 GET /api/pdm/storage-solution/active-lookup-list */
export async function StorageSolutionGetActiveLookupListAsync(options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementStorageSolutionsStorageSolutionLookupDto[]>('/api/pdm/storage-solution/active-lookup-list', {
		method: 'GET',
		...(options || {}),
	});
}
