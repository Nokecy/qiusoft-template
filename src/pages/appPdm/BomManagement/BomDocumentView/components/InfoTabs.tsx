import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, message } from 'antd';
import type { API } from '@/services/typings';
import MaterialSummaryCard from './MaterialSummaryCard';
import BomRelationTable from './BomRelationTable';
import { PartDocumentsPanel, type BomDocumentTreeNode } from '@/pages/appPdm/_components';
import { PartDocumentLinkGetDocumentsByPartAsync } from '@/services/pdm/PartDocumentLink';
import {
    BomGetDirectChildrenAsync,
    BomGetDirectParentsAsync,
    BomGetTopLevelParentsAsync
} from '@/services/pdm/Bom';

interface InfoTabsProps {
    selectedNode: API.BurnAbpPdmBomManagementBomsBomItemTreeDto | null;
    loading?: boolean;
}

const InfoTabs: React.FC<InfoTabsProps> = ({ selectedNode, loading = false }) => {
    const [bomDocumentTree, setBomDocumentTree] = useState<BomDocumentTreeNode | null>(null);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // 加载文档树数据
    const loadDocuments = useCallback(async (partNumber: string) => {
        if (!partNumber) return;
        setLoadingDocs(true);
        try {
            const result = await PartDocumentLinkGetDocumentsByPartAsync({
                PartNumber: partNumber,
                IncludeBomChildren: false, // BOM文档视图中选中单个节点，不递归子项
            });

            if (!result) {
                setBomDocumentTree(null);
                setLoaded(true);
                return;
            }

            // 转换 API 响应为前端类型
            const transformNode = (apiNode: any): BomDocumentTreeNode => ({
                bomItemId: apiNode.bomItemId,
                bomPath: apiNode.bomPath,
                partNumber: apiNode.partNumber,
                partName: apiNode.partName,
                documents: apiNode.documents?.map((doc: any) => ({
                    link: doc.link,
                    document: doc.document,
                })),
                children: apiNode.children?.map(transformNode),
            });

            setBomDocumentTree(transformNode(result));
            setLoaded(true);
        } catch (error) {
            console.error('加载文档失败:', error);
            message.error('加载文档失败');
            setBomDocumentTree(null);
            setLoaded(false);
        } finally {
            setLoadingDocs(false);
        }
    }, []);

    // 当选中节点变化时，重置状态并加载新数据
    useEffect(() => {
        if (!selectedNode?.childMaterialCode) {
            setBomDocumentTree(null);
            setLoaded(false);
            return;
        }

        // 重置状态
        setBomDocumentTree(null);
        setLoaded(false);

        // 加载新数据
        loadDocuments(selectedNode.childMaterialCode);
    }, [selectedNode?.childMaterialCode, loadDocuments]);

    // 统计文档数量
    const countDocuments = (node: BomDocumentTreeNode | null): number => {
        if (!node) return 0;
        const docCount = node.documents?.length || 0;
        const childCount = node.children?.reduce((sum, child) => sum + countDocuments(child), 0) || 0;
        return docCount + childCount;
    };

    const totalDocuments = countDocuments(bomDocumentTree);

    const materialCode = selectedNode?.childMaterialCode;
    // 使用 childMaterialVersion，如果是根节点可能需要 falling back to version field if present, but the tree dto usually uses childMaterialVersion for the item displayed
    const bomVersion = selectedNode?.childMaterialVersion || selectedNode?.version;

    // 构建 Tab Items
    const items = [
        {
            key: 'documents',
            label: `文档列表 (${totalDocuments})`,
            children: (
                <PartDocumentsPanel
                    bomDocumentTree={bomDocumentTree}
                    loading={loadingDocs}
                    showHeader={false}
                    showSourceColumn={false}
                    showAddButton={false}
                    defaultViewMode="flat"
                />
            ),
        },
        {
            key: 'material',
            label: '物料概要',
            children: <MaterialSummaryCard node={selectedNode} />,
        },
        {
            key: 'children',
            label: '子项',
            children: (
                <BomRelationTable
                    request={BomGetDirectChildrenAsync}
                    params={materialCode ? { materialCode, bomVersion } : undefined}
                />
            ),
        },
        {
            key: 'parents',
            label: '父项',
            children: (
                <BomRelationTable
                    request={BomGetDirectParentsAsync}
                    params={materialCode ? { materialCode } : undefined}
                    showLevel
                />
            ),
        },
        {
            key: 'toplevel',
            label: '顶级父项',
            children: (
                <BomRelationTable
                    request={BomGetTopLevelParentsAsync}
                    params={materialCode ? { materialCode } : undefined}
                    showLevel
                />
            ),
        },
        {
            key: 'lifecycle',
            label: '生命周期',
            children: (
                <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>
                    生命周期信息功能开发中...
                </div>
            ),
        },
    ];

    return <Tabs defaultActiveKey="documents" items={items} />;
};

export default InfoTabs;
