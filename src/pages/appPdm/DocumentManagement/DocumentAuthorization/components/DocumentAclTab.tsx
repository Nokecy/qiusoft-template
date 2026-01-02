import React, { useState, useCallback } from 'react';
import { Card, Button, Space, Alert, message, Popconfirm, Spin, Tag, Descriptions } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import AclRuleTable, { AclEntry } from './AclRuleTable';
import AclRuleDrawer from './AclRuleDrawer';
import {
    DocumentAuthorizationGetDocumentAclAsync,
    DocumentAuthorizationSetDocumentAclAsync,
} from '@/services/pdm/DocumentAuthorization';
import DocumentSelect from '@/pages/appPdm/_formWidgets/DocumentSelect';

/** 文档授权Tab组件 */
const DocumentAclTab: React.FC = () => {
    // 状态
    const [selectedDocument, setSelectedDocument] = useState<{ id: string; name: string; documentNumber?: string; libraryName?: string; creatorName?: string; lifecycleState?: number } | null>(null);
    const [aclEntries, setAclEntries] = useState<AclEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editEntry, setEditEntry] = useState<AclEntry | undefined>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalEntries, setOriginalEntries] = useState<AclEntry[]>([]);

    // 生命周期状态标签
    const getLifecycleTag = (state?: number) => {
        const stateMap: Record<number, { label: string; color: string }> = {
            0: { label: '草稿', color: 'default' },
            10: { label: '审批中', color: 'processing' },
            20: { label: '已发布', color: 'success' },
            30: { label: '已作废', color: 'error' },
        };
        const config = stateMap[state || 0];
        return config ? <Tag color={config.color}>{config.label}</Tag> : '-';
    };

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
                lifecycleState: record.lifecycleState,
            };
            setSelectedDocument(doc);
            await loadAclData(doc.id);
        } else {
            setSelectedDocument(null);
            setAclEntries([]);
            setOriginalEntries([]);
            setHasChanges(false);
        }
    };

    // 加载ACL数据
    const loadAclData = useCallback(async (documentId: string) => {
        setLoading(true);
        try {
            const response = await DocumentAuthorizationGetDocumentAclAsync({ documentId });
            const entries: AclEntry[] = (response.entries || []).map((entry: any, index: number) => ({
                key: `${entry.principalType}-${entry.principalKey}-${entry.action}-${index}`,
                principalType: entry.principalType,
                principalKey: entry.principalKey,
                principalName: entry.principalDisplayName || entry.principalKey,
                action: entry.action,
                effect: entry.effect,
                inheritToChildren: entry.inheritToChildren,
                isInherited: false,
                sourceNodeName: '本节点',
            }));
            setAclEntries(entries);
            setOriginalEntries(JSON.parse(JSON.stringify(entries)));
            setHasChanges(false);
            setSelectedRowKeys([]);
        } catch (error) {
            console.error('加载ACL失败:', error);
            message.error('加载ACL数据失败');
        } finally {
            setLoading(false);
        }
    }, []);

    // 新增规则
    const handleAddRule = () => {
        setEditEntry(undefined);
        setDrawerOpen(true);
    };

    // 编辑规则
    const handleEditRule = (entry: AclEntry) => {
        setEditEntry(entry);
        setDrawerOpen(true);
    };

    // 删除规则
    const handleDeleteRule = (entry: AclEntry) => {
        setAclEntries(prev => prev.filter(e => e.key !== entry.key));
        setHasChanges(true);
    };

    // 批量删除
    const handleBatchDelete = () => {
        setAclEntries(prev => prev.filter(e => !selectedRowKeys.includes(e.key!)));
        setSelectedRowKeys([]);
        setHasChanges(true);
    };

    // 保存规则
    const handleSaveRules = (newEntries: AclEntry[]) => {
        if (editEntry?.key) {
            setAclEntries(prev => {
                const index = prev.findIndex(e => e.key === editEntry.key);
                if (index >= 0) {
                    const updated = [...prev];
                    updated.splice(index, 1, ...newEntries.map((e, i) => ({
                        ...e,
                        key: `new-${Date.now()}-${i}`,
                        isInherited: false,
                        sourceNodeName: '本节点',
                    })));
                    return updated;
                }
                return prev;
            });
        } else {
            const entriesWithKeys = newEntries.map((e, i) => ({
                ...e,
                key: `new-${Date.now()}-${i}`,
                isInherited: false,
                sourceNodeName: '本节点',
            }));
            setAclEntries(prev => [...prev, ...entriesWithKeys]);
        }
        setHasChanges(true);
        setDrawerOpen(false);
    };

    // 保存到服务器
    const handleSaveToServer = async () => {
        if (!selectedDocument) return;

        setSaving(true);
        try {
            const localEntries = aclEntries.filter(e => !e.isInherited);

            await DocumentAuthorizationSetDocumentAclAsync({
                resourceId: selectedDocument.id,
                resourceType: 2, // Document
                entries: localEntries.map(e => ({
                    principalType: e.principalType as any,
                    principalKey: e.principalKey,
                    action: e.action as any,
                    effect: e.effect as any,
                    inheritToChildren: e.inheritToChildren,
                })),
            });

            message.success('保存成功');
            setHasChanges(false);
            setOriginalEntries(JSON.parse(JSON.stringify(aclEntries)));
        } catch (error) {
            console.error('保存失败:', error);
            message.error('保存失败');
        } finally {
            setSaving(false);
        }
    };

    // 重置
    const handleReset = () => {
        setAclEntries(JSON.parse(JSON.stringify(originalEntries)));
        setHasChanges(false);
        setSelectedRowKeys([]);
    };

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

            {/* 选中文档信息 + ACL表格 */}
            <Card
                title={selectedDocument ? '文档ACL规则' : '请选择文档'}
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
                    <Alert message="请先选择一个文档" type="info" showIcon />
                ) : (
                    <>
                        {/* 文档信息 */}
                        <Descriptions size="small" bordered column={3} style={{ marginBottom: 12 }}>
                            <Descriptions.Item label="文档号">{selectedDocument.documentNumber || '-'}</Descriptions.Item>
                            <Descriptions.Item label="名称">{selectedDocument.name || '-'}</Descriptions.Item>
                            <Descriptions.Item label="库">{selectedDocument.libraryName || '-'}</Descriptions.Item>
                            <Descriptions.Item label="作者">{selectedDocument.creatorName || '-'}</Descriptions.Item>
                            <Descriptions.Item label="状态">{getLifecycleTag(selectedDocument.lifecycleState)}</Descriptions.Item>
                        </Descriptions>

                        <Alert
                            message="作者权限说明"
                            description="作者权限：不受密级限制、含发布权限，但不含授权管理权限。"
                            type="warning"
                            showIcon
                            style={{ marginBottom: 12 }}
                        />

                        <div style={{ marginBottom: 12 }}>
                            <Space>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRule}>
                                    新增规则
                                </Button>
                                {selectedRowKeys.length > 0 && (
                                    <Popconfirm
                                        title={`确定删除选中的 ${selectedRowKeys.length} 条规则？`}
                                        onConfirm={handleBatchDelete}
                                    >
                                        <Button danger icon={<DeleteOutlined />}>
                                            批量删除 ({selectedRowKeys.length})
                                        </Button>
                                    </Popconfirm>
                                )}
                            </Space>
                        </div>

                        <Spin spinning={loading}>
                            <AclRuleTable
                                entries={aclEntries}
                                loading={loading}
                                onEdit={handleEditRule}
                                onDelete={handleDeleteRule}
                                selectedRowKeys={selectedRowKeys}
                                onSelectionChange={(keys) => setSelectedRowKeys(keys)}
                            />
                        </Spin>
                    </>
                )}
            </Card>

            {/* 规则编辑Drawer */}
            <AclRuleDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSave={handleSaveRules}
                editEntry={editEntry}
                resourceName={selectedDocument?.name}
                isLibraryLevel={false}
            />
        </div>
    );
};

export default DocumentAclTab;
