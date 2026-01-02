import * as signalR from '@microsoft/signalr';

/**
 * Badge SignalR Hub 连接管理
 * 负责建立WebSocket连接、订阅事件、自动重连等
 */

export interface BadgeUpdatedEvent {
    totalCount: number;
    badges: Record<string, number>;
    updateTime: string;
    isOfflineUpdate?: boolean;
}

export interface ServiceBadgeUpdatedEvent {
    serviceId: string;
    count: number;
    updateTime: string;
    userId: string;
}

export interface ConnectionStatus {
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
}

class BadgeHubConnection {
    private connection: signalR.HubConnection | null = null;
    private reconnectionStrategy: ReconnectionStrategy;
    private statusCallbacks: ((status: ConnectionStatus) => void)[] = [];
    private badgeUpdateCallbacks: ((data: BadgeUpdatedEvent) => void)[] = [];

    constructor() {
        this.reconnectionStrategy = new ReconnectionStrategy();
    }

    /**
     * 初始化SignalR连接
     */
    async initialize(apiBaseUrl: string, getToken: () => string | undefined): Promise<void> {
        if (this.connection) {
            console.warn('SignalR连接已存在，跳过初始化');
            // 通知当前连接状态
            this.notifyStatus({
                isConnected: this.connection.state === signalR.HubConnectionState.Connected,
                isConnecting: this.connection.state === signalR.HubConnectionState.Connecting ||
                    this.connection.state === signalR.HubConnectionState.Reconnecting,
                error: null
            });
            return;
        }

        // 创建连接
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${apiBaseUrl}/signalr-hubs/badge`, {
                accessTokenFactory: () => {
                    const token = getToken();
                    if (!token) {
                        console.error('Token不存在，无法建立SignalR连接');
                        return '';
                    }
                    return token;
                },
                transport: signalR.HttpTransportType.WebSockets |
                    signalR.HttpTransportType.ServerSentEvents |
                    signalR.HttpTransportType.LongPolling,
            })
            // 自动重连配置
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    return this.reconnectionStrategy.getNextDelay(retryContext);
                }
            })
            // 日志级别
            .configureLogging(signalR.LogLevel.Information)
            .build();

        // 订阅Badge更新事件
        this.connection.on('BadgeUpdated', (data: BadgeUpdatedEvent) => {
            console.log('Badge更新事件:', data);
            this.badgeUpdateCallbacks.forEach(callback => callback(data));
        });

        // 连接状态管理
        this.connection.onclose((error) => {
            console.error('SignalR连接已关闭:', error);
            this.notifyStatus({
                isConnected: false,
                isConnecting: false,
                error: error?.message || 'Connection closed'
            });
        });

        this.connection.onreconnecting((error) => {
            console.warn('正在重连SignalR...', error);
            this.notifyStatus({
                isConnected: false,
                isConnecting: true,
                error: null
            });
        });

        this.connection.onreconnected((connectionId) => {
            console.log('SignalR重连成功, 连接ID:', connectionId);
            this.reconnectionStrategy.reset();
            this.notifyStatus({
                isConnected: true,
                isConnecting: false,
                error: null
            });
        });

        // 启动连接
        await this.start();
    }

    /**
     * 启动连接
     */
    private async start(): Promise<void> {
        if (!this.connection) {
            throw new Error('连接未初始化');
        }

        try {
            this.notifyStatus({
                isConnected: false,
                isConnecting: true,
                error: null
            });

            await this.connection.start();
            console.log('SignalR连接成功, 连接状态:', this.connection.state);

            // 确保连接状态已更新
            this.notifyStatus({
                isConnected: true,
                isConnecting: false,
                error: null
            });

        } catch (err) {
            console.error('SignalR连接失败:', err);
            this.notifyStatus({
                isConnected: false,
                isConnecting: false,
                error: err instanceof Error ? err.message : 'Connection failed'
            });
            throw err;
        }
    }

    /**
     * 订阅Badge更新事件
     */
    onBadgeUpdated(callback: (data: BadgeUpdatedEvent) => void): () => void {
        this.badgeUpdateCallbacks.push(callback);
        // 返回取消订阅函数
        return () => {
            const index = this.badgeUpdateCallbacks.indexOf(callback);
            if (index > -1) {
                this.badgeUpdateCallbacks.splice(index, 1);
            }
        };
    }

    /**
     * 订阅连接状态变化
     */
    onStatusChange(callback: (status: ConnectionStatus) => void): () => void {
        this.statusCallbacks.push(callback);
        // 返回取消订阅函数
        return () => {
            const index = this.statusCallbacks.indexOf(callback);
            if (index > -1) {
                this.statusCallbacks.splice(index, 1);
            }
        };
    }

    /**
     * 订阅指定服务
     */
    async subscribeToService(serviceId: string): Promise<void> {
        if (!this.connection || this.connection.state !== signalR.HubConnectionState.Connected) {
            throw new Error('SignalR连接未建立');
        }
        await this.connection.invoke('SubscribeToService', serviceId);
        console.log(`已订阅服务: ${serviceId}`);
    }

    /**
     * 取消订阅指定服务
     */
    async unsubscribeFromService(serviceId: string): Promise<void> {
        if (!this.connection || this.connection.state !== signalR.HubConnectionState.Connected) {
            throw new Error('SignalR连接未建立');
        }
        await this.connection.invoke('UnsubscribeFromService', serviceId);
        console.log(`已取消订阅服务: ${serviceId}`);
    }

    /**
     * 断开连接
     */
    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            this.connection = null;
            console.log('SignalR连接已断开');
        }
    }

    /**
     * 通知状态变化
     */
    private notifyStatus(status: ConnectionStatus): void {
        this.statusCallbacks.forEach(callback => callback(status));
    }

    /**
     * 获取当前连接状态
     */
    get state(): signalR.HubConnectionState | null {
        return this.connection?.state || null;
    }
}

/**
 * 重连策略：指数退避
 */
class ReconnectionStrategy {
    private retryDelays = [1000, 2000, 4000, 8000, 16000]; // 1s, 2s, 4s, 8s, 16s
    private maxDelay = 30000; // 最大30秒

    getNextDelay(retryContext: signalR.RetryContext): number {
        const attempt = retryContext.previousRetryCount;
        if (attempt < this.retryDelays.length) {
            return this.retryDelays[attempt];
        }
        return this.maxDelay;
    }

    reset(): void {
        // 重连成功后重置（如果需要）
    }
}

// 导出单例
export const badgeHub = new BadgeHubConnection();
