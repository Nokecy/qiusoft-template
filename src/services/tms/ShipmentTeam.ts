// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据ID获取发运班组信息 GET /api/tms/shipment-team/${param0} */
export async function ShipmentTeamGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentTeamGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_fayunbanzuShipmentTeamDto>(`/api/tms/shipment-team/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 创建发运班组信息 POST /api/tms/shipment-team/create */
export async function ShipmentTeamCreateAsync(
  body: API.BurnAbpTMS_fayunbanzuShipmentTeamDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayunbanzuShipmentTeamDto>('/api/tms/shipment-team/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID删除发运班组信息 POST /api/tms/shipment-team/delete/${param0} */
export async function ShipmentTeamDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentTeamDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/shipment-team/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据指定条件获取发运班组列表信息 GET /api/tms/shipment-team/list */
export async function ShipmentTeamGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentTeamGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayunbanzuShipmentTeamDto>(
    '/api/tms/shipment-team/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新指定ID的班组信息 POST /api/tms/shipment-team/update/${param0} */
export async function ShipmentTeamUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentTeamUpdateAsyncParams,
  body: API.BurnAbpTMS_fayunbanzuShipmentTeamDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_fayunbanzuShipmentTeamDto>(
    `/api/tms/shipment-team/update/${param0}`,
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
