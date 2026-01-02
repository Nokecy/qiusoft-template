// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/bnr-sequence-type */
export async function BnrSequenceTypeGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceTypeGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto>(
    '/api/tms/bnr-sequence-type',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/bnr-sequence-type */
export async function BnrSequenceTypeCreateAsync(
  body: API.BurnAbpBnrSettingBnrSequenceTypesCreateOrUpdateBnrSequenceTypeDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto>(
    '/api/tms/bnr-sequence-type',
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

/** 此处后端没有提供注释 GET /api/tms/bnr-sequence-type/${param0} */
export async function BnrSequenceTypeGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceTypeGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto>(
    `/api/tms/bnr-sequence-type/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/bnr-sequence-type/${param0}/delete */
export async function BnrSequenceTypeDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceTypeDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/bnr-sequence-type/${param0}/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/bnr-sequence-type/${param0}/update */
export async function BnrSequenceTypeUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceTypeUpdateAsyncParams,
  body: API.BurnAbpBnrSettingBnrSequenceTypesCreateOrUpdateBnrSequenceTypeDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpBnrSettingBnrSequenceTypesBnrSequenceTypeDto>(
    `/api/tms/bnr-sequence-type/${param0}/update`,
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
