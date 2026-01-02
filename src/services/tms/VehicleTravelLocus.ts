// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建车辆行驶轨迹 POST /api/tms/vehicle-travel-locus/create */
export async function VehicleTravelLocusCreateAsync(
  body: API.BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto>(
    '/api/tms/vehicle-travel-locus/create',
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

/** 删除车辆行驶轨迹 POST /api/tms/vehicle-travel-locus/delete/${param0} */
export async function VehicleTravelLocusDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleTravelLocusDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/vehicle-travel-locus/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键ID获取车辆行驶轨迹信息 GET /api/tms/vehicle-travel-locus/get/${param0} */
export async function VehicleTravelLocusGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleTravelLocusGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto>(
    `/api/tms/vehicle-travel-locus/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据条件获取车辆行驶轨迹列表 GET /api/tms/vehicle-travel-locus/list */
export async function VehicleTravelLocusGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleTravelLocusGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto>(
    '/api/tms/vehicle-travel-locus/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改车辆行驶轨迹 POST /api/tms/vehicle-travel-locus/update/${param0} */
export async function VehicleTravelLocusUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleTravelLocusUpdateAsyncParams,
  body: API.BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_cheliangxingshiguijiVehicleTravelLocusDto>(
    `/api/tms/vehicle-travel-locus/update/${param0}`,
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
