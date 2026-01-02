import React, { useState } from 'react';
import { Card, Tree, Table, Space, Empty, Segmented, Skeleton } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined, SearchOutlined } from '@ant-design/icons';
import type { API } from '@/services/typings';
import type { DataNode } from 'antd/es/tree';
import type { ColumnsType } from 'antd/es/table';

interface ResultViewProps {
    data: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[];
    loading?: boolean;
}

const ResultView: React.FC<ResultViewProps> = ({ data, loading = false }) => {
    const [viewMode, setViewMode] = useState<'tree' | 'table'>('tree');

    // 构建树形数据 - 修复版：正确构建层级关系
    const buildTreeData = (): DataNode[] => {
        // 按层级分组
        const grouped = new Map<number, API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]>();
        data.forEach((item) => {
            const level = item.level || 0;
            if (!grouped.has(level)) {
                grouped.set(level, []);
            }
            grouped.get(level)!.push(item);
        });

        // 从第一层开始构建
        const level1Items = grouped.get(1) || [];
        return level1Items.map((item) => buildTreeNode(item, grouped));
    };

    // 递归构建树节点
    const buildTreeNode = (
        item: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto,
        grouped: Map<number, API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]>
    ): DataNode => {
        const currentLevel = item.level || 0;
        const nextLevel = currentLevel + 1;
        const nextLevelItems = grouped.get(nextLevel) || [];

        // 查找下一层级中，childMaterialCode 匹配当前节点 materialCode 的项
        const children = nextLevelItems
            .filter((child) => child.childMaterialCode === item.materialCode)
            .map((child) => buildTreeNode(child, grouped));

        return {
            key: `${item.id}-${item.level}`,
            title: (
                <div style={{ padding: '4px 0' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            minWidth: 35,
                            color: '#999',
                            fontSize: 12,
                            fontFamily: 'monospace',
                        }}
                    >
                        L{item.level}
                    </span>
                    <strong style={{ color: '#1890ff', marginLeft: 8 }}>{item.materialCode}</strong>
                    <span style={{ marginLeft: 8, color: '#262626' }}>{item.materialDescription}</span>
                    <span style={{ marginLeft: 12, color: '#8c8c8c', fontSize: 12 }}>
                        版本: {item.version}
                    </span>
                    <span style={{ marginLeft: 8, color: '#8c8c8c', fontSize: 12 }}>
                        用量: {item.quantity} {item.unitOfMeasure}
                    </span>
                </div>
            ),
            children: children.length > 0 ? children : undefined,
        };
    };

    // 构建 BOM 路径
    const buildBomPath = (item: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto): string => {
        const currentLevel = item.level || 1;
        const path: string[] = [];

        // 从当前层级向上查找父级
        let currentItem = item;
        for (let level = currentLevel; level >= 1; level--) {
            path.unshift(currentItem.materialCode || '');

            if (level > 1 && currentItem.childMaterialCode) {
                // 查找上一层的父项（childMaterialCode 是连接到上层的桥梁）
                const parentLevel = level - 1;
                const parentItems = data.filter((d) => d.level === parentLevel);
                const parent = parentItems.find((p) => p.materialCode === currentItem.childMaterialCode);
                if (parent) {
                    currentItem = parent;
                }
            }
        }

        return path.join(' → ');
    };

    // 表格列定义
    const columns: ColumnsType<API.BurnAbpPdmBomManagementBomsBomReverseLookupDto> = [
        {
            title: '层级',
            dataIndex: 'level',
            key: 'level',
            width: 70,
            fixed: 'left',
            render: (level: number) => (
                <span style={{ fontFamily: 'monospace', color: '#595959' }}>L{level}</span>
            ),
        },
        {
            title: 'BOM路径',
            key: 'path',
            width: 280,
            fixed: 'left',
            render: (_: any, record: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto) => (
                <div
                    style={{
                        fontSize: 12,
                        color: '#595959',
                        fontFamily: 'monospace',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    title={buildBomPath(record)}
                >
                    {buildBomPath(record)}
                </div>
            ),
        },
        {
            title: '父项物料编码',
            dataIndex: 'materialCode',
            key: 'materialCode',
            width: 150,
            render: (text: string) => <strong style={{ color: '#1890ff' }}>{text}</strong>,
        },
        {
            title: '父项物料描述',
            dataIndex: 'materialDescription',
            key: 'materialDescription',
            ellipsis: true,
            width: 200,
        },
        {
            title: '版本',
            dataIndex: 'version',
            key: 'version',
            width: 90,
        },
        {
            title: '用量',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 80,
            align: 'right',
        },
        {
            title: '单位',
            dataIndex: 'unitOfMeasure',
            key: 'unitOfMeasure',
            width: 70,
        },
        {
            title: '生效日期',
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            width: 110,
            render: (date: string) => date?.substring(0, 10),
        },
        {
            title: '失效日期',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            width: 110,
            render: (date: string) => date?.substring(0, 10),
        },
    ];

    if (loading) {
        return (
            <Card size="small">
                <Skeleton active paragraph={{ rows: 8 }} />
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card size="small">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: 8, color: '#999', fontSize: 14 }}>暂无查询结果</p>
                            <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>
                                <SearchOutlined style={{ marginRight: 4 }} />
                                请在上方输入物料编码进行查询
                            </p>
                        </div>
                    }
                />
            </Card>
        );
    }

    return (
        <Card
            size="small"
            title={
                <Space size="small">
                    <span style={{ fontSize: 14 }}>查询结果</span>
                    <Segmented
                        size="small"
                        value={viewMode}
                        onChange={(value) => setViewMode(value as 'tree' | 'table')}
                        options={[
                            { label: '树状', value: 'tree', icon: <AppstoreOutlined /> },
                            { label: '列表', value: 'table', icon: <UnorderedListOutlined /> },
                        ]}
                    />
                </Space>
            }
        >
            {viewMode === 'tree' ? (
                <Tree
                    treeData={buildTreeData()}
                    defaultExpandAll
                    showLine
                    style={{ marginTop: 8 }}
                />
            ) : (
                <Table
                    size="small"
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 20, size: 'small', showSizeChanger: true }}
                    scroll={{ x: 1000 }}
                />
            )}
        </Card>
    );
};

export default ResultView;
