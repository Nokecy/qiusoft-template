/**
 * Badge工具函数
 * 包括防抖、节流、缓存等辅助功能
 */

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间(毫秒)
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 时间限制(毫秒)
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * 简单缓存类
 */
export class BadgeCache<T = any> {
    private cache: Map<string, { value: T; timestamp: number }>;
    private ttl: number; // 缓存过期时间(毫秒)

    constructor(ttl: number = 60000) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    /**
     * 设置缓存
     */
    set(key: string, value: T): void {
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    /**
     * 获取缓存
     */
    get(key: string): T | null {
        const cached = this.cache.get(key);

        if (!cached) {
            return null;
        }

        // 检查是否过期
        if (Date.now() - cached.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    /**
     * 清除指定缓存
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * 清除所有缓存
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * 检查缓存是否存在且未过期
     */
    has(key: string): boolean {
        return this.get(key) !== null;
    }
}

/**
 * 验证JWT Token是否有效
 */
export function validateToken(token: string | undefined): boolean {
    if (!token) {
        console.error('Token不存在');
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // 转换为毫秒

        if (Date.now() >= exp) {
            console.error('Token已过期');
            return false;
        }

        console.log('Token有效，过期时间:', new Date(exp));
        return true;

    } catch (err) {
        console.error('Token格式错误:', err);
        return false;
    }
}

/**
 * 从Token中获取用户ID
 */
export function getUserIdFromToken(token: string | undefined): string | null {
    if (!token) {
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || payload.nameid || null;
    } catch (err) {
        console.error('无法解析UserId:', err);
        return null;
    }
}

/**
 * 格式化Badge数量显示
 * 超过99显示"99+"
 */
export function formatBadgeCount(count: number): string {
    if (count > 99) {
        return '99+';
    }
    return count.toString();
}

/**
 * 轮询管理器
 */
export class PollingManager {
    private intervalId: NodeJS.Timeout | null = null;
    private callback: () => void;
    private interval: number;

    constructor(callback: () => void, interval: number = 30000) {
        this.callback = callback;
        this.interval = interval;
    }

    /**
     * 开始轮询
     */
    start(): void {
        if (this.intervalId) {
            console.warn('轮询已在运行');
            return;
        }

        console.log(`开始轮询，间隔: ${this.interval}ms`);
        this.intervalId = setInterval(this.callback, this.interval);
    }

    /**
     * 停止轮询
     */
    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('轮询已停止');
        }
    }

    /**
     * 检查是否正在轮询
     */
    isRunning(): boolean {
        return this.intervalId !== null;
    }
}

/**
 * 多标签页同步管理器
 */
export class BadgeSyncManager {
    private channel: BroadcastChannel | null = null;
    private storageKey = 'badge-update';

    constructor() {
        // 优先使用BroadcastChannel
        if (typeof BroadcastChannel !== 'undefined') {
            this.channel = new BroadcastChannel('badge-sync');
        }
    }

    /**
     * 发送更新消息到其他标签页
     */
    broadcast(data: any): void {
        if (this.channel) {
            // 使用BroadcastChannel
            this.channel.postMessage({
                type: 'BadgeUpdated',
                data,
                timestamp: Date.now()
            });
        } else {
            // 降级到LocalStorage
            localStorage.setItem(this.storageKey, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            // 立即移除，触发storage事件
            setTimeout(() => {
                localStorage.removeItem(this.storageKey);
            }, 100);
        }
    }

    /**
     * 监听其他标签页的更新
     */
    onMessage(callback: (data: any) => void): () => void {
        if (this.channel) {
            // 使用BroadcastChannel
            const handler = (event: MessageEvent) => {
                if (event.data.type === 'BadgeUpdated') {
                    callback(event.data.data);
                }
            };
            this.channel.addEventListener('message', handler);

            return () => {
                this.channel?.removeEventListener('message', handler);
            };
        } else {
            // 降级到storage事件
            const handler = (event: StorageEvent) => {
                if (event.key === this.storageKey && event.newValue) {
                    const parsed = JSON.parse(event.newValue);
                    callback(parsed.data);
                }
            };
            window.addEventListener('storage', handler);

            return () => {
                window.removeEventListener('storage', handler);
            };
        }
    }

    /**
     * 关闭同步
     */
    close(): void {
        if (this.channel) {
            this.channel.close();
            this.channel = null;
        }
    }
}
