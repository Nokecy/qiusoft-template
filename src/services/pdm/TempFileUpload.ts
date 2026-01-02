// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 取消上传并清理已上传的分片。 POST /api/pdm/temp-file-upload/cancel-upload/${param0} */
export async function TempFileUploadCancelUploadAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadCancelUploadAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/temp-file-upload/cancel-upload/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 合并所有分片并完成上传。 POST /api/pdm/temp-file-upload/complete-upload/${param0} */
export async function TempFileUploadCompleteUploadAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadCompleteUploadAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementTempFilesTempFileUploadDto>(`/api/pdm/temp-file-upload/complete-upload/${param0}`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 创建上传会话并返回上传凭证。 POST /api/pdm/temp-file-upload/initiate-upload */
export async function TempFileUploadInitiateUploadAsync_2(body: API.BurnAbpPdmDocumentManagementTempFilesInitiateUploadInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementTempFilesTempFileUploadDto>('/api/pdm/temp-file-upload/initiate-upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取缺失分片索引，便于断点续传。 GET /api/pdm/temp-file-upload/missing-chunks/${param0} */
export async function TempFileUploadGetMissingChunksAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadGetMissingChunksAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<number[]>(`/api/pdm/temp-file-upload/missing-chunks/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 上传单个分片并刷新进度。
使用分布式锁确保同一上传会话的分片更新是串行化的，避免并发冲突。 POST /api/pdm/temp-file-upload/upload-chunk */
export async function TempFileUploadUploadChunkAsync_2(body: API.BurnAbpPdmDocumentManagementTempFilesUploadChunkInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementTempFilesUploadProgressDto>('/api/pdm/temp-file-upload/upload-chunk', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 获取上传进度。 GET /api/pdm/temp-file-upload/upload-progress/${param0} */
export async function TempFileUploadGetUploadProgressAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadGetUploadProgressAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementTempFilesUploadProgressDto>(`/api/pdm/temp-file-upload/upload-progress/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 取消上传
DELETE /api/pdm/temp-file-uploads/{uploadId} DELETE /api/pdm/temp-file-uploads/${param0} */
export async function TempFileUploadCancelUploadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadCancelUploadAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/temp-file-uploads/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 上传分片
PUT /api/pdm/temp-file-uploads/{uploadId}/chunks/{chunkIndex}
支持 Content-Range 头: bytes {start}-{end}/{total} POST /api/pdm/temp-file-uploads/${param0}/chunks/${param1} */
export async function TempFileUploadUploadChunkAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadUploadChunkAsyncParams,
	body: {},
	file?: File,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, chunkIndex: param1, ...queryParams } = params;
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

	return request<API.BurnAbpPdmDocumentManagementTempFilesUploadProgressDto>(`/api/pdm/temp-file-uploads/${param0}/chunks/${param1}`, {
		method: 'POST',
		params: { ...queryParams },
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 完成上传
POST /api/pdm/temp-file-uploads/{uploadId}/complete POST /api/pdm/temp-file-uploads/${param0}/complete */
export async function TempFileUploadCompleteUploadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadCompleteUploadAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementTempFilesTempFileUploadDto>(`/api/pdm/temp-file-uploads/${param0}/complete`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取缺失的分片索引列表（用于断点续传）
GET /api/pdm/temp-file-uploads/{uploadId}/missing-chunks GET /api/pdm/temp-file-uploads/${param0}/missing-chunks */
export async function TempFileUploadGetMissingChunksAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadGetMissingChunksAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmControllersDocumentManagementMissingChunksDto>(`/api/pdm/temp-file-uploads/${param0}/missing-chunks`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取上传进度
GET /api/pdm/temp-file-uploads/{uploadId}/progress GET /api/pdm/temp-file-uploads/${param0}/progress */
export async function TempFileUploadGetUploadProgressAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.TempFileUploadGetUploadProgressAsyncParams,
	options?: { [key: string]: any }
) {
	const { uploadId: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementTempFilesUploadProgressDto>(`/api/pdm/temp-file-uploads/${param0}/progress`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 发起文件上传
POST /api/pdm/temp-file-uploads/initiate POST /api/pdm/temp-file-uploads/initiate */
export async function TempFileUploadInitiateUploadAsync(body: API.BurnAbpPdmDocumentManagementTempFilesInitiateUploadInput, options?: { [key: string]: any }) {
	return request<API.BurnAbpPdmDocumentManagementTempFilesTempFileUploadDto>('/api/pdm/temp-file-uploads/initiate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}
