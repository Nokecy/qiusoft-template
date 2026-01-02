// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 根据给定Id获取通知信息 GET /api/notification-manager/user-notification/${param0} */
export async function UserNotificationGetNotificationAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationGetNotificationAsyncParams,
  options?: { [key: string]: any },
) {
  const { userNotificationId: param0, ...queryParams } = params;
  return request<API.BurnAbpNotificationManagerUserNotificationDto>(
    `/api/notification-manager/user-notification/${param0}`,
    {
      method: 'GET',
      params: {
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 根据给定Id删除通知 DELETE /api/notification-manager/user-notification/delete/${param0} */
export async function UserNotificationDeleteNotificationAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationDeleteNotificationAsyncParams,
  options?: { [key: string]: any },
) {
  const { userNotificationId: param0, ...queryParams } = params;
  return request<any>(`/api/notification-manager/user-notification/delete/${param0}`, {
    method: 'DELETE',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 删除所有通知 DELETE /api/notification-manager/user-notification/delete/all */
export async function UserNotificationDeleteAllNotificationsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationDeleteAllNotificationsAsyncParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/notification-manager/user-notification/delete/all', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取通知列表 GET /api/notification-manager/user-notification/get */
export async function UserNotificationGetNotificationsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationGetNotificationsAsyncParams,
  options?: { [key: string]: any },
) {
  return request<API.BurnAbpNotificationManagerUserNotificationDto[]>(
    '/api/notification-manager/user-notification/get',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 根据给定条件获取通知总数 GET /api/notification-manager/user-notification/total */
export async function UserNotificationGetNotificationCountAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationGetNotificationCountAsyncParams,
  options?: { [key: string]: any },
) {
  return request<number>('/api/notification-manager/user-notification/total', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新单个通知状态 POST /api/notification-manager/user-notification/update-state/${param0} */
export async function UserNotificationUpdateNotificationStateAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationUpdateNotificationStateAsyncParams,
  options?: { [key: string]: any },
) {
  const { userNotificationId: param0, ...queryParams } = params;
  return request<any>(`/api/notification-manager/user-notification/update-state/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 更新所有通知状态 POST /api/notification-manager/user-notification/update-state/all */
export async function UserNotificationUpdateAllNotificationStatesAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserNotificationUpdateAllNotificationStatesAsyncParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/notification-manager/user-notification/update-state/all', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
