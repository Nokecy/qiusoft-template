import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Drawer, Button, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Access, useAccess, useIntl } from '@umijs/max';
import {
    BnrPropertyDefinitionGetListAsync,
    BnrPropertyDefinitionDeleteAsync
} from '@/services/openApi/BnrPropertyDefinition';
import PropertyFormDialog from './PropertyFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';

interface PropertyDrawerProps {
    open: boolean;
    onClose: () => void;
    ruleName?: string;
}

const PropertyDrawer: React.FC<PropertyDrawerProps> = ({ open, onClose, ruleName }) => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, onRefresh } = props;
        const intl = useIntl();

        const refresh = () => {
            onRefresh();
        };

        const handleDelete = (data: any) => {
            const hide = message.loading('正在删除...', 0);
            return BnrPropertyDefinitionDeleteAsync({
                id: data.id
            }).then(() => {
                message.success('删除成功');
                refresh();
            }).catch(() => {
                message.error('删除失败');
            }).finally(() => {
                hide();
            });
        };

        return (
            <Space>
                <Access accessible={!!true}>
                    <PropertyFormDialog
                        title='编辑'
                        entityId={`${data.id}edit`}
                        operationType='edit'
                        data={data}
                        ruleName={ruleName}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small', title: '编辑' }}
                    />
                </Access>
                <Access accessible={!!true}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data)}>
                        <Button size='small' icon={<DeleteOutlined />} type='link' title='删除' />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = useMemo(() => [
        {
            headerName: '属性名称',
            field: 'name',
            width: 150
        },
        {
            headerName: '显示名称',
            field: 'displayName',
            width: 150
        },
        {
            headerName: '属性类型',
            field: 'propertyType',
            width: 100,
            valueEnum: [
                { label: '字符串', value: 0 },
                { label: '整数', value: 1 },
                { label: '小数', value: 2 },
                { label: '布尔', value: 3 },
                { label: '日期时间', value: 4 },
                { label: '枚举', value: 5 }
            ]
        },
        {
            headerName: '必填',
            field: 'isRequired',
            width: 80,
            type: 'bool'
        },
        {
            headerName: '默认值',
            field: 'defaultValue',
            width: 120
        },
        {
            headerName: '显示顺序',
            field: 'displayOrder',
            width: 100
        },
        {
            headerName: '操作',
            field: 'action',
            width: 120,
            pinned: 'right',
            hideInSearch: true,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [onRefresh]);

    return (
        <Drawer
            title={`属性配置 - ${ruleName || ''}`}
            placement="right"
            width={900}
            open={open}
            onClose={onClose}
            destroyOnClose
        >
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='动态属性'
                gridKey='sys-bnr-property-list'
                request={async (params: any) => {
                    if (!ruleName) {
                        return {
                            success: true,
                            data: [],
                            total: 0
                        };
                    }

                    const result = await BnrPropertyDefinitionGetListAsync({
                        ruleName: ruleName,
                        maxResultCount: params?.maxResultCount || 1000,
                        skipCount: params?.skipCount || 0
                    });

                    return {
                        success: true,
                        data: result.items || [],
                        total: result.totalCount || 0
                    };
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access key="add" accessible={!!true}>
                            <PropertyFormDialog
                                title='新增属性'
                                entityId='new-property'
                                operationType='add'
                                ruleName={ruleName}
                                onAfterSubmit={() => {
                                    onRefresh();
                                }}
                                buttonProps={{
                                    icon: <PlusOutlined />,
                                    type: 'primary',
                                    title: '新增'
                                }}
                            />
                        </Access>
                    ];
                }}
                columnDefs={columnDefs}
                pagination={false}
            />
        </Drawer>
    );
};

export default PropertyDrawer;
