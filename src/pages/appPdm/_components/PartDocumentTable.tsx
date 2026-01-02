/**
 * 物料关联文档列表组件 - PDM 公共组件
 * 用于展示物料的关联文档列表，支持在 BOM 子项详情、物料详情等多处复用
 */

import React, { useMemo, useCallback } from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { Tag, Empty, Skeleton, Space, Button, Tooltip } from 'antd';
import { FileTextOutlined, EyeOutlined, DownloadOutlined, StarFilled } from '@ant-design/icons';
import { history } from 'umi';
import type { API } from '@/services/typings';
import type { ColDef } from 'ag-grid-community';

// 用途枚举配置
const USAGE_OPTIONS: Record<number, { label: string; color: string }> = {
  10: { label: '2D设计图纸', color: 'blue' },
  20: { label: '3D设计模型', color: 'cyan' },
  30: { label: '作业指导书', color: 'orange' },
  40: { label: '检验计划', color: 'green' },
  50: { label: '认证证书', color: 'purple' },
  60: { label: '安全数据表', color: 'red' },
  70: { label: '包装规范', color: 'gold' },
  80: { label: '供应商文档', color: 'volcano' },
  90: { label: '技术规范', color: 'geekblue' },
  999: { label: '其他', color: 'default' },
};

interface PartDocumentTableProps {
  /** 文档列表数据 */
  documents: API.BurnAbpPdmPartManagementPartDocumentLinksPartDocumentLinkDto[];
  /** 加载状态 */
  loading?: boolean;
  /** 是否显示物料列（在单物料场景下可隐藏） */
  showPartColumn?: boolean;
  /** 空状态提示文字 */
  emptyText?: string;
  /** 分页大小 */
  pageSize?: number;
  /** 是否启用操作列 */
  showActions?: boolean;
}

const PartDocumentTable: React.FC<PartDocumentTableProps> = ({
  documents,
  loading = false,
  showPartColumn = false,
  emptyText = '暂无关联文档',
  pageSize = 10,
  showActions = true,
}) => {
  // 获取用途配置
  const getUsageConfig = useCallback((usage?: number) => {
    return USAGE_OPTIONS[usage || 999] || USAGE_OPTIONS[999];
  }, []);

  // 跳转到文档详情
  const handleViewDocument = useCallback((documentId?: string) => {
    if (documentId) {
      history.push(`/appPdm/DocumentManagement/Document/detail?id=${documentId}`);
    }
  }, []);

  const columnDefs: ColDef[] = useMemo(() => {
    const cols: ColDef[] = [];

    // 物料列（可选）
    if (showPartColumn) {
      cols.push(
        {
          headerName: '物料编号',
          field: 'partNumber',
          width: 140,
          cellRenderer: ({ value }: any) => (
            <strong style={{ color: '#1890ff' }}>{value}</strong>
          ),
        },
        {
          headerName: '物料名称',
          field: 'partName',
          width: 160,
        }
      );
    }

    // 文档列
    cols.push(
      {
        headerName: '文档编号',
        field: 'documentNumber',
        width: 140,
        cellRenderer: ({ value, data }: any) => (
          <Space size={4}>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <a
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => handleViewDocument(data?.documentId)}
            >
              {value}
            </a>
          </Space>
        ),
      },
      {
        headerName: '文档名称',
        field: 'documentName',
        flex: 1,
        minWidth: 150,
      },
      {
        headerName: '用途',
        field: 'usage',
        width: 100,
        cellRenderer: ({ value }: any) => {
          const config = getUsageConfig(value);
          return <Tag color={config.color}>{config.label}</Tag>;
        },
      },
      {
        headerName: '主文档',
        field: 'isPrimary',
        width: 70,
        cellRenderer: ({ value }: any) =>
          value ? <StarFilled style={{ color: '#faad14' }} /> : '-',
      }
    );

    // 操作列（可选）
    if (showActions) {
      cols.push({
        headerName: '操作',
        width: 90,
        pinned: 'right',
        cellRenderer: ({ data }: any) => (
          <Space size={4}>
            <Tooltip title="预览">
              <Button
                type="link"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => handleViewDocument(data?.documentId)}
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
        ),
      });
    }

    return cols;
  }, [showPartColumn, showActions, getUsageConfig, handleViewDocument]);

  if (loading) {
    return (
      <div style={{ padding: 16 }}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <Empty
          description={
            <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: 8, color: '#999', fontSize: 14 }}>{emptyText}</p>
              <p style={{ fontSize: 12, color: '#bbb', margin: 0 }}>
                <FileTextOutlined style={{ marginRight: 4 }} />
                可通过关联文档功能添加
              </p>
            </div>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <AgGridPlus
      columnDefs={columnDefs}
      rowData={documents}
      loading={loading}
      pagination
      paginationPageSize={pageSize}
      domLayout="autoHeight"
      search={false}
      getRowId={(params) => params.data?.id || Math.random().toString()}
    />
  );
};

export default PartDocumentTable;
