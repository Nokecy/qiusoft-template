// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建位置信息 POST /api/tms/LocationInfo/create */
export async function LocationInfoCreateAsync(
  body: API.BurnAbpTMS_weizhixinxiDtoLocationInfoDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_weizhixinxiDtoLocationInfoDto>('/api/tms/LocationInfo/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除位置信息 POST /api/tms/LocationInfo/delete/${param0} */
export async function LocationInfoDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/LocationInfo/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据指定条件获取位置明细地址信息 GET /api/tms/LocationInfo/detail-list */
export async function LocationInfoGetDetailListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoGetDetailListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_weizhixinxiDtoLocationInfoItemDto>(
    '/api/tms/LocationInfo/detail-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 导出位置明细信息 GET /api/tms/LocationInfo/export */
export async function LocationInfoExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/LocationInfo/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据主键ID获取位置信息 GET /api/tms/LocationInfo/id */
export async function LocationInfoGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_weizhixinxiDtoLocationInfoDto>('/api/tms/LocationInfo/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入位置信息列表 POST /api/tms/LocationInfo/import */
export async function LocationInfoImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoImportAsyncParams,
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

  return request<any>('/api/tms/LocationInfo/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 下载导入模板 GET /api/tms/LocationInfo/import-template */
export async function LocationInfoGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/LocationInfo/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据位置编码获取位置明细点列表信息 GET /api/tms/LocationInfo/item-list-by-code */
export async function LocationInfoGetItemListByCodeAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoGetItemListByCodeAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_weizhixinxiDtoLocationInfoItemDto[]>(
    '/api/tms/LocationInfo/item-list-by-code',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取位置列表信息 GET /api/tms/LocationInfo/list */
export async function LocationInfoGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_weizhixinxiDtoLocationInfoDto>(
    '/api/tms/LocationInfo/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改位置信息 POST /api/tms/LocationInfo/update/${param0} */
export async function LocationInfoUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LocationInfoUpdateAsyncParams,
  body: API.BurnAbpTMS_weizhixinxiDtoLocationInfoDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_weizhixinxiDtoLocationInfoDto>(
    `/api/tms/LocationInfo/update/${param0}`,
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
