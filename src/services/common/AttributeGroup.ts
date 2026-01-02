// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/common/attribute-group */
export async function AttributeGroupGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto>('/api/common/attribute-group', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group */
export async function AttributeGroupCreateAsync(body: API.BurnAbpErpCommonMaterialManagementAttributeGroupsCreateAttributeGroupDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto>('/api/common/attribute-group', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute-group/${param0} */
export async function AttributeGroupGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto>(`/api/common/attribute-group/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/${param0}/delete */
export async function AttributeGroupDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/common/attribute-group/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/${param0}/update */
export async function AttributeGroupUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupUpdateAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementAttributeGroupsUpdateAttributeGroupDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto>(`/api/common/attribute-group/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute-group/${param0}/with-members */
export async function AttributeGroupGetWithMembersAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupGetWithMembersAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto>(`/api/common/attribute-group/${param0}/with-members`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/attribute-to-group */
export async function AttributeGroupAddAttributeToGroupAsync(body: API.BurnAbpErpCommonMaterialManagementAttributeGroupsAddAttributeToGroupDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupMemberDto>('/api/common/attribute-group/attribute-to-group', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/attribute-to-group/${param0} */
export async function AttributeGroupAddAttributeToGroupAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupAddAttributeToGroupAsyncParams,
	body: API.BurnAbpErpCommonMaterialManagementAttributeGroupsAddAttributeToGroupDto,
	options?: { [key: string]: any }
) {
	const { attributeGroupId: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupMemberDto>(`/api/common/attribute-group/attribute-to-group/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute-group/attributes-in-group/${param0} */
export async function AttributeGroupGetAttributesInGroupAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupGetAttributesInGroupAsyncParams,
	options?: { [key: string]: any }
) {
	const { attributeGroupId: param0, ...queryParams } = params;
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributesAttributeDto>(`/api/common/attribute-group/attributes-in-group/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/batch-add-attributes-to-group/${param0} */
export async function AttributeGroupBatchAddAttributesToGroupAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupBatchAddAttributesToGroupAsyncParams,
	body: string[],
	options?: { [key: string]: any }
) {
	const { attributeGroupId: param0, ...queryParams } = params;
	return request<API.BurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupMemberDto[]>(`/api/common/attribute-group/batch-add-attributes-to-group/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/batch-remove-attributes-from-group/${param0} */
export async function AttributeGroupBatchRemoveAttributesFromGroupAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupBatchRemoveAttributesFromGroupAsyncParams,
	body: string[],
	options?: { [key: string]: any }
) {
	const { attributeGroupId: param0, ...queryParams } = params;
	return request<any>(`/api/common/attribute-group/batch-remove-attributes-from-group/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute-group/export */
export async function AttributeGroupExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/common/attribute-group/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/import */
export async function AttributeGroupImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/common/attribute-group/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute-group/import-template */
export async function AttributeGroupGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/common/attribute-group/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/is-attribute-in-group */
export async function AttributeGroupIsAttributeInGroupAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupIsAttributeInGroupAsyncParams,
	options?: { [key: string]: any }
) {
	return request<boolean>('/api/common/attribute-group/is-attribute-in-group', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/common/attribute-group/remove-attribute-from-group */
export async function AttributeGroupRemoveAttributeFromGroupAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupRemoveAttributeFromGroupAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/common/attribute-group/remove-attribute-from-group', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/common/attribute-group/with-members */
export async function AttributeGroupGetWithMembersAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.AttributeGroupGetWithMembersAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpErpCommonMaterialManagementAttributeGroupsAttributeGroupDto>('/api/common/attribute-group/with-members', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
