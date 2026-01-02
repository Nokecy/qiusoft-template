// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/dotnetify/vm */
export async function DotNetifyWebApiIntegrationMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DotNetifyWebApiIntegrationMessageParams,
  body: API.DotNetifyWebApiDotNetifyWebApiIntegrationRequest,
  options?: { [key: string]: any },
) {
  return request<any>('/api/dotnetify/vm', {
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

/** 此处后端没有提供注释 GET /api/dotnetify/vm/${param0} */
export async function DotNetifyWebApiRequestVM(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DotNetifyWebApiRequestVMParams,
  options?: { [key: string]: any },
) {
  const { vmId: param0, ...queryParams } = params;
  return request<string>(`/api/dotnetify/vm/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/dotnetify/vm/${param0} */
export async function DotNetifyWebApiUpdateVM(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DotNetifyWebApiUpdateVMParams,
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  const { vmId: param0, ...queryParams } = params;
  return request<string>(`/api/dotnetify/vm/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...queryParams,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/dotnetify/vm/${param0} */
export async function DotNetifyWebApiDisposeVM(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DotNetifyWebApiDisposeVMParams,
  options?: { [key: string]: any },
) {
  const { vmId: param0, ...queryParams } = params;
  return request<any>(`/api/dotnetify/vm/${param0}`, {
    method: 'DELETE',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/dotnetify/vm/disconnect */
export async function DotNetifyWebApiIntegrationDisconnect(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DotNetifyWebApiIntegrationDisconnectParams,
  body: API.DotNetifyWebApiDotNetifyWebApiIntegrationRequest,
  options?: { [key: string]: any },
) {
  return request<any>('/api/dotnetify/vm/disconnect', {
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
