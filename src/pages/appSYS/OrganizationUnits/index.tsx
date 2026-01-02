import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Tree, Button, Space, message, Dropdown, Empty } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined, MoreOutlined, ReloadOutlined } from '@ant-design/icons';
import { Allotment } from 'allotment';
import { AgGridPlus } from '@/components/agGrid';
import { Access, useAccess, useIntl } from 'umi';
import { RequestData } from '@ant-design/pro-table';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import DeleteConfirm from '@/components/deleteConfirm';
import dayjs from 'dayjs';
import {
    OrganizationUnitGetTreeListAsync,
    OrganizationUnitDeleteAsync,
    OrganizationUnitGetUserListByOrganizationId,
    OrganizationUnitRemoveUserFromOrganizationUnit,
} from '@/services/openApi/OrganizationUnit';
import OrgUnitFormModal from './components/formModal';
import AddMemberModal from './components/addMemberModal';

// 将扁平列表构建为嵌套树形结构
const buildTree = (items: API.BurnAbpIdentityProOrganizationUnitTreeDto[]): API.BurnAbpIdentityProOrganizationUnitTreeDto[] => {
    // 如果数据已经有 children 结构，直接返回
    if (items.some(item => item.children && item.children.length > 0)) {
        return items;
    }

    // 创建 id -> item 的映射
    const itemMap = new Map<string, API.BurnAbpIdentityProOrganizationUnitTreeDto>();
    items.forEach(item => {
        itemMap.set(item.id!, { ...item, children: [] });
    });

    // 构建树形结构
    const roots: API.BurnAbpIdentityProOrganizationUnitTreeDto[] = [];
    itemMap.forEach(item => {
        if (item.parentId && itemMap.has(item.parentId)) {
            const parent = itemMap.get(item.parentId)!;
            if (!parent.children) parent.children = [];
            parent.children.push(item);
        } else {
            roots.push(item);
        }
    });

    return roots;
};

// 成员列表操作列
const MemberOptions = (props: ICellRendererParams & { onRefresh: () => void; organizationUnitId: string }) => {
    const { data, onRefresh, organizationUnitId } = props;
    const intl = useIntl();

    const handleRemove = async () => {
        const hide = message.loading('正在移除...', 0);
        try {
            await OrganizationUnitRemoveUserFromOrganizationUnit({
                userId: data.id,
                organizationUnitId: organizationUnitId,
            });
            message.success('移除成功');
            onRefresh();
        } finally {
            hide();
        }
    };

    return (
        <Space>
            <DeleteConfirm title="确定从该部门移除此用户?" onConfirm={handleRemove}>
                <Button size="small" type="link" icon={<DeleteOutlined />} title="移除" danger />
            </DeleteConfirm>
        </Space>
    );
};

const OrganizationUnitsPage = (props: any) => {
    const intl = useIntl();
    const access = useAccess();
    const gridRef = useRef<GridRef>();

    // 状态
    const [treeData, setTreeData] = useState<API.BurnAbpIdentityProOrganizationUnitTreeDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrgUnit, setSelectedOrgUnit] = useState<any>(null);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

    // 加载部门树
    const loadTreeData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await OrganizationUnitGetTreeListAsync({});
            // 后端返回扁平列表，使用 buildTree 转换为嵌套结构
            const tree = buildTree(res.items || []);
            setTreeData(tree);
            // 默认展开第一层
            const firstLevelKeys = tree.map(item => item.key || item.id || '');
            setExpandedKeys(firstLevelKeys);
        } catch (error) {
            message.error('加载部门数据失败');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTreeData();
    }, [loadTreeData]);

    // 刷新成员列表
    const refreshMembers = useCallback(() => {
        gridRef.current?.onRefresh();
    }, []);

    // 选中部门变化时刷新成员列表
    useEffect(() => {
        if (selectedOrgUnit?.id) {
            // 使用 setTimeout 确保组件已渲染
            const timer = setTimeout(() => {
                refreshMembers();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [selectedOrgUnit?.id, refreshMembers]);

    // 选择部门
    const handleSelect = useCallback((selectedKeys: React.Key[], info: any) => {
        if (info.selected && info.node) {
            setSelectedOrgUnit(info.node);
        } else {
            setSelectedOrgUnit(null);
        }
    }, []);

    // 删除部门
    const handleDeleteOrgUnit = useCallback(async (id: string) => {
        const hide = message.loading('正在删除...', 0);
        try {
            await OrganizationUnitDeleteAsync({ id });
            message.success('删除成功');
            setSelectedOrgUnit(null);
            loadTreeData();
        } finally {
            hide();
        }
    }, [loadTreeData]);

    // 部门操作菜单
    const getOrgUnitMenuItems = useCallback((node: API.BurnAbpIdentityProOrganizationUnitTreeDto) => [
        {
            key: 'addChild',
            label: (
                <OrgUnitFormModal
                    parentId={node.id}
                    onConfirm={() => loadTreeData()}
                    buttonProps={{ type: 'text', size: 'small', style: { padding: 0 } }}
                >
                    添加子部门
                </OrgUnitFormModal>
            ),
        },
        {
            key: 'edit',
            label: (
                <OrgUnitFormModal
                    entityId={node.id}
                    onConfirm={() => loadTreeData()}
                    buttonProps={{ type: 'text', size: 'small', style: { padding: 0 } }}
                >
                    编辑
                </OrgUnitFormModal>
            ),
        },
        {
            key: 'delete',
            label: (
                <DeleteConfirm title="确定删除此部门?" onConfirm={() => handleDeleteOrgUnit(node.id!)}>
                    <span style={{ color: '#ff4d4f' }}>删除</span>
                </DeleteConfirm>
            ),
        },
    ], [loadTreeData, handleDeleteOrgUnit]);

    // 渲染树节点标题
    const renderTreeTitle = useCallback((node: API.BurnAbpIdentityProOrganizationUnitTreeDto) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 8 }}>
                <span>{node.title}</span>
                <Dropdown
                    menu={{ items: getOrgUnitMenuItems(node) }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <Button
                        type="text"
                        size="small"
                        icon={<MoreOutlined />}
                        onClick={e => e.stopPropagation()}
                        style={{ opacity: 0.6 }}
                    />
                </Dropdown>
            </div>
        );
    }, [getOrgUnitMenuItems]);

    // 转换树形数据以支持自定义渲染
    const transformTreeData = useCallback((data: API.BurnAbpIdentityProOrganizationUnitTreeDto[]): any[] => {
        return data.map(node => ({
            ...node,
            key: node.key || node.id,
            displayName: node.title, // 保留原始标题用于显示
            children: node.children ? transformTreeData(node.children) : undefined,
        }));
    }, []);

    // 成员列表列定义
    const memberColumnDefs = useMemo(() => [
        {
            headerName: '账号',
            field: 'userName',
            width: 150,
            hideInSearch: true,
        },
        {
            headerName: '姓名',
            field: 'name',
            width: 120,
            hideInSearch: true,
        },
        {
            headerName: '邮箱',
            field: 'email',
            width: 200,
            hideInSearch: true,
        },
        {
            headerName: '手机',
            field: 'phoneNumber',
            width: 130,
            hideInSearch: true,
        },
        {
            headerName: '创建时间',
            field: 'creationTime',
            width: 160,
            hideInSearch: true,
            cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '',
        },
        {
            headerName: '操作',
            field: 'action',
            width: 100,
            pinned: 'right' as const,
            hideInSearch: true,
            cellRenderer: (props: any) => <MemberOptions {...props} />,
            cellRendererParams: {
                onRefresh: refreshMembers,
                organizationUnitId: selectedOrgUnit?.id,
            },
        },
    ], [refreshMembers, selectedOrgUnit?.id]);

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <Allotment vertical={false}>
                {/* 左侧：部门树 */}
                <Allotment.Pane minSize={250} maxSize={400} preferredSize={300}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #f0f0f0' }}>
                        {/* 树工具栏 */}
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>部门结构</span>
                            <Space size={4}>
                                <Button type="text" size="small" icon={<ReloadOutlined />} onClick={loadTreeData} title="刷新" />
                                <OrgUnitFormModal onConfirm={loadTreeData} buttonProps={{ type: 'primary', size: 'small', icon: <PlusOutlined /> }}>
                                    新建
                                </OrgUnitFormModal>
                            </Space>
                        </div>
                        {/* 树内容 */}
                        <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
                            {treeData.length > 0 ? (
                                <Tree
                                    showLine={{ showLeafIcon: false }}
                                    blockNode
                                    treeData={transformTreeData(treeData)}
                                    expandedKeys={expandedKeys}
                                    onExpand={setExpandedKeys}
                                    onSelect={handleSelect}
                                    selectedKeys={selectedOrgUnit ? [selectedOrgUnit.key || selectedOrgUnit.id || ''] : []}
                                    titleRender={(node: any) => renderTreeTitle(node)}
                                />
                            ) : (
                                <Empty description="暂无部门数据" style={{ marginTop: 40 }} />
                            )}
                        </div>
                    </div>
                </Allotment.Pane>

                {/* 右侧：成员列表 */}
                <Allotment.Pane>
                    {selectedOrgUnit ? (
                        <AgGridPlus
                            gridRef={gridRef}
                            gridKey={`org-unit-members-${selectedOrgUnit.id}`}
                            headerTitle={`${selectedOrgUnit.displayName || selectedOrgUnit.title} - 成员列表`}
                            request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
                                if (!selectedOrgUnit?.id) {
                                    return { success: true, data: [], total: 0 };
                                }
                                const data = await OrganizationUnitGetUserListByOrganizationId({
                                    organizationId: selectedOrgUnit.id,
                                    sorting: params?.sorter,
                                });
                                const requestData: RequestData<any> = {
                                    success: true,
                                    data: data.items || [],
                                    total: data.totalCount || 0,
                                };
                                return requestData;
                            }}
                            columnDefs={memberColumnDefs}
                            toolBarRender={() => [
                                <AddMemberModal
                                    key="add-member"
                                    organizationUnitId={selectedOrgUnit.id!}
                                    onConfirm={refreshMembers}
                                    buttonProps={{ type: 'primary', icon: <UserAddOutlined /> }}
                                >
                                    添加成员
                                </AddMemberModal>,
                            ]}
                        />
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Empty description="请选择左侧部门查看成员" />
                        </div>
                    )}
                </Allotment.Pane>
            </Allotment>
        </div>
    );
};

OrganizationUnitsPage.title = '部门管理';

export default OrganizationUnitsPage;

export const routeProps = {
    name: '部门管理',
};
