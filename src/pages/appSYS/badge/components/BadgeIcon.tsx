import React, { useState, useEffect } from 'react';
import { Badge, Dropdown, Spin, Tooltip } from 'antd';
import { BellOutlined, WifiOutlined, LoadingOutlined, DisconnectOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { formatBadgeCount } from '../services/badgeUtils';
import BadgeDropdown from './BadgeDropdown';

/**
 * Badge图标组件 - 显示在顶部导航栏
 */

export interface BadgeIconProps {
    /** API基础URL */
    apiBaseUrl: string;
    /** 获取Token函数 */
    getToken: () => string | undefined;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 自定义类名 */
    className?: string;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({
    apiBaseUrl,
    getToken,
    style,
    className
}) => {
    const {
        totalCount,
        details,
        isConnected,
        isConnecting,
        initializeConnection,
        loadSummary,
        clearServiceBadge,
        clearAllBadges,
        disconnect
    } = useModel('useBadgeModel');

    const [dropdownVisible, setDropdownVisible] = useState(false);

    // 初始化连接
    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const init = async () => {
            cleanup = await initializeConnection(apiBaseUrl, getToken);
        };

        init();

        // 组件卸载时清理
        return () => {
            if (cleanup) {
                cleanup();
            } else {
                disconnect();
            }
        };
    }, [apiBaseUrl, getToken, initializeConnection, disconnect]);

    // 处理下拉菜单显示状态变化
    const handleVisibleChange = (visible: boolean) => {
        setDropdownVisible(visible);
        // 打开时刷新数据
        if (visible) {
            loadSummary();
        }
    };

    // 处理清除单个服务
    const handleClearService = async (serviceId: string) => {
        await clearServiceBadge(serviceId);
    };

    // 处理清除所有Badge
    const handleClearAll = async () => {
        await clearAllBadges();
        setDropdownVisible(false);
    };

    // 渲染连接状态图标
    const renderStatusIcon = () => {
        if (isConnecting) {
            return (
                <Tooltip title="连接中...">
                    <LoadingOutlined style={{ fontSize: 12, color: '#faad14', marginLeft: 4 }} />
                </Tooltip>
            );
        }

        if (!isConnected) {
            return (
                <Tooltip title="离线模式">
                    <DisconnectOutlined style={{ fontSize: 12, color: '#ff4d4f', marginLeft: 4 }} />
                </Tooltip>
            );
        }

        return null;
    };

    // 下拉菜单内容
    const dropdownMenu = (
        <BadgeDropdown
            totalCount={totalCount}
            details={details}
            onClearService={handleClearService}
            onClearAll={handleClearAll}
        />
    );

    return (
        <div className={className} style={{ display: 'inline-block', ...style }}>
            <Dropdown
                overlay={dropdownMenu}
                trigger={['click']}
                placement="bottomRight"
                open={dropdownVisible}
                onOpenChange={handleVisibleChange}
            >
                <div
                    style={{
                        padding: '0 12px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                >
                    <Badge count={totalCount} overflowCount={99} offset={[10, 0]}>
                        <BellOutlined style={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.65)' }} />
                    </Badge>
                    {renderStatusIcon()}
                </div>
            </Dropdown>
        </div>
    );
};

export default BadgeIcon;
