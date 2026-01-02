import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, Select, Button, Avatar, Card, Typography, message, Empty, Spin, Tag } from 'antd';
import {
    PlusOutlined,
    UserOutlined,
    RobotOutlined,
    DatabaseOutlined,
    LikeOutlined,
    DislikeOutlined,
    CopyOutlined,
    DownloadOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Bubble, Sender, Conversations } from '@ant-design/x';
import type { ConversationsProps, BubbleProps } from '@ant-design/x';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { history, useSearchParams, useModel } from 'umi';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import {
    DataSourceGetActiveListAsync,
} from '@/services/dataCopilot/DataSource';
import {
    ChatSessionGetListAsync,
    ChatSessionCreateAsync,
    ChatSessionGetWithMessagesAsync,
} from '@/services/dataCopilot/ChatSession';
import {
    ChatSendMessageAsync,
} from '@/services/dataCopilot/Chat';
import styles from './index.module.less';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const { Sider, Content } = Layout;
const { Text, Paragraph } = Typography;

/** 根据数据和图表类型生成 ECharts 配置（用于历史数据兼容） */
const buildChartConfig = (data: Record<string, any>[], chartType: number): any => {
    if (!data || data.length === 0 || chartType === 0) return null;

    const keys = Object.keys(data[0]);
    if (keys.length < 2) return null;

    // 假设第一列是分类，第二列是数值
    const categoryKey = keys[0];
    const valueKey = keys[1];
    const categories = data.map(row => String(row[categoryKey] ?? ''));
    const values = data.map(row => row[valueKey]);

    const chartTypeMap: Record<number, string> = { 1: 'bar', 2: 'line', 3: 'pie' };
    const type = chartTypeMap[chartType] || 'bar';

    if (type === 'pie') {
        return {
            tooltip: { trigger: 'item' },
            series: [{
                name: valueKey,
                type: 'pie',
                radius: '50%',
                data: data.map(row => ({
                    name: String(row[categoryKey] ?? ''),
                    value: row[valueKey]
                }))
            }]
        };
    }

    return {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: categories },
        yAxis: { type: 'value' },
        series: [{ name: valueKey, type, data: values }]
    };
};

/** 消息类型 */
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sql?: string;
    sqlExplanation?: string;
    data?: Record<string, any>[];
    chartConfig?: any;
    chartType?: number; // ChartType enum: 0=None, 1=Bar, 2=Line, 3=Pie
    error?: string;
    creationTime?: string;
}

/** 智能问答主页面 - 使用 Ant Design X */
const ChatPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const sessionIdFromUrl = searchParams.get('sessionId');
    const { initialState } = useModel('@@initialState');

    // API 配置
    const apiBaseUrl = (window as any).serverUrl?.apiServerUrl || '';
    const getToken = useCallback(() => {
        return sessionStorage.getItem('access_token') ||
            initialState?.currentUser?.access_token ||
            localStorage.getItem('access_token') ||
            '';
    }, [initialState]);

    // 数据源状态
    const [dataSources, setDataSources] = useState<any[]>([]);
    const [selectedDataSource, setSelectedDataSource] = useState<string>();

    // 会话状态
    const [sessions, setSessions] = useState<any[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionIdFromUrl);
    const [sessionsLoading, setSessionsLoading] = useState(false);

    // 消息状态
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // 输入状态
    const [inputValue, setInputValue] = useState('');

    // 加载数据源列表
    useEffect(() => {
        const loadDataSources = async () => {
            try {
                const result = await DataSourceGetActiveListAsync();
                setDataSources(result.items || []);
                if (result.items?.length > 0 && !selectedDataSource) {
                    setSelectedDataSource(result.items[0].id);
                }
            } catch (error) {
                console.error('Failed to load data sources:', error);
            }
        };
        loadDataSources();
    }, []);

    // 加载会话列表
    const loadSessions = useCallback(async () => {
        setSessionsLoading(true);
        try {
            const result = await ChatSessionGetListAsync({
                MaxResultCount: 50,
                SkipCount: 0,
                Sorting: 'LastMessageTime desc',
            });
            setSessions(result.items || []);
        } catch (error) {
            console.error('Failed to load sessions:', error);
        } finally {
            setSessionsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSessions();
    }, [loadSessions]);

    // 加载会话消息
    useEffect(() => {
        const loadSessionMessages = async () => {
            if (!currentSessionId) {
                setMessages([]);
                return;
            }
            try {
                const session = await ChatSessionGetWithMessagesAsync({ id: currentSessionId });
                if (session.messages) {
                    const msgs: Message[] = session.messages.map((m: any) => ({
                        id: m.id,
                        role: m.role === 1 ? 'user' : 'assistant', // MessageRole.User = 1
                        content: m.content,
                        sql: m.execution?.generatedSql,
                        sqlExplanation: m.execution?.explanation,
                        data: m.execution?.resultPreviewJson ? JSON.parse(m.execution.resultPreviewJson) : undefined,
                        chartConfig: m.execution?.chartConfigJson ? JSON.parse(m.execution.chartConfigJson) : undefined,
                        chartType: m.execution?.chartType,
                        error: m.execution?.errorMessage,
                        creationTime: m.creationTime,
                    }));
                    setMessages(msgs);
                }
                if (session.dataSourceId) {
                    setSelectedDataSource(session.dataSourceId);
                }
            } catch (error) {
                console.error('Failed to load session messages:', error);
            }
        };
        loadSessionMessages();
    }, [currentSessionId]);

    // 创建新对话
    const handleNewChat = useCallback(async () => {
        if (!selectedDataSource) {
            message.warning('请先选择数据源');
            return;
        }
        try {
            const session = await ChatSessionCreateAsync({
                dataSourceId: selectedDataSource,
                title: '新对话',
            });
            setSessions((prev) => [session, ...prev]);
            setCurrentSessionId(session.id);
            setMessages([]);
        } catch (error) {
            message.error('创建对话失败');
        }
    }, [selectedDataSource]);

    // 发送消息
    const handleSend = useCallback(async (content: string) => {
        if (!content.trim()) return;

        let sessionId = currentSessionId;
        if (!sessionId) {
            // 自动创建新会话
            if (!selectedDataSource) {
                message.warning('请先选择数据源');
                return;
            }
            const session = await ChatSessionCreateAsync({
                dataSourceId: selectedDataSource,
                title: '新对话',
            });
            setSessions((prev) => [session, ...prev]);
            setCurrentSessionId(session.id);
            sessionId = session.id;
        }

        // 添加用户消息
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content,
            creationTime: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // 创建助手消息占位符
        const assistantMsgId = `assistant-${Date.now()}`;
        const assistantMessage: Message = {
            id: assistantMsgId,
            role: 'assistant',
            content: '',
            creationTime: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        try {
            // 使用 @microsoft/fetch-event-source 流式 API
            let explanation = '';
            let generatedSql = '';
            let chartConfigJson = '';
            let dataRows: any[] = [];
            let chartTypeValue = 0;

            await fetchEventSource(`${apiBaseUrl}/api/data-copilot/chat/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    message: content,
                }),
                onmessage(event) {
                    if (event.data === '[DONE]') return;

                    try {
                        const chunk = JSON.parse(event.data);

                        if (chunk.type === 'generating') {
                            // 打字机效果：累加生成的文本
                            explanation += chunk.content || '';
                            setMessages((prev) => prev.map((m) =>
                                m.id === assistantMsgId
                                    ? { ...m, content: explanation }
                                    : m
                            ));
                        } else if (chunk.type === 'explanation') {
                            explanation = chunk.content || '';
                            setMessages((prev) => prev.map((m) =>
                                m.id === assistantMsgId
                                    ? { ...m, content: explanation, sqlExplanation: explanation }
                                    : m
                            ));
                        } else if (chunk.type === 'sql') {
                            generatedSql = chunk.content || '';
                            setMessages((prev) => prev.map((m) =>
                                m.id === assistantMsgId ? { ...m, sql: generatedSql } : m
                            ));
                        } else if (chunk.type === 'data' && chunk.data) {
                            dataRows = chunk.data.rows || [];
                            setMessages((prev) => prev.map((m) =>
                                m.id === assistantMsgId ? { ...m, data: dataRows } : m
                            ));
                        } else if (chunk.type === 'chart' && chunk.data) {
                            chartTypeValue = chunk.data.chartType || 0;
                            chartConfigJson = chunk.data.chartConfigJson || '';
                            if (chartConfigJson) {
                                const chartConfig = JSON.parse(chartConfigJson);
                                setMessages((prev) => prev.map((m) =>
                                    m.id === assistantMsgId ? { ...m, chartConfig, chartType: chartTypeValue } : m
                                ));
                            }
                        } else if (chunk.type === 'error') {
                            setMessages((prev) => prev.map((m) =>
                                m.id === assistantMsgId
                                    ? { ...m, content: chunk.content || '处理出错', error: chunk.content }
                                    : m
                            ));
                        }
                    } catch (e) {
                        console.error('Parse chunk error:', e);
                    }
                },
                onerror(err) {
                    console.error('SSE error:', err);
                    throw err;
                },
            });

            // 刷新会话列表以获取更新后的标题
            loadSessions();
        } catch (error: any) {
            message.error(error?.message || '发送失败');
            setMessages((prev) => prev.map((m) =>
                m.id === assistantMsgId
                    ? { ...m, content: '抱歉，处理您的请求时出现错误。', error: error?.message }
                    : m
            ));
        } finally {
            setIsLoading(false);
        }
    }, [currentSessionId, selectedDataSource, loadSessions, apiBaseUrl, getToken]);

    // 转换会话列表为 Conversations 组件格式
    const conversationItems: ConversationsProps['items'] = useMemo(() => {
        return sessions.map((session) => ({
            key: session.id,
            label: session.title || '新对话',
            timestamp: session.lastMessageTime ? dayjs(session.lastMessageTime).valueOf() : undefined,
        }));
    }, [sessions]);

    // 转换消息为 Bubble.List 格式
    const bubbleItems = useMemo(() => {
        return messages.map((msg) => {
            const isUser = msg.role === 'user';
            return {
                key: msg.id,
                placement: isUser ? 'end' as const : 'start' as const,
                avatar: (
                    <Avatar
                        icon={isUser ? <UserOutlined /> : <RobotOutlined />}
                        style={{ backgroundColor: isUser ? '#1677ff' : '#00b96b', color: '#fff' }}
                    />
                ),
                content: (
                    <div className={styles.messageContent}>
                        {/* 文本内容 */}
                        <Paragraph style={{ marginBottom: msg.sql ? 12 : 0 }}>{msg.content}</Paragraph>

                        {/* SQL 展示 */}
                        {msg.sql && (
                            <Card
                                size="small"
                                title="生成的 SQL"
                                className={styles.sqlCard}
                                extra={
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<CopyOutlined />}
                                        onClick={() => {
                                            navigator.clipboard.writeText(msg.sql!);
                                            message.success('已复制');
                                        }}
                                    />
                                }
                            >
                                <pre className={styles.sqlCode}>{msg.sql}</pre>
                                {msg.sqlExplanation && (
                                    <div className={styles.sqlExplanation}>
                                        <Text type="secondary">{msg.sqlExplanation}</Text>
                                    </div>
                                )}
                            </Card>
                        )}

                        {/* 数据表格 */}
                        {msg.data && msg.data.length > 0 && (
                            <Card
                                size="small"
                                title={`查询结果 (${msg.data.length} 条)`}
                                className={styles.dataCard}
                                extra={
                                    <Button type="text" size="small" icon={<DownloadOutlined />}>
                                        导出
                                    </Button>
                                }
                            >
                                <div className={styles.dataTable}>
                                    <table>
                                        <thead>
                                            <tr>
                                                {Object.keys(msg.data[0]).map((key) => (
                                                    <th key={key}>{key}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {msg.data.slice(0, 10).map((row, idx) => (
                                                <tr key={idx}>
                                                    {Object.values(row).map((val, i) => (
                                                        <td key={i}>{String(val)}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        )}

                        {/* 图表展示 */}
                        {(() => {
                            const chartOption = msg.chartConfig || (msg.data && msg.chartType ? buildChartConfig(msg.data, msg.chartType) : null);
                            return chartOption && (
                                <Card size="small" title="数据可视化" className={styles.chartCard}>
                                    <ReactECharts option={chartOption} style={{ height: 300 }} />
                                </Card>
                            );
                        })()}

                        {/* 错误信息 */}
                        {msg.error && (
                            <div className={styles.errorMessage}>
                                <Text type="danger">{msg.error}</Text>
                            </div>
                        )}

                        {/* 反馈按钮 (仅 AI 消息显示) */}
                        {!isUser && !msg.error && (
                            <div className={styles.feedbackButtons}>
                                <Button type="text" size="small" icon={<LikeOutlined />}>
                                    有帮助
                                </Button>
                                <Button type="text" size="small" icon={<DislikeOutlined />}>
                                    需改进
                                </Button>
                            </div>
                        )}
                    </div>
                ),
            };
        });
    }, [messages]);

    // 示例问题
    const exampleQuestions = [
        '查询本月销售额前10的产品',
        '分析各区域的订单分布',
        '统计最近7天的用户活跃度',
    ];

    return (
        <Layout className={styles.chatLayout}>
            {/* 左侧边栏 */}
            <Sider width={280} className={styles.sider}>
                <div className={styles.siderHeader}>
                    {/* 新建对话按钮 */}
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleNewChat}
                        className={styles.newChatBtn}
                        block
                    >
                        新对话
                    </Button>
                </div>

                <div style={{ padding: '0 12px 12px 12px' }}>
                    {/* 数据源选择 */}
                    <div className={styles.dataSourceSelect}>
                        <div style={{ marginBottom: 8, color: '#999', fontSize: 12 }}>当前数据源</div>
                        <Select
                            value={selectedDataSource}
                            onChange={setSelectedDataSource}
                            placeholder="选择数据源"
                            style={{ width: '100%' }}
                            suffixIcon={<DatabaseOutlined />}
                            options={dataSources.map((ds) => ({
                                value: ds.id,
                                label: ds.name,
                            }))}
                        />
                    </div>
                </div>

                {/* 会话列表 - 使用 Ant Design X Conversations 组件 */}
                <div className={styles.conversationsWrapper}>
                    {sessionsLoading ? (
                        <div style={{ textAlign: 'center', padding: 20 }}>
                            <Spin />
                        </div>
                    ) : (
                        <Conversations
                            items={conversationItems}
                            activeKey={currentSessionId || undefined}
                            onActiveChange={(key) => {
                                setCurrentSessionId(key as string);
                                history.push(`/appDataCopilot/Chat?sessionId=${key}`);
                            }}
                            menu={{
                                items: [
                                    {
                                        label: '删除会话',
                                        key: 'delete',
                                        danger: true,
                                        icon: <DeleteOutlined />,
                                    },
                                ],
                                onClick: (info) => {
                                    if (info.key === 'delete') {
                                        // TODO: 实现删除
                                        message.info('删除功能开发中');
                                    }
                                },
                            }}
                        />
                    )}
                </div>
            </Sider>

            {/* 右侧对话区 */}
            <Content className={styles.chatContent}>
                {/* 消息列表 */}
                <div className={styles.messageList}>
                    {messages.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={<span style={{ color: '#999' }}>开始对话，探索您的数据</span>}
                            />
                            <div className={styles.suggestions}>
                                <Text type="secondary">您可以试着问我：</Text>
                                <div className={styles.suggestionList}>
                                    {exampleQuestions.map((q, i) => (
                                        <div
                                            key={i}
                                            className={styles.suggestionTag}
                                            onClick={() => {
                                                setInputValue(q);
                                            }}
                                        >
                                            {q}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Bubble.List
                            items={bubbleItems}
                            style={{ height: '100%' }}
                        />
                    )}

                    {/* 加载中指示器 */}
                    {isLoading && (
                        <div className={styles.thinkingIndicator}>
                            <Spin size="small" />
                            <span className={styles.thinkingText}>AI 正在思考中...</span>
                        </div>
                    )}
                </div>

                {/* 输入区域 - 使用 Ant Design X Sender 组件 */}
                <div className={styles.inputArea}>
                    <Sender
                        value={inputValue}
                        onChange={setInputValue}
                        onSubmit={handleSend}
                        loading={isLoading}
                        placeholder="请输入您的问题，例如：查询本月销售额前10的产品..."
                        style={{ flex: 1 }}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default ChatPage;

export const routeProps = {
    name: '智能问答',
};
