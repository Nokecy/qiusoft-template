// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取标签打印数据--如果是报表 不调用 GET /api/tms/label-data/label-print-data */
export async function LabelDataGetLabelPrintDataAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.LabelDataGetLabelPrintDataAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpLabelManagementLabelDatasGetLabelDataResultDto>(
    '/api/tms/label-data/label-print-data',
    {
      method: 'GET',
      params: {
        ...params,
        ExtraProperties: undefined,
        ...params['ExtraProperties'],
      },
      ...(options || {}),
    },
  );
}
