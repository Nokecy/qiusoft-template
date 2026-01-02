// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/tms/device-lnfo */
export async function DeviceInfoCreateAsync(
  body: API.BurnAbpTMSCreateDeviceInfoDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMSDeviceInfoDto>('/api/tms/device-lnfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/device-lnfo/${param0} */
export async function DeviceInfoUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceInfoUpdateAsyncParams,
  body: API.BurnAbpTMSUpdateDeviceInfoDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSDeviceInfoDto>(`/api/tms/device-lnfo/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 绑定设备信息 POST /api/tms/device-lnfo/bind/${param0} */
export async function DeviceInfoBindAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceInfoBindAsyncParams,
  body: API.BurnAbpTMSBindDeviceInfoDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/device-lnfo/bind/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除设备信息 POST /api/tms/device-lnfo/delete/${param0} */
export async function DeviceInfoDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceInfoDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/device-lnfo/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取Gps设备位置提供者列表 GET /api/tms/device-lnfo/gps-device-location-providers */
export async function DeviceInfoGetGpsDeviceLocationProvidersAsync(options?: {
  [key: string]: any;
}) {
  return request<API.BurnAbpTMSGpsDeviceLocationProviderDto[]>(
    '/api/tms/device-lnfo/gps-device-location-providers',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/tms/device-lnfo/id */
export async function DeviceInfoGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceInfoGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMSDeviceInfoDto>('/api/tms/device-lnfo/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/device-lnfo/list */
export async function DeviceInfoGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceInfoGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSDeviceInfoDto>(
    '/api/tms/device-lnfo/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 解除设备绑定 POST /api/tms/device-lnfo/unbind/${param0} */
export async function DeviceInfoUnBindAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceInfoUnBindAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/device-lnfo/unbind/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
