// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/label-type-advanced-setting */
export async function LabelTypeAdvancedSettingGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelTypeAdvancedSettingGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto>(
    '/api/tms/label-type-advanced-setting',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/label-type-advanced-setting */
export async function LabelTypeAdvancedSettingCreateAsync(
  body: API.BurnAbpLabelManagementLabelTypeAdvancedSettingsCreateOrUpdateLabelTypeAdvancedSetting,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto>(
    '/api/tms/label-type-advanced-setting',
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

/** 此处后端没有提供注释 GET /api/tms/label-type-advanced-setting/${param0} */
export async function LabelTypeAdvancedSettingGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelTypeAdvancedSettingGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto>(
    `/api/tms/label-type-advanced-setting/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/label-type-advanced-setting/${param0}/delete */
export async function LabelTypeAdvancedSettingDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelTypeAdvancedSettingDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/label-type-advanced-setting/${param0}/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/label-type-advanced-setting/${param0}/update */
export async function LabelTypeAdvancedSettingUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelTypeAdvancedSettingUpdateAsyncParams,
  body: API.BurnAbpLabelManagementLabelTypeAdvancedSettingsCreateOrUpdateLabelTypeAdvancedSetting,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelTypeAdvancedSettingDto>(
    `/api/tms/label-type-advanced-setting/${param0}/update`,
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

/** 查询标签高级设置提供者 GET /api/tms/label-type-advanced-setting/provider-item */
export async function LabelTypeAdvancedSettingGetProviderItemAsync(options?: {
  [key: string]: any;
}) {
  return request<
    API.BurnAbpLabelManagementLabelTypeAdvancedSettingsLabelAdvancedSettingProviderNameDto[]
  >('/api/tms/label-type-advanced-setting/provider-item', {
    method: 'GET',
    ...(options || {}),
  });
}
