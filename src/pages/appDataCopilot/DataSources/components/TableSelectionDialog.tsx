import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Modal, Table, Button, Input, Space, Drawer, message, Tooltip, Badge } from 'antd';
import { ReloadOutlined, DatabaseOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import {
    DataSourceGetRemoteTablesAsync,
    DataSourceGetRemoteTableColumnsAsync,
    DataSourceSyncSelectedTablesAsync
} from '@/services/dataCopilot/DataSource';

interface TableSelectionDialogProps {
    open: boolean;
    onClose: () => void;
    dataSourceId: string;
    onSuccess: () => void;
}

interface RemoteTable extends API.BurnAbpDataCopilotDataSourcesRemoteTableDto {
    businessAlias?: string;
}

interface RemoteColumn extends API.BurnAbpDataCopilotDataSourcesRemoteColumnDto {
    businessAlias?: string;
}

const TableSelectionDialog: React.FC<TableSelectionDialogProps> = ({
    open,
    onClose,
    dataSourceId,
    onSuccess,
}) => {
    const gridRef = useRef<GridRef>();
    const [submitting, setSubmitting] = useState(false);

    // Alias States (maintained outside grid for persistence during filtering/sorting)
    const [tableAliases, setTableAliases] = useState<Record<string, string>>({});
    const [columnAliases, setColumnAliases] = useState<Record<string, Record<string, string>>>({});

    // Drawer State for Columns
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState<RemoteTable | null>(null);
    const [currentColumns, setCurrentColumns] = useState<RemoteColumn[]>([]);
    const [columnsLoading, setColumnsLoading] = useState(false);

    useEffect(() => {
        if (open && dataSourceId) {
            // Reset states when opening for a new/same dataSource
            setTableAliases({});
            setColumnAliases({});
            // Trigger refresh if grid exists
            gridRef.current?.onRefresh();
        }
    }, [open, dataSourceId]);

    // Generate Input for Sync
    const handleSync = async () => {
        const gridApi = gridRef.current as any;
        const selectedRows = gridApi?.getSelectedRows() as RemoteTable[];
        if (!selectedRows || selectedRows.length === 0) {
            message.warning('请至少选择一张表');
            return;
        }

        setSubmitting(true);
        try {
            const payload: API.BurnAbpDataCopilotDataSourcesSyncSelectedTablesInput = {
                tables: selectedRows.map(t => ({
                    name: t.name!,
                    schema: t.schema,
                    businessAlias: tableAliases[t.name!] || undefined,
                    columnAliases: columnAliases[t.name!] || undefined
                }))
            };

            const result: any = await DataSourceSyncSelectedTablesAsync({ id: dataSourceId }, payload);

            if (result.success) {
                message.success(`同步成功！新增 ${result.tablesAdded}，更新 ${result.tablesUpdated}`);
                onSuccess();
                onClose();
            } else {
                message.error(result.errorMessage || '同步失败');
            }
        } catch (error) {
            message.error('同步请求失败');
        } finally {
            setSubmitting(false);
        }
    };

    // Load Columns for Drawer
    const handleEditColumns = async (record: RemoteTable) => {
        setCurrentTable(record);
        setDrawerOpen(true);
        setColumnsLoading(true);
        try {
            // Pass id as object property to match generated API
            const result: any = await DataSourceGetRemoteTableColumnsAsync({
                id: dataSourceId,
                tableName: record.name!
            });
            const cols = result.items || [];
            setCurrentColumns(cols);
        } catch (error) {
            message.error('加载列信息失败');
        } finally {
            setColumnsLoading(false);
        }
    };

    // Update alias state
    const handleAliasChange = useCallback((tableName: string, value: string) => {
        setTableAliases(prev => ({
            ...prev,
            [tableName]: value
        }));
    }, []);

    // Column Definitions for AgGrid
    const columnDefs = useMemo(() => [
        {
            field: 'name',
            headerName: '表名',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            sortable: true,
            filter: true, // Enable default filter
            width: 200,
            floatingFilter: true, // Enable quick search bar in header
        },
        {
            field: 'schema',
            headerName: 'Schema',
            width: 100,
            sortable: true,
            filter: true,
        },
        {
            field: 'comment',
            headerName: '说明',
            width: 200,
            tooltipField: 'comment',
        },
        {
            field: 'estimatedRowCount',
            headerName: '行数 (估算)',
            width: 120,
            sortable: true,
            cellRenderer: (params: any) => <Badge status="default" text={params.value} />,
        },
        {
            field: 'businessAlias',
            headerName: '表别名 (可编辑)',
            width: 200,
            cellRenderer: (params: any) => (
                <Input
                    placeholder="输入业务别名"
                    value={tableAliases[params.data.name] || ''}
                    onChange={(e) => handleAliasChange(params.data.name, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
            ),
        },
        {
            headerName: '操作',
            width: 120,
            pinned: 'right',
            cellRenderer: (params: any) => {
                const count = columnAliases[params.data.name] ? Object.keys(columnAliases[params.data.name]).length : 0;
                return (
                    <a
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditColumns(params.data);
                        }}
                    >
                        编辑列别名
                        {count > 0 && ` (${count})`}
                    </a>
                );
            }
        } as any,
    ], [tableAliases, columnAliases, handleAliasChange]);

    // Drawer Columns Definition (Simple Table)
    const columnTableCols = [
        {
            title: '列名',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: '类型',
            dataIndex: 'dataType',
            width: 100,
        },
        {
            title: '说明',
            dataIndex: 'comment',
            width: 150,
            ellipsis: true,
        },
        {
            title: '列别名',
            key: 'alias',
            render: (_: any, record: RemoteColumn) => (
                <Input
                    placeholder="业务别名"
                    value={columnAliases[currentTable?.name || '']?.[record.name!] || ''}
                    onChange={(e) => {
                        if (!currentTable?.name) return;
                        const tableName = currentTable.name;
                        setColumnAliases(prev => ({
                            ...prev,
                            [tableName]: {
                                ...(prev[tableName] || {}),
                                [record.name!]: e.target.value
                            }
                        }));
                    }}
                />
            )
        }
    ];

    return (
        <Modal
            title={<Space><DatabaseOutlined /> 选择同步表与配置别名</Space>}
            open={open}
            onCancel={onClose}
            width={1100}
            onOk={handleSync}
            okText="开始同步"
            confirmLoading={submitting}
            destroyOnClose
            bodyStyle={{ padding: 0 }} // Maximize grid space
        >
            <div style={{ height: 500, width: '100%' }}>
                <AgGridPlus
                    gridRef={gridRef}
                    gridKey="table-selection-grid"
                    columnDefs={columnDefs}
                    rowSelection="multiple"
                    request={async (params) => {
                        // Fetch all tables once, AgGrid will handle sorting/filtering client-side 
                        // if we return them as data.
                        try {
                            // Pass id as object property to match generated API
                            const result: any = await DataSourceGetRemoteTablesAsync({ id: dataSourceId });
                            return {
                                success: true,
                                data: result.items || [],
                                total: result.items?.length || 0
                            };
                        } catch (e) {
                            return { success: false, data: [], total: 0 };
                        }
                    }}
                    toolBarRender={() => [
                        <Button key="reload" icon={<ReloadOutlined />} onClick={() => gridRef.current?.onRefresh()}>
                            刷新
                        </Button>
                    ]}
                />
            </div>

            <Drawer
                title={`编辑列别名: ${currentTable?.name}`}
                width={600}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
            >
                <Table
                    rowKey="name"
                    dataSource={currentColumns}
                    columns={columnTableCols}
                    loading={columnsLoading}
                    pagination={false}
                    scroll={{ y: 'calc(100vh - 200px)' }}
                    size="small"
                />
            </Drawer>
        </Modal>
    );
};

export default TableSelectionDialog;
