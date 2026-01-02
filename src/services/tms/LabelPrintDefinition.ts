// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/label-print-definition */
export async function LabelPrintDefinitionGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintDefinitionGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto>(
    '/api/tms/label-print-definition',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/label-print-definition */
export async function LabelPrintDefinitionCreateAsync(
  body: API.BurnAbpLabelManagementLabelPrintDefinitionsCreateLabelPrintDefinitionInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto>(
    '/api/tms/label-print-definition',
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

/** 此处后端没有提供注释 GET /api/tms/label-print-definition/${param0} */
export async function LabelPrintDefinitionGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintDefinitionGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto>(
    `/api/tms/label-print-definition/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/label-print-definition/${param0}/delete */
export async function LabelPrintDefinitionDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintDefinitionDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/label-print-definition/${param0}/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/label-print-definition/${param0}/update */
export async function LabelPrintDefinitionUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintDefinitionUpdateAsyncParams,
  body: API.BurnAbpLabelManagementLabelPrintDefinitionsUpdateLabelPrintDefinitionInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionDto>(
    `/api/tms/label-print-definition/${param0}/update`,
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

/** 此处后端没有提供注释 GET /api/tms/label-print-definition/print-template-list */
export async function LabelPrintDefinitionGetPrintTemplateListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintDefinitionGetPrintTemplateListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<
    API.BurnAbpLabelManagementLabelPrintDefinitionsLabelPrintDefinitionWithTemplateDto[]
  >('/api/tms/label-print-definition/print-template-list', {
    method: 'GET',
    params: {
      ...params,
      ExtensionProperties: undefined,
      ...params['ExtensionProperties'],
    },
    ...(options || {}),
  });
}
