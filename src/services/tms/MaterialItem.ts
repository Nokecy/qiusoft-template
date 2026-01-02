// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建货物 POST /api/tms/materialItem/create */
export async function MaterialItemCreateAsync(
  body: API.BurnAbpTMS_huowuxinxiMaterialItemDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_huowuxinxiMaterialItemDto>('/api/tms/materialItem/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除货物 POST /api/tms/materialItem/delete/${param0} */
export async function MaterialItemDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialItemDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/materialItem/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/materialItem/export */
export async function MaterialItemExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialItemExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/materialItem/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据主键ID获取货物信息 GET /api/tms/materialItem/get/id */
export async function MaterialItemGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialItemGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_huowuxinxiMaterialItemDto>('/api/tms/materialItem/get/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/materialItem/import */
export async function MaterialItemImportAsync(
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

  return request<any>('/api/tms/materialItem/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/materialItem/import-template */
export async function MaterialItemGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/materialItem/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据条件获取货物列表 GET /api/tms/materialItem/list */
export async function MaterialItemGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialItemGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_huowuxinxiMaterialItemDto>(
    '/api/tms/materialItem/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改货物 POST /api/tms/materialItem/update/${param0} */
export async function MaterialItemUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MaterialItemUpdateAsyncParams,
  body: API.BurnAbpTMS_huowuxinxiMaterialItemDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_huowuxinxiMaterialItemDto>(
    `/api/tms/materialItem/update/${param0}`,
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
