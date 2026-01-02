// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/TMS/vehicle-location */
export async function VehicleLocationGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleLocationGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSVehicleLocationDto>(
    '/api/TMS/vehicle-location',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/TMS/vehicle-location/${param0} */
export async function VehicleLocationGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleLocationGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSVehicleLocationDto>(`/api/TMS/vehicle-location/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取车辆位置状态统计 GET /api/TMS/vehicle-location/status-count-summary */
export async function VehicleLocationGetStatusCountSummaryAsync(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/TMS/vehicle-location/status-count-summary', {
    method: 'GET',
    ...(options || {}),
  });
}
