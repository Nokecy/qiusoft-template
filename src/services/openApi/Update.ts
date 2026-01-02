// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/update */
export async function UpdateGetListAsync(options?: { [key: string]: any }) {
	return request<any>('/api/update', {
		method: 'GET',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/${param0} */
export async function UpdateGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { appName: param0, ...queryParams } = params;
	return request<any>(`/api/update/${param0}`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/${param0}/${param1} */
export async function UpdateGetFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateGetFileAsyncParams,
	options?: { [key: string]: any }
) {
	const { appName: param0, fileName: param1, ...queryParams } = params;
	return request<any>(`/api/update/${param0}/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/${param0}/latest */
export async function UpdateGetLatestAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateGetLatestAsyncParams,
	options?: { [key: string]: any }
) {
	const { appName: param0, ...queryParams } = params;
	return request<any>(`/api/update/${param0}/latest`, {
		method: 'GET',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/check */
export async function UpdateCheckUpdateAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateCheckUpdateAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/update/check', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/check-detail */
export async function UpdateCheckUpdateDetailAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateCheckUpdateDetailAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/update/check-detail', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/update/chunk-upload */
export async function UpdateChunkUploadAsync(
	body: {
		AppName: string;
		FileId: string;
		FileName: string;
		ChunkIndex: number;
		TotalChunks: number;
		ChunkMd5?: string;
		TotalSize?: number;
		Force?: boolean;
	},
	ChunkData?: File,
	options?: { [key: string]: any }
) {
	const formData = new FormData();

	if (ChunkData) {
		formData.append('ChunkData', ChunkData);
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

	return request<any>('/api/update/chunk-upload', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 DELETE /api/update/chunk-upload/${param0} */
export async function UpdateCancelChunkUploadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateCancelChunkUploadAsyncParams,
	options?: { [key: string]: any }
) {
	const { fileId: param0, ...queryParams } = params;
	return request<any>(`/api/update/chunk-upload/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/chunk-upload/progress/${param0} */
export async function UpdateGetChunkUploadProgressAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateGetChunkUploadProgressAsyncParams,
	options?: { [key: string]: any }
) {
	const { fileId: param0, ...queryParams } = params;
	return request<any>(`/api/update/chunk-upload/progress/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/update/manifest/${param0} */
export async function UpdateGetManifestAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateGetManifestAsyncParams,
	options?: { [key: string]: any }
) {
	const { appName: param0, ...queryParams } = params;
	return request<any>(`/api/update/manifest/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/update/scan/${param0} */
export async function UpdateScanManifestAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateScanManifestAsyncParams,
	options?: { [key: string]: any }
) {
	const { appName: param0, ...queryParams } = params;
	return request<any>(`/api/update/scan/${param0}`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/update/upload */
export async function UpdateUploadFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UpdateUploadFileAsyncParams,
	body: {},
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

	return request<any>('/api/update/upload', {
		method: 'POST',
		params: {
			...params,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}
