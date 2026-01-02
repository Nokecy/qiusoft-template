// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/label-print-template */
export async function LabelPrintTemplateGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintTemplateGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(
    '/api/tms/label-print-template',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/label-print-template */
export async function LabelPrintTemplateCreateAsync(
  body: API.BurnAbpLabelManagementLabelPrintTemplatesCreateLabelPrintTemplateInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(
    '/api/tms/label-print-template',
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

/** 此处后端没有提供注释 GET /api/tms/label-print-template/${param0} */
export async function LabelPrintTemplateGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintTemplateGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(
    `/api/tms/label-print-template/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/label-print-template/${param0}/delete */
export async function LabelPrintTemplateDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintTemplateDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/label-print-template/${param0}/delete`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/tms/label-print-template/${param0}/update */
export async function LabelPrintTemplateUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelPrintTemplateUpdateAsyncParams,
  body: API.BurnAbpLabelManagementLabelPrintTemplatesUpdateLabelPrintTemplateInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpLabelManagementLabelPrintTemplatesLabelPrintTemplateDto>(
    `/api/tms/label-print-template/${param0}/update`,
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
