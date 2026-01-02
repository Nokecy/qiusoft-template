import React from 'react';
import { Button, Empty, List, Space, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { BadgeDetail } from '../models/badge';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

/**
 * Badge下拉菜单组件
 */

export interface BadgeDropdownProps {
    /** 总Badge数量 */
    totalCount: number;
    /** Badge详情列表 */
    details: BadgeDetail[];
    /** 清除指定服务Badge回调 */
    onClearService: (serviceId: string) => Promise<void>;
    /** 清除所有Badge回调 */
    onClearAll: () => Promise<void>;
}

const BadgeDropdown: React.FC<BadgeDropdownProps> = ({
    totalCount,
    details,
    onClearService,
    onClearAll
}) => {
    // 处理清除单个服务
    const handleClearService = async (serviceId: string) => {
        try {
            await onClearService(serviceId);
        } catch (err) {
            console.error('清除Badge失败:', err);
        }
    };

    // 处理清除所有
    const handleClearAll = async () => {
        try {
            await onClearAll();
        } catch (err) {
            console.error('清除所有Badge失败:', err);
        }
    };

    // 格式化时间
    const formatTime = (timeString?: string) => {
        if (!timeString) return '';
        return dayjs(timeString).fromNow();
    };

    return (
        <div
            style={{
                width: 360,
                maxHeight: 480,
                backgroundColor: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* 头部 */}
            <div
                style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <span style={{ fontWeight: 500, fontSize: 14 }}>
                    通知 ({totalCount})
                </span>
                {totalCount > 0 && (
                    <Button
                        type="link"
                        size="small"
                        onClick={handleClearAll}
                        style={{ padding: 0 }}
                    >
                        全部已读
                    </Button>
                )}
            </div>

            {/* 列表内容 */}
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {details && details.length > 0 ? (
                    <List
                        dataSource={details}
                        renderItem={(item) => (
                            <List.Item
                                key={item.serviceId}
                                style={{
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #f5f5f5',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                        {/* 服务名称和数量 */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 500, fontSize: 14 }}>
                                                {item.serviceName || item.serviceId}
                                            </span>
                                            <Tag color="blue" style={{ margin: 0 }}>
                                                {item.count}
                                            </Tag>
                                        </div>

                                        {/* Badge类型和时间 */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                                                {item.badgeType || '通知'}
                                            </span>
                                            <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                                                {formatTime(item.lastUpdateTime)}
                                            </span>
                                        </div>

                                        {/* 操作按钮 */}
                                        <div style={{ marginTop: 8 }}>
                                            <Button
                                                size="small"
                                                type="text"
                                                icon={<CheckOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (item.serviceId) {
                                                        handleClearService(item.serviceId);
                                                    }
                                                }}
                                            >
                                                标记已读
                                            </Button>
                                        </div>
                                    </Space>
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="暂无通知"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BadgeDropdown;
