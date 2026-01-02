// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/daily-delivery */
export async function DailyDeliveryGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DailyDeliveryGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSDailyDeliveryDto>(
    '/api/tms/daily-delivery',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/tms/daily-delivery/${param0} */
export async function DailyDeliveryGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DailyDeliveryGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSDailyDeliveryDto>(`/api/tms/daily-delivery/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新每日发运 POST /api/tms/daily-delivery/${param0} */
export async function DailyDeliveryUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DailyDeliveryUpdateAsyncParams,
  body: API.BurnAbpTMSUpdateDailyDeliveryDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSDailyDeliveryDto>(`/api/tms/daily-delivery/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
