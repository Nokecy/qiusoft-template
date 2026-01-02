// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建司机信息 POST /api/tms/Driver/create */
export async function DriverCreateAsync(
  body: API.BurnAbpTMS_sijixinxiDtoDriverDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_sijixinxiDtoDriverDto>('/api/tms/Driver/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除司机信息 POST /api/tms/Driver/delete/${param0} */
export async function DriverDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DriverDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/Driver/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出司机信息 GET /api/tms/Driver/export */
export async function DriverExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DriverExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/Driver/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据主键ID获取司机信息 GET /api/tms/Driver/id */
export async function DriverGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DriverGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_sijixinxiDtoDriverDto>('/api/tms/Driver/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入司机信息 POST /api/tms/Driver/import */
export async function DriverImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DriverImportAsyncParams,
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

  return request<any>('/api/tms/Driver/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 下载司机信息模板 GET /api/tms/Driver/import-template */
export async function DriverGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/Driver/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据条件获取司机信息列表 GET /api/tms/Driver/list */
export async function DriverGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DriverGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_sijixinxiDtoDriverDto>(
    '/api/tms/Driver/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改司机信息 POST /api/tms/Driver/update/${param0} */
export async function DriverUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DriverUpdateAsyncParams,
  body: API.BurnAbpTMS_sijixinxiDtoDriverDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_sijixinxiDtoDriverDto>(`/api/tms/Driver/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
