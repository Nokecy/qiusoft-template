// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/label-print-feature-definition */
export async function LabelPrintFeatureDefinitionGetListAsync(options?: { [key: string]: any }) {
  return request<API.VoloAbpApplicationDtosListResultDtoBurnAbpLabelManagementLabelPrintFeaturesLabelPrintFeatureDefinitionDto>(
    '/api/tms/label-print-feature-definition',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
