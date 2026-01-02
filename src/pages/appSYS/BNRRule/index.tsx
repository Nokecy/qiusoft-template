import React, { useRef, useMemo } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, message, Space } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BnrRuleDefinitionDeleteAsync, BnrRuleDefinitionGetDynamicRulesAsync } from '@/services/openApi/BnrRuleDefinition';
import NewBnrRuleFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';

/**
 * 动态规则
 * @returns
 */
const BNRRulePage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        };

        const handleDelete = (data: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            return BnrRuleDefinitionDeleteAsync({
                name: data.name,
                ruleName: data.ruleName
            }).then(() => {
                message.success('删除成功');
                refresh();
            }).catch((error) => {
                message.error('删除失败');
            }).finally(() => {
                hide();
            });
        };

        return (
            <Space>
                <Access accessible={!!true}>
                    <NewBnrRuleFormDialog
                        title='查看'
                        entityId={`${data.name}${data.ruleName}view`}
                        data={data}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        isView={true}
                        buttonProps={{ icon: <EyeOutlined />, type: 'link', size: 'small' }}
                    />
                </Access>
                <Access accessible={!!true}>
                    <NewBnrRuleFormDialog
                        title='编辑'
                        entityId={`${data.name}${data.ruleName}edit`}
                        operationType='edit'
                        data={{ ...data, oldName: data.name }}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small' }}
                    />
                </Access>
                <Access accessible={!!true}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data)}>
                        <Button size='small' icon={<DeleteOutlined />} type='link' title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = useMemo(() => [
        {
            headerName: '名称',
            field: 'name',
            width: 200
        },
        {
            headerName: '显示名称',
            field: 'displayName',
            width: 180
        },
        {
            headerName: '规则定义',
            field: 'ruleName',
            width: 200
        },
        {
            headerName: '规则定义显示名称',
            field: 'ruleDisplayName',
            width: 180
        },
        {
            headerName: '规则描述',
            field: 'ruleDescription',
            width: 220
        },
        {
            headerName: '服务名称',
            field: 'serviceName',
            width: 180
        },
        {
            headerName: '关键字',
            field: 'keyword',
            width: 150,
            hideInTable: true
        },
        {
            headerName: '起始编号',
            field: 'numberStart',
            width: 100,
            hideInSearch: true
        },
        {
            headerName: '编号增量',
            field: 'numberIncrement',
            width: 100,
            hideInSearch: true
        },
        {
            headerName: '编号进制',
            field: 'numberBinary',
            width: 100,
            hideInSearch: true
        },
        {
            headerName: '激活',
            field: 'active',
            width: 80,
            type: 'bool'
        },
        {
            headerName: '默认',
            field: 'isDefault',
            width: 80,
            type: 'bool',
            hideInSearch: true
        },
        {
            headerName: '包含系统规则',
            field: 'includeSystemRule',
            width: 120,
            type: 'bool',
            hideInTable: true
        },
        {
            headerName: intl.formatMessage({ id: "AbpUi:Actions" }),
            field: "action",
            width: 180,
            pinned: "right",
            hideInSearch: true,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [intl, onRefresh]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            headerTitle='动态规则'
            gridKey='sys-bnr-dynamic-rule'
            request={async (params: any) => {
                const data = await BnrRuleDefinitionGetDynamicRulesAsync({
                    RuleName: params?.filter?.ruleName,
                    ServiceName: params?.filter?.serviceName,
                    Active: params?.filter?.active,
                    Keyword: params?.filter?.keyword,
                    IncludeSystemRule: params?.filter?.includeSystemRule
                });
                return {
                    success: true,
                    data: data,
                    total: data.length,
                };
            }}
            toolBarRender={(gridApi, filter) => {
                return [
                    <Access key="add" accessible={!!true}>
                        <NewBnrRuleFormDialog
                            title='新增'
                            entityId='new-bnr-rule'
                            operationType='add'
                            onAfterSubmit={() => {
                                onRefresh();
                            }}
                            buttonProps={{
                                icon: <PlusOutlined />,
                                type: 'primary',
                                title: intl.formatMessage({ id: 'AbpUi:Create' })
                            }}
                        />
                    </Access>
                ];
            }}
            columnDefs={columnDefs}
        />
    );
};

export default BNRRulePage;
export const routeProps = {
    name: '动态规则',
};
