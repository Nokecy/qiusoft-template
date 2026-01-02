/**
 * BOM 主物料信息卡片 - 详情页面顶部 (紧凑优化版)
 */

import React, { useState } from 'react';
import { Card, Descriptions, Space, Button, Badge, Row, Col, Typography, Divider, Collapse } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import dayjs from 'dayjs';
import type { BurnAbpPdmBomManagementBomsBomDto } from '@/services/pdm/typings';
import { BOM_PERMISSIONS } from '../_permissions';
import { bomStatusMap } from '../_enums/bomEnums';
import VersionSelector from './VersionSelector';

interface BomHeaderCardProps {
  bomData: BurnAbpPdmBomManagementBomsBomDto | null;
  currentVersion: string;
  onVersionChange: (version: string) => void;
  onEdit?: () => void;
  onBack?: () => void;
  loading?: boolean;
}

const BomHeaderCard: React.FC<BomHeaderCardProps> = ({
  bomData,
  currentVersion,
  onVersionChange,
  onEdit,
  onBack,
  loading = false,
}) => {
  const access = useAccess();

  if (!bomData) {
    return null;
  }

  const statusInfo = bomStatusMap.find((s) => s.value === bomData.status);

  return (
    <Card
      style={{ marginBottom: 12 }}
      bodyStyle={{ padding: '16px 24px' }}
      size="small"
    >
      {/* 单行核心信息 + 工具栏 */}
      <Row gutter={16} align="middle">
        <Col flex="auto">
          <Space size={24} wrap>
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>物料编码:</Typography.Text>
              <Typography.Text strong style={{ marginLeft: 8, fontSize: 14 }}>
                {bomData.materialCode}
              </Typography.Text>
            </div>
            <Divider type="vertical" style={{ height: 20 }} />
            <div>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>物料名称:</Typography.Text>
              <Typography.Text strong style={{ marginLeft: 8, fontSize: 14 }}>
                {bomData.materialName}
              </Typography.Text>
            </div>
            <Divider type="vertical" style={{ height: 20 }} />
            <Space size={8} align="center">
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>版本:</Typography.Text>
              <VersionSelector
                materialCode={bomData.materialCode || ''}
                currentVersion={currentVersion}
                onChange={onVersionChange}
                style={{ width: 120 }}
                size="small"
              />
            </Space>
            <Badge
              status={statusInfo?.value === 5 ? 'success' : 'default'}
              text={statusInfo?.label}
              color={statusInfo?.color}
            />
          </Space>
        </Col>
        <Col>
          <Space size={8}>
            {onBack && (
              <Button size="small" icon={<ArrowLeftOutlined />} onClick={onBack}>
                返回
              </Button>
            )}
            {onEdit && (
              <Access accessible={!!access[BOM_PERMISSIONS.UPDATE]}>
                <Button
                  type="primary"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={onEdit}
                  loading={loading}
                >
                  编辑
                </Button>
              </Access>
            )}
          </Space>
        </Col>
      </Row>

      {/* 可折叠的详细信息 */}
      <Collapse
        ghost
        bordered={false}
        style={{ marginTop: 8 }}
        items={[
          {
            key: 'detail',
            label: '详细信息',
            children: (
              <Descriptions column={4} size="small" style={{ marginTop: -8 }}>
                <Descriptions.Item label="顶层物料">{bomData.topMaterialCode || '-'}</Descriptions.Item>
                <Descriptions.Item label="工程师">{bomData.engineerName || '-'}</Descriptions.Item>
                <Descriptions.Item label="创建时间">
                  {bomData.creationTime ? dayjs(bomData.creationTime).format('YYYY-MM-DD HH:mm') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="修改时间">
                  {bomData.lastModificationTime ? dayjs(bomData.lastModificationTime).format('YYYY-MM-DD HH:mm') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="物料描述" span={4}>{bomData.materialDescription || '-'}</Descriptions.Item>
                {bomData.remark && (
                  <Descriptions.Item label="备注" span={4}>{bomData.remark}</Descriptions.Item>
                )}
              </Descriptions>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default BomHeaderCard;
