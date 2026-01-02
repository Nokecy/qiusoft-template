// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/wms/material-manager-setting/${param0} */
export async function MaterialItemManagerSettingGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemManagerSettingGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto>(`/api/wms/material-manager-setting/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 批量替换物料管理员 POST /api/wms/material-manager-setting/bulk-replace */
export async function MaterialItemManagerSettingBulkReplaceAsync(body: API.BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiBulkReplaceSettingDto, options?: { [key: string]: any }) {
	return request<any>('/api/wms/material-manager-setting/bulk-replace', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 创建物料管理员信息 POST /api/wms/material-manager-setting/create */
export async function MaterialItemManagerSettingCreateAsync(
	body: API.BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiCreateMaterialItemManagerSettingInput,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto>('/api/wms/material-manager-setting/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 删除物料管理员 POST /api/wms/material-manager-setting/delete/${param0} */
export async function MaterialItemManagerSettingDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemManagerSettingDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/wms/material-manager-setting/delete/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 导出 GET /api/wms/material-manager-setting/export */
export async function MaterialItemManagerSettingExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemManagerSettingExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/wms/material-manager-setting/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导入物料管理员信息 POST /api/wms/material-manager-setting/import */
export async function MaterialItemManagerSettingImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/wms/material-manager-setting/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/wms/material-manager-setting/import-template */
export async function MaterialItemManagerSettingGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/wms/material-manager-setting/import-template', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取物料管理员列表 GET /api/wms/material-manager-setting/list */
export async function MaterialItemManagerSettingGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemManagerSettingGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto>('/api/wms/material-manager-setting/list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新物料管理员信息 POST /api/wms/material-manager-setting/update/${param0} */
export async function MaterialItemManagerSettingUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.MaterialItemManagerSettingUpdateAsyncParams,
	body: API.BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiUpdateMaterialItemManagerSettingInput,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpWMS_jichuxinxi_wuliaoguanlirenshezhiMaterialItemManagerSettingDto>(`/api/wms/material-manager-setting/update/${param0}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}
