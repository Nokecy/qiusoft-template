// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取工程文件通知单列表（支持动态查询） GET /api/pdm/engineering-file-notification */
export async function EngineeringFileNotificationGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>(
		'/api/pdm/engineering-file-notification',
		{
			method: 'GET',
			params: {
				...params,
			},
			...(options || {}),
		}
	);
}

/** 创建工程文件通知单 执行流程：
1. 生成通知单编号（格式：EFN-{yyyy}-{序号}）
2. 映射 DTO 到实体并设置编号
3. 生成 Blob 文件名（路径：{物料编号}/{单号}_{原始文件名}）
4. 保存通知单实体到数据库
5. 启动工作流实例
6. 从临时存储转移文件到正式 Blob 容器 POST /api/pdm/engineering-file-notification */
export async function EngineeringFileNotificationCreateAsync(
	body: API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsCreateEngineeringFileNotificationDto,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>('/api/pdm/engineering-file-notification', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取单个工程文件通知单 GET /api/pdm/engineering-file-notification/${param0} */
export async function EngineeringFileNotificationGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>(`/api/pdm/engineering-file-notification/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除工程文件通知单 执行流程：
1. 获取通知单实体
2. 取消关联的工作流实例
3. 删除通知单实体（注意：附件文件不会被删除） POST /api/pdm/engineering-file-notification/${param0}/delete */
export async function EngineeringFileNotificationDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/engineering-file-notification/${param0}/delete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 下载工程文件通知单附件 POST /api/pdm/engineering-file-notification/${param0}/download-attachment */
export async function EngineeringFileNotificationDownloadAttachmentAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationDownloadAttachmentAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentsDownloadDocumentFileOutput>(`/api/pdm/engineering-file-notification/${param0}/download-attachment`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 执行工作流审批
用于审批操作（通过、驳回、退回等） POST /api/pdm/engineering-file-notification/${param0}/execute-workflow */
export async function EngineeringFileNotificationExecuteWorkflowAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationExecuteWorkflowAsyncParams,
	body: API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsExecuteEngineeringFileNotificationWorkflowDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>(`/api/pdm/engineering-file-notification/${param0}/execute-workflow`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 更新工程文件通知单（仅修改业务字段和附件，不执行工作流） POST /api/pdm/engineering-file-notification/${param0}/update */
export async function EngineeringFileNotificationUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationUpdateAsyncParams,
	body: API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsUpdateEngineeringFileNotificationDto,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsEngineeringFileNotificationDto>(`/api/pdm/engineering-file-notification/${param0}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: { ...queryParams },
		data: body,
		...(options || {}),
	});
}

/** 执行工作流活动（审批节点） 执行流程：
1. 获取通知单实体
2. 更新实体属性（从输入参数映射）
3. 保存实体更新
4. 如果提供了新文件，替换现有附件
5. 执行工作流活动（推进到下一个节点） POST /api/pdm/engineering-file-notification/execute */
export async function EngineeringFileNotificationExecuteAsync(
	body: API.BurnAbpPdmDocumentManagementEngineeringFileNotificationsExecuteEngineeringFileNotificationDto,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/engineering-file-notification/execute', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 导出工程文件通知单列表到 Excel 执行流程：
1. 强制设置分页参数（最多导出 1000 条）
2. 获取通知单列表
3. 映射实体到导出 DTO（EngineeringFileNotificationExportDto）
4. 使用 Magicodes.IE 库生成 Excel 文件
5. 返回 Excel 文件流
            
注意：
- 忽略输入的分页参数，强制从第 0 条开始取 1000 条
- 导出的 DTO 包含格式化和注解，用于控制 Excel 输出格式 GET /api/pdm/engineering-file-notification/export-list */
export async function EngineeringFileNotificationExportListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.EngineeringFileNotificationExportListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<string>('/api/pdm/engineering-file-notification/export-list', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
