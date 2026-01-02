// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 POST /api/notification-manager/user-notification/${param0}/read */
export async function UserNotificationMarkAsReadAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserNotificationMarkAsReadAsyncParams,
	options?: { [key: string]: any }
) {
	const { id: param0, ...queryParams } = params;
	return request<any>(`/api/notification-manager/user-notification/${param0}/read`, {
		method: 'POST',
		params: { ...queryParams },
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/notification-manager/user-notification/get */
export async function UserNotificationGetMyNotificationsAsync(
	// 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
	params: API.UserNotificationGetMyNotificationsAsyncParams,
	options?: { [key: string]: any }
) {
	return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpNotificationServiceNotificationsDtosUserNotificationDto>('/api/notification-manager/user-notification/get', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 此处后端没有提供注释 POST /api/notification-manager/user-notification/read-all */
export async function UserNotificationMarkAllAsReadAsync(options?: { [key: string]: any }) {
	return request<any>('/api/notification-manager/user-notification/read-all', {
		method: 'POST',
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/notification-manager/user-notification/unread-count */
export async function UserNotificationGetUnreadCountAsync(options?: { [key: string]: any }) {
	return request<number>('/api/notification-manager/user-notification/unread-count', {
		method: 'GET',
		...(options || {}),
	});
}
