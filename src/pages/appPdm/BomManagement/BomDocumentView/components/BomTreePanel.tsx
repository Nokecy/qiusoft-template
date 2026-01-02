import React from 'react';
import { Tree, Card, Empty, Skeleton } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import type { API } from '@/services/typings';
import { buildDocumentTreeData } from '../../_utils/documentViewUtils';

interface BomTreePanelProps {
    treeData: API.BurnAbpPdmBomManagementBomsBomItemTreeDto[];
    onSelect: (node: API.BurnAbpPdmBomManagementBomsBomItemTreeDto | null) => void;
    loading?: boolean;
}

const BomTreePanel: React.FC<BomTreePanelProps> = ({ treeData, onSelect, loading = false }) => {
    const handleSelect = (selectedKeys: React.Key[]) => {
        if (selectedKeys.length === 0) {
            onSelect(null);
            return;
        }

        const selectedId = Number(selectedKeys[0]);

        // 递归查找选中的节点
        const findNode = (
            nodes: API.BurnAbpPdmBomManagementBomsBomItemTreeDto[]
        ): API.BurnAbpPdmBomManagementBomsBomItemTreeDto | null => {
            for (const node of nodes) {
                if (node.id === selectedId) {
                    return node;
                }
                if (node.children && node.children.length > 0) {
                    const found = findNode(node.children);
                    if (found) return found;
                }
            }
            return null;
        };

        const selectedNode = findNode(treeData);
        onSelect(selectedNode);
    };

    if (loading) {
        return (
            <Card size="small" style={{ height: '100%' }}>
                <div style={{ padding: '12px 8px' }}>
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            </Card>
        );
    }

    if (treeData.length === 0) {
        return (
            <Card size="small" style={{ height: '100%' }}>
                <Empty
                    description={
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: 8, color: '#999', fontSize: 14 }}>暂无BOM数据</p>
                            <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>
                                <FolderOpenOutlined style={{ marginRight: 4 }} />
                                请在上方选择物料和版本后点击查询
                            </p>
                        </div>
                    }
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </Card>
        );
    }

    return (
        <Card
            title={<span style={{ fontSize: 14 }}>BOM结构树</span>}
            size="small"
            style={{ height: '100%', overflow: 'auto' }}
            bodyStyle={{ padding: 8 }}
        >
            <Tree
                treeData={buildDocumentTreeData(treeData)}
                onSelect={handleSelect}
                showLine
                defaultExpandAll
            />
        </Card>
    );
};

export default BomTreePanel;
