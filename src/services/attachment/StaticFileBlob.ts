// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/attachmentManage/static-file-blob/${param0} */
export async function StaticFileBlobGetStaticFileAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.StaticFileBlobGetStaticFileAsyncParams,
  options?: { [key: string]: any },
) {
  const { blobName: param0, ...queryParams } = params;
  return request<string>(`/api/attachmentManage/static-file-blob/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/attachmentManage/static-file-blob/base/${param0} */
export async function StaticFileBlobGetStaticFileBaseAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.StaticFileBlobGetStaticFileBaseAsyncParams,
  options?: { [key: string]: any },
) {
  const { blobName: param0, ...queryParams } = params;
  return request<string>(`/api/attachmentManage/static-file-blob/base/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/attachmentManage/static-file-blob/upload */
export async function StaticFileBlobUploadAttachmentAsync(
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
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>('/api/attachmentManage/static-file-blob/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/attachmentManage/static-file-blob/valiate */
export async function StaticFileBlobValidateFileAsync(
  body: API.BurnAbpTempBlobAspNetCoreModelValidateFileModel,
  options?: { [key: string]: any },
) {
  return request<any>('/api/attachmentManage/static-file-blob/valiate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
