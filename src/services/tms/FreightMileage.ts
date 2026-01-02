// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/freight-mileage */
export async function FreightMileageGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightMileageGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_huoyunlichengFreightMileageDto>(
    '/api/tms/freight-mileage',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/freight-mileage */
export async function FreightMileageCreateAsync(
  body: API.BurnAbpTMS_huoyunlichengCreateFreightMileageInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_huoyunlichengFreightMileageDto>('/api/tms/freight-mileage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/freight-mileage/${param0} */
export async function FreightMileageGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightMileageGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_huoyunlichengFreightMileageDto>(
    `/api/tms/freight-mileage/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/tms/freight-mileage/${param0} */
export async function FreightMileageUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightMileageUpdateAsyncParams,
  body: API.BurnAbpTMS_huoyunlichengUpdateFreightMileageInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_huoyunlichengFreightMileageDto>(
    `/api/tms/freight-mileage/${param0}`,
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

/** 此处后端没有提供注释 DELETE /api/tms/freight-mileage/${param0} */
export async function FreightMileageDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FreightMileageDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/freight-mileage/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
