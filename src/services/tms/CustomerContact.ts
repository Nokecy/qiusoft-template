// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 新增客户联系人信息 POST /api/tms/customer-contact/create */
export async function CustomerContactCreateAsync(
  body: API.BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto>(
    '/api/tms/customer-contact/create',
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

/** 删除客户联系人信息 POST /api/tms/customer-contact/delete/${param0} */
export async function CustomerContactDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerContactDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/customer-contact/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据Id获取客户联系人信息 GET /api/tms/customer-contact/get/${param0} */
export async function CustomerContactGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerContactGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto>(
    `/api/tms/customer-contact/get/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据条件获取客户联系人列表信息 GET /api/tms/customer-contact/list */
export async function CustomerContactGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerContactGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto>(
    '/api/tms/customer-contact/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新指定条件的客户联系人信息 POST /api/tms/customer-contact/update/${param0} */
export async function CustomerContactUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CustomerContactUpdateAsyncParams,
  body: API.BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_kehulianxirenxinxiDtoCustomerContactDto>(
    `/api/tms/customer-contact/update/${param0}`,
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
