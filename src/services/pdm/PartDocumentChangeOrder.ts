// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取技术图纸更改单列表（支持动态查询） GET /api/pdm/part-document-change-order */
export async function PartDocumentChangeOrderGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto>('/api/pdm/part-document-change-order', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建技术图纸更改单（Web 上传方式） 执行流程：
1. 生成更改单编号（格式：PDCO-{yyyy}-{序号}）
2. 映射 DTO 到实体并设置编号和ID
3. 处理文档项（Items）：
   - 为每个文档项生成不重复的 Blob 文件名
   - 创建文档项实体并添加到更改单
4. 处理临时注释（TemporaryNotes）：添加到更改单
5. 处理实施项（ImplementItems）：添加到更改单
6. 生成更改单主附件的 Blob 文件名
7. 保存更改单实体到数据库
8. 启动工作流实例
9. 从临时存储转移所有文档项文件到正式 Blob 容器
10. 从临时存储转移更改单主附件到正式 Blob 容器（如果提供）
            
注意：使用 UnitOfWork 确保数据一致性 POST /api/pdm/part-document-change-order */
export async function PartDocumentChangeOrderCreateAsync(
	body: API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersCreatePartDocumentChangeOrderDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto>('/api/pdm/part-document-change-order', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取单个技术图纸更改单 注意：临时注释按 Order 字段排序返回 GET /api/pdm/part-document-change-order/${param0} */
export async function PartDocumentChangeOrderGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto>(`/api/pdm/part-document-change-order/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除技术图纸更改单 执行流程：
1. 获取更改单实体
2. 取消关联的工作流实例
3. 删除更改单实体（级联删除文档项、临时注释和实施项）
            
注意：附件文件不会被删除，仅删除数据库记录和工作流实例 POST /api/pdm/part-document-change-order/${param0}/delete */
export async function PartDocumentChangeOrderDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/part-document-change-order/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 下载技术图纸更改单主附件 POST /api/pdm/part-document-change-order/${param0}/download-attachment */
export async function PartDocumentChangeOrderDownloadAttachmentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderDownloadAttachmentAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>(`/api/pdm/part-document-change-order/${param0}/download-attachment`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/part-document-change-order/${param0}/execute-workflow */
export async function PartDocumentChangeOrderExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersExecutePartDocumentChangeOrderWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto>(`/api/pdm/part-document-change-order/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新技术图纸更改单（仅修改业务字段与附件，不执行工作流） POST /api/pdm/part-document-change-order/${param0}/update */
export async function PartDocumentChangeOrderUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersUpdatePartDocumentChangeOrderDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto>(`/api/pdm/part-document-change-order/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 关闭技术图纸更改单 执行流程：
1. 取消关联的工作流实例（强制结束审批流程）
2. 获取更改单实体
3. 保存更改单更新
            
注意：关闭更改单不会删除实体，只是取消工作流 POST /api/pdm/part-document-change-order/close */
export async function PartDocumentChangeOrderCloseAsync(
	body: API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersExecutePartDocumentChangeOrderDto,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/part-document-change-order/close', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 按物料编码获取关联网项的文档信息 GET /api/pdm/part-document-change-order/documents-by-material-code */
export async function PartDocumentChangeOrderGetDocumentsByMaterialCodeAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderGetDocumentsByMaterialCodeAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDocumentLookupDto>(
		'/api/pdm/part-document-change-order/documents-by-material-code',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 下载技术图纸更改单文档项附件 POST /api/pdm/part-document-change-order/download-item-file */
export async function PartDocumentChangeOrderDownloadItemFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderDownloadItemFileAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>('/api/pdm/part-document-change-order/download-item-file', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 导出技术图纸更改单列表到 Excel 执行流程：
1. 强制设置分页参数（最多导出 1000 条）
2. 获取更改单列表
3. 映射实体到导出 DTO（PartDocumentChangeOrderExportDto）
4. 使用 Magicodes.IE 库生成 Excel 文件
5. 返回 Excel 文件流
            
注意：
- 忽略输入的分页参数，强制从第 0 条开始取 1000 条
- 导出的 DTO 可能包含特定的格式化和注解，用于控制 Excel 输出格式 GET /api/pdm/part-document-change-order/export-list */
export async function PartDocumentChangeOrderExportListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderExportListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/pdm/part-document-change-order/export-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建技术图纸更改单（GDP 文件路径方式） 执行流程：
1. 生成更改单编号
2. 验证每个文档项的 GDP 文件路径是否存在
3. 为每个文档项生成 Blob 文件名并创建文档项实体
4. 处理临时注释和实施项
5. 保存更改单实体到数据库
6. 启动工作流实例
7. 从 GDP 文件路径直接读取文件并保存到 Blob 容器
            
注意：
- 此方法不上传更改单主附件
- 每个文档项必须有有效的 GDP 文件路径
- 使用 UnitOfWork 确保数据一致性 POST /api/pdm/part-document-change-order/g-dPCreate */
export async function PartDocumentChangeOrderGDPCreateAsync(
	body: API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersCreatePartDocumentChangeOrderDto,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/part-document-change-order/g-dPCreate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 根据上传文件名匹配现有文档（忽略大小写与扩展名；支持去除最后一个下划线后的版本段） POST /api/pdm/part-document-change-order/match-document-by-attachment-name */
export async function PartDocumentChangeOrderMatchDocumentByAttachmentNameAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderMatchDocumentByAttachmentNameAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDocumentLookupDto>(
		'/api/pdm/part-document-change-order/match-document-by-attachment-name',
		{
			method: 'POST',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 获取物料编码下拉项（去重 + 关键字过滤） GET /api/pdm/part-document-change-order/material-codes */
export async function PartDocumentChangeOrderGetMaterialCodesAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.PartDocumentChangeOrderGetMaterialCodesAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderMaterialCodeLookupDto>(
		'/api/pdm/part-document-change-order/material-codes',
		{
			method: 'GET',
			params: {
				// maxResultCount has a default value: 20
				maxResultCount: '20',
				...params,
			},
			...(options || {}),
		}
	);
}
