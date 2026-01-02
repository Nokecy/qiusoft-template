// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 通过物料信息带出ASN单据信息 GET /integration-api/tms/shipment-order-interior/asn-item-by-material */
export async function ShipmentOrderInteriorGetAsnItemByMaterialAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderInteriorGetAsnItemByMaterialAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto[]>(
    '/integration-api/tms/shipment-order-interior/asn-item-by-material',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 通过ASN+物料查询装箱信息 GET /integration-api/tms/shipment-order-interior/asn-material-pack */
export async function ShipmentOrderInteriorGetAsnMaterialPackAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderInteriorGetAsnMaterialPackAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoGetAsnMaterialPackDto>(
    '/integration-api/tms/shipment-order-interior/asn-material-pack',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 通过ASN单号查询 GET /integration-api/tms/shipment-order-interior/by-asn-no */
export async function ShipmentOrderInteriorGetByAsnNoAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderInteriorGetByAsnNoAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    '/integration-api/tms/shipment-order-interior/by-asn-no',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /integration-api/tms/shipment-order-interior/shipment-order-box-item */
export async function ShipmentOrderInteriorGetShipmentOrderBoxItemAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderInteriorGetShipmentOrderBoxItemAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdan_neibufuwuIntegrationShipmentOrderBoxItemDto>(
    '/integration-api/tms/shipment-order-interior/shipment-order-box-item',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 回写ASN单箱信息 POST /integration-api/tms/shipment-order-interior/write-back-box */
export async function ShipmentOrderInteriorWriteBackBoxAsync(
  body: API.BurnAbpTMS_fayundingdan_neibufuwuWriteBackBoxInputDto,
  options?: { [key: string]: any },
) {
  return request<any>('/integration-api/tms/shipment-order-interior/write-back-box', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
