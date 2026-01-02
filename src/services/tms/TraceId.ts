// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/trace-id */
export async function TraceIdGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TraceIdGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_zhanbanLPNxinxiTraceIdDto>(
    '/api/tms/trace-id',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/trace-id */
export async function TraceIdMassProduction(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TraceIdMassProductionParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_zhanbanLPNxinxiTraceIdDto>('/api/tms/trace-id', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/trace-id/${param0} */
export async function TraceIdGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TraceIdGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_zhanbanLPNxinxiTraceIdDto>(`/api/tms/trace-id/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
