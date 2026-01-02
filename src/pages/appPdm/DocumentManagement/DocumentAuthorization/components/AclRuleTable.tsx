import React, { useMemo } from 'react';
import { Tag, Button, Popconfirm, Space, Tooltip, Empty } from 'antd';
import { AgGridPlus } from '@nokecy/qc-ui';
import { EditOutlined, DeleteOutlined, LockOutlined } from '@ant-design/icons';
import {
    PrincipalTypeLabels,
    PermissionEffects,
    PermissionActionLabels,
} from '../constants';

export interface AclEntry {
    key?: string;
    principalType?: number;
    principalKey?: string;
    principalName?: string;  // 显示名称（前端扩展）
    action?: number;
    effect?: number;
    inheritToChildren?: boolean;
    isInherited?: boolean;  // 是否继承的规则（前端扩展）
    sourceNodeName?: string;  // 来源节点名称（前端扩展）
}

interface AclRuleTableProps {
    /** ACL条目列表 */
    entries: AclEntry[];
    /** 是否加载中 */
    loading?: boolean;
    /** 编辑回调 */
    onEdit?: (entry: AclEntry) => void;
    /** 删除回调 */
    onDelete?: (entry: AclEntry) => void;
    /** 是否只读模式 */
    readonly?: boolean;
    /** 选中的行Key */
    selectedRowKeys?: React.Key[];
    /** 选中变化回调 */
    onSelectionChange?: (keys: React.Key[], rows: AclEntry[]) => void;
}

/** ACL规则表格组件 */
const AclRuleTable: React.FC<AclRuleTableProps> = ({
    entries,
    loading = false,
    onEdit,
    onDelete,
    readonly = false,
    selectedRowKeys = [],
    onSelectionChange,
}) => {
    const columnDefs: any[] = useMemo(() => [
        {
            field: 'principalType',
            headerName: '主体类型',
            width: 100,
            cellRenderer: (params: any) => PrincipalTypeLabels[params.value] || '-',
        },
        {
            field: 'principalName',
            headerName: '主体',
            width: 180,
            cellRenderer: (params: any) => (
                <Tooltip title={params.data?.principalKey}>
                    {params.value || params.data?.principalKey || '-'}
                </Tooltip>
            ),
        },
        {
            field: 'action',
            headerName: '动作',
            width: 120,
            cellRenderer: (params: any) => PermissionActionLabels[params.value] || '-',
        },
        {
            field: 'effect',
            headerName: '效果',
            width: 80,
            cellRenderer: (params: any) => (
                <Tag color={params.value === PermissionEffects.Allow ? 'green' : 'red'}>
                    {params.value === PermissionEffects.Allow ? '允许' : '拒绝'}
                </Tag>
            ),
        },
        {
            field: 'inheritToChildren',
            headerName: '继承',
            width: 80,
            cellRenderer: (params: any) => params.value ? '是' : '否',
        },
        {
            field: 'sourceNodeName',
            headerName: '来源',
            width: 120,
            cellRenderer: (params: any) => {
                if (params.data?.isInherited) {
                    return (
                        <Tooltip title={`继承自: ${params.value || '父节点'}`}>
                            <Tag color="blue">
                                <LockOutlined style={{ marginRight: 4 }} />
                                {params.value || '继承'}
                            </Tag>
                        </Tooltip>
                    );
                }
                return <Tag color="default">本节点</Tag>;
            },
        },
        {
            field: 'actions',
            headerName: '操作',
            width: 100,
            pinned: 'right',
            filter: false,
            sortable: false,
            cellRenderer: (params: any) => {
                const record = params.data;
                if (record?.isInherited || readonly) {
                    return <span style={{ color: '#999' }}>只读</span>;
                }
                return (
                    <Space size="small">
                        <Tooltip title="编辑">
                            <Button
                                type="link"
                                size="small"
                                icon={<EditOutlined />}
                                onClick={() => onEdit?.(record)}
                            />
                        </Tooltip>
                        <Popconfirm
                            title="确定删除此规则?"
                            onConfirm={() => onDelete?.(record)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Tooltip title="删除">
                                <Button
                                    type="link"
                                    size="small"
                                    danger
                                    icon={<DeleteOutlined />}
                                />
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ], [onEdit, onDelete, readonly]);

    if (entries.length === 0 && !loading) {
        return <Empty description="暂无ACL规则" />;
    }

    return (
        <AgGridPlus
            rowData={entries}
            columnDefs={columnDefs}
            loading={loading}
            search={false}
            pagination={false}
            domLayout="autoHeight"
            rowSelection={onSelectionChange ? 'multiple' : undefined}
            getRowId={(params) => params.data?.key || `${params.data?.principalType}-${params.data?.principalKey}-${params.data?.action}`}
            onSelectionChanged={onSelectionChange ? (event: any) => {
                const selectedRows = event.api.getSelectedRows();
                const keys = selectedRows.map((row: AclEntry) => row.key || `${row.principalType}-${row.principalKey}-${row.action}`);
                onSelectionChange(keys, selectedRows);
            } : undefined}
            isRowSelectable={(params: any) => !params.data?.isInherited}
        />
    );
};

export default AclRuleTable;
