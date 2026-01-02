import React, { useRef, useMemo } from 'react';
import { Tag } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { FeedbackGetListAsync } from '@/services/dataCopilot/Feedback';

/** 反馈类型枚举 */
const feedbackTypeEnum = [
    { label: '有帮助', value: 'Like', color: '#52c41a', icon: <LikeOutlined /> },
    { label: '无帮助', value: 'Dislike', color: '#ff4d4f', icon: <DislikeOutlined /> },
];

/** 用户反馈页面 */
const FeedbackPage: React.FC = () => {
    const gridRef = useRef<GridRef>();

    /** 列定义 */
    const columnDefs: any = useMemo(
        () => [
            {
                field: 'feedbackType',
                headerName: '反馈类型',
                width: 120,
                valueEnum: feedbackTypeEnum,
                cellRenderer: (params: any) => {
                    const item = feedbackTypeEnum.find((e) => e.value === params.value);
                    return item ? (
                        <Tag icon={item.icon} color={item.color}>
                            {item.label}
                        </Tag>
                    ) : (
                        params.value
                    );
                },
            },
            {
                field: 'comment',
                headerName: '用户评论',
                width: 300,
                hideInSearch: true,
            },
            {
                field: 'correctedSql',
                headerName: '修正 SQL',
                width: 300,
                hideInSearch: true,
                cellRenderer: (params: any) =>
                    params.value ? (
                        <code style={{ fontSize: 12, color: '#666' }}>
                            {params.value?.substring(0, 50)}...
                        </code>
                    ) : (
                        '-'
                    ),
            },
            {
                field: 'creationTime',
                headerName: '反馈时间',
                width: 180,
                hideInSearch: true,
                initialSort: 'desc' as const,
            },
        ],
        [],
    );

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle="用户反馈"
            gridKey="dataCopilot-feedback"
            request={async (params: any) => {
                const data = await FeedbackGetListAsync({
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
        />
    );
};

export default FeedbackPage;

export const routeProps = {
    name: '用户反馈',
};
