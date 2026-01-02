// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建承运商 POST /api/tms/transport-company/create */
export async function TransportCompanyCreateAsync(
  body: API.BurnAbpTMS_chengyunshangTransportCompanyDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_chengyunshangTransportCompanyDto>(
    '/api/tms/transport-company/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除承运商 POST /api/tms/transport-company/delete/${param0} */
export async function TransportCompanyDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCompanyDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/transport-company/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询指定Blob头像 GET /api/tms/transport-company/get-avatar/${param0} */
export async function TransportCompanyGetAvatarBlobFileAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCompanyGetAvatarBlobFileAsyncParams,
  options?: { [key: string]: any },
) {
  const { blobName: param0, ...queryParams } = params;
  return request<string>(`/api/tms/transport-company/get-avatar/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键ID获取承运商信息 GET /api/tms/transport-company/get/${param0} */
export async function TransportCompanyGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCompanyGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_chengyunshangTransportCompanyDto>(
    `/api/tms/transport-company/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据条件获取承运商列表 GET /api/tms/transport-company/list */
export async function TransportCompanyGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCompanyGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_chengyunshangTransportCompanyDto>(
    '/api/tms/transport-company/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改承运商 POST /api/tms/transport-company/update/${param0} */
export async function TransportCompanyUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCompanyUpdateAsyncParams,
  body: API.BurnAbpTMS_chengyunshangTransportCompanyDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_chengyunshangTransportCompanyDto>(
    `/api/tms/transport-company/update/${param0}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}
