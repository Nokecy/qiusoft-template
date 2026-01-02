import { useState, useCallback } from 'react';
import {
	UserNotificationGetNotificationsAsync,
	UserNotificationUpdateAllNotificationStatesAsync,
	UserNotificationUpdateNotificationStateAsync,
} from '@/services/notification/UserNotification';

export default function useAuthModel() {
	const [notifications, setNotifications] = useState([]);

	const loadNotifications = useCallback(() => {
		UserNotificationGetNotificationsAsync({ State: 0, SkipCount: 0, MaxResultCount: 1000, Sorting: 'id' })
			//@ts-ignore
			.then(value => setNotifications(value));
	}, []);

	const readNotification = useCallback(userNotificationId => {
		UserNotificationUpdateNotificationStateAsync({ state: 1, userNotificationId: userNotificationId }).then(() => loadNotifications());
	}, []);

	const readAllNotification = useCallback(() => {
		UserNotificationUpdateAllNotificationStatesAsync({ state: 1 }).then(() => loadNotifications());
	}, []);

	return {
		notifications,
		setNotifications,
		loadNotifications,
		readNotification,
		readAllNotification,
	};
}
