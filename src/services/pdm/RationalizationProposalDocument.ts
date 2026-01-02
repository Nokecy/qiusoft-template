// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 上传合理化建议附件 POST /api/pdm/project-management/rationalization-proposals/${param0}/documents */
export async function RationalizationProposalDocumentUploadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalDocumentUploadAsyncParams,
	body: {},
	file?: File,
	options?: { [key: string]: any }
) {
	const { entityId: param0, ...queryParams } = params;
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

	return request<API.BurnAbpPdmProjectManagementEntityDocumentsEntityDocumentUploadResultDto>(`/api/pdm/project-management/rationalization-proposals/${param0}/documents`, {
		method: 'POST',
		params: {
			...queryParams,
		},
		data: formData,
		requestType: 'form',
		...(options || {}),
	});
}

/** 下载合理化建议附件 GET /api/pdm/project-management/rationalization-proposals/${param1}/documents/${param0} */
export async function RationalizationProposalDocumentDownloadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalDocumentDownloadAsyncParams,
	options?: { [key: string]: any }
) {
	const { blobName: param0, entityId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/project-management/rationalization-proposals/${param1}/documents/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 删除合理化建议附件 DELETE /api/pdm/project-management/rationalization-proposals/${param1}/documents/${param0} */
export async function RationalizationProposalDocumentDeleteAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.RationalizationProposalDocumentDeleteAsyncParams,
	options?: { [key: string]: any }
) {
	const { blobName: param0, entityId: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/project-management/rationalization-proposals/${param1}/documents/${param0}`, {
		method: 'DELETE',
		params: { ...queryParams },
		...(options || {}),
	});
}
