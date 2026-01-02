/**
 * 关联文档管理组件 - 物料详情页专用
 * 封装公共组件 PartDocumentsPanel，添加物料详情页特有功能
 */

import React from 'react';
import { Button, Space, Badge } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Access } from 'umi';
import { PartDocumentsPanel } from '@/pages/appPdm/_components';
import type { BomDocumentTreeNode } from '@/pages/appPdm/_components';

interface DocumentsSectionProps {
  bomDocumentTree: BomDocumentTreeNode | null;
  bomDocumentLoading: boolean;
  canUpdate: boolean;
  formatDate: (date?: string, format?: 'date' | 'datetime' | 'short') => string;
  getDocumentUsageText: (usage?: number) => string;
  onAddDocumentLink: () => void;
  onLoadBomDocuments: () => void;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  bomDocumentTree,
  bomDocumentLoading,
  canUpdate,
  onAddDocumentLink,
  onLoadBomDocuments,
}) => {
  // 统计总文档数
  const countDocuments = (node: BomDocumentTreeNode | null): number => {
    if (!node) return 0;
    const docCount = node.documents?.length || 0;
    const childCount = node.children?.reduce((sum, child) => sum + countDocuments(child), 0) || 0;
    return docCount + childCount;
  };

  const totalDocuments = countDocuments(bomDocumentTree);

  return (
    <div className="detail-section">
      {/* 标题栏 */}
      <div className="section-header">
        <Space>
          <h3>关联文档</h3>
          <Badge
            count={totalDocuments}
            style={{ backgroundColor: '#13c2c2' }}
          />
        </Space>
        <Access accessible={canUpdate}>
          <Button type="primary" size="small" icon={<CloudUploadOutlined />} onClick={onAddDocumentLink}>
            关联文档
          </Button>
        </Access>
      </div>

      {/* 文档面板 */}
      <PartDocumentsPanel
        bomDocumentTree={bomDocumentTree}
        loading={bomDocumentLoading}
        showHeader={false}
        showSourceColumn={true}
        showAddButton={false}
        onLoadData={onLoadBomDocuments}
        defaultViewMode="flat"
      />
    </div>
  );
};

export default DocumentsSection;
