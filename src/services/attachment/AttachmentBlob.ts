// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/attachmentManage/blob/${param0} */
export async function AttachmentBlobDownloadAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentBlobDownloadAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/attachmentManage/blob/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/attachmentManage/blob/by-blob-name/${param0} */
export async function AttachmentBlobDownloadByBlobNameAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentBlobDownloadByBlobNameAsyncParams,
  options?: { [key: string]: any },
) {
  const { blobName: param0, ...queryParams } = params;
  return request<any>(`/api/attachmentManage/blob/by-blob-name/${param0}`, {
    method: 'GET',
    responseType:'blob',
    params: { ...queryParams },
    ...(options || {}),
  });
}
