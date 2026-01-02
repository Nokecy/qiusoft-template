// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/pdm/document-library */
export async function DocumentLibraryGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto>('/api/pdm/document-library', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/pdm/document-library */
export async function DocumentLibraryCreateAsync(body: API.BurnAbpPdmDocumentManagementDocumentLibrariesCreateDocumentLibraryDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto>('/api/pdm/document-library', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-library/${param0} */
export async function DocumentLibraryGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto>(`/api/pdm/document-library/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 激活文档库及其所有子级 POST /api/pdm/document-library/${param0}/activate */
export async function DocumentLibraryActivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryActivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-library/${param0}/activate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 停用文档库及其所有子级 POST /api/pdm/document-library/${param0}/deactivate */
export async function DocumentLibraryDeactivateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryDeactivateAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-library/${param0}/deactivate`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除文档库及其所有子级（软删除） 如果文档库或其任何子级下存在文档，则拒绝删除 POST /api/pdm/document-library/${param0}/delete */
export async function DocumentLibraryDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-library/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新文档库信息。 业务规则：当尝试修改存储方案（StorageSolutionId）时，仅在该文档库下不存在文档的前提下才允许修改。 POST /api/pdm/document-library/${param0}/update */
export async function DocumentLibraryUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentLibrariesUpdateDocumentLibraryDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto>(`/api/pdm/document-library/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 获取指定父节点下的文档库列表。 GET /api/pdm/document-library/children/${param0} */
export async function DocumentLibraryGetChildrenAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryGetChildrenAsyncParams,
	options?: { [key: string]: any }
) {
	const { parentLibraryId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto[]>(`/api/pdm/document-library/children/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/pdm/document-library/export */
export async function DocumentLibraryExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/pdm/document-library/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 通过编码查找文档库。 POST /api/pdm/document-library/find-by-code */
export async function DocumentLibraryFindByCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentLibraryFindByCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentLibrariesDocumentLibraryDto>('/api/pdm/document-library/find-by-code', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导入文档库数据 基类工作流程：
1. 读取 Excel 文件并解析为 ImportDto 列表
2. 调用 PreprocessImportDataAsync（如果重写）进行预处理
3. 逐条验证业务规则（调用 GetBusinessErrorAsync）
4. 逐条调用 MapToEntityAsync 转换为实体
5. 批量保存到数据库
            
本实现重写 ImportAsync 以：
- 初始化导入会话缓存，解决父级未提交的问题
- 支持层级结构导入（父库必须在子库之前） POST /api/pdm/document-library/import */
export async function DocumentLibraryImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

	return request<any>('/api/pdm/document-library/import', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 获取导入模板 说明：Magicodes.IE 默认会将枚举下拉选项渲染为枚举名称（如 Storage/Recycle）。
为满足“库类型”下拉显示中文的需求，此处对模板进行二次加工，替换为本地化后的选项文本。 GET /api/pdm/document-library/import-template */
export async function DocumentLibraryGetImportTemplateAsync(options?: { [key: string]: any }) {
	return request<string>('/api/pdm/document-library/import-template', {
		method: 'GET',
		...(options || {}),
	});
}
