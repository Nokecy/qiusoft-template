// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/bnr-sequence-setting */
export async function BnrSequenceSettingGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceSettingGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto>(
    '/api/tms/bnr-sequence-setting',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/bnr-sequence-setting */
export async function BnrSequenceSettingCreateAsync(
  body: API.BurnAbpBnrSettingBnrSettingSettingsCreateOrUpdateBnrSequenceSettingDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto>(
    '/api/tms/bnr-sequence-setting',
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

/** 此处后端没有提供注释 GET /api/tms/bnr-sequence-setting/${param0} */
export async function BnrSequenceSettingGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceSettingGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto>(
    `/api/tms/bnr-sequence-setting/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/bnr-sequence-setting/${param0}/delete */
export async function BnrSequenceSettingDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceSettingDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/bnr-sequence-setting/${param0}/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/bnr-sequence-setting/${param0}/update */
export async function BnrSequenceSettingUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BnrSequenceSettingUpdateAsyncParams,
  body: API.BurnAbpBnrSettingBnrSettingSettingsCreateOrUpdateBnrSequenceSettingDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpBnrSettingBnrSettingSettingsBnrSequenceSettingDto>(
    `/api/tms/bnr-sequence-setting/${param0}/update`,
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
