// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/**
 * 技术图纸更改单（图纸文件升级）：前端联动查询接口（自定义，不走 openapi 生成，避免被 yarn openapi 覆盖删除）
 */

/** 获取物料编码下拉（去重，来自文档列表 PrimaryPartLink.PartNumber） */
export async function PartDocumentChangeOrderGetMaterialCodesAsync(
	params: {
		keyword?: string;
		maxResultCount?: number;
	},
	options?: { [key: string]: any },
) {
	return request<any[]>('/api/pdm/part-document-change-order-lookup/material-codes', {
		method: 'GET',
		params: { ...params },
		...(options || {}),
	});
}

/** 根据物料编码获取文档列表 */
export async function PartDocumentChangeOrderGetDocumentsByMaterialCodeAsync(
	params: {
		materialCode: string;
	},
	options?: { [key: string]: any },
) {
	return request<any[]>('/api/pdm/part-document-change-order-lookup/documents-by-material-code', {
		method: 'GET',
		params: { ...params },
		...(options || {}),
	});
}

/** 根据附件文件名匹配文档（忽略扩展名、忽略大小写） */
export async function PartDocumentChangeOrderGetDocumentsByAttachmentNameAsync(
	params: {
		fileName: string;
		maxResultCount?: number;
	},
	options?: { [key: string]: any },
) {
	return request<any[]>('/api/pdm/part-document-change-order-lookup/documents-by-attachment-name', {
		method: 'GET',
		params: { ...params },
		...(options || {}),
	});
}

