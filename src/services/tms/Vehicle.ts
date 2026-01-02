// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建车辆信息 POST /api/tms/Vehicle/create */
export async function VehicleCreateAsync(
  body: API.BurnAbpTMS_cheliangxinxiDtoVehicleDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_cheliangxinxiDtoVehicleDto>('/api/tms/Vehicle/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除车辆信息 POST /api/tms/Vehicle/delete/${param0} */
export async function VehicleDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/Vehicle/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出车辆信息 GET /api/tms/Vehicle/export */
export async function VehicleExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/Vehicle/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据主键ID获取车辆信息 GET /api/tms/Vehicle/id */
export async function VehicleGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_cheliangxinxiDtoVehicleDto>('/api/tms/Vehicle/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入车辆信息 POST /api/tms/Vehicle/import */
export async function VehicleImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleImportAsyncParams,
  body: {},
  File?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (File) {
    formData.append('File', File);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>('/api/tms/Vehicle/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 下载车辆信息模板 GET /api/tms/Vehicle/import-template */
export async function VehicleGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/Vehicle/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据条件获取车辆信息列表 GET /api/tms/Vehicle/list */
export async function VehicleGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_cheliangxinxiDtoVehicleDto>(
    '/api/tms/Vehicle/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改车辆信息 POST /api/tms/Vehicle/update/${param0} */
export async function VehicleUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VehicleUpdateAsyncParams,
  body: API.BurnAbpTMS_cheliangxinxiDtoVehicleDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_cheliangxinxiDtoVehicleDto>(`/api/tms/Vehicle/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
