// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/attachmentManage/temp-blob/upload */
export async function TempBlobUploadUploadAttachmentAsync(
	body: {
		chunked?: boolean;
		chunk?: number;
		chunks?: number;
		eachSize?: number;
		fileName?: string;
		fullSize?: number;
		uid?: string;
	},
	file?: File,
	options?: { [key: string]: any }
) {
	const formData = new FormData();

	if (file) {
		formData.append('file', file);
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

	return request<any>('/api/attachmentManage/temp-blob/upload', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/attachmentManage/temp-blob/valiate */
export async function TempBlobUploadValidateFileAsync(body: API.BurnAbpAttachmentManageModelsValidateFileModel, options?: { [key: string]: any }) {
	return request<any>('/api/attachmentManage/temp-blob/valiate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
