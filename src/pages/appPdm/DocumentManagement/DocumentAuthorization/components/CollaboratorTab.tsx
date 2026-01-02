import React, { useState, useCallback, useMemo } from 'react';
import { Card, Button, Space, Alert, message, Popconfirm, Spin, Tag, Empty } from 'antd';
import { AgGridPlus } from '@nokecy/qc-ui';
import { PlusOutlined, DeleteOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import CollaboratorModal, { CollaboratorData } from './CollaboratorModal';
import {
    DocumentAuthorizationGetCollaboratorsAsync,
    DocumentAuthorizationSetCollaboratorsAsync,
} from '@/services/pdm/DocumentAuthorization';
import DocumentSelect from '@/pages/appPdm/_formWidgets/DocumentSelect';
import { CollaborationRoleLabels } from '../constants';
import dayjs from 'dayjs';

/** 协作者Tab组件 */
const CollaboratorTab: React.FC = () => {
    // 状态
    const [selectedDocument, setSelectedDocument] = useState<{ id: string; name: string; documentNumber?: string; libraryName?: string; creatorName?: string } | null>(null);
    const [collaborators, setCollaborators] = useState<CollaboratorData[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState<CollaboratorData | undefined>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalCollaborators, setOriginalCollaborators] = useState<CollaboratorData[]>([]);

    // 文档选择变化
    const handleDocumentChange = async (value: any, record: any) => {
        if (hasChanges) {
            if (!window.confirm('有未保存的更改，确定切换？')) {
                return;
            }
        }

        if (value && record) {
            const doc = {
                id: record.id || value,
                name: `${record.documentNumber || '-'} ${record.documentName || ''}`,
                documentNumber: record.documentNumber,
                libraryName: record.libraryName,
                creatorName: record.creatorName,
            };
            setSelectedDocument(doc);
            await loadCollaborators(doc.id);
        } else {
            setSelectedDocument(null);
            setCollaborators([]);
            setOriginalCollaborators([]);
            setHasChanges(false);
        }
    };

    // 加载协作者数据
    const loadCollaborators = useCallback(async (documentId: string) => {
        setLoading(true);
        try {
            const response = await DocumentAuthorizationGetCollaboratorsAsync({ documentId });
            const data: CollaboratorData[] = (response || []).map((item: any, index: number) => ({
                ...item,
                key: item.id || `${item.userId}-${index}`,
            }));
            setCollaborators(data);
            setOriginalCollaborators(JSON.parse(JSON.stringify(data)));
            setHasChanges(false);
            setSelectedRowKeys([]);
        } catch (error) {
            console.error('加载协作者失败:', error);
            message.error('加载协作者数据失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 新增协作者
    const handleAddCollaborator = () => {
        setEditData(undefined);
        setModalOpen(true);
    };

    // 编辑协作者
    const handleEditCollaborator = (data: CollaboratorData) => {
        setEditData(data);
        setModalOpen(true);
    };

    // 删除协作者
    const handleDeleteCollaborator = (data: CollaboratorData) => {
        setCollaborators(prev => prev.filter(c => c.userId !== data.userId));
        setHasChanges(true);
    };

    // 批量删除
    const handleBatchDelete = () => {
        setCollaborators(prev => prev.filter(c => !selectedRowKeys.includes(c.userId!)));
        setSelectedRowKeys([]);
        setHasChanges(true);
    };

    // 保存协作者
    const handleSaveCollaborator = (data: CollaboratorData) => {
        if (editData?.id) {
            // 编辑模式
            setCollaborators(prev => prev.map(c =>
                c.id === editData.id ? { ...data, key: data.userId } : c
            ));
        } else {
            // 新增模式
            // 检查是否已存在
            if (collaborators.some(c => c.userId === data.userId)) {
                message.warning('该用户已是协作者');
                return;
            }
            setCollaborators(prev => [...prev, { ...data, key: data.userId }]);
        }
        setHasChanges(true);
        setModalOpen(false);
    };

    // 保存到服务器
    const handleSaveToServer = async () => {
        if (!selectedDocument) return;

        setSaving(true);
        try {
            await DocumentAuthorizationSetCollaboratorsAsync({
                documentId: selectedDocument.id,
                collaborators: collaborators.map(c => ({
                    id: c.id,
                    documentId: selectedDocument.id,
                    userId: c.userId,
                    role: c.role as any,
                    expireTime: c.expireTime,
                    isEnabled: c.isEnabled ?? true,
                })),
            });

            message.success('保存成功');
            setHasChanges(false);
            setOriginalCollaborators(JSON.parse(JSON.stringify(collaborators)));
        } catch (error) {
            console.error('保存失败:', error);
            message.error('保存失败');
        } finally {
            setSaving(false);
        }
    };

    // 重置
    const handleReset = () => {
        setCollaborators(JSON.parse(JSON.stringify(originalCollaborators)));
        setHasChanges(false);
        setSelectedRowKeys([]);
    };

    // 协作者表格列定义
    const collaboratorColumnDefs: any[] = useMemo(() => [
        {
            field: 'userName',
            headerName: '用户',
            width: 150,
            cellRenderer: (params: any) => params.value || params.data?.userId || '-',
        },
        {
            field: 'role',
            headerName: '协作角色',
            width: 120,
            cellRenderer: (params: any) => {
                const label = CollaborationRoleLabels[params.value] || '-';
                const colorMap: Record<number, string> = {
                    1: 'blue',
                    2: 'orange',
                    3: 'green',
                };
                return <Tag color={colorMap[params.value]}>{label}</Tag>;
            },
        },
        {
            field: 'expireTime',
            headerName: '过期时间',
            width: 160,
            cellRenderer: (params: any) => {
                if (!params.value) return <Tag color="green">永久</Tag>;
                const expireDate = dayjs(params.value);
                const isExpired = expireDate.isBefore(dayjs());
                return (
                    <Tag color={isExpired ? 'red' : 'default'}>
                        {expireDate.format('YYYY-MM-DD HH:mm')}
                        {isExpired && ' (已过期)'}
                    </Tag>
                );
            },
        },
        {
            field: 'isEnabled',
            headerName: '状态',
            width: 80,
            cellRenderer: (params: any) => (
                <Tag color={params.value !== false ? 'green' : 'red'}>
                    {params.value !== false ? '启用' : '禁用'}
                </Tag>
            ),
        },
        {
            field: 'actions',
            headerName: '操作',
            width: 120,
            pinned: 'right',
            filter: false,
            sortable: false,
            cellRenderer: (params: any) => (
                <Space size="small">
                    <Button type="link" size="small" onClick={() => handleEditCollaborator(params.data)}>
                        编辑
                    </Button>
                    <Popconfirm
                        title="确定移除此协作者？"
                        onConfirm={() => handleDeleteCollaborator(params.data)}
                    >
                        <Button type="link" size="small" danger>
                            移除
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ], []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 280px)', minHeight: 500 }}>
            {/* 文档选择区域 */}
            <Card size="small" style={{ marginBottom: 16 }}>
                <Space>
                    <span>选择文档：</span>
                    <DocumentSelect
                        style={{ width: 400 }}
                        placeholder="搜索并选择文档..."
                        onChange={handleDocumentChange}
                    />
                </Space>
            </Card>

            {/* 协作者列表 */}
            <Card
                title={selectedDocument ? `协作者列表 - ${selectedDocument.name}` : '请搜索并选择文档'}
                size="small"
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}
                extra={
                    selectedDocument && (
                        <Space>
                            {hasChanges && <span style={{ color: '#faad14' }}>* 有未保存的更改</span>}
                            <Button icon={<ReloadOutlined />} onClick={handleReset} disabled={!hasChanges}>
                                重置
                            </Button>
                            <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleSaveToServer}
                                loading={saving}
                                disabled={!hasChanges}
                            >
                                保存
                            </Button>
                        </Space>
                    )
                }
            >
                {!selectedDocument ? (
                    <Alert message="请先搜索并选择一个文档" type="info" showIcon />
                ) : (
                    <>
                        <div style={{ marginBottom: 12 }}>
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCollaborator}>
                                    新增协作者
                                </Button>
                                {selectedRowKeys.length > 0 && (
                                    <Popconfirm
                                        title={`确定移除选中的 ${selectedRowKeys.length} 个协作者？`}
                                        onConfirm={handleBatchDelete}
                                    >
                                        <Button danger icon={<DeleteOutlined />}>
                                            批量移除 ({selectedRowKeys.length})
                                        </Button>
                                    </Popconfirm>
                                )}
                            </Space>
                        </div>

                        <Spin spinning={loading}>
                            {collaborators.length > 0 ? (
                                <AgGridPlus
                                    rowData={collaborators}
                                    columnDefs={collaboratorColumnDefs}
                                    search={false}
                                    pagination={false}
                                    domLayout="autoHeight"
                                    rowSelection="multiple"
                                    getRowId={(params) => params.data?.userId}
                                    onSelectionChanged={(event: any) => {
                                        const selectedRows = event.api.getSelectedRows();
                                        const keys = selectedRows.map((row: CollaboratorData) => row.userId);
                                        setSelectedRowKeys(keys);
                                    }}
                                />
                            ) : (
                                <Empty description="暂无协作者" />
                            )}
                        </Spin>
                    </>
                )}
            </Card>

            {/* 协作者编辑Modal */}
            <CollaboratorModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveCollaborator}
                editData={editData}
                documentId={selectedDocument?.id}
            />
        </div>
    );
};

export default CollaboratorTab;
