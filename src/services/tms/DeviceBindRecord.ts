// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据Id获取设备绑定记录信息 GET /api/tms/device-bind-record/${param0} */
export async function DeviceBindRecordGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceBindRecordGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto>(
    `/api/tms/device-bind-record/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 创建设备绑定记录 POST /api/tms/device-bind-record/create */
export async function DeviceBindRecordCreateAsync(
  body: API.BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto>(
    '/api/tms/device-bind-record/create',
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

/** 删除客户绑定记录 POST /api/tms/device-bind-record/delete/${param0} */
export async function DeviceBindRecordDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceBindRecordDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/device-bind-record/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查找设备绑定记录 GET /api/tms/device-bind-record/list */
export async function DeviceBindRecordGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceBindRecordGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto>(
    '/api/tms/device-bind-record/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新设备绑定记录 POST /api/tms/device-bind-record/update/${param0} */
export async function DeviceBindRecordUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeviceBindRecordUpdateAsyncParams,
  body: API.BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_shebeibangdingjiluDeviceBindRecordDto>(
    `/api/tms/device-bind-record/update/${param0}`,
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
