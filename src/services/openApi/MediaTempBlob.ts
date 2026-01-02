// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/attachmentManage/temp-blob/confirm-video */
export async function MediaTempBlobConfirmVideoAsync(body: API.BurnAbpAttachmentManageModelsConfirmVideoModel, options?: { [key: string]: any }) {
	return request<API.BurnAbpAttachmentManageModelsMediaAttachmentModel>('/api/attachmentManage/temp-blob/confirm-video', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/attachmentManage/temp-blob/upload-images */
export async function MediaTempBlobUploadImagesAsync(body: {}, Files?: File[], options?: { [key: string]: any }) {
	const formData = new FormData();

	if (Files) {
		Files.forEach(f => formData.append('Files', f || ''));
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

	return request<API.BurnAbpAttachmentManageModelsMediaAttachmentModel[]>('/api/attachmentManage/temp-blob/upload-images', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/attachmentManage/temp-blob/upload-video-chunk */
export async function MediaTempBlobUploadVideoChunkAsync(
	body: {
		Chunk?: number;
		Chunks?: number;
		EachSize?: number;
		FileName?: string;
		FullSize?: number;
		Uid?: string;
	},
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

	return request<any>('/api/attachmentManage/temp-blob/upload-video-chunk', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}
