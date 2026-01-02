import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Card, Button, Space, Alert, message, Popconfirm, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, SaveOutlined, ReloadOutlined } from '@ant-design/icons';
import LibraryTree from './LibraryTree';
import AclRuleTable, { AclEntry } from './AclRuleTable';
import AclRuleDrawer from './AclRuleDrawer';
import {
    DocumentAuthorizationGetLibraryAclAsync,
    DocumentAuthorizationSetLibraryAclAsync,
} from '@/services/pdm/DocumentAuthorization';
import { PermissionActionLabels, PrincipalTypeLabels } from '../constants';

/** 库授权Tab组件 */
const LibraryAclTab: React.FC = () => {
    // 状态
    const [selectedLibrary, setSelectedLibrary] = useState<{ id: string; data: any } | null>(null);
    const [aclEntries, setAclEntries] = useState<AclEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editEntry, setEditEntry] = useState<AclEntry | undefined>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [originalEntries, setOriginalEntries] = useState<AclEntry[]>([]);

    // 加载ACL数据
    const loadAclData = useCallback(async (libraryId: string) => {
        setLoading(true);
        try {
            const response = await DocumentAuthorizationGetLibraryAclAsync({ libraryId });
            const entries: AclEntry[] = (response.entries || []).map((entry: any, index: number) => ({
                key: `${entry.principalType}-${entry.principalKey}-${entry.action}-${index}`,
                principalType: entry.principalType,
                principalKey: entry.principalKey,
                principalName: entry.principalDisplayName || entry.principalKey,
                action: entry.action,
                effect: entry.effect,
                inheritToChildren: entry.inheritToChildren,
                isInherited: false, // 本节点规则
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

    // 选择库
    const handleLibrarySelect = (libraryId: string, libraryData: any) => {
        if (hasChanges) {
            if (!window.confirm('有未保存的更改，确定切换？')) {
                return;
            }
        }
        setSelectedLibrary({ id: libraryId, data: libraryData });
        loadAclData(libraryId);
    };

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
        // 如果是编辑模式，替换原条目
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
            // 新增模式
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
        if (!selectedLibrary) return;

        setSaving(true);
        try {
            // 过滤掉继承的规则，只保存本节点规则
            const localEntries = aclEntries.filter(e => !e.isInherited);

            await DocumentAuthorizationSetLibraryAclAsync({
                resourceId: selectedLibrary.id,
                resourceType: 1, // Library
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
        <div style={{ display: 'flex', height: 'calc(100vh - 280px)', minHeight: 500 }}>
            {/* 左侧库树 */}
            <Card
                title="文档库"
                size="small"
                style={{ width: 280, marginRight: 16, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ flex: 1, overflow: 'auto', padding: 12 }}
            >
                <LibraryTree
                    selectedLibraryId={selectedLibrary?.id}
                    onSelect={handleLibrarySelect}
                />
            </Card>

            {/* 右侧规则表 */}
            <Card
                title={selectedLibrary ? `当前节点：${selectedLibrary.data?.libraryName || selectedLibrary.id}` : '请选择文档库'}
                size="small"
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                bodyStyle={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}
                extra={
                    selectedLibrary && (
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
                {!selectedLibrary ? (
                    <Alert message="请先从左侧选择一个文档库" type="info" showIcon />
                ) : (
                    <>
                        <Alert
                            message="规则说明"
                            description="Deny优先于Allow；继承的规则（来自父节点）只读，需要覆盖请新增本节点规则。"
                            type="info"
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
                resourceName={selectedLibrary?.data?.libraryName}
                isLibraryLevel={true}
            />
        </div>
    );
};

export default LibraryAclTab;
