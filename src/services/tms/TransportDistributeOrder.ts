// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 派车申请单审核/反审核 POST /api/tms/transport-distribute-order/audit */
export async function TransportDistributeOrderAuditAsync(
  body: API.BurnAbpTMSSubmitOrderBaseDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-distribute-order/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 派车申请单确认 POST /api/tms/transport-distribute-order/confirm */
export async function TransportDistributeOrderConfirmAsync(
  body: API.BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-distribute-order/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建派车申请单信息 POST /api/tms/transport-distribute-order/create */
export async function TransportDistributeOrderCreateAsync(
  body: API.BurnAbpTMS_paicheshenqingdanDtoCreateOrUpdateTransportDistributeOrderDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto>(
    '/api/tms/transport-distribute-order/create',
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

/** 删除派车申请单信息 POST /api/tms/transport-distribute-order/delete/${param0} */
export async function TransportDistributeOrderDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/transport-distribute-order/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取单个派车申请信息 GET /api/tms/transport-distribute-order/id */
export async function TransportDistributeOrderGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto>(
    '/api/tms/transport-distribute-order/id',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询派车申请单明细列表 --派车申请浏览 GET /api/tms/transport-distribute-order/item-list */
export async function TransportDistributeOrderGetItemListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderGetItemListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto>(
    '/api/tms/transport-distribute-order/item-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据申请Id获取申请单明细 GET /api/tms/transport-distribute-order/item-list-by-id */
export async function TransportDistributeOrderGetItemListByIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderGetItemListByIdAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderItemDto[]>(
    '/api/tms/transport-distribute-order/item-list-by-id',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取派车申请单列表 GET /api/tms/transport-distribute-order/list */
export async function TransportDistributeOrderGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto>(
    '/api/tms/transport-distribute-order/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据派车申请Id获取派车申请路线列表 POST /api/tms/transport-distribute-order/location-item-list-byId */
export async function TransportDistributeOrderGetLocationItemListByIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderGetLocationItemListByIdAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderLocationItemDto[]>(
    '/api/tms/transport-distribute-order/location-item-list-byId',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 派车申请单提交/反提交 POST /api/tms/transport-distribute-order/submit */
export async function TransportDistributeOrderSubmitAsync(
  body: API.BurnAbpTMSSubmitOrderBaseDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-distribute-order/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改派车申请单信息 POST /api/tms/transport-distribute-order/update/${param0} */
export async function TransportDistributeOrderUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportDistributeOrderUpdateAsyncParams,
  body: API.BurnAbpTMS_paicheshenqingdanDtoCreateOrUpdateTransportDistributeOrderDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_paicheshenqingdanDtoTransportDistributeOrderDto>(
    `/api/tms/transport-distribute-order/update/${param0}`,
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
