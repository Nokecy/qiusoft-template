// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建收发货人 POST /api/tms/contacts/create */
export async function ContactsCreateAsync(
  body: API.BurnAbpTMS_shoufahuorenxinxiContactsDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_shoufahuorenxinxiContactsDto>('/api/tms/contacts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除收发货人 POST /api/tms/contacts/delete/${param0} */
export async function ContactsDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ContactsDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/contacts/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键ID获取收发货人信息 GET /api/tms/contacts/get/${param0} */
export async function ContactsGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ContactsGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_shoufahuorenxinxiContactsDto>(`/api/tms/contacts/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件获取收发货人列表 GET /api/tms/contacts/list */
export async function ContactsGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ContactsGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_shoufahuorenxinxiContactsDto>(
    '/api/tms/contacts/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 修改收发货人 POST /api/tms/contacts/update/${param0} */
export async function ContactsUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ContactsUpdateAsyncParams,
  body: API.BurnAbpTMS_shoufahuorenxinxiContactsDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_shoufahuorenxinxiContactsDto>(
    `/api/tms/contacts/update/${param0}`,
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
