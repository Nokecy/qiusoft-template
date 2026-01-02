// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /integration-api/notification/user-notification-integration/publish */
export async function UserNotificationIntegrationPublishAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationIntegrationPublishAsyncParams,
  body: API.BurnAbpNotificationManagerNotificationPublishDto,
  options?: { [key: string]: any },
) {
  return request<any>('/integration-api/notification/user-notification-integration/publish', {
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
