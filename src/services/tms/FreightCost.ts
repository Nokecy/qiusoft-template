// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/freight-costs */
export async function FreightCostGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_huoyunfeiyongFreightCostDto>(
    '/api/tms/freight-costs',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/freight-costs */
export async function FreightCostCreateAsync(
  body: API.BurnAbpTMS_huoyunfeiyongCreateFreightCostInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_huoyunfeiyongFreightCostDto>('/api/tms/freight-costs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/freight-costs/${param0} */
export async function FreightCostGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_huoyunfeiyongFreightCostDto>(`/api/tms/freight-costs/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/tms/freight-costs/${param0} */
export async function FreightCostUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostUpdateAsyncParams,
  body: API.BurnAbpTMS_huoyunfeiyongUpdateFreightCostInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_huoyunfeiyongFreightCostDto>(`/api/tms/freight-costs/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/tms/freight-costs/${param0} */
export async function FreightCostDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/freight-costs/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/freight-costs/${param0}/freight-cost-intervals */
export async function FreightCostCreateFreightCostIntervalAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostCreateFreightCostIntervalAsyncParams,
  body: API.BurnAbpTMS_huoyunfeiyongCreateFreightCostIntervalInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_huoyunfeiyongFreightCostDto>(
    `/api/tms/freight-costs/${param0}/freight-cost-intervals`,
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

/** 此处后端没有提供注释 PUT /api/tms/freight-costs/${param0}/freight-cost-intervals/${param1} */
export async function FreightCostUpdateFreightCostIntervalAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostUpdateFreightCostIntervalAsyncParams,
  body: API.BurnAbpTMS_huoyunfeiyongUpdateFreightCostIntervalInput,
  options?: { [key: string]: any },
) {
  const { id: param0, intervalId: param1, ...queryParams } = params;
  return request<API.BurnAbpTMS_huoyunfeiyongFreightCostDto>(
    `/api/tms/freight-costs/${param0}/freight-cost-intervals/${param1}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 DELETE /api/tms/freight-costs/${param0}/freight-cost-intervals/${param1} */
export async function FreightCostDeleteFreightCostIntervalAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightCostDeleteFreightCostIntervalAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, intervalId: param1, ...queryParams } = params;
  return request<any>(`/api/tms/freight-costs/${param0}/freight-cost-intervals/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
