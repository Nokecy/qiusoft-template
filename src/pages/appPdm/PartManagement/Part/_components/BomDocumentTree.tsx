/**
 * BOM 关联文档树组件
 * 紧凑工业风格，使用 Tree 组件实现
 */

import React, { useMemo, useState, useCallback } from 'react';
import { Tree, Badge, Tag, Button, Space, Tooltip, Empty } from 'antd';
import {
  BoxPlotOutlined,
  FileTextOutlined,
  EyeOutlined,
  DownloadOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  StarFilled,
} from '@ant-design/icons';
import type { TreeProps, TreeDataNode } from 'antd';
import { history } from 'umi';
import type { BomDocumentTreeNode, BomDocumentItem } from '../types';
import './BomDocumentTree.less';

// 用途枚举配置
const USAGE_CONFIG: Record<number, { label: string; color: string }> = {
  10: { label: '2D图纸', color: 'blue' },
  20: { label: '3D模型', color: 'cyan' },
  30: { label: '作业指导', color: 'orange' },
  40: { label: '检验计划', color: 'green' },
  50: { label: '认证证书', color: 'purple' },
  60: { label: '安全数据', color: 'red' },
  70: { label: '包装规范', color: 'gold' },
  80: { label: '供应商', color: 'volcano' },
  90: { label: '技术规范', color: 'geekblue' },
  999: { label: '其他', color: 'default' },
};

interface BomDocumentTreeProps {
  data: BomDocumentTreeNode | null;
  loading?: boolean;
  onPreview?: (documentId: string) => void;
  onDownload?: (documentId: string) => void;
}

const BomDocumentTree: React.FC<BomDocumentTreeProps> = ({
  data,
  loading = false,
  onPreview,
  onDownload,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  // 获取用途配置
  const getUsageConfig = useCallback((usage?: number) => {
    return USAGE_CONFIG[usage || 999] || USAGE_CONFIG[999];
  }, []);

  // 跳转文档详情
  const handleViewDocument = useCallback((documentId?: string) => {
    if (documentId) {
      history.push(`/appPdm/DocumentManagement/Document/detail?id=${documentId}`);
    }
  }, []);

  // 渲染物料节点标题
  const renderMaterialTitle = useCallback((node: BomDocumentTreeNode, isRoot: boolean) => {
    const docCount = node.documents?.length || 0;
    return (
      <div className="bom-tree-material-node">
        <BoxPlotOutlined className="material-icon" />
        <span className="part-number">{node.partNumber}</span>
        <span className="part-name">{node.partName}</span>
        <Badge
          count={docCount}
          showZero
          size="small"
          className="doc-badge"
          style={{ backgroundColor: docCount > 0 ? '#52c41a' : '#d9d9d9' }}
        />
        {isRoot && <Tag color="blue" className="root-tag">当前物料</Tag>}
      </div>
    );
  }, []);

  // 处理预览
  const handlePreview = useCallback((e: React.MouseEvent, docId?: string) => {
    e.stopPropagation();
    if (docId) {
      if (onPreview) {
        onPreview(docId);
      } else {
        // 默认跳转到详情页
        handleViewDocument(docId);
      }
    }
  }, [onPreview, handleViewDocument]);

  // 处理下载
  const handleDownload = useCallback((e: React.MouseEvent, docId?: string) => {
    e.stopPropagation();
    if (docId && onDownload) {
      onDownload(docId);
    }
  }, [onDownload]);

  // 渲染文档节点标题
  const renderDocumentTitle = useCallback((doc: BomDocumentItem) => {
    const docId = doc.document?.id;
    const docNumber = doc.link?.documentNumber || doc.document?.documentNumber;
    const docName = doc.link?.documentName || doc.document?.name;
    const usage = doc.link?.usage;
    const isPrimary = doc.link?.isPrimary;
    const usageConfig = getUsageConfig(usage);

    return (
      <div className="bom-tree-document-node">
        <FileTextOutlined className="doc-icon" />
        <Tooltip title={docNumber}>
          <span className="doc-number" onClick={() => handleViewDocument(docId)}>
            {docNumber}
          </span>
        </Tooltip>
        <span className="doc-name">{docName}</span>
        <Tag color={usageConfig.color} className="usage-tag">{usageConfig.label}</Tag>
        {isPrimary && (
          <Tooltip title="主文档">
            <StarFilled className="primary-icon" />
          </Tooltip>
        )}
        <div className="doc-actions">
          <Tooltip title="预览">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={(e) => handlePreview(e, docId)}
            />
          </Tooltip>
          <Tooltip title="下载">
            <Button
              type="text"
              size="small"
              icon={<DownloadOutlined />}
              onClick={(e) => handleDownload(e, docId)}
            />
          </Tooltip>
        </div>
      </div>
    );
  }, [getUsageConfig, handleViewDocument, handlePreview, handleDownload]);

  // 转换数据为 Tree 组件格式
  const treeData = useMemo((): TreeDataNode[] => {
    if (!data) return [];

    const convertNode = (node: BomDocumentTreeNode, level: number, parentKey: string): TreeDataNode => {
      const nodeKey = node.bomPath || parentKey || 'root';
      const isRoot = level === 0;

      // 文档子节点
      const docChildren: TreeDataNode[] = (node.documents || []).map((doc, idx) => ({
        key: `${nodeKey}-doc-${idx}`,
        title: renderDocumentTitle(doc),
        isLeaf: true,
        className: 'document-tree-node',
      }));

      // 子物料节点
      const childNodes: TreeDataNode[] = (node.children || []).map((child, idx) =>
        convertNode(child, level + 1, `${nodeKey}-${idx}`)
      );

      return {
        key: nodeKey,
        title: renderMaterialTitle(node, isRoot),
        children: [...docChildren, ...childNodes],
        className: 'material-tree-node',
      };
    };

    return [convertNode(data, 0, '')];
  }, [data, renderDocumentTitle, renderMaterialTitle]);

  // 获取所有可展开的节点 key
  const allExpandableKeys = useMemo(() => {
    const keys: React.Key[] = [];
    const traverse = (nodes: TreeDataNode[]) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          keys.push(node.key);
          traverse(node.children);
        }
      });
    };
    traverse(treeData);
    return keys;
  }, [treeData]);

  // 默认全部展开
  React.useEffect(() => {
    if (data && allExpandableKeys.length > 0) {
      setExpandedKeys(allExpandableKeys);
    }
  }, [data, allExpandableKeys]);

  // 展开/折叠处理
  const handleExpand: TreeProps['onExpand'] = (keys) => {
    setExpandedKeys(keys);
  };

  const handleExpandAll = useCallback(() => {
    setExpandedKeys(allExpandableKeys);
  }, [allExpandableKeys]);

  const handleCollapseAll = useCallback(() => {
    setExpandedKeys([]);
  }, []);

  // 空状态
  if (!data) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={loading ? '加载中...' : '暂无 BOM 关联文档数据'}
        className="bom-tree-empty"
      />
    );
  }

  return (
    <div className="bom-document-tree-wrapper">
      {/* 工具栏 */}
      <div className="bom-tree-toolbar">
        <Space size="small">
          <Button
            size="small"
            icon={<PlusSquareOutlined />}
            onClick={handleExpandAll}
          >
            全部展开
          </Button>
          <Button
            size="small"
            icon={<MinusSquareOutlined />}
            onClick={handleCollapseAll}
          >
            全部折叠
          </Button>
        </Space>
        <span className="tree-stats">
          共 {allExpandableKeys.length} 个物料节点
        </span>
      </div>

      {/* 树组件 */}
      <Tree
        className="bom-document-tree"
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={handleExpand}
        showLine={{ showLeafIcon: false }}
        blockNode
        selectable={false}
      />
    </div>
  );
};

export default BomDocumentTree;
