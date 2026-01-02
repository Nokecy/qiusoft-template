// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取文档归档列表（支持动态查询） GET /api/pdm/document-archive */
export async function DocumentArchiveGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>('/api/pdm/document-archive', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 创建文档归档（Web 上传方式） 执行流程：
1. 业务规则验证：如果是 FAI评审报告，必须输入产品名称
2. 生成归档编号（格式：DA-{yyyy}-{序号}）
3. 生成基于时间戳的 Blob 文件名（路径：{yyyyMMddhhmm}\{文档名称}）
4. 映射 DTO 到实体并保存
5. 启动工作流实例
6. 从临时存储转移文件到正式 Blob 容器 POST /api/pdm/document-archive */
export async function DocumentArchiveCreateAsync(body: API.BurnAbpPdmDocumentManagementDocumentArchivesCreateDocumentArchiveDto, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>('/api/pdm/document-archive', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取单个文档归档 GET /api/pdm/document-archive/${param0} */
export async function DocumentArchiveGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>(`/api/pdm/document-archive/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除文档归档 执行流程：
1. 获取归档实体
2. 删除归档实体
3. 取消关联的工作流实例
            
注意：附件文件不会被删除，仅删除数据库记录和工作流实例 POST /api/pdm/document-archive/${param0}/delete */
export async function DocumentArchiveDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/document-archive/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 下载文档归档附件 POST /api/pdm/document-archive/${param0}/download-attachment */
export async function DocumentArchiveDownloadAttachmentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveDownloadAttachmentAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>(`/api/pdm/document-archive/${param0}/download-attachment`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） 执行流程：
1. 验证归档状态和工作流状态
2. 临时保存输入参数（DocNo、StorageLibraryId、RecycleLibraryId、RejectionReason）
3. 执行工作流操作
4. 根据工作流执行后的 OrderStatus 判断结果：
   - Approved（审批通过）：保留 DocNo、StorageLibraryId、RecycleLibraryId
   - Rejected（审批驳回）：保留 RejectionReason
5. 审批通过后，OnWorkflowStatusChanged 中调用 Approve() 触发文档创建 POST /api/pdm/document-archive/${param0}/execute-workflow */
export async function DocumentArchiveExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentArchivesExecuteDocumentArchiveWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>(`/api/pdm/document-archive/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 提交文档归档（启动工作流审批） POST /api/pdm/document-archive/${param0}/submit */
export async function DocumentArchiveSubmitAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveSubmitAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>(`/api/pdm/document-archive/${param0}/submit`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 更新文档归档（仅草稿/未提交单据可修改） POST /api/pdm/document-archive/${param0}/update */
export async function DocumentArchiveUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementDocumentArchivesUpdateDocumentArchiveDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentArchivesDocumentArchiveDto>(`/api/pdm/document-archive/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 执行文档归档（更新+工作流执行） POST /api/pdm/document-archive/execute */
export async function DocumentArchiveExecuteAsync(body: API.BurnAbpPdmDocumentManagementDocumentArchivesExecuteDocumentArchiveDto, options?: { [key: string]: any }) {
	return request<any>('/api/pdm/document-archive/execute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 导出文档归档列表到 Excel 执行流程：
1. 使用动态查询获取归档列表
2. 映射实体到导出 DTO（DocumentArchiveExportDto）
3. 使用 Magicodes.IE 库生成 Excel 文件
4. 返回 Excel 文件流
            
注意：导出的 DTO 可能包含特定的格式化和注解，用于控制 Excel 输出格式 GET /api/pdm/document-archive/export */
export async function DocumentArchiveExportAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentArchiveExportAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/pdm/document-archive/export', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
