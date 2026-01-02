/**
 * 物料关联文档面板 - PDM 公共组件
 * 支持平面列表视图和 BOM 树形视图
 * 可用于物料详情页和 BOM 子项详情
 */

import React, { useMemo, useState, useCallback } from 'react';
import {
  Button, Space, Badge, Spin, Empty, Tooltip,
  Segmented, Select, Radio, Tag, Row, Col
} from 'antd';
import {
  CloudUploadOutlined, EyeOutlined, DownloadOutlined,
  UnorderedListOutlined, ApartmentOutlined, FileTextOutlined,
  StarFilled, BoxPlotOutlined
} from '@ant-design/icons';
import { history, Access } from 'umi';
import { AgGridPlus } from '@/components/agGrid';
import type { ColDef } from 'ag-grid-community';
import BomDocumentTree from './BomDocumentTree';
import type { BomDocumentTreeNode, BomDocumentItem } from './types';

// 用途枚举配置
const USAGE_OPTIONS = [
  { label: '2D设计图纸', value: 10, color: 'blue' },
  { label: '3D设计模型', value: 20, color: 'cyan' },
  { label: '作业指导书', value: 30, color: 'orange' },
  { label: '检验计划', value: 40, color: 'green' },
  { label: '认证证书', value: 50, color: 'purple' },
  { label: '安全数据表', value: 60, color: 'red' },
  { label: '包装规范', value: 70, color: 'gold' },
  { label: '供应商文档', value: 80, color: 'volcano' },
  { label: '技术规范', value: 90, color: 'geekblue' },
  { label: '其他', value: 999, color: 'default' },
];

// 扩展的文档项类型，包含来源物料信息和层级
interface FlatDocumentItem extends BomDocumentItem {
  sourcePartNumber?: string;
  sourcePartName?: string;
  isCurrentPart?: boolean;
  bomLevel?: number;
  bomPath?: string;
}

interface PartDocumentsPanelProps {
  /** BOM 文档树数据 */
  bomDocumentTree: BomDocumentTreeNode | null;
  /** 加载状态 */
  loading: boolean;
  /** 是否显示关联文档按钮 */
  showAddButton?: boolean;
  /** 是否可以编辑（用于权限控制） */
  canUpdate?: boolean;
  /** 关联文档按钮点击事件 */
  onAddDocumentLink?: () => void;
  /** 数据加载回调（首次加载时调用） */
  onLoadData?: () => void;
  /** 是否显示标题栏 */
  showHeader?: boolean;
  /** 自定义标题 */
  title?: string;
  /** 是否显示来源物料列（BOM子项详情中可隐藏） */
  showSourceColumn?: boolean;
  /** 默认视图模式 */
  defaultViewMode?: 'flat' | 'tree';
  /** 容器样式类名 */
  className?: string;
}

const PartDocumentsPanel: React.FC<PartDocumentsPanelProps> = ({
  bomDocumentTree,
  loading,
  showAddButton = false,
  canUpdate = false,
  onAddDocumentLink,
  onLoadData,
  showHeader = true,
  title = '关联文档',
  showSourceColumn = true,
  defaultViewMode = 'flat',
  className,
}) => {
  const [viewMode, setViewMode] = useState<'flat' | 'tree'>(defaultViewMode);
  const [usageFilter, setUsageFilter] = useState<number[]>([]);
  const [primaryFilter, setPrimaryFilter] = useState<'all' | 'primary'>('all');

  // 格式化日期
  const formatDate = useCallback((date?: string, format: 'date' | 'datetime' | 'short' = 'datetime'): string => {
    if (!date) return '-';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    switch (format) {
      case 'date':
        return `${year}-${month}-${day}`;
      case 'short':
        return `${month}-${day} ${hours}:${minutes}`;
      case 'datetime':
      default:
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  }, []);

  // 获取用途文本
  const getDocumentUsageText = useCallback((usage?: number): string => {
    const found = USAGE_OPTIONS.find(opt => opt.value === usage);
    return found?.label || '其他';
  }, []);

  // 获取用途颜色
  const getUsageColor = useCallback((usage?: number): string => {
    const found = USAGE_OPTIONS.find(opt => opt.value === usage);
    return found?.color || 'default';
  }, []);

  // 递归收集 BOM 树中所有文档
  const collectAllDocuments = useCallback((
    node: BomDocumentTreeNode,
    level: number = 0,
    parentPath: string = ''
  ): FlatDocumentItem[] => {
    const results: FlatDocumentItem[] = [];
    const currentPath = parentPath ? `${parentPath} > ${node.partNumber}` : node.partNumber || '';

    if (node.documents) {
      node.documents.forEach(doc => {
        results.push({
          ...doc,
          sourcePartNumber: node.partNumber,
          sourcePartName: node.partName,
          isCurrentPart: level === 0,
          bomLevel: level,
          bomPath: currentPath,
        });
      });
    }

    if (node.children) {
      node.children.forEach(child => {
        results.push(...collectAllDocuments(child, level + 1, currentPath));
      });
    }

    return results;
  }, []);

  // 平面文档数据
  const flatDocumentData = useMemo((): FlatDocumentItem[] => {
    if (!bomDocumentTree) return [];
    return collectAllDocuments(bomDocumentTree, 0, '');
  }, [bomDocumentTree, collectAllDocuments]);

  // 过滤后的平面数据
  const filteredFlatData = useMemo(() => {
    return flatDocumentData.filter(doc => {
      const usageMatch = usageFilter.length === 0 || usageFilter.includes(doc.link?.usage || 0);
      const primaryMatch = primaryFilter === 'all' || doc.link?.isPrimary;
      return usageMatch && primaryMatch;
    });
  }, [flatDocumentData, usageFilter, primaryFilter]);

  // 递归过滤树形数据
  const filterTreeNode = useCallback((node: BomDocumentTreeNode): BomDocumentTreeNode | null => {
    const filteredDocs = node.documents?.filter(item => {
      const usageMatch = usageFilter.length === 0 || usageFilter.includes(item.link?.usage || 0);
      const primaryMatch = primaryFilter === 'all' || item.link?.isPrimary;
      return usageMatch && primaryMatch;
    });

    const filteredChildren = node.children
      ?.map(child => filterTreeNode(child))
      .filter((child): child is BomDocumentTreeNode => child !== null);

    const isRoot = !node.bomPath;
    if (isRoot) {
      return {
        ...node,
        documents: filteredDocs || [],
        children: filteredChildren,
      };
    }

    if ((filteredDocs && filteredDocs.length > 0) || (filteredChildren && filteredChildren.length > 0)) {
      return {
        ...node,
        documents: filteredDocs,
        children: filteredChildren,
      };
    }

    return null;
  }, [usageFilter, primaryFilter]);

  const filteredTreeData = useMemo(() => {
    if (!bomDocumentTree) return null;
    return filterTreeNode(bomDocumentTree);
  }, [bomDocumentTree, filterTreeNode]);

  // 视图切换
  const handleViewChange = useCallback((value: 'flat' | 'tree') => {
    setViewMode(value);
    if (!bomDocumentTree && !loading && onLoadData) {
      onLoadData();
    }
  }, [bomDocumentTree, loading, onLoadData]);

  // 初始加载
  const initialLoadRef = React.useRef(false);
  React.useEffect(() => {
    if (!initialLoadRef.current && !bomDocumentTree && !loading && onLoadData) {
      initialLoadRef.current = true;
      onLoadData();
    }
  }, [bomDocumentTree, loading, onLoadData]);

  // 跳转文档详情
  const handleViewDocument = useCallback((docId?: string) => {
    if (docId) {
      history.push(`/appPdm/DocumentManagement/Document/detail?id=${docId}`);
    }
  }, []);

  // 层级显示
  const getLevelDisplay = useCallback((level?: number) => {
    if (level === undefined) return { text: '-', color: 'default' };
    if (level === 0) return { text: 'L0', color: '#1890ff' };
    if (level === 1) return { text: 'L1', color: '#52c41a' };
    if (level === 2) return { text: 'L2', color: '#faad14' };
    if (level === 3) return { text: 'L3', color: '#fa8c16' };
    return { text: `L${level}`, color: '#8c8c8c' };
  }, []);

  // 列定义
  const columnDefs: ColDef<FlatDocumentItem>[] = useMemo(() => {
    const cols: ColDef<FlatDocumentItem>[] = [];

    // 层级列
    cols.push({
      headerName: '层级',
      field: 'bomLevel',
      width: 70,
      cellRenderer: (params: any) => {
        const { text, color } = getLevelDisplay(params.value);
        return (
          <Tag
            style={{
              margin: 0,
              fontSize: 11,
              fontWeight: 600,
              minWidth: 28,
              textAlign: 'center',
              color: color,
              borderColor: color,
              backgroundColor: `${color}10`,
            }}
          >
            {text}
          </Tag>
        );
      }
    });

    // 来源物料列（可选）
    if (showSourceColumn) {
      cols.push({
        headerName: '来源物料',
        field: 'sourcePartNumber',
        width: 200,
        cellRenderer: (params: any) => {
          const record = params.data as FlatDocumentItem;
          return (
            <Tooltip title={record.bomPath}>
              <Space size={4}>
                <BoxPlotOutlined style={{ color: record.isCurrentPart ? '#1890ff' : '#8c8c8c' }} />
                <span style={{ color: record.isCurrentPart ? '#1890ff' : undefined }}>
                  {record.sourcePartNumber}
                </span>
                <span style={{ color: '#8c8c8c', fontSize: 12 }}>
                  {record.sourcePartName}
                </span>
              </Space>
            </Tooltip>
          );
        }
      });
    }

    // 文档编号列
    cols.push({
      headerName: '文档编号',
      field: 'link.documentNumber',
      width: 150,
      cellRenderer: (params: any) => {
        const record = params.data as FlatDocumentItem;
        const docNumber = record.link?.documentNumber || record.document?.documentNumber;
        return (
          <Space>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <a
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => handleViewDocument(record.document?.id)}
            >
              {docNumber}
            </a>
          </Space>
        );
      }
    });

    // 文档名称列
    cols.push({
      headerName: '文档名称',
      field: 'link.documentName',
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => {
        const record = params.data as FlatDocumentItem;
        return record.link?.documentName || record.document?.name;
      }
    });

    // 用途列
    cols.push({
      headerName: '用途',
      field: 'link.usage',
      width: 110,
      cellRenderer: (params: any) => {
        const usage = params.value;
        return <Tag color={getUsageColor(usage)}>{getDocumentUsageText(usage)}</Tag>;
      }
    });

    // 主文档列
    cols.push({
      headerName: '主文档',
      field: 'link.isPrimary',
      width: 70,
      cellRenderer: (params: any) => {
        return params.value ? <StarFilled style={{ color: '#faad14' }} /> : '-';
      }
    });

    // 关联时间列
    cols.push({
      headerName: '关联时间',
      field: 'link.creationTime',
      width: 140,
      valueFormatter: (params) => formatDate(params.value, 'datetime')
    });

    // 操作列
    cols.push({
      headerName: '操作',
      width: 90,
      pinned: 'right',
      cellRenderer: (params: any) => {
        const record = params.data as FlatDocumentItem;
        return (
          <Space size={4}>
            <Tooltip title="预览">
              <Button
                type="link"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewDocument(record.document?.id)}
              />
            </Tooltip>
            <Tooltip title="下载">
              <Button
                type="link"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => {
                  // TODO: 实现下载功能
                }}
              />
            </Tooltip>
          </Space>
        );
      }
    });

    return cols;
  }, [formatDate, getDocumentUsageText, getUsageColor, getLevelDisplay, handleViewDocument, showSourceColumn]);

  // 视图切换控件
  const viewSwitcher = (
    <Segmented
      size="small"
      value={viewMode}
      onChange={(v) => handleViewChange(v as 'flat' | 'tree')}
      options={[
        {
          label: (
            <Tooltip title="平面列表视图 - 展示所有 BOM 层级的文档">
              <Space size={4}>
                <UnorderedListOutlined />
                列表
              </Space>
            </Tooltip>
          ),
          value: 'flat',
        },
        {
          label: (
            <Tooltip title="BOM 树形视图 - 按物料层级展示关联文档">
              <Space size={4}>
                <ApartmentOutlined />
                BOM树
              </Space>
            </Tooltip>
          ),
          value: 'tree',
        },
      ]}
    />
  );

  return (
    <div className={className}>
      {/* 标题栏 */}
      {showHeader && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Space>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{title}</h3>
            <Badge
              count={filteredFlatData.length}
              style={{ backgroundColor: '#13c2c2' }}
            />
          </Space>
          <Space>
            {viewSwitcher}
            {showAddButton && (
              <Access accessible={canUpdate}>
                <Button type="primary" size="small" icon={<CloudUploadOutlined />} onClick={onAddDocumentLink}>
                  关联文档
                </Button>
              </Access>
            )}
          </Space>
        </div>
      )}

      {/* 筛选工具栏 */}
      <Row gutter={16} style={{ marginBottom: 12 }}>
        <Col flex="auto">
          <Space size="middle">
            {/* 当标题栏隐藏时，在筛选栏显示视图切换 */}
            {!showHeader && viewSwitcher}
            <Select
              mode="multiple"
              placeholder="筛选文档用途"
              style={{ minWidth: 200 }}
              maxTagCount={2}
              allowClear
              size="small"
              options={USAGE_OPTIONS.map(opt => ({ label: opt.label, value: opt.value }))}
              value={usageFilter}
              onChange={setUsageFilter}
            />
            <Radio.Group
              size="small"
              value={primaryFilter}
              onChange={e => setPrimaryFilter(e.target.value)}
            >
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="primary">
                <StarFilled style={{ color: '#faad14', marginRight: 4 }} />
                主文档
              </Radio.Button>
            </Radio.Group>
          </Space>
        </Col>
      </Row>

      {/* 内容区域 */}
      {viewMode === 'flat' ? (
        <Spin spinning={loading}>
          {filteredFlatData.length > 0 ? (
            <AgGridPlus
              columnDefs={columnDefs}
              rowData={filteredFlatData}
              loading={loading}
              pagination
              paginationPageSize={10}
              domLayout="autoHeight"
              search={false}
              getRowId={(params) => `${params.data.sourcePartNumber}-${params.data.link?.id || params.data.document?.id || Math.random().toString()}`}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={loading ? '加载中...' : '暂无关联文档'}
              style={{ padding: '40px 0' }}
            />
          )}
        </Spin>
      ) : (
        <Spin spinning={loading}>
          <BomDocumentTree
            data={filteredTreeData}
            loading={loading}
          />
        </Spin>
      )}
    </div>
  );
};

export default PartDocumentsPanel;
