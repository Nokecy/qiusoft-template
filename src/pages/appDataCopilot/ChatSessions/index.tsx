import React, { useRef, useCallback, useMemo } from 'react';
import { Button, message, Tag, Typography } from 'antd';
import { DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { ChatSessionGetListAsync, ChatSessionDeleteAsync } from '@/services/dataCopilot/ChatSession';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const { Text } = Typography;

/** 对话历史页面 */
const ChatSessionsPage: React.FC = () => {
    const gridRef = useRef<GridRef>();

    /** 刷新列表 */
    const onRefresh = useCallback(() => {
        gridRef.current?.onRefresh();
    }, []);

    /** 删除会话 */
    const handleDelete = useCallback(
        async (ids: string[]) => {
            for (const id of ids) {
                await ChatSessionDeleteAsync({ id });
            }
            message.success('删除成功');
            onRefresh();
        },
        [onRefresh],
    );

    /** 继续对话 */
    const handleContinueChat = useCallback((record: any) => {
        history.push(`/appDataCopilot/Chat?sessionId=${record.id}`);
    }, []);

    /** 列定义 */
    const columnDefs: any = useMemo(
        () => [
            {
                field: 'title',
                headerName: '对话标题',
                width: 250,
            },
            {
                field: 'dataSourceName',
                headerName: '数据源',
                width: 180,
                hideInSearch: true,
                cellRenderer: (params: any) => <Tag color="blue">{params.value}</Tag>,
            },
            {
                field: 'messageCount',
                headerName: '消息数',
                width: 100,
                hideInSearch: true,
            },
            {
                field: 'lastMessageTime',
                headerName: '最后消息时间',
                width: 180,
                hideInSearch: true,
                cellRenderer: (params: any) => (
                    <Text type="secondary">{dayjs(params.value).fromNow()}</Text>
                ),
            },
            {
                field: 'creationTime',
                headerName: '创建时间',
                width: 180,
                hideInSearch: true,
                initialSort: 'desc' as const,
            },
            {
                field: 'actions',
                headerName: '操作',
                width: 120,
                pinned: 'right',
                sortable: false,
                filter: false,
                cellRenderer: (params: any) => (
                    <Button
                        type="link"
                        size="small"
                        icon={<MessageOutlined />}
                        onClick={() => handleContinueChat(params.data)}
                    >
                        继续对话
                    </Button>
                ),
            },
        ],
        [handleContinueChat],
    );

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle="对话历史"
            gridKey="dataCopilot-chatSessions"
            request={async (params: any) => {
                const data = await ChatSessionGetListAsync({
                    MaxResultCount: params.maxResultCount,
                    SkipCount: params.skipCount,
                    Sorting: params.sorter,
                });
                return {
                    success: true,
                    data: data.items || [],
                    total: data.totalCount || 0,
                };
            }}
            columnDefs={columnDefs}
            toolBarRender={() => [
                <DeleteConfirm
                    key="delete"
                    onConfirm={() => {
                        const selectedRows = gridRef.current?.getSelectedRows() || [];
                        if (selectedRows.length === 0) {
                            message.warning('请先选择要删除的数据');
                            return;
                        }
                        handleDelete(selectedRows.map((r: any) => r.id));
                    }}
                >
                    <Button danger icon={<DeleteOutlined />}>
                        删除
                    </Button>
                </DeleteConfirm>,
            ]}
        />
    );
};

export default ChatSessionsPage;

export const routeProps = {
    name: '对话历史',
};
