// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/shipmentOrder/${param0}/export-details */
export async function ShipmentOrderExportDetailsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderExportDetailsAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<string>(`/api/tms/shipmentOrder/${param0}/export-details`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取发运单指定物料是否需要打印箱批次标签 GET /api/tms/shipmentOrder/${param0}/should-print-box-lot-labels */
export async function ShipmentOrderShouldPrintShipmentBoxLotLabelsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderShouldPrintShipmentBoxLotLabelsAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/api/tms/shipmentOrder/${param0}/should-print-box-lot-labels`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 采集绑定箱数据和发运订单 POST /api/tms/shipmentOrder/bind-box-item */
export async function ShipmentOrderBindBoxItemAsync(
  body: API.BurnAbpTMS_fayundingdanDtoCollectBoxInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoCollectBoxResultDto>(
    '/api/tms/shipmentOrder/bind-box-item',
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

/** 此处后端没有提供注释 PUT /api/tms/shipmentOrder/bind-customer-side-code */
export async function ShipmentOrderBindCustomerSideCodeAsync(
  body: API.BurnAbpTMS_fayundingdanDtoBindCustomerSideCodeInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/bind-customer-side-code', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询发运订单箱号列表 GET /api/tms/shipmentOrder/box-list */
export async function ShipmentOrderGetBoxItemListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetBoxItemListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto>(
    '/api/tms/shipmentOrder/box-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询发运订单箱批次列表 GET /api/tms/shipmentOrder/box-lot-list */
export async function ShipmentOrderGetBoxLotListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetBoxLotListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderBoxLotDto>(
    '/api/tms/shipmentOrder/box-lot-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 取消装车复核 POST /api/tms/shipmentOrder/cancel-recheck */
export async function ShipmentOrderCancelReCheckAsync(
  body: API.BurnAbpTMS_cheliangxinxiDtoCancelRecheckInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderRecheckDto>(
    '/api/tms/shipmentOrder/cancel-recheck',
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

/** 反审核 POST /api/tms/shipmentOrder/check-back */
export async function ShipmentOrderCheckOrderBackAsync(
  body: API.BurnAbpTMS_fayundingdanDtoOrderCheckInputDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/check-back', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审批驳回 POST /api/tms/shipmentOrder/check-down */
export async function ShipmentOrderCheckOrderDownAsync(
  body: API.BurnAbpTMS_fayundingdanDtoOrderCheckInputDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/check-down', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 审批通过 POST /api/tms/shipmentOrder/check-pass */
export async function ShipmentOrderCheckOrderPassAsync(
  body: API.BurnAbpTMS_fayundingdanDtoOrderCheckInputDto,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/check-pass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询已复核的箱号列表信息 GET /api/tms/shipmentOrder/checked-box-list */
export async function ShipmentOrderGetCheckedBoxListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetCheckedBoxListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto>(
    '/api/tms/shipmentOrder/checked-box-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 装车采集 POST /api/tms/shipmentOrder/collec-material */
export async function ShipmentOrderCollectBoxAsync(
  body: API.BurnAbpTMS_fayundingdanDtoCollectBoxInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoCollectBoxResultDto>(
    '/api/tms/shipmentOrder/collec-material',
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

/** 比较箱批次 POST /api/tms/shipmentOrder/compare-box-lot */
export async function ShipmentOrderCompareBoxLotAsync(
  body: API.BurnAbpTMS_fayundingdanCompareBoxLotInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderBoxLotDto[]>(
    '/api/tms/shipmentOrder/compare-box-lot',
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

/** 创建发运订单 POST /api/tms/shipmentOrder/create */
export async function ShipmentOrderCreateAsync(
  body: API.BurnAbpTMS_fayundingdanDtoCreateOrUpdateShipmentOrderDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>('/api/tms/shipmentOrder/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除发运订单 POST /api/tms/shipmentOrder/delete/${param0} */
export async function ShipmentOrderDeleteAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderDeleteAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/shipmentOrder/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 导出发运订单 GET /api/tms/shipmentOrder/export */
export async function ShipmentOrderExportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderExportAsyncParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/tms/shipmentOrder/export', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/tms/shipmentOrder/get-by-number */
export async function ShipmentOrderGetByNumberAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetByNumberAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    '/api/tms/shipmentOrder/get-by-number',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 通过发运单号查询已复核装车明细（取消装车复核使用） GET /api/tms/shipmentOrder/get-cancelable-box-list */
export async function ShipmentOrderGetCancelableListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetCancelableListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto[]>(
    '/api/tms/shipmentOrder/get-cancelable-box-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 获取送货单复核信息 GET /api/tms/shipmentOrder/get-check-items/${param0} */
export async function ShipmentOrderGetShipmentCheckItemAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetShipmentCheckItemAsyncParams,
  options?: { [key: string]: any },
) {
  const { number: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderRecheckDto>(
    `/api/tms/shipmentOrder/get-check-items/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 查询装车采集物料信息 GET /api/tms/shipmentOrder/get-collect-material/${param0} */
export async function ShipmentOrderGetCollectBoxListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetCollectBoxListAsyncParams,
  options?: { [key: string]: any },
) {
  const { number: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_fayundingdanDtoCollectBoxResultDto>(
    `/api/tms/shipmentOrder/get-collect-material/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 查询时间段内发运编码及占比 POST /api/tms/shipmentOrder/get-ship-ment-time-slot-top-view */
export async function ShipmentOrderGetShipmentTimeSlitTopAsync(
  body: API.BurnAbpTMS_fayundingdanDtoShipmentTimeSlotTopInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentTimeSlotTopViewModel[]>(
    '/api/tms/shipmentOrder/get-ship-ment-time-slot-top-view',
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

/** 时间段内每日发运统计 POST /api/tms/shipmentOrder/get-ship-ment-time-slot-view */
export async function ShipmentOrderGetShipmentTimeSlotAsync(
  body: API.BurnAbpTMS_fayundingdanDtoShipmentTimeSlotInputDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentTimeSlotViewModel[]>(
    '/api/tms/shipmentOrder/get-ship-ment-time-slot-view',
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

/** 指定日期发运信息统计 GET /api/tms/shipmentOrder/get-ship-ment-view/${param0} */
export async function ShipmentOrderGetShipmentViewAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetShipmentViewAsyncParams,
  options?: { [key: string]: any },
) {
  const { dateTime: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentViewModel>(
    `/api/tms/shipmentOrder/get-ship-ment-view/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 根据发运单号获取当前发运订单的签收信息 GET /api/tms/shipmentOrder/get-sign-back-by-number */
export async function ShipmentOrderGetSignBackInfoByNumberAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetSignBackInfoByNumberAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    '/api/tms/shipmentOrder/get-sign-back-by-number',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 待发运箱单浏览 GET /api/tms/shipmentOrder/get-wait-box-list */
export async function ShipmentOrderGetWaitBoxListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetWaitBoxListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderBoxItemDto>(
    '/api/tms/shipmentOrder/get-wait-box-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 待发运列表浏览 GET /api/tms/shipmentOrder/get-wait-item-list */
export async function ShipmentOrderGetWaitItemListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetWaitItemListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderItemDto>(
    '/api/tms/shipmentOrder/get-wait-item-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据主键ID获取发运订单信息 GET /api/tms/shipmentOrder/id */
export async function ShipmentOrderGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>('/api/tms/shipmentOrder/id', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导入发运订单 POST /api/tms/shipmentOrder/import */
export async function ShipmentOrderImportAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderImportAsyncParams,
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

  return request<any>('/api/tms/shipmentOrder/import', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 导入箱号数据 POST /api/tms/shipmentOrder/import-box */
export async function ShipmentOrderImportShipmentBoxAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderImportShipmentBoxAsyncParams,
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

  return request<any>('/api/tms/shipmentOrder/import-box', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 下载箱号模板 GET /api/tms/shipmentOrder/import-box-template */
export async function ShipmentOrderGetImportBoxTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/shipmentOrder/import-box-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 下载发运订单模板 GET /api/tms/shipmentOrder/import-template */
export async function ShipmentOrderGetImportTemplateAsync(options?: { [key: string]: any }) {
  return request<string>('/api/tms/shipmentOrder/import-template', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询发运订单明细列表 GET /api/tms/shipmentOrder/item-list */
export async function ShipmentOrderGetItemListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetItemListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderItemWithOrderDto>(
    '/api/tms/shipmentOrder/item-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据条件获取发运订单列表 GET /api/tms/shipmentOrder/list */
export async function ShipmentOrderGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    '/api/tms/shipmentOrder/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 装车采集取消 POST /api/tms/shipmentOrder/load-cancel */
export async function ShipmentOrderLoadCancel(
  body: API.BurnAbpTMS_fayundingdanDtoCancelLoadInput,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderItemDto[]>(
    '/api/tms/shipmentOrder/load-cancel',
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

/** 一键采集发运单号，所有复核 POST /api/tms/shipmentOrder/one-click-collection */
export async function ShipmentOrderOneClickCollectionAsync(
  body: API.BurnAbpTMS_fayundingdanDtoOneClickCollectionInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/one-click-collection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重新回传第三方系统 POST /api/tms/shipmentOrder/re-callBack */
export async function ShipmentOrderReCallBackAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderReCallBackAsyncParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/re-callBack', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 装车复核 POST /api/tms/shipmentOrder/recheck */
export async function ShipmentOrderReCheck(
  body: API.BurnAbpTMS_fayundingdanDtoReCheckDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderRecheckDto>(
    '/api/tms/shipmentOrder/recheck',
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

/** 手动发运完成--按实际采集数量进行回写数量 POST /api/tms/shipmentOrder/shipment-completed */
export async function ShipmentOrderShipmentCompletedAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderShipmentCompletedAsyncParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/shipment-completed', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发运订单签返 POST /api/tms/shipmentOrder/sign-back */
export async function ShipmentOrderSignBackAsync(
  body: API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    '/api/tms/shipmentOrder/sign-back',
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

/** 提交审核 POST /api/tms/shipmentOrder/submit/${param0} */
export async function ShipmentOrderSubmitAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderSubmitAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/tms/shipmentOrder/submit/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 同步第三方指定单号的单据数据 POST /api/tms/shipmentOrder/sync-assigned-asn */
export async function ShipmentOrderSynchronousAssignedAsnAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderSynchronousAssignedAsnAsyncParams,
  options?: { [key: string]: any },
) {
  return request<boolean>('/api/tms/shipmentOrder/sync-assigned-asn', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取发运订单解析模板列表 GET /api/tms/shipmentOrder/template-resolver-provider-list */
export async function ShipmentOrderGetTemplateResolverProviderListAsync(options?: {
  [key: string]: any;
}) {
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentTemplateResolverDto[]>(
    '/api/tms/shipmentOrder/template-resolver-provider-list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取未关联派车单并且未做派车申请的发运订单列表 GET /api/tms/shipmentOrder/un-relation-transport-list */
export async function ShipmentOrderGetUnRelationTransportListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderGetUnRelationTransportListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    '/api/tms/shipmentOrder/un-relation-transport-list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/tms/shipmentOrder/unbind-box-item */
export async function ShipmentOrderUnBindBoxItemAsync(
  body: API.BurnAbpTMS_fayundingdanDtoUnBindBoxItemInput,
  options?: { [key: string]: any },
) {
  return request<any>('/api/tms/shipmentOrder/unbind-box-item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改发运订单 POST /api/tms/shipmentOrder/update/${param0} */
export async function ShipmentOrderUpdateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentOrderUpdateAsyncParams,
  body: API.BurnAbpTMS_fayundingdanDtoCreateOrUpdateShipmentOrderDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMS_fayundingdanDtoShipmentOrderDto>(
    `/api/tms/shipmentOrder/update/${param0}`,
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
