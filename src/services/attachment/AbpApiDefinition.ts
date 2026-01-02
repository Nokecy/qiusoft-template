// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/abp/api-definition */
export async function AbpApiDefinitionGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AbpApiDefinitionGetParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpHttpModelingApplicationApiDescriptionModel>('/api/abp/api-definition', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
