// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 取消装车采集完成，修改状态为装车中 POST /api/tms/transport-order/取消装车完成 */
export async function TransportOrderCancelCheckCompleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderCancelCheckCompleteAsyncParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/取消装车完成', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 动态挂载一个或多个停靠点到派车订单上 POST /api/tms/transport-order/append-location-item */
export async function TransportOrderAppendLocationListAsync(
  body: API.BurnAbpTMS_paichedingdanDtoAppendLocationDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/append-location-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 动态挂载一个或多个发运订单到派车订单上 POST /api/tms/transport-order/append-shipment */
export async function TransportOrderAppendShipmentAsync(
  body: API.BurnAbpTMS_paichedingdanDtoAppendShipmentDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/append-shipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核/反审核派车订单 POST /api/tms/transport-order/audit */
export async function TransportOrderAuditAsync(
  body: API.BurnAbpTMSSubmitOrderBaseDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取系统可用车辆列表信息 GET /api/tms/transport-order/available-vehicle-list */
export async function TransportOrderGetAvailableVehicleListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetAvailableVehicleListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_cheliangxinxiDtoVehicleDto>(
    '/api/tms/transport-order/available-vehicle-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 绑定派车单携带的周转箱信息 POST /api/tms/transport-order/bind-transport-pallet-list */
export async function TransportOrderBindTransportPalletListAsync(
  body: API.BurnAbpTMS_paichedingdanDtoBindTransportPalletItemDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/bind-transport-pallet-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消派车订单采集的箱信息 POST /api/tms/transport-order/cancel-re-check */
export async function TransportOrderCancelReCheck(
  body: API.BurnAbpTMS_cheliangxinxiDtoCancelRecheckInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderRecheckOutputDto>(
    '/api/tms/transport-order/cancel-re-check',
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

/** 手动提交装车采集完成 POST /api/tms/transport-order/check-complete */
export async function TransportOrderCheckCompleteAsync(
  body: API.BurnAbpTMS_paichedingdanDtoCheckCompleteDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/check-complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/transport-order/check-completed */
export async function TransportOrderGetCheckCompletedOrdersAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetCheckCompletedOrdersAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderDto>(
    '/api/tms/transport-order/check-completed',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/transport-order/confirm-unload-location */
export async function TransportOrderConfirmUnloadLocationAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderConfirmUnloadLocationAsyncParams,
  body: API.BurnAbpTMS_paichedingdanDtoConfirmUnloadLocationDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/confirm-unload-location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建派车订单信息 POST /api/tms/transport-order/create */
export async function TransportOrderCreateAsync(
  body: API.BurnAbpTMS_paichedingdanDtoCreateTransportOrderInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderDto>(
    '/api/tms/transport-order/create',
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

/** 删除派车订单信息 POST /api/tms/transport-order/delete/${param0} */
export async function TransportOrderDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/transport-order/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/tms/transport-order/depart */
export async function TransportOrderDepartAsync(
  body: API.BurnAbpTMS_paichedingdanDtoDepartTransportOrderInputDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/depart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出派车订单信息 GET /api/tms/transport-order/export */
export async function TransportOrderExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/transport-order/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据派车单号获取需要复核的信息，如箱、车辆等信息 GET /api/tms/transport-order/get-boxList-by-transport-number */
export async function TransportOrderGetBoxItemListByTransportNumberAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetBoxItemListByTransportNumberAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderRecheckOutputDto>(
    '/api/tms/transport-order/get-boxList-by-transport-number',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据派车单号获取打印单据数据源 GET /api/tms/transport-order/get-print-source-data */
export async function TransportOrderGetPrintSourceDataAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetPrintSourceDataAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderPrintListDto>(
    '/api/tms/transport-order/get-print-source-data',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据Id返回单个派车订单信息 GET /api/tms/transport-order/id */
export async function TransportOrderGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderDto>('/api/tms/transport-order/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入派车订单信息 POST /api/tms/transport-order/import */
export async function TransportOrderImportAsync(
  body: {},
  File?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (File) {
    formData.append('File', File);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>('/api/tms/transport-order/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 下载导入模板 GET /api/tms/transport-order/import-template */
export async function TransportOrderGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/transport-order/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取派车订单列表 GET /api/tms/transport-order/list */
export async function TransportOrderGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderDto>(
    '/api/tms/transport-order/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 将一个或多个发运订单装载关联到派车订单上面 POST /api/tms/transport-order/load-shipment */
export async function TransportOrderLoadShipmentAsync(
  body: API.BurnAbpTMS_paichedingdanDtoTransportOrderLoadShpmentOrderDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/load-shipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据派车单号获取派车单停靠的具体点信息 GET /api/tms/transport-order/location-detailItem-list-byId */
export async function TransportOrderGetLocationDetailItemListByIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetLocationDetailItemListByIdAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoCreateOrUpdateTransportOrderLocationItemDto[]>(
    '/api/tms/transport-order/location-detailItem-list-byId',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询派车单停靠点列表-派车订单浏览 GET /api/tms/transport-order/location-item-list */
export async function TransportOrderGetLocationItemListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetLocationItemListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderLocationItemDto>(
    '/api/tms/transport-order/location-item-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取派车订单停靠点列表 GET /api/tms/transport-order/location-item-list-by-id */
export async function TransportOrderGetLocationItemListByIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetLocationItemListByIdAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderLocationItemDto[]>(
    '/api/tms/transport-order/location-item-list-by-id',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取派车运输单携带的周转箱类型以及数量 GET /api/tms/transport-order/pallet-item-list */
export async function TransportOrderGetLocationPalletItemListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetLocationPalletItemListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderLocationPalletItemDto>(
    '/api/tms/transport-order/pallet-item-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 派车订单装车采集校验 POST /api/tms/transport-order/re-check */
export async function TransportOrderReCheck(
  body: API.BurnAbpTMS_paichedingdanDtoTransportOrderRecheckInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderRecheckOutputDto>(
    '/api/tms/transport-order/re-check',
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

/** 此处后端没有提供注释 POST /api/tms/transport-order/remove-shipment */
export async function TransportOrderRemoveShipmentsAsync(
  body: API.BurnAbpTMS_paichedingdanDtoRemoveShipmentsDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/remove-shipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 派车单运输完成返回公司 PUT /api/tms/transport-order/return-company */
export async function TransportOrderReturnCompanyAsync(
  body: API.BurnAbpTMS_paichedingdanDtoTransportOrderReturnCompanyInputDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/return-company', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据派车单Id获取派车订单需要发运的发运单列表信息 GET /api/tms/transport-order/shipment-boxItem-list-by-id */
export async function TransportOrderGetShipmentBoxItemListByIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetShipmentBoxItemListByIdAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[]>(
    '/api/tms/transport-order/shipment-boxItem-list-by-id',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据派车单Id获取关联的发运订单列表 POST /api/tms/transport-order/shipment-list-by-id */
export async function TransportOrderGetShipmentListByIdAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetShipmentListByIdAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[]>(
    '/api/tms/transport-order/shipment-list-by-id',
    {
      method: 'POST',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据派车单号获取关联的发运订单列表 GET /api/tms/transport-order/shipment-list-by-number */
export async function TransportOrderGetShipmentListByNumberAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetShipmentListByNumberAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[]>(
    '/api/tms/transport-order/shipment-list-by-number',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 开始装车采集 POST /api/tms/transport-order/start-re-check */
export async function TransportOrderStartReCheck(
  body: API.BurnAbpTMS_paichedingdanDtoTransportOrderRecheckInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderRecheckOutputDto>(
    '/api/tms/transport-order/start-re-check',
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

/** 提交/反提交派车订单 POST /api/tms/transport-order/submit */
export async function TransportOrderSubmitAsync(
  body: API.BurnAbpTMSSubmitOrderBaseDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取已发车、未返司的派车单 GET /api/tms/transport-order/transporting */
export async function TransportOrderGetTransportingOrdersAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderGetTransportingOrdersAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_paichedingdanDtoTransportOrderDto>(
    '/api/tms/transport-order/transporting',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 卸车采集 POST /api/tms/transport-order/un-load-check */
export async function TransportOrderUnloadCheckAsync(
  body: API.BurnAbpTMS_paichedingdanDtoUnLoadCheckDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/transport-order/un-load-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新派车订单信息 POST /api/tms/transport-order/update/${param0} */
export async function TransportOrderUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TransportOrderUpdateAsyncParams,
  body: API.BurnAbpTMS_paichedingdanDtoUpdateTransportOrderInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_paichedingdanDtoTransportOrderDto>(
    `/api/tms/transport-order/update/${param0}`,
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
