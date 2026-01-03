import { useState, useCallback } from 'react';
import {
  UserNotificationGetMyNotificationsAsync,
  UserNotificationMarkAllAsReadAsync,
  UserNotificationMarkAsReadAsync,
} from '@/services/openApi/UserNotification';

export default function useAuthModel() {
	const [notifications, setNotifications] = useState([]);

        const loadNotifications = useCallback(() => {
                UserNotificationGetMyNotificationsAsync({ SkipCount: 0, MaxResultCount: 1000, Sorting: 'id' })
                        //@ts-ignore
                        .then(value => setNotifications(value?.items || []));
        }, []);

        const readNotification = useCallback(userNotificationId => {
                UserNotificationMarkAsReadAsync({ id: userNotificationId }).then(() => loadNotifications());
        }, []);

        const readAllNotification = useCallback(() => {
                UserNotificationMarkAllAsReadAsync().then(() => loadNotifications());
        }, []);

	return {
		notifications,
		setNotifications,
		loadNotifications,
		readNotification,
		readAllNotification,
	};
}
