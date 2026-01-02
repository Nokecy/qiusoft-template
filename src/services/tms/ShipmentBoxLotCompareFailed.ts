// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /api/tms/shipment-box-lot-compare-failed */
export async function ShipmentBoxLotCompareFailedGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentBoxLotCompareFailedGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto>(
    '/api/tms/shipment-box-lot-compare-failed',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/tms/shipment-box-lot-compare-failed/${param0} */
export async function ShipmentBoxLotCompareFailedGetAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentBoxLotCompareFailedGetAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto>(
    `/api/tms/shipment-box-lot-compare-failed/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/tms/shipment-box-lot-compare-failed/${param0}/attachments */
export async function ShipmentBoxLotCompareFailedUploadAttachmentsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentBoxLotCompareFailedUploadAttachmentsAsyncParams,
  body: API.BurnAbpTMSShipmentBoxLotCompareFailedLogsCreateShipmentBoxLotCompareFailedLogAttachmentInput,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto>(
    `/api/tms/shipment-box-lot-compare-failed/${param0}/attachments`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/tms/shipment-box-lot-compare-failed/${param0}/mark-as-handled */
export async function ShipmentBoxLotCompareFailedMarkAsHandledAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ShipmentBoxLotCompareFailedMarkAsHandledAsyncParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BurnAbpTMSShipmentBoxLotCompareFailedLogsShipmentBoxLotCompareFailedLogDto>(
    `/api/tms/shipment-box-lot-compare-failed/${param0}/mark-as-handled`,
    {
      method: 'PUT',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
