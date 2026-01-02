// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/attachmentManage/attachment */
export async function AttachmentGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpAttachmentManageAttachmentsAttachmentDto[]>(
    '/api/attachmentManage/attachment',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/attachmentManage/attachment */
export async function AttachmentCreateAsync(
  body: API.BurnAbpAttachmentManageAttachmentsAttachmentDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/attachmentManage/attachment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/attachmentManage/attachment/${param0} */
export async function AttachmentGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpAttachmentManageAttachmentsAttachmentDto>(
    `/api/attachmentManage/attachment/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/attachmentManage/attachment/${param0} */
export async function AttachmentDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AttachmentDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/attachmentManage/attachment/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
