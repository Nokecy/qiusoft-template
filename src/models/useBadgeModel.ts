import { useState, useCallback, useEffect } from 'react';
import { badgeHub, BadgeUpdatedEvent, ConnectionStatus } from '@/pages/appSYS/badge/services/badgeHub';
import { BadgeCache, PollingManager, debounce } from '@/pages/appSYS/badge/services/badgeUtils';
import {
    BadgeGetSummaryAsync,
    BadgeClearServiceBadgeAsync,
    BadgeClearAllBadgesAsync,
} from '@/services/openApi/Badge';
import { message } from 'antd';

/**
 * Badge Model - UmiJS全局状态管理
 */

export interface BadgeDetail {
    serviceId?: string;
    serviceName?: string;
    badgeType?: string;
    count?: number;
    lastUpdateTime?: string;
}

export interface BadgeState {
    // 数据状态
    totalCount: number;
    badges: Record<string, number>;
    details: BadgeDetail[];

    // 连接状态
    isConnected: boolean;
    isConnecting: boolean;

    // 错误状态
    error: string | null;
}

// 缓存实例（60秒过期）
const badgeCache = new BadgeCache<API.BurnAbpBadgeAbstractsDtosBadgeSummaryDto>(60000);

export default function useBadgeModel() {
    // 状态
    const [state, setState] = useState<BadgeState>({
        totalCount: 0,
        badges: {},
        details: [],
        isConnected: false,
        isConnecting: false,
        error: null,
    });

    // 轮询管理器
    const [pollingManager] = useState(() => new PollingManager(async () => {
        await loadSummary();
    }, 30000));

    /**
     * 更新Badge数据（防抖处理，避免频繁更新UI）
     */
    const updateBadgeData = useCallback(
        debounce((data: BadgeUpdatedEvent) => {
            setState(prev => ({
                ...prev,
                totalCount: data.totalCount || 0,
                badges: data.badges || {},
            }));

            // 清除缓存，确保下次查询获取最新数据
            badgeCache.clear();

            // 如果是离线更新，显示提示
            if (data.isOfflineUpdate && data.totalCount > 0) {
                message.info(`您离线期间有 ${data.totalCount} 条新通知`);
            }
        }, 300),
        []
    );

    /**
     * 更新连接状态
     */
    const updateConnectionStatus = useCallback((status: ConnectionStatus) => {
        console.log('Badge连接状态更新:', {
            isConnected: status.isConnected,
            isConnecting: status.isConnecting,
            error: status.error
        });

        setState(prev => ({
            ...prev,
            isConnected: status.isConnected,
            isConnecting: status.isConnecting,
            error: status.error,
        }));

        // 如果连接失败，启动轮询
        if (!status.isConnected && !status.isConnecting && status.error) {
            console.log('SignalR连接失败，启动轮询降级策略');
            pollingManager.start();
        }

        // 如果连接成功，停止轮询
        if (status.isConnected) {
            console.log('SignalR连接成功，停止轮询');
            pollingManager.stop();
        }
    }, [pollingManager]);

    /**
     * 加载Badge摘要
     */
    const loadSummary = useCallback(async () => {
        try {
            // 先尝试从缓存获取
            const cached = badgeCache.get('summary');
            if (cached) {
                console.log('使用缓存的Badge数据');
                setState(prev => ({
                    ...prev,
                    totalCount: cached.totalCount || 0,
                    badges: cached.badges || {},
                    details: cached.details || [],
                }));
                return cached;
            }

            // 缓存未命中，从API获取
            const data = await BadgeGetSummaryAsync();

            setState(prev => ({
                ...prev,
                totalCount: data.totalCount || 0,
                badges: data.badges || {},
                details: data.details || [],
            }));

            // 更新缓存
            badgeCache.set('summary', data);

            return data;

        } catch (err) {
            console.error('加载Badge摘要失败:', err);
            message.error('加载通知失败');
            throw err;
        }
    }, []);

    /**
     * 初始化SignalR连接
     */
    const initializeConnection = useCallback(async (apiBaseUrl: string, getToken: () => string | undefined) => {
        try {
            console.log('开始初始化Badge连接...');

            // 订阅Badge更新事件（在连接建立前订阅，不会错过任何事件）
            const unsubscribeBadgeUpdate = badgeHub.onBadgeUpdated(updateBadgeData);

            // 订阅连接状态变化（在连接建立前订阅，确保捕获所有状态变化）
            const unsubscribeStatus = badgeHub.onStatusChange(updateConnectionStatus);

            // 初始化SignalR连接
            await badgeHub.initialize(apiBaseUrl, getToken);

            // 加载初始数据
            await loadSummary();

            console.log('Badge连接初始化完成');

            // 返回清理函数
            return () => {
                unsubscribeBadgeUpdate();
                unsubscribeStatus();
                badgeHub.disconnect();
                pollingManager.stop();
            };

        } catch (err) {
            console.error('初始化Badge连接失败:', err);
            setState(prev => ({
                ...prev,
                error: err instanceof Error ? err.message : 'Initialization failed'
            }));

            // 启动轮询降级
            pollingManager.start();
        }
    }, [updateBadgeData, updateConnectionStatus, pollingManager, loadSummary]);

    /**
     * 清除指定服务的Badge
     */
    const clearServiceBadge = useCallback(async (serviceId: string) => {
        try {
            await BadgeClearServiceBadgeAsync({ serviceId });
            message.success('已标记为已读');

            // 清除缓存并重新加载
            badgeCache.clear();
            await loadSummary();

        } catch (err) {
            console.error('清除Badge失败:', err);
            message.error('操作失败，请重试');
            throw err;
        }
    }, [loadSummary]);

    /**
     * 清除所有Badge
     */
    const clearAllBadges = useCallback(async () => {
        try {
            await BadgeClearAllBadgesAsync();
            message.success('已全部标记为已读');

            // 清除缓存并重新加载
            badgeCache.clear();
            await loadSummary();

        } catch (err) {
            console.error('清除所有Badge失败:', err);
            message.error('操作失败，请重试');
            throw err;
        }
    }, [loadSummary]);

    /**
     * 断开连接
     */
    const disconnect = useCallback(async () => {
        await badgeHub.disconnect();
        pollingManager.stop();
        badgeCache.clear();

        setState({
            totalCount: 0,
            badges: {},
            details: [],
            isConnected: false,
            isConnecting: false,
            error: null,
        });
    }, [pollingManager]);

    return {
        // 状态
        ...state,

        // 方法
        initializeConnection,
        loadSummary,
        clearServiceBadge,
        clearAllBadges,
        disconnect,
    };
}
