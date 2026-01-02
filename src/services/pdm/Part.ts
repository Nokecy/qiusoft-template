// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取物料列表（重写以包含属性值）
使用 CQRS 模式，调用 Domain Service 处理复杂查询聚合 GET /api/pdm/part */
export async function PartGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmPartManagementPartsDtosPartDto>('/api/pdm/part', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建物料，自动校验分类、生成或验证物料编号并写入属性值。 POST /api/pdm/part */
export async function PartCreateAsync(body: API.BurnAbpPdmPartManagementPartsDtosCreatePartDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>('/api/pdm/part', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取单个物料详情（重写以包含属性值） GET /api/pdm/part/${param0} */
export async function PartGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 审批通过 POST /api/pdm/part/${param0}/approve */
export async function PartApproveAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartApproveAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosApprovePartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/approve`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 检入物料（解除锁定，保留草稿状态） POST /api/pdm/part/${param0}/check-in */
export async function PartCheckInAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCheckInAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/check-in`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 检出物料（创建新版本草稿并锁定） POST /api/pdm/part/${param0}/check-out */
export async function PartCheckOutAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCheckOutAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosCheckOutPartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto>(`/api/pdm/part/${param0}/check-out`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 删除物料。
业务规则：已发布的物料不允许删除 POST /api/pdm/part/${param0}/delete */
export async function PartDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建新版本物料（版本升级） POST /api/pdm/part/${param0}/new-version */
export async function PartCreateNewVersionAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartCreateNewVersionAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosCreateNewVersionDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/new-version`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 淘汰物料 POST /api/pdm/part/${param0}/obsolete */
export async function PartObsoleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartObsoleteAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosObsoletePartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/obsolete`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 审批拒绝 POST /api/pdm/part/${param0}/reject */
export async function PartRejectAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartRejectAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosRejectPartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/reject`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 发布物料（由 PartApplicationRequest 审批通过后调用） POST /api/pdm/part/${param0}/release */
export async function PartReleaseAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartReleaseAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/release`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 提交审批 POST /api/pdm/part/${param0}/submit */
export async function PartSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartSubmitAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosSubmitPartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/submit`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 撤销检出（删除草稿版本，恢复到已发布状态） POST /api/pdm/part/${param0}/undo-check-out */
export async function PartUndoCheckOutAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartUndoCheckOutAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosUndoCheckOutPartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part/${param0}/undo-check-out`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新物料基础信息与属性值。 POST /api/pdm/part/${param0}/update */
export async function PartUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartUpdateAsyncParams,
	body: API.BurnAbpPdmPartManagementPartsDtosUpdatePartDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取物料的版本历史列表（通过物料ID） GET /api/pdm/part/${param0}/version-history-by-id */
export async function PartGetVersionHistoryByIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartGetVersionHistoryByIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto[]>(`/api/pdm/part/${param0}/version-history-by-id`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 撤回审批申请 POST /api/pdm/part/${param0}/withdraw-approval */
export async function PartWithdrawApprovalAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartWithdrawApprovalAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmPartManagementPartsDtosPartDto>(`/api/pdm/part/${param0}/withdraw-approval`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/part/export */
export async function PartExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/pdm/part/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/part/import */
export async function PartImportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartImportAsyncParams,
	body: {},
	File?: File,
	options?: { [key: string]: any }
) {
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

	return request<API.BurnAbpPdmPartManagementPartsMaterialImportResultDto>('/api/pdm/part/import', {
		method: 'POST',
		params: {
			...params,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/part/import-template */
export async function PartGetImportTemplateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartGetImportTemplateAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/pdm/part/import-template', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取物料的版本历史列表 GET /api/pdm/part/version-history */
export async function PartGetVersionHistoryAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartGetVersionHistoryAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmPartManagementPartVersionsDtosPartVersionDto[]>('/api/pdm/part/version-history', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
