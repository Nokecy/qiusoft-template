// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取发布文档项列表（支持 Gridify 动态查询）。 GET /api/pdm/release-document-item */
export async function ReleaseDocumentItemGetListAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ReleaseDocumentItemGetListAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemListDto>('/api/pdm/release-document-item', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 获取单个发布文档项。 GET /api/pdm/release-document-item/${param0} */
export async function ReleaseDocumentItemGetAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.ReleaseDocumentItemGetAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<API.BurnAbpPdmDocumentManagementDocumentReleasesReleaseDocumentItemDto>(`/api/pdm/release-document-item/${param0}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
