// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/transport-cost-result */
export async function TransportCostResultGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCostResultGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_yunshufeiyongjieguoTransportCostResultDto>(
    '/api/tms/transport-cost-result',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/tms/transport-cost-result/${param0} */
export async function TransportCostResultGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCostResultGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_yunshufeiyongjieguoTransportCostResultDto>(
    `/api/tms/transport-cost-result/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/transport-cost-result/${param0}/recalculate */
export async function TransportCostResultRecalculateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportCostResultRecalculateAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_yunshufeiyongjieguoTransportCostResultDto>(
    `/api/tms/transport-cost-result/${param0}/recalculate`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
