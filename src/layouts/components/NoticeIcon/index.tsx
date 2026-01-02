import { message } from 'antd';
import { groupBy } from 'lodash';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import NoticeIcon from './NoticeIcon';


export type GlobalHeaderRightProps = {
    fetchingNotices?: boolean;
    onNoticeVisibleChange?: (visible: boolean) => void;
    onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: any[]): Record<string, any[]> => {
    if (!notices || notices.length === 0 || !Array.isArray(notices)) {
        return {};
    }

    const newNotices = notices.map((notice) => {
        const newNotice: any = { ...notice };

        newNotice.type = "notification";

        return newNotice;
    });

    return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, any[]>) => {
    const unreadMsg: Record<string, number> = {};
    Object.keys(noticeData).forEach((key) => {
        const value = noticeData[key];

        if (!unreadMsg[key]) {
            unreadMsg[key] = 0;
        }

        if (Array.isArray(value)) {
            unreadMsg[key] = value.filter((item) => item.state === 0).length;
        }
    });
    return unreadMsg;
};

const NoticeIconView = (props: any) => {
    const { notifications, loadNotifications, readNotification, readAllNotification } = useModel('useNotificationModel');

    useEffect(() => {
        loadNotifications();
    }, []);

    const noticeData = getNoticeData(notifications);
    const unreadMsg = getUnreadData(noticeData || {});

    const changeReadState = (id: string) => {
        readNotification(id);
    };

    const clearReadState = (title: string, key: string) => {
        readAllNotification();
        message.success(`${'清空了'} ${title}`);
    };

    return (
        <NoticeIcon
            className={props.className}
            count={notifications.length}
            onItemClick={(item) => {
                changeReadState(item.id!);
            }}
            onClear={(title: string, key: string) => clearReadState(title, key)}
            loading={false}
            clearText="清空"
            viewMoreText="查看更多"
            onViewMore={() => message.info('Click on view more')}
            clearClose
        >
            <NoticeIcon.Tab
                tabKey="notification"
                count={unreadMsg.notification}
                list={noticeData.notification}
                title="通知"
                emptyText="你已查看所有通知"
                showViewMore
            />
            <NoticeIcon.Tab
                tabKey="message"
                count={unreadMsg.message}
                list={noticeData.message}
                title="消息"
                emptyText="您已读完所有消息"
                showViewMore
            />
            <NoticeIcon.Tab
                tabKey="event"
                title="待办"
                emptyText="你已完成所有待办"
                count={unreadMsg.event}
                list={noticeData.event}
                showViewMore
            />
        </NoticeIcon>
    );
};

export default NoticeIconView;
