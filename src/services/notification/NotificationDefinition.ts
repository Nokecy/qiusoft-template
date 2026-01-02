// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取通知列表 GET /api/notification-manager/notification/list */
export async function NotificationDefinitionGetListAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NotificationDefinitionGetListAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpNotificationManagerNotificationDefinitionDto[]>(
    '/api/notification-manager/notification/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 订阅通知 GET /api/notification-manager/notification/subscribe/${param0} */
export async function NotificationDefinitionSubscribeAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NotificationDefinitionSubscribeAsyncParams,
  options?: { [key: string]: any },
) {
  const { notificationName: param0, ...queryParams } = params;
  return request<any>(`/api/notification-manager/notification/subscribe/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 取消订阅通知 GET /api/notification-manager/notification/unsubscribe/${param0} */
export async function NotificationDefinitionUnsubscribeAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NotificationDefinitionUnsubscribeAsyncParams,
  options?: { [key: string]: any },
) {
  const { notificationName: param0, ...queryParams } = params;
  return request<any>(`/api/notification-manager/notification/unsubscribe/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
