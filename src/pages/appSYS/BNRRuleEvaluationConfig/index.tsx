import React, { useRef, useMemo } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, message, Space, Tag } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import {
    BnrRuleEvaluationConfigDeleteAsync,
    BnrRuleEvaluationConfigGetListAsync
} from '@/services/openApi/BnrRuleEvaluationConfig';
import BnrRuleEvaluationConfigFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';

/**
 * 序列号规则评估配置
 * @returns
 */
const BnrRuleEvaluationConfigPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
        const { data, onRefresh } = props;
        const intl = useIntl();

        const refresh = () => {
            onRefresh();
        };

        const handleDelete = (data: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            return BnrRuleEvaluationConfigDeleteAsync({ id: data.id })
                .then(() => {
                    refresh();
                })
                .finally(() => {
                    hide();
                });
        };

        return (
            <Space>
                <Access accessible={!!true}>
                    <BnrRuleEvaluationConfigFormDialog
                        title={'查看'}
                        entityId={`${data.id}view`}
                        data={data}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        isView={true}
                        buttonProps={{
                            icon: <EyeOutlined />,
                            type: 'link',
                            size: 'small'
                        }}
                    />
                </Access>
                <Access accessible={!!true}>
                    <BnrRuleEvaluationConfigFormDialog
                        title={'编辑'}
                        entityId={data.id}
                        operationType={'edit'}
                        data={data}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{
                            icon: <EditOutlined />,
                            type: 'link',
                            size: 'small'
                        }}
                    />
                </Access>
                <Access accessible={!!true}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data)}>
                        <Button
                            size={'small'}
                            icon={<DeleteOutlined />}
                            type={'link'}
                            title={intl.formatMessage({ id: 'AbpUi:Delete' })}
                        />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = useMemo(
        () => [
            {
                headerName: '规则名称',
                field: 'ruleName',
                width: 180,
            },
            {
                headerName: '目标规则名称',
                field: 'targetRuleName',
                width: 180,
            },
            {
                headerName: '优先级',
                field: 'priority',
                width: 100,
                hideInSearch: true,
            },
            {
                headerName: '启用规则评估',
                field: 'enableRuleEvaluation',
                width: 120,
                type: 'bool',
                hideInSearch: true,
                cellRenderer: (params: ICellRendererParams) => {
                    if (params.value === true) {
                        return <Tag color="success">启用</Tag>;
                    } else if (params.value === false) {
                        return <Tag color="default">禁用</Tag>;
                    }
                    return '-';
                },
            },
            {
                headerName: '创建时间',
                field: 'creationTime',
                width: 180,
                type: 'datetime',
                hideInSearch: true,
                initialSort: 'desc',
                valueFormatter: (params: any) => {
                    if (!params.value) return '-';
                    const date = new Date(params.value);
                    return date.toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    });
                }
            },
            {
                headerName: '最后修改时间',
                field: 'lastModificationTime',
                width: 180,
                type: 'datetime',
                hideInSearch: true,
                valueFormatter: (params: any) => {
                    if (!params.value) return '-';
                    const date = new Date(params.value);
                    return date.toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    });
                }
            },
            {
                headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
                field: 'action',
                width: 140,
                pinned: 'right',
                hideInSearch: true,
                cellRenderer: (props: any) => <Options {...props} />,
                cellRendererParams: { onRefresh },
            },
        ],
        [intl, onRefresh]
    );

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle='序列号规则评估配置'
            gridKey='sys-bnr-rule-evaluation-config'
            request={async (params: any) => {
                const data = await BnrRuleEvaluationConfigGetListAsync({
                    PageSize: params!.maxResultCount,
                    Filter: params?.filter,
                    MaxResultCount: params!.maxResultCount,
                    SkipCount: params!.skipCount,
                    Sorting: params!.sorter!,
                });
                return {
                    success: true,
                    data: data.items || [],
                    total: data.totalCount || 0,
                };
            }}
            toolBarRender={(gridApi, filter) => {
                return [
                    <Access accessible={!!true} key="create">
                        <BnrRuleEvaluationConfigFormDialog
                            title="新建"
                            operationType="add"
                            onAfterSubmit={() => {
                                onRefresh();
                            }}
                            buttonProps={{
                                icon: <PlusOutlined />,
                                type: 'primary',
                                title: '新建',
                            }}
                        />
                    </Access>,
                ];
            }}
            columnDefs={columnDefs}
        />
    );
};

export default BnrRuleEvaluationConfigPage;
export const routeProps = {
    name: '序列号规则评估配置',
};
