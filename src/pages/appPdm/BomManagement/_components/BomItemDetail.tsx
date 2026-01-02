/**
 * BOM 子项详细信息面板 - 详情页面右侧
 * 支持多个 Tab 显示不同维度的信息
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Tabs,
  Space,
  Button,
  Descriptions,
  Typography,
  Empty,
  Divider,
  Badge,
  Row,
  Col,
  Tooltip,
} from 'antd';
import { EditOutlined, DeleteOutlined, FileTextOutlined, HistoryOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import dayjs from 'dayjs';
import type { BurnAbpPdmBomManagementBomsBomItemDto } from '@/services/pdm/typings';
import { BOM_PERMISSIONS } from '../_permissions';
import { bomItemActivationStatusMap } from '../_enums/bomEnums';
import { PartDocumentLinkGetDocumentsByPartAsync } from '@/services/pdm/PartDocumentLink';
import { PartDocumentsPanel, type BomDocumentTreeNode } from '@/pages/appPdm/_components';

interface BomItemDetailProps {
  item: BurnAbpPdmBomManagementBomsBomItemDto | null;
  onEdit?: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  onDelete?: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  loading?: boolean;
  allItems?: BurnAbpPdmBomManagementBomsBomItemDto[];
}

const BomItemDetail: React.FC<BomItemDetailProps> = ({
  item,
  onEdit,
  onDelete,
  loading = false,
  allItems = [],
}) => {
  const access = useAccess();
  const [activeTab, setActiveTab] = useState('basic');

  // BOM 文档树数据状态
  const [bomDocumentTree, setBomDocumentTree] = useState<BomDocumentTreeNode | null>(null);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsLoaded, setDocumentsLoaded] = useState(false);

  // 加载物料的关联文档（BOM 树形结构）
  const loadBomDocuments = useCallback(async (partNumber: string) => {
    if (!partNumber) return;
    setDocumentsLoading(true);
    try {
      const result = await PartDocumentLinkGetDocumentsByPartAsync({ partNumber });
      setBomDocumentTree(result as BomDocumentTreeNode);
      setDocumentsLoaded(true);
    } catch (error) {
      console.error('加载关联文档失败:', error);
      setBomDocumentTree(null);
    } finally {
      setDocumentsLoading(false);
    }
  }, []);

  // 当选中的 item 变化时，重置文档加载状态，并在文档Tab时立即重新加载
  useEffect(() => {
    setDocumentsLoaded(false);
    setBomDocumentTree(null);
    // 如果当前在文档Tab，立即加载新选中项的文档
    if (activeTab === 'document' && item?.childMaterialCode) {
      loadBomDocuments(item.childMaterialCode);
    }
  }, [item?.id, item?.childMaterialCode]);

  // 当切换到文档 Tab 且未加载过数据时，触发加载
  useEffect(() => {
    if (activeTab === 'document' && item?.childMaterialCode && !documentsLoaded) {
      loadBomDocuments(item.childMaterialCode);
    }
  }, [activeTab, item?.childMaterialCode, documentsLoaded, loadBomDocuments]);

  if (!item) {
    return (
      <Card
        style={{
          height: 'calc(100vh - 280px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请从左侧树形结构中选择一个子项"
        />
      </Card>
    );
  }

  const statusInfo = bomItemActivationStatusMap.find((s) => s.value === item.activationStatus);

  // 判断是否为根节点（第一层节点），根节点不能删除
  const isFirstLevelNode = !item.parentItemId;
  const canDelete = !isFirstLevelNode;

  // Tab 配置
  const tabItems = [
    {
      key: 'basic',
      label: (
        <span>
          <InfoCircleOutlined />
          基本信息
        </span>
      ),
      children: (
        <div style={{ padding: '8px 0' }}>
          {/* 物料信息 - 紧凑布局 */}
          <div style={{ marginBottom: 16 }}>
            <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: 14, color: '#1890ff' }}>
              物料信息
            </Typography.Title>
            <Descriptions column={2} size="small" colon={false} labelStyle={{ width: 80, color: '#8c8c8c' }}>
              <Descriptions.Item label="编码">
                <Typography.Text strong>{item.childMaterialCode}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="名称">{item.childMaterialName}</Descriptions.Item>
              <Descriptions.Item label="描述" span={2}>{item.childMaterialDescription || '-'}</Descriptions.Item>
            </Descriptions>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          {/* BOM信息 - 网格布局 */}
          <div style={{ marginBottom: 16 }}>
            <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: 14, color: '#1890ff' }}>
              BOM信息
            </Typography.Title>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>数量:</Typography.Text>
                  <Typography.Text strong>{item.quantity?.toFixed(2)}</Typography.Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>单位:</Typography.Text>
                  <Typography.Text strong>{item.unitOfMeasure}</Typography.Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>序号:</Typography.Text>
                  <Typography.Text strong>{item.sequence}</Typography.Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>层级:</Typography.Text>
                  <Typography.Text strong>{item.levelCode}</Typography.Text>
                </Space>
              </Col>
            </Row>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          {/* 日期&状态信息 - 合并显示 */}
          <div style={{ marginBottom: 16 }}>
            <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: 14, color: '#1890ff' }}>
              状态与日期
            </Typography.Title>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>激活状态:</Typography.Text>
                  <Badge status={statusInfo?.value === 5 ? 'success' : 'default'} text={statusInfo?.label} />
                </Space>
              </Col>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>是否可见:</Typography.Text>
                  <Typography.Text>{item.isVisible ? '是' : '否'}</Typography.Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>生效日期:</Typography.Text>
                  <Typography.Text>
                    {item.effectiveDate ? dayjs(item.effectiveDate).format('YYYY-MM-DD') : '-'}
                  </Typography.Text>
                </Space>
              </Col>
              <Col span={12}>
                <Space size={4}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>失效日期:</Typography.Text>
                  <Typography.Text>
                    {item.expiryDate ? dayjs(item.expiryDate).format('YYYY-MM-DD') : '无限期'}
                  </Typography.Text>
                </Space>
              </Col>
            </Row>
          </div>

          {/* 备注信息 */}
          {item.remark && (
            <>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <Typography.Title level={5} style={{ margin: '0 0 8px 0', fontSize: 14, color: '#1890ff' }}>
                  备注
                </Typography.Title>
                <Typography.Paragraph style={{ fontSize: 12, color: '#595959', margin: 0 }}>
                  {item.remark}
                </Typography.Paragraph>
              </div>
            </>
          )}

          {/* 固定底部操作栏 */}
          <div
            style={{
              position: 'sticky',
              bottom: 0,
              background: '#fff',
              padding: '12px 0 0 0',
              borderTop: '1px solid #f0f0f0',
              marginTop: 16,
            }}
          >
            <Space>
              <Access accessible={!!access[BOM_PERMISSIONS.UPDATE]}>
                <Button type="primary" size="small" icon={<EditOutlined />} onClick={() => onEdit?.(item)}>
                  编辑
                </Button>
              </Access>
              <Access accessible={!!access[BOM_PERMISSIONS.DELETE_ITEM]}>
                <Tooltip title={!canDelete ? '根节点不能删除' : '删除'}>
                  <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => onDelete?.(item)}
                    disabled={!canDelete}
                  >
                    删除
                  </Button>
                </Tooltip>
              </Access>
            </Space>
          </div>
        </div>
      ),
    },
    {
      key: 'document',
      label: (
        <Space size={4}>
          <FileTextOutlined />
          文档信息
          {documentsLoaded && bomDocumentTree && (
            <Badge count={bomDocumentTree.documents?.length || 0} size="small" style={{ backgroundColor: '#13c2c2' }} />
          )}
        </Space>
      ),
      children: (
        <PartDocumentsPanel
          bomDocumentTree={bomDocumentTree}
          loading={documentsLoading}
          showHeader={false}
          showSourceColumn={false}
          defaultViewMode="flat"
        />
      ),
    },
    {
      key: 'change',
      label: (
        <span>
          <HistoryOutlined />
          变更信息
        </span>
      ),
      children: (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="变更信息功能开发中"
          style={{ marginTop: 60 }}
        />
      ),
    },
  ];

  return (
    <Card
      title={<span style={{ fontSize: 14 }}>子项详情 - {item.childMaterialCode}</span>}
      size="small"
      style={{
        height: 'calc(100vh - 150px)',
        display: 'flex',
        flexDirection: 'column',
      }}
      styles={{
        body: {
          flex: 1,
          overflow: 'auto',
          padding: '12px 16px',
        },
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="small"
        tabBarStyle={{ marginBottom: 12 }}
      />
    </Card>
  );
};

export default BomItemDetail;
