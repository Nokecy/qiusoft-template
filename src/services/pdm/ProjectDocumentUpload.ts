// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 删除项目文档文件 POST /api/pdm/project-document-upload/delete */
export async function ProjectDocumentUploadDeleteAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentUploadDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	return request<any>('/api/pdm/project-document-upload/delete', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 下载项目文档文件 POST /api/pdm/project-document-upload/download */
export async function ProjectDocumentUploadDownloadAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentUploadDownloadAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentFileDto>('/api/pdm/project-document-upload/download', {
		method: 'POST',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 上传项目文档文件 POST /api/pdm/project-document-upload/upload */
export async function ProjectDocumentUploadUploadAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentUploadUploadAsyncParams,
	body: API.SystemIOStream,
	options?: { [key: string]: any }
) {
	return request<API.BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentUploadResultDto>('/api/pdm/project-document-upload/upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			...params,
		},
		data: body,
		...(options || {}),
	});
}

/** 上传项目文档文件 POST /api/pdm/project-management/project-document-uploads */
export async function ProjectDocumentUploadUploadAsync(body: {}, file?: File, options?: { [key: string]: any }) {
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

	return request<API.BurnAbpPdmProjectManagementProjectDocumentsProjectDocumentUploadResultDto>('/api/pdm/project-management/project-document-uploads', {
		method: 'POST',
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 下载项目文档文件 GET /api/pdm/project-management/project-document-uploads/${param0} */
export async function ProjectDocumentUploadDownloadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentUploadDownloadAsyncParams,
	options?: { [key: string]: any }
) {
	const { blobName: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-management/project-document-uploads/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除项目文档文件 DELETE /api/pdm/project-management/project-document-uploads/${param0} */
export async function ProjectDocumentUploadDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ProjectDocumentUploadDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { blobName: param0, ...queryParams } = params;
	return request<any>(`/api/pdm/project-management/project-document-uploads/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
