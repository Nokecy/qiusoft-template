import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import type { BurnAbpPdmPartManagementPartVersionsComparisonComparisonStatisticsDto } from '@/services/pdm/typings';

const { Text } = Typography;

interface ComparisonSummaryProps {
  statistics: BurnAbpPdmPartManagementPartVersionsComparisonComparisonStatisticsDto | undefined;
  sourceVersion?: string;
  targetVersion?: string;
  includeUnchanged?: boolean;
}

const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({
  statistics,
  sourceVersion,
  targetVersion,
  includeUnchanged = false,
}) => {
  if (!statistics) return null;

  const {
    totalFieldCount = 0,
    modifiedCount = 0,
    addedCount = 0,
    removedCount = 0,
    unchangedCount = 0,
    criticalChangeCount = 0,
  } = statistics;

  // 计算总差异数（不包含无变化）
  const totalDifferences = modifiedCount + addedCount + removedCount;

  return (
    <Card bodyStyle={{ padding: '16px 24px' }} style={{ marginBottom: 16 }}>
      {/* 版本信息 */}
      <div style={{ marginBottom: 16, padding: '8px 12px', background: '#fafafa', borderRadius: 4 }}>
        <Space size={16} align="center">
          <Space>
            <Text type="secondary">源版本:</Text>
            <Tag color="blue">{sourceVersion || '-'}</Tag>
          </Space>
          <ArrowRightOutlined style={{ color: '#1890ff' }} />
          <Space>
            <Text type="secondary">目标版本:</Text>
            <Tag color="green">{targetVersion || '-'}</Tag>
          </Space>
        </Space>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16}>
        <Col span={4}>
          <Statistic
            title="修改字段"
            value={modifiedCount}
            valueStyle={{ color: '#faad14' }}
            prefix="✏️"
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="新增字段"
            value={addedCount}
            valueStyle={{ color: '#52c41a' }}
            prefix="✅"
          />
        </Col>
        <Col span={4}>
          <Statistic
            title="删除字段"
            value={removedCount}
            valueStyle={{ color: '#ff4d4f' }}
            prefix="❌"
          />
        </Col>
        {includeUnchanged && (
          <Col span={4}>
            <Statistic
              title="无变化"
              value={unchangedCount}
              valueStyle={{ color: '#8c8c8c' }}
              prefix="⚪"
            />
          </Col>
        )}
        <Col span={includeUnchanged ? 4 : 6}>
          <Statistic
            title="关键变更"
            value={criticalChangeCount}
            valueStyle={{ color: criticalChangeCount > 0 ? '#ff4d4f' : '#8c8c8c' }}
            prefix="⭐"
          />
        </Col>
        <Col span={includeUnchanged ? 4 : 6}>
          <Statistic
            title="总差异数"
            value={totalDifferences}
            valueStyle={{ color: totalDifferences > 0 ? '#1890ff' : '#8c8c8c' }}
            suffix={<Text type="secondary" style={{ fontSize: 14 }}>/ {totalFieldCount}</Text>}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ComparisonSummary;
