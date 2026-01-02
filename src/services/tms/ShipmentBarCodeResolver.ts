// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 解析需要发运的条码信息 POST /api/tms/shipment-barCode-resolver/resolve-data */
export async function ShipmentBarCodeResolverResolverDataAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentBarCodeResolverResolverDataAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_tiaomajiexiShipmentBarCodeInfoModel[]>(
    '/api/tms/shipment-barCode-resolver/resolve-data',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
