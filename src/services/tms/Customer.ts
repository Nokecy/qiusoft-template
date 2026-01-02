// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/customer/${param0}/location-infos */
export async function CustomerGetLocationInfosAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerGetLocationInfosAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_weizhixinxiDtoLocationInfoDto[]>(
    `/api/tms/customer/${param0}/location-infos`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/tms/customer/${param0}/location-infos */
export async function CustomerUpdateLocationsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerUpdateLocationsAsyncParams,
  body: number[],
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/customer/${param0}/location-infos`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 创建客户 POST /api/tms/customer/create */
export async function CustomerCreateAsync(
  body: API.BurnAbpTMS_kehuxinxiCustomerDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_kehuxinxiCustomerDto>('/api/tms/customer/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除客户 POST /api/tms/customer/delete/${param0} */
export async function CustomerDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/customer/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/customer/export */
export async function CustomerExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/customer/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据主键ID获取客户信息 GET /api/tms/customer/get/${param0} */
export async function CustomerGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_kehuxinxiCustomerDto>(`/api/tms/customer/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/customer/import */
export async function CustomerImportAsync(body: {}, File?: File, options?: { [key: string]: any }) {
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

  return request<any>('/api/tms/customer/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/customer/import-template */
export async function CustomerGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/customer/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据条件获取客户列表 GET /api/tms/customer/list */
export async function CustomerGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_kehuxinxiCustomerDto>(
    '/api/tms/customer/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改客户 POST /api/tms/customer/update/${param0} */
export async function CustomerUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerUpdateAsyncParams,
  body: API.BurnAbpTMS_kehuxinxiCustomerDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_kehuxinxiCustomerDto>(`/api/tms/customer/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
