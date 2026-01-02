// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/TMS/transport-order-vehicle-travel-locus */
export async function TransportOrderVehicleTravelLocusGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderVehicleTravelLocusGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSTransportOrderVehicleTravelLocusDto>(
    '/api/TMS/transport-order-vehicle-travel-locus',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/TMS/transport-order-vehicle-travel-locus/${param0} */
export async function TransportOrderVehicleTravelLocusGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderVehicleTravelLocusGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSTransportOrderVehicleTravelLocusDto>(
    `/api/TMS/transport-order-vehicle-travel-locus/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/TMS/transport-order-vehicle-travel-locus/by-order-id/${param0} */
export async function TransportOrderVehicleTravelLocusFindByOrderIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderVehicleTravelLocusFindByOrderIdAsyncParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSTransportOrderVehicleTravelLocusDto>(
    `/api/TMS/transport-order-vehicle-travel-locus/by-order-id/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
