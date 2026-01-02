// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /integration-api/attachment/attachment */
export async function AttachmentIntegrationGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentIntegrationGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpEntityAttachmentsEntityAttachment[]>(
    '/integration-api/attachment/attachment',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /integration-api/attachment/attachment */
export async function AttachmentIntegrationCreateAsync(
  body: API.BurnAbpEntityAttachmentsEntityAttachment,
  options?: { [key: string]: any },
) {
  return request<any>('/integration-api/attachment/attachment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /integration-api/attachment/attachment/${param0} */
export async function AttachmentIntegrationGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentIntegrationGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpEntityAttachmentsEntityAttachment>(
    `/integration-api/attachment/attachment/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /integration-api/attachment/attachment/${param0}/delete */
export async function AttachmentIntegrationDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentIntegrationDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/integration-api/attachment/attachment/${param0}/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /integration-api/attachment/attachment/bytes */
export async function AttachmentIntegrationGetAllBytesAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentIntegrationGetAllBytesAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/integration-api/attachment/attachment/bytes', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
