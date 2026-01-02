// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建车型管理 POST /api/tms/vehicle-model/create */
export async function VehicleModelCreateAsync(
  body: API.BurnAbpTMS_chexingguanliVehicleModelDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_chexingguanliVehicleModelDto>('/api/tms/vehicle-model/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除车型管理 POST /api/tms/vehicle-model/delete/${param0} */
export async function VehicleModelDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleModelDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/vehicle-model/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键ID获取车型管理信息 GET /api/tms/vehicle-model/get/${param0} */
export async function VehicleModelGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleModelGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_chexingguanliVehicleModelDto>(
    `/api/tms/vehicle-model/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据条件获取车型管理列表 GET /api/tms/vehicle-model/list */
export async function VehicleModelGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleModelGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_chexingguanliVehicleModelDto>(
    '/api/tms/vehicle-model/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改车型管理 POST /api/tms/vehicle-model/update/${param0} */
export async function VehicleModelUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleModelUpdateAsyncParams,
  body: API.BurnAbpTMS_chexingguanliVehicleModelDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_chexingguanliVehicleModelDto>(
    `/api/tms/vehicle-model/update/${param0}`,
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
