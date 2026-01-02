import React, { useRef, useCallback, useMemo } from 'react';
import { Button, message, Tag, Space, Tooltip, Spin } from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ApiOutlined,
    DatabaseOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import DeleteConfirm from '@/components/deleteConfirm';
import {
    DataSourceGetListAsync,
    DataSourceGetAsync,
    DataSourceCreateAsync,
    DataSourceUpdateAsync,
    DataSourceDeleteAsync,
    DataSourceSyncSchemaAsync,
    DataSourceTestConnectionAsync,
} from '@/services/dataCopilot/DataSource';
import TableSelectionDialog from './components/TableSelectionDialog';
import { DataCopilotPermissions } from '../_permissions';

/** 数据库类型枚举 */
const databaseTypeEnum = [
    { label: 'SQL Server', value: 1, color: '#1890ff' },
    { label: 'PostgreSQL', value: 2, color: '#722ed1' },
    { label: 'MySQL', value: 3, color: '#52c41a' },
];

/** 数据源表单对话框组件 */
const DataSourceFormDialog: React.FC<{
    entityId?: string;
    title: string;
    onAfterSubmit?: () => void;
    children?: React.ReactNode;
    buttonProps?: any;
}> = ({ entityId, title, onAfterSubmit, children, buttonProps }) => {
    const { schema, formConfig, loading } = useDynamicSchema('dataCopilot:dataSource');
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    DataSourceGetAsync({ id: entityId }).then((res) => {
                        form.setInitialValues(res);
                    });
                } else {
                    form.setInitialValues({
                        isActive: true,
                        dbType: 1,
                    });
                }
            });
        },
    };

    const portalId = `dataCopilot.dataSource.${entityId || 'new'}`;

    return (
        <FormDialog.Portal id={portalId}>
            <Button
                type="primary"
                onClick={() => {
                    const formDialog = FormDialog({ title, width: 600 }, portalId, () => {
                        if (loading) {
                            return <Spin tip="加载表单配置中..." />;
                        }
                        return (
                            <FormLayout {...formConfig} labelCol={6} wrapperCol={18}>
                                <SchemaField schema={schema} />
                            </FormLayout>
                        );
                    });

                    formDialog
                        .forConfirm((payload, next) => {
                            const values: any = payload.values;
                            if (!values.id) {
                                return DataSourceCreateAsync(values)
                                    .then(() => {
                                        message.success('创建成功');
                                        onAfterSubmit?.();
                                    })
                                    .then(() => next(payload));
                            } else {
                                return DataSourceUpdateAsync({ id: values.id }, values)
                                    .then(() => {
                                        message.success('更新成功');
                                        onAfterSubmit?.();
                                    })
                                    .then(() => next(payload));
                            }
                        })
                        .open(formProps);
                }}
                {...buttonProps}
            >
                {children}
            </Button>
        </FormDialog.Portal>
    );
};

/** 数据源管理页面 */
const DataSourcesPage: React.FC = () => {
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const [selectionDialogOpen, setSelectionDialogOpen] = React.useState(false);
    const [currentDataSourceId, setCurrentDataSourceId] = React.useState<string>('');

    /** 刷新列表 */
    const onRefresh = useCallback(() => {
        gridRef.current?.onRefresh();
    }, []);

    /** 删除数据源 */
    const handleDelete = useCallback(
        async (ids: string[]) => {
            for (const id of ids) {
                await DataSourceDeleteAsync({ id });
            }
            message.success('删除成功');
            onRefresh();
        },
        [onRefresh],
    );

    /** 同步 Schema */
    const handleSyncSchema = useCallback(
        async (record: any) => {
            try {
                await DataSourceSyncSchemaAsync({ id: record.id });
                message.success('Schema 同步成功');
                onRefresh();
            } catch (error) {
                message.error('Schema 同步失败');
            }
        },
        [onRefresh],
    );

    /** 测试连接 */
    const handleTestConnection = useCallback(async (record: any) => {
        try {
            const result = await DataSourceTestConnectionAsync({
                connectionString: record.connectionString,
            });
            if (result.success) {
                message.success('连接成功');
            } else {
                message.error(`连接失败: ${result.message}`);
            }
        } catch (error) {
            message.error('测试连接失败');
        }
    }, []);

    /** 选择性同步 */
    const handleSelectiveSync = useCallback((record: any) => {
        setCurrentDataSourceId(record.id);
        setSelectionDialogOpen(true);
    }, []);

    /** 列定义 */
    const columnDefs: any = useMemo(
        () => [
            { field: 'name', headerName: '数据源名称', width: 200 },

            {
                field: 'dbType',
                headerName: '数据库类型',
                width: 130,
                valueEnum: databaseTypeEnum,
                cellRenderer: (params: any) => {
                    const item = databaseTypeEnum.find((e) => e.value === params.value);
                    return item ? <Tag color={item.color}>{item.label}</Tag> : params.value;
                },
            },
            {
                field: 'isActive',
                headerName: '状态',
                width: 100,
                hideInSearch: true,
                cellRenderer: (params: any) =>
                    params.value ? (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            启用
                        </Tag>
                    ) : (
                        <Tag icon={<CloseCircleOutlined />} color="default">
                            禁用
                        </Tag>
                    ),
            },
            {
                field: 'tableCount',
                headerName: '表数量',
                width: 100,
                hideInSearch: true,
            },
            {
                field: 'lastSchemaSyncTime',
                headerName: '最后同步时间',
                width: 180,
                hideInSearch: true,
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
                width: 180,
                pinned: 'right',
                sortable: false,
                filter: false,
                cellRenderer: (params: any) => (
                    <Space size="small">
                        <Access accessible={!!access[DataCopilotPermissions.DataSources.Edit]}>
                            <DataSourceFormDialog
                                entityId={params.data.id}
                                title="编辑数据源"
                                onAfterSubmit={onRefresh}
                                buttonProps={{ type: 'link', size: 'small', icon: <EditOutlined /> }}
                            />
                        </Access>
                        <Access accessible={!!access[DataCopilotPermissions.DataSources.SyncSchema]}>
                            <Tooltip title="全量同步 Schema">
                                <Button
                                    type="link"
                                    size="small"
                                    icon={<SyncOutlined />}
                                    onClick={() => handleSyncSchema(params.data)}
                                />
                            </Tooltip>
                            <Tooltip title="选择同步 & 配置别名">
                                <Button
                                    type="link"
                                    size="small"
                                    icon={<DatabaseOutlined />}
                                    onClick={() => handleSelectiveSync(params.data)}
                                />
                            </Tooltip>
                        </Access>
                        <Tooltip title="测试连接">
                            <Button
                                type="link"
                                size="small"
                                icon={<ApiOutlined />}
                                onClick={() => handleTestConnection(params.data)}
                            />
                        </Tooltip>
                        <Access accessible={!!access[DataCopilotPermissions.DataSources.Delete]}>
                            <DeleteConfirm onConfirm={() => handleDelete([params.data.id])}>
                                <Button type="link" size="small" danger icon={<DeleteOutlined />} />
                            </DeleteConfirm>
                        </Access>
                    </Space>
                ),
            },
        ],
        [access, onRefresh, handleSyncSchema, handleTestConnection, handleDelete, handleSelectiveSync],
    );

    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle="数据源管理"
                gridKey="dataCopilot-dataSources"
                request={async (params: any) => {
                    const data = await DataSourceGetListAsync({
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
                    <Access key="create" accessible={!!access[DataCopilotPermissions.DataSources.Create]}>
                        <DataSourceFormDialog title="新建数据源" onAfterSubmit={onRefresh}>
                            <PlusOutlined /> 新建数据源
                        </DataSourceFormDialog>
                    </Access>,
                ]}
            />
            <TableSelectionDialog
                open={selectionDialogOpen}
                dataSourceId={currentDataSourceId}
                onClose={() => setSelectionDialogOpen(false)}
                onSuccess={onRefresh}
            />
        </>
    );
};

export default DataSourcesPage;

export const routeProps = {
    name: '数据源管理',
};
