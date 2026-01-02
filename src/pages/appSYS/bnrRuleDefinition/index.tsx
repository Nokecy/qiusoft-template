import React, { useRef, useMemo, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, message, Space } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { DatabaseOutlined, DeleteOutlined, EditOutlined, EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { BnrRuleDefinitionDeleteAsync, BnrRuleDefinitionGetStaticRulesAsync } from '@/services/openApi/BnrRuleDefinition';
import NewBnrRuleDefinitionFormDialog from './components/formDialog';
import PropertyDrawer from './components/PropertyDrawer';
import DataSourceConfigDialog from './components/DataSourceConfigDialog';
import DeleteConfirm from '@/components/deleteConfirm';

/**
 * 序列号定义
 * @returns
 */
const NewBnrRuleDefinitionPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const [propertyDrawerOpen, setPropertyDrawerOpen] = useState(false);
    const [selectedRuleName, setSelectedRuleName] = useState<string>();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const handlePropertyConfig = (ruleName: string) => {
        setSelectedRuleName(ruleName);
        setPropertyDrawerOpen(true);
    };


    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
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
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                <Access accessible={!!true}>
                    <NewBnrRuleDefinitionFormDialog
                        title={'查看'}
                        entityId={`${data.name}${data.displayName}${data.ruleName}view`}
                        data={data}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        isView={true}
                        buttonProps={{ icon: <EyeOutlined />, type: 'link', size: 'small' }}
                    />
                </Access>
                <Access accessible={!!(!data.name?.includes('__Sys'))}>
                    <NewBnrRuleDefinitionFormDialog
                        title={'编辑'}
                        entityId={`${data.name}${data.displayName}${data.ruleName}`}
                        operationType={'edit'}
                        data={{ ...data, oldName: data.name }}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small' }}
                    />
                </Access>
                <Access accessible={!!true}>
                    <Button
                        size='small'
                        icon={<SettingOutlined />}
                        type='link'
                        onClick={() => handlePropertyConfig(data.ruleName)}
                    />
                </Access>
                <Access accessible={!!true}>
                    <DataSourceConfigDialog
                        ruleName={data.ruleName}
                        ruleDisplayName={data.ruleDisplayName}
                        onAfterSubmit={() => refresh()}
                        buttonProps={{
                            size: 'small',
                            icon: <DatabaseOutlined />,
                            type: 'link'
                        }}
                    />
                </Access>
                <Access accessible={!!(!data.name?.includes('__Sys'))}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data)}>
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = useMemo(() => [
        {
            headerName: '规则名称',
            field: 'ruleName',
            width: 200
        },
        {
            headerName: '规则显示名称',
            field: 'ruleDisplayName',
            width: 180
        },
        {
            headerName: '规则描述',
            field: 'ruleDescription',
            width: 220,
            flex: 1
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
            headerName: '默认',
            field: 'isDefault',
            width: 80,
            type: 'bool',
            hideInSearch: true
        },
        {
            headerName: intl.formatMessage({ id: "AbpUi:Actions" }),
            field: "action",
            width: 160,
            pinned: "right",
            hideInSearch: true,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [intl, onRefresh]);




    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='序列号定义'
                gridKey='sys-bnr-sequence-definition'
                request={async (params: any) => {
                    const data = await BnrRuleDefinitionGetStaticRulesAsync();
                    return {
                        success: true,
                        data: data,
                        total: data.length,
                    };
                }}
                toolBarRender={(gridApi, filter) => {
                    return [];
                }}
                columnDefs={columnDefs}
            />
            <PropertyDrawer
                open={propertyDrawerOpen}
                onClose={() => setPropertyDrawerOpen(false)}
                ruleName={selectedRuleName}
            />
        </>
    );
};

export default NewBnrRuleDefinitionPage;
export const routeProps = {
    name: '序列号定义',
};

