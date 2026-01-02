// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取转换文件 GET /api/pdm/conversion-files/${param0}/${param1} */
export async function DocumentConversionStaticFileGetFileAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionStaticFileGetFileAsyncParams,
	options?: { [key: string]: any }
) {
	const { conversionId: param0, filePath: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/conversion-files/${param0}/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取转换文件（仅基于 fileId 自动定位文档与转换任务）
适用于前端只持有 fileId 的场景（例如文件列表点击预览）。 GET /api/pdm/conversion-files/by-file/${param0}/${param1} */
export async function DocumentConversionStaticFileGetFileByFileIdAsync_2(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionStaticFileGetFileByFileIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { fileId: param0, filePath: param1, ...queryParams } = params;
	return request<any>(`/api/pdm/conversion-files/by-file/${param0}/${param1}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 获取转换文件（基于 documentId + fileId 自动定位对应的转换任务）
适用于前端只持有“当前选中文件”的场景，避免前端依赖 conversionId。 GET /api/pdm/conversion-files/by-file/${param0}/${param1}/${param2} */
export async function DocumentConversionStaticFileGetFileByFileIdAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.DocumentConversionStaticFileGetFileByFileIdAsyncParams,
	options?: { [key: string]: any }
) {
	const { documentId: param0, fileId: param1, filePath: param2, ...queryParams } = params;
	return request<any>(`/api/pdm/conversion-files/by-file/${param0}/${param1}/${param2}`, {
		method: 'GET',
		params: { ...queryParams },
		...(options || {}),
	});
}
