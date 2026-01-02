// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取运输类型信息 GET /api/tms/transport-type/${param0} */
export async function TransportTypeGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportTypeGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_yunshuleixingTransportTypeDto>(
    `/api/tms/transport-type/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 更新运输类型信息 POST /api/tms/transport-type/${param0} */
export async function TransportTypeUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportTypeUpdateAsyncParams,
  body: API.BurnAbpTMS_yunshuleixingTransportTypeDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_yunshuleixingTransportTypeDto>(
    `/api/tms/transport-type/${param0}`,
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

/** 根据输入参数创建运输路线信息 POST /api/tms/transport-type/create */
export async function TransportTypeCreateAsync(
  body: API.BurnAbpTMS_yunshuleixingTransportTypeDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_yunshuleixingTransportTypeDto>('/api/tms/transport-type/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定Id的运输路线 POST /api/tms/transport-type/delete/${param0} */
export async function TransportTypeDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportTypeDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/transport-type/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据指定条件获取运输类型列表 GET /api/tms/transport-type/list */
export async function TransportTypeGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportTypeGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_yunshuleixingTransportTypeDto>(
    '/api/tms/transport-type/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
