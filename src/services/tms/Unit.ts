// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建计量单位信息 POST /api/tms/unit/create */
export async function UnitCreateAsync(
  body: API.BurnAbpTMS_danweixinxiUnitDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_danweixinxiUnitDto>('/api/tms/unit/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除计量单位信息 POST /api/tms/unit/delete/${param0} */
export async function UnitDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UnitDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/unit/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/unit/export */
export async function UnitExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UnitExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/unit/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据ID获取计量单位信息 GET /api/tms/unit/id */
export async function UnitGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UnitGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_danweixinxiUnitDto>('/api/tms/unit/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/unit/import */
export async function UnitImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

  return request<any>('/api/tms/unit/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/unit/import-template */
export async function UnitGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/unit/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据条件获取计量单位列表 GET /api/tms/unit/list */
export async function UnitGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UnitGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_danweixinxiUnitDto>(
    '/api/tms/unit/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新计量单位信息 POST /api/tms/unit/update/${param0} */
export async function UnitUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UnitUpdateAsyncParams,
  body: API.BurnAbpTMS_danweixinxiUnitDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_danweixinxiUnitDto>(`/api/tms/unit/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
