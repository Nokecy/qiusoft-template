// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建常用路线 POST /api/tms/transport-line/create */
export async function TransportLineCreateAsync(
  body: API.BurnAbpTMS_yunshuluxianTransportLineDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_yunshuluxianTransportLineDto>('/api/tms/transport-line/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除常用路线 POST /api/tms/transport-line/delete/${param0} */
export async function TransportLineDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportLineDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/transport-line/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键ID获取运输路线相关设置 GET /api/tms/transport-line/get/${param0} */
export async function TransportLineGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportLineGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_yunshuluxianTransportLineDto>(
    `/api/tms/transport-line/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据条件获取常用路线列表 GET /api/tms/transport-line/list */
export async function TransportLineGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportLineGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_yunshuluxianTransportLineDto>(
    '/api/tms/transport-line/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改常用路线 POST /api/tms/transport-line/update/${param0} */
export async function TransportLineUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportLineUpdateAsyncParams,
  body: API.BurnAbpTMS_yunshuluxianTransportLineDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_yunshuluxianTransportLineDto>(
    `/api/tms/transport-line/update/${param0}`,
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
